import React, { useState } from 'react';
import { SimUserStatus, BenefitItem } from '../types';
import { CORE_BENEFITS_MATRIX } from '../data/prdData';
import { 
  Crown, 
  Ticket, 
  ShoppingBag,
  CheckCircle2,
  ChevronLeft,
  HelpCircle,
  Check
} from 'lucide-react';

interface VipMemberCenterProps {
  userStatus: SimUserStatus;
  onBackToRecharge: () => void;
  onOpenUnsubscribe: () => void;
  onClaimBenefit: (benefit: BenefitItem) => void;
  onOpenCheckout: (amount: number) => void;
}

export const VipMemberCenter: React.FC<VipMemberCenterProps> = ({
  userStatus,
  onBackToRecharge,
  onOpenUnsubscribe,
  onClaimBenefit,
  onOpenCheckout,
}) => {
  const isMember = userStatus === 'active_member' || userStatus === 'pending_renewal';

  // Track claimed benefits
  const [claimedBenefits, setClaimedBenefits] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleClaimCoupon = (benefit: BenefitItem) => {
    if (!isMember) {
      onOpenCheckout(50);
      return;
    }

    if (claimedBenefits[benefit.id]) {
      setToastMessage(`您已领取 ${benefit.title}`);
      setTimeout(() => setToastMessage(null), 2000);
      return;
    }

    // Mark as claimed
    setClaimedBenefits(prev => ({ ...prev, [benefit.id]: true }));
    setToastMessage(`🎉 领取成功！${benefit.title} 已放入券包`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="bg-[#EEF2F9] text-slate-900 min-h-full flex flex-col justify-between font-sans select-none">
      <div>
        {/* Header Bar */}
        <div className="bg-[#EEF2F9] px-3 pt-3 pb-1 flex items-center justify-between sticky top-0 z-20">
          <button 
            onClick={onBackToRecharge}
            className="p-1 rounded-full text-slate-900 hover:text-slate-700 hover:bg-slate-200/50 transition-colors shrink-0"
            title="返回"
          >
            <ChevronLeft className="w-6 h-6 text-slate-800" />
          </button>
          <span className="font-extrabold text-base tracking-tight text-slate-900 flex-1 text-center pr-6">
            动信通权益小程序
          </span>
        </div>

        <div className="p-3 space-y-3.5">

        {/* TOP HERO CONTAINER: ALWAYS REMAINS CONSTANT (CHARGE MEMBER PRODUCT PROMOTION) */}
        <div className="bg-gradient-to-br from-amber-100/90 via-orange-50 to-rose-100/80 border border-amber-300/80 rounded-3xl p-4 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-6 translate-x-6 w-36 h-36 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-1.5">
              <span className="bg-gradient-to-r from-amber-500 to-rose-500 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full shadow-sm">
                特惠强推
              </span>
              <span className="font-black text-sm text-slate-900 tracking-tight">【充值会员】连续包月</span>
            </div>
          </div>

          <div className="mt-3 relative z-10">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline space-x-1">
                <span className="text-xs text-[#FE2C55] font-black">仅需 ¥</span>
                <span className="text-3xl font-black italic text-[#FE2C55] tracking-tight">1.99</span>
                <span className="text-xs text-slate-500 font-medium">/月 (自动续费)</span>
              </div>
              <span className="bg-rose-500/10 text-rose-700 text-[11px] font-black px-2.5 py-1 rounded-full border border-rose-200">
                月省 4.00 元
              </span>
            </div>
          </div>

          {/* Benefit Highlights Checklist */}
          <div className="mt-3.5 pt-3 border-t border-amber-200/60 space-y-2 text-xs text-slate-700 relative z-10">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>话费直减</strong>：每月充值自动抵扣 <strong>2.00元</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>电商特权</strong>：每月赠送 <strong>2.00元</strong> 抖音商城通用券</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>安心保障</strong>：扣费前5天提醒，端内随时一键退订</span>
            </div>
          </div>

          {/* Subscribe Action Button */}
          <button
            onClick={() => onOpenCheckout(50)}
            className="mt-4 w-full bg-gradient-to-r from-amber-400 via-rose-500 to-red-500 hover:brightness-105 active:scale-[0.99] text-white font-black text-sm py-3 rounded-2xl shadow-md shadow-rose-500/20 transition-transform flex items-center justify-center space-x-2"
          >
            <Crown className="w-4 h-4 fill-white text-white" />
            <span>1.99元/月 立即开通（本单立省2元）</span>
          </button>
        </div>

        {/* SECTION 1: PURCHASED PRODUCT STATUS & COUPONS */}
        <div className="space-y-2.5">
          {/* 1. 已购买商品文字状态提示 (Text only status prompt) */}
          <div className="px-2 py-0.5 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-sm text-slate-800 tracking-tight">
                【充值会员】连续包月
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-black whitespace-nowrap border ${
                isMember 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                  : 'bg-slate-200/70 text-slate-600 border-slate-300/60'
              }`}>
                {isMember ? '已开通' : '未开通'}
              </span>
            </div>
          </div>

          {/* 2. Monthly Coupon Cards (话费券 & 电商券) */}
          <div className="space-y-2.5">
            {CORE_BENEFITS_MATRIX.filter(b => b.category === '会员权益').map((benefit) => {
              const isClaimed = !!claimedBenefits[benefit.id];
              return (
                <div 
                  key={benefit.id}
                  className="bg-white rounded-3xl p-3.5 flex items-center justify-between gap-2 shadow-sm border border-slate-100 relative overflow-hidden"
                >
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className={`w-11 h-11 rounded-2xl ${benefit.id === 'b1' ? 'bg-rose-50 text-[#FE2C55]' : 'bg-orange-50 text-orange-600'} flex items-center justify-center shrink-0 border border-slate-100`}>
                      {benefit.id === 'b1' ? <Ticket className="w-6 h-6" /> : <ShoppingBag className="w-6 h-6" />}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="font-extrabold text-sm text-slate-900 flex items-center space-x-1.5 min-w-0">
                        <span className="truncate">{benefit.title}</span>
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-black shrink-0 whitespace-nowrap ${
                          benefit.id === 'b1' ? 'bg-rose-100 text-[#FE2C55]' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {benefit.tag}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5 truncate">{benefit.subTitle}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleClaimCoupon(benefit)}
                    disabled={isMember && isClaimed}
                    className={`text-xs font-bold px-4 py-2 rounded-xl shadow-sm active:scale-95 transition-all shrink-0 whitespace-nowrap flex items-center space-x-1 ${
                      isMember && isClaimed
                        ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-default shadow-none'
                        : benefit.id === 'b1' 
                          ? 'bg-[#FE2C55] text-white hover:bg-[#e02648]' 
                          : 'bg-gradient-to-r from-rose-500 to-orange-500 text-white hover:brightness-105'
                    }`}
                  >
                    {isMember && isClaimed ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-0.5 text-emerald-500" />
                        <span>已领取</span>
                      </>
                    ) : (
                      <span>领取</span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-sm border border-slate-700/80 flex items-center space-x-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* SECTION 2: FAQ / QUESTION ANSWERS */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm space-y-2.5">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center space-x-1.5">
            <HelpCircle className="w-4 h-4 text-amber-500" />
            <span>常见问题</span>
          </h3>
          <div className="space-y-2 text-xs text-slate-600">
            <div>
              <span className="font-bold text-slate-800">Q: 2元话费券如何使用？</span>
              <p className="text-slate-500 text-[11px] mt-0.5">A: 会员领取后，在充值中心为绑定手机号充值时系统将自动抵扣。</p>
            </div>
            <div>
              <span className="font-bold text-slate-800">Q: 如何取消连续包月自动续费？</span>
              <p className="text-slate-500 text-[11px] mt-0.5">A: 在「抖音钱包-支付设置-自动扣款管理」中一键解绑，当月已发放权益继续有效。</p>
            </div>
          </div>
        </div>

        </div>
      </div>

      {/* FOOTER SERVICE INFO */}
      <div className="p-3 text-center text-[10px] text-slate-400 pb-5">
        动信通通信科技提供技术支持 · 服务电话 400-888-9999
      </div>
    </div>
  );
};
