import { site } from '../../content/site'
import { asset } from '../../utils/asset'

// The Noovistaa mark: an "N" drawn like a circuit trace with two solder pads.
export function LogoMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="0.5" y="0.5" width="31" height="31" rx="8" stroke="var(--border-strong)" />
      <path
        d="M9 23V9l14 14V9"
        stroke="var(--accent)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="23" r="2.4" fill="var(--accent)" />
      <circle cx="23" cy="9" r="2.4" fill="var(--accent)" />
    </svg>
  )
}

// Uses your logo file if one is set in src/content/site.js, otherwise the built-in mark.
export default function Logo() {
  const showName = !(site.logo && site.logoIncludesName)
  return (
    <span className="logo">
      {site.logo ? <img src={asset(site.logo)} alt={showName ? '' : site.name} className="logo-img" /> : <LogoMark />}
      {showName && <span className="logo-word">{site.name}</span>}
    </span>
  )
}
