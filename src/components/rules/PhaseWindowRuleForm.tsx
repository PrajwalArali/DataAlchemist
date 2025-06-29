
"use client";

import { useState } from "react";
import { Task } from "@/types/entities";
import { PhaseWindowRule } from "@/types/rules";

type Props = {
  tasks: Task[];
  onAddRule: (rule: PhaseWindowRule) => void;
};

export default function PhaseWindowRuleForm({ tasks, onAddRule }: Props) {
  const [taskId, setTaskId] = useState("");
  const [phases, setPhases] = useState("");

  const handleSubmit = () => {
    const parsedPhases = phases
      .split(",")
      .map((p) => parseInt(p.trim()))
      .filter((n) => !isNaN(n));

    if (taskId && parsedPhases.length > 0) {
      onAddRule({ type: "phaseWindow", taskId, allowedPhases: parsedPhases });
      setTaskId("");
      setPhases("");
    }
  };

  return (
    <div className="border p-4 rounded-md bg-white">
      <h3 className="font-semibold mb-2">Phase Window Rule</h3>

      <select value={taskId} onChange={(e) => setTaskId(e.target.value)} className="w-full mb-2 p-2 border rounded">
        <option value="">-- Select Task --</option>
        {tasks.map((t) => (
          <option key={t.TaskID} value={t.TaskID}>
            {t.TaskID} - {t.TaskName}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={phases}
        onChange={(e) => setPhases(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
        placeholder="Allowed Phases (e.g. 1,2,3)"
      />

      <button
        onClick={handleSubmit}
        disabled={!taskId || !phases}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add Phase Window Rule
      </button>
    </div>
  );
}
