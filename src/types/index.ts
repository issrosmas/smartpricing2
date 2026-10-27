export type PlatformId = 'shopee' | 'lazada' | 'tiktok' | 'all';

export interface PlatformFeeConfig {
  id: 'shopee' | 'lazada' | 'tiktok';
  name: string;
  badgeColor: string;
  commissionRate: number; // e.g. 0.04 (4%)
  transactionFeeRate: number; // e.g. 0.0212 (2% + 6% SST or 2.12%)
  serviceFeeRate: number; // e.g. 0.015 (1.5% for free shipping programs)
  sstRate: number; // 0.08 on service/commission
}

export interface ProductPreset {
  id: string;
  name: string;
  category: string;
  kumotenCost: number;
  suggestedSellPrice: number;
  description: string;
}

export interface EarlyAccessLead {
  fullName: string;
  whatsapp: string;
  email: string;
  experienceLevel: string;
  platforms: string[];
  kumotenUser: 'yes' | 'no' | 'interested';
  timestamp: string;
  ticketId: string;
}
