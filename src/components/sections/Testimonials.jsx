import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValue } from 'motion/react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials } from '../../content/testimonials'
import { testimonialsSection } from '../../content/home'
import Reveal from '../effects/Reveal'
import Avatar from '../ui/Avatar'

const DURATION = 7 // seconds per quote

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const progress = useMotionValue(0)
  const controls = useRef(null)
  const paused = useRef(false)
  const count = testimonials.length

  const go = (step) => setIndex((i) => (i + step + count) % count)

  // Auto-advance; the active bar fills while each quote is shown.
  useEffect(() => {
    if (count < 2) return
    progress.set(0)
    const c = animate(progress, 1, { duration: DURATION, ease: 'linear', onComplete: () => go(1) })
    if (paused.current) c.pause()
    controls.current = c
    return () => c.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, count])

  const pause = () => {
    paused.current = true
    controls.current?.pause()
  }
  const resume = () => {
    paused.current = false
    controls.current?.play()
  }

  if (count === 0) return null
  const t = testimonials[index]

  return (
    <section className="section testimonials">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow">{testimonialsSection.eyebrow}</span>
            <h2>{testimonialsSection.title}</h2>
          </div>
          {count > 1 && (
            <div className="t-controls">
              <button className="icon-btn" onClick={() => go(-1)} aria-label="Previous testimonial">
                <ChevronLeft />
              </button>
              <span className="t-count">
                {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </span>
              <button className="icon-btn" onClick={() => go(1)} aria-label="Next testimonial">
                <ChevronRight />
              </button>
            </div>
          )}
        </Reveal>

        <Reveal className="t-stage" delay={0.1}>
          <div onPointerEnter={pause} onPointerLeave={resume}>
            <Quote className="t-mark" aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                className="t-figure"
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <blockquote className="t-quote">“{t.quote}”</blockquote>
                <figcaption className="t-author">
                  <Avatar name={t.name} photo={t.photo} size={52} />
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            {count > 1 && (
              <div className="t-bars">
                {testimonials.map((_, i) => (
                  <button key={i} className="t-bar" onClick={() => setIndex(i)} aria-label={`Show testimonial ${i + 1}`}>
                    <motion.span
                      className="t-bar-fill"
                      style={{ scaleX: i === index ? progress : i < index ? 1 : 0 }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
