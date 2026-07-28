# EmotionSense AI — Frontend

A production-grade emotion analysis dashboard for text. Built with React 19,
Vite, TailwindCSS, Framer Motion and Recharts.

## Quickstart

```bash
npm install
npm run dev       # http://localhost:3000
npm run build
npm run preview
```

Backend base URL is set in `src/constants/config.js`
(`https://emotionsense-backend-yqmq.onrender.com`).

## Structure

```
src/
  assets/
  components/
    ui/            reusable primitives (Button, GlassCard, Logo)
    layout/        Navbar, Footer
    backgrounds/   Aurora, ParticleField
  features/
    landing/       Hero, Features, Stats, HowItWorks, CTA
    analyzer/      Form, Loading, Error, Result dashboard + charts
  hooks/           usePrediction
  services/        api.js (axios instance + predict)
  pages/           LandingPage, AnalyzerPage, AboutPage, NotFoundPage
  layouts/         RootLayout
  routes/          AppRoutes
  constants/       config, emotions
  utils/           cn, format
  styles/          index.css (Tailwind + theme)
```

## Design system

- Dark mode only, aurora + glassmorphism.
- Primary palette: `#6D28D9 · #7C3AED · #8B5CF6 · #A855F7 · #C084FC`.
- Typography: Space Grotesk (display) + Inter (body) + JetBrains Mono (mono).
