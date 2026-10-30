import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  ShoppingBag, 
  Utensils, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Gift, 
  Calendar, 
  HelpCircle, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  X, 
  Award,
  RefreshCw,
  Clock,
  CreditCard,
  Lock,
  BadgePercent,
  Check,
  ChevronDown,
  ChevronUp,
  Info,
  Crown,
  Ticket,
  User,
  Plus,
  Compass
} from 'lucide-react';
import { MembershipSku } from '../types';
import { MEMBERSHIP_SKUS } from '../data/membershipSkus';

interface VipMemberCenterProps {
  onOpenCheckout: (sku?: MembershipSku) => void;
  onViewBenefitDetail?: (benefitId: string) => void;
  onNavigateHome?: () => void;
  onNavigateOrderDetail?: () => void;
  onBackToRecharge?: () => void;
  isMember?: boolean;
  userStatus?: string;
  subscribedSkuIds?: string[];
  userPhone?: string;
  onGoToRenewalManagement?: () => void;
}

export const VipMemberCenter: React.FC<VipMemberCenterProps> = ({
  onOpenCheckout,
  onNavigateHome,
  onNavigateOrderDetail,
  onBackToRecharge,
  isMember: isMemberProp,
  userStatus,
  subscribedSkuIds,
  userPhone = '18518920637',
  onGoToRenewalManagement,
}) => {
  const isMember = isMemberProp ?? (userStatus === 'active_member' || (subscribedSkuIds && subscribedSkuIds.length > 0));
  const isExpired = userStatus === 'cancelled_member';
  const currentSku = MEMBERSHIP_SKUS[0]; // DXT通信充值会员

  // Interactive States
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showRuleModal, setShowRuleModal] = useState<'notice' | 'business' | 'privacy' | 'strategy' | null>(null);

  // Daily Sign-in State (连续签到3天领10元美团券，5天领20元美团券)
  const [checkInDays, setCheckInDays] = useState<number>(isMember ? 2 : 0);
  const [hasCheckedInToday, setHasCheckedInToday] = useState<boolean>(false);
  const [claimedMeituan10, setClaimedMeituan10] = useState<boolean>(false);
  const [claimedMeituan20, setClaimedMeituan20] = useState<boolean>(false);
  const [showRewardModal, setShowRewardModal] = useState<{ title: string; desc: string; value: string; badge: string } | null>(null);

  // Random 2-in-1 eCommerce Coupon State (前端展示随机2选1，后端基于新老客下发50元或99减5)
  const [simulatedUserType, setSimulatedUserType] = useState<'new_user' | 'regular_user'>('new_user');
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  // 优惠券领取状态 (已开通DXT会员页面：初始展示「立即领取」，点击领取后文案变为「已领取」)
  const [billCouponClaimed, setBillCouponClaimed] = useState<boolean>(false);
  const [ecomCouponClaimed, setEcomCouponClaimed] = useState<boolean>(false);

  // 状态切换时重置为待领取初始态，方便演示
  useEffect(() => {
    setBillCouponClaimed(false);
    setEcomCouponClaimed(false);
    setIsRevealed(false);
  }, [isMember]);

  // FAQ Accordion Open State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Sign-in Click Handler
  const handleCheckIn = () => {
    if (!isMember) {
      showToast('请先开通DXT充值会员即可每日签到打卡！');
      return;
    }
    if (hasCheckedInToday) {
      showToast('今日已完成打卡，明天记得继续来打卡领券哦~');
      return;
    }
    const newDays = checkInDays + 1;
    setCheckInDays(newDays);
    setHasCheckedInToday(true);

    if (newDays === 3) {
      showToast('🎉 恭喜已连续签到满3天！可免费领取10元美团生活券');
    } else if (newDays >= 5) {
      showToast('🔥 恭喜已连续签到满5天！可免费领取20元美团生活券');
    } else {
      showToast(`打卡成功！已连续打卡 ${newDays} 天，继续保持！`);
    }
  };

  // Claim Meituan Reward
  const handleClaimMeituan = (tier: 10 | 20) => {
    if (!isMember) {
      showToast('请开通会员后参与签到领券');
      return;
    }
    if (tier === 10) {
      if (checkInDays < 3) {
        showToast(`还需连续签到 ${3 - checkInDays} 天即可领取10元美团生活券`);
        return;
      }
      if (claimedMeituan10) {
        showToast('您已成功领取10元美团生活券');
        return;
      }
      setClaimedMeituan10(true);
      setShowRewardModal({
        badge: '生活优惠券',
        title: '美团生活券 10元 已发放',
        desc: '已成功存入美团卡券包，外卖、美食餐饮到店无门槛立减！',
        value: '¥10.00'
      });
    } else if (tier === 20) {
      if (checkInDays < 5) {
        showToast(`还需连续签到 ${5 - checkInDays} 天即可领取20元美团生活券`);
        return;
      }
      if (claimedMeituan20) {
        showToast('您已成功领取20元美团生活券');
        return;
      }
      setClaimedMeituan20(true);
      setShowRewardModal({
        badge: '超值大额券',
        title: '美团生活券 20元 已发放',
        desc: '已成功存入美团卡券包，实付满30元立减20元，休闲娱乐畅快抵扣！',
        value: '¥20.00'
      });
    }
  };

  // 话费直减券领取
  const handleClaimBillCoupon = () => {
    if (!isMember) {
      onOpenCheckout(currentSku);
      return;
    }
    if (billCouponClaimed) {
      showToast('您已成功领取2元话费直减券，充值时将自动立减！');
      return;
    }
    setBillCouponClaimed(true);
    showToast('🎉 领取成功！2元话费直减券已生效，充值话费时将自动为您抵扣。');
  };

  // 电商专享神券领取（点击后触发后端逻辑发新客50元或99-5券）
  const handleClaimEcomCoupon = () => {
    if (!isMember) {
      handleRevealCoupon();
      return;
    }
    if (ecomCouponClaimed) {
      showToast('您已成功领取抖音电商专享神券，已存入您的抖音商城卡券包！');
      return;
    }
    if (isSpinning) return;
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
      setIsRevealed(true);
      setEcomCouponClaimed(true);
      if (simulatedUserType === 'new_user') {
        setShowRewardModal({
          badge: '新客专属礼遇',
          title: '恭喜领取 50元 抖音电商新人神券！',
          desc: '经系统后端识别，您的账号为抖音电商新客，已为您匹配最高50元新人专属神券！已自动存入绑定的抖音商城账户。',
          value: '¥50.00'
        });
      } else {
        setShowRewardModal({
          badge: '商城专享礼遇',
          title: '恭喜领取 满99减5 抖音电商专享券！',
          desc: '经系统后端识别，已为您匹配全品类通用的满99减5元电商专享券！已自动存入抖音商城卡券包。',
          value: '¥5.00'
        });
      }
    }, 350);
  };

  // Reveal eCommerce coupon based on backend user identity check (未开通用户点击)
  const handleRevealCoupon = () => {
    if (isRevealed) {
      onOpenCheckout(currentSku);
      return;
    }
    if (isSpinning) return;
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
      setIsRevealed(true);
      if (isMember) {
        setEcomCouponClaimed(true);
      }
      if (simulatedUserType === 'new_user') {
        setShowRewardModal({
          badge: '新客专属礼遇',
          title: isMember ? '恭喜领取 50元 抖音电商新人券！' : '获得 50元 抖音电商新人券！',
          desc: '经系统后端识别，您的账号为抖音电商新客，已为您匹配最高50元新人专属神券！已自动存入绑定的抖音商城账户。',
          value: '¥50.00'
        });
      } else {
        setShowRewardModal({
          badge: '商城专享礼遇',
          title: isMember ? '恭喜领取 满99减5 抖音电商专享券！' : '获得 满99减5 抖音电商专享券！',
          desc: '经系统后端识别，已为您匹配全品类通用的满99减5元电商专享券！已自动存入抖音商城卡券包。',
          value: '¥5.00'
        });
      }
    }, 350);
  };

  return (
    <div className={`min-h-full bg-[#F4F6FA] text-slate-900 font-sans ${isMember ? 'pb-10' : 'pb-36'} relative select-none`}>
      
      {/* ========================================================= */}
      {/* 1. 顶部白底清爽导航栏 (小程序名字: 通信服务中心) */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md px-4 py-3 flex items-center justify-between text-slate-900 border-b border-slate-100 shadow-xs">
        <button 
          onClick={onNavigateHome || onBackToRecharge}
          className="p-1 -ml-1 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors flex items-center space-x-1"
          aria-label="返回充值中心"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-xs font-semibold">返回</span>
        </button>

        {/* 顶部标题：严格指定为「通信服务中心」 */}
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-[#FF9800]"></span>
          <h1 className="text-base font-black tracking-wide text-slate-900">
            通信服务中心
          </h1>
        </div>

        {/* 右侧占位保持标题居中 */}
        <div className="w-12"></div>
      </header>

      {/* ========================================================= */}
      {/* 核心 Hero 会员主视觉区（完全对齐截图的双卡片+并列布局） */}
      {/* 色系沿用现在的暖黄/奶金/暖橙色系，无支付宝/移动元素 */}
      {/* ========================================================= */}
      {/* ========================================================= */}
      {/* 核心 Hero 会员主视觉区（完全对齐截图 17d590376affee0e8c0e5aba998e7bc1_5681daad.png） */}
      {/* 暖金朝霞海报背景 + 3D金币与星光 + 双白底立减券 + 专属勋章与燕尾飘带 + 弧形缎带底托 + 核心开通CTA */}
      {/* ========================================================= */}
      <div className="bg-gradient-to-b from-[#FED8B1] via-[#FFE6CE] to-[#FFF5EB] px-4 pt-5 pb-5 relative overflow-hidden border-b border-[#FEE7D0]">
        
        {/* 背景装饰：左侧 ¥ 金币与星光 */}
        <div className="absolute top-3 left-3 w-10 h-10 pointer-events-none drop-shadow-[0_4px_8px_rgba(217,119,6,0.3)] -rotate-12 z-0">
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
            <defs>
              <radialGradient id="goldCoinGradLeft" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FFF4D0" />
                <stop offset="40%" stopColor="#FFC83B" />
                <stop offset="85%" stopColor="#E68A00" />
                <stop offset="100%" stopColor="#B36200" />
              </radialGradient>
              <linearGradient id="goldRimLeft" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFF8E0" />
                <stop offset="50%" stopColor="#FFC83B" />
                <stop offset="100%" stopColor="#B36200" />
              </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="22" fill="url(#goldCoinGradLeft)" stroke="url(#goldRimLeft)" strokeWidth="2.5" />
            <circle cx="24" cy="24" r="17" fill="none" stroke="#FFD875" strokeWidth="1.2" opacity="0.8" />
            <text x="24" y="30" textAnchor="middle" fill="#8A4000" fontSize="18" fontWeight="900" fontFamily="system-ui, sans-serif">¥</text>
            <path d="M12 18 C14 12, 20 8, 28 8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          </svg>
        </div>
        {/* 左侧星光与红宝石小圆点 */}
        <div className="absolute top-14 left-4 w-3.5 h-3.5 text-amber-500/80 pointer-events-none animate-pulse z-0">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
          </svg>
        </div>
        <div className="absolute top-9 left-13 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#FFE082] to-[#FFA000] shadow-xs pointer-events-none z-0"></div>

        {/* 背景装饰：右侧 ♫ 抖音音符金币与星光 */}
        <div className="absolute top-3 right-3 w-10 h-10 pointer-events-none drop-shadow-[0_4px_8px_rgba(217,119,6,0.3)] rotate-12 z-0">
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
            <defs>
              <radialGradient id="goldCoinGradRight" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FFF4D0" />
                <stop offset="40%" stopColor="#FFC83B" />
                <stop offset="85%" stopColor="#E68A00" />
                <stop offset="100%" stopColor="#B36200" />
              </radialGradient>
              <linearGradient id="goldRimRight" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFF8E0" />
                <stop offset="50%" stopColor="#FFC83B" />
                <stop offset="100%" stopColor="#B36200" />
              </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="22" fill="url(#goldCoinGradRight)" stroke="url(#goldRimRight)" strokeWidth="2.5" />
            <circle cx="24" cy="24" r="17" fill="none" stroke="#FFD875" strokeWidth="1.2" opacity="0.8" />
            <path d="M21 27.5C21 29.4 19.4 31 17.5 31C15.6 31 14 29.4 14 27.5C14 25.6 15.6 24 17.5 24C18.3 24 19 24.3 19.6 24.8V17.5C19.6 16.7 20.2 16 21 16H28C28.8 16 29.5 16.7 29.5 17.5V21C29.5 21.8 28.8 22.5 28 22.5H22.5V25.7C22.1 25.2 21.6 25 21 25V27.5Z" fill="#8A4000" />
            <path d="M12 18 C14 12, 20 8, 28 8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          </svg>
        </div>
        {/* 右侧星光与流光 */}
        <div className="absolute top-12 right-13 w-4 h-4 text-amber-400/90 pointer-events-none animate-pulse z-0">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
          </svg>
        </div>
        <div className="absolute top-19 right-4 w-2.5 h-2.5 text-amber-400/70 pointer-events-none z-0">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
          </svg>
        </div>

        {/* 顶部标题与副标题区（三种场景文案保持一致） */}
        <div className="text-center relative z-10 mb-3.5">
          <div className="flex items-center justify-center">
            <h2 className="text-2xl sm:text-[28px] font-black tracking-tight text-[#9E3900] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              DXT通信充值会员
            </h2>
            {/* 右上角金色发光星钻徽章 */}
            <div className="ml-1.5 -mt-3.5 relative">
              <div className="w-5 h-5 rounded-[4px] rotate-45 bg-gradient-to-br from-[#FFF8D6] via-[#FFD24D] to-[#FF9E00] shadow-[0_0_10px_rgba(255,180,30,0.7)] flex items-center justify-center border border-white">
                <div className="w-2.5 h-2.5 rounded-[2px] bg-white opacity-90"></div>
              </div>
            </div>
          </div>
          <p className="text-xs sm:text-[13px] font-bold text-[#7E3700] tracking-tight mt-1">
            充值会员享特权 | 连续包月更省钱
          </p>
        </div>

        {/* ========================================================= */}
        {/* 会员身份看板：已开通 或 已过期老客展示，样式与截图完全一致 */}
        {/* ========================================================= */}
        {(isMember || isExpired) && (
          <div className="relative z-10 mb-2 bg-white/95 backdrop-blur-sm rounded-2xl px-3.5 py-3 border border-amber-300/80 shadow-[0_4px_16px_rgba(217,119,6,0.08)] flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FFA000] via-[#FF8C00] to-[#D97706] flex items-center justify-center text-white shadow-xs">
                <Crown className="w-4 h-4 fill-white text-white" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-black text-slate-900 tracking-tight">
                  {userPhone.slice(0, 3)}****{userPhone.slice(-4)}
                </span>
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[9.5px] font-black px-2 py-0.5 rounded-full shadow-xs">
                  黄金会员
                </span>
              </div>
            </div>

            <div className="flex items-center">
              {isMember ? (
                <span className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200/90 text-[10.5px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>会员生效中</span>
                </span>
              ) : (
                <span className="inline-flex items-center space-x-1.5 bg-slate-50 text-slate-500 border border-slate-200/90 text-[10.5px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>会员已过期</span>
                </span>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 未开通用户专属：核心霸屏横向券卡片组与开通 CTA 按钮 */}
        {/* 已开通会员不展示上部重复券，直接引导至下方 3 大特权领券/签到 */}
        {/* ========================================================= */}
        {!isMember && (
          <>
            {/* 核心霸屏横向券卡片组（参考截图2：月卡专属消费券，大尺寸无杂色券面） */}
            <div className="relative z-10">
              {/* 霸屏双券垂直堆叠，宽大通透，高质感 */}
              <div className="space-y-2.5">
                {/* 券1：话费直减券 */}
                <div className="w-full bg-white rounded-[20px] border-2 border-[#FFA000] shadow-[0_4px_14px_rgba(255,160,0,0.12)] overflow-hidden flex items-stretch relative">
                  {/* 左侧券主体 */}
                  <div className="w-[78px] sm:w-[84px] shrink-0 flex flex-col items-center justify-center py-2.5 px-1 border-r border-[#FFA000]/25 bg-white">
                    <span className="border border-[#F59E0B] text-[#B45309] bg-white text-[9px] font-black px-2 py-0.5 rounded-full mb-1 leading-none shadow-xs">
                      每月必得
                    </span>
                    <div className="flex items-baseline text-[#9A3412]">
                      <span className="text-2xl sm:text-[28px] font-black italic tracking-tighter">2</span>
                      <span className="text-xs sm:text-sm font-black ml-0.5">元</span>
                    </div>
                  </div>

                  {/* 中间券信息区 */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center py-2.5 px-3 sm:px-3.5 bg-white">
                    <div className="text-[14px] sm:text-[15px] font-black text-slate-900 tracking-tight leading-tight">
                      话费直减券
                    </div>
                    <div className="text-[11px] sm:text-[11.5px] text-[#8C4A16] font-medium mt-1 tracking-tight leading-tight">
                      充值自动立减 · 三网通用
                    </div>
                  </div>

                  {/* 中间上下打孔凹槽（无中线虚线，纯净咬口） */}
                  <div className="relative w-0 flex flex-col justify-between items-center z-10 shrink-0">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#FFF1E0] border-b-2 border-[#FFA000] -mt-[9px] -ml-[7px]"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-[#FFF1E0] border-t-2 border-[#FFA000] -mb-[9px] -ml-[7px]"></div>
                  </div>

                  {/* 右侧金色领券区（白底药丸按钮） */}
                  <div 
                    onClick={() => onOpenCheckout(currentSku)}
                    className="w-[82px] sm:w-[90px] shrink-0 bg-[#FFA000] flex flex-col items-center justify-center p-2 text-center cursor-pointer active:brightness-95 transition-all"
                  >
                    <div className="w-full bg-white text-[#9A3412] text-xs font-black py-1.5 px-1 rounded-full shadow-xs active:scale-95 transition-transform text-center truncate">
                      立即领取
                    </div>
                  </div>
                </div>

                {/* 券2：抖音电商专享神券 */}
                <div className="w-full bg-white rounded-[20px] border-2 border-[#FFA000] shadow-[0_4px_14px_rgba(255,160,0,0.12)] overflow-hidden flex items-stretch relative">
                  {/* 左侧券主体 */}
                  <div className="w-[78px] sm:w-[84px] shrink-0 flex flex-col items-center justify-center py-2.5 px-1 border-r border-[#FFA000]/25 bg-white">
                    <span className="border border-[#F59E0B] text-[#B45309] bg-white text-[9px] font-black px-2 py-0.5 rounded-full mb-1 leading-none shadow-xs">
                      最高50元
                    </span>
                    <div className="flex items-baseline text-[#9A3412]">
                      <span className="text-xl sm:text-[24px] font-black italic tracking-tighter">5~50</span>
                      <span className="text-xs sm:text-sm font-black ml-0.5">元</span>
                    </div>
                  </div>

                  {/* 中间券信息区 */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center py-2.5 px-3 sm:px-3.5 bg-white">
                    <div className="text-[14px] sm:text-[15px] font-black text-slate-900 tracking-tight leading-tight">
                      抖音电商专享神券
                    </div>
                    <div className="text-[11px] sm:text-[11.5px] text-[#8C4A16] font-medium mt-1 tracking-tight leading-tight">
                      最高可领50元 · 购物自动抵扣
                    </div>
                  </div>

                  {/* 中间上下打孔凹槽（无中线虚线，纯净咬口） */}
                  <div className="relative w-0 flex flex-col justify-between items-center z-10 shrink-0">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#FFF1E0] border-b-2 border-[#FFA000] -mt-[9px] -ml-[7px]"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-[#FFF1E0] border-t-2 border-[#FFA000] -mb-[9px] -ml-[7px]"></div>
                  </div>

                  {/* 右侧金色领券区（白底药丸按钮） */}
                  <div 
                    onClick={() => onOpenCheckout(currentSku)}
                    className="w-[82px] sm:w-[90px] shrink-0 bg-[#FFA000] flex flex-col items-center justify-center p-2 text-center cursor-pointer active:brightness-95 transition-all"
                  >
                    <div className="w-full bg-white text-[#9A3412] text-xs font-black py-1.5 px-1 rounded-full shadow-xs active:scale-95 transition-transform text-center truncate">
                      立即领取
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 核心 CTA 操作区：未开通新客订购引导与协议 */}
            <div className="mt-4 relative z-10">
              {/* 未开通用户 / 过期老客：核心大尺寸开通 CTA 按钮 */}
              <button
                onClick={() => onOpenCheckout(currentSku)}
                className="w-full bg-gradient-to-r from-[#FFA200] via-[#FF4D55] to-[#FF2855] hover:brightness-105 active:scale-[0.98] transition-all text-white py-3.5 px-5 rounded-full shadow-[0_8px_25px_rgba(255,40,75,0.38)] flex flex-col items-center justify-center cursor-pointer"
              >
                <div className="text-[15px] font-black tracking-wide">
                  {isExpired ? '1.99元/月 一单回本' : '首月仅0.01元 次月起1.99元/月'}
                </div>
                <div className="text-xs text-white/95 font-medium mt-0.5">
                  连续包月 随时可退
                </div>
              </button>

              {/* 协议与须知细则链接 */}
              <div className="mt-3 text-center text-[10.5px] text-[#8C6246]">
                <div>开通前请阅读</div>
                <div className="inline-flex space-x-1.5 text-[#8C531B] mt-1 font-medium">
                  <button onClick={() => setShowRuleModal('notice')} className="hover:underline hover:text-[#5A330B] underline cursor-pointer">
                    《会员使用须知》
                  </button>
                  <button onClick={() => setShowRuleModal('business')} className="hover:underline hover:text-[#5A330B] underline cursor-pointer">
                    《业务说明》
                  </button>
                  <button onClick={() => setShowRuleModal('privacy')} className="hover:underline hover:text-[#5A330B] underline cursor-pointer">
                    《隐私政策》
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

      </div>

      {/* ========================================================= */}
      {/* 4. 居中段落分割标题（参考截图：—— 开通后可得会员服务 ——） */}
      {/* ========================================================= */}
      <div className="px-4 my-5">
        <div className="flex items-center justify-center space-x-3">
          <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-amber-400 w-16"></div>
          <h3 className="text-sm font-black text-slate-800 tracking-wider">
            开通后尊享特权
          </h3>
          <div className="h-px bg-gradient-to-l from-transparent via-amber-300 to-amber-400 w-16"></div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 5. 模块化权益卡片组（完全对齐截图的 【权益1】/【权益2】/【权益3】顶部小标贴结构） */}
      {/* ========================================================= */}
      <div className="px-4 space-y-4">

        {/* --------------------------------------------------------- */}
        {/* 【权益1】做任务每月必得 2元话费直减券 */}
        {/* (样式与上部优惠券100%保持一致的霸屏大券样式) */}
        {/* --------------------------------------------------------- */}
        <div className="bg-white rounded-3xl p-3.5 sm:p-4 shadow-sm border border-slate-100 relative pt-10 sm:pt-11 overflow-hidden">
          {/* 左上角贴纸角标 */}
          <div className="absolute top-0 left-4 bg-gradient-to-r from-[#FF9800] to-[#D97706] text-white text-[10.5px] font-black px-3 py-1 rounded-b-xl shadow-xs flex items-center space-x-1 z-10">
            <span className="bg-white text-[#B45309] text-[9px] px-1 py-0.2 rounded font-black mr-1">
              权益1
            </span>
            <span>话费直减每月必得</span>
          </div>

          {/* 拿出的副标题：展示在红框指定位置 */}
          <div className="text-xs text-slate-500 mb-2.5 font-medium pt-0.5">
            充值自动立减 · 三网通用
          </div>

          {/* 优惠券主体：严格复刻确认的设计规范（券面不展示副标题） */}
          <div className="w-full bg-white rounded-[20px] border-2 border-[#FFA000] shadow-[0_4px_14px_rgba(255,160,0,0.12)] overflow-hidden flex items-stretch relative">
            {/* 左侧券主体 */}
            <div className="w-[78px] sm:w-[84px] shrink-0 flex flex-col items-center justify-center py-2.5 px-1 border-r border-[#FFA000]/25 bg-white">
              <span className="border border-[#F59E0B] text-[#B45309] bg-white text-[9px] font-black px-2 py-0.5 rounded-full mb-1 leading-none shadow-xs">
                每月必得
              </span>
              <div className="flex items-baseline text-[#9A3412]">
                <span className="text-2xl sm:text-[28px] font-black italic tracking-tighter">2</span>
                <span className="text-xs sm:text-sm font-black ml-0.5">元</span>
              </div>
            </div>

            {/* 中间券信息区：只展示主标题 */}
            <div className="flex-1 min-w-0 flex flex-col justify-center py-2.5 px-3 sm:px-3.5 bg-white">
              <div className="text-[15px] sm:text-[16px] font-black text-slate-900 tracking-tight leading-tight">
                话费直减券
              </div>
            </div>

            {/* 中间上下打孔凹槽 */}
            <div className="relative w-0 flex flex-col justify-between items-center z-10 shrink-0">
              <div className="w-3.5 h-3.5 rounded-full bg-white border-b-2 border-[#FFA000] -mt-[9px] -ml-[7px]"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-white border-t-2 border-[#FFA000] -mb-[9px] -ml-[7px]"></div>
            </div>

            {/* 右侧领券/使用按钮 */}
            <div className="w-[82px] sm:w-[90px] shrink-0 bg-[#FFA000] flex flex-col items-center justify-center p-2 text-center">
              <button
                onClick={handleClaimBillCoupon}
                className={`w-full text-xs font-black py-1.5 px-1 rounded-full shadow-xs active:scale-95 transition-all cursor-pointer text-center truncate ${
                  isMember && billCouponClaimed
                    ? 'bg-[#FFF8EE] text-[#9A3412]/80 border border-amber-300/80'
                    : 'bg-white hover:bg-[#FFFDF5] text-[#9A3412]'
                }`}
              >
                {isMember ? (billCouponClaimed ? '已领取' : '立即领取') : '立即领取'}
              </button>
            </div>
          </div>

        </div>

        {/* --------------------------------------------------------- */}
        {/* 【权益2】活动福利月月享 抖音电商神券 */}
        {/* --------------------------------------------------------- */}
        <div className="bg-white rounded-3xl p-3.5 sm:p-4 shadow-sm border border-slate-100 relative pt-10 sm:pt-11 overflow-hidden">
          {/* 左上角贴纸角标 */}
          <div className="absolute top-0 left-4 bg-gradient-to-r from-[#FF9800] to-[#D97706] text-white text-[10.5px] font-black px-3 py-1 rounded-b-xl shadow-xs flex items-center space-x-1 z-10">
            <span className="bg-white text-[#B45309] text-[9px] px-1 py-0.2 rounded font-black mr-1">
              权益2
            </span>
            <span>活动福利月月享</span>
          </div>

          {/* 拿出的副标题：展示在红框指定位置 */}
          <div className="text-xs text-slate-500 mb-2.5 font-medium pt-0.5">
            最高可领50元 · 购物自动抵扣
          </div>

          {/* 优惠券主体：严格复刻确认的设计规范（券面不展示副标题） */}
          <div className="w-full bg-white rounded-[20px] border-2 border-[#FFA000] shadow-[0_4px_14px_rgba(255,160,0,0.12)] overflow-hidden flex items-stretch relative">
            {/* 左侧券主体 */}
            <div className="w-[78px] sm:w-[84px] shrink-0 flex flex-col items-center justify-center py-2.5 px-1 border-r border-[#FFA000]/25 bg-white">
              <span className="border border-[#F59E0B] text-[#B45309] bg-white text-[9px] font-black px-2 py-0.5 rounded-full mb-1 leading-none shadow-xs">
                最高50元
              </span>
              <div className="flex items-baseline text-[#9A3412]">
                <span className="text-xl sm:text-[24px] font-black italic tracking-tighter">5~50</span>
                <span className="text-xs sm:text-sm font-black ml-0.5">元</span>
              </div>
            </div>

            {/* 中间券信息区：只展示主标题 */}
            <div className="flex-1 min-w-0 flex flex-col justify-center py-2.5 px-3 sm:px-3.5 bg-white">
              <div className="text-[15px] sm:text-[16px] font-black text-slate-900 tracking-tight leading-tight">
                抖音电商专享神券
              </div>
            </div>

            {/* 中间上下打孔凹槽 */}
            <div className="relative w-0 flex flex-col justify-between items-center z-10 shrink-0">
              <div className="w-3.5 h-3.5 rounded-full bg-white border-b-2 border-[#FFA000] -mt-[9px] -ml-[7px]"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-white border-t-2 border-[#FFA000] -mb-[9px] -ml-[7px]"></div>
            </div>

            {/* 右侧动作按钮区 */}
            <div className="w-[82px] sm:w-[90px] shrink-0 bg-[#FFA000] flex flex-col items-center justify-center p-2 text-center">
              <button
                onClick={handleClaimEcomCoupon}
                className={`w-full text-xs font-black py-1.5 px-1 rounded-full shadow-xs active:scale-95 transition-all cursor-pointer text-center truncate ${
                  isMember && ecomCouponClaimed
                    ? 'bg-[#FFF8EE] text-[#9A3412]/80 border border-amber-300/80'
                    : 'bg-white hover:bg-[#FFFDF5] text-[#9A3412]'
                }`}
              >
                {isMember ? (ecomCouponClaimed ? '已领取' : '立即领取') : '立即领取'}
              </button>
            </div>
          </div>
        </div>

        {/* --------------------------------------------------------- */}
        {/* 【权益3】超值签到打卡福利 美团生活券 */}
        {/* --------------------------------------------------------- */}
        <div className="bg-white rounded-3xl p-4.5 shadow-sm border border-slate-100 relative pt-10 sm:pt-11">
          {/* 左上角贴纸角标 */}
          <div className="absolute top-0 left-4 bg-gradient-to-r from-[#FF9800] to-[#D97706] text-white text-[10.5px] font-black px-3 py-1 rounded-b-xl shadow-xs flex items-center space-x-1 z-10">
            <span className="bg-white text-[#B45309] text-[9px] px-1 py-0.2 rounded font-black mr-1">
              权益3
            </span>
            <span>打卡福利免费领</span>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600 mb-3 pt-0.5">
            <span>连续签到打卡，免费领取美团生活券</span>
            <button
              onClick={handleCheckIn}
              className={`px-3 py-1 rounded-full text-xs font-black shadow-xs active:scale-95 transition-all ${
                hasCheckedInToday
                  ? 'bg-slate-100 text-slate-400'
                  : 'bg-gradient-to-r from-[#FFA200] via-[#FF4D55] to-[#FF2855] text-white'
              }`}
            >
              {hasCheckedInToday ? '今日已打卡' : '今日打卡 (+1天)'}
            </button>
          </div>

          {/* 5天打卡里程碑进度格 */}
          <div className="grid grid-cols-5 gap-1.5 text-center">
            {/* 第1天 */}
            <div className={`p-2 rounded-xl border text-center ${
              checkInDays >= 1 ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold' : 'bg-slate-50 border-slate-100 text-slate-400'
            }`}>
              <div className="text-[10px]">第1天</div>
              <div className="text-xs font-black my-0.5">{checkInDays >= 1 ? '✓' : '+1'}</div>
              <div className="text-[9px]">打卡</div>
            </div>

            {/* 第2天 */}
            <div className={`p-2 rounded-xl border text-center ${
              checkInDays >= 2 ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold' : 'bg-slate-50 border-slate-100 text-slate-400'
            }`}>
              <div className="text-[10px]">第2天</div>
              <div className="text-xs font-black my-0.5">{checkInDays >= 2 ? '✓' : '+1'}</div>
              <div className="text-[9px]">打卡</div>
            </div>

            {/* 第3天里程碑: 10元券 */}
            <div className={`p-2 rounded-xl border relative text-center overflow-hidden ${
              checkInDays >= 3 ? 'bg-amber-50/80 border-[#FFA000] text-amber-950 font-bold' : 'bg-amber-50/30 border-amber-200'
            }`}>
              <span className="absolute top-0 right-0 bg-[#FF9800] text-white text-[8px] font-bold px-1 rounded-bl">
                奖10元
              </span>
              <div className="text-[10px] font-bold text-amber-800">第3天</div>
              <div className="text-xs font-black text-[#B45309] my-0.5">¥10</div>
              <div className="text-[9px] text-amber-700 font-bold">美团券</div>
            </div>

            {/* 第4天 */}
            <div className={`p-2 rounded-xl border text-center ${
              checkInDays >= 4 ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold' : 'bg-slate-50 border-slate-100 text-slate-400'
            }`}>
              <div className="text-[10px]">第4天</div>
              <div className="text-xs font-black my-0.5">{checkInDays >= 4 ? '✓' : '+1'}</div>
              <div className="text-[9px]">打卡</div>
            </div>

            {/* 第5天里程碑: 20元券 */}
            <div className={`p-2 rounded-xl border relative text-center overflow-hidden ${
              checkInDays >= 5 ? 'bg-amber-50/90 border-[#FFA000] text-amber-950 font-bold' : 'bg-amber-50/30 border-amber-200'
            }`}>
              <span className="absolute top-0 right-0 bg-[#D97706] text-white text-[8px] font-bold px-1 rounded-bl">
                大奖20
              </span>
              <div className="text-[10px] font-bold text-amber-800">第5天</div>
              <div className="text-xs font-black text-[#B45309] my-0.5">¥20</div>
              <div className="text-[9px] text-amber-700 font-bold">美团券</div>
            </div>
          </div>

          {/* 领奖操作行 */}
          <div className="mt-3 flex items-center justify-between text-xs pt-2.5 border-t border-slate-100">
            <span className="text-slate-500">已连续打卡 <strong className="text-[#B45309] font-black">{checkInDays}</strong> 天</span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleClaimMeituan(10)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                  claimedMeituan10
                    ? 'bg-amber-100/90 text-amber-900 border border-amber-300/80'
                    : checkInDays >= 3
                    ? 'bg-gradient-to-r from-[#FFA200] via-[#FF4D55] to-[#FF2855] text-white shadow-xs'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                {claimedMeituan10 ? '已领取' : (isMember ? '立即领取' : '领10元券')}
              </button>
              <button
                onClick={() => handleClaimMeituan(20)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                  claimedMeituan20
                    ? 'bg-amber-100/90 text-amber-900 border border-amber-300/80'
                    : checkInDays >= 5
                    ? 'bg-gradient-to-r from-[#FFA200] via-[#FF4D55] to-[#FF2855] text-white shadow-xs'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                {claimedMeituan20 ? '已领取' : (isMember ? '立即领取' : '领20元券')}
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 6. 居中段落分割标题（参考截图：—— 业务说明 ——） */}
      {/* ========================================================= */}
      <div className="px-4 mt-7 mb-3">
        <div className="flex items-center justify-center space-x-3">
          <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-amber-400 w-16"></div>
          <h3 className="text-sm font-black text-slate-800 tracking-wider">
            业务说明
          </h3>
          <div className="h-px bg-gradient-to-l from-transparent via-amber-300 to-amber-400 w-16"></div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 7. 业务说明卡片（严格参考截图中的蓝色高亮加粗文案和排版） */}
      {/* 色系沿用暖色与清晰黑体，符合合规标准 */}
      {/* ========================================================= */}
      <div className="px-4">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 text-xs text-slate-700 leading-relaxed space-y-2.5">
          <p>
            <strong className="text-slate-900 font-bold">产品名称：</strong>
            DXT通信充值会员尊享权益（编号：DXT25JT2026）
          </p>
          <p>
            <strong className="text-slate-900 font-bold">产品资费：</strong>
            <strong className="text-slate-900 font-black">1.99元/月</strong>。若享用收银台立减等平台优惠，<strong className="text-[#B45309] font-bold">首月实付金额仅需0.01元</strong>，具体以收银台实付金额为准。
          </p>
          <p>
            <strong className="text-slate-900 font-bold">产品有效期：</strong>
            <strong className="text-slate-900">长期有效</strong>。产品有效期按照<strong>用户下单的日期 + 31天</strong>计算。如双方在有效期届满前无异议，<strong className="text-amber-700 font-bold">有效期自动续展，每次续展31天（1个月）</strong>。
            <strong className="text-emerald-700 font-bold">有效期内可随时退订</strong>。退订方式：本产品非通过本小程序退订，请通过<strong>抖音App - 我的订单 - 该笔订单 - 续费管理</strong>取消自动续费。取消后，您在当前计费周期内（下单日期+31天）仍可正常享受会员权益，期满后不再扣费与续展。
          </p>
          <p>
            <strong className="text-slate-900 font-bold">服务内容：</strong>
            <strong className="text-[#B45309] font-bold">每月必得2元话费直减券</strong>，同时可随机获得<strong className="text-amber-700 font-bold">抖音电商神券（最高50元）</strong>。连续签到可免费领取<strong className="text-amber-800 font-bold">美团生活券（最高20元）</strong>。
          </p>
          <p>
            <strong className="text-slate-900 font-bold">其他说明：</strong>
            无在网期限要求，无合约捆绑，无违约责任。
          </p>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 8. 常见问题 FAQ 折叠面板 (可快速展开解答) */}
      {/* ========================================================= */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
            <HelpCircle className="w-4 h-4 text-amber-500" />
            <h3 className="font-black text-sm text-slate-900">常见问题解答</h3>
          </div>

          <div className="divide-y divide-slate-100">
            {[
              {
                q: '什么是DXT通信充值会员首月0.01元？',
                a: '新用户首次开通可享受首月仅需0.01元的超级特惠尝鲜价，第二个月起按1.99元/月连续包月自动续费，随时可以在续费管理中关闭。'
              },
              {
                q: '2元话费直减券如何使用？',
                a: '会员开通后系统自动存入卡包，在通信服务中心为手机号充值时系统将无门槛自动勾选抵扣2元现金。'
              },
              {
                q: '抖音电商神券是如何随机发放的？',
                a: '开通会员后，系统在权益专享池中随机匹配专属好礼（最高50元电商新人券或满99减5专享券），即刻发放到当前绑定手机号的抖音商城账户中。'
              },
              {
                q: '连续签到美团生活券如何领取？',
                a: '会员每天点击「今日打卡」累计天数，连续签到满3天可点击「领10元券」，连续签到满5天可点击「领20元券」，券码自动直发到美团账户。'
              },
              {
                q: '如何取消连续包月或关闭自动续费？',
                a: '请打开抖音App，前往「我 - 我的订单 - 该笔订单 - 续费管理」即可取消自动续费。取消后，当前周期（下单日期+31天）内已生效权益仍可正常使用至期满。'
              }
            ].map((faq, idx) => (
              <div key={idx} className="py-2.5">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left text-xs font-bold text-slate-800 hover:text-[#B45309] transition-colors"
                >
                  <span className="flex-1 pr-2">Q: {faq.q}</span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaqIndex === idx && (
                  <div className="mt-2 text-xs text-slate-500 leading-relaxed bg-[#FFFDF8] p-2.5 rounded-xl border border-amber-100/70">
                    A: {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* ========================================================= */}
      {/* 10. 底部吸底悬浮组件：新客开通栏（仅未开通用户展示） */}
      {/* ========================================================= */}
      {!isMember && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md px-4 pt-3 pb-3 border-t border-slate-100 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] max-w-[420px] mx-auto">
          {/* 按钮上方右侧小角标（参考截图） */}
          <div className="relative">
            <div className="absolute -top-6 right-6 z-10 bg-gradient-to-r from-[#FFD600] to-[#FFA000] text-amber-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md flex items-center space-x-1 border border-white">
              <Sparkles className="w-3 h-3 text-amber-900" />
              <span>{isExpired ? '重新开通立送2元话费' : '开通立送2元话费'}</span>
            </div>

            <button
              onClick={() => onOpenCheckout(currentSku)}
              className="w-full bg-gradient-to-r from-[#FFA200] via-[#FF4D55] to-[#FF2855] text-white py-3.5 px-5 rounded-full shadow-lg shadow-red-500/25 flex flex-col items-center justify-center active:scale-[0.99] transition-transform cursor-pointer"
            >
              <div className="text-sm font-black tracking-wide">
                {isExpired ? '1.99元/月 一单回本' : '首月仅0.01元 次月起1.99元/月'}
              </div>
              <div className="text-[10px] text-white/90 font-medium">
                <span className="underline font-bold">连续包月</span> 随时可退
              </div>
            </button>
          </div>

          <div className="mt-2 text-center text-[10px] text-slate-400">
            <span>开通前请阅读</span>
            <div className="inline-flex space-x-1 text-[#8C531B] ml-1">
              <button onClick={() => setShowRuleModal('notice')} className="hover:underline hover:text-[#5A330B]">
                《会员使用须知》
              </button>
              <button onClick={() => setShowRuleModal('business')} className="hover:underline hover:text-[#5A330B]">
                《业务说明》
              </button>
              <button onClick={() => setShowRuleModal('privacy')} className="hover:underline hover:text-[#5A330B]">
                《隐私政策》
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* Toast 提示浮层 */}
      {/* ========================================================= */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-sm border border-white/20 flex items-center space-x-2 animate-bounce whitespace-nowrap">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================= */}
      {/* 奖励发放祝贺弹窗 */}
      {/* ========================================================= */}
      {showRewardModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-5 w-full max-w-xs shadow-2xl space-y-4 animate-scaleUp text-center relative">
            <button 
              onClick={() => setShowRewardModal(null)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF9800] to-[#D97706] text-white mx-auto flex items-center justify-center shadow-lg shadow-amber-500/25">
              <Gift className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full">
                {showRewardModal.badge}
              </span>
              <h3 className="text-base font-black text-slate-900 mt-2">{showRewardModal.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{showRewardModal.desc}</p>
            </div>

            <div className="bg-[#FFFDF5] border border-amber-200 rounded-2xl py-3 px-4">
              <span className="text-2xl font-black text-[#B45309]">{showRewardModal.value}</span>
              <span className="text-xs font-bold text-amber-800 ml-1">专属立减券</span>
            </div>

            <button
              onClick={() => {
                setShowRewardModal(null);
                showToast('已存入卡包，欢迎前往使用！');
              }}
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#FFA200] via-[#FF4D55] to-[#FF2855] text-white text-xs font-bold shadow-md active:scale-95 transition-transform"
            >
              我知道了
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 规则须知 Modal (包括省钱攻略) */}
      {/* ========================================================= */}
      {showRuleModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-5 w-full max-w-sm shadow-2xl space-y-3.5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>
                  {showRuleModal === 'notice' && '《会员使用须知》'}
                  {showRuleModal === 'business' && '《业务说明与计费细则》'}
                  {showRuleModal === 'privacy' && '《用户隐私政策》'}
                  {showRuleModal === 'strategy' && 'DXT会员省钱全攻略'}
                </span>
              </h3>
              <button onClick={() => setShowRuleModal(null)} className="text-slate-400 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {showRuleModal === 'strategy' && (
                <>
                  <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-amber-950 font-bold">
                    💰 怎么开通最划算？
                  </div>
                  <p>1. <strong>首月仅需0.01元</strong>：新用户首次开通立享全额立减，直接获得2元话费直减券，首单充值净赚1.99元！</p>
                  <p>2. <strong>抖音电商神券</strong>：开通后自动派发，新客专享50元大额神券，老客立享满99减5券。</p>
                  <p>3. <strong>打卡领美团券</strong>：连续签到满3天领10元美团生活券，满5天领20元美团生活券，外卖到店均可用！</p>
                  <p>4. <strong>无捆绑随时退</strong>：连续包月到期前无异议自动续展，在小程序内可随时一键取消自动续费。</p>
                </>
              )}
              {showRuleModal === 'notice' && (
                <>
                  <p>1. 本会员名为「DXT通信充值会员」，包含2元话费直减券、抖音电商随机神券及连续签到生活券。</p>
                  <p>2. 新用户首月优惠立减1.98元，仅需0.01元；次月起按1.99元/周期自动扣费，每个计费周期为下单日期起31天。</p>
                  <p>3. 订购成功后权益立即下发至绑定手机号账户，充话费无门槛抵扣2元。</p>
                  <p>4. 连续签到3天送10元美团券，连续签到5天送20元美团券，断签后需重新打卡。</p>
                </>
              )}
              {showRuleModal === 'business' && (
                <>
                  <p>1. 资费标准：首月0.01元，次月起1.99元/周期。由通信服务中心与动信通联合提供支撑。</p>
                  <p>2. 计费周期：按照用户下单日期+31天计算，期满无异议自动续展1个周期（31天）。</p>
                  <p>3. 退订规则：本产品通过抖音App「我 - 我的订单 - 该笔订单 - 续费管理」申请取消，当前周期权益保留至期满。</p>
                </>
              )}
              {showRuleModal === 'privacy' && (
                <>
                  <p>1. 我们严格保护您的手机号码与充值账户安全，仅用于话费充值与卡券权益核销发放。</p>
                  <p>2. 不会向任何无关第三方泄露您的账户流水与交易隐私。</p>
                </>
              )}
            </div>

            <button
              onClick={() => setShowRuleModal(null)}
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#FF9800] to-[#FF2D55] text-white text-xs font-bold active:scale-95 transition-transform"
            >
              我知道了
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
