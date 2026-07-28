import { motion } from 'framer-motion'
import { BrainCircuit, Server, Layers, Cpu } from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'

const TECH = [
  { name: 'React 19', tag: 'Frontend' },
  { name: 'Vite', tag: 'Build Tool' },
  { name: 'Tailwind CSS', tag: 'Styling' },
  { name: 'Framer Motion', tag: 'Animation' },

  { name: 'Node.js', tag: 'Runtime' },
  { name: 'Express.js', tag: 'Backend' },
  { name: 'FastAPI', tag: 'AI Service' },

  { name: 'Scikit-learn', tag: 'Machine Learning' },
  { name: 'TF-IDF', tag: 'Feature Extraction' },
  { name: 'Linear SVM', tag: 'Classifier' },
  { name: 'NLTK', tag: 'NLP' },

  { name: 'Docker', tag: 'Containerization' },
  { name: 'Render', tag: 'Deployment' },
]

export default function AboutPage() {
  return (
    <section className="container-app py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl text-center"
      >
        <span className="chip">About the project</span>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          The Technology Behind <span className="gradient-text">EmotionSense</span>
        </h1>
        <p className="mt-4 text-ink-2">
EmotionSense is a full-stack AI application that combines natural language processing with machine learning to understand emotions expressed in text. Every prediction flows through a scalable pipeline designed for speed, reliability, and real-world use.        </p>
      </motion.div>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        <GlassCard>
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700">
              <BrainCircuit className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Emotion Model</h3>
              <p className="mt-1 text-sm text-ink-2">
                The prediction engine is trained to recognize six emotions: <em>joy, love, surprise, sadness, fear,
                anger</em>Each prediction includes confidence values and probability scores to make results transparent and easy to interpret. 
              </p>
            </div>
          </div>
        </GlassCard>
        <GlassCard>
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700">
              <Server className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Prediction Engine</h3>
              <p className="mt-1 text-sm text-ink-2">
                Every sentence passes through a preprocessing pipeline before being transformed into numerical features and evaluated by the trained classification model. The API returns structured JSON responses that are ready for integration.
              </p>
            </div>
          </div>
        </GlassCard>
        <GlassCard>
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Real-Time Analysis</h3>
              <p className="mt-1 text-sm text-ink-2">
                EmotionSense analyzes text instantly without requiring long processing times. The application is optimized to deliver fast predictions while maintaining consistent performance.
              </p>
            </div>
          </div>
        </GlassCard>
        <GlassCard>
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700">
              <Cpu className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Built for Developers</h3>
              <p className="mt-1 text-sm text-ink-2">
                The backend exposes a simple REST API that can be integrated into web applications, dashboards, customer support tools, chat systems, or research projects.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="mt-14">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-ink-3">
          Tech stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {TECH.map((t) => (
            <span
              key={t.name}
              className="chip"
              title={t.tag}
            >
              <span className="text-white">{t.name}</span>
              <span className="text-ink-3">·</span>
              <span className="text-ink-3">{t.tag}</span>
            </span>
          ))}
        </div>
      </div>
      <div>
      <p className="text-sm text-ink-2 mt-14">
  Learn how EmotionSense was built, from model training to deployment.
</p>

<a
  href="https://github.com/sreelekhanampally/text-emotion-classifier-nlp/blob/main/README.md"
  target="_blank"
  rel="noreferrer"
  className="btn-ghost mt-4"
>
  View Technical Documentation →
</a></div>
    </section>
  )
}
