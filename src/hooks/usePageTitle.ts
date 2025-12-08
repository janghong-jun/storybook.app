'use client'

import { useEffect } from 'react'

const globalDefaultTitle = '내 사이트 이름'

export function usePageTitle(title?: string) {
  useEffect(() => {
    if (title) {
      document.title = title
    } else {
      document.title = globalDefaultTitle
    }
  }, [title])
}
