'use client'

import { LazyMotion } from 'framer-motion'

// Carrega os recursos de animação do framer-motion sob demanda (fora do bundle inicial),
// reduzindo o JS que bloqueia a thread principal no mobile.
const loadFeatures = () => import('./motionFeatures').then((mod) => mod.default)

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>
}
