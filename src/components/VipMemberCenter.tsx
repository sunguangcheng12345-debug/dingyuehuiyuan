import React, { useState, useMemo } from 'react';
import { SimUserStatus, MembershipSku, MembershipSkuId } from '../types';
import { MEMBERSHIP_SKUS, getSkuById } from '../data/membershipSkus';
import { BenefitDetailPage } from './BenefitDetailPage';
import { 
  Crown, 
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Check,
  Smartphone,
  MessageSquareQuote,
  ShieldCheck,
  Sparkles,
  Clock
} from 'lucide-react';

interface VipMemberCenterProps {
  userStatus: SimUserStatus;
  subscribedSkuId?: MembershipSkuId | null;
  subscribedSkuIds?: MembershipSkuId[];
  onBackToRecharge: () => void;
  onOpenUnsubscribe?: () => void;
  onOpenCheckout: (sku: MembershipSku) => void;
  onGoToRenewalManagement?: () => void;
  userPhone?: string;
  onSelectSubscribedSku?: (skuId: MembershipSkuId) => void;
}

export const VipMemberCenter: React.FC<VipMemberCenterProps> = ({
  userStatus,
  subscribedSkuId = 'tier_0',
  subscribedSkuIds,
  onBackToRecharge,
  onOpenUnsubscribe,
  onOpenCheckout,
  onGoToRenewalManagement,
  userPhone = '18518920637',
}) => {
  const isMember = userStatus === 'active_member' || userStatus === 'pending_renewal';
  
  // 支持多款权益产品生效判定（兼容单值与多值）
  const activeSkuIds: MembershipSkuId[] = useMemo(() => {
    if (!isMember) return [];
    if (subscribedSkuIds && subscribedSkuIds.length > 0) {
      return subscribedSkuIds;
    }
    if (subscribedSkuId) {
      return [subscribedSkuId];
    }
    return [];
  }, [isMember, subscribedSkuIds, subscribedSkuId]);

  const activeSubscribedSkus = useMemo(() => {
    return activeSkuIds.map(id => getSkuById(id)).filter(Boolean) as MembershipSku[];
  }, [activeSkuIds]);

  // 计算各生效权益产品的截止时间（模拟不同时期订购的不同到期日）
  const getExpiryDateForSku = (skuId: MembershipSkuId, index: number) => {
    const now = new Date();
    const addedDays = 30 + (index % 4) * 7;
    const expiry = new Date(now.getTime() + addedDays * 24 * 60 * 60 * 1000);
    const year = expiry.getFullYear();
    const month = String(expiry.getMonth() + 1).padStart(2, '0');
    const day = String(expiry.getDate()).padStart(2, '0');
    return `${year}-${month}-${day} 23:59:59`;
  };

  // 当前选中的商品卡片（默认不高亮，用户点击哪个哪个高亮）
  const [selectedSkuId, setSelectedSkuId] = useState<MembershipSkuId | null>(null);
  // 单独记录展开全部权益明细的商品（仅通过卡片上的下拉小按钮触发）
  const [expandedSkuMap, setExpandedSkuMap] = useState<Record<string, boolean>>({});
  // 点击某个已生效权益卡片时，跳转至权益明细详情页 (截图2)
  const [viewingDetailSku, setViewingDetailSku] = useState<{ sku: MembershipSku; expiryDateStr: string } | null>(null);

  const toggleExpandSku = (skuId: MembershipSkuId, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSkuMap(prev => ({ ...prev, [skuId]: !prev[skuId] }));
  };

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // 格式化手机号（脱敏显示，例如 185****0637）
  const formatPhone = (phone: string) => {
    if (!phone || phone.length < 11) return '185****0637';
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  };

  const displayPhone = formatPhone(userPhone);

  // 若处于查看具体权益明细页，展示详情页组件（对应截图2）
  if (viewingDetailSku) {
    return (
      <BenefitDetailPage
        sku={viewingDetailSku.sku}
        expiryDateStr={viewingDetailSku.expiryDateStr}
        userPhone={userPhone}
        onBack={() => setViewingDetailSku(null)}
      />
    );
  }

  return (
    <div className="bg-[#F2F4F7] text-slate-900 min-h-full flex flex-col justify-between font-sans select-none relative animate-fadeIn pb-10">
      <div>
        {/* ========================================================= */}
        {/* 顶部导航栏 (复刻截图：Logo + 动信通权益小程序 + 反馈 + ••• ✕) */}
        {/* ========================================================= */}
        <div className="bg-white px-3 py-2.5 flex items-center justify-between sticky top-0 z-30 border-b border-slate-200/60 shadow-2xs">
          {/* 左侧：返回箭头 + 圆形动信通 Logo + 标题 */}
          <div className="flex items-center space-x-1.5">
            <button 
              onClick={onBackToRecharge}
              className="p-1 -ml-1 rounded-full text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="返回充值首页"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            
            {/* 动信通专属圆形 Logo */}
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#1E6FD9] via-[#0088FF] to-[#6BC5FF] p-0.5 flex items-center justify-center shadow-xs shrink-0">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <Smartphone className="w-3.5 h-3.5 text-[#007AFF] stroke-[2.5]" />
              </div>
            </div>

            <span className="font-extrabold text-[15px] tracking-tight text-slate-900">
              动信通权益小程序
            </span>
          </div>

          {/* 右侧：反馈胶囊按钮 + 小程序标准胶囊按钮 (••• ✕) */}
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => setShowFeedbackModal(true)}
              className="bg-[#F2F4F7] hover:bg-slate-200 active:scale-95 text-slate-700 text-xs px-2.5 py-1 rounded-full font-medium transition-all"
            >
              反馈
            </button>

            {/* 小程序经典胶囊控件 */}
            <div className="bg-white border border-slate-200 rounded-full px-2 py-1 flex items-center space-x-2 shadow-2xs text-slate-800">
              <button 
                onClick={() => showToast('小程序功能已就绪')}
                className="hover:text-black font-extrabold tracking-widest text-xs scale-90"
              >
                •••
              </button>
              <span className="w-[1px] h-3 bg-slate-200" />
              <button 
                onClick={onBackToRecharge}
                className="hover:text-black text-xs font-bold"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <div className="p-3.5 space-y-4">

          {/* ========================================================= */}
          {/* 【上部】用户已开通的会员与权益，并展示手机号码 */}
          {/* ========================================================= */}
          <div className="space-y-3">
            {/* 用户账号与会员状态条卡片 */}
            <div className="bg-white rounded-2xl p-3.5 shadow-2xs border border-slate-100/90 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-full bg-blue-50 text-[#0066CC] flex items-center justify-center shrink-0 border border-blue-100">
                  <Smartphone className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[11px] font-bold text-slate-400">服务手机号</span>
                    <span className="text-xs font-black text-slate-800 tracking-wide">{displayPhone}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {isMember ? '权益每月自动发放至此账号' : '开通会员后权益自动下发至此手机号'}
                  </div>
                </div>
              </div>

              {/* 右侧会员状态标 */}
              <div>
                {isMember && activeSubscribedSkus.length > 0 ? (
                  <span className="bg-[#E6F8F0] text-[#00B578] text-xs font-black px-2.5 py-1 rounded-full flex items-center space-x-1 border border-emerald-200/50 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00B578] animate-pulse" />
                    <span>
                      权益生效中{activeSubscribedSkus.length > 1 ? ` · 共${activeSubscribedSkus.length}款` : ''}
                    </span>
                  </span>
                ) : (
                  <span className="bg-slate-100 text-slate-500 text-xs font-bold px-2.5 py-1 rounded-full">
                    未开通会员
                  </span>
                )}
              </div>
            </div>

            {/* 如果已开通会员：展示当前生效期内的权益商品名称与生效截止时间（支持1个、2个、3个等多款商品，点击进入权益明细） */}
            {isMember && activeSubscribedSkus.length > 0 && (
              <div className="space-y-2">
                {activeSubscribedSkus.map((sku, idx) => {
                  const expiry = getExpiryDateForSku(sku.id, idx);
                  return (
                    <div 
                      key={sku.id}
                      onClick={() => setViewingDetailSku({ sku, expiryDateStr: expiry })}
                      className="bg-white rounded-2xl p-3.5 shadow-2xs border border-slate-100/90 hover:border-emerald-200/90 active:scale-[0.99] flex items-center justify-between cursor-pointer transition-all group"
                      title="点击查看具体权益明细"
                    >
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-black text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                            {sku.name}
                          </span>
                          <span className="bg-[#E6F8F0] text-[#00B578] text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-0.5 shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>已生效</span>
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center space-x-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>生效截止时间：{expiry}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-0.5 text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0 ml-2 pl-1">
                        <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ========================================================= */}
          {/* 【中部】商品列表 (抖音店铺 SKU 挂钩商品 List，动态渲染) */}
          {/* ========================================================= */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between px-1">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>权益套餐列表</span>
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  官方保障 · 随时可退
                </p>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">共 {MEMBERSHIP_SKUS.length} 款套餐</span>
            </div>

            {/* 动态遍历商品列表 (极简设计，紧凑优雅，一屏尽览) */}
            <div className="space-y-2.5">
              {MEMBERSHIP_SKUS.map((sku) => {
                const isSelected = selectedSkuId === sku.id;
                const isExpanded = Boolean(expandedSkuMap[sku.id]);
                
                // 完整权益数据映射（全量文字）
                const allBenefitRows = 
                  sku.id === 'tier_0' ? [
                    { label: '话费直减', desc: '每月充值自动抵扣 2.00元（满30元可用，无门槛直减）' },
                    { label: '电商特权', desc: '每月赠送 2.00元 抖音商城全场通用券' },
                    { label: '安心保障', desc: '扣款前5天消息盒子提醒，端内随时可一键退订' },
                  ] :
                  sku.id === 'tier_1' ? [
                    { label: '电商特权', desc: '每月赠送 10.00元 抖音商城通用券包（多张立减）' },
                    { label: '美团神券', desc: '每月享 50.00元 美团外卖与神券红包组合' },
                    { label: '生活特权', desc: '涵盖电影打折、打车券等多种月度生活特权' },
                  ] :
                  sku.id === 'tier_2' ? [
                    { label: '电商特权', desc: '每月赠送 13.00元 抖音商城专享购物立减券' },
                    { label: '短剧畅看', desc: '赠送 20.00元 抖音短剧双周VIP免广告畅看权益' },
                    { label: '娱乐礼包', desc: '每月享 60.00元 美团及休闲娱乐专属抵扣券包' },
                  ] : [
                    { label: '电商特权', desc: '每月赠送 20.00元 抖音商城全品类大额购物券' },
                    { label: '短剧月卡', desc: '短剧整月无限次免费免广告畅看全场热剧' },
                    { label: '餐饮红包', desc: '每月高额美团外卖及到店餐饮现金红包' },
                  ];

                // 折叠时展示前2条，点击下拉按钮展开时展示全部条目
                const displayedBenefits = isExpanded ? allBenefitRows : allBenefitRows.slice(0, 2);

                const monthlySave = 
                  sku.id === 'tier_0' ? '省4元' :
                  sku.id === 'tier_1' ? '省52元' :
                  sku.id === 'tier_2' ? '省74元' : '省99元';

                return (
                  <div 
                    key={sku.id}
                    onClick={() => setSelectedSkuId(sku.id)}
                    className={`rounded-2xl p-3 border cursor-pointer transition-all duration-200 active:scale-[0.99] space-y-2.5 ${
                      isSelected 
                        ? 'bg-gradient-to-r from-[#FFF8EE] via-[#FFF3EC] to-[#FFEFEA] border-amber-400 ring-1 ring-amber-300/70 shadow-xs' 
                        : 'bg-white border-slate-150 hover:border-slate-200 shadow-2xs'
                    }`}
                  >
                    {/* 第一行：商品名称及标签（左） + 价格、连续包月与省钱标签组合（右） */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center space-x-1.5 min-w-0">
                        <span className="text-[13px] font-black text-slate-900 tracking-tight truncate">
                          {sku.name}
                        </span>
                        {sku.badge && (
                          <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full leading-normal shrink-0 ${
                            sku.id === 'tier_0'
                              ? 'bg-gradient-to-r from-[#FF5E1E] to-[#FE2C55] text-white' 
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {sku.badge}
                          </span>
                        )}
                      </div>

                      {/* 价格 + 连续包月 + 省钱标签（整洁聚合在第一行右上角） */}
                      <div className="flex items-baseline space-x-1 shrink-0">
                        <span className="text-xs font-bold text-[#FE2C55]">¥</span>
                        <span className="text-base font-black text-[#FE2C55] tracking-tight leading-none">
                          {sku.price.toFixed(2).replace(/\.00$/, '')}
                        </span>
                        <span className="text-[11px] font-bold text-[#FE2C55]">/月</span>
                        <span className="text-[10px] text-slate-500 font-medium bg-slate-100/90 px-1 py-0.2 rounded leading-tight">
                          连续包月
                        </span>
                        <span className="bg-[#FFE8E8] text-[#FE2C55] font-extrabold text-[10px] px-1.5 py-0.2 rounded leading-tight shrink-0">
                          {monthlySave}
                        </span>
                      </div>
                    </div>

                    {/* 第二行：分行展示的权益 + 独立下拉展开小按钮 + 开通按钮 */}
                    <div className="flex items-start justify-between gap-3 pt-1 border-t border-slate-100/80">
                      {/* 权益列表区：无论折叠或展开，标题与文字始终在同一行起步，消除跳动与断行 */}
                      <div className="space-y-1.5 min-w-0 flex-1">
                        <div className="space-y-1">
                          {displayedBenefits.map((row, idx) => (
                            <div 
                              key={idx} 
                              className="flex items-start space-x-1.5 text-[11px] text-slate-700 leading-snug"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <div className={`min-w-0 flex-1 leading-snug ${
                                isExpanded ? 'whitespace-normal break-words' : 'truncate'
                              }`}>
                                <span className="font-bold text-slate-800">{row.label}：</span>
                                <span className="text-slate-600">{row.desc}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* 专属小下拉按钮：点击触发切换展开/收起全部权益明细 */}
                        <div className="pt-0.5">
                          <button
                            type="button"
                            onClick={(e) => toggleExpandSku(sku.id, e)}
                            className="inline-flex items-center space-x-1 text-[10px] text-slate-600 hover:text-slate-900 bg-slate-100/90 hover:bg-slate-200/80 px-2 py-0.5 rounded-full transition-colors font-medium select-none active:scale-95 border border-slate-200/60"
                          >
                            <span>{isExpanded ? '收起权益明细' : '查看全部权益明细'}</span>
                            {isExpanded ? (
                              <ChevronUp className="w-3 h-3 text-slate-500" />
                            ) : (
                              <ChevronDown className="w-3 h-3 text-slate-500" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* 开通按钮：纯净商品展示与开通入口，与用户是否已开通会员解耦 */}
                      <div className="shrink-0 self-start pt-0.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSkuId(sku.id);
                            onOpenCheckout(sku);
                          }}
                          className="h-6 px-3.5 rounded-full text-[11px] font-black text-white active:scale-95 shadow-2xs transition-all bg-gradient-to-r from-[#FF9800] to-[#FE2C55] hover:brightness-105"
                        >
                          开通
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================================= */}
          {/* 【下部】常见问题 (复刻截图纯白大圆角 FAQ 卡片) */}
          {/* ========================================================= */}
          <div className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-100/90 space-y-3.5">
            {/* 标题 */}
            <div className="flex items-center space-x-1.5">
              <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center text-white text-[10px] font-black shrink-0">
                ?
              </div>
              <h3 className="font-extrabold text-sm text-slate-900">
                常见问题
              </h3>
            </div>

            {/* Q1 & A1 */}
            <div className="space-y-1">
              <div className="text-xs font-extrabold text-slate-900">
                Q: 2元话费券如何使用？
              </div>
              <div className="text-xs text-slate-500 leading-relaxed">
                A: 会员领取后，在充值中心为绑定手机号充值时系统将自动抵扣。
              </div>
            </div>

            {/* Q2 & A2 */}
            <div className="space-y-1 pt-1 border-t border-slate-100">
              <div className="text-xs font-extrabold text-slate-900">
                Q: 如何取消连续包月自动续费？
              </div>
              <div className="text-xs text-slate-500 leading-relaxed">
                A: 在「抖音钱包-支付设置-自动扣款管理」中一键解绑，当月已发放权益继续有效。
              </div>
            </div>

            {/* Q3 & A3 */}
            <div className="space-y-1 pt-1 border-t border-slate-100">
              <div className="text-xs font-extrabold text-slate-900">
                Q: 权益没有到账怎么办？
              </div>
              <div className="text-xs text-slate-500 leading-relaxed">
                A: 系统在开通支付完成后5分钟内自动下发，如遇高峰网络延迟可退出重新打开或联系客服。
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-sm border border-slate-700/80 flex items-center space-x-2 animate-bounce whitespace-nowrap">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-5 w-full max-w-xs shadow-2xl space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-1.5">
                <MessageSquareQuote className="w-4 h-4 text-[#0066CC]" />
                <span>用户服务与反馈</span>
              </h3>
              <button onClick={() => setShowFeedbackModal(false)} className="text-slate-400 text-lg">✕</button>
            </div>
            
            <p className="text-xs text-slate-600 leading-relaxed">
              如有任何权益自动下发疑问、自动扣款咨询或产品建议，可随时联系官方客服。客服热线：400-800-6688（工作日 9:00 - 18:00）。
            </p>

            <button
              onClick={() => {
                setShowFeedbackModal(false);
                showToast('已收到您的反馈，感谢支持！');
              }}
              className="w-full py-2.5 rounded-full bg-[#0066CC] text-white text-xs font-bold active:scale-95 transition-transform"
            >
              我知道了
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
