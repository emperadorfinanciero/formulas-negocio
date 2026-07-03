import { motion } from 'framer-motion'
import { CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react'
import type { Interpretacion, Semaforo } from '../data/calculadoras'

const SEMAFORO_STYLES: Record<
  Semaforo,
  { color: string; label: string; bg: string; ring: string; Icon: typeof CheckCircle2 }
> = {
  positivo: {
    color: '#25B187',
    label: 'En zona saludable',
    bg: 'rgba(37, 177, 135, 0.10)',
    ring: 'rgba(37, 177, 135, 0.45)',
    Icon: CheckCircle2,
  },
  neutral: {
    color: '#ECA819',
    label: 'Podés mejorar',
    bg: 'rgba(236, 168, 25, 0.10)',
    ring: 'rgba(236, 168, 25, 0.45)',
    Icon: TrendingUp,
  },
  negativo: {
    color: '#EF5A5F',
    label: 'Acción requerida',
    bg: 'rgba(239, 90, 95, 0.10)',
    ring: 'rgba(239, 90, 95, 0.45)',
    Icon: AlertTriangle,
  },
}

// Extrae la cifra principal del mensaje para mostrarla en grande (dashboard).
function headlineFrom(mensaje: string): string | null {
  const match = mensaje.match(/\$\s?[\d.]+(?:,\d+)?|\d+[.,]?\d*\s?%|\d+[.,]?\d*\s?x/i)
  return match ? match[0].replace(/\s/g, '') : null
}

export default function ResultBox({ interpretacion }: { interpretacion: Interpretacion }) {
  const style = SEMAFORO_STYLES[interpretacion.semaforo]
  const { Icon } = style
  const headline = headlineFrom(interpretacion.mensaje)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden rounded-2xl"
      style={{ background: style.bg, border: `1px solid ${style.ring}` }}
    >
      {/* Estado */}
      <div
        className="flex items-center gap-2 px-5 pt-4"
        style={{ color: style.color }}
      >
        <Icon size={18} />
        <span className="text-xs font-semibold uppercase tracking-[0.14em]">{style.label}</span>
      </div>

      {/* Número grande */}
      {headline && (
        <div className="px-5 pt-2">
          <div
            className="font-display text-4xl font-bold leading-none sm:text-5xl"
            style={{ color: style.color }}
          >
            {headline}
          </div>
        </div>
      )}

      {/* Interpretación */}
      <p className="px-5 pb-5 pt-3 text-sm leading-relaxed text-warm/90">
        {interpretacion.mensaje}
      </p>
    </motion.div>
  )
}
