import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { nav, site } from '../../content/site'
import Logo from '../ui/Logo'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo />
            <p className="muted">{site.tagline}</p>
          </div>

          <div className="footer-cols">
            <div>
              <h4 className="footer-heading">Pages</h4>
              <ul>
                {nav.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="footer-heading">Contact</h4>
              <ul>
                <li>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
                {site.phone && (
                  <li>
                    <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
                  </li>
                )}
                <li className="muted footer-address">
                  {site.address && <span>{site.address}</span>}
                  <span>{site.location}</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="footer-heading">Follow</h4>
              <ul>
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.url} target="_blank" rel="noreferrer" className="footer-social">
                      {s.label} <ArrowUpRight size={14} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-wordmark" aria-hidden="true">
          {site.name}
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <button className="footer-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
