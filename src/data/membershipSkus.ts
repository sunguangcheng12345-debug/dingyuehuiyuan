import { MembershipSku } from '../types';

export const MEMBERSHIP_SKUS: MembershipSku[] = [
  {
    id: 'tier_0',
    tierNumber: '特惠强推',
    name: '动信通充值会员',
    shortName: '动信通充值会员',
    price: 1.99,
    nominalValue: 6.0,
    badge: '特惠强推',
    highlight: '月省4.00元 · 本单立省2元',
    ecommerceCouponDesc: '每月赠送2.00元抖音商城通用券',
    serviceDesc: '话费直减2.00元+抖音电商券2.00元',
    benefits: [
      {
        id: 't0_b1',
        type: 'phone_bill',
        title: '2元话费直减券',
        desc: '每月充话费立减2元现金',
        valueTag: '¥2.00 券',
        iconName: 'Smartphone',
        badge: '立减特权'
      },
      {
        id: 't0_b2',
        type: 'ecommerce',
        title: '2元 抖音电商券',
        desc: '抖音商城全品类通用2元立减券',
        valueTag: '¥2.00 券',
        iconName: 'ShoppingBag',
        badge: '电商立减'
      }
    ]
  },
  {
    id: 'tier_1',
    tierNumber: '档位 1',
    name: '动信通·生活特惠月卡',
    shortName: '生活特惠包',
    price: 9.9,
    nominalValue: 62,
    badge: '超值入门',
    highlight: '月省52.1元 · 6.2倍超高回报',
    ecommerceCouponDesc: '电商券（按核销计费）总价值10元',
    serviceDesc: '生活服务+短剧+美团券（按下发计费）',
    benefits: [
      {
        id: 't1_b1',
        type: 'ecommerce',
        title: '抖音电商立减券',
        desc: '抖音商城/直播间全品类无门槛通用券包',
        valueTag: '总价值 ¥10.00',
        iconName: 'ShoppingBag',
        badge: '按核销计费'
      },
      {
        id: 't1_b2',
        type: 'life',
        title: '抖音生活服务券',
        desc: '抖音本地生活餐饮/生鲜/到店立减券',
        valueTag: '¥2.00 券',
        iconName: 'Store',
        badge: '按下发计费'
      },
      {
        id: 't1_b3',
        type: 'meituan',
        title: '美团专享神券包',
        desc: '包含外卖满减、餐饮美食、生鲜超市大额红包',
        valueTag: '¥50.00 券包',
        iconName: 'Utensils',
        badge: '按下发计费'
      }
    ]
  },
  {
    id: 'tier_2',
    tierNumber: '档位 2',
    name: '动信通·影音畅享月卡',
    shortName: '影音畅享包',
    price: 19.0,
    nominalValue: 93,
    badge: '爆款热卖',
    highlight: '短剧追更神器 · 外卖网购全拿下',
    ecommerceCouponDesc: '电商券（按核销计费）总价值13元',
    serviceDesc: '生活服务+短剧+美团券（按下发计费）',
    benefits: [
      {
        id: 't2_b1',
        type: 'ecommerce',
        title: '抖音电商立减券',
        desc: '抖音商城全品类大额立减券组合',
        valueTag: '总价值 ¥13.00',
        iconName: 'ShoppingBag',
        badge: '按核销计费'
      },
      {
        id: 't2_b2',
        type: 'drama',
        title: '抖音短剧双周卡',
        desc: '官方价值20元，免看广告，热播短剧解锁整部畅看',
        valueTag: '价值 ¥20.00',
        iconName: 'Film',
        badge: '热门短剧'
      },
      {
        id: 't2_b3',
        type: 'meituan',
        title: '美团超值神券包',
        desc: '美团外卖神券+到店餐饮专属组合补贴券',
        valueTag: '¥60.00 券包',
        iconName: 'Utensils',
        badge: '按下发计费'
      }
    ]
  },
  {
    id: 'tier_3',
    tierNumber: '档位 3',
    name: '动信通·黑金尊享月卡',
    shortName: '黑金全景包',
    price: 29.0,
    nominalValue: 128,
    badge: '尊享旗舰',
    highlight: '全权益顶配 · 整月无界追剧与外卖',
    ecommerceCouponDesc: '电商券（按核销计费）总价值20元',
    serviceDesc: '生活服务+短剧+美团券（按下发计费）',
    benefits: [
      {
        id: 't3_b1',
        type: 'ecommerce',
        title: '抖音电商大额券',
        desc: '高额立减券组合，支持直播小黄车大单抵扣',
        valueTag: '总价值 ¥20.00',
        iconName: 'ShoppingBag',
        badge: '按核销计费'
      },
      {
        id: 't3_b2',
        type: 'drama',
        title: '抖音短剧月卡',
        desc: '官方价值18元，全月畅享短剧会员特权，无限更新追更',
        valueTag: '整月 VIP (价值¥18)',
        iconName: 'Film',
        badge: '整月尊享'
      },
      {
        id: 't3_b3',
        type: 'meituan',
        title: '美团至尊神券包',
        desc: '美团外卖、买菜、打车高额抵扣超级礼包',
        valueTag: '¥90.00 券包',
        iconName: 'Utensils',
        badge: '豪华包'
      }
    ]
  }
];

export const getSkuById = (id: string): MembershipSku => {
  return MEMBERSHIP_SKUS.find(s => s.id === id) || MEMBERSHIP_SKUS[1];
};
