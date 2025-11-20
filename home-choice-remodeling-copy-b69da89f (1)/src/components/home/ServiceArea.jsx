import React from "react";
import { motion } from "framer-motion";
import { MapPin, Check } from "lucide-react";
import { useLanguage } from "../../Layout";

export default function ServiceArea() {
  const { language } = useLanguage();

  const translations = {
    en: {
      label: "Service Coverage",
      title: "Serving Los Angeles & Surrounding Cities",
      subtitle:
        "Home Choice Renovations — by Power Style proudly serves homeowners across Los Angeles County, the San Fernando Valley, and selected nearby regions. Our licensed and insured team provides full-service home remodeling, kitchen renovations, roofing, ADUs, and more.",
      areas: [
        "Los Angeles",
        "San Fernando Valley",
        "Glendale",
        "Pasadena",
        "Burbank",
        "Inglewood",
        "Santa Clarita",
        "Long Beach",
        "Lancaster",
        "Palmdale",
        "Orange County (selected areas)",
        "Anaheim",
      ],
      footer:
        "Don’t see your area listed? Contact us — we may still be able to assist you.",
    },

    es: {
      label: "Cobertura de Servicio",
      title: "Sirviendo Los Ángeles y Ciudades Cercanas",
      subtitle:
        "Home Choice Renovations — by Power Style atiende orgullosamente a propietarios en el condado de Los Ángeles, el Valle de San Fernando y regiones cercanas seleccionadas. Nuestro equipo licenciado y asegurado ofrece remodelación completa, cocinas, techos, ADUs y más.",
      areas: [
        "Los Ángeles",
        "Valle de San Fernando",
        "Glendale",
        "Pasadena",
        "Burbank",
        "Inglewood",
        "Santa Clarita",
        "Long Beach",
        "Lancaster",
        "Palmdale",
        "Condado de Orange (áreas seleccionadas)",
        "Anaheim",
      ],
      footer:
        "¿No ve su área en la lista? Contáctenos — es posible que igual podamos ayudarle.",
    },
  };

  const t = translations[language];

  return (
    <section
      id="service-area"
      className="py-20 bg-gradient-to-b from-gray-50 to-white scroll-mt-[120px]"
      itemScope
      itemType="https://schema.org/Service"
    >
      <meta itemProp="serviceType" content="Home Remodeling Service Area" />

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

          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Content Box */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200">
            {/* Title inside box */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <MapPin className="w-8 h-8 text-[#1F3A5F]" />
              <span className="text-2xl font-bold text-gray-900">
                {language === "en" ? "Service Areas" : "Áreas de Servicio"}
              </span>
            </div>

            {/* Areas grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {t.areas.map((area, index) => (
                <motion.div
                  key={index}
                  itemProp="areaServed"
                  content={area}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                  }}
                  className="flex items-center gap-3 p-4 bg-[#1F3A5F]/5 rounded-lg hover:bg-[#1F3A5F]/10 transition-colors"
                >
                  <Check className="w-5 h-5 text-[#1F3A5F] flex-shrink-0" />
                  <span className="text-gray-800 font-semibold">{area}</span>
                </motion.div>
              ))}
            </div>

            {/* Footer message */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg text-center border border-gray-200">
              <p className="text-gray-700 leading-relaxed">{t.footer}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}