// Definición de las 42 calculadoras de "Conquistá Tus Números".
//
// - BLOQUE FINANZAS (F1–F16): totalmente funcionales. Fórmulas, ejemplos e
//   interpretaciones transcriptas TEXTUALMENTE del copy.md (no se parafrasea).
// - BLOQUES VENTAS / MARKETING / EQUIPO: quedan como "próximamente". Sus fórmulas
//   viven en el archivo `Formulas_Emprendedor_EF.md`, que todavía no está en el
//   proyecto. No se inventan (el copy.md lo prohíbe explícitamente).

export type Semaforo = 'positivo' | 'neutral' | 'negativo'
export type Bloque = 'Finanzas' | 'Ventas' | 'Marketing' | 'Equipo'
export type InputTipo = 'moneda' | 'porcentaje' | 'numero' | 'decimal'

export interface CalcInput {
  id: string
  label: string
  placeholder: string
  tipo: InputTipo
  requerido?: boolean
}

export interface Ejemplo {
  contexto: string
  datos: string
  resultado: string
}

export interface Interpretacion {
  semaforo: Semaforo
  mensaje: string
}

export interface Calculadora {
  id: string
  nombre: string
  bloque: Bloque
  que_es: string
  formula?: string
  ejemplo?: Ejemplo
  inputs?: CalcInput[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  calcular?: (inputs: Record<string, number>) => Record<string, number | null>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interpretar?: (resultado: any, inputs: Record<string, number>) => Interpretacion
  proximamente?: boolean
}

// ============================================================
// BLOQUE FINANZAS (F1–F16) — funcional
// ============================================================
const FINANZAS: Calculadora[] = [
  {
    id: 'F1',
    nombre: 'Margen Bruto Unitario',
    bloque: 'Finanzas',
    que_es:
      'Cuánto queda de cada venta antes de pagar los costos fijos. Es el termómetro de tu negocio.',
    formula: 'MB$ = Precio de venta − Costo directo\nMB% = (MB$ ÷ Precio de venta) × 100',
    ejemplo: {
      contexto: 'Hamburguesería — negocio físico',
      datos: 'Precio de venta: $3.500 · Costo de ingredientes + empaque: $1.400',
      resultado:
        'MB$ = $2.100 · MB% = 60% → Por cada hamburguesa, quedan $2.100 para cubrir alquiler, sueldos y estructura.',
    },
    inputs: [
      { id: 'precio_venta', label: 'Precio de venta', placeholder: '3500', tipo: 'moneda' },
      { id: 'costo_directo', label: 'Costo directo por unidad', placeholder: '1400', tipo: 'moneda' },
    ],
    calcular: (inputs) => {
      const pv = inputs.precio_venta
      const cv = inputs.costo_directo
      const mb_pesos = pv - cv
      const mb_pct = (mb_pesos / pv) * 100
      return { mb_pesos, mb_pct }
    },
    interpretar: (resultado, inputs) => {
      const { mb_pesos, mb_pct } = resultado
      const semaforo: Semaforo = mb_pct >= 50 ? 'positivo' : mb_pct >= 30 ? 'neutral' : 'negativo'
      let mensaje = ''
      if (mb_pct >= 60)
        mensaje = `Excelente margen. Por cada unidad vendida a $${inputs.precio_venta}, te quedan $${mb_pesos.toFixed(0)} para cubrir tu estructura. Negocio con buen colchón.`
      else if (mb_pct >= 40)
        mensaje = `Margen saludable. $${mb_pesos.toFixed(0)} por unidad para cubrir costos fijos. Revisá si podés subirlo optimizando el costo directo o ajustando el precio.`
      else if (mb_pct >= 20)
        mensaje = `Margen bajo. Con el ${mb_pct.toFixed(1)}%, necesitás vender mucho volumen para cubrir la estructura. Urgente: revisá precios y costos.`
      else
        mensaje = `Margen crítico (${mb_pct.toFixed(1)}%). Cada venta apenas cubre el costo del producto. El negocio no tiene capacidad para pagar estructura fija. Acción inmediata requerida.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'F2',
    nombre: 'Margen Neto',
    bloque: 'Finanzas',
    que_es:
      'Lo que realmente gana el negocio después de pagar absolutamente todo. El número que más importa al final del mes.',
    formula:
      'MN$ = Ingresos totales − (Costo de ventas + Gastos fijos + Impuestos)\nMN% = (MN$ ÷ Ingresos totales) × 100',
    ejemplo: {
      contexto: 'Cualquier negocio — cálculo mensual',
      datos: 'Ventas: $9.000.000 · CV: $4.050.000 · GF: $3.000.000 · Impuestos: $250.000',
      resultado: 'MN$ = $1.700.000 · MN% = 18,9% → Por cada $100 que entra, $18,9 son ganancia real.',
    },
    inputs: [
      { id: 'ingresos', label: 'Ingresos totales del mes', placeholder: '9000000', tipo: 'moneda' },
      { id: 'costo_ventas', label: 'Costo de ventas / mercadería', placeholder: '4050000', tipo: 'moneda' },
      { id: 'gastos_fijos', label: 'Gastos fijos operativos', placeholder: '3000000', tipo: 'moneda' },
      { id: 'impuestos', label: 'Impuestos y otros costos', placeholder: '250000', tipo: 'moneda' },
    ],
    calcular: (inputs) => {
      const mn_pesos = inputs.ingresos - inputs.costo_ventas - inputs.gastos_fijos - inputs.impuestos
      const mn_pct = (mn_pesos / inputs.ingresos) * 100
      const mb_pesos = inputs.ingresos - inputs.costo_ventas
      const mb_pct = (mb_pesos / inputs.ingresos) * 100
      return { mn_pesos, mn_pct, mb_pesos, mb_pct }
    },
    interpretar: (resultado) => {
      const { mn_pct } = resultado
      const semaforo: Semaforo = mn_pct >= 15 ? 'positivo' : mn_pct >= 5 ? 'neutral' : 'negativo'
      let mensaje = ''
      if (mn_pct >= 20)
        mensaje = `Muy buena rentabilidad. El ${mn_pct.toFixed(1)}% de margen neto es sólido — el negocio está saludable y tiene margen para crecer o invertir.`
      else if (mn_pct >= 10)
        mensaje = `Rentabilidad aceptable (${mn_pct.toFixed(1)}%). El negocio genera ganancia real pero tiene espacio para mejorar. Revisá los gastos fijos y si los precios reflejan el margen que necesitás.`
      else if (mn_pct > 0)
        mensaje = `Margen neto bajo (${mn_pct.toFixed(1)}%). El negocio gana, pero cualquier baja en ventas o suba de costos lo lleva a pérdida. Acción prioritaria en costos o precios.`
      else
        mensaje = `El negocio está en pérdida (${mn_pct.toFixed(1)}%). Urgente: identificar si el problema es en el margen bruto (costos de producto) o en los gastos fijos.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'F3',
    nombre: 'Precio Mínimo de Venta',
    bloque: 'Finanzas',
    que_es:
      'El precio por debajo del cual perdés dinero en cada venta. Calculalo antes de cualquier descuento o promoción.',
    formula: 'Precio mínimo = Costo directo ÷ (1 − Margen objetivo %)',
    ejemplo: {
      contexto: 'Producto con costo de $1.400 y margen objetivo del 40%',
      datos: 'Costo directo: $1.400 · Margen objetivo: 40%',
      resultado: 'Precio mínimo = $1.400 ÷ 0,60 = $2.333 → Por debajo de $2.333, cada venta te cuesta dinero.',
    },
    inputs: [
      { id: 'costo_directo', label: 'Costo directo del producto/servicio', placeholder: '1400', tipo: 'moneda' },
      { id: 'margen_objetivo', label: 'Margen bruto objetivo (%)', placeholder: '40', tipo: 'porcentaje' },
      { id: 'precio_actual', label: 'Tu precio actual (opcional)', placeholder: '3500', tipo: 'moneda', requerido: false },
    ],
    calcular: (inputs) => {
      const divisor = 1 - inputs.margen_objetivo / 100
      if (divisor <= 0) return { precio_minimo: null, margen_actual: null, diferencia: null }
      const precio_minimo = inputs.costo_directo / divisor
      const margen_actual = inputs.precio_actual
        ? ((inputs.precio_actual - inputs.costo_directo) / inputs.precio_actual) * 100
        : null
      const diferencia = inputs.precio_actual ? inputs.precio_actual - precio_minimo : null
      return { precio_minimo, margen_actual, diferencia }
    },
    interpretar: (resultado, inputs) => {
      const { precio_minimo, diferencia } = resultado
      if (precio_minimo === null) {
        return { semaforo: 'negativo', mensaje: 'El margen objetivo no puede ser 100% o más — resultaría en un precio infinito. Ingresá un margen entre 1% y 99%.' }
      }
      let semaforo: Semaforo = 'neutral'
      let mensaje = `Tu precio mínimo de venta es $${precio_minimo.toFixed(0)}. `
      if (inputs.precio_actual) {
        if (diferencia > 0) {
          semaforo = 'positivo'
          mensaje += `Tu precio actual ($${inputs.precio_actual}) está $${diferencia.toFixed(0)} por encima del mínimo — tenés margen para hacer descuentos de hasta ${((diferencia / inputs.precio_actual) * 100).toFixed(1)}% sin perder dinero.`
        } else {
          semaforo = 'negativo'
          mensaje += `⚠️ Tu precio actual ($${inputs.precio_actual}) está POR DEBAJO del mínimo — estás perdiendo $${Math.abs(diferencia).toFixed(0)} por unidad vendida. Hay que subir el precio o bajar el costo.`
        }
      } else {
        mensaje += `Cualquier precio por debajo de ese número implica pérdida en cada venta, aunque el negocio "esté vendiendo bien".`
      }
      return { semaforo, mensaje }
    },
  },
  {
    id: 'F4',
    nombre: 'Contribución Marginal',
    bloque: 'Finanzas',
    que_es:
      'Cuánto aporta cada venta para cubrir los costos fijos. Cuando la CM total supera los GF, el negocio empieza a ganar.',
    formula:
      'CM unitaria = Precio de venta − Costo variable unitario\nCM total = Ventas totales − Costos variables totales\n% CM = (CM total ÷ Ventas totales) × 100',
    ejemplo: {
      contexto: 'Negocio con 500 unidades vendidas en el mes',
      datos: 'Precio: $3.500 · CV unitario: $1.400 · Unidades: 500 · Gastos fijos: $800.000',
      resultado: 'CM unitaria: $2.100 · CM total: $1.050.000 · Con GF de $800.000 → utilidad: $250.000',
    },
    inputs: [
      { id: 'precio_venta', label: 'Precio de venta por unidad', placeholder: '3500', tipo: 'moneda' },
      { id: 'costo_variable', label: 'Costo variable por unidad', placeholder: '1400', tipo: 'moneda' },
      { id: 'unidades', label: 'Unidades vendidas en el mes', placeholder: '500', tipo: 'numero' },
      { id: 'gastos_fijos', label: 'Gastos fijos del mes', placeholder: '800000', tipo: 'moneda' },
    ],
    calcular: (inputs) => {
      const cm_unitaria = inputs.precio_venta - inputs.costo_variable
      const cm_total = cm_unitaria * inputs.unidades
      const cm_pct = (cm_unitaria / inputs.precio_venta) * 100
      const ventas_totales = inputs.precio_venta * inputs.unidades
      const utilidad = cm_total - inputs.gastos_fijos
      return { cm_unitaria, cm_total, cm_pct, ventas_totales, utilidad }
    },
    interpretar: (resultado) => {
      const { utilidad } = resultado
      const semaforo: Semaforo = utilidad > 0 ? 'positivo' : utilidad === 0 ? 'neutral' : 'negativo'
      const mensaje =
        utilidad > 0
          ? `La contribución marginal total ($${resultado.cm_total.toLocaleString('es-AR')}) superó los costos fijos. El negocio generó $${resultado.utilidad.toLocaleString('es-AR')} de utilidad este mes.`
          : utilidad === 0
            ? `Estás exactamente en el punto de equilibrio. No ganás ni perdés. Un poco más de ventas y empezás a ganar.`
            : `La contribución marginal total no alcanza para cubrir los costos fijos. El negocio está en pérdida de $${Math.abs(resultado.utilidad).toLocaleString('es-AR')} este mes.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'F5',
    nombre: 'Contribución Real por Producto',
    bloque: 'Finanzas',
    que_es:
      'Determina cuánto aporta realmente cada producto a la rentabilidad, combinando su margen con su participación en ventas.',
    formula: 'Contribución real = MB% del producto × Participación en ventas totales (%)',
    ejemplo: {
      contexto: 'Negocio con dos productos principales',
      datos:
        'Prod. A: MB 60%, representa 20% de ventas → contribución real: 12%\nProd. B: MB 35%, representa 70% de ventas → contribución real: 24,5%',
      resultado: 'El Producto B aporta el doble, aunque tenga menor margen. Ahí debe estar el foco comercial.',
    },
    inputs: [
      { id: 'mb_pct_1', label: 'Margen bruto Producto 1 (%)', placeholder: '60', tipo: 'porcentaje' },
      { id: 'part_1', label: 'Participación en ventas Prod. 1 (%)', placeholder: '20', tipo: 'porcentaje' },
      { id: 'mb_pct_2', label: 'Margen bruto Producto 2 (%)', placeholder: '35', tipo: 'porcentaje' },
      { id: 'part_2', label: 'Participación en ventas Prod. 2 (%)', placeholder: '70', tipo: 'porcentaje' },
    ],
    calcular: (inputs) => {
      const contrib_1 = (inputs.mb_pct_1 / 100) * (inputs.part_1 / 100) * 100
      const contrib_2 = (inputs.mb_pct_2 / 100) * (inputs.part_2 / 100) * 100
      const ganador = contrib_1 > contrib_2 ? 1 : 2
      return { contrib_1, contrib_2, ganador }
    },
    interpretar: (resultado) => {
      const { contrib_1, contrib_2, ganador } = resultado
      const semaforo: Semaforo = 'neutral'
      let mensaje = `Producto 1 aporta realmente el ${contrib_1.toFixed(1)}% a la rentabilidad total. Producto 2 aporta el ${contrib_2.toFixed(1)}%. `
      mensaje += `El Producto ${ganador} es el que más impacta en tus ganancias, aunque no necesariamente tenga el mayor margen individual. Enfocá tu comunicación y ventas ahí.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'F6',
    nombre: 'Punto de Equilibrio',
    bloque: 'Finanzas',
    que_es:
      'Cuánto tenés que vender para no ganar ni perder. La primera meta del mes. Todo lo que vendés por encima de acá es ganancia.',
    formula: 'PE en $ = Gastos Fijos ÷ % Margen Bruto\nPE en unidades = Gastos Fijos ÷ CM unitaria',
    ejemplo: {
      contexto: 'Negocio con GF altos y buen margen',
      datos: 'Gastos fijos: $3.500.000 · MB%: 55%',
      resultado:
        'PE = $6.363.636 → Con 26 días de apertura, necesitás vender $244.755/día solo para no perder.',
    },
    inputs: [
      { id: 'gastos_fijos', label: 'Gastos fijos mensuales totales', placeholder: '3500000', tipo: 'moneda' },
      { id: 'mb_pct', label: 'Margen bruto (%)', placeholder: '55', tipo: 'porcentaje' },
      { id: 'dias_apertura', label: 'Días de apertura al mes', placeholder: '26', tipo: 'numero' },
      {
        id: 'ticket_promedio',
        label: 'Ticket promedio (opcional, para calcular clientes necesarios)',
        placeholder: '30000',
        tipo: 'moneda',
        requerido: false,
      },
    ],
    calcular: (inputs) => {
      const pe_pesos = inputs.gastos_fijos / (inputs.mb_pct / 100)
      const pe_por_dia = pe_pesos / inputs.dias_apertura
      const pe_unidades = inputs.ticket_promedio ? pe_pesos / inputs.ticket_promedio : null
      return { pe_pesos, pe_por_dia, pe_unidades }
    },
    interpretar: (resultado, inputs) => {
      const { pe_pesos, pe_por_dia, pe_unidades } = resultado
      const semaforo: Semaforo = 'neutral'
      let mensaje = `Tu Punto de Equilibrio es $${pe_pesos.toLocaleString('es-AR')} al mes. `
      mensaje += `Necesitás vender $${pe_por_dia.toLocaleString('es-AR', { maximumFractionDigits: 0 })} por día (con ${inputs.dias_apertura} días de apertura) antes de ganar un peso. `
      if (pe_unidades)
        mensaje += `Eso equivale a ${Math.ceil(pe_unidades).toLocaleString('es-AR')} transacciones al mes, o ${Math.ceil(pe_unidades / inputs.dias_apertura)} por día.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'F7',
    nombre: 'Punto Óptimo — Meta real del mes',
    bloque: 'Finanzas',
    que_es:
      'Cuánto tenés que vender para ganar la utilidad que querés. El PE te dice el mínimo; el PO te da la meta.',
    formula: 'PO = (Gastos Fijos + Utilidad deseada) ÷ % Margen Bruto',
    ejemplo: {
      contexto: 'Negocio que quiere ganar $1.500.000 netos',
      datos: 'GF: $3.500.000 · Utilidad deseada: $1.500.000 · MB%: 55%',
      resultado: 'PO = $9.090.909 → Esa es la meta de ventas del mes, no el PE.',
    },
    inputs: [
      { id: 'gastos_fijos', label: 'Gastos fijos mensuales', placeholder: '3500000', tipo: 'moneda' },
      { id: 'utilidad_deseada', label: 'Utilidad neta que querés ganar', placeholder: '1500000', tipo: 'moneda' },
      { id: 'mb_pct', label: 'Margen bruto (%)', placeholder: '55', tipo: 'porcentaje' },
      { id: 'dias_apertura', label: 'Días de apertura al mes', placeholder: '26', tipo: 'numero' },
    ],
    calcular: (inputs) => {
      const po = (inputs.gastos_fijos + inputs.utilidad_deseada) / (inputs.mb_pct / 100)
      const pe = inputs.gastos_fijos / (inputs.mb_pct / 100)
      const meta_diaria = po / inputs.dias_apertura
      const diferencia_vs_pe = po - pe
      return { po, pe, meta_diaria, diferencia_vs_pe }
    },
    interpretar: (resultado) => {
      const { po, pe, meta_diaria, diferencia_vs_pe } = resultado
      const semaforo: Semaforo = 'neutral'
      let mensaje = `Para ganar lo que querés, necesitás vender $${po.toLocaleString('es-AR', { maximumFractionDigits: 0 })} al mes. `
      mensaje += `Tu meta diaria es $${meta_diaria.toLocaleString('es-AR', { maximumFractionDigits: 0 })}. `
      mensaje += `La diferencia entre el PE ($${pe.toLocaleString('es-AR', { maximumFractionDigits: 0 })}) y tu meta es $${diferencia_vs_pe.toLocaleString('es-AR', { maximumFractionDigits: 0 })} — ese es el "rango de prosperidad" que tenés que lograr cada mes.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'F8',
    nombre: 'Proyección Inversa — De utilidad a prospectos',
    bloque: 'Finanzas',
    que_es:
      'Partís de cuánto querés ganar y calculás exactamente cuántos prospectos necesitás. Conecta finanzas con marketing.',
    formula:
      'De abajo hacia arriba:\n1. Utilidad deseada + GF = Cash Collected necesario ÷ MB%\n2. ÷ Ticket promedio = Total clientes\n3. − Clientes recompra = Clientes nuevos\n4. ÷ Tasa de cierre = Prospectos necesarios',
    ejemplo: {
      contexto: 'Negocio digital con alta recurrencia',
      datos:
        'Utilidad: $5.000.000 · GF+Variables: $4.500.000 · MB: 90% · Ticket: $65.000 · Cierre: 40% · Recompra: 45',
      resultado: 'Cash needed: $9.444.444 · Clientes totales: 145 · Nuevos: 100 · Prospectos: 251',
    },
    inputs: [
      { id: 'utilidad_deseada', label: 'Utilidad neta deseada', placeholder: '5000000', tipo: 'moneda' },
      { id: 'gastos_totales', label: 'Gastos fijos + variables estimados', placeholder: '4500000', tipo: 'moneda' },
      { id: 'mb_pct', label: 'Margen bruto (%)', placeholder: '90', tipo: 'porcentaje' },
      { id: 'ticket', label: 'Ticket promedio de venta', placeholder: '65000', tipo: 'moneda' },
      { id: 'recompra', label: 'Clientes actuales que vuelven este mes', placeholder: '45', tipo: 'numero' },
      { id: 'tasa_cierre', label: 'Tasa de cierre (%)', placeholder: '40', tipo: 'porcentaje' },
    ],
    calcular: (inputs) => {
      const cash_needed = (inputs.utilidad_deseada + inputs.gastos_totales) / (inputs.mb_pct / 100)
      const total_clientes = Math.ceil(cash_needed / inputs.ticket)
      const clientes_nuevos = Math.max(0, total_clientes - inputs.recompra)
      const prospectos = Math.ceil(clientes_nuevos / (inputs.tasa_cierre / 100))
      return { cash_needed, total_clientes, clientes_nuevos, prospectos }
    },
    interpretar: (resultado) => {
      const { cash_needed, total_clientes, clientes_nuevos, prospectos } = resultado
      const semaforo: Semaforo = 'neutral'
      let mensaje = `Para lograr tu utilidad deseada, necesitás $${cash_needed.toLocaleString('es-AR', { maximumFractionDigits: 0 })} de facturación. `
      mensaje += `Eso implica ${total_clientes} clientes (${clientes_nuevos} nuevos + los que recompran). `
      mensaje += `Con tu tasa de cierre, necesitás generar ${prospectos} prospectos este mes. Ese es el número que le das a tu equipo de marketing.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'F9',
    nombre: 'Margen de Seguridad',
    bloque: 'Finanzas',
    que_es:
      'Cuánto pueden caer tus ventas antes de empezar a perder dinero. Mide qué tan frágil o robusto es tu negocio.',
    formula: 'MS% = ((Ventas actuales − Ventas PE) ÷ Ventas actuales) × 100',
    ejemplo: {
      contexto: 'Negocio con ventas $9M y PE de $6.36M',
      datos: 'Ventas: $9.000.000 · PE: $6.363.636',
      resultado: 'MS = 29,3% → Podés caer casi 30% antes de entrar en pérdida. Un negocio sano.',
    },
    inputs: [
      { id: 'ventas_actuales', label: 'Ventas actuales del mes', placeholder: '9000000', tipo: 'moneda' },
      { id: 'gastos_fijos', label: 'Gastos fijos (para calcular PE automático)', placeholder: '3500000', tipo: 'moneda' },
      { id: 'mb_pct', label: 'Margen bruto (%)', placeholder: '55', tipo: 'porcentaje' },
    ],
    calcular: (inputs) => {
      const pe = inputs.gastos_fijos / (inputs.mb_pct / 100)
      const ms_pct = ((inputs.ventas_actuales - pe) / inputs.ventas_actuales) * 100
      return { pe, ms_pct }
    },
    interpretar: (resultado) => {
      const { ms_pct } = resultado
      const semaforo: Semaforo = ms_pct >= 25 ? 'positivo' : ms_pct >= 10 ? 'neutral' : 'negativo'
      const mensaje =
        ms_pct >= 30
          ? `Negocio robusto. Podés caer un ${ms_pct.toFixed(1)}% en ventas antes de perder. Tenés colchón para maniobrar.`
          : ms_pct >= 15
            ? `Margen de seguridad aceptable (${ms_pct.toFixed(1)}%). Una caída moderada te puede poner en riesgo. Trabajá en aumentar el PE vs. ventas actuales.`
            : ms_pct >= 0
              ? `Margen de seguridad bajo (${ms_pct.toFixed(1)}%). El negocio es frágil — cualquier baja en ventas te lleva a pérdida. Prioridad: bajar costos fijos o aumentar margen.`
              : `El negocio ya está en zona de pérdida (${ms_pct.toFixed(1)}%). Las ventas actuales no cubren los costos fijos. Acción inmediata requerida.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'F10',
    nombre: 'ROI de Inversión',
    bloque: 'Finanzas',
    que_es:
      'Para cualquier inversión nueva (máquina, local, tecnología): cuánto retorna y en cuánto tiempo la recuperás.',
    formula:
      'ROI% = (Ganancia neta atribuida ÷ Inversión) × 100\nPayback (meses) = Inversión ÷ Utilidad mensual adicional',
    ejemplo: {
      contexto: 'Fábrica evaluando una máquina nueva',
      datos: 'Inversión: $8.000.000 · Utilidad adicional mensual: $400.000',
      resultado: 'Payback: 20 meses ✓ → Buena inversión. Si generara $150.000/mes → 53 meses → replantear.',
    },
    inputs: [
      { id: 'inversion', label: 'Monto de la inversión', placeholder: '8000000', tipo: 'moneda' },
      { id: 'utilidad_adicional', label: 'Utilidad mensual adicional que genera', placeholder: '400000', tipo: 'moneda' },
    ],
    calcular: (inputs) => {
      const payback_meses = inputs.inversion / inputs.utilidad_adicional
      const roi_anual = ((inputs.utilidad_adicional * 12) / inputs.inversion) * 100
      return { payback_meses, roi_anual }
    },
    interpretar: (resultado) => {
      const { payback_meses, roi_anual } = resultado
      const semaforo: Semaforo = payback_meses <= 24 ? 'positivo' : payback_meses <= 48 ? 'neutral' : 'negativo'
      let mensaje = `Recuperás la inversión en ${payback_meses.toFixed(1)} meses (${(payback_meses / 12).toFixed(1)} años). `
      mensaje += `Eso equivale a un ROI anual del ${roi_anual.toFixed(1)}%. `
      mensaje +=
        payback_meses <= 24
          ? `Buena inversión — dentro del rango ideal de 2 años.`
          : payback_meses <= 48
            ? `Inversión aceptable pero lenta. Evaluá si hay alternativas más eficientes.`
            : `Payback muy largo (más de 4 años). Replantear la inversión o renegociar el precio.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'F11',
    nombre: 'Amortización Mensual',
    bloque: 'Finanzas',
    que_es:
      "El costo mensual 'invisible' de un activo. Si no lo incluís en los GF, estás sobreestimando tu ganancia.",
    formula: 'Amortización mensual = Valor de la inversión ÷ Meses de vida útil',
    ejemplo: {
      contexto: 'Máquina comprada a $8.000.000',
      datos: 'Inversión: $8.000.000 · Vida útil: 48 meses',
      resultado: '$166.667/mes → Ese monto hay que sumarlo a los GF para calcular el PE real.',
    },
    inputs: [
      { id: 'valor_activo', label: 'Valor del activo / inversión', placeholder: '8000000', tipo: 'moneda' },
      { id: 'vida_util_meses', label: 'Vida útil en meses', placeholder: '48', tipo: 'numero' },
    ],
    calcular: (inputs) => {
      const amortizacion_mensual = inputs.valor_activo / inputs.vida_util_meses
      const amortizacion_anual = amortizacion_mensual * 12
      return { amortizacion_mensual, amortizacion_anual }
    },
    interpretar: (resultado) => {
      const { amortizacion_mensual } = resultado
      const semaforo: Semaforo = 'neutral'
      let mensaje = `Este activo te cuesta $${amortizacion_mensual.toLocaleString('es-AR', { maximumFractionDigits: 0 })} por mes en amortización. `
      mensaje += `Ese monto debe sumarse a tus gastos fijos antes de calcular el Punto de Equilibrio. Si no lo hacés, estás creyendo que ganás más de lo que realmente ganás.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'F12',
    nombre: 'Facturado vs. Percibido',
    bloque: 'Finanzas',
    que_es:
      'La diferencia entre lo que vendiste y lo que realmente cobraste. Un negocio puede quebrar aunque facture bien.',
    formula: 'CxC = Facturado − Percibido\nTasa de cobro = (Cobrado ÷ Facturado) × 100',
    ejemplo: {
      contexto: 'Negocio con ventas a crédito o cuotas',
      datos: 'Facturado: $10.000.000 · Cobrado: $7.200.000',
      resultado: 'CxC: $2.800.000 · Tasa cobro: 72% → Si esos $2,8M no se cobran en 60 días, hay crisis de caja.',
    },
    inputs: [
      { id: 'facturado', label: 'Ventas facturadas del mes', placeholder: '10000000', tipo: 'moneda' },
      { id: 'cobrado', label: 'Dinero efectivamente cobrado (percibido)', placeholder: '7200000', tipo: 'moneda' },
    ],
    calcular: (inputs) => {
      const cxc = inputs.facturado - inputs.cobrado
      const tasa_cobro = (inputs.cobrado / inputs.facturado) * 100
      return { cxc, tasa_cobro }
    },
    interpretar: (resultado) => {
      const { cxc, tasa_cobro } = resultado
      const semaforo: Semaforo = tasa_cobro >= 85 ? 'positivo' : tasa_cobro >= 70 ? 'neutral' : 'negativo'
      let mensaje = `Tu tasa de cobro es del ${tasa_cobro.toFixed(1)}% — hay $${cxc.toLocaleString('es-AR')} en cuentas por cobrar. `
      mensaje +=
        tasa_cobro >= 85
          ? `Buena gestión de cobro. Seguí monitoreando para que no se acumule deuda vieja.`
          : tasa_cobro >= 70
            ? `Tasa de cobro en zona de alerta. Ese dinero pendiente puede presionar tu caja. Establecé un sistema de seguimiento de cobranza.`
            : `Tasa de cobro baja — hay un problema serio de cobranza. Si ese dinero no entra en 30-60 días, el negocio enfrenta crisis de liquidez aunque las ventas sean buenas.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'F13',
    nombre: 'Tasa de Cobro y Mora',
    bloque: 'Finanzas',
    que_es:
      'Mide la salud de tu cartera. La mora alta destruye el flujo de caja aunque las ventas sean excelentes.',
    formula:
      'Tasa de mora = (Importe vencido no cobrado ÷ Facturado) × 100\nDías de cobro = CxC promedio ÷ Ventas diarias',
    ejemplo: {
      contexto: 'Negocio B2B con clientes que pagan a 30 días',
      datos: 'Facturado: $10.000.000 · Cobrado: $8.500.000 · Vencido impago: $800.000',
      resultado: 'Mora: 8% ⚠ · Tasa cobro: 85% → Zona de alerta, acción requerida en seguimiento.',
    },
    inputs: [
      { id: 'facturado', label: 'Ventas facturadas del mes', placeholder: '10000000', tipo: 'moneda' },
      { id: 'cobrado', label: 'Cobrado en el mes', placeholder: '8500000', tipo: 'moneda' },
      { id: 'vencido_impago', label: 'Importe vencido no cobrado', placeholder: '800000', tipo: 'moneda' },
      { id: 'dias_mes', label: 'Días del mes', placeholder: '30', tipo: 'numero' },
    ],
    calcular: (inputs) => {
      const tasa_cobro = (inputs.cobrado / inputs.facturado) * 100
      const tasa_mora = (inputs.vencido_impago / inputs.facturado) * 100
      const cxc = inputs.facturado - inputs.cobrado
      const ventas_diarias = inputs.facturado / inputs.dias_mes
      const dias_cobro = cxc / ventas_diarias
      return { tasa_cobro, tasa_mora, cxc, dias_cobro }
    },
    interpretar: (resultado) => {
      const { tasa_mora, tasa_cobro, dias_cobro } = resultado
      const semaforo: Semaforo = tasa_mora <= 5 ? 'positivo' : tasa_mora <= 10 ? 'neutral' : 'negativo'
      let mensaje = `Tasa de cobro: ${tasa_cobro.toFixed(1)}% · Tasa de mora: ${tasa_mora.toFixed(1)}% · Días promedio de cobro: ${dias_cobro.toFixed(0)} días. `
      mensaje +=
        tasa_mora <= 5
          ? `Cartera saludable. Seguí monitoreando para mantener la mora baja.`
          : tasa_mora <= 10
            ? `Zona de alerta. La mora empieza a pesar. Implementá un protocolo de recordatorio de pago automático.`
            : `Problema estructural de cobranza. Más del 10% de lo facturado no se está cobrando. Revisá las condiciones de crédito que otorgás y el seguimiento post-venta.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'F14',
    nombre: 'Estado de Resultados (P&L)',
    bloque: 'Finanzas',
    que_es:
      'La radiografía económica del negocio en el mes. Muestra si el negocio es rentable, más allá de lo que hay en caja.',
    formula:
      'Ventas − CV = Utilidad Bruta\nUtilidad Bruta − GF = Utilidad Operativa\nUtilidad Operativa − Impuestos = Utilidad Neta',
    ejemplo: {
      contexto: 'P&L mensual completo',
      datos: 'Ventas: $9.000.000 · CV: $4.050.000 · GF: $3.000.000 · Impuestos: $250.000',
      resultado: 'MB: $4.950.000 (55%) · Utilidad Op: $1.950.000 · Neta: $1.700.000 (18,9%)',
    },
    inputs: [
      { id: 'ventas', label: 'Ventas del mes (facturado)', placeholder: '9000000', tipo: 'moneda' },
      { id: 'costo_ventas', label: 'Costo de ventas / mercadería (CV)', placeholder: '4050000', tipo: 'moneda' },
      { id: 'gastos_fijos', label: 'Gastos fijos operativos', placeholder: '3000000', tipo: 'moneda' },
      { id: 'impuestos', label: 'Impuestos y otros egresos', placeholder: '250000', tipo: 'moneda' },
    ],
    calcular: (inputs) => {
      const utilidad_bruta = inputs.ventas - inputs.costo_ventas
      const mb_pct = (utilidad_bruta / inputs.ventas) * 100
      const utilidad_operativa = utilidad_bruta - inputs.gastos_fijos
      const utilidad_neta = utilidad_operativa - inputs.impuestos
      const mn_pct = (utilidad_neta / inputs.ventas) * 100
      return { utilidad_bruta, mb_pct, utilidad_operativa, utilidad_neta, mn_pct }
    },
    interpretar: (resultado) => {
      const { utilidad_neta, mn_pct, mb_pct } = resultado
      const semaforo: Semaforo = mn_pct >= 15 ? 'positivo' : mn_pct >= 0 ? 'neutral' : 'negativo'
      let mensaje =
        utilidad_neta > 0
          ? `El negocio generó $${utilidad_neta.toLocaleString('es-AR')} de utilidad neta (${mn_pct.toFixed(1)}% de margen). `
          : `El negocio cerró el mes en pérdida de $${Math.abs(utilidad_neta).toLocaleString('es-AR')}. `
      mensaje +=
        mb_pct < 40
          ? `El margen bruto (${mb_pct.toFixed(1)}%) es el punto crítico — los costos de producto están muy altos en relación al precio.`
          : mn_pct < 0
            ? `El margen bruto es aceptable pero los gastos fijos son demasiado altos para el nivel de ventas actual.`
            : `La estructura de costos está razonablemente balanceada.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'F15',
    nombre: 'PE con Nueva Contratación — ¿Cuánto le puedo pagar?',
    bloque: 'Finanzas',
    que_es:
      'Antes de contratar, calculás cuánto más tiene que vender el negocio para que la rentabilidad no baje.',
    formula:
      'Costo real = Sueldo × 1,3 a 1,5\nIncremento necesario = Costo real ÷ (1 − % Margen Neto objetivo)',
    ejemplo: {
      contexto: 'Negocio evaluando sumar alguien al equipo',
      datos: 'Sueldo acordado: $250.000 · Factor cargas: 1,30 · Margen neto objetivo: 30%',
      resultado: 'Costo real: $325.000 · Incremento = $325.000 ÷ 0,70 = $464.286 más/mes',
    },
    inputs: [
      { id: 'sueldo', label: 'Sueldo acordado con la persona', placeholder: '250000', tipo: 'moneda' },
      { id: 'factor_cargas', label: 'Factor de cargas sociales (1,3 a 1,5)', placeholder: '1.3', tipo: 'decimal' },
      { id: 'mn_objetivo', label: 'Margen neto objetivo que querés mantener (%)', placeholder: '30', tipo: 'porcentaje' },
      {
        id: 'ventas_actuales',
        label: 'Ventas actuales del mes (opcional)',
        placeholder: '5000000',
        tipo: 'moneda',
        requerido: false,
      },
    ],
    calcular: (inputs) => {
      const costo_real = inputs.sueldo * inputs.factor_cargas
      const divisor = 1 - inputs.mn_objetivo / 100
      if (divisor <= 0) return { costo_real, incremento_necesario: null, ventas_nueva_meta: null }
      const incremento_necesario = costo_real / divisor
      const ventas_nueva_meta = inputs.ventas_actuales ? inputs.ventas_actuales + incremento_necesario : null
      return { costo_real, incremento_necesario, ventas_nueva_meta }
    },
    interpretar: (resultado, inputs) => {
      const { costo_real, incremento_necesario, ventas_nueva_meta } = resultado
      if (incremento_necesario === null) {
        return { semaforo: 'negativo', mensaje: `El costo real de esa persona es $${costo_real.toLocaleString('es-AR', { maximumFractionDigits: 0 })}/mes. El margen neto objetivo no puede ser 100% — ingresá un valor entre 1% y 99%.` }
      }
      const semaforo: Semaforo = 'neutral'
      let mensaje = `El costo real de esa persona es $${costo_real.toLocaleString('es-AR', { maximumFractionDigits: 0 })}/mes (incluyendo cargas). `
      mensaje += `Para mantener tu margen neto objetivo, necesitás crecer $${incremento_necesario.toLocaleString('es-AR', { maximumFractionDigits: 0 })} en facturación mensual. `
      if (ventas_nueva_meta)
        mensaje += `Es decir, pasar de $${inputs.ventas_actuales.toLocaleString('es-AR')} a $${ventas_nueva_meta.toLocaleString('es-AR', { maximumFractionDigits: 0 })}. ¿Lo podés lograr en 1-3 meses? Sí → contratá. No → esperá o renegociá.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'F16',
    nombre: 'Costo de Reposición y Margen Real',
    bloque: 'Finanzas',
    que_es:
      'En contextos de inflación, el margen debe calcularse sobre el costo de reponer hoy, no sobre lo que pagaste antes.',
    formula: 'Margen real = (PV − Costo de reposición actual) ÷ PV × 100',
    ejemplo: {
      contexto: 'Negocio con stock comprado hace 2 meses',
      datos: 'Costo original: $1.000 · Costo reposición hoy: $1.400 · Precio venta: $2.500',
      resultado: 'Margen real: 44% (no el 60% basado en costo viejo) → Actualizar precios.',
    },
    inputs: [
      { id: 'precio_venta', label: 'Precio de venta actual', placeholder: '2500', tipo: 'moneda' },
      { id: 'costo_compra', label: 'Costo al que compraste el stock', placeholder: '1000', tipo: 'moneda' },
      { id: 'costo_reposicion', label: 'Costo para reponer hoy (según proveedor)', placeholder: '1400', tipo: 'moneda' },
    ],
    calcular: (inputs) => {
      const margen_sobre_compra = ((inputs.precio_venta - inputs.costo_compra) / inputs.precio_venta) * 100
      const margen_real = ((inputs.precio_venta - inputs.costo_reposicion) / inputs.precio_venta) * 100
      const diferencia_margen = margen_sobre_compra - margen_real
      return { margen_sobre_compra, margen_real, diferencia_margen }
    },
    interpretar: (resultado) => {
      const { margen_sobre_compra, margen_real, diferencia_margen } = resultado
      const semaforo: Semaforo = diferencia_margen < 5 ? 'positivo' : diferencia_margen < 15 ? 'neutral' : 'negativo'
      let mensaje = `Tu margen basado en el costo de compra es ${margen_sobre_compra.toFixed(1)}%, pero el margen real (sobre lo que te cuesta reponer hoy) es ${margen_real.toFixed(1)}%. `
      mensaje +=
        diferencia_margen < 5
          ? `La diferencia es mínima — tus precios están bien actualizados.`
          : diferencia_margen < 15
            ? `Hay una diferencia de ${diferencia_margen.toFixed(1)} puntos de margen. Revisá si tus precios reflejan el nuevo costo de reposición.`
            : `Diferencia crítica de ${diferencia_margen.toFixed(1)} puntos. Estás tomando decisiones de precio y descuento basadas en un margen falso. Actualizar precios es urgente.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'F17',
    nombre: 'Proyección de Caja a 90 días',
    bloque: 'Finanzas',
    que_es: 'Cuánta plata vas a tener disponible en los próximos 3 meses. La herramienta clave para no quedarte sin caja aunque el negocio sea rentable.',
    formula: 'Saldo Mes N = Saldo Mes N−1 + Cobros del mes − Pagos del mes',
    ejemplo: {
      contexto: 'Negocio con caja ajustada',
      datos: 'Caja hoy: $500.000 · Mes 1: cobra $2.000.000, paga $1.800.000 · Mes 2: cobra $2.200.000, paga $1.900.000 · Mes 3: cobra $1.500.000, paga $2.100.000',
      resultado: 'Mes 1: $700.000 · Mes 2: $1.000.000 · Mes 3: $400.000 — el Mes 3 se comprime. Hay que prepararse con anticipación.',
    },
    inputs: [
      { id: 'saldo_inicial', label: 'Caja disponible hoy', placeholder: '500000', tipo: 'moneda' },
      { id: 'cobros_1', label: 'Cobros esperados — Mes 1', placeholder: '2000000', tipo: 'moneda' },
      { id: 'pagos_1', label: 'Pagos comprometidos — Mes 1', placeholder: '1800000', tipo: 'moneda' },
      { id: 'cobros_2', label: 'Cobros esperados — Mes 2', placeholder: '2200000', tipo: 'moneda' },
      { id: 'pagos_2', label: 'Pagos comprometidos — Mes 2', placeholder: '1900000', tipo: 'moneda' },
      { id: 'cobros_3', label: 'Cobros esperados — Mes 3', placeholder: '1500000', tipo: 'moneda' },
      { id: 'pagos_3', label: 'Pagos comprometidos — Mes 3', placeholder: '2100000', tipo: 'moneda' },
    ],
    calcular: (inputs) => {
      const saldo_1 = inputs.saldo_inicial + inputs.cobros_1 - inputs.pagos_1
      const saldo_2 = saldo_1 + inputs.cobros_2 - inputs.pagos_2
      const saldo_3 = saldo_2 + inputs.cobros_3 - inputs.pagos_3
      const mes_critico = saldo_1 < 0 ? 1 : saldo_2 < 0 ? 2 : saldo_3 < 0 ? 3 : 0
      return { saldo_1, saldo_2, saldo_3, mes_critico }
    },
    interpretar: (resultado, inputs) => {
      const { saldo_1, saldo_2, saldo_3, mes_critico } = resultado
      const fmt = (n: number) => '$' + Math.round(n).toLocaleString('es-AR')
      const min_saldo = Math.min(saldo_1, saldo_2, saldo_3)
      const semaforo: Semaforo = mes_critico > 0 ? 'negativo' : min_saldo < inputs.saldo_inicial * 0.5 ? 'neutral' : 'positivo'
      let mensaje = `Proyección: Mes 1 ${fmt(saldo_1)} · Mes 2 ${fmt(saldo_2)} · Mes 3 ${fmt(saldo_3)}. `
      if (mes_critico > 0) {
        mensaje += `La caja entra en negativo en el Mes ${mes_critico}. Necesitás cubrir esa brecha antes de que llegue: adelantar cobros, negociar plazos de pago o conseguir financiamiento.`
      } else if (saldo_3 > saldo_1 && saldo_2 > saldo_1) {
        mensaje += `La caja crece de forma consistente. Flujo positivo — aprovechá el excedente para invertir o formar reservas.`
      } else if (min_saldo < inputs.saldo_inicial * 0.5) {
        mensaje += `La caja es positiva pero hay un mes comprimido (${fmt(min_saldo)}). Preparate con anticipación para ese período y evitá compromisos financieros adicionales ese mes.`
      } else {
        mensaje += `La caja se mantiene sólida en los 3 meses. Flujo equilibrado y con margen.`
      }
      return { semaforo, mensaje }
    },
  },
  {
    id: 'F18',
    nombre: 'Capital de Trabajo Necesario',
    bloque: 'Finanzas',
    que_es: 'Cuánto dinero necesita el negocio para operar entre que comprás o producís y que cobrás. Sin este colchón, el negocio se ahoga aunque venda bien.',
    formula: 'Capital de Trabajo = (Costos variables + Gastos fijos) × Días del ciclo / 30',
    ejemplo: {
      contexto: 'Comercio que demora 45 días entre compra y cobro',
      datos: 'Costos variables: $1.500.000 · Gastos fijos: $500.000 · Ciclo operativo: 45 días',
      resultado: 'Capital de trabajo necesario: $3.000.000 — ese dinero tiene que estar siempre disponible.',
    },
    inputs: [
      { id: 'costos_variables_mes', label: 'Costos variables del mes', placeholder: '1500000', tipo: 'moneda' },
      { id: 'gastos_fijos_mes', label: 'Gastos fijos del mes', placeholder: '500000', tipo: 'moneda' },
      { id: 'dias_ciclo', label: 'Días entre que pagás y cobrás', placeholder: '45', tipo: 'numero' },
    ],
    calcular: (inputs) => {
      const egresos_diarios = (inputs.costos_variables_mes + inputs.gastos_fijos_mes) / 30
      const capital_trabajo = egresos_diarios * inputs.dias_ciclo
      return { capital_trabajo, egresos_diarios }
    },
    interpretar: (resultado, inputs) => {
      const { capital_trabajo, egresos_diarios } = resultado
      const ciclo = inputs.dias_ciclo
      const semaforo: Semaforo = ciclo <= 15 ? 'positivo' : ciclo <= 45 ? 'neutral' : 'negativo'
      let mensaje = `Necesitás $${Math.round(capital_trabajo).toLocaleString('es-AR')} de capital de trabajo para operar sin interrupciones con un ciclo de ${ciclo} días. `
      if (ciclo <= 15) {
        mensaje += `Ciclo corto — el capital necesario es manejable y el negocio tiene buena fluidez. Mantené esa agilidad de cobro.`
      } else if (ciclo <= 45) {
        mensaje += `Ciclo moderado. Asegurate de tener ese capital disponible o una línea de crédito que lo cubra. Reducir el ciclo 10 días libera $${Math.round(egresos_diarios * 10).toLocaleString('es-AR')} de capital.`
      } else {
        mensaje += `Ciclo largo — inmovilizás una cantidad significativa de capital. Prioridad: acortar plazos de cobro, cobrar anticipos o usar financiamiento de proveedores.`
      }
      return { semaforo, mensaje }
    },
  },
  {
    id: 'F19',
    nombre: 'Precio con Ajuste por Inflación',
    bloque: 'Finanzas',
    que_es: 'Cuánto deberías cobrar hoy para mantener el mismo margen real. En contextos de inflación, no actualizar el precio es descapitalizarse en silencio.',
    formula: 'Precio ajustado = Precio actual × (1 + inflación mensual / 100) ^ meses',
    ejemplo: {
      contexto: 'Servicio con inflación del 3% mensual',
      datos: 'Precio actual: $50.000 · Inflación: 3% mensual · Período: 6 meses',
      resultado: 'Precio ajustado: $59.940 — sin actualizar, tu precio perdió el 16% de su valor real.',
    },
    inputs: [
      { id: 'precio_actual', label: 'Precio o costo actual', placeholder: '50000', tipo: 'moneda' },
      { id: 'inflacion_mensual', label: 'Inflación mensual estimada', placeholder: '3', tipo: 'porcentaje' },
      { id: 'meses', label: 'Meses a proyectar', placeholder: '6', tipo: 'numero' },
    ],
    calcular: (inputs) => {
      const precio_ajustado = inputs.precio_actual * Math.pow(1 + inputs.inflacion_mensual / 100, inputs.meses)
      const diferencia = precio_ajustado - inputs.precio_actual
      const perdida_pct = (diferencia / inputs.precio_actual) * 100
      return { precio_ajustado, diferencia, perdida_pct }
    },
    interpretar: (resultado, inputs) => {
      const { precio_ajustado, perdida_pct } = resultado
      const meses = inputs.meses
      const semaforo: Semaforo = perdida_pct < 10 ? 'positivo' : perdida_pct < 25 ? 'neutral' : 'negativo'
      let mensaje = `Con ${inputs.inflacion_mensual}% mensual, en ${meses} mes${meses !== 1 ? 'es' : ''} el precio debería ser $${Math.round(precio_ajustado).toLocaleString('es-AR')} para mantener el mismo valor real. `
      if (perdida_pct < 10) {
        mensaje += `El ajuste necesario es menor al 10% — una suba moderada que el mercado suele absorber sin resistencia.`
      } else if (perdida_pct < 25) {
        mensaje += `Sin actualizar el precio en este período, tu margen real cae un ${perdida_pct.toFixed(1)}%. Planificá la suba por etapas para no perder poder adquisitivo.`
      } else {
        mensaje += `Impacto alto: sin actualización, perdés el ${perdida_pct.toFixed(1)}% del valor real de tu precio. Necesitás actualizar de forma regular — esperar acumula un ajuste difícil de comunicar al cliente.`
      }
      return { semaforo, mensaje }
    },
  },
  {
    id: 'F20',
    nombre: 'Rentabilidad por Producto',
    bloque: 'Finanzas',
    que_es: 'Cuál es el margen ponderado real de tu negocio cuando vendés varios productos. Identificá cuáles te convienen más y cómo mejorar el mix para maximizar la rentabilidad.',
    formula: 'Margen ponderado = Σ (Margen_i × Ventas_i) / Ventas totales',
    ejemplo: {
      contexto: 'Negocio con 3 productos',
      datos: 'Prod. A: margen 60%, ventas $500K · Prod. B: margen 30%, ventas $800K · Prod. C: margen 15%, ventas $200K',
      resultado: 'Margen ponderado: 37,2% — el Producto B baja el promedio; aumentar el mix de A mejoraría la rentabilidad.',
    },
    inputs: [
      { id: 'margen_1', label: 'Margen bruto — Producto 1', placeholder: '60', tipo: 'porcentaje' },
      { id: 'ventas_1', label: 'Ventas mensuales — Producto 1', placeholder: '500000', tipo: 'moneda' },
      { id: 'margen_2', label: 'Margen bruto — Producto 2', placeholder: '30', tipo: 'porcentaje' },
      { id: 'ventas_2', label: 'Ventas mensuales — Producto 2', placeholder: '800000', tipo: 'moneda' },
      { id: 'margen_3', label: 'Margen bruto — Producto 3 (opcional)', placeholder: '15', tipo: 'porcentaje', requerido: false },
      { id: 'ventas_3', label: 'Ventas mensuales — Producto 3 (opcional)', placeholder: '200000', tipo: 'moneda', requerido: false },
      { id: 'margen_4', label: 'Margen bruto — Producto 4 (opcional)', placeholder: '45', tipo: 'porcentaje', requerido: false },
      { id: 'ventas_4', label: 'Ventas mensuales — Producto 4 (opcional)', placeholder: '300000', tipo: 'moneda', requerido: false },
    ],
    calcular: (inputs) => {
      const productos = [
        { margen: inputs.margen_1, ventas: inputs.ventas_1 },
        { margen: inputs.margen_2, ventas: inputs.ventas_2 },
        { margen: inputs.margen_3, ventas: inputs.ventas_3 },
        { margen: inputs.margen_4, ventas: inputs.ventas_4 },
      ].filter((p) => p.ventas > 0)
      const ventas_total = productos.reduce((acc, p) => acc + p.ventas, 0)
      const margen_ponderado = productos.reduce((acc, p) => acc + (p.margen * p.ventas) / ventas_total, 0)
      const utilidad_total = productos.reduce((acc, p) => acc + p.ventas * (p.margen / 100), 0)
      const mejor_margen = Math.max(...productos.map((p) => p.margen))
      return { margen_ponderado, ventas_total, utilidad_total, mejor_margen }
    },
    interpretar: (resultado) => {
      const { margen_ponderado, ventas_total, utilidad_total, mejor_margen } = resultado
      const semaforo: Semaforo = margen_ponderado >= 40 ? 'positivo' : margen_ponderado >= 20 ? 'neutral' : 'negativo'
      const diferencia = mejor_margen - margen_ponderado
      let mensaje = `Margen ponderado: ${margen_ponderado.toFixed(1)}% sobre $${Math.round(ventas_total).toLocaleString('es-AR')} en ventas. Utilidad bruta estimada: $${Math.round(utilidad_total).toLocaleString('es-AR')}. `
      if (diferencia > 15) {
        mensaje += `Hay ${diferencia.toFixed(1)} puntos de diferencia entre tu mejor y peor producto. Mover el mix hacia los productos de mayor margen — sin bajar ventas totales — puede impactar fuertemente la rentabilidad.`
      } else if (margen_ponderado >= 40) {
        mensaje += `Margen ponderado sólido. El mix actual es saludable.`
      } else if (margen_ponderado >= 20) {
        mensaje += `Margen moderado. Revisá si podés mejorar los márgenes de los productos más pesados en ventas o aumentar el mix de los más rentables.`
      } else {
        mensaje += `Margen bajo. Con menos del 20% en promedio, cualquier aumento de costos o descuento impacta de forma crítica. Priorizá subir márgenes antes de volumen.`
      }
      return { semaforo, mensaje }
    },
  },
]

// ============================================================
// BLOQUE VENTAS (V1–V11) — funcional
// Datos exactos de Formulas_Emprendedor_mktventas.md
// ============================================================
const VENTAS: Calculadora[] = [
  {
    id: 'V1',
    nombre: 'Ticket Promedio',
    bloque: 'Ventas',
    que_es:
      'El promedio que gasta cada cliente en cada compra. Subirlo es la forma más rentable de crecer: misma estructura, mismos clientes, pero vendés más por transacción.',
    formula: 'Ticket promedio = Ventas totales del período ÷ N° de transacciones',
    ejemplo: {
      contexto: 'Negocio con 300 transacciones en el mes',
      datos: 'Ventas del mes: $9.000.000 · Transacciones: 300',
      resultado:
        'Ticket promedio = $30.000 → Si lo subís 10% (a $33.000) con MB 55%: +$495.000 de utilidad sin gastar más.',
    },
    inputs: [
      { id: 'ventas', label: 'Ventas totales del período', placeholder: '9000000', tipo: 'moneda' },
      { id: 'transacciones', label: 'Número de transacciones', placeholder: '300', tipo: 'numero' },
      { id: 'mb_pct', label: 'Margen bruto (%) — opcional, para ver impacto', placeholder: '55', tipo: 'porcentaje', requerido: false },
    ],
    calcular: (inputs) => {
      const ticket = inputs.ventas / inputs.transacciones
      const util_adicional = inputs.mb_pct
        ? ticket * 0.1 * inputs.transacciones * (inputs.mb_pct / 100)
        : null
      return { ticket, util_adicional }
    },
    interpretar: (resultado) => {
      const { ticket, util_adicional } = resultado
      const semaforo: Semaforo = 'neutral'
      let mensaje = `Tu ticket promedio es $${ticket.toLocaleString('es-AR', { maximumFractionDigits: 0 })}. `
      if (util_adicional)
        mensaje += `Si lográs subirlo un 10% sin cambiar nada más, sumás $${util_adicional.toLocaleString('es-AR', { maximumFractionDigits: 0 })} de utilidad al mes. Es el crecimiento más barato que existe.`
      else
        mensaje += `Trabajá en subirlo con upsells, combos o reordenando precios: cada peso extra de ticket cae casi directo a la utilidad.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'V2',
    nombre: 'Tasa de Cierre',
    bloque: 'Ventas',
    que_es:
      'De cada 10 personas que consultan o entran, cuántas te compran. Mide la efectividad del proceso de venta.',
    formula:
      'Tasa de cierre = (N° de ventas ÷ N° de prospectos) × 100\nProspectos necesarios = Clientes objetivo ÷ Tasa de cierre',
    ejemplo: {
      contexto: 'Negocio físico — benchmark de mercado: 20-30%',
      datos: '100 personas consultaron · 35 compraron',
      resultado: 'Tasa de cierre = 35% → por encima del promedio. Para 50 ventas necesitarías 143 prospectos.',
    },
    inputs: [
      { id: 'prospectos', label: 'Prospectos / consultas del período', placeholder: '100', tipo: 'numero' },
      { id: 'ventas', label: 'Ventas cerradas', placeholder: '35', tipo: 'numero' },
      { id: 'clientes_objetivo', label: 'Clientes objetivo (opcional, para calcular prospectos)', placeholder: '50', tipo: 'numero', requerido: false },
    ],
    calcular: (inputs) => {
      const tasa = (inputs.ventas / inputs.prospectos) * 100
      const prospectos_necesarios = inputs.clientes_objetivo
        ? Math.ceil(inputs.clientes_objetivo / (tasa / 100))
        : null
      return { tasa, prospectos_necesarios }
    },
    interpretar: (resultado) => {
      const { tasa, prospectos_necesarios } = resultado
      const semaforo: Semaforo = tasa >= 30 ? 'positivo' : tasa >= 20 ? 'neutral' : 'negativo'
      let mensaje = `Tu tasa de cierre es del ${tasa.toFixed(1)}%. `
      mensaje +=
        tasa >= 30
          ? `Estás por encima del promedio de mercado (20-30%). Tu proceso de venta funciona bien.`
          : tasa >= 20
            ? `Estás dentro del promedio de mercado (20-30%). Hay espacio para mejorar el proceso de venta.`
            : `Estás por debajo del promedio (20-30%). El problema no es la cantidad de prospectos sino cómo se cierran. Revisá el proceso de venta.`
      if (prospectos_necesarios)
        mensaje += ` Para tu objetivo, necesitás ${prospectos_necesarios.toLocaleString('es-AR')} prospectos.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'V3',
    nombre: 'Frecuencia de Compra y Tasa de Recompra',
    bloque: 'Ventas',
    que_es:
      'Cuántas veces te compra un cliente por período y qué porcentaje vuelve. Que los actuales vuelvan cuesta mucho menos que conseguir nuevos.',
    formula:
      'Frecuencia = N° transacciones ÷ N° clientes únicos\nTasa de recompra = (Clientes que volvieron ÷ Total clientes) × 100',
    ejemplo: {
      contexto: '300 transacciones · 200 clientes únicos',
      datos: '45 clientes volvieron a comprar',
      resultado: 'Frecuencia = 1,5 visitas/cliente · Recompra = 22,5%',
    },
    inputs: [
      { id: 'transacciones', label: 'Número de transacciones', placeholder: '300', tipo: 'numero' },
      { id: 'clientes_unicos', label: 'Clientes únicos', placeholder: '200', tipo: 'numero' },
      { id: 'clientes_volvieron', label: 'Clientes que volvieron a comprar', placeholder: '45', tipo: 'numero' },
    ],
    calcular: (inputs) => {
      const frecuencia = inputs.transacciones / inputs.clientes_unicos
      const recompra = (inputs.clientes_volvieron / inputs.clientes_unicos) * 100
      return { frecuencia, recompra }
    },
    interpretar: (resultado) => {
      const { frecuencia, recompra } = resultado
      const semaforo: Semaforo = recompra >= 35 ? 'positivo' : recompra >= 20 ? 'neutral' : 'negativo'
      const mensaje = `Cada cliente te compra ${frecuencia.toFixed(1)} veces por período y tu tasa de recompra es del ${recompra.toFixed(1)}%. Subir la recompra (con seguimiento, fidelización o recordatorios) hace crecer la facturación sin conseguir un solo cliente nuevo — es el crecimiento de menor costo posible.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'V4',
    nombre: 'LTV — Valor del Cliente en el Tiempo',
    bloque: 'Ventas',
    que_es:
      'Cuánto vale un cliente durante toda su relación con el negocio. Fundamental para saber cuánto podés invertir en conseguir uno nuevo.',
    formula: 'LTV = Ticket promedio × Frecuencia de compra mensual × Meses de vida del cliente',
    ejemplo: {
      contexto: 'Cliente promedio del negocio',
      datos: 'Ticket: $30.000 · Frecuencia: 2/mes · Vida: 8 meses',
      resultado: 'LTV = $480.000 → Si gastás $5.000 en conseguirlo (CAC), es un negocio extraordinario.',
    },
    inputs: [
      { id: 'ticket', label: 'Ticket promedio', placeholder: '30000', tipo: 'moneda' },
      { id: 'frecuencia_mensual', label: 'Frecuencia de compra mensual', placeholder: '2', tipo: 'decimal' },
      { id: 'meses_vida', label: 'Meses de vida del cliente', placeholder: '8', tipo: 'numero' },
    ],
    calcular: (inputs) => {
      const ltv = inputs.ticket * inputs.frecuencia_mensual * inputs.meses_vida
      return { ltv }
    },
    interpretar: (resultado) => {
      const { ltv } = resultado
      const semaforo: Semaforo = 'neutral'
      const mensaje = `Cada cliente vale $${ltv.toLocaleString('es-AR', { maximumFractionDigits: 0 })} a lo largo de su relación con tu negocio. Ese número define cuánto podés gastar en marketing para conseguir uno nuevo (tu CAC): mientras el costo de adquisición esté muy por debajo de este valor, invertir en publicidad es rentable.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'V5',
    nombre: 'Proyección de Ventas',
    bloque: 'Ventas',
    que_es:
      'Cálculo anticipado de la facturación del mes, separando clientes nuevos y recompra. Reemplaza el "a ver cómo nos va" por un número concreto.',
    formula:
      'Ventas proyectadas =\n  (Prospectos × Tasa de cierre × Ticket)   ← nuevos\n+ (Clientes que recompran × Ticket)       ← recompra',
    ejemplo: {
      contexto: 'Proyección basada en planilla real',
      datos: '251 prospectos · 40% cierre · $65.000 ticket · 45 recompra',
      resultado: 'Nuevos: $6.526.000 + Recompra: $2.925.000 = $9.451.000 proyectados',
    },
    inputs: [
      { id: 'prospectos', label: 'Prospectos del mes', placeholder: '251', tipo: 'numero' },
      { id: 'tasa_cierre', label: 'Tasa de cierre (%)', placeholder: '40', tipo: 'porcentaje' },
      { id: 'ticket', label: 'Ticket promedio', placeholder: '65000', tipo: 'moneda' },
      { id: 'clientes_recompra', label: 'Clientes que recompran este mes', placeholder: '45', tipo: 'numero' },
    ],
    calcular: (inputs) => {
      const ventas_nuevos = inputs.prospectos * (inputs.tasa_cierre / 100) * inputs.ticket
      const ventas_recompra = inputs.clientes_recompra * inputs.ticket
      const total = ventas_nuevos + ventas_recompra
      return { ventas_nuevos, ventas_recompra, total }
    },
    interpretar: (resultado) => {
      const { ventas_nuevos, ventas_recompra, total } = resultado
      const semaforo: Semaforo = 'neutral'
      const mensaje = `Vas a facturar aproximadamente $${total.toLocaleString('es-AR', { maximumFractionDigits: 0 })} este mes: $${ventas_nuevos.toLocaleString('es-AR', { maximumFractionDigits: 0 })} de clientes nuevos y $${ventas_recompra.toLocaleString('es-AR', { maximumFractionDigits: 0 })} de recompra. Si no llegás a tu meta (Punto Óptimo), sabés que hay que subir prospectos, mejorar la tasa de cierre o aumentar el ticket.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'V6',
    nombre: 'Impacto de Subir el Ticket Promedio',
    bloque: 'Ventas',
    que_es:
      'Cuánta utilidad adicional genera un aumento en el ticket promedio, sin cambiar estructura ni volumen.',
    formula: 'Impacto en utilidad = (Ticket nuevo − Ticket actual) × N° transacciones × MB%',
    ejemplo: {
      contexto: 'Subida de ticket de $30.000 a $33.000',
      datos: 'Transacciones: 300 · MB: 55%',
      resultado: 'Impacto = $3.000 × 300 × 0,55 = $495.000 más de utilidad/mes (no de ventas, de utilidad).',
    },
    inputs: [
      { id: 'ticket_actual', label: 'Ticket promedio actual', placeholder: '30000', tipo: 'moneda' },
      { id: 'ticket_nuevo', label: 'Ticket promedio nuevo', placeholder: '33000', tipo: 'moneda' },
      { id: 'transacciones', label: 'Número de transacciones', placeholder: '300', tipo: 'numero' },
      { id: 'mb_pct', label: 'Margen bruto (%)', placeholder: '55', tipo: 'porcentaje' },
    ],
    calcular: (inputs) => {
      const impacto = (inputs.ticket_nuevo - inputs.ticket_actual) * inputs.transacciones * (inputs.mb_pct / 100)
      return { impacto }
    },
    interpretar: (resultado) => {
      const { impacto } = resultado
      const semaforo: Semaforo = impacto > 0 ? 'positivo' : impacto === 0 ? 'neutral' : 'negativo'
      const mensaje =
        impacto >= 0
          ? `Esa subida de ticket genera $${impacto.toLocaleString('es-AR', { maximumFractionDigits: 0 })} adicionales de utilidad neta al mes, sin un solo cliente nuevo y sin tocar tu estructura de costos. Es puro apalancamiento.`
          : `Estás bajando el ticket: perderías $${Math.abs(impacto).toLocaleString('es-AR', { maximumFractionDigits: 0 })} de utilidad al mes. Revisá si el mayor volumen lo compensa.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'V7',
    nombre: '¿Cuánto Vender para Duplicar la Utilidad?',
    bloque: 'Ventas',
    que_es:
      'Generalmente hay que vender bastante menos de lo que uno imagina para duplicar la ganancia, porque los costos fijos ya están cubiertos.',
    formula:
      'Ventas para duplicar = (GF + Utilidad actual × 2) ÷ MB%\nCrecimiento necesario = Ventas meta − Ventas actuales',
    ejemplo: {
      contexto: 'Negocio con buen margen',
      datos: 'GF: $3.500.000 · Utilidad actual: $1.700.000 · MB: 55% · Ventas: $9.000.000',
      resultado: 'Ventas necesarias = $12.545.455 → crecer $3.545.455 (39%) para duplicar la ganancia.',
    },
    inputs: [
      { id: 'gastos_fijos', label: 'Gastos fijos mensuales', placeholder: '3500000', tipo: 'moneda' },
      { id: 'utilidad_actual', label: 'Utilidad neta actual', placeholder: '1700000', tipo: 'moneda' },
      { id: 'mb_pct', label: 'Margen bruto (%)', placeholder: '55', tipo: 'porcentaje' },
      { id: 'ventas_actuales', label: 'Ventas actuales del mes', placeholder: '9000000', tipo: 'moneda' },
    ],
    calcular: (inputs) => {
      const ventas_meta = (inputs.gastos_fijos + inputs.utilidad_actual * 2) / (inputs.mb_pct / 100)
      const crecimiento = ventas_meta - inputs.ventas_actuales
      const crecimiento_pct = (crecimiento / inputs.ventas_actuales) * 100
      return { ventas_meta, crecimiento, crecimiento_pct }
    },
    interpretar: (resultado) => {
      const { ventas_meta, crecimiento, crecimiento_pct } = resultado
      const semaforo: Semaforo = 'neutral'
      const mensaje = `Para duplicar tu utilidad necesitás vender $${ventas_meta.toLocaleString('es-AR', { maximumFractionDigits: 0 })} al mes, es decir crecer $${crecimiento.toLocaleString('es-AR', { maximumFractionDigits: 0 })} (${crecimiento_pct.toFixed(1)}%). Como los costos fijos ya están cubiertos, todo lo que vendés por encima del punto de equilibrio cae casi directo a ganancia: por eso suele costar menos de lo que parece.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'V8',
    nombre: 'Eficiencia del Descuento',
    bloque: 'Ventas',
    que_es:
      'Antes de hacer un descuento, calculás cuántas unidades más necesitás vender para mantener la misma utilidad. Los descuentos sobre bajo margen destruyen rentabilidad.',
    formula: 'Unidades necesarias = Utilidad actual ÷ CM unitaria con descuento',
    ejemplo: {
      contexto: 'Producto con CM de $2.100 y 100 unidades',
      datos: 'Precio: $3.500 · CV: $1.400 · Descuento: 20% → nuevo precio $2.800, nueva CM $1.400',
      resultado: 'Necesitás 150 unidades (+50%) solo para mantener la misma utilidad.',
    },
    inputs: [
      { id: 'precio_actual', label: 'Precio actual', placeholder: '3500', tipo: 'moneda' },
      { id: 'costo_variable', label: 'Costo variable por unidad', placeholder: '1400', tipo: 'moneda' },
      { id: 'unidades_actuales', label: 'Unidades que vendés hoy', placeholder: '100', tipo: 'numero' },
      { id: 'descuento_pct', label: 'Descuento a aplicar (%)', placeholder: '20', tipo: 'porcentaje' },
    ],
    calcular: (inputs) => {
      const cm_actual = inputs.precio_actual - inputs.costo_variable
      const utilidad_actual = cm_actual * inputs.unidades_actuales
      const precio_desc = inputs.precio_actual * (1 - inputs.descuento_pct / 100)
      const cm_desc = precio_desc - inputs.costo_variable
      const unidades_necesarias = cm_desc > 0 ? utilidad_actual / cm_desc : null
      const incremento_pct =
        unidades_necesarias !== null
          ? ((unidades_necesarias - inputs.unidades_actuales) / inputs.unidades_actuales) * 100
          : null
      return { cm_desc, unidades_necesarias, incremento_pct }
    },
    interpretar: (resultado) => {
      const { cm_desc, unidades_necesarias, incremento_pct } = resultado
      if (cm_desc <= 0 || unidades_necesarias === null) {
        return {
          semaforo: 'negativo',
          mensaje: `Con ese descuento el precio queda por debajo (o igual) al costo variable: cada venta pierde dinero. El descuento es inviable, no importa cuánto volumen sumes.`,
        }
      }
      const semaforo: Semaforo = incremento_pct <= 25 ? 'positivo' : incremento_pct <= 60 ? 'neutral' : 'negativo'
      const mensaje = `Con ese descuento necesitás vender ${Math.ceil(unidades_necesarias).toLocaleString('es-AR')} unidades (un ${incremento_pct.toFixed(1)}% más) solo para mantener la misma utilidad. ${
        incremento_pct <= 25
          ? 'Es un esfuerzo razonable si la promo realmente atrae demanda.'
          : incremento_pct <= 60
            ? '¿Tu promo realmente va a generar ese volumen adicional? Pensalo antes.'
            : 'Es muchísimo volumen extra: este descuento probablemente destruye rentabilidad.'
      }`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'V9',
    nombre: 'Upsell — Impacto por Categoría',
    bloque: 'Ventas',
    que_es:
      'Vender un producto de mayor valor al cliente que ya está comprando. El apalancamiento más eficiente: mismo cliente, misma visita, mayor contribución marginal.',
    formula: 'Ganancia adicional = (CM premium − CM base) × Clientes con upsell',
    ejemplo: {
      contexto: '300 transacciones, 20% hacen upsell (60 clientes)',
      datos: 'CM base: $2.100 · CM premium: $3.800',
      resultado: 'Ganancia = ($3.800 − $2.100) × 60 = $102.000 adicionales, sin un solo cliente nuevo.',
    },
    inputs: [
      { id: 'cm_base', label: 'Contribución marginal producto base', placeholder: '2100', tipo: 'moneda' },
      { id: 'cm_premium', label: 'Contribución marginal producto premium', placeholder: '3800', tipo: 'moneda' },
      { id: 'transacciones', label: 'Número de transacciones', placeholder: '300', tipo: 'numero' },
      { id: 'tasa_upsell', label: 'Clientes que hacen upsell (%)', placeholder: '20', tipo: 'porcentaje' },
    ],
    calcular: (inputs) => {
      const clientes_upsell = inputs.transacciones * (inputs.tasa_upsell / 100)
      const ganancia = (inputs.cm_premium - inputs.cm_base) * clientes_upsell
      return { clientes_upsell, ganancia }
    },
    interpretar: (resultado) => {
      const { clientes_upsell, ganancia } = resultado
      const semaforo: Semaforo = ganancia > 0 ? 'positivo' : 'neutral'
      const mensaje = `Si ${Math.round(clientes_upsell).toLocaleString('es-AR')} clientes suben al producto premium, sumás $${ganancia.toLocaleString('es-AR', { maximumFractionDigits: 0 })} de utilidad adicional — sin publicidad y sin un solo cliente nuevo. Posicioná los productos de mayor margen a la vista y entrená al equipo para sugerir el upgrade.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'V10',
    nombre: 'Meta Diaria de Ventas',
    bloque: 'Ventas',
    que_es:
      'Convierte el objetivo mensual (Punto Óptimo) en un número operativo diario que el equipo puede ejecutar y medir cada día.',
    formula:
      'Meta diaria = PO ÷ Días de apertura\nMeta semanal = PO ÷ 4\nMeta por turno = Meta diaria ÷ N° de turnos',
    ejemplo: {
      contexto: 'Punto Óptimo mensual de $9.090.909',
      datos: 'Días de apertura: 26',
      resultado: 'Meta diaria = $349.650/día · Meta semanal = $2.272.727/semana',
    },
    inputs: [
      { id: 'po', label: 'Punto Óptimo mensual (meta de ventas)', placeholder: '9090909', tipo: 'moneda' },
      { id: 'dias_apertura', label: 'Días de apertura al mes', placeholder: '26', tipo: 'numero' },
      { id: 'turnos', label: 'Turnos por día (opcional)', placeholder: '2', tipo: 'numero', requerido: false },
    ],
    calcular: (inputs) => {
      const meta_diaria = inputs.po / inputs.dias_apertura
      const meta_semanal = inputs.po / 4
      const meta_turno = inputs.turnos ? meta_diaria / inputs.turnos : null
      return { meta_diaria, meta_semanal, meta_turno }
    },
    interpretar: (resultado) => {
      const { meta_diaria, meta_semanal, meta_turno } = resultado
      const semaforo: Semaforo = 'neutral'
      let mensaje = `Tu equipo tiene que vender $${meta_diaria.toLocaleString('es-AR', { maximumFractionDigits: 0 })} por día ($${meta_semanal.toLocaleString('es-AR', { maximumFractionDigits: 0 })} por semana) para llegar a la meta del mes. `
      if (meta_turno)
        mensaje += `Eso es $${meta_turno.toLocaleString('es-AR', { maximumFractionDigits: 0 })} por turno. `
      mensaje += `Ese es el número que el encargado comunica cada mañana: convierte la estrategia en operación diaria concreta.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'V11',
    nombre: 'Costo Mensual del Churn',
    bloque: 'Ventas',
    que_es: 'Cuánto pierde el negocio cada mes por los clientes que se van. Retener es casi siempre más barato que adquirir — este número te ayuda a justificar la inversión en fidelización.',
    formula: 'Ingreso perdido mensual = Clientes activos × (Churn% / 100) × Ticket mensual',
    ejemplo: {
      contexto: 'Servicio de membresía',
      datos: 'Clientes activos: 200 · Churn: 5% mensual · Ticket mensual: $8.000',
      resultado: 'Perdés 10 clientes y $80.000 por mes. En un año: $960.000 si no mejorás la retención.',
    },
    inputs: [
      { id: 'clientes_activos', label: 'Clientes activos hoy', placeholder: '200', tipo: 'numero' },
      { id: 'ticket_mensual', label: 'Facturación mensual por cliente', placeholder: '8000', tipo: 'moneda' },
      { id: 'churn_pct', label: 'Churn mensual (% que se van)', placeholder: '5', tipo: 'porcentaje' },
    ],
    calcular: (inputs) => {
      const clientes_perdidos = inputs.clientes_activos * (inputs.churn_pct / 100)
      const ingreso_perdido_mes = clientes_perdidos * inputs.ticket_mensual
      const ingreso_perdido_anual = ingreso_perdido_mes * 12
      return { clientes_perdidos, ingreso_perdido_mes, ingreso_perdido_anual }
    },
    interpretar: (resultado, inputs) => {
      const { clientes_perdidos, ingreso_perdido_mes, ingreso_perdido_anual } = resultado
      const churn = inputs.churn_pct
      const fmt = (n: number) => '$' + Math.round(n).toLocaleString('es-AR')
      const semaforo: Semaforo = churn <= 2 ? 'positivo' : churn <= 5 ? 'neutral' : 'negativo'
      let mensaje = `Con un churn del ${churn}%, perdés ${Math.round(clientes_perdidos)} clientes y ${fmt(ingreso_perdido_mes)} por mes. Proyectado a 12 meses: ${fmt(ingreso_perdido_anual)} si no cambia nada. `
      if (churn <= 2) {
        mensaje += `Churn bajo — estás reteniendo bien. Seguí midiendo y actuando ante las primeras señales de abandono.`
      } else if (churn <= 5) {
        mensaje += `Churn moderado. Reducirlo al 2% cambiaría radicalmente la proyección anual. Investigá por qué se van y trabajá en un proceso de retención activa.`
      } else {
        mensaje += `Churn alto. Con más del 5% mensual, la base se erosiona rápido. Es urgente entender el motivo de abandono y crear un plan de retención — es la inversión con mejor retorno que podés hacer ahora.`
      }
      return { semaforo, mensaje }
    },
  },
]

// ============================================================
// BLOQUE MARKETING (M1–M9) — funcional
// Datos exactos de Formulas_Emprendedor_mktventas.md
// ============================================================
const MARKETING: Calculadora[] = [
  {
    id: 'M1',
    nombre: 'CAC — Costo de Adquisición de Cliente',
    bloque: 'Marketing',
    que_es:
      'Cuánto gastás para conseguir cada cliente nuevo. Calcularlo por canal es clave: un mismo presupuesto puede tener CAC muy distintos.',
    formula: 'CAC = Inversión total en marketing ÷ N° de clientes nuevos obtenidos',
    ejemplo: {
      contexto: 'Campaña del mes',
      datos: 'Inversión: $300.000 · Clientes nuevos: 60',
      resultado: 'CAC = $5.000 por cliente. Si el LTV es $480.000 → ratio 96x → podés invertir mucho más.',
    },
    inputs: [
      { id: 'inversion', label: 'Inversión total en marketing', placeholder: '300000', tipo: 'moneda' },
      { id: 'clientes_nuevos', label: 'Clientes nuevos obtenidos', placeholder: '60', tipo: 'numero' },
      { id: 'ltv', label: 'LTV del cliente (opcional, para evaluar)', placeholder: '480000', tipo: 'moneda', requerido: false },
    ],
    calcular: (inputs) => {
      const cac = inputs.inversion / inputs.clientes_nuevos
      const ratio = inputs.ltv ? inputs.ltv / cac : null
      return { cac, ratio }
    },
    interpretar: (resultado) => {
      const { cac, ratio } = resultado
      let semaforo: Semaforo = 'neutral'
      let mensaje = `Te cuesta $${cac.toLocaleString('es-AR', { maximumFractionDigits: 0 })} conseguir cada cliente nuevo. `
      if (ratio) {
        semaforo = ratio >= 3 ? 'positivo' : ratio >= 2 ? 'neutral' : 'negativo'
        mensaje += `Comparado con el LTV, da un ratio de ${ratio.toFixed(1)}x. ${
          ratio >= 3
            ? 'Modelo saludable: tenés margen para escalar la inversión.'
            : ratio >= 2
              ? 'Aceptable, pero conviene bajar el CAC o subir el LTV.'
              : 'El CAC es alto en relación a lo que vale el cliente: revisá canales y conversión.'
        }`
      } else {
        mensaje += `Para saber si es caro o barato, comparalo con el LTV (lo que vale un cliente en el tiempo).`
      }
      return { semaforo, mensaje }
    },
  },
  {
    id: 'M2',
    nombre: 'CAC Permitido — Techo de Inversión',
    bloque: 'Marketing',
    que_es:
      'El máximo que podés gastar por conseguir un cliente nuevo y aún ganar dinero. Define el límite de tu inversión en publicidad.',
    formula: 'CAC permitido ≈ LTV × MB%',
    ejemplo: {
      contexto: 'Cliente con LTV de $480.000',
      datos: 'LTV: $480.000 · MB: 55%',
      resultado: 'CAC permitido ≈ $264.000. Si tu CAC actual es $5.000, usás solo el 1,9% del techo.',
    },
    inputs: [
      { id: 'ltv', label: 'LTV del cliente', placeholder: '480000', tipo: 'moneda' },
      { id: 'mb_pct', label: 'Margen bruto (%)', placeholder: '55', tipo: 'porcentaje' },
      { id: 'cac_actual', label: 'Tu CAC actual (opcional)', placeholder: '5000', tipo: 'moneda', requerido: false },
    ],
    calcular: (inputs) => {
      const cac_permitido = inputs.ltv * (inputs.mb_pct / 100)
      const uso_pct = inputs.cac_actual ? (inputs.cac_actual / cac_permitido) * 100 : null
      return { cac_permitido, uso_pct }
    },
    interpretar: (resultado) => {
      const { cac_permitido, uso_pct } = resultado
      let semaforo: Semaforo = 'neutral'
      let mensaje = `Podés gastar hasta $${cac_permitido.toLocaleString('es-AR', { maximumFractionDigits: 0 })} por cliente nuevo y aún ganar dinero. `
      if (uso_pct !== null) {
        semaforo = uso_pct <= 70 ? 'positivo' : uso_pct <= 100 ? 'neutral' : 'negativo'
        mensaje +=
          uso_pct <= 100
            ? `Hoy estás usando el ${uso_pct.toFixed(1)}% de ese techo: tenés margen para aumentar la inversión publicitaria de forma rentable.`
            : `Tu CAC actual ya superó el techo (${uso_pct.toFixed(1)}%): estás perdiendo dinero por cada cliente nuevo. Bajá el costo de adquisición o subí el LTV.`
      } else {
        mensaje += `Todo lo que esté por debajo de ese número es inversión rentable.`
      }
      return { semaforo, mensaje }
    },
  },
  {
    id: 'M3',
    nombre: 'ROAS — Retorno Sobre Inversión Publicitaria',
    bloque: 'Marketing',
    que_es:
      'Por cada $1 invertido en publicidad, cuántos $ de ventas generás. El mínimo para ser rentable depende de tu margen bruto.',
    formula: 'ROAS = Ingresos por publicidad ÷ Inversión\nROAS mínimo rentable = 1 ÷ MB%',
    ejemplo: {
      contexto: 'Campaña con MB del 55%',
      datos: 'Inversión: $300.000 · Ventas atribuidas: $1.800.000',
      resultado: 'ROAS = 6x · ROAS mínimo = 1,82x → muy por encima del umbral, publicidad rentable.',
    },
    inputs: [
      { id: 'ingresos_pub', label: 'Ventas atribuidas a publicidad', placeholder: '1800000', tipo: 'moneda' },
      { id: 'inversion_pub', label: 'Inversión en publicidad', placeholder: '300000', tipo: 'moneda' },
      { id: 'mb_pct', label: 'Margen bruto (%)', placeholder: '55', tipo: 'porcentaje' },
    ],
    calcular: (inputs) => {
      const roas = inputs.ingresos_pub / inputs.inversion_pub
      const roas_min = 1 / (inputs.mb_pct / 100)
      return { roas, roas_min }
    },
    interpretar: (resultado) => {
      const { roas, roas_min } = resultado
      const semaforo: Semaforo = roas >= roas_min * 2 ? 'positivo' : roas >= roas_min ? 'neutral' : 'negativo'
      const mensaje = `Tu ROAS es ${roas.toFixed(1)}x y el mínimo para ser rentable con tu margen es ${roas_min.toFixed(2)}x. ${
        roas >= roas_min * 2
          ? 'Estás muy por encima del umbral: la publicidad es claramente rentable, hay espacio para escalar.'
          : roas >= roas_min
            ? 'Estás por encima del mínimo, pero con poco colchón. Optimizá antes de escalar.'
            : 'Estás por debajo del mínimo: estás perdiendo dinero en cada venta conseguida por ads.'
      }`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'M4',
    nombre: 'Costo por Etapa del Embudo',
    bloque: 'Marketing',
    que_es:
      'El embudo de ventas costeado: cuánto cuesta que una persona llegue, consulte y compre. Cada etapa tiene su costo y su palanca de mejora.',
    formula:
      'Costo por visita = Inversión ÷ Visitas\nCosto por consulta = Inversión ÷ Consultas\nCosto por venta = Inversión ÷ Ventas',
    ejemplo: {
      contexto: 'Campaña de $300.000',
      datos: 'Visitas: 500 · Consultas: 100 · Ventas: 35',
      resultado: 'CPV: $600 · Costo/consulta: $3.000 · Costo/venta: $8.571',
    },
    inputs: [
      { id: 'inversion', label: 'Inversión en publicidad', placeholder: '300000', tipo: 'moneda' },
      { id: 'visitas', label: 'Personas que llegaron al local', placeholder: '500', tipo: 'numero' },
      { id: 'consultas', label: 'Personas que consultaron', placeholder: '100', tipo: 'numero' },
      { id: 'ventas', label: 'Ventas cerradas', placeholder: '35', tipo: 'numero' },
    ],
    calcular: (inputs) => {
      const cpv = inputs.inversion / inputs.visitas
      const costo_consulta = inputs.inversion / inputs.consultas
      const cpventa = inputs.inversion / inputs.ventas
      return { cpv, costo_consulta, cpventa }
    },
    interpretar: (resultado) => {
      const { cpv, costo_consulta, cpventa } = resultado
      const semaforo: Semaforo = 'neutral'
      const mensaje = `Cada visita te cuesta $${cpv.toLocaleString('es-AR', { maximumFractionDigits: 0 })}, cada consulta $${costo_consulta.toLocaleString('es-AR', { maximumFractionDigits: 0 })} y cada venta $${cpventa.toLocaleString('es-AR', { maximumFractionDigits: 0 })}. Compará el costo por venta con tu ticket y tu margen para saber si la campaña es rentable, y mirá en qué etapa se cae más gente para enfocar la mejora ahí.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'M5',
    nombre: 'Rentabilidad por Canal de Marketing',
    bloque: 'Marketing',
    que_es:
      'Mide si cada canal de publicidad genera más de lo que cuesta. Si el canal es rentable, escalá. Si no, cortalo o rediseñalo.',
    formula: 'Rentabilidad del canal = CM total generada por el canal − Inversión en el canal',
    ejemplo: {
      contexto: 'Comparación de canales',
      datos: 'Instagram: $150.000, 30 clientes, CM/cliente $16.500\nVolantes: $80.000, 4 clientes, CM/cliente $16.500',
      resultado: 'Instagram: +$345.000 ✓ · Volantes: −$14.000 ✗ → volcá todo a Instagram.',
    },
    inputs: [
      { id: 'inversion_canal', label: 'Inversión en el canal', placeholder: '150000', tipo: 'moneda' },
      { id: 'clientes_canal', label: 'Clientes conseguidos por el canal', placeholder: '30', tipo: 'numero' },
      { id: 'cm_por_cliente', label: 'Contribución marginal por cliente', placeholder: '16500', tipo: 'moneda' },
    ],
    calcular: (inputs) => {
      const cm_total = inputs.clientes_canal * inputs.cm_por_cliente
      const rentabilidad = cm_total - inputs.inversion_canal
      const cac = inputs.inversion_canal / inputs.clientes_canal
      return { cm_total, rentabilidad, cac }
    },
    interpretar: (resultado) => {
      const { rentabilidad, cac } = resultado
      const semaforo: Semaforo = rentabilidad > 0 ? 'positivo' : 'negativo'
      const mensaje =
        rentabilidad > 0
          ? `Este canal genera $${rentabilidad.toLocaleString('es-AR', { maximumFractionDigits: 0 })} de ganancia neta (CAC de $${cac.toLocaleString('es-AR', { maximumFractionDigits: 0 })} por cliente). Es rentable: escalá la inversión acá.`
          : `Este canal pierde $${Math.abs(rentabilidad).toLocaleString('es-AR', { maximumFractionDigits: 0 })} (CAC de $${cac.toLocaleString('es-AR', { maximumFractionDigits: 0 })} por cliente). Cortalo o rediseñalo y volcá el presupuesto a los canales que sí rinden. No mires el CAC promedio de todos los canales juntos.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'M6',
    nombre: 'Presupuesto Máximo de Publicidad',
    bloque: 'Marketing',
    que_es:
      'Cuánto podés invertir en publicidad sin poner en riesgo la operación. La respuesta está en la diferencia entre tus ventas actuales y el PE.',
    formula:
      'Utilidad disponible = (Ventas actuales − PE) × MB%\nPresupuesto = 30-50% de esa utilidad disponible',
    ejemplo: {
      contexto: 'Negocio por encima de su PE',
      datos: 'Ventas: $9.000.000 · PE: $6.363.636 · MB: 55% · Reinversión: 40%',
      resultado: 'Utilidad disponible $1.450.000 → Presupuesto de ads = $580.000.',
    },
    inputs: [
      { id: 'ventas_actuales', label: 'Ventas actuales del mes', placeholder: '9000000', tipo: 'moneda' },
      { id: 'pe', label: 'Punto de Equilibrio', placeholder: '6363636', tipo: 'moneda' },
      { id: 'mb_pct', label: 'Margen bruto (%)', placeholder: '55', tipo: 'porcentaje' },
      { id: 'pct_reinversion', label: '% a reinvertir (30-50%, opcional)', placeholder: '40', tipo: 'porcentaje', requerido: false },
    ],
    calcular: (inputs) => {
      const pct = inputs.pct_reinversion || 40
      const utilidad_disponible = (inputs.ventas_actuales - inputs.pe) * (inputs.mb_pct / 100)
      const presupuesto = utilidad_disponible > 0 ? utilidad_disponible * (pct / 100) : 0
      return { utilidad_disponible, presupuesto }
    },
    interpretar: (resultado) => {
      const { utilidad_disponible, presupuesto } = resultado
      if (utilidad_disponible <= 0) {
        return {
          semaforo: 'negativo',
          mensaje: `Tus ventas todavía no superan el Punto de Equilibrio, así que no hay utilidad disponible para reinvertir en publicidad sin arriesgar la caja. Primero llegá al PE.`,
        }
      }
      const semaforo: Semaforo = 'positivo'
      const mensaje = `Tenés $${utilidad_disponible.toLocaleString('es-AR', { maximumFractionDigits: 0 })} de utilidad disponible por encima del PE. Podés destinar hasta $${presupuesto.toLocaleString('es-AR', { maximumFractionDigits: 0 })} a publicidad sin poner en riesgo la operación.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'M7',
    nombre: 'Tasa de Conversión por Etapa',
    bloque: 'Marketing',
    que_es:
      'Qué porcentaje de personas pasa de una etapa a la siguiente. Identificás el punto de mayor fuga y ahí enfocás la mejora.',
    formula: 'Conversión por etapa = (Salida de la etapa ÷ Entrada de la etapa) × 100',
    ejemplo: {
      contexto: 'Embudo de un negocio físico',
      datos: '500 visitas → 100 consultas · 100 consultas → 35 ventas',
      resultado: 'Visita→consulta: 20% (mayor fuga) · Consulta→venta: 35%.',
    },
    inputs: [
      { id: 'entrada', label: 'Personas que entran a la etapa', placeholder: '500', tipo: 'numero' },
      { id: 'salida', label: 'Personas que pasan a la siguiente etapa', placeholder: '100', tipo: 'numero' },
    ],
    calcular: (inputs) => {
      const conversion = (inputs.salida / inputs.entrada) * 100
      return { conversion }
    },
    interpretar: (resultado) => {
      const { conversion } = resultado
      const semaforo: Semaforo = conversion >= 30 ? 'positivo' : conversion >= 15 ? 'neutral' : 'negativo'
      const mensaje = `En esta etapa convertís el ${conversion.toFixed(1)}% de las personas. Si es tu punto de mayor fuga, es donde más impacto tiene mejorar: subir esta conversión genera más ventas sin gastar un peso más en publicidad ni cambiar el resto del embudo.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'M8',
    nombre: 'Predicción de Ventas por Inversión',
    bloque: 'Marketing',
    que_es:
      'Con tus datos históricos, calculás el resultado esperado antes de gastar. La publicidad deja de ser un gasto y se vuelve una ecuación predecible.',
    formula:
      'Ventas proyectadas = (Inversión ÷ Costo por venta) × Ticket\nCM esperada = Ventas × MB%\nGanancia = CM esperada − Inversión',
    ejemplo: {
      contexto: 'Inversión planificada de $500.000',
      datos: 'Costo por venta histórico: $8.571 · Ticket: $30.000 · MB: 55%',
      resultado: 'Ventas proyectadas $1.750.000 · CM $962.500 · Ganancia neta $462.500.',
    },
    inputs: [
      { id: 'inversion', label: 'Inversión a realizar', placeholder: '500000', tipo: 'moneda' },
      { id: 'cpventa', label: 'Costo por venta histórico', placeholder: '8571', tipo: 'moneda' },
      { id: 'ticket', label: 'Ticket promedio', placeholder: '30000', tipo: 'moneda' },
      { id: 'mb_pct', label: 'Margen bruto (%)', placeholder: '55', tipo: 'porcentaje' },
    ],
    calcular: (inputs) => {
      const ventas_proy = (inputs.inversion / inputs.cpventa) * inputs.ticket
      const cm_esperada = ventas_proy * (inputs.mb_pct / 100)
      const ganancia = cm_esperada - inputs.inversion
      return { ventas_proy, cm_esperada, ganancia }
    },
    interpretar: (resultado) => {
      const { ventas_proy, ganancia } = resultado
      const semaforo: Semaforo = ganancia > 0 ? 'positivo' : 'negativo'
      const mensaje =
        ganancia > 0
          ? `Con esa inversión deberías generar $${ventas_proy.toLocaleString('es-AR', { maximumFractionDigits: 0 })} en ventas y una ganancia neta sobre la inversión de $${ganancia.toLocaleString('es-AR', { maximumFractionDigits: 0 })}. La publicidad es una ecuación predecible, no un gasto a ciegas.`
          : `Con esos números la inversión no se paga: perderías $${Math.abs(ganancia).toLocaleString('es-AR', { maximumFractionDigits: 0 })}. Bajá el costo por venta o subí el ticket/margen antes de invertir.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'M9',
    nombre: 'Ratio LTV / CAC',
    bloque: 'Marketing',
    que_es:
      'La relación entre lo que vale un cliente (LTV) y lo que cuesta conseguirlo (CAC). El indicador maestro de la salud de tu modelo de adquisición.',
    formula: 'Ratio LTV/CAC = LTV ÷ CAC',
    ejemplo: {
      contexto: 'Benchmarks: <2x insostenible · 3-5x saludable · >5x escalar',
      datos: 'LTV: $480.000 · CAC: $5.000',
      resultado: 'Ratio = 96x → escalar la inversión publicitaria de manera agresiva.',
    },
    inputs: [
      { id: 'ltv', label: 'LTV del cliente', placeholder: '480000', tipo: 'moneda' },
      { id: 'cac', label: 'CAC (costo de adquisición)', placeholder: '5000', tipo: 'moneda' },
    ],
    calcular: (inputs) => {
      const ratio = inputs.ltv / inputs.cac
      return { ratio }
    },
    interpretar: (resultado) => {
      const { ratio } = resultado
      const semaforo: Semaforo = ratio >= 3 ? 'positivo' : ratio >= 2 ? 'neutral' : 'negativo'
      const mensaje = `Tu ratio LTV/CAC es ${ratio.toFixed(1)}x. ${
        ratio >= 5
          ? 'Excelente: el modelo de adquisición es muy sano, escalá agresivamente.'
          : ratio >= 3
            ? 'Saludable: el modelo funciona bien y tiene espacio para crecer.'
            : ratio >= 2
              ? 'Aceptable pero mejorable: bajá el CAC o subí el LTV.'
              : 'Insostenible: gastás demasiado para lo que vale cada cliente. Revisá urgente canales y retención.'
      }`
      return { semaforo, mensaje }
    },
  },
]

// ============================================================
// BLOQUE EQUIPO (E1–E7) — funcional
// Datos exactos de Formulas_Emprendedor_mktventas.md
// ============================================================
const EQUIPO: Calculadora[] = [
  {
    id: 'E1',
    nombre: 'Costo Real de una Persona',
    bloque: 'Equipo',
    que_es:
      'Lo que aparece en el recibo de sueldo no es el costo real. El costo real incluye cargas sociales, ART, SAC, vacaciones y beneficios.',
    formula: 'Costo real = Sueldo bruto × factor de cargas (1,3 a 1,5)',
    ejemplo: {
      contexto: 'Empleado con sueldo de $250.000',
      datos: 'Sueldo: $250.000 · Factor: × 1,35',
      resultado: 'Costo real = $337.500/mes. Ese es el número que impacta el PE, no los $250.000.',
    },
    inputs: [
      { id: 'sueldo', label: 'Sueldo bruto acordado', placeholder: '250000', tipo: 'moneda' },
      { id: 'factor_cargas', label: 'Factor de cargas (1,3 a 1,5)', placeholder: '1.35', tipo: 'decimal' },
    ],
    calcular: (inputs) => {
      const costo_real = inputs.sueldo * inputs.factor_cargas
      const costo_anual = costo_real * 12
      return { costo_real, costo_anual }
    },
    interpretar: (resultado) => {
      const { costo_real, costo_anual } = resultado
      const semaforo: Semaforo = 'neutral'
      const mensaje = `El costo real de esa persona es $${costo_real.toLocaleString('es-AR', { maximumFractionDigits: 0 })} por mes ($${costo_anual.toLocaleString('es-AR', { maximumFractionDigits: 0 })} al año), no el sueldo del contrato. Ese es el número que tenés que usar para calcular tu Punto de Equilibrio y tu Punto Óptimo.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'E2',
    nombre: 'Facturación por Colaborador',
    bloque: 'Equipo',
    que_es:
      'Mide la eficiencia del equipo. Si al sumar personal la facturación por colaborador sube, el negocio escala bien. Si baja, hay un problema de productividad.',
    formula: 'Facturación por colaborador = Ventas totales ÷ N° de empleados (full-time)',
    ejemplo: {
      contexto: 'Equipo de 6 personas',
      datos: 'Ventas: $9.000.000 · Equipo: 6',
      resultado: '$1.500.000/persona. Con un 7° empleado bajaría a $1.285.714 (necesitarías facturar $10.500.000 para mantenerlo).',
    },
    inputs: [
      { id: 'ventas', label: 'Ventas totales del mes', placeholder: '9000000', tipo: 'moneda' },
      { id: 'empleados', label: 'Número de empleados (full-time)', placeholder: '6', tipo: 'numero' },
      { id: 'nuevos', label: 'Empleados a sumar (opcional)', placeholder: '1', tipo: 'numero', requerido: false },
    ],
    calcular: (inputs) => {
      const fact_actual = inputs.ventas / inputs.empleados
      const total_emp = inputs.empleados + (inputs.nuevos || 0)
      const fact_nuevo = inputs.nuevos ? inputs.ventas / total_emp : null
      const ventas_para_mantener = inputs.nuevos ? fact_actual * total_emp : null
      return { fact_actual, fact_nuevo, ventas_para_mantener }
    },
    interpretar: (resultado) => {
      const { fact_actual, fact_nuevo, ventas_para_mantener } = resultado
      const semaforo: Semaforo = 'neutral'
      let mensaje = `Cada colaborador factura $${fact_actual.toLocaleString('es-AR', { maximumFractionDigits: 0 })} por mes. `
      if (fact_nuevo)
        mensaje += `Si sumás personal, el ratio bajaría a $${fact_nuevo.toLocaleString('es-AR', { maximumFractionDigits: 0 })}/persona: para mantener la eficiencia actual necesitarías facturar $${ventas_para_mantener.toLocaleString('es-AR', { maximumFractionDigits: 0 })}. `
      mensaje += `Vigilá que este ratio se mantenga o crezca al sumar gente; si baja, el negocio no está escalando bien.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'E3',
    nombre: 'Incremento para Mantener Rentabilidad al Contratar',
    bloque: 'Equipo',
    que_es:
      'Cuánto más tiene que vender el negocio para que la contratación no baje la rentabilidad. Define si conviene contratar ahora o esperar.',
    formula:
      'Costo real = Sueldo × 1,3 a 1,5\nIncremento necesario = Costo real ÷ (1 − % Margen Neto objetivo)',
    ejemplo: {
      contexto: 'Negocio evaluando una contratación',
      datos: 'Sueldo: $250.000 · Factor: 1,3 · Margen neto objetivo: 30%',
      resultado: 'Costo real $325.000 → Incremento = $464.286 adicionales/mes.',
    },
    inputs: [
      { id: 'sueldo', label: 'Sueldo acordado', placeholder: '250000', tipo: 'moneda' },
      { id: 'factor_cargas', label: 'Factor de cargas (1,3 a 1,5)', placeholder: '1.3', tipo: 'decimal' },
      { id: 'mn_objetivo', label: 'Margen neto objetivo (%)', placeholder: '30', tipo: 'porcentaje' },
      { id: 'ventas_actuales', label: 'Ventas actuales del mes (opcional)', placeholder: '5000000', tipo: 'moneda', requerido: false },
    ],
    calcular: (inputs) => {
      const costo_real = inputs.sueldo * inputs.factor_cargas
      const incremento_necesario = costo_real / (1 - inputs.mn_objetivo / 100)
      const ventas_nueva_meta = inputs.ventas_actuales ? inputs.ventas_actuales + incremento_necesario : null
      return { costo_real, incremento_necesario, ventas_nueva_meta }
    },
    interpretar: (resultado, inputs) => {
      const { costo_real, incremento_necesario, ventas_nueva_meta } = resultado
      const semaforo: Semaforo = 'neutral'
      let mensaje = `El costo real de esa persona es $${costo_real.toLocaleString('es-AR', { maximumFractionDigits: 0 })}/mes. Para no bajar tu rentabilidad, necesitás crecer $${incremento_necesario.toLocaleString('es-AR', { maximumFractionDigits: 0 })} en facturación mensual. `
      if (ventas_nueva_meta)
        mensaje += `Es decir, pasar de $${inputs.ventas_actuales.toLocaleString('es-AR')} a $${ventas_nueva_meta.toLocaleString('es-AR', { maximumFractionDigits: 0 })}. `
      mensaje += `¿Podés lograrlo en 1-3 meses? Sí → contratá. No → esperá o renegociá el sueldo.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'E4',
    nombre: 'Comisiones y Bonos sobre Utilidad',
    bloque: 'Equipo',
    que_es:
      'Las comisiones sobre ventas brutas pueden arruinar un negocio (el vendedor cobra aunque la empresa no gane). Sobre utilidad neta, alinean los incentivos.',
    formula: 'Bono = % acordado × Utilidad neta\nSolo se activa si la utilidad supera el umbral mínimo',
    ejemplo: {
      contexto: 'Esquema con umbral mínimo',
      datos: 'Utilidad del mes: $1.700.000 · Umbral: $1.000.000 · Bono: 3%',
      resultado: 'Bono = $1.700.000 × 3% = $51.000. Con utilidad de $800.000 → bono $0 (no activó).',
    },
    inputs: [
      { id: 'utilidad_neta', label: 'Utilidad neta del período', placeholder: '1700000', tipo: 'moneda' },
      { id: 'umbral_minimo', label: 'Umbral mínimo para activar el bono', placeholder: '1000000', tipo: 'moneda' },
      { id: 'pct_bono', label: 'Porcentaje de bono (%)', placeholder: '3', tipo: 'porcentaje' },
    ],
    calcular: (inputs) => {
      const activo = inputs.utilidad_neta >= inputs.umbral_minimo ? 1 : 0
      const bono = activo ? inputs.utilidad_neta * (inputs.pct_bono / 100) : 0
      return { activo, bono }
    },
    interpretar: (resultado) => {
      const { activo, bono } = resultado
      const semaforo: Semaforo = activo ? 'positivo' : 'neutral'
      const mensaje = activo
        ? `El bono se activa: corresponde pagar $${bono.toLocaleString('es-AR', { maximumFractionDigits: 0 })}. Como está atado a la utilidad neta, solo pagás cuando el negocio realmente ganó — el equipo gana cuando vos ganás.`
        : `La utilidad no llegó al umbral mínimo, así que no se paga bono este período ($0). El esquema protege tu rentabilidad: el incentivo solo se activa cuando el negocio gana de verdad.`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'E5',
    nombre: 'Eficiencia Operativa del Equipo',
    bloque: 'Equipo',
    que_es:
      'Qué porcentaje de la capacidad disponible estás usando. Antes de contratar más, lo primero es maximizar la eficiencia del equipo actual.',
    formula:
      'Eficiencia = (Ventas reales ÷ Capacidad máxima) × 100\nCosto de ociosidad = (1 − Eficiencia%) × Costos fijos',
    ejemplo: {
      contexto: 'Equipo con capacidad de 500 ventas/mes',
      datos: 'Ventas reales: 300 · Costos fijos: $3.500.000',
      resultado: 'Eficiencia 60% · Costo de ociosidad $1.400.000/mes "perdidos".',
    },
    inputs: [
      { id: 'ventas_reales', label: 'Ventas / producción real del mes', placeholder: '300', tipo: 'numero' },
      { id: 'capacidad_max', label: 'Capacidad máxima del equipo', placeholder: '500', tipo: 'numero' },
      { id: 'costos_fijos', label: 'Costos fijos totales', placeholder: '3500000', tipo: 'moneda' },
    ],
    calcular: (inputs) => {
      const eficiencia = (inputs.ventas_reales / inputs.capacidad_max) * 100
      const costo_ociosidad = (1 - eficiencia / 100) * inputs.costos_fijos
      return { eficiencia, costo_ociosidad }
    },
    interpretar: (resultado) => {
      const { eficiencia, costo_ociosidad } = resultado
      const semaforo: Semaforo = eficiencia >= 85 ? 'positivo' : eficiencia >= 60 ? 'neutral' : 'negativo'
      const mensaje = `Estás usando el ${eficiencia.toFixed(1)}% de la capacidad de tu equipo, con un costo de ociosidad de $${costo_ociosidad.toLocaleString('es-AR', { maximumFractionDigits: 0 })}/mes. ${
        eficiencia >= 85
          ? 'El equipo está bien aprovechado: recién acá tiene sentido evaluar sumar personal.'
          : 'Antes de contratar, llená esa capacidad ociosa: la solución no es más gente, es vender más con el equipo que ya tenés. Solo por encima del 85-90% conviene una nueva contratación.'
      }`
      return { semaforo, mensaje }
    },
  },
  {
    id: 'E6',
    nombre: 'Valor Hora del Dueño',
    bloque: 'Equipo',
    que_es:
      'Si no sabés cuánto vale tu hora, delegás al revés. El criterio: si una tarea la puede hacer alguien a menor costo que tu valor hora, delegala.',
    formula:
      'Valor hora dueño = Utilidad neta mensual deseada ÷ Horas trabajadas por mes',
    ejemplo: {
      contexto: 'Dueño que trabaja 160 horas/mes',
      datos: 'Utilidad deseada: $3.000.000 · Horas: 160',
      resultado: 'Valor hora = $18.750. Tareas que se resuelven a $3.000/hora → delegar (ganás $15.750/hora liberada).',
    },
    inputs: [
      { id: 'utilidad_deseada', label: 'Utilidad neta mensual deseada', placeholder: '3000000', tipo: 'moneda' },
      { id: 'horas_mes', label: 'Horas trabajadas por mes', placeholder: '160', tipo: 'numero' },
      { id: 'costo_hora_tarea', label: 'Costo/hora de delegar una tarea (opcional)', placeholder: '3000', tipo: 'moneda', requerido: false },
    ],
    calcular: (inputs) => {
      const valor_hora = inputs.utilidad_deseada / inputs.horas_mes
      const ahorro_por_hora = inputs.costo_hora_tarea ? valor_hora - inputs.costo_hora_tarea : null
      return { valor_hora, ahorro_por_hora }
    },
    interpretar: (resultado) => {
      const { valor_hora, ahorro_por_hora } = resultado
      const semaforo: Semaforo = 'neutral'
      let mensaje = `Tu hora como dueño vale $${valor_hora.toLocaleString('es-AR', { maximumFractionDigits: 0 })}. `
      if (ahorro_por_hora !== null) {
        mensaje +=
          ahorro_por_hora > 0
            ? `Delegar esa tarea te libera $${ahorro_por_hora.toLocaleString('es-AR', { maximumFractionDigits: 0 })} por hora para enfocarte en lo que solo vos podés hacer. Delegala.`
            : `Esa tarea cuesta más por hora que tu propio valor hora: no conviene delegarla así, o requiere tu criterio. Revisalo.`
      } else {
        mensaje += `Cualquier tarea que pueda hacer alguien por debajo de ese valor, delegala: usá tus horas en lo que realmente mueve la aguja del negocio.`
      }
      return { semaforo, mensaje }
    },
  },
  {
    id: 'E7',
    nombre: 'PE de Inversión Publicitaria (Equipo)',
    bloque: 'Equipo',
    que_es:
      'Cuánto puede crecer la inversión publicitaria antes de necesitar más equipo para sostener la demanda. Conecta marketing con capacidad operativa.',
    formula:
      'Capacidad libre = Capacidad máxima − Demanda actual (en ventas)\nInversión máxima sin contratar = Capacidad libre × Costo por venta',
    ejemplo: {
      contexto: 'Equipo con capacidad de 500 ventas',
      datos: 'Ventas actuales: 300 · Capacidad libre: 200 · CPVenta: $8.571',
      resultado: 'Inversión que el equipo absorbe sin contratar = 200 × $8.571 = $1.714.200.',
    },
    inputs: [
      { id: 'capacidad_max', label: 'Capacidad máxima (ventas/mes)', placeholder: '500', tipo: 'numero' },
      { id: 'ventas_actuales', label: 'Ventas actuales (cantidad)', placeholder: '300', tipo: 'numero' },
      { id: 'cpventa', label: 'Costo por venta (publicidad)', placeholder: '8571', tipo: 'moneda' },
    ],
    calcular: (inputs) => {
      const capacidad_libre = Math.max(0, inputs.capacidad_max - inputs.ventas_actuales)
      const inversion_max = capacidad_libre * inputs.cpventa
      return { capacidad_libre, inversion_max }
    },
    interpretar: (resultado) => {
      const { capacidad_libre, inversion_max } = resultado
      if (capacidad_libre <= 0) {
        return {
          semaforo: 'negativo',
          mensaje: `Tu equipo ya está al límite de su capacidad: no podés sumar más demanda con publicidad sin antes contratar. Si invertís más en ads ahora, el equipo se desborda.`,
        }
      }
      const semaforo: Semaforo = 'positivo'
      const mensaje = `Te quedan ${capacidad_libre.toLocaleString('es-AR')} ventas de capacidad libre. Podés invertir hasta $${inversion_max.toLocaleString('es-AR', { maximumFractionDigits: 0 })} más en publicidad sin necesitar contratar a nadie. Recién si la publicidad genera más demanda que esa, el equipo se desborda y hay que sumar personal.`
      return { semaforo, mensaje }
    },
  },
]

export const CALCULADORAS: Calculadora[] = [...FINANZAS, ...VENTAS, ...MARKETING, ...EQUIPO]

export const BLOQUES: { nombre: Bloque; id: string; calculadoras: Calculadora[] }[] = [
  { nombre: 'Finanzas', id: 'finanzas', calculadoras: FINANZAS },
  { nombre: 'Ventas', id: 'ventas', calculadoras: VENTAS },
  { nombre: 'Marketing', id: 'marketing', calculadoras: MARKETING },
  { nombre: 'Equipo', id: 'equipo', calculadoras: EQUIPO },
]
