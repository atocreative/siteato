import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavigationProps {
  isFloating: boolean
}

const WA = 'https://wa.me/556191995064'

export default function Navigation({ isFloating }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: '#sobre', label: 'Sobre Nós' },
    { href: '#clientes', label: 'Clientes' },
    { href: '#transformacao', label: 'Transformação' },
    { href: '#solucoes', label: 'Soluções' },
    { href: '#equipe', label: 'Equipe' },
    { href: '#contato', label: 'Contato' },
  ]

  const close = () => setMenuOpen(false)

  return (
    <>
      {/* ── Floating nav bar ── */}
      <motion.nav
        id="nav"
        initial={{ y: -100 }}
        animate={{ y: isFloating ? 0 : -100 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed z-50 flex items-center justify-between"
        style={{
          top: '12px',
          left: '20px',
          right: '20px',
          height: '60px',
          padding: '0 28px',
          background: '#0D0D0D',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '16px',
          boxShadow: '0 12px 32px -10px rgba(57,255,20,0.35)',
        }}
      >
        {/* Logo */}
        <a href="#">
          <img src="/atobranco.svg" alt="ATO." className="w-auto object-contain cursor-pointer" style={{ maxHeight: '32px' }} />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7 list-none">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[11px] font-bold uppercase tracking-[2px] text-white/80 hover:text-ato-green transition-colors duration-150"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold uppercase tracking-[2px] px-5 py-[9px] bg-ato-green text-ato-black rounded-full inline-block"
              style={{ boxShadow: '0 8px 20px -6px rgba(57,255,20,0.6)', transition: 'transform .15s, box-shadow .15s' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(2px)'
                el.style.boxShadow = '0 4px 12px -4px rgba(57,255,20,0.5)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = ''
                el.style.boxShadow = '0 8px 20px -6px rgba(57,255,20,0.6)'
              }}
            >
              Falar com a ATO.
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] cursor-pointer"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Abrir menu"
        >
          <span className="block w-6 bg-white" style={{ height: '2.5px' }}></span>
          <span className="block w-6 bg-white" style={{ height: '2.5px' }}></span>
          <span className="block w-6 bg-white" style={{ height: '2.5px' }}></span>
        </button>
      </motion.nav>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {menuOpen && isFloating && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed z-40 flex flex-col gap-5 md:hidden"
            style={{
              top: '84px',
              left: '20px',
              right: '20px',
              background: '#0D0D0D',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '16px',
              padding: '24px 28px',
              boxShadow: '0 12px 32px -10px rgba(0,0,0,0.5)',
            }}
          >
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-bold uppercase tracking-[2px] text-white/80 hover:text-ato-green transition-colors"
                onClick={close}
              >
                {link.label}
              </a>
            ))}
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold uppercase tracking-[2px] px-5 py-3 bg-ato-green text-ato-black rounded-full self-start mt-2"
              style={{ boxShadow: '0 8px 20px -6px rgba(57,255,20,0.6)' }}
              onClick={close}
            >
              Falar com a ATO.
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
