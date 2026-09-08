export type AppTab = 'prototype' | 'prd' | 'dual';

export type SimUserStatus = 'non_member' | 'active_member' | 'pending_renewal' | 'cancelled_member';

export type MembershipSkuId = 'tier_0' | 'tier_1' | 'tier_2' | 'tier_3';

export interface MembershipBenefitItem {
  id: string;
  type: 'ecommerce' | 'life' | 'drama' | 'meituan' | 'phone_bill';
  title: string;
  desc: string;
  valueTag: string;
  iconName: string;
  badge?: string;
  status?: 'available' | 'claimed' | 'used';
}

export interface MembershipSku {
  id: MembershipSkuId;
  tierNumber: string; // "档位 1" | "档位 2" | "档位 3"
  name: string;       // "黄金会员·生活包" 等
  shortName: string;  // "生活包" / "影音畅享包" / "黑金全景包"
  price: number;      // 9.9 | 19 | 29
  nominalValue: number; // 62 | 93 | 128
  badge: string;      // "尝鲜特惠" | "热卖爆款" | "尊享旗舰"
  highlight: string;
  ecommerceCouponDesc: string; // "电商券总价值10元（按核销计费）"
  serviceDesc: string;         // "生活服务+短剧+美团券（按下发计费）"
  benefits: MembershipBenefitItem[];
}

export type PrototypeScreen = 'recharge_home' | 'vip_center' | 'order_confirm' | 'order_success' | 'order_detail' | 'order_list' | 'renewal_management';

export interface SimOrder {
  orderId: string;
  createTime: string;
  productName: string;
  shopName: string;
  price: number;
  phone: string;
  billingPeriodText: string;
  paymentMethod: string;
  status: 'paid' | 'renewing' | 'cancelled';
}

export interface BenefitItem {
  id: string;
  category: '会员权益' | '通信查询与办理';
  title: string;
  subTitle: string;
  perceivedValue: string; // 用户感知价值, e.g. "¥2.00"
  actualCost: string;     // 实际交付成本, e.g. "¥2.00 (动信通承担)"
  tag: string;
  tagColor: string;
  icon: string;
  triggerScenario: string;
  actionText: string;
  businessReturn: string;
  status: 'available' | 'claimed' | 'used' | 'locked';
  description: string;
  details?: string[];
}

export interface UserJourneyStep {
  stepNumber: number;
  title: string;
  page: string;
  action: string;
  conversionGoal: string;
  keyDesign: string;
  touchpoint: string;
}

export interface PrdSection {
  id: string;
  title: string;
  subtitle: string;
}
