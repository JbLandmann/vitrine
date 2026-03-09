import Section from '../Section/Section'
import './Presentation.css'

const IconGear = () => (
  <svg className="hero-icon" viewBox="0 0 122.88 122.88" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M73.68,0l6.44,20.37a2.87,2.87,0,0,0,2.09,1.89l3.6.78a45.49,45.49,0,0,1,5.29,3.1l3.15,2.12a2.89,2.89,0,0,0,2.8.24l19.87-8.13,3,5.11L105.28,37a2.88,2.88,0,0,0-.71,2.73l.57,3.63a45,45,0,0,1,0,6.16l-.57,3.64a2.86,2.86,0,0,0,.71,2.72l14.6,11.56-3,5.12L96.88,65.42a2.86,2.86,0,0,0-2.8.25l-3.15,2.12a45,45,0,0,1-5.29,3.09l-3.6.79a2.89,2.89,0,0,0-2.09,1.89L73.68,93.88H67.56l-6.37-20.2a2.87,2.87,0,0,0-2.1-1.89l-3.6-.78a45.49,45.49,0,0,1-5.28-3.1L47.05,65.8a2.86,2.86,0,0,0-2.8-.25L24.24,73.68l-3-5.12L35.82,57a2.86,2.86,0,0,0,.71-2.72l-.57-3.64a44.17,44.17,0,0,1,0-6.16l.57-3.63A2.88,2.88,0,0,0,35.82,38L21.22,26.48l3-5.11,20,8.17a2.89,2.89,0,0,0,2.8-.24l3.16-2.12A45,45,0,0,1,55.49,24l3.6-.79A2.87,2.87,0,0,0,61.19,21.3L67.56,1h0L73.68,0ZM61.44,39.36A22.08,22.08,0,1,1,39.36,61.44,22.08,22.08,0,0,1,61.44,39.36Z"/>
  </svg>
)

const IconCode = () => (
  <svg className="hero-icon" viewBox="0 0 122.88 101.57" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.48,0H118.4a4.51,4.51,0,0,1,4.48,4.48V78.54a4.52,4.52,0,0,1-4.48,4.49H72.67l2.52,12.31h8.49a3.12,3.12,0,1,1,0,6.23H39.2a3.12,3.12,0,1,1,0-6.23h8.49L50.21,83H4.48A4.48,4.48,0,0,1,0,78.54V4.48A4.48,4.48,0,0,1,4.48,0ZM45.42,39.18a2.4,2.4,0,0,1-1-3.26L50,26.06a2.39,2.39,0,0,1,4.14,2.4l-4.37,7.56,4.37,7.56a2.39,2.39,0,0,1-4.14,2.4l-5.53-9.58a1.64,1.64,0,0,1,0-1.65l1-1.73-1,1.73a2.37,2.37,0,0,1,1,3.43ZM66,47.52a2.39,2.39,0,0,1-4.14-2.39L66.24,38l-4.37-7.56a2.39,2.39,0,1,1,4.14-2.4l5.54,9.59a2.39,2.39,0,0,1,0,2.39L66,47.52ZM57.63,51a2.4,2.4,0,0,1-4.67-1.08l7-25.85A2.4,2.4,0,0,1,64.61,25l-7,25.86ZM4.17,4.48V69.94H118.71V4.48a.32.32,0,0,0-.31-.31H4.48a.31.31,0,0,0-.31.31Z"/>
  </svg>
)

const IconRocket = () => (
  <svg className="hero-icon-cta" viewBox="0 0 122.88 122.25" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M39.05,99.48a4.18,4.18,0,1,1-5.6-6.22c5-4.47,7.45-10.08,8.14-16.35l8.92,5.28c-1.41,6.87-4.92,12.72-11.46,17.29Zm68-90.82a161.54,161.54,0,0,1-20.36,27A155.7,155.7,0,0,1,64.53,55.93l3.2,5.55-5.47,3.16-3.21-5.55a4.17,4.17,0,0,1-3,1.4,4.23,4.23,0,0,1-2.14-.59L35.65,49.54a4.18,4.18,0,0,1-1.53-5.71l0,0,3.2,5.55L31.83,46.2l-3.2-5.55A155.41,155.41,0,0,1,53.76,24.42,161.46,161.46,0,0,1,86.8,8.89a4.19,4.19,0,0,1,5.17.65l14.37,14.37a4.17,4.17,0,0,1,.74,5Zm-43.88,63-9.6-5.55a77,77,0,0,0,8.72-6.08l5.42,9.39a77.45,77.45,0,0,1-4.54,2.24ZM25,73a4.18,4.18,0,1,1-6.22-5.6c4.57-6.54,10.42-10,17.29-11.46l5.28,8.92A24.58,24.58,0,0,0,25,73Zm33.84-18.8a77.69,77.69,0,0,0,6.08-8.72l5.55,9.6a74.06,74.06,0,0,1-2.24,4.54l-9.39-5.42ZM76,33.37A8.36,8.36,0,1,1,76,45.2,8.37,8.37,0,0,1,76,33.37Zm-56.81,74.7a4.18,4.18,0,0,1-5.11-6.62L30.6,87.28a4.18,4.18,0,0,1,5.12,6.61L19.17,108.07Z"/>
  </svg>
)

const Presentation = ({ scrollToSection }) => {
  return (
    <Section id="presentation" className="presentation-section">
      <div className="hero-container">
        <h1 className="hero-catchphrase">
          Je développe et accompagne vos projets numériques en proposant des solutions adaptées à vos besoins.
        </h1>

        <div className="hero-features">
          <div className="hero-feature">
            <IconGear />
            <p>Intervention à plusieurs étapes de la vie d'un produit&nbsp;: renfort d'équipe, nouvelles fonctionnalités, conception, maintenance et amélioration.</p>
          </div>

          <div className="hero-feature">
            <IconCode />
            <p>Une approche reposant sur des méthodes de développement modernes, une collaboration transparente et une attention particulière portée à la fiabilité, la simplicité et la pérennité des solutions mises en place.</p>
          </div>
        </div>

        <div className="hero-cta-block">
          <IconRocket />
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
