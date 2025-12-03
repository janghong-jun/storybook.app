'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import GNB from '@/components/layout/GNB'

export default function Header() {
  const headerRef = useRef<HTMLElement | null>(null)

  return (
    <header className="header" ref={headerRef}>
      <h1 className="logo">
        <Link
          href="/"
          aria-label="홈으로 이동"
          onClick={() => {
            const event = new CustomEvent('closeMobileMenu')
            document.body.scrollTo({ top: 0 })
            window.dispatchEvent(event)
          }}
        >
          하이코칭
        </Link>
      </h1>
      <GNB containerRef={headerRef} />
    </header>
  )
}
