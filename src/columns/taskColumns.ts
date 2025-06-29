import { GridColDef } from "@mui/x-data-grid";
import { Task } from "@/types/entities";
import { TaskValidationResult } from "@/utils/validateTaskRow";

export const taskColumns = (
  validationResults: TaskValidationResult[]
): GridColDef<Task>[] => [
  {
    field: "TaskID",
    headerName: "Task ID",
    width: 120,
    editable: true,
    cellClassName: (params) =>
      validationResults.find((v) => v.rowIndex === params.id)?.fieldErrors.TaskID
        ? "cell-error"
        : "",
  },
  {
    field: "TaskName",
    headerName: "Name",
    width: 150,
    editable: true,
    cellClassName: (params) =>
      validationResults.find((v) => v.rowIndex === params.id)?.fieldErrors.TaskName
        ? "cell-error"
        : "",
  },
  {
    field: "Category",
    headerName: "Category",
    width: 120,
    editable: true,
    cellClassName: (params) =>
      validationResults.find((v) => v.rowIndex === params.id)?.fieldErrors.Category
        ? "cell-error"
        : "",
  },
  {
    field: "Duration",
    headerName: "Duration",
    width: 100,
    type: "number",
    editable: true,
    cellClassName: (params) =>
      validationResults.find((v) => v.rowIndex === params.id)?.fieldErrors.Duration
        ? "cell-error"
        : "",
  },
  {
    field: "RequiredSkills",
    headerName: "Skills",
    width: 180,
    editable: true,
    cellClassName: (params) =>
      validationResults.find((v) => v.rowIndex === params.id)?.fieldErrors.RequiredSkills
        ? "cell-error"
        : "",
  },
  {
    field: "PreferredPhases",
    headerName: "Phases",
    width: 150,
    editable: true,
    cellClassName: (params) =>
      validationResults.find((v) => v.rowIndex === params.id)?.fieldErrors.PreferredPhases
        ? "cell-error"
        : "",
  },
  {
    field: "MaxConcurrent",
    headerName: "Max Concurrent",
    type: "number",
    width: 150,
    editable: true,
    cellClassName: (params) =>
      validationResults.find((v) => v.rowIndex === params.id)?.fieldErrors.MaxConcurrent
        ? "cell-error"
        : "",
  },
];
