import React from "react";
import { base44 } from "@/api/base44Client";

// SMS Templates with compliance
export const SMS_TEMPLATES = {
  en: {
    estimate_followup: (name) => 
      `Hi ${name}! This is Home Choice Remodeling. We sent your estimate a few days ago. Have questions? Call us at 310.460.9427. Reply STOP to opt-out.`,
    
    callback_reminder: (name, date) => 
      `Hi ${name}! Reminder: Your financing consultation is scheduled for ${date}. We'll call at your preferred time. Questions? 310.460.9427. Reply STOP to opt-out.`,
    
    estimate_ready: (name) => 
      `Hi ${name}! Your estimate is ready. Check your email or call us at 310.460.9427 to discuss. Reply STOP to opt-out.`,
    
    financing_info: (name) => 
      `${name}, learn about our 60-day payment delay & flexible financing! Call 310.460.9427 or visit: homechoiceremodelings.com. Reply STOP to opt-out.`,
    
    appointment_confirmed: (name, date) => 
      `Hi ${name}! Your free home visit is confirmed for ${date}. We'll call to confirm time. 310.460.9427. Reply STOP to opt-out.`
  },
  es: {
    estimate_followup: (name) => 
      `¡Hola ${name}! Somos Home Choice Remodeling. Le enviamos su estimado hace unos días. ¿Preguntas? Llame al 310.460.9427. Responda STOP para cancelar.`,
    
    callback_reminder: (name, date) => 
      `¡Hola ${name}! Recordatorio: Su consulta de financiamiento está programada para ${date}. Llamaremos a su hora preferida. ¿Preguntas? 310.460.9427. Responda STOP para cancelar.`,
    
    estimate_ready: (name) => 
      `¡Hola ${name}! Su estimado está listo. Revise su correo o llámenos al 310.460.9427 para discutir. Responda STOP para cancelar.`,
    
    financing_info: (name) => 
      `${name}, ¡conozca nuestro programa de pago con 60 días de retraso y financiamiento flexible! Llame 310.460.9427 o visite: homechoiceremodelings.com. Responda STOP para cancelar.`,
    
    appointment_confirmed: (name, date) => 
      `¡Hola ${name}! Su visita a domicilio gratis está confirmada para ${date}. Llamaremos para confirmar hora. 310.460.9427. Responda STOP para cancelar.`
  }
};

// Simulated SMS sending function
// In production, this would integrate with Twilio, AWS SNS, or similar service
export async function sendSMS(phone, message, leadId) {
  try {
    // For now, we'll log the SMS and store it in notes
    // In production, replace this with actual SMS API call
    console.log(`SMS to ${phone}: ${message}`);
    
    // Store SMS in lead notes for tracking
    const lead = await base44.entities.Lead.filter({ id: leadId });
    if (lead.length > 0) {
      const currentNotes = lead[0].notes || '';
      const timestamp = new Date().toISOString();
      const smsLog = `\n[SMS ${timestamp}] ${message}`;
      
      await base44.entities.Lead.update(leadId, {
        notes: currentNotes + smsLog,
        last_follow_up: timestamp
      });
    }
    
    // TODO: Replace with actual SMS provider
    // Example with Twilio (requires backend functions):
    // await base44.integrations.SMS.Send({
    //   to: phone,
    //   body: message
    // });
    
    return { success: true, message: 'SMS sent (simulated)' };
  } catch (error) {
    console.error('SMS send error:', error);
    return { success: false, error: error.message };
  }
}

// Check if lead opted out
export async function checkOptOut(leadId) {
  const lead = await base44.entities.Lead.filter({ id: leadId });
  if (lead.length > 0) {
    return lead[0].sms_opt_out || false;
  }
  return false;
}

// Handle opt-out request
export async function handleOptOut(leadId) {
  await base44.entities.Lead.update(leadId, {
    sms_opt_out: true,
    sms_opt_in: false
  });
}

// Send SMS if opted in and not opted out
export async function sendSMSIfOptedIn(lead, messageType, additionalData = {}) {
  if (!lead.sms_opt_in || lead.sms_opt_out || !lead.phone) {
    return { success: false, reason: 'Not opted in or opted out' };
  }
  
  const lang = lead.preferred_language || 'en';
  const templates = SMS_TEMPLATES[lang];
  
  let message = '';
  
  switch (messageType) {
    case 'estimate_followup':
      message = templates.estimate_followup(lead.full_name);
      break;
    case 'callback_reminder':
      message = templates.callback_reminder(lead.full_name, additionalData.date);
      break;
    case 'estimate_ready':
      message = templates.estimate_ready(lead.full_name);
      break;
    case 'financing_info':
      message = templates.financing_info(lead.full_name);
      break;
    case 'appointment_confirmed':
      message = templates.appointment_confirmed(lead.full_name, additionalData.date);
      break;
    default:
      return { success: false, reason: 'Invalid message type' };
  }
  
  return await sendSMS(lead.phone, message, lead.id);
}

export default function SMSManager() {
  return null; // This is a utility component
}