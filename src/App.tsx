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
      {/* Scroll-trigger zone: gives enough room to scroll past Weiche on mobile */}
      {!gateOpen && (
        <div ref={weicheEndRef} className="flex flex-col items-center justify-center py-20 text-neutral-300">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="animate-bounce mb-3 opacity-40">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          <p className="text-xs tracking-wide opacity-40">Weiter scrollen</p>
        </div>
      )}
      {gateOpen && <div ref={weicheEndRef} />}
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
            <p className={`mt-10 transition-all duration-700 delay-300 ${phase >= 2 ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
              <span className="text-xl sm:text-2xl text-neutral-400">Die Frage ist: </span>
              <span
                className={`inline-block text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-tight transition-all duration-1000 delay-700 ${phase >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                style={{ ...SG, color: ORANGE }}
              >
                Wie?
              </span>
            </p>
          </div>
          <div className={`hidden lg:flex flex-col items-center gap-4 pt-12 transition-all duration-700 delay-500 ${phase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="p-4 bg-white">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent('https://swrobuts.github.io/bba/')}&color=111111&bgcolor=FFFFFF&margin=0`}
                alt="QR-Code" width={200} height={200}
              />
            </div>
            <p className="text-xs text-neutral-300 tracking-wide">Am Handy öffnen</p>
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
    { id: 'bauch', title: 'Intuition vertrauen', desc: 'Erfahrung und Bauchgefühl reichen.', fail: 'Unser Gehirn täuscht uns häufiger, als wir denken. Wir überschätzen, was wir kennen, und übersehen, was wir nicht wissen.' },
    { id: 'raten', title: 'Zufall akzeptieren', desc: 'Wird schon irgendwie passen.', fail: 'Raten ist nicht nachvollziehbar. Wenn es schiefgeht, weißt du nicht warum — und wenn es klappt, auch nicht.' },
    { id: 'chef', title: 'Hierarchie folgen', desc: 'Wer am längsten da ist, weiß es am besten.', fail: 'Was gestern funktioniert hat, kann morgen falsch sein. Märkte verändern sich — Erfahrung allein reicht nicht.' },
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
              <p className={`text-lg font-bold mb-1 ${bbaChosen ? '' : 'text-neutral-800'}`} style={{ ...SG, color: bbaChosen ? ORANGE : undefined }}>Daten analysieren</p>
              {!bbaChosen
                ? <p className="text-sm text-neutral-400">Fakten sammeln, Muster und Zusammenhänge erkennen — und dann nachvollziehbar entscheiden.</p>
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
  const [showData, setShowData] = useState(true)
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
            <button onClick={() => setShowData(true)} className={`px-6 py-3 text-sm font-medium transition-all ${showData ? 'text-white' : 'text-neutral-600 hover:text-neutral-400'}`} style={showData ? { background: ORANGE } : {}}>
              Team Analytics
            </button>
            <button onClick={() => setShowData(false)} className={`px-6 py-3 text-sm font-medium transition-all ${!showData ? 'text-white' : 'text-neutral-600 hover:text-neutral-400'}`} style={!showData ? { background: ORANGE } : {}}>
              Team Bauchgefühl
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
              <p className="text-white text-lg font-medium mb-8" style={SG}>Eine Auswahl der Methoden &amp; Inhalte, die du im BBA lernst:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-6">
                {[
                  ['Clusteranalyse', 'Statistik f. Data Science', 'Sem. 4'],
                  ['Geo-Datenanalyse', 'Business Intelligence', 'Sem. 3'],
                  ['Zeitreihenanalyse', 'Ökonometrie', 'Sem. 3'],
                  ['Conjoint-Analyse', 'Markt- & Konsumforschung', 'Sem. 4'],
                  ['ML-Prognosen', 'Vertiefung Bus. Analytics', 'Sem. 6'],
                  ['Dashboard-Design', 'Business Intelligence', 'Sem. 3'],
                  ['Budget-Monitoring', 'Controlling', 'Sem. 4'],
                  ['Datenschutz (DSGVO)', 'Recht & Datenschutz', 'Sem. 1'],
                  ['Preisbildung', 'Mikroökonomik', 'Sem. 1'],
                  ['Marktmechanismen', 'Makroökonomik', 'Sem. 2'],
                  ['Verantwortung & KI', 'Wiss. Arbeiten & Ethik', 'Sem. 2'],
                  ['Projektsteuerung', 'Projekt- & IT-Management', 'Sem. 1'],
                  ['Process Mining', 'Vertiefung Bus. Analytics', 'Sem. 6'],
                  ['Prozessautomatisierung', 'Vertiefung Bus. Analytics', 'Sem. 6'],
                  ['ERP-Systeme', 'Wirtschaftsinformatik', 'Sem. 2'],
                  ['Konjunkturanalyse', 'Makroökonomik', 'Sem. 2'],
                ].map(([s, modul, sem], i) => (
                  <div key={i}>
                    <p style={{ color: ORANGE }} className="text-sm font-medium">{s}</p>
                    <p className="text-neutral-500 text-xs">{modul}</p>
                    <p className="text-neutral-700 text-xs">{sem}</p>
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
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          <div className="flex flex-col sm:flex-row items-center gap-10 sm:gap-16">
            {/* Portrait — LinkedIn style: round, grayscale, subtle border */}
            <div className="flex-shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-neutral-200 flex items-center justify-center" style={{ background: '#e5e5e5' }}>
                <span className="text-3xl sm:text-4xl font-bold text-neutral-400" style={SG}>WED</span>
              </div>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug tracking-tight mb-4" style={{ ...SG, color: INK }}>
                &ldquo;In God we trust; all others must bring data.&rdquo;
              </p>
              <p className="text-neutral-400 text-sm">
                <span className="font-medium text-neutral-500">W. Edwards Deming</span> · Statistiker, Qualitätspionier
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}


/* ─── MODUL-NETZWERK — Static SVG ─── */
function WasDuLernst() {
  /* 5 categories: BWL, Technologie, Analytik, VWL, Überfachlich */
  const catColors: Record<string, string> = {
    b: ORANGE, t: '#333', a: '#6366f1', v: '#059669', u: '#94a3b8'
  }
  const catLabels: [string, string][] = [
    ['b', 'BWL'], ['t', 'Technologie'], ['a', 'Analytik'], ['v', 'VWL'], ['u', 'Überfachlich']
  ]

  const mods = [
    { id: 'bwl', label: 'BWL', cat: 'b' },
    { id: 'mktg', label: 'Marketing', cat: 'b' },
    { id: 'ctrl', label: 'Controlling', cat: 'b' },
    { id: 'mafo', label: 'Marktforschung', cat: 'b' },
    { id: 'dioek', label: 'Dig. Ökonomie', cat: 'b' },
    { id: 'prog', label: 'Programmieren', cat: 't' },
    { id: 'bint', label: 'Business Intelligence', cat: 't' },
    { id: 'dav', label: 'DAV', cat: 't' },
    { id: 'db', label: 'Datenbanken', cat: 't' },
    { id: 'ds', label: 'Data Science', cat: 't' },
    { id: 'stat', label: 'Statistik', cat: 'a' },
    { id: 'oeko', label: 'Ökonometrie', cat: 'a' },
    { id: 'or', label: 'Operations Research', cat: 'a' },
    { id: 'mikro', label: 'Mikroökonomik', cat: 'v' },
    { id: 'makro', label: 'Makroökonomik', cat: 'v' },
    { id: 'recht', label: 'Recht', cat: 'u' },
    { id: 'pm', label: 'Projektmgmt.', cat: 'u' },
    { id: 'ethik', label: 'Ethik', cat: 'u' },
    { id: 'wiss', label: 'Wiss. Arbeiten', cat: 'u' },
  ]

  const edges: [string, string][] = [
    ['bwl', 'stat'], ['bwl', 'ctrl'], ['mktg', 'mafo'], ['mktg', 'bint'], ['mktg', 'stat'],
    ['ctrl', 'bint'], ['ctrl', 'oeko'], ['mafo', 'stat'], ['mafo', 'oeko'], ['mafo', 'dav'],
    ['stat', 'prog'], ['stat', 'oeko'], ['stat', 'ds'], ['stat', 'or'], ['prog', 'dav'], ['prog', 'db'],
    ['prog', 'ds'], ['bint', 'db'], ['bint', 'ds'], ['bint', 'dav'], ['oeko', 'ds'],
    ['oeko', 'dav'], ['oeko', 'or'], ['dav', 'ds'], ['recht', 'ethik'], ['recht', 'dioek'],
    ['pm', 'bint'], ['pm', 'ctrl'], ['ethik', 'ds'], ['ethik', 'dioek'], ['wiss', 'stat'],
    ['wiss', 'oeko'], ['dioek', 'mktg'], ['dioek', 'bint'], ['mikro', 'makro'], ['mikro', 'mafo'],
    ['makro', 'oeko'], ['makro', 'ctrl'], ['or', 'prog'],
  ]

  /* Pre-compute force layout once (deterministic, no animation) */
  const positions = useMemo(() => {
    const N = mods.length
    const idIdx: Record<string, number> = {}
    mods.forEach((m, i) => { idIdx[m.id] = i })
    const edgeIdx = edges.map(([a, b]) => [idIdx[a], idIdx[b]] as [number, number])

    const catCenters: Record<string, [number, number]> = {
      b: [0.15, 0.35], t: [0.5, 0.65], a: [0.5, 0.25], v: [0.15, 0.7], u: [0.85, 0.5]
    }
    const px = new Float64Array(N), py = new Float64Array(N)
    const vx = new Float64Array(N), vy = new Float64Array(N)
    let seed = 42
    const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647 }
    mods.forEach((m, i) => {
      const c = catCenters[m.cat]
      px[i] = c[0] + (rand() - 0.5) * 0.2
      py[i] = c[1] + (rand() - 0.5) * 0.25
    })

    const REPULSION = 0.001, SPRING_K = 0.012, SPRING_LEN = 0.13, DAMPING = 0.85, GRAVITY = 0.0004, PAD = 0.1
    for (let iter = 0; iter < 800; iter++) {
      for (let i = 0; i < N; i++) {
        let fx = 0, fy = 0
        for (let j = 0; j < N; j++) {
          if (i === j) continue
          let dx = px[i] - px[j], dy = py[i] - py[j]
          let dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 0.001) { dist = 0.001; dx = (rand() - 0.5) * 0.01; dy = (rand() - 0.5) * 0.01 }
          fx += (dx / dist) * REPULSION / (dist * dist)
          fy += (dy / dist) * REPULSION / (dist * dist)
        }
        for (const [a, b] of edgeIdx) {
          const other = a === i ? b : b === i ? a : -1
          if (other < 0) continue
          const dx = px[other] - px[i], dy = py[other] - py[i]
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 0.001) continue
          const f = SPRING_K * (dist - SPRING_LEN)
          fx += (dx / dist) * f; fy += (dy / dist) * f
        }
        fx += (0.5 - px[i]) * GRAVITY; fy += (0.5 - py[i]) * GRAVITY
        vx[i] = (vx[i] + fx) * DAMPING; vy[i] = (vy[i] + fy) * DAMPING
      }
      for (let i = 0; i < N; i++) {
        px[i] = Math.max(PAD, Math.min(1 - PAD, px[i] + vx[i]))
        py[i] = Math.max(PAD, Math.min(1 - PAD, py[i] + vy[i]))
      }
    }
    return mods.map((_, i) => ({ x: px[i], y: py[i] }))
  }, [])

  const idIdx: Record<string, number> = {}
  mods.forEach((m, i) => { idIdx[m.id] = i })

  return (
    <section id="studium" className="py-28 lg:py-40 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="text-sm font-medium tracking-[0.2em] uppercase mb-6" style={{ color: ORANGE }}>Das Studium</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4" style={{ ...SG, color: INK }}>
            Fünf Welten. Ein Studium.
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mb-12">
            Business Analytics verbindet BWL, Technologie, Analytik, VWL und überfachliche Kompetenz. Jedes Modul baut auf anderen auf.
          </p>
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10 text-sm text-neutral-500">
            {catLabels.map(([key, label]) => (
              <span key={key} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: catColors[key] }} /> {label}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <svg viewBox="0 0 1000 750" className="w-full h-auto" style={{ maxHeight: '70vh' }}>
            {/* Edges */}
            {edges.map(([a, b], i) => {
              const ai = idIdx[a], bi = idIdx[b]
              const cross = mods[ai].cat !== mods[bi].cat
              return (
                <line key={i}
                  x1={positions[ai].x * 1000} y1={positions[ai].y * 750}
                  x2={positions[bi].x * 1000} y2={positions[bi].y * 750}
                  stroke={cross ? ORANGE : '#d4d4d4'}
                  strokeWidth={cross ? 1.5 : 1}
                  opacity={cross ? 0.3 : 0.5}
                />
              )
            })}
            {/* Nodes */}
            {mods.map((m, i) => {
              const cx = positions[i].x * 1000, cy = positions[i].y * 750
              return (
                <g key={m.id}>
                  <circle cx={cx} cy={cy} r={18} fill={catColors[m.cat]} opacity={0.15} />
                  <circle cx={cx} cy={cy} r={9} fill={catColors[m.cat]} />
                  <text x={cx} y={cy - 16} textAnchor="middle" fill={INK}
                    fontSize="13" fontWeight="600" fontFamily="'Space Grotesk', system-ui"
                  >{m.label}</text>
                </g>
              )
            })}
          </svg>
        </Reveal>
      </div>
    </section>
  )
}


/* ─── FAHRPLAN — Animierte Scroll-Timeline ─── */
function SemesterFahrplan() {
  /* Color-coded items: [label, category] — b=BWL, t=Tech, a=Analytik, v=VWL, u=Überfachlich, p=Praxis */
  const catCol: Record<string, string> = { b: ORANGE, t: '#333', a: '#6366f1', v: '#059669', u: '#94a3b8', p: '#78716c' }
  const semesters = [
    { nr: 1, title: 'Grundlagen', skill: 'Du verstehst die Sprache der Wirtschaft und Technik.', items: [['Allgemeine BWL','b'], ['Mathematik 1','a'], ['Mikroökonomik','v'], ['Wirtschaftsinformatik','t'], ['Projekt- & IT-Management','u'], ['Recht & Datenschutz','u']] as [string,string][] },
    { nr: 2, title: 'Methoden', skill: 'Du kannst Daten erheben, programmieren und statistisch auswerten.', items: [['Mathematik 2','a'], ['Grundlagen der Statistik','a'], ['Informatik & Programmieren','t'], ['Makroökonomik','v'], ['Marketing','b'], ['Wiss. Arbeiten & Ethik','u']] as [string,string][] },
    { nr: 3, title: 'Analytics', skill: 'Du beherrschst die Werkzeuge der Datenanalyse.', items: [['Operations Research','a'], ['Ökonometrie','a'], ['Datenbanken','t'], ['Business Intelligence','t'], ['Beschaffung & Logistik','b'], ['Business English','u']] as [string,string][] },
    { nr: 4, title: 'Vertiefung', skill: 'Du wendest Analytics auf echte Geschäftsfragen an.', items: [['Statistik für Data Science','a'], ['Datenaufbereitung (DAV)','t'], ['Markt- & Konsumforschung','b'], ['Digitale Ökonomie','b'], ['Controlling','b'], ['Wahlpflichtmodul','u']] as [string,string][] },
    { nr: 5, title: 'Praxissemester', skill: 'Du arbeitest selbstständig mit Daten im Unternehmen.', items: [['Fachpraktikum im Unternehmen','p'], ['Praxisseminar','p'], ['Eigenes Datenprojekt','p']] as [string,string][] },
    { nr: 6, title: 'Spezialisierung', skill: 'Du entwickelst Expertise in deinem Schwerpunkt.', items: [['Vertiefung Business Analytics','a'], ['Projekt Business Analytics 1','t'], ['Schwerpunkt BWL','b'], ['AWPM','u']] as [string,string][] },
    { nr: 7, title: 'Abschluss', skill: 'Du löst eigenständig komplexe Analytics-Projekte.', items: [['Projekt Business Analytics 2','t'], ['Schwerpunkt BWL','b'], ['Bachelorarbeit & Seminar','u']] as [string,string][] },
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

                    <div className="flex flex-wrap gap-2">
                      {sem.items.map(([label, cat], j) => (
                        <span key={j} className="text-xs sm:text-sm px-2.5 py-1 rounded-full font-medium"
                          style={{ color: catCol[cat], background: catCol[cat] + '12', border: `1px solid ${catCol[cat]}30` }}
                        >{label}</span>
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
                  <p className="text-xs tracking-[0.15em] uppercase text-neutral-500 mb-2">{p.ctx}</p>
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
                  ['Top 10', 'Gefragteste Qualifikation laut LinkedIn'],
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
    ['Klein', 'Persönliche Atmosphäre, keine Massenvorlesung'],
    ['3 in 1', 'BWL + IT + Analytik'],
    ['Sem. 5', 'Praxissemester im Unternehmen'],
    ['Top 10', 'Gefragteste Skills laut LinkedIn'],
    ['B.Sc.', 'Bachelor of Science'],
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
              <p>Im BBA kennst du deine Kommilitonen und deine Profs persönlich. Kein Massenbetrieb.</p>
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
                <div key={i} className="flex justify-between items-baseline gap-4 pb-3 border-b border-neutral-200">
                  <span className="text-xs sm:text-sm text-neutral-400 shrink-0">{l}</span>
                  <span className="text-sm sm:text-base font-bold text-right" style={{ ...SG, color: INK }}>{v}</span>
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
            {[['Abschluss', 'B.Sc.'], ['Dauer', '7 Semester'], ['Start', 'Immer im Oktober']].map(([l, v], i) => (
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
