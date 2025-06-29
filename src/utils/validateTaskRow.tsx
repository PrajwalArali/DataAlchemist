import { Task } from "@/types/entities";

export type TaskValidationResult = {
  rowIndex: number;
  fieldErrors: Record<keyof Task, string | null>;
  hasError: boolean;
};

function isValidPreferredPhases(value: string): boolean {
  if (!value?.trim()) return false;

  try {
    if (value.startsWith("[")) {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) && parsed.every((v) => typeof v === "number");
    } else if (/^\d+-\d+$/.test(value)) {
      const [start, end] = value.split("-").map(Number);
      return start <= end;
    }
    return false;
  } catch {
    return false;
  }
}

export function validateTaskRow(row: Task, index: number): TaskValidationResult {
  const errors: Record<keyof Task, string | null> = {
    id: null,
    TaskID: null,
    TaskName: null,
    Category: null,
    Duration: null,
    RequiredSkills: null,
    PreferredPhases: null,
    MaxConcurrent: null,
  };

  if (!row.TaskID?.trim()) errors.TaskID = "Missing TaskID";
  if (!row.TaskName?.trim()) errors.TaskName = "Missing TaskName";
  if (!row.Category?.trim()) errors.Category = "Missing Category";

  const duration = Number(row.Duration);
  if (isNaN(duration) || duration < 1) {
    errors.Duration = "Duration must be ≥ 1";
  }

  if (!row.RequiredSkills?.trim()) {
    errors.RequiredSkills = "Missing RequiredSkills";
  }

  if (!isValidPreferredPhases(row.PreferredPhases)) {
    errors.PreferredPhases = "Invalid PreferredPhases format";
  }

  const maxConcurrent = Number(row.MaxConcurrent);
  if (isNaN(maxConcurrent) || maxConcurrent < 1) {
    errors.MaxConcurrent = "Invalid MaxConcurrent";
  }

  const hasError = Object.values(errors).some((v) => v !== null);

  return {
    rowIndex: index,
    fieldErrors: errors,
    hasError,
  };
}

export function validateAllTasks(rows: Task[]): TaskValidationResult[] {
  const idCount: Record<string, number> = {};

  rows.forEach((r) => {
    const id = r.TaskID?.trim();
    if (id) idCount[id] = (idCount[id] || 0) + 1;
  });

  return rows.map((row, index) => {
    const result = validateTaskRow(row, index);
    const id = row.TaskID?.trim();
    if (id && idCount[id] > 1) {
      result.fieldErrors.TaskID = "Duplicate TaskID";
      result.hasError = true;
    }
    return result;
  });
}
