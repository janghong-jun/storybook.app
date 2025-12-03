/* eslint-disable react-hooks/set-state-in-effect */
import React, { useId, useState, useEffect } from 'react'

export interface CheckboxProps {
  /** label 텍스트 */
  label?: string
  /** 초기 상태 */
  checked?: boolean
  /** 선택시 호출할 함수 */
  onChange?: (checked: boolean) => void
  /**  name 지정 가능 없으면 랜덤 */
  name?: string
  /** label을 화면에 표시할지 여부 */
  showLabel?: boolean
  /** 비활성화 여부 */
  disabled?: boolean
  /** 커스텀 CSS 클래스 */
  className?: string
}

/** Checkbox UI 컴포넌트 */
export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  name,
  showLabel = true,
  disabled = false,
  className,
}) => {
  const id = useId()
  const chkName = name ?? `chk-${id}`
  const [internalChecked, setInternalChecked] = useState(checked ?? false)

  useEffect(() => {
    if (checked !== undefined) setInternalChecked(checked)
  }, [checked])

  const handleChange = (next: boolean) => {
    if (disabled) return
    setInternalChecked(next)
    onChange?.(next)
  }

  const hasLabel = Boolean(label)

  // aria-label 규칙 처리
  const ariaLabel = !hasLabel
    ? '선택'
    : !showLabel
    ? `${label} 선택`
    : undefined

  return (
    <div className={`checkbox-item${className ? ` ${className}` : ''}`}>
      <input
        type="checkbox"
        id={hasLabel ? id : undefined}
        name={chkName}
        checked={internalChecked}
        disabled={disabled}
        onChange={(e) => handleChange(e.target.checked)}
        aria-label={ariaLabel}
      />

      {hasLabel && showLabel && (
        <label htmlFor={id} className={disabled ? 'disabled' : undefined}>
          {label}
        </label>
      )}
    </div>
  )
}
