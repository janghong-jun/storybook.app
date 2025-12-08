'use client'

import type { ReactNode } from 'react'
import { ViewportProvider } from '@/contexts/viewPortContext'
import { Loading } from '@/components/common/Loading'
import '@/styles/globals.scss'
import '@/styles/fonts/pretendard-gov.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="" />
        <link rel="icon" href="/images/favicon.ico" />
      </head>
      <body>
        <ViewportProvider>{children}</ViewportProvider>
        <Loading />
      </body>
    </html>
  )
}
