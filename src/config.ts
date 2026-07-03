// Configuración central de marca y contenido — Fórmulas Negocio · Emperador Financiero

export const BRAND = {
  nombre: 'Emperador Financiero',
  producto: 'Fórmulas Negocio',
  app: 'Fórmulas Negocio',
  propietario: 'Angelo Nisi',
  handle: '@emperadorfinanciero',
  logo: '/logo-emperador.png',
  firma: 'Emperador Financiero · Angelo Nisi · @emperadorfinanciero',
}

export const HERO = {
  badge: '47 calculadoras financieras · Herramienta profesional',
  titulo: 'Las fórmulas que necesitás para tomar mejores decisiones.',
  subtitulo: 'Sin vueltas. Con tus números reales.',
  descripcion:
    'Fórmulas Negocio reúne 42 calculadoras financieras para emprendedores y dueños de negocio. Ingresás tus datos, calculás en segundos y entendés qué significa cada resultado para tu negocio.',
  ctaPrimario: 'Explorar fórmulas',
  ctaSecundario: 'Hablar con el Asesor IA',
}

export const NAV_LINKS = [
  { label: 'Finanzas', href: '#finanzas' },
  { label: 'Ventas', href: '#ventas' },
  { label: 'Marketing', href: '#marketing' },
  { label: 'Equipo', href: '#equipo' },
]

// Pasos de "Cómo funciona"
export const PASOS = [
  {
    titulo: 'Encontrá la fórmula exacta',
    texto: 'Buscá por nombre, navegá por área o preguntale al Asesor IA — en segundos te lleva a la calculadora correcta para tu pregunta.',
  },
  {
    titulo: 'Ingresá tus números reales',
    texto: 'Campos claros con ejemplos reales. Calculás en segundos, sin planillas, sin cuentas complicadas y sin registro.',
  },
  {
    titulo: 'Tomá mejores decisiones',
    texto: 'No solo el número: entendés qué significa para tu negocio, si estás bien o mal parado, y cuál es el próximo paso concreto.',
  },
]

// Colores por bloque (para los tags de las tarjetas)
export const BLOQUE_COLOR: Record<string, string> = {
  Finanzas: '#ECA819',
  Ventas: '#25B187',
  Marketing: '#5B9BFF',
  Equipo: '#C58BFF',
}

// Descripción de cada bloque/categoría principal
export const BLOQUE_DESC: Record<string, string> = {
  Finanzas:
    'El núcleo del negocio: rentabilidad, márgenes, punto de equilibrio, caja y costos. Saber si realmente ganás dinero.',
  Ventas:
    'Convertí la actividad comercial en números concretos: ticket, recompra, valor del cliente y metas accionables.',
  Marketing:
    'Hacé la publicidad predecible: cuánto te cuesta cada cliente, qué canal rinde y cuánto podés invertir sin riesgo.',
  Equipo:
    'Convertí las decisiones de personas en decisiones financieras: costo real, eficiencia, contratación y delegación.',
}
