import { MembershipSku } from '../types';

export const MEMBERSHIP_SKUS: MembershipSku[] = [
  {
    id: 'tier_0',
    tierNumber: '首月0.01元',
    name: '通信充值会员',
    shortName: '通信充值会员',
    price: 1.99,
    firstMonthPrice: 0.01,
    renewalPrice: 1.99,
    nominalValue: 72.0,
    badge: '首月0.01元',
    highlight: '首月0.01元 · 每月必得2元话费直减',
    ecommerceCouponDesc: '抖音电商专享神券（立减5元，需手动领取，可在抖音APP-我-我的订单-券红包查看）',
    serviceDesc: '2元话费直减券 + 抖音电商神券 + 签到美团生活券',
    bannerTheme: 'recharge',
    bannerTag: '🔥 极速回本 · 首月仅需0.01元',
    bannerTitle: '每月必得 2.00元话费券 + 5元电商立减券',
    bannerSubtitle: '连续签到免费领最高20元美团生活券',
    benefits: [
      {
        id: 't0_b1',
        type: 'phone_bill',
        title: '2元话费直减券',
        desc: '每月充话费立减2元现金（需手动领取，充值自动抵扣）',
        valueTag: '¥2.00 券',
        iconName: 'Smartphone',
        badge: '每月必得'
      },
      {
        id: 't0_b2',
        type: 'ecommerce',
        title: '抖音电商专享神券',
        desc: '专享立减5元（满99可用，需手动领取，在抖音APP-我-我的订单-券红包查看）',
        valueTag: '立减 ¥5',
        iconName: 'ShoppingBag',
        badge: '专享立减'
      },
      {
        id: 't0_b3',
        type: 'meituan',
        title: '美团生活券 签到福利',
        desc: '连续签到3天领10元，5天领20元（需手动领取，在美团app-我的-红包卡券查看）',
        valueTag: '最高 ¥20',
        iconName: 'Utensils',
        badge: '签到专享'
      }
    ]
  }
];

export const getSkuById = (id: string): MembershipSku => {
  return MEMBERSHIP_SKUS.find(s => s.id === id) || MEMBERSHIP_SKUS[0];
};
