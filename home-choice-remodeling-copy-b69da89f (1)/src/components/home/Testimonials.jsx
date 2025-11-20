import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "../../Layout";

export default function Testimonials() {
  const { language } = useLanguage();

  const translations = {
    en: {
      label: "Client Experiences",
      title: "Trusted by Homeowners Across Los Angeles",
      subtitle:
        "Real reviews from families who trusted Home Choice Renovations — by Power Style for kitchen remodeling, bathroom renovations, roofing and ADU projects in Los Angeles.",
      testimonials: [
        {
          text: "Our kitchen renovation in Pasadena looks incredible. Financing made it easy and we didn’t have to pay everything upfront.",
          author: "María G.",
          location: "Pasadena, CA",
        },
        {
          text: "They explained everything in Spanish. Great experience from start to finish on our home remodeling project.",
          author: "José R.",
          location: "Van Nuys, CA",
        },
        {
          text: "Bathroom renovation in Van Nuys finished on time and with amazing quality. Very clean and professional team.",
          author: "Carmen S.",
          location: "Van Nuys, CA",
        },
        {
          text: "Honest pricing, clean work, and premium materials. Highly recommend Home Choice Renovations for any home renovation in Los Angeles!",
          author: "Roberto M.",
          location: "Glendale, CA",
        },
      ],
    },
    es: {
      label: "Experiencias Reales",
      title: "Confiado por Propietarios en Los Ángeles",
      subtitle:
        "Reseñas reales de familias que confiaron en Home Choice Renovations — by Power Style para remodelación de cocinas, baños, techos y ADUs en Los Ángeles.",
      testimonials: [
        {
          text: "Nuestra renovación de cocina en Pasadena se ve increíble. El financiamiento lo hizo fácil y no tuvimos que pagar todo de una sola vez.",
          author: "María G.",
          location: "Pasadena, CA",
        },
        {
          text: "Explicaron todo en español. Gran experiencia de principio a fin con nuestro proyecto de remodelación.",
          author: "José R.",
          location: "Van Nuys, CA",
        },
        {
          text: "Renovación de baño en Van Nuys terminada a tiempo y con calidad increíble. Equipo muy limpio y profesional.",
          author: "Carmen S.",
          location: "Van Nuys, CA",
        },
        {
          text: "Precios honestos, trabajo limpio y materiales premium. Muy recomendado Home Choice Renovations para cualquier remodelación en Los Ángeles.",
          author: "Roberto M.",
          location: "Glendale, CA",
        },
      ],
    },
  };

  const t = translations[language];

  return (
    <section
      id="testimonials"
      className="py-20 bg-white scroll-mt-[120px]"
      aria-labelledby="testimonials-heading"
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

          <h2
            id="testimonials-heading"
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            {t.title}
          </h2>

          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {t.testimonials.map((testimonial, index) => (
            <motion.article
              key={index}
              itemScope
              itemType="https://schema.org/Review"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <Quote className="w-10 h-10 text-[#1F3A5F]/20 mb-4" aria-hidden="true" />

                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-4" aria-label="5 star review">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  {/* Review text */}
                  <p className="text-gray-700 mb-6 leading-relaxed" itemProp="reviewBody">
                    “{testimonial.text}”
                  </p>

                  {/* Footer */}
                  <div className="border-t pt-4">
                    <div className="font-bold text-gray-900" itemProp="author">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-600" itemProp="name">
                      {testimonial.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}