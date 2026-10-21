import { stats } from '../../content/home'
import Counter from '../effects/Counter'
import Reveal from '../effects/Reveal'

export default function Stats() {
  return (
    <section className="stats">
      <div className="container stats-grid">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="stat">
            <div className="stat-value">
              <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
            </div>
            <p className="stat-label">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
