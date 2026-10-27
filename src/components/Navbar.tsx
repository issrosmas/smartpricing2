import React, { useState } from 'react';
import { Sparkles, Menu, X, ShieldCheck, ArrowRight, Calculator } from 'lucide-react';

interface NavbarProps {
  onScrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollTo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onScrollTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all backdrop-blur-md bg-[#f5ebdd]/90 border-b border-[#dfcfba]/80">
      {/* Top Banner Notice for Malaysian Dropshippers */}
      <div className="bg-[#315b8c] text-white text-xs sm:text-sm py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-block px-1.5 py-0.5 rounded bg-white/20 text-[10px] font-bold tracking-wider uppercase">
          Early Beta
        </span>
        <span>🇲🇾 Stop selling at a loss on Shopee, Lazada & TikTok Shop! Free floor-price calculator below.</span>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#f2765e] flex items-center justify-center text-white shadow-md shadow-[#f2765e]/25 group-hover:scale-105 transition-transform">
            <span className="font-extrabold text-xl tracking-tight">K</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl tracking-tight text-[#413333]">Kumoten</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-[#315b8c] text-white">Smart Pricing</span>
            </div>
            <p className="text-[11px] font-medium text-[#665555]">Marketplace Profit & Floor-Price Portal</p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#413333]">
          <button 
            onClick={() => handleNavClick('calculator')} 
            className="hover:text-[#f2765e] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Calculator className="w-4 h-4 text-[#315b8c]" />
            Profit Calculator
          </button>
          <button 
            onClick={() => handleNavClick('features')} 
            className="hover:text-[#f2765e] transition-colors cursor-pointer"
          >
            Features
          </button>
          <button 
            onClick={() => handleNavClick('audience')} 
            className="hover:text-[#f2765e] transition-colors cursor-pointer"
          >
            Who It's For
          </button>
          <button 
            onClick={() => handleNavClick('how-it-works')} 
            className="hover:text-[#f2765e] transition-colors cursor-pointer"
          >
            How It Works
          </button>
          <button 
            onClick={() => handleNavClick('faq')} 
            className="hover:text-[#f2765e] transition-colors cursor-pointer"
          >
            FAQ
          </button>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleNavClick('early-access')}
            className="inline-flex items-center gap-2 bg-[#f2765e] hover:bg-[#df644c] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md shadow-[#f2765e]/30 hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            Get Early Access
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => handleNavClick('early-access')}
            className="bg-[#f2765e] text-white text-xs font-bold px-3 py-1.5 rounded-full"
          >
            Early Access
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#413333] hover:bg-[#e8dccb] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#f5ebdd] border-b border-[#dfcfba] px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <button
            onClick={() => handleNavClick('calculator')}
            className="w-full text-left px-3 py-2 rounded-lg font-semibold text-[#413333] hover:bg-[#e8dccb] flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#315b8c]" />
              Profit Calculator
            </span>
            <span className="text-xs bg-[#f2765e]/15 text-[#f2765e] px-2 py-0.5 rounded font-bold">Interactive</span>
          </button>
          <button
            onClick={() => handleNavClick('features')}
            className="w-full text-left px-3 py-2 rounded-lg font-semibold text-[#413333] hover:bg-[#e8dccb]"
          >
            Features & Comparisons
          </button>
          <button
            onClick={() => handleNavClick('audience')}
            className="w-full text-left px-3 py-2 rounded-lg font-semibold text-[#413333] hover:bg-[#e8dccb]"
          >
            Made for Housewives & Students
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="w-full text-left px-3 py-2 rounded-lg font-semibold text-[#413333] hover:bg-[#e8dccb]"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('faq')}
            className="w-full text-left px-3 py-2 rounded-lg font-semibold text-[#413333] hover:bg-[#e8dccb]"
          >
            Frequently Asked Questions
          </button>
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('early-access')}
              className="w-full flex items-center justify-center gap-2 bg-[#f2765e] text-white py-3 rounded-xl font-bold shadow-md shadow-[#f2765e]/30"
            >
              <Sparkles className="w-4 h-4" />
              Claim Free VIP Early Access
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
