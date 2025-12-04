import { ReactNode, useState, useEffect } from 'react'
import Head from 'next/head'
import SkipToContent from '@/components/common/SkipToContent/SkipToContent'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface LayoutProps {
  children: ReactNode
  pageTitle?: string
}

type Viewport = 'mobile' | 'tablet' | 'desktop'

export default function Layout({ children, pageTitle }: LayoutProps) {
  const [viewport, setViewport] = useState<Viewport | undefined>(undefined)

  const getViewport = (width: number): Viewport => {
    if (width < 768) return 'mobile'
    if (width < 1024) return 'tablet'
    return 'desktop'
  }

  useEffect(() => {
    const handleResize = () => setViewport(getViewport(window.innerWidth))

    // 초기값 세팅
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const defaultTitle = '내 사이트 이름'
  const title = pageTitle ? `${pageTitle} | ${defaultTitle}` : defaultTitle

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
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
