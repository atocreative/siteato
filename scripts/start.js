// Railway/Docker 502 Bad Gateway Guard.
// Plataformas como Railway injetam a porta pública via process.env.PORT e esperam que
// o processo escute em 0.0.0.0. Se o servidor escutar apenas em localhost/127.0.0.1
// (comportamento padrão de alguns servidores estáticos conforme o SO), o proxy público
// não alcança o container e o deploy responde 502 mesmo com o build/log verde.
// Este script força bind explícito em 0.0.0.0:$PORT antes de subir o "serve".

import { spawn } from 'node:child_process'

const port = process.env.PORT || '3000'
const host = '0.0.0.0'

console.log(`[start] servindo dist/ em tcp://${host}:${port} (Railway 502 guard ativo)`)

const isWindows = process.platform === 'win32'
const child = spawn(
  isWindows ? 'npx.cmd' : 'npx',
  ['serve', '-s', 'dist', '-l', `tcp://${host}:${port}`],
  { stdio: 'inherit' }
)

child.on('error', (error) => {
  console.error('[start] falha ao iniciar o servidor:', error)
  process.exit(1)
})

child.on('exit', (code) => {
  process.exit(code ?? 0)
})
