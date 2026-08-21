import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  DollarSign, 
  TrendingUp, 
  Zap, 
  Smartphone, 
  Layers, 
  Users, 
  HelpCircle,
  ChevronRight,
  Sparkles,
  Search,
  Bell,
  Lock,
  ExternalLink,
  Award,
  CircleDollarSign,
  FileText,
  Copy,
  Check,
  CreditCard,
  RotateCcw,
  Gift,
  Target,
  BarChart3,
  BadgeCheck,
  ChevronDown
} from 'lucide-react';

export const PrdDocument: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'section1' | 'section2' | 'section3' | 'section4'>('section1');
  const [copied, setCopied] = useState(false);

  const handleCopySummary = () => {
    navigator.clipboard.writeText(`动信通 × 抖音【充值会员】小程序业务评审文档\n1. 小程序背景：通信高频低粘性破局，沉淀抖音支付连续包月高价值客群\n2. 小程序活动介绍：1.99元/月连续包月+送2元话费直减+2元电商券\n3. 小程序原型图：4大核心页面全闭环（小程序->提单页->签约成功->订单查询）\n4. 价值点：赋能抖音充值GMV增长、赋能抖音支付自动代扣心智、赋能抖音电商跨端带货`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0f1017] text-slate-100 min-h-screen pb-24 font-sans">
      
      {/* Top Banner Header */}
      <div className="bg-[#161823] border-b border-[#2D3142] py-8 px-4 sm:px-6 lg:px-8 shadow-xl">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FE2C55]/10 border border-[#FE2C55]/30 text-[#FE2C55] text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>抖音内部业务评审规范文档</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                动信通【充值会员】小程序产品需求文档 (PRD)
              </h1>
              <p className="mt-2 text-slate-400 text-sm max-w-3xl leading-relaxed">
                围绕 1.小程序背景、2.小程序活动介绍、3.小程序原型图、4.价值点 四大维度，全面阐述动信通充值会员连续包月项目对抖音充值、抖音支付与抖音电商生态的商业赋能。
              </p>
            </div>

            {/* Top Quick Actions */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleCopySummary}
                className="px-4 py-2 bg-[#1F2231] hover:bg-[#252836] border border-[#2D3142] text-xs font-bold text-slate-200 rounded-xl flex items-center space-x-1.5 transition-colors shadow-md"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                <span>{copied ? '已复制评审要点' : '复制评审纲要'}</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#1F2231] p-4 rounded-2xl border border-[#2D3142] text-xs mt-6">
            <div>
              <div className="text-slate-400 font-medium">会员连续包月资费</div>
              <div className="text-amber-400 font-black italic text-base">¥1.99 / 月</div>
              <div className="text-[10px] text-slate-500 mt-0.5">抖音支付免密自动代扣</div>
            </div>
            <div>
              <div className="text-slate-400 font-medium">首月专享权益价值</div>
              <div className="text-emerald-400 font-black italic text-base">¥4.00 (直减2元+券2元)</div>
              <div className="text-[10px] text-slate-500 mt-0.5">动信通全额补贴</div>
            </div>
            <div>
              <div className="text-slate-400 font-medium">完整履约流转链路</div>
              <div className="text-blue-400 font-black italic text-base">4大核心页面全流程</div>
              <div className="text-[10px] text-slate-500 mt-0.5">小程序 → 提单 → 签约 → 查单</div>
            </div>
            <div>
              <div className="text-slate-400 font-medium">工信部合规设计</div>
              <div className="text-purple-400 font-black italic text-base">扣款前5天提醒 + 随时退订</div>
              <div className="text-[10px] text-slate-500 mt-0.5">100% 满足平台与法规</div>
            </div>
          </div>

          {/* 4 Main Sections Aligned with User Screenshot */}
          <div className="mt-8 flex flex-wrap gap-2.5 border-t border-[#2D3142] pt-4">
            {[
              { id: 'section1', num: '1.', label: '小程序背景', icon: Layers, desc: '行业痛点与合作契机' },
              { id: 'section2', num: '2.', label: '小程序活动介绍', icon: Gift, desc: '1.99元连续包月方案与规则' },
              { id: 'section3', num: '3.', label: '小程序原型图', icon: Smartphone, desc: '4大页面交互与状态流转' },
              { id: 'section4', num: '4.', label: '价值点 (赋能矩阵)', icon: Target, desc: '充值GMV/支付代扣/电商转化' },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id as any)}
                  className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${
                    isActive
                      ? 'bg-[#FE2C55] text-white shadow-lg shadow-[#FE2C55]/30 ring-2 ring-[#FE2C55]/50'
                      : 'bg-[#1F2231] text-slate-300 hover:bg-[#252836] hover:text-white border border-[#2D3142]'
                  }`}
                >
                  <span className={`text-xs px-1.5 py-0.5 rounded font-black ${isActive ? 'bg-white/20 text-white' : 'bg-black/30 text-slate-400'}`}>
                    {tab.num}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main PRD Section Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

        {/* ========================================================= */}
        {/* 1. 小程序背景 */}
        {/* ========================================================= */}
        {activeSection === 'section1' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#161823] border border-[#2D3142] rounded-[32px] p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-[#FE2C55]/10 text-[#FE2C55] rounded-2xl border border-[#FE2C55]/30">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">1. 小程序背景</h2>
                  <p className="text-xs text-slate-400">通信充值场景痛点与抖音生态战略合作契机</p>
                </div>
              </div>

              {/* Background 3 Blocks */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#1F2231] p-5 rounded-2xl border border-[#2D3142] space-y-2">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-400">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>行业痛点：低频刚需、留存薄弱</span>
                  </div>
                  <h3 className="text-sm font-black text-white">话费充值比价严重，用户流失率高</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    话费充值属于典型低频（月均1.1次）、低毛利的工具型刚需，用户对几毛钱的优惠极度敏感，充完即走，平台与商户缺乏持续的用户心智锁钩与复购粘性抓手。
                  </p>
                </div>

                <div className="bg-[#1F2231] p-5 rounded-2xl border border-[#2D3142] space-y-2">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>平台诉求：沉淀高频支付代扣心智</span>
                  </div>
                  <h3 className="text-sm font-black text-white">抖音支付亟需扩展连续扣款场景</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    抖音支付处于快速普及期，除短视频打赏与电商带货外，亟需在通信、生活缴费等高信用高信任的生活服务场景中建立“自动续订、免密代扣”的长期银行卡扣费通道。
                  </p>
                </div>

                <div className="bg-[#1F2231] p-5 rounded-2xl border border-[#2D3142] space-y-2">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-[#FE2C55]">
                    <span className="w-2 h-2 rounded-full bg-[#FE2C55]" />
                    <span>合作方案：动信通补贴打造爆款</span>
                  </div>
                  <h3 className="text-sm font-black text-white">1.99元连续包月会员 + 倒赚模型</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    动信通作为通信增值服务旗舰商户，全额出资补贴话费红包（2元/月），以“买1.99元返2元+送2元券”的极致价格锚点，零门槛切入打造抖音端内首个通信连续包月会员标杆。
                  </p>
                </div>
              </div>

              {/* Target Audience */}
              <div className="bg-[#1F2231] p-5 rounded-2xl border border-[#2D3142] space-y-3">
                <h3 className="text-sm font-black text-white flex items-center space-x-2">
                  <Users className="w-4 h-4 text-[#FE2C55]" />
                  <span>1.1 目标用户画像与触达场景 (Target User & Triggers)</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                  <div className="bg-[#12131D] p-3.5 rounded-xl border border-[#2D3142]">
                    <div className="font-bold text-white">画像 A：价格敏感型充值用户</div>
                    <div className="text-[11px] text-slate-400 mt-1">每月有固定 50~100 元话费充值需求，看到“本单立省2元”具有极强的转化意愿。</div>
                  </div>
                  <div className="bg-[#12131D] p-3.5 rounded-xl border border-[#2D3142]">
                    <div className="font-bold text-white">画像 B：抖音电商高频买家</div>
                    <div className="text-[11px] text-slate-400 mt-1">常在抖音直播间购物，附赠的 2 元抖音电商券具备 100% 的即时核销吸引力。</div>
                  </div>
                  <div className="bg-[#12131D] p-3.5 rounded-xl border border-[#2D3142]">
                    <div className="font-bold text-white">画像 C：省心自动扣费客群</div>
                    <div className="text-[11px] text-slate-400 mt-1">追求省心省时，认可平台扣款合规性（支持随时取消），习惯订阅制服务。</div>
                  </div>
                </div>
              </div>

              {/* Collaboration Matrix */}
              <div className="bg-[#1F2231] p-5 rounded-2xl border border-[#2D3142] space-y-3">
                <h3 className="text-sm font-black text-white flex items-center space-x-2">
                  <BadgeCheck className="w-4 h-4 text-blue-400" />
                  <span>1.2 双方角色分工与职责矩阵</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                  <div className="bg-[#12131D] p-4 rounded-xl border border-[#2D3142] space-y-2">
                    <span className="text-[#FE2C55] font-bold text-sm">抖音生态 (充值中心 / 抖音支付 / 抖音电商)：</span>
                    <ul className="list-disc list-inside space-y-1.5 text-slate-400 leading-relaxed">
                      <li>开放标准电商提单页组件及抖音支付免密签约扣款能力；</li>
                      <li>提供充值中心流量入口曝光与订单查询消息通道；</li>
                      <li>统一负责端内自动续费协议合规监管与资金风控结算。</li>
                    </ul>
                  </div>
                  <div className="bg-[#12131D] p-4 rounded-xl border border-[#2D3142] space-y-2">
                    <span className="text-amber-400 font-bold text-sm">动信通 (官方旗舰店服务商)：</span>
                    <ul className="list-disc list-inside space-y-1.5 text-slate-400 leading-relaxed">
                      <li>承担每月 2.00 元话费券的全额补贴成本；</li>
                      <li>负责动信通权益小程序的开发、会员权益发放与履约管理；</li>
                      <li>对接三大运营商官方接口，提供话费充值与增值服务。</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 2. 小程序活动介绍 */}
        {/* ========================================================= */}
        {activeSection === 'section2' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#161823] border border-[#2D3142] rounded-[32px] p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl border border-amber-500/30">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">2. 小程序活动介绍</h2>
                  <p className="text-xs text-slate-400">资费体系、会员权益包、活动规则与扣款履约机制</p>
                </div>
              </div>

              {/* Core Offer Box */}
              <div className="bg-gradient-to-r from-[#FE2C55]/20 via-amber-500/20 to-rose-500/20 p-6 rounded-2xl border border-[#FE2C55]/40 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-black bg-[#FE2C55] text-white px-2.5 py-0.5 rounded-full">主推活动</span>
                    <h3 className="text-lg font-black text-white mt-1">【动信通充值会员 VIP 月卡】连续包月特惠</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-[#FE2C55] tracking-tight">¥1.99 <span className="text-xs text-slate-400 font-normal">/ 月</span></div>
                    <div className="text-[11px] text-amber-300 font-bold">首月直减立省 2.00 元</div>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  活动期间，用户通过动信通权益小程序开通【充值会员】，首月仅需支付 1.99 元，即可立享价值 4.00 元的首发权益包（2元话费直减券 + 2元抖音电商券）。开通即自动签约抖音支付连续包月服务，次月起每月 1.99 元自动续订。
                </p>
              </div>

              {/* Benefits Breakdown Matrix */}
              <div className="space-y-3">
                <h3 className="text-sm font-black text-white flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>2.1 会员专属权益包明细 (Benefit Matrix)</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-[#1F2231] p-4 rounded-2xl border border-[#2D3142] space-y-2">
                    <div className="text-xs font-bold text-[#FE2C55] flex items-center justify-between">
                      <span>核心权益 ①</span>
                      <span className="bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded text-[10px]">立减特权</span>
                    </div>
                    <div className="text-sm font-black text-white">2元话费直减券</div>
                    <p className="text-xs text-slate-400">每月充话费立减 2 元现金，无门槛全网通用，直连运营商实时秒级充值到账。</p>
                    <div className="text-[11px] text-amber-400 font-medium pt-1">感知价值：¥2.00 / 月</div>
                  </div>

                  <div className="bg-[#1F2231] p-4 rounded-2xl border border-[#2D3142] space-y-2">
                    <div className="text-xs font-bold text-amber-400 flex items-center justify-between">
                      <span>核心权益 ②</span>
                      <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[10px]">电商特权</span>
                    </div>
                    <div className="text-sm font-black text-white">2元抖音电商立减券</div>
                    <p className="text-xs text-slate-400">全品类抖音电商通用立减券，下单即减，拉动用户在抖音商城直播间与店铺消费。</p>
                    <div className="text-[11px] text-amber-400 font-medium pt-1">感知价值：¥2.00 / 月</div>
                  </div>

                  <div className="bg-[#1F2231] p-4 rounded-2xl border border-[#2D3142] space-y-2">
                    <div className="text-xs font-bold text-emerald-400 flex items-center justify-between">
                      <span>服务保障 ③</span>
                      <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px]">合规保障</span>
                    </div>
                    <div className="text-sm font-black text-white">安心续费与随时退订</div>
                    <p className="text-xs text-slate-400">扣款日前 5 天发送服务提醒通知，会员主页与订单页均提供 1-Click 显眼退订入口。</p>
                    <div className="text-[11px] text-emerald-400 font-medium pt-1">满足工信部最新监管要求</div>
                  </div>
                </div>
              </div>

              {/* Subscription Rules Table */}
              <div className="bg-[#1F2231] p-5 rounded-2xl border border-[#2D3142] space-y-3">
                <h3 className="text-sm font-black text-white">2.2 活动业务规则与签约扣款规范</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#12131D] text-slate-400 border-b border-[#2D3142]">
                        <th className="p-3">规则维度</th>
                        <th className="p-3">详细规则规范</th>
                        <th className="p-3">用户端体验与合规保障</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2D3142]/60 text-slate-300">
                      <tr>
                        <td className="p-3 font-bold text-amber-400">首月特惠资费</td>
                        <td className="p-3">首月签约支付 1.99 元，立享 2元话费直减券 + 2元电商券</td>
                        <td className="p-3 text-slate-400">提单页与协议弹窗明确展示 ¥1.99 价格</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-200">自动续费周期</td>
                        <td className="p-3">按自然月（30天）自动周期性扣款，次月资费为 ¥1.99/月</td>
                        <td className="p-3 text-slate-400">提单页明示“后期每月 1.99 元，自动续订”</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-purple-400">扣款前提前提醒</td>
                        <td className="p-3">每月扣款日前 5 天，系统自动下发抖音消息盒子服务通知</td>
                        <td className="p-3 text-slate-400">透明告知扣款金额及退订链接，防止无意扣款</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-emerald-400">退订与权益保留</td>
                        <td className="p-3">支持随时一键解绑代扣协议，取消后当月已下发权益持续有效</td>
                        <td className="p-3 text-slate-400">次月起停止扣款，无违约金或隐形限制</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 3. 小程序原型图 */}
        {/* ========================================================= */}
        {activeSection === 'section3' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#161823] border border-[#2D3142] rounded-[32px] p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl border border-blue-500/30">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">3. 小程序原型图与流转链路</h2>
                  <p className="text-xs text-slate-400">四大核心页面规范（对齐抖音电商标准提单与签约链路）</p>
                </div>
              </div>

              {/* 4 Steps Architecture */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {/* Screen 1 */}
                <div className="bg-[#1F2231] p-4 rounded-2xl border border-[#2D3142] flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-[#FE2C55] text-white flex items-center justify-center text-xs font-black">1</span>
                      <span className="text-[10px] text-slate-400">小程序主页</span>
                    </div>
                    <h4 className="text-xs font-black text-white mt-2">动信通权益小程序</h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      展示【充值会员】特惠卡片（¥1.99/月），罗列 2元话费券 + 2元电商券，引导点击开通。
                    </p>
                  </div>
                  <div className="bg-[#12131D] p-2.5 rounded-xl border border-[#2D3142] text-[10px] text-amber-300">
                    触发点：点击【1.99元/月 立即开通】
                  </div>
                </div>

                {/* Screen 2 */}
                <div className="bg-[#1F2231] p-4 rounded-2xl border border-[#2D3142] flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-black">2</span>
                      <span className="text-[10px] text-slate-400">标准提单页</span>
                    </div>
                    <h4 className="text-xs font-black text-white mt-2">确认订单 (提单页)</h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      展示充值账号（1505****2806）、续费周期、旗舰店商品、号码保护开关与抖音支付免密卡片。
                    </p>
                  </div>
                  <div className="bg-[#12131D] p-2.5 rounded-xl border border-[#2D3142] text-[10px] text-amber-300">
                    触发点：点击【提交订单】
                  </div>
                </div>

                {/* Screen 3 */}
                <div className="bg-[#1F2231] p-4 rounded-2xl border border-[#2D3142] flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black">3</span>
                      <span className="text-[10px] text-slate-400">协议与签约</span>
                    </div>
                    <h4 className="text-xs font-black text-white mt-2">协议弹窗 & 签约成功</h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      弹出《商品相关协议》，点击【同意并下单】完成首扣，居中弹出【签约成功】提示代扣银行卡。
                    </p>
                  </div>
                  <div className="bg-[#12131D] p-2.5 rounded-xl border border-[#2D3142] text-[10px] text-emerald-300">
                    触发点：点击【知道了】激活会员
                  </div>
                </div>

                {/* Screen 4 */}
                <div className="bg-[#1F2231] p-4 rounded-2xl border border-[#2D3142] flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-black">4</span>
                      <span className="text-[10px] text-slate-400">履约与查单</span>
                    </div>
                    <h4 className="text-xs font-black text-white mt-2">充值成功与订单查询</h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      展示充值信息、【续费管理：自动续订，可随时取消 &gt;】直接入口、实付金额与商品操作区【去使用】。
                    </p>
                  </div>
                  <div className="bg-[#12131D] p-2.5 rounded-xl border border-[#2D3142] text-[10px] text-purple-300">
                    触发点：点击【去使用】跳回小程序
                  </div>
                </div>
              </div>

              {/* Detailed Specs for Each Screen */}
              <div className="space-y-4">
                <div className="bg-[#1F2231] p-4 rounded-2xl border border-[#2D3142] text-xs text-slate-300 space-y-2">
                  <div className="font-bold text-white text-sm">3.1 核心组件与交互规范清单</div>
                  <ul className="list-disc list-inside space-y-1.5 text-slate-400">
                    <li><strong>提单吸底结算栏：</strong>固定于移动端模拟器底部，左侧展示高对比度价格 <code className="text-[#FE2C55] font-bold">¥1.99</code>，右侧主操作按钮【提交订单】。</li>
                    <li><strong>协议合规弹窗：</strong>以底部半屏抽屉形式展开，内含《抖音电商自动续费扣款协议》与《扣款授权服务协议》超链接。</li>
                    <li><strong>签约反馈弹窗：</strong>抖音支付签约成功居中卡片，清晰告知“扣款方式：优先从中信银行信用卡(2108)扣款”，并指引退订管理路径。</li>
                    <li><strong>订单详情页【去使用】核销：</strong>在商品卡片「申请售后」右侧提供显眼的渐变【去使用】按钮，点击无缝跳回动信通权益小程序。</li>
                    <li><strong>权益卡券领取状态机：</strong>会员在小程序点击【领取】话费券/电商券后，系统弹出居中浮层 Toast 提示「🎉 领取成功！[权益名称] 已放入券包」，按钮随即变更为「已领取」置灰防重领。</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 4. 价值点 () */}
        {/* ========================================================= */}
        {activeSection === 'section4' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#161823] border border-[#2D3142] rounded-[32px] p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/30">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">4. 价值点 (生态赋能矩阵)</h2>
                  <p className="text-xs text-slate-400">多方共赢：赋能抖音充值GMV、赋能抖音支付代扣心智、赋能抖音电商转化</p>
                </div>
              </div>

              {/* 3 Strategic Value Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Value Pillar 1 */}
                <div className="bg-[#1F2231] p-5 rounded-2xl border border-[#2D3142] space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FE2C55]/20 text-[#FE2C55] flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h3 className="text-sm font-black text-white">赋能抖音充值中心：提升 GMV 与用户复购频次</h3>
                  <div className="space-y-2 text-xs text-slate-400 leading-relaxed">
                    <p>• <strong>锁定月度充值行为：</strong>通过每月下发 2 元话费无门槛直减券，有效锚定用户在抖音充值中心的每月复购心智，充值频次预计提升 <strong>25%~35%</strong>。</p>
                    <p>• <strong>零补贴成本做大盘：</strong>2元话费红包由动信通全额补贴承担，抖音充值中心无需投入营销预算即可实现流水规模提升。</p>
                  </div>
                </div>

                {/* Value Pillar 2 */}
                <div className="bg-[#1F2231] p-5 rounded-2xl border border-[#2D3142] space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h3 className="text-sm font-black text-white">赋能抖音支付：沉淀高价值免密代扣签约规模</h3>
                  <div className="space-y-2 text-xs text-slate-400 leading-relaxed">
                    <p>• <strong>高频代扣场景拓展：</strong>借助通信刚需，低门槛促成用户完成抖音支付与银行卡绑卡免密签约，沉淀高黏性代扣用户池。</p>
                    <p>• <strong>提升银行卡活跃度：</strong>每月定额自动扣费，持续激活绑卡用户的支付活跃度与账户生命周期价值 (LTV)。</p>
                  </div>
                </div>

                {/* Value Pillar 3 */}
                <div className="bg-[#1F2231] p-5 rounded-2xl border border-[#2D3142] space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h3 className="text-sm font-black text-white">赋能抖音电商：跨场景带货与高核销转化</h3>
                  <div className="space-y-2 text-xs text-slate-400 leading-relaxed">
                    <p>• <strong>电商流量跨端引入：</strong>每位会员每月获赠 2 元抖音电商立减券，形成充值中心向抖音商城/直播间的跨端流量输送。</p>
                    <p>• <strong>撬动实物订单 GMV：</strong>2元电商券预计带动 <strong>50~100元</strong> 客单价的实物商品交易，形成数十倍的电商杠杆效应。</p>
                  </div>
                </div>
              </div>

              {/* Economic Unit ROI */}
              <div className="bg-[#1F2231] p-5 rounded-2xl border border-[#2D3142] space-y-3">
                <h3 className="text-sm font-black text-white flex items-center space-x-2">
                  <CircleDollarSign className="w-4 h-4 text-amber-400" />
                  <span>4.1 商业模型与单位经济效益测算 (Unit Economics)</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-[#12131D] p-3 rounded-xl border border-[#2D3142]">
                    <div className="text-[11px] text-slate-400">用户月订阅收入</div>
                    <div className="text-base font-black text-amber-400 mt-1">¥1.99</div>
                    <div className="text-[9px] text-slate-500 mt-0.5">抖音支付代扣</div>
                  </div>
                  <div className="bg-[#12131D] p-3 rounded-xl border border-[#2D3142]">
                    <div className="text-[11px] text-slate-400">话费补贴成本</div>
                    <div className="text-base font-black text-[#FE2C55] mt-1">- ¥2.00</div>
                    <div className="text-[9px] text-slate-500 mt-0.5">动信通全额出资</div>
                  </div>
                  <div className="bg-[#12131D] p-3 rounded-xl border border-[#2D3142]">
                    <div className="text-[11px] text-slate-400">后向CPS/增值收益</div>
                    <div className="text-base font-black text-emerald-400 mt-1">+ ¥3.85</div>
                    <div className="text-[9px] text-slate-500 mt-0.5">流量包/宽带/电商佣金</div>
                  </div>
                  <div className="bg-[#12131D] p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10">
                    <div className="text-[11px] text-emerald-400 font-bold">单用户净利润</div>
                    <div className="text-base font-black text-emerald-400 mt-1">+ ¥3.84 / 月</div>
                    <div className="text-[9px] text-emerald-300 mt-0.5">正向现金流闭环</div>
                  </div>
                </div>
              </div>

              {/* Summary Conclusion */}
              <div className="bg-gradient-to-r from-[#1F2231] to-[#161823] p-5 rounded-2xl border border-blue-500/30 space-y-2">
                <div className="text-xs font-bold text-blue-400">评审结论与合作建议</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  动信通【充值会员】小程序通过“1.99元连续包月”创新模式，在合规保障的前提下，低成本解决话费充值低留存痛点，同时规模化赋能抖音支付自动代扣心智与抖音电商大盘，具备极高的业务可行性与商业共赢价值，建议尽快推进接口联调与灰度上线。
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
