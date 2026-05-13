import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import logo from './assets/logo-nobg.png'
import image1 from './assets/image1.png'
import image2 from './assets/image2.jpg'
import image3 from './assets/image3.jpg'
import image4 from './assets/image4.png'
import modelPath from './assets/3d-sereya-gib/base_basic_pbr.glb?url'
import './App.css'
import { supabase } from './supabaseClient'
import { seoContent } from './data/seoContent'

// ======================
// Static content arrays
// ======================
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

// ======================
// Navigation & social links
// ======================
const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Learn more', href: '#features' },
  { label: 'Articles', href: '/articles.html' },
  { label: 'Support', href: '#support' },
]

const socialLinks = {
  instagram: 'https://www.instagram.com/majesty.szn/', // Add Instagram URL here later
  linkedin: 'https://www.linkedin.com/in/team-sereya-629761396/',
  whatsapp: 'https://wa.me/254780371663', // Add WhatsApp URL here later
}

const SUPPORT_EMAIL = 'frankmmwaffle@gmail.com'

// ======================
// SEO importance content
// ======================
const seoImportance = [
  {
    title: 'Competing with Larger Players',
    summary: 'SEO levels the playing field, allowing smaller businesses to compete with established brands in search results.',
  },
  {
    title: 'High-Intent Lead Generation',
    summary: 'Organic search attracts users actively seeking solutions, delivering leads more likely to convert than broad marketing.',
  },
  {
    title: 'Cost-Effective Growth',
    summary: 'SEO provides long-term traffic without the recurring costs of paid ads, making it ideal for sustainable business expansion.',
  },
  {
    title: 'Market Entry Strategy',
    summary: 'SMEs can use SEO to establish presence in new regions or niches, building local or industry-specific authority.',
  },
  {
    title: 'Trust & Credibility',
    summary: 'Consistent search rankings signal reliability, helping new or small brands build trust with potential customers.',
  },
  {
    title: 'Scalable Visibility',
    summary: 'Content-driven SEO grows reach organically over time, scaling with your business without proportional cost increases.',
  },
]

// ======================
// 3D hero model component
// ======================
function HeroModel() {
  const group = useRef()
  const { scene } = useGLTF(modelPath)

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += Math.min(delta, 0.03) * 0.35
    }
  })

  return (
    <group ref={group} rotation={[0, 0, 0]} dispose={null}>
      <primitive object={scene} scale={1.02} position={[0, -0.04, 0]} />
    </group>
  )
}

// ======================
// Hero 3D scene container
// ======================
function HeroScene() {
  return (
    <Canvas
      className="hero-canvas"
      camera={{
        position: [0, 0, 8],
        fov: 45,
        near: 0.1,
        far: 1000,
      }}
      gl={{
        alpha: true,
        antialias: true,
      }}
    >
      <ambientLight intensity={1} />

      <directionalLight
        intensity={1}
        position={[3, 3, 3]}
      />

      <directionalLight
        intensity={0.5}
        position={[-3, 2, -2]}
      />

      <Suspense fallback={null}>
        <HeroModel />
      </Suspense>
    </Canvas>
  )
}
useGLTF.preload(modelPath)

// ======================
// Main application component
// ======================
function App() {
  const [email, setEmail] = useState('')
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)
  const [newsletterError, setNewsletterError] = useState('')
  const [waitlistError, setWaitlistError] = useState('')
  const [showNewsletterPrompt, setShowNewsletterPrompt] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    // Load theme from localStorage or default to 'light'
    const savedTheme = localStorage.getItem('sereya-theme')
    return savedTheme || 'light'
  })
  const [typedSeoHeading, setTypedSeoHeading] = useState('')
  const [typedSeoSubtext, setTypedSeoSubtext] = useState('')
  const [seoHeadingComplete, setSeoHeadingComplete] = useState(false)

  useEffect(() => {
    if (!isSubmitted) return undefined
    const timer = setTimeout(() => setIsSubmitted(false), 15000)
    return () => clearTimeout(timer)
  }, [isSubmitted])

  // Apply theme to document and persist to localStorage
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('sereya-theme', theme)
  }, [theme])

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal, .reveal-item')
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      revealElements.forEach((element) => element.classList.add('visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          } else {
            entry.target.classList.remove('visible')
          }
        })
      },
      {
        threshold: 0.15,
      }
    )

    revealElements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const headingText = 'What SEO Actually Delivers'
    const summaryText = 'These outcomes show how search growth supports real business results.'
    let headingIndex = 0
    let summaryIndex = 0
    let summaryTimer = null

    const headingTimer = setInterval(() => {
      headingIndex += 1
      setTypedSeoHeading(headingText.slice(0, headingIndex))
      if (headingIndex >= headingText.length) {
        clearInterval(headingTimer)
        setSeoHeadingComplete(true)
        setTimeout(() => {
          summaryTimer = setInterval(() => {
            summaryIndex += 1
            setTypedSeoSubtext(summaryText.slice(0, summaryIndex))
            if (summaryIndex >= summaryText.length) {
              clearInterval(summaryTimer)
            }
          }, 30)
        }, 150)
      }
    }, 55)

    return () => {
      clearInterval(headingTimer)
      if (summaryTimer) clearInterval(summaryTimer)
    }
  }, [])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!email.trim()) return

    console.log('Submitting waitlist email:', email.trim().toLowerCase())
    setWaitlistError('')
    setIsSubmitted(false)

    const emailValue = email.trim().toLowerCase()
    const { error } = await supabase.from('waitlist').insert([{ email: emailValue }])

    if (error) {
      console.error('Waitlist submission error:', error)
      setWaitlistError(error.message || 'Unable to join waitlist right now. Please try again later.')
      return
    }

    console.log('Waitlist submission successful')
    setIsSubmitted(true)
    setEmail('')
    setShowNewsletterPrompt(true)
  }

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault()
    if (!newsletterEmail.trim()) return

    setNewsletterError('')
    setNewsletterSubmitted(false)

    const email = newsletterEmail.trim().toLowerCase()
    const { error } = await supabase.from('newsletter_subscriptions').insert([{ email }])

    if (error) {
      setNewsletterError(error.message || 'Unable to subscribe right now. Please try again later.')
      return
    }

    setNewsletterSubmitted(true)
    setNewsletterEmail('')


  }

       // ======================
    // Scroll event listener for topbar background change
    // ======================
  const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 40);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
  }, []);

  return (
    // ======================
    // Page shell
    // ======================
    <main className="page-shell">
      {/* ======================
          Navbar / dynamic island section
      ====================== */}
      <header className={`nav-island ${scrolled ? 'nav-island--scrolled' : ''}`}>
        <div className="nav-island__inner">
          <a href="/" className="nav-island__brand" aria-label="Sereya home">
            <img src={logo} alt="" className="nav-island__logo" />
            <span className="nav-island__name">Sereya</span>
          </a>

          <nav className="nav-island__links" aria-label="Primary">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav-island__actions">
            <button
              type="button"
              className="theme-toggle"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title={`${theme === 'light' ? 'Dark' : 'Light'} mode`}
              onClick={toggleTheme}
            >
            {theme === 'light' ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {/* Moon icon */}
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {/* Sun icon */}
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
            </button>
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
          </div>
        </header>
        {/* ======================
            App container
        ====================== */}
        <section className="waitlist-app">
          {/* ======================
              Mobile menu section
          ====================== */}
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

          <div className="page-container">
        <section className="hero-block reveal">
          <img src={logo} alt="" aria-hidden="true" className="hero-deco-logo" />
          <div className="container">            
            <div className="hero-inner-grid reveal-group">

            {/* ======================
                  3D model container
              ====================== */}
              <div className="hero-model-panel reveal-item" aria-hidden="true">
                <div className="hero-3d-canvas">
                  <HeroScene />
                </div>
              </div>
              <div className="hero-headline-wrap reveal-item">
                
                {/* ======================
                    Hero headline and CTA group
                ====================== */}
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
                {waitlistError && (
                  <p className="waitlist-error" role="alert">
                    {waitlistError}
                  </p>
                )}
                {isSubmitted && (
                  <p className="waitlist-success" role="status">
                    THANK YOU FOR JOINING THE WAITLIST! WE'LL BE IN TOUCH WITH UPDATES AND EARLY ACCESS DETAILS.
                  </p>
                )}
                {showNewsletterPrompt && (
                  <div className="newsletter-prompt">
                    <p>Would you like to subscribe to our newsletter for updates?</p>
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
                    {newsletterError && (
                      <p className="newsletter-error" role="alert">
                        {newsletterError}
                      </p>
                    )}
                    {newsletterSubmitted && (
                      <p className="newsletter-note" role="status">
                        Thanks! Your email has been submitted to the newsletter list.
                      </p>
                    )}
                  </div>
                )}
              </div>


            </div>

            {/* ======================
                SEO outcomes section
            ====================== */}
            <section className="seo-outcomes reveal" aria-labelledby="seo-outcomes-heading">
              <div className="section-header">
                <h2 id="seo-outcomes-heading" className="typing-heading">{typedSeoHeading}</h2>
                <p className="typing-text">{seoHeadingComplete ? typedSeoSubtext : ''}</p>
              </div>

              <div className="seo-grid">
                {seoContent.map((item) => (
                  <article key={item.id} className="seo-card reveal-item">
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                    <a href="/articles.html" className="btn btn-secondary">
                      Read More
                    </a>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>

        {/* ======================
            Feature grid section
        ====================== */}
        <section id="features" className="feature-grid reveal" aria-label="Sereya capabilities">
          <div className="container">
            {featureCards.map((card) => (
              <article key={card.title} className="feature-card reveal-item">
                <img src={card.image} alt={card.title} className="feature-image" />
                <h2>{card.title}</h2>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ======================
            B2B / SME SEO importance section
        ====================== */}
        <section className="seo-importance reveal" aria-labelledby="seo-importance-heading">
          <div className="container">
            <div className="section-header">
              <h2 id="seo-importance-heading">Why SEO Matters for B2B & SMEs</h2>
              <p>Discover how search optimization empowers businesses of all sizes to thrive in competitive markets.</p>
            </div>

            <div className="seo-importance-grid">
              {seoImportance.map((item, index) => (
                <article key={index} className="seo-importance-card">
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ======================
            Support section
        ====================== */}
        <section id="support" className="support-section reveal" aria-label="Support">
          <div className="container">
            <h3>Support</h3>
            <p>Need help with onboarding or the SEREYA waitlist?</p>
            <p>
              Email: <a href={`mailto:${SUPPORT_EMAIL}`}>support@sereya.com</a>
            </p>
            <p>
              Phone: <a href="tel:+254794083470">Call Support</a>
            </p>
          </div>
        </section>

        {/* ======================
            Newsletter section
        ====================== */}
        <section className="newsletter-section reveal" aria-label="Newsletter">
          <div className="container">
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
            {newsletterError && (
              <p className="newsletter-error" role="alert">
                {newsletterError}
              </p>
            )}
            {newsletterSubmitted && (
              <p className="newsletter-note" role="status">
                Thanks! Your email has been submitted to the newsletter list.
              </p>
            )}
          </div>
        </section>

        {/* ======================
            Footer section
        ====================== */}
        <footer className="site-footer reveal">
          <div className="container">
            <div className="footer-brand">
              <img src={logo} alt="Sereya" className="brand-logo" />
              <span>SEREYA</span>
            </div>
            <p>Analyze. Predict. Create.</p>
            <small>{new Date().getFullYear()} Sereya. All rights reserved.</small>
          </div>
        </footer>
        </div>
      </section>
    </main>
  )
}

export default App
