# Fórmulas Negocio · Emperador Financiero

Herramienta web con **42 calculadoras financieras** para emprendedores y dueños de negocio.
Cada fórmula muestra qué es, su fórmula, un ejemplo real, los campos para tus números y una
interpretación del resultado. Incluye un **Asesor IA** opcional que entiende tu situación y te
lleva a la calculadora correcta.

**Stack:** React + Vite + TypeScript · Tailwind CSS · Framer Motion · lucide-react.
**Deploy:** Cloudflare Pages (las 42 calculadoras corren 100% en el navegador, sin backend).

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173  (frontend; el chat IA necesita Functions, ver abajo)
npm run build    # build de producción (tsc + vite)
npm run lint     # oxlint
```

## Asesor IA (opcional y seguro)

El chat usa una **Cloudflare Pages Function** (`functions/api/chat.ts`) que llama a **Google
Gemini** desde el servidor. La API key vive como **variable secreta en Cloudflare**
(`GEMINI_API_KEY`) y **nunca** se expone en el frontend.

- Sin la key configurada, el chat muestra **"Asesor IA · Próximamente"** y el resto del sitio
  funciona normal.
- Pasos para activarlo (key gratis de Google AI Studio + cómo cargarla en Cloudflare) y cómo
  probarlo localmente: ver **[DEPLOY.md](./DEPLOY.md)**.

## Dónde tocar cada cosa

| Qué | Dónde |
|---|---|
| Fórmulas y su lógica de cálculo | `src/data/calculadoras.ts` |
| Íconos y categorías de las cards | `src/data/calcMeta.ts` |
| Marca, colores por área, textos del hero | `src/config.ts` |
| Paleta / estilos premium | `src/index.css` (bloque `@theme`) |
| Logo | `public/logo-emperador.png` |
| Backend del Asesor IA | `functions/api/chat.ts` |
