// Endless horizontal scroller. Children are rendered twice for a seamless loop.
export default function Marquee({ children, duration = 40, reverse = false, className = '' }) {
  return (
    <div className={`marquee ${reverse ? 'marquee-reverse' : ''} ${className}`} style={{ '--duration': `${duration}s` }}>
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy} aria-hidden={copy === 1 || undefined}>
            {children}
          </div>
        ))}
      </div>
    </div>
  )
}
