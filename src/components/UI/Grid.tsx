'use client';

import React, { ReactNode } from 'react';

interface GridProps {
  /** Grid 아이템들 */
  children: ReactNode;
  /** 컬럼 수 (1~6) */
  columns?: number;
  /** 수직 정렬 (align-items) */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** 수평 정렬 (justify-content) */
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
  /** 아이템 간 간격 */
  gap?: string;
  /** 커스텀 CSS 클래스 */
  className?: string;
}

/** Grid UI 컴포넌트 */
export const Grid = ({
  children,
  columns = 4,
  align = 'stretch',
  justify = 'start',
  gap = '1.6rem',
  className = '',
}: GridProps) => {
  return (
    <div
      className={`grid grid-cols-${columns} align-${align} justify-${justify} ${className}`}
      style={{ gap }}
    >
      {children}
    </div>
  );
};
