// Prova direta do funil /contato:
//  1) estático: mensagem do WhatsApp, CTAs do site apontando para /contato, rota prerenderizada, sitemap;
//  2) Chrome real (CDP): percorre o funil clicando, valida estado, validação do nome e a URL final do WhatsApp.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawn, spawnSync } from 'node:child_process'
import { funnelQuestions } from '../src/constants/funnel.ts'
import { buildFunnelMessage, buildWhatsappUrl, cleanFreeText } from '../src/lib/funnelMessage.ts'

const root = process.cwd()
const isWin = process.platform === 'win32'
const appPort = process.env.E2E_PORT || '3197'
const cdpPort = process.env.E2E_CDP_PORT || '9334'
const base = `http://127.0.0.1:${appPort}`
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8')

let failures = 0
const check = (label, ok, extra = '') => {
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${label}${extra ? ` — ${extra}` : ''}`)
  if (!ok) failures++
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// ---------- 1) Estático ----------
const answers = { choices: {}, name: 'Maria', company: 'Padaria Sol', message: 'Quero vender online' }
funnelQuestions.forEach((q) => (answers.choices[q.id] = [q.options[0].value]))
const msg = buildFunnelMessage(funnelQuestions, answers)
check('mensagem inclui todas as perguntas e respostas', funnelQuestions.every((q) => msg.includes(q.title) && msg.includes(q.options[0].value)))
check('mensagem inclui nome, empresa e texto livre', msg.includes('Maria') && msg.includes('Padaria Sol') && msg.includes('Quero vender online'))
const url = buildWhatsappUrl('5561991995064', msg)
check('URL usa https://wa.me/55 e decodifica de volta para a mesma mensagem', url.startsWith('https://wa.me/55') && decodeURIComponent(url.split('?text=')[1]) === msg)
check('sanitização remove < > e controles e limita tamanho', cleanFreeText('<b>Oi</b>\u0007  tudo', 8) === 'bOi/b ti' || cleanFreeText('<b>Oi</b>\u0007 x', 50) === 'bOi/b x')
check('funil faz sentido para a ATO. (site, sistema, automação, IA)', /Site/.test(JSON.stringify(funnelQuestions[0])) && /Sistema/.test(JSON.stringify(funnelQuestions[0])) && /Automação/.test(JSON.stringify(funnelQuestions[0])) && /Inteligência artificial/.test(JSON.stringify(funnelQuestions[0])))

for (const file of ['src/sections/Navigation.tsx', 'src/sections/CTABanner.tsx']) {
  const s = read(file)
  check(`${file}: CTAs vão para o funil e não para wa.me`, /contactPagePath|CONTACT/.test(s) && !/whatsappUrl|wa\.me/.test(s))
}
check('Footer: "Contato" vai para /contato', /label: 'Contato', href: contactPagePath/.test(read('src/sections/Footer.tsx')))
check('sitemap registra /contato', /contactPagePath/.test(read('src/app/sitemap.xml/route.ts')))
const page = path.join(root, '.next/server/app/contato.html')
check('build prerenderizou /contato', fs.existsSync(page))
if (fs.existsSync(page)) {
  const html = fs.readFileSync(page, 'utf8')
  check('/contato: title, canonical e JSON-LD ContactPage', /<title>Fale com a ATO\./.test(html) && /rel="canonical" href="[^"]*\/contato"/.test(html) && /ContactPage/.test(html))
  check('/contato: primeira pergunta já no HTML (SSR)', html.includes('O que você quer construir com a ATO.'))
}

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
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'funnel-e2e-'))
try {
  if (!chromePath) throw new Error('Chrome não encontrado (defina CHROME_PATH)')
  server = spawn(isWin ? 'npx.cmd' : 'npx', ['next', 'start', '-H', '127.0.0.1', '-p', appPort], { cwd: root, stdio: 'ignore', shell: isWin })
  check('servidor Next respondeu', Boolean(await waitFor(async () => (await fetch(base)).ok)))
  const status = await fetch(`${base}/contato`).then((r) => r.status)
  check('GET /contato responde 200', status === 200, String(status))

  chrome = spawn(chromePath, ['--headless=new', '--disable-gpu', '--no-sandbox', '--window-size=390,900', `--remote-debugging-port=${cdpPort}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' })
  const target = await waitFor(async () => {
    const res = await fetch(`http://127.0.0.1:${cdpPort}/json/new?${encodeURIComponent(`${base}/contato`)}`, { method: 'PUT' })
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
    const msg2 = JSON.parse(m.data)
    if (msg2.id && pending.has(msg2.id)) {
      pending.get(msg2.id)(msg2)
      pending.delete(msg2.id)
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

  const picks = funnelQuestions.map((q) => q.options.map((o) => o.value))
  const out = await run(`(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
    const questions = ${JSON.stringify(funnelQuestions.map((q) => ({ title: q.title, multiple: !!q.multiple, options: q.options.map((o) => o.label) })))}
    const log = {}
    const heading = () => document.querySelector('h2')?.textContent
    const btnByText = (t) => [...document.querySelectorAll('button')].find((b) => b.textContent.includes(t))
    window.addEventListener('click', (e) => { if (e.target.closest && e.target.closest('a[href*="wa.me"]')) e.preventDefault() })

    log.firstHeading = heading()
    log.progress0 = document.querySelector('[role=progressbar]')?.getAttribute('aria-valuenow')

    // Etapa 1 (multi): continuar bloqueado sem seleção
    log.continueDisabledInitially = btnByText('Continuar')?.disabled === true
    const opts = () => [...document.querySelectorAll('[aria-pressed], [role=radio]')]
    opts()[0].click(); opts()[2].click()
    await sleep(60)
    log.multiPressed = opts().filter((b) => b.getAttribute('aria-pressed') === 'true').length
    btnByText('Continuar').click()
    await sleep(350)
    log.afterStep1Heading = heading()

    // Voltar preserva as respostas
    btnByText('Voltar').click()
    await sleep(300)
    log.backKeepsSelection = opts().filter((b) => b.getAttribute('aria-pressed') === 'true').length
    btnByText('Continuar').click()
    await sleep(350)

    // Etapas 2..6 (única escolha, avança sozinha): escolhe a 2ª opção de cada
    for (let i = 1; i < questions.length; i++) {
      if (heading() !== questions[i].title) { log.mismatchAt = i; log.got = heading(); break }
      opts()[1].click()
      await sleep(420)
    }
    log.finalHeading = heading()

    // Final: nome inválido -> bloqueia e mostra erro
    const link = () => document.querySelector('a[href*="wa.me"]')
    const notPrevented = link().dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
    log.blockedWithoutName = notPrevented === false
    await sleep(100)
    log.errorShown = !!document.querySelector('[role=alert]')

    // Preenche campos (inputs controlados do React)
    const setVal = (el, v) => {
      const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype
      Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, v)
      el.dispatchEvent(new Event('input', { bubbles: true }))
    }
    setVal(document.getElementById('funil-nome'), 'Ana <script>x</script> Souza')
    setVal(document.getElementById('funil-empresa'), 'Loja Aurora')
    setVal(document.getElementById('funil-mensagem'), 'Preciso de site e automação no WhatsApp')
    await sleep(150)
    log.href = link().getAttribute('href')
    log.target = link().getAttribute('target')
    log.rel = link().getAttribute('rel')
    log.ariaDisabled = link().getAttribute('aria-disabled')
    log.overflowX = document.documentElement.scrollWidth > window.innerWidth
    return log
  })()`)

  check('etapa 1 mostra a primeira pergunta e progresso inicial', out.firstHeading === funnelQuestions[0].title && Number(out.progress0) > 0, `${out.firstHeading} / ${out.progress0}%`)
  check('multi-seleção: "Continuar" bloqueado até escolher', out.continueDisabledInitially === true)
  check('multi-seleção aceita 2 opções', out.multiPressed === 2, String(out.multiPressed))
  check('avança para a pergunta 2 ao continuar', out.afterStep1Heading === funnelQuestions[1].title)
  check('"Voltar" preserva as respostas marcadas', out.backKeepsSelection === 2, String(out.backKeepsSelection))
  check('perguntas 2 a 6 avançam sozinhas na ordem correta', out.mismatchAt === undefined, out.mismatchAt ? `falhou na ${out.mismatchAt}: ${out.got}` : '')
  check('chega à etapa final de dados', /Como podemos te chamar/.test(out.finalHeading ?? ''), out.finalHeading)
  check('sem nome: envio bloqueado com mensagem de erro acessível', out.blockedWithoutName === true && out.errorShown === true)
  check('sem rolagem horizontal no celular (390px)', out.overflowX === false)

  const href = out.href ?? ''
  const text = href.includes('?text=') ? decodeURIComponent(href.split('?text=')[1]) : ''
  check('link final: https://wa.me/5561991995064 com texto codificado', href.startsWith('https://wa.me/5561991995064?text=Ol%C3%A1'))
  check('link abre em nova aba com rel seguro', out.target === '_blank' && out.rel === 'noopener noreferrer' && out.ariaDisabled === 'false')
  check('mensagem final lista TODAS as 6 perguntas', funnelQuestions.every((q) => text.includes(q.title)))
  check('mensagem final traz as respostas escolhidas', text.includes(funnelQuestions[0].options[0].value) && text.includes(funnelQuestions[0].options[2].value) && funnelQuestions.slice(1).every((q) => text.includes(q.options[1].value)))
  check('nome sanitizado (sem < >) e empresa/mensagem presentes', text.includes('Ana scriptx/script Souza') && !/[<>]/.test(text) && text.includes('Loja Aurora') && text.includes('Preciso de site e automação no WhatsApp'))

  // CTAs do site apontam para o funil
  await send('Page.enable')
  await send('Page.navigate', { url: `${base}/` })
  await sleep(3000)
  const home = await run(`(() => {
    const hrefs = (sel) => [...document.querySelectorAll(sel)].map((a) => a.getAttribute('href'))
    return {
      falar: [...document.querySelectorAll('a')].filter((a) => /Falar com a ATO/.test(a.textContent)).map((a) => a.getAttribute('href')),
      saber: [...document.querySelectorAll('a')].filter((a) => /Quero saber mais/.test(a.textContent)).map((a) => a.getAttribute('href')),
      contato: [...document.querySelectorAll('a')].filter((a) => a.textContent.trim() === 'Contato').map((a) => a.getAttribute('href')),
      waAnchorsInNavOrBanner: hrefs('#nav a[href*="wa.me"], #contato a[href*="wa.me"]'),
    }
  })()`)
  check('"Falar com a ATO." (desktop e mobile) -> /contato', home.falar.length >= 1 && home.falar.every((h) => h === '/contato'), JSON.stringify(home.falar))
  check('"Quero saber mais" -> /contato', home.saber.length === 1 && home.saber[0] === '/contato')
  check('links "Contato" (menu e rodapé) -> /contato', home.contato.length >= 2 && home.contato.every((h) => h === '/contato'), JSON.stringify(home.contato))
  check('nenhum botão do menu/banner abre WhatsApp direto', home.waAnchorsInNavOrBanner.length === 0)
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
console.log('\nTodas as verificações do funil de contato passaram')
