# Novista website

The website for Novista, a software and hardware engineering studio. Built with React, Vite and Motion, and published automatically to GitHub Pages.

## Run it on your computer

```bash
npm install      # first time only
npm run dev      # then open http://localhost:5173
```

The page reloads by itself every time you save a file.

## Where to change things

**You only need the `src/content/` folder for everyday updates.** Each file is plain text with comments explaining it.

| I want to change…                               | Edit this file                            |
| ----------------------------------------------- | ----------------------------------------- |
| Company name, email, phone, location, socials   | `src/content/site.js`                     |
| Home page text (hero, mission, stats, CTA)      | `src/content/home.js`                     |
| Service cards on the home page                  | `src/content/services.js`                 |
| Projects (add / remove / edit)                  | `src/content/projects.js`                 |
| Testimonials                                    | `src/content/testimonials.js`             |
| Partner logos and technology list               | `src/content/partners.js`                 |
| About page (story, values, process, team)       | `src/content/about.js`                    |
| Contact page (form options, FAQ)                | `src/content/contact.js`                  |
| Colors, fonts, roundness                        | `src/styles/theme.css`                    |
| Order of sections on the home page              | `src/pages/Home.jsx`                      |

### Add a project

1. Open `src/content/projects.js`.
2. Copy one `{ ... },` block, paste it, and change the text. Give it a unique `slug`.
3. Optional: add a picture to `public/images/projects/` and set `image: 'images/projects/your-picture.jpg'`.
   With no picture, the site draws circuit-board or code artwork for it automatically.
4. Set `featured: true` to also show it on the home page (the first 3 featured ones are shown).

### Add a partner logo

Put the logo in `public/images/partners/` (a white or single-color SVG/PNG looks best), then in
`src/content/partners.js` set `logo: 'images/partners/your-logo.svg'`.

### Change the brand color

In `src/styles/theme.css`, change `--accent` **and** `--accent-rgb` (the same color written as `R, G, B`).

### Make the contact form send emails

Out of the box, the form opens the visitor's own email app. To receive messages directly:

1. Create a free form at [formspree.io](https://formspree.io).
2. Paste its URL into `formEndpoint` in `src/content/site.js`.

## Publish changes

Commit and push to the `main` branch. GitHub builds and publishes the site in about a minute:

```bash
git add .
git commit -m "Update projects"
git push
```

Progress is visible in the repository's **Actions** tab.

### Use your own domain (e.g. novista.com)

1. In the repository, go to **Settings → Pages → Custom domain** and enter your domain.
2. At your domain registrar, add the DNS records GitHub shows you.
3. Run the **Deploy website** workflow again (Actions tab → Deploy website → Run workflow).
   The site adjusts its links to the new domain automatically.

## Before launch checklist

- [ ] Real email, location and social links in `site.js`
- [ ] Real testimonials (with the client's permission) in `testimonials.js`
- [ ] Real partner names / logos in `partners.js`
- [ ] Replace the placeholder projects and check the details of the real ones in `projects.js`
- [ ] Team members and photos in `about.js`
- [ ] Formspree URL in `site.js` so the contact form delivers to your inbox

## Folder map

```
src/
├── content/        ← all the words and lists (edit these)
├── pages/          ← one file per page: Home, About, Projects, Contact
├── components/
│   ├── sections/   ← building blocks of pages (Hero, Mission, Testimonials…)
│   ├── effects/    ← animations (circuit background, cursor, text scramble…)
│   ├── layout/     ← navbar, footer, page transition
│   └── ui/         ← small pieces (logo, icons, project card…)
└── styles/         ← theme.css (colors & fonts) and global.css
public/
└── images/         ← your pictures: projects/, partners/, team/
```
