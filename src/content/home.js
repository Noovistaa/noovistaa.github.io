// ─────────────────────────────────────────────────────────────
//  HOME PAGE TEXT
//  To reorder or remove whole sections, edit src/pages/Home.jsx.
// ─────────────────────────────────────────────────────────────

export const hero = {
  availability: 'Taking on new projects',
  eyebrow: 'Software · Hardware · AI',
  titleStart: 'We engineer',
  // These words cycle with a "decoding" effect after the title.
  rotatingWords: ['software.', 'hardware.', 'AI.', 'what’s next.'],
  subtitle:
    'Software, hardware and AI, all in one place. Noovistaa takes your product from idea to launch with one team that designs the electronics, builds the software and adds the intelligence.',
  primaryCta: { label: 'Start a project', to: '/contact' },
  secondaryCta: { label: 'See our work', to: '/projects' },
}

export const intro = {
  eyebrow: 'About us',
  title: 'Software, hardware and AI, all in one place.',
  body: 'Most products stall in the gaps between the software team, the hardware team and the AI team. We close those gaps. With every discipline under one roof, your product works as one system and ships on schedule.',
  link: { label: 'More about us', to: '/about' },
  teamLink: { label: 'Meet the team', to: '/team' },
  servicesLabel: 'What we do',
}

export const mission = {
  eyebrow: 'Mission statement',
  // Wrap words in *asterisks* to highlight them in the accent color.
  statement:
    'Our mission is to turn ambitious ideas into *reliable,* *real-world* products: engineered with care, delivered with honesty, and built to last long after launch.',
  signature: 'The Noovistaa team',
}

// The animated numbers strip. Use claims you can stand behind.
export const stats = [
  { value: 24, suffix: 'h', label: 'Reply time on every inquiry' },
  { value: 100, suffix: '%', label: 'Code & IP ownership transferred to you' },
  { value: 3, suffix: '', label: 'Disciplines under one roof: software, hardware & AI' },
  { value: 1, suffix: '', label: 'Point of contact from kickoff to launch' },
]

export const featuredProjects = {
  eyebrow: 'Projects',
  title: 'Selected work',
  subtitle: 'A few things we have designed, built and shipped.',
}

export const testimonialsSection = {
  eyebrow: 'Testimonials',
  title: 'What clients say',
}

export const partnersSection = {
  eyebrow: 'Partners',
  title: 'Trusted by teams building what’s next',
  techTitle: 'Fields we work in',
}

// The call-to-action band shown near the bottom of most pages.
export const cta = {
  eyebrow: 'Let’s build',
  title: 'Have a product in mind?',
  subtitle: 'Tell us what you’re building. You’ll get a reply within a day with honest next steps, even if we’re not the right fit.',
  button: { label: 'Start a project', to: '/contact' },
}
