import React, { useState } from 'react';
import { BenefitItem } from '../types';
import { X, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface ClaimBenefitModalProps {
  benefit: BenefitItem;
  onClose: () => void;
}

export const ClaimBenefitModal: React.FC<ClaimBenefitModalProps> = ({
  benefit,
  onClose
}) => {
  const [phoneNumber, setPhoneNumber] = useState('138 8888 6666');
  const [address, setAddress] = useState('北京市海淀区中关村南大街1号');
  const [step, setStep] = useState<'form' | 'success'>('form');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#161823] border border-[#2D3142] text-white w-full max-w-sm rounded-[28px] overflow-hidden shadow-2xl relative p-5 animate-scaleUp">
        
        <div className="flex items-center justify-between pb-3 border-b border-[#2D3142]">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-sm text-amber-400">{benefit.title}</span>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-full bg-[#1F2231]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="bg-[#1F2231] p-3.5 rounded-2xl border border-[#2D3142] text-xs text-slate-300">
              <div className="text-amber-300 font-bold mb-1">【资费与适用说明】</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{benefit.description}</p>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">领用手机号码</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-[#12131D] border border-[#2D3142] rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>

            {benefit.icon === 'Router' && (
              <div>
                <label className="text-xs text-slate-400 block mb-1">宽带入户安装地址 (免费测速)</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#12131D] border border-[#2D3142] rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-400 to-[#FE2C55] text-slate-950 font-black text-xs py-3.5 rounded-2xl shadow-lg hover:brightness-110 transition-all"
            >
              确认办理并享受特权
            </button>
          </form>
        ) : (
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="font-bold text-base text-white">办理申请提交成功！</div>
            <p className="text-xs text-slate-400">
              短信确认包已发送至 {phoneNumber}，动信通与运营商客服将在2小时内对接履约。
            </p>
            <button
              onClick={onClose}
              className="mt-2 bg-slate-800 text-white font-semibold text-xs px-5 py-2 rounded-xl"
            >
              完成
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
