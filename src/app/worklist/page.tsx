import Link from 'next/link'
import styles from './worklist.module.scss'
import worklist from '@/data/worklist'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '퍼블리싱 작업 리스트',
  description: '전체 화면의 퍼블리싱 일정과 상태를 확인할 수 있습니다.',
}

type WorkItem = {
  id: string
  name: string
  url: string
  type: string
  worker: string
  start: string
  due: string
  end?: string
  status: 'waiting' | 'progress' | 'done'
  note?: { date: string; content: string }[]
}

export default function WorklistPage() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>퍼블리싱 작업 리스트</h2>
      <div className={styles.tablewrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>화면ID</th>
              <th>화면명</th>
              <th>URL</th>
              <th>화면유형</th>
              <th>작업자</th>
              <th>시작일</th>
              <th>종료일</th>
              <th>완료일</th>
              <th>상태</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            {(worklist as unknown as WorkItem[]).map((item, index) => (
              <tr
                key={index}
                className={item.status === 'done' ? styles.end : undefined}
              >
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <Link
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.link}
                  >
                    {item.url}
                  </Link>
                </td>
                <td className={styles.center}>{item.type}</td>
                <td className={styles.center}>{item.worker}</td>
                <td className={styles.center}>{item.start}</td>
                <td className={styles.center}>{item.due}</td>
                <td className={`${styles.center} ${styles.important}`}>
                  {item.end || 'YYYY-MM-DD'}
                </td>
                <td className={styles.center}>
                  <span
                    className={`${styles.status} ${
                      styles['status_' + item.status]
                    }`}
                  >
                    {item.status === 'progress'
                      ? '진행중'
                      : item.status === 'waiting'
                      ? '대기'
                      : '완료'}
                  </span>
                </td>
                <td>
                  {Array.isArray(item.note) && item.note.length > 0 ? (
                    <ul className={styles.noteList}>
                      {item.note.map((n, idx) =>
                        n.content ? (
                          <li key={idx}>
                            <strong>{n.date}</strong>
                            <p>{n.content}</p>
                          </li>
                        ) : null
                      )}
                    </ul>
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
