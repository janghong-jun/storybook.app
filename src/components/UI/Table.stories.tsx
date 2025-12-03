import type { Meta, StoryObj } from '@storybook/react'
import { Table, CellData } from '@/components/UI/Table'

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      table: { type: { summary: 'string ' } },
    },
    className: {},
    headData: {
      control: { type: 'object' },
    },
    bodyData: {
      control: { type: 'object' },
    },
    colWidths: {
      control: { type: 'object' },
    },
  },
}

export default meta
type Story = StoryObj<typeof Table>

const horizontalBodyData: CellData[][] = [
  [
    { content: '김철수' },
    { content: '25' },
    { content: '개발자' },
    { content: '서울' },
  ],
  [
    { content: '이영희' },
    { content: '30' },
    { content: '디자이너' },
    { content: '부산' },
  ],
  [
    { content: '박민수' },
    { content: '28' },
    { content: '마케터' },
    { content: '대구' },
  ],
]

// 기본 가로형 헤더 데이터
const horizontalHeadData: CellData[][] = [
  [
    { content: '이름', isHeader: true },
    { content: '나이', isHeader: true },
    { content: '직업', isHeader: true },
    { content: '지역', isHeader: true },
  ],
]

const verticalData: CellData[][] = [
  [{ content: '이름' }, { content: '김철수' }],
  [{ content: '나이' }, { content: '25세' }],
  [{ content: '직업' }, { content: '프론트엔드 개발자' }],
  [{ content: '경력' }, { content: '3년' }],
  [{ content: '기술스택' }, { content: 'React, TypeScript, Next.js' }],
]

export const Horizontal: Story = {
  args: {
    headData: horizontalHeadData,
    bodyData: horizontalBodyData,
    colWidths: ['15%', '30%', '25%', '30%'],
  },
}

export const Vertical: Story = {
  args: {
    type: 'vertical',
    bodyData: verticalData,
    colWidths: [],
  },
}

export const LargeData: Story = {
  args: {
    headData: [
      [
        { content: 'ID', isHeader: true },
        { content: '이름', isHeader: true },
        { content: '이메일', isHeader: true },
        { content: '부서', isHeader: true },
        { content: '직급', isHeader: true },
        { content: '입사일', isHeader: true },
      ],
    ],
    bodyData: Array.from({ length: 10 }, (_, i) => [
      { content: `EMP${String(i + 1).padStart(3, '0')}` },
      { content: `직원 ${i + 1}` },
      { content: `employee${i + 1}@company.com` },
      { content: ['개발팀', '디자인팀', '마케팅팀', '영업팀'][i % 4] },
      { content: ['사원', '대리', '과장', '차장', '부장'][i % 5] },
      {
        content: `202${Math.floor(i / 5)}-01-${String((i % 30) + 1).padStart(
          2,
          '0'
        )}`,
      },
    ]),
    colWidths: [],
  },
}

export const TextAlignment: Story = {
  args: {
    headData: [
      [
        { content: '왼쪽 정렬', isHeader: true },
        { content: '가운데 정렬', isHeader: true },
        { content: '오른쪽 정렬', isHeader: true },
        { content: '기본(가운데)', isHeader: true },
      ],
    ],
    bodyData: [
      [
        {
          content: '왼쪽으로 정렬된 텍스트입니다',
          className: 'align-left',
        },
        {
          content: '가운데 정렬 텍스트',
          className: 'align-center',
        },
        { content: '₩1,200,000', className: 'align-right' },
        { content: '기본 가운데 정렬' },
      ],
      [
        {
          content: '긴 텍스트는 왼쪽 정렬이 보기 좋습니다',
          className: 'align-left',
        },
        { content: '중앙', className: 'align-center' },
        { content: '999,999원', className: 'align-right' },
        { content: 'Default' },
      ],
      [
        { content: '짧은 텍스트', className: 'align-left' },
        { content: '가운데', className: 'align-center' },
        { content: '우측 정렬', className: 'align-right' },
        { content: '중앙' },
      ],
    ],
    colWidths: [],
  },
}

// 셀 병합이 포함된 테이블
export const TableWithCellMerging: Story = {
  args: {
    type: 'horizontal',
    headData: [
      [
        { content: '카테고리', isHeader: true },
        { content: '제품명', isHeader: true },
        { content: '가격', isHeader: true },
        { content: '수량', isHeader: true },
      ],
    ],
    colWidths: ['15%', '30%', '25%', '30%'],
    bodyData: [
      [
        { content: '스마트폰', isHeader: true, rowSpan: 2 },
        { content: '갤럭시 S24' },
        { content: '₩1,200,000' },
        { content: '50개' },
      ],
      [
        { content: 'iPhone 15' },
        { content: '₩1,500,000' },
        { content: '30개' },
      ],
      [
        { content: '노트북', isHeader: true, rowSpan: 2 },
        { content: 'MacBook Air' },
        { content: '₩1,800,000' },
        { content: '20개' },
      ],
      [
        { content: 'Surface Pro' },
        { content: '₩2,000,000' },
        { content: '15개' },
      ],
      [
        { content: '합계', isHeader: true, colSpan: 2 },
        { content: '₩5,300,000', isHeader: true },
        { content: '115개', isHeader: true },
      ],
    ],
  },
}

export const MultiRowHeader: Story = {
  args: {
    headData: [
      [
        { content: '시간', isHeader: true, rowSpan: 2 },
        { content: '월요일', isHeader: true, colSpan: 2 },
        { content: '화요일', isHeader: true, colSpan: 2 },
        { content: '수요일', isHeader: true, colSpan: 2 },
      ],
      [
        { content: '이론', isHeader: true },
        { content: '실습', isHeader: true },
        { content: '이론', isHeader: true },
        { content: '실습', isHeader: true },
        { content: '이론', isHeader: true },
        { content: '실습', isHeader: true },
      ],
    ],
    bodyData: [
      [
        { content: '09:00-10:30', isHeader: true },
        { content: '프론트엔드 기초' },
        { content: 'HTML/CSS 실습' },
        { content: '자바스크립트' },
        { content: 'DOM 조작 실습' },
        { content: 'React 기초' },
        { content: '컴포넌트 실습' },
      ],
      [
        { content: '10:45-12:15', isHeader: true },
        { content: '반응형 디자인', colSpan: 2 },
        { content: 'Node.js' },
        { content: 'API 개발 실습' },
        { content: '데이터베이스', colSpan: 2 },
      ],
      [
        { content: '13:00-14:30', isHeader: true },
        { content: 'TypeScript' },
        { content: '타입 정의 실습' },
        { content: 'Git/GitHub', colSpan: 2 },
        { content: '프로젝트 기획', colSpan: 2 },
      ],
    ],
    colWidths: [],
  },
}
