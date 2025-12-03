import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { RadioGroup, RadioGroupProps } from '@/components/Form/RadioGroup'

const meta: Meta<RadioGroupProps> = {
  title: 'Form/RadioGroup',
  component: RadioGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<RadioGroupProps>

const RadioGroupWrapper = (props: RadioGroupProps) => {
  const [selected, setSelected] = useState(props.selectedValue || '')

  return (
    <RadioGroup
      {...props}
      selectedValue={selected}
      onChange={(val: string) => {
        setSelected(val)
      }}
    />
  )
}

// Default 스토리
export const Default: Story = {
  render: (args) => <RadioGroupWrapper {...args} />,
  args: {
    groupLabel: '좋아하는 과일 선택',
    options: [
      { label: '사과', value: 'apple' },
      { label: '바나나', value: 'banana' },
      { label: '체리', value: 'cherry', disabled: true },
    ],
  },
}

// 선택 없음
export const DefaultSelection: Story = {
  render: (args) => <RadioGroupWrapper {...args} />,
  args: {
    groupLabel: '좋아하는 과일 선택',
    options: [
      { label: '사과', value: 'apple' },
      { label: '바나나', value: 'banana' },
      { label: '체리', value: 'cherry', disabled: true },
    ],
    selectedValue: 'apple',
  },
}

// 라벨 보임
export const ShowLabel: Story = {
  render: (args) => <RadioGroupWrapper {...args} />,
  args: {
    groupLabel: '좋아하는 과일 선택',
    options: [
      { label: '사과', value: 'apple' },
      { label: '바나나', value: 'banana' },
      { label: '체리', value: 'cherry' },
    ],
    showLabel: true,
  },
}

// 라벨 없음
export const DisabledItem: Story = {
  render: (args) => <RadioGroupWrapper {...args} />,
  args: {
    options: [
      { label: '사과', value: 'apple' },
      { label: '바나나', value: 'banana' },
      { label: '체리', value: 'cherry', disabled: true },
    ],
  },
}
