// Prova direta de /ajustes (formulários de ajustes finais de SITE e SISTEMA) e dos atalhos no rodapé:
//  1) estático: fidelidade ao formulário original (nomes de campo), payload e validação;
//  2) Chrome real (CDP): escolhe site/sistema, abre os blocos "Quero ajustar", valida, envia (fetch simulado,
//     NUNCA o Formspree real), testa o erro com fallback de WhatsApp e confere os links do rodapé.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawn, spawnSync } from 'node:child_process'
import { siteConfig, sistemaConfig, ajusteLimits } from '../src/constants/ajustes.ts'
import { buildAjustesPayload, collectEntries, validateAjustes } from '../src/lib/ajustesMessage.ts'

const root = process.cwd()
const isWin = process.platform === 'win32'
const appPort = process.env.E2E_PORT || '3195'
const cdpPort = process.env.E2E_CDP_PORT || '9336'
const base = `http://127.0.0.1:${appPort}`

let failures = 0
const check = (label, ok, extra = '') => {
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${label}${extra ? ` — ${extra}` : ''}`)
  if (!ok) failures++
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// ---------- 1) Estático ----------
const idsOf = (config) =>
  config.sections.flatMap((s) => s.items.flatMap((i) => (i.kind === 'group' ? [`${i.id}_status`, ...i.fields.map((f) => f.id)] : [i.id])))
const siteIds = idsOf(siteConfig)
const originalNames = [
  'empresa', 'responsavel', 'email', 'whatsapp', 'link_previa', 'visao_geral', 'visao_geral_obs',
  'topo_status', 'topo_titulo', 'topo_subtitulo', 'topo_botao_texto', 'topo_botao_link', 'topo_outros',
  'sobre_status', 'sobre_texto', 'sobre_outros', 'servicos_status', 'servicos_ajustes',
  'contato_status', 'contato_whatsapp', 'contato_email', 'contato_endereco', 'contato_redes',
  'visual_status', 'visual_ajustes', 'outras_status', 'outras_ajustes',
  'link_materiais', 'materiais_obs', 'imagens_apoio', 'dominio_status', 'dominio', 'prazo_desejado', 'observacoes',
]
const missing = originalNames.filter((n) => !siteIds.includes(n))
check('formulário de SITE tem todos os campos do original (mesmos nomes)', missing.length === 0, missing.join(', '))
check('SITE: 6 seções numeradas e 6 grupos "Está ok / Quero ajustar" (igual ao original)', siteConfig.sections.length === 6 && siteIds.filter((i) => i.endsWith('_status') && /^(topo|sobre|servicos|contato|visual|outras)_status$/.test(i)).length === 6)
const sisIds = idsOf(sistemaConfig)
check('SISTEMA: módulos próprios (acesso, telas, regras, relatórios, integrações, visual, bugs)', ['acesso_status', 'telas_status', 'regras_status', 'relatorios_status', 'integracoes_status', 'visual_status', 'bugs_status', 'bugs_descricao'].every((i) => sisIds.includes(i)))
check('SISTEMA não pede senha e orienta a não enviar', /senha/i.test(sistemaConfig.intro) && !sisIds.some((i) => /senha|password/i.test(i)))
check('ids únicos em cada formulário', new Set(siteIds).size === siteIds.length && new Set(sisIds).size === sisIds.length)

const vals = { empresa: 'Lume', responsavel: 'Ana', email: 'ana@lume.com', topo_status: 'Quero ajustar', topo_titulo: 'Novo título <b>', sobre_status: 'Está ok', sobre_texto: 'NÃO deve ir', visao_geral: 'Gostei, com alguns ajustes' }
const payload = buildAjustesPayload(siteConfig, vals, ajusteLimits)
check('payload: assunto, tipo e campos preenchidos', payload._subject.includes('SITE') && payload.tipo === 'Site' && payload.empresa === 'Lume' && payload.topo_titulo === 'Novo título b' && payload.visao_geral === 'Gostei, com alguns ajustes')
check('payload: grupo "Está ok" não envia campos escondidos', payload.sobre_status === 'Está ok' && !('sobre_texto' in payload))
check('payload: resumo legível numerado', /\*Ajustes finais \(SITE\) — Lume\*/.test(payload.resumo) && /\*3\. Seção por seção\*/.test(payload.resumo))
check('validação: obrigatórios, e-mail e confirmação', !validateAjustes(siteConfig, {}, true, ajusteLimits).ok && validateAjustes(siteConfig, { ...vals, email: 'x' }, true, ajusteLimits).fieldId === 'email' && validateAjustes(siteConfig, vals, false, ajusteLimits).fieldId === 'confirmacao' && validateAjustes(siteConfig, vals, true, ajusteLimits).ok)
check('collectEntries ignora valores fora das opções', collectEntries(siteConfig, { visao_geral: 'inventado' }, ajusteLimits).length === 0)

const page = path.join(root, '.next/server/app/ajustes.html')
check('build prerenderizou /ajustes', fs.existsSync(page))
if (fs.existsSync(page)) {
  const html = fs.readFileSync(page, 'utf8')
  check('/ajustes: title, canonical e escolha site/sistema no HTML (SSR)', /<title>Ajustes finais do seu site ou sistema/.test(html) && /rel="canonical" href="[^"]*\/ajustes"/.test(html) && html.includes('Meu site') && html.includes('Meu sistema'))
}
const footer = fs.readFileSync(path.join(root, 'src/sections/Footer.tsx'), 'utf8')
check('Footer tem atalhos para /briefing e /ajustes', /briefingPagePath/.test(footer) && /ajustesPagePath/.test(footer) && /Área do cliente/.test(footer))

// ---------- 2) Chrome real ----------
const chromePath =
  process.env.CHROME_PATH ||
  [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ].find((p) => fs.existsSync(p))
const killTree = (child) => {
  if (!child?.pid) return
  if (isWin) spawnSync('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' })
  else child.kill('SIGTERM')
}
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

let server
let chrome
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'ajustes-e2e-'))
try {
  if (!chromePath) throw new Error('Chrome não encontrado (defina CHROME_PATH)')
  server = spawn(isWin ? 'npx.cmd' : 'npx', ['next', 'start', '-H', '127.0.0.1', '-p', appPort], { cwd: root, stdio: 'ignore', shell: isWin })
  check('servidor Next respondeu', Boolean(await waitFor(async () => (await fetch(base)).ok)))
  check('GET /ajustes responde 200', (await fetch(`${base}/ajustes`)).status === 200)

  chrome = spawn(chromePath, ['--headless=new', '--disable-gpu', '--no-sandbox', '--window-size=390,900', `--remote-debugging-port=${cdpPort}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' })
  const target = await waitFor(async () => {
    const res = await fetch(`http://127.0.0.1:${cdpPort}/json/new?${encodeURIComponent(`${base}/ajustes`)}`, { method: 'PUT' })
    return res.ok ? res.json() : null
  })
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
  const run = async (expression) => {
    const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
    if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 300))
    return r.result?.result?.value
  }
  await send('Runtime.enable')
  await sleep(2500)

  const out = await run(`(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
    const log = {}
    const calls = []
    let nextOk = true
    window.fetch = async (url, init) => { calls.push({ url: String(url), body: init && init.body, headers: init && init.headers }); return { ok: nextOk, status: nextOk ? 200 : 500, json: async () => ({}) } }
    window.addEventListener('click', (e) => { if (e.target.closest && e.target.closest('a[href^="https://wa.me"]')) e.preventDefault() })
    const setVal = (el, v) => {
      const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype
      Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, v)
      el.dispatchEvent(new Event('input', { bubbles: true }))
    }
    const radio = (name, value) => { const el = [...document.querySelectorAll('input[type=radio]')].find((r) => r.name === name && r.value === value); el.click(); return el }
    const submit = () => document.querySelector('form').requestSubmit()

    // 0) sem escolha: nenhum formulário
    log.formBeforeChoice = !!document.querySelector('form')
    log.cards = [...document.querySelectorAll('[data-kind]')].map((b) => b.dataset.kind)

    // 1) SITE
    document.querySelector('[data-kind=site]').click(); await sleep(300)
    log.siteHeading = document.querySelector('form h2')?.textContent
    log.siteChecked = document.querySelector('[data-kind=site]').getAttribute('aria-checked')
    log.topoHiddenInitially = !document.getElementById('topo_titulo')
    radio('topo_status', 'Quero ajustar'); await sleep(100)
    log.topoOpen = !!document.getElementById('topo_titulo')
    radio('sobre_status', 'Está ok'); await sleep(100)
    log.sobreStaysClosed = !document.getElementById('sobre_texto')

    // validação: vazio
    submit(); await sleep(150)
    log.errEmpty = document.querySelector('[role=alert]')?.textContent
    log.focusEmpresa = document.activeElement?.id
    setVal(document.getElementById('empresa'), 'Studio Lume')
    setVal(document.getElementById('responsavel'), 'Marina')
    setVal(document.getElementById('email'), 'sem-arroba')
    await sleep(80); submit(); await sleep(150)
    log.errEmail = document.querySelector('[role=alert]')?.textContent
    setVal(document.getElementById('email'), 'marina@lume.com.br'); await sleep(80)
    submit(); await sleep(150)
    log.errConfirm = document.querySelector('[role=alert]')?.textContent

    setVal(document.getElementById('topo_titulo'), 'Nosso novo título <script>')
    radio('visao_geral', 'Gostei, com alguns ajustes')
    document.getElementById('confirmacao').click(); await sleep(100)
    log.callsBeforeSubmit = calls.length
    submit(); await sleep(400)
    log.call = calls[0]
    log.sentMessage = document.querySelector('[role=status]')?.textContent
    log.overflowX = document.documentElement.scrollWidth > window.innerWidth
    return log
  })()`)

  check('antes da escolha não há formulário; cartões "site" e "sistema"', out.formBeforeChoice === false && JSON.stringify(out.cards) === JSON.stringify(['site', 'sistema']))
  check('escolher "Meu site" mostra o formulário de site', out.siteChecked === 'true' && /Últimos ajustes antes de ir ao ar/.test(out.siteHeading ?? ''), out.siteHeading)
  check('"Quero ajustar" abre os campos; "Está ok" mantém fechado', out.topoHiddenInitially && out.topoOpen && out.sobreStaysClosed)
  check('envio vazio: erro de obrigatórios e foco no 1º campo', /campos marcados com \*/.test(out.errEmpty ?? '') && out.focusEmpresa === 'empresa', `${out.errEmpty} / ${out.focusEmpresa}`)
  check('e-mail inválido bloqueia com mensagem', /e-mail/.test(out.errEmail ?? ''))
  check('sem confirmação bloqueia com mensagem', /confirmação/.test(out.errConfirm ?? ''))
  check('nada foi enviado antes de o formulário estar válido', out.callsBeforeSubmit === 0)
  const body = out.call?.body ? JSON.parse(out.call.body) : {}
  check('envio vai para o Formspree configurado (simulado, sem rede)', out.call?.url === 'https://formspree.io/f/xdekygdv', out.call?.url)
  check('payload: SITE, empresa, campo aberto sanitizado, sem campo fechado', body.tipo === 'Site' && body.empresa === 'Studio Lume' && body.topo_titulo === 'Nosso novo título script' && !('sobre_texto' in body) && body.confirmacao === 'Sim')
  check('tela de sucesso depois do envio', /Recebido/.test(out.sentMessage ?? ''))
  check('sem rolagem horizontal no celular', out.overflowX === false)

  // 2) SISTEMA + falha de envio -> fallback WhatsApp
  await send('Page.enable')
  await send('Page.navigate', { url: `${base}/ajustes` })
  await sleep(2500)
  const sis = await run(`(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
    const log = {}
    const calls = []
    window.fetch = async (url, init) => { calls.push(String(url)); return { ok: false, status: 500, json: async () => ({}) } }
    window.addEventListener('click', (e) => { if (e.target.closest && e.target.closest('a[href^="https://wa.me"]')) e.preventDefault() })
    const setVal = (el, v) => {
      const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype
      Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, v)
      el.dispatchEvent(new Event('input', { bubbles: true }))
    }
    const radio = (name, value) => [...document.querySelectorAll('input[type=radio]')].find((r) => r.name === name && r.value === value).click()
    document.querySelector('[data-kind=sistema]').click(); await sleep(300)
    log.heading = document.querySelector('form h2')?.textContent
    log.hasBugs = !!document.querySelector('input[name=bugs_status]')
    log.noSiteField = !document.querySelector('input[name=topo_status]')
    radio('bugs_status', 'Quero ajustar'); await sleep(100)
    setVal(document.getElementById('bugs_descricao'), 'Erro ao salvar pedido')
    setVal(document.getElementById('empresa'), 'Loja Aurora')
    setVal(document.getElementById('responsavel'), 'Paulo')
    setVal(document.getElementById('email'), 'paulo@aurora.com')
    document.getElementById('confirmacao').click(); await sleep(100)
    document.querySelector('form').requestSubmit(); await sleep(400)
    log.err = document.querySelector('[role=alert]')?.textContent
    const wa = document.querySelector('a[href^="https://wa.me"]')
    log.wa = wa?.getAttribute('href')
    log.waRel = wa?.getAttribute('target') + '|' + wa?.getAttribute('rel')
    log.stillForm = !!document.querySelector('form')
    log.calls = calls.length
    return log
  })()`)
  check('escolher "Meu sistema" mostra o formulário de sistema (e não o de site)', /Últimos ajustes no seu sistema/.test(sis.heading ?? '') && sis.hasBugs && sis.noSiteField, sis.heading)
  check('falha no envio: mensagem de erro e formulário preservado', /Não conseguimos enviar/.test(sis.err ?? '') && sis.stillForm && sis.calls === 1)
  const waText = (sis.wa ?? '').includes('?text=') ? decodeURIComponent(sis.wa.split('?text=')[1]) : ''
  check('fallback: WhatsApp wa.me/5561991995064 com os ajustes em texto', (sis.wa ?? '').startsWith('https://wa.me/5561991995064?text=') && /Ajustes finais \(SISTEMA\) — Loja Aurora/.test(waText) && waText.includes('Erro ao salvar pedido'))
  check('fallback abre em nova aba com rel seguro', sis.waRel === '_blank|noopener noreferrer')

  // Rodapé da home
  await send('Page.navigate', { url: `${base}/` })
  await sleep(3000)
  const home = await run(`(() => {
    const nav = document.querySelector('nav[aria-label="Área do cliente"]')
    return { links: nav ? [...nav.querySelectorAll('a')].map((a) => [a.textContent.trim(), a.getAttribute('href')]) : null, inFooter: !!nav?.closest('footer') }
  })()`)
  check('rodapé: seção "Área do cliente" com link para o briefing', home.inFooter && home.links?.some(([t, h]) => h === '/briefing' && /Briefing de identidade visual/.test(t)), JSON.stringify(home.links))
  check('rodapé: link para os ajustes do site ou sistema', home.links?.some(([t, h]) => h === '/ajustes' && /Ajustes/.test(t)))
  ws.close()
} catch (error) {
  check('e2e executou sem exceção', false, String(error).slice(0, 240))
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
console.log('\nTodas as verificações de ajustes e rodapé passaram')
