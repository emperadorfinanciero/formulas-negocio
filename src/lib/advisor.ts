// Cliente del Asesor IA (frontend).
//
// IMPORTANTE: el frontend NO conoce ninguna API key. Llama a la Cloudflare Pages
// Function /api/chat, que es la que habla con el proveedor de IA (Gemini) desde
// el servidor. El system prompt y el secreto viven en functions/api/chat.ts + Cloudflare.

export interface AdvisorAction {
  action: string
  calculator_id: string | string[]
  highlight?: boolean
}

export interface AdvisorResponse {
  userText: string
  action: AdvisorAction | null
}

// Consulta si el Asesor IA está configurado (sin exponer secretos: solo un booleano).
// Si la ruta no existe (ej: `vite dev` sin Functions) o falla, asumimos no disponible.
export async function getAdvisorStatus(): Promise<boolean> {
  try {
    const res = await fetch('/api/chat', { method: 'GET' })
    if (!res.ok) return false
    const data = (await res.json()) as { configured?: boolean }
    return Boolean(data.configured)
  } catch {
    return false
  }
}

export async function askAdvisor(userMessage: string): Promise<AdvisorResponse> {
  let res: Response
  try {
    res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    })
  } catch {
    throw new Error('No se pudo contactar al Asesor IA. Revisá tu conexión y probá de nuevo.')
  }

  let data: { userText?: string; action?: AdvisorAction | null; error?: string } | null = null
  try {
    data = await res.json()
  } catch {
    data = null
  }

  if (!res.ok) {
    throw new Error(
      data?.error ?? 'El Asesor IA no está disponible ahora mismo. Probá de nuevo en un momento.',
    )
  }

  return { userText: data?.userText ?? '', action: data?.action ?? null }
}

// Scroll + resaltado de la(s) calculadora(s) sugerida(s) por la IA.
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
