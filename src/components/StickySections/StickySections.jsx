import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Presentation from '../Presentation/Presentation'
import Projets from '../Projets/Projets'
import Contact from '../Contact/Contact'
import './StickySections.css'

gsap.registerPlugin(ScrollTrigger)

const StickySections = ({ onSectionChange }) => {
  useEffect(() => {
    // Configuration de lagSmoothing pour des animations fluides
    gsap.ticker.lagSmoothing(1000, 16)

    // Attendre que le DOM soit complètement chargé
    const timer = setTimeout(() => {
      const sections = gsap.utils.toArray('.section')

      console.log('Sections trouvées:', sections.length) // Debug

      // Détection mobile
      const isMobile = window.innerWidth <= 768

      // Animation GSAP ScrollTrigger pour chaque section
      sections.forEach((section, i) => {
        console.log(`Section ${i}:`, section.id) // Debug
        
        // Skip si la section a sa propre animation
        const hasScrollAnimation = section.getAttribute('data-scroll-animation') === 'true'
        if (hasScrollAnimation) {
          console.log(`Section ${section.id} gère sa propre animation`) // Debug
          return
        }
        
        if (i < sections.length - 1) {
          const sectionContent = section.querySelector('.section-content')

          if (sectionContent) {
            console.log(`Animation créée pour section ${i}`) // Debug
            
            // Sur mobile, utiliser 'bottom 15%' pour déclencher quand le bas de la section arrive à 15% du bas de l'écran
            const startTrigger = isMobile ? 'top 45%' : 'top 55%'
            const endTrigger = isMobile ? 'top -60%' : 'top -15%'
            
            gsap.fromTo(sectionContent, {
              y: '0%',
              z: 0,
              rotationX: 0,
            }, {
              y: '-30%',
              z: -250,
              rotationX: 45,
              scrollTrigger: {
                trigger: sections[i + 1],
                start: startTrigger,
                end: endTrigger,
                scrub: 1,
                pin: section,
                pinSpacing: false,
                markers: true,
                id: `section-${i}`,
              }
            })

            const opacityStartTrigger = isMobile ? 'top 85%' : 'top 75%'
            const opacityEndTrigger = isMobile ? 'top -35%' : 'top -25%'

            gsap.to(sectionContent, {
              '--after-opacity': 1,
              scrollTrigger: {
                trigger: sections[i + 1],
                start: opacityStartTrigger,
                end: opacityEndTrigger,
                scrub: true,
              }
            })
          } else {
            console.log(`Section content non trouvé pour section ${i}`) // Debug
          }
        }
      })

      // Rafraîchir ScrollTrigger après l'initialisation
      ScrollTrigger.refresh()

      // Gestion de l'active section
      const handleScroll = () => {
        let current = ''

        sections.forEach(section => {
          const sectionTop = section.offsetTop
          if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id')
          }
        })

        if (current && onSectionChange) {
          onSectionChange(current)
        }
      }

      window.addEventListener('scroll', handleScroll)
      handleScroll()
    }, 100)

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [onSectionChange])

  return (
    <div className="sticky-sections">
      <Presentation />
      <Projets enableScrollAnimation={true} />
      <Contact />
    </div>
  )
}

export default StickySections
