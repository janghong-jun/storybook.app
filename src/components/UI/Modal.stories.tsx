import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Modal, ModalProps } from '@/components/UI/Modal'
import { Button } from '@/components/UI/Button'
import { useState } from 'react'

const meta: Meta<ModalProps> = {
  title: 'UI/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    children: {
      control: 'object',
      table: { type: { summary: 'string | React.ReactNode' } },
    },
    isOpen: { control: false },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          position: 'relative',
          minWidth: '100%',
          minHeight: '30rem',
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
}

export default meta
type Story = StoryObj<ModalProps>

// 독립적으로 모달 상태 관리
const ModalIndependentTemplate = (args: ModalProps) => {
  const [isOpen, setIsOpen] = useState(args.isOpen ?? false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)} label="모달 열기" />
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

export const Default: Story = {
  render: ModalIndependentTemplate,
  args: {
    label: '테스트 모달',
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    isOpen: false,
  },
}

export const NoHeader: Story = {
  render: ModalIndependentTemplate,
  args: {
    children: <p>여기에 모달 내용</p>,
    isOpen: false,
  },
}
