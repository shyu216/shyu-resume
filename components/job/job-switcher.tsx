"use client";

import React, { useContext, useRef, useEffect, useState } from "react";
import { ElegantTooltip } from "@/components/ui/tooltip";
import { LanguageContext } from "@/components/lang/language-provider";
import { useFontFamily } from "@/components/font/font-provider";
import { cn } from "@/lib/utils";
import { 
  useSurfaceColor, 
  useHeaderColor, 
  useTextColor, 
  useCardColor,
  useThemeValue,
  useSoftShadow,
  useAccentShadow
} from "@/lib/theme-utils";

const jobOptions = [
  { value: 'PERFORMER', label: '表演', tooltipZh: '戏曲表演家 — 舞台演出与唱腔', tooltipJa: '戏曲俳優 — 舞台演技と歌唱', tooltipFr: 'Artiste d\'opéra — Performance scénique' },
  { value: 'COMPOSER', label: '创作', tooltipZh: '剧作家 — 剧本与音乐创作', tooltipJa: '劇作家 — 脚本と音楽創作', tooltipFr: 'Dramaturge — Écriture et composition' },
  { value: 'DIRECTOR', label: '管理', tooltipZh: '云翰社当家 — 剧团管理与传承', tooltipJa: '雲翰社当主 — 劇団運営と伝承', tooltipFr: 'Directrice — Gestion et transmission' },
];

export type JobType = 'PERFORMER' | 'COMPOSER' | 'DIRECTOR';

interface JobSwitcherProps {
  jobType: JobType;
  onJobTypeChange: (jobType: JobType) => void;
}

export const JobSwitcher: React.FC<JobSwitcherProps> = ({ jobType, onJobTypeChange }) => {
  const { language } = useContext(LanguageContext);
  const { fontFamily } = useFontFamily();
  const [barPosition, setBarPosition] = useState(0);
  const [barWidth, setBarWidth] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  
  const activeIndex = jobOptions.findIndex(option => option.value === jobType);
  
  const containerBg = useCardColor('live');
  const headerColor = useHeaderColor();
  const textPrimary = useTextColor();
  const textSecondary = useTextColor();
  const softShadow = useSoftShadow();
  const accentShadow = useAccentShadow();
  
  // 获取对应语言的tooltip
  const getTooltip = (option: typeof jobOptions[0]) => {
    switch (language) {
      case 'zh': return option.tooltipZh;
      case 'ja': return option.tooltipJa;
      case 'fr': return option.tooltipFr;
      default: return option.tooltipZh;
    }
  };

  // 计算bar的位置和宽度
  useEffect(() => {
    const updateBarPosition = () => {
      const activeIndex = jobOptions.findIndex(option => option.value === jobType);
      const activeButton = buttonRefs.current[activeIndex];
      
      if (activeButton) {
        const rect = activeButton.getBoundingClientRect();
        const containerRect = activeButton.parentElement?.getBoundingClientRect();
        
        if (containerRect) {
          const position = rect.left - containerRect.left;
          setBarPosition(position);
          setBarWidth(rect.width);
        }
      }
    };

    // 初始计算
    updateBarPosition();
    
    // 等待字体加载完成后再显示 bar
    const initBar = () => {
      updateBarPosition();
      setIsInitialized(true);
    };
    
    if (document.fonts) {
      document.fonts.ready.then(initBar);
    } else {
      // 降级方案：不支持 document.fonts 的浏览器
      initBar();
    }
    
    // 额外保险：延迟再检查一次（移动端兼容）
    const fallbackTimer = setTimeout(initBar, 300);
    
    // 监听窗口 resize
    window.addEventListener('resize', updateBarPosition);
    
    return () => {
      clearTimeout(fallbackTimer);
      window.removeEventListener('resize', updateBarPosition);
    };
  }, [jobType]);

  const handleClick = (value: JobType) => {
    onJobTypeChange(value);
  };

  return (
    <div 
      className={cn(
        "relative inline-flex items-center rounded-full p-1.5 gap-1",
        "transition-all duration-300"
      )}
      style={{ 
        backgroundColor: containerBg,
        boxShadow: softShadow,
        fontFamily: fontFamily
      }}
    >
      {/* 滑动背景条 */}
      <div
        className={cn(
          "absolute top-1.5 bottom-1.5 rounded-full transition-all duration-300 ease-out",
          isInitialized ? "opacity-100" : "opacity-0"
        )}
        style={{
          left: `${barPosition}px`,
          width: `${barWidth}px`,
          backgroundColor: headerColor,
          boxShadow: accentShadow,
        }}
      />
      
      {jobOptions.map((option, index) => {
        const isActive = jobType === option.value;
        const isHovered = hoveredIndex === index;
        
        return (
          <ElegantTooltip key={option.value} content={getTooltip(option)}>
            <button
              ref={(el) => { buttonRefs.current[index] = el; }}
              onClick={() => handleClick(option.value as JobType)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={cn(
                "relative z-10 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                isActive 
                  ? "text-white" 
                  : "hover:text-opacity-80"
              )}
              style={{
                color: isActive ? '#ffffff' : textSecondary,
              }}
            >
              {option.label}
            </button>
          </ElegantTooltip>
        );
      })}
    </div>
  );
};
