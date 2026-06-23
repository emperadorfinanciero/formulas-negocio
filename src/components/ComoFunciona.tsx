import { motion } from 'framer-motion'
import { MousePointerClick, Keyboard, BarChart3 } from 'lucide-react'
import { PASOS } from '../config'

const ICONOS = [MousePointerClick, Keyboard, BarChart3]

export default function ComoFunciona() {
  return (
    <section className="relative px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold/80">
            Cómo funciona
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-warm sm:text-4xl">
            De la duda al número, en tres pasos
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            Simple y directo. Si no podés usarlo en menos de 60 segundos, sobra.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {PASOS.map((paso, i) => {
            const Icon = ICONOS[i]
            return (
              <motion.div
                key={paso.titulo}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="surface-panel p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/12 text-gold">
                    <Icon size={22} />
                  </div>
                  <span className="font-display text-4xl font-bold text-white/8">0{i + 1}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-warm">{paso.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{paso.texto}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
