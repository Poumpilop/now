// src/lib/api/reportsApi.ts
import { ReportData, Report } from "@/app/api/reports/types";
import kyInstance from "@/lib/ky";


export const reportsApi = {
  create: (data: ReportData) =>
    kyInstance.post('api/reports', { json: data }).json<Report>(),
    
  async getAll() {
    try {
      const response = await kyInstance.get('api/reports', {
        timeout: 15000, // Timeout spécifique pour cette requête
      }).json<Report[]>();
      return response;
    } catch (error: any) {
      if (error.name === 'TimeoutError') {
        throw new Error('La requête a pris trop de temps à répondre');
      }
      console.error('Error fetching reports:', error);
      throw new Error(error.message || 'Failed to fetch reports');
    }
  },
    
  updateStatus: (reportId: string, status: string) =>
    kyInstance.patch(`api/reports/${reportId}`, { json: { status } }).json<Report>()
};