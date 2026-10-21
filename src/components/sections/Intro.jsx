import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { intro } from '../../content/home'
import { services } from '../../content/services'
import Reveal from '../effects/Reveal'
import SpotlightGroup from '../effects/SpotlightGroup'
import Icon from '../ui/Icon'

// "About us" teaser + the services bento grid.
export default function Intro() {
  return (
    <section className="section intro">
      <div className="container">
        <div className="intro-grid">
          <Reveal>
            <span className="eyebrow">{intro.eyebrow}</span>
            <h2>{intro.title}</h2>
          </Reveal>
          <Reveal delay={0.1} className="intro-body">
            <p className="lead">{intro.body}</p>
            <Link to={intro.link.to} className="link-arrow">
              {intro.link.label} <ArrowRight />
            </Link>
          </Reveal>
        </div>

        <SpotlightGroup className="services-grid">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06} className={`spotlight service-card ${s.wide ? 'is-wide' : ''}`}>
              <div className="service-top">
                <span className="service-icon">
                  <Icon name={s.icon} size={22} />
                </span>
                <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3>{s.title}</h3>
              <p className="muted">{s.description}</p>
              <div className="service-tags">
                {s.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </SpotlightGroup>
      </div>
    </section>
  )
}
