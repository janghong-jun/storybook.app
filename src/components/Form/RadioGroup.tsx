import React, { useId, useRef } from 'react';

export interface RadioOption {
  /** 라디오 버튼에 표시될 텍스트 */
  label: string;
  /** 라디오 버튼의 값 */
  value: string;
  /** 비활성화 여부 */
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** 라디오 버튼 옵션 배열 */
  options: RadioOption[];
  /** 현재 선택된 값 */
  selectedValue?: string;
  /** 값 변경 시 호출되는 콜백 */
  onChange: (value: string) => void;
  /** 그룹 레이블 (화면에 보이거나 스크린리더용) */
  groupLabel?: string;
  /** 커스텀 CSS 클래스 */
  className?: string;
  /** groupLabel을 화면에 표시할지 여부 */
  showLabel?: boolean;
  /** name 지정 가능 없으면 랜덤 */
  name?: string;
  /** 수평 or 수직 정렬 */
  direction?: boolean;
}

/** RadioGroup UI 컴포넌트 (KRDS 표준 준수) */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  selectedValue,
  onChange = () => {}, // 기본 빈 함수
  groupLabel,
  className,
  showLabel = false,
  name,
  direction = false,
}) => {
  const uniqueGroupId = useId();
  const radiosRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // 방향키 (↑/←, ↓/→)로 라디오 버튼 선택 (KRDS 상호작용 가이드라인)
    if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
      return;
    }

    e.preventDefault();
    const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1;
    let nextIndex = index;

    // disabled 라디오 건너뛰면서 이동
    for (let i = 0; i < options.length; i++) {
      nextIndex = (nextIndex + dir + options.length) % options.length;
      if (!options[nextIndex].disabled) break;
    }

    const nextRadio = radiosRef.current[nextIndex];
    if (nextRadio) {
      nextRadio.focus();
      onChange(options[nextIndex].value);
    }
  };

  return (
    <fieldset className={`krds-check-area${className ? ` ${className}` : ''}`}>
      {groupLabel && (
        <legend className={`krds-check-legend${!showLabel ? ' sr-only' : ''}`}>
          {groupLabel}
        </legend>
      )}

      <div
        className={`krds-form-check-group ${
          direction ? 'chk-column' : 'chk-row'
        }`}
        role="group"
      >
        {options.map((option, index) => {
          const inputId = `radio-${uniqueGroupId}-${index}`;
          return (
            <div key={inputId} className="krds-form-check" role="presentation">
              <input
                ref={(el: HTMLInputElement | null) => {
                  radiosRef.current[index] = el;
                }}
                type="radio"
                id={inputId}
                name={name ?? `radio-group-${uniqueGroupId}`}
                value={option.value}
                checked={selectedValue === option.value}
                onChange={() => onChange(option.value)}
                disabled={option.disabled}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="krds-form-check-input"
                aria-label={option.label}
              />
              <label
                htmlFor={inputId}
                className={`krds-form-check-label${
                  option.disabled ? ' disabled' : ''
                }`}
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
};
