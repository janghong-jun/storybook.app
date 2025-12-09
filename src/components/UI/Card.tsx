import Link from 'next/link';
import Image from 'next/image';

export interface CardProps {
  /** 카드 제목 */
  title: string;
  /** 카드 설명 */
  description: string;
  /** 이미지 URL */
  imageUrl?: string;
  /** 이미지 alt 텍스트 */
  altText?: string;
  /** 클릭 시 이동 URL */
  linkUrl: string;
  /** a 태그 target 속성 (_blank, _self 등) */
  target?: '_self' | '_blank' | '_parent' | '_top';
}

/** Card UI 컴포넌트 */
export const Card = ({
  title,
  description,
  imageUrl,
  altText,
  linkUrl,
  target,
}: CardProps) => {
  const content = (
    <>
      {imageUrl && (
        <div className="card__image-wrapper">
          <Image
            src={imageUrl}
            alt={altText || title}
            fill
            className="card__image"
            loading="eager"
            unoptimized
          />
        </div>
      )}
      <div className="card__body">
        <h3 className="card__title">{title}</h3>
        <p className="card__description">{description}</p>
      </div>
    </>
  );

  const isExternal = !linkUrl.startsWith('/');

  if (isExternal) {
    const url = linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`;
    return (
      <a
        href={url}
        className="card"
        aria-label={title}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={linkUrl} className="card" aria-label={title}>
      {content}
    </Link>
  );
};
