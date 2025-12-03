import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { Button } from '@/components/UI/Button'

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
    className: { control: 'text' },
    level: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      table: { type: { summary: 'string ' } },
    },
    size: {
      control: { type: 'select' },
      options: ['x-small', 'small', 'medium', 'large', 'x-large'],
      table: { type: { summary: 'string ' } },
    },
    disabled: { control: 'boolean' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    level: 'primary',
    label: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    level: 'secondary',
    label: 'Button',
  },
}

export const Tertiary: Story = {
  args: {
    size: 'medium',
    label: 'Button',
    level: 'tertiary',
  },
}

export const XSmall: Story = {
  args: {
    size: 'x-small',
    label: 'Button',
  },
  name: 'X-Small',
}
export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
}
export const Medium: Story = {
  args: {
    size: 'medium',
    label: 'Button',
  },
}
export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
}
export const XLarge: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
  name: 'X-Large',
}
export const Disabled: Story = {
  args: {
    label: 'Button',
    disabled: true,
  },
}
