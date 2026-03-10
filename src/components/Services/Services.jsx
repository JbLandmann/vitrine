import { useState } from 'react'
import Section from '../Section/Section'
import './Services.css'

const METHODS = [
  {
    id: 'renfort',
    title: 'Renfort d\u2019équipe — Assistance technique',
    paragraphs: [
      'Lorsque votre équipe a besoin d\u2019accélérer le développement ou de renforcer ses compétences techniques, je peux intervenir en renfort direct au sein de votre équipe.',
      'Intégré à votre organisation et à vos méthodes de travail, je contribue au développement de vos projets numériques en collaboration avec vos développeurs, designers et chefs de projet.',
      'Ce mode d\u2019intervention permet de gagner rapidement en capacité de production tout en restant flexible selon l\u2019évolution de vos besoins.',
    ],
  },
  {
    id: 'projet',
    title: 'Développement de projet — Forfait agile',
    paragraphs: [
      'Pour la création d\u2019un nouveau service numérique, je propose un accompagnement en développement de projet avec une approche agile.',
      'Nous définissons ensemble les objectifs du projet et un budget global, puis le développement avance par cycles courts et itératifs, permettant d\u2019ajuster les priorités au fur et à mesure.',
      'Cette méthode permet de livrer rapidement de la valeur, tout en conservant la souplesse nécessaire pour faire évoluer le produit selon les retours et les besoins réels.',
    ],
  },
  {
    id: 'maintenance',
    title: 'Maintenance et évolution',
    paragraphs: [
      'Un projet numérique nécessite un suivi dans le temps pour garantir sa stabilité, sa sécurité et son évolution.',
      'Je propose un accompagnement de maintenance applicative, incluant la correction de bugs, les mises à jour techniques et l\u2019ajout de nouvelles fonctionnalités.',
      'Cet accompagnement permet de faire vivre votre produit dans la durée, tout en assurant sa fiabilité et son adaptation à vos nouveaux besoins.',
    ],
  },
  {
    id: 'audit',
    title: 'Audit technique et conseil',
    paragraphs: [
      'Lorsqu\u2019un projet atteint une certaine complexité ou rencontre des difficultés techniques, un regard extérieur peut apporter une réelle valeur.',
      'Je réalise des audits techniques afin d\u2019analyser l\u2019architecture, la qualité du code ou les performances d\u2019un système existant.',
      'L\u2019objectif est d\u2019identifier les points d\u2019amélioration et de proposer des recommandations concrètes pour renforcer la robustesse, la maintenabilité et l\u2019efficacité de votre solution.',
    ],
  },
]

const Services = () => {
  const [activeId, setActiveId] = useState(METHODS[0].id)
  const active = METHODS.find((m) => m.id === activeId)

  return (
    <Section id="services" className="services-section">
      <div className="services-container">
        {/* Desktop: tabs + detail */}
        <div className="services-desktop">
          <h2>Méthodes</h2>
          <div className="services-layout">
            <nav className="services-tabs">
              {METHODS.map((m) => (
                <button
                  key={m.id}
                  className={`services-tab-btn${m.id === activeId ? ' active' : ''}`}
                  onClick={() => setActiveId(m.id)}
                >
                  {m.title}
                </button>
              ))}
            </nav>
            <div className="services-detail-wrapper">
              {METHODS.map((m) => (
                <div
                  className={`services-detail${m.id === activeId ? ' active' : ''}`}
                  key={m.id}
                >
                  {m.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: all methods listed */}
        <div className="services-mobile">
          {METHODS.map((m) => (
            <article key={m.id} className="services-method-block">
              <h3>{m.title}</h3>
              {m.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default Services
