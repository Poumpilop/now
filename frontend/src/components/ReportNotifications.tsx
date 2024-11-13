"use client"

// src/components/ReportNotifications.tsx
import { useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { Report } from '@/app/api/reports/types';

export function ReportNotifications() {
  const { toast } = useToast();

  const handleNewReport = useCallback((report: Report) => {
    toast({
      variant: "default",
      title: "Nouveau signalement",
      description: `Un nouveau signalement a été créé pour ${report.reported.username}`
    });
  }, [toast]);

  const handleReportUpdate = useCallback((report: Report) => {
    toast({
      variant: "default",
      title: "Signalement mis à jour",
      description: `Le status du signalement a été mis à jour à ${report.status}`
    });
  }, [toast]);

  return null;
}