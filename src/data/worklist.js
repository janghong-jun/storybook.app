/**
 * 기타 데이터
 * note: [{ date: '2025-06-18', content: '내용' }],
 */

const worklist = [
  {
    id: 'PG001',
    name: '메인페이지',
    url: '/',
    type: '페이지',
    worker: '홍길동',
    start: '2025-06-17',
    due: '2025-06-18',
    end: '',
    status: 'progress',
    note: [],
  },
  {
    id: 'PG002',
    name: '로그인',
    url: '/test',
    type: '페이지',
    worker: '홍길동',
    start: '2025-06-18',
    due: '2025-06-18',
    end: '',
    status: 'waiting',
    note: [],
  },
  {
    id: 'PG003',
    name: '회원가입',
    url: '/NoLayout',
    type: '페이지',
    worker: '김미나',
    start: '2025-06-19',
    due: '2025-06-20',
    end: '',
    status: 'done',
    note: [{ date: '2025-06-18', content: '로그인 페이지 퍼블리싱' }],
  },
  {
    id: 'PG004',
    name: '회원가입',
    url: '/404',
    type: '페이지',
    worker: '김미나',
    start: '2025-06-19',
    due: '2025-06-20',
    end: '',
    status: 'done',
    note: [
      { date: '2025-06-18', content: '로그인 페이지 퍼블리싱' },
      { date: '2025-06-18', content: '간단한 유효성 검사 추가' },
    ],
  },
]

export default worklist
