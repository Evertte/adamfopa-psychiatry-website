import fs from "fs/promises";
import path from "path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

type FieldSpec = {
  label: string;
  name: string;
  x: number;
  width: number;
  multiline?: boolean;
};

const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const MARGIN = 36;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const COLUMN_GAP = 12;
const LABEL_SIZE = 10;
const TITLE_SIZE = 16;
const SUBTITLE_SIZE = 13;

const BORDER_COLOR = rgb(0.78, 0.8, 0.85);
const TEXT_COLOR = rgb(0.15, 0.15, 0.15);

async function main() {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const form = pdfDoc.getForm();

  let page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let cursorY = PAGE_HEIGHT - MARGIN;

  const col2 = (CONTENT_WIDTH - COLUMN_GAP) / 2;

  const wrapText = (text: string, maxWidth: number, size: number) => {
    const words = text.split(" ");
    const lines: string[] = [];
    let line = "";

    for (const word of words) {
      const next = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(next, size) > maxWidth) {
        if (line) {
          lines.push(line);
        }
        line = word;
      } else {
        line = next;
      }
    }

    if (line) {
      lines.push(line);
    }

    return lines;
  };

  const ensureSpace = (height: number) => {
    if (cursorY - height < MARGIN) {
      page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      cursorY = PAGE_HEIGHT - MARGIN;
    }
  };

  const drawParagraph = (text: string, size: number) => {
    const lines = wrapText(text, CONTENT_WIDTH, size);
    ensureSpace(lines.length * (size + 4));
    for (const line of lines) {
      page.drawText(line, {
        x: MARGIN,
        y: cursorY,
        size,
        font,
        color: TEXT_COLOR,
      });
      cursorY -= size + 4;
    }
  };

  const drawSectionTitle = (title: string) => {
    ensureSpace(18);
    page.drawText(title, {
      x: MARGIN,
      y: cursorY,
      size: 12,
      font: fontBold,
      color: TEXT_COLOR,
    });
    cursorY -= 16;
  };

  const drawBulletList = (items: string[], size = 10) => {
    const bullet = "- ";
    const indent = font.widthOfTextAtSize(bullet, size);
    for (const item of items) {
      const lines = wrapText(item, CONTENT_WIDTH - indent, size);
      ensureSpace(lines.length * (size + 4));
      lines.forEach((line, index) => {
        const prefix = index === 0 ? bullet : "".padEnd(bullet.length, " ");
        page.drawText(`${prefix}${line}`, {
          x: MARGIN,
          y: cursorY,
          size,
          font,
          color: TEXT_COLOR,
        });
        cursorY -= size + 4;
      });
      cursorY -= 2;
    }
  };

  const addFieldRow = (fields: FieldSpec[], height = 18) => {
    const blockHeight = LABEL_SIZE + 4 + height + 10;
    ensureSpace(blockHeight);

    const labelY = cursorY;
    const fieldY = labelY - LABEL_SIZE - 4 - height;

    for (const field of fields) {
      page.drawText(field.label, {
        x: field.x,
        y: labelY,
        size: LABEL_SIZE,
        font,
        color: TEXT_COLOR,
      });

      const textField = form.createTextField(field.name);
      if (field.multiline) {
        textField.enableMultiline();
      }
      textField.addToPage(page, {
        x: field.x,
        y: fieldY,
        width: field.width,
        height,
        borderColor: BORDER_COLOR,
        textColor: TEXT_COLOR,
      });
    }

    cursorY = fieldY - 10;
  };

  page.drawText("Adamfopa Outpatient Psychiatry, PLLC", {
    x: MARGIN,
    y: cursorY,
    size: TITLE_SIZE,
    font: fontBold,
    color: TEXT_COLOR,
  });
  cursorY -= 22;

  page.drawText("Consent for Psychiatric Treatment", {
    x: MARGIN,
    y: cursorY,
    size: SUBTITLE_SIZE,
    font: fontBold,
    color: TEXT_COLOR,
  });
  cursorY -= 18;

  drawSectionTitle("Purpose of Treatment");
  drawParagraph(
    "I understand that I am seeking outpatient psychiatric evaluation and/or treatment, which may include diagnostic assessment, medication management, and supportive therapeutic interventions.",
    10,
  );
  cursorY -= 6;

  drawSectionTitle("Nature of Psychiatric Care");
  drawParagraph(
    "I understand that psychiatric treatment may involve discussion of personal, emotional, or psychological issues and that outcomes cannot be guaranteed.",
    10,
  );
  cursorY -= 6;

  drawSectionTitle("Medications");
  drawParagraph("If medications are prescribed, I understand:", 10);
  drawBulletList([
    "The purpose of the medication",
    "Expected benefits",
    "Common and serious side effects",
    "Alternatives, including no medication",
  ]);
  drawParagraph(
    "I understand that it is my responsibility to report side effects and follow medication instructions as prescribed.",
    10,
  );
  cursorY -= 6;

  drawSectionTitle("Risks and Benefits");
  drawParagraph(
    "I understand that all treatments carry potential risks and benefits, and that no specific outcome is promised or guaranteed.",
    10,
  );
  cursorY -= 6;

  drawSectionTitle("Alternatives");
  drawParagraph(
    "I understand that alternatives to psychiatric treatment may include psychotherapy alone, referral to another provider, or choosing not to pursue treatment.",
    10,
  );
  cursorY -= 6;

  drawSectionTitle("Voluntary Participation");
  drawParagraph(
    "I understand that participation in treatment is voluntary and that I may withdraw consent or discontinue treatment at any time, except in circumstances involving immediate safety concerns.",
    10,
  );
  cursorY -= 6;

  drawSectionTitle("Telepsychiatry (if applicable)");
  drawParagraph("I understand that services may be provided via telehealth and that:", 10);
  drawBulletList([
    "Telepsychiatry has potential risks, including technical failures or limitations",
    "Reasonable safeguards are in place to protect privacy",
    "I may request in-person services when available",
  ]);
  cursorY -= 6;

  drawSectionTitle("Emergency and Crisis Situations");
  drawParagraph(
    "I understand that Adamfopa Outpatient Psychiatry, PLLC does not provide emergency or crisis services. In case of an emergency, I agree to call 911, go to the nearest emergency room, or contact 988 (Suicide & Crisis Lifeline).",
    10,
  );
  cursorY -= 6;

  drawSectionTitle("Financial Responsibility");
  drawParagraph(
    "I understand that I am financially responsible for charges not covered by insurance, including missed appointments or late cancellations, according to clinic policy.",
    10,
  );
  cursorY -= 6;

  drawSectionTitle("Acknowledgment and Consent");
  drawParagraph(
    "I have had the opportunity to ask questions and understand the information provided above. I voluntarily consent to psychiatric evaluation and treatment at Adamfopa Outpatient Psychiatry, PLLC.",
    10,
  );
  cursorY -= 6;

  drawSectionTitle("Patient Information & Signature");
  addFieldRow([
    { label: "Patient Name", name: "patient_name", x: MARGIN, width: col2 },
    { label: "Date of Birth", name: "patient_dob", x: MARGIN + col2 + COLUMN_GAP, width: col2 },
  ]);
  addFieldRow([
    { label: "Patient Signature", name: "patient_signature", x: MARGIN, width: col2 },
    { label: "Date", name: "signature_date", x: MARGIN + col2 + COLUMN_GAP, width: col2 },
  ]);

  form.updateFieldAppearances(font);

  pdfDoc.setTitle("Consent for Psychiatric Treatment");
  pdfDoc.setAuthor("Adamfopa Outpatient Psychiatry, PLLC");

  const outputDir = path.join(process.cwd(), "public", "forms");
  await fs.mkdir(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, "consent.pdf");
  const pdfBytes = await pdfDoc.save();
  await fs.writeFile(outputPath, pdfBytes);

  console.log(`Saved consent form to ${outputPath}`);
}

main().catch((error) => {
  console.error("Failed to generate consent PDF:", error);
  process.exitCode = 1;
});
