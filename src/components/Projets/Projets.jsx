import { useState, useEffect, useRef, useCallback } from 'react'
import Section from '../Section/Section'
import ProjectCard from './ProjectCard'
import './Projets.css'

const getVisibleCount = (width) => {
  if (width >= 1400) return 4
  if (width >= 1150) return 3
  if (width >= 768) return 2
  return 1
}

const Projets = () => {
  const [visibleCount, setVisibleCount] = useState(() => getVisibleCount(window.innerWidth))
  const isMobile = visibleCount === 1
  const [activeIndex, setActiveIndex] = useState(0)
  const [isFocused, setIsFocused] = useState(false)
  const touchStartX = useRef(0)
  const focusTimer = useRef(null)

  const projects = [
    {
      id: 1,
      title: 'Trésors Nomade',
      subtitle: 'Une vitrine pour présenter ses trésors et leur histoire',
      description: "Ce site web a été concu pour un particulier, un prototype developpé en 2 jours à l'aide d'agent IA .\n\nEntièrement fonctionnel, il est aux normes RGPD pour les mesures d'audience, contient une interface d'administration du contenu .\n\nLa base de donnée est incluse dans l'offre d'hébergement gratuite sur firebase .",
      statut: "Production",
      img: `${import.meta.env.BASE_URL}tn_hero.avif`,
      lien: "https://tresors-nomade.web.app"
    },
    {
      id: 2,
      title: 'FluteCraft',
      subtitle: 'Une page web pour fabriquer vous même la flûte de vos rêves',
      description: "Afin de créer des flûtes, j'ai décidé de creer un outils pour m'accompagner dans le processus.\n\nCette page web en React.js aide à construire une gamme de notes personnalisée, guide l'utilisateur sur les étapes de frabrication, et propose 3 modeles de prediction de positions.\n\nDes conseils et recommendations de modification sont présents après chaque étape.",
      statut: "Tests",
      img: `${import.meta.env.BASE_URL}flutecraft_screen.png`,
      lien:""
    },
    {
      id: 3,
      title: "App Map",
      subtitle: "Un regroupement d'informations graphiques pour la france métropolitaine",
      description: "Une application web & mobile developpée en Typescript, React / Native et Go.\n\nUn outil de visualisation, centralisation et recupération des données historiques francaises par zones géographiques.\n\nLes données couvrent divers indicateurs de santé, emploi jusqu'au comportement météorologique.\n\nCe projet dirigé selon une méthode agile vise à offrir une capacité de lecture de ces indicateurs.",
      statut: "En cours / Staging",
      img: `${import.meta.env.BASE_URL}appmap_screen.png`, 
      lien:""
    },
    {
      id: 4,
      title: "Leadership Conscient",
      subtitle: "Le futur se co-conscruit dès aujourd'hui",
      description: "Travail réalisé pour un client.\n\nMise à jour de l'interface, des outils et librairies d'un site wordpress.\n\nObjectifs atteints :\n - Modernisation du design\n - Optimisation des dépendances.\n - Réduction des coûts\n - Guide de pilotage clés en main.",
      statut: "Production",
      img: `${import.meta.env.BASE_URL}lc_img.png`, 
      lien:"https://www.leadership-conscient.com/"
    }
  ]

  const total = projects.length
  const maxIndex = Math.max(0, total - visibleCount)
  const canGoPrev = activeIndex > 0
  const canGoNext = activeIndex < maxIndex
  const canNavigate = total > visibleCount

  // Responsive detection — update visibleCount on resize
  useEffect(() => {
    const onResize = () => setVisibleCount(getVisibleCount(window.innerWidth))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
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
      const centerOffset = (visibleCount - 1) / 2
      const offset = posInWindow - centerOffset
      let cls = 'carousel-active'
      if (isMobile && posInWindow === 0 && isFocused) {
        cls += ' carousel-focused'
      }
      return { className: cls, offset }
    }

    // Card just before visible window — peek behind left
    if (index === firstVisible - 1) {
      const centerOffset = (visibleCount - 1) / 2
      return { className: 'carousel-prev', offset: -(centerOffset + 1) }
    }

    // Card just after visible window — peek behind right
    if (index === lastVisible + 1) {
      const centerOffset = (visibleCount - 1) / 2
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
        <h2 className="projets-title">Réalisations</h2>
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
                subtitle={project.subtitle}
                description={project.description}
                imageColor={project.imageColor}
                img={project.img}
                lien={project.lien}
                statut={project.statut}
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
