/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import React, { useState, useEffect } from 'react'
import { Pagination } from '@/components/UI/Pagination'

const meta = {
  title: 'UI/Pagination',
  component: Pagination,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: 'number' },
    total: { control: 'number' },
    perPage: { control: 'number' },
    showCount: { control: 'number' },
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage || 1)

    useEffect(() => {
      if (args.currentPage !== currentPage) {
        setCurrentPage(args.currentPage || 1)
      }
    }, [args.currentPage])

    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        onPageChange={(page) => {
          args.onPageChange?.(page)
          setCurrentPage(page)
        }}
      />
    )
  },
  args: {
    total: 100,
    perPage: 10,
    currentPage: 1,
    showCount: 5,
    onPageChange: () => {},
  },
}
