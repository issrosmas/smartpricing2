import React from 'react';
import { ArrowRight, ShieldAlert, Sparkles, TrendingUp, CheckCircle2, AlertTriangle, Layers, Percent } from 'lucide-react';

interface HeroProps {
  onScrollTo: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollTo }) => {
  return (
    <section id="hero" className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-96 sm:h-[600px] bg-[#f2765e]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-4 w-72 h-72 bg-[#315b8c]/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Proposition & Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Urgent Badge */}
            <div className="inline-flex items-center gap-2 bg-[#fdeee9] border border-[#f2765e]/30 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-[#413333] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#f2765e] animate-ping" />
              <span className="text-[#f2765e] font-bold">New Solution for MY Dropshippers</span>
              <span className="text-[#665555]">| No More Accidental Losses</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#413333] tracking-tight leading-[1.15]">
              Survive & Win the <br className="hidden sm:inline" />
              <span className="text-[#f2765e] underline decoration-[#f2765e]/30 decoration-wavy decoration-4">Marketplace Price Wars</span>
            </h1>

            {/* Sub-headline / Explanation */}
            <p className="text-base sm:text-lg text-[#665555] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Don't let Shopee, Lazada, and TikTok Shop hidden commission fees wipe out your hard-earned side income. 
              The <strong className="text-[#413333] font-bold">Kumoten Smart Pricing Portal</strong> automatically calculates real take-home profit, alerts you to safe floor prices, and lets you price with confidence.
            </p>

            {/* Targeted Audience Callout */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs sm:text-sm text-[#413333]">
              <span className="font-bold text-[#315b8c]">Designed specially for:</span>
              <span className="bg-[#e8f0f8] text-[#315b8c] font-semibold px-2.5 py-1 rounded-md">👩‍👧 Housewives (Suri Rumah)</span>
              <span className="bg-[#e8f0f8] text-[#315b8c] font-semibold px-2.5 py-1 rounded-md">🎓 Students</span>
              <span className="bg-[#e8f0f8] text-[#315b8c] font-semibold px-2.5 py-1 rounded-md">🛵 Gig Workers</span>
            </div>

            {/* Primary & Secondary Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={() => onScrollTo('early-access')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#f2765e] hover:bg-[#df644c] text-white px-8 py-4 rounded-xl font-extrabold text-base sm:text-lg shadow-lg shadow-[#f2765e]/35 hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-amber-200" />
                Get Early Access (Free)
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => onScrollTo('calculator')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#fdfaf6] hover:bg-[#e8dccb]/70 border border-[#dfcfba] text-[#413333] px-6 py-4 rounded-xl font-bold text-base transition-all cursor-pointer"
              >
                <span>Try Live Profit Calculator</span>
                <span className="text-xs bg-[#315b8c] text-white px-2 py-0.5 rounded-full font-bold">Instant</span>
              </button>
            </div>

            {/* Social Proof Micro-metrics */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-[#dfcfba]/70 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#315b8c]">100K+</p>
                <p className="text-xs text-[#665555] font-medium">Kumoten Catalog SKUs</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#f2765e]">3 Platforms</p>
                <p className="text-xs text-[#665555] font-medium">Shopee • TikTok • Lazada</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#413333]">100%</p>
                <p className="text-xs text-[#665555] font-medium">Safe Floor-Price Guard</p>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Simulation Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-[#fdfaf6] rounded-2xl p-5 sm:p-6 shadow-xl border border-[#dfcfba] space-y-4">
              
              {/* Header of Simulated Card */}
              <div className="flex items-center justify-between border-b border-[#dfcfba]/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#f2765e]" />
                  <span className="font-extrabold text-sm text-[#413333]">Marketplace Reality Check</span>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Live Preview
                </span>
              </div>

              {/* Product Example */}
              <div className="p-3 bg-[#f5ebdd] rounded-xl flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#315b8c] text-white flex items-center justify-center font-bold text-lg shadow-inner">
                  🛍️
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#665555] font-semibold">Kumoten Dropship Item</p>
                  <p className="text-sm font-bold text-[#413333] truncate">Telekung Travel Mini Pouch</p>
                  <p className="text-xs text-[#315b8c] font-semibold">Supplier Cost: <span className="font-black">RM 18.00</span></p>
                </div>
              </div>

              {/* The "Trap" vs "Protected" Comparison */}
              <div className="space-y-2.5">
                {/* Dangerous naive seller */}
                <div className="p-3 rounded-xl border border-rose-200 bg-rose-50/60 relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs font-bold text-rose-800">
                    <span className="flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      Under-cut Competitor Price: RM 22.00
                    </span>
                    <span className="bg-rose-600 text-white px-1.5 py-0.5 rounded text-[10px]">RUGI (LOSS)</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs text-rose-950 font-medium">
                    <span>After 4.5% comm + 2.12% fee + SST:</span>
                    <span className="font-black text-rose-700">- RM 1.48 / order</span>
                  </div>
                  <p className="text-[10px] text-rose-700 mt-1 italic">
                    "Selling 50 pcs a day meant losing RM 74 every single day without realizing!"
                  </p>
                </div>

                {/* With Kumoten Smart Pricing */}
                <div className="p-3 rounded-xl border-2 border-[#315b8c] bg-[#e8f0f8]/80 relative shadow-xs">
                  <div className="flex items-center justify-between text-xs font-bold text-[#315b8c]">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Kumoten Recommended Floor: RM 27.90
                    </span>
                    <span className="bg-emerald-600 text-white px-1.5 py-0.5 rounded text-[10px]">UNTUNG (PROFIT)</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs text-[#413333] font-medium">
                    <span>Safe Net Take-Home:</span>
                    <span className="font-black text-emerald-700 text-sm">+ RM 7.42 / order (26.6% Net)</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-[#315b8c]/20 flex items-center justify-between text-[11px] text-[#665555]">
                    <span>Platforms auto-synced:</span>
                    <span className="font-bold text-[#315b8c]">Shopee • Lazada • TikTok</span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Callout */}
              <div className="p-2.5 rounded-lg bg-[#fdeee9] border border-[#f2765e]/30 flex items-center gap-2 text-xs text-[#413333]">
                <ShieldAlert className="w-4 h-4 text-[#f2765e] shrink-0" />
                <span>The upcoming portal compares all 3 platforms in 1 click!</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
