/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react'
import Loading from '@/components/common/Loading/Loading'
import { useLoadingStore } from '@/stores/loadingStore'
import React from 'react'

const meta: Meta<typeof Loading> = {
  title: 'Common/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Loading>
export const Default: Story = {
  render: () => {
    const { show, hide } = useLoadingStore()

    React.useEffect(() => {
      show()
      return
    }, [show, hide])

    return <Loading />
  },
}
