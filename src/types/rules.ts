
export type CoRunRule = {
  type: "coRun";
  tasks: string[];
};

export type SlotRestrictionRule = {
  type: "slotRestriction";
  group: string;
  minCommonSlots: number;
};

export type LoadLimitRule = {
  type: "loadLimit";
  group: string;
  maxSlotsPerPhase: number;
};

export type PhaseWindowRule = {
  type: "phaseWindow";
  taskId: string;
  allowedPhases: number[];
};

export type PrioritizationWeights = {
  priorityLevel: number;
  taskFulfillment: number;
  fairness: number;
  skillMatch: number;
  timeWindowFit: number;
};

export type Rule =
  | CoRunRule
  | SlotRestrictionRule
  | LoadLimitRule
  | PhaseWindowRule;
