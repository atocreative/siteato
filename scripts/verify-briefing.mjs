// Prova direta do briefing de identidade visual (/briefing) e das mudanças no funil:
//  1) estático: fidelidade ao briefing original (10 seções, 33 perguntas), montagem do texto, funil atualizado;
//  2) Chrome real (CDP): percorre as 10 seções, testa o limite de 5, campos "Outro", revisão e links de envio.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawn, spawnSync } from 'node:child_process'
import { briefingSections, briefingTotalQuestions, briefingLimits } from '../src/constants/briefing.ts'
import { buildBriefingText, emptyBriefingState, answerFor } from '../src/lib/briefingMessage.ts'
import { funnelQuestions } from '../src/constants/funnel.ts'

const root = process.cwd()
const isWin = process.platform === 'win32'
const appPort = process.env.E2E_PORT || '3196'
const cdpPort = process.env.E2E_CDP_PORT || '9335'
const base = `http://127.0.0.1:${appPort}`

let failures = 0
const check = (label, ok, extra = '') => {
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${label}${extra ? ` — ${extra}` : ''}`)
  if (!ok) failures++
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// ---------- 1) Estático ----------
check('briefing tem 10 seções e 33 perguntas (igual ao original)', briefingSections.length === 10 && briefingTotalQuestions === 33, `${briefingSections.length}/${briefingTotalQuestions}`)
const all = briefingSections.flatMap((s) => s.questions)
check('ids únicos q1..q33', new Set(all.map((q) => q.id)).size === 33 && all[0].id === 'q1' && all[32].id === 'q33')
const q10 = all.find((q) => q.id === 'q10')
check('q10: multi com máximo de 5 e opção "Outro"', q10.type === 'multi' && q10.max === 5 && q10.options.at(-1).other === true)
check('q18: "Sim" abre campo "Quais cores?"', all.find((q) => q.id === 'q18').options[0].other === true)
check('perguntas de escolha têm opções; abertas não', all.every((q) => (q.type === 'textarea') === !q.options))

const st = emptyBriefingState()
st.empresa = 'Marca X'
st.nome = 'Ana <b>'
st.contato = '61999999999'
st.texts.q1 = 'Fazemos café'
st.picks.q10 = [2, 0]
st.picks.q18 = [0]
st.others['q18:0'] = 'Verde'
const text = buildBriefingText(briefingSections, st, briefingLimits)
check('texto: cabeçalho, autor e seção numerada', text.startsWith('*Briefing de Identidade Visual — Marca X*') && text.includes('Respondido por: Ana b (61999999999)') && text.includes('*1. Sobre o negócio*'))
check('texto: só perguntas respondidas aparecem', text.includes('• Em poucas palavras, o que a sua marca faz?\nFazemos café') && !text.includes('Qual o principal problema'))
check('texto: multi ordenado e "Outro" com complemento', answerFor(q10, st, briefingLimits) === 'Confiável, Tecnológica' && text.includes('Sim: Verde'))

const services = funnelQuestions[0].options.map((o) => o.value).join('|')
check('funil: serviços incluem tráfego pago e identidade visual', /Tráfego pago/.test(services) && /identidade visual/.test(services))
const invest = funnelQuestions.find((q) => q.id === 'investimento').options.map((o) => o.label)
check('funil: faixas de investimento de menos de R$ 1.000 até R$ 60.000', invest[0] === 'Menos de R$ 1.000' && invest.some((l) => /30\.000 a R\$ 60\.000/.test(l)) && !invest.some((l) => /Até R\$ 3 mil/.test(l)), invest.join(' | '))

const page = path.join(root, '.next/server/app/briefing.html')
check('build prerenderizou /briefing', fs.existsSync(page))
if (fs.existsSync(page)) {
  const html = fs.readFileSync(page, 'utf8')
  check('/briefing: title, canonical e H1 no HTML (SSR)', /<title>Briefing de Identidade Visual/.test(html) && /rel="canonical" href="[^"]*\/briefing"/.test(html) && /Briefing de<br\/>identidade visual/.test(html.replace(/<!-- -->/g, '')))
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
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'briefing-e2e-'))
try {
  if (!chromePath) throw new Error('Chrome não encontrado (defina CHROME_PATH)')
  server = spawn(isWin ? 'npx.cmd' : 'npx', ['next', 'start', '-H', '127.0.0.1', '-p', appPort], { cwd: root, stdio: 'ignore', shell: isWin })
  check('servidor Next respondeu', Boolean(await waitFor(async () => (await fetch(base)).ok)))
  check('GET /briefing responde 200', (await fetch(`${base}/briefing`)).status === 200)

  chrome = spawn(chromePath, ['--headless=new', '--disable-gpu', '--no-sandbox', '--window-size=390,900', `--remote-debugging-port=${cdpPort}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' })
  const target = await waitFor(async () => {
    const res = await fetch(`http://127.0.0.1:${cdpPort}/json/new?${encodeURIComponent(`${base}/briefing`)}`, { method: 'PUT' })
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
    const btn = (t) => [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === t)
    const setVal = (el, v) => {
      const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype
      Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, v)
      el.dispatchEvent(new Event('input', { bubbles: true }))
    }
    window.addEventListener('click', (e) => { if (e.target.closest && e.target.closest('a[href^="https://wa.me"], a[href^="mailto:"]')) e.preventDefault() })

    // Intro: bloqueia sem os 3 campos
    btn('Começar').click(); await sleep(100)
    log.introBlocked = !!document.querySelector('[role=alert]') && !!document.getElementById('lead-empresa')
    setVal(document.getElementById('lead-empresa'), 'Empresa Teste')
    setVal(document.getElementById('lead-nome'), 'Ana <i>Souza</i>')
    setVal(document.getElementById('lead-contato'), 'ana@teste.com')
    await sleep(100)
    btn('Começar').click(); await sleep(350)

    const titles = []
    const longText = 'x'.repeat(1000)
    for (let s = 1; s <= 10; s++) {
      titles.push(document.querySelector('h2')?.textContent)
      for (const ta of document.querySelectorAll('textarea')) setVal(ta, ta.id <= 'q5' && s === 1 ? longText : 'Resposta ' + ta.id)
      for (const group of document.querySelectorAll('[data-qid]')) {
        const qid = group.dataset.qid
        const chips = [...group.querySelectorAll('[data-chip]')]
        if (qid === 'q10') {
          chips.slice(0, 7).forEach((c) => c.click()); await sleep(60)
          log.q10Pressed = group.querySelectorAll('[aria-pressed=true]').length
          log.q10Note = group.parentElement.textContent.includes('5 de 5')
        } else if (qid === 'q18') {
          chips[0].click(); await sleep(80)
          const other = document.getElementById('q18-other-0')
          log.q18OtherShown = !!other
          if (other) setVal(other, 'Verde e preto')
        } else if (qid === 'q7') {
          chips[0].click(); chips.at(-1).click(); await sleep(80)
          const other = document.getElementById('q7-other-5')
          log.q7OtherShown = !!other
          if (other) setVal(other, 'Segurança')
        } else if (group.dataset.type === 'single') {
          chips[1].click(); chips[0].click() // troca: só 1 marcada
          await sleep(80)
          log['single_' + qid] = group.querySelectorAll('[aria-pressed=true]').length
        } else {
          chips[0].click()
        }
      }
      await sleep(80)
      btn(s === 10 ? 'Revisar' : 'Continuar').click(); await sleep(300)
    }
    log.titles = titles
    log.reviewHeading = document.querySelector('h2')?.textContent
    log.summary = document.getElementById('briefing-summary')?.textContent
    const wa = document.querySelector('a[href^="https://wa.me"]')
    log.wa = wa?.getAttribute('href')
    log.waTarget = wa?.getAttribute('target') + '|' + wa?.getAttribute('rel')
    log.mail = document.querySelector('a[href^="mailto:"]')?.getAttribute('href')
    log.longWarning = document.body.textContent.includes('o WhatsApp pode cortar')
    btn('Copiar respostas').click(); await sleep(400)
    log.copyNotice = document.querySelector('[role=status]')?.textContent
    log.overflowX = document.documentElement.scrollWidth > window.innerWidth
    return log
  })()`)

  check('intro bloqueia "Começar" sem os 3 campos', out.introBlocked === true)
  check('percorreu as 10 seções na ordem', JSON.stringify(out.titles) === JSON.stringify(briefingSections.map((s) => s.title)), JSON.stringify(out.titles))
  check('q10: no máximo 5 características marcadas e contador "5 de 5"', out.q10Pressed === 5 && out.q10Note === true, String(out.q10Pressed))
  check('q18 "Sim" e q7 "Outro" abrem campo de texto', out.q18OtherShown === true && out.q7OtherShown === true)
  check('perguntas de escolha única mantêm só 1 opção marcada', ['q20', 'q30', 'q32'].every((q) => out['single_' + q] === 1), JSON.stringify(['q20', 'q30', 'q32'].map((q) => out['single_' + q])))
  check('revisão mostra "33 de 33"', out.reviewHeading?.startsWith('Tudo pronto') && /33 de 33/.test(out.summary ?? ''), out.summary)

  const wa = out.wa ?? ''
  const msg = wa.includes('?text=') ? decodeURIComponent(wa.split('?text=')[1]) : ''
  check('WhatsApp: https://wa.me/5561991995064 com texto codificado', wa.startsWith('https://wa.me/5561991995064?text=*Briefing'), wa.slice(0, 70))
  check('WhatsApp abre em nova aba com rel seguro', out.waTarget === '_blank|noopener noreferrer')
  check('mensagem tem cabeçalho, autor sanitizado e as 10 seções', msg.includes('*Briefing de Identidade Visual — Empresa Teste*') && msg.includes('Respondido por: Ana iSouza/i (ana@teste.com)') && briefingSections.every((s, i) => msg.includes(`*${i + 1}. ${s.title}*`)))
  check('mensagem traz as 33 perguntas', all.every((q) => msg.includes(q.q)))
  check('mensagem traz "Sim: Verde e preto" e "Outro: Segurança"', msg.includes('Sim: Verde e preto') && msg.includes('Outro: Segurança'))
  check('q10 enviada com exatamente 5 características', msg.split('Escolha até 5 características da personalidade da marca.\n')[1]?.split('\n')[0]?.split(', ').length === 5)
  check('aviso de mensagem longa aparece', out.longWarning === true)
  check('e-mail: mailto com assunto e corpo', /^mailto:suporte\.atocriative%40gmail\.com\?subject=Briefing%20de%20Identidade%20Visual/.test(out.mail ?? '') && /&body=/.test(out.mail ?? ''))
  check('"Copiar respostas" informa o resultado', Boolean(out.copyNotice))
  check('sem rolagem horizontal no celular', out.overflowX === false)

  // Funil: identidade visual sugere o briefing
  await send('Page.enable')
  await send('Page.navigate', { url: `${base}/contato` })
  await sleep(3000)
  const funnel = await run(`(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
    const chips = () => [...document.querySelectorAll('[aria-pressed]')]
    const labels = chips().map((c) => c.textContent)
    const identity = chips().find((c) => c.textContent.includes('Identidade visual'))
    identity.click(); await sleep(80)
    ;[...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Continuar').click(); await sleep(300)
    for (let i = 0; i < 5; i++) { document.querySelectorAll('[role=radio]')[1].click(); await sleep(420) }
    const link = [...document.querySelectorAll('a')].find((a) => a.getAttribute('href') === '/briefing')
    return { labels, link: !!link }
  })()`)
  check('funil: opções "Tráfego pago" e "Identidade visual e logo" na tela', funnel.labels.some((l) => l.includes('Tráfego pago')) && funnel.labels.some((l) => l.includes('Identidade visual e logo')))
  check('funil: escolher identidade visual mostra o link para /briefing na etapa final', funnel.link === true)
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
console.log('\nTodas as verificações do briefing e do funil atualizado passaram')
