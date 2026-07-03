import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown, Calculator, Lightbulb, Copy, Check, ArrowRight } from 'lucide-react'
import type { Calculadora, Interpretacion, InputTipo } from '../data/calculadoras'
import { CALC_META, DEFAULT_ICON } from '../data/calcMeta'
import { BLOQUE_COLOR } from '../config'
import { parseInput, formatNumber } from '../lib/formatters'
import { validateInputs } from '../lib/validators'
import { CALC_RELACIONADAS } from '../data/calcRelacionadas'
import { CALCULADORAS } from '../data/calculadoras'
import ResultBox from './ResultBox'

function hintFor(tipo: InputTipo): string {
  switch (tipo) {
    case 'moneda':
      return 'Monto en pesos. Ej: 1.500.000'
    case 'porcentaje':
      return 'Número sin el símbolo %. Ej: 55 para 55%'
    case 'decimal':
      return 'Número con decimales. Ej: 1,35'
    default:
      return 'Cantidad entera. Ej: 26'
  }
}

export default function CalculatorModal({
  calc,
  onClose,
}: {
  calc: Calculadora
  onClose: () => void
}) {
  const [values, setValues] = useState<Record<string, string>>({})
  const [interpretacion, setInterpretacion] = useState<Interpretacion | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const [formulaAbierta, setFormulaAbierta] = useState(false)
  const [stale, setStale] = useState(false)
  const [copiado, setCopiado] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  const meta = CALC_META[calc.id]
  const Icon = meta?.Icon ?? DEFAULT_ICON
  const categoria = meta?.categoria ?? calc.bloque
  const tagColor = BLOQUE_COLOR[calc.bloque] ?? '#ECA819'

  // Calculadoras relacionadas
  const relacionadasIds = CALC_RELACIONADAS[calc.id] ?? []
  const relacionadas = relacionadasIds
    .map((id) => CALCULADORAS.find((c) => c.id === id))
    .filter(Boolean) as Calculadora[]

  // Cerrar con Escape + bloquear scroll del body
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  // Scroll automático al resultado
  useEffect(() => {
    if (interpretacion && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 100)
    }
  }, [interpretacion])

  function handleCalcular() {
    if (!calc.inputs || !calc.calcular || !calc.interpretar) return
    const parsed: Record<string, number> = {}
    calc.inputs.forEach((f) => {
      parsed[f.id] = parseInput(values[f.id] ?? '')
    })
    const errs = validateInputs(parsed, calc.inputs)
    if (errs.length) {
      setErrors(errs)
      setInterpretacion(null)
      return
    }
    setErrors([])
    setStale(false)
    const resultado = calc.calcular(parsed)
    setInterpretacion(calc.interpretar(resultado, parsed))
  }

  function handleInputChange(id: string, value: string) {
    setValues((prev) => ({ ...prev, [id]: value }))
    if (interpretacion) setStale(true)
  }

  function handleMonedaBlur(id: string) {
    const raw = values[id] ?? ''
    if (!raw) return
    const num = parseInput(raw)
    if (num > 0) {
      setValues((prev) => ({ ...prev, [id]: formatNumber(num) }))
    }
  }

  function handleCopiar() {
    if (!interpretacion) return
    const texto = `${calc.nombre}\n${interpretacion.mensaje}`
    navigator.clipboard.writeText(texto).then(() => {
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    })
  }

  function handleAbrirRelacionada(id: string) {
    onClose()
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('fn:open-calc', { detail: id }))
    }, 250)
  }

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      >
        <motion.div
          key="panel"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          transition={{ type: 'spring', damping: 26, stiffness: 280 }}
          onClick={(e) => e.stopPropagation()}
          className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-gold/20 bg-[#0c1a28] shadow-2xl sm:rounded-3xl"
        >
          {/* Glow superior con color del bloque */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-40 w-2/3 -translate-x-1/2 opacity-30 blur-3xl"
            style={{ background: `radial-gradient(circle, ${tagColor}88, transparent 70%)` }}
          />

          {/* Header */}
          <div className="relative flex items-start gap-4 border-b border-white/10 p-5 sm:p-6">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
              style={{ background: `${tagColor}1f`, color: tagColor }}
            >
              <Icon size={24} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                  style={{ color: tagColor, background: `${tagColor}1a` }}
                >
                  {categoria}
                </span>
              </div>
              <h2 className="mt-1 font-display text-2xl font-bold text-warm">{calc.nombre}</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="rounded-lg p-2 text-muted transition-colors hover:bg-white/5 hover:text-warm"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cuerpo scrolleable */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6">
            {/* Qué es */}
            <p className="text-sm leading-relaxed text-muted">{calc.que_es}</p>

            {/* Ver fórmula (colapsable) */}
            {calc.formula && (
              <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setFormulaAbierta((v) => !v)}
                  className="flex w-full items-center justify-between bg-white/[0.03] px-4 py-3 text-left text-sm font-medium text-warm/85"
                >
                  Ver fórmula
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${formulaAbierta ? 'rotate-180' : ''}`}
                  />
                </button>
                {formulaAbierta && (
                  <div className="p-3">
                    <div className="formula-box">{calc.formula}</div>
                    {calc.ejemplo && (
                      <div className="mt-3 space-y-1 rounded-lg bg-white/[0.02] p-3 text-sm">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-gold/80">
                          Ejemplo
                        </p>
                        <p className="text-muted">{calc.ejemplo.contexto}</p>
                        <p className="whitespace-pre-line text-warm/80">{calc.ejemplo.datos}</p>
                        <p className="whitespace-pre-line font-medium text-gold">
                          {calc.ejemplo.resultado}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Inputs */}
            {calc.inputs && (
              <div className="mt-6">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Tus números
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {calc.inputs.map((field) => (
                    <div key={field.id}>
                      <label
                        htmlFor={`input-${calc.id}-${field.id}`}
                        className="mb-1.5 block text-sm text-warm/85"
                      >
                        {field.label}
                        {field.requerido === false && (
                          <span className="ml-1.5 text-[10px] text-muted/60">(opcional)</span>
                        )}
                      </label>
                      <input
                        id={`input-${calc.id}-${field.id}`}
                        className="input-field"
                        inputMode={
                          field.tipo === 'numero' || field.tipo === 'moneda' ? 'numeric' : 'decimal'
                        }
                        placeholder={field.placeholder}
                        value={values[field.id] ?? ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        onBlur={() => field.tipo === 'moneda' && handleMonedaBlur(field.id)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCalcular()}
                      />
                      <p className="mt-1 text-xs text-muted/60">{hintFor(field.tipo)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Errores */}
            {errors.length > 0 && (
              <ul className="mt-4 space-y-1 rounded-lg border border-danger/30 bg-danger/10 p-3 text-sm text-[#EF5A5F]">
                {errors.map((err) => (
                  <li key={err}>• {err}</li>
                ))}
              </ul>
            )}

            {/* Resultado */}
            {interpretacion && (
              <div className="mt-6" ref={resultRef}>
                <div className="mb-3 flex items-center justify-between">
                  <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    <Lightbulb size={13} className="text-gold" />
                    {stale ? 'Resultado anterior — recalculá' : 'Qué significa este resultado'}
                  </p>
                  <button
                    type="button"
                    onClick={handleCopiar}
                    className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-muted transition-colors hover:text-gold"
                  >
                    {copiado ? <Check size={12} className="text-success" /> : <Copy size={12} />}
                    {copiado ? 'Copiado' : 'Copiar'}
                  </button>
                </div>
                <div className={stale ? 'opacity-50 transition-opacity' : 'transition-opacity'}>
                  <ResultBox interpretacion={interpretacion} />
                </div>

                {/* Calculadoras relacionadas */}
                {relacionadas.length > 0 && !stale && (
                  <div className="mt-4">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                      Tu próximo paso
                    </p>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      {relacionadas.slice(0, 2).map((rel) => {
                        const relMeta = CALC_META[rel.id]
                        const RelIcon = relMeta?.Icon ?? DEFAULT_ICON
                        const relColor = BLOQUE_COLOR[rel.bloque] ?? '#ECA819'
                        return (
                          <button
                            key={rel.id}
                            type="button"
                            onClick={() => handleAbrirRelacionada(rel.id)}
                            className="flex flex-1 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition-all hover:border-white/20 hover:bg-white/[0.06]"
                          >
                            <div
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                              style={{ background: `${relColor}1a`, color: relColor }}
                            >
                              <RelIcon size={16} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-xs font-medium text-warm/90">{rel.nombre}</p>
                              <p className="text-[10px] text-muted/70">{relMeta?.categoria}</p>
                            </div>
                            <ArrowRight size={14} className="shrink-0 text-muted/40" />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                <p className="mt-4 text-center text-[10px] text-muted/40">
                  Cálculo instantáneo · Sin datos almacenados
                </p>
              </div>
            )}
          </div>

          {/* Footer con CTA calcular (sticky) */}
          <div
            className="border-t border-white/10 bg-[#0a141f]/80 p-4 backdrop-blur sm:p-5"
            style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
          >
            <motion.button
              type="button"
              whileTap={{ scale: 0.99 }}
              onClick={handleCalcular}
              className="btn-primary flex min-h-[52px] w-full items-center justify-center gap-2 text-base"
            >
              <Calculator size={18} />
              {stale ? 'Recalcular' : 'Calcular'}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
