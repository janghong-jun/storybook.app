import React, { TextareaHTMLAttributes, useId } from 'react'

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** 커스텀 CSS 클래스 */
  className?: string
  /** 레이블 텍스트 */
  label?: string
  /** 레이블 시각적 노출 여부 (true이면 스크린리더용만) */
  labelHidden?: boolean
  /** 에러 메시지 */
  error?: string
  /** 클리어 버튼 표시 여부 */
  clearable?: boolean
  /** 카운터 표시 여부 */
  showCounter?: boolean
  /** 비활성화 여부 */
  disabled?: boolean
  /** 읽기 전용 여부 */
  readOnly?: boolean
  /** placeholder 값 */
  placeholder?: string
  /** 최대글자 수 */
  maxLength?: number
  /** textarea 입력 값 */
  value: string // required로 변경
  /** onChange 핸들러 */
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

/** TextArea UI 컴포넌트 */
export const TextArea: React.FC<TextAreaProps> = ({
  className,
  label,
  labelHidden = false,
  error,
  clearable = true,
  value,
  onChange,
  disabled = false,
  readOnly = false,
  maxLength,
  showCounter = true,
  ...rest
}) => {
  const textareaId = useId()
  const errorId = `error_${textareaId}`

  const handleClear = () => {
    const event = {
      target: { value: '' },
    } as React.ChangeEvent<HTMLTextAreaElement>
    onChange?.(event)

    // 클리어 후 포커스 유지
    setTimeout(() => {
      const textareaEl = document.getElementById(
        textareaId
      ) as HTMLTextAreaElement
      textareaEl?.focus()
    }, 0)
  }

  return (
    <div className={`textarea-item${className ? ` ${className}` : ''}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className={`textarea-label${labelHidden ? ' sr-only' : ''}`}
        >
          {label}
        </label>
      )}

      <div className={`textarea-wrap${error ? ' has-error' : ''}`}>
        <textarea
          id={textareaId}
          className={`krds-input${error ? ' textarea-error' : ''}`}
          value={value}
          onChange={onChange}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          aria-label={labelHidden ? label : undefined}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          {...rest}
        />

        {clearable && value && !disabled && !readOnly && (
          <button
            type="button"
            className="textarea-clear-btn"
            onClick={handleClear}
            aria-label="입력값 지우기"
          >
            ×
          </button>
        )}
        {showCounter && maxLength && (
          <div className="char-counter" aria-live="polite">
            {`${value?.length ?? 0} / ${maxLength}`}
          </div>
        )}
      </div>

      {error && (
        <div id={errorId} className="textarea-error-message" role="alert">
          {error}
        </div>
      )}
    </div>
  )
}
