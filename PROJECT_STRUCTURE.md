# 📋 Estrutura Completa do Projeto ATO.

**Projeto:** ATO. — Soluções em Tecnologia Digital  
**Versão:** 1.0.0  
**Stack:** React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion

---

## 📁 Hierarquia de Diretórios

```
websiteato/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── NeoSticker.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── sections/
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Clients.tsx
│   │   ├── Services.tsx
│   │   ├── Steps.tsx
│   │   ├── Team.tsx
│   │   ├── Works.tsx
│   │   ├── CTABanner.tsx
│   │   ├── Marquee.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useScroll.ts
│   │   └── index.ts
│   ├── constants/
│   │   ├── colors.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── sanitize.ts
│   │   └── index.ts
│   ├── styles/
│   │   └── globals.css
│   ├── types.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── index.html
```

---

## 🎨 Design System

### Cores (ATO_COLORS)

```typescript
{
  green: '#00D94A',           // Verde principal (CTA, destaque)
  'green-dark': '#00A838',    // Verde escuro (gradientes, background)
  black: '#0F0F0F',           // Preto profundo (neobrutalismo)
  white: '#F8F8F6',           // Branco principal
  off: '#F0F0EE',             // Cinza claro (background secundário)
  yellow: '#FFE500',          // Amarelo (adesivos)
  orange: '#FF6B1A',          // Laranja (adesivos)
  blue: '#3B6CF0',            // Azul (adesivos)
  purple: '#5C3BF0',          // Roxo (adesivos)
  red: '#E03030'              // Vermelho (adesivos)
}
```

### Tipografia

- **Bebas Neue**: Display, títulos, CTA (héadlines agressivas)
- **Space Grotesk**: Body, paragráfos (legibilidade)

### Breakpoints Personalizados

```typescript
{
  xs: 320,      // Mobile extra-pequeno
  sm: 640,      // Mobile
  md: 960,      // Tablet
  lg: 1200,     // Desktop
  xl: 1400      // Desktop XL
}
```

### Estilos Neobrutalistas

- **Bordas**: `border-brutal` = 2.5px sólida preta
- **Sombras**: 
  - `shadow-brutal` = `5px 5px 0 #0F0F0F`
  - `shadow-brutal-sm` = `3px 3px 0 #0F0F0F`
  - `shadow-brutal-lg` = `8px 8px 0 #0F0F0F`
- **Proporções**: Elementos quadrados com bordas retas e sombras defasadas

---

## 📦 Componentes Reutilizáveis

### `Button.tsx`

Componente de botão com variants e sizes.

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'  // Estilo visual
  size?: 'sm' | 'md' | 'lg'        // Tamanho (padding)
  children: React.ReactNode
}
```

**Variantes:**
- `primary`: Verde com fundo, botão de ação principal
- `outline`: Apenas borda, ações secundárias

**Tamanhos:**
- `sm`: px-4 py-2 (pequeno)
- `md`: px-6 py-3 (médio, padrão)
- `lg`: px-8 py-4 (grande)

---

### `Card.tsx`

Wrapper genérico para cards com variants.

```typescript
interface CardProps extends SectionProps {
  children: React.ReactNode
  variant?: 'default' | 'service' | 'work'
  className?: string
}
```

**Variantes:**
- `default`: Card sem estilo adicional
- `service`: Hover com fundo verde (`hover:bg-ato-green`)
- `work`: Card sem estilo (para portfólio futuro)

**Estrutura:**
- Base: `p-8` padding, classe `card-brutal` (neobrutal)
- Suporta classes customizadas via `className`

---

### `NeoSticker.tsx`

Adesivos neobrutalistas rotativos com cores variadas.

```typescript
interface NeoStickerProps {
  text: string                                    // Texto do adesivo
  color: 'yellow' | 'orange' | 'blue' | 'purple' | 'red'
  size?: 'sm' | 'md' | 'lg'                      // Tamanho
  style?: React.CSSProperties                    // Posicionamento (top, left, etc)
}
```

**Características:**
- Posicionamento absoluto (requer `position: relative` no parent)
- Rotação aleatória entre [-6°, -4°, -3°, -2°, 2°, 3°, 5°]
- Border 4px neobrutal
- Efeito hover: scale 1.08

---

## 🎭 Seções (Página)

### Estrutura de Fluxo

1. **Navigation** — Barra fixa com efeito de scroll
2. **Hero** — Hero section com 3D card e adesivos em órbita
3. **About** (Sobre Nós) — Pilares e stats com texto interativo
4. **Clients** (Quem Confia) — Marquee de clientes + depoimentos
5. **Steps** (Processo) — 5 passos para o sucesso
6. **Services** (Soluções) — Grid 2x2 de serviços
7. **Team** (Quem Somos) — Cards tipo Polaroid dos membros
8. **CTABanner** (Pronto para Crescer) — CTA final
9. **Footer** — Contato, redes sociais, endereço

---

### Navigation.tsx

**Estado:**
- Sempre visível (fixed top-0)
- Transição suave on mount: `y: -80 → 0`

**Responsividade:**
- Estado normal (topo): `h-16 bg-ato-white border-b-[2.5px]`
- Estado scrollado (dark sections): `h-12 bg-ato-black border-b-4`

**Layout:**
- Logo "ATO." — fixado à esquerda
- Links ["Sobre nós", "Soluções", "Contato"] — centralizados com `absolute left-1/2 -translate-x-1/2`
- CTA button — canto direito com `ml-auto`
- Menu mobile (hambúrguer) — visível em md breakpoint

**Animação:**
- Links e botão mudam cor com scroll
- Fonte do logo fica mais grossa no estado scrollado

---

### Hero.tsx

**Layout:**
- Grid 2 colunas em desktop (1 coluna mobile)
- Esquerda: Títulos em 4 linhas (DIGITAL / QUE / CONVERTE / RESULTADOS.)
- Direita: Container 3D com adesivos em órbita

**3D Element:**
- Base: Quadrado branco sólido com border neobrutal
- Centro: Texto "ATO." preto em Bebas Neue
- Efeito: Rotação Y infinita (24s) gerando 3D perspective

**Orbit Stickers:**
5 adesivos posicionados ao redor do 3D card:
- "Digital" (yellow, sm) — topo
- "Dev" (blue, md) — direita-topo
- "Negócios" (orange, sm) — direita-baixo
- "Inovação" (purple, sm) — esquerda-baixo
- "Ágil" (red, md) — esquerda-meio

**Background:**
- Gradiente radial verde: 2 focos divergentes criando efeito de aura

**CTA:**
- Descrição curta + 2 botões (Começar agora / O que fazemos)

---

### About.tsx (Sobre Nós)

**Layout:** Grid 2 colunas

**Coluna Esquerda:**
- Headline: "SOMOS A ATO. SOLUÇÕES DIGITAIS."
- 2 parágrafos explicativos com hover effect:
  - On hover: `y: -8px`, `filter: blur(0.4px)`, `opacity: 1`
- Stats box (3 colunas): 
  - "50+ Projetos entregues"
  - "3x Crescimento médio"
  - "100% Foco em resultado"

**Coluna Direita:**
- 4 pillars (pilares) com cards:
  - "Estratégia antes de tudo"
  - "Tecnologia com propósito"
  - "Resultado no caixa"
  - "Parceria de longo prazo"
- Cards com hover background (`#F0F0EE`)

**Adesivo Global:**
"Social" (blue, sm) — canto superior direito

---

### Clients.tsx (Quem Confia)

**Seção com gradiente:**
`from-ato-green to-ato-green-dark`

**Marquee de Clientes:**
- Array: 8 clientes repetidos 3x para efeito contínuo
- Full-bleed: `-mx-8 md:-mx-10` quebra padding da seção
- Scroll infinito: `animate-scroll-marquee`
- Background preto com bordas neobrutal
- Divisor: "◆" verde entre clientes

**Testimonials:**
- Grid 3 colunas (1 mobile)
- Cards com hover effect:
  - `translate(-8px, -8px)`
  - Sombra aumenta para `16px 16px 0`
- Estrutura: aspas verdes, quote, nome do autor, role, empresa

---

### Services.tsx (Nossas Soluções)

**Grid 2x2:**
4 serviços em layout responsivo

**Cards:**
- Altura mínima: `min-h-[280px]`
- Layout flex column com `justify-between`
- Hover: background verde (`hover:bg-ato-green`)

**Serviços:**
1. **Social Media** — "Gestão semi-automatizada com IA"
2. **Sistemas** — "Sistemas web sob medida"
3. **Sites** — "Sites e landing pages estratégicos"
4. **Apps** — "Aplicações mobile e web"

Cada card contém:
- Número (01-04)
- Nome (Bebas Neue, uppercase)
- Descrição (corpo)
- Tag (background cinza)

**Adesivo Global:**
"Apps" (purple, sm) — canto inferior direito

---

### Steps.tsx (Os 5 Passos)

**Background:** Preto com bordas brancas (`border-y-brutal border-ato-white`)

**Grid 5 Colunas:**
Responsive (1 coluna mobile)

**Passos:**
1. Conversamos
2. Fechamos o Contrato
3. Pré-visualização
4. Aprovação
5. Negócio no ar

Cada step tem:
- Número em verde (opacity 85%)
- Título (Bebas Neue)
- Descrição (opacity 40%)
- Hover: background verde suave

**Adesivo Global:**
"IA" (orange, sm) — canto inferior direito

---

### Team.tsx (A Equipe)

**Layout Polaroid:**
Cards com:
- Rotação aleatória (variação 2-3°)
- Margem top variada para efeito espalhado
- Sombra inicial neobrutal
- Hover: rotação aumenta, eleva, cresce 5% e sombra fica maior

**Membros:**
1. Joao Gabriel — CEO / Strategy + Operations
2. Creative Lead — CCO / Creative + Content
3. Tech Lead — CTO / Backend + Infrastructure
4. Growth Lead — CMO / Growth + Analytics

Cada card:
- Placeholder [foto] (cinza claro)
- Badge com role (verde background)
- Nome em Bebas Neue
- Título (opacity 40%)

---

### CTABanner.tsx (Pronto para Crescer)

**Background:** Gradiente verde `from-ato-green to-ato-green-dark`

**Layout:**
- Texto esquerda (flexibilidade, não grid)
- Seta grande "→" no canto inferior direito (text-[12rem], opacity 5%)

**Conteúdo:**
- Headline grande: "PRONTO PARA CRESCER NO DIGITAL?"
- Descrição
- CTA button (preto com shadow)

**Animação:**
- Entrada on scroll: `opacity: 0 → 1`, `x: -20 → 0`

---

### Footer.tsx

**Grid 3 Colunas** (1 mobile)

**Colunas:**
1. **Conecte-se** — Email contato + redes sociais (IG, LI, WA, YT)
2. **Trabalhe conosco** — CTA para portfólio
3. **Visite-nos** — Endereço em Brasília (Asa Sul)

**Bottom Bar:**
- Logo "ATO."
- Copyright: "© 2025 ATO. Soluções Digitais"
- (Removido: referências a 4P Capital)

---

## 🪝 Hooks Customizados

### `useScroll(threshold?: number): boolean`

```typescript
export function useScroll(threshold: number = 0.7) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * threshold)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return isScrolled
}
```

**Uso:** Detecta scroll além de X% da viewport.
- Default: 70% (para Navigation trigger)
- Usado em: App.tsx → Navigation prop `isFloating`
- Listener passivo para performance

---

### `useScrollPosition(): number`

```typescript
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollY
}
```

**Uso:** Retorna a posição exata do scroll em pixels.
- Listener passivo
- Útil para animações sincronizadas com scroll

---

## 🔧 Utils

### `sanitize.ts`

Funções de validação e sanitização:

**`sanitizeInput(input: string): string`**
- Remove `<>` (XSS prevention)
- Trim
- Uso: Campos de texto genéricos

**`sanitizeEmail(email: string): string`**
- Lowercase
- Trim
- Uso: Campos de email

**`sanitizeUrl(url: string): string`**
- Parse URL
- Valida protocols: `http:` ou `https:`
- Retorna URL se válida, string vazia se não

---

## 🎬 Animações (Framer Motion)

### Padrões Globais

**Container Variants:**
```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}
```

**Item Variants:**
```typescript
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}
```

**Usar com:**
- `motion.div` wrapper
- `initial="hidden"` `animate="visible"` (no mount)
- `whileInView="visible"` `viewport={{ once: true }}` (ao scrollar pra view)

### Específicos

**Hover Efects:**
- Botões: opacity, scale
- Cards: translate(-8px, -8px), sombra aumenta
- Team cards: rotação + translate Y + scale 1.05
- Text: y-offset, blur, opacity

**Navigation:**
- Slide in on mount: y: -80 → 0
- Color transitions on state change

**Hero 3D:**
- Ring banner: rotateY infinito 24s

---

## 📐 Fluxo de Dados

```
main.tsx
  ↓
ReactDOM.render(App)
  ↓
App.tsx
  ├─ useState(isScrolled)
  ├─ useEffect: addEventListener scroll
  │  ├─ isScrolled = window.scrollY > window.innerHeight * 0.7
  │  └─ trigger: Navigation re-render
  ├─ pass isFloating={isScrolled} → Navigation
  └─ render sections in order
    ├─ Navigation(isFloating)
    ├─ Hero
    ├─ About (motion.p hover effects)
    ├─ Clients (marquee loop)
    ├─ Steps (grid hover)
    ├─ Services (grid + cards)
    ├─ Team (polaroid cards)
    ├─ CTABanner (scroll entrance)
    └─ Footer
```

**State Management:**
- Minimal: apenas `isScrolled` em App.tsx
- Componentes locais com useState:
  - Navigation: `menuOpen` (mobile menu)
  - Sem Redux/Context necessário

---

## 🚀 Build & Deploy

### Scripts

```json
{
  "dev": "vite",                          // Dev server local
  "build": "tsc && vite build",          // Build production (type-check + bundle)
  "preview": "vite preview",             // Preview do build
  "type-check": "tsc --noEmit",          // Verificar tipos
  "lint": "eslint src --ext ts,tsx"      // Lint (se ESLint configurado)
}
```

### Output

```
dist/
├── index.html              (843 B, gzip 47%)
├── assets/
│   ├── index-*.css        (17.27 KB, gzip 4.17 KB)
│   ├── index-*.js         (26.25 KB, gzip 8.13 KB)
│   ├── motion-*.js        (105.49 KB, gzip 35.63 KB)
│   └── vendor-*.js        (133.93 KB, gzip 43.12 KB)
```

**Total gzip:** ~91 KB

---

## 📦 Dependências

### Principais

| Pacote | Versão | Uso |
|--------|--------|-----|
| react | ^18.2.0 | Framework |
| react-dom | ^18.2.0 | Renderização |
| framer-motion | ^10.16.4 | Animações |
| tailwindcss | ^3.3.5 | Styling |

### Dev

| Pacote | Versão | Uso |
|--------|--------|-----|
| typescript | ^5.2.2 | Type-checking |
| vite | ^5.0.0 | Build tool |
| @vitejs/plugin-react | ^4.1.0 | React support Vite |
| postcss | ^8.4.31 | CSS transformations |
| autoprefixer | ^10.4.16 | CSS vendor prefixes |

---

## 🎯 Path Aliases

Configurados em `tsconfig.json`:

```json
{
  "@/*": "src/*",
  "@components/*": "src/components/*",
  "@sections/*": "src/sections/*",
  "@hooks/*": "src/hooks/*",
  "@utils/*": "src/utils/*",
  "@constants/*": "src/constants/*",
  "@types": "src/types",
  "@styles/*": "src/styles/*"
}
```

**Exemplos de import:**
```typescript
import Navigation from '@sections/Navigation'
import Button from '@components/common/Button'
import { useScroll } from '@hooks'
import type { Service } from '@types'
import { ATO_COLORS } from '@constants'
```

---

## 🎨 Tailwind Customizações

### Extensões (`tailwind.config.js`)

```javascript
extend: {
  colors: {
    ato: {
      green: '#00D94A',
      'green-dark': '#00A838',
      black: '#0F0F0F',
      white: '#F8F8F6',
      off: '#F0F0EE',
      yellow: '#FFE500',
      orange: '#FF6B1A',
      blue: '#3B6CF0',
      purple: '#5C3BF0',
      red: '#E03030'
    }
  },
  fontFamily: {
    grotesk: ['Space Grotesk', 'sans-serif'],
    bebas: ['Bebas Neue', 'sans-serif']
  },
  borderWidth: {
    brutal: '2.5px'
  },
  boxShadow: {
    brutal: '5px 5px 0 #0F0F0F',
    'brutal-sm': '3px 3px 0 #0F0F0F',
    'brutal-lg': '8px 8px 0 #0F0F0F'
  },
  animation: {
    'scroll-marquee': 'scroll 20s linear infinite'
  },
  keyframes: {
    scroll: {
      '0%': { transform: 'translateX(0)' },
      '100%': { transform: 'translateX(-50%)' }
    }
  }
}
```

---

## 📄 Tipos (types.ts)

```typescript
export interface SectionProps {
  className?: string
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export interface Service {
  id: string
  number: string
  name: string
  description: string
  tag: string
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  title: string
}

export interface Work {
  id: string
  title: string
  category: string
  client: string
  tag: string
  bgColor: string
}
```

---

## 🔍 Pontos-Chave da Arquitetura

### 1. **Modularidade**
- Componentes isolados e reutilizáveis
- Export pattern com `index.ts` (barrel exports)
- Tipos centralizados em `types.ts`

### 2. **Performance**
- Lazy loading potencial com `React.lazy()`
- Listeners passivos no scroll
- Minimal re-renders via React memo (não implementado ainda)
- Framer Motion otimizado (GPU acceleration nativo)

### 3. **Responsividade**
- Mobile-first approach
- Tailwind breakpoints: sm, md, lg, xl
- Flexbox + Grid layouts
- `max-w-*` constraints

### 4. **Acessibilidade**
- Semantic HTML (section, nav, footer)
- Alt text em imagens (implementar se houver)
- Contrast ratios neobrutalistas (branco/preto)
- Focus states em botões (implementar)

### 5. **Type Safety**
- TypeScript strict mode ativado
- Interfaces para todos os props
- Sem `any` types
- Generic components (Button, Card)

### 6. **Design System**
- Cores centralizadas
- Constantes de breakpoints
- Variações de componentes (variants)
- Efeitos consistentes (brutal shadows)

---

## 🚨 Possíveis Melhorias Futuras

1. **State Management** — Migrar para Zustand/Jotai se complexidade aumentar
2. **Form Handling** — React Hook Form + Zod para validações
3. **Image Optimization** — Next.js Image ou @optimize-pictures
4. **Routing** — React Router para múltiplas páginas
5. **Meta Tags** — Helmet.js para SEO
6. **Testing** — Vitest + React Testing Library
7. **Animations** — Mais interatividade com Framer Motion (scroll-triggered)
8. **Accessibility** — ARIA labels, keyboard navigation
9. **Dark Mode** — Toggle com Tailwind dark mode
10. **i18n** — i18next para multi-idioma

---

## 📝 Convenções de Código

### Naming
- Componentes: PascalCase (Navigation.tsx, Hero.tsx)
- Funções/hooks: camelCase (useScroll, sanitizeInput)
- Constantes: SCREAMING_SNAKE_CASE (ATO_COLORS)
- CSS classes: kebab-case (bg-ato-green, border-brutal)

### File Organization
- Exportação via barrel (`index.ts`)
- Uma seção por arquivo
- Componentes comuns em `/common`
- Tipos separados (`types.ts`)

### React Patterns
- Functional components
- Hooks for state (useState, useEffect)
- Framer Motion para animações
- Prop spreading (`...rest`)
- Destructuring em params

---

## 🎯 Objetivo do Projeto

**ATO.** é uma landing page neobrutalista para uma agência de tecnologia que:
- Oferece **sistemas, sites, apps e social media** com IA
- Foca em **resultado financeiro** (faturamento)
- Atende **clínicas, advocacias e negócios em transição digital**
- Usa linguagem **direta, sem jargão**

**Aesthetic:** Neobrutalismo contemporâneo (bordas retas, sombras defasadas, cores altas)

---

**Documento gerado:** 28/04/2026  
**Versão:** 1.0
