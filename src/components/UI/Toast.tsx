import { useEffect, useRef, useState, ReactNode } from 'react'

interface ToastProps {
  /** 토스트 내용 */
  message: string | ReactNode
  /** 토스트 노출 여부  */
  visible: boolean
  /** 토스트 노출 시간 (기본 3000ms) */
  duration?: number
  /** 토스트를 트리거한 요소의 ref */
  triggerRef?: React.RefObject<HTMLElement>
  /** 커스텀 CSS 클래스 */
  className?: string
  /** 닫기 콜백 */
  onClose: () => void
}

/** Toast UI 컴포넌트 */
export function Toast({
  message,
  visible = false,
  duration = 3000,
  onClose,
  className,
  triggerRef,
}: ToastProps) {
  const toastRef = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (visible) {
      setTimeout(() => setShow(true), 0)
    }
  }, [visible])

  useEffect(() => {
    if (!show) return
    const toastEl = toastRef.current
    if (!toastEl) return

    const previousFocus = document.activeElement as HTMLElement | null
    const triggerEl = triggerRef?.current
    requestAnimationFrame(() => toastEl.focus())

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        toastEl.classList.add('hide')
        setTimeout(onClose, duration / 10)
      }
    }

    toastEl.addEventListener('keydown', handleKeyDown)

    const timer = setTimeout(() => {
      toastEl.classList.add('hide')
      setTimeout(onClose, duration / 10)
    }, duration)

    return () => {
      clearTimeout(timer)
      toastEl.removeEventListener('keydown', handleKeyDown)
      if (triggerEl) triggerEl.focus()
      else previousFocus?.focus()
    }
  }, [show, duration, onClose, triggerRef])

  if (!visible && !show) return null

  return (
    <div
      ref={toastRef}
      className={`toast${className ? ` ${className}` : ''}`}
      role="status"
      aria-live="polite"
      tabIndex={0}
      onAnimationEnd={(e) => {
        if ((e.target as HTMLElement).classList.contains('hide')) {
          setShow(false)
        }
      }}
    >
      {message}
    </div>
  )
}
