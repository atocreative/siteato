# ATO. — Soluções em Tecnologia Digital

Plataforma web profissional desenvolvida com React 18, TypeScript, Vite e Tailwind CSS.

## Stack Técnico

- **Framework:** React 18 + TypeScript
- **Bundler:** Vite 5.0
- **Styling:** Tailwind CSS 3.3 com paleta customizada
- **Animações:** Framer Motion 10.16
- **Package Manager:** npm/yarn

## Arquitetura

```
src/
├── components/          # Componentes reutilizáveis (Button, Card, etc)
├── sections/           # Seções de página (Hero, Services, Footer, etc)
├── hooks/              # Hooks customizados (useScroll, etc)
├── utils/              # Funções utilitárias e helpers
├── constants/          # Constantes (cores, breakpoints, etc)
├── styles/             # CSS global e temas Tailwind
├── types/              # Interfaces TypeScript
├── App.tsx            # Componente raiz
└── main.tsx           # Entry point
```

## Design System

### Paleta ATO (Neobrutalismo + Flat Design)

```
Primária:       #00D94A (Verde Neon)
Primária Dark:  #00A838
Fundo:          #F8F8F6 (Off-White)
Texto/Bordas:   #0F0F0F (Preto Profundo)
Cinza Neutro:   #F0F0EE

Secundárias:
- Amarelo:      #FFE500
- Laranja:      #FF6B1A
- Azul:         #3B6CF0
- Roxo:         #5C3BF0
- Vermelho:     #E03030
```

### Tipografia

- **Display:** Bebas Neue (headings)
- **Body:** Space Grotesk (conteúdo)
- **Weights:** 300, 400, 500, 600, 700

### Componentes Brutais

- Bordas 2.5px sólidas (#0F0F0F)
- Shadows offset 3px-8px (brutal-sm, brutal, brutal-lg)
- Transitions suaves (100ms)
- Hover states com translate

## Segurança

✓ Proteção nativa XSS (React sanitiza por padrão)  
✓ .env em .gitignore (variáveis sensíveis)  
✓ Sem dangerouslySetInnerHTML  
✓ Inputs sanitizados com validação  

## Performance

✓ Code splitting via Vite  
✓ Lazy loading de imagens/componentes  
✓ CSS purged (Tailwind production)  
✓ Animações GPU-accelerated (Framer Motion)  

## Desenvolvimento

```bash
npm install
npm run dev          # Dev server (http://localhost:3000)
npm run build        # Build production
npm run preview      # Preview build
npm run type-check   # Verificar tipos
```

## Princípios SOLID

- **S**ingle Responsibility: Cada componente tem uma única responsabilidade
- **O**pen/Closed: Componentes abertos para extensão, fechados para modificação
- **L**iskov Substitution: Props e interfaces consistentes
- **I**nterface Segregation: Tipos específicos e mínimos
- **D**ependency Inversion: Props passadas, não dependências globais

## Convenções

- Sem comentários óbvios (código fala por si)
- Nomes descritivos para funções e variáveis
- Path aliases: @components, @sections, @hooks, @utils, @constants, @types, @styles
- TypeScript strict mode ativado

## Últimas Atualizações

- [2025-04-28] Inicialização do projeto com Clean Architecture
