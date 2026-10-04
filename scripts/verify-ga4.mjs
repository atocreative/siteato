// Prova direta do rastreamento GA4 automático:
//  - testa o classificador real (src/lib/ga4Classify.ts) com URLs de WhatsApp, telefone, e-mail e redes sociais;
//  - confere a delegação global de eventos no componente e a integração no layout.
import fs from 'node:fs'
import path from 'node:path'
import { classifyHref, buildEvent } from '../src/lib/ga4Classify.ts'

const root = process.cwd()
let failures = 0
const check = (label, ok, extra = '') => {
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${label}${extra ? ` — ${extra}` : ''}`)
  if (!ok) failures++
}
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b)

// --- Classificador -----------------------------------------------------------
const wa = classifyHref('https://wa.me/556191995064?text=Ol%C3%A1')
check('wa.me -> generate_lead method=whatsapp', wa?.name === 'generate_lead' && wa.params.method === 'whatsapp' && wa.params.link_domain === 'wa.me')
check('api.whatsapp.com -> generate_lead whatsapp', classifyHref('https://api.whatsapp.com/send?phone=5561')?.params.method === 'whatsapp')
check('tel: -> generate_lead method=phone', eq(classifyHref('tel:+5561991995064')?.params.method, 'phone'))
check('mailto: -> generate_lead method=email', eq(classifyHref('mailto:a@b.com')?.params.method, 'email'))
for (const [url, platform] of [
  ['https://www.instagram.com/ato.vc', 'instagram'],
  ['https://facebook.com/ato', 'facebook'],
  ['https://www.tiktok.com/@ato', 'tiktok'],
  ['https://br.linkedin.com/company/ato', 'linkedin'],
  ['https://youtu.be/abc', 'youtube'],
  ['https://x.com/ato', 'x'],
]) {
  const r = classifyHref(url)
  check(`${platform} -> select_content social_link`, r?.name === 'select_content' && r.params.content_type === 'social_link' && r.params.item_id === platform)
}
check('link interno não é classificado', classifyHref('#contato') === null && classifyHref('/politica-de-privacidade') === null)
check('domínio parecido não engana (notinstagram.com.evil.io)', classifyHref('https://instagram.com.evil.io/x') === null)
check('javascript: ignorado', classifyHref('javascript:alert(1)') === null)

// --- buildEvent: metadados e data-attributes ----------------------------------
const ev = buildEvent({ href: 'https://wa.me/5561', text: '  Falar   com a ATO. ', ariaLabel: 'WhatsApp', sectionId: 'contato' })
check('metadados: button_text normalizado, aria_label e section_id', ev?.params.button_text === 'Falar com a ATO.' && ev.params.aria_label === 'WhatsApp' && ev.params.section_id === 'contato')
const custom = buildEvent({ dataEvent: 'generate_lead', dataLabel: 'Hero CTA', text: 'Quero' })
check('data-ga-event customizado sem URL', custom?.name === 'generate_lead' && custom.params.label === 'Hero CTA')
check('data-ga-event inválido é rejeitado', buildEvent({ dataEvent: 'x y; drop', text: 't' }) === null)
check('clique comum sem classificação não gera evento', buildEvent({ href: '#sobre', text: 'Sobre' }) === null)
check('data-ga-click gera select_content cta', buildEvent({ dataClick: true, text: 'Orçamento' })?.params.content_type === 'cta')

// --- Componente e integração ---------------------------------------------------
const tracker = fs.readFileSync(path.join(root, 'src/components/common/GA4AutoTracker.tsx'), 'utf8')
check("delegação global: document.addEventListener('click', ..., true)", /document\.addEventListener\('click',\s*handler,\s*true\)/.test(tracker))
check('usa closest() para cliques em SVG/span aninhados', /\.closest\(TARGET_SELECTOR\)/.test(tracker) && /a, button, \[role="button"\]/.test(tracker))
check('cobre clique do botão do meio (auxclick)', /auxclick/.test(tracker))
check('guarda de SSR (typeof window)', /typeof window === 'undefined'/.test(tracker))
check('remove os listeners no cleanup', /removeEventListener\('click'/.test(tracker))

const layout = fs.readFileSync(path.join(root, 'src/app/layout.tsx'), 'utf8')
check('layout renderiza <GA4AutoTracker />', /<GA4AutoTracker\s*\/>/.test(layout))
check('gtag.js carregado com next/script afterInteractive', /googletagmanager\.com\/gtag\/js[\s\S]*?strategy="afterInteractive"/.test(layout))

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) walk(full, out)
    else if (e.name.endsWith('.tsx')) out.push(full)
  }
  return out
}
const hardcoded = walk(path.join(root, 'src/sections')).filter((f) => /onClick=\{[^}]*trackEvent/.test(fs.readFileSync(f, 'utf8')))
check('nenhum onClick com trackEvent nos componentes (rastreamento 100% automático)', hardcoded.length === 0, hardcoded.join(', '))

const env = fs.readFileSync(path.join(root, '.env.example'), 'utf8')
check('.env.example documenta NEXT_PUBLIC_GA_MEASUREMENT_ID', /NEXT_PUBLIC_GA_MEASUREMENT_ID/.test(env))

if (failures) {
  console.error(`\n${failures} verificação(ões) falharam`)
  process.exit(1)
}
console.log('\nTodas as verificações de GA4 passaram')
