import { UserJourneyStep, BenefitItem } from '../types';

export const USER_JOURNEY_STEPS: UserJourneyStep[] = [
  {
    stepNumber: 1,
    title: '权益小程序与卡券领取',
    page: '动信通权益小程序',
    action: '用户在小程序浏览会员权益（2元话费直减券 + 2元抖音电商券），点击【1.99元/月 立即开通】；开通后点击【领取】弹出Toast并切换为【已领取】状态',
    conversionGoal: '低门槛转化用户进入电商提单页，并提供开通后的专属卡券领取闭环',
    keyDesign: '清晰展示“连续包月 ¥1.99/月 (本单立省2元)”，支持卡券实时领取状态反馈与防重复申领',
    touchpoint: '小程序主页金橙卡片 & 会员专项权益领取列表'
  },
  {
    stepNumber: 2,
    title: '确认订单提单页',
    page: '确认订单页 (提单页)',
    action: '用户核对充值账号、续费周期（每月1.99元）、号码隐私保护与免密支付方式，点击【提交订单】',
    conversionGoal: '承接电商标准交易链路，展示合规连续包月资费提示',
    keyDesign: '顶部账号/周期卡片 + 动信通商品月卡信息 + 号码保护开关 + 抖音支付免密卡片',
    touchpoint: '端内电商标准提单页'
  },
  {
    stepNumber: 3,
    title: '自动续费签约与开通',
    page: '商品协议弹窗 & 签约成功反馈',
    action: '点击提交订单后弹出《商品相关协议》，点击【同意并下单】唤起免密扣款，完成后弹出【签约成功】提示',
    conversionGoal: '完成连续包月自动扣费协议合规签署与首笔扣款',
    keyDesign: '明确告知《抖音电商自动续费扣款协议》与扣款银行卡路径，点击【知道了】自动激活会员并跳转',
    touchpoint: '底部协议半屏弹窗 + 签约成功中心弹窗'
  },
  {
    stepNumber: 4,
    title: '充值成功与订单查询',
    page: '订单查询 (充值成功页)',
    action: '展示充值账号、续费管理状态（自动续订，可随时取消）、订单实付款与店铺推荐商品；点击【去使用】一键跳转回权益小程序',
    conversionGoal: '完成闭环履约反馈，提供续费管理与商品卡片【去使用】核销入口',
    keyDesign: '充值信息卡片（含一键续费管理入口） + 店铺推荐买啥 + 订单实付金额 + 商品操作区【去使用】按钮',
    touchpoint: '订单详情/充值成功页 + 商品操作栏【去使用】'
  }
];

export const CORE_BENEFITS_MATRIX: BenefitItem[] = [
  {
    id: 'b1',
    category: '会员权益',
    title: '2元话费直减券',
    subTitle: '话费券充值任意号码均可抵扣',
    perceivedValue: '¥2.00/月',
    actualCost: '¥2.00 (动信通承担)',
    tag: '立减特权',
    tagColor: 'bg-[#FE2C55] text-white',
    icon: 'Ticket',
    triggerScenario: '话费充值页拦截 / 余额低提醒 / 话费结算收银台',
    actionText: '立即充值抵扣',
    businessReturn: '绑定高频连续扣款协议，拉高充值中心GMV与首购转化率',
    status: 'available',
    description: '每月会员在小程序内领取放入券包，在充值中心为任意手机号充值话费时系统均自动抵扣2元现金。',
    details: [
      '每个月生效一次，当月未用不结转至次月',
      '绑定当前登录账号，支持为本人或为他人手机号充值抵扣',
      '由动信通作为CP服务商全额补贴成本',
      '支持与支付立减/银行卡优惠叠加使用'
    ]
  },
  {
    id: 'b2',
    category: '会员权益',
    title: '2元 抖音电商券',
    subTitle: '电商券已发至当前抖音券包',
    perceivedValue: '¥2.00/月',
    actualCost: '电商平台联合补贴',
    tag: '电商立减',
    tagColor: 'bg-rose-600 text-white',
    icon: 'ShoppingBag',
    triggerScenario: '会员开通成功后自动发放至福利专区，随时一键领取',
    actionText: '一键领取',
    businessReturn: '促进抖音电商大盘GMV转化与会员高频复购粘性',
    status: 'available',
    description: '抖音商城全品类通用优惠券，实付立减2元，领取后直达当前登录账号的抖音卡券包。',
    details: [
      '每月免费领取一张，直接放入当前登录账号的抖音卡券包',
      '支持抖音商城、直播间小黄车全品类实物商品',
      '可与商家立减及抖音支付优惠叠加'
    ]
  },
  {
    id: 'b3',
    category: '通信查询与办理',
    title: '话费查询',
    subTitle: '实时查询当前手机号卡话费余额与月度账单构成',
    perceivedValue: '快捷服务',
    actualCost: '¥0.00 (官方系统接口)',
    tag: '实时查询',
    tagColor: 'bg-blue-600 text-white',
    icon: 'Search',
    triggerScenario: '会员专区通信服务入口 / 余额不足预警',
    actionText: '立即查询',
    businessReturn: '提高充值中心入口日活，促进话费及时充值',
    status: 'available',
    description: '直连中国移动/中国联通/中国电信官方数据能力，秒级获取当前手机实时话费余额。',
    details: [
      '支持三网手机号一键极速查询',
      '清晰展示当前余额、本月消费及欠费预警',
      '余额偏低时提供一键快捷充值通道'
    ]
  },
  {
    id: 'b4',
    category: '通信查询与办理',
    title: '流量查询',
    subTitle: '实时查询通用流量与各类APP定向流量剩余配额',
    perceivedValue: '快捷服务',
    actualCost: '¥0.00 (官方系统接口)',
    tag: '实时查询',
    tagColor: 'bg-cyan-600 text-white',
    icon: 'BarChart3',
    triggerScenario: '会员专区通信服务入口 / 流量告急提示',
    actionText: '立即查询',
    businessReturn: '及时精准捕捉流量不足用户，引导办理流量叠加包',
    status: 'available',
    description: '实时查询当前套餐总流量、已用流量及剩余可使用GB额度。',
    details: [
      '精确区分通用流量与定向APP专属流量',
      '支持流量使用趋势图表与到期时间提醒',
      '流量剩余不足20%时精准触发流量优惠办理'
    ]
  },
  {
    id: 'b5',
    category: '通信查询与办理',
    title: '流量办理',
    subTitle: '全国10GB-100GB高速流量日包/周包/月包特惠订购',
    perceivedValue: '特惠加包',
    actualCost: '按订购套餐优惠结算',
    tag: '特惠办理',
    tagColor: 'bg-amber-500 text-white',
    icon: 'Zap',
    triggerScenario: '会员专区快捷办理 / 流量查询后引导',
    actionText: '优惠办理',
    businessReturn: '流量订购增值服务收益与运营商合作分润',
    status: 'available',
    description: '三大运营商全国通用高速流量包在线办理，即办即用，快速到账。',
    details: [
      '涵盖日包（5G/10G）、周包与月包多种规格',
      '一键免密提交，订购成功即刻收到运营商短信确认',
      '充值会员专享订购折扣优惠'
    ]
  },
  {
    id: 'b6',
    category: '通信查询与办理',
    title: '宽带办理',
    subTitle: '千兆家庭5G融合宽带开通、免费测速与预约安装',
    perceivedValue: '¥240.00/年',
    actualCost: '免费上门服务',
    tag: '宽带办理',
    tagColor: 'bg-emerald-600 text-white',
    icon: 'Router',
    triggerScenario: '会员专区宽带办理入口 / 家庭通信升级',
    actionText: '免费办理',
    businessReturn: '宽带成功装机高额CPS佣金变现',
    status: 'available',
    description: '在线提交家庭宽带开通需求，专业工程师免费上门测速与现场安装办理。',
    details: [
      '支持中国移动/联通/电信全国主要城市社区',
      '在线匹配当地最具性价比的高速千兆宽带套餐',
      '成功开通装机享50元话费补贴赠送'
    ]
  }
];

export const COMPLIANCE_RULES = [
  {
    id: 'c1',
    title: '工信部【自动续费前5天】消息提醒机制',
    norm: '工信部《移动互联网应用程序服务管理规定》& 市场监管总局《网络交易监督管理办法》',
    implementation: '在每月扣款前5天（例如第25天），通过消息盒子下发“【充值会员】自动续费扣款提醒”站内信与Push，明确告知扣款金额（1.99元）、扣款时间及退订路径。',
    icon: 'BellRing'
  },
  {
    id: 'c2',
    title: '端内【1-Click一键显眼退订】路径',
    norm: '应用小程序/H5订阅合规要求（严禁藏匿取消入口）',
    implementation: '会员首页顶部卡片及底部页脚常驻【退订与扣款管理】醒目按钮。用户点击后进入简易退订确认弹窗，一键即可解绑自动扣款协议，取消后当月已付费权益不受影响。',
    icon: 'ShieldCheck'
  },
  {
    id: 'c3',
    title: '通信服务【话费/流量/宽带办理】透明资费规范',
    norm: '工信部通信资费透明化及防虚假宣传规定',
    implementation: '在流量办理与宽带办理界面，必须清晰标明资费标准、扣款方式、适用配额及合约周期，保障用户消费明明白白。',
    icon: 'FileText'
  },
  {
    id: 'c4',
    title: '自动续费【默认勾选与透明告知】',
    norm: '支付与金融消费合规指南',
    implementation: '收银台按钮清晰标注“1.99元/月 自动续费”，开通协议旁提供《连续包月服务协议》勾选框及弹窗阅读提示，突出显示“可随时取消”字样。',
    icon: 'CreditCard'
  }
];

export const COMMERCIAL_MODEL_SUMMARY = {
  monthlyPrice: 1.99,
  redEnvelopeCost: 2.00,
  monthlyNetSavings: 2.00,
  backEndCpsRevenueAverage: 3.85,
  netMarginPerUser: 3.84,
  keyMetrics: [
    { label: '连续包月续费率', value: '78.5%', change: '+12.3% vs 普通话费券' },
    { label: '电商券领用率', value: '85.2%', change: '高粘性电商满减特权' },
    { label: '流量/话费查询日活', value: '35.6%', change: '高频自服务流量' },
    { label: '流量/宽带办理转化', value: '4.8%', change: '增值业务高毛利' }
  ]
};

