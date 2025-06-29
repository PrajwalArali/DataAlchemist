"use client";

import {
  DataGrid,
  GridColDef,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { Client } from "@/types/entities";

type Props = {
  rows: Client[];
  columns: GridColDef<Client>[];
  onRowUpdate: (updatedRow: Client) => void;
};

export default function EditableDataGrid({ rows, columns, onRowUpdate }: Props) {
  return (
    <div className="mt-4 border border-gray-300 rounded shadow bg-white" style={{ height: 500 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection
        editMode="row"
        processRowUpdate={(updatedRow: GridRowModel) => {
          onRowUpdate(updatedRow as Client);
          return updatedRow;
        }}
        onRowEditStop={(params, event) => {
          if ((event as any)?.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
          }
        }}
      />
    </div>
  );
}
