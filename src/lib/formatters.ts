// Formateo de números — formato AR/LATAM (obligatorio, sección 5.2 del copy.md)

export const formatMoney = (number: number): string =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number)

export const formatPct = (number: number): string => `${number.toFixed(1)}%`

export const formatNumber = (number: number): string =>
  new Intl.NumberFormat('es-AR').format(Math.round(number))

// Limpiar input del usuario para calcular (acepta formato AR: 1.500.000,50)
export const parseInput = (value: string): number =>
  parseFloat(
    String(value)
      .replace(/\./g, '')
      .replace(',', '.')
      .replace(/[^0-9.-]/g, ''),
  ) || 0
