// Teste de ponta a ponta no Chrome real (headless, via CDP): sobe `next start`, clica em elementos
// aninhados (<svg> dentro de <span> dentro do link) e confere os eventos enviados ao gtag.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawn, spawnSync } from 'node:child_process'

const root = process.cwd()
const isWin = process.platform === 'win32'
const appPort = process.env.E2E_PORT || '3198'
const cdpPort = process.env.E2E_CDP_PORT || '9333'
const base = `http://127.0.0.1:${appPort}`
const chromePath =
  process.env.CHROME_PATH ||
  [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ].find((p) => fs.existsSync(p))

let failures = 0
const check = (label, ok, extra = '') => {
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${label}${extra ? ` — ${extra}` : ''}`)
  if (!ok) failures++
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function waitFor(fn, tries = 60) {
  for (let i = 0; i < tries; i++) {
    try {
      const v = await fn()
      if (v) return v
    } catch {}
    await sleep(500)
  }
  return null
}

const killTree = (child) => {
  if (!child?.pid) return
  if (isWin) spawnSync('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' })
  else child.kill('SIGTERM')
}

let server
let chrome
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'ga4-e2e-'))

try {
  if (!chromePath) throw new Error('Chrome não encontrado (defina CHROME_PATH)')

  server = spawn(isWin ? 'npx.cmd' : 'npx', ['next', 'start', '-H', '127.0.0.1', '-p', appPort], { cwd: root, stdio: 'ignore', shell: isWin })
  check('servidor Next respondeu', Boolean(await waitFor(async () => (await fetch(base)).ok)))

  chrome = spawn(chromePath, ['--headless=new', '--disable-gpu', '--no-sandbox', `--remote-debugging-port=${cdpPort}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' })
  const target = await waitFor(async () => {
    const res = await fetch(`http://127.0.0.1:${cdpPort}/json/new?${encodeURIComponent(base)}`, { method: 'PUT' })
    return res.ok ? res.json() : null
  })
  check('Chrome headless conectado via CDP', Boolean(target))

  const ws = new WebSocket(target.webSocketDebuggerUrl)
  await new Promise((resolve, reject) => {
    ws.onopen = resolve
    ws.onerror = reject
  })
  let id = 0
  const pending = new Map()
  ws.onmessage = (m) => {
    const msg = JSON.parse(m.data)
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg)
      pending.delete(msg.id)
    }
  }
  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const myId = ++id
      pending.set(myId, resolve)
      ws.send(JSON.stringify({ id: myId, method, params }))
    })
  const evaluate = async (expression) => {
    const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
    if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 300))
    return r.result?.result?.value
  }

  await send('Runtime.enable')
  await sleep(2500) // hidratação + registro do listener

  const result = await evaluate(`(() => {
    const calls = []
    window.gtag = (...args) => calls.push(args)
    // impede a navegação real dos links durante o teste (roda DEPOIS do tracker, que usa captura)
    window.addEventListener('click', (e) => e.preventDefault())

    const fire = (el) => el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))

    // 1) WhatsApp: clique em <svg> aninhado dentro de <span> dentro do <a>
    const wa = document.querySelector('a[href*="wa.me"]')
    wa.innerHTML = '<span><svg id="deep-icon" width="10" height="10"><path d="M0 0h10v10z"/></svg></span>'
    fire(document.getElementById('deep-icon'))

    // 2) Instagram, telefone e e-mail (links criados dinamicamente: prova a delegação)
    const mk = (href, html) => {
      const a = document.createElement('a'); a.href = href; a.innerHTML = html; a.id = 'dyn-' + calls.length
      document.body.appendChild(a); return a
    }
    fire(mk('https://www.instagram.com/ato.vc', '<span>Instagram</span>').firstChild)
    fire(mk('tel:+5561991995064', 'Ligar'))
    fire(mk('mailto:contato@ato.com', 'E-mail'))

    // 3) data-ga-event em botão sem URL
    const btn = document.createElement('button')
    btn.setAttribute('data-ga-event', 'generate_lead')
    btn.setAttribute('data-ga-label', 'Hero CTA')
    btn.innerHTML = '<span id="btn-span">Quero um orçamento</span>'
    document.body.appendChild(btn)
    fire(document.getElementById('btn-span'))

    // 4) link interno comum não deve gerar evento
    const before = calls.length
    fire(mk('#sobre', 'Sobre'))
    const internalFired = calls.length !== before

    return { calls: calls.map((c) => ({ type: c[0], name: c[1], params: c[2] })), internalFired }
  })()`)

  const find = (pred) => result.calls.find((c) => c.type === 'event' && pred(c))
  const w = find((c) => c.params.method === 'whatsapp')
  check('clique no <svg> aninhado -> generate_lead whatsapp', w?.name === 'generate_lead' && w.params.link_domain === 'wa.me', JSON.stringify(w?.params))
  const ig = find((c) => c.params.item_id === 'instagram')
  check('link dinâmico do Instagram -> select_content social_link', ig?.name === 'select_content' && ig.params.content_type === 'social_link')
  check('tel: -> generate_lead phone', find((c) => c.params.method === 'phone')?.name === 'generate_lead')
  check('mailto: -> generate_lead email', find((c) => c.params.method === 'email')?.name === 'generate_lead')
  const custom = find((c) => c.params.label === 'Hero CTA')
  check('data-ga-event em botão sem URL, clique no <span> interno', custom?.name === 'generate_lead')
  check('link interno (#sobre) não gera evento', result.internalFired === false)
  check('exatamente 5 eventos (sem duplicidade)', result.calls.length === 5, `recebidos: ${result.calls.length}`)
  ws.close()
} catch (error) {
  check('e2e executou sem exceção', false, String(error).slice(0, 200))
} finally {
  killTree(chrome)
  killTree(server)
  try {
    fs.rmSync(profile, { recursive: true, force: true })
  } catch {}
}

if (failures) {
  console.error(`\n${failures} verificação(ões) falharam`)
  process.exit(1)
}
console.log('\nTodas as verificações e2e de GA4 passaram')
