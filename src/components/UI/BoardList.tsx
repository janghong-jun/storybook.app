import React from 'react'
import Link from 'next/link'

export interface BoardItem {
  /** 게시글 제목 */
  title: string
  /** 게시글 설명 */
  description?: string
  /** 클릭 시 이동 URL */
  linkUrl: string
  /** a 태그 target 속성 (_blank, _self 등) */
  target?: '_self' | '_blank' | '_parent' | '_top'
}

export interface BoardListProps {
  /** 리스트 아이템 배열 */
  items: BoardItem[]
}

export const BoardList = ({ items = [] }: BoardListProps) => {
  return (
    <ul className="board-list">
      {items.map((item, index) => {
        const isExternal = !item.linkUrl.startsWith('/')
        // 외부 링크 프로토콜 자동 붙이기
        const url = isExternal
          ? item.linkUrl.startsWith('http')
            ? item.linkUrl
            : `https://${item.linkUrl}`
          : item.linkUrl

        return (
          <li key={index} className="board-list__item">
            {isExternal ? (
              <a
                href={url}
                className="board-list__item-link"
                target={item.target}
                rel={
                  item.target === '_blank' ? 'noopener noreferrer' : undefined
                }
                aria-label={`${item.title} 보기`}
              >
                <strong className="board-list__item-title">{item.title}</strong>
                {item.description && (
                  <p className="board-list__item-description">
                    {item.description}
                  </p>
                )}
              </a>
            ) : (
              <Link
                href={url}
                className="board-list__item-link"
                aria-label={`${item.title} 보기`}
                target={item.target}
              >
                <strong className="board-list__item-title">{item.title}</strong>
                {item.description && (
                  <p className="board-list__item-description">
                    {item.description}
                  </p>
                )}
              </Link>
            )}
          </li>
        )
      })}
    </ul>
  )
}
