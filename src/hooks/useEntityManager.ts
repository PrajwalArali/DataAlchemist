import { useState } from "react";
import {
  validateAllClients,
  ClientValidationResult,
} from "@/utils/validateClientRow";
import {
  validateAllWorkers,
  WorkerValidationResult,
} from "@/utils/validateWorkerRow";
import {
  validateAllTasks,
  TaskValidationResult,
} from "@/utils/validateTaskRow";
import { Client, Worker, Task, EntityType } from "@/types/entities";

export default function useEntityManager() {
  const [clients, setClients] = useState<Client[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [clientValidation, setClientValidation] = useState<ClientValidationResult[]>([]);
  const [workerValidation, setWorkerValidation] = useState<WorkerValidationResult[]>([]);
  const [taskValidation, setTaskValidation] = useState<TaskValidationResult[]>([]);

  const [filterText, setFilterText] = useState("");

  const handleFileParsed = (entity: string, data: EntityType[]) => {
    const withId = data.map((item, idx) => ({ ...item, id: idx }));

    if (entity.includes("client")) {
      const validated = validateAllClients(withId as Client[]);
      setClients(withId as Client[]);
      setClientValidation(validated);
    } else if (entity.includes("worker")) {
      const validated = validateAllWorkers(withId as Worker[]);
      setWorkers(withId as Worker[]);
      setWorkerValidation(validated);
    } else if (entity.includes("task")) {
      const validated = validateAllTasks(withId as Task[]);
      setTasks(withId as Task[]);
      setTaskValidation(validated);
    }
  };

  const handleClientUpdate = (updatedRow: Client) => {
    const updated = clients.map((row) => row.id === updatedRow.id ? updatedRow : row);
    setClients(updated);
    setClientValidation(validateAllClients(updated));
  };

  const handleWorkerUpdate = (updatedRow: Worker) => {
    const updated = workers.map((row) => row.id === updatedRow.id ? updatedRow : row);
    setWorkers(updated);
    setWorkerValidation(validateAllWorkers(updated));
  };

  const handleTaskUpdate = (updatedRow: Task) => {
    const updated = tasks.map((row) => row.id === updatedRow.id ? updatedRow : row);
    setTasks(updated);
    setTaskValidation(validateAllTasks(updated));
  };

  const getFilteredClients = (): Client[] => {
    if (!filterText.trim()) return clients;

    try {
      const clauses = filterText.toLowerCase().split("and").map((s) => s.trim());

      return clients.filter((client) => {
        return clauses.every((clause) => {
          if (clause.includes("priority")) {
            const match = clause.match(/priority\s*([=><])\s*(\d+)/);
            if (!match) return true;
            const [, op, value] = match;
            const val = Number(value);
            const clientPriority = Number(client.PriorityLevel);
            if (op === "=") return clientPriority === val;
            if (op === ">") return clientPriority > val;
            if (op === "<") return clientPriority < val;
          }

          if (clause.includes("group")) {
            const match = clause.match(/group\s*=\s*(\w+)/);
            return match ? client.GroupTag.toLowerCase() === match[1] : true;
          }

          if (clause.includes("name")) {
            const match = clause.match(/name\s*contains\s*(\w+)/);
            return match ? client.ClientName.toLowerCase().includes(match[1]) : true;
          }

          return true;
        });
      });
    } catch {
      return clients;
    }
  };

  return {
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
    filterText,
    setFilterText,
    getFilteredClients,
  };
}
