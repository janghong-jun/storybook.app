import React, { useState, useRef, useEffect, useId } from 'react'

export interface TooltipProps {
  /** 툴팁에 표시할 내용 */
  content: string | React.ReactNode
  /** 툴팁을 호출한 요소의 레이블 */
  label: string
  /** 툴팁 아이콘에 적용할 커스텀 CSS 클래스 (선택) */
  iconClass?: string
  /** 커스텀 CSS 클래스 (선택) */
  className?: string
}

/** Tooltip UI 컴포넌트 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  label,
  iconClass,
  className,
}) => {
  const [open, setOpen] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)

  // useId만으로 충분히 고유한 ID 생성 가능
  const tooltipId = useId()
  const uniqueId = `tooltip-${tooltipId}`

  useEffect(() => {
    const node = tooltipRef.current
    const handleFocusOut = (e: FocusEvent) => {
      if (node && !node.contains(e.relatedTarget as Node)) {
        setOpen(false)
      }
    }
    node?.addEventListener('focusout', handleFocusOut)
    return () => node?.removeEventListener('focusout', handleFocusOut)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false)
    } else if (e.key === 'Enter' || e.key === ' ') {
      setOpen(true)
    }
  }

  return (
    <div
      className={`tooltip-container ${className || ''}`}
      ref={tooltipRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={handleKeyDown}
      onBlur={() => setOpen(false)}
    >
      <button
        type="button"
        className={`tooltip-trigger ${iconClass || ''}`}
        onFocus={() => setOpen(true)}
        aria-expanded={open}
        aria-describedby={uniqueId}
      >
        {iconClass ? (
          <span className="sr-only">{label}</span>
        ) : (
          <span>{label}</span>
        )}
      </button>

      {open &&
        (typeof content === 'string' ? (
          <div
            id={uniqueId}
            role="tooltip"
            tabIndex={-1}
            className="tooltip-layer"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <div
            id={uniqueId}
            role="tooltip"
            tabIndex={-1}
            className="tooltip-layer"
          >
            {content}
          </div>
        ))}
    </div>
  )
}
