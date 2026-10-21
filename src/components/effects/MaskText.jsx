import { motion } from 'motion/react'

// Headline reveal: each line slides up from behind an invisible mask.
// Pass `lines` as an array of strings (or React nodes).
// inView = true waits until the headline scrolls into view; otherwise it plays on load.
export default function MaskText({ lines, as = 'h1', className, delay = 0, inView = false }) {
  const Tag = motion[as]
  const trigger = inView
    ? { whileInView: 'show', viewport: { once: true, margin: '-60px' } }
    : { animate: 'show' }
  return (
    <Tag className={className} initial="hidden" {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className="mask-line">
          <motion.span
            className="mask-line-inner"
            variants={{
              hidden: { y: '110%' },
              show: { y: '0%', transition: { duration: 1, delay: delay + i * 0.1, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
