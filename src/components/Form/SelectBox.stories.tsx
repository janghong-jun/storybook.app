import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import React, { useState } from 'react'
import { SelectBox, SelectBoxProps } from '@/components/Form/Selectbox'

const meta: Meta<SelectBoxProps> = {
  title: 'Form/SelectBox',
  component: SelectBox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'object' },
    placeholder: { control: 'text' },
    custom: { control: 'boolean' },
    value: { table: { disable: true } },
    onChange: { action: 'changed' },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          minHeight: '30rem',
        }}
      >
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<SelectBoxProps>

export const Default: Story = {
  args: {
    options: [
      { label: '옵션 1', value: 1 },
      { label: '옵션 2', value: 'option2' },
      { label: '옵션 3', value: 'option3' },
    ],
    placeholder: '선택하세요',
    value: 1,
  },
  render: (args) => {
    return <SelectBoxWrapper {...args} />

    function SelectBoxWrapper(props: SelectBoxProps) {
      const [value, setValue] = React.useState<string | number>(
        props.value ?? ''
      )
      return <SelectBox {...props} value={value} onChange={setValue} />
    }
  },
}

export const Native: Story = {
  args: {
    options: [
      { label: '옵션 1', value: 'option1' },
      { label: '옵션 2', value: 'option2' },
      { label: '옵션 3', value: 'option3' },
    ],
    placeholder: '브라우저 기본 select',
    custom: false,
    value: 'option3',
  },
  render: (args) => {
    return <SelectBoxWrapper {...args} />

    function SelectBoxWrapper(props: SelectBoxProps) {
      const [value, setValue] = useState<string | number>(props.value ?? '')
      return <SelectBox {...props} value={value} onChange={setValue} />
    }
  },
}
