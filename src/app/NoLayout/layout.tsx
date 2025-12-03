import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'none Layout',
}

export default function NoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
