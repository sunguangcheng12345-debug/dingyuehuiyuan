import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Headphones, 
  ShieldCheck, 
  Star, 
  LayoutGrid,
  Check
} from 'lucide-react';
import { MembershipSku } from '../types';

interface OrderDetailPageProps {
  onBack: () => void;
  onGoToVipCenter: () => void;
  onGoToOrderList?: () => void;
  onGoToRenewalManagement?: () => void;
  onRebuy: () => void;
  phone?: string;
  price?: number;
  selectedSku?: MembershipSku;
}

export const OrderDetailPage: React.FC<OrderDetailPageProps> = ({
  onBack,
  onGoToVipCenter,
  onGoToOrderList,
  onGoToRenewalManagement,
  onRebuy,
  phone = '185****0637',
  price,
  selectedSku,
}) => {
  const finalPrice = selectedSku ? selectedSku.price : (price ?? 1.99);
  const skuName = selectedSku ? selectedSku.name : '动信通充值会员';
  const skuTier = selectedSku ? selectedSku.tierNumber : '连包月卡';
  const skuShortName = selectedSku ? selectedSku.shortName : '月卡';
  const [copied, setCopied] = useState(false);
  const [rating, setRating] = useState(0);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const handleCopyOrderNumber = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#F4F5F7] text-slate-900 min-h-full flex flex-col justify-between font-sans select-none relative animate-fadeIn">
      {/* Top Header Bar matching 截图 6 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-20 shrink-0 border-b border-slate-100">
        <button 
          onClick={onBack}
          className="p-1 -ml-1 text-slate-800 hover:text-slate-600 active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="font-extrabold text-base text-slate-900">充值成功</h1>
        <button 
          onClick={onGoToOrderList}
          title="查看全部订单"
          className="p-1 text-slate-700 hover:text-slate-900"
        >
          <LayoutGrid className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 p-3 space-y-3 pb-24 overflow-y-auto custom-scrollbar">
        {/* Card 1: 充值信息 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-1">
            <span className="text-sm font-extrabold text-slate-900">充值信息</span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center space-x-0.5">
              <span>●</span>
              <span>全量权益已自动下发</span>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-600 font-medium">手机号</span>
            <span className="text-xs font-extrabold text-slate-900 tracking-wider">{phone}</span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-100">
            <span className="text-xs text-slate-600 font-medium">续费管理</span>
            <button 
              onClick={onGoToRenewalManagement || onGoToVipCenter}
              className="text-xs text-slate-400 font-normal flex items-center space-x-0.5 hover:text-slate-700 active:scale-95 transition-transform"
            >
              <span>自动续订，可随时取消</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 2: 店铺与商品信息 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3.5">
          {/* Shop Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 cursor-pointer">
              <span className="text-xs font-extrabold text-slate-900">动信通官方旗舰店</span>
              <span className="bg-[#161823] text-[#FFE8D6] text-[8px] font-black px-1 rounded">
                抖音旗舰
              </span>
              <span className="bg-rose-50 text-[#FE2C55] text-[8px] font-black px-1 rounded flex items-center space-x-0.5">
                <span className="w-1.5 h-1.5 bg-[#FE2C55] rounded-full inline-block animate-pulse" />
                <span>直播</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

          {/* Product Row */}
          <div className="flex items-start space-x-3">
            <div className="w-18 h-22 rounded-xl bg-gradient-to-b from-[#FEE8D6] to-[#FDCEB9] p-2 flex flex-col justify-between text-slate-800 shrink-0 shadow-sm border border-amber-200/60 relative overflow-hidden">
              <span className="text-[7px] font-black bg-[#FE2C55] text-white px-1 rounded-br absolute top-0 left-0">
                {selectedSku?.badge || '热卖爆款'}
              </span>
              <div className="mt-3 text-center">
                <div className="text-[8px] font-bold text-amber-900 leading-tight truncate">{skuShortName}</div>
                <div className="text-[7px] text-amber-800">{skuTier}</div>
                <div className="text-xs font-black text-[#FE2C55] mt-0.5">¥{finalPrice.toFixed(2)}</div>
              </div>
              <div className="text-[6px] text-center text-slate-400 scale-75 truncate">
                总值¥{selectedSku?.nominalValue || 93}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <h3 className="text-xs font-bold text-slate-900 leading-snug line-clamp-1 flex-1 pr-1">
                  【连包专属】{skuName}
                </h3>
                <span className="text-xs font-black text-slate-900 shrink-0">¥{finalPrice.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400">
                <span>{skuTier} · {skuShortName}</span>
                <span>x1</span>
              </div>
            </div>
          </div>

          {/* Action buttons: 再买一单 / 申请售后 */}
          <div className="flex items-center justify-end space-x-2 pt-1">
            <button 
              onClick={onRebuy}
              className="text-xs font-bold text-slate-700 bg-[#F4F5F7] hover:bg-slate-200 px-3.5 py-1.5 rounded-full active:scale-95 transition-all"
            >
              再买一单
            </button>
            <button 
              onClick={onGoToVipCenter}
              className="text-xs font-bold text-slate-700 bg-[#F4F5F7] hover:bg-slate-200 px-3.5 py-1.5 rounded-full active:scale-95 transition-all"
            >
              申请售后
            </button>
          </div>

          {/* Order Details List */}
          <div className="pt-3 border-t border-slate-100 space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">实付款</span>
              <span className="text-sm font-black text-slate-900">¥{finalPrice.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">订单编号</span>
              <div className="flex items-center space-x-1.5">
                <span className="text-slate-700 font-mono">6928971352829754861</span>
                <button 
                  onClick={handleCopyOrderNumber}
                  className="text-slate-500 hover:text-slate-800 text-[11px] flex items-center space-x-0.5"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? '已复制' : '复制'}</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">交易快照</span>
              <div className="flex items-center space-x-0.5 text-slate-400 text-[11px] cursor-pointer">
                <span>发生争议时可作为判断依据</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">更多信息</span>
              <button 
                onClick={() => setShowMoreInfo(!showMoreInfo)}
                className="text-slate-400 text-[11px] flex items-center space-x-0.5"
              >
                <span>{showMoreInfo ? '收起 ∧' : '展开 ∨'}</span>
              </button>
            </div>

            {showMoreInfo && (
              <div className="bg-[#F8F9FA] rounded-xl p-2.5 space-y-1.5 text-[11px] text-slate-500 animate-fadeIn">
                <div className="flex justify-between">
                  <span>创建时间</span>
                  <span>2026-08-26 10:29:18</span>
                </div>
                <div className="flex justify-between">
                  <span>支付方式</span>
                  <span>抖音月付 (不分期 0费用)</span>
                </div>
              </div>
            )}

            {/* Contact Merchant Button */}
            <div className="pt-2">
              <button 
                onClick={onGoToVipCenter}
                className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-800 text-xs font-extrabold flex items-center justify-center space-x-1.5 hover:bg-slate-50 active:scale-[0.99] transition-transform"
              >
                <Headphones className="w-3.5 h-3.5 text-slate-700" />
                <span>联系商家</span>
              </button>
            </div>
          </div>
        </div>

        {/* Card 3: 服务保障 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
          <div className="text-xs font-extrabold text-slate-900">服务保障</div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1.5 text-slate-800 font-medium">
              <ShieldCheck className="w-4 h-4 text-slate-500" />
              <span>号码保护</span>
              <span className="text-slate-400 font-normal">隐藏手机号，保护隐私</span>
            </div>
            <span className="text-slate-400 flex items-center space-x-0.5 text-[11px] cursor-pointer">
              <span>查看</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Card 4: 遇到问题 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between text-xs">
          <span className="font-extrabold text-slate-900">遇到问题</span>
          <div className="flex items-center space-x-1 text-slate-600 font-medium cursor-pointer">
            <Headphones className="w-3.5 h-3.5" />
            <span>官方客服</span>
          </div>
        </div>

        {/* Card 5: 满意度评价 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3 text-center">
          <div className="text-xs font-bold text-slate-800">
            基于本次购买经历，你愿意继续在抖音电商购买吗？
          </div>
          <div className="flex items-center justify-center space-x-4 pt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button 
                key={star} 
                onClick={() => setRating(star)}
                className="p-1 text-slate-300 hover:text-amber-400 active:scale-125 transition-transform"
              >
                <Star className={`w-6 h-6 ${rating >= star ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Sticky Footer matching 截图 6 */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-4 py-2.5 flex items-center justify-between z-30 shadow-lg">
        <button className="text-xs text-slate-500 hover:text-slate-800 font-medium">
          更多
        </button>

        <div className="flex items-center space-x-2">
          <button 
            onClick={onGoToVipCenter}
            className="text-xs font-bold text-slate-700 bg-[#F4F5F7] hover:bg-slate-200 px-3.5 py-1.5 rounded-full transition-all"
          >
            删除订单
          </button>
          <button 
            onClick={onGoToVipCenter}
            className="text-xs font-bold text-slate-700 bg-[#F4F5F7] hover:bg-slate-200 px-3.5 py-1.5 rounded-full transition-all"
          >
            去评价
          </button>
          <button 
            onClick={onRebuy}
            className="text-xs font-extrabold text-[#FE2C55] bg-rose-50 hover:bg-rose-100 border border-rose-200 px-4 py-1.5 rounded-full transition-all"
          >
            再买一单
          </button>
        </div>
      </div>
    </div>
  );
};
