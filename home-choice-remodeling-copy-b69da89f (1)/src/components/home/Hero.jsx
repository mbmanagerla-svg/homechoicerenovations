import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Award } from "lucide-react";
import { useLanguage } from "../../Layout";
import LeadsModal from "./LeadsModal";

export default function Hero() {
  const { language } = useLanguage();
  const [showModal, setShowModal] = useState(false);

  const translations = {
    en: {
      eyebrow: "Licensed & Insured Home Remodeling Contractor in Los Angeles",
      headline: "Premium Home Renovations in Los Angeles",
      subheadline:
        "Home Choice Renovations — by Power Style. Licensed and insured remodeling contractor specializing in kitchens, bathrooms, roofing, flooring, windows, doors and ADUs. Flexible financing where you can start paying up to 60 days after the project is completed. Serving Los Angeles, San Fernando Valley, Glendale, Pasadena, Burbank, Inglewood and nearby areas.",
      badge: "Trusted by homeowners across Los Angeles County",
      cta1: "Get a Free In-Home Remodeling Estimate",
      cta2: "See Financing Options",
      ariaCta1:
        "Open form to get a free in-home remodeling estimate in Los Angeles",
      ariaCta2:
        "Scroll to see home renovation financing options available in Los Angeles",
    },
    es: {
      eyebrow:
        "Contratista de Remodelación de Casas Licenciado y Asegurado en Los Ángeles",
      headline: "Remodelaciones Premium de Casas en Los Ángeles",
      subheadline:
        "Home Choice Renovations — by Power Style. Empresa de remodelación licenciada y asegurada, especializada en cocinas, baños, techos, pisos, ventanas, puertas y ADUs. Financiamiento flexible donde puede comenzar a pagar hasta 60 días después de que se termina el proyecto. Atendemos Los Ángeles, Valle de San Fernando, Glendale, Pasadena, Burbank, Inglewood y áreas cercanas.",
      badge: "Confiado por propietarios en todo el condado de Los Ángeles",
      cta1: "Obtener Estimado Gratis en su Casa",
      cta2: "Ver Opciones de Financiamiento",
      ariaCta1:
        "Abrir formulario para obtener un estimado gratis de remodelación en su casa en Los Ángeles",
      ariaCta2:
        "Desplazarse para ver opciones de financiamiento para remodelaciones en Los Ángeles",
    },
  };

  const t = translations[language];

  const scrollToFinancing = () => {
    const element = document.getElementById("financing");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0B1727] pt-[120px] md:pt-[130px]"
      >
        {/* Background image + overlay */}
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&q=80"
            alt={
              language === "en"
                ? "Modern kitchen and living room after a home renovation in Los Angeles"
                : "Cocina y sala modernas después de una remodelación de casa en Los Ángeles"
            }
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/45" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Eyebrow / SEO line */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm md:text-base font-semibold tracking-wide text-[#F5C86E] uppercase mb-4"
            >
              {t.eyebrow}
            </motion.p>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <Badge className="bg-[#F5E9BE] text-[#1A2A44] border-[#F5E9BE] px-4 md:px-6 py-2 text-xs md:text-sm font-semibold inline-flex items-center gap-2">
                <Award className="w-4 h-4" aria-hidden="true" />
                <span className="leading-tight">{t.badge}</span>
              </Badge>
            </motion.div>

            {/* H1 – main SEO heading */}
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              {t.headline}
            </motion.h1>

            {/* Subheadline with keywords */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base md:text-xl lg:text-2xl text-blue-100 mb-10 leading-relaxed max-w-3xl mx-auto"
            >
              {t.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                onClick={() => setShowModal(true)}
                aria-label={t.ariaCta1}
                className="w-full sm:w-auto bg-[#F5C86E] hover:bg-[#F0B84F] text-[#2D3142] text-base md:text-lg px-6 md:px-8 py-6 md:py-7 rounded-lg shadow-xl transition-all duration-200 group font-semibold"
              >
                {t.cta1}
                <ArrowRight
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Button>

              <Button
                size="lg"
                onClick={scrollToFinancing}
                aria-label={t.ariaCta2}
                className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#2D3142] text-base md:text-lg px-6 md:px-8 py-6 md:py-7 rounded-lg font-semibold transition-all duration-200"
              >
                {t.cta2}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <LeadsModal open={showModal} onOpenChange={setShowModal} />
    </>
  );
}