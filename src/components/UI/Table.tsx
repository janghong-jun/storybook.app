import React from 'react';

export interface CellData {
  /** 셀에 표시될 내용 (텍스트, JSX 등) */
  content: React.ReactNode;
  /** 행 병합 수 (선택사항) */
  rowSpan?: number;
  /** 열 병합 수 (선택사항) */
  colSpan?: number;
  /** 커스텀 CSS 클래스 */
  className?: string;
  /** 해당 셀을 <th> 태그로 렌더링할지 여부 (선택사항) */
  isHeader?: boolean;
}

export interface TableProps extends React.ComponentPropsWithoutRef<'table'> {
  /** 테이블 헤더 데이터 (CellData 2차원 배열, 선택사항) - 다중 행 헤더 지원 */
  headData?: CellData[][];
  /** 테이블 본문 데이터 - 필수 항목 */
  bodyData: CellData[][];
  /** 테이블 레이아웃 타입 */
  type?: 'horizontal' | 'vertical';
  /** 커스텀 CSS 클래스 */
  className?: string;
  /** 컬럼 너비 배열 - colgroup 생성에 사용 */
  colWidths: string[];
}

/** Table UI 컴포넌트 */
export const Table: React.FC<TableProps> = ({
  headData,
  bodyData,
  type = 'horizontal',
  className = '',
  colWidths = [],
  ...rest
}) => {
  const tableClass = `table table--${type}`;

  const renderColGroup = () => {
    if (!colWidths || colWidths.length === 0) return null;

    return (
      <colgroup>
        {colWidths.map((width, index) => (
          <col
            key={index}
            style={{ width: typeof width === 'number' ? `${width}px` : width }}
          />
        ))}
      </colgroup>
    );
  };

  const renderCell = (cell: CellData, cellIndex: number, rowIndex: number) => {
    const { content, rowSpan, colSpan, className: cellClass, isHeader } = cell;

    let CellTag: 'th' | 'td' = 'td';
    let scope: string | undefined;

    if (type === 'vertical' && cellIndex === 0) {
      CellTag = 'th';
      scope = 'row';
    } else if (rowIndex === 0 && isHeader) {
      CellTag = 'th';
      scope = 'col';
    } else if (isHeader) {
      CellTag = 'th';
      scope = type === 'vertical' ? 'row' : 'col';
    }

    return (
      <CellTag
        key={cellIndex}
        rowSpan={rowSpan}
        colSpan={colSpan}
        className={cellClass}
        scope={scope}
      >
        {content}
      </CellTag>
    );
  };

  return (
    <div className={`${tableClass} ${className}`.trim()} {...rest}>
      <table>
        {renderColGroup()}

        {headData && headData.length > 0 && (
          <thead>
            {headData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) =>
                  renderCell(cell, cellIndex, rowIndex)
                )}
              </tr>
            ))}
          </thead>
        )}

        <tbody>
          {bodyData.map((row: CellData[], rowIndex: number) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) =>
                renderCell(cell, cellIndex, rowIndex)
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
