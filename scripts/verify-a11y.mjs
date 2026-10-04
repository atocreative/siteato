// Prova direta: sobe `next start`, roda Lighthouse (mobile) na home e exige
// Acessibilidade 100 e Performance >= 90, além do hero com next/image priority + sizes.
import fs from 'node:fs'
import path from 'node:path'
import { spawn, spawnSync } from 'node:child_process'

const root = process.cwd()
const port = process.env.VERIFY_PORT || '3199'
const url = `http://127.0.0.1:${port}/${(process.env.VERIFY_PATH || '').replace(/^\/+/, '')}`
const out = path.join(root, '.next', 'lh-verify.json')
const isWin = process.platform === 'win32'
let failures = 0

const check = (label, ok, extra = '') => {
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${label}${extra ? ` — ${extra}` : ''}`)
  if (!ok) failures++
}

const hero = fs.readFileSync(path.join(root, 'src/sections/Hero.tsx'), 'utf8')
check('Hero usa next/image com priority e sizes', /<Image[\s\S]*?priority[\s\S]*?sizes=/.test(hero))
check('Hero tem um único <h1>', (hero.match(/<h1[\s>]/g) || []).length === 1)

const server = spawn(isWin ? 'npx.cmd' : 'npx', ['next', 'start', '-H', '127.0.0.1', '-p', port], {
  cwd: root,
  stdio: 'ignore',
  shell: isWin,
})

async function waitUp() {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(url)
      if (res.ok) return true
    } catch {}
    await new Promise((r) => setTimeout(r, 500))
  }
  return false
}

try {
  check('servidor Next respondeu', await waitUp())
  const lh = spawnSync(
    isWin ? 'npx.cmd' : 'npx',
    [
      '--yes', 'lighthouse@latest', url,
      '--only-categories=performance,accessibility',
      '--form-factor=mobile',
      '--chrome-flags=--headless=new --no-sandbox',
      '--output=json', `--output-path=${out}`, '--quiet',
    ],
    { cwd: root, encoding: 'utf8', shell: isWin }
  )
  if (!fs.existsSync(out)) {
    check('Lighthouse executou', false, (lh.stderr || '').slice(0, 200))
  } else {
    const report = JSON.parse(fs.readFileSync(out, 'utf8'))
    const perf = Math.round(report.categories.performance.score * 100)
    const a11y = Math.round(report.categories.accessibility.score * 100)
    check('Lighthouse mobile — Acessibilidade 100', a11y === 100, `nota ${a11y}`)
    check('Lighthouse mobile — Performance >= 90', perf >= 90, `nota ${perf}`)
  }
} finally {
  if (isWin) spawnSync('taskkill', ['/pid', String(server.pid), '/T', '/F'], { stdio: 'ignore' })
  else server.kill('SIGTERM')
}

if (failures) {
  console.error(`\n${failures} verificação(ões) falharam`)
  process.exit(1)
}
console.log('\nTodas as verificações de performance/acessibilidade passaram')
