import { useState } from 'react'
import { FaLongArrowAltRight, FaTimes } from 'react-icons/fa'

const ProjectCard = ({ title, subtitle, description, statut, img, lien, className = '', style }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className={`project-card ${className}`.trim()} style={style}>
      <div className={`card-inner${isFlipped ? ' flipped' : ''}`}>
        {/* ---- FRONT ---- */}
        <div className="card-front">
          <a className="card-background" {...(lien ? { href: lien, target: '_blank', rel: 'noopener noreferrer' } : {})}>
            <img
              src={img}
              alt={title}
              className="project-card-image"
              loading="lazy"
            />
          </a>

          <span className={`card-visit-badge ${lien ? 'has-link' : 'no-link'}`}>
            {lien ? 'Visiter' : <FaTimes />}
          </span>

          <div className="project-card-content" onClick={(e) => { e.stopPropagation(); setIsFlipped(true) }}>
            <h3 className="project-card-title">
              {title}
            </h3>
            <p className="project-card-description">{subtitle}</p>
            <div className="card-front-footer">
              <span className="card-details-group">
                <span className="card-details-label">Détails</span>
                <FaLongArrowAltRight className="card-details-arrow" aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>

        {/* ---- BACK ---- */}
        <div className="card-back" onClick={(e) => { e.stopPropagation(); setIsFlipped(false) }}>
          <div className="project-card-title-wrapper">
            <h3 className="project-card-title">
              {title}
            </h3>
            <FaLongArrowAltRight className="title-flip-arrow" aria-hidden="true" />
          </div>
          <p className="card-back-description" style={{ whiteSpace: 'pre-line' }}>{description}</p>
          {statut && <p className="card-back-statut">Statut: {statut}</p>}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard