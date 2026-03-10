import './Competences.css'
import { SiDocker, SiJavascript, SiTypescript, SiGo, SiNodedotjs, SiReact, SiGithub } from 'react-icons/si'
import { TbBrain, TbCloud } from 'react-icons/tb'

const TECHS = [
  { name: 'React',       icon: <SiReact color="#61DAFB" /> },
  { name: 'Docker',      icon: <SiDocker color="#2496ED" /> },
  { name: 'JavaScript',  icon: <SiJavascript color="#F7DF1E" /> },
  { name: 'TypeScript',  icon: <SiTypescript color="#3178C6" /> },
  { name: 'Golang',      icon: <SiGo color="#00ADD8" /> },
  { name: 'Node.js',     icon: <SiNodedotjs color="#339933" /> },
  { name: 'Cloud',       icon: <TbCloud color="#0EA5E9" /> },
  { name: 'GitHub',      icon: <SiGithub color="#181717" /> },
  { name: 'Pilotage IA', icon: <TbBrain color="#7C3AED" /> },
]

const Competences = () => (
  <section className="competences-section">
    <div className="competences-container">
      <div className="competences-grid">
        {TECHS.map((t) => (
          <div className="competences-item" key={t.name}>
            <div className="competences-icon">{t.icon}</div>
            <span className="competences-label">{t.name}</span>
          </div>
        ))}
      </div>
      <p className="competences-text">
        Ces Technologies constituent le socle technique de mes compétences .
      </p>
    </div>
  </section>
)

export default Competences
