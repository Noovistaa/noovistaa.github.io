import { mission } from '../../content/home'
import ScrollWords from '../effects/ScrollWords'
import Reveal from '../effects/Reveal'

export default function Mission() {
  return (
    <section className="section mission">
      <div className="mission-glow" aria-hidden="true" />
      <div className="container mission-inner">
        <Reveal>
          <span className="eyebrow">{mission.eyebrow}</span>
        </Reveal>
        <ScrollWords text={mission.statement} />
        <Reveal className="mission-sign">
          <span className="mission-line" />
          {mission.signature}
        </Reveal>
      </div>
    </section>
  )
}
