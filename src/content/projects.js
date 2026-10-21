// ─────────────────────────────────────────────────────────────
//  PROJECTS — shown on the Projects page (and on Home if featured).
//
//  To add a project: copy one block { ... }, paste it, and edit it.
//    slug      short unique id used in the link, lowercase-with-dashes
//    category  becomes a filter tab automatically (e.g. 'Hardware', 'Software')
//    image     optional — put a file in public/images/projects/ and write
//              'images/projects/your-file.jpg'. With no image, a generated
//              circuit/code illustration is shown instead.
//    featured  true = also shown on the Home page (up to 3)
// ─────────────────────────────────────────────────────────────

export const projectsHeader = {
  eyebrow: 'Projects',
  title: 'Work that ships.',
  subtitle: 'Hardware, firmware and software we have designed and built. Click any project for the full story.',
}

export const projects = [
  {
    slug: 'fpga-neural-network',
    title: 'Neural Network on an FPGA',
    category: 'Hardware',
    year: '2026',
    featured: true,
    image: '',
    summary: 'A handwritten-digit classifier running directly in FPGA logic for real-time, low-power inference.',
    // TODO: check these details against the real project.
    challenge: 'Run a trained neural network in real time without a CPU or GPU, inside a tight power and logic budget.',
    solution:
      'We trained the model on MNIST, quantised the weights to fixed point and built a pipelined hardware design that classifies each digit in a few clock cycles.',
    results: ['Real-time inference with no CPU', 'Fixed-point quantised weights', 'Fully custom hardware pipeline'],
    tech: ['Verilog', 'Python', 'PyTorch', 'FPGA'],
  },
  {
    slug: 'audio-spectrum-scope',
    title: 'Real-time Audio Spectrum Scope',
    category: 'Embedded',
    year: '2026',
    featured: true,
    image: '',
    summary: 'A live audio visualiser that turns sound into a frequency spectrum and waveform in real time.',
    // TODO: check these details against the real project.
    challenge: 'Capture audio and show its spectrum smoothly, with no visible lag between sound and picture.',
    solution:
      'Audio is sampled, windowed and run through an FFT continuously, then drawn as a responsive spectrum and oscilloscope view.',
    results: ['Live FFT spectrum', 'Oscilloscope waveform view', 'Low-latency signal chain'],
    tech: ['C', 'DSP', 'FFT'],
  },
  {
    // PLACEHOLDER — replace with a real project.
    slug: 'iot-fleet-dashboard',
    title: 'IoT Fleet Dashboard',
    category: 'Software',
    year: '2026',
    featured: true,
    image: '',
    summary: 'A web platform to monitor, update and control hundreds of connected devices from one screen.',
    challenge: 'The client had devices in the field but no way to see their health or push updates remotely.',
    solution:
      'We built a secure device API, over-the-air update pipeline and a real-time dashboard with alerts.',
    results: ['Live device health map', 'One-click OTA updates', 'Automatic fault alerts'],
    tech: ['React', 'Node.js', 'MQTT', 'PostgreSQL'],
  },
  {
    // PLACEHOLDER — replace with a real project.
    slug: 'smart-sensor-node',
    title: 'Low-Power Sensor Node',
    category: 'Hardware',
    year: '2025',
    image: '',
    summary: 'A battery-powered wireless sensor board designed to run for years on a single cell.',
    challenge: 'Collect environmental data in remote locations with no access to power.',
    solution: 'Custom 4-layer PCB, aggressive sleep-mode firmware and a long-range radio link.',
    results: ['Multi-year battery life target', 'Custom 4-layer PCB', 'Long-range wireless'],
    tech: ['KiCad', 'C', 'LoRa', 'ARM Cortex-M'],
  },
  {
    // PLACEHOLDER — replace with a real project.
    slug: 'robot-control-app',
    title: 'Robot Control App',
    category: 'Software',
    year: '2025',
    image: '',
    summary: 'A cross-platform app for driving, calibrating and logging data from a mobile robot.',
    challenge: 'Operators needed a simple interface instead of command-line tools.',
    solution: 'A responsive app talking to the robot over Wi-Fi, with live telemetry charts and saved presets.',
    results: ['Live telemetry', 'Saved calibration presets', 'Works on phone & desktop'],
    tech: ['React', 'WebSockets', 'Python'],
  },
  {
    // PLACEHOLDER — replace with a real project.
    slug: 'motor-controller',
    title: 'Brushless Motor Controller',
    category: 'Embedded',
    year: '2025',
    image: '',
    summary: 'Field-oriented control firmware and driver board for quiet, efficient brushless motors.',
    challenge: 'Off-the-shelf controllers were noisy and inefficient for the client’s application.',
    solution: 'A custom driver board plus FOC firmware tuned for smooth, quiet operation.',
    results: ['Smooth low-speed control', 'Custom driver PCB', 'Tunable from a PC tool'],
    tech: ['C', 'STM32', 'FOC', 'Altium'],
  },
]
