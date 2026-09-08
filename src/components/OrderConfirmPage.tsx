import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, X, HelpCircle, Flame } from 'lucide-react';
import { MembershipSku } from '../types';

interface OrderConfirmPageProps {
  onBack: () => void;
  onSubmitOrder: (enteredPhone: string) => void;
  phone?: string;
  price?: number;
  selectedSku?: MembershipSku;
  hideBottomBar?: boolean;
}

export const OrderConfirmPage: React.FC<OrderConfirmPageProps> = ({
  onBack,
  onSubmitOrder,
  phone = '',
  price,
  selectedSku,
  hideBottomBar = false,
}) => {
  const finalPrice = selectedSku ? selectedSku.price : (price ?? 1.99);
  const skuName = selectedSku ? selectedSku.name : '动信通充值会员';
  const skuTier = selectedSku ? selectedSku.tierNumber : '连包月卡';
  const skuShortName = selectedSku ? selectedSku.shortName : '月卡';
  const [inputPhone, setInputPhone] = useState(phone);
  const [phoneError, setPhoneError] = useState(false);
  const [phoneShield, setPhoneShield] = useState(true);
  const [payMethodType, setPayMethodType] = useState<'monthly' | 'douyin_pay'>('monthly');
  const [monthlyInstallment, setMonthlyInstallment] = useState<'no_split' | 'split_12' | 'split_3'>('no_split');
  const [selectedBankCard, setSelectedBankCard] = useState<'cmb' | 'bocom'>('cmb');
  
  // Modals state matching screenshots
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const [showAccountConfirmModal, setShowAccountConfirmModal] = useState(false);

  // Step 1: Click "立即支付" -> check phone -> popup Agreement Modal (截图 2)
  const handlePayButtonClick = () => {
    if (!inputPhone.trim() || inputPhone.trim().length < 11) {
      setPhoneError(true);
      return;
    }
    setPhoneError(false);
    setShowAgreementModal(true);
  };

  // Step 2: In Agreement Modal, click "同意并下单" -> popup Account Confirm Dialog (截图 3)
  const handleAgreeAndOrder = () => {
    setShowAgreementModal(false);
    setShowAccountConfirmModal(true);
  };

  // Step 3: In Account Confirm Dialog, click "确认" -> proceed to payment success (截图 4)
  const handleConfirmAccount = () => {
    setShowAccountConfirmModal(false);
    onSubmitOrder(inputPhone.trim() || '18518920637');
  };

  return (
    <div className="bg-[#F4F5F7] text-slate-900 min-h-full flex flex-col justify-between font-sans select-none relative animate-fadeIn">
      {/* Top Header Bar matching 截图1 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-20 shrink-0">
        <button 
          onClick={onBack}
          className="p-1 -ml-1 text-slate-800 hover:text-slate-600 active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Hot buying bubble label */}
        <div className="bg-slate-100/90 text-slate-700 text-xs px-3 py-1 rounded-full flex items-center space-x-1.5 shadow-xs">
          <span className="w-3.5 h-3.5 rounded-full bg-slate-300 flex items-center justify-center text-[9px] text-white">●</span>
          <span className="font-medium text-[11px]">10+人同时在买</span>
        </div>

        <div className="w-6" />
      </div>

      {/* Scrollable Content matching 截图1 */}
      <div className="flex-1 p-3 space-y-3 pb-24 overflow-y-auto custom-scrollbar">
        {/* Section 1: Mobile & Billing Cycle */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-800 shrink-0 mr-2">手机号</span>
            <div className="flex items-center space-x-1.5 flex-1 justify-end">
              <input
                type="tel"
                maxLength={11}
                value={inputPhone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 11);
                  setInputPhone(val);
                  if (val.length === 11) setPhoneError(false);
                }}
                placeholder="请输入充值手机号"
                className={`text-right text-sm font-extrabold text-slate-900 tracking-wider placeholder:text-slate-400 placeholder:font-normal outline-none bg-transparent flex-1 ${
                  phoneError ? 'text-rose-600 placeholder:text-rose-400' : ''
                }`}
              />
              {inputPhone && (
                <button
                  type="button"
                  onClick={() => setInputPhone('')}
                  className="w-4 h-4 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-500 flex items-center justify-center text-[9px] shrink-0"
                  title="清空"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          {phoneError && (
            <div className="text-[11px] text-rose-500 font-medium text-right -mt-1">
              * 请输入正确的11位手机号码
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <span className="text-sm font-bold text-slate-800">续费周期</span>
            <span className="text-sm font-bold text-slate-900">每月</span>
          </div>

          {/* Pricing Policy Box */}
          <div className="bg-[#F8F9FA] rounded-xl p-3 text-xs leading-relaxed text-slate-600 font-normal">
            <span className="text-[#FE2C55] font-bold">前1个月每月{finalPrice.toFixed(2)}元</span>
            <span>，后期每月{finalPrice.toFixed(2)}元，自动续订，可随时取消</span>
          </div>
        </div>

        {/* Section 2: Shop & Product details */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3.5">
          {/* Shop Name with TikTok Flagship Badge */}
          <div className="flex items-center space-x-1.5">
            <span className="bg-[#161823] text-[#FFE8D6] text-[9px] font-black px-1.5 py-0.5 rounded flex items-center">
              抖音旗舰
            </span>
            <span className="text-xs font-extrabold text-slate-900">动信通官方旗舰店</span>
          </div>

          <div className="flex items-start space-x-3">
            {/* Product Cover matching 动信通充值会员 */}
            <div className="w-20 h-24 rounded-xl bg-gradient-to-b from-[#FEE8D6] to-[#FDCEB9] p-2 flex flex-col justify-between text-slate-800 shrink-0 shadow-sm border border-amber-200/60 relative overflow-hidden">
              <span className="text-[8px] font-black bg-[#FE2C55] text-white px-1.5 py-0.5 rounded-br-lg rounded-tl-sm absolute top-0 left-0">
                {selectedSku?.badge || '热卖爆款'}
              </span>
              <div className="mt-4 text-center">
                <div className="text-[9px] font-bold text-amber-900 leading-tight truncate">{skuShortName}</div>
                <div className="text-[8px] text-amber-800">{skuTier}</div>
                <div className="text-sm font-black text-[#FE2C55] mt-0.5">¥{finalPrice.toFixed(2)}</div>
                <div className="text-[7px] text-slate-500 scale-90 truncate">总值¥{selectedSku?.nominalValue || 93}</div>
              </div>
              <div className="text-[6px] text-center text-slate-400 scale-75 truncate">
                {selectedSku?.benefits[0]?.title || '全品类立减券'}
              </div>
            </div>

            {/* Product Right Column */}
            <div className="flex-1 min-w-0 flex flex-col justify-between h-24 py-0.5">
              <div>
                <div className="flex items-start justify-between">
                  <h3 className="text-xs font-bold text-slate-900 leading-snug flex items-center space-x-1 flex-1 pr-1 truncate">
                    <span>【连包专属】{skuName}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 rotate-90 shrink-0" />
                  </h3>
                  <span className="text-sm font-black text-slate-900 shrink-0">¥{finalPrice.toFixed(2)}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">{skuTier} · {skuShortName}</div>
              </div>

              <div className="flex justify-end">
                <div className="flex items-center border border-slate-200 rounded-lg text-xs bg-white">
                  <button className="px-2 py-0.5 text-slate-400 hover:text-slate-600 disabled:opacity-40" disabled>-</button>
                  <span className="px-2.5 py-0.5 font-bold text-slate-800 border-x border-slate-200">1</span>
                  <button className="px-2 py-0.5 text-slate-400 hover:text-slate-600 disabled:opacity-40" disabled>+</button>
                </div>
              </div>
            </div>
          </div>

          {/* Remarks */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs cursor-pointer">
            <span className="text-slate-800 font-bold">备注</span>
            <span className="text-slate-400 flex items-center space-x-1">
              <span>无备注</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Section 3: Privacy Number Protection */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-xs">
            <span className="font-bold text-slate-800">号码保护</span>
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400 text-[11px]">隐藏收件人真实手机号，保护隐私</span>
          </div>
          <button 
            onClick={() => setPhoneShield(!phoneShield)}
            className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
              phoneShield ? 'bg-[#FE2C55] text-white' : 'border border-slate-300'
            }`}
          >
            {phoneShield && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </button>
        </div>

        {/* Section 4: Payment Methods (抖音月付 + 抖音支付) */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
          {/* Method 1: 抖音月付 */}
          <div className="space-y-3">
            <div 
              onClick={() => setPayMethodType('monthly')}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 rounded-full bg-[#00E5BC] text-white flex items-center justify-center text-[10px] font-black">
                  月
                </div>
                <span className="text-xs font-extrabold text-slate-900">抖音月付</span>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                payMethodType === 'monthly' ? 'bg-[#FE2C55] text-white' : 'border border-slate-300'
              }`}>
                {payMethodType === 'monthly' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>

            {/* Installments options */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {/* Option A: 不分期 0费用 */}
              <div 
                onClick={() => {
                  setPayMethodType('monthly');
                  setMonthlyInstallment('no_split');
                }}
                className={`rounded-xl p-2 text-center cursor-pointer transition-all ${
                  payMethodType === 'monthly' && monthlyInstallment === 'no_split'
                    ? 'bg-rose-50/60 border-2 border-rose-300 text-[#FE2C55]'
                    : 'bg-[#F8F9FA] border border-slate-100 text-slate-700'
                }`}
              >
                <div className="text-xs font-extrabold">不分期</div>
                <div className="text-[10px] text-rose-500 font-bold mt-0.5">0费用</div>
              </div>

              {/* Option B: 12期 */}
              <div 
                onClick={() => {
                  setPayMethodType('monthly');
                  setMonthlyInstallment('split_12');
                }}
                className={`rounded-xl p-2 text-center cursor-pointer transition-all relative ${
                  payMethodType === 'monthly' && monthlyInstallment === 'split_12'
                    ? 'bg-rose-50/60 border-2 border-rose-300 text-[#FE2C55]'
                    : 'bg-[#F8F9FA] border border-slate-100 text-slate-700'
                }`}
              >
                <span className="absolute -top-2 right-1 bg-rose-100 text-[#FE2C55] text-[8px] font-black px-1 rounded">
                  立减5元
                </span>
                <div className="text-[11px] font-bold leading-tight">¥1.01 × 12期</div>
                <div className="text-[8px] text-slate-400 scale-90 truncate mt-0.5">含利息¥0.09/期</div>
              </div>

              {/* Option C: 3期 */}
              <div 
                onClick={() => {
                  setPayMethodType('monthly');
                  setMonthlyInstallment('split_3');
                }}
                className={`rounded-xl p-2 text-center cursor-pointer transition-all ${
                  payMethodType === 'monthly' && monthlyInstallment === 'split_3'
                    ? 'bg-rose-50/60 border-2 border-rose-300 text-[#FE2C55]'
                    : 'bg-[#F8F9FA] border border-slate-100 text-slate-700'
                }`}
              >
                <div className="text-[11px] font-bold leading-tight">¥5.46 × 3期</div>
                <div className="text-[8px] text-slate-400 scale-90 truncate mt-0.5">含利息¥0.09/期</div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100 pt-3 space-y-3">
            {/* Method 2: 抖音支付 */}
            <div 
              onClick={() => setPayMethodType('douyin_pay')}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-black">
                  抖
                </div>
                <span className="text-xs font-extrabold text-slate-900">抖音支付</span>
                <span className="text-[9px] bg-rose-50 text-[#FE2C55] border border-rose-200 px-1 py-0.2 rounded font-bold">
                  笔笔返6支付积分
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-normal">过亿人都在用</span>
            </div>

            {/* Bank Card Choices */}
            <div className="space-y-2.5 pl-7">
              {/* Card 1: 招行储蓄卡 */}
              <div 
                onClick={() => {
                  setPayMethodType('douyin_pay');
                  setSelectedBankCard('cmb');
                }}
                className="flex items-center justify-between cursor-pointer"
              >
                <span className="text-xs text-slate-800 font-medium">招商银行储蓄卡 (0278)</span>
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  payMethodType === 'douyin_pay' && selectedBankCard === 'cmb'
                    ? 'bg-[#FE2C55] text-white'
                    : 'border border-slate-300'
                }`}>
                  {payMethodType === 'douyin_pay' && selectedBankCard === 'cmb' && (
                    <Check className="w-3 h-3 stroke-[3]" />
                  )}
                </div>
              </div>

              {/* Card 2: 交行信用卡 */}
              <div 
                onClick={() => {
                  setPayMethodType('douyin_pay');
                  setSelectedBankCard('bocom');
                }}
                className="flex items-center justify-between cursor-pointer"
              >
                <span className="text-xs text-slate-800 font-medium">交通银行信用卡 (6482)</span>
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  payMethodType === 'douyin_pay' && selectedBankCard === 'bocom'
                    ? 'bg-[#FE2C55] text-white'
                    : 'border border-slate-300'
                }`}>
                  {payMethodType === 'douyin_pay' && selectedBankCard === 'bocom' && (
                    <Check className="w-3 h-3 stroke-[3]" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar matching 截图1 */}
      {!hideBottomBar && (
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-4 py-3 z-30 shadow-lg flex items-center justify-center">
          <button
            onClick={handlePayButtonClick}
            className="w-full bg-[#FE2C55] hover:bg-[#E01A4F] active:scale-[0.98] text-white font-extrabold text-base py-3 rounded-full shadow-lg shadow-rose-500/25 transition-transform flex items-center justify-center"
          >
            立即支付 ¥{finalPrice.toFixed(2)}
          </button>
        </div>
      )}

      {/* Modal 1: 商品相关协议 (Matching 截图 2) */}
      {showAgreementModal && (
        <div className="absolute inset-0 bg-black/60 z-50 flex items-end justify-center animate-fadeIn">
          <div className="bg-white w-full rounded-t-3xl p-5 shadow-2xl space-y-4 animate-slideUp relative">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-slate-900">商品相关协议</h3>
              <button 
                onClick={() => setShowAgreementModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-600 leading-relaxed py-2">
              <span>请仔细阅读 </span>
              <span className="text-[#1A66FF] font-medium cursor-pointer">抖音电商自动续费扣款协议</span>
              <span>、</span>
              <span className="text-[#1A66FF] font-medium cursor-pointer">扣款授权服务协议</span>
              <span>，同意购买请点击同意并下单</span>
            </div>

            <button
              onClick={handleAgreeAndOrder}
              className="w-full bg-[#FE2C55] hover:bg-[#E01A4F] active:scale-[0.98] text-white font-extrabold text-base py-3 rounded-full shadow-lg shadow-rose-500/30 transition-transform"
            >
              同意并下单
            </button>
          </div>
        </div>
      )}

      {/* Modal 2: 账号确认弹窗 (Matching 截图 3) */}
      {showAccountConfirmModal && (
        <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-5 animate-fadeIn">
          <div className="bg-white w-full max-w-[290px] rounded-2xl shadow-2xl overflow-hidden animate-scaleUp text-center">
            <div className="p-5 space-y-2">
              <h3 className="font-bold text-base text-slate-900">账号确认</h3>
              <p className="text-xs text-slate-600 leading-relaxed text-left">
                请确认是否为手机号({inputPhone || phone})进行充值？该商品不支持7天无理由退货，请谨慎购买。
              </p>
            </div>

            <div className="border-t border-slate-100 grid grid-cols-2 text-sm">
              <button
                onClick={() => setShowAccountConfirmModal(false)}
                className="py-3 text-slate-600 font-medium hover:bg-slate-50 active:bg-slate-100 border-r border-slate-100 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleConfirmAccount}
                className="py-3 text-slate-900 font-bold hover:bg-slate-50 active:bg-slate-100 transition-colors"
              >
                确认
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
