export default function Marquee() {
  const items = [
    'ATO. TECNOLOGIA DIGITAL',
    'SISTEMAS & APPS',
    'SOCIAL MEDIA COM IA',
    'SITES QUE VENDEM',
    'BRASÍLIA — DF',
    'CRESCIMENTO REAL'
  ]

  return (
    <div className="bg-ato-black border-y-brutal border-ato-white overflow-hidden py-3">
      <div className="flex animate-scroll-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="inline-flex items-center gap-10 px-10">
            <span className="font-display font-black text-2xl text-white tracking-wide">{item}</span>
            <span className="w-1.5 h-1.5 bg-ato-green rounded-full flex-shrink-0"></span>
          </div>
        ))}
      </div>
    </div>
  )
}
