import React from 'react';
import { Heart, GraduationCap, Bike, CheckCircle, ShieldCheck } from 'lucide-react';

interface AudienceSectionProps {
  onScrollTo: (id: string) => void;
}

export const AudienceSection: React.FC<AudienceSectionProps> = ({ onScrollTo }) => {
  const personas = [
    {
      role: "Housewives & Stay-at-Home Moms (Suri Rumah)",
      tag: "Part-time Extra Household Income",
      icon: "👩‍👧",
      avatarBg: "bg-rose-100 text-rose-600",
      painPoint: "Worried about spending family grocery money on marketplace advertising or dropship orders that turn out to be negative profit after Shopee deducts 6%-8% in fees.",
      solution: "Clear green/red signals give 100% certainty that every sale brings real milk and grocery money home without risking family savings.",
      quote: "Dulu ingatkan untung RM6 satu blouse, rupanya lepas tolak komisen Shopee & voucher tinggal 80 sen je! Dengan smart floor price, Kak Siti tahu bila patut tolak perang harga."
    },
    {
      role: "University & College Students",
      tag: "Zero Capital Side Hustle",
      icon: "🎓",
      avatarBg: "bg-blue-100 text-[#315b8c]",
      painPoint: "Fierce viral gadget and cosmetic price battles on TikTok Shop between classes, with no time to maintain complicated Excel financial sheets.",
      solution: "Instant mobile calculation right from your smartphone. Compare TikTok Shop vs Shopee margins in 5 seconds between lectures.",
      quote: "Kawan-kawan main buang harga sampai RM19. Aku check portal, rupanya floor cost RM21. Selamat aku tak ikut, kalau tak rugi RM2 setiap parcel!"
    },
    {
      role: "Gig Workers & Night-Shift Earners",
      tag: "Flexible Night & Weekend Cash",
      icon: "🛵",
      avatarBg: "bg-amber-100 text-amber-700",
      painPoint: "Working long hours delivering or driving, and trying to build dropship e-commerce without losing hard-earned cash to silent platform policy updates.",
      solution: "Automated fee deduction keeps up with all 2024-2026 Malaysian SST and marketplace commission changes so your spare time yields maximum profit.",
      quote: "Bila balik kerja penat, tak larat nak kira formula komisen. Portal ni terus bagitahu harga paling selamat untuk letak dekat Lazada & Shopee."
    }
  ];

  return (
    <section id="audience" className="py-16 sm:py-24 bg-[#f5ebdd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#315b8c]/15 text-[#315b8c] text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5" />
            Built With Empathy For Malaysians
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#413333] tracking-tight">
            Dropshipping Should Put Food on the Table, Not Take Money From Your Pocket
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#665555]">
            Big marketplace sellers have full-time financial analysts. You have the <span className="font-bold text-[#315b8c]">Kumoten Smart Pricing Portal</span> in your pocket.
          </p>
        </div>

        {/* 3 Persona Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {personas.map((item, idx) => (
            <div 
              key={idx}
              className="bg-[#fdfaf6] rounded-2xl p-7 border border-[#dfcfba] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-xs bg-white border border-[#dfcfba]">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#413333] leading-snug">{item.role}</h3>
                    <span className="text-[11px] font-bold text-[#f2765e] uppercase tracking-wide">{item.tag}</span>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm text-[#665555]">
                  <div className="p-3 rounded-xl bg-[#f5ebdd]/70 border border-[#dfcfba]/60">
                    <p className="font-bold text-[#413333] mb-1">❌ The Common Struggle:</p>
                    <p>{item.painPoint}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#e8f0f8] border border-[#315b8c]/20 text-[#413333]">
                    <p className="font-bold text-[#315b8c] mb-1">✅ How Smart Pricing Protects You:</p>
                    <p>{item.solution}</p>
                  </div>
                </div>
              </div>

              {/* Quote bubble */}
              <div className="mt-6 pt-4 border-t border-[#dfcfba]/60">
                <p className="text-xs italic text-[#413333] bg-[#f5ebdd]/50 p-3 rounded-xl border border-[#dfcfba]/40">
                  "{item.quote}"
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Reassurance banner */}
        <div className="mt-12 p-6 rounded-2xl bg-white/70 border border-[#dfcfba] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[#315b8c] shrink-0" />
            <div>
              <p className="font-bold text-sm text-[#413333]">No Kumoten Account Yet? No Problem.</p>
              <p className="text-xs text-[#665555]">Early access includes a free beginner starter guide on how to register and begin dropshipping in Malaysia without holding inventory.</p>
            </div>
          </div>
          <button
            onClick={() => onScrollTo('early-access')}
            className="shrink-0 bg-[#315b8c] hover:bg-[#254770] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            Claim Free Beginner Guide
          </button>
        </div>

      </div>
    </section>
  );
};
