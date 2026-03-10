import { useState } from 'react'
import { FaLinkedinIn } from 'react-icons/fa'
import Section from '../Section/Section'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState('') // 'sending', 'success', 'error'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    console.log("KEY=", import.meta.env.VITE_EMAIL_PUBLIC_KEY)
    const formDataToSend = new FormData()
    formDataToSend.append('access_key', import.meta.env.VITE_EMAIL_PUBLIC_KEY)
    formDataToSend.append('name', formData.name)
    formDataToSend.append('email', formData.email)
    formDataToSend.append('message', formData.message)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus(''), 3000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus(''), 3000)
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error)
      setStatus('error')
      setTimeout(() => setStatus(''), 3000)
    }
  }

  return (
    <Section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <h2>Contact</h2>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="button-row">
            <button type="submit" className="submit-button" disabled={status === 'sending'}>
              {status === 'sending' ? 'Envoi en cours...' : 'Envoyer'}
            </button>
            <a
              href="https://www.linkedin.com/in/jean-music-music/"
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin-link"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>

          {status === 'success' && (
            <p className="status-message success">Message envoyé avec succès !</p>
          )}
          {status === 'error' && (
            <p className="status-message error">Erreur lors de l'envoi. Réessayez.</p>
          )}
        </form>
      </div>
    </Section>
  )
}

export default Contact
