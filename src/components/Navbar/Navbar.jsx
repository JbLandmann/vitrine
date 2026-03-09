import { useState, useEffect, useCallback } from 'react'
import NavItem from './NavItem'
import './Navbar.css'

const Navbar = ({ activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    {
      id: 'presentation',
      label: 'Présentation',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    },
    {
      id: 'projets',
      label: 'Projets',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      )
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      )
    }
  ]

  // Scroll detection: shrink after scrolling half viewport height
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight / 2)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobile detection
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const onChange = (e) => {
      setIsMobile(e.matches)
      if (!e.matches) setIsOpen(false)
    }
    setIsMobile(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const handleNavigate = useCallback((id) => {
    onNavigate(id)
    if (isMobile) setIsOpen(false)
  }, [onNavigate, isMobile])

  // Build className for <nav>
  const navClass = [
    'main-nav',
    isScrolled && !isMobile ? 'scrolled' : '',
    isMobile ? 'mobile' : '',
    isMobile && isOpen ? 'mobile-open' : '',
  ].filter(Boolean).join(' ')

  return (
    <>
      {/* Mobile toggle button — always visible on mobile */}
      {isMobile && (
        <button
          className={`nav-toggle${isOpen ? ' open' : ''}`}
          onClick={() => setIsOpen(prev => !prev)}
          aria-label="Menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
      )}

      <nav className={navClass}>
        {navItems.map(item => (
          <NavItem
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            isActive={activeSection === item.id}
            onClick={() => handleNavigate(item.id)}
          />
        ))}
      </nav>
    </>
  )
}

export default Navbar
