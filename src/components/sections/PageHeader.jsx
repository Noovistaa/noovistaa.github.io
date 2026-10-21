import { motion } from 'motion/react'
import MaskText from '../effects/MaskText'

// The big title block at the top of the About, Projects and Contact pages.
export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="page-header">
      <div className="dot-grid" aria-hidden="true" />
      <div className="page-header-orb" aria-hidden="true" />
      <div className="container">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {eyebrow}
        </motion.span>
        <MaskText as="h1" className="page-title" lines={[title]} delay={0.15} />
        {subtitle && (
          <motion.p
            className="lead page-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
