// src/app/api/reports/types.ts
export interface ReportData {
    reportedId: string;
    reason: string;
    description: string;
  }
  
export interface Report {
    id: string;
    reason: string;
    description: string;
    status: "PENDING" | "RESOLVED" | "DISMISSED";
    reported: {
      username: string;
    };
    reporter: {
      username: string;
    };
    createdAt: string;
  }