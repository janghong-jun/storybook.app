// Modal.tsx (한글 IME 정상 입력용 수정)
import React, { useRef, useId, useEffect } from 'react'

export interface ModalProps {
  /** 모달 열림 상태 */
  isOpen: boolean
  /** 모달 닫기 이벤트 */
  onClose: () => void
  /** 모달 안에 들어갈 컨텐츠 */
  children: string | React.ReactNode
  /** 모달 제목 */
  label?: string
  /** 모달 크기 */
  size?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large'
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  label,
  size = 'medium',
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const lastFocusedElement = useRef<HTMLElement | null>(null)
  const reactId = useId()
  const labelId = `modal_label_${reactId}`
  const originalOverflow = useRef<string>('')

  useEffect(() => {
    if (!isOpen) {
      // 모달이 닫힐 때 포커스 복원
      lastFocusedElement.current?.focus()
      return
    }

    if (!modalRef.current) return

    // 현재 포커스된 요소 저장 (모달 닫을 때 복귀용)
    lastFocusedElement.current = document.activeElement as HTMLElement

    // 모달 열릴 때 body 스크롤 방지
    originalOverflow.current = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // 모달 내부 focusable 요소 찾기
    const focusableEls = modalRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )

    const firstEl = focusableEls[0]
    const lastEl = focusableEls[focusableEls.length - 1]

    // modalRef.current.focus({ preventScroll: true })

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (focusableEls.length === 0) {
          e.preventDefault()
          return
        }
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault()
            lastEl?.focus()
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault()
            firstEl?.focus()
          }
        }
      } else if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow.current
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-backdrop" role="presentation">
      <div
        className={`modal-content ${size}`}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        aria-labelledby={label ? labelId : undefined}
      >
        {label && (
          <div className="modal-header">
            <h2 id={labelId}>{label}</h2>
          </div>
        )}
        <div className="modal-body">{children}</div>
        <button
          onClick={onClose}
          className="modal-close"
          aria-label="모달 닫기"
          type="button"
        >
          ×
        </button>
      </div>
    </div>
  )
}
