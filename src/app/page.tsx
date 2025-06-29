"use client";

import FileUploader from "@/components/FileUploader";
import EntitySection from "@/components/entity-grids/EntitySection";
import useEntityManager from "@/hooks/useEntityManager";
import { clientColumns } from "@/columns/clientColumns";
import { workerColumns } from "@/columns/workerColumns";
import { taskColumns } from "@/columns/taskColumns";
import RuleBuilder from "@/components/rules/RuleBuilder";

export default function HomePage() {
  const {
    clients,
    workers,
    tasks,
    clientValidation,
    workerValidation,
    taskValidation,
    handleFileParsed,
    handleClientUpdate,
    handleWorkerUpdate,
    handleTaskUpdate,
    getFilteredClients,
    filterText,
    setFilterText,
  } = useEntityManager();

  return (
    <main className="p-8 space-y-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold">Data Alchemist</h1>
      <FileUploader onFilesParsed={handleFileParsed} />

      <EntitySection
        title="Parsed Clients Data"
        rows={getFilteredClients()}
        columns={clientColumns(clientValidation)}
        onRowUpdate={handleClientUpdate}
        validationResults={clientValidation}
        filterable
        filterText={filterText}
        onFilterChange={setFilterText}
      />

      <EntitySection
        title="Parsed Workers Data"
        rows={workers}
        columns={workerColumns(workerValidation)}
        onRowUpdate={handleWorkerUpdate}
        validationResults={workerValidation}
      />

      <EntitySection
        title="Parsed Tasks Data"
        rows={tasks}
        columns={taskColumns(taskValidation)}
        onRowUpdate={handleTaskUpdate}
        validationResults={taskValidation}
      />

      {tasks.length > 0 && (
        <RuleBuilder tasks={tasks} clients={clients} workers={workers} />
      )}
    </main>
  );
}
