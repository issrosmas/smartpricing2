import React, { useCallback } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { TeaserProfitCalculator } from './components/TeaserProfitCalculator.tsx';
import { FeatureGrid } from './components/FeatureGrid.tsx';
import { AudienceSection } from './components/AudienceSection.tsx';
import { HowItWorks } from './components/HowItWorks.tsx';
import { EarlyAccessForm } from './components/EarlyAccessForm.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { Footer } from './components/Footer.tsx';
import { Calculator, Sparkles } from 'lucide-react';

export default function App() {
  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f5ebdd] text-[#413333]">
      {/* Navigation Header */}
      <Navbar onScrollTo={scrollToSection} />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onScrollTo={scrollToSection} />

        {/* 2. Interactive Teaser Profit Calculator */}
        <TeaserProfitCalculator onScrollTo={scrollToSection} />

        {/* 3. Core Feature Highlights Grid */}
        <FeatureGrid onScrollTo={scrollToSection} />

        {/* 4. Target Personas: Housewives, Students, Gig Workers */}
        <AudienceSection onScrollTo={scrollToSection} />

        {/* 5. 3-Step Simple How It Works */}
        <HowItWorks onScrollTo={scrollToSection} />

        {/* 6. Early Access VIP Contact Form (Main Lead Capture) */}
        <EarlyAccessForm />

        {/* 7. Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer with trust badges and copyright */}
      <Footer onScrollTo={scrollToSection} />

      {/* Floating Bottom Quick Bar for Mobile Devices */}
      <div className="sm:hidden fixed bottom-3 left-3 right-3 z-40 bg-[#fdfaf6]/95 backdrop-blur-md p-2 rounded-2xl border border-[#dfcfba] shadow-2xl flex items-center gap-2">
        <button
          onClick={() => scrollToSection('calculator')}
          className="flex-1 py-2.5 px-3 bg-[#e8f0f8] text-[#315b8c] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Calculator</span>
        </button>
        <button
          onClick={() => scrollToSection('early-access')}
          className="flex-1 py-2.5 px-3 bg-[#f2765e] hover:bg-[#df644c] text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Get Early Access</span>
        </button>
      </div>
    </div>
  );
}
