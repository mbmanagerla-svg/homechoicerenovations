import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Phone, Mail, Calendar, User, FileText, Filter, Workflow, MessageSquare } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import WorkflowEngine from "../components/crm/WorkflowEngine";
import WorkflowManager from "../components/crm/WorkflowManager";
import { sendSMSIfOptedIn } from "../components/crm/SMSManager";

export default function CRM() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedLead, setSelectedLead] = useState(null);
  const [notes, setNotes] = useState("");
  const queryClient = useQueryClient();

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["leads"],
    queryFn: () => base44.entities.Lead.list("-created_date"),
  });

  const createWorkflowMutation = useMutation({
    mutationFn: async ({ leadId, triggerStatus }) => {
      const workflows = [];
      
      if (triggerStatus === 'estimate_sent') {
        const scheduledDate = new Date();
        scheduledDate.setDate(scheduledDate.getDate() + 3);
        workflows.push({
          lead_id: leadId,
          workflow_type: 'email_sequence',
          trigger_status: triggerStatus,
          scheduled_date: scheduledDate.toISOString(),
          action: 'estimate_followup'
        });
      }
      
      if (triggerStatus === 'contacted') {
        const scheduledDate = new Date();
        scheduledDate.setDate(scheduledDate.getDate() + 5);
        workflows.push({
          lead_id: leadId,
          workflow_type: 'email_sequence',
          trigger_status: triggerStatus,
          scheduled_date: scheduledDate.toISOString(),
          action: 'contacted_followup'
        });
      }

      for (const workflow of workflows) {
        await base44.entities.Workflow.create(workflow);
      }
    }
  });

  const updateLeadMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Lead.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["leads"]);
      if (variables.data.status) {
        createWorkflowMutation.mutate({
          leadId: variables.id,
          triggerStatus: variables.data.status
        });
      }
    },
  });

  const sendFollowUpMutation = useMutation({
    mutationFn: async (lead) => {
      const emailContent = lead.preferred_language === 'en' ? {
        subject: "Following Up - Home Choice Remodeling",
        body: `
Dear ${lead.full_name},

We wanted to follow up on your remodeling project inquiry.

We're here to help answer any questions about:
- Your project timeline and budget
- Our flexible financing options
- The 60-day payment delay program
- Material selection and design

Ready to move forward? Let's schedule your free home visit!

Call us: 310.460.9427
WhatsApp: wa.me/13104609427
Reply to this email anytime

Best regards,
Home Choice Remodeling
contact@homechoiceremodelings.com
        `
      } : {
        subject: "Seguimiento - Home Choice Remodeling",
        body: `
Estimado/a ${lead.full_name},

Queríamos hacer seguimiento a su consulta sobre el proyecto de remodelación.

Estamos aquí para ayudar a responder cualquier pregunta sobre:
- El cronograma y presupuesto de su proyecto
- Nuestras opciones flexibles de financiamiento
- El programa de pago con 60 días de retraso
- Selección de materiales y diseño

¿Listo para seguir adelante? ¡Programemos su visita gratuita a domicilio!

Llámenos: 310.460.9427
WhatsApp: wa.me/13104609427
Responda a este correo en cualquier momento

Saludos cordiales,
Home Choice Remodeling
contact@homechoiceremodelings.com
        `
      };

      await base44.integrations.Core.SendEmail({
        to: lead.email,
        subject: emailContent.subject,
        body: emailContent.body
      });

      return base44.entities.Lead.update(lead.id, {
        follow_up_count: (lead.follow_up_count || 0) + 1,
        last_follow_up: new Date().toISOString()
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["leads"]);
      alert("Follow-up email sent!");
    },
  });

  const sendSMSMutation = useMutation({
    mutationFn: async ({ lead, messageType }) => {
      await sendSMSIfOptedIn(lead, messageType);
      return base44.entities.Lead.update(lead.id, {
        follow_up_count: (lead.follow_up_count || 0) + 1,
        last_follow_up: new Date().toISOString()
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["leads"]);
      alert("SMS sent!");
    },
  });

  useEffect(() => {
    const checkInactiveLeads = async () => {
      const inactiveLeads = leads.filter(lead => {
        if (lead.status === 'converted' || lead.status === 'not_interested') return false;
        
        const lastActivity = lead.last_follow_up || lead.created_date;
        const daysSinceActivity = differenceInDays(new Date(), new Date(lastActivity));
        
        return daysSinceActivity > 5;
      });

      for (const lead of inactiveLeads) {
        const existingReminders = await base44.entities.Workflow.filter({
          lead_id: lead.id,
          workflow_type: 'reminder',
          executed: false
        });

        if (existingReminders.length === 0) {
          await base44.entities.Workflow.create({
            lead_id: lead.id,
            workflow_type: 'reminder',
            scheduled_date: new Date().toISOString(),
            action: 'inactive_lead_reminder'
          });
        }
      }
    };

    if (leads.length > 0) {
      checkInactiveLeads();
    }
  }, [leads]);

  const handleUpdateStatus = (leadId, newStatus) => {
    updateLeadMutation.mutate({ id: leadId, data: { status: newStatus } });
  };

  const handleAddNotes = (lead) => {
    const updatedNotes = lead.notes ? `${lead.notes}\n\n[${format(new Date(), 'PP')}] ${notes}` : notes;
    updateLeadMutation.mutate({
      id: lead.id,
      data: { notes: updatedNotes }
    });
    setNotes("");
    setSelectedLead(null);
  };

  const statusColors = {
    new: "bg-blue-100 text-blue-800",
    contacted: "bg-yellow-100 text-yellow-800",
    estimate_sent: "bg-purple-100 text-purple-800",
    callback_scheduled: "bg-orange-100 text-orange-800",
    converted: "bg-green-100 text-green-800",
    not_interested: "bg-gray-100 text-gray-800",
  };

  const filteredLeads = filterStatus === "all" 
    ? leads 
    : leads.filter(lead => lead.status === filterStatus);

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    converted: leads.filter(l => l.status === 'converted').length,
    smsOptIn: leads.filter(l => l.sms_opt_in && !l.sms_opt_out).length,
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <WorkflowEngine />
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Lead Management CRM</h1>
          <p className="text-gray-600">Track and nurture your leads with automated workflows & SMS</p>
        </div>

        <Tabs defaultValue="leads" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="workflows">
              <Workflow className="w-4 h-4 mr-2" />
              Workflows
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leads" className="space-y-6">
            <div className="grid md:grid-cols-5 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm text-gray-600 mb-1">Total Leads</div>
                  <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm text-gray-600 mb-1">New Leads</div>
                  <div className="text-3xl font-bold text-blue-600">{stats.new}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm text-gray-600 mb-1">Contacted</div>
                  <div className="text-3xl font-bold text-yellow-600">{stats.contacted}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm text-gray-600 mb-1">Converted</div>
                  <div className="text-3xl font-bold text-green-600">{stats.converted}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm text-gray-600 mb-1">SMS Opted-In</div>
                  <div className="text-3xl font-bold text-purple-600">{stats.smsOptIn}</div>
                </CardContent>
              </Card>
            </div>

            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Leads</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="estimate_sent">Estimate Sent</SelectItem>
                  <SelectItem value="callback_scheduled">Callback Scheduled</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                  <SelectItem value="not_interested">Not Interested</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4">
              {filteredLeads.map((lead) => {
                const daysSinceActivity = differenceInDays(
                  new Date(), 
                  new Date(lead.last_follow_up || lead.created_date)
                );
                const isInactive = daysSinceActivity > 5 && lead.status !== 'converted' && lead.status !== 'not_interested';
                
                return (
                  <Card key={lead.id} className={`hover:shadow-lg transition-shadow ${isInactive ? 'border-2 border-red-300' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-1">
                                {lead.full_name}
                                {isInactive && (
                                  <Badge className="ml-2 bg-red-100 text-red-800">
                                    Inactive {daysSinceActivity}d
                                  </Badge>
                                )}
                              </h3>
                              <div className="flex items-center gap-3 text-sm text-gray-600 flex-wrap">
                                <span className="flex items-center gap-1">
                                  <Phone className="w-4 h-4" />
                                  {lead.phone}
                                </span>
                                {lead.email && (
                                  <span className="flex items-center gap-1">
                                    <Mail className="w-4 h-4" />
                                    {lead.email}
                                  </span>
                                )}
                                <Badge className={statusColors[lead.status]}>
                                  {lead.status.replace('_', ' ')}
                                </Badge>
                                {lead.preferred_language === 'es' && (
                                  <Badge variant="outline">Español</Badge>
                                )}
                                {lead.sms_opt_in && !lead.sms_opt_out && (
                                  <Badge className="bg-green-100 text-green-800">
                                    <MessageSquare className="w-3 h-3 mr-1" />
                                    SMS Opted-In
                                  </Badge>
                                )}
                                {lead.sms_opt_out && (
                                  <Badge variant="outline" className="text-gray-500">
                                    SMS Opted-Out
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 mb-3">
                            {lead.service_interest && (
                              <div>
                                <span className="text-xs text-gray-500">Service Interest:</span>
                                <div className="font-medium text-gray-900">{lead.service_interest}</div>
                              </div>
                            )}
                            {lead.city && (
                              <div>
                                <span className="text-xs text-gray-500">Location:</span>
                                <div className="font-medium text-gray-900">{lead.city}</div>
                              </div>
                            )}
                            {lead.estimated_budget && (
                              <div>
                                <span className="text-xs text-gray-500">Budget:</span>
                                <div className="font-medium text-gray-900">{lead.estimated_budget}</div>
                              </div>
                            )}
                            {lead.callback_requested && lead.callback_date && (
                              <div>
                                <span className="text-xs text-gray-500">Callback:</span>
                                <div className="font-medium text-gray-900 flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {format(new Date(lead.callback_date), 'PP')}
                                </div>
                              </div>
                            )}
                          </div>

                          {lead.project_description && (
                            <p className="text-gray-600 text-sm mb-3">{lead.project_description}</p>
                          )}

                          <div className="text-xs text-gray-500">
                            Created: {format(new Date(lead.created_date), 'PPp')}
                            {lead.last_follow_up && ` · Last follow-up: ${format(new Date(lead.last_follow_up), 'PP')}`}
                            {lead.follow_up_count > 0 && ` · ${lead.follow_up_count} follow-ups sent`}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 lg:w-48">
                          <Select
                            value={lead.status}
                            onValueChange={(value) => handleUpdateStatus(lead.id, value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="contacted">Contacted</SelectItem>
                              <SelectItem value="estimate_sent">Estimate Sent</SelectItem>
                              <SelectItem value="callback_scheduled">Callback Scheduled</SelectItem>
                              <SelectItem value="converted">Converted</SelectItem>
                              <SelectItem value="not_interested">Not Interested</SelectItem>
                            </SelectContent>
                          </Select>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => sendFollowUpMutation.mutate(lead)}
                            disabled={!lead.email || sendFollowUpMutation.isPending}
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Send Email
                          </Button>

                          {lead.sms_opt_in && !lead.sms_opt_out && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-green-50 hover:bg-green-100"
                              onClick={() => sendSMSMutation.mutate({ lead, messageType: 'estimate_followup' })}
                              disabled={sendSMSMutation.isPending}
                            >
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Send SMS
                            </Button>
                          )}

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" onClick={() => setSelectedLead(lead)}>
                                <FileText className="w-4 h-4 mr-2" />
                                Add Notes
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Add Notes for {lead.full_name}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                {lead.notes && (
                                  <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
                                    <div className="text-xs text-gray-500 mb-2">Previous Notes:</div>
                                    <div className="text-sm text-gray-700 whitespace-pre-wrap">{lead.notes}</div>
                                  </div>
                                )}
                                <Textarea
                                  placeholder="Add new notes..."
                                  value={notes}
                                  onChange={(e) => setNotes(e.target.value)}
                                  rows={4}
                                />
                                <Button onClick={() => handleAddNotes(lead)} disabled={!notes}>
                                  Save Notes
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredLeads.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No leads found with the selected filter.
              </div>
            )}
          </TabsContent>

          <TabsContent value="workflows">
            <WorkflowManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}