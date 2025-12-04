import { useEffect } from 'react'
import { useLoadingStore } from '@/stores/loadingStore'
import styles from './Loading.module.scss'

const Loading = () => {
  const isLoading = useLoadingStore((state) => state.isLoading)

  // 스크롤 잠금/해제 처리
  useEffect(() => {
    if (!isLoading) return
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth / 10}rem`
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const preventScroll = (e: TouchEvent) => e.preventDefault()
    document.addEventListener('touchmove', preventScroll, { passive: false })

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = ''
      document.removeEventListener('touchmove', preventScroll)
    }
  }, [isLoading])

  if (!isLoading) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.spinner} />
    </div>
  )
}

export default Loading
