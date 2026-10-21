import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { nav, site } from '../../content/site'
import Logo from '../ui/Logo'

export default function Navbar() {
  const { pathname } = useLocation()
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // Hide when scrolling down, show again when scrolling up.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(y > 20)
    setHidden(y > previous && y > 240 && !open)
  })

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        className={`navbar ${scrolled ? 'is-scrolled' : ''}`}
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container navbar-inner">
          <Link to="/" aria-label={`${site.name} home`}>
            <Logo />
          </Link>

          <nav className="navbar-links" aria-label="Main">
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className="navbar-link">
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="navbar-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="navbar-link-label">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <Link to="/contact" className="btn btn-primary navbar-cta">
            Start a project <ArrowUpRight />
          </Link>

          <button className="navbar-burger" onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="container mobile-menu-links" aria-label="Mobile">
              {nav.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink to={item.to} end={item.to === '/'} className="mobile-menu-link">
                    <span className="mobile-menu-index">0{i + 1}</span>
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.a
                href={`mailto:${site.email}`}
                className="mobile-menu-email"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
              >
                {site.email}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
