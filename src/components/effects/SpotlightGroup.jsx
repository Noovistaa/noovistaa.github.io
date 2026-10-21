// Wrap a grid of `.spotlight` cards: a glow follows the mouse across all of them,
// lighting up the borders of nearby cards (styles in global.css).
export default function SpotlightGroup({ children, className = '' }) {
  const onMove = (e) => {
    for (const card of e.currentTarget.querySelectorAll('.spotlight')) {
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${e.clientX - r.left}px`)
      card.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
  }
  return (
    <div className={`spotlight-group ${className}`} onPointerMove={onMove}>
      {children}
    </div>
  )
}
