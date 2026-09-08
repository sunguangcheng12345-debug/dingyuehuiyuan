import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Lock, Sparkles, ArrowRight } from 'lucide-react';

interface CheckoutModalProps {
  rechargeAmount: number;
  onClose: () => void;
  onSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  rechargeAmount,
  onClose,
  onSuccess
}) => {
  const [agreed, setAgreed] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayClick = () => {
    if (!agreed) {
      alert('请阅读并勾选连续包月服务协议');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end justify-center sm:items-center p-0 sm:p-4 animate-fadeIn">
      <div className="bg-[#161823] border border-[#2D3142] text-white w-full max-w-md rounded-t-[28px] sm:rounded-[28px] overflow-hidden shadow-2xl relative animate-slideUp">
        
        {/* Header Bar */}
        <div className="p-4 border-b border-[#2D3142] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-[#FE2C55] text-white font-black flex items-center justify-center text-xs shadow-md shadow-[#FE2C55]/30">
              抖
            </div>
            <span className="font-bold text-sm text-slate-100">抖音支付收银台</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-full bg-[#1F2231] hover:bg-[#252836] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Product Summary */}
        <div className="p-5 text-center bg-[#12131D] border-b border-[#2D3142]">
          <div className="text-xs text-slate-400 font-medium">动信通充值会员</div>
          <div className="mt-2 flex items-baseline justify-center space-x-1">
            <span className="text-xs text-amber-400 font-black">仅需 ¥</span>
            <span className="text-3xl font-black italic text-amber-400 tracking-tight">1.99</span>
            <span className="text-xs text-slate-400"> /月 (自动续费)</span>
          </div>

          <div className="mt-3 inline-flex items-center space-x-1 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-xs text-emerald-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>立赠 2.00 元话费直减券 + 2.00 元抖音电商券</span>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="p-5 space-y-4">
          <div className="text-xs font-bold text-slate-300">选择支付方式</div>

          <div className="bg-[#1F2231] border border-[#FE2C55]/60 rounded-2xl p-3.5 flex items-center justify-between relative shadow-md">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-[#FE2C55] text-white font-black flex items-center justify-center text-sm shadow-md shadow-[#FE2C55]/30">
                抖
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center space-x-2">
                  <span>抖音支付 (连续包月)</span>
                  <span className="bg-[#FE2C55] text-white text-[9px] px-1.5 py-0.2 rounded font-black">推荐</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">支持零钱 / 抖音月付 / 银行卡自动扣款</div>
              </div>
            </div>
            <CheckCircle2 className="w-5 h-5 text-[#FE2C55]" />
          </div>

          {/* Compliance Agreement Checkbox */}
          <div className="pt-2">
            <label className="flex items-start space-x-2.5 cursor-pointer text-[11px] text-slate-400 leading-relaxed">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 rounded bg-[#1F2231] border-[#2D3142] text-[#FE2C55] focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              <span>
                我已阅读并同意 <strong className="text-slate-200">《抖音支付自动续费协议》</strong> 及 <strong className="text-slate-200">《充值会员服务条款》</strong>。连续包月1.99元/月自动续费，<strong className="text-amber-400">扣款前5天消息盒子提醒，端内随时一键取消退订</strong>。
              </span>
            </label>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={handlePayClick}
              disabled={isProcessing}
              className="w-full bg-[#FE2C55] hover:bg-[#e02648] text-white font-extrabold text-base py-3.5 rounded-2xl shadow-lg shadow-[#FE2C55]/30 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <span className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>正在唤起抖音支付...</span>
                </span>
              ) : (
                <span className="flex items-center space-x-1">
                  <Lock className="w-4 h-4" />
                  <span>同意协议并开通 (¥1.99/月)</span>
                </span>
              )}
            </button>
          </div>

          <div className="text-center text-[10px] text-slate-500 flex items-center justify-center space-x-1 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>工信部规范合规保护 • 动信通全额卡券履约</span>
          </div>

        </div>

      </div>
    </div>
  );
};
