# Deploy — Fórmulas Negocio (Cloudflare Pages)

Este proyecto se publica en **Cloudflare Pages** (no es un Worker). El deploy es
automático: cada `git push` a la rama `main` dispara un build y publica la nueva versión.

El **Asesor IA** funciona a través de una **Cloudflare Pages Function** segura
(`functions/api/chat.ts`), expuesta en `/api/chat`. Usa **Google Gemini** (free tier).
La API key vive como **variable secreta en Cloudflare** y nunca se expone en el frontend.

---

## 1. Configurar la API key del Asesor IA (Google Gemini)

> Sin este paso, las 42 calculadoras funcionan igual. El chat muestra
> **"Asesor IA · Próximamente"** y no rompe la página.

1. Conseguí una API key **gratis** (sin tarjeta) en **Google AI Studio**:
   https://aistudio.google.com/apikey → "Create API key". Es del formato `AIza...`.
2. Entrá a **Cloudflare → Workers & Pages → `formulas-negocio` → Settings → Environment variables**.
3. Agregá:
   - **Nombre:** `GEMINI_API_KEY`
   - **Valor:** tu clave `AIza...`
   - **Tipo:** marcá **Encrypt / Secret** (no Plaintext).
   - *(Opcional)* `GEMINI_MODEL` = `gemini-2.0-flash` (es el modelo por defecto).
4. Agregala en **Production**. Si querés probar el chat en las URLs de *preview*
   (las que genera Cloudflare por cada deploy), agregala también en **Preview**.
5. Volvé a desplegar (Deployments → Retry, o hacé un nuevo push) para que tome la variable.

**Importante:** la variable se llama exactamente `GEMINI_API_KEY` (sin prefijo `VITE_`).
Las variables `VITE_*` se incrustan en el bundle del navegador — por eso **no** se usan para secretos.

### Free tier de Gemini
`gemini-2.0-flash` tiene un free tier generoso (límite por minuto/día) más que suficiente
para esta herramienta. Si en algún momento necesitás más volumen, podés subir el límite
desde Google AI Studio.

---

## 2. Probar el chat localmente (opcional)

`npm run dev` levanta solo el frontend (Vite) y **no** sirve las Functions, así que
`/api/chat` no responde en ese modo (las calculadoras sí funcionan, y el chat muestra
"Próximamente").

Para probar el chat completo en tu compu:

```bash
# 1) Poné tu clave en un archivo .dev.vars (NO se sube a git)
echo "GEMINI_API_KEY=AIza..." > .dev.vars

# 2) Build + servidor de Pages con Functions
npm run build
npx wrangler pages dev dist
```

Eso sirve el sitio estático **y** la función `/api/chat` juntos, leyendo la clave de `.dev.vars`.

---

## 3. Cómo fluye el Asesor IA

```
Navegador (ChatIA.tsx)
   ├─ GET  /api/chat            → { configured: true/false }   (muestra "Próximamente" si false)
   └─ POST /api/chat { message }                               ← sin API key, mismo dominio
        └─ functions/api/chat.ts                               ← Cloudflare Pages Function
             ├─ lee env.GEMINI_API_KEY (secreto)
             ├─ llama a generativelanguage.googleapis.com (server-side)
             └─ devuelve { userText, action }
```

Si falta `GEMINI_API_KEY`, la función responde `503` con un mensaje claro y el chat
muestra "Asesor IA · Próximamente", sin romper la página.

---

## 4. Checklist antes de publicar

- [ ] `npm run build` pasa sin errores.
- [ ] Las calculadoras funcionan sin API key.
- [ ] `GEMINI_API_KEY` configurada como Secret en Cloudflare (Production / Preview).
- [ ] `.env`, `.dev.vars` y `.wrangler` **no** están en git (ya están en `.gitignore`).
