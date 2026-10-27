import React from 'react';
import { ShieldCheck, Lock, Heart, Award, CheckCircle } from 'lucide-react';

interface FooterProps {
  onScrollTo: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo }) => {
  return (
    <footer className="bg-[#f5ebdd] border-t border-[#dfcfba] pt-12 pb-8 text-[#413333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Badges Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-10 border-b border-[#dfcfba]/80">
          <div className="flex items-center gap-3 p-3.5 bg-[#fdfaf6] rounded-xl border border-[#dfcfba]">
            <ShieldCheck className="w-6 h-6 text-[#315b8c] shrink-0" />
            <div>
              <p className="text-xs font-bold text-[#413333]">Safe Margin Guard</p>
              <p className="text-[10px] text-[#665555]">Zero accidental loss pricing</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 bg-[#fdfaf6] rounded-xl border border-[#dfcfba]">
            <Lock className="w-6 h-6 text-[#f2765e] shrink-0" />
            <div>
              <p className="text-xs font-bold text-[#413333]">256-Bit SSL Privacy</p>
              <p className="text-[10px] text-[#665555]">WhatsApp info strictly secured</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 bg-[#fdfaf6] rounded-xl border border-[#dfcfba]">
            <Award className="w-6 h-6 text-[#315b8c] shrink-0" />
            <div>
              <p className="text-xs font-bold text-[#413333]">100% Malaysian Made</p>
              <p className="text-[10px] text-[#665555]">Aligned with MY marketplace fees</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 bg-[#fdfaf6] rounded-xl border border-[#dfcfba]">
            <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <p className="text-xs font-bold text-[#413333]">Kumoten Ecosystem</p>
              <p className="text-[10px] text-[#665555]">100,000+ verified supplier SKUs</p>
            </div>
          </div>
        </div>

        {/* Footer Main Links & Info */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          {/* Brand Info */}
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#f2765e] text-white flex items-center justify-center font-black text-sm">
                K
              </div>
              <span className="font-black text-lg text-[#413333]">Kumoten Smart Pricing Portal</span>
            </div>
            <p className="text-xs text-[#665555] max-w-md">
              Empowering Malaysian housewives, students, and gig workers to run profitable dropshipping businesses on Shopee, Lazada & TikTok Shop without price war losses.
            </p>
          </div>

          {/* Quick Jump Links */}
          <div className="flex flex-wrap justify-center gap-5 text-xs font-bold text-[#413333]">
            <button onClick={() => onScrollTo('hero')} className="hover:text-[#f2765e] transition-colors cursor-pointer">
              Home
            </button>
            <button onClick={() => onScrollTo('calculator')} className="hover:text-[#f2765e] transition-colors cursor-pointer">
              Calculator
            </button>
            <button onClick={() => onScrollTo('features')} className="hover:text-[#f2765e] transition-colors cursor-pointer">
              Features
            </button>
            <button onClick={() => onScrollTo('audience')} className="hover:text-[#f2765e] transition-colors cursor-pointer">
              Who It's For
            </button>
            <button onClick={() => onScrollTo('early-access')} className="hover:text-[#f2765e] transition-colors cursor-pointer text-[#f2765e]">
              Early Access VIP
            </button>
            <button onClick={() => onScrollTo('faq')} className="hover:text-[#f2765e] transition-colors cursor-pointer">
              FAQ
            </button>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 border-t border-[#dfcfba]/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#665555]">
          <p>© {new Date().getFullYear()} Kumoten Smart Pricing Portal. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Disclaimer: Kumoten is a registered trademark. Shopee, Lazada, and TikTok Shop are trademarks of their respective owners.
          </p>
        </div>

      </div>
    </footer>
  );
};
