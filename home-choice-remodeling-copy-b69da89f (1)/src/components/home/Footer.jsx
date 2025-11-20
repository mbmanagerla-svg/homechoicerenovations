import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
} from "lucide-react";
import { useLanguage } from "../../Layout";

export default function Footer() {
  const { language } = useLanguage();

  const translations = {
    en: {
      tagline:
        "Home Choice Renovations — by Power Style · Premium home renovation services with flexible financing in Los Angeles.",
      servicesTitle: "Services",
      services: [
        "Kitchens",
        "Bathrooms",
        "Roofing",
        "ADUs",
        "Flooring",
        "Windows & Doors",
      ],
      areasTitle: "Service Areas",
      areas: [
        "Los Angeles",
        "San Fernando Valley",
        "Glendale",
        "Pasadena",
        "Burbank",
        "Inglewood",
      ],
      contactTitle: "Contact Us",
      addressText: "Los Angeles, CA",
      servingText: "Serving Greater LA",
      seoText:
        "We specialize in kitchen remodeling, bathroom renovations, roofing, ADU construction, flooring, windows and doors, and complete home makeovers across Los Angeles County. Our licensed and insured bilingual team provides transparent pricing, premium materials, and flexible financing options.",
      serviceAreasExtended:
        "Service areas: Los Angeles, San Fernando Valley, Van Nuys, Northridge, Panorama City, Glendale, Pasadena, Burbank, Inglewood, Lancaster, Palmdale, Long Beach, Downey, Sylmar, Santa Monica, Hollywood, Studio City, Sherman Oaks, Encino, West LA.",
      copyright:
        "© 2025 Home Choice Renovations — by Power Style. All rights reserved. Licensed, Bonded & Insured.",
      licenseLabel: "CSLB License #",
    },

    es: {
      tagline:
        "Home Choice Renovations — by Power Style · Servicios premium de renovación del hogar con financiamiento flexible en Los Ángeles.",
      servicesTitle: "Servicios",
      services: [
        "Cocinas",
        "Baños",
        "Techos",
        "ADUs",
        "Pisos",
        "Ventanas y Puertas",
      ],
      areasTitle: "Áreas de Servicio",
      areas: [
        "Los Ángeles",
        "Valle de San Fernando",
        "Glendale",
        "Pasadena",
        "Burbank",
        "Inglewood",
      ],
      contactTitle: "Contáctenos",
      addressText: "Los Ángeles, CA",
      servingText: "Sirviendo el Gran LA",
      seoText:
        "Nos especializamos en remodelación de cocinas, renovación de baños, techos, construcción de ADUs, pisos, ventanas y puertas, y renovaciones completas del hogar en el Condado de Los Ángeles. Nuestro equipo licenciado, asegurado y bilingüe ofrece precios transparentes, materiales premium y opciones de financiamiento flexible.",
      serviceAreasExtended:
        "Áreas: Los Ángeles, Valle de San Fernando, Van Nuys, Northridge, Panorama City, Glendale, Pasadena, Burbank, Inglewood, Lancaster, Palmdale, Long Beach, Downey, Sylmar, Santa Monica, Hollywood, Studio City, Sherman Oaks, Encino, West LA.",
      copyright:
        "© 2025 Home Choice Renovations — by Power Style. Todos los derechos reservados. Licenciados, Garantizados y Asegurados.",
      licenseLabel: "Licencia CSLB #",
    },
  };

  const t = translations[language];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#1B2230] text-gray-300 border-t border-[#2A3245]">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* LOGO + TAGLINE */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1F3A5F] to-[#2D3142] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">HC</span>
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-tight">
                  Home Choice Renovations
                </div>
                <div className="text-xs text-gray-400">by Power Style</div>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed mb-4 text-sm">
              {t.tagline}
            </p>

            {/* SEO EXTRA TEXT */}
            <p className="text-gray-400 leading-relaxed text-sm mb-6">
              {t.seoText}
            </p>

            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-[#1F3A5F] rounded-lg flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-[#1F3A5F] rounded-lg flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-[#1F3A5F] rounded-lg flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">
              {t.servicesTitle}
            </h3>
            <ul className="space-y-3">
              {t.services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="hover:text-[#C9A961] transition-colors text-sm"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICE AREAS */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">
              {t.areasTitle}
            </h3>
            <ul className="space-y-3">
              {t.areas.map((area, index) => (
                <li key={index} className="text-sm text-gray-400">
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">
              {t.contactTitle}
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+13104609427"
                  className="flex items-center gap-3 hover:text-[#C9A961] transition-colors text-sm"
                >
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  <span>310.460.9427</span>
                </a>
              </li>

              <li>
                <a
                  href="https://wa.me/13104609427"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-[#C9A961] transition-colors text-sm"
                >
                  <MessageCircle className="w-5 h-5 flex-shrink-0" />
                  <span>WhatsApp: 310.460.9427</span>
                </a>
              </li>

              <li>
                <a
                  href="mailto:contact@homechoicerenovations.com"
                  className="flex items-center gap-3 hover:text-[#C9A961] transition-colors text-sm"
                >
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <span>contact@homechoicerenovations.com</span>
                </a>
              </li>

              <li>
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>
                    {t.addressText}
                    <br />
                    {t.servingText}
                  </span>
                </div>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-[#C9A961] rounded-lg">
              <div className="text-xs text-[#2D3142] font-semibold mb-1">
                {t.licenseLabel}
              </div>
              <div className="text-[#2D3142] font-bold text-sm">1088270</div>
            </div>
          </div>
        </div>

        {/* EXTENDED AREA LIST — HUGE SEO BOOST */}
        <p className="text-gray-500 text-xs mb-6 text-center">
          {t.serviceAreasExtended}
        </p>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          {t.copyright}
        </div>
      </div>
    </footer>
  );
}