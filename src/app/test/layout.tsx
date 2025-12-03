import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: '테스트 페이지',
}

export default function TestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
