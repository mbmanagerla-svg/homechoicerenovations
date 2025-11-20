import React from "react";
import Hero from "../components/home/Hero";
import TrustPillars from "../components/home/TrustPillars";
import ServicesOverview from "../components/home/ServicesOverview";
import FinancingSection from "../components/home/FinancingSection";
import Process from "../components/home/Process";
import Portfolio from "../components/home/Portfolio";
import Testimonials from "../components/home/Testimonials";
import ServiceArea from "../components/home/ServiceArea";
import AboutUs from "../components/home/AboutUs";
import FAQ from "../components/home/FAQ";
import FinalCTA from "../components/home/FinalCTA";
import Footer from "../components/home/Footer";
import { useAnalytics } from "../components/analytics/AnalyticsTracker";

export default function Home() {
  useAnalytics("Home");

  return (
    <div className="w-full">
        <Hero />
        <TrustPillars />
        <ServicesOverview />
        <FinancingSection />
        <Process />
        <Portfolio />
        <Testimonials />
        <ServiceArea />
        <AboutUs />
        <FAQ />
        <FinalCTA />
        <Footer />
    </div>
  );
}