import { useRef, useCallback, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import StickySections from './components/StickySections/StickySections'
import './App.css'

function App() {
  const gsapRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('gsap/ScrollToPlugin'),
    ]).then(([gsapMod, stMod, spMod]) => {
      if (cancelled) return
      const gsap = gsapMod.gsap
      gsap.registerPlugin(stMod.ScrollTrigger, spMod.ScrollToPlugin)
      gsapRef.current = gsap
    })
    return () => { cancelled = true }
  }, [])

  const scrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId)
    if (!section) return
    const gsap = gsapRef.current
    if (gsap) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: section, offsetY: 0 },
        ease: 'power2.inOut',
      })
    } else {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <>
      <Navbar onNavigate={scrollToSection} />
      <StickySections scrollToSection={scrollToSection} />
    </>
  )
}

export default App
