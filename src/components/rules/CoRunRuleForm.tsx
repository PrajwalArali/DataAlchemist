
"use client";

import { useState } from "react";
import { Task } from "@/types/entities";
import { CoRunRule } from "@/types/rules";

type Props = {
  tasks: Task[];
  onAddRule: (rule: CoRunRule) => void;
};

export default function CoRunRuleForm({ tasks, onAddRule }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleTask = (taskId: string) => {
    setSelected((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleSubmit = () => {
    if (selected.length >= 2) {
      const rule: CoRunRule = { type: "coRun", tasks: selected };
      onAddRule(rule);
      console.log("Adding rule:", rule);
      setSelected([]);
    }
  };

  return (
    <div className="border p-4 rounded-md shadow-sm bg-white">
      <h3 className="font-semibold mb-2"> Define Co-Run Rule</h3>
      <div className="space-y-2 max-h-40 overflow-y-auto border p-2 rounded">
        {tasks.map((task) => (
          <label key={task.TaskID} className="block text-sm">
            <input
              type="checkbox"
              value={task.TaskID}
              checked={selected.includes(task.TaskID)}
              onChange={() => toggleTask(task.TaskID)}
              className="mr-2"
            />
            {task.TaskID} - {task.TaskName}
          </label>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={selected.length < 2}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        Add Co-Run Rule
      </button>
    </div>
  );
}
