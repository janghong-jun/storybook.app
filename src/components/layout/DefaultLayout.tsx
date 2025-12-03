'use client'

import { ReactNode, useState, useEffect } from 'react'
import SkipToContent from '@/components/common/SkipToContent'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

type Viewport = 'mobile' | 'tablet' | 'desktop'

export default function DefaultLayout({ children }: { children: ReactNode }) {
  const [viewport, setViewport] = useState<Viewport | undefined>(undefined)

  const getViewport = (width: number): Viewport => {
    if (width < 768) return 'mobile'
    if (width < 1024) return 'tablet'
    return 'desktop'
  }

  useEffect(() => {
    const handleResize = () => setViewport(getViewport(window.innerWidth))
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <SkipToContent />
      <div className={`wrap ${viewport ?? ''}`}>
        <Header />
        <main id="main" className="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
