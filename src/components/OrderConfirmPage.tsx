import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, X, ShieldCheck } from 'lucide-react';

interface OrderConfirmPageProps {
  onBack: () => void;
  onSubmitOrder: () => void;
  phone?: string;
  price?: number;
}

export const OrderConfirmPage: React.FC<OrderConfirmPageProps> = ({
  onBack,
  onSubmitOrder,
  phone = '1505****2806',
  price = 1.99,
}) => {
  const [phoneShield, setPhoneShield] = useState(true);
  const [selectedPayMethod, setSelectedPayMethod] = useState<'credit_card' | 'bank_card'>('credit_card');
  const [showAgreementModal, setShowAgreementModal] = useState(false);

  const handleSubmitClick = () => {
    // Step 2: In Order Confirm Page, click submit -> pops up auto-renewal agreement modal
    setShowAgreementModal(true);
  };

  const handleConfirmAndPay = () => {
    setShowAgreementModal(false);
    onSubmitOrder();
  };

  return (
    <div className="bg-[#F6F7F9] text-slate-900 min-h-full flex flex-col justify-between font-sans select-none relative animate-fadeIn">
      {/* Top Navigation Bar */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-20 border-b border-slate-100 shrink-0">
        <button 
          onClick={onBack}
          className="p-1 -ml-1 text-slate-800 hover:text-slate-600 active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="font-bold text-base text-slate-900 flex-1 text-center -ml-5">确认订单</h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 p-3 space-y-3 pb-24">
        {/* Card 1: Account & Billing Period (Matching 提单页.png top section) */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
          <div className="text-xs text-slate-400 font-medium">动信通充值账号</div>
          
          <div className="flex items-center justify-between py-1 border-b border-slate-100">
            <div className="flex items-center space-x-1.5 text-sm font-bold text-slate-800">
              <span>手机号</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 rotate-90" />
            </div>
            <div className="text-sm font-bold text-slate-900 tracking-wider">
              {phone}
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-sm font-bold text-slate-800">续费周期</span>
            <span className="text-sm font-bold text-slate-900">每月</span>
          </div>

          {/* Price & Auto Renewal Notice Alert Box */}
          <div className="bg-rose-50/70 border border-rose-100 rounded-xl p-2.5 text-xs leading-relaxed text-slate-600">
            <span className="text-[#FE2C55] font-bold">首月特惠 1.99 元</span>
            <span>，后期每月 1.99 元，自动续订，扣款前 5 天提醒，可随时取消。</span>
          </div>
        </div>

        {/* Card 2: Shop & Item Info (Matching 提单页.png middle section) */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3.5">
          <div className="flex items-center space-x-1.5">
            <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-500 to-[#FE2C55] text-white flex items-center justify-center text-[9px] font-black">
              动
            </div>
            <span className="text-xs font-bold text-slate-800">动信通官方旗舰店</span>
          </div>

          <div className="flex items-start space-x-3">
            {/* Product Thumbnail Banner */}
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-amber-400 via-rose-500 to-[#FE2C55] p-2 flex flex-col justify-between text-white shrink-0 shadow-sm relative overflow-hidden">
              <span className="text-[9px] font-black bg-black/30 px-1.5 py-0.5 rounded w-fit">连续包月</span>
              <div className="text-center">
                <div className="text-[10px] font-bold opacity-90">连续包月仅需</div>
                <div className="text-lg font-black tracking-tight leading-none mt-0.5">¥1.99</div>
              </div>
              <div className="text-[8px] text-center font-bold bg-white/20 rounded py-0.5">立送2元话费券</div>
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0 flex flex-col justify-between h-20 py-0.5">
              <div>
                <h3 className="text-xs font-black text-slate-900 line-clamp-1">
                  【连包直减】充值会员 VIP 月卡 享2元话费+2元电商券
                </h3>
                <div className="text-[11px] text-slate-400 mt-0.5">月卡</div>
                <div className="text-[10px] text-[#FE2C55] font-bold mt-0.5">库存紧张</div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-slate-900">¥{price.toFixed(2)}</span>
                <div className="flex items-center border border-slate-200 rounded-lg text-xs">
                  <button className="px-2 py-0.5 text-slate-400 hover:text-slate-600 disabled:opacity-30" disabled>-</button>
                  <span className="px-2 py-0.5 font-bold text-slate-800 border-x border-slate-200">1</span>
                  <button className="px-2 py-0.5 text-slate-400 hover:text-slate-600 disabled:opacity-30" disabled>+</button>
                </div>
              </div>
            </div>
          </div>

          {/* Freight & Notes */}
          <div className="pt-2 border-t border-slate-100 space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-700 font-medium">订单运费</span>
              <span className="text-slate-900 font-bold">包邮</span>
            </div>
            <div className="flex items-center justify-between cursor-pointer">
              <span className="text-slate-700 font-medium">备注</span>
              <span className="text-slate-400 flex items-center space-x-1">
                <span>无备注</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Privacy Phone Protection (Matching 提单页.png) */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-xs">
            <span className="font-bold text-slate-800">号码保护</span>
            <span className="text-slate-400 text-[11px]">隐藏收件人真实手机号，保护隐私</span>
          </div>
          <button 
            onClick={() => setPhoneShield(!phoneShield)}
            className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
              phoneShield ? 'bg-[#FE2C55] text-white' : 'border border-slate-300'
            }`}
          >
            {phoneShield && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </button>
        </div>

        {/* Card 4: Payment Methods (Matching 提单页.png & 自动续订开通.png) */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded-md bg-[#FE2C55] text-white flex items-center justify-center text-xs font-black">
                抖
              </div>
              <span className="text-xs font-bold text-slate-900">抖音支付</span>
              <span className="bg-[#FE2C55] text-white text-[9px] font-black px-1.5 py-0.2 rounded">推荐</span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">本单免密支付</span>
          </div>

          {/* Option 1: Credit Card */}
          <div 
            onClick={() => setSelectedPayMethod('credit_card')}
            className="flex items-center justify-between py-1 cursor-pointer"
          >
            <div className="flex items-center space-x-2.5">
              <span className="text-xs font-medium text-slate-800">中信银行信用卡 (2108)</span>
            </div>
            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
              selectedPayMethod === 'credit_card' ? 'bg-[#FE2C55] text-white' : 'border border-slate-300'
            }`}>
              {selectedPayMethod === 'credit_card' && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
          </div>

          {/* Option 2: Other Bank Card */}
          <div 
            onClick={() => setSelectedPayMethod('bank_card')}
            className="flex items-center justify-between py-1 cursor-pointer"
          >
            <span className="text-xs font-medium text-slate-600">使用银行卡支付</span>
            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
              selectedPayMethod === 'bank_card' ? 'bg-[#FE2C55] text-white' : 'border border-slate-300'
            }`}>
              {selectedPayMethod === 'bank_card' && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar (Using absolute inside phone container) */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-3 flex items-center justify-between z-30 shadow-lg">
        <div className="flex items-baseline">
          <span className="text-sm font-black text-[#FE2C55]">¥</span>
          <span className="text-2xl font-black text-[#FE2C55] tracking-tight">{price.toFixed(2)}</span>
        </div>

        <button
          onClick={handleSubmitClick}
          className="bg-gradient-to-r from-[#FE2C55] to-[#E01A4F] hover:brightness-105 active:scale-95 text-white font-bold text-sm px-7 py-2.5 rounded-full shadow-md shadow-rose-500/25 transition-transform"
        >
          提交订单
        </button>
      </div>

      {/* Step 2 Popup: Auto-Renewal Authorization Agreement Modal (Matching 自动续订开通.png) */}
      {showAgreementModal && (
        <div className="absolute inset-0 bg-black/60 z-50 flex items-end justify-center animate-fadeIn">
          <div className="bg-white w-full rounded-t-3xl p-5 shadow-2xl space-y-4 animate-slideUp relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-slate-900">商品相关协议</h3>
              <button 
                onClick={() => setShowAgreementModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Notice Body */}
            <div className="text-xs text-slate-600 leading-relaxed py-2">
              <span>请仔细阅读 </span>
              <span className="text-[#1A66FF] font-medium cursor-pointer">《抖音电商自动续费扣款协议》</span>
              <span>、</span>
              <span className="text-[#1A66FF] font-medium cursor-pointer">《扣款授权服务协议》</span>
              <span>，同意购买请点击同意并下单。</span>
            </div>

            {/* Agreement CTA Button */}
            <button
              onClick={handleConfirmAndPay}
              className="w-full bg-[#FE2C55] hover:bg-[#E01A4F] active:scale-[0.98] text-white font-bold text-base py-3 rounded-full shadow-lg shadow-rose-500/30 transition-transform"
            >
              同意并下单
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
