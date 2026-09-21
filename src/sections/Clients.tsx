import { WireRing } from '@components/common/Stickers'

export default function Clients() {
  const logosRow1 = [
    { src: '/logos/getme.png',                 alt: 'GetMe' },
    { src: '/logos/macho.png',                 alt: 'Macho' },
    { src: '/logos/mcsneakers.png',            alt: 'MC Sneakers' },
    { src: '/logos/private.png',               alt: 'Private' },
    { src: '/logos/rfit.png',                  alt: 'RFit' },
    { src: '/logos/guimecell.webp',            alt: 'Guimecell' },
    { src: '/logos/logo-bs-diagnostica.webp',  alt: 'BS Diagnóstica' },
  ]

  const logosRow2 = [
    { src: '/logos/logo-veratti-joias.png',    alt: 'Veratti Joias' },
    { src: '/logos/logo-hold.png',             alt: 'Hold' },
    { src: '/logos/logo-pit.png',              alt: 'Marcos Pit' },
    { src: '/logos/logo-emblema-dourado.webp', alt: 'Cliente ATO' },
    { src: '/logos/logo-arvore-verde.avif',    alt: 'Cliente ATO' },
    { src: '/logos/logo-funn.avif',            alt: 'Funn' },
    { src: '/logos/logo.avif',                 alt: 'Cliente ATO' },
    { src: '/logos/massoterapia.png',          alt: 'Massoterapia' },
  ]

  return (
    <section id="clientes" className="relative text-ato-black py-20" style={{ backgroundColor: '#0CBF0C' }}>
      {/* Header */}
      <div className="container mb-12 relative">
        <div className="text-center mb-12 relative">
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl uppercase leading-tight tracking-tight break-words mx-auto text-black">
            NOSSOS<br />CLIENTES
          </h2>
          <WireRing className="hidden md:block absolute -top-6 right-0 w-14 h-14 rotate-[-6deg] opacity-70" color="#0D0D0D" />
        </div>
      </div>

      {/* Logos — duas linhas, fundo transparente, com fade nas bordas */}
      <div
        className="relative overflow-hidden w-full"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div className="flex w-max animate-scroll-marquee-fast md:animate-scroll-marquee">
          {[...logosRow1, ...logosRow1, ...logosRow1, ...logosRow1].map((logo, i) => (
            <div
              key={i}
              className="inline-flex items-center justify-center flex-shrink-0 px-10"
              style={{ height: '120px' }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="object-contain grayscale opacity-75 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                style={{ width: '150px', height: '70px' }}
              />
            </div>
          ))}
        </div>
        <div className="flex w-max animate-scroll-marquee-reverse md:animate-scroll-marquee-reverse mt-2">
          {[...logosRow2, ...logosRow2, ...logosRow2, ...logosRow2].map((logo, i) => (
            <div
              key={i}
              className="inline-flex items-center justify-center flex-shrink-0 px-10"
              style={{ height: '120px' }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="object-contain grayscale opacity-75 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                style={{ width: '150px', height: '70px' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
