import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Home, PenTool, CreditCard, Hammer, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../../Layout";

export default function Process() {
  const { language } = useLanguage();

  const translations = {
    en: {
      title: "How Our Process Works",
      steps: [
        "Free home visit & estimate",
        "Design & material selection",
        "Fast financing approval",
        "Professional licensed construction",
        "Final inspection & warranty protection"
      ]
    },
    es: {
      title: "Cómo Funciona Nuestro Proceso",
      steps: [
        "Visita a domicilio y estimado gratis",
        "Diseño y selección de materiales",
        "Aprobación rápida de financiamiento",
        "Construcción profesional licenciada",
        "Inspección final y protección de garantía"
      ]
    }
  };

  const t = translations[language];
  const icons = [Home, PenTool, CreditCard, Hammer, CheckCircle2];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-5 gap-4">
            {t.steps.map((step, index) => {
              const IconComponent = icons[index];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#1F3A5F] to-[#2D3142] text-white text-xl font-bold rounded-full flex items-center justify-center mx-auto mb-4">
                        {index + 1}
                      </div>
                      <div className="w-10 h-10 bg-[#1F3A5F]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-5 h-5 text-[#1F3A5F]" />
                      </div>
                      <p className="text-sm text-gray-800 font-medium leading-tight">
                        {step}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}