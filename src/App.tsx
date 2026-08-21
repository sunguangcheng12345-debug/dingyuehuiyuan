import React, { useState } from 'react';
import { AppTab, SimUserStatus } from './types';
import { Navbar } from './components/Navbar';
import { PhoneSimulator } from './components/PhoneSimulator';
import { PrdDocument } from './components/PrdDocument';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('prototype');
  const [userStatus, setUserStatus] = useState<SimUserStatus>('non_member');

  const handleReset = () => {
    setUserStatus('non_member');
    setActiveTab('prototype');
  };

  return (
    <div className="min-h-screen bg-[#0f1017] font-sans text-slate-100 flex flex-col">
      {/* Global Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userStatus={userStatus}
        setUserStatus={setUserStatus}
        resetPrototype={handleReset}
      />

      {/* Main Container View Modes */}
      <main className="flex-1">
        {activeTab === 'prototype' && (
          <div className="py-6">
            <PhoneSimulator
              userStatus={userStatus}
              setUserStatus={setUserStatus}
            />
          </div>
        )}

        {activeTab === 'prd' && (
          <PrdDocument />
        )}

        {activeTab === 'dual' && (
          <div className="max-w-[1600px] mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 sticky top-20">
              <div className="bg-[#161823] p-4 rounded-[32px] border border-[#2D3142] shadow-2xl">
                <div className="text-xs font-bold text-amber-400 mb-2 flex items-center space-x-1">
                  <span>📱 交互式 App 手机容器原型</span>
                </div>
                <PhoneSimulator
                  userStatus={userStatus}
                  setUserStatus={setUserStatus}
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-[#161823] p-2 rounded-[32px] border border-[#2D3142] shadow-2xl">
                <div className="p-3 border-b border-[#2D3142] text-xs font-bold text-[#FE2C55] flex items-center space-x-1">
                  <span>📄 对应 PRD 产品逻辑与规则对照</span>
                </div>
                <PrdDocument />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
