import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  Gift, 
  Share2, 
  Clock, 
  Award, 
  ChevronDown,
  FileSpreadsheet,
  Mail,
  ExternalLink
} from 'lucide-react';
import { EarlyAccessLead } from '../types/index.ts';
import { getCachedAccessToken, signInWithGoogleWorkspace, createOrAppendToSpreadsheet, sendWelcomeEmailViaGmail } from '../services/googleWorkspace.ts';

const STORAGE_KEY = 'kumoten_smart_pricing_vip_lead';
const CUSTOM_SHEET_KEY = 'kumoten_custom_spreadsheet_url';

export const EarlyAccessForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Brand New (Belum Mula Lagi)');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Shopee', 'TikTok Shop']);
  const [kumotenUser, setKumotenUser] = useState<'yes' | 'no' | 'interested'>('interested');
  
  const [isLoading, setIsLoading] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<EarlyAccessLead | null>(null);
  const [formError, setFormError] = useState('');
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [sheetUrl, setSheetUrl] = useState<string | null>(null);

  // Load existing VIP ticket from localStorage if already registered
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setSubmittedLead(JSON.parse(saved));
      }
      const customSheet = localStorage.getItem(CUSTOM_SHEET_KEY);
      if (customSheet) {
        setSheetUrl(customSheet);
      }
    } catch (e) {
      console.error('Failed to load lead from storage', e);
    }
  }, []);

  const handlePlatformToggle = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const executeGoogleSync = async (lead: EarlyAccessLead) => {
    setSyncStatus('Connecting to Google Workspace and pushing to your Spreadsheet...');
    try {
      let token = getCachedAccessToken();
      if (!token) {
        const authRes = await signInWithGoogleWorkspace();
        token = authRes.accessToken;
      }

      const customSheet = localStorage.getItem(CUSTOM_SHEET_KEY) || undefined;

      // 1. Create or Append to Google Sheet (using custom URL if provided)
      const sheetRes = await createOrAppendToSpreadsheet(token, lead, customSheet);
      setSheetUrl(sheetRes.spreadsheetUrl);

      // 2. Send Welcome Email via Gmail
      try {
        await sendWelcomeEmailViaGmail(token, lead.email, lead.fullName, lead.ticketId);
      } catch (mailErr) {
        console.error('Gmail send error:', mailErr);
      }

      setSyncStatus('Success! Lead captured into your Google Spreadsheet & Welcome email sent via Gmail.');
    } catch (err: any) {
      console.error('Google sync error:', err);
      setSyncStatus(`VIP Pass saved locally. (Google Sync note: ${err?.message || 'Cancelled or requires permission'})`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSyncStatus(null);

    if (!fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!whatsapp.trim() || whatsapp.replace(/\D/g, '').length < 8) {
      setFormError('Please enter a valid Malaysian WhatsApp number (e.g. 012-3456789).');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      const ticketNumber = Math.floor(1000 + Math.random() * 9000);
      const newLead: EarlyAccessLead = {
        fullName: fullName.trim(),
        whatsapp: whatsapp.trim(),
        email: email.trim(),
        experienceLevel,
        platforms: selectedPlatforms,
        kumotenUser,
        timestamp: new Date().toLocaleDateString('en-MY', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }),
        ticketId: `VIP-${ticketNumber}`
      };

      // Save locally
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newLead));
      setSubmittedLead(newLead);

      // Attempt automatic Google Sheet sync if token exists, or prompt
      const token = getCachedAccessToken();
      if (token) {
        await executeGoogleSync(newLead);
      } else {
        setSyncStatus('VIP Pass secured! Click below to push data directly into your Google Spreadsheet.');
      }
    } catch (err: any) {
      setFormError(err?.message || 'Failed to submit form.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualSync = async () => {
    if (!submittedLead) return;
    setIsLoading(true);
    await executeGoogleSync(submittedLead);
    setIsLoading(false);
  };

  const handleShareToWhatsApp = () => {
    const text = encodeURIComponent(
      `Jom check calculator untung dropship ni! Kumoten Smart Pricing Portal boleh kira komisen Shopee, Lazada & TikTok Shop automatik. Daftar VIP awal dapat free 3 bulan: ${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <section id="early-access" className="py-16 sm:py-24 bg-[#f5ebdd] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* If already submitted: Display VIP Confirmation Card */}
        {submittedLead ? (
          <div className="bg-[#fdfaf6] rounded-3xl p-6 sm:p-10 border-2 border-[#f2765e] shadow-2xl space-y-6 text-center animate-in zoom-in-95 duration-200">
            
            {/* VIP Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-extrabold shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>You're on the VIP list!</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-black text-[#413333] tracking-tight">
                Tahniah, {submittedLead.fullName.split(' ')[0]}! 🎉
              </h2>
              <p className="text-sm sm:text-base text-[#665555] max-w-xl mx-auto">
                Your VIP Early Access spot is secured. We will WhatsApp you at <strong className="text-[#315b8c]">{submittedLead.whatsapp}</strong> when beta invitations roll out.
              </p>
            </div>

            {/* Google Sheets Sync Status & Button */}
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#e8f0f8] border border-[#315b8c]/30 text-left space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#315b8c]">
                <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                <span>Google Spreadsheet Capture Status:</span>
              </div>
              <p className="text-xs text-[#665555]">
                {syncStatus || 'Ready to capture lead data into your Google Spreadsheet and send welcome email via Gmail.'}
              </p>

              {sheetUrl ? (
                <a
                  href={sheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-black bg-emerald-700 text-white px-4 py-2 rounded-xl shadow-xs hover:bg-emerald-800 transition-colors"
                >
                  <span>Open Linked Google Sheet</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={handleManualSync}
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#315b8c] hover:bg-[#254770] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>{isLoading ? 'Connecting & Syncing...' : 'Connect Google & Push to Your Spreadsheet'}</span>
                </button>
              )}
            </div>

            {/* Simulated VIP Ticket Pass */}
            <div className="max-w-md mx-auto bg-gradient-to-br from-[#315b8c] to-[#1b324e] text-white p-6 rounded-2xl shadow-xl text-left relative overflow-hidden border border-[#315b8c]/50">
              <div className="absolute top-0 right-0 translate-x-4 -translate-y-4 w-32 h-32 bg-[#f2765e]/20 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#f2765e] flex items-center justify-center font-bold text-sm">
                    K
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-200">Official Beta Pass</p>
                    <p className="text-sm font-black">Kumoten Smart Pricing</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase text-white/60 block font-semibold">Priority Pass</span>
                  <span className="font-mono text-sm font-black text-[#f2765e] bg-white px-2 py-0.5 rounded">
                    {submittedLead.ticketId}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-white/60 block text-[10px]">Registered Name</span>
                  <span className="font-bold text-white truncate block">{submittedLead.fullName}</span>
                </div>
                <div>
                  <span className="text-white/60 block text-[10px]">Target Channels</span>
                  <span className="font-bold text-white truncate block">{submittedLead.platforms.join(', ')}</span>
                </div>
                <div>
                  <span className="text-white/60 block text-[10px]">Seller Tier</span>
                  <span className="font-bold text-white truncate block">{submittedLead.experienceLevel}</span>
                </div>
                <div>
                  <span className="text-white/60 block text-[10px]">VIP Launch Perk</span>
                  <span className="font-bold text-amber-300">3 Months 100% Free</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleShareToWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                Share to WhatsApp Friends / Group
              </button>
              
              <button
                onClick={() => {
                  localStorage.removeItem(STORAGE_KEY);
                  setSubmittedLead(null);
                  setSheetUrl(null);
                }}
                className="text-xs text-[#665555] hover:text-[#413333] underline py-2 cursor-pointer"
              >
                Register another person
              </button>
            </div>

          </div>
        ) : (
          /* Main Lead Capture Form */
          <div className="bg-[#fdfaf6] rounded-3xl p-6 sm:p-10 border border-[#dfcfba] shadow-xl">
            
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2765e]/15 text-[#f2765e] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Limited Early Beta
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#413333] tracking-tight">
                Claim Your Free VIP Early Access
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#665555]">
                Be the first to access the automated multi-platform comparison portal before the public launch. Free 3 months VIP tier for early birds!
              </p>
            </div>

            {formError && (
              <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-600" />
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Name & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Full Name */}
                <div>
                  <label htmlFor="fullname" className="block text-xs font-bold uppercase tracking-wider text-[#413333] mb-1.5">
                    Full Name <span className="text-[#f2765e]">*</span>
                  </label>
                  <input
                    id="fullname"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Siti Nurhaliza / Tan Wei Ming"
                    className="w-full px-4 py-3 bg-[#f5ebdd]/40 border-2 border-[#dfcfba] rounded-xl text-sm font-semibold text-[#413333] focus:border-[#315b8c] focus:outline-none focus:bg-white transition-all placeholder:text-[#8e7c7c]"
                  />
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label htmlFor="whatsapp" className="block text-xs font-bold uppercase tracking-wider text-[#413333] mb-1.5">
                    WhatsApp Number <span className="text-[#f2765e]">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-xs font-bold text-[#665555]">
                      🇲🇾 +60
                    </span>
                    <input
                      id="whatsapp"
                      type="tel"
                      required
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="12-345 6789"
                      className="w-full pl-16 pr-4 py-3 bg-[#f5ebdd]/40 border-2 border-[#dfcfba] rounded-xl text-sm font-semibold text-[#413333] focus:border-[#315b8c] focus:outline-none focus:bg-white transition-all placeholder:text-[#8e7c7c]"
                    />
                  </div>
                  <span className="text-[10px] text-[#665555] mt-1 block">We will WhatsApp you your beta invite link. No spam, ever.</span>
                </div>

              </div>

              {/* Row 2: Email & Experience Level */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#413333] mb-1.5">
                    Email Address <span className="text-[#f2765e]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@gmail.com"
                    className="w-full px-4 py-3 bg-[#f5ebdd]/40 border-2 border-[#dfcfba] rounded-xl text-sm font-semibold text-[#413333] focus:border-[#315b8c] focus:outline-none focus:bg-white transition-all placeholder:text-[#8e7c7c]"
                  />
                  <span className="text-[10px] text-[#665555] mt-1 block">For your free high-margin item cheat-sheet.</span>
                </div>

                {/* Experience Level Dropdown */}
                <div>
                  <label htmlFor="experience" className="block text-xs font-bold uppercase tracking-wider text-[#413333] mb-1.5">
                    Dropship Experience Level <span className="text-[#f2765e]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="experience"
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="w-full px-4 py-3 bg-[#f5ebdd]/40 border-2 border-[#dfcfba] rounded-xl text-sm font-semibold text-[#413333] focus:border-[#315b8c] focus:outline-none focus:bg-white transition-all appearance-none cursor-pointer"
                    >
                      <option value="Brand New (Belum Mula Lagi)">🌱 Brand New / Belum Mula Lagi</option>
                      <option value="Beginner (< 3 months)">👶 Beginner (&lt; 3 Months Selling)</option>
                      <option value="Active Seller (RM1k - RM5k / month)">💼 Active Seller (RM 1k - RM 5k/month)</option>
                      <option value="Scaling Seller (> RM5k / month)">🚀 Scaling Seller (&gt; RM 5k/month)</option>
                      <option value="Full-Time E-Commerce Business">🏆 Full-Time E-Commerce Operator</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#665555] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

              </div>

              {/* Preferred Marketplaces Checkboxes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#413333] mb-2">
                  Marketplaces You Sell (or Wish to Sell) On:
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {['Shopee', 'TikTok Shop', 'Lazada'].map((p) => {
                    const isChecked = selectedPlatforms.includes(p);
                    return (
                      <button
                        type="button"
                        key={p}
                        onClick={() => handlePlatformToggle(p)}
                        className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-[#315b8c] text-white border-[#315b8c] shadow-xs'
                            : 'bg-[#f5ebdd]/50 text-[#413333] border-[#dfcfba] hover:bg-[#e8dccb]'
                        }`}
                      >
                        <span className={`w-3 h-3 rounded-full flex items-center justify-center text-[8px] ${
                          isChecked ? 'bg-white text-[#315b8c] font-black' : 'border border-[#665555]'
                        }`}>
                          {isChecked ? '✓' : ''}
                        </span>
                        <span>{p}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Kumoten User Status */}
              <div className="p-3.5 bg-[#f5ebdd]/60 rounded-xl border border-[#dfcfba] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs font-semibold text-[#413333]">Do you already have a Kumoten account?</span>
                <div className="flex items-center gap-2">
                  {[
                    { id: 'yes', label: 'Yes' },
                    { id: 'no', label: 'Not Yet' },
                    { id: 'interested', label: 'Need Help To Start' }
                  ].map((opt) => (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => setKumotenUser(opt.id as any)}
                      className={`text-xs px-2.5 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                        kumotenUser === opt.id
                          ? 'bg-[#f2765e] text-white border-[#f2765e]'
                          : 'bg-white text-[#413333] border-[#dfcfba]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA Button Styled in #f2765e */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 px-6 rounded-xl bg-[#f2765e] hover:bg-[#df644c] active:scale-[0.99] text-white font-black text-base sm:text-lg shadow-lg shadow-[#f2765e]/35 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Capturing to Spreadsheet & Securing Pass...</span>
                    </div>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-amber-200" />
                      <span>Join The VIP Early Access (100% Free)</span>
                      <Send className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              </div>

              {/* Reassurance Guarantee Footer */}
              <div className="pt-2 text-center text-xs text-[#665555] flex flex-wrap items-center justify-center gap-4">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> No credit card needed
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#315b8c]" /> Instant spreadsheet sync
                </span>
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#f2765e]" /> Free 3-month VIP tier
                </span>
              </div>

            </form>

          </div>
        )}

      </div>
    </section>
  );
};
