import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Section from '../Section/Section'
import ProjectCard from './ProjectCard'
import './Projets.css'

gsap.registerPlugin(ScrollTrigger)

const navbarHeight = 100
const Projets = ({ enableScrollAnimation = false }) => {
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
    }
  ]

  useEffect(() => {
    if (!enableScrollAnimation) return

    const section = document.getElementById('projets')
    if (!section) return

    const isMobile = window.innerWidth <= 768

    // Timeline d'animation progressive
    const title = section.querySelector('h2')
    const cardsContainer = section.querySelector('.project-cards')
    const cards = section.querySelectorAll('.project-card')

    if (isMobile) {
      // Sur mobile : pin en bas, cards qui se remplacent une par une
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${cards.length * 60}%`,
        pin: true,
        pinSpacing: true,
        id: 'projets-pin',
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 15%',
          end: `+=${cards.length * 50}%`,
          scrub: 1,
          snap: {
            snapTo: 1 / (cards.length + 1), // Snap entre chaque card
            duration: 0.5,
            ease: 'power2.inOut',
          },
          id: 'projets-timeline',
        },
      })

      // Animation du titre
      tl.fromTo(title, {
        opacity: 0,
        y: -30,
      }, {
        opacity: 1,
        y: 0,
      }, 0) // Position 0 : début

      let currentTime = 1 // Début après le titre

      // Ajouter chaque card à la timeline
      cards.forEach((card, index) => {
        // position initiale
        gsap.set(card, {
          position: 'absolute',
          top: `${index * 2}%`,
          transform: 'translate(-50%, -50%)',
          zIndex: index,
        })

        // Apparition depuis la gauche à une position absolue dans la timeline
        tl.fromTo(card, {
          x: '-100%',
          opacity: 0,
        }, {
          x: `-${index * 2}%`,
          opacity: 1,
          duration: 1, // Durée fixe pour chaque animation
        }, currentTime) // Position absolue dans la timeline

        currentTime += 1 // Passer à la prochaine position après la fin de cette animation
      })
    } else {
      // Sur desktop : animation normale
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=130%',
        pin: true,
        pinSpacing: true,
        id: 'projets-pin',
      })

      if (title && cardsContainer) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 15%',
            end: '+=70%',
            scrub: 1,
            id: 'projets-timeline',
          },
        })

        tl.fromTo(title, {
          opacity: 0,
          y: -30,
        }, {
          opacity: 1,
          y: 0,
          duration: 0.1,
        })
          .fromTo(cardsContainer, {
            x: '-100%',
            opacity: 0,
          }, {
            x: '0%',
            opacity: 1,
            duration: 0.7,
          })
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.id && trigger.vars.id.startsWith('projets-')) {
          trigger.kill()
        }
      })
    }
  }, [enableScrollAnimation])

  return (
    <Section id="projets" className="projets-section" enableScrollAnimation={enableScrollAnimation}>
      <div className="projets-background"></div>
      <div className="projets-container">
        <h2>Creations</h2>

        <div className="project-cards">
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imageColor={project.imageColor}
              imageText={project.imageText}
              img={project.img}
              lien={project.lien}
              zIndex={project.id + 1}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}

export default Projets
