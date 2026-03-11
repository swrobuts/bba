import { useEffect, useRef, useState, useCallback } from 'react'

/* ─── Scroll Reveal ─── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function Reveal({ className = '', children, delay = '' }: { className?: string; children: React.ReactNode; delay?: string }) {
  const ref = useScrollReveal()
  return <div ref={ref} className={`fade-up ${delay} ${className}`}>{children}</div>
}

const SG = { fontFamily: 'Space Grotesk, system-ui, sans-serif' }
const ORANGE = '#E87722'
const INK = '#111'

/* ═══════════════════════════════════════════════════════════════ */

export default function App() {
  const [gateOpen, setGateOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const weicheEndRef = useRef<HTMLDivElement>(null)

  const openGate = useCallback(() => {
    setGateOpen(true)
    setTimeout(() => contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 400)
  }, [])

  /* Auto-open gate when user scrolls past Weiche without clicking BBA */
  useEffect(() => {
    const sentinel = weicheEndRef.current
    if (!sentinel) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGateOpen(prev => { if (!prev) return true; return prev })
          obs.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -20% 0px' }
    )
    obs.observe(sentinel)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <Nav visible={gateOpen} />
      <Hero />
      <Weiche onChooseBBA={openGate} gateOpen={gateOpen} />
      <div ref={weicheEndRef} className="h-1" aria-hidden />
      <div
        ref={contentRef}
        className={`transition-all duration-1000 ${gateOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none max-h-0 overflow-hidden'}`}
        style={gateOpen ? {} : { maxHeight: 0 }}
      >
        <Fallstudie />
        <DemingQuote />
        <WasDuLernst />
        <SemesterFahrplan />
        <Berufswelt />
        <PasstDu />
        <Vorteile />
        <Wuerzburg />
        <CTA />
        <Footer />
      </div>
    </div>
  )
}


/* ─── NAV ─── */
function Nav({ visible }: { visible: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  const links = [
    { href: '#fallstudie', label: 'Fallstudie' },
    { href: '#studium', label: 'Studium' },
    { href: '#fahrplan', label: 'Fahrplan' },
    { href: '#berufswelt', label: 'Berufswelt' },
    { href: '#wuerzburg', label: 'Würzburg' },
    { href: '#bewerben', label: 'Bewerben' },
  ]
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${!visible ? '-translate-y-full opacity-0' : ''} ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2">
          <span className="font-bold text-lg tracking-tight" style={{ ...SG, color: ORANGE }}>BBA</span>
          <span className="text-sm text-neutral-400 hidden sm:inline">THWS Würzburg</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">{l.label}</a>
          ))}
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2" aria-label="Menü">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></>}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-3">
          {links.map(l => <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block text-base text-neutral-700">{l.label}</a>)}
        </div>
      )}
    </nav>
  )
}


/* ─── HERO ─── */
function Hero() {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600)
    const t2 = setTimeout(() => setPhase(2), 1800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])
  return (
    <section className="min-h-[80vh] flex flex-col justify-center bg-white">
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-12">
        <div className="flex items-start justify-between gap-12">
          <div>
            <p className={`text-sm font-medium tracking-[0.2em] uppercase mb-8 transition-all duration-700 ${phase >= 0 ? 'opacity-100' : 'opacity-0 translate-y-4'}`} style={{ color: ORANGE }}>
              Bachelor Business Analytics
            </p>
            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[1.04] tracking-tight" style={SG}>
              <span className={`block transition-all duration-700 ${phase >= 1 ? 'opacity-100' : 'opacity-0 translate-y-8'}`} style={{ color: INK }}>
                Jeden Tag treffen
              </span>
              <span className={`block transition-all duration-700 delay-100 ${phase >= 1 ? 'opacity-100' : 'opacity-0 translate-y-8'}`} style={{ color: INK }}>
                Unternehmen tausende
              </span>
              <span className={`block transition-all duration-700 delay-200 ${phase >= 1 ? 'opacity-100' : 'opacity-0 translate-y-8'}`} style={{ color: ORANGE }}>
                Entscheidungen.
              </span>
            </h1>
            <p className={`text-xl sm:text-2xl text-neutral-400 mt-8 max-w-lg transition-all duration-700 delay-300 ${phase >= 2 ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
              Die Frage ist: Wie?
            </p>
          </div>
          <div className={`hidden lg:flex flex-col items-center gap-3 pt-20 transition-all duration-700 delay-500 ${phase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent('https://swrobuts.github.io/bba/')}&color=111111&bgcolor=FFFFFF`}
              alt="QR-Code" width={140} height={140}
            />
            <p className="text-xs text-neutral-300">Am Handy öffnen</p>
          </div>
        </div>
      </div>
    </section>
  )
}


/* ─── DIE WEICHE ─── */
interface WeicheProps { onChooseBBA: () => void; gateOpen: boolean }

function Weiche({ onChooseBBA, gateOpen }: WeicheProps) {
  const [clicked, setClicked] = useState<Record<string, boolean>>({})
  const [shaking, setShaking] = useState<string | null>(null)
  const [bbaChosen, setBbaChosen] = useState(false)

  /* Auto-highlight BBA when gate opens via scroll (not via click) */
  useEffect(() => {
    if (gateOpen && !bbaChosen) setBbaChosen(true)
  }, [gateOpen, bbaChosen])

  const wrong = [
    { id: 'bauch', title: 'Bauchgefühl', desc: 'Erfahrung und Intuition reichen.', fail: 'Unser Gehirn täuscht uns häufiger, als wir denken. Wir überschätzen, was wir kennen, und übersehen, was wir nicht wissen.' },
    { id: 'raten', title: 'Einfach raten', desc: 'Wird schon irgendwie passen.', fail: 'Raten ist nicht nachvollziehbar. Wenn es schiefgeht, weißt du nicht warum — und wenn es klappt, auch nicht.' },
    { id: 'chef', title: 'Der Chef entscheidet', desc: 'Wer am längsten da ist, weiß es am besten.', fail: 'Was gestern funktioniert hat, kann morgen falsch sein. Märkte verändern sich — Erfahrung allein reicht nicht.' },
  ]

  const handleWrong = (id: string) => {
    if (bbaChosen || clicked[id]) return
    setShaking(id)
    setClicked(prev => ({ ...prev, [id]: true }))
    setTimeout(() => setShaking(null), 600)
  }
  const handleBBA = () => { if (bbaChosen) return; setBbaChosen(true); setTimeout(onChooseBBA, 800) }
  const allWrong = wrong.every(o => clicked[o.id])

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-center mb-4" style={{ ...SG, color: INK }}>
            Wie würdest du entscheiden?
          </h2>
          <p className="text-lg text-neutral-400 text-center max-w-xl mx-auto mb-16">
            Ein Getränkehersteller will einen neuen Eistee launchen.<br />Millionen-Budget. Vier Ansätze.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {wrong.map((o, i) => (
            <Reveal key={o.id} delay={`stagger-${i + 1}`}>
              <button
                onClick={() => handleWrong(o.id)}
                disabled={bbaChosen}
                className={`w-full text-left p-7 transition-all duration-500
                  ${clicked[o.id] ? 'bg-neutral-50' : 'bg-white hover:bg-neutral-50'}
                  ${shaking === o.id ? 'animate-shake' : ''}
                  ${bbaChosen ? 'opacity-30' : ''}`}
                style={{ border: '1px solid', borderColor: clicked[o.id] ? '#e5e5e5' : '#e5e5e5' }}
              >
                <p className={`text-lg font-bold mb-1 ${clicked[o.id] ? 'text-neutral-300 line-through' : 'text-neutral-800'}`} style={SG}>{o.title}</p>
                {!clicked[o.id]
                  ? <p className="text-sm text-neutral-400">{o.desc}</p>
                  : <p className="text-sm text-neutral-400">{o.fail}</p>
                }
              </button>
            </Reveal>
          ))}

          <Reveal delay="stagger-4">
            <button
              onClick={handleBBA}
              disabled={bbaChosen}
              className={`w-full text-left p-7 transition-all duration-500
                ${bbaChosen ? 'bg-white' : 'bg-white hover:bg-neutral-50'}`}
              style={{ border: `2px solid ${bbaChosen ? ORANGE : '#e5e5e5'}` }}
            >
              <p className={`text-lg font-bold mb-1 ${bbaChosen ? '' : 'text-neutral-800'}`} style={{ ...SG, color: bbaChosen ? ORANGE : undefined }}>Business Analytics</p>
              {!bbaChosen
                ? <p className="text-sm text-neutral-400">Daten sammeln, analysieren, verstehen — und dann entscheiden.</p>
                : <p className="text-sm" style={{ color: ORANGE }}>Genau. Nicht raten, sondern wissen.</p>
              }
              {allWrong && !bbaChosen && <div className="absolute top-3 right-3 w-2 h-2 rounded-full animate-pulse" style={{ background: ORANGE }} />}
            </button>
          </Reveal>
        </div>

        {allWrong && !bbaChosen && (
          <Reveal><p className="text-center mt-8 text-neutral-300">Nur noch eine Option.</p></Reveal>
        )}
      </div>
    </section>
  )
}


/* ─── FALLSTUDIE — Dark, cinematic ─── */
function Fallstudie() {
  const [showData, setShowData] = useState(false)
  return (
    <section id="fallstudie" className="py-28 lg:py-40" style={{ background: INK }}>
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <p className="text-sm font-medium tracking-[0.2em] uppercase mb-6" style={{ color: ORANGE }}>Zurück zum Eistee</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6" style={SG}>
            Gleiche Leute.<br />Bessere Methoden.
          </h2>
          <p className="text-lg text-neutral-500 max-w-2xl mb-16">
            Zwei Teams, gleiches Produkt, gleiches Budget. Eines verlässt sich auf Intuition. Das andere auf Daten.
          </p>
        </Reveal>

        <Reveal>
          <div className="flex gap-0 mb-12">
            <button onClick={() => setShowData(false)} className={`px-6 py-3 text-sm font-medium transition-all ${!showData ? 'text-white' : 'text-neutral-600 hover:text-neutral-400'}`} style={!showData ? { background: ORANGE } : {}}>
              Team Bauchgefühl
            </button>
            <button onClick={() => setShowData(true)} className={`px-6 py-3 text-sm font-medium transition-all ${showData ? 'text-white' : 'text-neutral-600 hover:text-neutral-400'}`} style={showData ? { background: ORANGE } : {}}>
              Team Analytics
            </button>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <Reveal>
            <div className="transition-all duration-500">
              <p className="text-xs font-medium tracking-[0.15em] uppercase text-neutral-600 mb-8">Vorgehen</p>
              {!showData ? (
                <div className="space-y-6">
                  {[
                    ['Zielgruppe', '„Alle, die Eistee mögen." Keine Segmentierung.'],
                    ['Platzierung', 'Gleichmäßig auf alle 200 Märkte.'],
                    ['Timing', 'Launch im Januar — das Produkt ist halt fertig.'],
                    ['Preis', '2,49 € — „ungefähr wie die Konkurrenz."'],
                  ].map(([t, d], i) => (
                    <div key={i}>
                      <p className="text-white font-medium mb-1">{t}</p>
                      <p className="text-neutral-500 text-sm">{d}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {[
                    ['Kundensegmentierung', 'Clusteranalyse identifiziert Kernzielgruppe — 3× höhere Kaufwahrscheinlichkeit.', 'Marketing + Statistik'],
                    ['Standortoptimierung', 'Geo-Daten + Abverkaufshistorie zeigen die 60 besten Märkte.', 'Business Intelligence'],
                    ['Timing', 'Saisonale Nachfragekurve: Eistee-Peak im Mai/Juni.', 'Ökonometrie'],
                    ['Pricing', 'Conjoint-Analyse: Zielgruppe zahlt bis 2,89 € für Bio.', 'Marktforschung'],
                    ['Prognose', 'ML-Modell sagt Nachfrage pro Region voraus.', 'Data Science'],
                    ['Kostenkontrolle', 'Echtzeit-Dashboard trackt jeden Cent.', 'Controlling + BI'],
                    ['Datenschutz', 'Kundendaten DSGVO-konform erhoben.', 'Recht'],
                  ].map(([t, d, m], i) => (
                    <div key={i}>
                      <p className="text-white font-medium mb-1">{t}</p>
                      <p className="text-neutral-500 text-sm">{d}</p>
                      <p className="text-neutral-700 text-xs mt-0.5">{m}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay="stagger-2">
            <div className="transition-all duration-500">
              <p className="text-xs font-medium tracking-[0.15em] uppercase text-neutral-600 mb-8">Ergebnis nach 6 Monaten</p>
              {!showData ? (
                <div>
                  <p className="text-[clamp(4rem,10vw,8rem)] font-bold leading-none text-red-500/60 mb-4" style={SG}>40%</p>
                  <p className="text-lg text-neutral-500 mb-8">der Ware bleibt im Regal.</p>
                  <p className="text-sm text-neutral-600">Im Winter will niemand Eistee. Budget verbrannt.</p>
                  <p className="text-sm text-neutral-700 mt-2">Das Produkt war gut. Die Entscheidungen nicht.</p>
                </div>
              ) : (
                <div>
                  <p className="text-[clamp(4rem,10vw,8rem)] font-bold leading-none mb-4" style={{ ...SG, color: '#34d399' }}>92%</p>
                  <p className="text-lg text-neutral-500 mb-8">Abverkauf. Nachbestellungen ab Woche 3.</p>
                  <p className="text-sm text-neutral-600">Daten haben gezeigt, was funktioniert.</p>
                  <p className="text-sm text-neutral-700 mt-2">Gleiche Leute. Bessere Methoden.</p>
                </div>
              )}
            </div>
          </Reveal>
        </div>

        {showData && (
          <Reveal>
            <div className="mt-16 pt-12 border-t border-neutral-800">
              <p className="text-white text-lg font-medium mb-8" style={SG}>Jede dieser Methoden lernst du im BBA:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-6">
                {[
                  ['Clusteranalyse', 'Semester 4'],
                  ['Geo-Datenanalyse', 'Semester 3'],
                  ['Zeitreihenanalyse', 'Semester 3'],
                  ['Conjoint-Analyse', 'Semester 4'],
                  ['ML-Prognosen', 'Semester 6'],
                  ['Dashboard-Design', 'Semester 2–3'],
                  ['Budget-Monitoring', 'Semester 4'],
                  ['Datenschutz', 'Semester 1'],
                ].map(([s, sem], i) => (
                  <div key={i}>
                    <p style={{ color: ORANGE }} className="text-sm font-medium">{s}</p>
                    <p className="text-neutral-600 text-xs">{sem}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}


/* ─── DEMING ─── */
function DemingQuote() {
  return (
    <section className="py-28 lg:py-40 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <p className="text-3xl sm:text-4xl lg:text-[3.5rem] font-bold leading-snug tracking-tight mb-8" style={{ ...SG, color: INK }}>
            &ldquo;In God we trust; all others must bring data.&rdquo;
          </p>
          <p className="text-neutral-400">
            W. Edwards Deming
          </p>
        </Reveal>
      </div>
    </section>
  )
}


/* ─── MODUL-NETZWERK ─── */
function WasDuLernst() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const animRef = useRef(0)

  const modules = [
    { id: 'bwl', label: 'BWL', x: 0.12, y: 0.22, cat: 'w' },
    { id: 'mktg', label: 'Marketing', x: 0.08, y: 0.45, cat: 'w' },
    { id: 'ctrl', label: 'Controlling', x: 0.15, y: 0.68, cat: 'w' },
    { id: 'mafo', label: 'Marktforschung', x: 0.22, y: 0.88, cat: 'w' },
    { id: 'dioek', label: 'Dig. Ökonomie', x: 0.06, y: 0.78, cat: 'w' },
    { id: 'stat', label: 'Statistik', x: 0.45, y: 0.15, cat: 't' },
    { id: 'prog', label: 'Programmieren', x: 0.55, y: 0.35, cat: 't' },
    { id: 'bint', label: 'Business Intelligence', x: 0.42, y: 0.55, cat: 't' },
    { id: 'oeko', label: 'Ökonometrie', x: 0.58, y: 0.72, cat: 't' },
    { id: 'dav', label: 'DAV', x: 0.50, y: 0.90, cat: 't' },
    { id: 'ds', label: 'Data Science', x: 0.65, y: 0.52, cat: 't' },
    { id: 'db', label: 'Datenbanken', x: 0.70, y: 0.30, cat: 't' },
    { id: 'recht', label: 'Recht', x: 0.88, y: 0.25, cat: 'u' },
    { id: 'pm', label: 'Projektmgmt.', x: 0.92, y: 0.50, cat: 'u' },
    { id: 'ethik', label: 'Ethik', x: 0.85, y: 0.72, cat: 'u' },
    { id: 'wiss', label: 'Wiss. Arbeiten', x: 0.80, y: 0.88, cat: 'u' },
  ]

  const edges: [string, string][] = [
    ['bwl', 'stat'], ['bwl', 'prog'], ['mktg', 'mafo'], ['mktg', 'bint'], ['mktg', 'stat'],
    ['ctrl', 'bint'], ['ctrl', 'oeko'], ['mafo', 'stat'], ['mafo', 'oeko'], ['mafo', 'dav'],
    ['stat', 'prog'], ['stat', 'oeko'], ['stat', 'ds'], ['prog', 'dav'], ['prog', 'db'],
    ['prog', 'ds'], ['bint', 'db'], ['bint', 'ds'], ['bint', 'dav'], ['oeko', 'ds'],
    ['oeko', 'dav'], ['dav', 'ds'], ['recht', 'ethik'], ['recht', 'dioek'], ['pm', 'bint'],
    ['pm', 'ctrl'], ['ethik', 'ds'], ['ethik', 'dioek'], ['wiss', 'stat'], ['wiss', 'oeko'],
    ['dioek', 'mktg'], ['dioek', 'bint'],
  ]

  const catColors: Record<string, string> = { w: ORANGE, t: '#555', u: '#999' }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true) }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frame = 0
    const introFrames = 120
    const phases = modules.map(() => Math.random() * Math.PI * 2)
    const speeds = modules.map(() => 0.006 + Math.random() * 0.01)
    const amps = modules.map(() => 0.002 + Math.random() * 0.004)

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      const W = rect.width, H = rect.height
      ctx.clearRect(0, 0, W, H)

      const t = Math.min(frame / introFrames, 1)
      const ease = 1 - Math.pow(1 - t, 3)

      const pos = (i: number) => {
        const m = modules[i]
        const fx = t >= 1 ? Math.sin(frame * speeds[i] + phases[i]) * amps[i] : 0
        const fy = t >= 1 ? Math.cos(frame * speeds[i] * 0.7 + phases[i] + 1) * amps[i] : 0
        return { x: (m.x + fx) * W, y: (m.y + fy) * H }
      }

      // edges
      const ep = Math.min(t * 1.5, 1)
      edges.forEach(([fId, tId], idx) => {
        const fi = modules.findIndex(m => m.id === fId)
        const ti = modules.findIndex(m => m.id === tId)
        const p = Math.max(0, Math.min((ep - idx * 0.015) * 2, 1))
        if (p <= 0) return
        const f = pos(fi), to = pos(ti)
        const cross = modules[fi].cat !== modules[ti].cat
        const pulse = t >= 1 ? 0.5 + 0.5 * Math.sin(frame * 0.015 + idx * 0.3) : 1
        ctx.strokeStyle = cross
          ? `rgba(232,119,34,${0.15 * p * pulse})`
          : `rgba(0,0,0,${0.06 * p * pulse})`
        ctx.lineWidth = cross ? 1.5 : 0.5
        ctx.beginPath(); ctx.moveTo(f.x, f.y)
        ctx.lineTo(p < 1 ? f.x + (to.x - f.x) * p : to.x, p < 1 ? f.y + (to.y - f.y) * p : to.y)
        ctx.stroke()
      })

      // nodes
      modules.forEach((m, i) => {
        const d = i * 0.03
        const np = Math.max(0, Math.min((ease - d) * 1.5, 1))
        if (np <= 0) return
        const p = pos(i)
        const r = Math.max(6, W * 0.013) * np * (t >= 1 ? 1 + 0.06 * Math.sin(frame * 0.012 + phases[i]) : 1)

        ctx.beginPath(); ctx.arc(p.x, p.y, r * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = m.cat === 'w' ? `rgba(232,119,34,${0.06 * np})` : `rgba(0,0,0,${0.03 * np})`
        ctx.fill()

        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fillStyle = catColors[m.cat]; ctx.globalAlpha = np; ctx.fill(); ctx.globalAlpha = 1

        const fs = Math.max(11, W * 0.015)
        ctx.font = `600 ${fs}px 'Space Grotesk', system-ui`
        ctx.fillStyle = `rgba(17,17,17,${np * 0.7})`
        ctx.textAlign = 'center'
        ctx.fillText(m.label, p.x, p.y - r - 7)
      })

      frame++
      animRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [isVisible])

  return (
    <section id="studium" className="py-28 lg:py-40 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="text-sm font-medium tracking-[0.2em] uppercase mb-6" style={{ color: ORANGE }}>Das Studium</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4" style={{ ...SG, color: INK }}>
            Drei Welten. Ein Studium.
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mb-12">
            Business Analytics verbindet Wirtschaftswissen, Technologie und methodische Kompetenz. Jedes Modul baut auf anderen auf.
          </p>
        </Reveal>

        <Reveal>
          <div className="flex gap-8 mb-10 text-sm text-neutral-400">
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ background: ORANGE }} /> Wirtschaft</span>
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-neutral-500" /> Technologie</span>
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-neutral-300" /> Überfachlich</span>
          </div>
        </Reveal>

        <div ref={containerRef} className="relative w-full" style={{ aspectRatio: '16/10' }}>
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
      </div>
    </section>
  )
}


/* ─── FAHRPLAN — Animierte Scroll-Timeline ─── */
function SemesterFahrplan() {
  const semesters = [
    { nr: 1, title: 'Grundlagen', skill: 'Du verstehst die Sprache der Wirtschaft und Technik.', items: ['Allgemeine BWL', 'Mathematik 1', 'Mikroökonomik', 'Wirtschaftsinformatik', 'Projekt- & IT-Management', 'Recht & Datenschutz'] },
    { nr: 2, title: 'Methoden', skill: 'Du kannst Daten erheben, programmieren und statistisch auswerten.', items: ['Mathematik 2', 'Grundlagen der Statistik', 'Informatik & Programmieren', 'Makroökonomik', 'Marketing', 'Wiss. Arbeiten & Ethik'] },
    { nr: 3, title: 'Analytics', skill: 'Du beherrschst die Werkzeuge der Datenanalyse.', items: ['Operations Research', 'Ökonometrie', 'Datenbanken', 'Business Intelligence', 'Beschaffung & Logistik', 'Business English'] },
    { nr: 4, title: 'Vertiefung', skill: 'Du wendest Analytics auf echte Geschäftsfragen an.', items: ['Statistik für Data Science', 'Datenaufbereitung (DAV)', 'Markt- & Konsumforschung', 'Digitale Ökonomie', 'Controlling', 'Wahlpflichtmodul'] },
    { nr: 5, title: 'Praxis', skill: 'Du arbeitest selbstständig mit Daten im Unternehmen.', items: ['Fachpraktikum im Unternehmen', 'Praxisseminar', 'Eigenes Datenprojekt'] },
    { nr: 6, title: 'Spezialisierung', skill: 'Du entwickelst Expertise in deinem Schwerpunkt.', items: ['Vertiefung Business Analytics', 'Projekt Business Analytics 1', 'Schwerpunkt BWL', 'AWPM'] },
    { nr: 7, title: 'Abschluss', skill: 'Du löst eigenständig komplexe Analytics-Projekte.', items: ['Projekt Business Analytics 2', 'Schwerpunkt BWL', 'Bachelorarbeit & Seminar'] },
  ]

  return (
    <section id="fahrplan" className="py-28 lg:py-40 bg-neutral-50">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          <p className="text-sm font-medium tracking-[0.2em] uppercase mb-6" style={{ color: ORANGE }}>Der Fahrplan</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4" style={{ ...SG, color: INK }}>
            7 Semester. Dein Weg.
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mb-20">
            Vom ersten Datensatz bis zur eigenen Bachelorarbeit — jedes Semester baut auf dem vorherigen auf.
          </p>
        </Reveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-px bg-neutral-200" />

          <div className="space-y-16 lg:space-y-20">
            {semesters.map((sem, i) => (
              <Reveal key={sem.nr} delay={i < 4 ? `stagger-${i + 1}` : ''}>
                <div className="flex gap-8 sm:gap-12 items-start">
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white text-sm sm:text-base font-bold"
                      style={{ ...SG, background: ORANGE }}
                    >
                      {sem.nr}
                    </div>
                  </div>

                  <div className="pt-1">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2" style={{ ...SG, color: INK }}>{sem.title}</h3>
                    <p className="text-neutral-400 mb-6 text-sm">{sem.skill}</p>

                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      {sem.items.map((item, j) => (
                        <span key={j} className="text-sm text-neutral-600">{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="mt-16 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-sm text-neutral-400">210 ECTS · 7 Semester · Bachelor of Science</p>
            <a
              href="https://business.thws.de/studierende/studiengaenge/bachelor-business-analytics/spostudienplan/"
              target="_blank" rel="noopener noreferrer"
              className="text-sm font-medium hover:underline" style={{ color: ORANGE }}
            >
              Alle Module im Detail →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}


/* ─── BERUFSWELT ─── */
function Berufswelt() {
  const [view, setView] = useState<'profile' | 'stellen' | 'ki'>('profile')

  const profiles = [
    { title: 'Business Analyst', ctx: 'Unternehmensberatung', desc: 'Du analysierst, wie ein Unternehmen arbeitet, findest Schwachstellen und schlägst datenbasierte Verbesserungen vor.' },
    { title: 'Data Analyst', ctx: 'Konzern / Mittelstand', desc: 'Du wertest große Datenmengen aus, erkennst Muster und erklärst der Geschäftsführung, was die Zahlen bedeuten.' },
    { title: 'BI-Consultant', ctx: 'IT-Beratung', desc: 'Du baust die Systeme, mit denen Unternehmen ihre Daten sichtbar machen — von Reports bis zu Dashboards.' },
    { title: 'Marketing Analyst', ctx: 'E-Commerce / Agentur', desc: 'Du findest heraus, welche Werbung wirkt und welche Kunden kaufen — und hilfst dem Marketing, bessere Entscheidungen zu treffen.' },
    { title: 'Controlling-Analyst', ctx: 'Finanzen', desc: 'Du modellierst Budgets, erstellst Prognosen und zeigst dem Management, wo das Geld besser eingesetzt wäre.' },
    { title: 'Data Scientist', ctx: 'Tech / Startup', desc: 'Du baust Algorithmen, die aus vergangenen Daten die Zukunft vorhersagen.' },
  ]

  const stellen = [
    { firma: 'BMW Group', titel: 'Junior Business Analyst', ort: 'München', gehalt: '52–62k €', tags: ['SQL', 'Power BI'], link: 'https://www.stepstone.de/jobs/business-analyst/in-muenchen' },
    { firma: 'McKinsey', titel: 'Business Analyst', ort: 'Frankfurt', gehalt: '65–75k €', tags: ['Datenanalyse', 'Excel'], link: 'https://www.linkedin.com/jobs/business-analyst-jobs-germany/' },
    { firma: 'Zalando', titel: 'Data Analyst Marketing', ort: 'Berlin', gehalt: '48–58k €', tags: ['Python', 'SQL'], link: 'https://www.stepstone.de/jobs/data-analyst/in-berlin' },
    { firma: 'Siemens', titel: 'BI Consultant', ort: 'Erlangen', gehalt: '55–65k €', tags: ['Power BI', 'Azure'], link: 'https://www.stepstone.de/jobs/business-intelligence' },
    { firma: 'Deutsche Bank', titel: 'Risk Analyst', ort: 'Frankfurt', gehalt: '58–68k €', tags: ['R', 'Statistik'], link: 'https://careers.db.com/professionals/search-roles/' },
    { firma: 'Bosch', titel: 'Data Scientist (Junior)', ort: 'Stuttgart', gehalt: '55–65k €', tags: ['Python', 'ML'], link: 'https://www.stepstone.de/jobs/data-scientist' },
  ]

  const tabs = [
    { key: 'profile' as const, label: 'Berufsprofile' },
    { key: 'stellen' as const, label: 'Stellenanzeigen' },
    { key: 'ki' as const, label: 'Warum jetzt' },
  ]

  return (
    <section id="berufswelt" className="py-28 lg:py-40 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <p className="text-sm font-medium tracking-[0.2em] uppercase mb-6" style={{ color: ORANGE }}>Nach dem Studium</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4" style={{ ...SG, color: INK }}>
            Was du damit<br />machen kannst.
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mb-16">
            Mit einem BBA-Abschluss bist du nicht auf einen Job festgelegt.
          </p>
        </Reveal>

        <Reveal>
          <div className="flex gap-0 mb-12">
            {tabs.map(t => (
              <button key={t.key} onClick={() => setView(t.key)}
                className={`px-5 py-2.5 text-sm font-medium transition-all ${view === t.key ? 'text-white' : 'text-neutral-400 hover:text-neutral-700'}`}
                style={view === t.key ? { background: ORANGE } : {}}
              >{t.label}</button>
            ))}
          </div>
        </Reveal>

        {view === 'profile' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {profiles.map((p, i) => (
              <Reveal key={i} delay={i < 6 ? `stagger-${Math.min(i + 1, 4)}` : ''}>
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase text-neutral-300 mb-2">{p.ctx}</p>
                  <h3 className="text-xl font-bold mb-2" style={{ ...SG, color: INK }}>{p.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {view === 'stellen' && (
          <div>
            <p className="text-xs text-neutral-300 mb-8">Beispielhafte Profile nach Vorbild realer Ausschreibungen</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {stellen.map((s, i) => (
                <Reveal key={i} delay={i < 6 ? `stagger-${Math.min(i + 1, 4)}` : ''}>
                  <a href={s.link} target="_blank" rel="noopener noreferrer" className="block group">
                    <p className="font-bold mb-0.5 group-hover:underline" style={{ ...SG, color: INK }}>{s.firma}</p>
                    <p className="text-sm mb-1" style={{ color: ORANGE }}>{s.titel}</p>
                    <p className="text-xs text-neutral-400 mb-3">{s.ort} · {s.gehalt}</p>
                    <div className="flex gap-2">{s.tags.map((t, j) => <span key={j} className="text-xs text-neutral-400 bg-neutral-50 px-2 py-0.5">{t}</span>)}</div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {view === 'ki' && (
          <div className="max-w-3xl space-y-12">
            <Reveal>
              <h3 className="text-2xl font-bold mb-3" style={{ ...SG, color: INK }}>KI verändert den Arbeitsmarkt. Aber nicht so, wie viele denken.</h3>
              <p className="text-neutral-500">Automatisiert werden repetitive Aufgaben. Was bleibt: die richtigen Fragen stellen, Ergebnisse einordnen, Entscheidungen treffen. Genau das lernt man im BBA.</p>
            </Reveal>
            <Reveal>
              <div className="grid sm:grid-cols-3 gap-8 py-8">
                {[
                  ['4.000+', 'Offene Data-Analyst-Stellen in DE'],
                  ['52–67k €', 'Durchschnittliches Einstiegsgehalt'],
                  ['+25%', 'Jährliches Marktwachstum'],
                ].map(([v, l], i) => (
                  <div key={i}>
                    <p className="text-3xl sm:text-4xl font-bold mb-1" style={{ ...SG, color: INK }}>{v}</p>
                    <p className="text-sm text-neutral-400">{l}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-neutral-300">Quellen: Grand View Research, IMARC Group (2024/25)</p>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  )
}


/* ─── PASST DU? ─── */
function PasstDu() {
  const passt = [
    { title: 'Neugier', desc: 'Du fragst dich, warum Dinge so sind, wie sie sind. Wenn du eine Statistik siehst, willst du wissen, was dahintersteckt.' },
    { title: 'Interesse an Wirtschaft', desc: 'Du willst verstehen, wie Unternehmen funktionieren — nicht nur in der Theorie. Warum ist Netflix erfolgreich? Warum scheitern andere?' },
    { title: 'Spaß an Technologie', desc: 'Du musst nicht programmieren können. Aber die Idee, mit einem Computer Probleme zu lösen, findest du spannender als abschreckend.' },
    { title: 'Faible für Zahlen', desc: 'Du vertraust lieber Daten als Meinungen. Wenn jemand sagt „Das war schon immer so", willst du Belege sehen.' },
  ]

  return (
    <section className="py-28 lg:py-40 bg-neutral-50">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          <p className="text-sm font-medium tracking-[0.2em] uppercase mb-6" style={{ color: ORANGE }}>Für wen?</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4" style={{ ...SG, color: INK }}>
            Passt du zu BBA?
          </h2>
          <p className="text-lg text-neutral-400 max-w-xl mb-20">
            Du brauchst kein Mathe-Ass zu sein und keine Programmiersprache zu kennen.
          </p>
        </Reveal>

        <div className="space-y-12">
          {passt.map((p, i) => (
            <Reveal key={i} delay={i < 4 ? `stagger-${i + 1}` : ''}>
              <div className="flex gap-6 items-start">
                <div className="w-px h-16 flex-shrink-0 mt-1" style={{ background: ORANGE }} />
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2" style={{ ...SG, color: INK }}>{p.title}</h3>
                  <p className="text-neutral-500 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-20 text-neutral-400 text-lg leading-relaxed max-w-2xl">
            BBA ist kein Informatik-Studium. Es geht darum, Wirtschaft zu verstehen, Technologie sinnvoll einzusetzen und mit Daten bessere Entscheidungen zu treffen. Die Mischung macht's.
          </p>
        </Reveal>
      </div>
    </section>
  )
}


/* ─── VORTEILE + STUDYCHECK ─── */
function Vorteile() {
  const facts = [
    ['~30', 'Studierende pro Jahrgang'],
    ['3 in 1', 'BWL + IT + Analytik'],
    ['Sem. 5', 'Praxissemester im Unternehmen'],
    ['+25%', 'Marktwachstum pro Jahr'],
    ['B.Sc.', 'Bachelor of Science'],
    ['~150 €', 'Semesterbeitrag, keine Studiengebühren'],
  ]

  return (
    <section className="py-28 lg:py-40 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <p className="text-sm font-medium tracking-[0.2em] uppercase mb-6" style={{ color: ORANGE }}>Auf einen Blick</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-20" style={{ ...SG, color: INK }}>
            Warum BBA an der THWS?
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14">
          {facts.map(([v, l], i) => (
            <Reveal key={i} delay={i < 6 ? `stagger-${Math.min(i + 1, 4)}` : ''}>
              <div>
                <p className="text-3xl sm:text-4xl font-bold mb-2" style={{ ...SG, color: INK }}>{v}</p>
                <p className="text-neutral-400">{l}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* StudyCheck */}
        <Reveal>
          <div className="mt-24 pt-12 border-t border-neutral-100">
            <div className="flex flex-wrap items-end gap-8 mb-10">
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-neutral-300 mb-2">StudyCheck.de</p>
                <p className="text-5xl sm:text-6xl font-bold" style={{ ...SG, color: INK }}>4.0<span className="text-neutral-300 text-2xl"> / 5</span></p>
              </div>
              <div>
                <p className="text-lg font-medium" style={{ color: ORANGE }}>83% Weiterempfehlung</p>
                <p className="text-sm text-neutral-400">6 Bewertungen</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                ['Studieninhalte', 4.2], ['Dozenten', 4.0], ['Lehrveranstaltungen', 4.0],
                ['Digitales Studieren', 4.2], ['Literaturzugang', 4.3], ['Organisation', 3.8],
              ].map(([label, val], i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-neutral-400">{label as string}</span>
                      <span className="text-xs font-bold" style={{ ...SG, color: INK }}>{val as number}</span>
                    </div>
                    <div className="h-1 bg-neutral-100 overflow-hidden">
                      <div className="h-full transition-all duration-1000" style={{ width: `${((val as number) / 5) * 100}%`, background: ORANGE }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-neutral-300">
              <a href="https://www.studycheck.de/studium/business-information-management/thws-27180/bewertungen" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: ORANGE }}>studycheck.de</a> · Stand 2025
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}


/* ─── WÜRZBURG ─── */
function Wuerzburg() {
  return (
    <section id="wuerzburg" className="py-28 lg:py-40 bg-neutral-50">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <p className="text-sm font-medium tracking-[0.2em] uppercase mb-6" style={{ color: ORANGE }}>Der Standort</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-16" style={{ ...SG, color: INK }}>
            Würzburg.
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <Reveal>
            <div className="space-y-6 text-neutral-500 leading-relaxed">
              <p>Rund 128.000 Einwohner, davon über 35.000 Studierende. Alles zu Fuß oder mit dem Rad erreichbar — Uni, Cafés, Mainufer, Altstadt.</p>
              <p>Die Lebenshaltungskosten liegen deutlich unter München oder Frankfurt. WG-Zimmer ab ca. 400 €, Semesterticket für ganz Unterfranken inklusive.</p>
              <p>Im BBA studieren nur rund 30 Studierende pro Jahrgang — du kennst deine Kommilitonen und deine Profs persönlich. Kein Massenbetrieb.</p>
              <p>Die Region ist wirtschaftlich stark: s.Oliver, Brose, Koenig & Bauer und zahlreiche IT-Dienstleister bieten Praktikums- und Einstiegsmöglichkeiten direkt vor Ort.</p>
            </div>
          </Reveal>

          <Reveal delay="stagger-2">
            <div className="space-y-5">
              {[
                ['Studierende in Würzburg', '35.000+'],
                ['Anteil 18–30-Jährige', 'Höchster in DE'],
                ['Campus — Innenstadt', '10 min Rad'],
                ['WG-Zimmer ab', '~400 €'],
                ['Semesterticket', 'ganz Unterfranken'],
                ['Sonnenstunden/Jahr', '1.650+'],
              ].map(([l, v], i) => (
                <div key={i} className="flex justify-between items-baseline pb-3 border-b border-neutral-200">
                  <span className="text-sm text-neutral-400">{l}</span>
                  <span className="font-bold" style={{ ...SG, color: INK }}>{v}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}


/* ─── CTA ─── */
function CTA() {
  return (
    <section id="bewerben" className="py-28 lg:py-40 bg-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <Reveal>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6" style={{ ...SG, color: INK }}>
            Klingt nach dir?
          </h2>
          <p className="text-lg text-neutral-400 mb-16">
            Bewerbungszeitraum: 1. Mai bis 15. Juli. Zulassungsfrei — kein NC.
          </p>
        </Reveal>

        <Reveal delay="stagger-1">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-14 text-left">
            {[['Abschluss', 'B.Sc.'], ['Dauer', '7 Semester'], ['Start', 'Oktober'], ['Plätze', 'ca. 40']].map(([l, v], i) => (
              <div key={i}>
                <p className="text-xs text-neutral-300 uppercase tracking-[0.15em] mb-0.5">{l}</p>
                <p className="font-bold" style={{ ...SG, color: INK }}>{v}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay="stagger-2">
          <a
            href="https://www.thws.de/beratung-und-service/bewerbung-immatrikulation-pruefungen-praktikum/bewerbung/"
            target="_blank" rel="noopener noreferrer"
            className="inline-block text-white px-12 py-4 text-lg font-bold tracking-wide hover:opacity-90 transition-opacity"
            style={{ background: ORANGE }}
          >
            Jetzt bewerben
          </a>
          <p className="mt-6 text-sm text-neutral-300">
            Fragen? <a href="mailto:robert.butscher@thws.de" className="hover:underline" style={{ color: ORANGE }}>robert.butscher@thws.de</a>
          </p>
          <p className="mt-4 text-sm text-neutral-300">
            <a href="https://www.thws.de/studieninteressierte/studieninfotage/feedback-studieninfotage/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-neutral-500 transition-colors">Feedback zum Studieninfotag geben</a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}


/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="py-10 border-t border-neutral-100">
      <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-between items-center gap-4 text-xs text-neutral-300">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm" style={{ ...SG, color: ORANGE }}>BBA</span>
          <span>THWS Würzburg</span>
        </div>
        <div className="flex gap-6">
          <a href="https://www.thws.de/service/impressum/" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-600">Impressum</a>
          <a href="https://www.thws.de/service/datenschutz/" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-600">Datenschutz</a>
          <a href="https://www.thws.de" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-600">thws.de</a>
        </div>
      </div>
    </footer>
  )
}
