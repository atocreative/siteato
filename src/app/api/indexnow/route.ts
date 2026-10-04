import { siteUrl, privacyPolicyPath, indexNowKey } from '@lib/seoConfig'

// POST /api/indexnow — avisa o IndexNow (Bing, Yandex, Seznam) das URLs principais.
// Sem entrada do cliente: a lista de URLs é fixa, então o endpoint não pode ser usado para spam.
export const dynamic = 'force-dynamic'

export async function POST() {
  if (!indexNowKey) {
    return Response.json({ ok: false, error: 'NEXT_PUBLIC_INDEXNOW_KEY não definido' }, { status: 503 })
  }

  const payload = {
    host: new URL(siteUrl).host,
    key: indexNowKey,
    keyLocation: `${siteUrl}/${indexNowKey}.txt`,
    urlList: [`${siteUrl}/`, `${siteUrl}${privacyPolicyPath}`],
  }

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    })
    return Response.json({ ok: response.ok, status: response.status })
  } catch {
    return Response.json({ ok: false, error: 'falha ao contatar o IndexNow' }, { status: 502 })
  }
}
