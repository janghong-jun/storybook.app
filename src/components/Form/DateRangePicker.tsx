import React, { useState, forwardRef, useMemo, useEffect } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import { ko } from 'date-fns/locale'

registerLocale('ko', ko)

// 커스텀 DatePicker Input 컴포넌트
const CustomDateInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { onCalendarClick?: () => void }
>(({ onCalendarClick, ...props }, ref) => (
  <div className="date-input-wrapper">
    <input
      {...props}
      ref={ref}
      className="date-input"
      readOnly
      placeholder="날짜를 선택하세요"
    />
    <button
      type="button"
      className="calendar-button"
      onClick={onCalendarClick}
      aria-label="달력 열기"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    </button>
  </div>
))

CustomDateInput.displayName = 'CustomDateInput'

interface DateRangePickerProps {
  /** DateRangePicker 타입 (single, range) */
  type?: 'single' | 'range'
  /**
   * 공휴일 배열
   *
   * ```jsx
   *  holidays={[
   *    new Date(2025, 1, 1),
   *    new Date(2025, 3, 1),
   *    new Date(2025, 5, 5),
   *    new Date(2025, 6, 6),
   *    new Date(2025, 8, 15),
   *    new Date(2025, 10, 3),
   *    new Date(2025, 10, 9),
   *    new Date(2025, 12, 25),
   *  ]}
   * ```
   */
  holidays?: Date[]
  /** 대체 텍스트 */
  label?: string
}

/** DateRangePicker UI 컴포넌트 */
export function DateRangePicker({
  type = 'single',
  holidays = [],
  label = '',
}: DateRangePickerProps) {
  // today를 useMemo로 최적화
  const today = useMemo(() => new Date(), [])

  // yesterday를 useMemo로 최적화
  const yesterday = useMemo(() => {
    const date = new Date(today)
    date.setDate(today.getDate())
    return date
  }, [today])

  // 오늘 날짜 디폴트
  const [startDate, setStartDate] = useState<Date | null>(
    type === 'single' ? today : new Date(yesterday.getTime() - 6 * 86400000) // 레인지 기본: 최근 1주일
  )

  const [endDate, setEndDate] = useState<Date | null>(
    type === 'single' ? null : yesterday
  )

  // 디폴트 없음
  // const initialStart = new Date(yesterday)
  // initialStart.setDate(yesterday.getDate() - 6)
  // const [startDate, setStartDate] = useState<Date | null>(
  //   type === 'single' ? null : null
  // )
  // const [endDate, setEndDate] = useState<Date | null>(
  //   type === 'range' ? null : null
  // )

  // DatePicker 팝업 상태 관리
  const [startDateOpen, setStartDateOpen] = useState(false)
  const [endDateOpen, setEndDateOpen] = useState(false)

  // ESC 키로 팝업 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setStartDateOpen(false)
        setEndDateOpen(false)
      }
    }

    if (startDateOpen || endDateOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [startDateOpen, endDateOpen])

  // 날짜가 공휴일인지 확인 (holidays의 월을 1-12 범위로 입력받아 실제 월로 변환)
  const isHoliday = (date: Date) => {
    return holidays.some((h) => {
      const holidayYear = h.getFullYear()
      const holidayMonth = h.getMonth() - 1 // 입력된 월에서 1을 빼서 실제 JavaScript 월로 변환
      const holidayDate = h.getDate()

      return (
        holidayYear === date.getFullYear() &&
        holidayMonth === date.getMonth() &&
        holidayDate === date.getDate()
      )
    })
  }
  const dayClassName = (date: Date) => {
    if (isHoliday(date)) return 'calendar-holiday'
    const day = date.getDay()
    if (day === 0) return 'calendar-sunday'
    if (day === 6) return 'calendar-saturday'
    return ''
  }

  const handleMonthChange = () => {
    // Month change handling - 필요시 추가 로직 구현 가능
  }

  return (
    <div className="datepicker-group">
      {type === 'single' ? (
        <div className="datepicker-item">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            onSelect={(date) => {
              // 키보드 선택이나 마우스 선택 모두 처리
              setStartDate(date)
              setStartDateOpen(false)
            }}
            onMonthChange={handleMonthChange}
            dateFormat="yyyy.MM.dd"
            customInput={
              <CustomDateInput
                onCalendarClick={() => setStartDateOpen(true)}
                aria-label={label ? `${label} 날짜 선택` : '날짜 선택'}
                placeholder="날짜를 선택하세요"
              />
            }
            dayClassName={dayClassName}
            locale="ko"
            popperPlacement="top-start"
            open={startDateOpen}
            onInputClick={() => setStartDateOpen(true)}
            onClickOutside={() => setStartDateOpen(false)}
            renderCustomHeader={({
              monthDate,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="calendar-header-custom">
                <button
                  type="button"
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  className="calendar-nav-button calendar-nav-prev"
                  aria-label="이전 달"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <div className="calendar-month-year">
                  {monthDate.toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </div>
                <button
                  type="button"
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  className="calendar-nav-button calendar-nav-next"
                  aria-label="다음 달"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="calendar-close-button"
                  onClick={() => setStartDateOpen(false)}
                  aria-label="달력 닫기"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            )}
            // 싱글 선택일 때 오늘 이후 선택 불가로 제한하려면 아래 주석 해제
            // maxDate={today}
            highlightDates={[
              {
                'react-datepicker__day--weekend': Array.from(
                  { length: 7 },
                  (_, i) => new Date(2023, 0, i)
                ).filter((date) => date.getDay() === 0 || date.getDay() === 6),
              }, // 주말
              { 'calendar-holiday': holidays }, // 공휴일
            ]}
          />
        </div>
      ) : (
        <>
          <div className="datepicker-item">
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date)
                setStartDateOpen(false)
              }}
              onSelect={(date) => {
                // 키보드 선택이나 마우스 선택 모두 처리
                setStartDate(date)
                setStartDateOpen(false)
              }}
              onMonthChange={handleMonthChange}
              dateFormat="yyyy.MM.dd"
              customInput={
                <CustomDateInput
                  onCalendarClick={() => setStartDateOpen(true)}
                  aria-label={label ? `${label} 시작일 선택` : '시작일 선택'}
                  placeholder="날짜를 선택하세요"
                />
              }
              dayClassName={dayClassName}
              locale="ko"
              popperPlacement="top-start"
              open={startDateOpen}
              onInputClick={() => setStartDateOpen(true)}
              onClickOutside={() => setStartDateOpen(false)}
              renderCustomHeader={({
                monthDate,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div className="calendar-header-custom">
                  <button
                    type="button"
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    className="calendar-nav-button calendar-nav-prev"
                    aria-label="이전 달"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <div className="calendar-month-year">
                    {monthDate.toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </div>
                  <button
                    type="button"
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    className="calendar-nav-button calendar-nav-next"
                    aria-label="다음 달"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="calendar-close-button"
                    onClick={() => setStartDateOpen(false)}
                    aria-label="달력 닫기"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              )}
              // 시작일은 종료일보다 늦을 수 없음
              maxDate={endDate || undefined}
              // 시작일 달력이 열릴 때 시작일이 있는 월로 이동
              {...(startDate && {
                openToDate: startDate,
              })}
              highlightDates={[
                {
                  'react-datepicker__day--weekend': Array.from(
                    { length: 7 },
                    (_, i) => new Date(2023, 0, i)
                  ).filter(
                    (date) => date.getDay() === 0 || date.getDay() === 6
                  ),
                }, // 주말
                {
                  'calendar-holiday': holidays.map((h) => {
                    // holidays의 월을 1-12 범위로 입력받아 실제 Date 객체로 변환
                    const year = h.getFullYear()
                    const month = h.getMonth() - 1 // 입력된 월에서 1을 빼서 실제 JavaScript 월로 변환
                    const date = h.getDate()
                    return new Date(year, month, date)
                  }),
                }, // 공휴일
              ]}
            />
          </div>
          <span>~</span>
          <div className="datepicker-item">
            <DatePicker
              selected={endDate}
              onChange={(date) => {
                setEndDate(date)
                setEndDateOpen(false)
              }}
              onSelect={(date) => {
                // 키보드 선택이나 마우스 선택 모두 처리
                setEndDate(date)
                setEndDateOpen(false)
              }}
              onMonthChange={handleMonthChange}
              dateFormat="yyyy.MM.dd"
              customInput={
                <CustomDateInput
                  onCalendarClick={() => setEndDateOpen(true)}
                  aria-label={label ? `${label} 종료일 선택` : '종료일 선택'}
                  placeholder="날짜를 선택하세요"
                />
              }
              dayClassName={dayClassName}
              locale="ko"
              popperPlacement="top-start"
              open={endDateOpen}
              onInputClick={() => setEndDateOpen(true)}
              onClickOutside={() => setEndDateOpen(false)}
              renderCustomHeader={({
                monthDate,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div className="calendar-header-custom">
                  <button
                    type="button"
                    className="calendar-close-button"
                    onClick={() => setEndDateOpen(false)}
                    aria-label="달력 닫기"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    className="calendar-nav-button calendar-nav-prev"
                    aria-label="이전 달"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <div className="calendar-month-year">
                    {monthDate.toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </div>
                  <button
                    type="button"
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    className="calendar-nav-button calendar-nav-next"
                    aria-label="다음 달"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              )}
              // 종료일은 시작일보다 빠를 수 없음
              minDate={startDate || undefined}
              // 종료일 달력이 열릴 때 종료일이 있는 월로 이동
              {...(endDate && {
                openToDate: endDate,
              })}
              highlightDates={[
                {
                  'react-datepicker__day--weekend': Array.from(
                    { length: 7 },
                    (_, i) => new Date(2023, 0, i)
                  ).filter(
                    (date) => date.getDay() === 0 || date.getDay() === 6
                  ),
                }, // 주말
                {
                  'calendar-holiday': holidays.map((h) => {
                    // holidays의 월을 1-12 범위로 입력받아 실제 Date 객체로 변환
                    const year = h.getFullYear()
                    const month = h.getMonth() - 1 // 입력된 월에서 1을 빼서 실제 JavaScript 월로 변환
                    const date = h.getDate()
                    return new Date(year, month, date)
                  }),
                }, // 공휴일
              ]}
            />
          </div>
        </>
      )}
    </div>
  )
}
