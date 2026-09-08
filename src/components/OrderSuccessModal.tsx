import React from 'react';
import { X, Check, ChevronRight } from 'lucide-react';

interface OrderSuccessModalProps {
  onConfirm: () => void;
  onClose?: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  onConfirm,
  onClose,
}) => {
  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] z-50 flex flex-col justify-between overflow-hidden animate-fadeIn select-none">
      {/* Top Push Notification Banner matching 截图 */}
      <div className="p-3 pt-3 w-full">
        <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl flex items-center justify-between animate-slideDown border border-slate-100">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-[#FE2C55] text-white flex flex-col items-center justify-center font-black text-[11px] shrink-0 shadow-xs">
              <span>动信</span>
              <span className="text-[8px] -mt-0.5">会员</span>
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold text-slate-900 leading-tight">客服回复</div>
              <div className="text-xs text-slate-500 truncate max-w-[200px] mt-0.5">
                动信通官方旗舰店: 请查看您咨询的...
              </div>
            </div>
          </div>
          <button 
            onClick={onConfirm}
            className="text-sm font-bold text-[#FE2C55] px-2.5 py-1 hover:bg-rose-50 rounded-lg shrink-0"
          >
            回复
          </button>
        </div>
      </div>

      {/* Bottom Sheet Drawer exactly matching uploaded screenshot */}
      <div className="bg-white w-full rounded-t-[28px] px-6 pt-6 pb-12 shadow-2xl animate-slideUp relative flex flex-col items-center shrink-0">
        {/* Top Left Close X in circle button */}
        <button 
          onClick={onClose || onConfirm}
          className="absolute top-5 left-5 w-8 h-8 rounded-full bg-[#F4F5F7] text-slate-700 hover:text-slate-900 hover:bg-slate-200 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Big Green Success Circle */}
        <div className="w-16 h-16 rounded-full border-[3px] border-[#00C583] flex items-center justify-center mt-4 mb-4 shadow-xs">
          <Check className="w-9 h-9 text-[#00C583] stroke-[3.5]" />
        </div>

        {/* Title */}
        <h2 className="text-[20px] font-bold text-slate-900 tracking-normal text-center mb-8">
          动信通自动续费开通成功
        </h2>

        {/* Payment Order Option Card - Soft gray rounded box with generous inner padding */}
        <div className="w-full bg-[#F7F8FA] rounded-2xl px-5 py-4 flex items-center justify-between cursor-pointer mb-12">
          <span className="text-[15px] text-slate-900 font-normal">付款方式</span>
          <div className="flex items-center space-x-1.5 text-[14px] text-slate-700 font-normal">
            <span>按默认顺序付款</span>
            <ChevronRight className="w-4 h-4 text-slate-400 stroke-[2]" />
          </div>
        </div>

        {/* Bottom Gray CTA Button: 我知道了 - perfectly sized and centered matching screenshot */}
        <div className="w-full flex justify-center">
          <button
            onClick={onConfirm}
            className="w-[180px] bg-[#F2F3F5] hover:bg-[#E5E6EB] active:scale-[0.98] text-slate-900 font-medium text-[15px] py-2.5 rounded-xl transition-all text-center"
          >
            我知道了
          </button>
        </div>
      </div>
    </div>
  );
};


