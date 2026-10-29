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
  tierNumber: string; // "特惠强推" 等
  name: string;       // "DXT通信充值会员"
  shortName: string;  // "通信充值会员"
  price: number;      // 1.99 续费价格
  firstMonthPrice?: number; // 0.01 首月特惠价格
  renewalPrice?: number;    // 1.99 次月续费价格
  nominalValue: number; // 感知价值如 72.0
  badge: string;      // "特惠立省"
  highlight: string;
  ecommerceCouponDesc: string; // "随机2选1：50元抖音电商新人券 / 满99减5专享券"
  serviceDesc: string;         // "2元话费直减券 + 抖音电商神券 + 签到美团生活券"
  benefits: MembershipBenefitItem[];
  // 头图与商品卡片视觉吸引力配置
  bannerTitle?: string;        // 核心吸引点大标题
  bannerSubtitle?: string;     // 副标题或核心卖点
  bannerTag?: string;          // 视觉角标如 "🔥 特惠强推"
  bannerTheme?: 'recharge' | 'life' | 'drama' | 'blackgold';
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
