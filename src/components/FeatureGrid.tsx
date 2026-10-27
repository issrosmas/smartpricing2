import React from 'react';
import { 
  BarChart3, 
  ShieldAlert, 
  Cpu, 
  Zap, 
  ShoppingBag, 
  Layers, 
  Check, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface FeatureGridProps {
  onScrollTo: (id: string) => void;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ onScrollTo }) => {
  const features = [
    {
      icon: <Layers className="w-7 h-7 text-[#315b8c]" />,
      badge: "Feature 01",
      title: "Multi-Platform Price Comparison",
      description: "Compare your selling price and net profit across Shopee, Lazada, and TikTok Shop simultaneously. Discover instantly which platform nets you the highest ringgit per order before you list.",
      highlights: [
        "Side-by-side margin simulator",
        "Unified view of all 3 Malaysian channels",
        "Recommended best-selling channel per product"
      ],
      bgAccent: "bg-[#e8f0f8]"
    },
    {
      icon: <Cpu className="w-7 h-7 text-[#f2765e]" />,
      badge: "Feature 02",
      title: "Automated Fee Deduction Engine",
      description: "Never crack your head over marketplace fee changes again. Our system auto-calculates category commission rates (3.5% - 12%), payment processing fees, and Malaysian SST in real-time.",
      highlights: [
        "Up-to-date Shopee, Lazada & TikTok fee schedules",
        "Accounts for seller vouchers & coin cashback",
        "No complex Excel formulas or manual spreadsheets"
      ],
      bgAccent: "bg-[#fdeee9]"
    },
    {
      icon: <ShieldAlert className="w-7 h-7 text-emerald-700" />,
      badge: "Feature 03",
      title: "Safe Floor-Price Alerts",
      description: "Competitors slashing prices to ridiculous levels? The portal calculates your rock-bottom floor price and flashes immediate alerts before you accidentally match a loss-making price.",
      highlights: [
        "Pre-calculated 'Do Not Sell Below' threshold",
        "Protection against accidental flash sale disasters",
        "Suggested bundle strategies to stay profitable"
      ],
      bgAccent: "bg-emerald-50"
    }
  ];

  const additionalPerks = [
    {
      title: "1-Click Kumoten Catalog Sync",
      desc: "Connect directly to your Kumoten dropship account. When supplier costs change, your portal alerts you instantly."
    },
    {
      title: "Designed for Mobile Smartphones",
      desc: "Check and adjust your selling prices on your phone while cooking, taking care of children, or between university classes."
    },
    {
      title: "Zero Setup or Technical Skills",
      desc: "No coding, no confusing API keys. Simple, friendly screens made specifically for everyday Malaysian sellers."
    }
  ];

  return (
    <section id="features" className="py-16 sm:py-24 bg-[#fdfaf6] border-y border-[#dfcfba]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2765e]/15 text-[#f2765e] text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            Core Technology
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#413333] tracking-tight">
            Stop Guessing Your Profits. <br className="hidden sm:inline" />
            Let Smart Automation Guard Your Margin.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#665555]">
            Built specifically to solve the #1 mistake made by new dropshippers in Malaysia: making 100 sales a month but ending up with zero or negative bank balance.
          </p>
        </div>

        {/* 3 Main Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feat, index) => (
            <div 
              key={index}
              className="bg-[#f5ebdd]/60 rounded-2xl p-7 border border-[#dfcfba] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-14 h-14 rounded-xl ${feat.bgAccent} flex items-center justify-center shadow-xs`}>
                    {feat.icon}
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider text-[#665555] bg-white/70 px-2.5 py-1 rounded-full border border-[#dfcfba]/50">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-xl font-black text-[#413333] mb-3 group-hover:text-[#f2765e] transition-colors">
                  {feat.title}
                </h3>

                <p className="text-sm text-[#665555] leading-relaxed mb-6">
                  {feat.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#dfcfba]/60 space-y-2">
                {feat.highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-[#413333]">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Mini Perks Banner */}
        <div className="bg-[#f5ebdd] rounded-2xl p-6 sm:p-8 border border-[#dfcfba]">
          <h4 className="text-center font-extrabold text-base sm:text-lg text-[#413333] mb-6">
            Why Malaysian Dropshippers Love The Kumoten Smart Pricing Concept:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalPerks.map((perk, idx) => (
              <div key={idx} className="bg-white/70 p-4 rounded-xl border border-[#dfcfba]/60">
                <p className="font-bold text-sm text-[#315b8c] mb-1">{perk.title}</p>
                <p className="text-xs text-[#665555] leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onScrollTo('early-access')}
              className="inline-flex items-center gap-2 bg-[#f2765e] hover:bg-[#df644c] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              Be First to Access the Beta Engine
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
