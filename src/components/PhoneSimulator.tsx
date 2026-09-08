import React, { useState } from 'react';
import { SimUserStatus, PrototypeScreen, BenefitItem, MembershipSku, MembershipSkuId } from '../types';
import { MEMBERSHIP_SKUS, getSkuById } from '../data/membershipSkus';
import { DouyinRechargeHome } from './DouyinRechargeHome';
import { VipMemberCenter } from './VipMemberCenter';
import { OrderConfirmPage } from './OrderConfirmPage';
import { OrderSuccessModal } from './OrderSuccessModal';
import { OrderDetailPage } from './OrderDetailPage';
import { OrderListPage } from './OrderListPage';
import { RenewalManagementPage } from './RenewalManagementPage';
import { UnsubscribeModal } from './UnsubscribeModal';
import { ClaimBenefitModal } from './ClaimBenefitModal';
import { Wifi, Battery, Signal, Crown } from 'lucide-react';

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
  const [userPhone, setUserPhone] = useState('');

  // Track the currently selected SKU and user's subscribed SKUs (supports purchasing multiple products)
  const [selectedSku, setSelectedSku] = useState<MembershipSku>(MEMBERSHIP_SKUS[0]); // Default Tier 0 (1.99元连续包月)
  const [subscribedSkuIds, setSubscribedSkuIds] = useState<MembershipSkuId[]>(['tier_3']); // 默认已购1款：黑金尊享月卡

  // Step 1: Click "立即开通" in mini program SKU card -> Navigate to OrderConfirmPage (提单页)
  const handleOpenCheckout = (skuOrAmount?: MembershipSku | number) => {
    if (skuOrAmount && typeof skuOrAmount === 'object' && 'price' in skuOrAmount) {
      setSelectedSku(skuOrAmount);
    }
    setCurrentScreen('order_confirm');
  };

  // Step 2 & 3: In OrderConfirmPage, submit order -> prompt agreement -> confirm account -> show "动信通自动续费开通成功" popup
  const handleSubmitOrder = (enteredPhone: string) => {
    setUserPhone(enteredPhone);
    setShowSuccessModal(true);
  };

  // Step 3 to 4: In "动信通自动续费开通成功" popup, click "我知道了" -> Activate membership & 追加到已购权益商品列表中
  const handleSuccessModalConfirm = () => {
    setShowSuccessModal(false);
    setUserStatus('active_member');
    setSubscribedSkuIds(prev => Array.from(new Set([...prev, selectedSku.id])));
    setCurrentScreen('order_detail');
  };

  const handleConfirmUnsubscribe = () => {
    setUserStatus('cancelled_member');
    setSubscribedSkuIds([]);
    setShowUnsubscribe(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-6 bg-[#0f1017] min-h-screen">
      
      {/* Interactive State & Process Stepper Toolbar */}
      <div className="mb-4 bg-[#161823] border border-[#2D3142] p-3 rounded-2xl flex flex-col gap-2.5 max-w-[420px] w-full shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FE2C55]" />
            <span>连包会员交易全流程演练:</span>
          </span>
          <button
            onClick={() => {
              if (userStatus === 'non_member' || subscribedSkuIds.length === 0) {
                setUserStatus('active_member');
                setSubscribedSkuIds(['tier_3']);
              } else {
                setUserStatus('non_member');
                setSubscribedSkuIds([]);
              }
            }}
            className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 hover:bg-amber-400/30 transition-colors"
          >
            {userStatus === 'non_member' || subscribedSkuIds.length === 0 
              ? '用户身份: 未订购' 
              : `已订购: ${subscribedSkuIds.length}款权益商品`}
          </button>
        </div>

        {/* Quick Multi-Tier Subscription Simulator Toolbar */}
        <div className="bg-[#0f1017] p-2 rounded-xl border border-[#252836] flex items-center justify-between gap-1 text-[10px]">
          <span className="text-slate-400 font-medium shrink-0 flex items-center space-x-1">
            <Crown className="w-3 h-3 text-amber-400" />
            <span>多权益购买演练:</span>
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setUserStatus('non_member');
                setSubscribedSkuIds([]);
              }}
              className={`px-1.5 py-0.8 rounded font-bold transition-all ${
                userStatus === 'non_member' || subscribedSkuIds.length === 0 ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              未开通
            </button>
            <button
              onClick={() => {
                setUserStatus('active_member');
                setSubscribedSkuIds(['tier_3']); // 1款：黑金尊享月卡
              }}
              className={`px-1.5 py-0.8 rounded font-bold transition-all ${
                userStatus === 'active_member' && subscribedSkuIds.length === 1 && subscribedSkuIds[0] === 'tier_3'
                  ? 'bg-purple-600 text-white font-black shadow-xs' 
                  : 'text-purple-300/70 hover:text-purple-200'
              }`}
            >
              已购1款
            </button>
            <button
              onClick={() => {
                setUserStatus('active_member');
                setSubscribedSkuIds(['tier_3', 'tier_2']); // 2款：黑金 + 影音畅享
              }}
              className={`px-1.5 py-0.8 rounded font-bold transition-all ${
                userStatus === 'active_member' && subscribedSkuIds.length === 2
                  ? 'bg-emerald-600 text-white font-black shadow-xs' 
                  : 'text-emerald-300/70 hover:text-emerald-200'
              }`}
            >
              已购2款
            </button>
            <button
              onClick={() => {
                setUserStatus('active_member');
                setSubscribedSkuIds(['tier_3', 'tier_2', 'tier_0']); // 3款：黑金 + 影音 + 充值会员
              }}
              className={`px-1.5 py-0.8 rounded font-bold transition-all ${
                userStatus === 'active_member' && subscribedSkuIds.length >= 3
                  ? 'bg-[#FE2C55] text-white font-black shadow-xs' 
                  : 'text-rose-300/70 hover:text-rose-200'
              }`}
            >
              已购3款
            </button>
          </div>
        </div>

        {/* 6 Steps Quick Navigation Tabs */}
        <div className="grid grid-cols-6 gap-1 text-[9.5px]">
          <button
            onClick={() => {
              setShowSuccessModal(false);
              setCurrentScreen('vip_center');
            }}
            className={`px-1 py-1.5 rounded-xl font-bold transition-all text-center truncate ${
              currentScreen === 'vip_center' ? 'bg-[#FE2C55] text-white shadow-md shadow-[#FE2C55]/30' : 'bg-[#1F2231] text-slate-300 hover:bg-[#252836]'
            }`}
          >
            1.小程序
          </button>

          <button
            onClick={() => {
              setCurrentScreen('order_confirm');
              setShowSuccessModal(false);
            }}
            className={`px-1 py-1.5 rounded-xl font-bold transition-all text-center truncate ${
              currentScreen === 'order_confirm' && !showSuccessModal ? 'bg-[#FE2C55] text-white shadow-md shadow-[#FE2C55]/30' : 'bg-[#1F2231] text-slate-300 hover:bg-[#252836]'
            }`}
          >
            2.提单页
          </button>

          <button
            onClick={() => {
              setCurrentScreen('order_confirm');
              setShowSuccessModal(true);
            }}
            className={`px-1 py-1.5 rounded-xl font-bold transition-all text-center truncate ${
              showSuccessModal ? 'bg-[#FE2C55] text-white shadow-md shadow-[#FE2C55]/30' : 'bg-[#1F2231] text-slate-300 hover:bg-[#252836]'
            }`}
          >
            3.开通成功
          </button>

          <button
            onClick={() => {
              setShowSuccessModal(false);
              setCurrentScreen('order_detail');
            }}
            className={`px-1 py-1.5 rounded-xl font-bold transition-all text-center truncate ${
              currentScreen === 'order_detail' ? 'bg-[#FE2C55] text-white shadow-md shadow-[#FE2C55]/30' : 'bg-[#1F2231] text-slate-300 hover:bg-[#252836]'
            }`}
          >
            4.充值成功
          </button>

          <button
            onClick={() => {
              setShowSuccessModal(false);
              setCurrentScreen('renewal_management');
            }}
            className={`px-1 py-1.5 rounded-xl font-bold transition-all text-center truncate ${
              currentScreen === 'renewal_management' ? 'bg-[#FE2C55] text-white shadow-md shadow-[#FE2C55]/30' : 'bg-[#1F2231] text-slate-300 hover:bg-[#252836]'
            }`}
          >
            5.续费管理
          </button>

          <button
            onClick={() => {
              setShowSuccessModal(false);
              setCurrentScreen('order_list');
            }}
            className={`px-1 py-1.5 rounded-xl font-bold transition-all text-center truncate ${
              currentScreen === 'order_list' ? 'bg-[#FE2C55] text-white shadow-md shadow-[#FE2C55]/30' : 'bg-[#1F2231] text-slate-300 hover:bg-[#252836]'
            }`}
          >
            6.全部订单
          </button>
        </div>
      </div>

      {/* Phone Container Hardware Frame */}
      <div className="w-full max-w-[420px] h-[840px] max-h-[88vh] sm:max-h-none sm:h-[840px] bg-[#161823] rounded-[36px] sm:rounded-[48px] border-[6px] sm:border-[10px] border-[#252836] shadow-2xl relative overflow-hidden flex flex-col ring-1 ring-[#2D3142] transform-gpu">
        
        {/* Top Camera Notch */}
        <div className="w-32 h-5 bg-[#0f1017] absolute top-0 left-1/2 transform -translate-x-1/2 rounded-b-2xl z-30 flex items-center justify-center">
          <div className="w-3 h-3 bg-[#1A1C28] rounded-full mr-2" />
          <div className="w-2 h-2 bg-[#252836] rounded-full" />
        </div>

        {/* Status Bar matching screenshots */}
        <div className="bg-white pt-2.5 px-6 pb-1 text-[11px] font-semibold text-slate-800 flex items-center justify-between z-20 shrink-0 border-b border-slate-100">
          <span className="font-bold">10:29</span>
          <div className="flex items-center space-x-1.5 text-slate-700">
            <Signal className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold">4G</span>
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
            <span className="text-[10px] font-bold">57</span>
          </div>
        </div>

        {/* Dynamic Screen Viewer */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative bg-[#EEF2F9]">
          {/* Screen 1: Recharge Home */}
          {currentScreen === 'recharge_home' && (
            <DouyinRechargeHome
              userStatus={userStatus}
              onOpenCheckout={() => handleOpenCheckout(selectedSku)}
              onGoToVipCenter={() => setCurrentScreen('vip_center')}
            />
          )}

          {/* Screen 2: Mini Program Center (动信通权益小程序 - 包含 4 个 SKU 与多已订购状态) */}
          {currentScreen === 'vip_center' && (
            <VipMemberCenter
              userStatus={userStatus}
              subscribedSkuId={subscribedSkuIds[0] || null}
              subscribedSkuIds={subscribedSkuIds}
              onBackToRecharge={() => setCurrentScreen('recharge_home')}
              onOpenUnsubscribe={() => setShowUnsubscribe(true)}
              onOpenCheckout={handleOpenCheckout}
              onGoToRenewalManagement={() => setCurrentScreen('renewal_management')}
              userPhone={userPhone || '18518920637'}
            />
          )}

          {/* Screen 3: Order Confirm Page (提单页 + 协议弹窗 + 账号确认弹窗) */}
          {currentScreen === 'order_confirm' && (
            <OrderConfirmPage
              onBack={() => setCurrentScreen('vip_center')}
              onSubmitOrder={handleSubmitOrder}
              phone={userPhone}
              price={selectedSku.price}
              selectedSku={selectedSku}
              hideBottomBar={showSuccessModal}
            />
          )}

          {/* Screen 4: Order Detail / Recharge Success Page (充值成功详情页) */}
          {currentScreen === 'order_detail' && (
            <OrderDetailPage
              onBack={() => setCurrentScreen('vip_center')}
              onGoToVipCenter={() => setCurrentScreen('vip_center')}
              onGoToOrderList={() => setCurrentScreen('order_list')}
              onGoToRenewalManagement={() => setCurrentScreen('renewal_management')}
              onRebuy={() => setCurrentScreen('order_confirm')}
              phone={userPhone && userPhone.length === 11 ? `${userPhone.slice(0, 3)}****${userPhone.slice(7)}` : '185****0637'}
              price={selectedSku.price}
              selectedSku={selectedSku}
            />
          )}

          {/* Screen 5: Renewal Management Page (续费管理) */}
          {currentScreen === 'renewal_management' && (
            <RenewalManagementPage
              onBack={() => setCurrentScreen('vip_center')}
              phone={userPhone || '18518920637'}
              price={selectedSku.price}
              selectedSku={selectedSku}
              onUnsubscribeSuccess={() => setUserStatus('cancelled_member')}
            />
          )}

          {/* Screen 6: Order List Page (全部订单列表) */}
          {currentScreen === 'order_list' && (
            <OrderListPage
              onBack={() => setCurrentScreen('order_detail')}
              onSelectOrder={() => setCurrentScreen('order_detail')}
              onRebuy={() => setCurrentScreen('order_confirm')}
              phone={userPhone || '18518920637'}
              price={selectedSku.price}
              selectedSku={selectedSku}
            />
          )}

          {/* Popup: Auto-Renewal Agreement Signing Success (动信通自动续费开通成功抽屉) */}
          {showSuccessModal && (
            <OrderSuccessModal
              onConfirm={handleSuccessModalConfirm}
              onClose={() => setShowSuccessModal(false)}
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
        <div className="bg-white py-2 flex items-center justify-center shrink-0 z-20 border-t border-slate-100">
          <div className="w-28 h-1 bg-slate-900 rounded-full" />
        </div>

      </div>

      <div className="mt-3 text-center text-xs text-slate-500">
        模拟设备：抖音 App iOS/Android 端内电商交易完整链路 (包含提单页、双层弹窗、扣款成功抽屉、充值成功页与订单列表)
      </div>

    </div>
  );
};
