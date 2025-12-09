// Modal.tsx
import React, { useRef, useId, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useModalStack } from '@/hooks/useModalStack';
import { focusManager } from '@/stores/focusStore';

export interface ModalProps {
  /** 모달 열림 상태 */
  isOpen: boolean;
  /** 모달 닫기 이벤트 */
  onClose: () => void;
  /** 모달 안에 들어갈 컨텐츠 */
  children: string | React.ReactNode;
  /** 모달 제목 */
  label?: string;
  /** 모달 크기 */
  size?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large';
}

/** Modal UI 컴포넌트 */
export const Modal = ({
  isOpen,
  onClose,
  children,
  label,
  size = 'medium',
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const reactId = useId();
  const labelId = `modal_label_${reactId}`;
  const originalOverflow = useRef<string>('');
  const modalId = `modal_${reactId}`;

  const { isTopModal, zIndex } = useModalStack(modalId, isOpen);

  useEffect(() => {
    const wrapElement = document.querySelector('.wrap') as HTMLElement | null;

    if (isOpen) {
      if (!modalRef.current) return;

      focusManager.push();

      originalOverflow.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      wrapElement?.setAttribute('aria-hidden', 'true');

      modalRef.current.focus();

      const focusableEls = modalRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (focusableEls.length === 0) {
            e.preventDefault();
            return;
          }
          if (e.shiftKey) {
            if (document.activeElement === firstEl) {
              e.preventDefault();
              lastEl?.focus();
            }
          } else {
            if (document.activeElement === lastEl) {
              e.preventDefault();
              firstEl?.focus();
            }
          }
        } else if (e.key === 'Escape') {
          if (isTopModal) {
            e.preventDefault();
            onClose();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = originalOverflow.current;
        wrapElement?.removeAttribute('aria-hidden');
        focusManager.popAndFocus();
      };
    }
  }, [isOpen, onClose, isTopModal]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="modal-backdrop"
      role="presentation"
      data-modal-id={modalId}
      data-top-modal={isTopModal ? 'true' : 'false'}
      style={{ zIndex }}
    >
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
  );

  return createPortal(modalContent, document.body);
};
