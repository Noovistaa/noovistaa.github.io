import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import TiltCard from '../effects/TiltCard'
import ProjectCover from './ProjectCover'

// Clicking a card opens its details on the Projects page (/projects?project=slug).
export default function ProjectCard({ project }) {
  return (
    <Link to={`/projects?project=${project.slug}`} className="project-card" aria-label={`${project.title}: view details`}>
      <TiltCard className="project-card-inner" max={5}>
        <ProjectCover project={project} />
        <div className="project-body">
          <div className="project-meta">
            <span className="tag">{project.category}</span>
            <span className="project-year">{project.year}</span>
          </div>
          <h3 className="project-title">
            {project.title}
            <span className="project-arrow">
              <ArrowUpRight size={18} />
            </span>
          </h3>
          <p className="muted">{project.summary}</p>
        </div>
      </TiltCard>
    </Link>
  )
}
