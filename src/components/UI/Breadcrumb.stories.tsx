import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Breadcrumb } from '@/components/UI/Breadcrumb'

const meta = {
  title: 'UI/Breadcrumb',
  component: Breadcrumb,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { label: '카테고리', href: '/category' },
      { label: '상세 페이지', href: '/category/item' },
    ],
  },
}
