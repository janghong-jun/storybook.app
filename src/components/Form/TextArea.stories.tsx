import { Meta, StoryObj } from '@storybook/react'
import { TextArea, TextAreaProps } from '@/components/Form/TextArea'
import { useState, useEffect } from 'react'

const meta: Meta<TextAreaProps> = {
  title: 'Form/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    labelHidden: { control: 'boolean' },
    value: {
      control: { type: 'select' },
      options: ['empty', 'short', 'long', 'multiline'],
      mapping: {
        empty: '',
        short: '초기값이 있는 TextArea입니다.',
        long: '여러 줄에 걸친 긴 텍스트를 입력할 수 있습니다. 이것은 더 긴 내용의 예시입니다.',
        multiline:
          '여러 줄에 걸친\n긴 텍스트를\n입력할 수 있습니다.\n\n줄바꿈도 가능합니다.',
      },
      description: 'TextArea 초기값',
    },
    placeholder: { control: 'text' },
    maxLength: { control: 'number' },
    showCounter: { control: 'boolean' },
    clearable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    error: { control: 'text' },
    onChange: { action: 'changed' },
  },
}

export default meta
type Story = StoryObj<TextAreaProps>

export const Default: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(args.value || '')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [key, setKey] = useState(0)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setValue(args.value || '')
      setKey((prev) => prev + 1)
    }, [args.value])

    return (
      <TextArea
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
    label: '내용 입력',
    placeholder: '내용을 입력하세요',
    maxLength: 200,
    clearable: true,
    labelHidden: false,
    showCounter: true,
    error: '',
    value: 'empty',
  },
}

export const WithInitialValue: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(args.value || '')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [key, setKey] = useState(0)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setValue(args.value || '')
      setKey((prev) => prev + 1)
    }, [args.value])

    return (
      <TextArea
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
    label: '내용 입력',
    placeholder: '내용을 입력하세요',
    maxLength: 200,
    clearable: true,
    showCounter: true,
    value: 'short',
  },
}

export const ErrorState: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(args.value || '')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [key, setKey] = useState(0)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setValue(args.value || '')
      setKey((prev) => prev + 1)
    }, [args.value])

    return (
      <TextArea
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
    label: '내용 입력',
    placeholder: '내용 입력 필요',
    maxLength: 200,
    showCounter: true,
    error: '필수 입력 항목입니다.',
    value: 'empty',
  },
}

export const ReadOnly: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(args.value || '')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [key, setKey] = useState(0)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setValue(args.value || '')
      setKey((prev) => prev + 1)
    }, [args.value])

    return (
      <TextArea
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
    placeholder: '읽기 전용',
    readOnly: true,
    maxLength: 200,
    showCounter: true,
    clearable: false,
    value: 'short',
  },
}

export const Disabled: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(args.value || '')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [key, setKey] = useState(0)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setValue(args.value || '')
      setKey((prev) => prev + 1)
    }, [args.value])

    return (
      <TextArea
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
    placeholder: '비활성화',
    disabled: true,
    maxLength: 200,
    showCounter: true,
    value: 'short',
  },
}

export const LabelHidden: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(args.value || '')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [key, setKey] = useState(0)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setValue(args.value || '')
      setKey((prev) => prev + 1)
    }, [args.value])

    return (
      <TextArea
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
    labelHidden: true,
    maxLength: 200,
    showCounter: true,
    value: 'empty',
  },
}

export const NoneClearable: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(args.value || '')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [key, setKey] = useState(0)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setValue(args.value || '')
      setKey((prev) => prev + 1)
    }, [args.value])

    return (
      <TextArea
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
    label: '메모',
    placeholder: '메모를 입력하세요',
    clearable: false,
    maxLength: 200,
    showCounter: true,
    value: 'empty',
  },
}

export const LongText: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(args.value || '')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [key, setKey] = useState(0)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setValue(args.value || '')
      setKey((prev) => prev + 1)
    }, [args.value])

    return (
      <TextArea
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
    label: '긴 텍스트',
    placeholder: '긴 내용을 입력하세요',
    maxLength: 500,
    showCounter: true,
    rows: 10,
    value: 'multiline',
  },
}

export const NoCounter: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(args.value || '')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [key, setKey] = useState(0)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setValue(args.value || '')
      setKey((prev) => prev + 1)
    }, [args.value])

    return (
      <TextArea
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
    label: '카운터 없음',
    placeholder: '글자 수 카운터가 표시되지 않습니다',
    maxLength: 200,
    showCounter: false,
    value: 'empty',
  },
}
