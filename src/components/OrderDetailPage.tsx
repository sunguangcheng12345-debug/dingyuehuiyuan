import React from 'react';
import { ChevronLeft, MoreHorizontal, MessageSquare, ChevronRight, Store, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';

interface OrderDetailPageProps {
  onBack: () => void;
  onGoToVipCenter: () => void;
  onRebuy: () => void;
  phone?: string;
  price?: number;
}

export const OrderDetailPage: React.FC<OrderDetailPageProps> = ({
  onBack,
  onGoToVipCenter,
  onRebuy,
  phone = '150****2806',
  price = 1.99,
}) => {
  return (
    <div className="bg-[#F5F6F8] text-slate-900 min-h-full flex flex-col justify-between font-sans select-none relative animate-fadeIn">
      {/* Top Header Bar matching 订单查询.png */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-20 border-b border-slate-100 shrink-0">
        <button 
          onClick={onBack}
          className="p-1 -ml-1 text-slate-800 hover:text-slate-600 active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="font-black text-base text-slate-900">充值成功</h1>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <MoreHorizontal className="w-5 h-5 text-slate-700" />
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#FE2C55] text-white rounded-full text-[9px] font-black flex items-center justify-center">
              4
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-3 space-y-3 pb-20">
        {/* Section 1: Cross-sell Recommendations (Matching 订单查询.png top cards) */}
        <div className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">看看大家在这家店买了啥</span>
            <span className="text-xs text-slate-400 font-medium flex items-center">
              进店逛逛 <ChevronRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* Item 1 */}
            <div className="bg-[#FFF5F5] rounded-xl p-2 flex flex-col justify-between border border-rose-100/80 text-center min-h-[96px]">
              <div className="text-[10px] font-black text-[#FE2C55] leading-tight mt-1">
                【50元话费直充】<br/>自动秒到账
              </div>
              <div className="text-xs font-black text-[#FE2C55] mt-2">¥49.80</div>
            </div>

            {/* Item 2 */}
            <div className="bg-[#F6F8FC] rounded-xl p-2 flex flex-col justify-between border border-slate-100 text-center min-h-[96px]">
              <div className="text-[10px] font-bold text-slate-700 leading-tight mt-1">
                【100元话费直充】<br/>立减2元优惠
              </div>
              <div className="text-xs font-black text-slate-800 mt-2">¥98.00</div>
            </div>

            {/* Item 3 */}
            <div className="bg-[#F6F8FC] rounded-xl p-2 flex flex-col justify-between border border-slate-100 text-center min-h-[96px]">
              <div className="text-[10px] font-bold text-slate-700 leading-tight mt-1">
                【全国流量周包】<br/>10GB特惠
              </div>
              <div className="text-xs font-black text-slate-800 mt-2">¥9.90</div>
            </div>
          </div>
        </div>

        {/* Section 2: Recharge Account & Renewal Management (Matching 订单查询.png middle section) */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3 text-xs">
          <div className="text-xs font-black text-slate-900 pb-1">充值信息</div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">动信通会员账号</span>
            <span className="text-slate-900 font-bold">{phone}</span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-100">
            <span className="text-slate-500 font-medium">续费管理</span>
            <button 
              onClick={onGoToVipCenter}
              className="text-slate-500 font-medium flex items-center space-x-0.5 hover:text-slate-800"
            >
              <span>自动续订，可随时取消</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Section 3: Shop & Order details (Matching 订单查询.png bottom section) */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3.5">
          {/* Shop Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-500 to-[#FE2C55] text-white flex items-center justify-center text-[9px] font-black">
                动
              </div>
              <span className="text-xs font-bold text-slate-800">动信通官方旗舰店</span>
              <span className="bg-[#FE2C55]/10 text-[#FE2C55] text-[9px] font-bold px-1 rounded flex items-center">
                直播
              </span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* Item Row */}
          <div className="flex items-start space-x-3">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-400 via-rose-500 to-[#FE2C55] p-1.5 flex flex-col justify-between text-white shrink-0 shadow-sm text-center">
              <span className="text-[7px] font-black bg-black/30 px-1 rounded w-fit">连续包月</span>
              <div className="text-xs font-black tracking-tight leading-none">¥1.99</div>
              <div className="text-[7px] font-bold bg-white/20 rounded py-0.2">立省2元</div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <h3 className="text-xs font-black text-slate-900 line-clamp-2 flex-1 pr-2">
                  【连包直减】充值会员 VIP 月卡 享2元话费+2元电商券
                </h3>
                <span className="text-xs font-bold text-slate-900 shrink-0">¥{price.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[11px] text-slate-400">月卡</span>
                <span className="text-[11px] text-slate-400">x1</span>
              </div>
            </div>
          </div>

          {/* Action Buttons: 再买一单 / 申请售后 / 去使用 */}
          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
            <button 
              onClick={onRebuy}
              className="text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 px-3 py-1.5 rounded-full active:scale-95 transition-transform"
            >
              再买一单
            </button>
            <button 
              onClick={onGoToVipCenter}
              className="text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 px-3 py-1.5 rounded-full active:scale-95 transition-transform"
            >
              申请售后
            </button>
            <button 
              onClick={onGoToVipCenter}
              className="text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-[#FE2C55] hover:brightness-105 px-3.5 py-1.5 rounded-full shadow-sm active:scale-95 transition-transform flex items-center space-x-1"
            >
              <span>去使用</span>
            </button>
          </div>

          {/* Price Calculation */}
          <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">商品总价</span>
              <span className="text-slate-900 font-bold">¥{price.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">实付款</span>
              <span className="text-base font-black text-[#FE2C55]">¥{price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating Operations (Using absolute inside phone container) */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2.5 flex items-center justify-end space-x-2 z-30 shadow-lg">
        <button 
          onClick={onGoToVipCenter}
          className="text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 px-3 py-1.5 rounded-full"
        >
          删除订单
        </button>
        <button 
          onClick={onGoToVipCenter}
          className="text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 px-3 py-1.5 rounded-full"
        >
          去评价
        </button>
        <button 
          onClick={onRebuy}
          className="text-xs font-bold text-[#FE2C55] bg-rose-50 border border-rose-200 hover:bg-rose-100 px-3.5 py-1.5 rounded-full font-black"
        >
          再买一单
        </button>
      </div>
    </div>
  );
};
