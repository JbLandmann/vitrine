import { useEffect, useRef } from 'react'
import Presentation from '../Presentation/Presentation'
import Services from '../Services/Services'
import Competences from '../Competences/Competences'
import Projets from '../Projets/Projets'
import Contact from '../Contact/Contact'
import './StickySections.css'

const StickySections = ({ scrollToSection }) => {
  const wrapperRef = useRef(null)
  const contentRef = useRef(null)
  const smootherRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('gsap/ScrollSmoother'),
    ]).then(([gsapMod, stMod, ssMod]) => {
      if (cancelled) return
      const gsap = gsapMod.gsap
      const ScrollTrigger = stMod.ScrollTrigger
      const ScrollSmoother = ssMod.ScrollSmoother
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

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
      // BACKGROUND : défilement horizontal prononcé
      // =============================================
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          x: '-12vw',
          ease: 'none',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top top',
            end: '98% bottom',
            scrub: true,
            id: 'bg-horizontal',
          }
        })
      }

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
    }, 100)
    }) // end Promise.then

    return () => {
      cancelled = true
      if (smootherRef.current) {
        smootherRef.current.kill()
        smootherRef.current = null
      }
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      })
    }
  }, [])

  return (
    <div ref={wrapperRef} className="sticky-sections-wrapper">
      <div ref={bgRef} className="page-background" />
      <div ref={contentRef} className="sticky-sections">
        <Presentation scrollToSection={scrollToSection} />
        <svg className="section-wave wave-to-opaque" viewBox="0 165.92 186.74 8.46" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 86.869116 165.92269 C 58.962577 165.99849 29.779633 167.51169 0 169.70024 L 0 174.37902 L 186.73537 174.37902 C 156.51908 168.10385 122.74895 165.82523 86.869116 165.92269" />
        </svg>
        <Services />
        <Competences />
        <Projets />
        <svg className="section-wave wave-to-transparent" viewBox="0 165.92 186.74 8.46" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 86.869116 165.92269 C 58.962577 165.99849 29.779633 167.51169 0 169.70024 L 0 174.37902 L 186.73537 174.37902 C 156.51908 168.10385 122.74895 165.82523 86.869116 165.92269" />
        </svg>
        <Contact />
      </div>
    </div>
  )
}

export default StickySections
