import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { base44 } from "@/api/base44Client";
import { Loader2, CheckCircle, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useLanguage } from "../../Layout";

export default function CallbackScheduler() {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    callback_date: null,
    time_preference: "",
    notes: "",
    sms_opt_in: false
  });

  const translations = {
    en: {
      title: "Schedule a Call with a Financing Specialist",
      name: "Full Name",
      phone: "Phone Number",
      email: "Email",
      date: "Preferred Date",
      time: "Preferred Time",
      timePlaceholder: "Morning, Afternoon, Evening",
      notes: "Additional Notes",
      notesPlaceholder: "Any questions or specific topics you'd like to discuss?",
      smsOptIn: "Send me SMS appointment reminders (standard rates may apply)",
      submit: "Schedule My Callback",
      successTitle: "Callback Scheduled!",
      successMessage: "Our financing specialist will call you at your preferred time. You'll receive a confirmation email shortly."
    },
    es: {
      title: "Programar Llamada con Especialista en Financiamiento",
      name: "Nombre Completo",
      phone: "Número de Teléfono",
      email: "Correo Electrónico",
      date: "Fecha Preferida",
      time: "Hora Preferida",
      timePlaceholder: "Mañana, Tarde, Noche",
      notes: "Notas Adicionales",
      notesPlaceholder: "¿Alguna pregunta o tema específico que le gustaría discutir?",
      smsOptIn: "Enviarme recordatorios de cita por SMS (pueden aplicar tarifas estándar)",
      submit: "Programar Mi Llamada",
      successTitle: "¡Llamada Programada!",
      successMessage: "Nuestro especialista en financiamiento lo llamará a su hora preferida. Recibirá un correo de confirmación pronto."
    }
  };

  const t = translations[language];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const lead = await base44.entities.Lead.create({
        full_name: formData.full_name,
        phone: formData.phone,
        email: formData.email,
        callback_requested: true,
        callback_date: formData.callback_date,
        notes: `Time preference: ${formData.time_preference}. ${formData.notes}`,
        status: "callback_scheduled",
        service_interest: "Financing consultation",
        preferred_language: language,
        sms_opt_in: formData.sms_opt_in
      });

      // Track callback scheduling in analytics
      const sessionId = sessionStorage.getItem('analytics_session_id') || 'unknown';
      await base44.entities.Analytics.create({
        event_type: "lead_submission",
        session_id: sessionId,
        page_name: "Home",
        language: language,
        metadata: {
          submission_type: "callback_request",
          callback_date: formData.callback_date
        }
      });

      setTimeout(async () => {
        await base44.entities.Lead.update(lead.id, {
          status: "contacted",
          last_follow_up: new Date().toISOString()
        });
      }, 1000);

      const emailContent = language === 'en' ? {
        subject: "Callback Scheduled - Home Choice Financing",
        body: `
Dear ${formData.full_name},

Your callback has been scheduled!

Callback Details:
- Date: ${format(new Date(formData.callback_date), 'MMMM d, yyyy')}
- Time Preference: ${formData.time_preference}
- Phone: ${formData.phone}

Our financing specialist will call you to discuss:
- Flexible payment options
- 60-day payment delay program
- Monthly payment plans
- Fast approval process

Questions before the call? Contact us at 310.460.9427.

Best regards,
Home Choice Remodeling
        `
      } : {
        subject: "Llamada Programada - Financiamiento Home Choice",
        body: `
Estimado/a ${formData.full_name},

¡Su llamada ha sido programada!

Detalles de la Llamada:
- Fecha: ${format(new Date(formData.callback_date), 'd de MMMM, yyyy')}
- Preferencia de Hora: ${formData.time_preference}
- Teléfono: ${formData.phone}

Nuestro especialista en financiamiento lo llamará para discutir:
- Opciones de pago flexibles
- Programa de pago con 60 días de retraso
- Planes de pago mensual
- Proceso de aprobación rápido

¿Preguntas antes de la llamada? Contáctenos al 310.460.9427.

Saludos cordiales,
Home Choice Remodeling
        `
      };

      if (formData.email) {
        await base44.integrations.Core.SendEmail({
          to: formData.email,
          subject: emailContent.subject,
          body: emailContent.body
        });
      }

      setSuccess(true);
    } catch (error) {
      alert(language === 'en' ? 'Something went wrong. Please try again.' : 'Algo salió mal. Por favor intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h3 className="text-3xl font-bold text-gray-900 mb-4">{t.successTitle}</h3>
        <p className="text-lg text-gray-600 max-w-md mx-auto">{t.successMessage}</p>
      </motion.div>
    );
  }

  return (
    <Card>
      <CardContent className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.title}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>{t.name} *</Label>
              <Input
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              />
            </div>
            <div>
              <Label>{t.phone} *</Label>
              <Input
                required
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label>{t.email}</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>{t.date} *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.callback_date ? format(new Date(formData.callback_date), 'PPP') : language === 'en' ? 'Pick a date' : 'Elegir fecha'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.callback_date}
                    onSelect={(date) => setFormData({ ...formData, callback_date: date })}
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>{t.time} *</Label>
              <Input
                required
                placeholder={t.timePlaceholder}
                value={formData.time_preference}
                onChange={(e) => setFormData({ ...formData, time_preference: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label>{t.notes}</Label>
            <Input
              placeholder={t.notesPlaceholder}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg">
            <Checkbox
              id="sms-callback-opt-in"
              checked={formData.sms_opt_in}
              onCheckedChange={(checked) => setFormData({ ...formData, sms_opt_in: checked })}
            />
            <Label htmlFor="sms-callback-opt-in" className="text-sm cursor-pointer">
              {t.smsOptIn}
            </Label>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={loading || !formData.callback_date}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                {language === 'en' ? 'Scheduling...' : 'Programando...'}
              </>
            ) : (
              t.submit
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}