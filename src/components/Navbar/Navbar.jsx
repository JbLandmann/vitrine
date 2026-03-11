import { useState, useEffect, useCallback, useRef } from 'react'
import { FiUser, FiEdit, FiBriefcase, FiMail } from 'react-icons/fi'
import NavItem from './NavItem'
import './Navbar.css'

const Navbar = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [navExpanded, setNavExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const lastScrollY = useRef(0)
  const shrinkTimeoutRef = useRef(null)
  const isHoveredRef = useRef(false)

  const clearShrinkTimeout = useCallback(() => {
    if (shrinkTimeoutRef.current) {
      clearTimeout(shrinkTimeoutRef.current)
      shrinkTimeoutRef.current = null
    }
  }, [])

  const scheduleShrink = useCallback(() => {
    clearShrinkTimeout()
    shrinkTimeoutRef.current = setTimeout(() => {
      if (!isHoveredRef.current) setNavExpanded(false)
    }, 500)
  }, [clearShrinkTimeout])

  const shrinkNow = useCallback(() => {
    clearShrinkTimeout()
    setNavExpanded(false)
  }, [clearShrinkTimeout])

  const navItems = [
    {
      id: 'presentation',
      label: 'Service',
      icon: <FiUser size={24} />
    },
    {
      id: 'services',
      label: 'Méthodes',
      icon: <FiEdit size={24} />
    },
    {
      id: 'projets',
      label: 'Projets',
      icon: <FiBriefcase size={24} />
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: <FiMail size={24} />
    }
  ]

  // Scroll detection: shrink after half viewport + show/hide on direction
  useEffect(() => {
    const threshold = 15
    const onScroll = () => {
      const currentY = window.scrollY
      setIsScrolled(currentY > window.innerHeight * 0.08)
      const delta = currentY - lastScrollY.current
      if (delta > threshold) {
        shrinkNow()
      } else if (delta < -threshold) {
        setNavExpanded(true)
        scheduleShrink()
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearShrinkTimeout()
    }
  }, [shrinkNow, scheduleShrink, clearShrinkTimeout])

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

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true
    clearShrinkTimeout()
    setNavExpanded(true)
  }, [clearShrinkTimeout])

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false
    scheduleShrink()
  }, [scheduleShrink])

  const handleNavigate = useCallback((id) => {
    onNavigate(id)
    shrinkNow()
    if (isMobile) setIsOpen(false)
  }, [onNavigate, isMobile, shrinkNow])

  // Build className for <nav>
  const navClass = [
    'main-nav',
    isScrolled && !isMobile ? 'scrolled' : '',
    navExpanded && isScrolled && !isMobile ? 'nav-revealed' : '',
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

      <nav className={navClass} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {navItems.map(item => (
          <NavItem
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            onClick={() => handleNavigate(item.id)}
          />
        ))}
      </nav>
    </>
  )
}

export default Navbar
