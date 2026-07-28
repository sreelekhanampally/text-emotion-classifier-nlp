import { Link } from 'react-router-dom'
import { Github, Heart, Sparkles } from 'lucide-react'
import Logo from '../ui/Logo'

export default function Footer() {
  return (
    <footer className="relative mt-32">
      <div className="hairline mb-10" />
      <div className="container-app grid gap-10 pb-14 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-3">
            EmotionSense is an AI-powered emotion analysis platform that transforms
            everyday text into meaningful emotional insights through machine learning
  and natural language processing.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink-3">
              Product
            </p>
            <ul className="space-y-2 text-ink-2">
              <li><Link className="hover:text-white transition" to="/analyze">Analyzer</Link></li>
              <li><Link className="hover:text-white transition" to="/about">About</Link></li>
              <li><a className="hover:text-white transition" href="#features">Features</a></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink-3">
              Resources
            </p>
            <ul className="space-y-2 text-ink-2">
              <li><a className="hover:text-white transition" href="#" >Docs</a></li>
              <li><a className="hover:text-white transition" href="#" >API</a></li>
              <li><a className="hover:text-white transition" href="#" >Changelog</a></li>
            </ul>
          </div>
        </div>
        <div className="md:justify-self-end">
  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink-3">
    Connect
  </p>

  <div className="flex items-center gap-2">
    <a
      href="https://github.com/sreelekhanampally"
      target="_blank"
      rel="noreferrer"
      className="btn-ghost h-10 w-10 !p-0"
      aria-label="GitHub"
    >
      <Github className="h-4 w-4" />
    </a>

    <a
      href="https://www.linkedin.com/in/sreelekha-nampally/"
      target="_blank"
      rel="noreferrer"
      className="btn-ghost text-sm"
    >
      <Sparkles className="mr-2 h-4 w-4" />
      LinkedIn
    </a>
  </div>
</div>
      </div>

      <div className="hairline" />
      <div className="container-app flex flex-col items-center justify-between gap-2 py-6 text-xs text-ink-3 md:flex-row">
        <p>© {new Date().getFullYear()} EmotionSense AI · All rights reserved.</p>
        <p className="inline-flex items-center gap-1.5">
  Designed & developed by Sreelekha Nampally.
</p>
      </div>
    </footer>
  )
}
