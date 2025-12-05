/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { SystemAlert, SystemAlertProps } from '@/components/UI/SystemAlert'
import { Button } from '@/components/UI/Button'

const meta: Meta<SystemAlertProps> = {
  title: 'UI/SystemAlert',
  component: SystemAlert,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      table: { type: { summary: 'string | false' } },
    },
    message: {
      control: 'object',
      table: { type: { summary: 'string | React.ReactNode' } },
    },
    hasConfirm: { control: 'boolean' },
    hasCancel: { control: 'boolean' },
    confirmLabel: { control: 'text' },
    cancelLabel: { control: 'text' },
    type: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
      table: { type: { summary: 'string ' } },
    },
  },
}
export default meta
type Story = StoryObj<SystemAlertProps>

// ✅ 기본 알림
export const Alert: Story = {
  args: {
    title: '알림',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    hasConfirm: true,
    hasCancel: false,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button label="Alert 열기" onClick={() => setIsOpen(true)} />
        {isOpen && (
          <SystemAlert
            {...args}
            visible={isOpen}
            onClose={() => setIsOpen(false)}
            onConfirm={() => setIsOpen(false)}
          />
        )}
      </>
    )
  },
}

// ✅ Confirm 버튼 2개
export const Confirm: Story = {
  args: {
    title: '알림',
    message: (
      <p>
        첫 번째 줄<br />
        두 번째 줄<br />세 번째 줄
      </p>
    ),
    hasConfirm: true,
    hasCancel: true,
    confirmLabel: '삭제',
    cancelLabel: '취소',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button label="Confirm 열기" onClick={() => setIsOpen(true)} />
        {isOpen && (
          <SystemAlert
            {...args}
            visible={isOpen}
            onClose={() => setIsOpen(false)}
            onConfirm={() => setIsOpen(false)}
            onCancel={() => setIsOpen(false)}
          />
        )}
      </>
    )
  },
}

// ✅ 버튼 없이 단순 알림
export const NoButtons: Story = {
  args: {
    title: '알림',
    message: '버튼 없이 표시되는 알림입니다.',
    hasConfirm: false,
    hasCancel: false,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button label="Alert 열기" onClick={() => setIsOpen(true)} />
        {isOpen && (
          <SystemAlert
            {...args}
            visible={isOpen}
            onClose={() => setIsOpen(false)}
          />
        )}
      </>
    )
  },
}

// ✅ 제목 없이 표시
export const NoTitle: Story = {
  args: {
    title: false,
    message: '제목 없이 표시되는 알림입니다.',
    hasConfirm: true,
    hasCancel: false,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button label="Alert 열기" onClick={() => setIsOpen(true)} />
        {isOpen && (
          <SystemAlert
            {...args}
            visible={isOpen}
            onClose={() => setIsOpen(false)}
            onConfirm={() => setIsOpen(false)}
          />
        )}
      </>
    )
  },
}

// ✅ 타입별 아이콘/스타일 테스트
export const TypeVariants: Story = {
  args: {
    title: '경고',
    message: '경고 타입 알림입니다.',
    type: 'warning',
    hasConfirm: true,
    hasCancel: false,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button label="Alert 열기" onClick={() => setIsOpen(true)} />
        {isOpen && (
          <SystemAlert
            {...args}
            visible={isOpen}
            onClose={() => setIsOpen(false)}
            onConfirm={() => setIsOpen(false)}
          />
        )}
      </>
    )
  },
}
