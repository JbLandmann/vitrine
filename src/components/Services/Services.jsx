import Section from '../Section/Section'
import './Services.css'

const Services = () => {
  return (
    <Section id="services" className="services-section">
      <div className="services-container">
        <h2>Méthodes d'accompagnement</h2>
        <div className="services-content">
          <p>
            Mon approche repose sur une collaboration étroite et structurée, adaptée à chaque phase
            de votre projet. De l'analyse initiale des besoins à la mise en production, chaque étape
            est pensée pour garantir un résultat fiable et maintenable. Je privilégie des cycles courts
            de développement avec des points réguliers, permettant d'ajuster la direction en continu
            et d'intégrer vos retours au fil de l'avancement.
          </p>
          <p>
            L'accompagnement inclut également une veille technique permanente, des revues de code
            rigoureuses et une documentation claire pour assurer la pérennité de chaque solution livrée.
            Que ce soit pour un projet neuf, une refonte ou un renfort ponctuel, la méthode s'adapte
            à votre contexte — startup en phase de lancement, équipe technique en place, ou entreprise
            souhaitant moderniser son existant. L'objectif reste le même : construire des solutions
            solides, compréhensibles et évolutives, dans le respect de vos délais et de vos contraintes
            budgétaires.
          </p>
        </div>
      </div>
    </Section>
  )
}

export default Services
