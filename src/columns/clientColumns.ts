import { GridColDef } from "@mui/x-data-grid";
import { Client } from "@/types/entities";
import { ClientValidationResult } from "@/utils/validateClientRow";

export const clientColumns = (
  validationResults: ClientValidationResult[]
): GridColDef<Client>[] => [
  {
    field: "ClientID",
    headerName: "Client ID",
    width: 120,
    editable: true,
    cellClassName: (params) =>
      validationResults.find((v) => v.rowIndex === params.id)?.fieldErrors.ClientID
        ? "cell-error"
        : "",
  },
  {
    field: "ClientName",
    headerName: "Client Name",
    width: 150,
    editable: true,
    cellClassName: (params) =>
      validationResults.find((v) => v.rowIndex === params.id)?.fieldErrors.ClientName
        ? "cell-error"
        : "",
  },
  {
    field: "PriorityLevel",
    headerName: "Priority",
    width: 100,
    type: "number",
    editable: true,
    cellClassName: (params) =>
      validationResults.find((v) => v.rowIndex === params.id)?.fieldErrors.PriorityLevel
        ? "cell-error"
        : "",
  },
  {
    field: "RequestedTaskIDs",
    headerName: "Tasks",
    width: 200,
    editable: true,
    cellClassName: (params) =>
      validationResults.find((v) => v.rowIndex === params.id)?.fieldErrors.RequestedTaskIDs
        ? "cell-error"
        : "",
  },
  {
    field: "GroupTag",
    headerName: "Group",
    width: 100,
    editable: true,
  },
  {
    field: "AttributesJSON",
    headerName: "Metadata",
    width: 300,
    editable: true,
    cellClassName: (params) =>
      validationResults.find((v) => v.rowIndex === params.id)?.fieldErrors.AttributesJSON
        ? "cell-error"
        : "",
  },
];
