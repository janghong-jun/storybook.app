'use client'
import DefaultLayout from '@/components/layout/DefaultLayout'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function Pages() {
  usePageTitle('샘플')
  return (
    <DefaultLayout>
      <div>t</div>
    </DefaultLayout>
  )
}
