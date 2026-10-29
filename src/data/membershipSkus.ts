import { MembershipSku } from '../types';

export const MEMBERSHIP_SKUS: MembershipSku[] = [
  {
    id: 'tier_0',
    tierNumber: '首月0.01元',
    name: 'DXT通信充值会员',
    shortName: '通信充值会员',
    price: 1.99,
    firstMonthPrice: 0.01,
    renewalPrice: 1.99,
    nominalValue: 72.0,
    badge: '首月0.01元',
    highlight: '首月0.01元 · 每月必得2元话费直减',
    ecommerceCouponDesc: '电商神券随机2选1：最高50元新人立减券 / 满99减5专享券',
    serviceDesc: '2元话费直减券 + 抖音电商神券 + 签到美团生活券',
    bannerTheme: 'recharge',
    bannerTag: '🔥 极速回本 · 首月仅需0.01元',
    bannerTitle: '每月必得 2.00元话费券 + 最高50元电商券',
    bannerSubtitle: '连续签到免费领最高20元美团生活券',
    benefits: [
      {
        id: 't0_b1',
        type: 'phone_bill',
        title: '2元话费直减券',
        desc: '每月充话费立减2元现金（无门槛直接抵扣）',
        valueTag: '¥2.00 券',
        iconName: 'Smartphone',
        badge: '每月必得'
      },
      {
        id: 't0_b2',
        type: 'ecommerce',
        title: '抖音电商神券 随机2选1',
        desc: '最高50元电商新人券 / 满99减5专享券（随机立享）',
        valueTag: '最高 ¥50',
        iconName: 'ShoppingBag',
        badge: '惊喜2选1'
      },
      {
        id: 't0_b3',
        type: 'meituan',
        title: '美团生活券 签到福利',
        desc: '连续签到3天领10元券，连续签到5天领20元券',
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
