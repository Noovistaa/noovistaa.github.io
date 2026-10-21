// ─────────────────────────────────────────────────────────────
//  PROJECTS: shown on the Projects page (and on Home if featured).
//
//  To add a project: copy one block { ... }, paste it, and edit it.
//    slug      short unique id used in the link, lowercase-with-dashes
//    category  becomes a filter tab automatically (e.g. 'Hardware', 'Software')
//    image     optional. Put a file in public/images/projects/ and write
//              'images/projects/your-file.jpg'. With no image, a generated
//              circuit/code illustration is shown instead.
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
    category: 'Embedded',
    year: '', // TODO: add the year
    featured: true,
    image: '', // e.g. 'images/projects/drone.jpg'
    summary: 'A drone control system built for precise control and movement.',
    // TODO: fill these in. Anything left empty is simply hidden on the site.
    challenge: '',
    solution: '',
    results: [],
    tech: [],
  },
]
