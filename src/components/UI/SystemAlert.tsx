import React, { useRef, useId, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useModalStack } from '@/hooks/useModalStack'
import { focusManager } from '@/stores/focusStore'

export interface AlertButton {
  label: string
  variant?: 'primary' | 'secondary'
  onClick?: () => void
}

export interface SystemAlertProps {
  message: string | React.ReactNode
  title?: string | false
  type?: 'info' | 'success' | 'warning' | 'error'
  visible?: boolean
  onClose?: () => void
  hasConfirm?: boolean
  hasCancel?: boolean
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void
  onCancel?: () => void
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
  const reactId = useId()
  const titleId = `alert_title_${reactId}`
  const alertId = `alert_${reactId}`

  // 얼랏 스택 관리
  const { isTopModal, zIndex } = useModalStack(alertId, visible || false)

  useEffect(() => {
    const wrapElement = document.querySelector('.wrap') as HTMLElement | null

    if (visible) {
      focusManager.push()

      // 2. body 스크롤 방지 및 aria-hidden 설정
      document.body.style.overflow = 'hidden'
      wrapElement?.setAttribute('aria-hidden', 'true')

      // 3. 얼럿으로 포커스 이동
      requestAnimationFrame(() => alertRef.current?.focus())

      const focusableEls = alertRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
      if (!alertRef.current || !focusableEls) return

      const focusableArray = [alertRef.current, ...Array.from(focusableEls)]
      const firstEl = focusableArray[0]
      const lastEl = focusableArray[focusableArray.length - 1]

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
        } else if (e.key === 'Escape') {
          if (isTopModal) {
            e.preventDefault()
            onClose?.()
          }
        }
      }

      document.addEventListener('keydown', handleKeyDown)

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = ''
        wrapElement?.removeAttribute('aria-hidden')
        focusManager.popAndFocus()
      }
    }
  }, [visible, onClose, isTopModal])

  if (!visible) return null

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

  const alertContent = (
    <div
      className="alert-backdrop"
      role="presentation"
      data-modal-id={alertId}
      data-top-modal={isTopModal ? 'true' : 'false'}
      style={{ zIndex }}
    >
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

  return createPortal(alertContent, document.body)
}
