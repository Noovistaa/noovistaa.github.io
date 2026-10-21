import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { process } from '../../content/about'
import Reveal from '../effects/Reveal'

// Timeline whose line "charges up" as you scroll through the steps.
export default function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.55'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section className="section">
      <div className="container process-grid">
        <div>
          <Reveal className="process-intro">
            <span className="eyebrow">{process.eyebrow}</span>
            <h2>{process.title}</h2>
          </Reveal>
        </div>
        <div className="process-steps" ref={ref}>
          <div className="process-line" aria-hidden="true">
            <motion.div className="process-line-fill" style={{ scaleY }} />
          </div>
          {process.steps.map((step, i) => (
            <Reveal key={step.title} className="process-step">
              <span className="process-node" aria-hidden="true" />
              <span className="process-num">Step {String(i + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p className="muted">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
