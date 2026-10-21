// ─────────────────────────────────────────────────────────────
//  SITE SETTINGS
//  Company details used everywhere (navbar, footer, contact page).
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Noovistaa',
  tagline: 'Software, hardware and AI, all in one place.',

  // Your logo: put the file in public/images/ and write its path here, e.g. 'images/logo.svg'.
  // Leave '' to use the built-in "N" mark. Use a version that shows up on a dark background.
  logo: 'images/logo.png',
  // true if your logo file already contains the word "Noovistaa" (hides the text next to it).
  logoIncludesName: false,

  // TODO before launch: replace with your real contact details.
  email: 'hello@yourdomain.com',
  phone: '', // leave empty ('') to hide it
  location: 'Islamabad, Pakistan',
  address: 'Office 303, Floor 3, Rawat Technology Park', // street address, shown above the city ('' to hide)

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
  { label: 'Services', to: '/services' },
  { label: 'Team', to: '/team' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]
