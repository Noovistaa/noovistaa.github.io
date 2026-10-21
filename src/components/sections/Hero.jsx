import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { hero } from '../../content/home'
import CircuitGrid from '../effects/CircuitGrid'
import ScrambleText from '../effects/ScrambleText'
import MaskText from '../effects/MaskText'
import Magnetic from '../effects/Magnetic'

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  return (
    <section className="hero">
      <CircuitGrid />
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />

      <div className="container hero-inner">
        <motion.div className="hero-badge" {...fadeUp(0.1)}>
          <span className="pulse-dot" />
          {hero.availability}
        </motion.div>

        <MaskText
          as="h1"
          className="hero-title"
          delay={0.2}
          lines={[hero.titleStart, <ScrambleText words={hero.rotatingWords} className="accent-text" />]}
        />

        <motion.p className="lead hero-sub" {...fadeUp(0.5)}>
          {hero.subtitle}
        </motion.p>

        <motion.div className="hero-ctas" {...fadeUp(0.65)}>
          <Magnetic>
            <Link to={hero.primaryCta.to} className="btn btn-primary">
              {hero.primaryCta.label} <ArrowRight />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link to={hero.secondaryCta.to} className="btn btn-ghost">
              {hero.secondaryCta.label}
            </Link>
          </Magnetic>
        </motion.div>
      </div>

      <motion.div className="container hero-meta" {...fadeUp(1)}>
        <span className="hero-meta-label">{hero.eyebrow}</span>
        <span className="hero-scroll">
          Scroll <ArrowDown size={14} />
        </span>
      </motion.div>
    </section>
  )
}
