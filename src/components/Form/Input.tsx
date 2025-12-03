/* eslint-disable react-hooks/set-state-in-effect */
// Input.tsx
import React, {
  InputHTMLAttributes,
  useId,
  useState,
  useEffect,
  useRef,
} from 'react'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultValue'> {
  /** input 타입 (text, password, email, number) */
  type?: 'text' | 'password' | 'email' | 'number'
  /** 클리어 버튼 표시 여부 (기본: true) */
  clearable?: boolean
  /** 커스텀 CSS 클래스 */
  className?: string
  /** 레이블 텍스트 (시각적/스크린리더용) */
  label?: string
  /** 레이블 시각적 노출 여부 (true이면 스크린리더용만) */
  labelHidden?: boolean
  /** 에러 메시지 */
  error?: string
  /** 읽기 전용 여부 */
  readOnly?: boolean
  /** 비활성화 여부 */
  disabled?: boolean
  /** 값 (제어 컴포넌트) */
  value?: string
  /** placeholder 텍스트 */
  placeholder?: string
  /** 값 변경 이벤트 핸들러 */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

/**
 * Input UI 컴포넌트
 *
 * 주요 기능:
 * - 제어 컴포넌트 방식으로 동작 (value prop 필수)
 * - 한글 입력 (IME 조합 중) 지원
 * - 에러 상태 관리 (값 변경 시 에러 자동 숨김)
 * - 클리어 버튼 (값이 있을 때만 표시)
 * - 접근성: ARIA 속성, 레이블 연결, 에러 메시지 알림
 */
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
  const inputRef = useRef<HTMLInputElement>(null)

  // 에러 표시 상태 (사용자가 값을 변경하면 에러를 숨김)
  const [showError, setShowError] = useState(!!error)

  // 한글 입력(IME) 조합 중인지 추적
  const [isComposing, setIsComposing] = useState(false)

  /**
   * error prop이 변경되면 에러 표시 상태 업데이트
   * - error가 있으면 표시
   * - error가 없으면 숨김
   */
  useEffect(() => {
    if (error) {
      setShowError(true)
    } else {
      setShowError(false)
    }
  }, [error])

  /**
   * 한글 입력 시작 (조합 시작)
   * 한글 입력 중에는 특정 동작을 방지하기 위해 플래그 설정
   */
  const handleCompositionStart = () => {
    setIsComposing(true)
  }

  /**
   * 한글 입력 완료 (조합 완료)
   * 한글 조합이 끝나면 플래그 해제
   */
  const handleCompositionEnd = (
    e: React.CompositionEvent<HTMLInputElement>
  ) => {
    setIsComposing(false)

    // 조합 완료 후 onChange 이벤트 수동 발생
    // 일부 브라우저에서 onChange가 조합 완료 후 발생하지 않는 경우 대응
    if (onChange) {
      const syntheticEvent = {
        ...e,
        target: e.currentTarget,
        currentTarget: e.currentTarget,
      } as React.ChangeEvent<HTMLInputElement>
      onChange(syntheticEvent)
    }
  }

  /**
   * 입력값 변경 핸들러
   * - 사용자가 값을 변경하면 에러 메시지 숨김
   * - 부모 컴포넌트의 onChange 호출
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 에러가 표시 중이면 숨김 (사용자가 수정 중)
    if (showError) {
      setShowError(false)
    }

    // 부모의 onChange 호출
    onChange?.(e)
  }

  /**
   * 클리어 버튼 클릭 핸들러
   * - 입력값을 빈 문자열로 초기화
   * - 입력 필드에 포커스 이동
   */
  const handleClear = () => {
    // 비어있는 입력 이벤트 생성
    if (onChange && inputRef.current) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        'value'
      )?.set

      // input의 value를 직접 변경
      nativeInputValueSetter?.call(inputRef.current, '')

      // React가 인식할 수 있도록 input 이벤트 발생
      const inputEvent = new Event('input', { bubbles: true })
      inputRef.current.dispatchEvent(inputEvent)

      // 합성 이벤트 생성하여 onChange 호출
      const syntheticEvent = {
        target: inputRef.current,
        currentTarget: inputRef.current,
      } as React.ChangeEvent<HTMLInputElement>

      onChange(syntheticEvent)
    }

    // 클리어 후 입력 필드에 포커스
    // setTimeout으로 비동기 처리하여 DOM 업데이트 후 실행
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  return (
    <div className={`input-item ${className ?? ''}`}>
      {/* 레이블: labelHidden이 false일 때만 시각적으로 표시 */}
      {label && !labelHidden && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}

      {/* 입력 필드 래퍼: 에러 상태에 따라 클래스 적용 */}
      <div
        className={`input-field-wrap${error && showError ? ' has-error' : ''}`}
      >
        <input
          {...rest}
          ref={inputRef}
          id={inputId}
          type={type}
          className={`input-field ${error && showError ? 'input-error' : ''}`}
          value={value ?? ''}
          onChange={handleChange}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={!!error && showError}
          aria-describedby={error && showError ? errorId : undefined}
          aria-label={labelHidden && label ? label : undefined}
        />

        {/* 클리어 버튼: 값이 있고, 활성화 상태이고, clearable이 true일 때만 표시 */}
        {clearable && value && !disabled && !readOnly && (
          <button
            type="button"
            className="input-clear-btn"
            onClick={handleClear}
            aria-label={`${label || '입력'} 지우기`}
            tabIndex={0}
          >
            ×
          </button>
        )}
      </div>

      {/* 에러 메시지: 에러가 있고 showError가 true일 때만 표시 */}
      {error && showError && (
        <div id={errorId} className="input-error-message" role="alert">
          {error}
        </div>
      )}
    </div>
  )
}
