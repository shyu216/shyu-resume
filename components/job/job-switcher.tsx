"use client";

import React, { useContext, useRef, useEffect, useState } from "react";
import { ElegantTooltip } from "@/components/ui/tooltip";
import { LanguageContext } from "@/components/lang/language-provider";
import { useFontFamily } from "@/components/font/font-provider";
import { cn } from "@/lib/utils";
import { jobOptions, type JobType, type JobSwitcherProps } from "@/lib/job-types";

export { JobType, JobSwitcherProps };

export function JobSwitcher({ jobType, onJobTypeChange }: JobSwitcherProps) {
  const { language } = useContext(LanguageContext);
  const { fontFamily } = useFontFamily();
  const [barPosition, setBarPosition] = useState(0);
  const [barWidth, setBarWidth] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [previousJobType, setPreviousJobType] = useState<JobType>('PERFORMER');
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const xButtonRef = useRef<HTMLButtonElement | null>(null);

  const activeIndex = jobOptions.findIndex(option => option.value === jobType);
  const isNoneActive = jobType === 'NONE';

  // 记录上一次的职位选择
  useEffect(() => {
    if (!isNoneActive) {
      setPreviousJobType(jobType);
    }
  }, [jobType, isNoneActive]);

  // 获取对应语言的tooltip
  const getTooltip = (option: typeof jobOptions[number]) => {
    switch (language) {
      case 'zh': return option.tooltipZh;
      case 'ja': return option.tooltipJa;
      case 'fr': return option.tooltipFr;
      default: return option.tooltipZh;
    }
  };

  // 计算 bar 的位置和宽度
  useEffect(() => {
    const updateBarPosition = () => {
      if (isNoneActive) {
        const containerRect = buttonRefs.current[0]?.parentElement?.getBoundingClientRect();
        if (containerRect) {
          setBarPosition(4);
          setBarWidth(containerRect.width - 8);
        }
      } else {
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
      initBar();
    }

    const fallbackTimer = setTimeout(initBar, 300);
    window.addEventListener('resize', updateBarPosition);

    return () => {
      clearTimeout(fallbackTimer);
      window.removeEventListener('resize', updateBarPosition);
    };
  }, [jobType, fontFamily, isNoneActive]);

  return (
    <div className="relative inline-block">
      <div
        className="flex rounded-full p-1 overflow-hidden backdrop-blur-sm"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--color-card-default) 50%, transparent)',
          boxShadow: 'var(--shadow-soft)'
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
            background: isNoneActive
              ? 'var(--color-overlay)'
              : `linear-gradient(to bottom, color-mix(in srgb, var(--header-color) 90%, transparent), color-mix(in srgb, var(--header-color) 70%, transparent))`,
            boxShadow: isNoneActive
              ? 'var(--shadow-soft)'
              : 'var(--shadow-accent)',
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          {!isNoneActive && hoveredIndex !== null && hoveredIndex !== activeIndex && (
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
              className="relative z-10 px-4 py-1 rounded-full transition-all duration-200 font-medium hover:text-[var(--color-text-primary)]"
              style={{
                color: jobType === option.value ? 'var(--color-white)' : 'var(--color-text-primary)'
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {option.label}
            </button>
          </ElegantTooltip>
        ))}

        {/* X 按钮 - 最右侧 */}
        <ElegantTooltip
          content={
            language === 'zh' ? '显示全部经历' :
            language === 'ja' ? 'すべての経歴を表示' :
            'Afficher toutes les expériences'
          }
          side="bottom"
        >
          <button
            ref={xButtonRef}
            onClick={() => {
              if (isNoneActive) {
                // 如果当前是 NONE，点击 X 返回上一次的职位
                onJobTypeChange(previousJobType);
              } else {
                // 否则切换到 NONE
                onJobTypeChange('NONE');
              }
            }}
            className="relative z-10 px-3 py-1 rounded-full transition-all duration-200 font-medium ml-1 hover:text-[var(--color-text-primary)]"
            style={{
              color: isNoneActive ? 'var(--color-white)' : 'var(--color-text-primary)',
              minWidth: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
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
}
