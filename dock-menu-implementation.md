# Implementação do Dock Menu — ExpandableTabs

## Contexto

O menu inferior atual (`cityexplorer.html`) é um dock glassmorphism com 5 cenas de navegação + separador + botão Entorno (mapa). Precisa ser reimplementado como componente React usando o `ExpandableTabs` abaixo.

### Itens atuais e mapeamento de ícones Lucide

| ID | Label atual | Ícone Lucide |
|---|---|---|
| `aereo` | Panorâmica | `Globe` |
| `pool` | Estacionamento | `ParkingSquare` |
| `jardim` | Prédio | `Building2` |
| `living` | Hall | `DoorOpen` |
| `kitchen` | Parque | `Trees` |
| — | *(separator)* | `type: "separator"` |
| `entorno` | Entorno | `Map` |

---

## Setup do projeto

### 1. Requisitos

O projeto precisa de **Next.js 14+ com App Router**, **TypeScript**, **Tailwind CSS** e **shadcn/ui**.

```bash
# Se ainda não tem o projeto criado:
npx create-next-app@latest my-app --typescript --tailwind --app
cd my-app

# Inicializa shadcn
npx shadcn@latest init
```

Quando o shadcn perguntar, escolha:
- Style: **Default**
- Base color: **Neutral**
- CSS variables: **Yes**

### 2. Estrutura de pastas obrigatória

O shadcn exige `/components/ui/` para funcionar com o alias `@/components/ui/...`. Se não existir:

```bash
mkdir -p components/ui
```

### 3. Instalar dependências externas

```bash
npm install framer-motion usehooks-ts lucide-react
```

---

## Arquivos a criar

### `/components/ui/expandable-tabs.tsx`

```tsx
"use client";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Tab {
  title: string;
  icon: LucideIcon;
  type?: never;
}
interface Separator {
  type: "separator";
  title?: never;
  icon?: never;
}
type TabItem = Tab | Separator;

interface ExpandableTabsProps {
  tabs: TabItem[];
  className?: string;
  activeColor?: string;
  onChange?: (index: number | null) => void;
}

const buttonVariants = {
  initial: { gap: 0, paddingLeft: ".5rem", paddingRight: ".5rem" },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 };

export function ExpandableTabs({
  tabs,
  className,
  activeColor = "text-primary",
  onChange,
}: ExpandableTabsProps) {
  const [selected, setSelected] = React.useState<number | null>(null);
  const outsideClickRef = React.useRef(null);

  useOnClickOutside(outsideClickRef, () => {
    setSelected(null);
    onChange?.(null);
  });

  const handleSelect = (index: number) => {
    setSelected(index);
    onChange?.(index);
  };

  const Separator = () => (
    <div className="mx-1 h-[24px] w-[1.2px] bg-border" aria-hidden="true" />
  );

  return (
    <div
      ref={outsideClickRef}
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-2xl border bg-background p-1 shadow-sm",
        className
      )}
    >
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <Separator key={`separator-${index}`} />;
        }
        const Icon = tab.icon;
        return (
          <motion.button
            key={tab.title}
            variants={buttonVariants}
            initial={false}
            animate="animate"
            custom={selected === index}
            onClick={() => handleSelect(index)}
            transition={transition}
            className={cn(
              "relative flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-300",
              selected === index
                ? cn("bg-muted", activeColor)
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon size={20} />
            <AnimatePresence initial={false}>
              {selected === index && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="overflow-hidden"
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}
```

---

### `/components/city-dock.tsx`

Este é o componente de uso específico do projeto, com os itens do menu mapeados.

```tsx
"use client";
import { Globe, ParkingSquare, Building2, DoorOpen, Trees, Map } from "lucide-react";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";

// Mapeamento: index do tab → id da cena (mesma ordem do array tabs)
const SCENE_MAP: Record<number, string> = {
  0: "aereo",    // Panorâmica
  1: "pool",     // Estacionamento
  2: "jardim",   // Prédio
  3: "living",   // Hall
  4: "kitchen",  // Parque
  // index 5 = separator (ignorado)
  6: "entorno",  // Entorno — abre o mapa, não navega para cena
};

interface CityDockProps {
  onSceneChange?: (sceneId: string) => void;
  onEntornoOpen?: () => void;
}

export function CityDock({ onSceneChange, onEntornoOpen }: CityDockProps) {
  const tabs = [
    { title: "Panorâmica",     icon: Globe         },
    { title: "Estacionamento", icon: ParkingSquare  },
    { title: "Prédio",         icon: Building2      },
    { title: "Hall",           icon: DoorOpen       },
    { title: "Parque",         icon: Trees          },
    { type: "separator" as const },
    { title: "Entorno",        icon: Map            },
  ];

  const handleChange = (index: number | null) => {
    if (index === null) return;
    const sceneId = SCENE_MAP[index];
    if (!sceneId) return;
    if (sceneId === "entorno") {
      onEntornoOpen?.();
    } else {
      onSceneChange?.(sceneId);
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10">
      <ExpandableTabs
        tabs={tabs}
        onChange={handleChange}
        activeColor="text-foreground"
        className="
          bg-white/20 backdrop-blur-xl backdrop-saturate-150
          border-white/40 shadow-[0_0_0_0.5px_rgba(255,255,255,0.5)_inset,0_20px_60px_rgba(0,0,0,0.25)]
          rounded-[20px] px-1 py-[10px] gap-[6px]
        "
      />
    </div>
  );
}
```

---

## Como usar na página

```tsx
// app/city-explorer/page.tsx (ou onde o visualizador fica)
import { CityDock } from "@/components/city-dock";

export default function CityExplorerPage() {
  const handleSceneChange = (sceneId: string) => {
    // Chama o sistema de navegação de cenas existente
    console.log("Navegar para:", sceneId);
    // Ex: navigateTo(sceneId)  ← mesma função do script.js atual
  };

  const handleEntornoOpen = () => {
    // Abre o modal de mapa
    console.log("Abrir mapa Entorno");
    // Ex: openMapModal()  ← função já existente
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#0d0d0b]">
      {/* ... resto do visualizador ... */}
      <CityDock
        onSceneChange={handleSceneChange}
        onEntornoOpen={handleEntornoOpen}
      />
    </main>
  );
}
```

---

## Ajustes de estilo para combinar com o dock atual

O dock atual usa glassmorphism escuro (`rgba(255,255,255,0.22)` de fundo, borda `rgba(255,255,255,0.45)`). O `ExpandableTabs` usa classes shadcn (`bg-background`, `bg-muted`). Para combinar, adicione no `globals.css`:

```css
/* Sobrescreve as vars shadcn para o tema dark do cityexplorer */
:root {
  --background: 0 0% 100%;
  --foreground: 20 14.3% 4.1%;
  --muted: 60 4.8% 95.9%;
  --muted-foreground: 25 5.3% 44.7%;
  --border: 20 5.9% 90%;
  --primary: 24 9.8% 10%;
}

/* Versão dark para o visualizador imersivo */
.dark-dock {
  --background: 255 255 255 / 0.18;
  --muted: 255 255 255 / 0.12;
  --border: 255 255 255 / 0.35;
  --foreground: 255 255 255;
  --muted-foreground: 255 255 255 / 0.55;
}
```

E aplique `className="dark-dock"` no wrapper do `CityDock`.

---

## Comportamento esperado

- **Click num item de cena** → label expande com animação spring → `onSceneChange` chamado com o ID → label recolhe ao clicar fora
- **Click em Entorno** → mesmo comportamento visual + `onEntornoOpen` chamado → abre modal do mapa
- **Click fora do dock** → item ativo deseleciona (via `useOnClickOutside`)
- **Separador** → linha vertical fina entre as cenas e o botão Entorno (mesmo visual do separador atual)

---

## Checklist de implementação

- [ ] `npx shadcn@latest init` executado
- [ ] `npm install framer-motion usehooks-ts lucide-react` instalado
- [ ] `/components/ui/expandable-tabs.tsx` criado
- [ ] `/components/city-dock.tsx` criado com os 7 itens mapeados
- [ ] `CityDock` inserido na página com os callbacks corretos
- [ ] Testar expansão de cada tab e animação de recolhimento
- [ ] Verificar `ParkingSquare` disponível na versão do lucide-react instalada (alternativa: `SquareParking` em versões mais recentes)
