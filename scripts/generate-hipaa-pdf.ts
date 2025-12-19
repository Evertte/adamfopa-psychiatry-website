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

  page.drawText("Notice of Privacy Practices (HIPAA)", {
    x: MARGIN,
    y: cursorY,
    size: SUBTITLE_SIZE,
    font: fontBold,
    color: TEXT_COLOR,
  });
  cursorY -= 18;

  addFieldRow([
    { label: "Effective Date", name: "effective_date", x: MARGIN, width: col2 },
  ]);

  drawParagraph(
    "This Notice describes how medical information about you may be used and disclosed and how you can access this information. Please review it carefully.",
    10,
  );
  cursorY -= 6;

  drawSectionTitle("Our Responsibilities");
  drawBulletList([
    "Maintain the privacy and security of your protected health information (PHI)",
    "Provide you with this Notice of our legal duties and privacy practices",
    "Follow the terms of this Notice currently in effect",
    "Notify you if a breach occurs that may have compromised your information",
  ]);
  cursorY -= 6;

  drawSectionTitle("How We May Use and Disclose Your Information");
  drawParagraph(
    "We may use and disclose your PHI without your authorization for the following purposes:",
    10,
  );
  cursorY -= 4;

  drawSectionTitle("Treatment");
  drawParagraph(
    "To provide, coordinate, or manage your psychiatric care, including communication with other healthcare providers involved in your treatment.",
    10,
  );
  cursorY -= 4;

  drawSectionTitle("Payment");
  drawParagraph(
    "To bill and collect payment from you, your insurance company, or a third party.",
    10,
  );
  cursorY -= 4;

  drawSectionTitle("Healthcare Operations");
  drawParagraph(
    "For practice operations such as quality assessment, staff training, licensing, accreditation, and administrative activities.",
    10,
  );
  cursorY -= 6;

  drawSectionTitle("Other Permitted or Required Uses");
  drawBulletList([
    "When required by law",
    "For public health and safety purposes",
    "To prevent or lessen a serious and imminent threat to health or safety",
    "For health oversight activities",
    "For law enforcement purposes as required by law",
  ]);
  cursorY -= 6;

  drawSectionTitle("Uses Requiring Your Written Authorization");
  drawParagraph(
    "We will obtain your written authorization before using or disclosing your PHI for:",
    10,
  );
  drawBulletList([
    "Marketing purposes",
    "Sale of PHI",
    "Psychotherapy notes (with limited legal exceptions)",
  ]);
  drawParagraph("You may revoke authorization at any time in writing.", 10);
  cursorY -= 6;

  drawSectionTitle("Your Rights Regarding Your Information");
  drawParagraph("You have the right to:", 10);
  drawBulletList([
    "Request access to or a copy of your medical records",
    "Request corrections to your records",
    "Request restrictions on certain uses or disclosures",
    "Request confidential communications",
    "Receive a list of certain disclosures",
    "Obtain a paper copy of this Notice, even if you received it electronically",
    "File a complaint if you believe your privacy rights have been violated",
  ]);
  cursorY -= 6;

  drawSectionTitle("Filing a Complaint");
  drawParagraph(
    "You may file a complaint with Adamfopa Outpatient Psychiatry, PLLC, or the U.S. Department of Health and Human Services. You will not be retaliated against for filing a complaint.",
    10,
  );
  cursorY -= 6;

  drawSectionTitle("Changes to This Notice");
  drawParagraph(
    "We reserve the right to change this Notice at any time. Changes will apply to all PHI we maintain and will be available upon request or on our website.",
    10,
  );
  cursorY -= 6;

  drawSectionTitle("Contact Information");
  addFieldRow([
    { label: "Privacy Officer", name: "privacy_officer", x: MARGIN, width: CONTENT_WIDTH },
  ]);
  addFieldRow([
    { label: "Phone", name: "privacy_phone", x: MARGIN, width: col2 },
    { label: "Email", name: "privacy_email", x: MARGIN + col2 + COLUMN_GAP, width: col2 },
  ]);

  drawSectionTitle("Acknowledgment of Receipt (Optional but Recommended)");
  drawParagraph(
    "I acknowledge that I have received a copy of the HIPAA Notice of Privacy Practices.",
    10,
  );
  addFieldRow([
    { label: "Patient Name", name: "patient_name", x: MARGIN, width: col2 },
    { label: "Date", name: "ack_date", x: MARGIN + col2 + COLUMN_GAP, width: col2 },
  ]);
  addFieldRow([
    { label: "Patient Signature", name: "patient_signature", x: MARGIN, width: CONTENT_WIDTH },
  ]);

  form.updateFieldAppearances(font);

  pdfDoc.setTitle("Notice of Privacy Practices (HIPAA)");
  pdfDoc.setAuthor("Adamfopa Outpatient Psychiatry, PLLC");

  const outputDir = path.join(process.cwd(), "public", "forms");
  await fs.mkdir(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, "hipaa.pdf");
  const pdfBytes = await pdfDoc.save();
  await fs.writeFile(outputPath, pdfBytes);

  console.log(`Saved HIPAA notice to ${outputPath}`);
}

main().catch((error) => {
  console.error("Failed to generate HIPAA PDF:", error);
  process.exitCode = 1;
});
