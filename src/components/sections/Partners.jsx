import { expertise, partners } from '../../content/partners'
import { partnersSection } from '../../content/home'
import { asset } from '../../utils/asset'
import Marquee from '../effects/Marquee'
import Reveal from '../effects/Reveal'

// The strip needs enough logos to fill even very wide screens, so a short list is repeated.
const MIN_LOGOS = 12
const SECONDS_PER_LOGO = 5 // higher = slower scrolling

export default function Partners() {
  const repeats = partners.length ? Math.ceil(MIN_LOGOS / partners.length) : 0
  const strip = Array.from({ length: repeats }, () => partners).flat()

  return (
    <section className="partners">
      {partners.length > 0 && (
        <>
          <Reveal className="container partners-head">
            <span className="eyebrow">{partnersSection.eyebrow}</span>
            <p className="partners-title">{partnersSection.title}</p>
          </Reveal>

          <Marquee duration={strip.length * SECONDS_PER_LOGO}>
            {strip.map((p, i) => (
              <div className="partner" key={p.name + i}>
                {p.logo ? (
                  <span className="partner-mark">
                    <img src={asset(p.logo)} alt={p.showName ? '' : p.name} className="partner-logo" />
                    {p.showName && <span className="partner-word">{p.name}</span>}
                  </span>
                ) : (
                  <span className="partner-word">{p.name}</span>
                )}
              </div>
            ))}
          </Marquee>
        </>
      )}

      <p className="sr-only">{partnersSection.techTitle}</p>
      <Marquee duration={60} reverse className="tech-marquee">
        {expertise.map((field) => (
          <span className="tech-chip" key={field}>
            {field}
          </span>
        ))}
      </Marquee>
    </section>
  )
}
