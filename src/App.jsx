import { useEffect, useState } from 'react'
import logo from './assets/logo-nobg.png'
import image1 from './assets/image1.png'
import image2 from './assets/image2.jpg'
import image3 from './assets/image3.jpg'
import image4 from './assets/image4.png'
import './App.css'

const featureCards = [
  {
    title: 'Analyze',
    description:
      'Sereya observes your website and reveals trends, market shifts, and ranking behavior in one simple dashboard.',
    image: image1,
  },
  {
    title: 'Prediction',
    description:
      'It predicts what matters next so your team can prioritize high-impact improvements with confidence.',
    image: image3,
  },
  {
    title: 'Create',
    description:
      'AI-powered growth recommendations guide your next actions to keep your momentum moving forward.',
    image: image2,
  },
]

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Learn more', href: '#features' },
  { label: 'Support', href: '#support' },
]

const socialLinks = {
  instagram: '', // Add Instagram URL here later
  linkedin: 'https://www.linkedin.com/in/team-sereya-629761396/',
  x: '', // Add X URL here later
}

const SUPPORT_EMAIL = 'frankmmwaffle@gmail.com'

function App() {
  const [email, setEmail] = useState('')
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!isSubmitted) return undefined
    const timer = setTimeout(() => setIsSubmitted(false), 15000)
    return () => clearTimeout(timer)
  }, [isSubmitted])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email.trim()) return
    setIsSubmitted(true)
    setEmail('')
  }

  const handleNewsletterSubmit = (event) => {
    event.preventDefault()
    if (!newsletterEmail.trim()) return

    const subject = '[IMPORTANT] Newsletter Application Request'
    const body = `Hello SEREYA Support,\n\nThe person with email "${newsletterEmail}" is requesting to apply for the SEREYA newsletter.\n\nPlease add them to the newsletter list.\n\nThanks.`
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    setNewsletterSubmitted(true)
    setNewsletterEmail('')
  }

  return (
    <main className="page-shell">
      <section className="waitlist-app">
        <header className="topbar">
          <div className="brand-row">
            <img src={logo} alt="Sereya" className="brand-logo" />
            <span className="brand-name">Sereya</span>
          </div>

          <nav className="top-nav" aria-label="Primary">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="top-icons">
            <a
              href={socialLinks.instagram || '#'}
              className="social-link"
              aria-label="Instagram"
              target={socialLinks.instagram ? '_blank' : undefined}
              rel={socialLinks.instagram ? 'noreferrer' : undefined}
              onClick={(event) => {
                if (!socialLinks.instagram) event.preventDefault()
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="4.5" y="4.5" width="15" height="15" rx="4.2" />
                <circle cx="12" cy="12" r="3.7" />
                <circle cx="17.2" cy="6.8" r="1.1" className="fill-icon" />
              </svg>
            </a>
            <a
              href={socialLinks.linkedin || '#'}
              className="social-link"
              aria-label="LinkedIn"
              target={socialLinks.linkedin ? '_blank' : undefined}
              rel={socialLinks.linkedin ? 'noreferrer' : undefined}
              onClick={(event) => {
                if (!socialLinks.linkedin) event.preventDefault()
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="4.5" y="4.5" width="15" height="15" rx="2.3" />
                <rect x="8" y="10.2" width="2" height="6.2" className="fill-icon" />
                <circle cx="9" cy="7.8" r="1.1" className="fill-icon" />
                <path d="M13 16.4v-3.2c0-1.1.7-1.8 1.6-1.8s1.4.7 1.4 1.7v3.3h2v-3.7c0-2-1.1-3.1-2.8-3.1-1 0-1.8.4-2.2 1v-.8h-2v6.6z" className="fill-icon" />
              </svg>
            </a>
            <a
              href={socialLinks.x || '#'}
              className="social-link"
              aria-label="X"
              target={socialLinks.x ? '_blank' : undefined}
              rel={socialLinks.x ? 'noreferrer' : undefined}
              onClick={(event) => {
                if (!socialLinks.x) event.preventDefault()
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.6 5.5h3l3.2 4.6 3.9-4.6h2.9l-5.3 6.1 5.5 7h-3l-3.8-4.9-4.2 4.9H5.9l5.7-6.5z" className="fill-icon" />
              </svg>
            </a>
            <button
              type="button"
              className="hamburger"
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </header>
        <nav
          id="mobile-menu"
          className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}
          aria-label="Mobile primary"
        >
          {navLinks.map((link) => (
            <a key={`mobile-${link.label}`} href={link.href} onClick={() => setIsMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>

        <section className="hero-block">
          <div className="hero-headline-wrap">
            <h1>Analyze, Predict, Create</h1>
            <p className="hero-subtext">
              Join the SEREYA waitlist to get early access to smarter SEO insights and forecasting.
            </p>

            <form className="hero-actions" onSubmit={handleSubmit}>
              <label htmlFor="waitlist-email" className="sr-only">
                Email address
              </label>
              <input
                id="waitlist-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
              <button type="submit" className="btn btn-primary">
                Join Waitlist
              </button>
            </form>
            {isSubmitted && (
              <p className="waitlist-success" role="status">
                THANK YOU FOR JOINING THE WAITLIST! WE'LL BE IN TOUCH WITH UPDATES AND EARLY ACCESS DETAILS.
              </p>
            )}
          </div>

          <div className="hero-preview" role="img" aria-label="Sereya dashboard preview">
            <img src={image4} alt="Dashboard preview" />
          </div>
        </section>

        <section id="features" className="feature-grid" aria-label="Sereya capabilities">
          {featureCards.map((card) => (
            <article key={card.title} className="feature-card">
              <img src={card.image} alt={card.title} className="feature-image" />
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </article>
          ))}
        </section>

        <section id="support" className="support-section" aria-label="Support">
          <h3>Support</h3>
          <p>Need help with onboarding or the SEREYA waitlist?</p>
          <p>
            Email: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          </p>
          <p>
            Phone: <a href="tel:+254794083470">Call Support</a>
          </p>
        </section>

        <section className="newsletter-section" aria-label="Newsletter">
          <h3>Newsletter</h3>
          <p>Apply for newsletter updates from SEREYA.</p>
          <form className="newsletter-placeholder" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="Your email address"
              aria-label="Newsletter email"
              value={newsletterEmail}
              onChange={(event) => setNewsletterEmail(event.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </form>
          {newsletterSubmitted && (
            <p className="newsletter-note" role="status">
              Email draft opened. Send it to complete your newsletter request.
            </p>
          )}
        </section>

        <footer className="site-footer">
          <div className="footer-brand">
            <img src={logo} alt="Sereya" className="brand-logo" />
            <span>SEREYA</span>
          </div>
          <p>Analyze. Predict. Create.</p>
          <small>{new Date().getFullYear()} Sereya. All rights reserved.</small>
        </footer>
      </section>
    </main>
  )
}

export default App
