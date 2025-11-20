import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { base44 } from "@/api/base44Client";
import { Loader2, CheckCircle } from "lucide-react";
import { useLanguage } from "../../Layout";

export default function LeadCaptureForm({ onSuccess }) {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    service_interest: "",
    city: "",
    estimated_budget: "",
    project_description: "",
    sms_opt_in: false,
    preferred_language: language
  });

  const translations = {
    en: {
      title: "Get Your Free Estimate",
      name: "Full Name",
      phone: "Phone Number",
      email: "Email",
      service: "Service Interest",
      serviceOptions: ["Kitchen Remodeling", "Bathroom Remodeling", "Roofing", "ADU Construction", "Flooring", "Other"],
      city: "City",
      budget: "Estimated Budget",
      budgetOptions: ["$5,000 - $15,000", "$15,000 - $30,000", "$30,000 - $50,000", "$50,000+"],
      description: "Project Description",
      descriptionPlaceholder: "Tell us about your project...",
      smsOptIn: "Send me SMS updates and reminders (standard rates may apply)",
      submit: "Get My Free Estimate",
      successTitle: "Request Received!",
      successMessage: "We'll contact you within 24 hours to schedule your free home visit."
    },
    es: {
      title: "Obtenga Su Estimado Gratis",
      name: "Nombre Completo",
      phone: "Número de Teléfono",
      email: "Correo Electrónico",
      service: "Interés en Servicio",
      serviceOptions: ["Remodelación de Cocina", "Remodelación de Baño", "Techos", "Construcción de ADU", "Pisos", "Otro"],
      city: "Ciudad",
      budget: "Presupuesto Estimado",
      budgetOptions: ["$5,000 - $15,000", "$15,000 - $30,000", "$30,000 - $50,000", "$50,000+"],
      description: "Descripción del Proyecto",
      descriptionPlaceholder: "Cuéntenos sobre su proyecto...",
      smsOptIn: "Enviarme actualizaciones y recordatorios por SMS (pueden aplicar tarifas estándar)",
      submit: "Obtener Mi Estimado Gratis",
      successTitle: "¡Solicitud Recibida!",
      successMessage: "Lo contactaremos dentro de 24 horas para programar su visita a domicilio gratuita."
    }
  };

  const t = translations[language];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const lead = await base44.entities.Lead.create(formData);

      // Track lead submission in analytics
      const sessionId = sessionStorage.getItem('analytics_session_id') || 'unknown';
      await base44.entities.Analytics.create({
        event_type: "lead_submission",
        session_id: sessionId,
        page_name: "Home",
        language: language,
        metadata: {
          service_interest: formData.service_interest,
          city: formData.city,
          estimated_budget: formData.estimated_budget
        }
      });

      const emailContent = language === 'en' ? {
        subject: "Your Free Estimate Request - Home Choice",
        body: `
Dear ${formData.full_name},

Thank you for requesting a free estimate from Home Choice Remodeling!

Your Request Details:
- Service: ${formData.service_interest}
- Location: ${formData.city}
- Budget: ${formData.estimated_budget}

What's Next:
1. We'll review your project details
2. Contact you within 24 hours
3. Schedule your free home visit
4. Discuss financing options (pay later up to 60 days)

Questions? Call us at 310.460.9427 or reply to this email.

Best regards,
Home Choice Remodeling
contact@homechoiceremodelings.com
        `
      } : {
        subject: "Su Solicitud de Estimado Gratis - Home Choice",
        body: `
Estimado/a ${formData.full_name},

¡Gracias por solicitar un estimado gratis de Home Choice Remodeling!

Detalles de Su Solicitud:
- Servicio: ${formData.service_interest}
- Ubicación: ${formData.city}
- Presupuesto: ${formData.estimated_budget}

Próximos Pasos:
1. Revisaremos los detalles de su proyecto
2. Lo contactaremos dentro de 24 horas
3. Programaremos su visita a domicilio gratuita
4. Discutiremos opciones de financiamiento (pague después hasta 60 días)

¿Preguntas? Llámenos al 310.460.9427 o responda a este correo.

Saludos cordiales,
Home Choice Remodeling
contact@homechoiceremodelings.com
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
      if (onSuccess) onSuccess();
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
        <p className="text-lg text-gray-600">{t.successMessage}</p>
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
              <Label>{t.service}</Label>
              <Select value={formData.service_interest} onValueChange={(value) => setFormData({ ...formData, service_interest: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'en' ? 'Select service' : 'Seleccione servicio'} />
                </SelectTrigger>
                <SelectContent>
                  {t.serviceOptions.map((option, index) => (
                    <SelectItem key={index} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>{t.city}</Label>
              <Input
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label>{t.budget}</Label>
            <Select value={formData.estimated_budget} onValueChange={(value) => setFormData({ ...formData, estimated_budget: value })}>
              <SelectTrigger>
                <SelectValue placeholder={language === 'en' ? 'Select budget range' : 'Seleccione rango de presupuesto'} />
              </SelectTrigger>
              <SelectContent>
                {t.budgetOptions.map((option, index) => (
                  <SelectItem key={index} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>{t.description}</Label>
            <Textarea
              rows={3}
              placeholder={t.descriptionPlaceholder}
              value={formData.project_description}
              onChange={(e) => setFormData({ ...formData, project_description: e.target.value })}
            />
          </div>

          <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg">
            <Checkbox
              id="sms-opt-in"
              checked={formData.sms_opt_in}
              onCheckedChange={(checked) => setFormData({ ...formData, sms_opt_in: checked })}
            />
            <Label htmlFor="sms-opt-in" className="text-sm cursor-pointer">
              {t.smsOptIn}
            </Label>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                {language === 'en' ? 'Submitting...' : 'Enviando...'}
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