import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Info
} from 'lucide-react';
import { ProductPreset } from '../types/index.ts';

interface TeaserProfitCalculatorProps {
  onScrollTo: (id: string) => void;
}

const PRESETS: ProductPreset[] = [
  {
    id: 'p1',
    name: 'Telekung Travel Mini Pouch',
    category: 'Muslimah Fashion',
    kumotenCost: 18.00,
    suggestedSellPrice: 32.00,
    description: 'High volume bestseller on Shopee & TikTok'
  },
  {
    id: 'p2',
    name: 'Rechargeable Portable Blender',
    category: 'Kitchen & Living',
    kumotenCost: 24.50,
    suggestedSellPrice: 39.90,
    description: 'Popular viral item with fierce competitor price slashing'
  },
  {
    id: 'p3',
    name: 'Organic Cotton Baby Romper',
    category: 'Moms & Baby',
    kumotenCost: 11.20,
    suggestedSellPrice: 22.50,
    description: 'Great repeat orders from mothers'
  },
  {
    id: 'p4',
    name: 'Double Wall Stainless Tumbler',
    category: 'Home & Office',
    kumotenCost: 14.00,
    suggestedSellPrice: 28.00,
    description: 'High student & office worker demand'
  }
];

export const TeaserProfitCalculator: React.FC<TeaserProfitCalculatorProps> = ({ onScrollTo }) => {
  // Calculator inputs
  const [kumotenCost, setKumotenCost] = useState<number>(18.00);
  const [sellPrice, setSellPrice] = useState<number>(32.00);
  const [platform, setPlatform] = useState<'shopee' | 'lazada' | 'tiktok' | 'side-by-side'>('side-by-side');
  const [includeVoucher, setIncludeVoucher] = useState<boolean>(false);
  const [voucherAmount, setVoucherAmount] = useState<number>(3.00);

  // Fee rates (Standard Malaysian Dropshipper / Marketplace Baseline: approx 4.5% total commission & handling)
  // Shopee: 4.5% commission + 2.12% transaction fee
  // Lazada: 4.0% commission + 2.12% transaction fee
  // TikTok Shop: 4.2% commission + 2.16% transaction fee
  const platformRates = {
    shopee: { name: 'Shopee MY', commission: 0.045, transaction: 0.0212, badge: 'Shopee' },
    lazada: { name: 'Lazada MY', commission: 0.040, transaction: 0.0212, badge: 'Lazada' },
    tiktok: { name: 'TikTok Shop', commission: 0.042, transaction: 0.0216, badge: 'TikTok Shop' },
  };

  const calculateForPlatform = (rates: { commission: number; transaction: number }) => {
    const grossPrice = Math.max(0, sellPrice);
    const voucherDeduction = includeVoucher ? Math.min(grossPrice, voucherAmount) : 0;
    const finalReceivedBeforeFees = grossPrice - voucherDeduction;

    // Marketplace calculation: Commission based on selling price
    const commissionFee = grossPrice * rates.commission;
    const transactionFee = grossPrice * rates.transaction;
    const totalFees = commissionFee + transactionFee;

    const netProfit = finalReceivedBeforeFees - kumotenCost - totalFees;
    const profitMargin = grossPrice > 0 ? (netProfit / grossPrice) * 100 : 0;

    // Safe floor price calculation: target at least 15% net margin
    // SellPrice * (1 - commission - transaction - targetMargin) = KumotenCost + voucher
    // SellPrice = (KumotenCost + voucher) / (1 - (rates.commission + rates.transaction + 0.15))
    const totalFeeRate = rates.commission + rates.transaction;
    const safeRateDivisor = 1 - (totalFeeRate + 0.15);
    const safeFloorPrice = safeRateDivisor > 0 ? (kumotenCost + (includeVoucher ? voucherAmount : 0)) / safeRateDivisor : kumotenCost * 1.35;

    // Break even price (0% profit)
    const breakEvenDivisor = 1 - totalFeeRate;
    const breakEvenPrice = breakEvenDivisor > 0 ? (kumotenCost + (includeVoucher ? voucherAmount : 0)) / breakEvenDivisor : kumotenCost;

    return {
      grossPrice,
      commissionFee,
      transactionFee,
      totalFees,
      effectiveFeeRate: grossPrice > 0 ? (totalFees / grossPrice) * 100 : 0,
      netProfit,
      profitMargin,
      safeFloorPrice,
      breakEvenPrice
    };
  };

  const shopeeCalc = useMemo(() => calculateForPlatform(platformRates.shopee), [sellPrice, kumotenCost, includeVoucher, voucherAmount]);
  const lazadaCalc = useMemo(() => calculateForPlatform(platformRates.lazada), [sellPrice, kumotenCost, includeVoucher, voucherAmount]);
  const tiktokCalc = useMemo(() => calculateForPlatform(platformRates.tiktok), [sellPrice, kumotenCost, includeVoucher, voucherAmount]);

  // Active view calc (single or default to Shopee for the primary gauge)
  const currentCalc = platform === 'lazada' ? lazadaCalc : platform === 'tiktok' ? tiktokCalc : shopeeCalc;

  // Health indicator evaluation
  const margin = currentCalc.profitMargin;
  const isLoss = currentCalc.netProfit < 0;
  const isThin = currentCalc.netProfit >= 0 && margin < 15;
  const isHealthy = margin >= 15;

  const handleApplyPreset = (preset: ProductPreset) => {
    setKumotenCost(preset.kumotenCost);
    setSellPrice(preset.suggestedSellPrice);
  };

  return (
    <section id="calculator" className="py-14 sm:py-20 bg-[#f5ebdd] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#315b8c]/10 text-[#315b8c] text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            Interactive Teaser Tool
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#413333] tracking-tight">
            Marketplace Profit & Safe Floor Calculator
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#665555]">
            Key in your Kumoten item cost and target price. See actual marketplace deductions before you list and avoid giving away free items!
          </p>
        </div>

        {/* Preset Chips */}
        <div className="mb-8">
          <p className="text-xs font-bold text-[#665555] uppercase tracking-wider mb-2.5 text-center sm:text-left">
            ⚡ Quick Test with Top Kumoten Products:
          </p>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleApplyPreset(preset)}
                className={`text-xs px-3.5 py-2 rounded-xl font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
                  kumotenCost === preset.kumotenCost && sellPrice === preset.suggestedSellPrice
                    ? 'bg-[#315b8c] text-white border-[#315b8c] shadow-sm'
                    : 'bg-[#fdfaf6] text-[#413333] border-[#dfcfba] hover:border-[#315b8c] hover:bg-[#e8f0f8]'
                }`}
              >
                <span>{preset.name}</span>
                <span className="opacity-75 font-normal">(Cost RM{preset.kumotenCost.toFixed(2)})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-5 bg-[#fdfaf6] p-6 sm:p-7 rounded-2xl border border-[#dfcfba] shadow-lg space-y-6">
            <div className="flex items-center justify-between border-b border-[#dfcfba]/60 pb-3">
              <span className="font-bold text-sm text-[#413333] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f2765e]" />
                Step 1: Your Price Settings
              </span>
              <button 
                onClick={() => { setKumotenCost(18.00); setSellPrice(32.00); setIncludeVoucher(false); }}
                className="text-xs text-[#315b8c] hover:text-[#f2765e] flex items-center gap-1 font-semibold cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Input 1: Kumoten Cost */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="kumoten-cost" className="text-xs font-bold uppercase tracking-wider text-[#413333]">
                  Kumoten Cost (RM)
                </label>
                <span className="text-[11px] text-[#665555]">Base supplier invoice cost</span>
              </div>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sm font-bold text-[#665555]">
                  RM
                </div>
                <input
                  id="kumoten-cost"
                  type="number"
                  step="0.50"
                  min="0"
                  value={kumotenCost || ''}
                  onChange={(e) => setKumotenCost(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="block w-full pl-12 pr-4 py-3 bg-[#f5ebdd]/50 border-2 border-[#dfcfba] rounded-xl text-base font-black text-[#413333] focus:border-[#315b8c] focus:outline-none focus:bg-white transition-all"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Input 2: Target Selling Price */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="sell-price" className="text-xs font-bold uppercase tracking-wider text-[#413333]">
                  Target Selling Price (RM)
                </label>
                <span className="text-[11px] text-[#665555]">Price displayed to buyer</span>
              </div>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sm font-bold text-[#665555]">
                  RM
                </div>
                <input
                  id="sell-price"
                  type="number"
                  step="0.50"
                  min="0"
                  value={sellPrice || ''}
                  onChange={(e) => setSellPrice(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="block w-full pl-12 pr-4 py-3 bg-[#f5ebdd]/50 border-2 border-[#dfcfba] rounded-xl text-base font-black text-[#413333] focus:border-[#f2765e] focus:outline-none focus:bg-white transition-all"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Platform Selector Tabs */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#413333] block mb-2">
                Platform Focus
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setPlatform('side-by-side')}
                  className={`py-2 px-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    platform === 'side-by-side'
                      ? 'bg-[#315b8c] text-white border-[#315b8c]'
                      : 'bg-white text-[#413333] border-[#dfcfba] hover:bg-[#e8f0f8]'
                  }`}
                >
                  All 3 (Compare)
                </button>
                <button
                  type="button"
                  onClick={() => setPlatform('shopee')}
                  className={`py-2 px-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    platform === 'shopee'
                      ? 'bg-[#ea580c] text-white border-[#ea580c]'
                      : 'bg-white text-[#413333] border-[#dfcfba] hover:bg-orange-50'
                  }`}
                >
                  Shopee
                </button>
                <button
                  type="button"
                  onClick={() => setPlatform('tiktok')}
                  className={`py-2 px-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    platform === 'tiktok'
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-white text-[#413333] border-[#dfcfba] hover:bg-neutral-50'
                  }`}
                >
                  TikTok Shop
                </button>
                <button
                  type="button"
                  onClick={() => setPlatform('lazada')}
                  className={`py-2 px-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    platform === 'lazada'
                      ? 'bg-indigo-700 text-white border-indigo-700'
                      : 'bg-white text-[#413333] border-[#dfcfba] hover:bg-indigo-50'
                  }`}
                >
                  Lazada
                </button>
              </div>
            </div>

            {/* Seller Voucher / Discount Voucher Simulation Toggle */}
            <div className="pt-2 border-t border-[#dfcfba]/60">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#413333] flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeVoucher}
                    onChange={(e) => setIncludeVoucher(e.target.checked)}
                    className="w-4 h-4 text-[#f2765e] rounded border-gray-300 focus:ring-[#f2765e]"
                  />
                  <span>Simulate Seller Voucher / Discount</span>
                </label>
                {includeVoucher && (
                  <span className="text-[11px] font-bold text-[#f2765e]">Active</span>
                )}
              </div>

              {includeVoucher && (
                <div className="p-3 bg-[#fdeee9] rounded-xl border border-[#f2765e]/30 space-y-2 text-xs animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <span className="text-[#665555]">Shop Voucher Given:</span>
                    <div className="flex items-center gap-1">
                      <span className="font-bold">RM</span>
                      <input
                        type="number"
                        step="0.50"
                        min="0"
                        value={voucherAmount}
                        onChange={(e) => setVoucherAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="w-20 px-2 py-1 bg-white border border-[#dfcfba] rounded text-right font-bold text-[#413333]"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-[#8e7c7c]">
                    ⚠️ Note: Marketplaces charge commission on the <em>original price</em> even when you offer a shop voucher!
                  </p>
                </div>
              )}
            </div>

            {/* Floor Price Recommendation Box */}
            <div className="p-3.5 bg-[#e8f0f8] rounded-xl border border-[#315b8c]/20">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#315b8c] flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  Recommended Safe Floor Price:
                </span>
                <span className="text-base font-black text-[#315b8c]">
                  RM {currentCalc.safeFloorPrice.toFixed(2)}
                </span>
              </div>
              <p className="text-[11px] text-[#413333]/80 mt-1">
                Selling at or above <span className="font-bold">RM {currentCalc.safeFloorPrice.toFixed(2)}</span> guarantees you keep at least 15% net profit after all fees.
              </p>
            </div>

          </div>

          {/* Results Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Health Indicator Banner */}
            <div className={`p-5 rounded-2xl border-2 transition-all shadow-md ${
              isLoss 
                ? 'bg-rose-50 border-rose-500 text-rose-950' 
                : isThin 
                  ? 'bg-amber-50 border-amber-400 text-amber-950' 
                  : 'bg-emerald-50 border-emerald-500 text-emerald-950'
            }`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  {isLoss ? (
                    <XCircle className="w-8 h-8 text-rose-600 shrink-0 mt-0.5" />
                  ) : isThin ? (
                    <AlertCircle className="w-8 h-8 text-amber-600 shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-black tracking-wide uppercase ${
                        isLoss 
                          ? 'bg-rose-600 text-white' 
                          : isThin 
                            ? 'bg-amber-500 text-white' 
                            : 'bg-emerald-600 text-white'
                      }`}>
                        {isLoss ? 'CRITICAL LOSS ALERT' : isThin ? 'THIN MARGIN RISK' : 'SAFE & HEALTHY MARGIN'}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black mt-1">
                      {isLoss 
                        ? `You will lose RM ${Math.abs(currentCalc.netProfit).toFixed(2)} on every sale!` 
                        : isThin 
                          ? `Only ${margin.toFixed(1)}% margin. One return will make you lose money.` 
                          : `Solid ${margin.toFixed(1)}% Net Margin! Safe from fee swings.`
                      }
                    </h3>
                    <p className="text-xs sm:text-sm mt-1 opacity-90">
                      {isLoss
                        ? 'Marketplace commission + transaction fees exceed your markup. Raise your selling price immediately.'
                        : isThin
                          ? `Your break-even price is RM ${currentCalc.breakEvenPrice.toFixed(2)}. Consider bumping price to RM ${currentCalc.safeFloorPrice.toFixed(2)}.`
                          : `Great job! Even if Shopee/TikTok runs surprise promos, your Kumoten profit is well-protected.`
                      }
                    </p>
                  </div>
                </div>

                {/* Big Net Profit Display */}
                <div className="text-right shrink-0">
                  <span className="text-[11px] font-bold uppercase tracking-wider block opacity-75">Net Take-Home</span>
                  <span className={`text-2xl sm:text-3xl font-black ${
                    isLoss ? 'text-rose-600' : isThin ? 'text-amber-700' : 'text-emerald-700'
                  }`}>
                    {currentCalc.netProfit >= 0 ? '+' : ''}RM {currentCalc.netProfit.toFixed(2)}
                  </span>
                  <span className="block text-xs font-bold opacity-80">
                    ({margin.toFixed(1)}% margin)
                  </span>
                </div>
              </div>
            </div>

            {/* Platform Comparison Cards (Side-by-Side or Detailed Single) */}
            {platform === 'side-by-side' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Shopee Card */}
                <div className="bg-[#fdfaf6] p-4 rounded-xl border border-[#dfcfba] shadow-sm relative overflow-hidden">
                  <div className="w-full h-1 bg-[#ea580c] absolute top-0 left-0" />
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-[#ea580c]">Shopee MY</span>
                    <span className="text-[10px] text-[#665555]">~6.62% fees</span>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#665555]">
                      <span>Comm + Trans:</span>
                      <span className="font-semibold text-[#413333]">RM {shopeeCalc.totalFees.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[#665555]">
                      <span>Supplier Cost:</span>
                      <span className="font-semibold text-[#413333]">RM {kumotenCost.toFixed(2)}</span>
                    </div>
                    <div className="pt-2 border-t border-[#dfcfba]/60 flex justify-between font-bold">
                      <span>Net Profit:</span>
                      <span className={shopeeCalc.netProfit >= 0 ? 'text-emerald-700 font-black' : 'text-rose-600 font-black'}>
                        RM {shopeeCalc.netProfit.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-[11px] text-right font-medium text-[#665555]">
                      Margin: <span className="font-bold">{shopeeCalc.profitMargin.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

                {/* TikTok Shop Card */}
                <div className="bg-[#fdfaf6] p-4 rounded-xl border border-[#dfcfba] shadow-sm relative overflow-hidden">
                  <div className="w-full h-1 bg-neutral-900 absolute top-0 left-0" />
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-neutral-900">TikTok Shop</span>
                    <span className="text-[10px] text-[#665555]">~6.36% fees</span>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#665555]">
                      <span>Comm + Trans:</span>
                      <span className="font-semibold text-[#413333]">RM {tiktokCalc.totalFees.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[#665555]">
                      <span>Supplier Cost:</span>
                      <span className="font-semibold text-[#413333]">RM {kumotenCost.toFixed(2)}</span>
                    </div>
                    <div className="pt-2 border-t border-[#dfcfba]/60 flex justify-between font-bold">
                      <span>Net Profit:</span>
                      <span className={tiktokCalc.netProfit >= 0 ? 'text-emerald-700 font-black' : 'text-rose-600 font-black'}>
                        RM {tiktokCalc.netProfit.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-[11px] text-right font-medium text-[#665555]">
                      Margin: <span className="font-bold">{tiktokCalc.profitMargin.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

                {/* Lazada Card */}
                <div className="bg-[#fdfaf6] p-4 rounded-xl border border-[#dfcfba] shadow-sm relative overflow-hidden">
                  <div className="w-full h-1 bg-indigo-700 absolute top-0 left-0" />
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-indigo-700">Lazada MY</span>
                    <span className="text-[10px] text-[#665555]">~6.12% fees</span>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#665555]">
                      <span>Comm + Trans:</span>
                      <span className="font-semibold text-[#413333]">RM {lazadaCalc.totalFees.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[#665555]">
                      <span>Supplier Cost:</span>
                      <span className="font-semibold text-[#413333]">RM {kumotenCost.toFixed(2)}</span>
                    </div>
                    <div className="pt-2 border-t border-[#dfcfba]/60 flex justify-between font-bold">
                      <span>Net Profit:</span>
                      <span className={lazadaCalc.netProfit >= 0 ? 'text-emerald-700 font-black' : 'text-rose-600 font-black'}>
                        RM {lazadaCalc.netProfit.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-[11px] text-right font-medium text-[#665555]">
                      Margin: <span className="font-bold">{lazadaCalc.profitMargin.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              /* Single Platform Breakdown */
              <div className="bg-[#fdfaf6] p-5 rounded-2xl border border-[#dfcfba] shadow-sm">
                <h4 className="text-sm font-bold text-[#413333] mb-3 flex items-center justify-between">
                  <span>Detailed Fee Breakdown ({currentCalc === shopeeCalc ? 'Shopee' : currentCalc === lazadaCalc ? 'Lazada' : 'TikTok Shop'})</span>
                  <span className="text-xs text-[#665555]">Rates include SST</span>
                </h4>
                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="flex justify-between py-1.5 border-b border-[#dfcfba]/40 text-[#665555]">
                    <span>Gross Customer Selling Price</span>
                    <span className="font-bold text-[#413333]">RM {currentCalc.grossPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#dfcfba]/40 text-[#665555]">
                    <span>Marketplace Commission Fee</span>
                    <span className="font-medium text-rose-700">- RM {currentCalc.commissionFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#dfcfba]/40 text-[#665555]">
                    <span>Payment & Transaction Processing Fee</span>
                    <span className="font-medium text-rose-700">- RM {currentCalc.transactionFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#dfcfba]/40 text-[#665555]">
                    <span>Kumoten Supplier Invoice Cost</span>
                    <span className="font-medium text-rose-700">- RM {kumotenCost.toFixed(2)}</span>
                  </div>
                  {includeVoucher && (
                    <div className="flex justify-between py-1.5 border-b border-[#dfcfba]/40 text-[#665555]">
                      <span>Shop Voucher Funded by Seller</span>
                      <span className="font-medium text-rose-700">- RM {voucherAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 text-sm sm:text-base font-black text-[#413333]">
                    <span>Your Real Net In-Pocket:</span>
                    <span className={currentCalc.netProfit >= 0 ? 'text-emerald-700' : 'text-rose-600'}>
                      RM {currentCalc.netProfit.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Portal Teaser Conversion Callout */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#315b8c] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold uppercase tracking-wider justify-center sm:justify-start">
                  <Sparkles className="w-3.5 h-3.5" />
                  Upcoming Feature
                </div>
                <h4 className="font-bold text-base sm:text-lg">Want this calculated automatically for 1,000+ SKUs?</h4>
                <p className="text-xs sm:text-sm text-[#e8f0f8]/85 max-w-md">
                  Kumoten Smart Pricing Portal will sync live catalog costs and notify you when competitors force prices below your safety line.
                </p>
              </div>
              <button
                onClick={() => onScrollTo('early-access')}
                className="w-full sm:w-auto shrink-0 bg-[#f2765e] hover:bg-[#df644c] text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Lock In Early Access</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
