import React, { useState, useEffect } from 'react';
import { CheckCircle2, ShieldCheck, ChevronRight } from 'lucide-react';

interface OrderSuccessModalProps {
  onConfirm: () => void;
  price?: number;
  paymentAccount?: string;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  onConfirm,
  price = 1.99,
  paymentAccount = '中信银行信用卡(2108)',
}) => {
  return (
    <div className="fixed inset-0 bg-black/65 backdrop-blur-[2px] z-50 flex items-center justify-center p-4 animate-fadeIn select-none">
      <div className="bg-white text-slate-900 w-full max-w-[340px] rounded-3xl p-6 shadow-2xl relative animate-scaleUp text-center flex flex-col items-center">
        
        {/* TikTok Sign Icon Graphic */}
        <div className="w-16 h-16 rounded-full bg-slate-950 flex items-center justify-center shadow-lg my-2 relative">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-xl">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.891 2.887 2.897 2.897 0 0 1-2.896-2.887 2.896 2.896 0 0 1 2.896-2.892c.383 0 .744.075 1.077.21v-3.55a6.408 6.408 0 0 0-1.077-.092C5.875 9.348 3 12.228 3 15.672 3 19.117 5.875 22 9.487 22c3.543 0 6.425-2.846 6.487-6.38V9.114a8.216 8.216 0 0 0 3.615.834V6.686z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-black text-slate-900 mt-2 tracking-tight">签约成功</h2>

        {/* Details list matching 开通成功.png */}
        <div className="w-full mt-6 space-y-3.5 text-xs text-left border-t border-slate-100 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">开通服务</span>
            <span className="text-slate-900 font-bold">产品信息</span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">扣款方式</span>
              <span className="text-slate-900 font-bold text-right flex items-center space-x-1">
                <span className="inline-block w-3.5 h-3.5 rounded-full bg-red-600 text-[8px] text-white text-center leading-3 font-bold">信</span>
                <span className="truncate">优先从 {paymentAccount}扣款</span>
              </span>
            </div>
            <div className="text-[10px] text-slate-400 text-right leading-tight">
              可到「抖音钱包-支付设置-自动扣款管理」调整
            </div>
          </div>
        </div>

        {/* Main CTA Button: 知道了 */}
        <button
          onClick={onConfirm}
          className="mt-7 w-full bg-[#FE2C55] hover:bg-[#E01A4F] active:scale-[0.98] text-white font-black text-base py-3.5 rounded-xl shadow-lg shadow-rose-500/25 transition-transform"
        >
          知道了
        </button>

        {/* Footer Guarantee */}
        <div className="mt-4 flex items-center justify-center space-x-2 text-[10px] text-slate-400">
          <span className="font-bold text-slate-500">抖音支付</span>
          <span>|</span>
          <span>中国人保财险 提供百万保障</span>
        </div>

      </div>
    </div>
  );
};
