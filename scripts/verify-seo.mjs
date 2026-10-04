// Prova direta: lê o HTML pré-renderizado pelo `next build` e confirma os requisitos de SEO.
import fs from 'node:fs'
import path from 'node:path'

const appDir = path.join(process.cwd(), '.next', 'server', 'app')
let failures = 0

function check(label, ok) {
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${label}`)
  if (!ok) failures++
}

function read(file) {
  const full = path.join(appDir, file)
  if (!fs.existsSync(full)) {
    check(`arquivo existe: ${file}`, false)
    return ''
  }
  return fs.readFileSync(full, 'utf8')
}

const home = read('index.html')
check('home: <title> presente', /<title>[^<]{5,}<\/title>/.test(home))
check('home: meta description', /<meta name="description" content="[^"]{20,}"/.test(home))
check('home: canonical', /<link rel="canonical" href="https?:\/\/[^"]+"/.test(home))
check('home: og:title/og:image', /property="og:title"/.test(home) && /property="og:image"/.test(home))
check('home: twitter:card', /name="twitter:card" content="summary_large_image"/.test(home))
check('home: lang pt-BR', /<html lang="pt-BR"/.test(home))
check('home: JSON-LD ProfessionalService + FAQPage', /ProfessionalService/.test(home) && /FAQPage/.test(home))
check('home: conteúdo real renderizado no HTML (seções)', /id="sobre"/.test(home) && /id="clientes"/.test(home) && /id="equipe"/.test(home))
check('home: sem <div id="root"> vazio (não é SPA)', !/<div id="root"><\/div>/.test(home))
check('home: exatamente um <h1> ou mais', (home.match(/<h1[\s>]/g) || []).length >= 1)

const privacy = read('politica-de-privacidade.html')
check('privacidade: título específico', /<title>Política de Privacidade/.test(privacy))
check('privacidade: canonical próprio', /rel="canonical" href="[^"]*\/politica-de-privacidade"/.test(privacy))
check('privacidade: conteúdo LGPD no HTML', /LGPD/.test(privacy))

check('robots.txt gerado pelo Next', fs.existsSync(path.join(appDir, 'robots.txt.body')))
check('sitemap.xml gerado pelo Next', fs.existsSync(path.join(appDir, 'sitemap.xml.body')))
check('llms.txt gerado pelo Next', fs.existsSync(path.join(appDir, 'llms.txt.body')))

if (failures) {
  console.error(`\n${failures} verificação(ões) falharam`)
  process.exit(1)
}
console.log('\nTodas as verificações de SEO passaram')
