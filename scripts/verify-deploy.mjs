// Prova do deploy no Railway/Nixpacks:
//  1) estático: Node >= 20.9 fixado, deps de build em "dependencies", nixpacks.toml;
//  2) mapeamento de variáveis: usa o bloco VITE_* real de produção e confere o resultado NEXT_PUBLIC_*;
//  3) --full: simula o Railway (cópia limpa do projeto, NODE_ENV=production, npm ci, npm run build).
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
let failures = 0
const check = (label, ok, extra = '') => {
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${label}${extra ? ` — ${extra}` : ''}`)
  if (!ok) failures++
}
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8')

// ---------- 1) Estático ----------
const pkg = JSON.parse(read('package.json'))
check('engines.node exige >= 20.9.0 (requisito do Next 16)', pkg.engines?.node === '>=20.9.0', pkg.engines?.node)
const toml = read('nixpacks.toml')
const nodeVersion = Number((toml.match(/NIXPACKS_NODE_VERSION\s*=\s*"(\d+)"/) || [])[1])
check('nixpacks.toml fixa NIXPACKS_NODE_VERSION >= 20', nodeVersion >= 20, String(nodeVersion))
check('nixpacks.toml desliga a telemetria do Next', /NEXT_TELEMETRY_DISABLED\s*=\s*"1"/.test(toml))
check('install usa "npm ci --include=dev" (NODE_ENV=production não pode omitir devDependencies)', /npm ci --include=dev/.test(toml))
check('.nvmrc e .node-version em 20+', Number(read('.nvmrc').trim()) >= 20 && Number(read('.node-version').trim()) >= 20)
check('TypeScript e @types/* em dependencies (build com NODE_ENV=production)', ['typescript', '@types/node', '@types/react', '@types/react-dom'].every((d) => pkg.dependencies?.[d]) && !pkg.devDependencies)
check('start escuta em 0.0.0.0 e usa a PORT da plataforma (next start)', /next start -H 0\.0\.0\.0/.test(pkg.scripts.start))
const cfgSrc = read('next.config.mjs')
check('source maps do navegador desligados', /productionBrowserSourceMaps:\s*false/.test(cfgSrc))
check('lockfile coerente com package.json (npm ci não falha)', spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['ls', '--package-lock-only', '--depth=0'], { cwd: root, shell: process.platform === 'win32', encoding: 'utf8' }).status === 0)

// ---------- 2) Variáveis de produção (bloco VITE_* informado) ----------
const prodEnv = {
  VITE_INDEXNOW_KEY: '145e9b513b4d47da999020114ac8d832',
  VITE_CLARITY_ID: 'yp5qi52q8z',
  VITE_GOOGLE_SITE_VERIFICATION: ' ',
  VITE_GTM_ID: 'GTM-TCK57NRJ',
  VITE_META_PIXEL_ID: ' ',
  VITE_SITE_URL: 'https://atodev.com.br',
  VITE_GA_MEASUREMENT_ID: 'G-D3Z2RXG8X1',
}
const saved = { ...process.env }
for (const k of Object.keys(process.env)) if (/^(VITE|NEXT_PUBLIC)_/.test(k)) delete process.env[k]
Object.assign(process.env, prodEnv)
const mapped = (await import(`${pathToFileURL(path.join(root, 'next.config.mjs')).href}?legacy`)).default.env
check('VITE_* -> NEXT_PUBLIC_*: IDs de GA, GTM, Clarity, IndexNow e URL', mapped.NEXT_PUBLIC_GA_MEASUREMENT_ID === 'G-D3Z2RXG8X1' && mapped.NEXT_PUBLIC_GTM_ID === 'GTM-TCK57NRJ' && mapped.NEXT_PUBLIC_CLARITY_ID === 'yp5qi52q8z' && mapped.NEXT_PUBLIC_INDEXNOW_KEY === prodEnv.VITE_INDEXNOW_KEY && mapped.NEXT_PUBLIC_SITE_URL === 'https://atodev.com.br')
check('valores só com espaço (pixel Meta, verificação Google) viram vazio', mapped.NEXT_PUBLIC_META_PIXEL_ID === '' && mapped.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION === '')
process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-NOVO'
const preferred = (await import(`${pathToFileURL(path.join(root, 'next.config.mjs')).href}?nova`)).default.env
check('NEXT_PUBLIC_* tem prioridade sobre VITE_*', preferred.NEXT_PUBLIC_GA_MEASUREMENT_ID === 'G-NOVO')
for (const k of Object.keys(process.env)) delete process.env[k]
Object.assign(process.env, saved)

// ---------- 3) Simulação do Railway ----------
if (process.argv.includes('--full')) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'railway-sim-'))
  try {
    fs.cpSync(root, tmp, {
      recursive: true,
      filter: (src) => !/[\\/](node_modules|\.next|\.git|\.claude)([\\/]|$)/.test(src.slice(root.length)),
    })
    const env = { ...process.env, NODE_ENV: 'production', NODE_OPTIONS: '--max-old-space-size=2048', NEXT_TELEMETRY_DISABLED: '1', SKIP_INDEXNOW: '1', ...prodEnv }
    const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
    const opts = { cwd: tmp, env, encoding: 'utf8', shell: process.platform === 'win32' }
    const install = spawnSync(npm, ['ci', '--include=dev'], opts)
    check('simulação Railway: npm ci (NODE_ENV=production)', install.status === 0, (install.stderr || '').slice(-200))
    const build = spawnSync(npm, ['run', 'build'], opts)
    check('simulação Railway: npm run build (NODE_ENV=production, cópia limpa)', build.status === 0, (build.stdout + build.stderr).slice(-300))
    const html = path.join(tmp, '.next/server/app/index.html')
    const out = fs.existsSync(html) ? fs.readFileSync(html, 'utf8') : ''
    check('build simulado inlinou o GA4 do ambiente VITE_*', /G-D3Z2RXG8X1/.test(out))
    check('build simulado não ativou o Meta Pixel com ID em branco', !/fbq\('init', ' '\)/.test(out))
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true })
  }
}

if (failures) {
  console.error(`\n${failures} verificação(ões) falharam`)
  process.exit(1)
}
console.log('\nTodas as verificações de deploy passaram')
