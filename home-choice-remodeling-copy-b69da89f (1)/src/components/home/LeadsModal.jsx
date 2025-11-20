import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeadCaptureForm from "../leads/LeadCaptureForm";
import CallbackScheduler from "../leads/CallbackScheduler";
import { useLanguage } from "../../Layout";

export default function LeadsModal({ open, onOpenChange }) {
  const { language } = useLanguage();

  const translations = {
    en: {
      estimate: "Free Estimate",
      callback: "Schedule Callback"
    },
    es: {
      estimate: "Estimado Gratis",
      callback: "Programar Llamada"
    }
  };

  const t = translations[language];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <Tabs defaultValue="estimate" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="estimate">{t.estimate}</TabsTrigger>
            <TabsTrigger value="callback">{t.callback}</TabsTrigger>
          </TabsList>
          <TabsContent value="estimate">
            <LeadCaptureForm onSuccess={() => setTimeout(() => onOpenChange(false), 3000)} />
          </TabsContent>
          <TabsContent value="callback">
            <CallbackScheduler />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}