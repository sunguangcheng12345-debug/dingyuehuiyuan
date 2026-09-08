import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { MembershipSku } from '../types';

interface RenewalManagementPageProps {
  onBack: () => void;
  phone?: string;
  price?: number;
  selectedSku?: MembershipSku;
  onUnsubscribeSuccess?: () => void;
}

export const RenewalManagementPage: React.FC<RenewalManagementPageProps> = ({
  onBack,
  phone = '18518920637',
  price,
  selectedSku,
  onUnsubscribeSuccess,
}) => {
  const finalPrice = selectedSku ? selectedSku.price : (price ?? 1.99);
  const skuName = selectedSku ? selectedSku.name : '动信通充值会员';
  const skuTier = selectedSku ? selectedSku.tierNumber : '连包月卡';
  const skuShortName = selectedSku ? selectedSku.shortName : '充值会员';
  const [isActive, setIsActive] = useState(true);
  const [showConfirmCloseModal, setShowConfirmCloseModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Format date helper
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  const formatDate = (d: Date) => 
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  
  const nextMonthDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  const openTime = formatDate(now);
  const nextRenewalTime = formatDate(nextMonthDate);
  const [closeTime, setCloseTime] = useState('');

  const handleConfirmClose = () => {
    setShowConfirmCloseModal(false);
    setIsActive(false);
    setCloseTime(formatDate(new Date()));
    setShowSuccessToast(true);
    if (onUnsubscribeSuccess) {
      onUnsubscribeSuccess();
    }
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 2500);
  };

  return (
    <div className="bg-[#F4F5F7] text-slate-900 min-h-full flex flex-col font-sans select-none relative animate-fadeIn">
      {/* Top Header Bar matching 截图: `< 续费管理` */}
      <div className="bg-white px-4 py-3 flex items-center sticky top-0 z-20 shrink-0 border-b border-slate-100">
        <button 
          onClick={onBack}
          className="p-1 -ml-1 text-slate-900 hover:text-slate-600 active:scale-95 transition-transform flex items-center"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>
        <h1 className="font-bold text-base text-slate-900 ml-1">续费管理</h1>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-3 space-y-3 pb-8 overflow-y-auto custom-scrollbar">
        {/* Card 1: 生效中 / Active Service */}
        {isActive ? (
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3 animate-fadeIn">
            {/* Header row: Logo + Brand + 生效中 */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-md bg-[#00C583] text-white flex items-center justify-center font-black text-[10px] shadow-xs">
                  动信
                </div>
                <span className="text-[15px] font-bold text-slate-900">动信通 · {skuShortName}</span>
              </div>
              <span className="text-xs font-bold text-[#00C583]">生效中</span>
            </div>

            {/* Field Rows matching exact screenshot order and styling */}
            <div className="space-y-2.5 text-xs text-slate-800 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">账号</span>
                <span className="font-normal text-slate-800 tracking-wide">{phone}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600">服务项目</span>
                <span className="font-bold text-slate-900">{skuTier}（{skuName}）</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600">续费类型</span>
                <span className="font-normal text-slate-800">按月续费（按31天计算）</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600">续费金额</span>
                <span className="font-bold text-slate-900">¥{finalPrice.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600">开通时间</span>
                <span className="font-normal text-slate-700 font-mono">{openTime}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600">下次续订时间</span>
                <span className="font-normal text-slate-700 font-mono">{nextRenewalTime}</span>
              </div>

              <div className="flex items-center justify-between cursor-pointer">
                <span className="text-slate-600">成功续费次数</span>
                <div className="flex items-center space-x-0.5 text-slate-700">
                  <span>1次</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600">优惠信息</span>
                <span className="font-normal text-slate-700">首月特惠价{finalPrice.toFixed(2)}元</span>
              </div>
            </div>

            {/* Bottom Action Button: 关闭续订 */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowConfirmCloseModal(true)}
                className="text-xs text-slate-700 hover:text-slate-900 border border-slate-300 hover:border-slate-400 px-4 py-1.5 rounded-full active:scale-95 transition-all"
              >
                关闭续订
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3 animate-fadeIn">
            {/* Header row: Logo + Brand + 已关闭 */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-md bg-slate-400 text-white flex items-center justify-center font-black text-[10px]">
                  动信
                </div>
                <span className="text-[15px] font-bold text-slate-900">动信通</span>
              </div>
              <span className="text-xs font-normal text-slate-500">已关闭</span>
            </div>

            {/* Field Rows */}
            <div className="space-y-2.5 text-xs text-slate-800 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">账号</span>
                <span className="font-normal text-slate-800 tracking-wide">{phone}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600">续费类型</span>
                <span className="font-normal text-slate-800">按月续费（按31天计算）</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600">续费金额</span>
                <span className="font-bold text-slate-900">¥{price.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600">开通时间</span>
                <span className="font-normal text-slate-700 font-mono">{openTime}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600">关闭时间</span>
                <span className="font-normal text-slate-700 font-mono">{closeTime || openTime}</span>
              </div>

              <div className="flex items-center justify-between cursor-pointer">
                <span className="text-slate-600">成功续费次数</span>
                <div className="flex items-center space-x-0.5 text-slate-700">
                  <span>1次</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600">优惠信息</span>
                <span className="font-normal text-slate-700">首月价{price.toFixed(2)}元</span>
              </div>
            </div>
          </div>
        )}

        {/* Card 2: 历史已关闭记录 (Matching Screenshot 2 bottom card) */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3 opacity-90">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-md bg-[#00C583] text-white flex items-center justify-center font-black text-[10px]">
                动信
              </div>
              <span className="text-[15px] font-bold text-slate-900">动信通</span>
            </div>
            <span className="text-xs font-normal text-slate-500">已关闭</span>
          </div>

          <div className="space-y-2.5 text-xs text-slate-800 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">账号</span>
              <span className="font-normal text-slate-800 tracking-wide">{phone}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600">续费类型</span>
              <span className="font-normal text-slate-800">按月续费（按31天计算）</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600">续费金额</span>
              <span className="font-bold text-slate-900">¥12.00</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600">开通时间</span>
              <span className="font-normal text-slate-700 font-mono">2026-08-27 10:18:26</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600">关闭时间</span>
              <span className="font-normal text-slate-700 font-mono">2026-08-27 10:18:41</span>
            </div>

            <div className="flex items-center justify-between cursor-pointer">
              <span className="text-slate-600">成功续费次数</span>
              <div className="flex items-center space-x-0.5 text-slate-700">
                <span>1次</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600">优惠信息</span>
              <span className="font-normal text-slate-700">首月价12元</span>
            </div>
          </div>
        </div>
      </div>

      {/* Close Confirmation Dialog */}
      {showConfirmCloseModal && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-5 w-full max-w-xs shadow-2xl text-center space-y-4 animate-scaleUp">
            <h3 className="text-base font-bold text-slate-900">确认关闭续订？</h3>
            <p className="text-xs text-slate-600 leading-relaxed text-left">
              关闭自动续订后，下个计费周期将不再发起扣费。当月已享受的权益在有效期内仍可继续使用。
            </p>
            <div className="flex items-center space-x-2 pt-2">
              <button
                onClick={() => setShowConfirmCloseModal(false)}
                className="flex-1 py-2.5 rounded-full bg-[#F4F5F7] text-slate-700 text-xs font-bold hover:bg-slate-200"
              >
                暂不关闭
              </button>
              <button
                onClick={handleConfirmClose}
                className="flex-1 py-2.5 rounded-full bg-[#FE2C55] text-white text-xs font-bold hover:bg-rose-600"
              >
                确认关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md text-white text-xs px-4 py-2.5 rounded-full shadow-xl flex items-center space-x-2 z-50 animate-slideDown whitespace-nowrap">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>已成功关闭自动续订服务</span>
        </div>
      )}
    </div>
  );
};
