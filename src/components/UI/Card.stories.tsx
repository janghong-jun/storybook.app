import { Meta, StoryObj } from '@storybook/react'
import { Card, CardProps } from '@/components/UI/Card'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {},
  },
}

export default meta
type Story = StoryObj<CardProps>

export const Default: Story = {
  args: {
    title: 'Beautiful Landscape',
    description: 'A stunning view of mountains and lake at sunset.',
    imageUrl: 'https://picsum.photos/seed/slide1/600/300?w=1200&q=75',
    altText: 'Landscape',
    linkUrl: '/details/landscape',
  },
}

export const NoneImage: Story = {
  args: {
    title: 'Beautiful Landscape',
    description: 'A stunning view of mountains and lake at sunset.',
    linkUrl: '/details/landscape',
  },
}
