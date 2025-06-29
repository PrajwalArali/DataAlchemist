import { Client } from "@/types/entities";

export type ClientValidationResult = {
  rowIndex: number;
  fieldErrors: Record<keyof Client, string | null>;
  hasError: boolean;
};

export function validateClientRow(row: Client, index: number): ClientValidationResult {
  const errors: Record<keyof Client, string | null> = {
    id: null,
    ClientID: null,
    ClientName: null,
    PriorityLevel: null,
    RequestedTaskIDs: null,
    GroupTag: null,
    AttributesJSON: null,
  };

  if (!row.ClientID?.trim()) errors.ClientID = "Missing ClientID";
  if (!row.ClientName?.trim()) errors.ClientName = "Missing ClientName";

  const priority = Number(row.PriorityLevel);
  if (isNaN(priority) || priority < 1 || priority > 5) {
    errors.PriorityLevel = "Must be between 1–5";
  }

  if (!/^T\d+(,T\d+)*$/.test(row.RequestedTaskIDs?.trim() || "")) {
    errors.RequestedTaskIDs = "Invalid Task ID format";
  }

  try {
    const json = JSON.parse(row.AttributesJSON);
    if (typeof json !== "object" || Array.isArray(json)) {
      errors.AttributesJSON = "Must be a valid JSON object";
    }
  } catch {
    errors.AttributesJSON = "Malformed JSON";
  }

  const hasError = Object.values(errors).some((v) => v !== null);
  return { rowIndex: index, fieldErrors: errors, hasError };
}

export function validateAllClients(rows: Client[]): ClientValidationResult[] {
  const idCount: Record<string, number> = {};

  rows.forEach((row) => {
    const id = row.ClientID?.trim();
    if (id) idCount[id] = (idCount[id] || 0) + 1;
  });

  return rows.map((row, index) => {
    const result = validateClientRow(row, index);
    const id = row.ClientID?.trim();
    if (id && idCount[id] > 1) {
      result.fieldErrors.ClientID = "Duplicate ClientID";
      result.hasError = true;
    }
    return result;
  });
}
