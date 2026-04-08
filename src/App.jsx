import logo from './assets/logo-nobg.png'
import heroPreview from './assets/hero.png'
import './App.css'

const featureCards = [
  {
    title: 'Analyze',
    description:
      'Sereya observes your website and reveals trends, market shifts, and ranking behavior in one simple dashboard.',
    image: heroPreview,
  },
  {
    title: 'Prediction',
    description:
      'It predicts what matters next so your team can prioritize high-impact improvements with confidence.',
    image: heroPreview,
  },
  {
    title: 'Create',
    description:
      'AI-powered growth recommendations guide your next actions to keep your momentum moving forward.',
    image: heroPreview,
  },
]

function App() {
  return (
    <main className="page-shell">
      <section className="waitlist-app">
        <header className="topbar">
          <div className="brand-row">
            <img src={logo} alt="Sereya" className="brand-logo" />
            <span className="brand-name">Sereya</span>
          </div>

          <nav className="top-nav" aria-label="Primary">
            <a href="#">Features</a>
            <a href="#">Learn more</a>
            <a href="#">Support</a>
          </nav>

          <div className="top-icons" aria-hidden="true">
            <span>?</span>
            <span>?</span>
          </div>
        </header>

        <section className="hero-block">
          <div className="hero-headline-wrap">
            <h1>Analyze, Predict, Create</h1>
            <div className="hero-actions">
              <button type="button" className="btn btn-primary">
                Get Started
              </button>
              <button type="button" className="btn btn-ghost">
                Secondary
              </button>
            </div>
          </div>

          <div className="hero-preview" role="img" aria-label="Sereya dashboard preview">
            <img src={heroPreview} alt="Dashboard preview" />
          </div>
        </section>

        <section className="feature-grid" aria-label="Sereya capabilities">
          {featureCards.map((card) => (
            <article key={card.title} className="feature-card">
              <img src={card.image} alt={card.title} className="feature-image" />
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </article>
          ))}
        </section>
      </section>
    </main>
  )
}

export default App
