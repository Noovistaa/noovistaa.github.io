import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, Check } from 'lucide-react'
import { allServices } from '../../content/services'
import Modal from './Modal'
import ServiceBanner from './ServiceBanner'

// Popup with the details of one service, plus a button to jump to the next one.
export default function ServiceModal({ service, onClose }) {
  const index = service ? allServices.findIndex((s) => s.slug === service.slug) : -1
  const next = index >= 0 ? allServices[(index + 1) % allServices.length] : null

  // When jumping to the next service, start reading from the top again.
  useEffect(() => {
    document.querySelector('.modal-backdrop')?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [service?.slug])

  return (
    <Modal open={Boolean(service)} onClose={onClose} labelledBy="service-title">
      {service && (
        <motion.div
          key={service.slug}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="service-modal-head">
            <div className="dot-grid" aria-hidden="true" />
            <ServiceBanner name={service.animation} icon={service.icon} />
          </div>

          <div className="modal-body">
            <span className="tag">{service.group}</span>
            <h2 id="service-title" className="modal-title service-modal-title">
              {service.title}
            </h2>
            <p className="lead">{service.description}</p>

            {service.whatWeDo?.length > 0 && (
              <>
                <h4 className="modal-label">What we do</h4>
                <ul className="modal-results">
                  {service.whatWeDo.map((item) => (
                    <li key={item}>
                      <Check size={16} /> {item}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {service.deliverables?.length > 0 && (
              <>
                <h4 className="modal-label">What you get</h4>
                <div className="service-tags">
                  {service.deliverables.map((d) => (
                    <span className="tag" key={d}>
                      {d}
                    </span>
                  ))}
                </div>
              </>
            )}

            <div className="service-modal-actions">
              <Link to="/contact" className="btn btn-primary">
                Discuss your project <ArrowRight />
              </Link>
              {next && next.slug !== service.slug && (
                <Link to={{ search: `?service=${next.slug}` }} replace className="link-arrow">
                  Next: {next.title} <ArrowRight />
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </Modal>
  )
}
