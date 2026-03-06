import { useState, useEffect, useRef, useCallback } from 'react'
import Section from '../Section/Section'
import ProjectCard from './ProjectCard'
import './Projets.css'

const Projets = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isFocused, setIsFocused] = useState(false)
  const touchStartX = useRef(0)
  const focusTimer = useRef(null)

  const projects = [
    {
      id: 1,
      title: 'Trésors Nomade',
      description: 'Une vitrine pour présenter ses trésors et leur histoire',
      img: `${import.meta.env.BASE_URL}bg-map-plan.avif`,
      lien: "https://tresors-nomade.web.app"
    },
    {
      id: 2,
      title: 'FluteCraft',
      description: 'Une page web pour fabriquer vous même la flute de vos rêves',
      imageColor: '#667eea',
      lien:"#"
    },
    {
      id: 3,
      title: "App Map",
      description: "Un regroupement d'informations graphiques pour la france métropolitaine",
      imageColor: '#764ba2',
      lien:"#"
    },
    {
      id: 4,
      title: "Test",
      description: "Juste un test",
      imageColor: '#764ba2',
      lien:"#"
    }
  ]

  const total = projects.length
  const visibleCount = isMobile ? 1 : 3
  const maxIndex = Math.max(0, total - visibleCount)
  const canGoPrev = activeIndex > 0
  const canGoNext = activeIndex < maxIndex
  const canNavigate = total > visibleCount

  // Responsive detection
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const onChange = (e) => setIsMobile(e.matches)
    setIsMobile(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Clamp activeIndex when switching mobile/desktop
  useEffect(() => {
    setActiveIndex((prev) => Math.min(prev, maxIndex))
  }, [maxIndex])

  // Timer 0.6s pour déclencher l'animation hover (mobile uniquement)
  useEffect(() => {
    if (!isMobile) return
    setIsFocused(false)
    focusTimer.current = setTimeout(() => setIsFocused(true), 600)
    return () => clearTimeout(focusTimer.current)
  }, [activeIndex, isMobile])

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => Math.max(0, prev - 1))
  }, [])

  const goNext = useCallback(() => {
    setActiveIndex((prev) => Math.min(maxIndex, prev + 1))
  }, [maxIndex])

  // Touch handlers (mobile)
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback((e) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (delta > 50 && canGoNext) goNext()
    else if (delta < -50 && canGoPrev) goPrev()
  }, [canGoNext, canGoPrev, goNext, goPrev])

  const getCardInfo = useCallback((index) => {
    const firstVisible = activeIndex
    const lastVisible = activeIndex + visibleCount - 1

    // Card is in the visible window
    if (index >= firstVisible && index <= lastVisible) {
      const posInWindow = index - firstVisible
      const centerOffset = Math.floor(visibleCount / 2)
      const offset = posInWindow - centerOffset
      let cls = 'carousel-active'
      if (isMobile && posInWindow === 0 && isFocused) {
        cls += ' carousel-focused'
      }
      return { className: cls, offset }
    }

    // Card just before visible window — peek behind left
    if (index === firstVisible - 1) {
      const centerOffset = Math.floor(visibleCount / 2)
      return { className: 'carousel-prev', offset: -(centerOffset + 1) }
    }

    // Card just after visible window — peek behind right
    if (index === lastVisible + 1) {
      const centerOffset = Math.floor(visibleCount / 2)
      return { className: 'carousel-next', offset: centerOffset + 1 }
    }

    // Far away — hidden
    return { className: 'carousel-hidden', offset: 0 }
  }, [activeIndex, visibleCount, isMobile, isFocused])

  const getCardStyle = useCallback((index) => {
    const { offset } = getCardInfo(index)
    if (isMobile) {
      return { '--carousel-x': `${offset * 85}%` }
    }
    return { '--carousel-x': `calc(${offset} * (100% + 2rem))` }
  }, [getCardInfo, isMobile])

  return (
    <Section id="projets" className="projets-section">
      <div className="projets-background"></div>
      <div className="projets-container">
        <h2>Creations</h2>

        <div
          className="carousel-wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="carousel-track">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                imageColor={project.imageColor}
                imageText={project.imageText}
                img={project.img}
                lien={project.lien}
                className={getCardInfo(index).className}
                style={getCardStyle(index)}
              />
            ))}
          </div>
        </div>

        {canNavigate && (
          <div className="carousel-nav">
            <button
              className="carousel-arrow carousel-arrow-prev"
              onClick={goPrev}
              disabled={!canGoPrev}
              aria-label="Projet précédent"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="carousel-dots">
              {Array.from({ length: maxIndex + 1 }, (_, i) => (
                <button
                  key={i}
                  className={`carousel-dot${i === activeIndex ? ' active' : ''}`}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Position ${i + 1}`}
                />
              ))}
            </div>

            <button
              className="carousel-arrow carousel-arrow-next"
              onClick={goNext}
              disabled={!canGoNext}
              aria-label="Projet suivant"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </Section>
  )
}

export default Projets
