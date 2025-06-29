import { GridColDef } from "@mui/x-data-grid";
import { Worker } from "@/types/entities";
import { WorkerValidationResult } from "@/utils/validateWorkerRow";

export const workerColumns = (
  validationResults: WorkerValidationResult[]
): GridColDef<Worker>[] => [
  {
    field: "WorkerID",
    headerName: "Worker ID",
    width: 120,
    editable: true,
    cellClassName: (params) =>
      validationResults.find((v) => v.rowIndex === params.id)?.fieldErrors.WorkerID
        ? "cell-error"
        : "",
  },
  {
    field: "WorkerName",
    headerName: "Name",
    width: 150,
    editable: true,
    cellClassName: (params) =>
      validationResults.find((v) => v.rowIndex === params.id)?.fieldErrors.WorkerName
        ? "cell-error"
        : "",
  },
  {
    field: "Skills",
    headerName: "Skills",
    width: 180,
    editable: true,
    cellClassName: (params) =>
      validationResults.find((v) => v.rowIndex === params.id)?.fieldErrors.Skills
        ? "cell-error"
        : "",
  },
  {
    field: "AvailableSlots",
    headerName: "Slots",
    width: 160,
    editable: true,
    cellClassName: (params) =>
      validationResults.find((v) => v.rowIndex === params.id)?.fieldErrors.AvailableSlots
        ? "cell-error"
        : "",
  },
  {
    field: "MaxLoadPerPhase",
    headerName: "Max Load",
    type: "number",
    width: 120,
    editable: true,
    cellClassName: (params) =>
      validationResults.find((v) => v.rowIndex === params.id)?.fieldErrors.MaxLoadPerPhase
        ? "cell-error"
        : "",
  },
  { field: "WorkerGroup", headerName: "Group", width: 120, editable: true },
  { field: "QualificationLevel", headerName: "Level", type: "number", width: 120, editable: true },
];
