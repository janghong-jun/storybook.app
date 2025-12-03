import React, { useRef, useId, useEffect } from 'react'

export interface AlertButton {
  /** 버튼 표시 텍스트 */
  label: string
  /** 버튼 스타일: primary(주요) | secondary(보조) */
  variant?: 'primary' | 'secondary'
  /** 버튼 클릭 시 실행할 콜백 */
  onClick?: () => void
}

export interface SystemAlertProps {
  /** 알림 메시지 (문자열 또는 React 노드) */
  message: string | React.ReactNode
  /** 제목
   * - "" 또는 false일 경우 제목 숨김
   */
  title?: string | false
  /** 알림 타입에 따른 스타일 */
  type?: 'info' | 'success' | 'warning' | 'error'
  /** 표시 여부 */
  visible?: boolean
  /** 닫기 이벤트 */
  onClose?: () => void

  /** 확인 버튼 표시 여부 (Alert/Confirm 기본 버튼 사용 시) */
  hasConfirm?: boolean
  /** 취소 버튼 표시 여부 (Alert/Confirm 기본 버튼 사용 시) */
  hasCancel?: boolean
  /** 확인 버튼 텍스트 */
  confirmLabel?: string
  /** 취소 버튼 텍스트 */
  cancelLabel?: string
  /** 확인 버튼 클릭 콜백 */
  onConfirm?: () => void
  /** 취소 버튼 클릭 콜백 */
  onCancel?: () => void

  /** 커스텀 버튼 배열
   * - Alert/Confirm 기본 버튼 대신 사용
   */
  buttons?: AlertButton[]
}

export const SystemAlert: React.FC<SystemAlertProps> = ({
  message,
  title = '알림',
  type = 'info',
  visible = false,
  onClose,

  hasConfirm = true,
  hasCancel = false,
  confirmLabel = '확인',
  cancelLabel = '취소',
  onConfirm,
  onCancel,

  buttons,
}) => {
  const alertRef = useRef<HTMLDivElement>(null)
  const lastFocused = useRef<HTMLElement | null>(null)
  const reactId = useId()
  const titleId = `alert_title_${reactId}`

  /** ------------------------------------------------------------------
   *  포커스 트랩 + ESC 닫기 + 스크롤 막기
   *  ------------------------------------------------------------------ */
  useEffect(() => {
    if (!visible || !alertRef.current) return

    lastFocused.current = document.activeElement as HTMLElement
    document.body.style.overflow = 'hidden'

    const focusableEls = alertRef.current.querySelectorAll<HTMLElement>(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
    const focusableArray = [alertRef.current, ...Array.from(focusableEls)]
    const firstEl = focusableArray[0]
    const lastEl = focusableArray[focusableArray.length - 1]

    requestAnimationFrame(() => alertRef.current?.focus())

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault()
            lastEl.focus()
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault()
            firstEl.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      lastFocused.current?.focus()
      document.body.style.overflow = ''
    }
  }, [visible, onClose])

  /** ------------------------------------------------------------------
   * 렌더링 제어
   * ------------------------------------------------------------------ */
  if (!visible) return null

  /** 기본 버튼 구성 (buttons가 없을 때만) */
  const renderDefaultButtons = () => (
    <>
      {hasCancel && (
        <button
          className="btn secondary"
          onClick={() => onCancel?.() ?? onClose?.()}
        >
          {cancelLabel}
        </button>
      )}

      {hasConfirm && (
        <button
          className="btn primary"
          onClick={() => {
            if (onConfirm) onConfirm()
            else onClose?.()
          }}
        >
          {confirmLabel}
        </button>
      )}
    </>
  )

  /** 커스텀 버튼 모드 */
  const renderCustomButtons = () =>
    buttons?.map((btn, idx) => (
      <button
        key={idx}
        className={`btn ${btn.variant ?? 'primary'}`}
        onClick={() => btn.onClick?.() ?? onClose?.()}
      >
        {btn.label}
      </button>
    ))

  return (
    <div className="alert-backdrop" role="presentation">
      <div
        ref={alertRef}
        className={`alert alert-${type}`}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-live="assertive"
        tabIndex={0}
        onClick={(e) => e.stopPropagation()}
      >
        {title !== false && title !== '' && (
          <h2 id={titleId} className="alert-title">
            {title || '알림'}
          </h2>
        )}

        <div className="alert-message">{message}</div>

        <div className="alert-buttons">
          {buttons && buttons.length > 0
            ? renderCustomButtons()
            : renderDefaultButtons()}
        </div>
      </div>
    </div>
  )
}
