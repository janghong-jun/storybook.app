import React, { useState, useRef, useEffect } from 'react'

export interface SelectOption {
  label: string
  value: string | number
}

export interface SelectBoxProps {
  /**
   * ```jsx
   * options = [
   *   {
   *     label: '첫 번째 항목',
   *     value: 1
   *   },
   *   {
   *     label: '두 번째 항목',
   *     value: '2'
   *   }
   * ]
   * ```
   */
  options: SelectOption[]
  value?: string | number
  /** placeholder 값 */
  placeholder?: string
  /** 변경시 호출할 함수 */
  onChange?: (value: string | number) => void
  /** 비활성화 여부 */
  disabled?: boolean
  /** 커스텀 CSS 클래스 */
  className?: string
  /** custom 셀렉트박스 사용여부 */
  custom?: boolean
  /** 접근성 및 시각적 label */
  label?: string
}

/** Selectbox UI 컴포넌트 */
export const SelectBox: React.FC<SelectBoxProps> = ({
  options,
  value,
  placeholder,
  onChange,
  disabled = false,
  className = '',
  custom = true,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(value)
  const [highlightIndex, setHighlightIndex] = useState(-1)

  const buttonRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Sync selected value with controlled value
  useEffect(() => {
    setSelected(value)
  }, [value])

  // Close menu on click outside or focus leaving the component
  useEffect(() => {
    if (!isOpen) return
    const container = containerRef.current
    const handleClick = (e: MouseEvent) => {
      if (!container?.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    const handleFocusOut = (e: FocusEvent) => {
      // Close if focus moves outside of container
      if (!container?.contains(e.relatedTarget as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    container?.addEventListener('focusout', handleFocusOut as EventListener)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      container?.removeEventListener(
        'focusout',
        handleFocusOut as EventListener
      )
    }
  }, [isOpen])

  // Focus the option when opening
  useEffect(() => {
    if (isOpen && listRef.current && highlightIndex >= 0) {
      const optionNodes =
        listRef.current.querySelectorAll<HTMLLIElement>('li[role="option"]')
      optionNodes[highlightIndex]?.focus()
    }
  }, [isOpen, highlightIndex])

  const handleSelect = (val: string | number) => {
    setSelected(val)
    onChange?.(val)
    setIsOpen(false)
    buttonRef.current?.focus()
  }

  const openMenu = () => {
    if (disabled) return
    setIsOpen(true)
    const idx = options.findIndex((o) => o.value === selected)
    setHighlightIndex(idx >= 0 ? idx : 0)
  }

  const closeMenu = () => setIsOpen(false)

  // Button keydown handler (open menu and keyboard navigation for button)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (!isOpen) openMenu()
        else if (highlightIndex >= 0)
          handleSelect(options[highlightIndex].value)
        break

      case 'ArrowDown':
        e.preventDefault()
        if (!isOpen) {
          openMenu()
        } else {
          setHighlightIndex((prev) => {
            const next = Math.min(prev + 1, options.length - 1)
            return next
          })
        }
        break

      case 'ArrowUp':
        e.preventDefault()
        if (!isOpen) {
          openMenu()
        } else {
          setHighlightIndex((prev) => Math.max(prev - 1, 0))
        }
        break

      case 'Escape':
        closeMenu()
        break

      case 'Tab':
        closeMenu()
        break
    }
  }

  // Option keydown: handle arrow navigation & selection
  const handleOptionKey = (
    e: React.KeyboardEvent<HTMLLIElement>,
    idx: number,
    opt: SelectOption
  ) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        handleSelect(opt.value)
        break
      case 'ArrowDown': {
        e.preventDefault()
        const nextIdx = Math.min(idx + 1, options.length - 1)
        setHighlightIndex(nextIdx)
        const list = listRef.current
        if (list) {
          const optionNodes =
            list.querySelectorAll<HTMLLIElement>('li[role="option"]')
          optionNodes[nextIdx]?.focus()
        }
        break
      }
      case 'ArrowUp': {
        e.preventDefault()
        const prevIdx = Math.max(idx - 1, 0)
        setHighlightIndex(prevIdx)
        const list = listRef.current
        if (list) {
          const optionNodes =
            list.querySelectorAll<HTMLLIElement>('li[role="option"]')
          optionNodes[prevIdx]?.focus()
        }
        break
      }
      case 'Escape':
        closeMenu()
        buttonRef.current?.focus()
        break
      case 'Tab':
        closeMenu()
        break
    }
  }

  // ==============================
  // 기본 native select
  // ==============================
  if (!custom) {
    return (
      <div className="selectbox-native-wrapper">
        <select
          className={`selectbox-native ${className} ${
            !selected ? 'placeholder' : ''
          }`}
          value={selected ?? ''}
          onChange={(e) => handleSelect(e.target.value)}
          disabled={disabled}
          aria-label={label ? `${label} 선택` : '선택'}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    )
  }

  // ==============================
  // 커스텀 select
  // ==============================
  return (
    <div
      ref={containerRef}
      className={`selectbox-wrapper${disabled ? ' disabled' : ''}${
        className ? ` ${className}` : ''
      }`}
      tabIndex={-1}
    >
      <button
        type="button"
        ref={buttonRef}
        className={`selectbox-button ${selected ? '' : 'placeholder'} ${
          isOpen ? 'open' : ''
        }`}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? 'selectbox-listbox' : undefined}
        aria-label={label ? `${label} 선택` : '선택'}
        onKeyDown={handleKeyDown}
        onClick={() => (isOpen ? closeMenu() : openMenu())}
        tabIndex={0}
      >
        {selected
          ? options.find((o) => o.value === selected)?.label
          : placeholder}
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          id="selectbox-listbox"
          role="listbox"
          className="selectbox-options"
          tabIndex={-1}
          aria-activedescendant={
            highlightIndex >= 0
              ? `option-${options[highlightIndex]?.value}`
              : undefined
          }
        >
          {options.map((opt, i) => (
            <li
              key={opt.value}
              id={`option-${opt.value}`}
              tabIndex={-1}
              role="option"
              aria-selected={selected === opt.value}
              className={[
                'selectbox-option',
                selected === opt.value ? 'selected' : '',
                highlightIndex === i ? 'highlight' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onKeyDown={(e) => handleOptionKey(e, i, opt)}
              onClick={() => handleSelect(opt.value)}
              onMouseEnter={() => setHighlightIndex(i)}
              // For keyboard a11y: option gets focus only when navigating
              // Listbox ul grabs focus on open, options grab focus on Arrow nav
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
