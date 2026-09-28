import fs from 'node:fs'
import path from 'node:path'

// Loader minimalista de .env para scripts Node (sem dependência de dotenv).
// process.env sempre tem prioridade sobre o arquivo .env.
function loadDotEnv(root) {
  const envPath = path.join(root, '.env')
  const parsed = {}

  if (!fs.existsSync(envPath)) return parsed

  const content = fs.readFileSync(envPath, 'utf8')
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq === -1) continue
    const key = line.slice(0, eq).trim()
    let value = line.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    parsed[key] = value
  }
  return parsed
}

export function loadSeoEnv(root = process.cwd()) {
  const fileEnv = loadDotEnv(root)
  const get = (key, fallback = '') => process.env[key] ?? fileEnv[key] ?? fallback

  return {
    siteUrl: get('VITE_SITE_URL', 'https://atodev.com.br').replace(/\/$/, ''),
    siteName: get('VITE_SITE_NAME', 'ATO. Soluções em Tecnologia Digital'),
    siteDescription: get(
      'VITE_SITE_DESCRIPTION',
      'Agência de tecnologia em Brasília especializada em sites, sistemas internos, automações e IA para negócios.'
    ),
    contactEmail: get('VITE_CONTACT_EMAIL', 'suporte.atocriative@gmail.com'),
    indexNowKey: get('VITE_INDEXNOW_KEY', ''),
  }
}
