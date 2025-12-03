/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from '@storybook/react'
import { useArgs } from 'storybook/preview-api'
import { Switch, SwitchProps } from '@/components/Form/Switch'

type Story = StoryObj<SwitchProps>

const meta: Meta<typeof Switch> = {
  title: 'Form/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta

// ------------------- Default -------------------
export const Default: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs<SwitchProps>()
    return <Switch {...args} onChange={(checked) => updateArgs({ checked })} />
  },
  args: {
    label: '토글 스위치',
    checked: false,
    disabled: false,
  },
}

// ------------------- Checked -------------------
export const Checked: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs<SwitchProps>()
    return <Switch {...args} onChange={(checked) => updateArgs({ checked })} />
  },
  args: {
    label: '체크된 스위치',
    checked: true,
    disabled: false,
  },
}

// ------------------- Disabled -------------------
export const Disabled: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs<SwitchProps>()
    return <Switch {...args} onChange={(checked) => updateArgs({ checked })} />
  },
  args: {
    label: '비활성화 스위치',
    checked: false,
    disabled: true,
  },
}

// ------------------- NoLabel -------------------
export const NoLabel: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs<SwitchProps>()
    return <Switch {...args} onChange={(checked) => updateArgs({ checked })} />
  },
  args: {
    checked: false,
    disabled: false,
  },
}
