import React from 'react';
import { MembershipSkuId } from '../types';
import { Smartphone, Utensils, Film, Crown, Zap } from 'lucide-react';

interface SkuProductLogoProps {
  skuId: MembershipSkuId;
  size?: 'sm' | 'md' | 'lg';
}

export const SkuProductLogo: React.FC<SkuProductLogoProps> = ({ 
  skuId,
  size = 'md' 
}) => {
  const sizeClasses = 
    size === 'sm' ? 'w-9 h-9 rounded-lg' :
    size === 'lg' ? 'w-12 h-12 rounded-xl' :
    'w-11 h-11 rounded-xl';

  if (skuId === 'tier_0') {
    return (
      <div className={`relative ${sizeClasses} shrink-0 bg-gradient-to-br from-[#FF4C24] via-[#FF5F2E] to-[#FE2C55] p-0.5 shadow-sm shadow-rose-500/25 flex items-center justify-center overflow-hidden`}>
        {/* 背景微光 */}
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-300/30 rounded-full blur-xs pointer-events-none" />
        <div className="w-full h-full rounded-[10px] flex flex-col items-center justify-center text-white relative z-10">
          <Smartphone className="w-5 h-5 text-white drop-shadow-2xs stroke-[2.2]" />
          <div className="absolute -bottom-0.5 bg-amber-300 text-[#B91C1C] text-[8px] font-black px-1 rounded-full leading-tight shadow-xs scale-90">
            充值
          </div>
        </div>
      </div>
    );
  }

  if (skuId === 'tier_1') {
    return (
      <div className={`relative ${sizeClasses} shrink-0 bg-gradient-to-br from-[#EA580C] via-[#F97316] to-[#EAB308] p-0.5 shadow-sm shadow-orange-500/25 flex items-center justify-center overflow-hidden`}>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-200/35 rounded-full blur-xs pointer-events-none" />
        <div className="w-full h-full rounded-[10px] flex flex-col items-center justify-center text-white relative z-10">
          <Utensils className="w-5 h-5 text-white drop-shadow-2xs stroke-[2.2]" />
          <div className="absolute -bottom-0.5 bg-yellow-200 text-[#C2410C] text-[8px] font-black px-1 rounded-full leading-tight shadow-xs scale-90">
            生活
          </div>
        </div>
      </div>
    );
  }

  if (skuId === 'tier_2') {
    return (
      <div className={`relative ${sizeClasses} shrink-0 bg-gradient-to-br from-[#6366F1] via-[#8B5CF6] to-[#EC4899] p-0.5 shadow-sm shadow-purple-500/25 flex items-center justify-center overflow-hidden`}>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-pink-300/35 rounded-full blur-xs pointer-events-none" />
        <div className="w-full h-full rounded-[10px] flex flex-col items-center justify-center text-white relative z-10">
          <Film className="w-5 h-5 text-white drop-shadow-2xs stroke-[2.2]" />
          <div className="absolute -bottom-0.5 bg-pink-200 text-[#831843] text-[8px] font-black px-1 rounded-full leading-tight shadow-xs scale-90">
            影音
          </div>
        </div>
      </div>
    );
  }

  // tier_3: 黑金尊享
  return (
    <div className={`relative ${sizeClasses} shrink-0 bg-gradient-to-br from-[#1E202B] via-[#2A2C3C] to-[#111218] p-0.5 shadow-sm shadow-black/40 border border-amber-400/40 flex items-center justify-center overflow-hidden`}>
      <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400/25 rounded-full blur-xs pointer-events-none" />
      <div className="w-full h-full rounded-[10px] flex flex-col items-center justify-center text-amber-300 relative z-10">
        <Crown className="w-5 h-5 text-amber-300 fill-amber-300 drop-shadow-2xs" />
        <div className="absolute -bottom-0.5 bg-gradient-to-r from-amber-300 to-yellow-400 text-slate-950 text-[8px] font-black px-1 rounded-full leading-tight shadow-xs scale-90">
          黑金
        </div>
      </div>
    </div>
  );
};
