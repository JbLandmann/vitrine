const ProjectCard = ({ title, description, img, lien, className = '', style }) => {
  return (
    <div className={`project-card ${className}`.trim()} style={style}>
      <a className="card-background" href={lien} target="blank">
        <img
          src={img}
          alt={title}
          className="project-card-image"
          loading="lazy"
        />
      </a>
      <div className="project-card-content">
        <h3 className="project-card-title">{title}</h3>
        <p className="project-card-description">{description}</p>
        <a href={lien} className="project-link" target="_blank" rel="noopener noreferrer">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" fill="rgba(52, 152, 219, 0.5)"/>
            <path d="M16 12L24 20L16 28" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  )
}

export default ProjectCard