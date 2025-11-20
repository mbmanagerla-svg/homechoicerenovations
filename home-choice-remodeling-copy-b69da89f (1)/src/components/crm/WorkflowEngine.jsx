import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { sendSMSIfOptedIn } from "./SMSManager";
import { format } from "date-fns";

export default function WorkflowEngine() {
  const queryClient = useQueryClient();

  const { data: pendingWorkflows = [] } = useQuery({
    queryKey: ["workflows", "pending"],
    queryFn: async () => {
      const workflows = await base44.entities.Workflow.filter({ executed: false });
      return workflows.filter(w => new Date(w.scheduled_date) <= new Date());
    },
    refetchInterval: 60000,
  });

  const { data: leads = [] } = useQuery({
    queryKey: ["leads"],
    queryFn: () => base44.entities.Lead.list("-created_date"),
  });

  const executeWorkflowMutation = useMutation({
    mutationFn: async (workflow) => {
      const lead = leads.find(l => l.id === workflow.lead_id);
      if (!lead) return;

      if (workflow.workflow_type === "email_sequence") {
        await sendFollowUpEmail(lead, workflow.action);
        // Also send SMS if opted in
        await sendSMSIfOptedIn(lead, workflow.action, workflow.metadata);
      } else if (workflow.workflow_type === "reminder") {
        await sendReminderEmail(lead);
      } else if (workflow.workflow_type === "sms_reminder") {
        await sendSMSIfOptedIn(lead, workflow.action, workflow.metadata);
      }

      await base44.entities.Workflow.update(workflow.id, {
        executed: true,
        executed_date: new Date().toISOString()
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["workflows"]);
      queryClient.invalidateQueries(["leads"]);
    },
  });

  useEffect(() => {
    pendingWorkflows.forEach(workflow => {
      executeWorkflowMutation.mutate(workflow);
    });
  }, [pendingWorkflows]);

  return null;
}

async function sendFollowUpEmail(lead, emailType) {
  const lang = lead.preferred_language || 'en';
  
  const emails = {
    estimate_followup: {
      en: {
        subject: "Following Up on Your Estimate Request",
        body: `
Dear ${lead.full_name},

We sent you an estimate a few days ago and wanted to check in!

Have you had a chance to review it? We're here to answer any questions about:
• The project scope and timeline
• Our flexible financing options
• Material selections and design choices
• The 60-day payment delay program

Ready to move forward? Let's schedule your free home visit!

Call us: 310.460.9427
WhatsApp: wa.me/13104609427
Reply to this email anytime

Best regards,
Home Choice Remodeling Team
contact@homechoiceremodelings.com
        `
      },
      es: {
        subject: "Seguimiento de Su Solicitud de Estimado",
        body: `
Estimado/a ${lead.full_name},

Le enviamos un estimado hace unos días y quisimos verificar.

¿Ha tenido la oportunidad de revisarlo? Estamos aquí para responder cualquier pregunta sobre:
• El alcance y cronograma del proyecto
• Nuestras opciones flexibles de financiamiento
• Selecciones de materiales y opciones de diseño
• El programa de pago con 60 días de retraso

¿Listo para seguir adelante? ¡Programemos su visita gratuita a domicilio!

Llámenos: 310.460.9427
WhatsApp: wa.me/13104609427
Responda a este correo en cualquier momento

Saludos cordiales,
Equipo de Home Choice Remodeling
contact@homechoiceremodelings.com
        `
      }
    },
    contacted_followup: {
      en: {
        subject: "Great Speaking With You - Home Choice",
        body: `
Dear ${lead.full_name},

It was great speaking with you! As discussed, here's a quick recap:

Next Steps:
• Review the information we provided
• Consider our financing options
• Schedule your free home visit when ready

We're excited to help transform your home with our flexible payment options.

Questions? Call us at 310.460.9427 or reply to this email.

Best regards,
Home Choice Remodeling
contact@homechoiceremodelings.com
        `
      },
      es: {
        subject: "Fue un Placer Hablar Con Usted - Home Choice",
        body: `
Estimado/a ${lead.full_name},

¡Fue un placer hablar con usted! Como se discutió, aquí hay un resumen rápido:

Próximos Pasos:
• Revise la información que proporcionamos
• Considere nuestras opciones de financiamiento
• Programe su visita gratuita a domicilio cuando esté listo

Estamos emocionados de ayudar a transformar su hogar con nuestras opciones flexibles de pago.

¿Preguntas? Llámenos al 310.460.9427 o responda a este correo.

Saludos cordiales,
Home Choice Remodeling
contact@homechoiceremodelings.com
        `
      }
    }
  };

  const email = emails[emailType]?.[lang] || emails[emailType]?.en;
  
  if (lead.email && email) {
    await base44.integrations.Core.SendEmail({
      to: lead.email,
      subject: email.subject,
      body: email.body
    });

    await base44.entities.Lead.update(lead.id, {
      follow_up_count: (lead.follow_up_count || 0) + 1,
      last_follow_up: new Date().toISOString()
    });
  }
}

async function sendReminderEmail(lead) {
  const lang = lead.preferred_language || 'en';
  
  const reminderEmail = {
    en: {
      subject: `REMINDER: Follow up with ${lead.full_name}`,
      body: `
Sales Team Alert:

Lead requires follow-up:
Name: ${lead.full_name}
Phone: ${lead.phone}
Email: ${lead.email}
Status: ${lead.status}
Last Activity: ${lead.last_follow_up || lead.created_date}
Service Interest: ${lead.service_interest || 'N/A'}
SMS Opt-in: ${lead.sms_opt_in ? 'Yes' : 'No'}

This lead hasn't been contacted in over 5 days. Please reach out today.

Contact: 310.460.9427
      `
    },
    es: {
      subject: `RECORDATORIO: Hacer seguimiento con ${lead.full_name}`,
      body: `
Alerta del Equipo de Ventas:

Lead requiere seguimiento:
Nombre: ${lead.full_name}
Teléfono: ${lead.phone}
Email: ${lead.email}
Estado: ${lead.status}
Última Actividad: ${lead.last_follow_up || lead.created_date}
Interés en Servicio: ${lead.service_interest || 'N/A'}
SMS Opt-in: ${lead.sms_opt_in ? 'Sí' : 'No'}

Este lead no ha sido contactado en más de 5 días. Por favor, comuníquese hoy.

Contacto: 310.460.9427
      `
    }
  };

  const email = reminderEmail[lang];
  
  await base44.integrations.Core.SendEmail({
    to: "contact@homechoiceremodelings.com",
    subject: email.subject,
    body: email.body
  });
}