import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import Presentation from '../Presentation/Presentation'
import Projets from '../Projets/Projets'
import Contact from '../Contact/Contact'
import './StickySections.css'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const StickySections = ({ onSectionChange }) => {
  const wrapperRef = useRef(null)
  const contentRef = useRef(null)
  const smootherRef = useRef(null)

  useEffect(() => {
    gsap.ticker.lagSmoothing(1000, 16)

    // Créer le ScrollSmoother pour un scroll global fluide
    smootherRef.current = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1.2,
      effects: false,
    })

    const timer = setTimeout(() => {
      const sections = gsap.utils.toArray('.section')
      const isMobile = window.innerWidth <= 768

      // =============================================
      // FOLD-AWAY : pour chaque section (sauf la dernière)
      // =============================================
      sections.forEach((section, i) => {
        if (i >= sections.length - 1) return

        const sectionContent = section.querySelector('.section-content')
        if (!sectionContent) return

        const startTrigger = isMobile ? 'top 45%' : 'top 55%'
        const endTrigger = isMobile ? 'top -60%' : 'top -15%'

        // Animation fold-away 3D
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
            id: `section-${i}`,
          }
        })

        // Overlay opacity
        const opacityStartTrigger = isMobile ? 'top 85%' : 'top 75%'
        const opacityEndTrigger = isMobile ? 'top -35%' : 'top -25%'

        gsap.to(sectionContent, {
          '--after-opacity': 1,
          scrollTrigger: {
            trigger: sections[i + 1],
            start: opacityStartTrigger,
            end: opacityEndTrigger,
            scrub: true,
            id: `section-opacity-${i}`,
          }
        })
      })

      // =============================================
      // PROJETS : animation interne (titre + cartes)
      // Pas de pin — les cartes sont statiques dans leur section
      // Chaque carte apparaît quand elle entre dans le viewport (stagger 0.4s)
      // Quand la section quitte l'écran, les cartes deviennent semi-transparentes
      // =============================================
      const projetsSection = document.getElementById('projets')
      if (projetsSection) {
        const title = projetsSection.querySelector('h2')
        const cards = projetsSection.querySelectorAll('.project-card')

        // Titre : apparaît quand il entre dans le viewport
        if (title) {
          gsap.set(title, { opacity: 0, y: -30 })
          gsap.to(title, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: title,
              start: 'top 85%',
              toggleActions: 'play none none none',
              id: 'projets-title',
            }
          })
        }

        // Cartes : chacune apparaît individuellement avec un délai de 0.4s entre elles
        // N'anime que l'opacity pour ne pas interférer avec le positionnement CSS du carousel
        if (cards.length > 0) {
          gsap.set(cards, {
            opacity: 0,
          })

          cards.forEach((card, index) => {
            gsap.to(card, {
              opacity: 1,
              duration: 0.6,
              delay: index * 0.4,
              ease: 'power2.out',
              onComplete: () => gsap.set(card, { clearProps: 'opacity,transform' }),
              scrollTrigger: {
                trigger: projetsSection,
                start: 'top 90%',
                toggleActions: 'play none none none',
                id: `projets-card-${index}`,
              }
            })
          })

        }
      }

      // =============================================
      // Rafraîchir ScrollTrigger
      // =============================================
      ScrollTrigger.refresh()

      // =============================================
      // Active section tracking
      // =============================================
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
      if (smootherRef.current) {
        smootherRef.current.kill()
        smootherRef.current = null
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [onSectionChange])

  return (
    <div ref={wrapperRef} className="sticky-sections-wrapper">
      <div ref={contentRef} className="sticky-sections">
        <Presentation />
        <Projets />
        <Contact />
      </div>
    </div>
  )
}

export default StickySections
