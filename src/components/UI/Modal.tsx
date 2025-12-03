import React, { useRef, useId, useEffect } from 'react'

export interface ModalProps {
  /** 모달 열림 상태 */
  isOpen: boolean
  /** 모달 닫기 이벤트 */
  onClose: () => void
  /** 모달 안에 들어갈 컨텐츠 (HTML 권고) */
  children: string | React.ReactNode
  /** 모달 제목 */
  label?: string | undefined
  /** 모달 크기 */
  size?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large'
}

/** Modal UI 컴포넌트 */
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

  useEffect(() => {
    if (!isOpen || !modalRef.current) return

    lastFocusedElement.current = document.activeElement as HTMLElement
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusableEls = modalRef.current.querySelectorAll<HTMLElement>(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )

    const focusableArray = [modalRef.current, ...Array.from(focusableEls)]
    const firstEl = focusableArray[0]
    const lastEl = focusableArray[focusableArray.length - 1]

    requestAnimationFrame(() => {
      firstEl.focus()
    })

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
        e.preventDefault()
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      lastFocusedElement.current?.focus()
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-backdrop" role="presentation">
      <div
        className={`modal-content ${size}`}
        ref={modalRef}
        tabIndex={0}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={label ? labelId : undefined}
      >
        {label && (
          <div className="modal-header">
            <h2 id={labelId}>{label}</h2>
          </div>
        )}
        <div className="modal-body">{children}</div>
        <button onClick={onClose} className="modal-close">
          <span className="sr-only">닫기</span>
        </button>
      </div>
    </div>
  )
}
