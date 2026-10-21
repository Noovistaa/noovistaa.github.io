// ─────────────────────────────────────────────────────────────
//  TEAM PAGE
//
//  To add a person: copy one { ... } block, paste it, and edit it.
//    photo   optional. Put a photo in public/images/team/ and write
//            'images/team/name.jpg'. Portrait (tall) photos look best.
//            If the file is missing, their initials are shown instead.
//    bio     one or two sentences. Leave '' to hide it.
//    skills  short tags shown under the bio.
//    links   profiles such as LinkedIn or GitHub. Paste the full profile URL,
//            e.g. 'https://www.linkedin.com/in/your-name'. Links with an empty url are hidden.
// ─────────────────────────────────────────────────────────────

export const teamHeader = {
  eyebrow: 'Team',
  title: 'The people behind Noovistaa.',
  subtitle:
    'A small team of engineers working across software, hardware and AI, together.',
}

export const team = [
  {
    name: 'Zoha Naseem',
    role: 'Founder & Lead Engineer',
    photo: 'images/team/zoha.jpg',
    bio: 'Founded Noovistaa and leads its engineering, from the first architecture sketch to the final handover.',
    skills: ['Software', 'Hardware', 'AI'],
    links: [{ label: 'LinkedIn', url: 'https://www.linkedin.com/in/zoha-naseem-581a25325/' }],
  },
  {
    name: 'Zakriya Paracha',
    role: 'Director of Hardware & Software',
    photo: 'images/team/zakriya.jpeg',
    bio: 'Leads hardware and software at Noovistaa, from circuit boards and embedded systems to the apps that run on them.',
    skills: ['Hardware design', 'Embedded systems', 'Software engineering'],
    links: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/zakriya-paracha/' },
      { label: 'GitHub', url: 'https://github.com/ZakriyaParacha46' },
    ],
  },
  {
    name: 'Aazain Umarani',
    role: 'Director of AI & Machine Learning',
    photo: 'images/team/aazain.jpg',
    bio: 'Leads AI and machine learning at Noovistaa, turning data and models into features that work in real products.',
    skills: ['Artificial intelligence', 'Machine learning', 'Data'],
    links: [{ label: 'LinkedIn', url: 'https://www.linkedin.com/in/aazain-umrani/' }],
  },
]

// The "join us" card shown after the team. Set show: false to hide it.
export const hiring = {
  show: true,
  title: 'Join the team',
  text: 'We’re always glad to hear from engineers who love building real products. Send us a note and your best work.',
  button: { label: 'Get in touch', to: '/contact' },
}
