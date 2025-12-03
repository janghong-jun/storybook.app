import React, { useId, useRef } from 'react'

export interface RadioOption {
  /** 라디오 버튼에 표시될 텍스트 */
  label: string
  /** 라디오 버튼의 값 */
  value: string
  /** 비활성화 여부 */
  disabled?: boolean
}

export interface RadioGroupProps {
  /** 라디오 버튼 옵션 배열 */
  options: RadioOption[]
  /** 현재 선택된 값 */
  selectedValue?: string
  /** 값 변경 시 호출되는 콜백 */
  onChange: (value: string) => void
  /** 그룹 라벨 (화면에 보이거나 스크린리더용) */
  groupLabel?: string
  /** 커스텀 CSS 클래스 */
  className?: string
  /** groupLabel을 화면에 표시할지 여부 */
  showLabel?: boolean
  /**  name 지정 가능 없으면 랜덤 */
  name?: string
}

/** RadioGroup UI 컴포넌트 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  selectedValue,
  onChange = () => {}, // 기본 빈 함수
  groupLabel,
  className,
  showLabel = false,
  name,
}) => {
  const uniqueGroupId = useId() // useRef 없이 바로 사용
  const radiosRef = useRef<Array<HTMLInputElement | null>>([])

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(e.key))
      return

    e.preventDefault()
    const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1
    let nextIndex = index

    // disabled 라디오 건너뛰면서 이동
    for (let i = 0; i < options.length; i++) {
      nextIndex = (nextIndex + dir + options.length) % options.length
      if (!options[nextIndex].disabled) break
    }

    const nextRadio = radiosRef.current[nextIndex]
    if (nextRadio) {
      nextRadio.focus()
      onChange(options[nextIndex].value)
    }
  }

  return (
    <div
      role="radiogroup"
      {...(groupLabel
        ? { 'aria-labelledby': `label-${uniqueGroupId}` }
        : { 'aria-label': `${groupLabel ?? '라디오 그룹'} 선택` })}
      className={`rdo-group${className ? ` ${className}` : ''}`}
    >
      {groupLabel && (
        <span
          id={`label-${uniqueGroupId}`}
          {...(!showLabel
            ? { className: 'sr-only' }
            : { className: 'rdo-title' })}
        >
          {groupLabel}
        </span>
      )}

      {options.map((option, index) => {
        const inputId = `radio-${uniqueGroupId}-${index}`
        return (
          <div key={inputId} className="rdo-item">
            <input
              ref={(el: HTMLInputElement | null) => {
                radiosRef.current[index] = el
              }}
              type="radio"
              id={inputId}
              name={name ?? `radio-group-${uniqueGroupId}`}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onChange(option.value)}
              disabled={option.disabled}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
            <label
              htmlFor={inputId}
              className={option.disabled ? 'disabled' : ''}
            >
              {option.label}
            </label>
          </div>
        )
      })}
    </div>
  )
}
