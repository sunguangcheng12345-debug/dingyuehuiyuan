import React, { useState } from 'react';
import JSZip from 'jszip';
import { 
  Download, 
  Copy, 
  Check, 
  FileCode2, 
  Palette, 
  Layers, 
  Sparkles, 
  MessageSquare, 
  ExternalLink,
  Code2,
  PackageCheck,
  Eye,
  CheckCircle2,
  FileArchive
} from 'lucide-react';

interface AssetSpec {
  id: string;
  name: string;
  category: '3d_coin' | 'badge' | 'coupon' | 'button' | 'icon';
  width: number;
  height: number;
  description: string;
  rpxSize: string;
  svgCode: string;
  usageTips: string;
}

export const DesignAssetsPage: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'assets' | 'tokens' | 'mini_program_code' | 'wechat_reply'>('assets');
  const [previewBg, setPreviewBg] = useState<'light' | 'dark' | 'amber'>('light');

  // 16个高精度矢量设计源文件与切图列表（包含未开通与已开通DXT会员尊贵态）
  const assets: AssetSpec[] = [
    {
      id: 'vip_crown_golden',
      name: '👑 DXT VIP 会员立体黄金皇冠徽章 (已开通专属)',
      category: 'badge',
      width: 48,
      height: 48,
      rpxSize: '96rpx × 96rpx',
      description: '已开通DXT会员专属尊贵身份标识，3D金色皇冠高光切图',
      usageTips: '放置在会员中心已开通状态顶部标题左侧或身份卡片头像中',
      svgCode: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="crownGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFF2A3" />
      <stop offset="45%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>
    <filter id="crownShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#78350F" flood-opacity="0.3"/>
    </filter>
  </defs>
  <path d="M8 34L12 16L20 26L24 12L28 26L36 16L40 34H8Z" fill="url(#crownGrad)" stroke="#FFFFFF" stroke-width="1.5" stroke-linejoin="round" filter="url(#crownShadow)"/>
  <circle cx="12" cy="14" r="2.5" fill="#FFFBEB" stroke="#B45309" stroke-width="1"/>
  <circle cx="24" cy="10" r="3" fill="#FFFBEB" stroke="#B45309" stroke-width="1"/>
  <circle cx="36" cy="14" r="2.5" fill="#FFFBEB" stroke="#B45309" stroke-width="1"/>
  <rect x="8" y="34" width="32" height="4" rx="2" fill="#B45309"/>
</svg>`
    },
    {
      id: 'gold_coin_yuan',
      name: '¥ 充值金币徽章 (3D质感立体矢量金币)',
      category: '3d_coin',
      width: 48,
      height: 48,
      rpxSize: '96rpx × 96rpx',
      description: '顶部左侧充值¥符号金币，高光折射与双层金边质感',
      usageTips: '小程序端可直接使用 SVG 或切 2x/3x PNG，放置在充值头部左上角',
      svgCode: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="goldCoinGradLeft" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF4D0" />
      <stop offset="40%" stop-color="#FFC83B" />
      <stop offset="85%" stop-color="#E68A00" />
      <stop offset="100%" stop-color="#B36200" />
    </radialGradient>
    <linearGradient id="goldRimLeft" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFF8E0" />
      <stop offset="50%" stop-color="#FFC83B" />
      <stop offset="100%" stop-color="#B36200" />
    </linearGradient>
  </defs>
  <circle cx="24" cy="24" r="22" fill="url(#goldCoinGradLeft)" stroke="url(#goldRimLeft)" stroke-width="2.5" />
  <circle cx="24" cy="24" r="17" fill="none" stroke="#FFD875" stroke-width="1.2" opacity="0.8" />
  <text x="24" y="30" text-anchor="middle" fill="#8A4000" font-size="18" font-weight="900" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">¥</text>
  <path d="M12 18 C14 12, 20 8, 28 8" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.6" />
</svg>`
    },
    {
      id: 'gold_coin_douyin',
      name: '🎵 抖音电商金币徽章 (3D立体音符金币)',
      category: '3d_coin',
      width: 48,
      height: 48,
      rpxSize: '96rpx × 96rpx',
      description: '顶部右侧抖音音符金币，带高亮边缘与立体阴影',
      usageTips: '对应抖音电商专享权益，放置在充值头部右上角旋转12度',
      svgCode: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="goldCoinGradRight" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF4D0" />
      <stop offset="40%" stop-color="#FFC83B" />
      <stop offset="85%" stop-color="#E68A00" />
      <stop offset="100%" stop-color="#B36200" />
    </radialGradient>
    <linearGradient id="goldRimRight" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFF8E0" />
      <stop offset="50%" stop-color="#FFC83B" />
      <stop offset="100%" stop-color="#B36200" />
    </linearGradient>
  </defs>
  <circle cx="24" cy="24" r="22" fill="url(#goldCoinGradRight)" stroke="url(#goldRimRight)" stroke-width="2.5" />
  <circle cx="24" cy="24" r="17" fill="none" stroke="#FFD875" stroke-width="1.2" opacity="0.8" />
  <path d="M21 27.5C21 29.4 19.4 31 17.5 31C15.6 31 14 29.4 14 27.5C14 25.6 15.6 24 17.5 24C18.3 24 19 24.3 19.6 24.8V17.5C19.6 16.7 20.2 16 21 16H28C28.8 16 29.5 16.7 29.5 17.5V21C29.5 21.8 28.8 22.5 28 22.5H22.5V25.7C22.1 25.2 21.6 25 21 25V27.5Z" fill="#8A4000" />
  <path d="M12 18 C14 12, 20 8, 28 8" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.6" />
</svg>`
    },
    {
      id: 'diamond_gold_badge',
      name: '💎 头部立体星钻勋章 (45°旋转流光)',
      category: 'badge',
      width: 24,
      height: 24,
      rpxSize: '48rpx × 48rpx',
      description: '大标题 DXT通信充值会员 右上角发光星钻徽章',
      usageTips: '标题点睛之笔，带微弱发光阴影 box-shadow: 0 0 10px rgba(255,180,30,0.7)',
      svgCode: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="diamondGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFF8D6" />
      <stop offset="50%" stop-color="#FFD24D" />
      <stop offset="100%" stop-color="#FF9E00" />
    </linearGradient>
  </defs>
  <rect x="4.5" y="4.5" width="15" height="15" rx="3" transform="rotate(45 12 12)" fill="url(#diamondGrad)" stroke="#FFFFFF" stroke-width="1.2" />
  <rect x="8.5" y="8.5" width="7" height="7" rx="1.5" transform="rotate(45 12 12)" fill="#FFFFFF" fill-opacity="0.9" />
</svg>`
    },
    {
      id: 'four_point_star',
      name: '✨ 四角星芒微粒 (头部背景高光氛围)',
      category: 'icon',
      width: 24,
      height: 24,
      rpxSize: '48rpx × 48rpx',
      description: '充值头部背景氛围装饰星芒，呼吸灯或微弱微粒效果',
      usageTips: '多处点缀在金色背景中，颜色为 #FFA000 或 #FFB300',
      svgCode: `<svg width="24" height="24" viewBox="0 0 24 24" fill="#FFA000" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
</svg>`
    },
    {
      id: 'crown_vip_medal',
      name: '👑 会员专享立体金勋章 (含红缎带)',
      category: 'badge',
      width: 64,
      height: 64,
      rpxSize: '128rpx × 128rpx',
      description: '原版设计中两个券中间的“会员专享”皇冠金章与缎带',
      usageTips: '常用于居中徽章展示或会员专享认证标识',
      svgCode: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="medalGrad" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF7E0" />
      <stop offset="50%" stop-color="#FFC83B" />
      <stop offset="100%" stop-color="#E68A00" />
    </radialGradient>
  </defs>
  <!-- Ribbons Bottom -->
  <path d="M24 44L18 58L26 53L32 44H24Z" fill="#EA580C" />
  <path d="M40 44L46 58L38 53L32 44H40Z" fill="#C2410C" />
  <!-- Medal Base -->
  <circle cx="32" cy="28" r="20" fill="url(#medalGrad)" stroke="#FFA000" stroke-width="2" />
  <circle cx="32" cy="28" r="16" fill="none" stroke="#FFEBA8" stroke-width="1.2" stroke-dasharray="2 2" />
  <!-- Crown Icon -->
  <path d="M22 34L20 22L26 26L32 20L38 26L44 22L42 34H22Z" fill="#8A4000" stroke="#FFEBA8" stroke-width="1" stroke-linejoin="round" />
  <circle cx="20" cy="21" r="1.5" fill="#FFEBA8" />
  <circle cx="32" cy="19" r="1.5" fill="#FFEBA8" />
  <circle cx="44" cy="21" r="1.5" fill="#FFEBA8" />
  <!-- Badge Tag -->
  <rect x="16" y="38" width="32" height="12" rx="6" fill="#FFF7E0" stroke="#FFA000" stroke-width="1" />
  <text x="32" y="46.5" text-anchor="middle" fill="#8A4000" font-size="7.5" font-weight="900" font-family="-apple-system, BlinkMacSystemFont, sans-serif">会员专享</text>
</svg>`
    },
    {
      id: 'coupon_card_stencil',
      name: '🎫 霸屏消费券全尺寸打孔卡片 (含上下凹槽与中缝虚线)',
      category: 'coupon',
      width: 343,
      height: 72,
      rpxSize: '686rpx × 144rpx',
      description: '霸屏核心双券的打孔物理外框，左右两段结构 + 上下半圆缺口',
      usageTips: 'RD 在小程序中可用 CSS border-radius + 伪元素，也可直接使用本 SVG 作为纯矢量背景',
      svgCode: `<svg width="343" height="72" viewBox="0 0 343 72" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Card Base Outline -->
  <rect x="1" y="1" width="341" height="70" rx="16" fill="#FFFFFF" stroke="#FFA000" stroke-width="2" />
  <!-- Right Orange Action Area -->
  <path d="M260 1H326C334.837 1 342 8.16344 342 17V55C342 63.8366 334.837 71 326 71H260V1Z" fill="url(#rightBtnGrad)" />
  <!-- Upper Notch -->
  <path d="M254 1C254 4.31371 256.686 7 260 7C263.314 7 260 4.31371 260 1" fill="#FFE7D0" />
  <circle cx="260" cy="1" r="6" fill="#FFE7D0" stroke="#FFA000" stroke-width="2" />
  <!-- Lower Notch -->
  <circle cx="260" cy="71" r="6" fill="#FFE7D0" stroke="#FFA000" stroke-width="2" />
  <!-- Vertical Perforated Line -->
  <line x1="260" y1="8" x2="260" y2="64" stroke="#FFA000" stroke-opacity="0.6" stroke-width="1.2" stroke-dasharray="3 3" />
  <defs>
    <linearGradient id="rightBtnGrad" x1="260" y1="36" x2="342" y2="36" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FFA200" />
      <stop offset="1" stop-color="#FF8C00" />
    </linearGradient>
  </defs>
</svg>`
    },
    {
      id: 'benefit_sticker_1',
      name: '🏷️ 权益1贴纸角标 (话费直减每月必得)',
      category: 'badge',
      width: 140,
      height: 28,
      rpxSize: '280rpx × 56rpx',
      description: '下方权益1卡片左上角吸顶贴纸，橙金渐变与反白药丸标签',
      usageTips: '用于区分权益模块，层级清晰，不突兀',
      svgCode: `<svg width="140" height="28" viewBox="0 0 140 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="stickerGrad1" x1="0" y1="14" x2="140" y2="14" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FF9800" />
      <stop offset="1" stop-color="#D97706" />
    </linearGradient>
  </defs>
  <!-- Base Ribbon -->
  <path d="M0 0H140V18C140 23.5228 135.523 28 130 28H10C4.47715 28 0 23.5228 0 18V0Z" fill="url(#stickerGrad1)" />
  <!-- Inner White Pill -->
  <rect x="8" y="6" width="34" height="15" rx="3" fill="#FFFFFF" />
  <text x="25" y="17" text-anchor="middle" fill="#B45309" font-size="10" font-weight="900" font-family="-apple-system, BlinkMacSystemFont, sans-serif">权益1</text>
  <!-- Text -->
  <text x="88" y="18" text-anchor="middle" fill="#FFFFFF" font-size="11" font-weight="900" font-family="-apple-system, BlinkMacSystemFont, sans-serif">话费直减每月必得</text>
</svg>`
    },
    {
      id: 'benefit_sticker_2',
      name: '🏷️ 权益2贴纸角标 (活动福利月月享)',
      category: 'badge',
      width: 140,
      height: 28,
      rpxSize: '280rpx × 56rpx',
      description: '下方权益2卡片左上角吸顶贴纸，橙金渐变与反白药丸标签',
      usageTips: '对应抖音电商专享权益，强化每月领取心智',
      svgCode: `<svg width="140" height="28" viewBox="0 0 140 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="stickerGrad2" x1="0" y1="14" x2="140" y2="14" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FF9800" />
      <stop offset="1" stop-color="#D97706" />
    </linearGradient>
  </defs>
  <!-- Base Ribbon -->
  <path d="M0 0H140V18C140 23.5228 135.523 28 130 28H10C4.47715 28 0 23.5228 0 18V0Z" fill="url(#stickerGrad2)" />
  <!-- Inner White Pill -->
  <rect x="8" y="6" width="34" height="15" rx="3" fill="#FFFFFF" />
  <text x="25" y="17" text-anchor="middle" fill="#B45309" font-size="10" font-weight="900" font-family="-apple-system, BlinkMacSystemFont, sans-serif">权益2</text>
  <!-- Text -->
  <text x="88" y="18" text-anchor="middle" fill="#FFFFFF" font-size="11" font-weight="900" font-family="-apple-system, BlinkMacSystemFont, sans-serif">活动福利月月享</text>
</svg>`
    },
    {
      id: 'primary_cta_button',
      name: '⚡ 核心支付大按钮 (首月0.01元 次月起1.99元/月)',
      category: 'button',
      width: 343,
      height: 58,
      rpxSize: '686rpx × 116rpx',
      description: '全页面唯一保留的高转化红橙渐变大尺寸 CTA 按钮',
      usageTips: '投影: box-shadow: 0 8px 25px rgba(255,40,75,0.38)，字重黑体加粗',
      svgCode: `<svg width="343" height="58" viewBox="0 0 343 58" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ctaBtnGrad" x1="0" y1="29" x2="343" y2="29" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FFA200" />
      <stop offset="0.5" stop-color="#FF4D55" />
      <stop offset="1" stop-color="#FF2855" />
    </linearGradient>
  </defs>
  <rect width="343" height="58" rx="29" fill="url(#ctaBtnGrad)" />
  <text x="171.5" y="27" text-anchor="middle" fill="#FFFFFF" font-size="16" font-weight="900" font-family="-apple-system, BlinkMacSystemFont, sans-serif">首月仅0.01元  次月起1.99元/月</text>
  <text x="171.5" y="45" text-anchor="middle" fill="#FFFFFF" fill-opacity="0.95" font-size="12" font-weight="500" font-family="-apple-system, BlinkMacSystemFont, sans-serif">连续包月 随时可退</text>
</svg>`
    },
    {
      id: 'pill_btn_claim',
      name: '🏷️ 立即领取/立即使用 (白底金色药丸小按钮)',
      category: 'button',
      width: 66,
      height: 28,
      rpxSize: '132rpx × 56rpx',
      description: '券面右侧橙底上的白底药丸微型按钮',
      usageTips: '文字颜色 #9A3412，圆角 9999px，轻微阴影',
      svgCode: `<svg width="66" height="28" viewBox="0 0 66 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="66" height="28" rx="14" fill="#FFFDF5" />
  <text x="33" y="18" text-anchor="middle" fill="#9A3412" font-size="11.5" font-weight="900" font-family="-apple-system, BlinkMacSystemFont, sans-serif">立即领取</text>
</svg>`
    },
    {
      id: 'icon_shield_security',
      name: '🛡️ 动信通直发 · 安全合规图标',
      category: 'icon',
      width: 24,
      height: 24,
      rpxSize: '48rpx × 48rpx',
      description: '下方5个特性卡片中“安全合规”的官方保障徽章',
      usageTips: '展示三网运营商直签合规背书',
      svgCode: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L4 5V11C4 16.5 7.5 21 12 22C16.5 21 20 16.5 20 11V5L12 2Z" fill="#FFF8E7" stroke="#D97706" stroke-width="1.8" stroke-linejoin="round" />
  <path d="M9 11.5L11 13.5L15 9.5" stroke="#B45309" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>`
    },
    {
      id: 'icon_lightning_fast',
      name: '⚡ 自动抵扣 · 无门槛闪电立减图标',
      category: 'icon',
      width: 24,
      height: 24,
      rpxSize: '48rpx × 48rpx',
      description: '特性卡片“自动抵扣”图标',
      usageTips: '凸显无门槛、自动充值立减',
      svgCode: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="10" fill="#FFF8E7" stroke="#D97706" stroke-width="1.5" />
  <path d="M13 5L8 13H13L11 19L16 11H11L13 5Z" fill="#D97706" />
</svg>`
    }
  ];

  const handleCopyCode = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownloadSingleSvg = (asset: AssetSpec) => {
    const blob = new Blob([asset.svgCode], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${asset.id}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadSinglePng = (asset: AssetSpec, scale: number = 2) => {
    const canvas = document.createElement('canvas');
    canvas.width = asset.width * scale;
    canvas.height = asset.height * scale;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    const svgBlob = new Blob([asset.svgCode], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const pngUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = pngUrl;
      link.download = `${asset.id}@${scale}x.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const handleDownloadAllZip = async () => {
    setDownloadingZip(true);
    try {
      const zip = new JSZip();

      // 1. 创建 svg 文件夹放入所有矢量源文件
      const svgFolder = zip.folder('svg_vector_sources');
      assets.forEach((asset) => {
        svgFolder?.file(`${asset.id}.svg`, asset.svgCode);
      });

      // 2. 创建 design_tokens.json
      const tokensJson = {
        name: "DXT通信充值会员小程序设计规范与切图标注",
        version: "1.0.0",
        designerGuide: {
          figmaImportMethod: "在 Figma 中直接按 Ctrl+Shift+K (或拖拽 svg 文件夹内所有 .svg 文件入画布)，即可转为 100% 矢量可编辑图层，无需手动复刻",
          miniProgramBaseWidth: 375,
          miniProgramUnit: "750rpx (1px = 2rpx)"
        },
        colors: {
          brandGold: "#FFA000",
          brandGoldDark: "#B45309",
          brandGoldDeep: "#8A4000",
          bgGradientStart: "#FED8B1",
          bgGradientMiddle: "#FFE6CE",
          bgGradientEnd: "#FFF5EB",
          ctaButtonGradient: "linear-gradient(to right, #FFA200, #FF4D55, #FF2855)",
          ctaShadow: "0 8px 25px rgba(255, 40, 75, 0.38)",
          couponShadow: "0 4px 14px rgba(255, 160, 0, 0.12)",
          textTitle: "#9E3900",
          textSubtitle: "#7E3700",
          textBody: "#1E293B",
          textMuted: "#8C6246"
        },
        typography: {
          heroTitle: "28px / 56rpx, font-black",
          couponAmountMust: "30px / 60rpx, font-black italic",
          couponAmountRange: "24px / 48rpx, font-black italic",
          ctaButtonMain: "16px / 32rpx, font-black",
          ctaButtonSub: "12px / 24rpx, font-medium"
        }
      };
      zip.file('design_tokens.json', JSON.stringify(tokensJson, null, 2));

      // 3. 创建 README_设计规范与小程序开发指南.md
      const readmeContent = `# DXT通信充值会员 - 抖音小程序设计源文件与切图标注指南

## 1. 资源说明
本产品 Demo 采用现代 Code-first 高保真代码驱动架构开发，界面中所有视觉组件（金币、皇冠、音符、星芒、打孔券背景、角标贴纸）均为 **100% 矢量 SVG 原生实现**。

## 2. 设计师使用指引（免手工复刻）：
1. **直接导入 Figma / Sketch / MasterGo / Pixso**：
   - 打开 Figma，按快捷键 \`Ctrl + Shift + K\`（Mac: \`Cmd + Shift + K\`）
   - 选中 \`svg_vector_sources/\` 文件夹下的全部 .svg 文件，点击拖入画布
   - Figma 会自动解析为 **分层矢量图层**（包含渐变色阶、描边粗细、圆角参数），完全可以直接编辑与输出！无需花时间重新复刻。

## 3. 前端 RD 实现建议（抖音小程序端）：
1. **大部分卡片无须位图切图**：
   - 核心支付按钮推荐直接使用 CSS/TTSS 代码实现渐变与阴影（体积 0KB，各分辨率超高清）：
     \`\`\`css
     .cta-btn {
       width: 686rpx;
       height: 116rpx;
       border-radius: 58rpx;
       background: linear-gradient(to right, #FFA200, #FF4D55, #FF2855);
       box-shadow: 0 16rpx 50rpx rgba(255, 40, 75, 0.38);
       color: #ffffff;
     }
     \`\`\`
   - 3D 金币（¥ 充值金币、🎵 抖音音符金币）：
     可直接将本压缩包内的 \`gold_coin_yuan.svg\` 与 \`gold_coin_douyin.svg\` 放入小程序 \`images/\` 目录作为 \`<image src="/images/gold_coin_yuan.svg" mode="aspectFit" />\`。

## 4. 核心色彩代码 (Color Tokens)：
- 核心支付主按钮：\`linear-gradient(to right, #FFA200, #FF4D55, #FF2855)\`
- 头部主背景：\`linear-gradient(to bottom, #FED8B1, #FFE6CE, #FFF5EB)\`
- 券面金边与打孔边框：\`#FFA000\`
- 金色高亮文字：\`#B45309\`
- 标题文字主色：\`#9E3900\`
- 副标文字色：\`#7E3700\`
- 说明次级字色：\`#8C6246\`

---
*打包生成时间：${new Date().toLocaleString()}*
`;
      zip.file('README_设计规范与小程序开发指南.md', readmeContent);

      // 生成 zip 并触发下载
      const content = await zip.generateAsync({ type: 'blob' });
      const downloadUrl = URL.createObjectURL(content);
      const downloadLink = document.createElement('a');
      downloadLink.href = downloadUrl;
      downloadLink.download = 'DXT通信充值会员_设计源文件与切图包.zip';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Failed to generate zip', error);
    } finally {
      setDownloadingZip(false);
    }
  };

  const wechatForwardMessage = `【DXT通信充值会员 - 小程序设计源文件与切图说明】
@彻晓潇潇雨 @零°天空
你好！这个产品 Demo 是采用现代代码直出的高保真原型。所有视觉元素（3D立体金币、抖音金币、皇冠勋章、打孔券背景、渐变按钮、角标贴纸）均已转成【100% 矢量的 SVG 源文件与高清切图包】：

1. 📦 设计师直接导入（无需重新复刻）：
直接把切图包里的 SVG 拖进 Figma / Sketch / MasterGo，就会自动解构为分层的矢量图层（色值渐变、圆角和描边都在），可直接二次编辑或切图，无需手工重画！

2. 💻 前端 RD 开发指南：
核心支付按钮、优惠券打孔边框、背景渐变均附带小程序 WXSS/TTSS 代码与色值，可直接拷贝复用，无需切大图，体积更小加载更快。

👉 请在原型上方点击【🎨 设计源文件与切图】标签页，即可【一键打包下载全部 SVG / 切图 ZIP 包】并查看完整开发标注！`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-slate-100">
      
      {/* 顶部醒目标题与一键下载卡片 */}
      <div className="bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-indigo-500/15 border border-amber-500/30 rounded-3xl p-6 sm:p-8 mb-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>设计师免复刻 · RD直接复用代码与矢量切图</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              DXT通信充值会员 · 设计源文件与切图资源中心
            </h1>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              针对设计师反馈的“没有源文件无法直接切图”问题，已将 Demo 中所有元素打包为标准矢量源文件（SVG）、高清位图（@2x/@3x PNG）、设计规范 Token 以及抖音小程序端 WXML/WXSS 复用代码。设计师可直接将 SVG 拖拽入 Figma 即可瞬间还原分层矢量画板！
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={handleDownloadAllZip}
              disabled={downloadingZip}
              className="bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white font-black px-6 py-3.5 rounded-2xl shadow-lg shadow-rose-900/40 flex items-center justify-center space-x-2 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {downloadingZip ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>正在打包资源...</span>
                </>
              ) : (
                <>
                  <FileArchive className="w-5 h-5" />
                  <span>一键打包下载全部源文件 (ZIP)</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleCopyCode('wechat_summary', wechatForwardMessage)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold px-4 py-3.5 rounded-2xl flex items-center justify-center space-x-2 transition-all active:scale-95 cursor-pointer"
            >
              {copiedId === 'wechat_summary' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 text-xs">已复制微信回复</span>
                </>
              ) : (
                <>
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  <span className="text-xs">复制发给设计师的消息</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 二级导航 Tab */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-4 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('assets')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'assets'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>矢量切图与素材库 ({assets.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('tokens')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'tokens'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>设计规范与颜色标注 (Tokens)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('mini_program_code')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'mini_program_code'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>小程序 RD 代码复用 (WXSS/CSS)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('wechat_reply')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'wechat_reply'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>微信群对齐话术 (转发可用)</span>
        </button>
      </div>

      {/* 选项卡 1：切图与素材列表 */}
      {activeSubTab === 'assets' && (
        <div>
          {/* 工具栏：背景切换与快速说明 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center space-x-2 text-xs text-slate-300">
              <span className="text-slate-400">素材预览背景：</span>
              <button
                onClick={() => setPreviewBg('light')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  previewBg === 'light' ? 'bg-white text-slate-900' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                明亮底 (白)
              </button>
              <button
                onClick={() => setPreviewBg('amber')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  previewBg === 'amber' ? 'bg-amber-100 text-amber-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                页面原色底 (暖金)
              </button>
              <button
                onClick={() => setPreviewBg('dark')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  previewBg === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                暗黑底 (黑)
              </button>
            </div>

            <div className="text-xs text-amber-400 flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>所有 SVG 素材支持直接复制或拖入 Figma / Sketch / MasterGo 还原矢量图层</span>
            </div>
          </div>

          {/* 素材卡片网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assets.map((asset) => {
              const bgClass =
                previewBg === 'light'
                  ? 'bg-slate-50 border-slate-200'
                  : previewBg === 'amber'
                  ? 'bg-[#FFE7D0] border-amber-300'
                  : 'bg-slate-950 border-slate-800';

              return (
                <div
                  key={asset.id}
                  className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all p-5 flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    {/* 头部信息 */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-sm font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                          {asset.name}
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">{asset.description}</p>
                      </div>
                      <span className="shrink-0 bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded-md font-mono border border-slate-700">
                        {asset.rpxSize}
                      </span>
                    </div>

                    {/* 画布预览区 */}
                    <div
                      className={`h-40 rounded-xl flex items-center justify-center p-4 relative overflow-hidden transition-colors border ${bgClass}`}
                    >
                      <div
                        dangerouslySetInnerHTML={{ __html: asset.svgCode }}
                        className="max-h-full max-w-full flex items-center justify-center drop-shadow-sm"
                      />
                    </div>

                    {/* 使用指导 */}
                    <div className="mt-3 text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                      <span className="text-amber-400/90 font-bold mr-1">📐 开发建议:</span>
                      {asset.usageTips}
                    </div>
                  </div>

                  {/* 底部操作按钮 */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleDownloadSingleSvg(asset)}
                      title="下载 SVG 矢量文件，可直接拖入 Figma"
                      className="flex-1 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-bold py-2 px-2 rounded-xl flex items-center justify-center space-x-1 transition-all active:scale-95 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>SVG 矢量</span>
                    </button>

                    <button
                      onClick={() => handleDownloadSinglePng(asset, 2)}
                      title="下载 2x 高清 PNG"
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-bold py-2 px-2.5 rounded-xl flex items-center justify-center space-x-1 transition-all active:scale-95 cursor-pointer"
                    >
                      <span>@2x PNG</span>
                    </button>

                    <button
                      onClick={() => handleCopyCode(asset.id, asset.svgCode)}
                      title="复制原始 SVG 代码"
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-bold py-2 px-2.5 rounded-xl flex items-center justify-center space-x-1 transition-all active:scale-95 cursor-pointer"
                    >
                      {copiedId === asset.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 选项卡 2：设计规范与标注 Tokens */}
      {activeSubTab === 'tokens' && (
        <div className="space-y-8">
          {/* 色彩规范 */}
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2 mb-4">
              <Palette className="w-5 h-5 text-amber-400" />
              <span>色彩与渐变规范 (Color Tokens)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="h-16 rounded-xl bg-gradient-to-r from-[#FFA200] via-[#FF4D55] to-[#FF2855] shadow-md mb-3"></div>
                <div className="text-xs font-bold text-white">核心支付主色 (CTA Gradient)</div>
                <div className="text-[11px] text-slate-400 font-mono mt-1">#FFA200 → #FF4D55 → #FF2855</div>
                <div className="text-[10px] text-amber-400/90 mt-1">仅用于核心支付大按钮，高转化保证</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="h-16 rounded-xl bg-gradient-to-b from-[#FED8B1] via-[#FFE6CE] to-[#FFF5EB] border border-amber-300/40 shadow-md mb-3"></div>
                <div className="text-xs font-bold text-white">头部背景渐变 (Hero Background)</div>
                <div className="text-[11px] text-slate-400 font-mono mt-1">#FED8B1 → #FFE6CE → #FFF5EB</div>
                <div className="text-[10px] text-slate-400 mt-1">温润暖金质感，不刺眼</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="h-16 rounded-xl bg-gradient-to-r from-[#FFA000] to-[#FF8C00] shadow-md mb-3"></div>
                <div className="text-xs font-bold text-white">券面主金色 (Golden Coupon)</div>
                <div className="text-[11px] text-slate-400 font-mono mt-1">#FFA000 → #FF8C00</div>
                <div className="text-[10px] text-slate-400 mt-1">券面边框、打孔背景与领券区域</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="h-16 rounded-xl bg-[#FFFDF5] border border-amber-200 shadow-md mb-3 flex items-center justify-center">
                  <span className="text-xs font-black text-[#9A3412]">立即领取</span>
                </div>
                <div className="text-xs font-bold text-white">领券药丸按钮 (Pill Button)</div>
                <div className="text-[11px] text-slate-400 font-mono mt-1">底色 #FFFDF5 / 文字 #9A3412</div>
                <div className="text-[10px] text-slate-400 mt-1">高对比反白小胶囊按钮</div>
              </div>
            </div>

            {/* 文字色阶表 */}
            <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
                <div className="w-8 h-8 rounded-lg bg-[#9E3900] shrink-0 border border-white/20"></div>
                <div>
                  <div className="text-xs font-bold text-slate-200">大标题主色</div>
                  <div className="text-[11px] text-slate-400 font-mono">#9E3900</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
                <div className="w-8 h-8 rounded-lg bg-[#7E3700] shrink-0 border border-white/20"></div>
                <div>
                  <div className="text-xs font-bold text-slate-200">副标说明色</div>
                  <div className="text-[11px] text-slate-400 font-mono">#7E3700</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
                <div className="w-8 h-8 rounded-lg bg-[#B45309] shrink-0 border border-white/20"></div>
                <div>
                  <div className="text-xs font-bold text-slate-200">券面金额高亮</div>
                  <div className="text-[11px] text-slate-400 font-mono">#B45309</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
                <div className="w-8 h-8 rounded-lg bg-[#8C6246] shrink-0 border border-white/20"></div>
                <div>
                  <div className="text-xs font-bold text-slate-200">协议与须知细则</div>
                  <div className="text-[11px] text-slate-400 font-mono">#8C6246</div>
                </div>
              </div>
            </div>
          </div>

          {/* 尺寸、字号与圆角阴影标注 */}
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2 mb-4">
              <Layers className="w-5 h-5 text-amber-400" />
              <span>排版、圆角与阴影规范 (Layout & Typography)</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 字号规范 */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                <h3 className="text-sm font-bold text-amber-400 mb-3">字号层级与字重</h3>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex justify-between border-b border-slate-800/80 pb-1.5">
                    <span>头部大标题：</span>
                    <span className="font-mono text-white">28px (56rpx) font-black</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/80 pb-1.5">
                    <span>券面核心金额：</span>
                    <span className="font-mono text-white">30px / 24px font-black italic</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/80 pb-1.5">
                    <span>支付按钮主文案：</span>
                    <span className="font-mono text-white">16px (32rpx) font-black</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/80 pb-1.5">
                    <span>券名称主标题：</span>
                    <span className="font-mono text-white">13.5px (27rpx) font-black</span>
                  </li>
                  <li className="flex justify-between">
                    <span>辅助与规则小字：</span>
                    <span className="font-mono text-white">10px~11px (20~22rpx)</span>
                  </li>
                </ul>
              </div>

              {/* 圆角规范 */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                <h3 className="text-sm font-bold text-amber-400 mb-3">圆角规范 (Border Radius)</h3>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex justify-between border-b border-slate-800/80 pb-1.5">
                    <span>页面大卡片 (权益区)：</span>
                    <span className="font-mono text-white">24px (48rpx / rounded-3xl)</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/80 pb-1.5">
                    <span>霸屏消费券外框：</span>
                    <span className="font-mono text-white">16px (32rpx / rounded-2xl)</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/80 pb-1.5">
                    <span>核心支付大按钮：</span>
                    <span className="font-mono text-white">9999px (胶囊形 / rounded-full)</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/80 pb-1.5">
                    <span>领券白底药丸：</span>
                    <span className="font-mono text-white">9999px (rounded-full)</span>
                  </li>
                  <li className="flex justify-between">
                    <span>5特性迷你卡片：</span>
                    <span className="font-mono text-white">12px (24rpx / rounded-xl)</span>
                  </li>
                </ul>
              </div>

              {/* 阴影规范 */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                <h3 className="text-sm font-bold text-amber-400 mb-3">高保真光影与阴影 (Box Shadow)</h3>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex flex-col border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400">核心支付大按钮高光红晕：</span>
                    <span className="font-mono text-white text-[11px] mt-0.5">0 8px 25px rgba(255, 40, 75, 0.38)</span>
                  </li>
                  <li className="flex flex-col border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400">金券悬浮金影：</span>
                    <span className="font-mono text-white text-[11px] mt-0.5">0 4px 14px rgba(255, 160, 0, 0.12)</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-slate-400">标题星钻微光：</span>
                    <span className="font-mono text-white text-[11px] mt-0.5">0 0 10px rgba(255, 180, 30, 0.70)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 选项卡 3：小程序 RD 代码复用 */}
      {activeSubTab === 'mini_program_code' && (
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Code2 className="w-5 h-5 text-amber-400" />
                <span>抖音/微信小程序端推荐 WXSS/TTSS 样式（免位图切图）</span>
              </h2>
              <button
                onClick={() =>
                  handleCopyCode(
                    'css_code',
                    `/* 1. 核心支付主按钮样式 */
.dxt-cta-button {
  width: 686rpx;
  height: 116rpx;
  background: linear-gradient(to right, #FFA200, #FF4D55, #FF2855);
  border-radius: 58rpx;
  box-shadow: 0 16rpx 50rpx rgba(255, 40, 75, 0.38);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
}

/* 2. 霸屏消费券打孔卡片 */
.dxt-coupon-card {
  width: 686rpx;
  background: #FFFFFF;
  border-radius: 32rpx;
  border: 4rpx solid #FFA000;
  box-shadow: 0 8rpx 28rpx rgba(255, 160, 0, 0.12);
  display: flex;
  position: relative;
  overflow: hidden;
}

/* 3. 领券操作区 */
.dxt-coupon-action {
  width: 148rpx;
  background: linear-gradient(to right, #FFA200, #FF8C00);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* 4. 药丸小按钮 */
.dxt-coupon-pill {
  width: 132rpx;
  height: 52rpx;
  background: #FFFDF5;
  border-radius: 26rpx;
  color: #9A3412;
  font-size: 22rpx;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
}`
                  )
                }
                className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 cursor-pointer"
              >
                {copiedId === 'css_code' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>复制全部小程序样式代码</span>
              </button>
            </div>

            <p className="text-xs text-slate-300 mb-4">
              前端 RD 工程师可以直接复制下方 CSS / TTSS 样式直接运行在抖音小程序中，纯代码实现，体积为 0KB，在不同尺寸的 iPhone/Android 上均保持极度清晰锐利！
            </p>

            <pre className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-xs text-amber-200/90 font-mono overflow-x-auto leading-relaxed">
{`/* ============================================================
 * DXT 通信充值会员 - 小程序推荐 TTSS / WXSS (750rpx 适配)
 * ============================================================ */

/* 1. 核心支付主按钮 (首月仅0.01元 次月起1.99元/月) */
.dxt-cta-button {
  width: 686rpx;
  height: 116rpx;
  background: linear-gradient(to right, #FFA200 0%, #FF4D55 50%, #FF2855 100%);
  border-radius: 58rpx;
  box-shadow: 0 16rpx 50rpx rgba(255, 40, 75, 0.38);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
}

/* 2. 霸屏消费券外层结构 (白底金边) */
.dxt-coupon-card {
  width: 686rpx;
  background: #FFFFFF;
  border-radius: 32rpx;
  border: 4rpx solid #FFA000;
  box-shadow: 0 8rpx 28rpx rgba(255, 160, 0, 0.12);
  display: flex;
  position: relative;
  overflow: hidden;
}

/* 3. 券右侧橙色领券操作区 */
.dxt-coupon-action {
  width: 148rpx;
  background: linear-gradient(to right, #FFA200, #FF8C00);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* 4. 立即领取反白微型药丸 */
.dxt-coupon-pill {
  width: 132rpx;
  height: 52rpx;
  background: #FFFDF5;
  border-radius: 26rpx;
  color: #9A3412;
  font-size: 22rpx;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 5. 顶部暖金色渐变背景 */
.dxt-hero-bg {
  background: linear-gradient(180deg, #FED8B1 0%, #FFE6CE 60%, #FFF5EB 100%);
  border-bottom: 2rpx solid #FEE7D0;
}`}
            </pre>
          </div>
        </div>
      )}

      {/* 选项卡 4：微信群对齐话术 */}
      {activeSubTab === 'wechat_reply' && (
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-amber-400" />
              <span>准备好的微信群答复消息 (直接复制发送给设计师)</span>
            </h2>
            <button
              onClick={() => handleCopyCode('wechat_card', wechatForwardMessage)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1 cursor-pointer transition-all active:scale-95 shadow-md shadow-emerald-900/40"
            >
              {copiedId === 'wechat_card' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>一键复制微信话术</span>
            </button>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-sm leading-relaxed text-slate-200 font-sans whitespace-pre-wrap">
            {wechatForwardMessage}
          </div>

          <div className="mt-6 bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl text-xs text-amber-300/90 flex items-start space-x-2">
            <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">为什么这样沟通最顺畅？</p>
              <p className="text-slate-300 mt-1">
                设计师习惯在 Figma 中操作。通过直接提供 100% 矢量的 SVG 源文件包，设计师拖入 Figma 即可直接解构成矢量图层（色值渐变、圆角和描边都在），不需要花一天时间手工复刻重画。前端 RD 也能直接使用现成的 CSS 样式和小程序代码，双向省时！
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
