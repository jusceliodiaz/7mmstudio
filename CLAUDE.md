# Factory Interactive — Contexto do Projeto

> Este arquivo serve como contexto para o Claude trabalhar neste projeto sem começar do zero.

---

## Sobre o Projeto

**Projeto:** Site de portfólio da Factory Interactive — studio criativo especializado em experiências digitais para arquitetura e mercado imobiliário  
**Arquivo principal:** `factoryinteractive.html` (one-page, HTML/CSS/JS puro, sem build tools, sem frameworks)  
**Objetivo:** Site dark/premium para atrair arquitetos, incorporadoras e empreendimentos de alto padrão

---

## Identidade Visual

### CSS Variables (`:root`)
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
- **Tudo:** `Inter` (Google Fonts) — pesos 300, 400, 500, 600, 700, 800

### Estética
- Fundo global: `#080808` — todo o site é dark
- Seção Serviços: `var(--bg-alt)` = `#1e1e1e`
- Seção CTA "Iniciar Projeto": `var(--bg-alt)` = `#1e1e1e`
- Slide de encerramento do portfólio horizontal: `#f7f7f7` (exceção clara)
- Sem custom cursor, sem scrollbar customizada
- Logo: `images/logo_site.png` (arquivo local)

---

## Estrutura de Seções (ordem no HTML)

| Seção | Classe/Tag | Notas |
|---|---|---|
| Hero | `<section class="hero">` | Vídeo full-bleed, logo, h1, parágrafo, botão WA |
| Portfólio horizontal | `<div class="ph-wrap">` | Scroll horizontal fixo, 300vh de altura |
| Serviços | `<section class="section-services">` | Grid 6 cards, fundo `--bg-alt` |
| Portfólio 2×2 | `<section class="section-portfolio">` | Grid full-width sem padding |
| CTA | `<section class="cta">` | Centralizado, fundo `--bg-alt` |
| Footer | `<footer>` | Linha única centralizada |

---

## Componentes Principais

### Hero
- `height: 100vh`, `flex-direction: column`, `justify-content: center`
- Vídeo: `images/SHOWREEL.mp4` — `autoplay muted loop playsinline`
- Overlay: `linear-gradient(to top, rgba(0,0,0,0.92), rgba(0,0,0,0.32))`
- Logo: `images/logo_site.png` — `height: 140px; width: auto; align-self: flex-start`
- Botão WA: `.btn-wa` — borda branca translúcida, ícone dourado `.btn-wa-icon` (`border-radius: 10px`)
- **Animações de entrada com delays escalonados:**
  - Logo: `heroFadeDown 0.8s delay 0.25s`
  - H1: `heroFadeUp 0.9s delay 0.45s`
  - Parágrafo: `heroFadeUp 0.9s delay 0.65s`
  - Botão WA: `heroFadeUp 0.8s delay 0.85s`

### Botão WhatsApp (`.btn-wa`)
- `display: inline-flex; align-items: center; gap: 10px`
- `padding: 10px 24px 10px 10px; border-radius: 16px`
- `border: 1px solid rgba(255,255,255,0.18)`
- Ícone `.btn-wa-icon`: `48×48px; background: var(--gold); border-radius: 10px; color: #000`
- Hover: icon rotaciona `rotate(12deg) scale(1.12)`, botão sobe `translateY(-3px)`
- Link: `https://wa.me/5541987831394`

### Portfólio Horizontal (`.ph-wrap`)
- `height: 300vh` — scroll vertical converte em horizontal via JS
- `.ph-sticky`: `position: sticky; top: 0; height: 100vh; overflow: hidden`
- `.ph-track`: `display: flex; gap: 16px; will-change: transform`
- **Slide de texto** (`.ph-slide-text`): `width: 38vw !important; background: var(--gold) !important`
- **Slides de imagem** (`.ph-slide`): `width: 42vw`
- **Slide de encerramento** (`.ph-slide-end`): `width: 50vw !important; background: #f7f7f7 !important; color: #111`
- **Barra de progresso** (`.ph-progress-bar`): criada via JS, `height: 2px; background: var(--gold)` na base
- **JS:** `maxX = track.scrollWidth - viewport.offsetWidth` (cálculo correto para evitar espaço em branco extra)
- Projetos: LA TERROIR (Camila Dirani, 2026), ITAPORÃ (Eduardo Rabachini, 2025), MODUS CONSULTING (Miami FL, 2026)

### Serviços (`.section-services`)
- `background: var(--bg-alt)` — `#1e1e1e`
- Título H2: `color: var(--gold)`
- Grid: `grid-template-columns: repeat(6, 1fr); gap: 16px`
- Cards regulares (`.card`): `background: #121212; border-radius: var(--radius); padding: 36px`
  - Imagem no topo: `.card-img` — `height: 200px`, crop `object-fit: cover`
  - Número dourado, H3 branco, parágrafo `rgba(255,255,255,0.56)`, tags com borda
  - Hover: `translateY(-6px)`, borda dourada, imagem `scale(1.06)`
- Cards especiais (`.card-special`): `background: var(--gold); color: #1a1200` — **sem imagem**
  - Badge (`.card-special-badge`): pill escuro com texto "IA" ou "VOZ"
  - Tags (`.tag.tag-special`): `color: #3a3a3a; border-color: rgba(26,18,0,0.18)`

**Ordem dos 6 cards:**
1. Websites & Landing Pages (regular, com imagem)
2. Geração de Imagem por AI (especial dourado, badge "IA")
3. Archviz (regular, com imagem)
4. Realtime & Unreal Engine (regular, com imagem)
5. Navegação por Voz (especial dourado, badge "VOZ")
6. VR & AR (regular, com imagem)

### Portfólio 2×2 (`.section-portfolio`)
- `padding: 0; border-bottom: none`
- Grid: `grid-template-columns: 1fr 1fr; grid-template-rows: 60vh 60vh; gap: 3px`
- Cada card: `position: relative; overflow: hidden`
- Overlay: `linear-gradient(to top, rgba(0,0,0,0.82), transparent 52%)`
- Hover: imagem `scale(1.05)`, info sobe `translateY(0)`

**Projetos:**
| Projeto | Tipo | Local | Ano |
|---|---|---|---|
| Modus Consulting | Website | Miami — FL | 2026 |
| Dancon Empreendimentos | Landing Page | Curitiba — PR | 2025 |
| Baterias Samuka | Landing Page | Londrina — PR | 2025 |
| Solicita Licitações | Website | Brasil — Nacional | 2025 |

### CTA (`.cta`)
- Centralizado, `background: var(--bg-alt)`
- H2 + parágrafo + `.btn-wa` centralizado

### Footer
- `display: flex; justify-content: center`
- Texto: `Factory Studio © 2026 · Todos os direitos reservados.`
- `font-size: 0.82rem; color: var(--muted)`

---

## JavaScript (inline no `<body>`)

1. **Portfólio horizontal scroll** — converte scroll vertical em `translateX` no `.ph-track`, atualiza `.ph-progress-bar`
2. **Scroll reveal** — `IntersectionObserver` em `.reveal` → adiciona `.visible` (threshold 0.1), desconecta após revelar

---

## Animações

### Hero (CSS keyframes)
```css
@keyframes heroFadeUp   { to { opacity: 1; transform: translateY(0); } }
@keyframes heroFadeDown { to { opacity: 1; transform: translateY(0); } }
```
Elementos começam `opacity: 0` e animam para visíveis com delays escalonados.

### Scroll Reveal
```css
.reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.75s var(--ease), transform 0.75s var(--ease); }
.reveal.visible { opacity: 1; transform: translateY(0); }
.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.22s; }
.reveal-delay-3 { transition-delay: 0.34s; }
```

---

## SEO

- `<title>`, `<meta name="description">`, `<meta name="keywords">`, `<meta name="robots">`, `<link rel="canonical">`
- Open Graph completo (og:type, og:url, og:title, og:description, og:image, og:locale, og:site_name)
- Twitter Card (`summary_large_image`)
- JSON-LD Schema (`ProfessionalService`) com nome, telefone, e-mail, endereço, sameAs
- Favicon: `images/logo_site.png`

---

## Contato

- WhatsApp: `https://wa.me/5541987831394` (+55 41 99227-2317)
- E-mail: firsightstudio@gmail.com
- Instagram: @umdesignerchato
- Behance: firsightstudio

---

## Como Trabalhar com Este Arquivo

### Edição via Edit tool (preferencial)
Usar o Edit tool diretamente. Antes de editar, sempre ler o trecho com Read para pegar a string exata incluindo indentação.

### Injetar CSS novo
Adicionar como override no final do bloco `<style>`, antes de `</style>`. Usar seletores mais específicos ou `!important` se necessário para vencer a cascata.

### Especificidade CSS importante
- `.card-special` e `.card` têm mesma especificidade → `.card-special` deve vir depois no CSS ou usar seletor mais específico
- `.tag.tag-special` (dois seletores) supera `.tag` (um seletor) — usar essa forma para overrides de tag

---

## Padrões a Evitar

- Não usar fontes além de Inter
- Não usar accent verde, azul ou roxo — accent é `#b89c6e` (dourado)
- Não adicionar `box-shadow` — estética flat
- Não alterar `--pad: 10%` sem necessidade
- Não remover o gradiente escuro dos cards de portfólio
- Não calcular `maxX` como `viewport.offsetWidth * (n-1)` — usar `track.scrollWidth - viewport.offsetWidth`
- Não usar `!important` desnecessariamente — só em overrides de especificidade igual comprovada

---

## Próximos Passos Possíveis

- [ ] Imagens reais nos cards (mockups dos projetos)
- [ ] Lightbox nos projetos do portfólio 2×2
- [ ] Versão mobile revisada (portfólio horizontal, grid de serviços)
- [ ] Formulário de contato (Formspree)
- [ ] Favicon dedicado (além da logo)

---

*Atualizado em 15/05/2026 — pós refactor completo do `factoryinteractive.html`*

---
---

# Configurador de Banheiros — `bath-config.html`

> Página interativa standalone para configuração visual de materiais de banheiro. HTML/CSS/JS puro, sem frameworks, com Three.js via CDN.

---

## Sobre o Arquivo

**Arquivo:** `bath-config.html`  
**Tipo:** SPA one-page, `overflow: hidden`, sem scroll de página  
**Dependências:** Three.js `0.160.0` (CDN), Inter (Google Fonts), Google Analytics `G-3K51DFTX3J`  
**Objetivo:** Experiência imersiva de configuração de materiais — o usuário escolhe piso, torneira e pia visualizando as opções via esferas 3D e animações de transição no stage

---

## CSS Variables (`:root`)

```css
--ink:   #0d0d0b;   /* fundo global — mais escuro que o --bg do site principal */
--warm:  #c8a96e;   /* dourado — equivale ao --gold do site principal */
--muted: #7a7568;   /* texto secundário */
--ease:  cubic-bezier(0.87, 0, 0.13, 1);  /* ease mais dramático que o do site */
```

> A paleta é compatível com o site principal mas usa nomes diferentes. `--warm` = `--gold`.

---

## Estrutura HTML (camadas z-index)

| Elemento | ID/Classe | z-index | Descrição |
|---|---|---|---|
| Stage (fundo) | `#stage` | — | `position: fixed; inset: 0` — imagem de fundo full-viewport |
| POIs | `.poi` | 9 | Marcadores flutuantes posicionados em `%` da viewport |
| Track | `#track` | 10 | Barra de navegação inferior em pill, `opacity: 0` → `.show` |
| Option Panel | `#option-panel` | 30 | Painel flutuante acima do track, `opacity: 0` → `.open` |
| POI Popups | `.poi-popup` | 50 | Cards de info, aparecem ao clicar nos POIs |
| Cover | `#cover` | 100 | Tela de entrada, some ao clicar "Explorar" |
| Cursor | `#cursor`, `#ring` | 9998–9999 | Cursor customizado (oculto em touch) |

---

## Fluxo de Estado

```
cover visível (cur = -1)
    ↓ clique em "Explorar" → startExperience()
track aparece + option-panel abre + cur = 0
    ↓ clique em botão do track → jumpTo(idx) + openPanel(idx)
troca de cenário: cur atualizado, POIs visíveis trocam, panel atualiza título e esferas
```

**Estado principal:** `let cur = -1` — índice do cenário ativo (-1 = cover)

---

## Cenários (PTS)

```js
const PTS = [
  { id: "piso",     label: "Piso",      sub: "Floor Tile"                  },  // idx 0
  { id: "torneira", label: "Torneira 1", sub: "Wall-mounted Washbasin Taps" },  // idx 1
  { id: "pia",      label: "Pia",        sub: "Bathroom Sink"               },  // idx 2
];
```

---

## Option Panel (`#option-panel`)

- `position: fixed; bottom: 130px; left: 50%` — centralizado, flutua acima do track
- `width: min(520px, 92vw)` — responsivo
- Background: `rgba(255,255,255,0.18)` + `backdrop-filter: blur(48px) saturate(2) brightness(1.35)` — glass light
- Estado: `opacity: 0; pointer-events: none` → `.open { opacity: 1; pointer-events: auto }`
- Transição de entrada: spring `cubic-bezier(0.34,1.4,0.64,1)` com `translateY(24px→0)`
- **Abre automaticamente** ao iniciar a experiência (`startExperience()` → `openPanel(0)`)
- Mobile (`≤600px`): `bottom: 110px`, canvas reduz para `140px`

### Estrutura interna do painel

```
#option-panel
├── #panel-header
│   ├── #panel-category  ("Configurador" — fixo, dourado)
│   └── #panel-title     (nome do cenário atual — atualizado pelo JS)
│   └── #panel-close     (botão ×)
├── #panel-canvas-wrap   (170px height)
│   └── #option-canvas   (canvas Three.js)
└── #sphere-labels       (grid 3 colunas — rótulos clicáveis)
    ├── .sphere-label[data-idx="0"]
    ├── .sphere-label[data-idx="1"]
    └── .sphere-label[data-idx="2"]
```

---

## Three.js — Esferas de Opção

**Instanciado uma única vez** (`threeReady` flag). Reutilizado entre cenários.

| Elemento | Configuração |
|---|---|
| Renderer | `WebGLRenderer`, `alpha: true`, `pixelRatio min(dpr, 2)` |
| Camera | `PerspectiveCamera(42°)`, `position.z = 7.5` |
| Tone mapping | `ACESFilmicToneMapping`, exposure `1.2` |
| Geometry | `SphereGeometry(1, 64, 64)` — compartilhada entre as 3 esferas |
| Seleção | `TorusGeometry(1.28, 0.045)` dourado ao redor da esfera ativa |
| Posições X | `[-2.4, 0, 2.4]` — 3 esferas horizontais |

**Luzes:**
- Ambient `0xffffff` intensity `1.2`
- Key `0xffffff` intensity `2.8` pos `(3,4,5)`
- Fill `0xd0e8ff` intensity `0.8` pos `(-4,2,3)`
- Rim `0xffe8c0` intensity `0.6` pos `(0,-3,-4)`

**Loop de animação (`useFrame` equivalente):**
- Cada esfera rota `+0.006` rad/frame em Y
- Esfera selecionada: `scale 1.12` + bob senoidal Y
- Esfera hover: `scale 1.06`
- Lerp suave: `mesh.scale.lerp(target, 0.1)`
- Loop pausa ao fechar o painel (`stopThreeLoop`)

---

## OPTIONS — Materiais PBR por Cenário

```js
const OPTIONS = {
  0: [ // Piso — Floor Tile
    { label: "Mármore Branco", color: 0xf0ece4, roughness: 0.12, metalness: 0.04 },
    { label: "Porcelanato",    color: 0xc4b49a, roughness: 0.28, metalness: 0.02 },
    { label: "Ardósia",        color: 0x6a6460, roughness: 0.88, metalness: 0.0  },
  ],
  1: [ // Torneira — Wall-mounted Taps
    { label: "Cromado",   color: 0xbecad2, roughness: 0.04, metalness: 0.98 },
    { label: "Dourado",   color: 0xc8a96e, roughness: 0.08, metalness: 0.90 },
    { label: "Preto Mat", color: 0x1c1c1c, roughness: 0.88, metalness: 0.12 },
  ],
  2: [ // Pia — Bathroom Sink
    { label: "Louça",    color: 0xfafaf8, roughness: 0.08, metalness: 0.0  },
    { label: "Pedra",    color: 0x9c9088, roughness: 0.82, metalness: 0.0  },
    { label: "Concreto", color: 0x706e68, roughness: 0.92, metalness: 0.05 },
  ],
};
```

Cada opção pode receber `texture: "caminho.jpg"` para usar `TextureLoader` em vez de só cor PBR.

---

## Animação de Frame Sequence — Stage

Ao selecionar uma opção no cenário **Piso**, o `#stage` (fundo) é animado por uma sequência de imagens pré-carregadas.

### Constantes

```js
const STAGE_DEFAULT = 'images/conf/capa_config.jpg';  // estado inicial
const SEQ_PREFIX    = 'images/conf/piso1_to_piso2_';  // prefixo dos frames
const SEQ_COUNT     = 54;   // frames 00 a 53
const SEQ_FPS       = 30;   // velocidade de reprodução
```

### Nomes dos arquivos

`images/conf/piso1_to_piso2_00.jpg` → `images/conf/piso1_to_piso2_53.jpg`  
Número sempre zero-padded: `padN(n)` → `String(n).padStart(2, '0')`

### Comportamento

| Ação do usuário | Direção da animação |
|---|---|
| Clica em **Mármore Branco** (idx 0) | Forward: frame 00 → 53 (piso1 → piso2) |
| Clica em qualquer outra opção de piso | Reverse: frame 53 → 00 (piso2 → piso1) |
| Abre o painel Piso pela primeira vez | Preload silencioso dos 54 frames |

**Preload:** feito via `new Image()` lazy (`loadSeq()` — chamado uma vez, resultado cacheado em `seqFrames`)  
**Render:** `requestAnimationFrame` com controle de tempo por `dur = 1000 / fps`  
**Stage update:** `stage.style.background = url(...) center/cover no-repeat` (inline sobrescreve CSS)

### Funções principais

| Função | Responsabilidade |
|---|---|
| `loadSeq()` | Cria array de `Image` com todos os frames; retorna cache se já carregado |
| `playStageFrames(frames, fps)` | Cancela animação anterior e inicia nova loop de frames no stage |
| `selectSphere(idx)` | Atualiza seleção visual + dispara frame animation se `currentPanelConfig === 0` |

---

## POIs (Points of Interest)

Marcadores flutuantes posicionados em `%` da viewport. Visíveis apenas no cenário ativo.

- Criados dinamicamente em `buildPOIs()` e appendados ao `<body>`
- `.hidden`: `opacity: 0; pointer-events: none; scale: 0.5`
- Clique no `.poi-btn` → abre `.poi-popup` correspondente
- Fechar: botão ×, clique fora, `Escape`

**Estrutura de dados (`POIS`):**
```js
{ id, label, x, y,   // posição em % da viewport
  tag, title, desc,  // conteúdo do popup
  img }              // null = placeholder "Imagem em breve"
```

---

## Track (Barra de Navegação)

- Criado dinamicamente em `buildTrack()` a partir do array `PTS`
- `opacity: 0` por padrão → `.show` após `startExperience()`
- Botão ativo: `background: #c8a96e; border-color: #c8a96e; color: #1a1200`
- Mobile `≤600px`: `.t-pt-sub` (`font-size: 9px`) é ocultado

---

## Cover (`#cover`)

- Tela inicial com glassmorphism: `backdrop-filter: blur(28px) saturate(1.6)`
- Animação de entrada: `coverIn 1s` — `translateY(20px) scale(.97) → normal`
- Botão "Explorar" → `startExperience()` → `display: none` no cover
- Mobile `≤480px`: padding reduzido (`40px 28px 36px`)

---

## Assets do Configurador

| Arquivo | Uso |
|---|---|
| `images/conf/capa_config.jpg` | Background inicial do `#stage` |
| `images/conf/piso1_to_piso2_00.jpg` … `_53.jpg` | Sequência de animação Mármore Branco |

> Extensão dos frames: `.jpg`, zero-padded 2 dígitos, diretório `images/conf/`

---

## Padrões a Evitar (bath-config específico)

- Não usar `display: none` para esconder o cover na transição — o código atual usa isso corretamente (sem fade), não "melhorar" para `opacity` sem testar o z-index
- Não chamar `initThree()` fora de `openPanel()` — a função tem guarda `threeReady` mas o canvas precisa ter dimensões reais para o renderer
- Não calcular `maxX` para o stage — o stage é `fixed; inset: 0`, sem scroll
- Não compartilhar o `THREE.BufferGeometry` entre instâncias com `.dispose()` fora do ciclo de vida correto — a geo é shared entre as 3 esferas intencionalmente
- Não usar `backdrop-filter` em mobile sem o fallback `background: rgba(..., 0.97)` — já está no `@media (hover: none)`
- Não alterar `SEQ_FPS` acima de 30 sem verificar se os frames existem na taxa correta

---

## Próximos Passos Possíveis (bath-config)

- [ ] Sequências de frame para Torneira (cromado ↔ dourado ↔ preto) e Pia
- [ ] Texturas PBR reais nas esferas (`opt.texture` já suportado)
- [ ] Imagens reais nos POI popups (`poi.img`)
- [ ] Conteúdo real dos POIs (label, title, desc dos materiais)
- [ ] Transição suave do stage ao trocar de cenário (Piso → Torneira → Pia)
- [ ] Versão mobile revisada do option-panel

---

*Atualizado em 02/06/2026 — documentação inicial de `bath-config.html`*
