'use client'

import Link from 'next/link'
import { useViewport } from '@/contexts/viewPortContext'
import styles from './not-found.module.scss'

export default function NotFound() {
  const { viewport } = useViewport()

  const viewportClass =
    viewport === 'mobile'
      ? styles.isMobile
      : viewport === 'tablet'
      ? styles.isTablet
      : styles.isDesktop

  return (
    <>
      <div className={`${styles.wrap} ${viewportClass}`}>
        <span aria-hidden className={styles.backgroundGlow} />
        <main id="main" role="main" className={styles.main}>
          <section className={styles.hero}>
            <p className={styles.heroBadge}>404 - Page Not Found</p>
            <h1>
              길을 잃으신 것 같아요
              <span>하지만 걱정하지 마세요!</span>
            </h1>
            <p className={styles.description}>
              요청하신 페이지를 찾을 수 없어요. 주소가 정확한지 다시 확인하거나,
              아래의 빠른 링크를 통해 원하는 정보를 찾아보세요.
            </p>
            <div className={styles.actions}>
              <Link className={styles.primaryBtn} href="/">
                홈으로 돌아가기
              </Link>
              <Link className={styles.secondaryBtn} href="/support">
                고객센터 문의
              </Link>
            </div>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelIllustration} aria-hidden>
              <span className={styles.ghost}>404</span>
              <span className={styles.orbit} />
            </div>
            <div className={styles.panelContent}>
              <h2>이 페이지가 필요한가요?</h2>
              <p>
                실수로 삭제되었거나 이동했을 수 있어요. 아래 자주 찾는 페이지를
                통해 빠르게 이동해 보세요.
              </p>
              <ul className={styles.quickLinks}>
                <li>
                  <Link href="/worklist">서비스 소개</Link>
                </li>
                <li>
                  <Link href="/about">회사 정보</Link>
                </li>
                <li>
                  <Link href="/contact">문의하기</Link>
                </li>
                <li>
                  <Link href="/blog">블로그</Link>
                </li>
              </ul>
            </div>
          </section>

          <section className={styles.statusCard}>
            <div>
              <p className={styles.statusLabel}>에러 코드</p>
              <p className={styles.statusValue}>404</p>
            </div>
            <div>
              <p className={styles.statusLabel}>가능한 원인</p>
              <p className={styles.statusMeta}>
                잘못된 주소 · 비공개 페이지 · 삭제된 콘텐츠
              </p>
            </div>
            <div>
              <p className={styles.statusLabel}>도움이 필요하신가요?</p>
              <Link className={styles.inlineLink} href="/support">
                24시간 고객센터 연결
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
