import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "../../Layout";
import LeadsModal from "./LeadsModal";

export default function FinalCTA() {
  const { language } = useLanguage();
  const [showModal, setShowModal] = useState(false);

  const translations = {
    en: {
      headline: "Ready to Transform Your Home Without Paying Upfront?",
      subheadline: "Schedule a free home visit today and discover financing options that let you start paying up to 60 days after the project is completed.",
      cta1: "Schedule My Free Visit",
      cta2: "Chat on WhatsApp (310.460.9427)"
    },
    es: {
      headline: "¿Listo para Transformar Su Casa Sin Pagar por Adelantado?",
      subheadline: "Programe una visita a domicilio gratuita hoy y descubra opciones de financiamiento que le permiten comenzar a pagar hasta 60 días después de completado el proyecto.",
      cta1: "Programar Mi Visita Gratis",
      cta2: "Chatear por WhatsApp (310.460.9427)"
    }
  };

  const t = translations[language];

  return (
    <>
      <section className="py-24 bg-gradient-to-br from-[#1F3A5F] via-[#2D3142] to-[#1F3A5F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#C9A961] rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t.headline}
            </h2>

            <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed">
              {t.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setShowModal(true)}
                className="bg-[#C9A961] hover:bg-[#B89851] text-[#2D3142] text-xl px-10 py-8 rounded-lg shadow-2xl hover:shadow-[#C9A961]/50 transition-all group font-semibold"
              >
                <Calendar className="w-6 h-6 mr-2" />
                {t.cta1}
                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                className="bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xl px-10 py-8 rounded-lg shadow-2xl hover:shadow-[#25D366]/50 transition-all"
                onClick={() => window.open('https://wa.me/13104609427', '_blank')}
              >
                <MessageCircle className="w-6 h-6 mr-2" />
                {t.cta2}
              </Button>
            </div>

            <p className="text-blue-200 mt-8 text-lg">
              {language === 'en' 
                ? 'No obligation • Bilingual team • Fast response'
                : 'Sin obligación • Equipo bilingüe • Respuesta rápida'}
            </p>
          </motion.div>
        </div>
      </section>

      <LeadsModal open={showModal} onOpenChange={setShowModal} />
    </>
  );
}