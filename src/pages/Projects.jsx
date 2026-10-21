// The Projects page. Projects are listed in src/content/projects.js —
// filter tabs are created automatically from each project's "category".
import { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { projects, projectsHeader } from '../content/projects'
import Page from '../components/layout/Page'
import PageHeader from '../components/sections/PageHeader'
import CTA from '../components/sections/CTA'
import ProjectCard from '../components/ui/ProjectCard'
import ProjectModal from '../components/ui/ProjectModal'

const categories = ['All', ...new Set(projects.map((p) => p.category))]

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [searchParams, setSearchParams] = useSearchParams()
  const openProject = projects.find((p) => p.slug === searchParams.get('project'))
  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter)
  const closeModal = useCallback(() => setSearchParams({}, { replace: true }), [setSearchParams])

  return (
    <Page title="Projects">
      <PageHeader {...projectsHeader} />

      <section className="section section-flush-top">
        <div className="container">
          <LayoutGroup>
            <div className="filters" role="group" aria-label="Filter projects">
              {categories.map((c) => {
                const count = c === 'All' ? projects.length : projects.filter((p) => p.category === c).length
                const active = filter === c
                return (
                  <button key={c} className={`filter ${active ? 'is-active' : ''}`} onClick={() => setFilter(c)} aria-pressed={active}>
                    {active && <motion.span layoutId="filter-pill" className="filter-pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                    <span className="filter-label">{c}</span>
                    <span className="filter-count">{count}</span>
                  </button>
                )
              })}
            </div>

            <motion.div layout className="projects-grid">
              <AnimatePresence mode="popLayout">
                {visible.map((p) => (
                  <motion.div
                    key={p.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ProjectCard project={p} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </div>
      </section>

      <CTA />
      <ProjectModal project={openProject} onClose={closeModal} />
    </Page>
  )
}
