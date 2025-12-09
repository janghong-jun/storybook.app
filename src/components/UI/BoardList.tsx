import React from 'react';
import Link from 'next/link';

export interface BoardItem {
  /** 게시글 제목 */
  title: string;
  /** 게시글 설명 */
  description?: string;
  /** 클릭 시 이동 URL */
  linkUrl: string;
  /** a 태그 target 속성 (_blank, _self 등) */
  target?: '_self' | '_blank' | '_parent' | '_top';
}

export interface BoardListProps {
  /**
   * 게시판 목록에 표시할 아이템 배열
   *
   * ```jsx
   * items = [
   *   {
   *    title: '공지사항 1',
   *    description: '중요한 공지입니다.',
   *    linkUrl: '/notice/1',
   *   },
   *   {
   *    title: '공지사항 2',
   *    linkUrl: '/notice/2',
   *   },
   *   {
   *    title: '공지사항 3',
   *    description: '업데이트 안내',
   *    linkUrl: '/notice/3'
   *   }
   * ]
   * ```
   */
  items: BoardItem[];
}

/** BoardList UI 컴포넌트 */
export const BoardList = ({ items = [] }: BoardListProps) => {
  if (!items || items.length === 0) {
    return (
      <div className="board-list__empty" role="status">
        게시글이 없습니다.
      </div>
    );
  }
  return (
    <ul className="board-list">
      {items.map((item, index) => {
        const isExternal = !item.linkUrl.startsWith('/');
        // 외부 링크 프로토콜 자동 붙이기
        const url = isExternal
          ? item.linkUrl.startsWith('http')
            ? item.linkUrl
            : `https://${item.linkUrl}`
          : item.linkUrl;

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
        );
      })}
    </ul>
  );
};
