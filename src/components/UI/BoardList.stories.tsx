import type { Meta, StoryObj } from '@storybook/react'
import { BoardList, BoardItem } from '@/components/UI/BoardList'

const meta: Meta<typeof BoardList> = {
  title: 'UI/BoardList',
  component: BoardList,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof BoardList>

const sampleItems: BoardItem[] = [
  {
    title: '공지사항 1',
    description: '중요한 공지입니다.',
    linkUrl: '/notice/1',
  },
  { title: '공지사항 2', linkUrl: '/notice/2' },
  { title: '공지사항 3', description: '업데이트 안내', linkUrl: '/notice/3' },
]

export const Default: Story = {
  args: {
    items: sampleItems,
  },
}
