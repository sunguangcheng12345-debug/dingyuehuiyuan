import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Smartphone, 
  Layers, 
  Users, 
  ChevronRight, 
  Sparkles, 
  Search, 
  Bell, 
  Lock, 
  Award, 
  FileText, 
  Copy, 
  Check, 
  CreditCard, 
  RotateCcw, 
  Gift, 
  Target, 
  BarChart3, 
  BadgeCheck, 
  ShoppingBag, 
  Film, 
  Utensils, 
  Clock, 
  Ticket,
  HelpCircle,
  AlertCircle,
  Crown
} from 'lucide-react';
import { MEMBERSHIP_SKUS } from '../data/membershipSkus';

export const PrdDocument: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'active_member' | 'matrix' | 'features' | 'flow' | 'compliance' | 'metrics'>('active_member');
  const [copied, setCopied] = useState(false);

  const handleCopySummary = () => {
    navigator.clipboard.writeText(`通信服务中心 - DXT通信充值会员产品需求文档 (PRD) V3.0
一、核心定位与业务突破：
1. 聚焦 DXT通信充值会员，新用户首月仅需0.01元，次月恢复1.99元/月连续包月自动续费；
2. 小程序命名规范为【通信服务中心】，严禁出现外部运营商与非许可品牌；
3. 核心权益双气泡呈现：
   - 每月必得：2元话费直减券（无门槛直接抵扣）
   - 随机2选1：最高50元抖音电商新人券 或 满99减5抖音电商专享券（后端基于手机号画像判断，前端趣味盲盒呈现）
4. 会员天天打卡专属签到福利：
   - 连续签到3天：免费领取10元美团生活券
   - 连续签到5天：免费领取20元美团生活券
5. 业务说明与常见问题规范：严格对标官方透明计费规范，开通前合规提示，随时支持退订。
6. 已开通DXT会员展示体系：从“拉新转化”彻底切换为“履约促活与留存”，展示尊贵黑金卡、已生效券去使用、充值复购CTA、累计省钱数据与透明续费管理。`);
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
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1C68F2]/10 border border-[#1C68F2]/30 text-blue-400 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>通信服务中心业务评审规范文档 · V3.0 终审版</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                通信服务中心 · DXT通信充值会员产品需求文档 (PRD)
              </h1>
              <p className="mt-2 text-slate-400 text-sm max-w-3xl leading-relaxed">
                全面规范通信服务中心小程序DXT通信充值会员首月0.01元尝鲜、次月1.99元连续包月交易链路、2元话费必得直减、电商神券随机2选1盲盒机制、已开通会员尊享状态展示、连续签到美团券履约与退订管理。
              </p>
            </div>

            {/* Top Quick Actions */}
            <div className="flex items-center space-x-3 shrink-0">
              <button
                onClick={handleCopySummary}
                className="px-4 py-2 bg-[#1F2231] hover:bg-[#252836] border border-[#2D3142] text-xs font-bold text-slate-200 rounded-xl flex items-center space-x-1.5 transition-colors shadow-md"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                <span>{copied ? '已复制 PRD 纲要' : '复制 PRD 纲要'}</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#1F2231] p-4 rounded-2xl border border-[#2D3142] text-xs mt-6">
            <div>
              <div className="text-slate-400 font-medium">会员名称与形态</div>
              <div className="text-blue-400 font-black text-sm sm:text-base mt-0.5">DXT通信充值会员</div>
              <div className="text-[10px] text-slate-500 mt-0.5">首月0.01元 / 次月1.99元续费</div>
            </div>

            <div>
              <div className="text-slate-400 font-medium">核心双气泡权益</div>
              <div className="text-emerald-400 font-black text-sm sm:text-base mt-0.5">2元话费 + 电商2选1</div>
              <div className="text-[10px] text-slate-500 mt-0.5">必得2元话费券 + 最高50元电商券</div>
            </div>

            <div>
              <div className="text-slate-400 font-medium">专属签到激励</div>
              <div className="text-orange-400 font-black text-sm sm:text-base mt-0.5">3天10元 / 5天20元</div>
              <div className="text-[10px] text-slate-500 mt-0.5">美团生活券连续打卡奖励</div>
            </div>

            <div>
              <div className="text-slate-400 font-medium">合规与风控保障</div>
              <div className="text-purple-400 font-black text-sm sm:text-base mt-0.5">扣款前5天提醒 + 随时退订</div>
              <div className="text-[10px] text-slate-500 mt-0.5">双重账号确认 + 阳光履约</div>
            </div>
          </div>

          {/* Main PRD Navigation Tabs */}
          <div className="mt-8 flex flex-wrap gap-2 border-t border-[#2D3142] pt-4">
            {[
              { id: 'active_member', label: '👑 已开通DXT会员前端展示规范 (新增设计)', icon: Award },
              { id: 'overview', label: '1. 项目背景与设计原则', icon: Layers },
              { id: 'matrix', label: '2. 商品矩阵与资费定义', icon: Gift },
              { id: 'features', label: '3. 核心功能与页面交互规范', icon: Smartphone },
              { id: 'flow', label: '4. 完整业务履约与签约链路', icon: ArrowRight },
              { id: 'compliance', label: '5. 合规退订与风控规范', icon: ShieldCheck },
              { id: 'metrics', label: '6. 数据指标与埋点体系', icon: BarChart3 },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-[#FE2C55] text-white shadow-md shadow-[#FE2C55]/30 ring-1 ring-[#FE2C55]/60'
                      : 'bg-[#1F2231] text-slate-300 hover:bg-[#252836] hover:text-white border border-[#2D3142]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Document Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">

        {/* SECTION: ACTIVE MEMBER DISPLAY SPEC (已开通DXT会员前端展示规范) */}
        {activeSection === 'active_member' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header Highlight Card */}
            <div className="bg-gradient-to-r from-amber-950/40 via-[#1C1F2E] to-blue-950/30 p-6 rounded-2xl border border-amber-500/30 shadow-lg space-y-4">
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Crown className="w-4 h-4 fill-amber-400" />
                <span>核心设计专题 · 已开通DXT会员前端展示与交互设计规范</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                如何设计已开通DXT会员的前端体验：从「销售获客」到「履约感知与高频促活」
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                用户完成首月0.01元或1.99元签约代扣后，前端核心目标发生根本性转移：不再向用户重复推销购买按钮，而是建立强大的<strong className="text-amber-300">身份尊荣感</strong>、透明的<strong className="text-emerald-400">履约与省钱感知（ROI）</strong>、直达闭环的<strong className="text-blue-400">权益核销路径（去充值立减）</strong>，以及让用户信赖的<strong className="text-slate-300">续费管理通道</strong>。
              </p>
            </div>

            {/* 核心对比矩阵 */}
            <div className="bg-[#161823] p-6 rounded-2xl border border-[#2D3142] shadow-sm space-y-4">
              <h3 className="text-base font-black text-white flex items-center space-x-2">
                <span className="w-2 h-4 bg-amber-500 rounded-full inline-block" />
                <span>一、新客未开通态 VS 已开通DXT会员态 全维度对比矩阵</span>
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#1F2231] text-slate-300 border-b border-[#2D3142]">
                      <th className="py-3 px-3 w-28">界面模块</th>
                      <th className="py-3 px-4 w-1/3 text-rose-300">未开通用户视角 (新客拉新态)</th>
                      <th className="py-3 px-4 w-1/3 text-amber-300">已开通DXT会员视角 (履约促活态)</th>
                      <th className="py-3 px-3 text-slate-400">产品设计核心诉求</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2D3142] text-slate-300">
                    <tr>
                      <td className="py-3 px-3 font-bold text-white">顶部Hero标题</td>
                      <td className="py-3 px-4 text-slate-400">DXT通信充值会员 · 充值会员享特权 | 连续包月更省钱</td>
                      <td className="py-3 px-4 text-amber-200 font-bold">DXT通信充值会员 · 充值会员享特权 | 连续包月更省钱 (三态保持一致)</td>
                      <td className="py-3 px-3 text-slate-400">统一品牌心智，由下方身份卡片区分履约状态</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold text-white">会员身份看板</td>
                      <td className="py-3 px-4 text-slate-500">无（直接展示诱导购卡）</td>
                      <td className="py-3 px-4 text-slate-200">
                        <strong className="text-amber-300">尊贵黑金卡片</strong>：显示手机号脱敏、履约中状态、本月已省¥52.00看板、下期扣款日、续费管理入口
                      </td>
                      <td className="py-3 px-3 text-slate-400">超高Perceived ROI，降低退订流失率</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold text-white">券1 (话费直减)</td>
                      <td className="py-3 px-4 text-slate-400">标贴【每月必得】，按钮【立即领取】</td>
                      <td className="py-3 px-4 text-emerald-300">
                        标贴【本月已生效】，按钮<strong>【去充值立减】</strong>
                      </td>
                      <td className="py-3 px-3 text-slate-400">引导直接前往充值中心核销，创造业务复购</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold text-white">券2 (电商神券)</td>
                      <td className="py-3 px-4 text-slate-400">单券展示5~50元盲盒，按钮【立即领取】</td>
                      <td className="py-3 px-4 text-amber-300">
                        标贴【已发放到账】，展示匹配的券（新客50元/老客99-5），按钮<strong>【去抖音使用】</strong>
                      </td>
                      <td className="py-3 px-3 text-slate-400">让用户感知大额收益已落袋，去商城结算抵扣</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold text-white">核心CTA区</td>
                      <td className="py-3 px-4 text-rose-300">大红按钮【首月0.01元 次月起1.99元】+ 协议</td>
                      <td className="py-3 px-4 text-orange-300">
                        暖金按钮<strong>【去充话费立减2元现金】</strong> + 【续费管理/退订说明】
                      </td>
                      <td className="py-3 px-3 text-slate-400">杜绝重复购买报错，高频促活充值GMV</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold text-white">权益分割线</td>
                      <td className="py-3 px-4 text-slate-400">—— 开通后可得会员服务 ——</td>
                      <td className="py-3 px-4 text-amber-200 font-bold">—— 您尊享的 3 大专属会员特权 ——</td>
                      <td className="py-3 px-3 text-slate-400">心理暗示：由“待获取”转为“已拥有”</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold text-white">权益1 (话费模块)</td>
                      <td className="py-3 px-4 text-slate-400">小方块标【每月发放 · 次月自动到】</td>
                      <td className="py-3 px-4 text-emerald-300 font-bold">小方块高亮【本月到账✓ · 随时可用】</td>
                      <td className="py-3 px-3 text-slate-400">强化权益即时可用性</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold text-white">权益3 (美团打卡)</td>
                      <td className="py-3 px-4 text-slate-400">提示“请先开通会员再打卡”</td>
                      <td className="py-3 px-4 text-amber-300">直接打卡参与！满3天领10元，满5天领20元</td>
                      <td className="py-3 px-3 text-slate-400">高粘性签到闭环，日活增长利器</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold text-white">底部吸底悬浮栏</td>
                      <td className="py-3 px-4 text-rose-300">常驻吸底购买栏【首月0.01元 立即开通】</td>
                      <td className="py-3 px-4 text-amber-300">
                        <strong>会员服务悬浮栏</strong>：👑 DXT会员尊享中 + 【续费管理】+【去充值立减】
                      </td>
                      <td className="py-3 px-3 text-slate-400">无论滑到何处，充值优惠触手可及</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 5大设计落地规范细则 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#161823] p-5 rounded-2xl border border-[#2D3142] space-y-3">
                <div className="flex items-center space-x-2 text-amber-400 text-sm font-bold">
                  <Award className="w-4 h-4" />
                  <span>模块一：尊贵黑金身份牌 (VIP Digital Crest)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  采用深空黑金渐变底色，搭配微光金色边框与立体皇冠徽标。左侧呈现绑定充值账户（185****0637）与“黄金会员”标签；右上角常驻“会员生效中”动态小绿标；底部提供三列数据面板：<br/>
                  • <strong>本月已省 ¥52.00</strong>（心理账户感知收益）；<br/>
                  • <strong>待使用好券 2 张</strong>（督促核销）；<br/>
                  • <strong>下期续约日 04-01 (1.99元)</strong>（透明无欺瞒）。
                </p>
              </div>

              <div className="bg-[#161823] p-5 rounded-2xl border border-[#2D3142] space-y-3">
                <div className="flex items-center space-x-2 text-blue-400 text-sm font-bold">
                  <Ticket className="w-4 h-4" />
                  <span>模块二：双券待使用态与闭环交互</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  • <strong>券1 (2元话费券)</strong>：右侧药丸按钮文案固定为【去充值立减】。用户点击后，Toast 提示“已为您享受2元直减，正在前往充值”，并直接导航至充值中心，充值50元立减为48元。<br/>
                  • <strong>券2 (电商神券)</strong>：根据后端返回用户画像，已锁定展示新人券或专享券，按钮为【去抖音使用】，点击直接拉起抖音卡包或复制券码。
                </p>
              </div>

              <div className="bg-[#161823] p-5 rounded-2xl border border-[#2D3142] space-y-3">
                <div className="flex items-center space-x-2 text-emerald-400 text-sm font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>模块三：阳光续费管理与退订保障机制</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  合规是连续包月业务的生命线。前端在卡片右上角、核心CTA区辅助行、底部悬浮栏三处均设置明显的【续费管理 / 退订说明】入口。<br/>
                  用户点击可一键进入独立管理页，查看签约订单、代扣签约流水号，并随时支持一键取消自动续费。取消后当月权益保留至月底，次月不再扣费。
                </p>
              </div>

              <div className="bg-[#161823] p-5 rounded-2xl border border-[#2D3142] space-y-3">
                <div className="flex items-center space-x-2 text-purple-400 text-sm font-bold">
                  <Clock className="w-4 h-4" />
                  <span>模块四：生命周期扣款提醒与冷静期交互</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  • <strong>扣款前5天 (每月25日)</strong>：身份看板提示“即将续费：下月1.99元”，发送短信与站内信，告知即将续期及取消方法。<br/>
                  • <strong>扣费成功 (次月1日)</strong>：自动更新账单周期，重置当月2元话费券，提示“本月新特权已到账”。<br/>
                  • <strong>扣费失败 (欠费/解约)</strong>：进入7天宽限期，提示“代扣失败，请检查支付方式”，保留基础权益。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 1: OVERVIEW & PRINCIPLES */}
        {activeSection === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#161823] p-6 rounded-2xl border border-[#2D3142] shadow-sm space-y-4">
              <h2 className="text-lg font-black text-white flex items-center space-x-2">
                <span className="w-2.5 h-5 bg-[#FE2C55] rounded-full inline-block" />
                <span>1. 项目背景、业务目标与架构原则</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="bg-[#1F2231] p-4 rounded-xl border border-[#2D3142] space-y-2">
                  <div className="text-xs font-bold text-rose-400 flex items-center space-x-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>业务痛点</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    传统通信充值具有极强的“工具属性”，用户充完即走，复购周期长（30天以上），客群粘性低，平台难以沉淀持续扣费心智与跨品类协同价值。
                  </p>
                </div>

                <div className="bg-[#1F2231] p-4 rounded-xl border border-[#2D3142] space-y-2">
                  <div className="text-xs font-bold text-amber-400 flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>核心破局解法</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    以动信通为纽带，打造“通信直减 + 抖音电商通用券 + 短剧畅看 + 美团生活神券”的复合权益矩阵，借助超低门槛（1.99元起）建立自动续费免密扣款长效心智。
                  </p>
                </div>

                <div className="bg-[#1F2231] p-4 rounded-xl border border-[#2D3142] space-y-2">
                  <div className="text-xs font-bold text-emerald-400 flex items-center space-x-1">
                    <Target className="w-3.5 h-3.5" />
                    <span>核心业务目标</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    1. 提升抖音充值中心综合 GMV 与客单转化率；<br/>
                    2. 扩大抖音支付免密自动续费签约用户大盘；<br/>
                    3. 为抖音商城及本地生活高频导流高价值跨端订单。
                  </p>
                </div>
              </div>

              {/* 三大关键架构原则 */}
              <div className="pt-4 border-t border-[#2D3142] space-y-3">
                <h3 className="text-sm font-extrabold text-slate-200">三大核心交互与系统架构原则</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="bg-[#1a1d2d] p-3.5 rounded-xl border border-purple-500/30">
                    <div className="font-black text-purple-300 mb-1">原则一：同一用户多权益可并存</div>
                    <div className="text-slate-400 leading-relaxed">
                      彻底打破“单个账号仅能购买一个会员”的桎梏。同一用户可同时订购 2 款、3 款不同套餐（如同时拥有黑金卡与充值特惠卡），权益独立叠加，各商品独立核算自动续费周期与到期时间。
                    </div>
                  </div>
                  <div className="bg-[#1a1d2d] p-3.5 rounded-xl border border-blue-500/30">
                    <div className="font-black text-blue-300 mb-1">原则二：货架与会员状态彻底解耦</div>
                    <div className="text-slate-400 leading-relaxed">
                      套餐列表作为标准的抖音电商店铺货架，永远全量客观展示商品信息。无论用户是否订购，列表卡片绝不显示“使用中”字样，保障随时可加购不同档位套餐。
                    </div>
                  </div>
                  <div className="bg-[#1a1d2d] p-3.5 rounded-xl border border-emerald-500/30">
                    <div className="font-black text-emerald-300 mb-1">原则三：两级页面清爽流转</div>
                    <div className="text-slate-400 leading-relaxed">
                      一级主页面上部仅展示已生效商品的卡片概览与生效截止时间；点击任意卡片下钻跳转至二级【全部权益】明细页，展示清晰的已发放权益卡片，兼顾简洁度与深度。
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: SKU MATRIX */}
        {activeSection === 'matrix' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#161823] p-6 rounded-2xl border border-[#2D3142] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-white flex items-center space-x-2">
                  <span className="w-2.5 h-5 bg-[#FE2C55] rounded-full inline-block" />
                  <span>2. 商品梯度矩阵与资费定义 (SKU Matrix)</span>
                </h2>
                <span className="text-xs text-slate-400">配置 1.99元标准连续包月特惠 SKU，支持自动续费连续包月</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#1F2231] text-slate-300 border-b border-[#2D3142]">
                      <th className="py-3 px-3 font-bold">档位名称</th>
                      <th className="py-3 px-3 font-bold">首月连续包月价</th>
                      <th className="py-3 px-3 font-bold">次月续费价</th>
                      <th className="py-3 px-3 font-bold">标称价值</th>
                      <th className="py-3 px-4 font-bold">包含核心权益明细</th>
                      <th className="py-3 px-3 font-bold">主推目标客群</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2D3142] text-slate-300">
                    {MEMBERSHIP_SKUS.map((sku) => (
                      <tr key={sku.id} className="hover:bg-[#1F2231]/50 transition-colors">
                        <td className="py-3 px-3">
                          <div className="font-extrabold text-white flex items-center space-x-1.5">
                            <span>{sku.name}</span>
                            <span className="bg-[#FE2C55]/20 text-[#FE2C55] text-[10px] px-1.5 py-0.2 rounded font-bold">
                              {sku.badge}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-500 mt-0.5">{sku.tierNumber}</div>
                        </td>
                        <td className="py-3 px-3 font-black text-amber-400 text-sm">
                          ¥{sku.price.toFixed(2)}
                        </td>
                        <td className="py-3 px-3 text-slate-300">
                          ¥{sku.price.toFixed(2)}/月 (自动代扣)
                        </td>
                        <td className="py-3 px-3 text-emerald-400 font-bold">
                          ¥{sku.nominalValue.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 space-y-1">
                          {sku.benefits.map((b) => (
                            <div key={b.id} className="flex items-center space-x-1.5 text-[11px]">
                              <span className="text-[#00B578] font-bold">✓</span>
                              <span className="text-white font-medium">{b.title}</span>
                              <span className="text-[10px] text-slate-400 bg-slate-800 px-1 rounded">{b.badge}</span>
                            </div>
                          ))}
                        </td>
                        <td className="py-3 px-3 text-slate-400 text-[11px]">
                          {sku.id === 'tier_0' && '话费充值敏感型用户，首单即立省2元'}
                          {sku.id === 'tier_1' && '外卖高频与网购人群，强调全方位生活券包'}
                          {sku.id === 'tier_2' && '短剧追更人群与泛年轻网购人群（爆款主推）'}
                          {sku.id === 'tier_3' && '高净值用户，追求短剧整月畅看与大额外卖立减'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 资费规则说明 */}
              <div className="bg-[#1F2231] p-4 rounded-xl border border-[#2D3142] text-xs text-slate-300 space-y-1.5 mt-2">
                <div className="font-bold text-amber-400 flex items-center space-x-1.5">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>扣款与多商品计费规则</span>
                </div>
                <div>1. <strong>扣款渠道：</strong>全链路统一接入抖音支付（极速免密扣款），由第三方服务商动信通作为商户主体发起代扣；</div>
                <div>2. <strong>代扣时机：</strong>每个订购商品在生效截止日前 24 小时内由系统自动发起续费代扣，扣款成功后生效期顺延 1 个自然月（30天）；</div>
                <div>3. <strong>多商品并行计费：</strong>若用户在 10月8日 订购黑金卡，10月15日 加购影音卡，系统分别在各自到期日前 24 小时扣款，彼此账单与权益完全独立。</div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: FEATURES & INTERACTION SPECIFICATIONS */}
        {activeSection === 'features' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#161823] p-6 rounded-2xl border border-[#2D3142] shadow-sm space-y-5">
              <h2 className="text-lg font-black text-white flex items-center space-x-2">
                <span className="w-2.5 h-5 bg-[#FE2C55] rounded-full inline-block" />
                <span>3. 核心功能与页面交互规范 (UI/UX Specs)</span>
              </h2>

              {/* 模块一：小程序主页 */}
              <div className="bg-[#1F2231] p-4 rounded-xl border border-[#2D3142] space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-amber-300 flex items-center space-x-2">
                    <span className="w-1.5 h-4 bg-amber-400 rounded-xs inline-block" />
                    <span>3.1 【小程序主页面】服务账号区与多生效卡片规范</span>
                  </h3>
                  <span className="text-[11px] text-slate-400">一级页面 · 顶部区域</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
                  <div className="bg-[#161823] p-3 rounded-lg border border-[#2D3142] space-y-1.5">
                    <div className="font-bold text-white">① 状态标识胶囊联动：</div>
                    <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                      <li>未开通状态：展示灰色胶囊「未开通会员」；</li>
                      <li>已开通 1 款状态：展示绿色脉冲胶囊「权益生效中」；</li>
                      <li>已开通 2 款及以上：展示绿色胶囊「权益生效中 · 共 2 款」或「共 3 款」。</li>
                    </ul>
                  </div>

                  <div className="bg-[#161823] p-3 rounded-lg border border-[#2D3142] space-y-1.5">
                    <div className="font-bold text-white">② 多商品生效卡片并排平铺：</div>
                    <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                      <li>当用户已购买 N 款产品时，按订购先后平铺展示 N 张白底圆角卡片；</li>
                      <li>每张卡片展示：商品名称 + 绿色「✓ 已生效」+ 生效截止时间；</li>
                      <li>卡片右侧配有「ChevronRight」箭头，点击触发跳转至该商品的二级明细页。</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 模块二：权益套餐列表货架 */}
              <div className="bg-[#1F2231] p-4 rounded-xl border border-[#2D3142] space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-blue-300 flex items-center space-x-2">
                    <span className="w-1.5 h-4 bg-blue-400 rounded-xs inline-block" />
                    <span>3.2 【小程序主页面】权益套餐列表货架规范 (解耦展示)</span>
                  </h3>
                  <span className="text-[11px] text-slate-400">一级页面 · 中部货架</span>
                </div>

                <div className="text-xs text-slate-300 space-y-2">
                  <p>
                    <strong>【绝对解耦原则】：</strong>该区域为抖音店铺 SKU 商品列表，代表在售货架。任何情况下<strong>严禁出现“使用中”或置灰不可购买遮罩</strong>。即使已订购黑金卡，用户仍可在此处点击任意套餐（如加购生活特惠卡或加购充值会员），支持随时点击「开通」发起新一笔订阅提单。
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                    <div className="bg-[#161823] p-3 rounded-lg border border-[#2D3142] space-y-1">
                      <div className="font-bold text-white">① 商品专属精致 Logo (Brand Logo)：</div>
                      <div className="text-[11px] text-slate-400 leading-relaxed">
                        • 每张卡片左上角配置专属品牌 Logo（44×44px 圆角微标），按档位定制视觉（充值金币手机/生活餐饮美食/影音短剧VIP/黑金奢华皇冠）；<br/>
                        • 右侧排布商品全称、档位标签与核心卖点副标，结构紧凑，一屏尽览。
                      </div>
                    </div>
                    <div className="bg-[#161823] p-3 rounded-lg border border-[#2D3142] space-y-1">
                      <div className="font-bold text-white">② 卡片主体信息与资费：</div>
                      <div className="text-[11px] text-slate-400 leading-relaxed">
                        • 商品全称与档位标签，右侧聚合大字现价（¥1.99/月）、连续包月标识与省钱角标（如省52元）；<br/>
                        • 权益列表采用彩色业务专属图标（话费/电商/外卖/短剧），分行规整排布。
                      </div>
                    </div>
                    <div className="bg-[#161823] p-3 rounded-lg border border-[#2D3142] space-y-1">
                      <div className="font-bold text-white">③ 展开交互与开通 CTA：</div>
                      <div className="text-[11px] text-slate-400 leading-relaxed">
                        • 左侧轻量「查看全部权益明细」胶囊切换折叠状态；<br/>
                        • 右侧配置红橙渐变高点击率「立即开通」圆角 CTA 按钮；<br/>
                        • 点击卡片整体支持高亮选中态（金色光环外圈与选中浮标）。
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 模块三：二级权益明细页 */}
              <div className="bg-[#1F2231] p-4 rounded-xl border border-[#2D3142] space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-emerald-300 flex items-center space-x-2">
                    <span className="w-1.5 h-4 bg-emerald-400 rounded-xs inline-block" />
                    <span>3.3 【权益明细详情页】规范 (复刻截图 2 规范)</span>
                  </h3>
                  <span className="text-[11px] text-slate-400">二级页面 · 专属下钻页</span>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <p>
                    点击生效卡片后全屏滑动进入该页。该页专门用于展示该权益商品已下发到用户账户的全部权益明细：
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div className="bg-[#161823] p-3 rounded-lg border border-[#2D3142] space-y-1">
                      <div className="font-bold text-white">① 顶部所属商品卡片</div>
                      <div className="text-[11px] text-slate-400">
                        仅展示商品全称（如动信通·黑金尊享月卡）、绿色「✓ 已生效」标签及价格标签（如 ¥29.00/月），已精简移除手机号与到期时间冗余信息。
                      </div>
                    </div>
                    <div className="bg-[#161823] p-3 rounded-lg border border-[#2D3142] space-y-1">
                      <div className="font-bold text-white">②「全部权益」卡片式列表</div>
                      <div className="text-[11px] text-slate-400">
                        白底大圆角卡片，左侧配专属色块图标（粉底话费立减框、橙底电商袋、紫底短剧胶卷），右侧统一使用绿色药丸「✓ 已发放」。
                      </div>
                    </div>
                    <div className="bg-[#161823] p-3 rounded-lg border border-[#2D3142] space-y-1">
                      <div className="font-bold text-white">③ 双向标准回退</div>
                      <div className="text-[11px] text-slate-400">
                        左上角配备符合小程序原生体验的「&lt;」返回箭头，点击随时无缝回退到小程序主页面（套餐货架）。
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SECTION 4: FULL FLOW */}
        {activeSection === 'flow' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#161823] p-6 rounded-2xl border border-[#2D3142] shadow-sm space-y-5">
              <h2 className="text-lg font-black text-white flex items-center space-x-2">
                <span className="w-2.5 h-5 bg-[#FE2C55] rounded-full inline-block" />
                <span>4. 完整业务闭环链路 (Transaction & Fulfillment)</span>
              </h2>

              <div className="relative border-l-2 border-[#FE2C55]/40 ml-4 pl-6 space-y-6 text-xs">
                
                {/* Step 1 */}
                <div className="relative">
                  <span className="absolute -left-[33px] top-0 w-6 h-6 rounded-full bg-[#FE2C55] text-white font-black flex items-center justify-center text-xs">
                    1
                  </span>
                  <div className="bg-[#1F2231] p-4 rounded-xl border border-[#2D3142] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-white text-sm">小程序选购与立即开通</span>
                      <span className="text-amber-400 text-[11px] font-bold">端内触达</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      用户从抖音充值中心或直播间小黄车进入【动信通权益小程序】。在权益套餐列表中浏览各档位（1.99元~29元），点击目标商品的【立即开通】按钮，系统携带选中的 `sku_id` 进入提单页。
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <span className="absolute -left-[33px] top-0 w-6 h-6 rounded-full bg-[#FE2C55] text-white font-black flex items-center justify-center text-xs">
                    2
                  </span>
                  <div className="bg-[#1F2231] p-4 rounded-xl border border-[#2D3142] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-white text-sm">确认订单提单页 (Checkout)</span>
                      <span className="text-blue-400 text-[11px] font-bold">电商提单标准组件</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      展示服务充值手机号输入框、服务周期（连续包月）、动信通商户名称、隐私保护开关及抖音支付极速免密扣款选择。用户点击【提交订单】。
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <span className="absolute -left-[33px] top-0 w-6 h-6 rounded-full bg-[#FE2C55] text-white font-black flex items-center justify-center text-xs">
                    3
                  </span>
                  <div className="bg-[#1F2231] p-4 rounded-xl border border-[#2D3142] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-white text-sm">双重弹窗确认：服务协议与账号防误充确认</span>
                      <span className="text-purple-400 text-[11px] font-bold">合规签署与防客诉</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      ① 唤起半屏弹窗展示《动信通会员服务协议》与《自动续费代扣授权》；<br/>
                      ② 用户点击同意后，弹出居中【账号确认弹窗】，加粗醒目提示用户核对充值号码，防止误将权益充入他人错号；确认无误后唤起抖音支付免密完成签约与首期扣款。
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative">
                  <span className="absolute -left-[33px] top-0 w-6 h-6 rounded-full bg-[#FE2C55] text-white font-black flex items-center justify-center text-xs">
                    4
                  </span>
                  <div className="bg-[#1F2231] p-4 rounded-xl border border-[#2D3142] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-white text-sm">动信通自动续费开通成功反馈与履约生效</span>
                      <span className="text-emerald-400 text-[11px] font-bold">闭环完成</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      弹出“动信通自动续费开通成功”绿色反馈弹窗，明示签约商户与下个扣款日。用户点击【我知道了】：<br/>
                      • 状态即刻生效：该商品追加进用户已购权益列表，可立即跳转订单详情页；<br/>
                      • 权益自动下发：话费直减券充值即抵，电商通用券下发至抖音卡券包，短剧权益自动绑定该手机号。
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: COMPLIANCE */}
        {activeSection === 'compliance' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#161823] p-6 rounded-2xl border border-[#2D3142] shadow-sm space-y-4">
              <h2 className="text-lg font-black text-white flex items-center space-x-2">
                <span className="w-2.5 h-5 bg-[#FE2C55] rounded-full inline-block" />
                <span>5. 合规要求、退订机制与风控保障 (Compliance & Safety)</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                <div className="bg-[#1F2231] p-4 rounded-xl border border-[#2D3142] space-y-2.5">
                  <div className="font-bold text-amber-400 flex items-center space-x-1.5">
                    <Bell className="w-4 h-4" />
                    <span>工信部与平台扣款前 5 天强提醒规范</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    在每次连续包月自动代扣生效日前的 <strong>第 5 天（即生效第 25 天）</strong>，动信通系统联合抖音官方支付服务，必须通过【抖音支付服务号 PUSH + 注册手机号短信】双通道向用户发送代扣前提醒。明确告知商品名称、扣款金额、扣款时间及快捷取消途径。
                  </p>
                </div>

                <div className="bg-[#1F2231] p-4 rounded-xl border border-[#2D3142] space-y-2.5">
                  <div className="font-bold text-emerald-400 flex items-center space-x-1.5">
                    <RotateCcw className="w-4 h-4" />
                    <span>随时可退订与透明取消通道</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    用户可随时在「抖音-我-钱包-支付设置-自动扣费管理」或在小程序内客服入口申请取消自动续费。取消后，当月已扣费周期内权益继续享受至自然到期，次月起不再产生任何代扣费用，无捆绑销售与任何隐形违约金。
                  </p>
                </div>

                <div className="bg-[#1F2231] p-4 rounded-xl border border-[#2D3142] space-y-2.5">
                  <div className="font-bold text-blue-400 flex items-center space-x-1.5">
                    <Lock className="w-4 h-4" />
                    <span>资金安全与免密代扣限额</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    免密签约严格受限于最高单笔 29.00 元的限额范围。若单卡单月代扣超过限定额度或出现异地黑灰产盗刷风险特征，自动触发风控降级为短信验证码人工核验。
                  </p>
                </div>

                <div className="bg-[#1F2231] p-4 rounded-xl border border-[#2D3142] space-y-2.5">
                  <div className="font-bold text-purple-400 flex items-center space-x-1.5">
                    <HelpCircle className="w-4 h-4" />
                    <span>客服兜底与客诉快速退款链路</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    针对“未成年人误触开通”、“老年人不知情扣费”等高敏感投诉客群，建立 24 小时快速工单绿色通道。经核实当月完全未使用任何下发权益的，支持全额秒级原路退还代扣资费。
                  </p>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* SECTION 6: METRICS */}
        {activeSection === 'metrics' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#161823] p-6 rounded-2xl border border-[#2D3142] shadow-sm space-y-4">
              <h2 className="text-lg font-black text-white flex items-center space-x-2">
                <span className="w-2.5 h-5 bg-[#FE2C55] rounded-full inline-block" />
                <span>6. 数据考核指标与核心埋点体系 (Metrics & Tracking)</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-[#1F2231] p-4 rounded-xl border border-[#2D3142] space-y-2">
                  <div className="font-bold text-rose-400 text-sm">规模与转化指标</div>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                    <li>小程序访问 UV & PV</li>
                    <li>套餐货架各 SKU 点击开通率</li>
                    <li>提单页转化签约成功率 (目标 ≥ 45%)</li>
                    <li>多商品并行购买渗透率 (用户持有多卡占比)</li>
                  </ul>
                </div>

                <div className="bg-[#1F2231] p-4 rounded-xl border border-[#2D3142] space-y-2">
                  <div className="font-bold text-amber-400 text-sm">留存与续费指标</div>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                    <li>次月自动续费成功率 (目标 ≥ 68%)</li>
                    <li>连续 3 个月在保续费率</li>
                    <li>前5天提醒后主动取消率 (健康线 ≤ 8%)</li>
                    <li>用户客诉退款率 (严控 ≤ 0.2%)</li>
                  </ul>
                </div>

                <div className="bg-[#1F2231] p-4 rounded-xl border border-[#2D3142] space-y-2">
                  <div className="font-bold text-emerald-400 text-sm">生态赋能指标</div>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                    <li>话费直减券充值核销率 (目标 ≥ 80%)</li>
                    <li>抖音商城通用券使用 GMV 带动比</li>
                    <li>短剧月卡活跃追更时长与完播率</li>
                    <li>美团生活服务神券到店核销率</li>
                  </ul>
                </div>
              </div>

              {/* 关键事件埋点表 */}
              <div className="pt-2">
                <div className="text-xs font-extrabold text-slate-200 mb-2">核心埋点事件字典 (Event Tracking Schema)</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px] border-collapse">
                    <thead>
                      <tr className="bg-[#1F2231] text-slate-300 border-b border-[#2D3142]">
                        <th className="py-2.5 px-3">事件代码 (Event ID)</th>
                        <th className="py-2.5 px-3">事件名称</th>
                        <th className="py-2.5 px-3">触发时机</th>
                        <th className="py-2.5 px-4">上报核心参数 (Parameters)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2D3142] text-slate-400">
                      <tr>
                        <td className="py-2 px-3 font-mono text-white">vip_center_page_view</td>
                        <td className="py-2 px-3 text-slate-200">小程序主页曝光</td>
                        <td className="py-2 px-3">小程序加载完成</td>
                        <td className="py-2 px-4 font-mono">user_status, active_sku_count, from_source</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-mono text-white">sku_card_click</td>
                        <td className="py-2 px-3 text-slate-200">点击套餐立即开通</td>
                        <td className="py-2 px-3">用户点击任一商品开通按钮</td>
                        <td className="py-2 px-4 font-mono">sku_id, sku_price, tier_number</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-mono text-white">active_card_click</td>
                        <td className="py-2 px-3 text-slate-200">点击已生效卡片</td>
                        <td className="py-2 px-3">进入二级【全部权益】明细页</td>
                        <td className="py-2 px-4 font-mono">sku_id, expiry_date</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-mono text-white">order_submit_click</td>
                        <td className="py-2 px-3 text-slate-200">提单页提交订单</td>
                        <td className="py-2 px-3">用户在提单页点击提交订单</td>
                        <td className="py-2 px-4 font-mono">sku_id, phone_masked, is_privacy_protected</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-mono text-white">subscription_sign_success</td>
                        <td className="py-2 px-3 text-slate-200">连续包月签约扣款成功</td>
                        <td className="py-2 px-3">抖音支付回调代扣签约成功</td>
                        <td className="py-2 px-4 font-mono">sku_id, order_id, sign_no, pay_amount</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
