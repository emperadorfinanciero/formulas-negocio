import { motion } from 'framer-motion'
import { Sparkles, ArrowDown } from 'lucide-react'
import { HERO } from '../config'

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="top" className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
      {/* Glow de fondo */}
      <div
        className="pointer-events-none absolute left-1/2 top-[-120px] h-[560px] w-[560px] -translate-x-1/2 rounded-full opacity-40 blur-[140px]"
        style={{ background: 'radial-gradient(circle, #ECA819, transparent 70%)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-4xl text-center"
      >
        {/* Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-xs font-medium text-gold backdrop-blur">
            <Sparkles size={13} />
            {HERO.badge}
          </span>
        </div>

        {/* Título dominante */}
        <h1 className="mx-auto mt-7 max-w-3xl font-display text-5xl font-bold leading-[1.02] text-warm sm:text-7xl lg:text-[5rem]">
          Las <span className="text-gradient-gold">fórmulas</span> que necesitás para tomar{' '}
          <span className="text-gradient-gold">mejores decisiones</span>
        </h1>

        {/* Subtítulo */}
        <p className="mx-auto mt-5 font-display text-2xl text-gold sm:text-3xl">
          {HERO.subtitulo}
        </p>

        {/* Descripción */}
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted">
          {HERO.descripcion}
        </p>

        {/* CTAs centrados */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => scrollTo('finanzas')}
            className="btn-primary flex w-full items-center justify-center gap-2 sm:w-auto"
          >
            {HERO.ctaPrimario}
            <ArrowDown size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollTo('chat-ia')}
            className="btn-secondary flex w-full items-center justify-center gap-2 sm:w-auto"
          >
            <Sparkles size={16} />
            {HERO.ctaSecundario}
          </button>
        </div>

        {/* Métricas de confianza */}
        <div className="mt-12 flex items-center justify-center gap-8 sm:gap-12">
          {[
            { n: '42', l: 'fórmulas' },
            { n: '4', l: 'áreas del negocio' },
            { n: '<60s', l: 'por cálculo' },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-display text-3xl font-bold text-warm sm:text-4xl">{s.n}</div>
              <div className="mt-0.5 text-xs uppercase tracking-wider text-muted">{s.l}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
