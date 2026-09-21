// Roda no "postbuild": notifica o IndexNow (Bing/Yandex/Seznam) automaticamente a cada
// deploy, sem exigir nenhum passo manual. Nunca falha o build — apenas registra avisos.

import { loadSeoEnv } from './lib/env.js'

const env = loadSeoEnv(process.cwd())

async function submit() {
  if (!env.indexNowKey) {
    console.warn('[indexnow] VITE_INDEXNOW_KEY não definido — envio pulado.')
    return
  }

  const host = new URL(env.siteUrl).host
  const payload = {
    host,
    key: env.indexNowKey,
    keyLocation: `${env.siteUrl}/${env.indexNowKey}.txt`,
    urlList: [`${env.siteUrl}/`, `${env.siteUrl}/politica-de-privacidade`],
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
