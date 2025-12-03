import React, {
  InputHTMLAttributes,
  useId,
  // useRef,
  useState,
  useEffect,
} from 'react'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultValue'> {
  /** input 타입 (text, password, email, number) */
  type?: 'text' | 'password' | 'email' | 'number'
  /** 클리어 버튼 표시 여부 */
  clearable?: boolean
  /** 커스텀 CSS 클래스 */
  className?: string
  /** 레이블 텍스트 (시각적/스크린리더용) */
  label?: string
  /** 레이블 시각적 노출 여부 (true이면 스크린리더용만) */
  labelHidden?: boolean
  /** 에러 메시지 */
  /** 에러 메시지 */
  error?: string
  /** 읽기 전용 여부 */
  readOnly?: boolean
  /** 비활성화 여부 */
  disabled?: boolean
  /** 값 */
  value?: string
  /** placeholder 텍스트 */
  placeholder?: string
}

/** Input UI 컴포넌트 */
export const Input: React.FC<InputProps> = ({
  type = 'text',
  clearable = true,
  className,
  label,
  labelHidden = false,
  error,
  value,
  onChange,
  disabled = false,
  readOnly = false,
  ...rest
}) => {
  const inputId = useId()
  const errorId = `error_${inputId}`
  // const prevValueRef = useRef<string | undefined>(value)
  const [showError, setShowError] = useState(!!error)

  // 에러 상태 관리: 값이 변경되면 에러를 감춥니다. error props가 바뀌면 다시 보여줍니다.
  useEffect(() => {
    if (error) {
      setShowError(true)
    } else {
      setShowError(false)
    }
  }, [error])

  // useEffect(() => {
  //   // input 값이 변경되면 에러 숨김
  //   if (prevValueRef.current !== value && showError) {
  //     setShowError(false)
  //   }
  //   prevValueRef.current = value
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [value])

  const handleClear = () => {
    const event = {
      target: { value: '' },
    } as React.ChangeEvent<HTMLInputElement>
    onChange?.(event)

    setTimeout(() => {
      const inputEl = document.getElementById(inputId) as HTMLInputElement
      inputEl?.focus()
    }, 0)
  }

  return (
    <div className={`input-item ${className ?? ''}`}>
      {!labelHidden && label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      <div
        className={`input-field-wrap${error && showError ? ' has-error' : ''}`}
      >
        <input
          {...rest}
          id={inputId}
          type={type}
          className={`input-field ${error && showError ? 'input-error' : ''}`}
          value={value ?? ''}
          onChange={onChange}
          aria-invalid={!!error && showError}
          aria-describedby={error && showError ? errorId : undefined}
          disabled={disabled}
          readOnly={readOnly}
          aria-label={labelHidden ? `${label} 입력` : undefined}
        />
        {clearable && value && !disabled && !readOnly && (
          <button
            type="button"
            className="input-clear-btn"
            onClick={handleClear}
            aria-label="입력값 지우기"
          >
            ×
          </button>
        )}
      </div>
      {error && showError && (
        <div id={errorId} className="input-error-message" role="alert">
          {error}
        </div>
      )}
    </div>
  )
}
