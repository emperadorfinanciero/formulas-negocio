import { useRef } from 'react'
import { Search, X } from 'lucide-react'

interface Props {
  value: string
  onChange: (v: string) => void
  resultCount?: number
}

export default function SearchBar({ value, onChange, resultCount }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="sticky top-[57px] z-40 border-b border-white/[0.05] bg-[#060d15]/90 px-4 py-3 backdrop-blur-xl sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/60"
          />
          <input
            ref={inputRef}
            type="search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Buscar fórmula… Ej: margen, descuento, sueldo, punto de equilibrio"
            className="input-field py-3 pl-9 pr-10 text-sm"
            aria-label="Buscar calculadora"
          />
          {value && (
            <button
              type="button"
              onClick={() => { onChange(''); inputRef.current?.focus() }}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted/60 transition-colors hover:text-warm"
              aria-label="Limpiar búsqueda"
            >
              <X size={15} />
            </button>
          )}
        </div>
        {value && (
          <p className="mt-1.5 text-xs text-muted/60">
            {resultCount === 0
              ? 'Sin resultados. Probá con otra palabra.'
              : `${resultCount} fórmula${resultCount !== 1 ? 's' : ''} encontrada${resultCount !== 1 ? 's' : ''}`}
          </p>
        )}
      </div>
    </div>
  )
}
