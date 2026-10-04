'use client'

import Navigation from '@sections/Navigation'
import { useScroll } from '@hooks/useScroll'

export default function FloatingNavigation() {
  const isScrolled = useScroll(0.7)
  return <Navigation isFloating={isScrolled} />
}
