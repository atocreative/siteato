import { indexNowKey } from '@lib/seoConfig'

// Serve o arquivo de chave do IndexNow (chave + ".txt" na raiz). Outros caminhos respondem 404.
export async function GET(_req: Request, { params }: { params: Promise<{ indexnow: string }> }) {
  const { indexnow } = await params
  if (indexNowKey && indexnow === `${indexNowKey}.txt`) {
    return new Response(indexNowKey, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
  }
  return new Response('Not found', { status: 404 })
}
