import '@/styles/globals.scss'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Accordion } from '@/components/UI/Accordion'

const meta = {
  title: 'UI/Accordion',
  component: Accordion,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { title: '첫 번째 항목', content: <p>첫 번째 내용입니다.</p> },
      { title: '두 번째 항목', content: <p>두 번째 내용입니다.</p> },
    ],
  },
}

export const AllowMultiple: Story = {
  args: {
    items: [
      { title: '첫 번째 항목', content: <p>첫 번째 내용입니다.</p> },
      { title: '두 번째 항목', content: <p>두 번째 내용입니다.</p> },
    ],
    allowMultipleOpen: true,
  },
}

export const Index: Story = {
  args: {
    items: [
      { title: '첫 번째 항목', content: <p>첫 번째 내용입니다.</p> },
      { title: '두 번째 항목', content: <p>두 번째 내용입니다.</p> },
    ],
    defaultOpenIndex: 0,
    allowMultipleOpen: false,
  },
}

export const CustomClass: Story = {
  args: {
    items: [
      { title: '첫 번째 항목', content: <p>첫 번째 내용입니다.</p> },
      { title: '두 번째 항목', content: <p>두 번째 내용입니다.</p> },
    ],
    className: 'custom-accordion',
  },
}
