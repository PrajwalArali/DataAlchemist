export function downloadRulesJson(rules: any[], filename = "rules.json") {
    const blob = new Blob([JSON.stringify(rules, null, 2)], {
      type: "application/json",
    });
  
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
  
    link.href = url;
    link.download = filename;
    link.click();
  
    URL.revokeObjectURL(url);
  }
  