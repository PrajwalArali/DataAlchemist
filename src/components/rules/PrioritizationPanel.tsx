
"use client";

import { useState } from "react";
import { PrioritizationWeights } from "@/types/rules";

type Props = {
  onChange: (weights: PrioritizationWeights) => void;
};

export default function PrioritizationPanel({ onChange }: Props) {
  const [weights, setWeights] = useState<PrioritizationWeights>({
    priorityLevel: 1,
    taskFulfillment: 1,
    fairness: 1,
    skillMatch: 1,
    timeWindowFit: 1,
  });

  const handleChange = (key: keyof PrioritizationWeights, value: number) => {
    const updated = { ...weights, [key]: value };
    setWeights(updated);
    onChange(updated);
  };

  return (
    <div className="border p-4 rounded-md bg-white space-y-4">
      <h3 className="font-semibold text-lg">Prioritization Weights</h3>
      {Object.entries(weights).map(([key, val]) => (
        <div key={key}>
          <label className="block mb-1 text-sm capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
          <input
            type="range"
            min={0}
            max={10}
            value={val}
            onChange={(e) => handleChange(key as keyof PrioritizationWeights, Number(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-right">Weight: {val}</div>
        </div>
      ))}
    </div>
  );
}
