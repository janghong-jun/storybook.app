'use client'

import dynamic from 'next/dynamic'

const NotFoundComponent = dynamic(() => import('./NotFoundComponent'), {
  ssr: true,
})

export default function NotFoundPage() {
  return <NotFoundComponent />
}
