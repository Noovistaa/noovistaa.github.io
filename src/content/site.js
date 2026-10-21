// ─────────────────────────────────────────────────────────────
//  SITE SETTINGS
//  Company details used everywhere (navbar, footer, contact page).
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Novista',
  tagline: 'Engineering from silicon to software.',

  // TODO before launch: replace with your real contact details.
  email: 'hello@yourdomain.com',
  phone: '', // leave empty ('') to hide it
  location: 'Your City, Country',

  // Contact form: create a free form at https://formspree.io and paste its URL here,
  // e.g. 'https://formspree.io/f/abcd1234'. Left empty, the form opens the visitor's email app instead.
  formEndpoint: '',

  socials: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/' },
    { label: 'GitHub', url: 'https://github.com/ZakriyaParacha46' },
  ],
}

// Links in the top navigation bar. "to" must match a page route in src/App.jsx.
export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]
