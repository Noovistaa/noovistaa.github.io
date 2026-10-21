// ─────────────────────────────────────────────────────────────
//  SERVICES — the capability cards on the home page.
//  "icon" must be one of the names listed in src/components/ui/Icon.jsx.
//  "wide: true" makes a card twice as wide. Rows hold 3 normal cards,
//  so keep (normal cards + 2 × wide cards) a multiple of 3 to avoid gaps.
// ─────────────────────────────────────────────────────────────

export const services = [
  {
    icon: 'CircuitBoard',
    title: 'Hardware & PCB design',
    description:
      'Schematics, multi-layer PCB layout, component sourcing and prototypes that are ready for manufacturing.',
    tags: ['KiCad', 'Altium', 'DFM'],
    wide: true,
  },
  {
    icon: 'Cpu',
    title: 'Embedded & firmware',
    description: 'Low-level code for microcontrollers and FPGAs that is fast, power-efficient and dependable.',
    tags: ['C / C++', 'RTOS', 'Verilog'],
  },
  {
    icon: 'CodeXml',
    title: 'Software & web apps',
    description: 'Dashboards, web platforms and APIs that connect your devices to your users.',
    tags: ['React', 'Node', 'Python'],
  },
  {
    icon: 'BrainCircuit',
    title: 'AI & edge computing',
    description: 'Machine-learning models that run on the device itself — no cloud round-trip needed.',
    tags: ['PyTorch', 'TinyML', 'FPGA'],
  },
  {
    icon: 'Rocket',
    title: 'Prototype to product',
    description:
      'We take a proof of concept through testing, iteration and documentation until it is ready for real customers.',
    tags: ['Testing', 'Docs', 'Handover'],
  },
]
