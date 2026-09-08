import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Search, 
  Package, 
  LayoutGrid, 
  ChevronRight, 
  Star 
} from 'lucide-react';
import { MembershipSku } from '../types';

interface OrderListPageProps {
  onBack: () => void;
  onSelectOrder: () => void;
  onRebuy: () => void;
  phone?: string;
  price?: number;
  selectedSku?: MembershipSku;
}

export const OrderListPage: React.FC<OrderListPageProps> = ({
  onBack,
  onSelectOrder,
  onRebuy,
  phone = '18518920637',
  price,
  selectedSku,
}) => {
  const finalPrice = selectedSku ? selectedSku.price : (price ?? 1.99);
  const skuName = selectedSku ? selectedSku.name : '动信通充值会员';
  const skuTier = selectedSku ? selectedSku.tierNumber : '连包月卡';
  const [activeTab, setActiveTab] = useState<'all' | 'unpaid' | 'unshipped' | 'unreceived' | 'review' | 'refund'>('all');
  const [rating, setRating] = useState(0);

  return (
    <div className="bg-[#F4F5F7] text-slate-900 min-h-full flex flex-col justify-between font-sans select-none relative animate-fadeIn">
      {/* Top Header & Search Bar matching 截图 */}
      <div className="bg-white sticky top-0 z-20 shrink-0">
        <div className="px-3 pt-2.5 pb-2 flex items-center space-x-2">
          <button 
            onClick={onBack}
            className="p-1 -ml-1 text-slate-900 hover:text-slate-600 active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Search Input Box with gray background and search icon */}
          <div className="flex-1 bg-[#F4F5F7] rounded-full px-3.5 py-1.5 flex items-center space-x-2 text-xs text-slate-400">
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate text-slate-400 text-xs">搜索商品名/订单号/快递单号</span>
          </div>

          <div className="flex items-center space-x-2 text-slate-800 shrink-0">
            <div className="flex items-center cursor-pointer">
              <Package className="w-5 h-5" />
              <span className="text-[9px] -ml-1 text-slate-700 font-bold scale-90">包裹</span>
            </div>
            <LayoutGrid className="w-5 h-5 cursor-pointer" />
          </div>
        </div>

        {/* Tab Navigation with underline indicators and badges */}
        <div className="flex items-center justify-between px-3 text-xs overflow-x-auto custom-scrollbar no-scrollbar border-b border-slate-100">
          <button 
            onClick={() => setActiveTab('all')}
            className={`py-2 px-1.5 font-bold whitespace-nowrap relative text-[13px] ${
              activeTab === 'all' ? 'text-slate-900 font-extrabold' : 'text-slate-600'
            }`}
          >
            全部
            {activeTab === 'all' && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#FE2C55] rounded-full" />
            )}
          </button>

          <button 
            onClick={() => setActiveTab('unpaid')}
            className={`py-2 px-1.5 font-medium whitespace-nowrap text-[13px] ${
              activeTab === 'unpaid' ? 'text-slate-900 font-bold' : 'text-slate-600'
            }`}
          >
            待支付
          </button>

          <button 
            onClick={() => setActiveTab('unshipped')}
            className={`py-2 px-1.5 font-medium whitespace-nowrap text-[13px] ${
              activeTab === 'unshipped' ? 'text-slate-900 font-bold' : 'text-slate-600'
            }`}
          >
            待发货
          </button>

          <button 
            onClick={() => setActiveTab('unreceived')}
            className={`py-2 px-1.5 font-medium whitespace-nowrap text-[13px] ${
              activeTab === 'unreceived' ? 'text-slate-900 font-bold' : 'text-slate-600'
            }`}
          >
            待收货/使用
          </button>

          <button 
            onClick={() => setActiveTab('review')}
            className={`py-2 px-1.5 font-medium whitespace-nowrap relative flex items-center text-[13px] ${
              activeTab === 'review' ? 'text-slate-900 font-bold' : 'text-slate-600'
            }`}
          >
            <span>评价</span>
            <span className="bg-[#FE2C55] text-white text-[9px] px-1 py-0.2 rounded-full font-bold -mt-2 -mr-1 scale-90">24</span>
          </button>

          <button 
            onClick={() => setActiveTab('refund')}
            className={`py-2 px-1.5 font-medium whitespace-nowrap text-[13px] ${
              activeTab === 'refund' ? 'text-slate-900 font-bold' : 'text-slate-600'
            }`}
          >
            售后
          </button>
        </div>
      </div>

      {/* Scrollable Orders List matching 截图 */}
      <div className="flex-1 p-3 space-y-3 pb-8 overflow-y-auto custom-scrollbar">
        {/* Order 1: Recent Recharge Success Order (充值成功) */}
        <div className="bg-white rounded-2xl p-4 shadow-xs space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 cursor-pointer" onClick={onSelectOrder}>
              <span className="text-[13px] font-bold text-slate-900">动信通官方旗舰店</span>
              <span className="bg-[#161823] text-[#FFE8D6] text-[9px] font-medium px-1 py-0.5 rounded">
                抖音旗舰
              </span>
              <span className="bg-rose-50 text-[#FE2C55] text-[9px] font-medium px-1 py-0.5 rounded flex items-center space-x-0.5">
                <span className="w-1 h-1 bg-[#FE2C55] rounded-full inline-block animate-pulse" />
                <span>直播</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <span className="text-xs font-bold text-[#FE2C55]">充值成功</span>
          </div>

          {/* Product Row */}
          <div className="flex items-start space-x-3 cursor-pointer" onClick={onSelectOrder}>
            {/* VIP Card Poster Thumbnail */}
            <div className="w-[84px] h-[84px] rounded-xl bg-gradient-to-b from-[#FEE8D6] to-[#FDCEB9] p-2 flex flex-col justify-between text-slate-800 shrink-0 shadow-xs border border-amber-200/60 relative overflow-hidden">
              <span className="text-[8px] font-bold bg-[#FE2C55] text-white px-1 rounded-br absolute top-0 left-0">
                {selectedSku?.badge || '热卖爆款'}
              </span>
              <div className="mt-2 text-center">
                <div className="text-[8px] font-bold text-amber-900 leading-tight truncate">{skuName}</div>
                <div className="text-[7px] text-amber-800">{skuTier}</div>
                <div className="text-sm font-black text-[#FE2C55] mt-0.5">¥{finalPrice.toFixed(2)}</div>
              </div>
              <div className="text-[6px] text-center text-slate-500 scale-75 truncate -mb-1">
                下单填写绑定手机号
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <h3 className="text-xs font-bold text-slate-900 leading-snug line-clamp-1 flex-1 pr-1">
                  【连包专属】{skuName}
                </h3>
                <span className="text-xs font-bold text-slate-900 shrink-0">¥{finalPrice.toFixed(2)}</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">{skuTier} · 动信通</div>
              <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                <span>充值号码: {phone}</span>
                <span className="text-slate-400">x1</span>
              </div>
            </div>
          </div>

          {/* Rate Prompt */}
          <div className="bg-[#F8F9FA] rounded-xl px-3 py-2 flex items-center justify-between text-xs">
            <span className="text-slate-700 font-normal">商品好不好，评价一下</span>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} onClick={() => setRating(s)} className="p-0.5">
                  <Star className={`w-4 h-4 ${rating >= s ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Price & Actions */}
          <div className="pt-1 flex items-center justify-between">
            <div className="text-xs">
              <span className="text-slate-500">实付款 </span>
              <span className="font-bold text-slate-900 text-sm">¥{finalPrice.toFixed(2)}</span>
            </div>

            <div className="flex items-center space-x-1.5">
              <button className="text-xs font-normal text-slate-500 hover:text-slate-800 px-1 py-1">
                更多
              </button>
              <button 
                onClick={onSelectOrder}
                className="text-xs font-normal text-slate-800 bg-[#F4F5F7] hover:bg-slate-200 px-3 py-1.5 rounded-full transition-all"
              >
                申请售后
              </button>
              <button 
                onClick={onSelectOrder}
                className="text-xs font-normal text-slate-800 bg-[#F4F5F7] hover:bg-slate-200 px-3 py-1.5 rounded-full transition-all"
              >
                去评价
              </button>
              <button 
                onClick={onRebuy}
                className="text-xs font-bold text-[#FE2C55] bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-full transition-all"
              >
                再买一单
              </button>
            </div>
          </div>
        </div>

        {/* Order 2: History Cancelled / Refunded Order (交易关闭 / 退款成功) */}
        <div className="bg-white rounded-2xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <span className="text-[13px] font-bold text-slate-900">动信通官方旗舰店</span>
              <span className="bg-[#161823] text-[#FFE8D6] text-[9px] font-medium px-1 py-0.5 rounded">
                抖音旗舰
              </span>
              <span className="bg-rose-50 text-[#FE2C55] text-[9px] font-medium px-1 py-0.5 rounded flex items-center space-x-0.5">
                <span className="w-1 h-1 bg-[#FE2C55] rounded-full inline-block" />
                <span>直播</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <span className="text-xs font-normal text-slate-500">交易关闭</span>
          </div>

          <div className="flex items-start space-x-3">
            {/* Green / Dark poster card thumbnail matching screenshot */}
            <div className="w-[84px] h-[84px] rounded-xl bg-gradient-to-b from-[#1C2C24] to-[#0E1A14] p-2 flex flex-col justify-between text-white shrink-0 relative overflow-hidden border border-emerald-900/30">
              <span className="text-[8px] font-bold bg-[#FE2C55] text-white px-1 rounded-br absolute top-0 left-0">
                新客连包
              </span>
              <div className="mt-2 text-center">
                <div className="text-[8px] font-bold text-emerald-200 leading-tight">动信通黄金VIP会员</div>
                <div className="text-[7px] text-emerald-300">连包月卡</div>
                <div className="text-sm font-black text-rose-400 mt-0.5">¥12.00</div>
              </div>
              <div className="text-[6px] text-center text-slate-300 scale-75 truncate -mb-1">
                下单填写绑定手机号
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <h3 className="text-xs font-bold text-slate-900 line-clamp-1 flex-1 pr-1">
                  【新客连包专属】动信通黄金...
                </h3>
                <span className="text-xs font-bold text-slate-900 shrink-0">¥12.00</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">月卡</div>
              <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                <span>充值号码: {phone}</span>
                <span className="text-slate-400">x1</span>
              </div>
              <div className="text-[11px] text-[#FE2C55] font-normal text-right mt-1">
                退款成功
              </div>
            </div>
          </div>

          {/* Refund alert notice matching screenshot */}
          <div className="bg-[#F8F9FA] rounded-xl px-3 py-2 flex items-center justify-between text-xs text-slate-600 cursor-pointer">
            <div className="flex items-center space-x-1.5 truncate">
              <span className="font-bold text-slate-800 shrink-0">退款成功</span>
              <span className="text-xs text-slate-500 truncate">已减免抖音月付2026年9月还款账单¥12</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
          </div>

          {/* Actions */}
          <div className="pt-1 flex items-center justify-between">
            <div className="text-xs">
              <span className="text-slate-500">实付款 </span>
              <span className="font-bold text-slate-900 text-sm">¥12.00</span>
            </div>

            <div className="flex items-center space-x-1.5">
              <button className="text-xs font-normal text-slate-800 bg-[#F4F5F7] hover:bg-slate-200 px-3 py-1.5 rounded-full transition-all">
                删除订单
              </button>
              <button className="text-xs font-normal text-slate-800 bg-[#F4F5F7] hover:bg-slate-200 px-3 py-1.5 rounded-full transition-all">
                退款成功
              </button>
              <button 
                onClick={onRebuy}
                className="text-xs font-bold text-[#FE2C55] bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-full transition-all"
              >
                再买一单
              </button>
            </div>
          </div>
        </div>

        {/* Third mock order to match screenshot bottom section: 抖省省App */}
        <div className="bg-white rounded-2xl p-4 shadow-xs space-y-3 opacity-90">
          <div className="text-[11px] text-slate-400 font-medium">抖省省App</div>
          <div className="flex items-center justify-between border-t border-slate-50 pt-2">
            <div className="flex items-center space-x-1 text-xs font-bold text-slate-900">
              <span>田老师红烧肉(什刹海店)等多店通用</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <span className="text-xs font-normal text-slate-500">交易完成</span>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-[84px] h-[84px] rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 text-[10px] font-bold shrink-0">
              田老师
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <h3 className="text-xs font-bold text-slate-900 line-clamp-1 flex-1 pr-1">
                  番茄鸡蛋狮子头双拼饭【达...
                </h3>
                <span className="text-xs font-bold text-slate-900 shrink-0">¥11.9</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">单人餐</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

