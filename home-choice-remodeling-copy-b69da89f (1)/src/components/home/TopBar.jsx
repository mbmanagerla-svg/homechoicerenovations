import React from "react";
import { Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../../Layout";

export default function TopBar() {
  const { language, setLanguage } = useLanguage();

  const translations = {
    en: {
      financing:
        "Financing available · Start paying up to 60 days after the project is finished",
      freeVisit: "Free home visit",
      call: "Call us: 310.460.9427",
    },
    es: {
      financing:
        "Financiamiento disponible · Comience a pagar hasta 60 días después de terminado el proyecto",
      freeVisit: "Visita a domicilio gratis",
      call: "Llámenos: 310.460.9427",
    },
  };

  const t = translations[language];

  return (
    <div className="w-full bg-[#1F3A5F] text-white py-2 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-[11px] sm:text-xs">
          {/* Left side: financing message */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 md:max-w-[70%] text-center md:text-left">
            <span className="font-semibold leading-snug">
              {t.financing}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="bg-[#D4B676] text-[#2D3142] px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold whitespace-nowrap">
              {t.freeVisit}
            </span>
          </div>

          {/* Right side: language + phone */}
          <div className="flex items-center justify-center md:justify-end gap-2 sm:gap-3">
            <Button
              type="button"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "es" : "en")}
              className="bg-white/15 hover:bg-white/25 text-white border border-white/30 font-semibold h-8 px-3 text-[11px] sm:text-xs"
            >
              <Globe className="w-3 h-3 mr-1" />
              {language === "en" ? "Español" : "English"}
            </Button>

            <a
              href="tel:+13104609427"
              className="hidden sm:flex items-center gap-2 hover:text-blue-200 transition-colors font-semibold"
            >
              <Phone className="w-4 h-4" />
              <span>{t.call}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}