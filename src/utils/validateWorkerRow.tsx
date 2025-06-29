import { Worker } from "@/types/entities";

export type WorkerValidationResult = {
  rowIndex: number;
  fieldErrors: Record<keyof Worker, string | null>;
  hasError: boolean;
};

export function validateWorkerRow(row: Worker, index: number): WorkerValidationResult {
  const errors: Record<keyof Worker, string | null> = {
    id: null,
    WorkerID: null,
    WorkerName: null,
    Skills: null,
    AvailableSlots: null,
    MaxLoadPerPhase: null,
    WorkerGroup: null,
    QualificationLevel: null,
  };

  if (!row.WorkerID?.trim()) errors.WorkerID = "Missing WorkerID";
  if (!row.WorkerName?.trim()) errors.WorkerName = "Missing WorkerName";
  if (!row.Skills?.trim()) errors.Skills = "Missing Skills";

  if (!row.AvailableSlots?.trim()) {
    errors.AvailableSlots = "Missing AvailableSlots";
  } else {
    try {
      const slots = JSON.parse(row.AvailableSlots);
      if (!Array.isArray(slots) || !slots.every((n: any) => typeof n === "number")) {
        errors.AvailableSlots = "AvailableSlots must be a JSON array of numbers";
      }
    } catch {
      errors.AvailableSlots = "Malformed JSON in AvailableSlots";
    }
  }

  const maxLoad = Number(row.MaxLoadPerPhase);
  if (isNaN(maxLoad) || maxLoad < 1) {
    errors.MaxLoadPerPhase = "Invalid MaxLoadPerPhase";
  }

  const hasError = Object.values(errors).some((e) => e !== null);

  return {
    rowIndex: index,
    fieldErrors: errors,
    hasError,
  };
}

export function validateAllWorkers(rows: Worker[]): WorkerValidationResult[] {
  const idCount: Record<string, number> = {};

  rows.forEach((r) => {
    const id = r.WorkerID?.trim();
    if (id) idCount[id] = (idCount[id] || 0) + 1;
  });

  return rows.map((row, i) => {
    const result = validateWorkerRow(row, i);
    const id = row.WorkerID?.trim();
    if (id && idCount[id] > 1) {
      result.fieldErrors.WorkerID = "Duplicate WorkerID";
      result.hasError = true;
    }
    return result;
  });
}
