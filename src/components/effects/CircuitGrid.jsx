import { useEffect, useRef } from 'react'

// Animated hero background: a breadboard-style dot grid.
// Dots light up around the cursor, and "signals" race along the grid lines,
// lighting up each node they pass. Colors come from --accent-rgb in theme.css.

const SPACING = 30
const MOUSE_RADIUS = 170
const TRAIL = 16

export default function CircuitGrid() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim() || '92, 242, 196'

    let width = 0
    let height = 0
    let cols = 0
    let rows = 0
    let glow = new Float32Array(0)
    let pulses = []
    let frame = 0
    let visible = true
    const mouse = { x: -9999, y: -9999, sx: -9999, sy: -9999 }

    const randInt = (n) => Math.floor(Math.random() * n)

    function makePulse() {
      const horizontal = Math.random() < 0.5
      const dir = Math.random() < 0.5 ? 1 : -1
      return {
        gx: randInt(cols),
        gy: randInt(rows),
        dx: horizontal ? dir : 0,
        dy: horizontal ? 0 : dir,
        t: 0,
        speed: 0.05 + Math.random() * 0.07,
        life: 12 + randInt(30),
        trail: [],
      }
    }

    function resize() {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(width / SPACING) + 1
      rows = Math.ceil(height / SPACING) + 1
      glow = new Float32Array(cols * rows)
      const count = Math.max(6, Math.min(22, Math.round((cols * rows) / 110)))
      pulses = Array.from({ length: count }, makePulse)
    }

    function stepPulse(p) {
      p.t += p.speed
      if (p.t >= 1) {
        p.t = 0
        p.gx += p.dx
        p.gy += p.dy
        p.life -= 1
        if (p.gx >= 0 && p.gx < cols && p.gy >= 0 && p.gy < rows) glow[p.gy * cols + p.gx] = 1
        // occasionally turn 90°, like a PCB trace
        if (Math.random() < 0.28) {
          const sign = Math.random() < 0.5 ? 1 : -1
          ;[p.dx, p.dy] = p.dx !== 0 ? [0, sign] : [sign, 0]
        }
      }
      const x = (p.gx + p.dx * p.t) * SPACING
      const y = (p.gy + p.dy * p.t) * SPACING
      p.trail.push(x, y)
      if (p.trail.length > TRAIL * 2) p.trail.splice(0, 2)
      const outside = x < -SPACING || y < -SPACING || x > width + SPACING || y > height + SPACING
      if (p.life <= 0 || outside) Object.assign(p, makePulse())
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)
      mouse.sx += (mouse.x - mouse.sx) * 0.12
      mouse.sy += (mouse.y - mouse.sy) * 0.12

      // 1. base dots
      ctx.fillStyle = 'rgba(255,255,255,0.09)'
      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) ctx.fillRect(gx * SPACING - 0.75, gy * SPACING - 0.75, 1.5, 1.5)
      }

      // 2. lit dots (near the cursor, or recently touched by a signal)
      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          const i = gy * cols + gx
          const x = gx * SPACING
          const y = gy * SPACING
          const d = Math.hypot(x - mouse.sx, y - mouse.sy)
          const m = d < MOUSE_RADIUS ? 1 - d / MOUSE_RADIUS : 0
          const g = glow[i]
          if (g > 0.01) glow[i] = g * 0.94
          const intensity = Math.min(1, m * m * 0.9 + g)
          if (intensity < 0.03) continue
          const size = 1.5 + intensity * 2.2
          ctx.fillStyle = `rgba(${accent},${0.15 + intensity * 0.75})`
          ctx.fillRect(x - size / 2, y - size / 2, size, size)
        }
      }

      // 3. signals with fading trails
      ctx.lineCap = 'round'
      for (const p of pulses) {
        if (!reduceMotion) stepPulse(p)
        const tr = p.trail
        const n = tr.length / 2
        for (let k = 1; k < n; k++) {
          ctx.strokeStyle = `rgba(${accent},${(k / n) * 0.7})`
          ctx.lineWidth = 1.4
          ctx.beginPath()
          ctx.moveTo(tr[(k - 1) * 2], tr[(k - 1) * 2 + 1])
          ctx.lineTo(tr[k * 2], tr[k * 2 + 1])
          ctx.stroke()
        }
        if (n > 0) {
          const hx = tr[(n - 1) * 2]
          const hy = tr[(n - 1) * 2 + 1]
          ctx.fillStyle = `rgba(${accent},0.18)`
          ctx.beginPath()
          ctx.arc(hx, hy, 6, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = `rgba(${accent},1)`
          ctx.beginPath()
          ctx.arc(hx, hy, 1.8, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    function loop() {
      if (visible) draw()
      frame = requestAnimationFrame(loop)
    }

    function onPointerMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      if (mouse.sx < -999) {
        mouse.sx = mouse.x
        mouse.sy = mouse.y
      }
    }

    function onPointerLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }

    // Reduced motion: one still frame with a few lit nodes, redrawn on resize.
    function drawStatic() {
      for (let i = 0; i < 40; i++) glow[randInt(glow.length)] = 0.6
      draw()
    }

    resize()
    const resizeObserver = new ResizeObserver(() => {
      resize()
      if (reduceMotion) drawStatic()
    })
    resizeObserver.observe(canvas)
    const visibilityObserver = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    visibilityObserver.observe(canvas)

    if (reduceMotion) {
      drawStatic()
    } else {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      document.addEventListener('pointerleave', onPointerLeave)
      loop()
    }

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="circuit-grid" aria-hidden="true" />
}
