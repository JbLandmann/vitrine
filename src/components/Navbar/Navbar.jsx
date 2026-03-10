import { useState, useEffect, useCallback } from 'react'
import { FiUser, FiEdit, FiBriefcase, FiMail } from 'react-icons/fi'
import NavItem from './NavItem'
import './Navbar.css'

const Navbar = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    {
      id: 'presentation',
      label: 'Présentation',
      icon: <FiUser size={24} />
    },
    {
      id: 'services',
      label: 'Services',
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
            onClick={() => handleNavigate(item.id)}
          />
        ))}
      </nav>
    </>
  )
}

export default Navbar
