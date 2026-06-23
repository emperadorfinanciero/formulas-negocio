import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ComoFunciona from './components/ComoFunciona'
import ChatIA from './components/ChatIA'
import BlockSection from './components/BlockSection'
import CalculatorModal from './components/CalculatorModal'
import Footer from './components/Footer'
import { BLOQUES } from './data/calculadoras'
import type { Calculadora } from './data/calculadoras'
import { BLOQUE_DESC } from './config'

function App() {
  const [seleccionada, setSeleccionada] = useState<Calculadora | null>(null)

  // El chat IA puede pedir abrir una calculadora (evento aditivo, no rompe nada).
  useEffect(() => {
    const onOpen = (e: Event) => {
      const id = (e as CustomEvent<string>).detail
      const calc = BLOQUES.flatMap((b) => b.calculadoras).find((c) => c.id === id)
      if (calc) setSeleccionada(calc)
    }
    window.addEventListener('fn:open-calc', onOpen as EventListener)
    return () => window.removeEventListener('fn:open-calc', onOpen as EventListener)
  }, [])

  return (
    <>
      <div className="noise-overlay" aria-hidden />
      <Navbar />
      <main>
        <Hero />
        <ComoFunciona />
        <ChatIA />
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
      </main>
      <Footer />

      {seleccionada && (
        <CalculatorModal calc={seleccionada} onClose={() => setSeleccionada(null)} />
      )}
    </>
  )
}

export default App
