import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import StickySections from './components/StickySections/StickySections'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('presentation')

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    gsap.ScrollTrigger.refresh()
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <>
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />
      <StickySections onSectionChange={setActiveSection} />
    </>
  )
}

export default App
