import React, { useState } from 'react';
import { X, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

interface UnsubscribeModalProps {
  onClose: () => void;
  onConfirmUnsubscribe: () => void;
}

export const UnsubscribeModal: React.FC<UnsubscribeModalProps> = ({
  onClose,
  onConfirmUnsubscribe
}) => {
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      onConfirmUnsubscribe();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#161823] border border-[#2D3142] text-white w-full max-w-sm rounded-[28px] overflow-hidden shadow-2xl relative animate-scaleUp p-5">
        
        <div className="flex items-center justify-between pb-3 border-b border-[#2D3142]">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-[#FE2C55]" />
            <span className="font-bold text-sm text-slate-100">连续包月退订与扣款管理</span>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-full bg-[#1F2231]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {!confirmed ? (
          <div className="mt-4 space-y-4">
            <div className="bg-[#12131D] p-4 rounded-2xl border border-[#2D3142] text-center">
              <div className="text-xs text-slate-400 font-medium">【充值会员】</div>
              <div className="text-sm font-bold text-amber-400 mt-1">
                你本月已省下 <strong className="text-xl font-black italic text-[#FE2C55]">¥ 20.00</strong> 元
              </div>
              <div className="text-[10px] text-slate-400 mt-1">包含：2元话费直减券 + 2元抖音电商券</div>
            </div>

            <div className="bg-[#1F2231] p-3.5 rounded-2xl border border-[#2D3142] text-xs text-slate-300 leading-relaxed">
              <div className="font-semibold text-white text-xs mb-1">退订须知（工信部合规保护）：</div>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-400">
                <li>一键取消后，下月起将不再自动扣除 ¥1.99 续费。</li>
                <li>本月已发放的话费红包与流量特权在当月仍可继续使用。</li>
                <li>如需重新使用，可随时在充值中心重新开通。</li>
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={handleConfirm}
                className="w-full bg-[#FE2C55] hover:bg-[#e02648] text-white font-bold text-xs py-3.5 rounded-2xl shadow-lg shadow-[#FE2C55]/30 transition-colors"
              >
                一键确认取消连续包月
              </button>
              
              <button
                onClick={onClose}
                className="w-full bg-[#1F2231] hover:bg-[#252836] text-slate-300 font-semibold text-xs py-2.5 rounded-2xl transition-colors border border-[#2D3142]"
              >
                暂不退订，保留特权
              </button>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="font-bold text-base text-white">连续包月服务已成功取消</div>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              当月已开通权益可继续使用至本月结束，次月起不会发起任何自动扣费。
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
