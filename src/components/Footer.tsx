import { BRAND, NAV_LINKS } from '../config'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#060d15] px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:justify-between md:text-left">
          {/* Marca */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <div className="flex items-center gap-3">
              <img src={BRAND.logo} alt={BRAND.nombre} className="h-10 w-10" />
              <div className="leading-tight">
                <div className="font-display text-lg font-semibold text-warm">{BRAND.producto}</div>
                <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold/80">
                  {BRAND.nombre}
                </div>
              </div>
            </div>
            <p className="max-w-xs text-sm text-muted">{BRAND.firma}</p>
          </div>

          {/* Navegación */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Disclaimer + copyright */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-muted/80">
            Esta herramienta brinda cálculos orientativos y educativos. No reemplaza asesoramiento
            financiero, contable, legal o impositivo personalizado.
          </p>
          <p className="mt-4 text-center text-xs text-muted/60">
            © 2026 Emperador Financiero LLC. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
