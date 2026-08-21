import React, { useState } from 'react';
import { SimUserStatus, PrototypeScreen, BenefitItem } from '../types';
import { DouyinRechargeHome } from './DouyinRechargeHome';
import { VipMemberCenter } from './VipMemberCenter';
import { OrderConfirmPage } from './OrderConfirmPage';
import { OrderSuccessModal } from './OrderSuccessModal';
import { OrderDetailPage } from './OrderDetailPage';
import { UnsubscribeModal } from './UnsubscribeModal';
import { ClaimBenefitModal } from './ClaimBenefitModal';
import { Wifi, Battery, Signal, Sparkles, RefreshCw, ShoppingBag, ShieldCheck } from 'lucide-react';

interface PhoneSimulatorProps {
  userStatus: SimUserStatus;
  setUserStatus: (status: SimUserStatus) => void;
}

export const PhoneSimulator: React.FC<PhoneSimulatorProps> = ({
  userStatus,
  setUserStatus
}) => {
  const [currentScreen, setCurrentScreen] = useState<PrototypeScreen>('vip_center');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showUnsubscribe, setShowUnsubscribe] = useState(false);
  const [activeBenefitModal, setActiveBenefitModal] = useState<BenefitItem | null>(null);
  const [selectedRechargeAmount, setSelectedRechargeAmount] = useState(50);

  // Step 1: Click "立即开通" in mini program -> Navigate to OrderConfirmPage
  const handleOpenCheckout = (amount: number = 50) => {
    setSelectedRechargeAmount(amount);
    setCurrentScreen('order_confirm');
  };

  // Step 2 & 3: In OrderConfirmPage, submit order -> prompt agreement -> click "同意并下单" -> show "签约成功" popup
  const handleSubmitOrder = () => {
    setShowSuccessModal(true);
  };

  // Step 3 to 4: In "签约成功" popup, click "知道了" -> Activate membership & Go to Order Detail/Recharge Success page
  const handleSuccessModalConfirm = () => {
    setShowSuccessModal(false);
    setUserStatus('active_member');
    setCurrentScreen('order_detail');
  };

  const handleConfirmUnsubscribe = () => {
    setUserStatus('cancelled_member');
    setShowUnsubscribe(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-6 bg-[#0f1017] min-h-screen">
      
      {/* Interactive State & Process Stepper Toolbar */}
      <div className="mb-4 bg-[#161823] border border-[#2D3142] p-3 rounded-2xl flex flex-col gap-2.5 max-w-lg w-full shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FE2C55]" />
            <span>全流程节点演练 (对照4张业务截图):</span>
          </span>
          <button
            onClick={() => {
              setUserStatus(userStatus === 'non_member' ? 'active_member' : 'non_member');
            }}
            className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 hover:bg-amber-400/30 transition-colors"
          >
            {userStatus === 'non_member' ? '会员状态: 未开通 (点击切换)' : '会员状态: 已开通 (点击切换)'}
          </button>
        </div>

        {/* 4 Steps Quick Navigation Tabs */}
        <div className="grid grid-cols-4 gap-1.5 text-[11px]">
          <button
            onClick={() => setCurrentScreen('vip_center')}
            className={`px-2 py-1.5 rounded-xl font-bold transition-all text-center ${
              currentScreen === 'vip_center' ? 'bg-[#FE2C55] text-white shadow-md shadow-[#FE2C55]/30' : 'bg-[#1F2231] text-slate-300 hover:bg-[#252836]'
            }`}
          >
            1.权益小程序
          </button>

          <button
            onClick={() => setCurrentScreen('order_confirm')}
            className={`px-2 py-1.5 rounded-xl font-bold transition-all text-center ${
              currentScreen === 'order_confirm' ? 'bg-[#FE2C55] text-white shadow-md shadow-[#FE2C55]/30' : 'bg-[#1F2231] text-slate-300 hover:bg-[#252836]'
            }`}
          >
            2.提单页
          </button>

          <button
            onClick={() => {
              setCurrentScreen('order_confirm');
              setShowSuccessModal(true);
            }}
            className={`px-2 py-1.5 rounded-xl font-bold transition-all text-center ${
              showSuccessModal ? 'bg-[#FE2C55] text-white shadow-md shadow-[#FE2C55]/30' : 'bg-[#1F2231] text-slate-300 hover:bg-[#252836]'
            }`}
          >
            3.签约开通
          </button>

          <button
            onClick={() => setCurrentScreen('order_detail')}
            className={`px-2 py-1.5 rounded-xl font-bold transition-all text-center ${
              currentScreen === 'order_detail' ? 'bg-[#FE2C55] text-white shadow-md shadow-[#FE2C55]/30' : 'bg-[#1F2231] text-slate-300 hover:bg-[#252836]'
            }`}
          >
            4.订单查询
          </button>
        </div>
      </div>

      {/* Phone Container Hardware Frame */}
      <div className="w-full max-w-[390px] h-[780px] max-h-[85vh] sm:max-h-none sm:h-[780px] bg-[#161823] rounded-[36px] sm:rounded-[48px] border-[6px] sm:border-[10px] border-[#252836] shadow-2xl relative overflow-hidden flex flex-col ring-1 ring-[#2D3142]">
        
        {/* Top Camera Notch */}
        <div className="w-32 h-5 bg-[#0f1017] absolute top-0 left-1/2 transform -translate-x-1/2 rounded-b-2xl z-30 flex items-center justify-center">
          <div className="w-3 h-3 bg-[#1A1C28] rounded-full mr-2" />
          <div className="w-2 h-2 bg-[#252836] rounded-full" />
        </div>

        {/* Status Bar */}
        <div className="bg-[#161823] pt-2 px-6 pb-1 text-[11px] font-semibold text-slate-300 flex items-center justify-between z-20 shrink-0 border-b border-[#2D3142]/40">
          <span>09:41</span>
          <div className="flex items-center space-x-1.5">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Dynamic Screen Viewer */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative bg-[#EEF2F9]">
          {/* Screen 1: Recharge Home */}
          {currentScreen === 'recharge_home' && (
            <DouyinRechargeHome
              userStatus={userStatus}
              onOpenCheckout={handleOpenCheckout}
              onGoToVipCenter={() => setCurrentScreen('vip_center')}
            />
          )}

          {/* Screen 2: Mini Program Center (动信通权益小程序) */}
          {currentScreen === 'vip_center' && (
            <VipMemberCenter
              userStatus={userStatus}
              onBackToRecharge={() => setCurrentScreen('recharge_home')}
              onOpenUnsubscribe={() => setShowUnsubscribe(true)}
              onClaimBenefit={(b) => setActiveBenefitModal(b)}
              onOpenCheckout={handleOpenCheckout}
            />
          )}

          {/* Screen 3: Order Confirm Page (提单页 + 自动续订协议弹窗) */}
          {currentScreen === 'order_confirm' && (
            <OrderConfirmPage
              onBack={() => setCurrentScreen('vip_center')}
              onSubmitOrder={handleSubmitOrder}
              phone="1505****2806"
              price={1.99}
            />
          )}

          {/* Screen 4: Order Detail / Recharge Success Page (订单查询) */}
          {currentScreen === 'order_detail' && (
            <OrderDetailPage
              onBack={() => setCurrentScreen('vip_center')}
              onGoToVipCenter={() => setCurrentScreen('vip_center')}
              onRebuy={() => setCurrentScreen('order_confirm')}
              phone="150****2806"
              price={1.99}
            />
          )}

          {/* Popup: Auto-Renewal Agreement Signing Success (签约成功) */}
          {showSuccessModal && (
            <OrderSuccessModal
              onConfirm={handleSuccessModalConfirm}
              price={1.99}
              paymentAccount="中信银行信用卡(2108)"
            />
          )}

          {/* Unsubscribe Modal Overlay */}
          {showUnsubscribe && (
            <UnsubscribeModal
              onClose={() => setShowUnsubscribe(false)}
              onConfirmUnsubscribe={handleConfirmUnsubscribe}
            />
          )}

          {/* Claim Benefit Modal Overlay */}
          {activeBenefitModal && (
            <ClaimBenefitModal
              benefit={activeBenefitModal}
              onClose={() => setActiveBenefitModal(null)}
            />
          )}
        </div>

        {/* Bottom Phone Bar Home Indicator */}
        <div className="bg-slate-900 py-2.5 flex items-center justify-center shrink-0 z-20">
          <div className="w-32 h-1 bg-slate-600 rounded-full" />
        </div>

      </div>

      <div className="mt-3 text-center text-xs text-slate-500">
        模拟设备：375px × 780px 抖音 App iOS 端内 Webview 渲染环境
      </div>

    </div>
  );
};
