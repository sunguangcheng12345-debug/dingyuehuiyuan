import React from 'react';
import { AppTab, SimUserStatus } from '../types';
import { Smartphone, FileText, LayoutGrid, ShieldCheck, RefreshCw, UserCheck, AlertCircle } from 'lucide-react';

interface NavbarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  userStatus: SimUserStatus;
  setUserStatus: (status: SimUserStatus) => void;
  resetPrototype: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userStatus,
  setUserStatus,
  resetPrototype
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left Branding */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 via-red-500 to-amber-400 p-0.5 flex items-center justify-center shadow-lg shadow-rose-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-rose-500 text-lg">
              抖
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-base tracking-tight text-slate-100">动信通 × 抖音充值中心</span>
              <span className="bg-gradient-to-r from-amber-400 to-[#FE2C55] text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                【充值会员】 PRD & 原型
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">1.99元连续包月 | 2元话费直减 | 运营商CPA/CPS高收益闭环</p>
          </div>
        </div>

        {/* Center Mode Tabs */}
        <div className="flex bg-slate-800/90 p-1 rounded-lg border border-slate-700/60 text-xs sm:text-sm font-medium">
          <button
            onClick={() => setActiveTab('prototype')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'prototype'
                ? 'bg-rose-600 text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>高保真 App 原型</span>
          </button>

          <button
            onClick={() => setActiveTab('prd')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'prd'
                ? 'bg-rose-600 text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>PRD 产品规范</span>
          </button>

          <button
            onClick={() => setActiveTab('dual')}
            className={`hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'dual'
                ? 'bg-rose-600 text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>对照演示 (Dual)</span>
          </button>
        </div>

        {/* Right Status Simulator Control */}
        <div className="flex items-center space-x-3">
          <div className="hidden lg:flex items-center bg-slate-800 border border-slate-700/70 rounded-lg px-2.5 py-1 text-xs">
            <span className="text-slate-400 mr-2">模拟会员状态:</span>
            <select
              value={userStatus}
              onChange={(e) => setUserStatus(e.target.value as SimUserStatus)}
              className="bg-transparent text-amber-300 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="non_member" className="bg-slate-900 text-white">未开通 (新用户拦截)</option>
              <option value="active_member" className="bg-slate-900 text-white">已开通连续包月 (活跃)</option>
              <option value="pending_renewal" className="bg-slate-900 text-white">即将续费 (扣款前5天提醒)</option>
              <option value="cancelled_member" className="bg-slate-900 text-white">已取消包月 (次月不扣费)</option>
            </select>
          </div>

          <button
            onClick={resetPrototype}
            title="重置原型交互"
            className="p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors flex items-center space-x-1 text-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">重置状态</span>
          </button>
        </div>

      </div>
    </header>
  );
};
