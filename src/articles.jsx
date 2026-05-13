import ReactDOM from 'react-dom/client'
import { seoContent } from './data/seoContent'
import './App.css'

function Articles() {
  return (
    <main className="page-shell">
      <section className="articles-page">
        <div className="articles-container">
          <header className="articles-header">
            <h1>SEO Insights</h1>
            <p>Explore the real outcomes that strong search performance drives for businesses.</p>
          </header>

          {seoContent.map((item) => (
            <article key={item.id} className="article-card">
              <h2>{item.title}</h2>
              <p>{item.content}</p>
            </article>
          ))}

          <div className="articles-actions">
            <a href="/" className="btn btn-primary">
              Back to home
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Articles />)
