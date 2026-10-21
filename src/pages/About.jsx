// The About page. Text lives in src/content/about.js.
import { aboutHeader, story, values } from '../content/about'
import Page from '../components/layout/Page'
import PageHeader from '../components/sections/PageHeader'
import Mission from '../components/sections/Mission'
import Process from '../components/sections/Process'
import CTA from '../components/sections/CTA'
import Reveal from '../components/effects/Reveal'
import SpotlightGroup from '../components/effects/SpotlightGroup'
import Icon from '../components/ui/Icon'

export default function About() {
  return (
    <Page title="About">
      <PageHeader {...aboutHeader} />

      <section className="section section-flush-top">
        <div className="container story-grid">
          <Reveal className="story-intro">
            <span className="eyebrow">{story.eyebrow}</span>
            <h2>{story.title}</h2>
          </Reveal>
          <div className="story-body">
            {story.paragraphs.map((text, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className={i === 0 ? 'story-first' : 'lead'}>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Mission />

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">What we value</span>
              <h2>How we work with you</h2>
            </div>
          </Reveal>
          <SpotlightGroup className="values-grid">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06} className="spotlight value-card">
                <span className="service-icon">
                  <Icon name={v.icon} size={22} />
                </span>
                <h3>{v.title}</h3>
                <p className="muted">{v.description}</p>
              </Reveal>
            ))}
          </SpotlightGroup>
        </div>
      </section>

      <Process />

      <CTA />
    </Page>
  )
}
