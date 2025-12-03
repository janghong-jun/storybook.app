/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { Toast } from '@/components/UI/Toast'
import { Button } from '@/components/UI/Button'

const meta = {
  title: 'UI/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      table: {
        type: { summary: 'string | React.ReactNode' },
      },
      control: 'text',
    },
    duration: { control: 'number' },
    visible: { control: false },
    onClose: { action: 'closed' },
    className: { control: 'text' },
    triggerRef: { control: false },
  },
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
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [showToast, setShowToast] = useState(args.visible ?? false)

    return (
      <>
        <Button onClick={() => setShowToast(true)} label="토스트 열기" />
        <Toast
          {...args}
          visible={showToast}
          onClose={() => {
            setShowToast(false)
            args.onClose?.()
          }}
        />
      </>
    )
  },
  args: {
    message: '작업이 완료되었습니다!',
    visible: false,
    duration: 3000,
    onClose: () => {},
  },
  parameters: {
    docs: {
      source: {
        code: `
<Toast
  message="작업이 완료되었습니다!"
  visible={showToast}
  onClose={() => setShowToast(false)}
/>`,
      },
    },
  },
}
