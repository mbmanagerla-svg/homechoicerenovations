import React from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Mail, AlertCircle, CheckCircle } from "lucide-react";
import { format } from "date-fns";

export default function WorkflowManager() {
  const { data: workflows = [] } = useQuery({
    queryKey: ["workflows", "all"],
    queryFn: () => base44.entities.Workflow.list("-created_date", 100),
  });

  const { data: leads = [] } = useQuery({
    queryKey: ["leads"],
    queryFn: () => base44.entities.Lead.list("-created_date"),
  });

  const getLeadName = (leadId) => {
    const lead = leads.find(l => l.id === leadId);
    return lead?.full_name || "Unknown Lead";
  };

  const pendingWorkflows = workflows.filter(w => !w.executed);
  const executedWorkflows = workflows.filter(w => w.executed);

  const workflowIcons = {
    email_sequence: Mail,
    reminder: AlertCircle,
    status_update: CheckCircle
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Automated Workflows Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Pending Workflows</div>
              <div className="text-3xl font-bold text-blue-600">{pendingWorkflows.length}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Executed Today</div>
              <div className="text-3xl font-bold text-green-600">
                {executedWorkflows.filter(w => 
                  new Date(w.executed_date).toDateString() === new Date().toDateString()
                ).length}
              </div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Total Automated</div>
              <div className="text-3xl font-bold text-orange-600">{workflows.length}</div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 mb-3">Pending Workflows</h3>
            {pendingWorkflows.length === 0 ? (
              <p className="text-gray-500 text-sm">No pending workflows</p>
            ) : (
              pendingWorkflows.map(workflow => {
                const Icon = workflowIcons[workflow.workflow_type] || Clock;
                return (
                  <div key={workflow.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900">{getLeadName(workflow.lead_id)}</div>
                        <div className="text-sm text-gray-600">
                          {workflow.workflow_type.replace('_', ' ')} - {workflow.action || 'N/A'}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">
                        <Clock className="w-3 h-3 mr-1" />
                        {format(new Date(workflow.scheduled_date), 'MMM d, h:mm a')}
                      </Badge>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="space-y-3 mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Recently Executed</h3>
            {executedWorkflows.slice(0, 5).map(workflow => {
              const Icon = workflowIcons[workflow.workflow_type] || CheckCircle;
              return (
                <div key={workflow.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium text-gray-900">{getLeadName(workflow.lead_id)}</div>
                      <div className="text-sm text-gray-600">
                        {workflow.workflow_type.replace('_', ' ')} - {workflow.action || 'N/A'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {format(new Date(workflow.executed_date), 'MMM d, h:mm a')}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}