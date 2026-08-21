export type AppTab = 'prototype' | 'prd' | 'dual';

export type SimUserStatus = 'non_member' | 'active_member' | 'pending_renewal' | 'cancelled_member';

export type PrototypeScreen = 'recharge_home' | 'vip_center' | 'order_confirm' | 'order_success' | 'order_detail';

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
