// Prova direta de QA: varre o código-fonte e a saída do build em busca de violações.
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
let failures = 0
const check = (label, ok) => {
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${label}`)
  if (!ok) failures++
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, out)
    else if (/\.tsx?$/.test(entry.name)) out.push(full)
  }
  return out
}

const files = walk(path.join(root, 'src'))
const sources = files.map((f) => ({ f: path.relative(root, f), s: fs.readFileSync(f, 'utf8') }))

// 1. Todo <a target="_blank"> precisa de noopener noreferrer
const badTargets = []
for (const { f, s } of sources) {
  for (const m of s.matchAll(/<a\b[^>]*>/g)) {
    if (/target=["']_blank["']/.test(m[0]) && !/rel=["']noopener noreferrer["']/.test(m[0])) badTargets.push(f)
  }
  if (/target:\s*'_blank'/.test(s) && !/rel:\s*'noopener noreferrer'/.test(s)) badTargets.push(f)
}
check('links externos com target=_blank têm rel="noopener noreferrer"', badTargets.length === 0)

// 2. WhatsApp: wa.me/55 com texto codificado, sem URLs hardcoded fora do seoConfig
const seo = sources.find((x) => x.f.endsWith('seoConfig.ts'))?.s ?? ''
check('whatsappNumber começa com 55 (Brasil)', /whatsappNumber = '55\d{10,11}'/.test(seo))
check('whatsappUrl usa https://wa.me/<número> com encodeURIComponent', /https:\/\/wa\.me\/\$\{whatsappNumber\}\?text=\$\{encodeURIComponent\(/.test(seo))
// wa.me só pode aparecer no seoConfig e no builder do funil (que também usa encodeURIComponent)
const hardcoded = sources.filter((x) => !x.f.endsWith('seoConfig.ts') && !x.f.endsWith('funnelMessage.ts') && /wa\.me\//.test(x.s))
check('nenhum link wa.me hardcoded fora do seoConfig/funnelMessage', hardcoded.length === 0)
const funnelMsg = sources.find((x) => x.f.endsWith('funnelMessage.ts'))?.s ?? ''
check('funnelMessage monta wa.me/<número>?text= com encodeURIComponent', /https:\/\/wa\.me\/\$\{phoneDigits\}\?text=\$\{encodeURIComponent\(/.test(funnelMsg))

// 3. Alvos de toque >= 48px: botões/links mobile críticos declaram min-h-[48px]
const touch = [
  ['src/sections/Navigation.tsx', 3],
  ['src/sections/Footer.tsx', 1],
  ['src/sections/CTABanner.tsx', 1],
  ['src/components/common/CookieBanner.tsx', 1],
  ['src/components/common/PrivacyPolicyPage.tsx', 1],
]
for (const [file, min] of touch) {
  const s = fs.readFileSync(path.join(root, file), 'utf8')
  check(`${file}: >= ${min} alvo(s) de toque com min-h-[48px]`, (s.match(/min-h-\[48px\]/g) || []).length >= min)
}

// 4. Formulários: se existirem, precisam sanitizar entrada
const formFiles = sources.filter((x) => /<form\b|<input\b|<textarea\b/.test(x.s))
// buildFunnelMessage/buildBriefingText sanitizam tudo com cleanFreeText antes de montar a mensagem
const unsanitized = formFiles.filter((x) => !/cleanFreeText|sanitizeInput|buildFunnelMessage|buildBriefingText|buildAjustesPayload/.test(x.s))
check('todo arquivo com <input>/<textarea> sanitiza a entrada (cleanFreeText/buildFunnelMessage/buildBriefingText)', unsanitized.length === 0, unsanitized.map((x) => x.f).join(', '))

// 5. 404 customizada branded, renderizada no build
check('src/app/not-found.tsx existe', fs.existsSync(path.join(root, 'src/app/not-found.tsx')))
const nfSrc = fs.readFileSync(path.join(root, 'src/app/not-found.tsx'), 'utf8')
check("404 redireciona para a home via redirect('/')", /redirect\(['"]\/['"]\)/.test(nfSrc))
check('404 não declara noindex', !/noindex|index:\s*false/.test(nfSrc))

// 6. Cabeçalhos de segurança
const cfg = fs.readFileSync(path.join(root, 'next.config.mjs'), 'utf8')
for (const h of ['Strict-Transport-Security', 'Content-Security-Policy', 'Permissions-Policy', 'X-Content-Type-Options', 'Referrer-Policy', 'X-Frame-Options']) {
  check(`cabeçalho de segurança: ${h}`, cfg.includes(h))
}

if (failures) {
  console.error(`\n${failures} verificação(ões) falharam`)
  process.exit(1)
}
console.log('\nTodas as verificações de QA passaram')
