import type { CalcInput } from '../data/calculadoras'

// Valida que los campos requeridos no estén vacíos ni en cero (sección 5.3 del copy.md)
export function validateInputs(
  inputs: Record<string, number>,
  fields: CalcInput[],
): string[] {
  const errors: string[] = []
  fields
    .filter((f) => f.requerido !== false)
    .forEach((field) => {
      if (!inputs[field.id] || inputs[field.id] <= 0) {
        errors.push(`"${field.label}" es requerido y debe ser mayor a cero.`)
      }
    })
  return errors
}
