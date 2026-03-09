import { useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import Navbar from './components/Navbar/Navbar'
import StickySections from './components/StickySections/StickySections'
import './App.css'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

function App() {
  const [activeSection, setActiveSection] = useState('presentation')

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      // Utiliser gsap.to avec ScrollToPlugin pour naviguer correctement
      // vers les sections pinnées (scrollIntoView natif ne fonctionne pas avec le pinning)
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: section, offsetY: 0 },
        ease: 'power2.inOut',
      })
    }
  }

  return (
    <>
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />
      <StickySections onSectionChange={setActiveSection} scrollToSection={scrollToSection} />
    </>
  )
}

export default App
