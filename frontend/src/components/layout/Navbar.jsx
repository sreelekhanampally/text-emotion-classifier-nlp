import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Github, Sparkles } from 'lucide-react'
import Logo from '../ui/Logo'
import { cn } from '../../utils/cn'

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/analyze', label: 'Analyzer' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const location = useLocation()
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-40"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-surface-0/80 via-surface-0/40 to-transparent backdrop-blur-xl" />
      <div className="container-app relative flex items-center justify-between py-4">
        <Link to="/" className="ring-brand rounded-xl">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-xl md:flex">
          {NAV.map((item) => {
            const active =
              item.to === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.to)
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={cn(
                  'relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                  active ? 'text-white' : 'text-ink-2 hover:text-white',
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(139,92,246,0.35), rgba(124,58,237,0.25))',
                      boxShadow:
                        '0 8px 30px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-ink-2 backdrop-blur-md transition-all hover:text-white hover:bg-white/[0.08] md:inline-flex ring-brand"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <Link
            to="/analyze"
            className="btn-primary py-2.5 pl-4 pr-5 text-sm"
          >
            <Sparkles className="h-4 w-4" />
            Try it
          </Link>
        </div>
      </div>
    </motion.header>
  )
}
