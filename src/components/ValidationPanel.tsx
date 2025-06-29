import { ClientValidationResult } from "@/utils/validateClientRow";
import { WorkerValidationResult } from "@/utils/validateWorkerRow";

type Props = {
  results: ClientValidationResult[] | WorkerValidationResult[];
  title?: string;
};

export default function ValidationPanel({ results, title = "Validation Issues" }: Props) {
  const errors = results.filter((r) => r.hasError);

  return (
    <div className="mt-4 border-l-4 border-red-500 bg-red-50 text-sm p-4 rounded">
      <h2 className="text-lg font-semibold text-red-700 mb-2"> {title}</h2>
      {errors.length === 0 ? (
        <p className="text-green-600"> All rows are valid!</p>
      ) : (
        <ul className="list-disc ml-5 space-y-1">
          {errors.map((row) => (
            <li key={row.rowIndex}>
              Row {row.rowIndex + 1}:
              {Object.entries(row.fieldErrors)
                .filter(([, v]) => v)
                .map(([field, msg]) => (
                  <span key={field} className="ml-2 text-red-600">
                    [{field} → {msg}]
                  </span>
                ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
