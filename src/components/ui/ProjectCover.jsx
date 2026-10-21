import { useMemo } from 'react'
import { asset, seededRandom } from '../../utils/asset'

// Shows the project's image, or — if it has none — a generated illustration:
// circuit-board art for hardware projects, code art for software projects.
export default function ProjectCover({ project }) {
  if (project.image) {
    return (
      <div className="cover">
        <img src={asset(project.image)} alt={project.title} loading="lazy" />
      </div>
    )
  }
  const hardware = /hardware|embedded|pcb|fpga|electronic|robot/i.test(project.category)
  return <div className="cover cover-generated">{hardware ? <CircuitArt seed={project.slug} /> : <CodeArt seed={project.slug} />}</div>
}

function CircuitArt({ seed }) {
  const art = useMemo(() => {
    const rand = seededRandom(seed)
    const size = 64
    const cx = 150 + rand() * 100
    const cy = 100 + rand() * 50
    const chip = { x: cx - size / 2, y: cy - size / 2, size }
    const sides = [
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 },
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 },
    ]
    const traces = []
    for (const { dx, dy } of sides) {
      for (let k = 0; k < 5; k++) {
        const offset = -size / 2 + 8 + k * ((size - 16) / 4)
        const px = cx + dx * (size / 2) + (dx === 0 ? offset : 0)
        const py = cy + dy * (size / 2) + (dy === 0 ? offset : 0)
        const run1 = 8 + rand() * 26
        const bend = (rand() < 0.5 ? -1 : 1) * (8 + rand() * 22)
        const run2 = 20 + rand() * 140
        const p1 = [px + dx * run1, py + dy * run1]
        const p2 = [p1[0] + dx * Math.abs(bend) + (dx === 0 ? bend : 0), p1[1] + dy * Math.abs(bend) + (dy === 0 ? bend : 0)]
        const p3 = [p2[0] + dx * run2, p2[1] + dy * run2]
        traces.push({
          d: `M${px} ${py}L${p1[0]} ${p1[1]}L${p2[0]} ${p2[1]}L${p3[0]} ${p3[1]}`,
          end: p3,
          live: rand() < 0.4,
          pad: rand() < 0.6,
          delay: rand() * 3,
        })
      }
    }
    const label = `NV-${Math.floor(100 + rand() * 900)}`
    return { chip, traces, label, gx: (cx / 400) * 100, gy: (cy / 250) * 100 }
  }, [seed])

  return (
    <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ '--gx': `${art.gx}%`, '--gy': `${art.gy}%` }}>
      {art.traces.map((t, i) => (
        <g key={i}>
          <path d={t.d} className="trace" />
          {t.live && <path d={t.d} className="trace-live" pathLength="100" style={{ animationDelay: `${t.delay}s` }} />}
          {t.pad && <circle cx={t.end[0]} cy={t.end[1]} r="3" className={t.live ? 'pad pad-live' : 'pad'} />}
        </g>
      ))}
      <rect x={art.chip.x} y={art.chip.y} width={art.chip.size} height={art.chip.size} rx="6" className="chip" />
      <text x={art.chip.x + art.chip.size / 2} y={art.chip.y + art.chip.size / 2 + 4} textAnchor="middle" className="chip-label">
        {art.label}
      </text>
    </svg>
  )
}

function CodeArt({ seed }) {
  const lines = useMemo(() => {
    const rand = seededRandom(seed)
    const tones = ['c1', 'c2', 'c3', 'c3', 'c4']
    let indent = 0
    return Array.from({ length: 12 }, (_, i) => {
      indent = Math.max(0, Math.min(3, indent + (rand() < 0.35 ? 1 : rand() < 0.5 ? -1 : 0)))
      let x = 48 + indent * 18
      const segments = Array.from({ length: 1 + Math.floor(rand() * 3) }, () => {
        const w = 18 + rand() * 70
        const seg = { x, w, tone: tones[Math.floor(rand() * tones.length)] }
        x += w + 8
        return seg
      })
      return { y: 52 + i * 15, segments }
    })
  }, [seed])

  return (
    <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ '--gx': '70%', '--gy': '30%' }}>
      <circle cx="24" cy="24" r="4" className="dot dot-1" />
      <circle cx="38" cy="24" r="4" className="dot" />
      <circle cx="52" cy="24" r="4" className="dot" />
      {lines.map((line, i) => (
        <g key={i}>
          <text x="22" y={line.y + 5} className="line-no">
            {String(i + 1).padStart(2, '0')}
          </text>
          {line.segments.map((s, j) => (
            <rect key={j} x={s.x} y={line.y} width={s.w} height="6" rx="3" className={`code ${s.tone}`} />
          ))}
        </g>
      ))}
      <rect x="0" y="44" width="400" height="16" className="code-scan" />
    </svg>
  )
}
