import React from 'react'

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  /** Divider 선모양 */
  type?: 'solid' | 'dashed' | 'dotted'
  /** Divider 색상 */
  color?: 'gray' | 'dark' | 'primary'
  /** Divider 두께 */
  thickness?: 'thin' | 'medium' | 'thick'
  /** 커스텀 CSS 클래스 */
  className?: string
}

/** Divider UI 컴포넌트 */
export const Divider: React.FC<DividerProps> = ({
  type = 'solid',
  color = 'gray',
  thickness = 'thin',
  className = '',
  ...rest
}) => {
  const computedClassName = [
    'divider',
    `divider--${type}`,
    `divider--color-${color}`,
    `divider--thickness-${thickness}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <hr className={computedClassName} {...rest} />
}
