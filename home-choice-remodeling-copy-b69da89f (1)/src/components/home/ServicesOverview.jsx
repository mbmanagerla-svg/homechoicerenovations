import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "../../Layout";

export default function ServicesOverview() {
  const { language } = useLanguage();

  const translations = {
    en: {
      title: "Home Choice Renovations – Complete Home Remodeling in Los Angeles",
      subtitle:
        "Full-service home remodeling company in Los Angeles: kitchens, bathrooms, roofing, flooring, windows, doors and ADUs, managed from start to finish.",
      benefits: [
        "Increase your home value with premium materials and professional installation",
        "Transform outdated kitchens and bathrooms into modern spaces",
        "Roofing and exterior upgrades to protect and beautify your property",
        "Energy-efficient windows, doors and insulation to reduce utility bills",
        "ADU construction for extended family or extra rental income",
        "English and Spanish speaking team for Los Angeles homeowners",
      ],
    },
    es: {
      title: "Home Choice Renovations – Remodelación Completa del Hogar en Los Ángeles",
      subtitle:
        "Empresa de remodelación de casas en Los Ángeles: cocinas, baños, techos, pisos, ventanas, puertas y ADUs, manejando su proyecto de inicio a fin.",
      benefits: [
        "Aumente el valor de su casa con materiales premium e instalación profesional",
        "Transforme cocinas y baños antiguos en espacios modernos",
        "Mejoras de techos y exteriores para proteger y embellecer su propiedad",
        "Ventanas, puertas y aislamiento de alta eficiencia para reducir servicios",
        "Construcción de ADU para familia extendida o ingresos por renta",
        "Equipo que habla inglés y español para propietarios de Los Ángeles",
      ],
    },
  };

  const t = translations[language];

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {t.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-lg text-gray-800 font-medium">
                  {benefit}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}