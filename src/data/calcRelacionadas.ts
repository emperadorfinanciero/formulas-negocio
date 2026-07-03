// Calculadoras relacionadas: después del resultado, sugerimos las 2 más relevantes.
// Clave: ID de la calculadora que se acaba de usar.
// Valor: IDs de las 2 calculadoras siguientes recomendadas.

export const CALC_RELACIONADAS: Record<string, string[]> = {
  // Finanzas
  F1:  ['F3', 'F6'],   // Margen Bruto → Precio Mínimo, Punto de Equilibrio
  F2:  ['F14', 'F6'],  // Margen Neto → P&L, PE
  F3:  ['F1', 'F6'],   // Precio Mínimo → Margen Bruto, PE
  F4:  ['F6', 'F7'],   // Contribución Marginal → PE, Punto Óptimo
  F5:  ['F1', 'F4'],   // Contribución Real → Margen Bruto, CM
  F6:  ['F7', 'V10'],  // PE → Punto Óptimo, Meta Diaria
  F7:  ['F8', 'V5'],   // Punto Óptimo → Proyección Inversa, Proyección Ventas
  F8:  ['V2', 'V5'],   // Proyección Inversa → Tasa Cierre, Proyección Ventas
  F9:  ['F6', 'F2'],   // Margen Seguridad → PE, Margen Neto
  F10: ['F11', 'F7'],  // ROI → Amortización, Punto Óptimo
  F11: ['F6', 'F10'],  // Amortización → PE, ROI
  F12: ['F13', 'F14'], // Facturado vs Percibido → Tasa Mora, P&L
  F13: ['F12', 'F14'], // Tasa Mora → Facturado, P&L
  F14: ['F2', 'F6'],   // P&L → Margen Neto, PE
  F15: ['F6', 'E1'],   // PE Contratación → PE, Costo Real Persona
  F16: ['F1', 'F3'],   // Costo Reposición → Margen Bruto, Precio Mínimo
  // Ventas
  V1:  ['V6', 'V4'],   // Ticket Promedio → Impacto Ticket, LTV
  V2:  ['V5', 'F8'],   // Tasa Cierre → Proyección Ventas, Proyección Inversa
  V3:  ['V4', 'V1'],   // Frecuencia Recompra → LTV, Ticket
  V4:  ['M1', 'M2'],   // LTV → CAC, CAC Permitido
  V5:  ['F7', 'V10'],  // Proyección Ventas → Punto Óptimo, Meta Diaria
  V6:  ['F1', 'V7'],   // Impacto Ticket → Margen Bruto, Duplicar Utilidad
  V7:  ['F6', 'F7'],   // Duplicar Utilidad → PE, Punto Óptimo
  V8:  ['F1', 'F3'],   // Eficiencia Descuento → Margen Bruto, Precio Mínimo
  V9:  ['V1', 'V6'],   // Upsell → Ticket Promedio, Impacto Ticket
  V10: ['F7', 'F6'],   // Meta Diaria → Punto Óptimo, PE
  // Marketing
  M1:  ['M2', 'V4'],   // CAC → CAC Permitido, LTV
  M2:  ['M1', 'V4'],   // CAC Permitido → CAC, LTV
  M3:  ['M1', 'M5'],   // ROAS → CAC, Rentabilidad Canal
  M4:  ['V2', 'M7'],   // Costo Embudo → Tasa Cierre, Conversión
  M5:  ['M1', 'M3'],   // Rentabilidad Canal → CAC, ROAS
  M6:  ['M1', 'M2'],   // Presupuesto Pub → CAC, CAC Permitido
  M7:  ['V2', 'M4'],   // Conversión → Tasa Cierre, Costo Embudo
  M8:  ['V5', 'M1'],   // Predicción Ventas → Proyección, CAC
  M9:  ['V4', 'M1'],   // LTV/CAC → LTV, CAC
  // Equipo
  E1:  ['F15', 'F6'],  // Costo Persona → PE Contratación, PE
  E2:  ['E1', 'F2'],   // Fact/Colaborador → Costo Persona, Margen Neto
  E3:  ['F15', 'E1'],  // Incremento Contratar → PE Contratación, Costo Persona
  E4:  ['E1', 'F2'],   // Comisiones → Costo Persona, Margen Neto
  E5:  ['E2', 'F14'],  // Eficiencia Op → Fact/Colaborador, P&L
  E6:  ['E1', 'F2'],   // Valor Hora → Costo Persona, Margen Neto
  E7:  ['M1', 'M3'],   // PE Pub → CAC, ROAS
}
