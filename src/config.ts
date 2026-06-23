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
  badge: '42 fórmulas financieras · Herramienta profesional',
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
    titulo: 'Elegí tu fórmula',
    texto: 'Navegá las 42 calculadoras por categoría o pedile al Asesor IA que te lleve a la indicada.',
  },
  {
    titulo: 'Ingresá tus números',
    texto: 'Campos claros, con ayuda en cada variable. Cálculo instantáneo, sin planillas ni vueltas.',
  },
  {
    titulo: 'Entendé el resultado',
    texto: 'No solo el número: una interpretación en lenguaje simple y la próxima acción sugerida.',
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
