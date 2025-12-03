import { Divider } from '@/components/UI/Divider'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Divider> = {
  title: 'UI/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['solid', 'dashed', 'dotted'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'solid' },
      },
    },
    color: {
      control: { type: 'select' },
      options: ['gray', 'dark', 'primary'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'gray' },
      },
    },
    thickness: {
      control: { type: 'select' },
      options: ['thin', 'medium', 'thick'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'thin' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Divider>

export const Default: Story = {
  args: {
    type: 'solid',
    color: 'gray',
    thickness: 'thin',
  },
}
