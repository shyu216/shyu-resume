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
  { value: 'DEVOPS', label: 'DevOps', tooltipEn: 'Cloud/DevOps/SRE — Infrastructure & CI/CD', tooltipZh: '云/DevOps 工程师 — 基础设施与 CI/CD', tooltipZhHk: '雲/DevOps 工程師 — 基礎設施與 CI/CD' },
  { value: 'ML_RESEARCHER', label: 'ML', tooltipEn: 'ML Researcher — AI & algorithms', tooltipZh: '机器学习研究员 — AI 与算法', tooltipZhHk: '機器學習研究員 — AI 與算法' },
];

export type JobType = 'FULLSTACK' | 'SOFTWARE' | 'DEVOPS' | 'ML_RESEARCHER' | 'NONE';

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
  const [previousJobType, setPreviousJobType] = useState<JobType>('FULLSTACK');
  const [animatingJobType, setAnimatingJobType] = useState<JobType>(jobType);
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const xButtonRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const activeIndex = jobOptions.findIndex(option => option.value === jobType);
  const isNoneActive = jobType === 'NONE';
    
  const prevIndex = (activeIndex - 1 + jobOptions.length) % jobOptions.length;
  const nextIndex = (activeIndex + 1) % jobOptions.length;
  
  useEffect(() => {
    if (!isNoneActive) {
      setPreviousJobType(jobType);
    }
  }, [jobType, isNoneActive]);
  
  useEffect(() => {
    if (!isNoneActive && jobType !== animatingJobType) {
      const currentIndex = jobOptions.findIndex(option => option.value === animatingJobType);
      const newIndex = jobOptions.findIndex(option => option.value === jobType);
      setAnimationDirection(newIndex > currentIndex ? 'right' : 'left');
      setIsAnimating(true);
      setTimeout(() => {
        setAnimatingJobType(jobType);
        setIsAnimating(false);
      }, 300);
    }
  }, [jobType, isNoneActive, animatingJobType]);
  
  const containerBg = useCardColor('live');
  const headerColor = useHeaderColor();
  const textPrimary = useTextColor();
  const textSecondary = useTextColor();
  const softShadow = useSoftShadow();
  const accentShadow = useAccentShadow();
  
  const noneBarBg = '#1e293b';
  
  const getTooltip = (option: typeof jobOptions[0]) => {
    switch (language) {
      case 'zh': return option.tooltipZh;
      case 'zh-hk': return option.tooltipZhHk;
      default: return option.tooltipEn;
    }
  };

  useEffect(() => {
    const updateBarPosition = () => {
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return;

      if (isNoneActive) {
        setBarPosition(4);
        setBarWidth(containerRect.width - 8);
      } else {
        const activeButton = buttonRefs.current[activeIndex];
        
        if (activeButton) {
          const rect = activeButton.getBoundingClientRect();
          const position = rect.left - containerRect.left;
          setBarPosition(position);
          setBarWidth(rect.width);
        }
      }
    };

    updateBarPosition();
    
    const initBar = () => {
      updateBarPosition();
      setIsInitialized(true);
    };
    
    if (document.fonts) {
      document.fonts.ready.then(initBar);
    } else {
      initBar();
    }
    
    const fallbackTimer = setTimeout(initBar, 300);
    window.addEventListener('resize', updateBarPosition);
    
    return () => {
      clearTimeout(fallbackTimer);
      window.removeEventListener('resize', updateBarPosition);
    };
  }, [jobType, fontFamily, isNoneActive, activeIndex]);

  const handlePrevious = () => {
    const currentIndex = jobOptions.findIndex(option => option.value === jobType);
    const previousIndex = (currentIndex - 1 + jobOptions.length) % jobOptions.length;
    onJobTypeChange(jobOptions[previousIndex].value as JobType);
  };

  const handleNext = () => {
    const currentIndex = jobOptions.findIndex(option => option.value === jobType);
    const nextIndex = (currentIndex + 1) % jobOptions.length;
    onJobTypeChange(jobOptions[nextIndex].value as JobType);
  };

  return (
    <div className="relative inline-block" ref={containerRef}>
      <div 
        className="flex rounded-full p-1 overflow-hidden backdrop-blur-sm items-center relative"
        style={{ 
          backgroundColor: `${containerBg}80`,
          boxShadow: softShadow
        }}
      >
        {/* 背景滑动条 */}
        <div 
          className={cn(
            "absolute z-0 rounded-full transition-all duration-300 flex items-center justify-between px-1",
            !isInitialized && "opacity-0"
          )}
          style={{ 
            top: '4px',
            bottom: '4px',
            left: `${barPosition}px`,
            width: `${barWidth}px`,
            background: isNoneActive 
              ? `${noneBarBg}80`
              : `linear-gradient(to bottom, ${headerColor}90, ${headerColor}70)`,
            boxShadow: isNoneActive 
              ? softShadow
              : accentShadow,
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          {!isNoneActive && hoveredIndex !== null && hoveredIndex !== activeIndex && (
            <>
              {hoveredIndex < activeIndex && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white/70" viewBox="0 0 20 20" fill="currentColor" style={{ pointerEvents: 'none' }}>
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {hoveredIndex > activeIndex && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white/70 ml-auto" viewBox="0 0 20 20" fill="currentColor" style={{ pointerEvents: 'none' }}>
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </>
          )}
        </div>
        
        {/* 左箭头按钮 */}
        <ElegantTooltip
          content={getTooltip(jobOptions[prevIndex])}
          side="bottom"
        >
          <button
            onClick={handlePrevious}
            className="relative z-10 w-6 h-8 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              color: textSecondary,
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = textPrimary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = textSecondary;
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" style={{ pointerEvents: 'none' }}>
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </ElegantTooltip>
        
        {/* 当前选中的选项 */}
        <div className="flex-1 min-w-0 px-2">
          <div className="relative overflow-hidden" style={{ width: '96px' }}>
            {!isNoneActive && (
              <ElegantTooltip 
                content={getTooltip(jobOptions[activeIndex])} 
                side="bottom"
              >
                <div
                  ref={el => { buttonRefs.current[activeIndex] = el as HTMLButtonElement | null; }}
                  className="relative z-10 w-full h-8 rounded-full font-medium text-center whitespace-nowrap overflow-hidden"
                  style={{
                    color: '#ffffff'
                  }}
                >
                  <span
                    className="absolute left-0 top-0 w-full h-full flex items-center justify-center"
                    style={{
                      transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      transform: isAnimating 
                        ? `translateX(${animationDirection === 'left' ? '100%' : '-100%'})`
                        : 'translateX(0)'
                    }}
                  >
                    {jobOptions.find(opt => opt.value === animatingJobType)?.label}
                  </span>
                  {isAnimating && (
                    <span
                      className="absolute left-0 top-0 w-full h-full flex items-center justify-center"
                      style={{
                        transform: animationDirection === 'left' 
                          ? 'translateX(-100%)' 
                          : 'translateX(100%)',
                        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        pointerEvents: 'none'
                      }}
                    >
                      {jobOptions[activeIndex]?.label}
                    </span>
                  )}
                </div>
              </ElegantTooltip>
            )}
            {isNoneActive && (
              <button
                className="relative z-10 w-full h-8 rounded-full font-medium text-center whitespace-nowrap"
                style={{
                  color: '#ffffff'
                }}
              >
                {jobOptions.find(opt => opt.value === previousJobType)?.label}
              </button>
            )}
          </div>
        </div>
        
        {/* 右箭头按钮 */}
        <ElegantTooltip
          content={getTooltip(jobOptions[nextIndex])}
          side="bottom"
        >
          <button
            onClick={handleNext}
            className="relative z-10 w-6 h-8 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              color: textSecondary,
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = textPrimary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = textSecondary;
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" style={{ pointerEvents: 'none' }}>
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </ElegantTooltip>
        
        {/* X 按钮 */}
        <ElegantTooltip 
          content={
            language === 'zh' ? '显示全部经历' : 
            language === 'zh-hk' ? '顯示全部經歷' : 
            'Show all experiences'
          } 
          side="bottom"
        >
          <button
            ref={xButtonRef}
            onClick={() => {
              if (isNoneActive) {
                onJobTypeChange(previousJobType);
              } else {
                onJobTypeChange('NONE');
              }
            }}
            className="relative z-10 px-3 py-1 rounded-full transition-all duration-200 font-medium ml-1"
            style={{
              color: isNoneActive ? '#ffffff' : textSecondary,
              minWidth: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              if (!isNoneActive) {
                e.currentTarget.style.color = textPrimary;
              }
            }}
            onMouseLeave={(e) => {
              if (!isNoneActive) {
                e.currentTarget.style.color = textSecondary;
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </ElegantTooltip>
      </div>
    </div>
  );
};