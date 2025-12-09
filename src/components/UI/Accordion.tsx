import React, { useState, useId } from 'react';

export interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  /**
   * 아코디언에 표시할 아이템 배열
   *
   * ```jsx
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
  items: AccordionItem[];
  /** 여러 항목을 동시에 열 수 있는지 여부 (기본: false) */
  allowMultipleOpen?: boolean;
  /** 기본으로 열려있는 항목의 인덱스 (기본: 없음) */
  defaultOpenIndex?: number;
  /** 모든 항목을 초기에 열린 상태로 설정할지 여부 (기본: false) */
  initiallyAllOpen?: boolean;
  /** 전체 항목을 열고 닫는 컨트롤을 표시할지 여부 (기본: false) */
  showToggleAll?: boolean;
  /** 커스텀 CSS 클래스 */
  className?: string;
}

/** Accordion UI 컴포넌트 */
export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultipleOpen = false,
  defaultOpenIndex,
  initiallyAllOpen = false,
  className,
  showToggleAll = false,
}) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>(
    initiallyAllOpen
      ? items.map((_, index) => index)
      : defaultOpenIndex !== undefined
      ? [defaultOpenIndex]
      : []
  );
  const accordionId = useId();

  const toggleIndex = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes(allowMultipleOpen ? [...openIndexes, index] : [index]);
    }
  };

  const toggleAll = () => {
    if (openIndexes.length === items.length) {
      // 모두 열려있으면 모두 닫기
      setOpenIndexes([]);
    } else {
      // 닫혀있는 항목이 있으면 모두 열기
      setOpenIndexes(items.map((_, index) => index));
    }
  };

  const isAllOpen = openIndexes.length === items.length && items.length > 0;

  return (
    <>
      {showToggleAll && allowMultipleOpen && items.length > 0 && (
        <div className="accordion-controls">
          <button
            type="button"
            onClick={toggleAll}
            className="krds-btn accordion-toggle-all"
            aria-pressed={isAllOpen}
          >
            {isAllOpen ? '모두 닫기' : '모두 열기'}
          </button>
        </div>
      )}
      <div
        className={`accordion${className ? ` ${className}` : ''}`}
        role="presentation"
      >
        {items.map((item, idx) => {
          const headerId = `accordion_header_${accordionId}_${idx}`;
          const contentId = `accordion_content_${accordionId}_${idx}`;
          const isOpen = openIndexes.includes(idx);

          return (
            <div
              key={idx}
              className={`accordion-item${isOpen ? ' is-active' : ''}`}
            >
              <strong className="accordion-header">
                <button
                  type="button"
                  id={headerId}
                  className="accordion-trigger"
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleIndex(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleIndex(idx);
                    }
                  }}
                >
                  {item.title}
                </button>
              </strong>

              <div
                id={contentId}
                role="region"
                aria-labelledby={headerId}
                className="accordion-content"
                {...(!isOpen ? { inert: true } : {})} // 지원 브라우저에 inert 적용
              >
                <div className="accordion-inner">{item.content}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
