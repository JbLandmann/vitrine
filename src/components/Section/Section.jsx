import './Section.css'

const Section = ({ id, className = '', children, customRef }) => {
  return (
    <section id={id} className={`section ${className}`} ref={customRef}>
      <div className="section-content">
        {children}
      </div>
    </section>
  )
}

export default Section
