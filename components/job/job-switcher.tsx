"use client";

import React, { useContext, useRef, useEffect, useState } from "react";
import { ElegantTooltip } from "@/components/ui/tooltip";
import { LanguageContext } from "@/components/lang/language-provider";
import { 
  useSurfaceColor, 
  usePrimaryColor, 
  useTextColor, 
  useCardColor,
  useThemeValue,
  useSoftShadow,
  useAccentShadow
} from "@/lib/theme-utils";

const jobOptions = [
  { value: 'FULLSTACK', label: 'Full Stack', tooltipEn: 'Highlight keywords for Full Stack', tooltipZh: '高亮 Full Stack 关键词', tooltipZhHk: '高亮 Full Stack 關鍵詞' },
  { value: 'SOFTWARE', label: 'SWE', tooltipEn: 'Highlight keywords for SWE', tooltipZh: '高亮 SWE 关键词', tooltipZhHk: '高亮 SWE 關鍵詞' },
  { value: 'ML_RESEARCHER', label: 'ML', tooltipEn: 'Highlight keywords for ML', tooltipZh: '高亮 ML 关键词', tooltipZhHk: '高亮 ML 關鍵詞' },
];

export type JobType = 'FULLSTACK' | 'SOFTWARE' | 'ML_RESEARCHER';

interface JobSwitcherProps {
  jobType: JobType;
  onJobTypeChange: (jobType: JobType) => void;
}

export const JobSwitcher: React.FC<JobSwitcherProps> = ({ jobType, onJobTypeChange }) => {
  const { language } = useContext(LanguageContext);
  const [barPosition, setBarPosition] = useState(0);
  const [barWidth, setBarWidth] = useState(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  
  const containerBg = useCardColor('live');
  const primaryColor = usePrimaryColor();
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
    
    // 监听窗口 resize
    window.addEventListener('resize', updateBarPosition);
    
    return () => {
      window.removeEventListener('resize', updateBarPosition);
    };
  }, [jobType]);

  return (
    <div className="relative inline-block">
      <div 
        className="flex rounded-full p-1 overflow-hidden"
        style={{ 
          backgroundColor: containerBg,
          boxShadow: softShadow
        }}
      >
        {/* 背景滑动条 */}
        <div 
          className="absolute top-1 bottom-1 rounded-full transition-all duration-300 ease-in-out"
          style={{ 
            left: `${barPosition + 1}px`, // +1 to match the parent's p-1 padding
            width: `${barWidth}px`,
            background: `linear-gradient(to bottom, ${primaryColor}90, ${primaryColor}70)`,
            boxShadow: accentShadow
          }}
        />
        
        {/* 按钮 */}
        {jobOptions.map((option, index) => (
          <ElegantTooltip key={option.value} content={getTooltip(option)} side="bottom">
            <button
              ref={el => buttonRefs.current[index] = el}
              onClick={() => onJobTypeChange(option.value as JobType)}
              className={`relative z-10 px-4 py-1 rounded-full transition-all duration-200 font-medium`}
              style={{
                color: jobType === option.value ? '#ffffff' : textSecondary
              }}
              onMouseEnter={(e) => {
                if (jobType !== option.value) {
                  e.currentTarget.style.color = textPrimary;
                }
              }}
              onMouseLeave={(e) => {
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