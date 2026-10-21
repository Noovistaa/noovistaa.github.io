import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { featuredProjects } from '../../content/home'
import { projects } from '../../content/projects'
import Reveal from '../effects/Reveal'
import ProjectCard from '../ui/ProjectCard'

export default function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured).slice(0, 3)
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="eyebrow">{featuredProjects.eyebrow}</span>
            <h2>{featuredProjects.title}</h2>
            <p className="lead" style={{ marginTop: 16 }}>
              {featuredProjects.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/projects" className="link-arrow">
              View all projects <ArrowRight />
            </Link>
          </Reveal>
        </div>

        <div className="projects-grid featured">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className={i === 0 ? 'is-large' : undefined}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
