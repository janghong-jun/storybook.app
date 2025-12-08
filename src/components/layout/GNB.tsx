'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface MenuItem {
  label: string
  href?: string
  children?: MenuItem[]
}

const menuData: MenuItem[] = [
  { label: 'Home', href: 'test' },
  {
    label: 'About',
    children: [
      { label: 'Our Team', href: '2' },
      { label: 'Company', href: '3' },
    ],
  },
  {
    label: 'Services',
    children: [
      { label: 'Web Development', href: '4' },
      { label: 'App Development', href: '5' },
      { label: 'UX Design', href: '6' },
    ],
  },
  { label: 'Contact', href: 'layout' },
]

interface GNBProps {
  containerRef?: React.RefObject<HTMLElement | null>
}

const GNB: React.FC<GNBProps> = ({ containerRef }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    let lastIsMobile: boolean | null = null

    const handleResize = () => {
      const mobile = window.innerWidth <= 768
      if (mobile !== lastIsMobile) {
        lastIsMobile = mobile
        setIsMobile(mobile)
        setMobileOpen(false)
        setOpenIndex(null)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const closeHandler = () => {
      setMobileOpen(false)
      setOpenIndex(null)
    }
    window.addEventListener('closeMobileMenu', closeHandler)
    return () => window.removeEventListener('closeMobileMenu', closeHandler)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return

    const container = containerRef?.current
    if (!container) return

    const focusableEls = Array.from(
      container.querySelectorAll<HTMLElement>(`
        a[href]:not([tabindex="-1"]),
        button:not([disabled]):not([tabindex="-1"])
      `)
    ).filter((el) => !el.hasAttribute('hidden'))

    if (focusableEls.length === 0) return

    const first = focusableEls[0]
    const last = focusableEls[focusableEls.length - 1]

    const timer = setTimeout(() => first.focus(), 0)

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const active = document.activeElement as HTMLElement
      if (!active) return

      if (e.shiftKey) {
        if (active === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (active === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleTab)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      clearTimeout(timer)
      document.removeEventListener('keydown', handleTab)
      document.body.style.overflow = originalOverflow
    }
  }, [mobileOpen, containerRef])

  const renderMenu = (items: MenuItem[], level = 0) => (
    <ul
      className={`menu-list level-${level}`}
      role={level === 0 ? 'menubar' : 'menu'}
    >
      {items.map((item, idx) => {
        const hasChildren = !!item.children
        const isOpen = openIndex === idx

        return (
          <li
            key={idx}
            className={`menu-item ${hasChildren ? 'has-children' : ''} ${
              isOpen ? 'open' : ''
            }`}
          >
            {hasChildren ? (
              <button
                type="button"
                className="menu-toggle"
                aria-haspopup="true"
                aria-expanded={isOpen}
                onClick={() => {
                  setOpenIndex((prev) => (prev === idx ? null : idx))
                }}
              >
                {item.label}
              </button>
            ) : (
              <Link
                href={item.href ?? '#'}
                onClick={() => {
                  setMobileOpen(false)
                  document.body.scrollTo({ top: 0 })
                }}
              >
                {item.label}
              </Link>
            )}
            {hasChildren && (
              <ul className="sub-menu" role="menu" hidden={!isOpen}>
                {item.children!.map((child, cidx) => (
                  <li key={cidx} role="none">
                    <Link
                      href={child.href ?? '#'}
                      onClick={() => {
                        setMobileOpen(false)
                        document.body.scrollTo({ top: 0 })
                      }}
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        )
      })}
    </ul>
  )

  return (
    <nav className="gnb">
      <div className="gnb-inner">
        {isMobile && (
          <button
            className="mobile-menu-btn"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen(!mobileOpen)
              setOpenIndex(null)
            }}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        )}

        {(mobileOpen || !isMobile) && (
          <div className="menu-container">{renderMenu(menuData)}</div>
        )}

        {(!isMobile || !mobileOpen) && (
          <div className="gnb-actions">
            <button className="gnb-btn gnb-login">로그인</button>
            <button className="gnb-btn gnb-signup">회원가입</button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default GNB
