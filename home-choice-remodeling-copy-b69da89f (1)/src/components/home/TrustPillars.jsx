import React from "react";
import { motion } from "framer-motion";
import { Shield, Building2, Award, Users } from "lucide-react";
import { useLanguage } from "../../Layout";

export default function TrustPillars() {
  const { language } = useLanguage();

  const translations = {
    en: {
      label: "Why homeowners trust us",
      title: "Licensed, Experienced & Highly Rated",
      subtitle:
        "Home Choice Renovations — by Power Style. Backed by more than 16 years of construction and renovation experience in California.",
      pillars: [
        "Licensed & Insured · CSLB #1088270",
        "16+ years of renovation and construction experience",
        "Premium materials and long-lasting workmanship",
        "Trusted by families across Los Angeles"
      ]
    },
    es: {
      label: "Por qué los clientes confían en nosotros",
      title: "Licenciados, Experimentados y Altamente Calificados",
      subtitle:
        "Home Choice Renovations — by Power Style. Respaldados por más de 16 años de experiencia en construcción y renovación en California.",
      pillars: [
        "Licenciados y Asegurados · CSLB #1088270",
        "Más de 16 años de experiencia en renovaciones y construcción",
        "Materiales premium y trabajo duradero",
        "Confiado por familias en todo Los Ángeles"
      ]
    }
  };

  const t = translations[language];
  const icons = [Shield, Building2, Award, Users];

  return (
    <section
      id="trust"
      className="py-20 bg-white border-y border-gray-200 scroll-mt-[120px]"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-1.5 bg-[#F5E9BE] text-[#2D3142] text-xs font-semibold rounded-full uppercase tracking-wide mb-4">
            {t.label}
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>

          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Pillars grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.pillars.map((pillar, index) => {
              const Icon = icons[index];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-16 h-16 flex items-center justify-center bg-[#1F3A5F]/10 rounded-xl mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-8 h-8 text-[#1F3A5F]" />
                  </div>

                  <p className="font-semibold text-gray-800 text-sm leading-relaxed">
                    {pillar}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}