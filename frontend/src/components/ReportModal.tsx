// src/components/ReportModal.tsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { Report, ReportData } from '@/app/api/reports/types';
import { reportsApi } from "@/lib/api/reportsApi";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export function ReportModal({ isOpen, onClose, userId }: ReportModalProps) {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (data: ReportData) => reportsApi.create(data),
    onSuccess: (data) => {
      toast({
        variant: "default",
        description: "Signalement envoyé avec succès"
      });
      setReason("");
      setDescription("");
      onClose();
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        description: "Oups, une erreur s'est produite..."
      });
      console.log(error.message);
    },
  });

  const handleSubmit = () => {
    if (!reason) return;

    const reportData: ReportData = {
      reason,
      description,
      reportedId: userId
    };

    mutation.mutate(reportData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Signaler l&apos;utilisateur</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Select onValueChange={setReason} value={reason}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez une raison" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="spam">Spam</SelectItem>
              <SelectItem value="harassment">Harcèlement</SelectItem>
              <SelectItem value="inappropriate">Contenu inapproprié</SelectItem>
              <SelectItem value="fake">Faux compte</SelectItem>
              <SelectItem value="other">Autre</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Description détaillée du signalement..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!reason || mutation.isPending}
            >
              {mutation.isPending ? "Envoi en cours..." : "Envoyer le signalement"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}