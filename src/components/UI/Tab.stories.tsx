import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Tab } from '@/components/UI/Tab'

const meta = {
  title: 'UI/Tab',
  component: Tab,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: {
      control: false,
      description: '비활성화 여부 ',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          minWidth: '30rem',
          minHeight: '20rem',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tab>

export default meta

type Story = StoryObj<typeof meta>

// 기본 스토리
export const Default: Story = {
  args: {
    items: [
      { label: 'Home', content: 'Home Content' },
      { label: 'Profile', content: 'Profile Content' },
      { label: 'Settings', content: 'Settings Content', disabled: true },
    ],
  },
}
