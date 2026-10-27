import React from 'react';
import { Search, Calculator, CheckCircle2, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onScrollTo: (id: string) => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onScrollTo }) => {
  const steps = [
    {
      num: "01",
      title: "Select Any Kumoten SKU",
      desc: "Paste the product link or search directly from Kumoten's catalog of 100,000+ ready-stock local supplier items in Malaysia.",
      icon: <Search className="w-6 h-6 text-[#315b8c]" />,
      detail: "Suppliers in Selangor, Johor & Penang with local courier dispatch."
    },
    {
      num: "02",
      title: "Automated Fee Deduction",
      desc: "The engine instantly crunches category commission (Shopee 4.5%, TikTok 4.2%, Lazada 4.0%), transaction fees, and SST.",
      icon: <Calculator className="w-6 h-6 text-[#f2765e]" />,
      detail: "Zero manual math or confusing Excel formulas required."
    },
    {
      num: "03",
      title: "Lock Your Safe Floor Price",
      desc: "Receive your green 'Safe Margin' floor price. Sync your listing to your shop and sell peacefully knowing every ringgit is profit.",
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
      detail: "Instant alerts if competitor price cuts threaten your margin."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-[#fdfaf6] border-b border-[#dfcfba]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#f2765e] uppercase tracking-wider bg-[#fdeee9] px-3 py-1 rounded-full">
            Simple 3-Step Flow
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#413333] tracking-tight mt-3">
            How The Kumoten Smart Pricing Portal Works
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#665555]">
            Take the guesswork out of selling online. From wholesale supplier to marketplace payout in three clean steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="bg-[#f5ebdd]/70 rounded-2xl p-7 border border-[#dfcfba] relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-[#dfcfba] flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-3xl font-black text-[#dfcfba]">{step.num}</span>
                </div>

                <h3 className="text-lg font-black text-[#413333] mb-2">{step.title}</h3>
                <p className="text-sm text-[#665555] leading-relaxed mb-4">{step.desc}</p>
              </div>

              <div className="p-3 bg-white/70 rounded-xl border border-[#dfcfba]/50 text-xs font-medium text-[#413333]">
                💡 <span className="text-[#665555]">{step.detail}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
