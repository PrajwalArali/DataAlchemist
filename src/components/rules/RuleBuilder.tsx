
"use client";

import { useState } from "react";
import CoRunRuleForm from "./CoRunRuleForm";
import SlotRestrictionRuleForm from "./SlotRestrictionRuleForm";
import { Rule } from "@/types/rules";
import { Task, Client, Worker } from "@/types/entities";
import { downloadRulesJson } from "@/utils/exportRules";
import LoadLimitRuleForm from "./LoadLimitRuleForm";
import PhaseWindowRuleForm from "./PhaseWindowRuleForm";
import PrioritizationPanel from "@/components/rules/PrioritizationPanel";
import { PrioritizationWeights } from "@/types/rules";



type Props = {
  tasks: Task[];
  clients: Client[];
  workers: Worker[];
};

export default function RuleBuilder({ tasks, clients, workers }: Props) {
  const [rules, setRules] = useState<Rule[]>([]);
  const [priorities, setPriorities] = useState<PrioritizationWeights | null>(null);


  const handleAddRule = (newRule: Rule) => {
    console.log("Adding Rule:", newRule);
    setRules((prev) => [...prev, newRule]);
  };

  return (
    <section className="mt-10 space-y-6">
      <h2 className="text-xl font-semibold">Rule Builder</h2>

      <CoRunRuleForm tasks={tasks} onAddRule={handleAddRule} />
      <SlotRestrictionRuleForm clients={clients} workers={workers} onAddRule={handleAddRule} />
      <LoadLimitRuleForm workers={workers} onAddRule={handleAddRule} />
      <PhaseWindowRuleForm tasks={tasks} onAddRule={handleAddRule} />
      <PrioritizationPanel onChange={setPriorities} />


      {rules.length > 0 && (
        <div className="border p-4 rounded shadow mt-4">
          <h3 className="font-semibold mb-2">Current Rules</h3>
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
            {JSON.stringify(rules, null, 2)}
          </pre>
          <button
  onClick={() => downloadRulesJson(rules)}
  className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
>
  Export Rules Config
</button>
        </div>
      )}
    </section>
  );
}
