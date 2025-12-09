import React from 'react';

/** Pagination 컴포넌트 props */
export interface PaginationProps {
  /** 총 목록 수 */
  total: number;
  /** 페이지당 목록 수 */
  perPage: number;
  /** 현재 페이지 */
  currentPage: number;
  /** 페이지 변경 시 호출되는 콜백 함수 */
  onPageChange: (page: number) => void;
  /** 표시할 페이지 번호 개수 (기본: 5) */
  showCount?: number;
}

/** Pagination UI 컴포넌트 */
export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  showCount = 5,
}) => {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= showCount + 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // 첫 페이지
    pages.push(1);

    // 왼쪽 "…"
    if (currentPage > Math.floor(showCount / 2) + 1) {
      pages.push('...');
    }

    // 중간부
    const half = Math.floor(showCount / 2);
    const start = Math.max(2, currentPage - half);
    const end = Math.min(totalPages - 1, currentPage + half);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // 오른쪽 "…"
    if (currentPage < totalPages - Math.floor(showCount / 2)) {
      pages.push('...');
    }

    // 마지막 페이지
    pages.push(totalPages);

    return pages;
  };

  const isPrevDisabled = (currentPage || 1) === 1;
  const isNextDisabled = (currentPage || 1) === totalPages;
  const pages = getPageNumbers();

  return (
    <nav className="krds-pagination" aria-label="페이지 이동">
      <button
        type="button"
        className="page-navi prev"
        onClick={() => handlePageChange((currentPage || 1) - 1)}
        disabled={isPrevDisabled}
        aria-label="이전 페이지"
      ></button>
      <ul className="page-links">
        {pages.map((page, idx) =>
          page === '...' ? (
            <li key={`ellipsis-${idx}`} className="link-dot">
              <span aria-hidden="true">…</span>
            </li>
          ) : (
            <li key={page}>
              <button
                type="button"
                onClick={() => handlePageChange(page as number)}
                className={`page-link ${page === currentPage ? 'active' : ''}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page === currentPage ? (
                  <span className="sr-only">현재페이지</span>
                ) : null}
                {page}
              </button>
            </li>
          )
        )}
      </ul>
      <button
        type="button"
        className="page-navi next"
        onClick={() => handlePageChange((currentPage || 1) + 1)}
        disabled={isNextDisabled}
        aria-label="다음 페이지"
      ></button>
    </nav>
  );
};
