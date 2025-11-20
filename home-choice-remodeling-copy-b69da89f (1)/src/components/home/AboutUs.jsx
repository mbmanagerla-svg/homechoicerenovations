import React from "react";
import { motion } from "framer-motion";
import { Award, Users, Heart } from "lucide-react";
import { useLanguage } from "../../Layout";

export default function AboutUs() {
  const { language } = useLanguage();

  const translations = {
    en: {
      eyebrow: "Who we are",
      title: "About Home Choice Renovations — by Power Style",
      text:
        "Home Choice Renovations — by Power Style is a licensed and insured home remodeling contractor in Los Angeles with more than 16 years of experience in California construction. We specialize in full home renovations, kitchen and bathroom remodeling, roofing, flooring, windows, doors and ADUs. We proudly serve Los Angeles homeowners — especially the Latino community — with transparent pricing, clear communication, professional craftsmanship and flexible financing where you can start paying up to 60 days after the project is completed. Our mission is simple: create beautiful, long-lasting spaces with honesty, clarity and exceptional results for every family we work with.",
    },
    es: {
      eyebrow: "Quiénes somos",
      title: "Acerca de Home Choice Renovations — by Power Style",
      text:
        "Home Choice Renovations — by Power Style es un contratista de remodelación de casas licenciado y asegurado en Los Ángeles con más de 16 años de experiencia en construcción en California. Nos especializamos en renovaciones completas del hogar, remodelación de cocinas y baños, techos, pisos, ventanas, puertas y ADUs. Servimos con orgullo a los propietarios de viviendas en Los Ángeles — especialmente a la comunidad Latina — con precios transparentes, comunicación clara, trabajo profesional y financiamiento flexible con el que puede comenzar a pagar hasta 60 días después de completado el proyecto. Nuestra misión es simple: crear espacios hermosos y duraderos con honestidad, claridad y resultados excepcionales para cada familia con la que trabajamos.",
    },
  };

  const t = translations[language];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Eyebrow */}
          <p className="text-sm font-semibold tracking-wide text-[#C9A961] uppercase mb-3 text-center">
            {t.eyebrow}
          </p>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
            {t.title}
          </h2>

          {/* Main text block */}
          <div className="bg-gradient-to-br from-[#1F3A5F]/5 to-gray-50 rounded-2xl p-8 md:p-12 mb-12">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
              {t.text}
            </p>
          </div>

          {/* 3 pillars */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Premium Quality */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[#1F3A5F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-[#1F3A5F]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                {language === "en" ? "Premium Quality" : "Calidad Premium"}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {language === "en"
                  ? "Licensed professionals with 16+ years of California home remodeling experience."
                  : "Profesionales licenciados con más de 16 años de experiencia en remodelación de viviendas en California."}
              </p>
            </motion.div>

            {/* Community Focus */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                {language === "en" ? "Community Focus" : "Enfoque Comunitario"}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {language === "en"
                  ? "Bilingual team (English–Spanish) serving diverse families across Los Angeles."
                  : "Equipo bilingüe (inglés–español) sirviendo a familias diversas en todo Los Ángeles."}
              </p>
            </motion.div>

            {/* Honest Pricing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[#C9A961]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-[#C9A961]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                {language === "en" ? "Honest Pricing" : "Precios Honestos"}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {language === "en"
                  ? "Transparent quotes, clear scopes and no hidden fees."
                  : "Cotizaciones transparentes, alcances claros y sin cargos ocultos."}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}