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
  { value: 'FULLSTACK', label: 'Full Stack', tooltipEn: 'Full Stack Engineer — End-to-end development', tooltipZh: '全栈工程师 — 端到端开发', tooltipZhHk: '全棧工程師 — 端到端開發' },
  { value: 'SOFTWARE', label: 'SWE', tooltipEn: 'Software Engineer — System & architecture', tooltipZh: '软件工程师 — 系统与架构', tooltipZhHk: '軟件工程師 — 系統與架構' },
  { value: 'ML_RESEARCHER', label: 'ML', tooltipEn: 'ML Researcher — AI & algorithms', tooltipZh: '机器学习研究员 — AI 与算法', tooltipZhHk: '機器學習研究員 — AI 與算法' },
];

export type JobType = 'FULLSTACK' | 'SOFTWARE' | 'ML_RESEARCHER';

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
      case 'zh-hk': return option.tooltipZhHk;
      default: return option.tooltipEn;
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
    setIsInitialized(true);
    
    // 监听窗口 resize
    window.addEventListener('resize', updateBarPosition);
    
    return () => {
      window.removeEventListener('resize', updateBarPosition);
    };
  }, [jobType, fontFamily]);

  return (
    <div className="relative inline-block">
      <div 
        className="flex rounded-full p-1 overflow-hidden backdrop-blur-sm"
        style={{ 
          backgroundColor: `${containerBg}80`,
          boxShadow: softShadow
        }}
      >
        {/* 背景滑动条 */}
        <div 
          className={cn(
            "absolute rounded-full transition-all duration-300 flex items-center justify-between px-1",
            !isInitialized && "opacity-0"
          )}
          style={{ 
            top: '4px',
            bottom: '4px',
            left: `${barPosition}px`,
            width: `${barWidth}px`,
            background: `linear-gradient(to bottom, ${headerColor}90, ${headerColor}70)`,
            boxShadow: accentShadow,
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          {hoveredIndex !== null && hoveredIndex !== activeIndex && (
            <>
              {hoveredIndex < activeIndex && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white/70" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {hoveredIndex > activeIndex && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white/70 ml-auto" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </>
          )}
        </div>
        
        {/* 按钮 */}
        {jobOptions.map((option, index) => (
          <ElegantTooltip key={option.value} content={getTooltip(option)} side="bottom">
            <button
              ref={el => buttonRefs.current[index] = el}
              onClick={() => onJobTypeChange(option.value as JobType)}
              className="relative z-10 px-4 py-1 rounded-full transition-all duration-200 font-medium"
              style={{
                color: jobType === option.value ? '#ffffff' : textSecondary
              }}
              onMouseEnter={(e) => {
                setHoveredIndex(index);
                if (jobType !== option.value) {
                  e.currentTarget.style.color = textPrimary;
                }
              }}
              onMouseLeave={(e) => {
                setHoveredIndex(null);
                if (jobType !== option.value) {
                  e.currentTarget.style.color = textSecondary;
                }
              }}
            >
              {option.label}
            </button>
          </ElegantTooltip>
        ))}
      </div>
    </div>
  );
};