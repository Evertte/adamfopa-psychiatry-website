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

type CheckboxOption = {
  label: string;
  name: string;
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
  const col3 = (CONTENT_WIDTH - COLUMN_GAP * 2) / 3;

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
    ensureSpace(20);
    page.drawText(title, {
      x: MARGIN,
      y: cursorY,
      size: 12,
      font: fontBold,
      color: TEXT_COLOR,
    });
    cursorY -= 18;
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

  const addTextArea = (label: string, name: string, height = 60) => {
    addFieldRow(
      [
        {
          label,
          name,
          x: MARGIN,
          width: CONTENT_WIDTH,
          multiline: true,
        },
      ],
      height,
    );
  };

  const addCheckboxGroup = (label: string, options: CheckboxOption[], columns = 2) => {
    const boxSize = 12;
    const rowGap = 8;
    const columnGap = 16;
    const columnWidth = (CONTENT_WIDTH - columnGap * (columns - 1)) / columns;
    const rows = Math.ceil(options.length / columns);
    const height = LABEL_SIZE + 8 + rows * (boxSize + rowGap);

    ensureSpace(height + 6);

    page.drawText(label, {
      x: MARGIN,
      y: cursorY,
      size: LABEL_SIZE,
      font,
      color: TEXT_COLOR,
    });

    const startY = cursorY - LABEL_SIZE - 10;

    options.forEach((option, index) => {
      const col = index % columns;
      const row = Math.floor(index / columns);
      const x = MARGIN + col * (columnWidth + columnGap);
      const y = startY - row * (boxSize + rowGap);

      const checkbox = form.createCheckBox(option.name);
      checkbox.addToPage(page, {
        x,
        y,
        width: boxSize,
        height: boxSize,
        borderColor: BORDER_COLOR,
      });

      page.drawText(option.label, {
        x: x + boxSize + 4,
        y: y + 2,
        size: LABEL_SIZE,
        font,
        color: TEXT_COLOR,
      });
    });

    cursorY = startY - rows * (boxSize + rowGap) - 6;
  };

  const addMedicationTable = (rows = 5) => {
    const headers = [
      "Medication Name",
      "Dose",
      "Frequency",
      "Prescribed By",
    ];
    const columnWidths = [0.42, 0.16, 0.2, 0.22].map(
      (ratio) => ratio * CONTENT_WIDTH,
    );

    const headerHeight = LABEL_SIZE + 6;
    const rowHeight = 18;
    const totalHeight = headerHeight + rows * (rowHeight + 8) + 6;
    ensureSpace(totalHeight);

    let x = MARGIN;
    headers.forEach((header, index) => {
      page.drawText(header, {
        x,
        y: cursorY,
        size: LABEL_SIZE,
        font,
        color: TEXT_COLOR,
      });
      x += columnWidths[index] + COLUMN_GAP;
    });

    let y = cursorY - LABEL_SIZE - 6;

    for (let row = 0; row < rows; row += 1) {
      let colX = MARGIN;
      headers.forEach((_, col) => {
        const field = form.createTextField(`medications_${row + 1}_${col + 1}`);
        field.addToPage(page, {
          x: colX,
          y: y - rowHeight,
          width: columnWidths[col],
          height: rowHeight,
          borderColor: BORDER_COLOR,
          textColor: TEXT_COLOR,
        });
        colX += columnWidths[col] + COLUMN_GAP;
      });
      y -= rowHeight + 8;
    }

    cursorY = y - 4;
  };

  page.drawText("Adamfopa Outpatient Psychiatry, PLLC", {
    x: MARGIN,
    y: cursorY,
    size: TITLE_SIZE,
    font: fontBold,
    color: TEXT_COLOR,
  });
  cursorY -= 22;

  page.drawText("New Patient Intake Form", {
    x: MARGIN,
    y: cursorY,
    size: SUBTITLE_SIZE,
    font: fontBold,
    color: TEXT_COLOR,
  });
  cursorY -= 18;

  drawParagraph(
    "This form helps your provider understand your background, current concerns, and healthcare needs in order to provide safe and effective psychiatric care. Please complete all sections as accurately as possible.",
    9,
  );
  cursorY -= 8;

  drawSectionTitle("1. Patient Information");
  addFieldRow([
    { label: "Full Legal Name", name: "patient_full_name", x: MARGIN, width: col2 },
    { label: "Preferred Name", name: "patient_preferred_name", x: MARGIN + col2 + COLUMN_GAP, width: col2 },
  ]);
  addFieldRow([
    { label: "Date of Birth", name: "patient_dob", x: MARGIN, width: col3 },
    { label: "Age", name: "patient_age", x: MARGIN + col3 + COLUMN_GAP, width: col3 },
    { label: "Sex at Birth", name: "patient_sex_at_birth", x: MARGIN + (col3 + COLUMN_GAP) * 2, width: col3 },
  ]);
  addFieldRow([
    { label: "Gender Identity (optional)", name: "patient_gender_identity", x: MARGIN, width: col2 },
    { label: "Pronouns (optional)", name: "patient_pronouns", x: MARGIN + col2 + COLUMN_GAP, width: col2 },
  ]);
  addFieldRow([
    { label: "Address", name: "patient_address", x: MARGIN, width: CONTENT_WIDTH },
  ]);
  addFieldRow([
    { label: "City", name: "patient_city", x: MARGIN, width: col3 },
    { label: "State", name: "patient_state", x: MARGIN + col3 + COLUMN_GAP, width: col3 },
    { label: "ZIP", name: "patient_zip", x: MARGIN + (col3 + COLUMN_GAP) * 2, width: col3 },
  ]);
  addFieldRow([
    { label: "Phone Number", name: "patient_phone", x: MARGIN, width: col2 },
    { label: "Email Address", name: "patient_email", x: MARGIN + col2 + COLUMN_GAP, width: col2 },
  ]);
  addFieldRow([
    { label: "Preferred Method of Contact", name: "patient_contact_method", x: MARGIN, width: CONTENT_WIDTH },
  ]);

  drawSectionTitle("2. Emergency Contact");
  addFieldRow([
    { label: "Name", name: "emergency_name", x: MARGIN, width: col2 },
    { label: "Relationship", name: "emergency_relationship", x: MARGIN + col2 + COLUMN_GAP, width: col2 },
  ]);
  addFieldRow([
    { label: "Phone Number", name: "emergency_phone", x: MARGIN, width: CONTENT_WIDTH },
  ]);

  drawSectionTitle("3. Insurance Information");
  addFieldRow([
    { label: "Insurance Provider", name: "insurance_provider", x: MARGIN, width: CONTENT_WIDTH },
  ]);
  addFieldRow([
    { label: "Member ID", name: "insurance_member_id", x: MARGIN, width: col2 },
    { label: "Group Number", name: "insurance_group_number", x: MARGIN + col2 + COLUMN_GAP, width: col2 },
  ]);
  addFieldRow([
    { label: "Policy Holder Name", name: "insurance_policy_holder", x: MARGIN, width: CONTENT_WIDTH },
  ]);
  addFieldRow([
    { label: "Relationship to Policy Holder", name: "insurance_relationship", x: MARGIN, width: CONTENT_WIDTH },
  ]);

  drawSectionTitle("4. Reason for Visit");
  addTextArea(
    "What brings you in for care today? (brief description of concerns, symptoms, or goals)",
    "reason_for_visit",
    60,
  );
  addFieldRow([
    { label: "When did these concerns begin?", name: "reason_start", x: MARGIN, width: CONTENT_WIDTH },
  ]);
  addCheckboxGroup("Have these symptoms changed recently?", [
    { label: "Improved", name: "symptoms_improved" },
    { label: "Worsened", name: "symptoms_worsened" },
    { label: "No change", name: "symptoms_no_change" },
  ], 3);

  drawSectionTitle("5. Psychiatric History");
  addCheckboxGroup("Have you ever been diagnosed with a mental health condition?", [
    { label: "Yes", name: "psych_diagnosis_yes" },
    { label: "No", name: "psych_diagnosis_no" },
  ], 2);
  addTextArea("If yes, list diagnoses and approximate dates:", "psych_diagnosis_details", 50);
  addCheckboxGroup("Have you ever received psychiatric treatment?", [
    { label: "Therapy", name: "psych_treatment_therapy" },
    { label: "Medication", name: "psych_treatment_medication" },
    { label: "Hospitalization", name: "psych_treatment_hospitalization" },
  ], 3);
  addCheckboxGroup("Any prior psychiatric hospitalizations or emergency visits?", [
    { label: "Yes", name: "psych_hospitalizations_yes" },
    { label: "No", name: "psych_hospitalizations_no" },
  ], 2);
  addTextArea("If yes, please explain:", "psych_hospitalizations_details", 50);

  drawSectionTitle("6. Current Medications");
  drawParagraph(
    "List all current medications, including psychiatric medications, supplements, and over-the-counter drugs.",
    9,
  );
  cursorY -= 4;
  addMedicationTable(5);

  drawSectionTitle("7. Medical History");
  addTextArea(
    "Current or past medical conditions (e.g., diabetes, asthma, thyroid disease):",
    "medical_conditions",
    50,
  );
  addTextArea("Surgeries or major hospitalizations:", "medical_surgeries", 40);
  addTextArea("Allergies (medications, foods, environmental):", "medical_allergies", 40);

  drawSectionTitle("8. Substance Use History");
  addCheckboxGroup("Alcohol", [
    { label: "None", name: "substance_alcohol_none" },
    { label: "Occasional", name: "substance_alcohol_occasional" },
    { label: "Regular", name: "substance_alcohol_regular" },
  ], 3);
  addCheckboxGroup("Tobacco / Nicotine", [
    { label: "None", name: "substance_tobacco_none" },
    { label: "Current", name: "substance_tobacco_current" },
    { label: "Past", name: "substance_tobacco_past" },
  ], 3);
  addCheckboxGroup("Cannabis", [
    { label: "None", name: "substance_cannabis_none" },
    { label: "Occasional", name: "substance_cannabis_occasional" },
    { label: "Regular", name: "substance_cannabis_regular" },
  ], 3);
  addFieldRow([
    { label: "Other substances (please specify)", name: "substance_other", x: MARGIN, width: CONTENT_WIDTH },
  ]);

  drawSectionTitle("9. Safety Assessment");
  addCheckboxGroup("Have you ever had thoughts of harming yourself?", [
    { label: "Yes", name: "safety_self_harm_yes" },
    { label: "No", name: "safety_self_harm_no" },
  ], 2);
  addCheckboxGroup("Have you ever attempted suicide?", [
    { label: "Yes", name: "safety_suicide_attempt_yes" },
    { label: "No", name: "safety_suicide_attempt_no" },
  ], 2);
  addCheckboxGroup("Do you currently have thoughts of harming yourself or others?", [
    { label: "Yes", name: "safety_current_thoughts_yes" },
    { label: "No", name: "safety_current_thoughts_no" },
  ], 2);
  addTextArea("If yes to any, please explain:", "safety_details", 50);

  drawSectionTitle("10. Family Psychiatric History");
  addCheckboxGroup("Have any family members been diagnosed with:", [
    { label: "Depression", name: "family_depression" },
    { label: "Anxiety", name: "family_anxiety" },
    { label: "Bipolar Disorder", name: "family_bipolar" },
    { label: "Schizophrenia", name: "family_schizophrenia" },
    { label: "Substance Use Disorder", name: "family_substance" },
    { label: "Other", name: "family_other" },
  ], 2);
  addFieldRow([
    { label: "Please specify relationship(s)", name: "family_relationships", x: MARGIN, width: CONTENT_WIDTH },
  ]);

  drawSectionTitle("11. Social History");
  addFieldRow([
    { label: "Marital Status", name: "social_marital", x: MARGIN, width: CONTENT_WIDTH },
  ]);
  addFieldRow([
    { label: "Living Situation", name: "social_living", x: MARGIN, width: CONTENT_WIDTH },
  ]);
  addFieldRow([
    { label: "Employment / School Status", name: "social_employment", x: MARGIN, width: CONTENT_WIDTH },
  ]);
  addTextArea(
    "Primary Support System (family, friends, community)",
    "social_support",
    40,
  );

  drawSectionTitle("12. Additional Information");
  addTextArea(
    "Is there anything else you would like your provider to know that may help with your care?",
    "additional_info",
    80,
  );

  drawSectionTitle("13. Patient Acknowledgment");
  drawParagraph(
    "I certify that the information provided above is accurate and complete to the best of my knowledge. I understand that providing accurate information is necessary for appropriate psychiatric care.",
    9,
  );
  cursorY -= 4;
  addFieldRow([
    { label: "Patient Signature", name: "patient_signature", x: MARGIN, width: col2 },
    { label: "Date", name: "patient_signature_date", x: MARGIN + col2 + COLUMN_GAP, width: col2 },
  ]);

  form.updateFieldAppearances(font);

  pdfDoc.setTitle("New Patient Intake Form");
  pdfDoc.setAuthor("Adamfopa Outpatient Psychiatry, PLLC");

  const outputDir = path.join(process.cwd(), "public", "forms");
  await fs.mkdir(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, "intake.pdf");
  const pdfBytes = await pdfDoc.save();
  await fs.writeFile(outputPath, pdfBytes);

  console.log(`Saved intake form to ${outputPath}`);
}

main().catch((error) => {
  console.error("Failed to generate intake PDF:", error);
  process.exitCode = 1;
});
