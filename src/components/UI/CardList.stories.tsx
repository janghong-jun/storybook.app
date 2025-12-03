import type { Meta, StoryObj } from '@storybook/react'
import { CardList } from '@/components/UI/CardList'

const mockData = [
  {
    title: '클린한 UI 구성 가이드',
    description: '프론트 개발자가 꼭 알아야 할 UI 패턴들을 정리했습니다.',
    imageUrl: 'https://picsum.photos/seed/card1/600/300',
    altText: 'UI 패턴 이미지',
    linkUrl: '/guide/ui',
  },
  {
    title: 'Next.js 퍼포먼스 최적화',
    description: '이미지 최적화부터 라우팅 전략까지 한 번에 보기.',
    imageUrl: 'https://picsum.photos/seed/card2/600/300',
    altText: 'Next.js 퍼포먼스 이미지',
    linkUrl: '/guide/performance',
  },
  {
    title: 'React 상태 관리 전략',
    description: 'Context, Zustand, Jotai 등 상태 관리 선택 기준.',
    imageUrl: 'https://picsum.photos/seed/card3/600/300',
    altText: 'React 상태 관리 이미지',
    linkUrl: '/guide/state',
  },
  {
    title: 'UI 컴포넌트 시스템 만들기',
    description: 'Button부터 Modal까지 컴포넌트 설계 정석.',
    imageUrl: 'https://picsum.photos/seed/card4/600/300',
    altText: '컴포넌트 설계 이미지',
    linkUrl: '/guide/components',
  },
  {
    title: 'SCSS 구조 설계 팁',
    description: '믿고 쓰는 폴더 구조 + 네이밍 룰.',
    imageUrl: 'https://picsum.photos/seed/card5/600/300',
    altText: 'SCSS 구조 이미지',
    linkUrl: '/guide/scss',
  },
]

const meta: Meta<typeof CardList> = {
  title: 'UI/CardList',
  component: CardList,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
    },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof CardList>

export const Default: Story = {
  args: {
    cards: mockData,
    columns: 3,
    gap: 24,
  },
}

export const FourColumns: Story = {
  args: {
    cards: mockData,
    columns: 4,
    gap: 20,
  },
}

export const NonResponsive: Story = {
  args: {
    cards: mockData,
    columns: 3,
    gap: 24,
    responsive: false,
  },
}

export const WideGap: Story = {
  args: {
    cards: mockData,
    columns: 3,
    gap: 40,
  },
}
