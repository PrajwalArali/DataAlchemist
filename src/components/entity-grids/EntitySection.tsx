"use client";

import EditableDataGrid from "@/components/EditableDataGrid";
import ValidationPanel from "@/components/ValidationPanel";
import { GridColDef } from "@mui/x-data-grid";

type EntitySectionProps<T> = {
  title: string;
  rows: T[];
  columns: GridColDef<T>[];
  onRowUpdate: (row: T) => void;
  validationResults: any[];
  filterable?: boolean;
  filterText?: string;
  onFilterChange?: (text: string) => void;
};

export default function EntitySection<T>({
  title,
  rows,
  columns,
  onRowUpdate,
  validationResults,
  filterable = false,
  filterText = "",
  onFilterChange,
}: EntitySectionProps<T>) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>

      {filterable && onFilterChange && (
        <input
          type="text"
          value={filterText}
          onChange={(e) => onFilterChange(e.target.value)}
          placeholder='Try: priority = 5 AND group = GroupA'
          className="w-full md:w-1/2 p-2 mb-4 border border-gray-300 rounded"
        />
      )}

      <EditableDataGrid rows={rows} columns={columns} onRowUpdate={onRowUpdate} />
      <ValidationPanel results={validationResults} />
    </section>
  );
}
