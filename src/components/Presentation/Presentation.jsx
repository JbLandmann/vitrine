import { FaGears, FaLaptopCode, FaRocket } from 'react-icons/fa6'
import Section from '../Section/Section'
import './Presentation.css'

const Presentation = ({ scrollToSection }) => {
  return (
    <Section id="presentation" className="presentation-section">
      <div className="hero-container">
        <h1 className="hero-catchphrase">
          Je développe et accompagne vos projets numériques en proposant des solutions adaptées à vos besoins.
        </h1>

        <div className="hero-features">
          <div className="hero-feature">
            <FaGears className="hero-icon" />
            <p>Intervention à plusieurs étapes de la vie d'un produit&nbsp;: renfort d'équipe, nouvelles fonctionnalités, conception, maintenance et amélioration.</p>
          </div>

          <div className="hero-feature">
            <FaLaptopCode className="hero-icon" />
            <p>Une approche reposant sur des méthodes de développement modernes, une collaboration transparente et une attention particulière portée à la fiabilité, la simplicité et la pérennité des solutions mises en place.</p>
          </div>
        </div>

        <div className="hero-cta-block">
          <FaRocket className="hero-icon-cta" />
          <p className="hero-cta-text">
            Contactez-moi pour construire un projet, renforcer une équipe, faire évoluer une application, ou réaliser un audit de performance.
          </p>
          <div className="hero-cta-buttons">
            <button className="btn-hero" onClick={() => scrollToSection?.('contact')}>
              Contact
            </button>
            <button className="btn-hero" onClick={() => scrollToSection?.('projets')}>
              Voir mes réalisations
            </button>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Presentation
