/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from '@storybook/react'
import { useArgs } from 'storybook/preview-api'
import { Checkbox, CheckboxProps } from '@/components/Form/Checkbox'

type Story = StoryObj<CheckboxProps>

const meta: Meta<typeof Checkbox> = {
  title: 'Form/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta

// ------------------- Default -------------------
export const Default: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs<CheckboxProps>()
    return (
      <Checkbox {...args} onChange={(checked) => updateArgs({ checked })} />
    )
  },
  args: {
    label: '체크박스',
    checked: false,
    showLabel: true,
    disabled: false,
  },
}

// ------------------- Disabled -------------------
export const Disabled: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs<CheckboxProps>()
    return (
      <Checkbox {...args} onChange={(checked) => updateArgs({ checked })} />
    )
  },
  args: {
    label: '비활성화 체크박스',
    checked: true,
    showLabel: true,
    disabled: true,
  },
}

// ------------------- NoLabel -------------------
export const NoLabel: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs<CheckboxProps>()
    return (
      <Checkbox {...args} onChange={(checked) => updateArgs({ checked })} />
    )
  },
  args: {
    checked: false,
    showLabel: false,
    disabled: false,
  },
}
