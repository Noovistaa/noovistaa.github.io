import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Page from '../components/layout/Page'
import ScrambleText from '../components/effects/ScrambleText'

const words = ['404', 'Signal lost', '404']

export default function NotFound() {
  return (
    <Page title="Page not found">
      <section className="not-found">
        <div className="dot-grid" aria-hidden="true" />
        <div className="container">
          <h1 className="not-found-title">
            <ScrambleText words={words} interval={1800} className="accent-text" />
          </h1>
          <p className="lead">This page doesn’t exist — or it was moved.</p>
          <Link to="/" className="btn btn-primary">
            Back to home <ArrowRight />
          </Link>
        </div>
      </section>
    </Page>
  )
}
