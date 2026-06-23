// Cloudflare Pages Function — backend seguro del Asesor IA (Google Gemini).
//
// Rutas públicas:
//   GET  /api/chat  → { configured: boolean }   (para mostrar "próximamente" si falta la key)
//   POST /api/chat  → { userText, action }       (consulta al asesor)
//
// La API key de Gemini vive SOLO acá, como variable secreta de Cloudflare
// (env.GEMINI_API_KEY). Nunca se expone en el frontend ni en el bundle.
//
// Configuración: Cloudflare → Workers & Pages → formulas-negocio → Settings →
// Environment variables → GEMINI_API_KEY (Secret), en Production y Preview.
// Conseguí una key gratis en https://aistudio.google.com/apikey

// El system prompt es "sagrado": idéntico al definido en el copy del proyecto.
const SYSTEM_PROMPT = `Sos el Asesor Financiero de Emperador Financiero, una herramienta para emprendedores que quieren tomar mejores decisiones con sus números.

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

interface Env {
  GEMINI_API_KEY?: string
  GEMINI_MODEL?: string
}

interface PagesContext {
  request: Request
  env: Env
}

const DEFAULT_MODEL = 'gemini-2.5-flash'

const json = (data: unknown, status = 200): Response =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })

// Reintenta una vez ante 429 / 5xx (errores transitorios del free tier).
async function fetchWithRetry(url: string, init: RequestInit, retries = 1): Promise<Response> {
  let res = await fetch(url, init)
  let intentos = 0
  while (!res.ok && (res.status === 429 || res.status >= 500) && intentos < retries) {
    await new Promise((r) => setTimeout(r, 1200))
    res = await fetch(url, init)
    intentos++
  }
  return res
}

// GET → estado de configuración (sin exponer la key, solo un booleano).
export const onRequestGet = async (context: PagesContext): Promise<Response> => {
  return json({ configured: Boolean(context.env.GEMINI_API_KEY) })
}

// POST → consulta al Asesor IA. Cualquier otro método recibe 405 automáticamente.
export const onRequestPost = async (context: PagesContext): Promise<Response> => {
  const { request, env } = context

  // 1) ¿Está configurada la key? Si no, "próximamente".
  const apiKey = env.GEMINI_API_KEY
  if (!apiKey) {
    return json(
      {
        configured: false,
        error: 'El Asesor IA estará disponible próximamente.',
      },
      503,
    )
  }

  // 2) Body válido con mensaje
  let message = ''
  try {
    const body = (await request.json()) as { message?: unknown }
    message = typeof body.message === 'string' ? body.message.trim() : ''
  } catch {
    return json({ error: 'No pude leer tu consulta. Probá de nuevo.' }, 400)
  }
  if (!message) {
    return json({ error: 'Escribí una consulta para el Asesor IA.' }, 400)
  }
  if (message.length > 2000) {
    return json({ error: 'La consulta es demasiado larga. Resumila un poco.' }, 400)
  }

  // 3) Llamada a Gemini desde el servidor
  const model = env.GEMINI_MODEL || DEFAULT_MODEL
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

  const payload = JSON.stringify({
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [{ role: 'user', parts: [{ text: message }] }],
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 512,
      // Desactiva el "thinking" de 2.5-flash: más rápido y más barato para enrutar.
      thinkingConfig: { thinkingBudget: 0 },
    },
  })

  let geminiRes: Response
  try {
    geminiRes = await fetchWithRetry(
      endpoint,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload },
      1,
    )
  } catch {
    return json({ error: 'No se pudo contactar al Asesor IA. Probá de nuevo en un momento.' }, 502)
  }

  if (!geminiRes.ok) {
    // El cuerpo de error de Gemini NO contiene la API key: es seguro relayarlo para diagnóstico.
    let detalle = ''
    try {
      const errBody = (await geminiRes.json()) as { error?: { message?: string } }
      detalle = (errBody.error?.message ?? '').slice(0, 240)
    } catch {
      /* sin cuerpo legible */
    }

    if (geminiRes.status === 429) {
      return json(
        {
          error:
            'El Asesor IA alcanzó el límite de uso del free tier de Gemini por ahora. Esperá un minuto y probá de nuevo.' +
            (detalle ? ` (Gemini: ${detalle})` : ''),
          retryable: true,
        },
        429,
      )
    }

    return json(
      {
        error:
          `El Asesor IA no está disponible ahora mismo (${geminiRes.status}).` +
          (detalle ? ` ${detalle}` : ''),
      },
      502,
    )
  }

  // 4) Parsear respuesta y separar el texto del JSON de acción
  try {
    const data = (await geminiRes.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
    }
    const parts = data.candidates?.[0]?.content?.parts ?? []
    const fullText = parts
      .map((p) => p.text ?? '')
      .join('')
      .trim()

    if (!fullText) {
      return json({ error: 'No pude interpretar tu consulta. Probá reformularla.' }, 502)
    }

    const jsonMatch = fullText.match(/\{[^}]+\}/)
    const userText = fullText.replace(jsonMatch?.[0] ?? '', '').trim()
    let action: unknown = null
    if (jsonMatch) {
      try {
        action = JSON.parse(jsonMatch[0])
      } catch {
        action = null
      }
    }

    return json({ userText, action })
  } catch {
    return json({ error: 'El Asesor IA devolvió una respuesta inesperada. Probá de nuevo.' }, 502)
  }
}
