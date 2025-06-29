export function normalizeClientHeaders(data: Record<string, any>[]): Record<string, any>[] {
    const mapping: Record<string, string> = {
      clientid: "ClientID",
      clientname: "ClientName",
      prioritylevel: "PriorityLevel",
      requestedtaskids: "RequestedTaskIDs",
      grouptag: "GroupTag",
      attributesjson: "AttributesJSON",
    };
  
    return data.map((row) => {
      const newRow: Record<string, any> = {};
      for (const key in row) {
        const normalizedKey = key.toLowerCase().replace(/\s/g, "");
        const mappedKey = mapping[normalizedKey] || key;
        newRow[mappedKey] = row[key];
      }
      return newRow;
    });
  }
  
  export function normalizeWorkerHeaders(data: Record<string, any>[]): Record<string, any>[] {
    const mapping: Record<string, string> = {
      workerid: "WorkerID",
      workername: "WorkerName",
      skills: "Skills",
      availableslots: "AvailableSlots",
      maxloadperphase: "MaxLoadPerPhase",
      workergroup: "WorkerGroup",
      qualificationlevel: "QualificationLevel",
    };
  
    return data.map((row) => {
      const newRow: Record<string, any> = {};
      for (const key in row) {
        const normalizedKey = key.toLowerCase().replace(/\s/g, "");
        const mappedKey = mapping[normalizedKey] || key;
        newRow[mappedKey] = row[key];
      }
      return newRow;
    });
  }