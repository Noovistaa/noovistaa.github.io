import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

// Big statement whose words light up one by one as you scroll.
// Words wrapped in *asterisks* get the accent color.
export default function ScrollWords({ text, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')

  return (
    <p ref={ref} className={`scroll-words ${className}`}>
      {words.map((raw, i) => {
        const match = raw.match(/^\*(.+?)\*(.*)$/)
        const word = match ? match[1] + match[2] : raw
        const range = [i / words.length, (i + 1) / words.length]
        return (
          <Word key={i} progress={scrollYProgress} range={range} highlight={Boolean(match)}>
            {word}
          </Word>
        )
      })}
    </p>
  )
}

function Word({ children, progress, range, highlight }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <span className="scroll-word">
      <motion.span style={{ opacity }} className={highlight ? 'accent-text' : undefined}>
        {children}
      </motion.span>
    </span>
  )
}
