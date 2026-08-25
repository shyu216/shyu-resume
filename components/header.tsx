"use client";

// The header of the webpage, not in PDF

import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Container } from "./ui/container";
import { HoverLink } from "./ui/tooltip";
import { JobSwitcherWrapper } from "./job/job-switcher-wrapper";
import { BilangSwitch } from "./lang/bilang-switch";
import { getColor, siteConfig } from "@/content/config";
import { useTheme } from "next-themes";
import ActionButton from "./ui/action-button";

export function Header() {
  const githubUsername = siteConfig.personal.contact.github.split('/').pop();
  const { resolvedTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const [useMobileSwitcher, setUseMobileSwitcher] = useState(false);
  // 用 ref 同步状态，避免 useEffect 闭包捕获陈旧值
  const useMobileRef = useRef(useMobileSwitcher);
  useMobileRef.current = useMobileSwitcher;

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerColor = getColor()[resolvedTheme === "dark" ? "dark" : "light"];

  useEffect(() => {
    document.documentElement.style.setProperty("--header-color", headerColor);
  }, [headerColor]);

  // 动态布局检测：测量组件实际宽度，自动决定 JobSwitcher 变体。
  // 核心策略（解决循环依赖和布局跳跃）：
  // 1. 用 ref 访问当前状态，useEffect 依赖 [] 只运行一次
  // 2. 以"第2行宽度（JobSwitcher + Bilang + Theme）"为参考系，
  //    只在第2行即将断裂时切换变体，而非第1行总宽度不足时
  // 3. 滞后效应：切到 mobile 的阈值低，切回 desktop 的阈值高，中间有死区
  // 4. 当 flex-wrap 自然换行时，ml-auto 自动处理 ActionButton 右对齐
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    let observer: ResizeObserver | null = null;
    let timer: ReturnType<typeof setTimeout>;

    const measure = () => {
      const children = Array.from(nav.children) as HTMLElement[];
      if (children.length < 5) return;

      // 临时禁止换行，测量自然宽度
      const origWrap = nav.style.flexWrap;
      nav.style.flexWrap = 'nowrap';
      void nav.offsetHeight;
      const widths = children.map(c => c.offsetWidth);
      nav.style.flexWrap = origWrap;

      const gap = 16; // gap-4
      // 第2行宽度：JobSwitcher(索引2) + Bilang(3) + Theme(4) + 2个gap
      // 这是 2 行布局的瓶颈——第2行放不下时才会出现第3行
      const row2Width = widths[2] + widths[3] + widths[4] + 2 * gap;
      // 估算 desktop 版本的 row2 宽度（mobile 比 desktop 窄 ~60px）
      const desktopRow2Width = useMobileRef.current ? row2Width + 60 : row2Width;

      const containerWidth = nav.offsetWidth;
      const isMobile = useMobileRef.current;
      const hysteresis = 15; // 滞后死区宽度，防止振荡

      if (isMobile) {
        // 当前是 mobile：只有容器足够宽，能容纳 desktop 版第2行时才切回
        // 阈值 = desktopRow2Width + hysteresis，需要明确"足够宽"才切换
        if (containerWidth > desktopRow2Width + hysteresis) {
          setUseMobileSwitcher(false);
        }
      } else {
        // 当前是 desktop：只有第2行放不下时才切到 mobile
        // 阈值 = desktopRow2Width - hysteresis，需要明确"放不下"才切换
        if (containerWidth < desktopRow2Width - hysteresis) {
          setUseMobileSwitcher(true);
        }
      }
    };

    // 初始测量（等待字体渲染）
    timer = setTimeout(measure, 200);

    // 持续监测容器宽度变化
    observer = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(measure, 100);
    });
    observer.observe(nav);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, []); // 只运行一次，通过 ref 避免闭包陈旧问题

  const avatar = (
    <HoverLink href="/">
      <Image
        src={`https://github.com/${githubUsername}.png`}
        alt="Portrait"
        width={48}
        height={48}
        className="w-9 h-9 rounded-full ring-2 ring-stone-200 dark:ring-stone-300/40 shrink-0"
      />
    </HoverLink>
  );

  return (
    <header className="sticky top-0 z-50">
      <Container
        className="py-3"
        style={{
          "--header-color": headerColor,
        } as React.CSSProperties}
      >
        <div
          data-glass="true"
          className={`mx-1 my-1 p-1 rounded-xl transition-all duration-300 ${
            isScrolled
              ? "border backdrop-blur-sm"
              : "border border-transparent bg-transparent"
          }`}
          style={
            isScrolled
              ? {
                  borderColor: "color-mix(in srgb, var(--color-border-default) 55%, transparent)",
                  backgroundColor: "color-mix(in srgb, var(--color-card-default) 50%, transparent)",
                  boxShadow: "var(--shadow-soft)",
                }
              : undefined
          }
        >
          <nav
            ref={navRef}
            className="flex flex-wrap items-center gap-4 w-full"
          >
            {avatar}
            {/* ml-auto 将操作按钮组推到右侧：
                - 桌面端(>=1024px): [Avatar] ... [JobSwitcher][Bilang][Theme][SavePDF]
                - 移动端(<1024px): flex-wrap 自然换行，SavePDF 隐藏，由浮动面板替代 */}
            <div className="ml-auto flex items-center gap-4 flex-wrap">
              <div className="hidden lg:block">
                <JobSwitcherWrapper useMobile={useMobileSwitcher} />
              </div>
              <BilangSwitch />
              <ThemeSwitcher />
              <div className="hidden lg:block">
                <ActionButton />
              </div>
            </div>
          </nav>
        </div>
      </Container>
    </header>
  );
}
