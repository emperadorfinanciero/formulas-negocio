import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Send, Loader2, Clock, ArrowDown } from 'lucide-react'
import { askAdvisor, getAdvisorStatus, handleAction } from '../lib/advisor'

interface Mensaje {
  rol: 'user' | 'assistant'
  texto: string
}

const SUGERENCIAS = [
  'No sé cuánto tengo que vender para no perder',
  'Vendo mucho pero no me queda plata',
  'Quiero contratar a alguien, ¿cuánto le puedo pagar?',
  'Quiero saber si me conviene comprar una máquina',
]

export default function ChatIA() {
  const [input, setInput] = useState('')
  const [mensajes, setMensajes] = useState<Mensaje[]>([])
  const [cargando, setCargando] = useState(false)
  // null = verificando · true = disponible · false = "próximamente"
  const [disponible, setDisponible] = useState<boolean | null>(null)

  useEffect(() => {
    let activo = true
    getAdvisorStatus().then((ok) => {
      if (activo) setDisponible(ok)
    })
    return () => {
      activo = false
    }
  }, [])

  async function enviar(texto: string) {
    const consulta = texto.trim()
    if (!consulta || cargando) return

    setMensajes((prev) => [...prev, { rol: 'user', texto: consulta }])
    setInput('')
    setCargando(true)

    try {
      const { userText, action } = await askAdvisor(consulta)
      setMensajes((prev) => [...prev, { rol: 'assistant', texto: userText }])
      // pequeña espera para que el mensaje se renderice antes de hacer scroll
      setTimeout(() => handleAction(action), 300)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Algo salió mal. Probá de nuevo.'
      setMensajes((prev) => [...prev, { rol: 'assistant', texto: msg }])
    } finally {
      setCargando(false)
    }
  }

  return (
    <section id="chat-ia" className="relative px-4 py-16 sm:px-6">
      <div
        className="pointer-events-none absolute left-1/2 top-10 h-64 w-[80%] max-w-xl -translate-x-1/2 opacity-25 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #ECA819, transparent 70%)' }}
      />
      <div className="relative mx-auto max-w-2xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-xs font-medium text-gold backdrop-blur">
            <Sparkles size={13} />
            Asesor IA
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-warm sm:text-4xl">
            ¿Qué querés mejorar o decidir hoy?
          </h2>
          <p className="mt-3 text-muted">
            Contame tu situación y te llevo directo a la herramienta que necesitás.
          </p>
        </div>

        {disponible === false ? (
          /* ---- Estado "próximamente" (no hay IA configurada) ---- */
          <div className="surface-panel mt-8 p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/12 text-gold">
              <Clock size={22} />
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-warm">
              Asesor IA · Próximamente
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
              Estamos terminando de afinar el asesor inteligente. Mientras tanto, ya podés usar las
              42 calculadoras: elegí la que necesités y obtené tu resultado en segundos.
            </p>
            <button
              type="button"
              onClick={() =>
                document.getElementById('finanzas')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="btn-secondary mt-5 inline-flex items-center gap-2"
            >
              Ver las 42 fórmulas
              <ArrowDown size={16} />
            </button>
          </div>
        ) : (
          /* ---- Chat activo (o verificando) ---- */
          <div className="surface-panel mt-8 p-5">
            {/* Historial */}
            {mensajes.length > 0 && (
              <div className="mb-4 max-h-72 space-y-3 overflow-y-auto pr-1">
                {mensajes.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.rol === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        m.rol === 'user'
                          ? 'bg-gold text-[#0B2433]'
                          : 'bg-white/[0.06] text-warm/90'
                      }`}
                    >
                      {m.texto}
                    </div>
                  </div>
                ))}
                {cargando && (
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <Loader2 size={15} className="animate-spin" />
                    El asesor está pensando…
                  </div>
                )}
              </div>
            )}

            {/* Input */}
            <div className="flex flex-col gap-3">
              <textarea
                className="input-field min-h-[88px] resize-none"
                placeholder="Ej: no sé si mi publicidad está funcionando…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) enviar(input)
                }}
              />
              <motion.button
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => enviar(input)}
                disabled={cargando || !input.trim()}
                className="btn-primary flex min-h-[48px] items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {cargando ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                Consultar al asesor
              </motion.button>
            </div>

            {/* Sugerencias rápidas */}
            {mensajes.length === 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {SUGERENCIAS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => enviar(s)}
                    className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-muted transition-colors hover:border-gold hover:text-gold"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
