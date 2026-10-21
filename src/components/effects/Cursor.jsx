import { useEffect, useRef, useState } from 'react'

// A ring that trails the mouse and grows over links and buttons,
// plus a soft glow that follows a little more slowly. Hidden on touch screens.
export default function Cursor() {
  const ringRef = useRef(null)
  const glowRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(fine && !reduce)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const ring = ringRef.current
    const glow = glowRef.current
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let rx = x
    let ry = y
    let gx = x
    let gy = y
    let frame = 0

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      ring.classList.add('is-visible')
    }
    const onOver = (e) => {
      const interactive = e.target.closest('a, button, [role="button"], input, textarea, select, [data-cursor]')
      ring.classList.toggle('is-hover', Boolean(interactive))
    }
    const onLeave = () => ring.classList.remove('is-visible')
    const onDown = () => ring.classList.add('is-down')
    const onUp = () => ring.classList.remove('is-down')

    const loop = () => {
      rx += (x - rx) * 0.22
      ry += (y - ry) * 0.22
      gx += (x - gx) * 0.07
      gy += (y - gy) * 0.07
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      glow.style.transform = `translate3d(${gx}px, ${gy}px, 0) translate(-50%, -50%)`
      frame = requestAnimationFrame(loop)
    }
    loop()

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <>
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
