import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Check, X } from 'lucide-react'
import ProjectCover from './ProjectCover'

// Case-study popup for a single project.
export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.slug}
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="icon-btn modal-close" onClick={onClose} aria-label="Close" autoFocus>
              <X />
            </button>

            <div className="modal-cover">
              <ProjectCover project={project} />
            </div>

            <div className="modal-body">
              <div className="project-meta">
                <span className="tag">{project.category}</span>
                <span className="project-year">{project.year}</span>
              </div>
              <h2 id="modal-title" className="modal-title">
                {project.title}
              </h2>
              <p className="lead">{project.summary}</p>

              <div className="modal-cols">
                {project.challenge && (
                  <div>
                    <h4 className="modal-label">The challenge</h4>
                    <p className="muted">{project.challenge}</p>
                  </div>
                )}
                {project.solution && (
                  <div>
                    <h4 className="modal-label">Our solution</h4>
                    <p className="muted">{project.solution}</p>
                  </div>
                )}
              </div>

              {project.results?.length > 0 && (
                <>
                  <h4 className="modal-label">Results</h4>
                  <ul className="modal-results">
                    {project.results.map((r) => (
                      <li key={r}>
                        <Check size={16} /> {r}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {project.tech?.length > 0 && (
                <>
                  <h4 className="modal-label">Technology</h4>
                  <div className="service-tags">
                    {project.tech.map((t) => (
                      <span className="tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </>
              )}

              <Link to="/contact" className="btn btn-primary modal-cta">
                Start a similar project <ArrowRight />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
