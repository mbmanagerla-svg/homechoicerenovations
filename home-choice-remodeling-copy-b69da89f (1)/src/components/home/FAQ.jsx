import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../../Layout";

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <Card className="border-2 border-gray-100 hover:border-[#1F3A5F]/20 transition-colors">
      <CardContent className="p-0">
        <button
          type="button"
          onClick={onClick}
          className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
        >
          <span className="font-semibold text-gray-900 text-lg">
            {question}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-[#1F3A5F] flex-shrink-0 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

export default function FAQ() {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);

  const translations = {
    en: {
      title: "Frequently Asked Questions",
      faqs: [
        {
          q: "How does the financing work?",
          a: "We offer flexible financing where you start paying up to 60 days after your project is completed. This gives you time to enjoy your new space before payments begin. We work with trusted lenders to provide competitive rates and monthly payment plans that fit your budget.",
        },
        {
          q: "Do I need good credit?",
          a: "We have financing programs available for various credit profiles. Even if your credit isn't perfect, we can often find options that work for you. Contact us to discuss your specific situation—we're here to help.",
        },
        {
          q: "What types of remodeling do you offer?",
          a: "We specialize in complete home remodeling including kitchens, bathrooms, roofing, ADU construction, exterior upgrades, flooring, and energy-efficient improvements. If you have a project in mind, we can likely help.",
        },
        {
          q: "Do you work with Latino families?",
          a: "Absolutely! We proudly serve the Latino community in Los Angeles. Our bilingual team speaks both English and Spanish, and we understand the unique needs of Latino families. We're committed to making the remodeling process comfortable and clear for everyone.",
        },
        {
          q: "How long do remodels take?",
          a: "Project timelines vary based on scope. A typical kitchen remodel takes 3–4 weeks, bathrooms 2–3 weeks, and ADU construction 8–12 weeks. We provide detailed timelines during your free consultation and keep you updated throughout the process.",
        },
      ],
    },
    es: {
      title: "Preguntas Frecuentes",
      faqs: [
        {
          q: "¿Cómo funciona el financiamiento?",
          a: "Ofrecemos financiamiento flexible donde comienza a pagar hasta 60 días después de completado su proyecto. Esto le da tiempo para disfrutar su nuevo espacio antes de que comiencen los pagos. Trabajamos con prestamistas confiables para proporcionar tasas competitivas y planes de pago mensuales que se ajusten a su presupuesto.",
        },
        {
          q: "¿Necesito buen crédito?",
          a: "Tenemos programas de financiamiento disponibles para varios perfiles de crédito. Incluso si su crédito no es perfecto, a menudo podemos encontrar opciones que funcionen para usted. Contáctenos para discutir su situación específica; estamos aquí para ayudar.",
        },
        {
          q: "¿Qué tipos de remodelación ofrecen?",
          a: "Nos especializamos en remodelación completa del hogar incluyendo cocinas, baños, techos, construcción de ADU, mejoras exteriores, pisos y mejoras de eficiencia energética. Si tiene un proyecto en mente, probablemente podamos ayudar.",
        },
        {
          q: "¿Trabajan con familias Latinas?",
          a: "¡Absolutamente! Servimos con orgullo a la comunidad Latina en Los Ángeles. Nuestro equipo bilingüe habla inglés y español, y entendemos las necesidades únicas de las familias Latinas. Estamos comprometidos a hacer el proceso de remodelación cómodo y claro para todos.",
        },
        {
          q: "¿Cuánto tiempo toman las remodelaciones?",
          a: "Los plazos del proyecto varían según el alcance. Una remodelación típica de cocina toma 3–4 semanas, baños 2–3 semanas y construcción de ADU 8–12 semanas. Proporcionamos plazos detallados durante su consulta gratuita y lo mantenemos actualizado durante todo el proceso.",
        },
      ],
    },
  };

  const t = translations[language];

  return (
    <section id="faq" className="py-20 bg-gray-50">
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

        <div className="max-w-3xl mx-auto space-y-4">
          {t.faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.q}
              answer={faq.a}
              isOpen={openIndex === index}
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}