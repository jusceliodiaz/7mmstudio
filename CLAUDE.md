# 7mm creative Studio — Contexto do Projeto

> Este arquivo serve como contexto para o Claude trabalhar neste projeto sem começar do zero.

---

## Visão Geral

**Studio:** 7mm creative Studio — experiências digitais para arquitetura e mercado imobiliário  
**URL:** https://7mmstudio.com  
**Stack:** HTML/CSS/JS puro, sem build tools, sem frameworks (exceto Leaflet.js e Three.js via CDN quando necessário)  
**Google Analytics:** `G-3K51DFTX3J` (lazy-loaded via `window.addEventListener('load', ...)` em todas as páginas)

---

## Identidade Visual

### CSS Variables (`:root`) — usadas em `index.html`, `launching-page.html`, `fi-preview.html`
```css
--gold:   #b89c6e;   /* dourado — cor de destaque principal */
--gold-d: #a08860;   /* hover do gold */
--bg:     #080808;   /* fundo global escuro */
--bg-alt: #1e1e1e;   /* fundo seções alternadas */
--text:   #f5f5f5;   /* texto principal */
--muted:  rgba(255, 255, 255, 0.45);
--border: rgba(255, 255, 255, 0.08);
--pad:    10%;        /* padding lateral global */
--radius: 24px;
--ease:   cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

### Tipografia
- `index.html`, `launching-page.html`, `fi-preview.html`: **Inter** (Google Fonts) — pesos 300–800
- `firstperson.html`, `cityexplorer.html`: **DM Sans** (Google Fonts) — pesos 300–600 — carregado via `styles.css`

### Estética geral
- Fundo global: `#080808` — dark em todo o site
- Favicon: `images/fav-icon.png` (arquivo dedicado, não é a logo)
- Logo principal: `images/logo_site2.png` (versão atual — `logo_site.png` está obsoleta)
- Sem `box-shadow` — estética flat
- Accent é sempre `#b89c6e` (dourado) — nunca verde, azul ou roxo

### Contato e redes
- WhatsApp: `https://wa.me/5541992272317`
- E-mail: `escrevaparajd@gmail.com`
- Instagram: `@jdworkviz` — `https://www.instagram.com/jdworkviz/`
- Behance: `firsightstudio`

---

## Mapa de Arquivos

| Arquivo | Descrição |
|---|---|
| `index.html` | Site institucional principal |
| `fi-preview.html` | Hub de demos — gate de acesso + cards para as experiências |
| `launching-page.html` | Demo de Launching Page imobiliária com sequencer, POIs, 360° |
| `firstperson.html` | Tour exterior interativo — archviz com navegação por cenas |
| `cityexplorer.html` | City Explorer — mapa interativo com Leaflet + cenas 360° |
| `styles.css` | CSS compartilhado entre `firstperson.html` e `cityexplorer.html` |
| `script.js` | JS principal do `firstperson.html` |
| `script2.js` | JS auxiliar (provavelmente cidade ou launching) |
| `script-fp.js` | JS adicional para firstperson |
| `scenes.js` | Definição das cenas do firstperson |
| `scenes-fp.js` | Cenas adicionais do firstperson |
| `scenes-city.js` | Definição das cenas do cityexplorer |
| `pois-city.js` | POIs do cityexplorer |

---

# `index.html` — Site Institucional

## Estrutura de Seções

| Seção | ID/Classe | Notas |
|---|---|---|
| Hero | `#hero .hero` | Slideshow de 7 imagens, logo, h1, p, botão WA, hero-nav, hero-tr |
| Web Statement | `.web-statement` | Typewriter animado, fundo `--bg-alt`, grid 2 colunas embaixo |
| Serviços | `#services .section-services` | Bento grid 4×2, fundo `#000`, sem padding |
| CTA + Formulário | `#contact .cta` | Centralizado, fundo `--bg-alt`, botão WA + form Formspree |
| Side Nav | `.side-nav` | Fixo à direita, dots com labels, oculto em mobile `≤768px` |
| Footer | `<footer>` | Centralizado, texto `7mm creative Studio © 2026` |

## Hero

- `height: 100vh`, `flex-direction: column`, `justify-content: flex-end`
- `padding: 0 var(--pad) 168px`
- Slideshow: 7 slides (`.hero-slide`), `h1.webp` carregado com `fetchpriority="high"`, demais lazy com `data-src`
- Intervalo: `5000ms` — troca automática via `setInterval`
- Overlay: `linear-gradient(to top, rgba(0,0,0,0.92), rgba(0,0,0,0.32))`
- Logo: `images/logo_site2.png` — `height: 36px` desktop → `45px` tablet → `35px` mobile
- Animações de entrada (todos começam `opacity: 0`):
  - Logo: `heroFadeUp 0.8s delay 0.25s`
  - H1: `heroFadeUp 0.9s delay 0.45s`
  - Parágrafo: `heroFadeUp 0.9s delay 0.65s`
  - Botão WA: `heroFadeUp 0.8s delay 0.85s`

### Hero Top-Right (`.hero-tr`)
`position: absolute; top: 28px; right: var(--pad)` — contém 3 elementos:
1. Link Instagram (`.ig-link`) — ícone SVG, `44×44px`, `border-radius: 12px`
2. Botão "Testar Demos" (`.btn-demo #btn-demo`) — abre `fi-preview.html` em `_blank`
3. Language switcher (`.lang-switcher`) — botões PT/EN com `active` dourado

### Hero Nav Blocks (`.hero-nav`)
`position: absolute; bottom: 36px; right: var(--pad)` — 2 blocos glassmorphism:
- Block 0: link `#services` — "Serviços"
- Block 1: link `#contact` — "Contato"
- Cada bloco tem barra de progresso (`.hero-nav-bar`) que anima junto com o slideshow
- Oculto em `≤540px`

## Botão WhatsApp (`.btn-wa`)
- `display: inline-flex; gap: 10px; padding: 10px 24px 10px 10px; border-radius: 16px`
- `background: rgba(255,255,255,0.1); backdrop-filter: blur(12px)`
- `border: 1px solid rgba(255,255,255,0.22)`
- Ícone `.btn-wa-icon`: `48×48px; background: var(--gold); border-radius: 10px; color: #000`
- Hover: icon `rotate(12deg) scale(1.12)`, botão `translateY(-3px)`
- SVG do WhatsApp via `<use href="#icon-wa">` — symbol definido no body

## Web Statement (`.web-statement`)
- `background: var(--bg-alt); padding: 120px var(--pad)`
- Texto principal (`.ws-text`): typewriter animado — `clamp(2rem, 3.6vw, 3.2rem)`, `font-weight: 700`
  - Cursor piscante (`.ws-cursor`) — `blink-off` via `setInterval(500ms)`
  - Palavras: controladas por `window._twUpdate(words)` — atualizadas pelo i18n
- Grid inferior (`.ws-sub`): `grid-template-columns: 1fr 1fr; gap: 40px`
  - Ícones dourados `38×38px` com SVG inline
  - Bordas separadas por `border-top: 1px solid var(--border)`

## Serviços (`.section-services`)
- `background: #000; padding: 0; border: none`
- Bento grid (`.services-bento`): `grid-template-columns: repeat(4, 1fr); grid-template-rows: 340px 340px`
- Cards com imagem (`.svc-card`): overlay gradiente `rgba(0,0,0,0.9)→transparent`, hover escurece mais
- Cards especiais dourados (`.svc-card--special`): `background: var(--gold); color: #1a1200`

**Layout das células (desktop 4 colunas):**
| Card | Classe | Posição | Conteúdo |
|---|---|---|---|
| Websites | `.svc-web` | col 1, row 1–2 (alto) | imagem `capa_website.webp/jpg` |
| AI Creative | `.svc-ai` | col 2, row 1 | dourado, badge "IA" |
| Launching Page | `.svc-arch` | col 2, row 2 | imagem `hero/h5.webp` |
| City Explorer | `.svc-real` | col 3, row 1–2 (alto) | imagem `hero/h7.webp` |
| Walkthrough | `.svc-vr` | col 4, row 1 | imagem `hero/h4.webp` |
| Voice Interfaces | `.svc-voz` | col 4, row 2 | dourado, badge "VOZ" |

**Breakpoints responsivos do bento:**
- `769px–1024px`: `repeat(3,1fr)` — `.svc-web` ocupa 2 cols, `.svc-voz` ocupa 3 cols
- `≤768px`: `1fr 1fr` — `.svc-web` e `.svc-voz` ocupam 2 cols
- `≤430px`: rows reduzem para `220px`

## CTA + Formulário (`#contact .cta`)
- `background: var(--bg-alt); text-align: center`
- Botão WA centralizado
- Divisor "ou envie uma mensagem" (`.cf-divider`)
- Form Formspree (`https://formspree.io/f/xeedjkjo`): campos Nome, Telefone, E-mail, Mensagem
  - Honeypot: `name="_gotcha"` oculto
  - Submit assíncrono — botão muda para "Enviando..." → "Mensagem Enviada ✓"
  - Form reset após 4s de sucesso

## Side Nav (`.side-nav`)
- `position: fixed; right: 28px; top: 50%`
- Pills glassmorphism: `backdrop-filter: blur(12px)`
- 3 dots: Início (`#hero`), Serviços (`#services`), Contato (`#contact`)
- Active dourado via `IntersectionObserver` (`rootMargin: "-45% 0px -45% 0px"`)
- Oculto (opacity 0) quando hero está visível
- Oculto (display none) em `≤768px`

## Internacionalização (i18n)
- 3 idiomas: PT, EN, ES
- Atributo `data-i18n="chave"` nos elementos
- `data-i18n-html="true"` para HTML dentro do elemento
- `data-i18n-placeholder="chave"` para placeholders de input
- Estado persistido em `localStorage.setItem('fi-lang', lang)`
- Função global `window._twUpdate(words)` para atualizar o typewriter

## JavaScript inline (`index.html`)
1. **Scroll reveal** — `IntersectionObserver` threshold `0`, desconecta após revelar
2. **Side nav active** — `IntersectionObserver` rootMargin "-45% 0px -45% 0px"
3. **Side nav ocultar no hero** — `IntersectionObserver` threshold `0.1`
4. **Proteção de conteúdo** — `contextmenu` e `dragstart` bloqueados em `img, canvas`
5. **i18n** — aplica traduções, atualiza typewriter, labels do panorama
6. **Btn demo** — `window.open("fi-preview.html", "_blank")`
7. **Formspree** — `submitForm()` assíncrono
8. **Hero slideshow** — `setInterval 5000ms`, lazy-load dos slides, barra de progresso nav
9. **Typewriter** — `window._twUpdate`, cursor piscante, SPEED=60ms, DELETE_SPEED=30ms, PAUSE=2500ms
10. **GA tracking** — `whatsapp_click`, `scroll_50`, `scroll_90`

---

# `fi-preview.html` — Hub de Demos

- **Função:** Gate de acesso + grid de cards para as 4 experiências interativas
- **Fontes:** Inter
- **Estado:** `#gate` visível inicialmente (glassmorphism); após clicar "Entrar" → `#main` aparece
- **Fragmento `#admin`** — rota de volta do `launching-page.html`
- **Lang switcher:** PT/EN — flutuante no `#gate` e fixo na `#main`

**4 Cards de experiências (grid):**
1. **Launching Page** → `launching-page.html`
2. **Tour Exterior** → `firstperson.html`
3. **City Explorer** → `cityexplorer.html`
4. **Configurador de Banheiros** (ou similar) — terceiro/quarto card

---

# `launching-page.html` — Demo Launching Page Imobiliária

- **Função:** Demo de produto para incorporadoras — "Venda antes de construir"
- **Fontes:** Inter
- **Back button:** `href="fi-preview.html#admin"` — volta para o hub

## Estrutura de Seções

| Seção | Descrição |
|---|---|
| Sequencer (`.seq-wrap`) | `height: 100vh` sticky, canvas + video + POIs, botões Aéreo/Living |
| Hero (`.lp-hero`) | `100vh`, imagem `hero/h5.jpg`, badge + h1 + meta + CTAs |
| MidCTA (`.lp-midcta`) | `background: #f7f7f7`, texto grande centralizado |
| Gallery (`#galeria`) | Grid `1fr 1fr / 56vh 56vh` — 3 imagens, card esquerdo ocupa 2 rows |
| Prova/Números (`#pf-numeros`) | `background: #f2f2f0` — 6 cards de stats, strip 3 itens, painel comparação |
| CTA Final (`.lp-cta`) | `background: #111`, centralizado, botão WA + botão ghost |
| Footer (`.lp-footer`) | Linha única |

## Sequencer (`.seq-wrap`)
- `height: 100vh; position: relative` — sticky dentro
- `.seq-sticky`: `position: sticky; top: 0; height: 100vh`
- `#lp-video`: `position: absolute; inset: 0; opacity: 0` → fade in quando ativo
- `.seq-canvas`: `z-index: 2` — canvas para frame sequence
- `.seq-pins`: `z-index: 15` — POIs aéreos e living
- Botões Aéreo/Living (`.seq-scrub-btn`) — pill glassmorphism no topo
  - `.btn-on`: fundo escuro quando ativo

## POIs do Sequencer
- Dois grupos: `data-group="aerial"` e `data-group="living"`
- Visibilidade via `.seq-pins.show-aerial` / `.seq-pins.show-living`
- `.poi-dot`: botão circular branco com `+`, hover dourado
- `.poi-popup`: card `#ebebea` com imagem, título, descrição
- `.poi-popup--simple`: popup sem imagem (versão simplificada para POIs aéreos)
- `.poi-popup-times`: ícone + distância/tempo (POIs de localização)
- **Modal 360°** (`#pano-modal`): abre ao clicar "Ver 360°" no popup do Living
  - Canvas WebGL, room switcher (Quarto/Living/Sacada), hotspots
  - Labels e textos controlados pelo i18n

## Seção Números (`#pf-numeros`)
- CSS injetado inline como `<style>` dentro da `<section>`
- Grid `repeat(3,1fr)` de cards com counters animados (`data-count`, `data-prefix`, `data-suffix`)
- Animação: `easeOutCubic` de 1500ms via `requestAnimationFrame` — dispara quando entra no viewport
- Strip `3×1` de números secundários
- Painel comparativo "Anúncio tradicional" vs "Launching page interativa"

## i18n (`launching-page.html`)
- PT/EN inline no body
- `data-i18n` + `data-i18n-html="true"` nos elementos
- Globals para panorama: `window._panoLoadingText`, `window._panoRoomLabels`

---

# `firstperson.html` — Tour Exterior Interativo

- **Fontes:** DM Sans (via `styles.css`)
- **CSS:** `<link rel="stylesheet" href="styles.css" />`
- **Back button:** `href="index.html"`
- **Assets preload:** `images/seq_arch/aereo_to_piscina_00.jpg`, `images/1.webm`

## Estrutura HTML
```
body
├── .back-btn          → volta para index.html
├── #cursor + #ring    → cursor customizado
├── #noise             → grain texture overlay
├── #stage
│   ├── #main-video    → vídeo loop (muted, playsinline)
│   ├── #seq-canvas    → canvas para frame sequences
│   └── #poi-layer     → POIs dinâmicos
├── #scene-tag         → label da cena atual
├── #track             → barra de navegação (construída pelo JS)
├── #loader            → 3 spans animados
├── #debug-hud         → HUD de debug (hidden por padrão)
└── #cta-dock          → botões "Tour" e "Book a visit"
```

## JavaScript
- `script.js` + `script-fp.js` — lógica principal da experiência
- `scenes.js` + `scenes-fp.js` — definição das cenas (imagens, vídeos, POIs, posições)
- Sequências de frames em `images/seq_arch/` (JPGs zero-padded)
- Vídeos: `images/1.webm`, `images/3.webm`, `images/k_loop.webm`, `images/j_loop.webm`, `images/l_loop.webm`

## Assets de Sequência (`images/seq_arch/`)
- `aereo_to_piscina_00.jpg` → `_47.jpg` (48 frames)
- Outros prefixos conforme definido em `scenes.js`

---

# `cityexplorer.html` — City Explorer

- **Fontes:** DM Sans (via `styles.css`)
- **CSS:** `styles.css` + `leaflet.css` (CDN `unpkg.com/leaflet@1.9.4`)
- **Back button:** similar ao firstperson
- **Assets preload:** `images/seq_arch/est_00.jpg`, `images/dia_low.webm`

## Dependências extras
- **Leaflet.js 1.9.4** via CDN — mapa interativo
- JS: `scenes-city.js` + `pois-city.js`

## Componentes específicos
- `.city-popup`: card `#ebebea` fixo `position: fixed`, `width: 300px`
  - `.popup-img-wrap`: `cursor: grab` — imagem arrastável
  - Fecha com `.popup-close-btn`
- Mapa Leaflet — tiles, marcadores de POI, integração com cenas

---

# `styles.css` — Estilos Compartilhados

Usado por `firstperson.html` e `cityexplorer.html`. Contém:
- Reset e base
- Cursor customizado (`#cursor`, `#ring`)
- `#noise` (grain overlay)
- `#stage`, `#track`, `#scene-tag`, `#loader`
- `.back-btn`
- POI layer styles
- Breakpoints mobile

---

## Padrões a Seguir

- Antes de editar qualquer arquivo, **ler o trecho com Read** para pegar a string exata com indentação
- Injetar CSS novo no final do bloco `<style>`, antes de `</style>`
- Usar seletores mais específicos ou `!important` somente quando comprovadamente necessário
- `--pad: 10%` é o padrão — não alterar sem necessidade
- Não remover gradientes dos overlays de cards e hero
- Não usar `box-shadow` — estética flat
- Não trocar DM Sans por Inter em `firstperson.html` e `cityexplorer.html`
- Logo é `logo_site2.png` — `logo_site.png` está obsoleta

## Padrões a Evitar

- Não usar fontes além de Inter (site/preview) ou DM Sans (firstperson/city)
- Não usar accent verde, azul ou roxo — accent sempre `#b89c6e`
- Não alterar o `data-lang` / `data-i18n` sem atualizar os 3 dicionários (PT, EN, ES em index; PT, EN em launching e fi-preview)
- Não usar `factoryinteractive.html` — arquivo não existe mais
- Não referenciar `logo_site.png` — usar `logo_site2.png`
- Não referenciar `bath-config.html` — arquivo não existe mais no projeto

---

## SEO (padrão em todas as páginas)

- `<title>`, `<meta description>`, `<meta keywords>`, `<meta robots>`, `<link canonical>`
- Open Graph completo: type, url, title, description, image (1200×630), locale, site_name
- Twitter Card: `summary_large_image`
- Favicon: `images/fav-icon.png`
- JSON-LD `ProfessionalService` (apenas em `index.html`)

---

*Atualizado em 10/06/2026 — refletor completo do estado atual do projeto*
