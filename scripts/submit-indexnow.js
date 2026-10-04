// Roda no "postbuild": notifica o IndexNow (Bing/Yandex/Seznam) a cada deploy.
// Nunca falha o build — apenas registra avisos.

const read = (key) => (process.env[`NEXT_PUBLIC_${key}`] || process.env[`VITE_${key}`] || '').trim()
const siteUrl = (read('SITE_URL') || 'https://atodev.com.br').replace(/\/$/, '')
const indexNowKey = read('INDEXNOW_KEY')

async function submit() {
  if (process.env.SKIP_INDEXNOW) {
    console.warn('[indexnow] SKIP_INDEXNOW definido — envio pulado.')
    return
  }
  if (!indexNowKey) {
    console.warn('[indexnow] NEXT_PUBLIC_INDEXNOW_KEY não definido — envio pulado.')
    return
  }

  const host = new URL(siteUrl).host
  const payload = {
    host,
    key: indexNowKey,
    keyLocation: `${siteUrl}/${indexNowKey}.txt`,
    urlList: [`${siteUrl}/`, `${siteUrl}/contato`, `${siteUrl}/politica-de-privacidade`],
  }

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    })
    console.log(`[indexnow] status ${response.status} para ${host}`)
  } catch (error) {
    console.warn('[indexnow] falha ao notificar (ignorado, não bloqueia o build):', error.message)
  }
}

await submit()
