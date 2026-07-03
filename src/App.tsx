import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ComoFunciona from './components/ComoFunciona'
import ChatIA from './components/ChatIA'
import BlockSection from './components/BlockSection'
import SearchBar from './components/SearchBar'
import CalculatorCard from './components/CalculatorCard'
import CalculatorModal from './components/CalculatorModal'
import Footer from './components/Footer'
import { BLOQUES, CALCULADORAS } from './data/calculadoras'
import type { Calculadora } from './data/calculadoras'
import { BLOQUE_DESC } from './config'
import { CALC_META } from './data/calcMeta'

function App() {
  const [seleccionada, setSeleccionada] = useState<Calculadora | null>(null)
  const [busqueda, setBusqueda] = useState('')

  // El chat IA puede pedir abrir una calculadora
  useEffect(() => {
    const onOpen = (e: Event) => {
      const id = (e as CustomEvent<string>).detail
      const calc = CALCULADORAS.find((c) => c.id === id)
      if (calc) setSeleccionada(calc)
    }
    window.addEventListener('fn:open-calc', onOpen as EventListener)
    return () => window.removeEventListener('fn:open-calc', onOpen as EventListener)
  }, [])

  // Resultados de búsqueda en tiempo real
  const resultadosBusqueda = useMemo(() => {
    const q = busqueda.trim().toLowerCase()
    if (!q) return []
    return CALCULADORAS.filter(
      (c) =>
        c.nombre.toLowerCase().includes(q) ||
        c.que_es.toLowerCase().includes(q) ||
        (CALC_META[c.id]?.categoria ?? '').toLowerCase().includes(q) ||
        c.bloque.toLowerCase().includes(q),
    )
  }, [busqueda])

  const mostraBusqueda = busqueda.trim().length > 0

  return (
    <>
      <div className="noise-overlay" aria-hidden />
      <Navbar />
      <main>
        <Hero />
        <ComoFunciona />

        {/* Buscador y bloques */}
        <SearchBar
          value={busqueda}
          onChange={setBusqueda}
          resultCount={mostraBusqueda ? resultadosBusqueda.length : undefined}
        />

        {mostraBusqueda ? (
          /* Vista de resultados de búsqueda */
          <section className="px-4 py-10 sm:px-6">
            <div className="mx-auto max-w-6xl">
              {resultadosBusqueda.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {resultadosBusqueda.map((calc) => (
                    <CalculatorCard key={calc.id} calc={calc} onSelect={setSeleccionada} />
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <p className="text-muted">
                    No encontramos fórmulas para "{busqueda}".
                  </p>
                  <p className="mt-1 text-sm text-muted/60">
                    Probá con: margen, sueldo, descuento, punto de equilibrio, publicidad…
                  </p>
                </div>
              )}
            </div>
          </section>
        ) : (
          /* Vista normal por bloques */
          <>
            {BLOQUES.map((bloque) => (
              <BlockSection
                key={bloque.id}
                id={bloque.id}
                nombre={bloque.nombre}
                descripcion={BLOQUE_DESC[bloque.nombre] ?? ''}
                calculadoras={bloque.calculadoras}
                onSelect={setSeleccionada}
              />
            ))}
          </>
        )}

        {/* Chat IA al final — después de que el usuario ya exploró las fórmulas */}
        <ChatIA />
      </main>
      <Footer />

      {seleccionada && (
        <CalculatorModal calc={seleccionada} onClose={() => setSeleccionada(null)} />
      )}
    </>
  )
}

export default App
