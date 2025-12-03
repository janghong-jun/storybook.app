import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Modern Design</h3>
            <p>심플하고 아름다운 웹 디자인</p>
          </div>
          <div className="footer-links">
            <div className="footer-section">
              <h4>서비스</h4>
              <ul>
                <li>
                  <Link href="#">디자인</Link>
                </li>
                <li>
                  <Link href="#">개발</Link>
                </li>
                <li>
                  <Link href="#">컨설팅</Link>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>회사</h4>
              <ul>
                <li>
                  <Link href="#">소개</Link>
                </li>
                <li>
                  <Link href="#">블로그</Link>
                </li>
                <li>
                  <Link href="#">연락처</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Modern Design. All rights reserved.</p>
          <div className="footer-social">
            <a href="#" aria-label="Twitter" target="_blank">
              𝕏
            </a>
            <a href="#" aria-label="GitHub" target="_blank">
              🐙
            </a>
            <a href="#" aria-label="LinkedIn" target="_blank">
              💼
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
