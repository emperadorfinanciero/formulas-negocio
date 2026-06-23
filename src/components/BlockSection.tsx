import { motion } from 'framer-motion'
import type { Bloque, Calculadora } from '../data/calculadoras'
import { BLOQUE_COLOR } from '../config'
import { CALC_META } from '../data/calcMeta'
import CalculatorCard from './CalculatorCard'

interface Props {
  id: string
  nombre: Bloque
  descripcion: string
  calculadoras: Calculadora[]
  onSelect: (calc: Calculadora) => void
}

export default function BlockSection({ id, nombre, descripcion, calculadoras, onSelect }: Props) {
  const color = BLOQUE_COLOR[nombre] ?? '#ECA819'

  // Categorías granulares presentes en este bloque (para los chips del header)
  const categorias = Array.from(
    new Set(calculadoras.map((c) => CALC_META[c.id]?.categoria).filter(Boolean)),
  ) as string[]

  return (
    <section id={id} className="relative px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header de categoría */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <span
              className="h-8 w-1.5 rounded-full"
              style={{ background: color, boxShadow: `0 0 16px ${color}` }}
            />
            <h2 className="font-display text-3xl font-bold text-warm sm:text-4xl">{nombre}</h2>
            <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-muted">
              {calculadoras.length} fórmulas
            </span>
          </div>
          <p className="mt-3 max-w-2xl text-muted">{descripcion}</p>

          {categorias.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {categorias.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full bg-white/[0.04] px-3 py-1 text-xs text-muted"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Grilla de calculadoras */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.05 } },
          }}
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {calculadoras.map((calc) => (
            <motion.div
              key={calc.id}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
              className="h-full"
            >
              <CalculatorCard calc={calc} onSelect={onSelect} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
