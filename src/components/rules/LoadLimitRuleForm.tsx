
"use client";

import { useState } from "react";
import { Worker } from "@/types/entities";
import { LoadLimitRule } from "@/types/rules";

type Props = {
  workers: Worker[];
  onAddRule: (rule: LoadLimitRule) => void;
};

export default function LoadLimitRuleForm({ workers, onAddRule }: Props) {
  const [group, setGroup] = useState("");
  const [maxSlots, setMaxSlots] = useState(1);

  const allGroups = Array.from(new Set(workers.map((w) => w.WorkerGroup).filter(Boolean)));

  const handleSubmit = () => {
    if (group && maxSlots > 0) {
      onAddRule({ type: "loadLimit", group, maxSlotsPerPhase: maxSlots });
      setGroup("");
      setMaxSlots(1);
    }
  };

  return (
    <div className="border p-4 rounded-md bg-white">
      <h3 className="font-semibold mb-2">Load Limit Rule</h3>
      <select value={group} onChange={(e) => setGroup(e.target.value)} className="w-full mb-2 p-2 border rounded">
        <option value="">-- Select Worker Group --</option>
        {allGroups.map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>

      <input
        type="number"
        min={1}
        value={maxSlots}
        onChange={(e) => setMaxSlots(Number(e.target.value))}
        className="w-full mb-2 p-2 border rounded"
        placeholder="Max slots per phase"
      />

      <button
        onClick={handleSubmit}
        disabled={!group || maxSlots < 1}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add Load Limit Rule
      </button>
    </div>
  );
}
