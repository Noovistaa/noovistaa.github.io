import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import Modal from './Modal'
import ProjectCover from './ProjectCover'

// Case-study popup for a single project.
export default function ProjectModal({ project, onClose }) {
  return (
    <Modal open={Boolean(project)} onClose={onClose} labelledBy="modal-title">
      {project && (
        <>
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

            {(project.challenge || project.solution) && (
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
            )}

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
        </>
      )}
    </Modal>
  )
}
