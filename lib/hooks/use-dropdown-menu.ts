"use client";

import { useState, useRef, useEffect } from 'react';

interface UseDropdownMenuOptions {
  menuWidth: number;
  margin?: number;
}

interface UseDropdownMenuReturn {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  containerRef: React.RefObject<HTMLDivElement>;
  menuRef: React.RefObject<HTMLDivElement>;
  menuPosition: { left?: number; right?: number };
}

export function useDropdownMenu({
  menuWidth,
  margin = 16
}: UseDropdownMenuOptions): UseDropdownMenuReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ left?: number; right?: number }>({ right: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // 智能边界检测
  useEffect(() => {
    if (isOpen && containerRef.current && menuRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;

      const rightSpace = windowWidth - containerRect.right;
      const leftSpace = containerRect.left;

      if (rightSpace >= menuWidth + margin) {
        setMenuPosition({ right: 0, left: undefined });
      } else if (leftSpace >= menuWidth + margin) {
        setMenuPosition({ left: 0, right: undefined });
      } else {
        const rightOffset = windowWidth - containerRect.right - margin;
        setMenuPosition({ right: -rightOffset, left: undefined });
      }
    }
  }, [isOpen, menuWidth, margin]);

  // 点击外部自动关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return {
    isOpen,
    setIsOpen,
    containerRef,
    menuRef,
    menuPosition
  };
}
