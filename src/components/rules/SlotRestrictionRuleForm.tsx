
"use client";

import { useState } from "react";
import { Client, Worker } from "@/types/entities";
import { SlotRestrictionRule } from "@/types/rules";

type Props = {
  clients: Client[];
  workers: Worker[];
  onAddRule: (rule: SlotRestrictionRule) => void;
};

export default function SlotRestrictionRuleForm({
  clients,
  workers,
  onAddRule,
}: Props) {
  const [group, setGroup] = useState("");
  const [minSlots, setMinSlots] = useState(1);

  const allGroups = Array.from(
    new Set([
      ...clients.map((c) => c.GroupTag).filter(Boolean),
      ...workers.map((w) => w.WorkerGroup).filter(Boolean),
    ])
  );

  const handleSubmit = () => {
    if (group && minSlots > 0) {
      onAddRule({ type: "slotRestriction", group, minCommonSlots: minSlots });
      setGroup("");
      setMinSlots(1);
    }
  };

  return (
    <div className="border p-4 rounded-md shadow-sm bg-white">
      <h3 className="font-semibold mb-2">Define Slot Restriction Rule</h3>
      <label className="block text-sm mb-1">Select Group:</label>
      <select
        value={group}
        onChange={(e) => setGroup(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      >
        <option value="">-- Select --</option>
        {allGroups.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      <label className="block text-sm mb-1">Minimum Common Slots:</label>
      <input
        type="number"
        value={minSlots}
        onChange={(e) => setMinSlots(Number(e.target.value))}
        className="w-full border p-2 rounded mb-3"
        min={1}
      />

      <button
        onClick={handleSubmit}
        disabled={!group || minSlots < 1}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        Add Slot Restriction Rule
      </button>
    </div>
  );
}
