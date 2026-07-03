import { useState } from 'react'
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
  const [filtroCategoria, setFiltroCategoria] = useState<string | null>(null)

  const categorias = Array.from(
    new Set(calculadoras.map((c) => CALC_META[c.id]?.categoria).filter(Boolean)),
  ) as string[]

  const calcsMostradas = filtroCategoria
    ? calculadoras.filter((c) => CALC_META[c.id]?.categoria === filtroCategoria)
    : calculadoras

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

          {/* Filtros de subcategoría — ahora clickeables */}
          {categorias.length > 1 && (
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setFiltroCategoria(null)}
                className={`rounded-full px-3 py-1 text-xs transition-all ${
                  filtroCategoria === null
                    ? 'font-medium text-warm'
                    : 'text-muted hover:text-warm/70'
                }`}
                style={
                  filtroCategoria === null
                    ? { background: `${color}22`, border: `1px solid ${color}55`, color }
                    : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }
                }
              >
                Todas
              </button>
              {categorias.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFiltroCategoria(filtroCategoria === cat ? null : cat)}
                  className={`rounded-full px-3 py-1 text-xs transition-all ${
                    filtroCategoria === cat
                      ? 'font-medium'
                      : 'text-muted hover:text-warm/70'
                  }`}
                  style={
                    filtroCategoria === cat
                      ? { background: `${color}22`, border: `1px solid ${color}55`, color }
                      : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }
                  }
                >
                  {cat}
                </button>
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
          {calcsMostradas.map((calc) => (
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

        {filtroCategoria && calcsMostradas.length === 0 && (
          <p className="mt-8 text-center text-sm text-muted">
            No hay fórmulas en esta categoría.
          </p>
        )}
      </div>
    </section>
  )
}
