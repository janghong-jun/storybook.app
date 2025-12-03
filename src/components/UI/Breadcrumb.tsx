import React from 'react'
import Link from 'next/link'

/** Breadcrumb 아이템 타입 */
export type BreadcrumbItem = {
  /** 표시할 라벨 */
  label: string
  /** 링크 URL */
  href?: string
}

/** Breadcrumb 컴포넌트 props */
export interface BreadcrumbProps {
  /** 표시할 아이템 목록 */
  items: BreadcrumbItem[]
  /** 홈 경로 (기본: '/') */
  homeHref?: string
}

/** Breadcrumb UI 컴포넌트 */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  homeHref = '/',
}) => {
  const allItems: BreadcrumbItem[] = [{ label: '홈', href: homeHref }, ...items]

  return (
    <nav aria-label="현재 위치" className="breadcrumb">
      <ol className="breadcrumb-list">
        {allItems.map((item, idx) => {
          const isFirst = idx === 0

          return (
            <li
              key={idx}
              className={`breadcrumb-item${idx === 0 ? ' home' : ''}`}
            >
              {isFirst ? (
                item.href ? (
                  <Link href={homeHref} className="breadcrumb-link">
                    <span>홈</span>
                  </Link>
                ) : (
                  <span className="breadcrumb-link">홈</span>
                )
              ) : item.href ? (
                <Link href={item.href} className="breadcrumb-link">
                  {item.label}
                </Link>
              ) : (
                <span className="breadcrumb-link">{item.label}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
