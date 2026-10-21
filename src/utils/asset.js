// Turns 'images/projects/photo.jpg' into a URL that also works on GitHub Pages.
export function asset(path) {
  if (!path) return ''
  if (/^https?:\/\//.test(path)) return path
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}

// Small deterministic random generator, so generated artwork stays the same on every visit.
export function seededRandom(text) {
  let seed = 0
  for (const ch of text) seed = (seed * 31 + ch.charCodeAt(0)) | 0
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
}
