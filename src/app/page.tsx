'use client'

import DefaultLayout from '@/components/layout/DefaultLayout'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useViewport } from '@/contexts/viewPortContext'

export default function HomePage() {
  usePageTitle('홈페이지 – 브랜드명')

  const { viewport } = useViewport()

  const viewportLabel =
    viewport === 'mobile'
      ? '모바일'
      : viewport === 'tablet'
      ? '태블릿'
      : '데스크탑'
  return (
    <DefaultLayout>
      <div className="home">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-container">
            <div className="hero-content">
              <div className="hero-badge">{viewportLabel} 반응형 웹 디자인</div>
              <h1 className="hero-title">
                심플하고
                <br />
                <span className="hero-title-accent">아름다운</span>
                <br />
                홈페이지
              </h1>
              <p className="hero-description">
                최신 디자인 트렌드를 반영한 반응형 웹사이트입니다.
                <br />
                모든 디바이스에서 완벽한 경험을 제공합니다.
              </p>
              <div className="hero-actions">
                <button type="button" className="btn primary large">
                  시작하기
                </button>
                <button type="button" className="btn secondary large">
                  자세히 보기
                </button>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">반응형</div>
                </div>
                <div className="stat">
                  <div className="stat-number">10px</div>
                  <div className="stat-label">루트 사이즈</div>
                </div>
                <div className="stat">
                  <div className="stat-number">모던</div>
                  <div className="stat-label">디자인</div>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-card">
                <div className="hero-card-header">
                  <div className="hero-card-avatar"></div>
                  <div className="hero-card-info">
                    <div className="hero-card-name">Modern Design</div>
                    <div className="hero-card-time">방금 전</div>
                  </div>
                </div>
                <div className="hero-card-content">
                  <p>
                    반응형 디자인으로 모든 디바이스에서 완벽하게 표시됩니다.
                  </p>
                  <div className="hero-card-devices">
                    <div className="device device-mobile"></div>
                    <div className="device device-tablet"></div>
                    <div className="device device-desktop"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-bg-pattern"></div>
        </section>

        {/* Features Section */}
        <section className="features">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">주요 특징</h2>
              <p className="section-subtitle">
                최신 웹 기술로 구현된 아름다운 디자인
              </p>
            </div>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🎨</div>
                <h3 className="feature-title">심플한 디자인</h3>
                <p className="feature-description">
                  불필요한 요소를 제거하고 핵심에 집중한 깔끔한 디자인입니다.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3 className="feature-title">완벽한 반응형</h3>
                <p className="feature-description">
                  모바일, 태블릿, 데스크탑 모든 화면에서 최적화된 경험을
                  제공합니다.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3 className="feature-title">빠른 성능</h3>
                <p className="feature-description">
                  최적화된 코드로 빠른 로딩 속도와 부드러운 사용자 경험을
                  보장합니다.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔧</div>
                <h3 className="feature-title">쉬운 유지보수</h3>
                <p className="feature-description">
                  체계적인 코드 구조로 유지보수와 확장이 용이합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">2024</div>
                <div className="stat-label">최신 트렌드</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">반응형</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">10px</div>
                <div className="stat-label">루트 사이즈</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">∞</div>
                <div className="stat-label">확장성</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta">
          <div className="container">
            <div className="cta-content">
              <h2 className="cta-title">지금 바로 시작하세요</h2>
              <p className="cta-description">
                심플하고 아름다운 디자인으로 프로젝트의 완성도를 높여보세요.
              </p>
              <div className="cta-actions">
                <button type="button" className="btn primary large">
                  프로젝트 시작하기
                </button>
                <button type="button" className="btn ghost large">
                  문의하기
                </button>
              </div>
            </div>
            <div className="cta-visual">
              <div className="cta-card">
                <div className="cta-card-content">
                  <h3>Ready to Launch</h3>
                  <p>모든 준비가 완료되었습니다.</p>
                  <div className="cta-progress">
                    <div className="progress-bar">
                      <div className="progress-fill"></div>
                    </div>
                    <span className="progress-text">100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DefaultLayout>
  )
}
