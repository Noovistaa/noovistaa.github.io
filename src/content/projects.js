// ─────────────────────────────────────────────────────────────
//  PROJECTS: shown on the Projects page (and on Home if featured).
//
//  To add a project: copy one block { ... }, paste it, and edit it.
//    slug      short unique id used in the link, lowercase-with-dashes
//    category  becomes a filter tab automatically (e.g. 'Hardware', 'Software')
//    image     optional. Put a file in public/images/projects/ and write
//              'images/projects/your-file.jpg'. With no image, a generated
//              circuit/code illustration is shown instead.
//    animation optional moving cover instead of the illustration. Available: 'drone'
//    featured  true = also shown on the Home page (up to 3)
// ─────────────────────────────────────────────────────────────

export const projectsHeader = {
  eyebrow: 'Projects',
  title: 'Work that ships.',
  subtitle: 'Software, hardware and AI work we have designed and built. Click any project for the full story.',
}

export const projects = [
  {
    slug: 'precision-drone-control',
    title: 'Precision Drone Control',
    category: 'Robotics',
    year: '', // add the year when you know it
    featured: true,
    image: '', // e.g. 'images/projects/drone.jpg' (a photo replaces the animation)
    animation: 'drone',
    summary: 'A drone control system built for precise, stable control and movement.',
    challenge:
      'Drones are constantly pushed around by wind, sensor noise and changing loads. Holding an exact position and moving smoothly along a path takes fast, carefully tuned control that reacts in real time.',
    solution:
      'A complete control system: sensor fusion that combines motion, altitude and position data; tuned control loops for stable flight; firmware running on the flight controller; and a ground station for sending commands and watching live telemetry.',
    results: [
      'Stable hovering and position hold',
      'Smooth, precise movement along set paths',
      'Fast response to pilot and ground-station commands',
      'Live telemetry for monitoring and tuning',
    ],
    tech: ['Embedded systems', 'Sensor fusion', 'Control systems', 'Telemetry'],
  },
]
