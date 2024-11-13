"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";
import { TriangleAlert } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { reportsApi } from "@/lib/api/reportsApi";
import type { Report } from '@/app/api/reports/types';
import { io } from "socket.io-client";

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800",
  RESOLVED: "bg-green-100 text-green-800",
  DISMISSED: "bg-gray-100 text-gray-800",
};

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [newReportIds, setNewReportIds] = useState<Set<string>>(new Set());

  const [socketConnected, setSocketConnected] = useState(false);

  // Initialisation de Socket.IO et connexion
  useEffect(() => {
    const socket = io("http://localhost:4000"); // Remplace par l'URL de ton backend

    socket.on("connect", () => {
      setSocketConnected(true);
      socket.emit("admin_connected", "AdminUsername"); // Remplace par le nom d’utilisateur de l’admin
    });

    socket.on("disconnect", () => {
      setSocketConnected(false);
    });

    // Nettoyage de la connexion au socket à la déconnexion
    return () => {
      socket.disconnect();
    };
  }, []);

  // Un seul fetch initial au chargement de la page
  const { data: initialReports, isLoading } = useQuery({
    queryKey: ["reports"],
    queryFn: () => reportsApi.getAll(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity, // On ne refetch jamais automatiquement
  });

  useEffect(() => {
    if (initialReports) {
      setReports(initialReports);
    }
  }, [initialReports]);

   // La mutation pour mettre à jour le status
const statusMutation = useMutation({
  mutationFn: async ({ reportId, status }: { reportId: string; status: Report['status'] }) => {
    const result = await reportsApi.updateStatus(reportId, status);
    return result;
  },
  onSuccess: (updatedReport) => {
    if (updatedReport) {
      setReports(prev => prev.map(report => 
        report.id === updatedReport.id ? updatedReport : report
      ));
    }
    toast({
      variant: "default",
      description: "Statut mis à jour avec succès",
    });
  },
  onError: (error: Error) => {
    toast({
      variant: "destructive",
      description: "Erreur lors de la mise à jour du statut",
    });
    console.error(error.message);
  },
});

  if (isLoading) {
    return (
      <Card className="container mx-auto p-4">
        <CardHeader>
          <CardTitle>Gestion des signalements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!reports && !isLoading) {
    return (
      <Alert variant="destructive" className="container mx-auto mt-4">
        <TriangleAlert className="h-4 w-4" />
        <AlertDescription>Aucune donnée disponible</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="container mx-auto p-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Gestion des signalements</CardTitle>
        <Badge variant={socketConnected ? "default" : "destructive"}>
          {socketConnected ? "En ligne" : "Hors ligne"}
        </Badge>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Signalé par</TableHead>
              <TableHead>Utilisateur signalé</TableHead>
              <TableHead>Raison</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
    {reports.map((report) => (
      <TableRow 
        key={report.id}
        className={`transition-all duration-500 ${
          newReportIds.has(report.id) ? "bg-yellow-50 dark:bg-yellow-900/10" : ""
        }`}
      >
        <TableCell>
          {new Date(report.createdAt).toLocaleDateString()}
        </TableCell>
        <TableCell className="font-medium">
          {report.reporter.username}
        </TableCell>
        <TableCell className="font-medium">
          {report.reported.username}
        </TableCell>
        <TableCell>{report.reason}</TableCell>
        <TableCell>
          <Select
            onValueChange={(value) =>
              statusMutation.mutate({ 
                reportId: report.id, 
                status: value as Report['status']
              })
            }
            defaultValue={report.status}
            disabled={statusMutation.isPending}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PENDING">En attente</SelectItem>
              <SelectItem value="RESOLVED">Résolu</SelectItem>
              <SelectItem value="DISMISSED">Rejeté</SelectItem>
            </SelectContent>
          </Select>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}