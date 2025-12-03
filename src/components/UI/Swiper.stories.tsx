import React from 'react'
import Image from 'next/image'
import type { Meta, StoryObj } from '@storybook/react'
import { SwiperComponent } from '@/components/UI/Swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const meta: Meta<typeof SwiperComponent> = {
  title: 'UI/Swiper',
  component: SwiperComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    autoplay: { control: 'boolean' },
    pagination: { control: 'boolean' },
    navigation: { control: 'boolean' },
    slidesPerView: { control: 'number' },
    spaceBetween: { control: 'number' },
  },
}
export default meta

type Story = StoryObj<typeof SwiperComponent>

const slides = [
  {
    content: (
      <Image
        src="https://picsum.photos/seed/slide1/600/300"
        alt="푸른 바다가 보이는 해변 풍경"
        width={600}
        height={300}
        style={{ verticalAlign: 'top' }}
        loading="eager"
        priority
      />
    ),
  },
  {
    content: (
      <Image
        src="https://picsum.photos/seed/slide2/600/300"
        alt="숲속 햇살이 비치는 길"
        width={600}
        height={300}
        style={{ verticalAlign: 'top' }}
        loading="eager"
        priority
      />
    ),
  },
  {
    content: (
      <Image
        src="https://picsum.photos/seed/slide3/600/300"
        alt="도심의 야경"
        width={600}
        height={300}
        style={{ verticalAlign: 'top' }}
        loading="eager"
        priority
      />
    ),
  },
]

const Container = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      width: '60rem',
      height: '30rem',
      margin: 'auto',
    }}
  >
    {children}
  </div>
)

export const Default: Story = {
  args: {
    items: slides,
    pagination: true,
    navigation: true,
    autoplay: false,
  },
  render: (args) => (
    <Container>
      <SwiperComponent {...args} />
    </Container>
  ),
}

export const AutoPlay: Story = {
  args: {
    items: slides,
    autoplay: true,
    pagination: true,
    navigation: true,
  },
  render: (args) => (
    <Container>
      <SwiperComponent {...args} />
    </Container>
  ),
}

export const MultiView: Story = {
  args: {
    items: [...slides, ...slides],
    slidesPerView: 2,
    spaceBetween: 16,
    navigation: true,
  },
  render: (args) => (
    <Container>
      <SwiperComponent {...args} />
    </Container>
  ),
}

export const Loop: Story = {
  args: {
    items: slides,
    loop: true,
    pagination: true,
    navigation: true,
    autoplay: true,
  },
  render: (args) => (
    <Container>
      <SwiperComponent {...args} />
    </Container>
  ),
}
