// The Services page. Services are listed in src/content/services.js.
// Clicking a service opens its details in a popup (/services?service=slug).
import { useCallback, useEffect } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { allServices, serviceGroups, servicesHeader } from '../content/services'
import Page from '../components/layout/Page'
import PageHeader from '../components/sections/PageHeader'
import CTA from '../components/sections/CTA'
import Reveal from '../components/effects/Reveal'
import SpotlightGroup from '../components/effects/SpotlightGroup'
import Icon from '../components/ui/Icon'
import ServiceModal from '../components/ui/ServiceModal'

export default function Services() {
  const { hash } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const openService = allServices.find((s) => s.slug === searchParams.get('service'))
  const closeModal = useCallback(() => setSearchParams({}, { replace: true }), [setSearchParams])

  // Links like /services#ai jump straight to that group.
  useEffect(() => {
    if (!hash) return
    const timer = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 350)
    return () => clearTimeout(timer)
  }, [hash])

  return (
    <Page title="Services">
      <PageHeader {...servicesHeader} />

      <section className="section section-flush-top">
        <div className="container">
          {serviceGroups.map((group, g) => (
            <div className="service-group" id={group.id} key={group.id}>
              <Reveal className="service-group-head">
                <span className="service-group-num">{String(g + 1).padStart(2, '0')}</span>
                <span className="service-icon">
                  <Icon name={group.icon} size={22} />
                </span>
                <h2 className="service-group-title">{group.name}</h2>
                <p className="muted">{group.intro}</p>
              </Reveal>

              <SpotlightGroup className="service-list">
                {group.services.map((s, i) => (
                  <Reveal key={s.slug} delay={i * 0.05}>
                    <Link to={{ search: `?service=${s.slug}` }} className="spotlight service-row">
                      <span className="service-row-icon">
                        <Icon name={s.icon} size={22} />
                      </span>
                      <span className="service-row-text">
                        <span className="service-row-title">{s.title}</span>
                        <span className="service-row-summary">{s.summary}</span>
                      </span>
                      <span className="service-row-plus" aria-hidden="true">
                        <Plus size={18} />
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </SpotlightGroup>
            </div>
          ))}
        </div>
      </section>

      <CTA />
      <ServiceModal service={openService} onClose={closeModal} />
    </Page>
  )
}
