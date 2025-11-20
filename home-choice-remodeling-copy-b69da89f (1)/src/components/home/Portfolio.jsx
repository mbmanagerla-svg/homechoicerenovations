import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { useLanguage } from "../../Layout";

export default function Portfolio() {
  const { language } = useLanguage();

  const translations = {
    en: {
      title: "Recent Home Choice Renovations Projects in Los Angeles",
      subtitle:
        "Before and after photos of kitchens, bathrooms and ADUs remodeled for families across Los Angeles using our flexible financing options.",
      projects: [
        {
          title: "Kitchen Remodel – Van Nuys",
          location: "Van Nuys, CA",
          description:
            "Latino family wanting a modern, brighter kitchen with financing. New cabinets, countertops and lighting. Completed in 3 weeks.",
          before:
            "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&q=80",
          after:
            "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=800&q=80",
          altBefore:
            "Old dark kitchen in Van Nuys before home remodeling by Home Choice Renovations",
          altAfter:
            "Modern bright kitchen in Van Nuys after full renovation by Home Choice Renovations",
        },
        {
          title: "Bathroom Renovation – Pacoima",
          location: "Pacoima, CA",
          description:
            "Complete bathroom renovation with new tile, shower and vanity. Flexible payment plan made the project possible. Finished in 2 weeks.",
          before:
            "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80",
          after:
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
          altBefore:
            "Small outdated bathroom in Pacoima before renovation by Home Choice Renovations",
          altAfter:
            "Renovated modern bathroom in Pacoima with new tile and fixtures",
        },
        {
          title: "ADU Construction – Glendale",
          location: "Glendale, CA",
          description:
            "New 500 sq ft ADU for extended family with full kitchen and bathroom. Financing helped the family build extra space without paying everything upfront.",
          before:
            "https://images.unsplash.com/photo-1581858726788-75bc0f1a4e06?w=800&q=80",
          after:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
          altBefore:
            "Backyard area in Glendale before ADU construction by Home Choice Renovations",
          altAfter:
            "New ADU construction in Glendale with modern exterior design",
        },
      ],
    },
    es: {
      title: "Proyectos Recientes de Home Choice Renovations en Los Ángeles",
      subtitle:
        "Antes y después de cocinas, baños y ADUs que hemos renovado para familias en Los Ángeles utilizando nuestros planes de financiamiento flexibles.",
      projects: [
        {
          title: "Remodelación de Cocina – Van Nuys",
          location: "Van Nuys, CA",
          description:
            "Familia Latina buscando una cocina moderna y más iluminada con financiamiento. Nuevos gabinetes, encimeras e iluminación. Completado en 3 semanas.",
          before:
            "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&q=80",
          after:
            "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=800&q=80",
          altBefore:
            "Cocina antigua y oscura en Van Nuys antes de la remodelación de Home Choice Renovations",
          altAfter:
            "Cocina moderna y luminosa en Van Nuys después de la renovación completa",
        },
        {
          title: "Renovación de Baño – Pacoima",
          location: "Pacoima, CA",
          description:
            "Renovación completa de baño con nuevo azulejo, regadera y vanity. El plan de pago flexible hizo posible el proyecto. Terminado en 2 semanas.",
          before:
            "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80",
          after:
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
          altBefore:
            "Baño pequeño y anticuado en Pacoima antes de la renovación",
          altAfter:
            "Baño moderno renovado en Pacoima con nuevo azulejo y accesorios",
        },
        {
          title: "Construcción de ADU – Glendale",
          location: "Glendale, CA",
          description:
            "Nuevo ADU de 500 pies cuadrados para familia extendida con cocina y baño completo. El financiamiento ayudó a construir espacio extra sin pagar todo de una vez.",
          before:
            "https://images.unsplash.com/photo-1581858726788-75bc0f1a4e06?w=800&q=80",
          after:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
          altBefore:
            "Patio trasero en Glendale antes de la construcción de ADU de Home Choice Renovations",
          altAfter:
            "Nueva construcción de ADU en Glendale con diseño exterior moderno",
        },
      ],
    },
  };

  const t = translations[language];

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            id="portfolio-heading"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            {t.title}
          </h2>
          <p className="text-xl text-gray-600">{t.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.projects.map((project, index) => (
            <motion.article
              key={index}
              itemScope
              itemType="https://schema.org/Project"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-shadow h-full">
                <div className="grid grid-cols-2 gap-2 p-2 bg-gray-100">
                  <div className="relative">
                    <img
                      src={project.before}
                      alt={project.altBefore}
                      className="w-full h-48 object-cover rounded"
                      loading="lazy"
                      decoding="async"
                    />
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                      {language === "en" ? "BEFORE" : "ANTES"}
                    </Badge>
                  </div>
                  <div className="relative">
                    <img
                      src={project.after}
                      alt={project.altAfter}
                      className="w-full h-48 object-cover rounded"
                      loading="lazy"
                      decoding="async"
                    />
                    <Badge className="absolute top-2 left-2 bg-green-500 text-white">
                      {language === "en" ? "AFTER" : "DESPUÉS"}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-[#1F3A5F] mb-3">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                    <span
                      className="text-sm font-semibold"
                      itemProp="areaServed"
                    >
                      {project.location}
                    </span>
                  </div>
                  <h3
                    className="text-xl font-bold text-gray-900 mb-3"
                    itemProp="name"
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-gray-600 leading-relaxed"
                    itemProp="description"
                  >
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}