export type Client = {
    id: number | string;
    ClientID: string;
    ClientName: string;
    PriorityLevel: number;
    RequestedTaskIDs: string;
    GroupTag: string;
    AttributesJSON: string;
  };
  
  export type Worker = {
    id: number | string;
    WorkerID: string;
    WorkerName: string;
    Skills: string;
    AvailableSlots: string; // we'll later convert to array
    MaxLoadPerPhase: number;
    WorkerGroup: string;
    QualificationLevel: number;
  };
  
  export type Task = {
    id: number | string;
    TaskID: string;
    TaskName: string;
    Category: string;
    Duration: number;
    RequiredSkills: string;
    PreferredPhases: string;
    MaxConcurrent: number;
  };
  
  export type EntityType = Client | Worker | Task;