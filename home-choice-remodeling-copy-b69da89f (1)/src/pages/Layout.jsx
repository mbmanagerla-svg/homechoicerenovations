
import React, { useState, useEffect, createContext, useContext } from "react";
import { Phone, Menu, X, Globe, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};

export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") return "en";
    return localStorage.getItem("language") || "en";
  });

  // 🔹 Helper para metas
  const setMetaTag = ({ name, property, content }) => {
    if (typeof document === "undefined") return;

    const selector = name
      ? `meta[name="${name}"]`
      : `meta[property="${property}"]`;

    let tag = document.head.querySelector(selector);
    if (!tag) {
      tag = document.createElement("meta");
      if (name) tag.setAttribute("name", name);
      if (property) tag.setAttribute("property", property);
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
  };

  const setLinkTag = (rel, href) => {
    if (typeof document === "undefined") return;

    const selector = `link[rel="${rel}"]`;
    let link = document.head.querySelector(selector);
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", rel);
      document.head.appendChild(link);
    }
    link.setAttribute("href", href);
  };

  // 🔹 SEO COMPLETO
  useEffect(() => {
    if (typeof document === "undefined") return;

    const isEn = language === "en";

    const title = isEn
      ? "Home Choice Renovations — Premium Home Remodeling & Financing in Los Angeles"
      : "Home Choice Renovations — Remodelación de Casas con Financiamiento en Los Ángeles";

    const description = isEn
      ? "Home Choice Renovations — by Power Style. Premium home remodeling in Los Angeles: kitchens, bathrooms, roofing, ADUs and more. Flexible financing where you start paying up to 60 days after project completion. Bilingual English–Spanish team."
      : "Home Choice Renovations — by Power Style. Remodelación premium de casas en Los Ángeles: cocinas, baños, techos, ADUs y más. Financiamiento flexible donde puede comenzar a pagar hasta 60 días después de terminado el proyecto. Equipo bilingüe inglés–español.";

    const keywords = isEn
      ? "home remodeling Los Angeles, kitchen remodeling, bathroom remodeling, ADU builder LA, roofing contractor, financing home renovation, bilingual contractor"
      : "remodelación de casas Los Ángeles, remodelación de cocinas, remodelación de baños, construcción ADU LA, techos, financiamiento remodelación, contratista bilingüe";

    const siteUrl = "https://homechoicerenovations.com";
    const currentUrl =
      typeof window !== "undefined" ? window.location.href : siteUrl;
    const siteName = "Home Choice Renovations";

    // Título
    document.title = title;

    // Meta description
    setMetaTag({ name: "description", content: description });
    setMetaTag({ name: "keywords", content: keywords });

    // 🔹 OpenGraph
    setMetaTag({ property: "og:title", content: title });
    setMetaTag({ property: "og:description", content: description });
    setMetaTag({ property: "og:type", content: "website" });
    setMetaTag({ property: "og:url", content: currentUrl });
    setMetaTag({ property: "og:site_name", content: siteName });
    setMetaTag({
      property: "og:image",
      content: `${siteUrl}/og-image.jpg`,
    });

    // 🔹 Twitter Card
    setMetaTag({ name: "twitter:card", content: "summary_large_image" });
    setMetaTag({ name: "twitter:title", content: title });
    setMetaTag({ name: "twitter:description", content: description });
    setMetaTag({
      name: "twitter:image",
      content: `${siteUrl}/og-image.jpg`,
    });

    // 🔹 Canonical dinámico
    setLinkTag("canonical", currentUrl);

    // 🔹 JSON-LD (Local Business)
    let script = document.head.querySelector("#business-ldjson");
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "business-ldjson";
      document.head.appendChild(script);
    }

    const ldJson = {
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      name: siteName,
      description,
      url: siteUrl,
      telephone: "+1-310-460-9427",
      areaServed: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          addressLocality: "Los Angeles",
          addressRegion: "CA",
          addressCountry: "US",
        },
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Los Angeles",
        addressRegion: "CA",
        addressCountry: "US",
      },
      speaksLanguage: ["en", "es"],
      sameAs: ["https://www.instagram.com/homechoicerenovations"],
      makesOffer: [
        { "@type": "Offer", name: isEn ? "Kitchen remodeling" : "Remodelación de cocinas" },
        { "@type": "Offer", name: isEn ? "Bathroom remodeling" : "Remodelación de baños" },
        { "@type": "Offer", name: isEn ? "ADU construction" : "Construcción de ADUs" },
        { "@type": "Offer", name: isEn ? "Roofing" : "Techos" },
      ],
    };

    script.textContent = JSON.stringify(ldJson);

    // Idioma del HTML
    document.documentElement.lang = isEn ? "en" : "es";
  }, [language]);

  // Guardar idioma
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("language", language);
  }, [language]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const translations = {
    en: {
      services: "Services",
      financing: "Financing",
      portfolio: "Portfolio",
      about: "About",
      getQuote: "Get a Quote",
      callUs: "Call us: 310.460.9427",
      whatsapp: "WhatsApp",
      financingMessage:
        "Financing available · Start paying up to 60 days after the project is finished",
      freeVisit: "Free home visit",
    },
    es: {
      services: "Servicios",
      financing: "Financiamiento",
      portfolio: "Portafolio",
      about: "Nosotros",
      getQuote: "Obtener Cotización",
      callUs: "Llámenos: 310.460.9427",
      whatsapp: "WhatsApp",
      financingMessage:
        "Financiamiento disponible · Comience a pagar hasta 60 días después de terminado el proyecto",
      freeVisit: "Visita a domicilio gratis",
    },
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div className="min-h-screen bg-gray-50">

        {/* HEADER */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#10213A] text-white shadow-md">
          <div className="border-b border-white/10">
            <div className="container mx-auto px-4 py-3 md:py-3.5">
              <div className="flex items-center justify-between">

                {/* LOGO */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#2D3142] to-[#1F3A5F] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">HC</span>
                  </div>
                  <div>
                    <div className="font-bold text-lg leading-tight text-white">
                      Home Choice Renovations
                    </div>
                    <div className="text-xs text-blue-200">by Power Style</div>
                  </div>
                </div>

                {/* NAV DESKTOP */}
                <nav className="hidden lg:flex items-center gap-6">
                  <button onClick={() => scrollToSection("services")} className="font-medium text-white hover:text-blue-200 transition-colors">
                    {t.services}
                  </button>
                  <button onClick={() => scrollToSection("financing")} className="font-medium text-white hover:text-blue-200 transition-colors">
                    {t.financing}
                  </button>
                  <button onClick={() => scrollToSection("portfolio")} className="font-medium text-white hover:text-blue-200 transition-colors">
                    {t.portfolio}
                  </button>
                  <button onClick={() => scrollToSection("about")} className="font-medium text-white hover:text-blue-200 transition-colors">
                    {t.about}
                  </button>
                </nav>

                {/* ACCIONES DERECHA */}
                <div className="hidden lg:flex items-center gap-3">

                  {/* IDIOMA */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLanguage(language === "en" ? "es" : "en")}
                    className="text-white hover:bg-white/10 border border-white/30"
                  >
                    <Globe className="w-4 h-4 mr-1" />
                    {language === "en" ? "Español" : "English"}
                  </Button>

                  {/* PHONE */}
                  <a href="tel:+13104609427" className="flex items-center gap-2 font-semibold">
                    <Phone className="w-4 h-4" />
                    {t.callUs}
                  </a>

                  {/* GET QUOTE */}
                  <Button
                    onClick={() => scrollToSection("financing")}
                    className="bg-[#D4B676] hover:bg-[#c7a869] text-[#2D3142] font-semibold"
                  >
                    {t.getQuote}
                  </Button>
                </div>

                {/* MOBILE BTN */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* FINANCIAMIENTO STRIP */}
          <div className="bg-[#0D1829] py-2 text-center text-xs sm:text-sm text-blue-100">
            <div className="container mx-auto px-4 flex justify-center gap-3">
              <span className="font-semibold">{t.financingMessage}</span>
              <span className="bg-[#F5C86E] text-[#2D3142] px-3 py-1.5 rounded-full font-bold cursor-pointer">
                {t.freeVisit}
              </span>
            </div>
          </div>

          {/* MOBILE MENU */}
          {mobileMenuOpen && (
            <nav className="lg:hidden bg-[#0D1829] border-t border-white/10 py-4">
              <div className="container mx-auto px-4 flex flex-col gap-3">
                <button onClick={() => scrollToSection("services")} className="text-white font-medium">
                  {t.services}
                </button>
                <button onClick={() => scrollToSection("financing")} className="text-white font-medium">
                  {t.financing}
                </button>
                <button onClick={() => scrollToSection("portfolio")} className="text-white font-medium">
                  {t.portfolio}
                </button>
                <button onClick={() => scrollToSection("about")} className="text-white font-medium">
                  {t.about}
                </button>

                <div className="flex gap-2 pt-2">
                  <Button variant={language === "en" ? "default" : "outline"} size="sm" onClick={() => setLanguage("en")} className="flex-1">
                    English
                  </Button>
                  <Button variant={language === "es" ? "default" : "outline"} size="sm" onClick={() => setLanguage("es")} className="flex-1">
                    Español
                  </Button>
                </div>

                <a href="tel:+13104609427" className="flex items-center gap-2 text-white">
                  <Phone className="w-4 h-4" />
                  {t.callUs}
                </a>

                <Button onClick={() => scrollToSection("financing")} className="bg-[#F5C86E] text-[#2D3142] w-full font-semibold">
                  {t.getQuote}
                </Button>
              </div>
            </nav>
          )}
        </header>

        {/* CONTENIDO */}
        <main>{children}</main>

        {/* WHATSAPP */}
        <a
          href="https://wa.me/13104609427"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
        >
          <MessageCircle className="w-7 h-7" />
        </a>
      </div>
    </LanguageContext.Provider>
  );
}
