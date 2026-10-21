import { useEffect, useRef, useState } from 'react'

const GLYPHS = '01<>/\\[]{}=+*#$%&?_-'

// Cycles through `words`, "decoding" each one from random glyphs.
export default function ScrambleText({ words, interval = 2600, className = '' }) {
  const [chars, setChars] = useState(() => [...words[0]].map((ch) => ({ ch, scrambling: false })))
  const current = useRef(words[0])

  useEffect(() => {
    if (words.length < 2) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let index = 0
    let frame = 0
    let timer = 0

    const scrambleTo = (target) => {
      const from = current.current
      const length = Math.max(from.length, target.length)
      const queue = Array.from({ length }, (_, i) => {
        const start = Math.floor(Math.random() * 14)
        return { from: from[i] || '', to: target[i] || '', start, end: start + 6 + Math.floor(Math.random() * 14), glyph: '' }
      })
      let tick = 0

      const update = () => {
        let done = 0
        const next = queue.map((q) => {
          if (tick >= q.end) {
            done++
            return { ch: q.to, scrambling: false }
          }
          if (tick >= q.start) {
            if (!q.glyph || Math.random() < 0.3) q.glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            return { ch: q.glyph, scrambling: true }
          }
          return { ch: q.from, scrambling: false }
        })
        setChars(next.filter((c) => c.ch !== ''))
        if (done === queue.length) {
          current.current = target
          timer = setTimeout(advance, interval)
        } else {
          tick++
          frame = requestAnimationFrame(update)
        }
      }
      update()
    }

    const advance = () => {
      index = (index + 1) % words.length
      if (reduce) {
        current.current = words[index]
        setChars([...words[index]].map((ch) => ({ ch, scrambling: false })))
        timer = setTimeout(advance, interval)
      } else {
        scrambleTo(words[index])
      }
    }

    timer = setTimeout(advance, interval)
    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(frame)
    }
  }, [words, interval])

  return (
    <span className={`scramble ${className}`} aria-label={words.join(', ')}>
      <span aria-hidden="true">
        {chars.map((c, i) => (
          <span key={i} className={c.scrambling ? 'scramble-glyph' : undefined}>
            {c.ch}
          </span>
        ))}
      </span>
      <span className="scramble-caret" aria-hidden="true" />
    </span>
  )
}
