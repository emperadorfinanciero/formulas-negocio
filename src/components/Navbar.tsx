import { useEffect, useState } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'
import { BRAND, NAV_LINKS } from '../config'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-[#08121c]/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <a href="#top" className="group flex items-center gap-3">
          <img
            src={BRAND.logo}
            alt={BRAND.nombre}
            width={36}
            height={36}
            className="h-9 w-9 drop-shadow-[0_0_10px_rgba(236,168,25,0.35)]"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-base font-semibold text-warm">
              {BRAND.producto}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-gold/80">
              {BRAND.nombre}
            </span>
          </span>
        </a>

        {/* Links desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => scrollTo('finanzas')}
            className="btn-primary flex items-center gap-1.5 !px-5 !py-2.5 text-sm"
          >
            <Sparkles size={15} />
            Usar fórmulas
          </button>
        </div>

        {/* Toggle mobile */}
        <button
          type="button"
          className="text-warm md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Menú mobile */}
      {open && (
        <div className="space-y-1 border-t border-white/10 bg-[#08121c]/95 px-4 py-3 backdrop-blur-xl md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-warm/85 transition-colors hover:bg-white/5 hover:text-gold"
            >
              {link.label}
            </a>
          ))}
          <button type="button" onClick={() => scrollTo('finanzas')} className="btn-primary mt-2 w-full">
            Usar fórmulas →
          </button>
        </div>
      )}
    </header>
  )
}
