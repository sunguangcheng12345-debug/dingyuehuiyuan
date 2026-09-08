import React from 'react';
import { 
  ChevronLeft, 
  Check, 
  Clock, 
  Smartphone, 
  ShoppingBag, 
  Film, 
  Utensils, 
  Store,
  Info
} from 'lucide-react';
import { MembershipSku } from '../types';

interface BenefitDetailPageProps {
  sku: MembershipSku;
  expiryDateStr: string;
  userPhone?: string;
  onBack: () => void;
}

export const BenefitDetailPage: React.FC<BenefitDetailPageProps> = ({
  sku,
  expiryDateStr,
  userPhone = '18518920637',
  onBack,
}) => {
  const displayPhone = userPhone && userPhone.length === 11 
    ? `${userPhone.slice(0, 3)}****${userPhone.slice(7)}` 
    : '199****0909';

  // 根据 SKU 生成具体的已领取权益卡片列表（高度契合截图2样式）
  const getBenefitItems = () => {
    switch (sku.id) {
      case 'tier_0':
        return [
          {
            id: 'b1',
            title: '2元话费直减券',
            badge: '立减特权',
            badgeBg: 'bg-[#FFE8E8]',
            badgeColor: 'text-[#FE2C55]',
            desc: '每月充话费立减2元现金',
            iconType: 'ticket',
            iconBg: 'bg-[#FFF0F2]',
          },
          {
            id: 'b2',
            title: '2元 抖音电商券',
            badge: '电商立减',
            badgeBg: 'bg-[#FFF0E6]',
            badgeColor: 'text-[#FF6A18]',
            desc: '抖音商城全品类通用2元立减券',
            iconType: 'ecommerce',
            iconBg: 'bg-[#FFF5EB]',
          },
        ];
      case 'tier_1':
        return [
          {
            id: 'b1',
            title: '10元 抖音电商券包',
            badge: '电商立减',
            badgeBg: 'bg-[#FFF0E6]',
            badgeColor: 'text-[#FF6A18]',
            desc: '抖音商城/直播间全品类通用券包',
            iconType: 'ecommerce',
            iconBg: 'bg-[#FFF5EB]',
          },
          {
            id: 'b2',
            title: '美团专享神券包',
            badge: '外卖神券',
            badgeBg: 'bg-[#FFFBEB]',
            badgeColor: 'text-[#D97706]',
            desc: '包含外卖满减、餐饮美食大额红包',
            iconType: 'meituan',
            iconBg: 'bg-[#FFFBEB]',
          },
          {
            id: 'b3',
            title: '抖音生活服务券',
            badge: '到店立减',
            badgeBg: 'bg-[#ECFDF5]',
            badgeColor: 'text-[#059669]',
            desc: '本地生活餐饮、打车优惠券组合',
            iconType: 'life',
            iconBg: 'bg-[#ECFDF5]',
          },
        ];
      case 'tier_2':
        return [
          {
            id: 'b1',
            title: '13元 抖音电商专享券',
            badge: '电商立减',
            badgeBg: 'bg-[#FFF0E6]',
            badgeColor: 'text-[#FF6A18]',
            desc: '抖音商城全品类大额立减券组合',
            iconType: 'ecommerce',
            iconBg: 'bg-[#FFF5EB]',
          },
          {
            id: 'b2',
            title: '抖音短剧双周卡',
            badge: '短剧畅看',
            badgeBg: 'bg-[#F5F3FF]',
            badgeColor: 'text-[#7C3AED]',
            desc: '官方价值20元，免看广告，热播短剧解锁整部畅看',
            iconType: 'drama',
            iconBg: 'bg-[#F5F3FF]',
          },
          {
            id: 'b3',
            title: '美团超值神券包',
            badge: '生活特权',
            badgeBg: 'bg-[#FFFBEB]',
            badgeColor: 'text-[#D97706]',
            desc: '美团外卖神券+到店餐饮专属组合红包',
            iconType: 'meituan',
            iconBg: 'bg-[#FFFBEB]',
          },
        ];
      case 'tier_3':
      default:
        return [
          {
            id: 'b1',
            title: '20元 抖音电商大额券',
            badge: '电商立减',
            badgeBg: 'bg-[#FFF0E6]',
            badgeColor: 'text-[#FF6A18]',
            desc: '高额立减券组合，支持商城与直播间抵扣',
            iconType: 'ecommerce',
            iconBg: 'bg-[#FFF5EB]',
          },
          {
            id: 'b2',
            title: '抖音短剧月卡',
            badge: '整月尊享',
            badgeBg: 'bg-[#F5F3FF]',
            badgeColor: 'text-[#7C3AED]',
            desc: '官方价值18元，全月短剧会员特权免广告畅看',
            iconType: 'drama',
            iconBg: 'bg-[#F5F3FF]',
          },
          {
            id: 'b3',
            title: '美团至尊神券包',
            badge: '豪华包',
            badgeBg: 'bg-[#FFFBEB]',
            badgeColor: 'text-[#D97706]',
            desc: '美团外卖、买菜、打车高额抵扣超级礼包',
            iconType: 'meituan',
            iconBg: 'bg-[#FFFBEB]',
          },
        ];
    }
  };

  const benefitItems = getBenefitItems();

  return (
    <div className="flex flex-col h-full bg-[#F4F6F9] select-none text-slate-800">
      {/* 顶部小程序胶囊导航栏 */}
      <div className="bg-white px-4 py-3 border-b border-slate-100 flex items-center justify-between shrink-0 sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center space-x-2">
          <button 
            onClick={onBack}
            className="w-8 h-8 -ml-1 rounded-full flex items-center justify-center hover:bg-slate-100 active:bg-slate-200 text-slate-700 transition-colors"
            title="返回主页面"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <span className="font-extrabold text-sm text-slate-900 tracking-tight">
            权益明细
          </span>
        </div>

        {/* 仿微信/抖音小程序头部右上角功能胶囊 */}
        <div className="flex items-center space-x-1.5">
          <button className="text-[11px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-full transition-colors">
            反馈
          </button>
          <div className="flex items-center bg-slate-100/90 border border-slate-200/80 rounded-full px-2 py-1 space-x-2 text-slate-700">
            <span className="text-[10px] font-black tracking-widest leading-none">···</span>
            <span className="h-2.5 w-[1px] bg-slate-300" />
            <span className="text-[10px] font-black leading-none">✕</span>
          </div>
        </div>
      </div>

      {/* 页面内容滑动区域 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar">
        {/* 顶部所属商品卡片 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 min-w-0">
              <span className="text-base font-black text-slate-900 truncate">
                {sku.name}
              </span>
              <span className="bg-[#E6F8F0] text-[#00B578] text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-0.5 shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
                <span>已生效</span>
              </span>
            </div>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md shrink-0">
              ¥{sku.price.toFixed(2)}/月
            </span>
          </div>
        </div>

        {/* 权益明细列表标题 */}
        <div className="flex items-center justify-between px-1 pt-1">
          <span className="text-xs font-black text-slate-800 tracking-tight">
            全部权益
          </span>
          <span className="text-[11px] text-emerald-600 font-bold flex items-center space-x-1">
            <Check className="w-3 h-3 stroke-[2.5]" />
            <span>本月已自动全量发放</span>
          </span>
        </div>

        {/* 权益明细卡片列表（像素级复刻截图2） */}
        <div className="space-y-2.5">
          {benefitItems.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-2xl p-3.5 shadow-2xs border border-slate-100/90 flex items-center justify-between transition-all"
            >
              {/* 左侧图标与文本 */}
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                {/* 专门图标容器 (仿截图粉底/橙底方块图标) */}
                <div className={`w-12 h-12 rounded-2xl ${item.iconBg} flex items-center justify-center shrink-0 border border-slate-100/80`}>
                  {item.iconType === 'ticket' ? (
                    <div className="w-6 h-4 border-[1.6px] border-[#FE2C55] rounded-[2px] border-dashed flex items-center justify-center relative">
                      <div className="w-0.5 h-2.5 bg-[#FE2C55]/20 rounded-full" />
                    </div>
                  ) : item.iconType === 'ecommerce' ? (
                    <ShoppingBag className="w-6 h-6 text-[#FF6A18] stroke-[1.8]" />
                  ) : item.iconType === 'drama' ? (
                    <Film className="w-6 h-6 text-[#7C3AED] stroke-[1.8]" />
                  ) : item.iconType === 'meituan' ? (
                    <Utensils className="w-6 h-6 text-[#D97706] stroke-[1.8]" />
                  ) : item.iconType === 'life' ? (
                    <Store className="w-6 h-6 text-[#059669] stroke-[1.8]" />
                  ) : (
                    <Smartphone className="w-6 h-6 text-slate-600 stroke-[1.8]" />
                  )}
                </div>

                {/* 权益标题与说明 */}
                <div className="space-y-1 min-w-0 pr-2">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-sm font-extrabold text-slate-900 truncate">
                      {item.title}
                    </span>
                    <span className={`${item.badgeBg} ${item.badgeColor} text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0`}>
                      {item.badge}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 truncate font-normal">
                    {item.desc}
                  </div>
                </div>
              </div>

              {/* 右侧已发放药丸标签 */}
              <div className="bg-[#E6F8F0] text-[#00B578] text-xs font-bold px-2.5 py-1 rounded-full flex items-center space-x-1 shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>已发放</span>
              </div>
            </div>
          ))}
        </div>

        {/* 权益使用说明卡片 */}
        <div className="bg-slate-100/70 rounded-xl p-3 text-[11px] text-slate-500 space-y-1 font-medium border border-slate-200/60 mb-6">
          <div className="flex items-center space-x-1 font-bold text-slate-700 mb-1">
            <Info className="w-3.5 h-3.5 text-slate-500" />
            <span>权益使用指引</span>
          </div>
          <div>• 话费直减券：充话费时系统自动抵扣立减，无需手动领券兑换；</div>
          <div>• 抖音电商券：已直发至该手机号绑定的抖音账号卡券包，在抖音商城下单自动立减；</div>
          <div>• 短剧畅看与美团神券：可在对应页面直接使用或查看券码，下月续费时自动更新发放。</div>
        </div>
      </div>
    </div>
  );
};
