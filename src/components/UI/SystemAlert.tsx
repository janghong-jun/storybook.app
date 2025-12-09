import React, { useRef, useId, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useModalStack } from '@/hooks/useModalStack';
import { focusManager } from '@/stores/focusStore';

/** Alert 버튼 설정 */
export interface AlertButton {
  /** 버튼 텍스트 */
  label: string;
  /** 버튼 스타일 variant */
  variant?: 'primary' | 'secondary';
  /** 버튼 클릭 이벤트 */
  onClick?: () => void;
}

export interface SystemAlertProps {
  /** 알림 메시지 */
  message: string | React.ReactNode;
  /** 알림 제목, false로 설정하면 숨김 */
  title?: string | false;
  /** 알림 타입 */
  type?: 'info' | 'success' | 'warning' | 'error';
  /** 알림 표시 여부 */
  visible?: boolean;
  /** 닫기 이벤트 */
  onClose?: () => void;
  /** 확인 버튼 표시 여부 */
  hasConfirm?: boolean;
  /** 취소 버튼 표시 여부 */
  hasCancel?: boolean;
  /** 확인 버튼 라벨 */
  confirmLabel?: string;
  /** 취소 버튼 라벨 */
  cancelLabel?: string;
  /** 확인 버튼 클릭 이벤트 */
  onConfirm?: () => void;
  /** 취소 버튼 클릭 이벤트 */
  onCancel?: () => void;
  /** 커스텀 버튼 배열 */
  buttons?: AlertButton[];
}

/** SystemAlert UI 컴포넌트 */
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
  const alertRef = useRef<HTMLDivElement>(null);
  const reactId = useId();
  const titleId = `alert_title_${reactId}`;
  const alertId = `alert_${reactId}`;

  const { isTopModal, zIndex } = useModalStack(alertId, visible || false);

  useEffect(() => {
    const wrapElement = document.querySelector('.wrap') as HTMLElement | null;

    if (visible) {
      focusManager.push();

      document.body.style.overflow = 'hidden';
      wrapElement?.setAttribute('aria-hidden', 'true');

      requestAnimationFrame(() => alertRef.current?.focus());

      const focusableEls = alertRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!alertRef.current || !focusableEls) return;

      const focusableArray = [alertRef.current, ...Array.from(focusableEls)];
      const firstEl = focusableArray[0];
      const lastEl = focusableArray[focusableArray.length - 1];

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstEl) {
              e.preventDefault();
              lastEl.focus();
            }
          } else {
            if (document.activeElement === lastEl) {
              e.preventDefault();
              firstEl.focus();
            }
          }
        } else if (e.key === 'Escape') {
          if (isTopModal) {
            e.preventDefault();
            onClose?.();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        wrapElement?.removeAttribute('aria-hidden');
        focusManager.popAndFocus();
      };
    }
  }, [visible, onClose, isTopModal]);

  if (!visible) return null;

  const renderDefaultButtons = () => (
    <>
      {hasCancel && (
        <button
          className="krds-btn secondary"
          onClick={() => onCancel?.() ?? onClose?.()}
        >
          {cancelLabel}
        </button>
      )}

      {hasConfirm && (
        <button
          className="krds-btn primary"
          onClick={() => {
            if (onConfirm) onConfirm();
            else onClose?.();
          }}
        >
          {confirmLabel}
        </button>
      )}
    </>
  );

  const renderCustomButtons = () =>
    buttons?.map((btn, idx) => (
      <button
        key={idx}
        className={`btn ${btn.variant ?? 'primary'}`}
        onClick={() => btn.onClick?.() ?? onClose?.()}
      >
        {btn.label}
      </button>
    ));

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
  );

  return createPortal(alertContent, document.body);
};
