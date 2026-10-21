// The Team page. People are listed in src/content/team.js.
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Plus } from 'lucide-react'
import { hiring, team, teamHeader } from '../content/team'
import { asset, initials } from '../utils/asset'
import Page from '../components/layout/Page'
import PageHeader from '../components/sections/PageHeader'
import CTA from '../components/sections/CTA'
import Reveal from '../components/effects/Reveal'
import TiltCard from '../components/effects/TiltCard'

export default function Team() {
  return (
    <Page title="Team">
      <PageHeader {...teamHeader} />

      <section className="section section-flush-top">
        <div className="container">
          <div className="member-grid">
            {team.map((m, i) => (
              <Reveal key={m.name + i} delay={(i % 3) * 0.08}>
                <TiltCard className="member-card" max={5}>
                  <div className="member-photo">
                    <MemberPhoto member={m} />
                  </div>
                  <div className="member-body">
                    <h3>{m.name}</h3>
                    <span className="member-role">{m.role}</span>
                    {m.bio && <p className="muted">{m.bio}</p>}
                    {m.skills?.length > 0 && (
                      <div className="service-tags">
                        {m.skills.map((s) => (
                          <span className="tag" key={s}>
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                    {m.links?.some((l) => l.url) && (
                      <div className="member-links">
                        {m.links.filter((l) => l.url).map((l) => (
                          <a key={l.label} href={l.url} target="_blank" rel="noreferrer">
                            {l.label} <ArrowUpRight size={14} />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          {hiring.show && (
            <Reveal>
              <Link to={hiring.button.to} className="hiring-card">
                <span className="hiring-icon">
                  <Plus />
                </span>
                <div className="hiring-text">
                  <h3>{hiring.title}</h3>
                  <p className="muted">{hiring.text}</p>
                </div>
                <span className="link-arrow">
                  {hiring.button.label} <ArrowRight />
                </span>
              </Link>
            </Reveal>
          )}
        </div>
      </section>

      <CTA />
    </Page>
  )
}

// Shows the headshot, or the person's initials if there is no photo.
// If the file isn't found, it also tries .jpg / .jpeg / .png / .webp versions of the same name.
function MemberPhoto({ member }) {
  const [attempt, setAttempt] = useState(0)
  const candidates = photoCandidates(member.photo)
  const src = candidates[attempt]
  if (src) {
    return <img src={asset(src)} alt={member.name} loading="lazy" onError={() => setAttempt((a) => a + 1)} />
  }
  return (
    <span className="member-initials" aria-hidden="true">
      {initials(member.name)}
    </span>
  )
}

function photoCandidates(photo) {
  if (!photo) return []
  const base = photo.replace(/\.(jpe?g|png|webp)$/i, '')
  return [photo, ...['jpg', 'jpeg', 'png', 'webp'].map((ext) => `${base}.${ext}`).filter((p) => p !== photo)]
}
