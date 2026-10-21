import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

// A card that tilts in 3D toward the cursor, with a light that follows it.
export default function TiltCard({ children, className = '', max = 7, ...props }) {
  const ref = useRef(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const spring = { stiffness: 160, damping: 18 }
  const rx = useSpring(rotateX, spring)
  const ry = useSpring(rotateY, spring)

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    rotateY.set((px - 0.5) * max * 2)
    rotateX.set((0.5 - py) * max * 2)
    ref.current.style.setProperty('--mx', `${px * 100}%`)
    ref.current.style.setProperty('--my', `${py * 100}%`)
  }
  const reset = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`tilt-card ${className}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      {...props}
    >
      {children}
    </motion.div>
  )
}
