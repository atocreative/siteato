// Prova direta: dependências sem vulnerabilidade alta/crítica e arquitetura de CSS correta.
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const root = process.cwd()
let failures = 0
const check = (label, ok, extra = '') => {
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${label}${extra ? ` — ${extra}` : ''}`)
  if (!ok) failures++
}

// 1. npm audit
const audit = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['audit', '--json'], {
  cwd: root,
  encoding: 'utf8',
  shell: process.platform === 'win32',
})
try {
  const v = JSON.parse(audit.stdout).metadata.vulnerabilities
  check('npm audit: 0 vulnerabilidades altas/críticas', v.high === 0 && v.critical === 0, JSON.stringify(v))
} catch {
  check('npm audit executou', false, (audit.stderr || audit.stdout || '').slice(0, 160))
}

// 2. Tailwind v4 + plugin PostCSS
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
const deps = { ...pkg.dependencies, ...pkg.devDependencies }
check('Tailwind v4 instalado', /^[\^~]?4\./.test(deps.tailwindcss || ''), deps.tailwindcss)
check('@tailwindcss/postcss instalado', Boolean(deps['@tailwindcss/postcss']))
const postcss = fs.readFileSync(path.join(root, 'postcss.config.mjs'), 'utf8')
check('postcss.config.mjs usa @tailwindcss/postcss', postcss.includes('@tailwindcss/postcss'))

// 3. CSS global: seletores crus só dentro de @layer / @utility / @theme / @keyframes
const css = fs.readFileSync(path.join(root, 'src/styles/globals.css'), 'utf8')
check('globals.css usa @import "tailwindcss"', /@import\s+['"]tailwindcss['"]/.test(css))

function stripBlocks(source, startRegex) {
  let out = source
  let m
  while ((m = startRegex.exec(out))) {
    let depth = 0
    let i = out.indexOf('{', m.index)
    const begin = m.index
    for (; i < out.length; i++) {
      if (out[i] === '{') depth++
      else if (out[i] === '}' && --depth === 0) break
    }
    out = out.slice(0, begin) + out.slice(i + 1)
    startRegex.lastIndex = 0
  }
  return out
}
let rest = css.replace(/\/\*[\s\S]*?\*\//g, '')
for (const re of [/@layer\s+\w+\s*\{/, /@theme\s*\{/, /@utility\s+[\w-]+\s*\{/, /@keyframes\s+[\w-]+\s*\{/]) rest = stripBlocks(rest, new RegExp(re.source))
const bareSelectors = [...rest.matchAll(/(^|\})\s*([^{}@;]+)\{/g)].map((m) => m[2].trim())
const forbidden = bareSelectors.filter((s) => /^(\*|html|body|h[1-6]|p|a|button|li|span|ul|img|input)\b/.test(s) || /(^|,\s*)(p|a|button|li|span|h[1-6])\s*(,|$)/.test(s))
check('nenhum seletor global cru fora de @layer (html/body/h1/p/a/button/li/span/*)', forbidden.length === 0, forbidden.join(' | '))
check('sem override de .container fora de @utility', !/^\s*\.container\s*\{/m.test(rest))

// 4. Sem !important / modificador ! em utilities; CSS global só no layout raiz
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) walk(full, out)
    else if (/\.(tsx?|css)$/.test(e.name)) out.push(full)
  }
  return out
}
const files = walk(path.join(root, 'src'))
const importantInTsx = files.filter((f) => f.endsWith('.tsx') && /className=[^\n]*\s!?[a-z-]+!(\s|"|'|`)|!important/.test(fs.readFileSync(f, 'utf8')))
check('sem !important/modificador ! nas classes dos componentes', importantInTsx.length === 0, importantInTsx.map((f) => path.relative(root, f)).join(', '))
const cssImporters = files
  .filter((f) => /\.tsx?$/.test(f) && /import\s+['"][^'"]*\.css['"]/.test(fs.readFileSync(f, 'utf8')))
  .map((f) => path.relative(root, f).replace(/\\/g, '/'))
check('CSS global importado só em src/app/layout.tsx', cssImporters.length === 1 && cssImporters[0] === 'src/app/layout.tsx', cssImporters.join(', '))

if (failures) {
  console.error(`\n${failures} verificação(ões) falharam`)
  process.exit(1)
}
console.log('\nTodas as verificações de dependências e CSS passaram')
