/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Input, InputProps } from '@/components/Form/Input'

const meta: Meta<InputProps> = {
  title: 'Form/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['text', 'password', 'email', 'number'],
      },
      table: { type: { summary: 'string' } },
    },
    clearable: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    labelHidden: {
      control: 'boolean',
    },
    error: {
      control: 'text',
    },
    value: { control: 'text', description: 'Input 초기값' },
    placeholder: { control: 'text', description: 'placeholder 값' },
    disabled: { control: 'boolean', description: '비활성화 여부' },
    readOnly: { control: 'boolean', description: '읽기 전용 여부' },
    onChange: { action: 'changed' },
  },
}

export default meta
type Story = StoryObj<InputProps>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || '')
    const [key, setKey] = useState(0)

    useEffect(() => {
      setValue(args.value || '')
      setKey((prev) => prev + 1)
    }, [args.value])

    return (
      <Input
        key={key}
        {...args}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          args.onChange?.(e)
        }}
      />
    )
  },
  args: {
    label: '이름',
    placeholder: '이름을 입력하세요',
    clearable: true,
    labelHidden: false,
    error: '',
    value: '',
  },
}

export const WithInitialValue: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || '')
    const [key, setKey] = useState(0)

    useEffect(() => {
      setValue(args.value || '')
      setKey((prev) => prev + 1)
    }, [args.value])

    return (
      <Input
        key={key}
        {...args}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          args.onChange?.(e)
        }}
      />
    )
  },
  args: {
    label: '이름',
    placeholder: '이름을 입력하세요',
    clearable: true,
    labelHidden: false,
    value: '홍길동',
  },
}

export const LabelHidden: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || '')
    const [key, setKey] = useState(0)

    useEffect(() => {
      setValue(args.value || '')
      setKey((prev) => prev + 1)
    }, [args.value])

    return (
      <Input
        key={key}
        {...args}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          args.onChange?.(e)
        }}
      />
    )
  },
  args: {
    label: '검색어',
    placeholder: '검색어 입력',
    clearable: true,
    labelHidden: true,
    error: '',
    value: '',
  },
}

export const WithError: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || '')
    const [key, setKey] = useState(0)

    useEffect(() => {
      setValue(args.value || '')
      setKey((prev) => prev + 1)
    }, [args.value])

    return (
      <Input
        key={key}
        {...args}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          args.onChange?.(e)
        }}
      />
    )
  },
  args: {
    label: '이메일',
    placeholder: '이메일 입력',
    clearable: true,
    labelHidden: false,
    error: '잘못된 이메일 형식입니다.',
    value: 'invalid-email',
  },
}

export const Password: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || '')
    const [key, setKey] = useState(0)

    useEffect(() => {
      setValue(args.value || '')
      setKey((prev) => prev + 1)
    }, [args.value])

    return (
      <Input
        key={key}
        {...args}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          args.onChange?.(e)
        }}
      />
    )
  },
  args: {
    type: 'password',
    label: '비밀번호',
    placeholder: '비밀번호 입력',
    clearable: true,
    labelHidden: false,
    value: '',
  },
}

export const Email: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || '')
    const [key, setKey] = useState(0)

    useEffect(() => {
      setValue(args.value || '')
      setKey((prev) => prev + 1)
    }, [args.value])

    return (
      <Input
        key={key}
        {...args}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          args.onChange?.(e)
        }}
      />
    )
  },
  args: {
    type: 'email',
    label: '이메일',
    placeholder: 'example@email.com',
    clearable: true,
    labelHidden: false,
    value: '',
  },
}

export const Number: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || '')
    const [key, setKey] = useState(0)

    useEffect(() => {
      setValue(args.value || '')
      setKey((prev) => prev + 1)
    }, [args.value])

    return (
      <Input
        key={key}
        {...args}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          args.onChange?.(e)
        }}
      />
    )
  },
  args: {
    type: 'number',
    label: '나이',
    placeholder: '나이를 입력하세요',
    clearable: true,
    labelHidden: false,
    value: '',
  },
}

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || '')
    const [key, setKey] = useState(0)

    useEffect(() => {
      setValue(args.value || '')
      setKey((prev) => prev + 1)
    }, [args.value])

    return (
      <Input
        key={key}
        {...args}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          args.onChange?.(e)
        }}
      />
    )
  },
  args: {
    label: '비활성화',
    placeholder: '수정할 수 없습니다',
    clearable: true,
    labelHidden: false,
    disabled: true,
    value: '비활성화된 값',
  },
}

export const ReadOnly: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || '')
    const [key, setKey] = useState(0)

    useEffect(() => {
      setValue(args.value || '')
      setKey((prev) => prev + 1)
    }, [args.value])

    return (
      <Input
        key={key}
        {...args}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          args.onChange?.(e)
        }}
      />
    )
  },
  args: {
    label: '읽기 전용',
    placeholder: '읽기만 가능합니다',
    clearable: false,
    labelHidden: false,
    readOnly: true,
    value: '읽기 전용 값',
  },
}

export const NoneClearable: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || '')
    const [key, setKey] = useState(0)

    useEffect(() => {
      setValue(args.value || '')
      setKey((prev) => prev + 1)
    }, [args.value])

    return (
      <Input
        key={key}
        {...args}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          args.onChange?.(e)
        }}
      />
    )
  },
  args: {
    label: '클리어 버튼 없음',
    placeholder: '클리어 버튼이 표시되지 않습니다',
    clearable: false,
    labelHidden: false,
    value: '',
  },
}
