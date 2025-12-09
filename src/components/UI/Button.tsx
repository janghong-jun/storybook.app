export interface ButtonProps {
  /** 버튼의 고유 ID */
  id?: string;
  /** 버튼에 표시할 텍스트 */
  label: string;
  /** 페이지에서 가장 중요한 액션 버튼인지 여부 */
  level?: 'primary' | 'secondary' | 'tertiary';
  /** 버튼 크기 */
  size?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large';
  /** 버튼 클릭 시 호출할 함수 */
  onClick?: () => void;
  /** 커스텀 CSS 클래스 */
  className?: string;
  /** 버튼의 배경색을 지정 */
  backgroundColor?: string;
  /** 버튼 비활성화 여부 */
  disabled?: boolean;
  /** Storybook 11용 ariaLabel */
  ariaLabel?: string | false;
}

/** Button UI 컴포넌트 */
export const Button = ({
  label,
  level = 'primary',
  size = 'medium',
  id,
  className,
  backgroundColor,
  disabled = false,
  ariaLabel = false,
  ...props
}: ButtonProps) => {
  const classes = ['button', size, level];
  if (className) classes.push(className);

  return (
    <button
      type="button"
      id={id}
      {...(classes.length ? { className: classes.join(' ') } : {})}
      {...(backgroundColor ? { style: { backgroundColor } } : {})}
      aria-label={ariaLabel === false ? undefined : ariaLabel}
      {...props}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
