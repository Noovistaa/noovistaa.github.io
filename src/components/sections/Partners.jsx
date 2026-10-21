import { partners, technologies } from '../../content/partners'
import { partnersSection } from '../../content/home'
import { asset } from '../../utils/asset'
import Marquee from '../effects/Marquee'
import Reveal from '../effects/Reveal'

const shapes = ['circle', 'square', 'diamond', 'ring']

export default function Partners() {
  return (
    <section className="partners">
      <Reveal className="container partners-head">
        <span className="eyebrow">{partnersSection.eyebrow}</span>
        <p className="partners-title">{partnersSection.title}</p>
      </Reveal>

      <Marquee duration={38}>
        {partners.map((p, i) => (
          <div className="partner" key={p.name + i}>
            {p.logo ? (
              <img src={asset(p.logo)} alt={p.name} className="partner-logo" />
            ) : (
              <span className="partner-word">
                <span className={`partner-shape ${shapes[i % shapes.length]}`} />
                {p.name}
              </span>
            )}
          </div>
        ))}
      </Marquee>

      <p className="sr-only">{partnersSection.techTitle}</p>
      <Marquee duration={55} reverse className="tech-marquee">
        {technologies.map((t) => (
          <span className="tech-chip" key={t}>
            {t}
          </span>
        ))}
      </Marquee>
    </section>
  )
}
