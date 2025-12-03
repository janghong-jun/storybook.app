/* eslint-disable react-hooks/set-state-in-effect */
import React, { useId, useState, useEffect } from 'react'

export interface SwitchProps {
  /** 초기 상태 */
  checked?: boolean
  /** 스위칭시 호출할 함수 */
  onChange?: (checked: boolean) => void
  /** label 텍스트 */
  label?: string
  /**  name 지정 가능 없으면 랜덤 */
  name?: string
  /** 비활성화 여부 */
  disabled?: boolean
  /** 커스텀 CSS 클래스 */
  className?: string
}

/** Switch UI 컴포넌트 */
export const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange,
  label,
  name,
  disabled = false,
  className,
}) => {
  const id = useId()
  const switchName = name ?? `switch-${id}`
  const [internalChecked, setInternalChecked] = useState(checked ?? false)

  // 외부 checked prop이 바뀌면 내부 state 동기화
  useEffect(() => {
    if (checked !== undefined) setInternalChecked(checked)
  }, [checked])

  const handleChange = (next: boolean) => {
    if (disabled) return

    setInternalChecked(next)
    onChange?.(next)
  }
  return (
    <div
      className={[
        'switch-wrapper',
        disabled ? 'disabled' : null,
        className || null,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <input
        type="checkbox"
        id={id}
        name={switchName}
        role="switch"
        checked={internalChecked}
        disabled={disabled}
        onChange={(e) => handleChange(e.target.checked)}
        aria-label={label ? undefined : '토글 스위치'}
        className="switch-input"
      />
      <span className="switch-toggle" />
      {label && (
        <label htmlFor={id} className="switch-label">
          {label}
        </label>
      )}
    </div>
  )
}
