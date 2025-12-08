'use client'

import { useEffect } from 'react'

const globalDefaultTitle = '하이코칭'

export function usePageTitle(title?: string) {
  useEffect(() => {
    const pageTitle = title || globalDefaultTitle
    document.title = pageTitle + ' | ' + globalDefaultTitle

    return () => {
      document.title = globalDefaultTitle
    }
  }, [title])
}
