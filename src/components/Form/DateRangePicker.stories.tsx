import type { Meta, StoryObj } from '@storybook/react'
import { DateRangePicker } from '@/components/Form/DateRangePicker'

const meta = {
  title: 'Form/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          minWidth: '100%',
          minHeight: '35rem',
        }}
      >
        <div style={{ margin: 'auto' }}>
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['single', 'range'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'single' },
      },
    },
    holidays: {
      control: false, // holidays 컨트롤러 숨김
    },
    label: {
      control: 'text',
    },
  },
} satisfies Meta<typeof DateRangePicker>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 날짜 선택
 */
export const Single: Story = {
  args: {
    type: 'single',
  },
}

/**
 * 기간 범위 선택 (시작일 ~ 종료일)
 */
export const Range: Story = {
  args: {
    type: 'range',
  },
}

/**
 * 공휴일이 강조된 기간 범위 선택
 */
export const WithHolidays: Story = {
  render: () => (
    <DateRangePicker
      type="range"
      holidays={[
        new Date(2025, 0, 1), // 신정
        new Date(2025, 1, 10), // 설날
        new Date(2025, 4, 5), // 어린이날
        new Date(2025, 5, 6), // 현충일
        new Date(2025, 8, 27), // 추석
        new Date(2025, 11, 25), // 크리스마스
      ]}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `
<DateRangePicker
  type="range"
  holidays={[
    new Date(2025, 0, 1), // 신정
    new Date(2025, 1, 10), // 설날
    new Date(2025, 4, 5), // 어린이날
    new Date(2025, 5, 6), // 현충일
    new Date(2025, 8, 27), // 추석
    new Date(2025, 11, 25), // 크리스마스
  ]}
/>
        `.trim(),
      },
    },
  },
}
