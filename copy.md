# SUPER PROMPT — CALCULADORA FINANCIERA EMPERADOR FINANCIERO
**Para:** Agente de código / Claude Code / Cursor / Windsurf  
**Versión:** 1.0  
**Propietario:** Angelo Nisi — Emperador Financiero  
**Fecha:** Junio 2026

---

## 0. CONTEXTO Y OBJETIVO

Vas a construir una **aplicación web interactiva de calculadora financiera** para emprendedores de negocios físicos y digitales. La aplicación se llama **"Conquistá Tus Números"** y es una herramienta de Emperador Financiero (marca de Angelo Nisi).

**Objetivo central:** Un emprendedor entra a la app, habla con un chat de IA que entiende su problema o decisión, y la IA lo lleva directo a la calculadora exacta que necesita — con la fórmula explicada, un ejemplo real y los campos para ingresar sus propios números. Al calcular, recibe el resultado y una interpretación breve de qué significa para su negocio.

**Filosofía de diseño:** Simple, directo, sin vueltas. Si un emprendedor sin conocimientos financieros no puede usarlo en menos de 60 segundos, es demasiado complejo.

**Stack sugerido (el agente puede proponer alternativas):**
- React + Vite (o Next.js si se prefiere)
- Tailwind CSS para estilos
- API de Anthropic (`claude-sonnet-4-6`) para el chat de IA
- Sin base de datos — todo en memoria del cliente (no se persisten datos del usuario)
- Deploy: Cloudflare Pages (subida directa de archivos estáticos)

---

## 1. IDENTIDAD VISUAL — BRANDING OBLIGATORIO

Todo el diseño debe respetar estrictamente esta identidad. No se improvisa ni se sustituye por otra paleta.

### 1.1 Paleta de colores

```css
/* Colores principales */
--color-gold:        #ECA819;   /* Dorado principal — CTAs, highlights, títulos clave */
--color-gold-dark:   #CE9123;   /* Dorado oscuro — hover de botones, bordes activos */
--color-gold-bright: #EBBF09;   /* Dorado brillante — destellos, íconos activos */
--color-navy:        #20274D;   /* Azul marino — fondos de secciones, navbar */
--color-dark:        #0B2433;   /* Azul negro — fondo principal dark, cards oscuras */
--color-white:       #FFFFFF;   /* Blanco — textos sobre oscuro, fondos de inputs */
--color-black:       #000000;   /* Negro — textos sobre blanco */

/* Colores funcionales para resultados */
--color-success:     #1D9E75;   /* Verde — resultado positivo, en zona de ganancia */
--color-warning:     #F59E0B;   /* Amarillo — zona de alerta, cerca del límite */
--color-danger:      #DC2626;   /* Rojo — resultado negativo, pérdida, acción urgente */
```

### 1.2 Tipografía

```css
/* Opción A — Google Fonts (cargar en el <head>) */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');

--font-display: 'Cormorant Garamond', serif;   /* Títulos principales, hero */
--font-body:    'Outfit', sans-serif;           /* Todo lo demás */

/* Escala tipográfica */
--text-hero:    clamp(2rem, 5vw, 3.5rem);      /* Título hero */
--text-h1:      clamp(1.5rem, 3vw, 2.25rem);   /* Títulos de sección */
--text-h2:      1.25rem;                        /* Subtítulos */
--text-h3:      1rem;                           /* Labels de fórmulas */
--text-body:    0.9375rem;                      /* Texto normal */
--text-small:   0.8125rem;                      /* Texto auxiliar */
--text-mono:    0.875rem;                       /* Fórmulas matemáticas */
```

### 1.3 Estilos base

```css
/* Superficies */
.surface-dark    { background: #0B2433; }
.surface-navy    { background: #20274D; }
.surface-card    { background: #0F2D40; border: 1px solid rgba(236,168,25,0.15); }
.surface-light   { background: #F8F7F4; }
.surface-input   { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); }

/* Botón primario */
.btn-primary {
  background: #ECA819;
  color: #0B2433;
  font-weight: 600;
  font-family: 'Outfit', sans-serif;
  border-radius: 8px;
  padding: 12px 24px;
  transition: background 0.2s;
}
.btn-primary:hover { background: #CE9123; }

/* Botón secundario */
.btn-secondary {
  background: transparent;
  color: #ECA819;
  border: 1px solid #ECA819;
  border-radius: 8px;
  padding: 10px 20px;
}

/* Input */
.input-field {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 8px;
  color: white;
  padding: 12px 16px;
  font-family: 'Outfit', sans-serif;
  font-size: 0.9375rem;
  width: 100%;
  transition: border-color 0.2s;
}
.input-field:focus { border-color: #ECA819; outline: none; }
.input-field::placeholder { color: rgba(255,255,255,0.35); }

/* Resultado positivo */
.result-positive { color: #1D9E75; font-weight: 600; }
/* Resultado negativo */
.result-negative { color: #DC2626; font-weight: 600; }
/* Resultado neutral */
.result-neutral  { color: #ECA819; font-weight: 600; }

/* Caja de fórmula */
.formula-box {
  font-family: 'Courier New', monospace;
  background: rgba(236,168,25,0.08);
  border-left: 3px solid #ECA819;
  border-radius: 0 8px 8px 0;
  padding: 12px 16px;
  font-size: 0.875rem;
  color: rgba(255,255,255,0.85);
  line-height: 1.6;
}
```

### 1.4 Firma de marca

Todo el pie de página y los outputs deben incluir:
```
Emperador Financiero · Angelo Nisi · @emperadorfinanciero
```

---

## 2. ARQUITECTURA DE LA APLICACIÓN

### 2.1 Estructura de pantallas (single-page app con scroll o navegación por tabs)

```
┌──────────────────────────────────────────────────────────┐
│  NAVBAR                                                   │
│  Logo EF  |  Finanzas  Ventas  Marketing  Equipo  | [IA] │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  HERO SECTION                                             │
│  "Las fórmulas que necesitás para tomar decisiones"      │
│  [Botón: Hablar con el Asesor IA ↓]                      │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  CHAT IA — SECCIÓN DESTACADA                             │
│  "¿Qué querés mejorar en tu negocio?"                    │
│  [Input de texto  →  IA responde + redirige]             │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  BLOQUE FINANZAS                                          │
│  [Tarjetas de calculadoras — F1 a F16]                   │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  BLOQUE VENTAS                                            │
│  [Tarjetas de calculadoras — V1 a V10]                   │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  BLOQUE MARKETING                                         │
│  [Tarjetas de calculadoras — M1 a M9]                    │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  BLOQUE EQUIPO                                            │
│  [Tarjetas de calculadoras — E1 a E7]                    │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  FOOTER — Firma EF                                        │
└──────────────────────────────────────────────────────────┘
```

### 2.2 Componente de Calculadora — Estructura fija

Cada calculadora individual tiene SIEMPRE esta estructura de 5 partes. No se cambia el orden ni se omite ninguna:

```
┌─────────────────────────────────────────────────────┐
│ [NÚMERO + NOMBRE DE LA FÓRMULA]              [TAG]  │
│ Ej: F6 · Punto de Equilibrio          [Finanzas]    │
├─────────────────────────────────────────────────────┤
│ PARTE 1 — QUÉ ES                                    │
│ Una línea. Explicación en lenguaje simple.           │
│                                                     │
│ PARTE 2 — FÓRMULA                                   │
│ ┌─────────────────────────────────────────────────┐ │
│ │ PE = Gastos Fijos ÷ % Margen Bruto              │ │
│ └─────────────────────────────────────────────────┘ │
│                                                     │
│ PARTE 3 — EJEMPLO REAL (colapsable, abierto default)│
│ Contexto: Negocio físico con MB 55%                 │
│ GF: $3.500.000 · MB: 55%                           │
│ Resultado: $6.363.636 → Necesitás vender eso para  │
│            no perder un peso.                       │
│                                                     │
│ PARTE 4 — TUS NÚMEROS (inputs interactivos)         │
│ [Gastos Fijos $________]  [Margen Bruto %___]       │
│                                                     │
│                   [CALCULAR →]                      │
│                                                     │
│ PARTE 5 — RESULTADO (aparece al calcular)           │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Tu Punto de Equilibrio: $X.XXX.XXX              │ │
│ │ Necesitás vender $X.XXX.XXX antes de ganar      │ │
│ │ un peso. A $XXX/día (con 26 días de apertura),  │ │
│ │ lo alcanzás el día N del mes.                   │ │
│ └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

---

## 3. CHAT DE IA — ESPECIFICACIÓN COMPLETA

### 3.1 Posición y UX

- El chat aparece como una **sección prominente al inicio**, DESPUÉS del hero. No es un widget flotante.
- Tiene un título: `"¿Qué querés mejorar o decidir hoy?"` con subtítulo: `"Contame tu situación y te llevo directo a la herramienta que necesitás."`
- Campo de texto grande (tipo textarea, al menos 3 líneas), con botón de envío.
- El usuario puede escribir en lenguaje totalmente libre: `"quiero saber si me conviene contratar a alguien"`, `"no sé si mi publicidad está funcionando"`, `"necesito saber cuánto tengo que vender para no perder plata"`.
- La IA responde en el chat (máximo 3-4 líneas) y además hace scroll + resalta visualmente la calculadora correcta.

### 3.2 System prompt del chat IA

Este es el prompt exacto que va en el system message de la llamada a la API de Anthropic. Copiarlo sin modificar:

```
Sos el Asesor Financiero de Emperador Financiero, una herramienta para emprendedores que quieren tomar mejores decisiones con sus números.

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
- "quiero subir mis precios" → F1 (Margen Bruto), F3 (Precio Mínimo)
```

### 3.3 Lógica de la llamada a la API (JavaScript)

```javascript
async function askAdvisor(userMessage) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // La API key se inyecta desde variable de entorno, NUNCA hardcodeada
      "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 300,
      system: SYSTEM_PROMPT, // El prompt del punto 3.2
      messages: [
        { role: "user", content: userMessage }
      ]
    })
  });

  const data = await response.json();
  const fullText = data.content[0].text;
  
  // Separar el texto al usuario del JSON de acción
  const jsonMatch = fullText.match(/\{[^}]+\}/);
  const userText = fullText.replace(jsonMatch?.[0] || "", "").trim();
  const action = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
  
  return { userText, action };
}
```

### 3.4 Lógica del scroll y resaltado

```javascript
function handleAction(action) {
  if (!action || action.action !== "scroll_to") return;
  
  const ids = Array.isArray(action.calculator_id) 
    ? action.calculator_id 
    : [action.calculator_id];
  
  // Scroll al primero de la lista
  const targetEl = document.getElementById(`calc-${ids[0]}`);
  if (targetEl) {
    targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  
  // Resaltar todos los relevantes durante 4 segundos
  ids.forEach(id => {
    const el = document.getElementById(`calc-${id}`);
    if (el) {
      el.classList.add("calc-highlighted");
      setTimeout(() => el.classList.remove("calc-highlighted"), 4000);
    }
  });
}

// CSS para el resaltado
// .calc-highlighted {
//   border: 2px solid #ECA819 !important;
//   box-shadow: 0 0 20px rgba(236, 168, 25, 0.25);
//   transition: all 0.3s ease;
// }
```

---

## 4. CALCULADORAS — ESPECIFICACIÓN COMPLETA

A continuación están las 42 calculadoras. Cada una tiene su ID, nombre, descripción, fórmula(s), campos de input, función de cálculo en JavaScript y función de interpretación del resultado.

### CONVENCIÓN DE DATOS

- Todos los campos monetarios usan punto como separador de miles y coma decimal (formato AR/LATAM)
- El input acepta cualquier formato pero se limpia antes de calcular: `parseFloat(value.replace(/\./g, "").replace(",", "."))`
- Los porcentajes se ingresan como número (ej: 55 para 55%) y se dividen por 100 en el cálculo
- Todos los resultados monetarios se formatean con `Intl.NumberFormat("es-AR")`

---

### BLOQUE FINANZAS

---

#### F1 — Margen Bruto Unitario

```javascript
{
  id: "F1",
  nombre: "Margen Bruto Unitario",
  bloque: "Finanzas",
  que_es: "Cuánto queda de cada venta antes de pagar los costos fijos. Es el termómetro de tu negocio.",
  formula: "MB$ = Precio de venta − Costo directo\nMB% = (MB$ ÷ Precio de venta) × 100",
  ejemplo: {
    contexto: "Hamburguesería — negocio físico",
    datos: "Precio de venta: $3.500 · Costo de ingredientes + empaque: $1.400",
    resultado: "MB$ = $2.100 · MB% = 60% → Por cada hamburguesa, quedan $2.100 para cubrir alquiler, sueldos y estructura."
  },
  inputs: [
    { id: "precio_venta", label: "Precio de venta", placeholder: "3500", tipo: "moneda" },
    { id: "costo_directo", label: "Costo directo por unidad", placeholder: "1400", tipo: "moneda" }
  ],
  calcular: (inputs) => {
    const pv = inputs.precio_venta;
    const cv = inputs.costo_directo;
    const mb_pesos = pv - cv;
    const mb_pct = (mb_pesos / pv) * 100;
    return { mb_pesos, mb_pct };
  },
  interpretar: (resultado, inputs) => {
    const { mb_pesos, mb_pct } = resultado;
    let semaforo = mb_pct >= 50 ? "positivo" : mb_pct >= 30 ? "neutral" : "negativo";
    let mensaje = "";
    if (mb_pct >= 60) mensaje = `Excelente margen. Por cada unidad vendida a $${inputs.precio_venta}, te quedan $${mb_pesos.toFixed(0)} para cubrir tu estructura. Negocio con buen colchón.`;
    else if (mb_pct >= 40) mensaje = `Margen saludable. $${mb_pesos.toFixed(0)} por unidad para cubrir costos fijos. Revisá si podés subirlo optimizando el costo directo o ajustando el precio.`;
    else if (mb_pct >= 20) mensaje = `Margen bajo. Con el ${mb_pct.toFixed(1)}%, necesitás vender mucho volumen para cubrir la estructura. Urgente: revisá precios y costos.`;
    else mensaje = `Margen crítico (${mb_pct.toFixed(1)}%). Cada venta apenas cubre el costo del producto. El negocio no tiene capacidad para pagar estructura fija. Acción inmediata requerida.`;
    return { semaforo, mensaje };
  }
}
```

---

#### F2 — Margen Neto

```javascript
{
  id: "F2",
  nombre: "Margen Neto",
  bloque: "Finanzas",
  que_es: "Lo que realmente gana el negocio después de pagar absolutamente todo. El número que más importa al final del mes.",
  formula: "MN$ = Ingresos totales − (Costo de ventas + Gastos fijos + Impuestos)\nMN% = (MN$ ÷ Ingresos totales) × 100",
  ejemplo: {
    contexto: "Cualquier negocio — cálculo mensual",
    datos: "Ventas: $9.000.000 · CV: $4.050.000 · GF: $3.000.000 · Impuestos: $250.000",
    resultado: "MN$ = $1.700.000 · MN% = 18,9% → Por cada $100 que entra, $18,9 son ganancia real."
  },
  inputs: [
    { id: "ingresos", label: "Ingresos totales del mes", placeholder: "9000000", tipo: "moneda" },
    { id: "costo_ventas", label: "Costo de ventas / mercadería", placeholder: "4050000", tipo: "moneda" },
    { id: "gastos_fijos", label: "Gastos fijos operativos", placeholder: "3000000", tipo: "moneda" },
    { id: "impuestos", label: "Impuestos y otros costos", placeholder: "250000", tipo: "moneda" }
  ],
  calcular: (inputs) => {
    const mn_pesos = inputs.ingresos - inputs.costo_ventas - inputs.gastos_fijos - inputs.impuestos;
    const mn_pct = (mn_pesos / inputs.ingresos) * 100;
    const mb_pesos = inputs.ingresos - inputs.costo_ventas;
    const mb_pct = (mb_pesos / inputs.ingresos) * 100;
    return { mn_pesos, mn_pct, mb_pesos, mb_pct };
  },
  interpretar: (resultado) => {
    const { mn_pesos, mn_pct } = resultado;
    let semaforo = mn_pct >= 15 ? "positivo" : mn_pct >= 5 ? "neutral" : "negativo";
    let mensaje = "";
    if (mn_pct >= 20) mensaje = `Muy buena rentabilidad. El ${mn_pct.toFixed(1)}% de margen neto es sólido — el negocio está saludable y tiene margen para crecer o invertir.`;
    else if (mn_pct >= 10) mensaje = `Rentabilidad aceptable (${mn_pct.toFixed(1)}%). El negocio genera ganancia real pero tiene espacio para mejorar. Revisá los gastos fijos y si los precios reflejan el margen que necesitás.`;
    else if (mn_pct > 0) mensaje = `Margen neto bajo (${mn_pct.toFixed(1)}%). El negocio gana, pero cualquier baja en ventas o suba de costos lo lleva a pérdida. Acción prioritaria en costos o precios.`;
    else mensaje = `El negocio está en pérdida (${mn_pct.toFixed(1)}%). Urgente: identificar si el problema es en el margen bruto (costos de producto) o en los gastos fijos.`;
    return { semaforo, mensaje };
  }
}
```

---

#### F3 — Precio Mínimo de Venta

```javascript
{
  id: "F3",
  nombre: "Precio Mínimo de Venta",
  bloque: "Finanzas",
  que_es: "El precio por debajo del cual perdés dinero en cada venta. Calculalo antes de cualquier descuento o promoción.",
  formula: "Precio mínimo = Costo directo ÷ (1 − Margen objetivo %)",
  ejemplo: {
    contexto: "Producto con costo de $1.400 y margen objetivo del 40%",
    datos: "Costo directo: $1.400 · Margen objetivo: 40%",
    resultado: "Precio mínimo = $1.400 ÷ 0,60 = $2.333 → Por debajo de $2.333, cada venta te cuesta dinero."
  },
  inputs: [
    { id: "costo_directo", label: "Costo directo del producto/servicio", placeholder: "1400", tipo: "moneda" },
    { id: "margen_objetivo", label: "Margen bruto objetivo (%)", placeholder: "40", tipo: "porcentaje" },
    { id: "precio_actual", label: "Tu precio actual (opcional)", placeholder: "3500", tipo: "moneda", requerido: false }
  ],
  calcular: (inputs) => {
    const precio_minimo = inputs.costo_directo / (1 - inputs.margen_objetivo / 100);
    const margen_actual = inputs.precio_actual 
      ? ((inputs.precio_actual - inputs.costo_directo) / inputs.precio_actual) * 100 
      : null;
    const diferencia = inputs.precio_actual ? inputs.precio_actual - precio_minimo : null;
    return { precio_minimo, margen_actual, diferencia };
  },
  interpretar: (resultado, inputs) => {
    const { precio_minimo, margen_actual, diferencia } = resultado;
    let semaforo = "neutral";
    let mensaje = `Tu precio mínimo de venta es $${precio_minimo.toFixed(0)}. `;
    if (inputs.precio_actual) {
      if (diferencia > 0) {
        semaforo = "positivo";
        mensaje += `Tu precio actual ($${inputs.precio_actual}) está $${diferencia.toFixed(0)} por encima del mínimo — tenés margen para hacer descuentos de hasta ${(diferencia / inputs.precio_actual * 100).toFixed(1)}% sin perder dinero.`;
      } else {
        semaforo = "negativo";
        mensaje += `⚠️ Tu precio actual ($${inputs.precio_actual}) está POR DEBAJO del mínimo — estás perdiendo $${Math.abs(diferencia).toFixed(0)} por unidad vendida. Hay que subir el precio o bajar el costo.`;
      }
    } else {
      mensaje += `Cualquier precio por debajo de ese número implica pérdida en cada venta, aunque el negocio "esté vendiendo bien".`;
    }
    return { semaforo, mensaje };
  }
}
```

---

#### F4 — Contribución Marginal

```javascript
{
  id: "F4",
  nombre: "Contribución Marginal",
  bloque: "Finanzas",
  que_es: "Cuánto aporta cada venta para cubrir los costos fijos. Cuando la CM total supera los GF, el negocio empieza a ganar.",
  formula: "CM unitaria = Precio de venta − Costo variable unitario\nCM total = Ventas totales − Costos variables totales\n% CM = (CM total ÷ Ventas totales) × 100",
  ejemplo: {
    contexto: "Negocio con 500 unidades vendidas en el mes",
    datos: "Precio: $3.500 · CV unitario: $1.400 · Unidades: 500 · Gastos fijos: $800.000",
    resultado: "CM unitaria: $2.100 · CM total: $1.050.000 · Con GF de $800.000 → utilidad: $250.000"
  },
  inputs: [
    { id: "precio_venta", label: "Precio de venta por unidad", placeholder: "3500", tipo: "moneda" },
    { id: "costo_variable", label: "Costo variable por unidad", placeholder: "1400", tipo: "moneda" },
    { id: "unidades", label: "Unidades vendidas en el mes", placeholder: "500", tipo: "numero" },
    { id: "gastos_fijos", label: "Gastos fijos del mes", placeholder: "800000", tipo: "moneda" }
  ],
  calcular: (inputs) => {
    const cm_unitaria = inputs.precio_venta - inputs.costo_variable;
    const cm_total = cm_unitaria * inputs.unidades;
    const cm_pct = (cm_unitaria / inputs.precio_venta) * 100;
    const ventas_totales = inputs.precio_venta * inputs.unidades;
    const utilidad = cm_total - inputs.gastos_fijos;
    return { cm_unitaria, cm_total, cm_pct, ventas_totales, utilidad };
  },
  interpretar: (resultado) => {
    const { cm_total, gastos_fijos_valor, utilidad, cm_pct } = resultado;
    let semaforo = utilidad > 0 ? "positivo" : utilidad === 0 ? "neutral" : "negativo";
    let mensaje = utilidad > 0 
      ? `La contribución marginal total ($${resultado.cm_total.toLocaleString("es-AR")}) superó los costos fijos. El negocio generó $${resultado.utilidad.toLocaleString("es-AR")} de utilidad este mes.`
      : utilidad === 0 
      ? `Estás exactamente en el punto de equilibrio. No ganás ni perdés. Un poco más de ventas y empezás a ganar.`
      : `La contribución marginal total no alcanza para cubrir los costos fijos. El negocio está en pérdida de $${Math.abs(resultado.utilidad).toLocaleString("es-AR")} este mes.`;
    return { semaforo, mensaje };
  }
}
```

---

#### F5 — Contribución Real del Producto (Mix)

```javascript
{
  id: "F5",
  nombre: "Contribución Real por Producto",
  bloque: "Finanzas",
  que_es: "Determina cuánto aporta realmente cada producto a la rentabilidad, combinando su margen con su participación en ventas.",
  formula: "Contribución real = MB% del producto × Participación en ventas totales (%)",
  ejemplo: {
    contexto: "Negocio con dos productos principales",
    datos: "Prod. A: MB 60%, representa 20% de ventas → contribución real: 12%\nProd. B: MB 35%, representa 70% de ventas → contribución real: 24,5%",
    resultado: "El Producto B aporta el doble, aunque tenga menor margen. Ahí debe estar el foco comercial."
  },
  inputs: [
    { id: "mb_pct_1", label: "Margen bruto Producto 1 (%)", placeholder: "60", tipo: "porcentaje" },
    { id: "part_1", label: "Participación en ventas Prod. 1 (%)", placeholder: "20", tipo: "porcentaje" },
    { id: "mb_pct_2", label: "Margen bruto Producto 2 (%)", placeholder: "35", tipo: "porcentaje" },
    { id: "part_2", label: "Participación en ventas Prod. 2 (%)", placeholder: "70", tipo: "porcentaje" }
  ],
  calcular: (inputs) => {
    const contrib_1 = (inputs.mb_pct_1 / 100) * (inputs.part_1 / 100) * 100;
    const contrib_2 = (inputs.mb_pct_2 / 100) * (inputs.part_2 / 100) * 100;
    const ganador = contrib_1 > contrib_2 ? 1 : 2;
    return { contrib_1, contrib_2, ganador };
  },
  interpretar: (resultado) => {
    const { contrib_1, contrib_2, ganador } = resultado;
    let semaforo = "neutral";
    let mensaje = `Producto 1 aporta realmente el ${contrib_1.toFixed(1)}% a la rentabilidad total. Producto 2 aporta el ${contrib_2.toFixed(1)}%. `;
    mensaje += `El Producto ${ganador} es el que más impacta en tus ganancias, aunque no necesariamente tenga el mayor margen individual. Enfocá tu comunicación y ventas ahí.`;
    return { semaforo, mensaje };
  }
}
```

---

#### F6 — Punto de Equilibrio

```javascript
{
  id: "F6",
  nombre: "Punto de Equilibrio",
  bloque: "Finanzas",
  que_es: "Cuánto tenés que vender para no ganar ni perder. La primera meta del mes. Todo lo que vendés por encima de acá es ganancia.",
  formula: "PE en $ = Gastos Fijos ÷ % Margen Bruto\nPE en unidades = Gastos Fijos ÷ CM unitaria",
  ejemplo: {
    contexto: "Negocio con GF altos y buen margen",
    datos: "Gastos fijos: $3.500.000 · MB%: 55%",
    resultado: "PE = $6.363.636 → Con 26 días de apertura, necesitás vender $244.755/día solo para no perder."
  },
  inputs: [
    { id: "gastos_fijos", label: "Gastos fijos mensuales totales", placeholder: "3500000", tipo: "moneda" },
    { id: "mb_pct", label: "Margen bruto (%)", placeholder: "55", tipo: "porcentaje" },
    { id: "dias_apertura", label: "Días de apertura al mes", placeholder: "26", tipo: "numero" },
    { id: "ticket_promedio", label: "Ticket promedio (opcional, para calcular clientes necesarios)", placeholder: "30000", tipo: "moneda", requerido: false }
  ],
  calcular: (inputs) => {
    const pe_pesos = inputs.gastos_fijos / (inputs.mb_pct / 100);
    const pe_por_dia = pe_pesos / inputs.dias_apertura;
    const pe_unidades = inputs.ticket_promedio ? pe_pesos / inputs.ticket_promedio : null;
    return { pe_pesos, pe_por_dia, pe_unidades };
  },
  interpretar: (resultado, inputs) => {
    const { pe_pesos, pe_por_dia, pe_unidades } = resultado;
    let semaforo = "neutral";
    let mensaje = `Tu Punto de Equilibrio es $${pe_pesos.toLocaleString("es-AR")} al mes. `;
    mensaje += `Necesitás vender $${pe_por_dia.toLocaleString("es-AR", {maximumFractionDigits: 0})} por día (con ${inputs.dias_apertura} días de apertura) antes de ganar un peso. `;
    if (pe_unidades) mensaje += `Eso equivale a ${Math.ceil(pe_unidades).toLocaleString("es-AR")} transacciones al mes, o ${Math.ceil(pe_unidades / inputs.dias_apertura)} por día.`;
    return { semaforo, mensaje };
  }
}
```

---

#### F7 — Punto Óptimo

```javascript
{
  id: "F7",
  nombre: "Punto Óptimo — Meta real del mes",
  bloque: "Finanzas",
  que_es: "Cuánto tenés que vender para ganar la utilidad que querés. El PE te dice el mínimo; el PO te da la meta.",
  formula: "PO = (Gastos Fijos + Utilidad deseada) ÷ % Margen Bruto",
  ejemplo: {
    contexto: "Negocio que quiere ganar $1.500.000 netos",
    datos: "GF: $3.500.000 · Utilidad deseada: $1.500.000 · MB%: 55%",
    resultado: "PO = $9.090.909 → Esa es la meta de ventas del mes, no el PE."
  },
  inputs: [
    { id: "gastos_fijos", label: "Gastos fijos mensuales", placeholder: "3500000", tipo: "moneda" },
    { id: "utilidad_deseada", label: "Utilidad neta que querés ganar", placeholder: "1500000", tipo: "moneda" },
    { id: "mb_pct", label: "Margen bruto (%)", placeholder: "55", tipo: "porcentaje" },
    { id: "dias_apertura", label: "Días de apertura al mes", placeholder: "26", tipo: "numero" }
  ],
  calcular: (inputs) => {
    const po = (inputs.gastos_fijos + inputs.utilidad_deseada) / (inputs.mb_pct / 100);
    const pe = inputs.gastos_fijos / (inputs.mb_pct / 100);
    const meta_diaria = po / inputs.dias_apertura;
    const diferencia_vs_pe = po - pe;
    return { po, pe, meta_diaria, diferencia_vs_pe };
  },
  interpretar: (resultado) => {
    const { po, pe, meta_diaria, diferencia_vs_pe } = resultado;
    let semaforo = "neutral";
    let mensaje = `Para ganar lo que querés, necesitás vender $${po.toLocaleString("es-AR", {maximumFractionDigits: 0})} al mes. `;
    mensaje += `Tu meta diaria es $${meta_diaria.toLocaleString("es-AR", {maximumFractionDigits: 0})}. `;
    mensaje += `La diferencia entre el PE ($${pe.toLocaleString("es-AR", {maximumFractionDigits: 0})}) y tu meta es $${diferencia_vs_pe.toLocaleString("es-AR", {maximumFractionDigits: 0})} — ese es el "rango de prosperidad" que tenés que lograr cada mes.`;
    return { semaforo, mensaje };
  }
}
```

---

#### F8 — Proyección Inversa

```javascript
{
  id: "F8",
  nombre: "Proyección Inversa — De utilidad a prospectos",
  bloque: "Finanzas",
  que_es: "Partís de cuánto querés ganar y calculás exactamente cuántos prospectos necesitás. Conecta finanzas con marketing.",
  formula: "De abajo hacia arriba:\n1. Utilidad deseada + GF = Cash Collected necesario ÷ MB%\n2. ÷ Ticket promedio = Total clientes\n3. − Clientes recompra = Clientes nuevos\n4. ÷ Tasa de cierre = Prospectos necesarios",
  ejemplo: {
    contexto: "Negocio digital con alta recurrencia",
    datos: "Utilidad: $5.000.000 · GF+Variables: $4.500.000 · MB: 90% · Ticket: $65.000 · Cierre: 40% · Recompra: 45",
    resultado: "Cash needed: $9.444.444 · Clientes totales: 145 · Nuevos: 100 · Prospectos: 251"
  },
  inputs: [
    { id: "utilidad_deseada", label: "Utilidad neta deseada", placeholder: "5000000", tipo: "moneda" },
    { id: "gastos_totales", label: "Gastos fijos + variables estimados", placeholder: "4500000", tipo: "moneda" },
    { id: "mb_pct", label: "Margen bruto (%)", placeholder: "90", tipo: "porcentaje" },
    { id: "ticket", label: "Ticket promedio de venta", placeholder: "65000", tipo: "moneda" },
    { id: "recompra", label: "Clientes actuales que vuelven este mes", placeholder: "45", tipo: "numero" },
    { id: "tasa_cierre", label: "Tasa de cierre (%)", placeholder: "40", tipo: "porcentaje" }
  ],
  calcular: (inputs) => {
    const cash_needed = (inputs.utilidad_deseada + inputs.gastos_totales) / (inputs.mb_pct / 100);
    const total_clientes = Math.ceil(cash_needed / inputs.ticket);
    const clientes_nuevos = Math.max(0, total_clientes - inputs.recompra);
    const prospectos = Math.ceil(clientes_nuevos / (inputs.tasa_cierre / 100));
    return { cash_needed, total_clientes, clientes_nuevos, prospectos };
  },
  interpretar: (resultado) => {
    const { cash_needed, total_clientes, clientes_nuevos, prospectos } = resultado;
    let semaforo = "neutral";
    let mensaje = `Para lograr tu utilidad deseada, necesitás $${cash_needed.toLocaleString("es-AR", {maximumFractionDigits: 0})} de facturación. `;
    mensaje += `Eso implica ${total_clientes} clientes (${clientes_nuevos} nuevos + los que recompran). `;
    mensaje += `Con tu tasa de cierre, necesitás generar ${prospectos} prospectos este mes. Ese es el número que le das a tu equipo de marketing.`;
    return { semaforo, mensaje };
  }
}
```

---

#### F9 — Margen de Seguridad

```javascript
{
  id: "F9",
  nombre: "Margen de Seguridad",
  bloque: "Finanzas",
  que_es: "Cuánto pueden caer tus ventas antes de empezar a perder dinero. Mide qué tan frágil o robusto es tu negocio.",
  formula: "MS% = ((Ventas actuales − Ventas PE) ÷ Ventas actuales) × 100",
  ejemplo: {
    contexto: "Negocio con ventas $9M y PE de $6.36M",
    datos: "Ventas: $9.000.000 · PE: $6.363.636",
    resultado: "MS = 29,3% → Podés caer casi 30% antes de entrar en pérdida. Un negocio sano."
  },
  inputs: [
    { id: "ventas_actuales", label: "Ventas actuales del mes", placeholder: "9000000", tipo: "moneda" },
    { id: "gastos_fijos", label: "Gastos fijos (para calcular PE automático)", placeholder: "3500000", tipo: "moneda" },
    { id: "mb_pct", label: "Margen bruto (%)", placeholder: "55", tipo: "porcentaje" }
  ],
  calcular: (inputs) => {
    const pe = inputs.gastos_fijos / (inputs.mb_pct / 100);
    const ms_pct = ((inputs.ventas_actuales - pe) / inputs.ventas_actuales) * 100;
    return { pe, ms_pct };
  },
  interpretar: (resultado) => {
    const { ms_pct } = resultado;
    let semaforo = ms_pct >= 25 ? "positivo" : ms_pct >= 10 ? "neutral" : "negativo";
    let mensaje = ms_pct >= 30 ? `Negocio robusto. Podés caer un ${ms_pct.toFixed(1)}% en ventas antes de perder. Tenés colchón para maniobrar.`
      : ms_pct >= 15 ? `Margen de seguridad aceptable (${ms_pct.toFixed(1)}%). Una caída moderada te puede poner en riesgo. Trabajá en aumentar el PE vs. ventas actuales.`
      : ms_pct >= 0 ? `Margen de seguridad bajo (${ms_pct.toFixed(1)}%). El negocio es frágil — cualquier baja en ventas te lleva a pérdida. Prioridad: bajar costos fijos o aumentar margen.`
      : `El negocio ya está en zona de pérdida (${ms_pct.toFixed(1)}%). Las ventas actuales no cubren los costos fijos. Acción inmediata requerida.`;
    return { semaforo, mensaje };
  }
}
```

---

#### F10 — ROI de Inversión

```javascript
{
  id: "F10",
  nombre: "ROI de Inversión",
  bloque: "Finanzas",
  que_es: "Para cualquier inversión nueva (máquina, local, tecnología): cuánto retorna y en cuánto tiempo la recuperás.",
  formula: "ROI% = (Ganancia neta atribuida ÷ Inversión) × 100\nPayback (meses) = Inversión ÷ Utilidad mensual adicional",
  ejemplo: {
    contexto: "Fábrica evaluando una máquina nueva",
    datos: "Inversión: $8.000.000 · Utilidad adicional mensual: $400.000",
    resultado: "Payback: 20 meses ✓ → Buena inversión. Si generara $150.000/mes → 53 meses → replantear."
  },
  inputs: [
    { id: "inversion", label: "Monto de la inversión", placeholder: "8000000", tipo: "moneda" },
    { id: "utilidad_adicional", label: "Utilidad mensual adicional que genera", placeholder: "400000", tipo: "moneda" }
  ],
  calcular: (inputs) => {
    const payback_meses = inputs.inversion / inputs.utilidad_adicional;
    const roi_anual = (inputs.utilidad_adicional * 12 / inputs.inversion) * 100;
    return { payback_meses, roi_anual };
  },
  interpretar: (resultado) => {
    const { payback_meses, roi_anual } = resultado;
    let semaforo = payback_meses <= 24 ? "positivo" : payback_meses <= 48 ? "neutral" : "negativo";
    let mensaje = `Recuperás la inversión en ${payback_meses.toFixed(1)} meses (${(payback_meses/12).toFixed(1)} años). `;
    mensaje += `Eso equivale a un ROI anual del ${roi_anual.toFixed(1)}%. `;
    mensaje += payback_meses <= 24 ? `Buena inversión — dentro del rango ideal de 2 años.`
      : payback_meses <= 48 ? `Inversión aceptable pero lenta. Evaluá si hay alternativas más eficientes.`
      : `Payback muy largo (más de 4 años). Replantear la inversión o renegociar el precio.`;
    return { semaforo, mensaje };
  }
}
```

---

#### F11 — Amortización Mensual

```javascript
{
  id: "F11",
  nombre: "Amortización Mensual",
  bloque: "Finanzas",
  que_es: "El costo mensual 'invisible' de un activo. Si no lo incluís en los GF, estás sobreestimando tu ganancia.",
  formula: "Amortización mensual = Valor de la inversión ÷ Meses de vida útil",
  ejemplo: {
    contexto: "Máquina comprada a $8.000.000",
    datos: "Inversión: $8.000.000 · Vida útil: 48 meses",
    resultado: "$166.667/mes → Ese monto hay que sumarlo a los GF para calcular el PE real."
  },
  inputs: [
    { id: "valor_activo", label: "Valor del activo / inversión", placeholder: "8000000", tipo: "moneda" },
    { id: "vida_util_meses", label: "Vida útil en meses", placeholder: "48", tipo: "numero" }
  ],
  calcular: (inputs) => {
    const amortizacion_mensual = inputs.valor_activo / inputs.vida_util_meses;
    const amortizacion_anual = amortizacion_mensual * 12;
    return { amortizacion_mensual, amortizacion_anual };
  },
  interpretar: (resultado) => {
    const { amortizacion_mensual } = resultado;
    let semaforo = "neutral";
    let mensaje = `Este activo te cuesta $${amortizacion_mensual.toLocaleString("es-AR", {maximumFractionDigits: 0})} por mes en amortización. `;
    mensaje += `Ese monto debe sumarse a tus gastos fijos antes de calcular el Punto de Equilibrio. Si no lo hacés, estás creyendo que ganás más de lo que realmente ganás.`;
    return { semaforo, mensaje };
  }
}
```

---

#### F12 — Facturado vs. Percibido

```javascript
{
  id: "F12",
  nombre: "Facturado vs. Percibido",
  bloque: "Finanzas",
  que_es: "La diferencia entre lo que vendiste y lo que realmente cobaste. Un negocio puede quebrar aunque facture bien.",
  formula: "CxC = Facturado − Percibido\nTasa de cobro = (Cobrado ÷ Facturado) × 100",
  ejemplo: {
    contexto: "Negocio con ventas a crédito o cuotas",
    datos: "Facturado: $10.000.000 · Cobrado: $7.200.000",
    resultado: "CxC: $2.800.000 · Tasa cobro: 72% → Si esos $2,8M no se cobran en 60 días, hay crisis de caja."
  },
  inputs: [
    { id: "facturado", label: "Ventas facturadas del mes", placeholder: "10000000", tipo: "moneda" },
    { id: "cobrado", label: "Dinero efectivamente cobrado (percibido)", placeholder: "7200000", tipo: "moneda" }
  ],
  calcular: (inputs) => {
    const cxc = inputs.facturado - inputs.cobrado;
    const tasa_cobro = (inputs.cobrado / inputs.facturado) * 100;
    return { cxc, tasa_cobro };
  },
  interpretar: (resultado) => {
    const { cxc, tasa_cobro } = resultado;
    let semaforo = tasa_cobro >= 85 ? "positivo" : tasa_cobro >= 70 ? "neutral" : "negativo";
    let mensaje = `Tu tasa de cobro es del ${tasa_cobro.toFixed(1)}% — hay $${cxc.toLocaleString("es-AR")} en cuentas por cobrar. `;
    mensaje += tasa_cobro >= 85 ? `Buena gestión de cobro. Seguí monitoreando para que no se acumule deuda vieja.`
      : tasa_cobro >= 70 ? `Tasa de cobro en zona de alerta. Ese dinero pendiente puede presionar tu caja. Establecé un sistema de seguimiento de cobranza.`
      : `Tasa de cobro baja — hay un problema serio de cobranza. Si ese dinero no entra en 30-60 días, el negocio enfrenta crisis de liquidez aunque las ventas sean buenas.`;
    return { semaforo, mensaje };
  }
}
```

---

#### F13 — Tasa de Cobro y Mora

```javascript
{
  id: "F13",
  nombre: "Tasa de Cobro y Mora",
  bloque: "Finanzas",
  que_es: "Mide la salud de tu cartera. La mora alta destruye el flujo de caja aunque las ventas sean excelentes.",
  formula: "Tasa de mora = (Importe vencido no cobrado ÷ Facturado) × 100\nDías de cobro = CxC promedio ÷ Ventas diarias",
  ejemplo: {
    contexto: "Negocio B2B con clientes que pagan a 30 días",
    datos: "Facturado: $10.000.000 · Cobrado: $8.500.000 · Vencido impago: $800.000",
    resultado: "Mora: 8% ⚠ · Tasa cobro: 85% → Zona de alerta, acción requerida en seguimiento."
  },
  inputs: [
    { id: "facturado", label: "Ventas facturadas del mes", placeholder: "10000000", tipo: "moneda" },
    { id: "cobrado", label: "Cobrado en el mes", placeholder: "8500000", tipo: "moneda" },
    { id: "vencido_impago", label: "Importe vencido no cobrado", placeholder: "800000", tipo: "moneda" },
    { id: "dias_mes", label: "Días del mes", placeholder: "30", tipo: "numero" }
  ],
  calcular: (inputs) => {
    const tasa_cobro = (inputs.cobrado / inputs.facturado) * 100;
    const tasa_mora = (inputs.vencido_impago / inputs.facturado) * 100;
    const cxc = inputs.facturado - inputs.cobrado;
    const ventas_diarias = inputs.facturado / inputs.dias_mes;
    const dias_cobro = cxc / ventas_diarias;
    return { tasa_cobro, tasa_mora, cxc, dias_cobro };
  },
  interpretar: (resultado) => {
    const { tasa_mora, tasa_cobro, dias_cobro } = resultado;
    let semaforo = tasa_mora <= 5 ? "positivo" : tasa_mora <= 10 ? "neutral" : "negativo";
    let mensaje = `Tasa de cobro: ${tasa_cobro.toFixed(1)}% · Tasa de mora: ${tasa_mora.toFixed(1)}% · Días promedio de cobro: ${dias_cobro.toFixed(0)} días. `;
    mensaje += tasa_mora <= 5 ? `Cartera saludable. Seguí monitoreando para mantener la mora baja.`
      : tasa_mora <= 10 ? `Zona de alerta. La mora empieza a pesar. Implementá un protocolo de recordatorio de pago automático.`
      : `Problema estructural de cobranza. Más del 10% de lo facturado no se está cobrando. Revisá las condiciones de crédito que otorgás y el seguimiento post-venta.`;
    return { semaforo, mensaje };
  }
}
```

---

#### F14 — Estado de Resultados

```javascript
{
  id: "F14",
  nombre: "Estado de Resultados (P&L)",
  bloque: "Finanzas",
  que_es: "La radiografía económica del negocio en el mes. Muestra si el negocio es rentable, más allá de lo que hay en caja.",
  formula: "Ventas − CV = Utilidad Bruta\nUtilidad Bruta − GF = Utilidad Operativa\nUtilidad Operativa − Impuestos = Utilidad Neta",
  ejemplo: {
    contexto: "P&L mensual completo",
    datos: "Ventas: $9.000.000 · CV: $4.050.000 · GF: $3.000.000 · Impuestos: $250.000",
    resultado: "MB: $4.950.000 (55%) · Utilidad Op: $1.950.000 · Neta: $1.700.000 (18,9%)"
  },
  inputs: [
    { id: "ventas", label: "Ventas del mes (facturado)", placeholder: "9000000", tipo: "moneda" },
    { id: "costo_ventas", label: "Costo de ventas / mercadería (CV)", placeholder: "4050000", tipo: "moneda" },
    { id: "gastos_fijos", label: "Gastos fijos operativos", placeholder: "3000000", tipo: "moneda" },
    { id: "impuestos", label: "Impuestos y otros egresos", placeholder: "250000", tipo: "moneda" }
  ],
  calcular: (inputs) => {
    const utilidad_bruta = inputs.ventas - inputs.costo_ventas;
    const mb_pct = (utilidad_bruta / inputs.ventas) * 100;
    const utilidad_operativa = utilidad_bruta - inputs.gastos_fijos;
    const utilidad_neta = utilidad_operativa - inputs.impuestos;
    const mn_pct = (utilidad_neta / inputs.ventas) * 100;
    return { utilidad_bruta, mb_pct, utilidad_operativa, utilidad_neta, mn_pct };
  },
  interpretar: (resultado) => {
    const { utilidad_neta, mn_pct, mb_pct } = resultado;
    let semaforo = mn_pct >= 15 ? "positivo" : mn_pct >= 0 ? "neutral" : "negativo";
    let mensaje = utilidad_neta > 0 
      ? `El negocio generó $${utilidad_neta.toLocaleString("es-AR")} de utilidad neta (${mn_pct.toFixed(1)}% de margen). `
      : `El negocio cerró el mes en pérdida de $${Math.abs(utilidad_neta).toLocaleString("es-AR")}. `;
    mensaje += mb_pct < 40 ? `El margen bruto (${mb_pct.toFixed(1)}%) es el punto crítico — los costos de producto están muy altos en relación al precio.`
      : mn_pct < 0 ? `El margen bruto es aceptable pero los gastos fijos son demasiado altos para el nivel de ventas actual.`
      : `La estructura de costos está razonablemente balanceada.`;
    return { semaforo, mensaje };
  }
}
```

---

#### F15 — PE con Nueva Contratación

```javascript
{
  id: "F15",
  nombre: "PE con Nueva Contratación — ¿Cuánto le puedo pagar?",
  bloque: "Finanzas",
  que_es: "Antes de contratar, calculás cuánto más tiene que vender el negocio para que la rentabilidad no baje.",
  formula: "Costo real = Sueldo × 1,3 a 1,5\nIncremento necesario = Costo real ÷ (1 − % Margen Neto objetivo)",
  ejemplo: {
    contexto: "Negocio evaluando sumar alguien al equipo",
    datos: "Sueldo acordado: $250.000 · Factor cargas: 1,30 · Margen neto objetivo: 30%",
    resultado: "Costo real: $325.000 · Incremento = $325.000 ÷ 0,70 = $464.286 más/mes"
  },
  inputs: [
    { id: "sueldo", label: "Sueldo acordado con la persona", placeholder: "250000", tipo: "moneda" },
    { id: "factor_cargas", label: "Factor de cargas sociales (1,3 a 1,5)", placeholder: "1.3", tipo: "decimal" },
    { id: "mn_objetivo", label: "Margen neto objetivo que querés mantener (%)", placeholder: "30", tipo: "porcentaje" },
    { id: "ventas_actuales", label: "Ventas actuales del mes (opcional)", placeholder: "5000000", tipo: "moneda", requerido: false }
  ],
  calcular: (inputs) => {
    const costo_real = inputs.sueldo * inputs.factor_cargas;
    const incremento_necesario = costo_real / (1 - inputs.mn_objetivo / 100);
    const ventas_nueva_meta = inputs.ventas_actuales ? inputs.ventas_actuales + incremento_necesario : null;
    return { costo_real, incremento_necesario, ventas_nueva_meta };
  },
  interpretar: (resultado, inputs) => {
    const { costo_real, incremento_necesario, ventas_nueva_meta } = resultado;
    let semaforo = "neutral";
    let mensaje = `El costo real de esa persona es $${costo_real.toLocaleString("es-AR", {maximumFractionDigits: 0})}/mes (incluyendo cargas). `;
    mensaje += `Para mantener tu margen neto objetivo, necesitás crecer $${incremento_necesario.toLocaleString("es-AR", {maximumFractionDigits: 0})} en facturación mensual. `;
    if (ventas_nueva_meta) mensaje += `Es decir, pasar de $${inputs.ventas_actuales.toLocaleString("es-AR")} a $${ventas_nueva_meta.toLocaleString("es-AR", {maximumFractionDigits: 0})}. ¿Lo podés lograr en 1-3 meses? Sí → contratá. No → esperá o renegociá.`;
    return { semaforo, mensaje };
  }
}
```

---

#### F16 — Costo de Reposición y Margen Real

```javascript
{
  id: "F16",
  nombre: "Costo de Reposición y Margen Real",
  bloque: "Finanzas",
  que_es: "En contextos de inflación, el margen debe calcularse sobre el costo de reponer hoy, no sobre lo que pagaste antes.",
  formula: "Margen real = (PV − Costo de reposición actual) ÷ PV × 100",
  ejemplo: {
    contexto: "Negocio con stock comprado hace 2 meses",
    datos: "Costo original: $1.000 · Costo reposición hoy: $1.400 · Precio venta: $2.500",
    resultado: "Margen real: 44% (no el 60% basado en costo viejo) → Actualizar precios."
  },
  inputs: [
    { id: "precio_venta", label: "Precio de venta actual", placeholder: "2500", tipo: "moneda" },
    { id: "costo_compra", label: "Costo al que compraste el stock", placeholder: "1000", tipo: "moneda" },
    { id: "costo_reposicion", label: "Costo para reponer hoy (según proveedor)", placeholder: "1400", tipo: "moneda" }
  ],
  calcular: (inputs) => {
    const margen_sobre_compra = ((inputs.precio_venta - inputs.costo_compra) / inputs.precio_venta) * 100;
    const margen_real = ((inputs.precio_venta - inputs.costo_reposicion) / inputs.precio_venta) * 100;
    const diferencia_margen = margen_sobre_compra - margen_real;
    return { margen_sobre_compra, margen_real, diferencia_margen };
  },
  interpretar: (resultado) => {
    const { margen_sobre_compra, margen_real, diferencia_margen } = resultado;
    let semaforo = diferencia_margen < 5 ? "positivo" : diferencia_margen < 15 ? "neutral" : "negativo";
    let mensaje = `Tu margen basado en el costo de compra es ${margen_sobre_compra.toFixed(1)}%, pero el margen real (sobre lo que te cuesta reponer hoy) es ${margen_real.toFixed(1)}%. `;
    mensaje += diferencia_margen < 5 ? `La diferencia es mínima — tus precios están bien actualizados.`
      : diferencia_margen < 15 ? `Hay una diferencia de ${diferencia_margen.toFixed(1)} puntos de margen. Revisá si tus precios reflejan el nuevo costo de reposición.`
      : `Diferencia crítica de ${diferencia_margen.toFixed(1)} puntos. Estás tomando decisiones de precio y descuento basadas en un margen falso. Actualizar precios es urgente.`;
    return { semaforo, mensaje };
  }
}
```

---

> **NOTA AL AGENTE DE CÓDIGO:** Los bloques de Ventas (V1-V10), Marketing (M1-M9) y Equipo (E1-E7) siguen exactamente el mismo patrón de estructura. Construir todas las calculadoras replicando esta estructura con los datos del archivo `Formulas_Emprendedor_EF.md` que acompaña este prompt. Los campos de input, fórmulas, ejemplos e interpretaciones están documentados en ese archivo.

---

## 5. COMPORTAMIENTO GLOBAL DE LA APP

### 5.1 Estados de los resultados

Cada resultado tiene un estado semáforo con su visual:

```javascript
const SEMAFORO_STYLES = {
  positivo: {
    color: "#1D9E75",         // Verde
    icono: "✓",
    label: "En zona saludable",
    bg: "rgba(29, 158, 117, 0.1)"
  },
  neutral: {
    color: "#ECA819",         // Dorado
    icono: "→",
    label: "Zona de atención",
    bg: "rgba(236, 168, 25, 0.1)"
  },
  negativo: {
    color: "#DC2626",         // Rojo
    icono: "⚠",
    label: "Acción requerida",
    bg: "rgba(220, 38, 38, 0.1)"
  }
};
```

### 5.2 Formateo de números (OBLIGATORIO)

```javascript
const formatMoney = (number) => 
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number);

const formatPct = (number) => `${number.toFixed(1)}%`;

const formatNumber = (number) => 
  new Intl.NumberFormat("es-AR").format(Math.round(number));

// Limpiar input del usuario para calcular
const parseInput = (value) => 
  parseFloat(String(value).replace(/\./g, "").replace(",", ".").replace(/[^0-9.]/g, "")) || 0;
```

### 5.3 Validaciones

```javascript
// Antes de calcular, validar que los campos requeridos no estén vacíos ni en cero
function validateInputs(inputs, fields) {
  const errors = [];
  fields
    .filter(f => f.requerido !== false)
    .forEach(field => {
      if (!inputs[field.id] || inputs[field.id] <= 0) {
        errors.push(`"${field.label}" es requerido y debe ser mayor a cero.`);
      }
    });
  return errors;
}
```

### 5.4 Comportamiento mobile-first

- Todas las calculadoras son columna única en mobile (<768px)
- Los inputs tienen `font-size: 16px` mínimo para evitar zoom en iOS
- El botón Calcular es de al menos 48px de alto
- El chat IA en mobile ocupa el 100% del ancho y tiene el input con teclado numérico disponible

---

## 6. ESTRUCTURA DE ARCHIVOS SUGERIDA

```
/
├── index.html
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── ChatIA.jsx           ← El componente del chat
│   │   ├── BlockSection.jsx     ← Wrapper de cada bloque (Finanzas, Ventas, etc.)
│   │   ├── CalculatorCard.jsx   ← Componente reutilizable de calculadora
│   │   └── ResultBox.jsx        ← Componente de resultado con semáforo
│   ├── data/
│   │   └── calculadoras.js      ← Todas las 42 calculadoras definidas como objetos
│   ├── lib/
│   │   ├── anthropic.js         ← Llamada a la API
│   │   ├── formatters.js        ← Formateo de números
│   │   └── validators.js        ← Validaciones
│   └── styles/
│       └── globals.css          ← Variables CSS y estilos base
├── .env                         ← VITE_ANTHROPIC_API_KEY (no subir a git)
├── .env.example
├── vite.config.js
└── package.json
```

---

## 7. VARIABLES DE ENTORNO

```bash
# .env (local, no commitear)
VITE_ANTHROPIC_API_KEY=sk-ant-...

# .env.example (sí commitear)
VITE_ANTHROPIC_API_KEY=your_api_key_here
```

**Importante:** La API key NUNCA se expone en el frontend en producción. Si esto se despliega públicamente, el backend debe proxear la llamada a Anthropic (endpoint propio en un server que guarda la API key). Para uso interno, la variable de entorno de Vite está bien.

---

## 8. HERO SECTION — COPY EXACTO

```
Título:     Las fórmulas que necesitás para tomar decisiones.
Subtítulo:  Sin vueltas. Con tus números reales.
Descripción: 42 calculadoras financieras para emprendedores. 
             Ingresás tus datos, calculás en segundos y entendés 
             qué significa el resultado para tu negocio.
CTA primario:   [Hablar con el Asesor IA →]
CTA secundario: [Ver todas las calculadoras ↓]
```

---

## 9. NAVBAR — ESTRUCTURA

```
[Logo EF]   Finanzas   Ventas   Marketing   Equipo   [Hablar con IA →]
```

- Logo: texto "Emperador Financiero" con el símbolo de la corona (o logo si se provee imagen)
- Links: anclas a las secciones correspondientes (`#finanzas`, `#ventas`, `#marketing`, `#equipo`)
- El botón "[Hablar con IA →]" hace scroll suave a la sección del chat
- En mobile: menú hamburguesa

---

## 10. CRITERIOS DE ACEPTACIÓN — CHECKLIST

El agente de código debe verificar que la app cumple TODOS estos puntos antes de entregar:

### Funcionalidad
- [ ] El chat IA responde en menos de 3 segundos (con indicador de carga)
- [ ] El scroll y resaltado de calculadoras funciona correctamente desde el chat
- [ ] Todas las 42 calculadoras calculan correctamente (testear con los valores de los ejemplos)
- [ ] Los resultados muestran el semáforo verde/amarillo/rojo correctamente
- [ ] Los inputs no aceptan texto (solo números) — validación en tiempo real
- [ ] Los campos vacíos o en cero muestran error antes de calcular
- [ ] Los resultados monetarios se formatean correctamente (ej: $1.500.000, no 1500000)

### Branding
- [ ] Paleta de colores exacta (#ECA819, #20274D, #0B2433) — sin variaciones
- [ ] Tipografías Cormorant Garamond y Outfit cargadas correctamente
- [ ] Firma de marca en el footer
- [ ] Tags de bloque con colores diferenciados (Finanzas, Ventas, Marketing, Equipo)

### UX / Accesibilidad
- [ ] Responsive en mobile (320px mínimo), tablet y desktop
- [ ] El chat tiene estado de carga mientras espera respuesta de la IA
- [ ] El resaltado de calculadora tiene animación suave y dura 4 segundos
- [ ] Los inputs tienen labels visibles (no solo placeholders)
- [ ] Los botones tienen estado hover y active
- [ ] El contraste de texto sobre fondos oscuros cumple WCAG AA mínimo

### Performance
- [ ] La app carga en menos de 2 segundos en una conexión normal
- [ ] Las fuentes de Google Fonts están en `preconnect`
- [ ] No hay llamadas a la API de Anthropic en el render inicial (solo cuando el usuario envía un mensaje)

---

## 11. NOTAS FINALES PARA EL AGENTE

1. **Prioridad máxima:** El chat IA y el sistema de scroll + resaltado deben funcionar perfectamente. Es el core de la experiencia.

2. **Calculadoras:** Construir las 16 de Finanzas primero (completas), luego las 10 de Ventas, luego las 9 de Marketing, luego las 7 de Equipo. Seguir ese orden.

3. **No inventar copy:** Todo el texto de las calculadoras (qué_es, fórmulas, ejemplos, interpretaciones) viene del archivo `Formulas_Emprendedor_EF.md`. No parafrasear ni cambiar los ejemplos numéricos.

4. **El system prompt del chat es sagrado:** No modificar una sola palabra. Es la lógica central de enrutamiento.

5. **Consultar ante ambigüedades:** Si algo de la especificación no está claro o entra en conflicto, preguntar antes de decidir por cuenta propia.

6. **No agregar features no pedidas:** Nada de login, nada de historial guardado, nada de exportar PDF (no en v1). Scope cerrado.

---

*Emperador Financiero · Angelo Nisi · @emperadorfinanciero*  
*Este documento es confidencial y de uso interno. Versión 1.0 — Junio 2026*