import { useEffect } from 'react'
import { motion } from 'motion/react'
import { site } from '../../content/site'

// Wraps every page: jumps to the top and plays the page enter/exit transition.
export default function Page({ title, children }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.title = title ? `${title} | ${site.name}` : `${site.name} | ${site.tagline}`
  }, [title])

  return (
    <motion.main
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  )
}
