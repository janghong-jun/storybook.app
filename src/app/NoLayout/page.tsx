'use client'

import { useViewport } from '@/contexts/viewPortContext'

export default function NoLayoutPage() {
  const { viewport } = useViewport()

  return (
    <div className={`wrap ${viewport ?? ''}`}>
      <main id="main" role="main">
        <h1>NoLayout Page</h1>
        <p>이 페이지는 헤더/푸터 없이 표시됩니다.</p>
      </main>
    </div>
  )
}
