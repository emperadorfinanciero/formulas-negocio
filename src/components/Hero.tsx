import { motion } from 'framer-motion'
import { Sparkles, ArrowDown, ArrowUpRight, Scale, TrendingUp, Megaphone } from 'lucide-react'
import { HERO, BRAND } from '../config'

const PREVIEW = [
  { Icon: Scale, nombre: 'Punto de Equilibrio', cat: 'Finanzas', valor: '$6.363.636', estado: 'neutral' },
  { Icon: TrendingUp, nombre: 'Margen Neto', cat: 'Rentabilidad', valor: '18,9%', estado: 'positivo' },
  { Icon: Megaphone, nombre: 'ROAS', cat: 'Marketing', valor: '6,0x', estado: 'positivo' },
]

const ESTADO_COLOR: Record<string, string> = {
  positivo: '#25B187',
  neutral: '#ECA819',
}

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="top" className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
      {/* Glow de fondo */}
      <div
        className="pointer-events-none absolute left-1/2 top-[-120px] h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-40 blur-[130px]"
        style={{ background: 'radial-gradient(circle, #ECA819, transparent 70%)' }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Columna de contenido */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left"
        >
          <div className="flex justify-center lg:justify-start">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-xs font-medium text-gold backdrop-blur">
              <Sparkles size={13} />
              {HERO.badge}
            </span>
          </div>

          <h1 className="mt-6 font-display text-[2.5rem] font-bold leading-[1.04] text-warm sm:text-6xl">
            Las fórmulas que necesitás para tomar{' '}
            <span className="text-gradient-gold">mejores decisiones.</span>
          </h1>

          <p className="mt-4 font-display text-2xl text-gold sm:text-3xl">{HERO.subtitulo}</p>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted lg:mx-0">
            {HERO.descripcion}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
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
          <div className="mt-10 flex items-center justify-center gap-8 lg:justify-start">
            {[
              { n: '42', l: 'fórmulas' },
              { n: '4', l: 'áreas del negocio' },
              { n: '<60s', l: 'por cálculo' },
            ].map((s) => (
              <div key={s.l} className="text-center lg:text-left">
                <div className="font-display text-3xl font-bold text-warm">{s.n}</div>
                <div className="text-xs uppercase tracking-wider text-muted">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Columna de preview (dashboard mock) */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="surface-panel relative overflow-hidden p-5">
            {/* logo marca de agua */}
            <img
              src={BRAND.logo}
              alt=""
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 opacity-[0.06]"
            />
            <div className="mb-4 flex items-center gap-2">
              <img src={BRAND.logo} alt="" className="h-6 w-6" />
              <span className="text-sm font-medium text-warm">Tus números, claros</span>
            </div>

            <div className="space-y-3">
              {PREVIEW.map((p, i) => (
                <motion.div
                  key={p.nombre}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.35 + i * 0.12 }}
                  className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] p-3"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/12 text-gold">
                    <p.Icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-warm">{p.nombre}</div>
                    <div className="text-[11px] uppercase tracking-wide text-muted">{p.cat}</div>
                  </div>
                  <div
                    className="font-display text-lg font-bold"
                    style={{ color: ESTADO_COLOR[p.estado] }}
                  >
                    {p.valor}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl border border-gold/20 bg-gold/[0.06] px-4 py-3">
              <span className="text-sm text-warm/90">Explorá las 42 calculadoras</span>
              <ArrowUpRight size={16} className="text-gold" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
