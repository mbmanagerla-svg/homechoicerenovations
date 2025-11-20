import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight, CreditCard } from "lucide-react";
import { useLanguage } from "../../Layout";

export default function FinancingSection() {
  const { language } = useLanguage();

  const translations = {
    en: {
      title: "Flexible Financing for Home Choice Renovations in Los Angeles",
      note: "Financing provided through trusted partners. Subject to approval. No obligation to get a consultation and review your options.",
      benefits: [
        "Start paying up to 60 days after project completion",
        "Flexible monthly payment options adapted to your budget",
        "Financing programs available even with imperfect credit",
        "Fast approval process tailored for Los Angeles homeowners",
      ],
      cta: "Talk to a Financing Specialist",
    },
    es: {
      title:
        "Financiamiento Flexible para Home Choice Renovations en Los Ángeles",
      note: "Financiamiento a través de socios de confianza. Sujeto a aprobación. Sin obligación para recibir una consulta y revisar sus opciones.",
      benefits: [
        "Comience a pagar hasta 60 días después de completado el proyecto",
        "Opciones de pago mensual flexibles adaptadas a su presupuesto",
        "Programas de financiamiento disponibles incluso con crédito imperfecto",
        "Proceso de aprobación rápido para propietarios de Los Ángeles",
      ],
      cta: "Hablar con un especialista en financiamiento",
    },
  };

  const t = translations[language];

  const handleContactSpecialist = () => {
    window.open("https://wa.me/13104609427", "_blank");
  };

  return (
    <section
      id="financing"
      className="py-24 bg-gradient-to-br from-[#1F3A5F] via-[#2D3142] to-[#1F3A5F] relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#C9A961] rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#1F3A5F] rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-[#C9A961] text-[#2D3142] px-6 py-2 rounded-full text-sm font-semibold mb-6">
            <CreditCard className="w-4 h-4" />
            {language === "en"
              ? "Flexible Financing"
              : "Financiamiento flexible"}
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.title}
          </h2>
          <p className="text-sm md:text-base text-blue-100 max-w-xl mx-auto">
            {t.note}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-2 border-[#C9A961]/30">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                  {t.benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: 0.3 + index * 0.1,
                      }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-800 text-lg font-medium leading-tight">
                        {benefit}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center">
                  <Button
                    size="lg"
                    onClick={handleContactSpecialist}
                    className="bg-[#C9A961] hover:bg-[#B89851] text-[#2D3142] text-lg md:text-xl px-8 md:px-10 py-6 md:py-7 rounded-lg shadow-xl hover:shadow-2xl transition-all group font-semibold"
                  >
                    {t.cta}
                    <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}