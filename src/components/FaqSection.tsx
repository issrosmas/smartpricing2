import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      q: "Kenapa saya boleh rugi walaupun saya jual mahal sikit dari harga Kumoten?",
      a: "Marketplaces macam Shopee, Lazada, dan TikTok Shop ada pelbagai caj tersembunyi: komisen kategori (biasanya 4% - 10%), yuran transaksi pembayaran (2.12%), yuran program Free Shipping (1.5% - 4.5%), serta Service Tax (SST). Jika anda mark up RM3 untuk barang RM20, yuran boleh mencecah RM3.20—menjadikan anda rugi 20 sen bagi setiap barang!"
    },
    {
      q: "Adakah portal ini percuma untuk peserta Early Access?",
      a: "Ya! Peserta yang mendaftar senarai VIP awal akan menikmati akses penuh percuma selama 3 bulan pertama apabila portal dilancarkan secara rasmi, serta panduan eksklusif 'Top 50 Produk Dropship Untung Tinggi di Malaysia'."
    },
    {
      q: "Saya suri rumah dan tak pandai IT. Senang ke nak guna?",
      a: "Sangat mudah! Portal direka khas supaya mesra telefon pintar (smartphone). Anda cuma perlu pilih atau cari barangan Kumoten, dan portal akan paparkan terus 'Harga Lantai Selamat' (Safe Floor Price) dengan warna Hijau (Selamat) atau Merah (Bahaya/Rugi). Tiada formula Excel diperlukan."
    },
    {
      q: "Bagaimana sistem ini tahu kadar komisen terkini Shopee, Lazada & TikTok?",
      a: "Enjin portal kami dikemaskini secara berterusan mengikut jadual rasmi komisen marketplace Malaysia, termasuk perubahan polisi yuran transaksi dan SST 2024-2026."
    },
    {
      q: "Adakah saya perlu mendaftar SSM sebelum boleh mula dropship?",
      a: "Anda boleh mula mendaftar akaun seller asas di Shopee dan TikTok Shop menggunakan nombor kad pengenalan (IC). Walau bagaimanapun, apabila jualan anda mula berkembang, mendaftar perniagaan SSM secara online (serendah RM30-RM60) adalah langkah terbaik untuk mengembangkan kedai anda."
    }
  ];

  return (
    <section id="faq" className="py-16 sm:py-20 bg-[#fdfaf6] border-t border-[#dfcfba]/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#315b8c]/10 text-[#315b8c] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Soalan Lazim (FAQ)
          </div>
          <h2 className="text-3xl font-black text-[#413333] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-[#665555]">
            Semua yang anda perlu tahu mengenai Kumoten Smart Pricing Portal & perlindungan margin dropship.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className="bg-[#f5ebdd]/70 rounded-2xl border border-[#dfcfba] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#413333] hover:text-[#f2765e] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 text-[#665555] transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#f2765e]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#665555] leading-relaxed border-t border-[#dfcfba]/50 bg-white/40">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
