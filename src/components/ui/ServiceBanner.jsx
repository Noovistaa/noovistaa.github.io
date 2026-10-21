// Animated banners for the service popups. Each service in src/content/services.js
// picks one with `animation: '<name>'`. Available names are the keys of `banners` below.
// Services without an animation show their icon instead.
import { useMemo } from 'react'
import { useReducedMotion } from 'motion/react'
import { seededRandom } from '../../utils/asset'
import Icon from './Icon'
import './service-banners.css'

export default function ServiceBanner({ name, icon }) {
  const Banner = banners[name]
  if (!Banner) {
    return (
      <span className="service-modal-icon">
        <Icon name={icon} size={34} />
      </span>
    )
  }
  return <Banner />
}

// All banners share a 800×200 canvas; the important part sits in the middle so it survives cropping on phones.
function Frame({ children }) {
  return (
    <svg className="sb" viewBox="0 0 800 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {children}
    </svg>
  )
}

const delay = (seconds) => ({ '--d': `${seconds}s` })

/* ── Electronic design: a circuit draws itself, current flows, LED lights ── */
function Electronics() {
  const reduce = useReducedMotion()
  const loop = 'M250 100 V50 H550 V150 H250 Z'
  const wires = ['M250 92 V50 H360', 'M440 50 H550 V88', 'M550 112 V150 H406', 'M394 150 H250 V108']
  return (
    <Frame>
      {wires.map((d, i) => (
        <path key={d} d={d} pathLength="1" className="ln draw" style={delay(i * 0.15)} />
      ))}
      <path d="M360 50 L368 38 L384 62 L400 38 L416 62 L432 38 L440 50" pathLength="1" className="acc draw" style={delay(0.3)} />
      <path d="M232 92 H268" className="ln" strokeWidth="3" />
      <path d="M241 108 H259" className="ln" />
      <path d="M394 136 V164 M406 136 V164" className="acc" />
      <circle cx="550" cy="98" r="20" className="led-glow" />
      <path d="M538 88 H562 L550 108 Z" className="led" />
      <path d="M538 112 H562" className="ln" />
      <text x="388" y="28" className="label">R1</text>
      <text x="388" y="186" className="label">C1</text>
      <text x="574" y="102" className="label">D1</text>
      <text x="206" y="104" className="label">5V</text>
      {!reduce &&
        [0, 1, 2, 3].map((i) => (
          <circle key={i} r="3.5" className="fill-acc glow" opacity="0">
            <set attributeName="opacity" to="1" begin={`${1.2 + i * 0.75}s`} />
            <animateMotion dur="3s" begin={`${1.2 + i * 0.75}s`} repeatCount="indefinite" path={loop} />
          </circle>
        ))}
    </Frame>
  )
}

/* ── PCB design: traces route themselves between chips, then re-route ── */
function Pcb() {
  const traces = [
    'M228 64 H246 L258 76 H272',
    'M228 82 H252 L262 92 H272',
    'M228 118 H252 L262 108 H272',
    'M228 136 H246 L258 124 H272',
    'M344 76 H380 L396 60 H440 L456 76 H462',
    'M344 92 H462',
    'M344 108 H462',
    'M344 124 H380 L396 140 H440 L456 124 H462',
    'M542 76 H574',
    'M542 108 H556 L572 124 H574',
  ]
  const padsY = [76, 92, 108, 124]
  return (
    <Frame>
      <rect x="190" y="28" width="420" height="144" rx="10" className="board" />
      {[
        [206, 44],
        [594, 44],
        [206, 156],
        [594, 156],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="5" className="hole" />
      ))}
      {[64, 82, 100, 118, 136].map((y) => (
        <rect key={y} x="216" y={y - 4} width="12" height="8" rx="2" className="pad" />
      ))}
      <rect x="280" y="66" width="56" height="68" rx="4" className="ic" />
      <rect x="470" y="62" width="64" height="76" rx="4" className="ic" />
      {padsY.map((y) => (
        <g key={y}>
          <rect x="272" y={y - 3} width="8" height="6" className="pad" />
          <rect x="336" y={y - 3} width="8" height="6" className="pad" />
          <rect x="462" y={y - 3} width="8" height="6" className="pad" />
          <rect x="534" y={y - 3} width="8" height="6" className="pad" />
        </g>
      ))}
      {traces.map((d, i) => (
        <path key={d} d={d} pathLength="1" className="acc route" style={{ '--i': i }} />
      ))}
      {[
        [396, 60],
        [396, 140],
        [578, 76],
        [578, 124],
      ].map(([x, y], i) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" className="via" style={{ '--i': i + 6 }} />
      ))}
      <text x="214" y="52" className="label">J1</text>
      <text x="300" y="60" className="label">U1</text>
      <text x="494" y="56" className="label">U2</text>
    </Frame>
  )
}

/* ── Embedded systems: code streams into a microcontroller, status LEDs blink ── */
function Embedded() {
  const pins = [62, 81, 100, 119, 138]
  return (
    <Frame>
      <rect x="170" y="62" width="120" height="76" rx="8" className="panel" />
      {[
        [76, 70],
        [90, 50],
        [104, 84],
        [118, 40],
      ].map(([y, w], i) => (
        <rect key={y} x="184" y={y - 3} width={w} height="6" rx="3" className={i % 2 ? 'bar' : 'bar bar-acc'} />
      ))}
      <path d="M290 100 H338" className="ln-dim" />
      {[0, 0.4, 0.8, 1.2].map((d) => (
        <rect key={d} x="290" y="97" width="6" height="6" rx="1" className="bit" style={delay(d)} />
      ))}
      {pins.map((p) => (
        <g key={p}>
          <path d={`M338 ${p} H350 M450 ${p} H462`} className="ln" />
          <path d={`M${p + 300} 38 V50 M${p + 300} 150 V162`} className="ln" />
        </g>
      ))}
      <rect x="350" y="50" width="100" height="100" rx="10" className="ic" />
      <rect x="375" y="75" width="50" height="50" rx="6" className="core" />
      <text x="400" y="104" textAnchor="middle" className="label label-acc">
        MCU
      </text>
      <path d="M462 100 H600" className="ln-dim" />
      <circle cx="510" cy="100" r="8" className="led-on" />
      <circle cx="550" cy="100" r="8" className="blink" style={delay(0)} />
      <circle cx="590" cy="100" r="8" className="blink" style={delay(0.6)} />
      <text x="510" y="128" textAnchor="middle" className="label">PWR</text>
      <text x="550" y="128" textAnchor="middle" className="label">TX</text>
      <text x="590" y="128" textAnchor="middle" className="label">RX</text>
    </Frame>
  )
}

/* ── Signal processing: a noisy signal goes in, a clean wave comes out ── */
function Signal() {
  const [noisy, clean] = useMemo(() => {
    const rand = seededRandom('noovistaa-dsp')
    const step = 4
    const width = 240 // two periods; the pattern repeats every 240px so the loop is seamless
    const noise = Array.from({ length: width / step }, () => (rand() - 0.5) * 28)
    const build = (withNoise) => {
      let d = ''
      for (let x = 0; x <= 960; x += step) {
        const y = 100 + 30 * Math.sin((2 * Math.PI * x) / 120) + (withNoise ? noise[(x / step) % noise.length] : 0)
        d += `${d ? 'L' : 'M'}${x} ${y.toFixed(1)}`
      }
      return d
    }
    return [build(true), build(false)]
  }, [])

  return (
    <Frame>
      <defs>
        <clipPath id="sb-dsp-in">
          <rect x="130" y="20" width="240" height="160" />
        </clipPath>
        <clipPath id="sb-dsp-out">
          <rect x="430" y="20" width="240" height="160" />
        </clipPath>
      </defs>
      <g clipPath="url(#sb-dsp-in)">
        <path d={noisy} className="wave wave-noisy scroll-x" />
      </g>
      <g clipPath="url(#sb-dsp-out)">
        <path d={clean} className="wave wave-clean scroll-x" />
      </g>
      <rect x="370" y="60" width="60" height="80" rx="12" className="panel panel-acc" />
      <text x="400" y="104" textAnchor="middle" className="label label-acc">
        DSP
      </text>
      <text x="140" y="36" className="label">INPUT</text>
      <text x="612" y="36" className="label">OUTPUT</text>
    </Frame>
  )
}

/* ── Software: code types itself, then a "deployed" check pops up ── */
function Code() {
  const lines = [
    [
      [250, 40, 'c2'],
      [298, 70, 'c3'],
    ],
    [
      [266, 56, 'c1'],
      [330, 90, 'c3'],
    ],
    [
      [266, 30, 'c3'],
      [304, 64, 'c2'],
    ],
    [[282, 110, 'c3']],
    [
      [266, 48, 'c1'],
      [322, 36, 'c3'],
    ],
    [[250, 20, 'c2']],
  ]
  return (
    <Frame>
      <rect x="230" y="28" width="340" height="144" rx="12" className="window" />
      <path d="M230 50 H570" className="ln-dim" />
      <circle cx="248" cy="39" r="4" className="fill-acc" />
      <circle cx="262" cy="39" r="4" className="dot" />
      <circle cx="276" cy="39" r="4" className="dot" />
      {lines.map((segments, i) => (
        <g key={i} className="type" style={{ '--i': i }}>
          {segments.map(([x, w, tone]) => (
            <rect key={x} x={x} y={63 + i * 16} width={w} height="6" rx="3" className={`code ${tone}`} />
          ))}
        </g>
      ))}
      <rect x="276" y="141" width="7" height="12" className="cursor" />
      <g className="pop">
        <circle cx="534" cy="140" r="15" className="fill-acc glow" />
        <path d="M527 140 L532 145 L541 135" className="check" />
      </g>
    </Frame>
  )
}

/* ── Web & mobile: a browser loads its layout, a phone app scrolls and gets tapped ── */
function Apps() {
  const cards = Array.from({ length: 10 }, (_, k) => k)
  return (
    <Frame>
      <defs>
        <clipPath id="sb-phone">
          <rect x="531" y="36" width="74" height="138" rx="8" />
        </clipPath>
      </defs>
      <rect x="190" y="32" width="300" height="136" rx="10" className="window" />
      <path d="M190 52 H490" className="ln-dim" />
      <circle cx="204" cy="42" r="3.5" className="fill-acc" />
      <circle cx="216" cy="42" r="3.5" className="dot" />
      <circle cx="228" cy="42" r="3.5" className="dot" />
      <rect x="290" y="38" width="120" height="8" rx="4" className="dim" />
      <rect x="206" y="64" width="268" height="40" rx="6" className="sk" style={delay(0)} />
      {[206, 298, 390].map((x, i) => (
        <rect key={x} x={x} y="114" width="84" height="40" rx="6" className="sk" style={delay(0.2 + i * 0.2)} />
      ))}
      <rect x="525" y="20" width="86" height="160" rx="16" className="window" />
      <rect x="554" y="26" width="28" height="5" rx="2.5" className="dim" />
      <g clipPath="url(#sb-phone)">
        <g className="scroll-y">
          {cards.map((k) => (
            <g key={k}>
              <rect x="535" y={40 + k * 30} width="66" height="24" rx="6" className="phone-card" />
              <circle cx="546" cy={52 + k * 30} r="5" className={k % 3 === 0 ? 'fill-acc' : 'dot'} />
              <rect x="556" y={47 + k * 30} width="38" height="4" rx="2" className="bar" />
              <rect x="556" y={55 + k * 30} width="24" height="4" rx="2" className="bar" />
            </g>
          ))}
        </g>
      </g>
      <circle cx="568" cy="124" r="10" className="ripple" />
    </Frame>
  )
}

/* ── IoT & cloud: devices send data up, updates come back down ── */
function Iot() {
  const devices = [
    { x: 260, y: 150, toX: 382, toY: 82 },
    { x: 400, y: 160, toX: 400, toY: 82 },
    { x: 540, y: 150, toX: 418, toY: 82 },
  ]
  return (
    <Frame>
      {devices.map((dv) => (
        <path key={dv.x} d={`M${dv.x} ${dv.y - 12} L${dv.toX} ${dv.toY}`} className="ln-dim dashed" />
      ))}
      <path
        d="M370 80 H432 a18 18 0 0 0 0 -36 a24 24 0 0 0 -46 -6 a20 20 0 0 0 -16 42 Z"
        className="cloud"
      />
      <text x="403" y="68" textAnchor="middle" className="label label-acc">
        CLOUD
      </text>
      {devices.map((dv, i) => {
        const dx = dv.toX - dv.x
        const dy = dv.toY - (dv.y - 12)
        return (
          <g key={dv.x}>
            <circle
              cx={dv.x}
              cy={dv.y - 12}
              r="3.5"
              className="packet-up glow"
              style={{ '--dx': `${dx}px`, '--dy': `${dy}px`, ...delay(i * 0.5) }}
            />
            <circle
              cx={dv.toX}
              cy={dv.toY}
              r="3.5"
              className="packet-down"
              style={{ '--dx': `${-dx}px`, '--dy': `${-dy}px`, ...delay(1.5 + i * 0.5) }}
            />
            <rect x={dv.x - 16} y={dv.y - 11} width="32" height="24" rx="6" className="device" />
            <circle cx={dv.x} cy={dv.y + 1} r="3" className="fill-acc" />
            <path
              d={`M${dv.x + 22} ${dv.y - 4} a8 8 0 0 1 0 10 M${dv.x + 27} ${dv.y - 8} a14 14 0 0 1 0 18`}
              className="wifi"
              style={delay(i * 0.3)}
            />
          </g>
        )
      })}
    </Frame>
  )
}

/* ── AI & machine learning: a signal ripples through a neural network ── */
function Neural() {
  const layers = useMemo(() => {
    const xs = [250, 350, 450, 550]
    const counts = [3, 5, 5, 2]
    return xs.map((x, l) => Array.from({ length: counts[l] }, (_, j) => ({ x, y: 100 + (j - (counts[l] - 1) / 2) * 30 })))
  }, [])
  const edges = []
  layers.slice(0, -1).forEach((layer, l) =>
    layer.forEach((a) => layers[l + 1].forEach((b) => edges.push({ d: `M${a.x} ${a.y} L${b.x} ${b.y}`, l })))
  )
  return (
    <Frame>
      {edges.map((e) => (
        <path key={e.d} d={e.d} className="edge" />
      ))}
      {edges.map((e) => (
        <path key={`p${e.d}`} d={e.d} pathLength="1" className="edge-pulse" style={delay(e.l * 0.8)} />
      ))}
      {layers.map((layer, l) =>
        layer.map((n) => (
          <circle key={`${n.x}-${n.y}`} cx={n.x} cy={n.y} r="7" className="node" style={delay(l * 0.8)} />
        ))
      )}
      <text x="566" y="89" className="label label-acc output-label">
        0.98
      </text>
      <text x="230" y="186" className="label">INPUT</text>
      <text x="530" y="186" className="label">OUTPUT</text>
    </Frame>
  )
}

/* ── Computer vision: a scan sweeps the frame and detection boxes snap onto objects ── */
function Vision() {
  const corners = [
    'M180 48 V30 H198',
    'M602 30 H620 V48',
    'M180 152 V170 H198',
    'M602 170 H620 V152',
  ]
  const boxes = [
    { x: 278, y: 54, w: 44, h: 94, label: 'PERSON 0.97', d: 0.9 },
    { x: 397, y: 92, w: 70, h: 60, label: 'BOX 0.93', d: 1.85 },
    { x: 490, y: 86, w: 116, h: 64, label: 'VEHICLE 0.95', d: 2.7 },
  ]
  return (
    <Frame>
      {corners.map((d) => (
        <path key={d} d={d} className="acc" />
      ))}
      <circle cx="300" cy="72" r="11" className="obj" />
      <rect x="286" y="86" width="28" height="56" rx="10" className="obj" />
      <rect x="405" y="100" width="54" height="44" rx="4" className="obj" />
      <path d="M432 100 V144" className="obj" />
      <path
        d="M498 138 V122 Q500 112 512 110 L526 98 Q530 94 538 94 H566 Q574 94 578 102 L586 110 Q596 112 598 122 V138 Z"
        className="obj"
      />
      <circle cx="518" cy="140" r="8" className="obj" />
      <circle cx="578" cy="140" r="8" className="obj" />
      {boxes.map((b) => (
        <g key={b.label} className="detect" style={delay(b.d)}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="3" className="bbox" />
          <text x={b.x} y={b.y - 6} className="label label-acc">
            {b.label}
          </text>
        </g>
      ))}
      <rect x="180" y="30" width="2" height="140" className="scan" />
    </Frame>
  )
}

/* ── Robotics & drones: a quadcopter flies a figure-8 between waypoints ── */
function Drone() {
  const reduce = useReducedMotion()
  const path =
    'M400 100 C460 30 600 30 600 100 C600 170 460 170 400 100 C340 30 200 30 200 100 C200 170 340 170 400 100 Z'
  const rotors = [
    [-20, -20],
    [20, -20],
    [-20, 20],
    [20, 20],
  ]
  return (
    <Frame>
      <path d={path} className="ln-dim dashed" />
      {[
        [200, 100],
        [600, 100],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="6" className="waypoint" />
      ))}
      <path d="M392 100 H408 M400 92 V108" className="acc" />
      <g transform={reduce ? 'translate(600 100)' : undefined}>
        {!reduce && <animateMotion dur="9s" repeatCount="indefinite" rotate="0" path={path} />}
        <circle r="34" className="hold-ring" />
        <g className="hover">
          <path d="M-20 -20 L20 20 M20 -20 L-20 20" className="arm" />
          {rotors.map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <circle r="11" className="rotor" />
              <path d="M-9 0 H9" className="prop" style={delay(i * 0.05)} />
            </g>
          ))}
          <rect x="-9" y="-9" width="18" height="18" rx="4" className="body" />
          <circle cx="0" cy="-3" r="2.2" className="fill-acc blink-fast" />
        </g>
      </g>
    </Frame>
  )
}

const banners = {
  electronics: Electronics,
  pcb: Pcb,
  embedded: Embedded,
  signal: Signal,
  code: Code,
  apps: Apps,
  iot: Iot,
  neural: Neural,
  vision: Vision,
  drone: Drone,
}
