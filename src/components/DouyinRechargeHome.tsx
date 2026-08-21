import React, { useState } from 'react';
import { SimUserStatus } from '../types';
import { 
  ChevronLeft, 
  MoreHorizontal, 
  Phone, 
  Zap, 
  Sparkles, 
  Ticket, 
  ChevronRight, 
  CheckCircle2, 
  Contact, 
  Flame, 
  Car, 
  Wifi, 
  Gift, 
  Coffee, 
  Music,
  ShoppingBag
} from 'lucide-react';

interface DouyinRechargeHomeProps {
  userStatus: SimUserStatus;
  onOpenCheckout: (amount: number) => void;
  onGoToVipCenter: () => void;
}

export const DouyinRechargeHome: React.FC<DouyinRechargeHomeProps> = ({
  userStatus,
  onOpenCheckout,
  onGoToVipCenter,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('173 1604 6528');
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [activeTab, setActiveTab] = useState<'phone' | 'data' | 'gas' | 'utility'>('phone');
  const isMember = userStatus === 'active_member' || userStatus === 'pending_renewal';

  const handleRechargeClick = (amt: number) => {
    setSelectedAmount(amt);
    if (!isMember) {
      onOpenCheckout(amt);
    } else {
      alert(`已使用【充值会员】2元话费直减券！应付 ¥${amt - 2}.00，话费实时到账中...`);
    }
  };

  return (
    <div className="bg-[#EEF2F9] text-slate-900 min-h-full pb-6 flex flex-col justify-between font-sans select-none">
      
      {/* 1. Header Bar matching screenshot */}
      <div className="bg-[#EEF2F9] px-4 pt-3 pb-2 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center space-x-2">
          <ChevronLeft className="w-5 h-5 text-slate-800 cursor-pointer" />
          <span className="font-extrabold text-lg tracking-tight text-slate-900">充值中心</span>
          <span className="bg-[#DDE5F4] text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
            啥啥都能充
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={onGoToVipCenter}
            className="bg-amber-400/20 text-amber-800 border border-amber-400/40 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1"
          >
            <Sparkles className="w-3 h-3 text-amber-600 fill-amber-500" />
            <span>会员专区</span>
          </button>
          <MoreHorizontal className="w-5 h-5 text-slate-700 cursor-pointer" />
        </div>
      </div>

      {/* 2. Top Service Nav Tabs matching screenshot (4 pills) */}
      <div className="px-3 py-1 grid grid-cols-4 gap-2">
        {/* Tab 1: 话费 */}
        <div 
          onClick={() => setActiveTab('phone')}
          className={`rounded-2xl p-2.5 flex flex-col items-center justify-center cursor-pointer transition-all shadow-sm ${
            activeTab === 'phone' 
              ? 'bg-gradient-to-b from-[#3B82F6] to-[#2563EB] text-white' 
              : 'bg-white text-slate-800 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center space-x-1">
            <Phone className="w-4 h-4 fill-current" />
            <span className="font-black text-sm">话费</span>
          </div>
          <span className={`text-[9px] mt-0.5 ${activeTab === 'phone' ? 'text-blue-100' : 'text-slate-400'}`}>
            官方直充
          </span>
        </div>

        {/* Tab 2: 流量 */}
        <div 
          onClick={() => setActiveTab('data')}
          className={`rounded-2xl p-2.5 flex flex-col items-center justify-center cursor-pointer transition-all shadow-sm ${
            activeTab === 'data' 
              ? 'bg-gradient-to-b from-[#3B82F6] to-[#2563EB] text-white' 
              : 'bg-white text-slate-800 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center space-x-1">
            <Wifi className="w-4 h-4" />
            <span className="font-black text-sm">流量</span>
          </div>
          <span className={`text-[9px] mt-0.5 ${activeTab === 'data' ? 'text-blue-100' : 'text-slate-400'}`}>
            秒到账
          </span>
        </div>

        {/* Tab 3: 加油 */}
        <div 
          onClick={() => setActiveTab('gas')}
          className={`rounded-2xl p-2.5 flex flex-col items-center justify-center cursor-pointer transition-all shadow-sm ${
            activeTab === 'gas' 
              ? 'bg-gradient-to-b from-[#3B82F6] to-[#2563EB] text-white' 
              : 'bg-white text-slate-800 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center space-x-1">
            <Car className="w-4 h-4" />
            <span className="font-black text-sm">加油</span>
          </div>
          <span className={`text-[9px] mt-0.5 ${activeTab === 'gas' ? 'text-blue-100' : 'text-slate-400'}`}>
            8折起
          </span>
        </div>

        {/* Tab 4: 水电煤 */}
        <div 
          onClick={() => setActiveTab('utility')}
          className={`rounded-2xl p-2.5 flex flex-col items-center justify-center cursor-pointer transition-all shadow-sm ${
            activeTab === 'utility' 
              ? 'bg-gradient-to-b from-[#3B82F6] to-[#2563EB] text-white' 
              : 'bg-white text-slate-800 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center space-x-1">
            <Flame className="w-4 h-4" />
            <span className="font-black text-sm">水电煤</span>
          </div>
          <span className={`text-[9px] mt-0.5 ${activeTab === 'utility' ? 'text-blue-100' : 'text-slate-400'}`}>
            官方直缴
          </span>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-3 space-y-3 flex-1">

        {/* 3. Phone Number Input Box (White Rounded Card) */}
        <div className="bg-white rounded-3xl p-4 shadow-md">
          
          <div className="flex items-center justify-between">
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="text-2xl font-black tracking-wider text-slate-900 bg-transparent focus:outline-none w-full"
            />
            <Contact className="w-6 h-6 text-slate-400 cursor-pointer hover:text-slate-600 shrink-0 ml-2" />
          </div>

          <div className="text-xs text-slate-400 mt-1 flex items-center justify-between">
            <span>上次充值 (北京电信)</span>
            <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              官方正规速到
            </span>
          </div>

          {/* 4. Active Member Discount Notice (if member) or subtle tip */}
          {isMember ? (
            <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-2.5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Ticket className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-800">
                  【充值会员】权益生效中：本次充值自动抵扣 2 元
                </span>
              </div>
              <button 
                onClick={onGoToVipCenter}
                className="text-xs text-amber-700 font-bold hover:underline flex items-center shrink-0 ml-1"
              >
                会员专区 <ChevronRight className="w-3 h-3 ml-0.5" />
              </button>
            </div>
          ) : (
            <div 
              onClick={onGoToVipCenter}
              className="mt-3 bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-200/80 rounded-2xl p-2.5 flex items-center justify-between cursor-pointer hover:border-amber-300 transition-colors shadow-sm"
            >
              <div className="flex items-center space-x-2 min-w-0 flex-1">
                <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-1.5 py-0.5 rounded shrink-0">
                  会员特惠
                </span>
                <span className="text-xs font-bold text-slate-800 truncate">
                  1.99元/月开通【充值会员】领2元话费券+2元电商券
                </span>
              </div>
              <div className="flex items-center text-xs font-bold text-[#FE2C55] shrink-0 ml-1">
                <span>去开通</span>
                <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </div>
            </div>
          )}

          {/* 5. Denomination Grid matching screenshot (3 cols x 2 rows) */}
          <div className="mt-4 grid grid-cols-3 gap-2.5">
            {/* 50元 */}
            <div 
              onClick={() => handleRechargeClick(50)}
              className={`p-3 rounded-2xl border text-center cursor-pointer transition-all relative ${
                selectedAmount === 50
                  ? 'bg-blue-50/80 border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-sm'
                  : 'bg-[#F8FAFC] border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="text-xl font-black text-slate-900">50元</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {isMember ? '折后 ¥48.00' : '售价 ¥50.00'}
              </div>
              {!isMember && (
                <div className="mt-1 text-[9px] font-black text-[#FE2C55] bg-rose-50 rounded-full py-0.5 border border-rose-100">
                  开会员立抵2元
                </div>
              )}
            </div>

            {/* 100元 */}
            <div 
              onClick={() => handleRechargeClick(100)}
              className={`p-3 rounded-2xl border text-center cursor-pointer transition-all relative ${
                selectedAmount === 100
                  ? 'bg-blue-50/80 border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-sm'
                  : 'bg-[#F8FAFC] border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="text-xl font-black text-slate-900">100元</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {isMember ? '折后 ¥98.00' : '售价 ¥100.00'}
              </div>
              {!isMember && (
                <div className="mt-1 text-[9px] font-black text-[#FE2C55] bg-rose-50 rounded-full py-0.5 border border-rose-100">
                  开会员立抵2元
                </div>
              )}
            </div>

            {/* 200元 */}
            <div 
              onClick={() => handleRechargeClick(200)}
              className={`p-3 rounded-2xl border text-center cursor-pointer transition-all relative ${
                selectedAmount === 200
                  ? 'bg-blue-50/80 border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-sm'
                  : 'bg-[#F8FAFC] border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="text-xl font-black text-slate-900">200元</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {isMember ? '折后 ¥198.00' : '售价 ¥200.00'}
              </div>
              {!isMember && (
                <div className="mt-1 text-[9px] font-black text-[#FE2C55] bg-rose-50 rounded-full py-0.5 border border-rose-100">
                  开会员立抵2元
                </div>
              )}
            </div>

            {/* 300元 */}
            <div 
              onClick={() => handleRechargeClick(300)}
              className={`p-3 rounded-2xl border text-center cursor-pointer transition-all relative ${
                selectedAmount === 300
                  ? 'bg-blue-50/80 border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-sm'
                  : 'bg-[#F8FAFC] border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="text-xl font-black text-slate-900">300元</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {isMember ? '折后 ¥298.00' : '售价 ¥300.00'}
              </div>
            </div>

            {/* 500元 (维护中) */}
            <div className="p-3 rounded-2xl border border-slate-200 bg-slate-100 text-center opacity-60 cursor-not-allowed">
              <div className="text-xl font-black text-slate-400">500元</div>
              <div className="text-[11px] text-slate-400 mt-0.5">维护中</div>
            </div>

            {/* 更多优惠活动 */}
            <div 
              onClick={onGoToVipCenter}
              className="p-3 rounded-2xl border border-rose-200 bg-rose-50/50 text-center cursor-pointer hover:bg-rose-50 transition-colors flex flex-col justify-center items-center"
            >
              <div className="text-xs font-black text-slate-800">更多优惠活动</div>
              <div className="text-[11px] font-extrabold text-[#FE2C55] mt-0.5 flex items-center">
                <span>去看看</span>
                <ChevronRight className="w-3 h-3 ml-0.5" />
              </div>
            </div>
          </div>

        </div>

        {/* 6. Promotional Grid Cards matching screenshot */}
        <div className="grid grid-cols-2 gap-3">
          {/* Card 1: 抽门票 */}
          <div className="bg-white rounded-3xl p-3 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-slate-900">抽门票</span>
                <span className="bg-slate-100 text-slate-600 text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                  《歌手》入场券
                </span>
              </div>

              <div className="mt-2.5 grid grid-cols-2 gap-1.5">
                <div className="bg-slate-900 text-white rounded-xl p-1.5 text-center flex flex-col justify-end min-h-[50px] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-rose-500/20 opacity-80" />
                  <Music className="w-4 h-4 text-amber-400 mx-auto mb-1 relative z-10" />
                  <span className="text-[9px] font-bold relative z-10">歌手2026</span>
                </div>
                <div className="bg-slate-900 text-white rounded-xl p-1.5 text-center flex flex-col justify-end min-h-[50px] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-purple-500/20 opacity-80" />
                  <Sparkles className="w-4 h-4 text-purple-400 mx-auto mb-1 relative z-10" />
                  <span className="text-[9px] font-bold relative z-10">昭阳公主</span>
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 border-t pt-1.5">
              <span>领综艺周边</span>
              <span>07.23上映</span>
            </div>
          </div>

          {/* Card 2: 开宝箱 */}
          <div className="bg-white rounded-3xl p-3 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-slate-900">开宝箱</span>
                <span className="bg-slate-100 text-slate-600 text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                  抽夏日礼包
                </span>
              </div>

              <div className="mt-2.5 grid grid-cols-2 gap-1.5">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl p-1.5 text-center flex flex-col justify-center items-center min-h-[50px]">
                  <Gift className="w-4 h-4 text-cyan-300" />
                  <span className="text-[9px] font-bold mt-1">DNF·起源</span>
                </div>
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-xl p-1.5 text-center flex flex-col justify-center items-center min-h-[50px]">
                  <ShoppingBag className="w-4 h-4 text-amber-200" />
                  <span className="text-[9px] font-bold mt-1">热门推荐</span>
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 border-t pt-1.5">
              <span>领支付立减券</span>
              <span>热门推荐</span>
            </div>
          </div>
        </div>

        {/* 7. Luckin Banner matching screenshot */}
        <div className="bg-white rounded-3xl p-3 shadow-md flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black shrink-0 shadow-sm">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-sm text-slate-900">瑞幸大菠萝生椰冷萃</div>
              <div className="text-[11px] font-bold text-[#FE2C55] mt-0.5 flex items-center">
                <span>清爽上新 去购买</span>
                <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </div>
            </div>
          </div>

          <div className="bg-amber-100 text-amber-800 text-[10px] font-black px-2.5 py-1 rounded-full border border-amber-200">
            爆款饮品特惠
          </div>
        </div>

        {/* 8. 看了又看 matching screenshot */}
        <div>
          <div className="font-black text-sm text-slate-900 mb-2 pl-1">看了又看</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-3xl p-3 shadow-md border border-slate-100">
              <div className="bg-amber-500 text-slate-950 font-black text-xs px-2 py-0.5 rounded-md inline-block">
                M
              </div>
              <div className="font-bold text-xs text-slate-900 mt-2">麦当劳 暑期买薯送薯</div>
              <div className="text-[10px] text-slate-400 mt-0.5">买薯送等额代金券</div>
            </div>

            <div className="bg-white rounded-3xl p-3 shadow-md border border-slate-100">
              <div className="bg-blue-600 text-white font-black text-xs px-2 py-0.5 rounded-md inline-block">
                巨箴宝
              </div>
              <div className="font-bold text-xs text-slate-900 mt-2">6A超级闪充线</div>
              <div className="text-[10px] text-slate-400 mt-0.5">40/66/100/120W通用</div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer text */}
      <div className="px-4 text-center text-[10px] text-slate-400 mt-2">
        动信通通信增值服务联合提供 • 抖音支付安全保障
      </div>

    </div>
  );
};
