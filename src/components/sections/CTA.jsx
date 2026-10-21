import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cta } from '../../content/home'
import Reveal from '../effects/Reveal'
import MaskText from '../effects/MaskText'
import Magnetic from '../effects/Magnetic'

export default function CTA() {
  return (
    <section className="section cta-section">
      <div className="container">
        <Reveal className="cta-card">
          <div className="dot-grid" aria-hidden="true" />
          <div className="cta-orb" aria-hidden="true" />
          <span className="eyebrow">{cta.eyebrow}</span>
          <MaskText as="h2" className="cta-title" inView lines={[cta.title]} />
          <p className="lead cta-sub">{cta.subtitle}</p>
          <Magnetic strength={0.4}>
            <Link to={cta.button.to} className="btn btn-primary btn-lg">
              {cta.button.label} <ArrowRight />
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  )
}
