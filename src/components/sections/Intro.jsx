import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { intro } from '../../content/home'
import { serviceGroups } from '../../content/services'
import Reveal from '../effects/Reveal'
import SpotlightGroup from '../effects/SpotlightGroup'
import Icon from '../ui/Icon'

// The "About us" section: intro text, then the service groups (from src/content/services.js).
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
            <div className="intro-links">
              <Link to={intro.link.to} className="link-arrow">
                {intro.link.label} <ArrowRight />
              </Link>
              <Link to={intro.teamLink.to} className="link-arrow">
                {intro.teamLink.label} <ArrowRight />
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal className="subsection-label subsection-row">
          <span>{intro.servicesLabel}</span>
          <Link to="/services" className="subsection-link">
            All services <ArrowRight size={14} />
          </Link>
        </Reveal>
        <SpotlightGroup className="services-grid">
          {serviceGroups.map((group, i) => (
            <Reveal key={group.id} delay={i * 0.06}>
              <Link to={`/services#${group.id}`} className="spotlight service-card">
                <div className="service-top">
                  <span className="service-icon">
                    <Icon name={group.icon} size={22} />
                  </span>
                  <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3>{group.name}</h3>
                <p className="muted">{group.intro}</p>
                <ul className="service-card-list">
                  {group.services.map((s) => (
                    <li key={s.slug}>{s.title}</li>
                  ))}
                </ul>
                <span className="service-card-more">
                  Explore {group.name} <ArrowRight size={16} />
                </span>
              </Link>
            </Reveal>
          ))}
        </SpotlightGroup>
      </div>
    </section>
  )
}
