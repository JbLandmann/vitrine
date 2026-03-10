import { useState } from 'react'
import { FaLongArrowAltRight } from 'react-icons/fa'

const ProjectCard = ({ title, subtitle, description, img, lien, className = '', style }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className={`project-card ${className}`.trim()} style={style}>
      <div className={`card-inner${isFlipped ? ' flipped' : ''}`}>
        {/* ---- FRONT ---- */}
        <div className="card-front">
          <a className="card-background" href={lien} target="_blank" rel="noopener noreferrer">
            <img
              src={img}
              alt={title}
              className="project-card-image"
              loading="lazy"
            />
          </a>

          <div className="project-card-content" onClick={(e) => { e.stopPropagation(); setIsFlipped(true) }}>
            <div className="project-card-title-wrapper">
              <h3 className="project-card-title">
                {title}
              </h3>
              <FaLongArrowAltRight className="title-flip-arrow" aria-hidden="true" />
            </div>
            <p className="project-card-description">{subtitle}</p>
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
          <p className="card-back-description">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard