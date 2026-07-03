import { memo } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Calculadora } from '../data/calculadoras'
import { CALC_META, DEFAULT_ICON } from '../data/calcMeta'
import { BLOQUE_COLOR } from '../config'

function CalculatorCard({
  calc,
  onSelect,
}: {
  calc: Calculadora
  onSelect: (calc: Calculadora) => void
}) {
  const meta = CALC_META[calc.id]
  const Icon = meta?.Icon ?? DEFAULT_ICON
  const categoria = meta?.categoria ?? calc.bloque
  const tagColor = BLOQUE_COLOR[calc.bloque] ?? '#ECA819'

  return (
    <motion.button
      type="button"
      id={`calc-${calc.id}`}
      onClick={() => onSelect(calc)}
      whileTap={{ scale: 0.985 }}
      className="card-premium edge-gold group flex h-full flex-col p-5 text-left"
    >
      <span className="edge-gold" aria-hidden />

      {/* Encabezado: ícono + tag */}
      <div className="flex items-start justify-between">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
          style={{ background: `${tagColor}1a`, color: tagColor }}
        >
          <Icon size={22} />
        </div>
        <span
          className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
          style={{ color: tagColor, background: `${tagColor}14` }}
        >
          {categoria}
        </span>
      </div>

      {/* Nombre + id */}
      <div className="mt-4 flex items-center gap-2">
        <span className="text-[11px] font-semibold text-gold/70">{calc.id}</span>
      </div>
      <h3 className="mt-0.5 font-display text-xl font-semibold leading-tight text-warm">
        {calc.nombre}
      </h3>

      {/* Descripción breve */}
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{calc.que_es}</p>

      {/* CTA */}
      <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-gold/80 transition-colors group-hover:text-gold">
        Abrir calculadora
        <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </motion.button>
  )
}

export default memo(CalculatorCard)
