import React from 'react';
import { MembershipSku } from '../types';

interface SkuCardHeaderBannerProps {
  sku: MembershipSku;
  isSelected?: boolean;
}

export const SkuCardHeaderBanner: React.FC<SkuCardHeaderBannerProps> = ({
  sku,
  isSelected = false,
}) => {
  const theme = sku.bannerTheme || (
    sku.id === 'tier_0' ? 'recharge' :
    sku.id === 'tier_1' ? 'life' :
    sku.id === 'tier_2' ? 'drama' : 'blackgold'
  );

  return (
    <div className="relative w-full h-[98px] overflow-hidden select-none">
      {/* 1. 主题背景渐变与纹理氛围 */}
      {theme === 'recharge' && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF4C24] via-[#FF5F2E] to-[#FE2C55]">
          <div className="absolute -right-8 -top-8 w-36 h-36 bg-amber-300/25 rounded-full blur-xl pointer-events-none" />
          <div className="absolute left-1/3 -bottom-10 w-32 h-32 bg-rose-600/30 rounded-full blur-lg pointer-events-none" />
          {/* 微光线条光斑 */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
        </div>
      )}

      {theme === 'life' && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#EA580C] via-[#F97316] to-[#EAB308]">
          <div className="absolute -right-6 -top-6 w-36 h-36 bg-yellow-200/30 rounded-full blur-xl pointer-events-none" />
          <div className="absolute left-1/4 -bottom-8 w-28 h-28 bg-orange-700/25 rounded-full blur-lg pointer-events-none" />
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
        </div>
      )}

      {theme === 'drama' && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5] via-[#7C3AED] to-[#EC4899]">
          <div className="absolute -right-6 -top-6 w-36 h-36 bg-pink-400/30 rounded-full blur-xl pointer-events-none" />
          <div className="absolute left-10 -bottom-8 w-28 h-28 bg-indigo-700/35 rounded-full blur-lg pointer-events-none" />
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
        </div>
      )}

      {theme === 'blackgold' && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1C24] via-[#242733] to-[#0E0F14]">
          <div className="absolute -right-6 -top-6 w-36 h-36 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />
          <div className="absolute right-12 bottom-0 w-24 h-24 bg-yellow-600/20 rounded-full blur-md pointer-events-none" />
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:12px_12px]" />
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
        </div>
      )}

      {/* 2. 左侧核心文案区 */}
      <div className="relative z-10 h-full flex flex-col justify-between p-3.5 pr-28 text-white">
        {/* 顶部标签 */}
        <div className="flex items-center space-x-1.5">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black tracking-wide shadow-xs backdrop-blur-md ${
            theme === 'blackgold'
              ? 'bg-gradient-to-r from-amber-400/30 to-yellow-500/20 text-amber-200 border border-amber-400/40'
              : 'bg-white/25 text-white border border-white/30'
          }`}>
            {sku.bannerTag || sku.badge || '热门推荐'}
          </span>
          <span className="text-[10px] text-white/80 font-medium">
            {sku.tierNumber}
          </span>
        </div>

        {/* 中间吸引大标题 */}
        <div className="space-y-0.5 my-auto">
          <h4 className="text-[15px] font-black tracking-tight leading-tight drop-shadow-xs truncate text-white">
            {sku.bannerTitle || sku.highlight}
          </h4>
          <p className="text-[10.5px] font-medium text-white/85 truncate drop-shadow-2xs">
            {sku.bannerSubtitle || sku.serviceDesc}
          </p>
        </div>

        {/* 底部价值说明 */}
        <div className="flex items-center space-x-2 text-[10px]">
          <span className="font-extrabold text-white/95 bg-black/20 px-1.5 py-0.5 rounded backdrop-blur-xs">
            总感知价值 ¥{sku.nominalValue.toFixed(0)}
          </span>
          <span className="text-white/75 font-normal truncate">
            {sku.ecommerceCouponDesc.replace(/（按核销计费）/, '')}
          </span>
        </div>
      </div>

      {/* 3. 右侧 3D 风格精美业务插画 (无外部网络依赖，高质感响应式矢量) */}
      <div className="absolute right-1 top-1 bottom-1 w-28 flex items-center justify-center pointer-events-none">
        {theme === 'recharge' && (
          <svg className="w-24 h-24 drop-shadow-md" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="phoneBody" x1="20" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFFFF" />
                <stop offset="1" stopColor="#E2E8F0" />
              </linearGradient>
              <linearGradient id="screenGrad" x1="25" y1="20" x2="65" y2="75" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF385C" />
                <stop offset="1" stopColor="#FF8F1F" />
              </linearGradient>
              <linearGradient id="goldCoin" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#FDE047" />
                <stop offset="1" stopColor="#CA8A04" />
              </linearGradient>
              <linearGradient id="couponGrad" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#FFFBEB" />
                <stop offset="1" stopColor="#FEF3C7" />
              </linearGradient>
            </defs>
            {/* 手机机身 */}
            <rect x="24" y="14" width="46" height="72" rx="9" fill="url(#phoneBody)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))" />
            <rect x="27" y="18" width="40" height="64" rx="6" fill="url(#screenGrad)" />
            {/* 手机刘海与小细节 */}
            <rect x="42" y="15.5" width="10" height="2" rx="1" fill="#CBD5E1" />
            
            {/* 弹出的话费券卡片 */}
            <g transform="translate(18, 32) rotate(-8)">
              <rect x="0" y="0" width="56" height="28" rx="5" fill="url(#couponGrad)" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.25))" />
              <rect x="2" y="2" width="52" height="24" rx="3.5" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 1.5" />
              <text x="7" y="18" fill="#DC2626" fontSize="13" fontWeight="900" fontFamily="sans-serif">¥2</text>
              <text x="25" y="14" fill="#B45309" fontSize="7" fontWeight="bold" fontFamily="sans-serif">话费直减</text>
              <text x="25" y="21" fill="#78350F" fontSize="5.5" fontFamily="sans-serif">立省无门槛</text>
            </g>

            {/* 浮动金币 1 */}
            <g transform="translate(68, 54)">
              <circle cx="11" cy="11" r="10" fill="url(#goldCoin)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))" />
              <circle cx="11" cy="11" r="7.5" stroke="#FEF08A" strokeWidth="1" />
              <text x="7.5" y="15" fill="#78350F" fontSize="10" fontWeight="900" fontFamily="sans-serif">¥</text>
            </g>

            {/* 浮动小金币 2 */}
            <g transform="translate(10, 16) scale(0.75)">
              <circle cx="10" cy="10" r="9" fill="url(#goldCoin)" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.25))" />
              <text x="6.5" y="14" fill="#78350F" fontSize="9" fontWeight="bold" fontFamily="sans-serif">¥</text>
            </g>

            {/* 闪光星 */}
            <path d="M78 18L80 23L85 25L80 27L78 32L76 27L71 25L76 23Z" fill="#FEF08A" opacity="0.9" />
          </svg>
        )}

        {theme === 'life' && (
          <svg className="w-24 h-24 drop-shadow-md" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bagGrad" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#FBBF24" />
                <stop offset="1" stopColor="#D97706" />
              </linearGradient>
              <linearGradient id="burgerBun" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#F59E0B" />
                <stop offset="1" stopColor="#B45309" />
              </linearGradient>
              <linearGradient id="couponRed" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#EF4444" />
                <stop offset="1" stopColor="#B91C1C" />
              </linearGradient>
            </defs>

            {/* 美食外卖袋 */}
            <path d="M22 36L28 82C28.5 85 31 87 34 87H68C71 87 73.5 85 74 82L80 36H22Z" fill="url(#bagGrad)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.2))" />
            <path d="M20 36H82V32C82 30 80 28 78 28H24C22 28 20 30 20 32V36Z" fill="#FDE68A" />
            {/* 提手 */}
            <path d="M38 28V20C38 16 42 13 46 13H56C60 13 64 16 64 20V28" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />

            {/* 外卖袋上的笑脸美食标 */}
            <circle cx="51" cy="56" r="14" fill="#FFFFFF" opacity="0.9" />
            <path d="M43 56C45 61 57 61 59 56" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="46" cy="51" r="2" fill="#EA580C" />
            <circle cx="56" cy="51" r="2" fill="#EA580C" />

            {/* 前置大额神券红包 */}
            <g transform="translate(42, 48) rotate(-10)">
              <rect x="0" y="0" width="48" height="26" rx="4" fill="url(#couponRed)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))" />
              <rect x="2" y="2" width="44" height="22" rx="3" stroke="#FCA5A5" strokeWidth="0.8" strokeDasharray="2 1" />
              <text x="5" y="17" fill="#FEF08A" fontSize="12" fontWeight="900" fontFamily="sans-serif">¥50</text>
              <text x="25" y="12" fill="#FFFFFF" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">美团神券</text>
              <text x="25" y="20" fill="#FEE2E2" fontSize="5" fontFamily="sans-serif">外卖/生鲜可用</text>
            </g>

            {/* 装饰生鲜小叶子 */}
            <path d="M78 26C78 26 84 22 88 26C88 30 84 34 78 34" fill="#10B981" />
          </svg>
        )}

        {theme === 'drama' && (
          <svg className="w-24 h-24 drop-shadow-md" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="clapperGrad" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#1E1B4B" />
                <stop offset="1" stopColor="#312E81" />
              </linearGradient>
              <linearGradient id="neonVip" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#F43F5E" />
                <stop offset="1" stopColor="#A855F7" />
              </linearGradient>
            </defs>

            {/* 电影场记板 (Clapperboard) */}
            <g transform="translate(18, 22) rotate(-6)">
              {/* 板身 */}
              <rect x="0" y="18" width="60" height="44" rx="6" fill="url(#clapperGrad)" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.35))" />
              
              {/* 板头（黑白条纹） */}
              <g transform="translate(0, 0)">
                <rect x="0" y="0" width="60" height="15" rx="3" fill="#0F172A" />
                <polygon points="6,0 12,0 7,15 1,15" fill="#FFFFFF" />
                <polygon points="18,0 24,0 19,15 13,15" fill="#FFFFFF" />
                <polygon points="30,0 36,0 31,15 25,15" fill="#FFFFFF" />
                <polygon points="42,0 48,0 43,15 37,15" fill="#FFFFFF" />
                <polygon points="54,0 60,0 55,15 49,15" fill="#FFFFFF" />
              </g>

              {/* 场记板中间发光播放按钮 */}
              <circle cx="30" cy="40" r="14" fill="url(#neonVip)" filter="drop-shadow(0 0 6px #EC4899)" />
              <polygon points="26,33 38,40 26,47" fill="#FFFFFF" />
            </g>

            {/* 短剧 VIP 电影票 */}
            <g transform="translate(45, 48) rotate(14)">
              <rect x="0" y="0" width="46" height="24" rx="4" fill="#FCE7F3" filter="drop-shadow(0 3px 6px rgba(0,0,0,0.3))" />
              <text x="6" y="16" fill="#BE185D" fontSize="10" fontWeight="900" fontFamily="sans-serif">VIP短剧</text>
              <line x1="33" y1="4" x2="33" y2="20" stroke="#DB2777" strokeWidth="1" strokeDasharray="1.5 1.5" />
              <circle cx="33" cy="2" r="2.5" fill="#7C3AED" />
              <circle cx="33" cy="22" r="2.5" fill="#7C3AED" />
              <text x="36" y="15" fill="#9D174D" fontSize="7" fontWeight="bold" fontFamily="sans-serif">畅看</text>
            </g>

            {/* 霓虹闪光 */}
            <circle cx="78" cy="20" r="3" fill="#F472B6" filter="drop-shadow(0 0 4px #F472B6)" />
            <circle cx="16" cy="74" r="2" fill="#A78BFA" />
          </svg>
        )}

        {theme === 'blackgold' && (
          <svg className="w-24 h-24 drop-shadow-md" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="crownGold" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#FDE68A" />
                <stop offset="0.5" stopColor="#F59E0B" />
                <stop offset="1" stopColor="#B45309" />
              </linearGradient>
              <linearGradient id="blackCard" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#2A2D3A" />
                <stop offset="1" stopColor="#14151C" />
              </linearGradient>
              <linearGradient id="goldBorder" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#FDE68A" />
                <stop offset="1" stopColor="#92400E" />
              </linearGradient>
            </defs>

            {/* 黑金尊贵卡片底衬 */}
            <g transform="translate(18, 30) rotate(-10)">
              <rect x="0" y="0" width="62" height="38" rx="6" fill="url(#blackCard)" stroke="url(#goldBorder)" strokeWidth="1.2" filter="drop-shadow(0 6px 12px rgba(0,0,0,0.6))" />
              {/* 卡片芯片 */}
              <rect x="8" y="8" width="10" height="8" rx="2" fill="#D97706" />
              <line x1="8" y1="12" x2="18" y2="12" stroke="#FEF3C7" strokeWidth="0.8" />
              {/* VIP 字样 */}
              <text x="32" y="16" fill="#FDE68A" fontSize="8" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">BLACK VIP</text>
              <text x="8" y="30" fill="#9CA3AF" fontSize="5.5" fontFamily="monospace">**** 8888</text>
            </g>

            {/* 3D 皇冠 */}
            <g transform="translate(36, 12) rotate(6)">
              {/* 皇冠本体 */}
              <path d="M4 32L10 12L22 22L34 6L46 22L58 12L64 32H4Z" fill="url(#crownGold)" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.45))" />
              <rect x="4" y="31" width="60" height="5" rx="2.5" fill="#B45309" />
              {/* 皇冠顶端宝石 */}
              <circle cx="10" cy="11" r="2.5" fill="#FEF08A" />
              <circle cx="34" cy="5" r="3.5" fill="#EF4444" stroke="#FEF08A" strokeWidth="0.8" />
              <circle cx="58" cy="11" r="2.5" fill="#FEF08A" />
              {/* 皇冠中轴大钻石 */}
              <polygon points="34,16 38,22 34,28 30,22" fill="#E0F2FE" />
            </g>

            {/* 奢华金色光粉微粒 */}
            <circle cx="82" cy="24" r="1.5" fill="#FDE68A" filter="drop-shadow(0 0 3px #FDE68A)" />
            <circle cx="20" cy="22" r="1" fill="#FDE68A" />
            <circle cx="85" cy="65" r="1.5" fill="#FDE68A" />
          </svg>
        )}
      </div>

      {/* 4. 选中态标记 (Selected Badge) */}
      {isSelected && (
        <div className="absolute top-2 right-2 z-20 flex items-center space-x-1 bg-white/95 text-slate-900 px-2 py-0.5 rounded-full shadow-md text-[10px] font-black animate-in fade-in zoom-in-95 duration-150">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>当前选择</span>
        </div>
      )}
    </div>
  );
};
