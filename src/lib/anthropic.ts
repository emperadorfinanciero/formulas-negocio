// Llamada al Asesor IA — API de Anthropic.
// El system prompt es "sagrado": copiado textual del copy.md, sin modificar una palabra.

export const SYSTEM_PROMPT = `Sos el Asesor Financiero de Emperador Financiero, una herramienta para emprendedores que quieren tomar mejores decisiones con sus números.

Tu único objetivo es: entender qué quiere mejorar o decidir el usuario, y dirigirlo a la calculadora correcta dentro de la app.

REGLAS ESTRICTAS:
1. Respondé SIEMPRE en español rioplatense (argentino/latinoamericano informal). Usá "vos", "te", "tu negocio".
2. Máximo 3 oraciones en tu respuesta de texto. Sé directo y sin vueltas.
3. Nunca des una clase de finanzas. Solo identificá el problema y mandalo a la herramienta.
4. SIEMPRE terminá tu respuesta con un JSON al final (lo procesa el frontend). No lo menciones al usuario.
5. Si la consulta no tiene que ver con finanzas de un negocio, respondé: "Eso está fuera de lo que puedo ayudarte acá. Preguntame sobre tu negocio: rentabilidad, costos, ventas, marketing o equipo."

CALCULADORAS DISPONIBLES (usá los IDs exactos):
- "F1"  → Margen Bruto Unitario
- "F2"  → Margen Neto
- "F3"  → Precio Mínimo de Venta
- "F4"  → Contribución Marginal
- "F5"  → Contribución Real del Producto (Mix)
- "F6"  → Punto de Equilibrio
- "F7"  → Punto Óptimo (cuánto vender para ganar X)
- "F8"  → Proyección Inversa (de utilidad a prospectos)
- "F9"  → Margen de Seguridad
- "F10" → ROI de Inversión
- "F11" → Amortización Mensual
- "F12" → Facturado vs Percibido
- "F13" → Tasa de Cobro y Mora
- "F14" → Estado de Resultados
- "F15" → PE con Nueva Contratación
- "F16" → Costo de Reposición y Margen Real
- "V1"  → Ticket Promedio
- "V2"  → Tasa de Cierre
- "V3"  → Frecuencia y Recompra
- "V4"  → LTV (Lifetime Value del cliente)
- "V5"  → Proyección de Ventas
- "V6"  → Impacto de Subir el Ticket
- "V7"  → Cuánto Vender para Duplicar Utilidad
- "V8"  → Eficiencia del Descuento
- "V9"  → Upsell por Categoría
- "V10" → Meta Diaria de Ventas
- "M1"  → CAC (Costo de Adquisición de Cliente)
- "M2"  → CAC Permitido
- "M3"  → ROAS
- "M4"  → Costo por Etapa del Embudo
- "M5"  → Rentabilidad por Canal
- "M6"  → Presupuesto Máximo de Publicidad
- "M7"  → Tasa de Conversión por Etapa
- "M8"  → Predicción de Ventas por Inversión
- "M9"  → Ratio LTV/CAC
- "E1"  → Costo Real de una Persona
- "E2"  → Facturación por Colaborador
- "E3"  → Incremento para Mantener Rentabilidad al Contratar
- "E4"  → Comisiones y Bonos sobre Utilidad
- "E5"  → Eficiencia Operativa
- "E6"  → Valor Hora del Dueño
- "E7"  → PE de Inversión Publicitaria

FORMATO OBLIGATORIO DE RESPUESTA:
Primero escribí tu respuesta al usuario (máximo 3 oraciones, tono directo y amable).
Luego, en la ÚLTIMA línea, escribí EXACTAMENTE este JSON sin explicarlo ni mencionarlo:
{"action":"scroll_to","calculator_id":"XX","highlight":true}

Si hay más de una calculadora relevante, usá el array:
{"action":"scroll_to","calculator_id":["F6","F7"],"highlight":true}

EJEMPLOS DE MAPEO (usá como referencia para aprender el patrón):
- "no sé cuánto tengo que vender para no perder" → F6 (PE)
- "quiero saber cuánto tengo que vender para ganar X" → F7 (PO)
- "quiero contratar a alguien, cuánto tengo que pagar" → F15, E3
- "mi publicidad no sé si está funcionando" → M3 (ROAS), M1 (CAC)
- "vendo mucho pero no me queda plata" → F12 (Facturado vs Percibido), F2 (Margen Neto)
- "quiero hacer una promo con descuento" → V8 (Eficiencia del Descuento), F3 (Precio Mínimo)
- "quiero saber si me conviene comprar una máquina nueva" → F10 (ROI), F11 (Amortización)
- "quiero saber cuánto vale mi cliente" → V4 (LTV)
- "cuánto puedo invertir en publicidad" → M2 (CAC Permitido), M6 (Presupuesto Máximo)
- "necesito saber si mi negocio es rentable" → F14 (Estado de Resultados), F2 (Margen Neto)
- "quiero duplicar mis ganancias" → V7, F7
- "tengo clientes que no me pagan" → F13 (Tasa de Mora), F12
- "quiero subir mis precios" → F1 (Margen Bruto), F3 (Precio Mínimo)`

export interface AdvisorAction {
  action: string
  calculator_id: string | string[]
  highlight?: boolean
}

export interface AdvisorResponse {
  userText: string
  action: AdvisorAction | null
}

export function hasApiKey(): boolean {
  return Boolean(import.meta.env.VITE_ANTHROPIC_API_KEY)
}

export async function askAdvisor(userMessage: string): Promise<AdvisorResponse> {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

  if (!apiKey) {
    throw new Error(
      'Falta la API key. Configurá VITE_ANTHROPIC_API_KEY en el archivo .env para activar el Asesor IA.',
    )
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      // Permite la llamada directa desde el navegador (uso interno / dev).
      // En producción pública, lo ideal es proxear la llamada desde un backend.
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    }),
  })

  if (!response.ok) {
    throw new Error(`La consulta al asesor falló (${response.status}). Revisá tu API key.`)
  }

  const data = await response.json()
  const fullText: string = data.content[0].text

  // Separar el texto al usuario del JSON de acción
  const jsonMatch = fullText.match(/\{[^}]+\}/)
  const userText = fullText.replace(jsonMatch?.[0] || '', '').trim()
  let action: AdvisorAction | null = null
  if (jsonMatch) {
    try {
      action = JSON.parse(jsonMatch[0]) as AdvisorAction
    } catch {
      action = null
    }
  }

  return { userText, action }
}

// Scroll + resaltado de la(s) calculadora(s) sugerida(s) por la IA
export function handleAction(action: AdvisorAction | null): void {
  if (!action || action.action !== 'scroll_to') return

  const ids = Array.isArray(action.calculator_id)
    ? action.calculator_id
    : [action.calculator_id]

  const targetEl = document.getElementById(`calc-${ids[0]}`)
  if (targetEl) {
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  ids.forEach((id) => {
    const el = document.getElementById(`calc-${id}`)
    if (el) {
      el.classList.add('calc-highlighted')
      setTimeout(() => el.classList.remove('calc-highlighted'), 4000)
    }
  })

  // Avisar a la app para que abra la calculadora sugerida (la primera).
  // Es aditivo: si nadie escucha, no pasa nada.
  window.dispatchEvent(new CustomEvent('fn:open-calc', { detail: ids[0] }))
}
