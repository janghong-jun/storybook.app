import React, { useState, useId, useRef, useEffect } from 'react';

export interface TabItem {
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabProps {
  /**
   * 탭에 표시할 아이템 배열
   *
   * ```ts
   * items = [
   *   {
   *     title: '첫 번째 항목',
   *     content: <p>첫 번째 내용입니다.</p>
   *   },
   *   {
   *     title: '두 번째 항목',
   *     content: <p>두 번째 내용입니다.</p>
   *   }
   * ]
   * ```
   */
  items: TabItem[];
  /** 커스텀 CSS 클래스 */
  className?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 탭 변경시 콜백  */
  onChange?: (label: string) => void;
}

/** Tab UI 컴포넌트 */
export const Tab = ({ items, className, onChange }: TabProps) => {
  const [openedTab, setOpenedTab] = useState<number | null>(0); // 실제 열린 탭
  const tabGroupId = useId();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // 렌더링 시 buttonRefs 초기화
  useEffect(() => {
    buttonRefs.current = buttonRefs.current.slice(0, items.length);
  }, [items.length]);

  const handleTabClick = (idx: number) => {
    setOpenedTab(idx);
    if (onChange) onChange(items[idx].label);
  };

  return (
    <div className={`tab${className ? ` ${className}` : ''}`}>
      <div role="tablist" aria-label="탭 목록" className="tab-list">
        {items.map((item, idx) => {
          const tabId = `tab_${tabGroupId}_${idx}`;
          const panelId = `panel_${tabGroupId}_${idx}`;

          return (
            <button
              key={idx}
              id={tabId}
              role="tab"
              type="button"
              aria-selected={openedTab === idx}
              aria-controls={panelId}
              ref={(el) => {
                buttonRefs.current[idx] = el!;
              }}
              disabled={item.disabled ?? false}
              className={`tab-trigger${openedTab === idx ? ' is-active' : ''}`}
              onClick={() => handleTabClick(idx)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') {
                  e.preventDefault();
                  const next = (idx + 1) % items.length;
                  buttonRefs.current[next]?.focus();
                } else if (e.key === 'ArrowLeft') {
                  e.preventDefault();
                  const prev = (idx - 1 + items.length) % items.length;
                  buttonRefs.current[prev]?.focus();
                } else if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleTabClick(idx);
                }
              }}
            >
              {item.label}
              {openedTab === idx && <span className="sr-only">선택됨</span>}
            </button>
          );
        })}
      </div>
      <div className="tab-content-wrap">
        {items.map((item, idx) => {
          const tabId = `tab_${tabGroupId}_${idx}`;
          const panelId = `panel_${tabGroupId}_${idx}`;
          const isActive = openedTab === idx;

          return (
            <section
              key={idx}
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId}
              {...(!isActive ? { inert: true } : {})}
              className={`tab-content${isActive ? ' is-active' : ''}`}
            >
              <h3 className="sr-only">{item.label}</h3>
              {item.content}
            </section>
          );
        })}
      </div>
    </div>
  );
};
