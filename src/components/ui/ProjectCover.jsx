import { useMemo } from 'react'
import { asset, seededRandom } from '../../utils/asset'

// Shows the project's image, or its animation (e.g. animation: 'drone'), or a generated
// illustration: circuit-board art for hardware projects, code art for software projects.
export default function ProjectCover({ project }) {
  if (project.image) {
    return (
      <div className="cover">
        <img src={asset(project.image)} alt={project.title} loading="lazy" />
      </div>
    )
  }
  const Animated = animatedCovers[project.animation]
  if (Animated) {
    return (
      <div className="cover cover-generated">
        <Animated />
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

/* ── Drone holding position: gusts push it off target, it corrects and locks back on ── */
function DroneHoldArt() {
  const grid = []
  for (let x = 0; x <= 400; x += 25) grid.push(`M${x} 0 V250`)
  for (let y = 0; y <= 250; y += 25) grid.push(`M0 ${y} H400`)
  const gusts = [
    { y: 92, len: 70, d: 0 },
    { y: 118, len: 110, d: 0.15 },
    { y: 146, len: 60, d: 0.3 },
    { y: 166, len: 90, d: 0.1 },
    { y: 104, len: 80, d: 4.4 },
    { y: 134, len: 120, d: 4.55 },
    { y: 158, len: 70, d: 4.7 },
  ]
  const rotors = [
    [-22, -22],
    [22, -22],
    [-22, 22],
    [22, 22],
  ]
  return (
    <svg
      viewBox="0 0 400 250"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="drone-art"
      style={{ '--gx': '50%', '--gy': '50%' }}
    >
      <path d={grid.join(' ')} className="da-grid" />
      {gusts.map((g) => (
        <path key={`${g.y}-${g.d}`} d={`M-120 ${g.y} h${g.len}`} className="da-wind" style={{ '--d': `${g.d}s` }} />
      ))}
      <circle cx="200" cy="125" r="46" className="da-ring da-ring-dash" />
      <circle cx="200" cy="125" r="28" className="da-ring" />
      <path d="M200 66 V90 M200 160 V184 M141 125 H165 M235 125 H259" className="da-cross" />
      <circle cx="200" cy="125" r="4" className="da-core" />
      <g transform="translate(200 125)">
        <g className="da-drone">
          <path d="M-22 -22 L22 22 M22 -22 L-22 22" className="da-arm" />
          {rotors.map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <circle r="12" className="da-rotor" />
              <path d="M-10 0 H10" className="da-prop" style={{ '--d': `${i * 0.05}s` }} />
            </g>
          ))}
          <rect x="-11" y="-11" width="22" height="22" rx="5" className="da-body" />
          <circle cx="0" cy="-4" r="2.4" className="da-led" />
        </g>
      </g>
      <text x="24" y="58" className="da-label">POSITION HOLD</text>
      <text x="24" y="184" className="da-label">ROLL</text>
      <rect x="64" y="178" width="60" height="5" rx="2.5" className="da-track" />
      <rect x="64" y="178" width="60" height="5" rx="2.5" className="da-bar" />
      <text x="24" y="200" className="da-label">PITCH</text>
      <rect x="64" y="194" width="60" height="5" rx="2.5" className="da-track" />
      <rect x="64" y="194" width="60" height="5" rx="2.5" className="da-bar" style={{ '--d': '0.25s' }} />
      <text x="376" y="200" textAnchor="end" className="da-label da-locked">
        ● LOCKED
      </text>
    </svg>
  )
}

const animatedCovers = {
  drone: DroneHoldArt,
}
