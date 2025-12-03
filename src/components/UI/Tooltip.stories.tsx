import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Tooltip } from '@/components/UI/Tooltip'

const meta = {
  title: 'UI/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          position: 'relative',
          minWidth: '100%',
          minHeight: '20rem',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <div style={{ margin: 'auto' }}>
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    content: {
      table: {
        type: { summary: 'string | React.ReactNode' },
      },
      control: 'text',
    },
    label: { control: 'text' },
    iconClass: { control: 'text' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    content: '툴팁 내용입니다.',
    label: '툴팁 트리거',
  },
}
export const IconTooltip: Story = {
  args: {
    content: '아이콘 툴팁 내용입니다.',
    label: '아이콘 툴팁 트리거',
    iconClass: 'icon-info',
  },
}
export const CustomClassTooltip: Story = {
  args: {
    content: '커스텀 클래스가 적용된 툴팁 내용입니다.',
    label: '커스텀 클래스 툴팁 트리거',
    className: 'custom-tooltip',
  },
}
