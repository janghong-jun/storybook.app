import { Card, CardProps } from '@/components/UI/Card'

export interface CardListProps {
  /** 렌더링할 카드 데이터 배열 */
  cards: CardProps[]
  /** 추가적인 CSS 클래스 이름 */
  className?: string
  /** 한 줄에 표시할 카드의 수 */
  columns?: number
  /** 카드 사이의 간격 */
  gap?: number
  /** 화면 크기에 따라 반응형 그리드 적용 여부 */
  responsive?: boolean
}

/** Card UI 컴포넌트 */
export const CardList = ({
  cards,
  columns = 3,
  gap = 24,
  responsive = true,
  className,
}: CardListProps) => {
  const rootClass = [
    'card-list',
    responsive ? 'card-list--responsive' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <ul className={rootClass} data-columns={columns} data-gap={gap}>
      {cards.map((card, idx) => (
        <li key={idx} className="card-item">
          <Card {...card} />
        </li>
      ))}
    </ul>
  )
}
