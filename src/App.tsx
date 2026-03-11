import { useEffect, useRef, useState, useCallback } from 'react'

/* ─── Intersection Observer Hook ─── */
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

/* ═══════════════════════════════════════════════════════════════
   APP ROOT — Die Weiche steuert den gesamten Flow
   ═══════════════════════════════════════════════════════════════ */

export default function App() {
  const [gateOpen, setGateOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const openGate = useCallback(() => {
    setGateOpen(true)
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 400)
  }, [])

  return (
    <div className="min-h-screen bg-[#FAFAF8]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <Nav visible={gateOpen} />
      <Hero />
      <Weiche onChooseBBA={openGate} gateOpen={gateOpen} />

      {/* ─── Der Rest erscheint erst nach der Weiche ─── */}
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


/* ═══════════════════════════════════════════════════════════════
   NAVIGATION — Erscheint erst, wenn der Gate offen ist
   ═══════════════════════════════════════════════════════════════ */

function Nav({ visible }: { visible: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${!visible ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'} ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 flex items-center justify-between h-16 sm:h-20">
        <a href="#" className="flex items-center gap-3">
          <span className="font-bold text-xl tracking-tight" style={{ fontFamily: 'Space Grotesk', color: '#E87722' }}>BBA</span>
          <span className={`text-base hidden sm:inline ${scrolled ? 'text-neutral-500' : 'text-neutral-400'}`}>THWS Würzburg</span>
        </a>
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {links.map(l => (
            <a key={l.href} href={l.href} className={`text-sm lg:text-base font-medium transition-colors hover:text-[#E87722] ${scrolled ? 'text-neutral-700' : 'text-neutral-600'}`}>{l.label}</a>
          ))}
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2" aria-label="Menü">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t px-6 py-5 space-y-4">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block text-lg font-medium text-neutral-700 hover:text-[#E87722]">{l.label}</a>
          ))}
        </div>
      )}
    </nav>
  )
}


/* ═══════════════════════════════════════════════════════════════
   HERO — Kurzer Einstieg ins Thema „Entscheidungen"
   ═══════════════════════════════════════════════════════════════ */

function Hero() {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600)
    const t2 = setTimeout(() => setPhase(2), 1800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])
  return (
    <section className="min-h-[70vh] flex flex-col justify-center relative overflow-hidden bg-[#FAFAF8]">
      <div className="absolute top-24 right-16 w-px h-64 bg-[#E87722]/15 hidden sm:block" />
      <div className="absolute bottom-32 left-12 w-48 h-px bg-[#E87722]/15 hidden sm:block" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 pt-16 sm:pt-20 pb-8">
        <div className="flex items-start justify-between gap-8 lg:gap-12">
          <div className="max-w-4xl">
            <p className={`text-sm sm:text-base font-medium tracking-widest uppercase mb-8 sm:mb-10 transition-all duration-700 ${phase >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ color: '#E87722' }}>
              Bachelor Business Analytics · THWS Würzburg
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-[5.5rem] font-bold leading-[1.06] tracking-tight mb-8 sm:mb-10" style={{ fontFamily: 'Space Grotesk' }}>
              <span className={`block transition-all duration-700 ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ color: '#1A1A2E' }}>
                Jeden Tag treffen
              </span>
              <span className={`block transition-all duration-700 delay-150 ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ color: '#1A1A2E' }}>
                Unternehmen tausende
              </span>
              <span className={`block transition-all duration-700 delay-300 ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ color: '#E87722' }}>
                Entscheidungen.
              </span>
            </h1>
            <p className={`text-lg sm:text-xl lg:text-2xl text-neutral-500 max-w-2xl leading-relaxed transition-all duration-700 delay-300 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Die Frage ist: Wie?
            </p>
          </div>

          {/* QR-Code für Smartphone — größer */}
          <div className={`hidden md:flex flex-col items-center gap-3 pt-12 lg:pt-16 transition-all duration-700 delay-500 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent('https://swrobuts.github.io/bba/')}&color=1A1A2E&bgcolor=FAFAF8`}
              alt="QR-Code zur Website"
              width={220}
              height={220}
              className="border border-neutral-200 p-3 bg-white"
            />
            <p className="text-sm text-neutral-400 text-center">Am Handy mitlesen</p>
          </div>
        </div>
      </div>
    </section>
  )
}


/* ═══════════════════════════════════════════════════════════════
   DIE WEICHE — Das Herzstück
   4 Ansätze, nur einer führt weiter
   ═══════════════════════════════════════════════════════════════ */

interface WeicheProps {
  onChooseBBA: () => void
  gateOpen: boolean
}

function Weiche({ onChooseBBA, gateOpen }: WeicheProps) {
  const [clicked, setClicked] = useState<Record<string, boolean>>({})
  const [shaking, setShaking] = useState<string | null>(null)
  const [bbaChosen, setBbaChosen] = useState(false)

  const wrongOptions = [
    {
      id: 'bauch',
      title: 'Bauchgefühl',
      desc: 'Erfahrung und Intuition reichen.',
      fail: 'Unser Gehirn täuscht uns häufiger, als wir denken. Wir überschätzen, was wir kennen, und übersehen, was wir nicht wissen. Bei Millionen-Entscheidungen reicht das nicht.',
    },
    {
      id: 'raten',
      title: 'Einfach raten',
      desc: 'Wird schon irgendwie passen.',
      fail: 'Raten ist nicht nachvollziehbar. Wenn es schiefgeht, weißt du nicht warum — und wenn es klappt, auch nicht. Ohne Methode kein Lernen, keine Verbesserung, kein Vertrauen.',
    },
    {
      id: 'chef',
      title: 'Der Chef entscheidet',
      desc: 'Wer am längsten da ist, weiß es am besten.',
      fail: 'Was gestern funktioniert hat, kann morgen schon falsch sein. Märkte verändern sich schnell — Erfahrung allein reicht nicht, wenn sich die Spielregeln ändern.',
    },
  ]

  const handleWrong = (id: string) => {
    if (bbaChosen || clicked[id]) return
    setShaking(id)
    setClicked(prev => ({ ...prev, [id]: true }))
    setTimeout(() => setShaking(null), 600)
  }

  const handleBBA = () => {
    if (bbaChosen) return
    setBbaChosen(true)
    setTimeout(() => onChooseBBA(), 800)
  }

  const allWrongClicked = wrongOptions.every(o => clicked[o.id])

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight mb-5 text-center" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>
            Wie würdest du entscheiden?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-neutral-500 text-center max-w-2xl mx-auto mb-12 sm:mb-16 leading-relaxed">
            Ein Getränkehersteller will einen neuen Eistee launchen. Millionen-Budget. Vier Ansätze liegen auf dem Tisch.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 max-w-4xl mx-auto">
          {wrongOptions.map((opt, i) => (
            <Reveal key={opt.id} delay={`stagger-${i + 1}`}>
              <button
                onClick={() => handleWrong(opt.id)}
                disabled={bbaChosen}
                className={`w-full text-left p-6 sm:p-8 lg:p-10 border-2 transition-all duration-500 group relative overflow-hidden
                  ${clicked[opt.id]
                    ? 'border-red-300/50 bg-red-50/50'
                    : 'border-neutral-200 bg-white hover:border-neutral-400 hover:shadow-md'
                  }
                  ${shaking === opt.id ? 'animate-shake' : ''}
                  ${bbaChosen ? 'opacity-40' : ''}
                `}
              >
                <p className={`text-lg sm:text-xl lg:text-2xl font-bold mb-2 transition-colors ${clicked[opt.id] ? 'text-red-400' : 'text-neutral-800'}`} style={{ fontFamily: 'Space Grotesk' }}>
                  {opt.title}
                </p>
                {!clicked[opt.id] ? (
                  <p className="text-sm sm:text-base lg:text-lg text-neutral-500 leading-relaxed">{opt.desc}</p>
                ) : (
                  <p className="text-sm sm:text-base lg:text-lg text-red-400/80 leading-relaxed">{opt.fail}</p>
                )}
              </button>
            </Reveal>
          ))}

          {/* BBA — die richtige Wahl */}
          <Reveal delay="stagger-4">
            <button
              onClick={handleBBA}
              disabled={bbaChosen}
              className={`w-full text-left p-6 sm:p-8 lg:p-10 border-2 transition-all duration-500 relative overflow-hidden
                ${bbaChosen
                  ? 'border-[#E87722] bg-[#E87722]/5 shadow-lg shadow-[#E87722]/10'
                  : 'border-neutral-200 bg-white hover:border-[#E87722] hover:shadow-lg hover:shadow-[#E87722]/10'
                }
              `}
            >
              <p className={`text-lg sm:text-xl lg:text-2xl font-bold mb-2 transition-colors ${bbaChosen ? 'text-[#E87722]' : 'text-neutral-800'}`} style={{ fontFamily: 'Space Grotesk' }}>
                Business Analytics
              </p>
              {!bbaChosen ? (
                <p className="text-sm sm:text-base lg:text-lg text-neutral-500 leading-relaxed">Daten sammeln, analysieren, verstehen — und dann entscheiden.</p>
              ) : (
                <div>
                  <p className="text-sm sm:text-base lg:text-lg text-[#E87722] leading-relaxed font-medium mb-3">
                    Genau. Nicht raten, sondern wissen.
                  </p>
                  <p className="text-sm sm:text-base text-neutral-500 leading-relaxed">
                    Scroll weiter und sieh, wie das in der Praxis aussieht.
                  </p>
                </div>
              )}

              {allWrongClicked && !bbaChosen && (
                <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[#E87722] animate-pulse" />
              )}
            </button>
          </Reveal>
        </div>

        {allWrongClicked && !bbaChosen && (
          <Reveal>
            <p className="text-center mt-10 text-lg text-neutral-400">
              Nur noch eine Option übrig.
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}


/* ═══════════════════════════════════════════════════════════════
   FALLSTUDIE — Eistee Beispiel (Light Design)
   ═══════════════════════════════════════════════════════════════ */

function Fallstudie() {
  const [showData, setShowData] = useState(false)
  return (
    <section id="fallstudie" className="py-20 sm:py-28 lg:py-36 bg-white relative overflow-hidden">
      {/* Bauhaus geometric accent */}
      <div className="absolute top-0 left-0 w-1 h-full bg-[#E87722]" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <Reveal>
          <p className="text-sm sm:text-base font-medium tracking-widest uppercase mb-5" style={{ color: '#E87722' }}>Zurück zum Eistee</p>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>
            So funktioniert der<br />Unterschied in der Praxis.
          </h2>
          <p className="text-lg sm:text-xl text-neutral-500 max-w-3xl mb-10 sm:mb-14 leading-relaxed">
            Zwei Teams, gleiches Produkt, gleiches Budget. Eines verlässt sich auf Intuition. Das andere auf Daten.
          </p>
        </Reveal>

        <Reveal>
          <div className="flex gap-px mb-10 sm:mb-14">
            <button onClick={() => setShowData(false)} className={`px-5 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all ${!showData ? 'bg-[#E87722] text-white' : 'bg-neutral-100 text-neutral-500 hover:text-neutral-800'}`}>
              Team Bauchgefühl
            </button>
            <button onClick={() => setShowData(true)} className={`px-5 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all ${showData ? 'bg-[#E87722] text-white' : 'bg-neutral-100 text-neutral-500 hover:text-neutral-800'}`}>
              Team Analytics
            </button>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          <Reveal>
            <div className={`p-8 sm:p-10 lg:p-12 transition-all duration-500 border-2 ${!showData ? 'border-red-200 bg-red-50/30' : 'border-emerald-200 bg-emerald-50/30'}`}>
              <p className={`text-xs sm:text-sm font-bold uppercase tracking-widest mb-6 sm:mb-8 ${!showData ? 'text-red-400' : 'text-emerald-600'}`}>
                Vorgehen
              </p>
              {!showData ? (
                <div className="space-y-5 sm:space-y-7 text-sm sm:text-base leading-relaxed">
                  <div><p className="text-neutral-800 font-semibold text-base sm:text-lg mb-1">Zielgruppe</p><p className="text-neutral-500">„Alle, die Eistee mögen." Keine Segmentierung.</p></div>
                  <div><p className="text-neutral-800 font-semibold text-base sm:text-lg mb-1">Platzierung</p><p className="text-neutral-500">Gleichmäßig auf alle 200 Märkte. Kontakte statt Kriterien.</p></div>
                  <div><p className="text-neutral-800 font-semibold text-base sm:text-lg mb-1">Timing</p><p className="text-neutral-500">Launch im Januar — das Produkt ist halt fertig.</p></div>
                  <div><p className="text-neutral-800 font-semibold text-base sm:text-lg mb-1">Preis</p><p className="text-neutral-500">2,49 € — „ungefähr wie die Konkurrenz."</p></div>
                </div>
              ) : (
                <div className="space-y-5 sm:space-y-7 text-sm sm:text-base leading-relaxed">
                  <div><p className="text-neutral-800 font-semibold text-base sm:text-lg mb-1">Kundensegmentierung</p><p className="text-neutral-500">Clusteranalyse: 18–35, urban, gesundheitsbewusst — 3× höhere Kaufwahrscheinlichkeit. <span className="text-neutral-400 text-sm">(Marketing + Statistik)</span></p></div>
                  <div><p className="text-neutral-800 font-semibold text-base sm:text-lg mb-1">Standortoptimierung</p><p className="text-neutral-500">Geo-Daten + Abverkaufshistorie zeigen die 60 besten Märkte. <span className="text-neutral-400 text-sm">(Business Intelligence + Datenbanken)</span></p></div>
                  <div><p className="text-neutral-800 font-semibold text-base sm:text-lg mb-1">Timing</p><p className="text-neutral-500">Saisonale Nachfragekurve: Eistee-Peak im Mai/Juni. <span className="text-neutral-400 text-sm">(Ökonometrie + Programmieren)</span></p></div>
                  <div><p className="text-neutral-800 font-semibold text-base sm:text-lg mb-1">Pricing</p><p className="text-neutral-500">Conjoint-Analyse: Zielgruppe zahlt bis 2,89 € für Bio. <span className="text-neutral-400 text-sm">(Marktforschung + Statistik)</span></p></div>
                  <div><p className="text-neutral-800 font-semibold text-base sm:text-lg mb-1">Kostenkontrolle</p><p className="text-neutral-500">Budget-Monitoring mit Echtzeit-Dashboards — jeder Cent wird getrackt. <span className="text-neutral-400 text-sm">(Controlling + BI)</span></p></div>
                  <div><p className="text-neutral-800 font-semibold text-base sm:text-lg mb-1">Datenschutz</p><p className="text-neutral-500">Kundendaten DSGVO-konform erhoben und verarbeitet. <span className="text-neutral-400 text-sm">(Recht + Ethik)</span></p></div>
                  <div><p className="text-neutral-800 font-semibold text-base sm:text-lg mb-1">Prognose</p><p className="text-neutral-500">ML-Modell sagt Nachfrage pro Region voraus — Supply Chain wird datengetrieben gesteuert. <span className="text-neutral-400 text-sm">(Data Science + KI)</span></p></div>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay="stagger-2">
            <div className={`p-8 sm:p-10 lg:p-12 transition-all duration-500 border-2 ${!showData ? 'border-red-200 bg-red-50/30' : 'border-emerald-200 bg-emerald-50/30'}`}>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-widest mb-6 sm:mb-8 text-neutral-400">Ergebnis nach 6 Monaten</p>
              {!showData ? (
                <div>
                  <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-red-400 mb-4 sm:mb-5" style={{ fontFamily: 'Space Grotesk' }}>40%</div>
                  <p className="text-lg sm:text-xl text-neutral-600 mb-6 sm:mb-8">der Ware bleibt im Regal.</p>
                  <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-neutral-500 leading-relaxed">
                    <p>Im Winter will niemand Eistee.</p>
                    <p>Budget verbrannt. Produkt eingestellt.</p>
                    <p>Das Produkt war gut. Die Entscheidungen nicht.</p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-emerald-500 mb-4 sm:mb-5" style={{ fontFamily: 'Space Grotesk' }}>92%</div>
                  <p className="text-lg sm:text-xl text-neutral-600 mb-6 sm:mb-8">Abverkauf. Nachbestellungen ab Woche 3.</p>
                  <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-neutral-500 leading-relaxed">
                    <p>Daten haben gezeigt, was funktioniert.</p>
                    <p>Real-time Dashboard ermöglicht Nachsteuerung.</p>
                    <p>Gleiche Leute. Bessere Methoden.</p>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>

        {showData && (
          <Reveal>
            <div className="mt-8 p-8 sm:p-10 lg:p-12 bg-[#FAFAF8] border-l-4 border-[#E87722]">
              <p className="text-base sm:text-lg text-neutral-800 mb-6" style={{ fontFamily: 'Space Grotesk' }}>
                <strong>Klingt kompliziert? Muss es nicht sein. Jeder dieser Schritte basiert auf Methoden, die du im BBA-Studium lernst:</strong>
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 text-sm sm:text-base">
                {[
                  { skill: 'Clusteranalyse', modul: 'Statistik für Data Science', sem: 'Semester 4' },
                  { skill: 'Geo-Datenanalyse', modul: 'Business Intelligence', sem: 'Semester 3' },
                  { skill: 'Zeitreihenanalyse', modul: 'Ökonometrie', sem: 'Semester 3' },
                  { skill: 'Conjoint-Analyse', modul: 'Markt- & Konsumforschung', sem: 'Semester 4' },
                  { skill: 'Budget-Monitoring', modul: 'Controlling', sem: 'Semester 4' },
                  { skill: 'Datenschutz (DSGVO)', modul: 'Recht & Datenschutz', sem: 'Semester 1' },
                  { skill: 'ML-Prognosen', modul: 'Data Science / Vertiefung BA', sem: 'Semester 6' },
                  { skill: 'Dashboard-Design', modul: 'Programmieren + BI', sem: 'Semester 2–3' },
                ].map((m, i) => (
                  <div key={i}>
                    <p className="text-[#E87722] font-semibold text-base sm:text-lg">{m.skill}</p>
                    <p className="text-neutral-600 mt-1">{m.modul}</p>
                    <p className="text-neutral-400 text-xs sm:text-sm mt-0.5">{m.sem}</p>
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


/* ─── Deming Quote mit LinkedIn-Stil Portrait ─── */
function DemingQuote() {
  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-[#FAFAF8]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-16">
        <Reveal>
          <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
            {/* Deming Portrait — LinkedIn-Stil */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-[#E87722]/20 bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
                  {/* Stilisiertes Portrait via SVG */}
                  <svg viewBox="0 0 120 120" className="w-full h-full">
                    <defs>
                      <linearGradient id="demingBg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#d4d4d4" />
                        <stop offset="100%" stopColor="#a3a3a3" />
                      </linearGradient>
                    </defs>
                    <rect width="120" height="120" fill="url(#demingBg)" />
                    {/* Head */}
                    <ellipse cx="60" cy="42" rx="22" ry="26" fill="#737373" />
                    {/* Glasses */}
                    <circle cx="51" cy="40" r="8" fill="none" stroke="#525252" strokeWidth="2" />
                    <circle cx="69" cy="40" r="8" fill="none" stroke="#525252" strokeWidth="2" />
                    <line x1="59" y1="40" x2="61" y2="40" stroke="#525252" strokeWidth="2" />
                    {/* Hair - bald top with sides */}
                    <ellipse cx="60" cy="28" rx="24" ry="14" fill="#d4d4d4" />
                    <path d="M36 35 Q36 20 44 18" fill="#a3a3a3" stroke="none" />
                    <path d="M84 35 Q84 20 76 18" fill="#a3a3a3" stroke="none" />
                    {/* Shoulders */}
                    <path d="M30 95 Q30 72 60 68 Q90 72 90 95 L90 120 L30 120 Z" fill="#525252" />
                    {/* Tie */}
                    <path d="M57 68 L60 90 L63 68" fill="#E87722" />
                  </svg>
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#E87722] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">W</span>
                </div>
              </div>
            </div>

            {/* Zitat */}
            <blockquote className="text-center sm:text-left flex-1">
              <p className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-snug tracking-tight mb-6 sm:mb-8" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>
                &ldquo;In God we trust; all others must bring data.&rdquo;
              </p>
              <footer className="text-base sm:text-lg text-neutral-400">
                <span className="text-neutral-600 font-medium">W. Edwards Deming</span> — Begründer des modernen Qualitätsmanagements
              </footer>
            </blockquote>
          </div>
        </Reveal>
      </div>
    </section>
  )
}


/* ═══════════════════════════════════════════════════════════════
   WAS DU LERNST — Modul-Netzwerk (Canvas Animation mit Floating)
   ═══════════════════════════════════════════════════════════════ */

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
    ['bwl', 'stat'], ['bwl', 'prog'],
    ['mktg', 'mafo'], ['mktg', 'bint'], ['mktg', 'stat'],
    ['ctrl', 'bint'], ['ctrl', 'oeko'],
    ['mafo', 'stat'], ['mafo', 'oeko'], ['mafo', 'dav'],
    ['stat', 'prog'], ['stat', 'oeko'], ['stat', 'ds'],
    ['prog', 'dav'], ['prog', 'db'], ['prog', 'ds'],
    ['bint', 'db'], ['bint', 'ds'], ['bint', 'dav'],
    ['oeko', 'ds'], ['oeko', 'dav'],
    ['dav', 'ds'],
    ['recht', 'ethik'], ['recht', 'dioek'],
    ['pm', 'bint'], ['pm', 'ctrl'],
    ['ethik', 'ds'], ['ethik', 'dioek'],
    ['wiss', 'stat'], ['wiss', 'oeko'],
    ['dioek', 'mktg'], ['dioek', 'bint'],
  ]

  const catColors: Record<string, string> = { w: '#E87722', t: '#2563eb', u: '#059669' }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.2 }
    )
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

    // Each module gets a random phase offset for floating
    const phases = modules.map(() => Math.random() * Math.PI * 2)
    const speeds = modules.map(() => 0.008 + Math.random() * 0.012)
    const amplitudes = modules.map(() => 0.003 + Math.random() * 0.005)

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      const W = rect.width
      const H = rect.height

      ctx.clearRect(0, 0, W, H)

      const introP = Math.min(frame / introFrames, 1)
      const ease = 1 - Math.pow(1 - introP, 3)

      // Calculate floating positions
      const getPos = (idx: number) => {
        const mod = modules[idx]
        const floatX = introP >= 1 ? Math.sin(frame * speeds[idx] + phases[idx]) * amplitudes[idx] : 0
        const floatY = introP >= 1 ? Math.cos(frame * speeds[idx] * 0.7 + phases[idx] + 1) * amplitudes[idx] : 0
        return {
          x: (mod.x + floatX) * W,
          y: (mod.y + floatY) * H,
        }
      }

      // Edges
      const edgeProgress = Math.min(introP * 1.5, 1)
      edges.forEach(([fromId, toId], idx) => {
        const fromIdx = modules.findIndex(m => m.id === fromId)
        const toIdx = modules.findIndex(m => m.id === toId)
        const from = modules[fromIdx]
        const to = modules[toIdx]
        const ep = Math.max(0, Math.min((edgeProgress - idx * 0.02) * 2, 1))
        if (ep <= 0) return

        const fPos = getPos(fromIdx)
        const tPos = getPos(toIdx)

        const crossDisc = from.cat !== to.cat
        // Pulse effect after intro
        const pulse = introP >= 1 ? 0.5 + 0.5 * Math.sin(frame * 0.02 + idx * 0.3) : 1
        ctx.strokeStyle = crossDisc
          ? `rgba(232, 119, 34, ${0.2 * ep * pulse})`
          : `rgba(160, 160, 160, ${0.1 * ep * pulse})`
        ctx.lineWidth = crossDisc ? 1.5 : 1
        ctx.beginPath()
        ctx.moveTo(fPos.x, fPos.y)
        if (ep < 1) {
          ctx.lineTo(fPos.x + (tPos.x - fPos.x) * ep, fPos.y + (tPos.y - fPos.y) * ep)
        } else {
          ctx.lineTo(tPos.x, tPos.y)
        }
        ctx.stroke()
      })

      // Nodes
      modules.forEach((mod, idx) => {
        const delay = idx * 0.03
        const np = Math.max(0, Math.min((ease - delay) * 1.5, 1))
        if (np <= 0) return

        const pos = getPos(idx)
        const baseRadius = Math.max(8, W * 0.015)
        // Subtle breathing effect after intro
        const breathe = introP >= 1 ? 1 + 0.08 * Math.sin(frame * 0.015 + phases[idx]) : 1
        const radius = baseRadius * np * breathe
        const color = catColors[mod.cat]

        // Glow
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, radius * 2.8, 0, Math.PI * 2)
        const rgbaGlow = mod.cat === 'w' ? `rgba(232,119,34,${0.06 * np})`
          : mod.cat === 't' ? `rgba(37,99,235,${0.06 * np})`
          : `rgba(5,150,105,${0.06 * np})`
        ctx.fillStyle = rgbaGlow
        ctx.fill()

        // Node
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.globalAlpha = np
        ctx.fill()
        ctx.globalAlpha = 1

        // Label
        const fontSize = Math.max(12, W * 0.016)
        ctx.font = `600 ${fontSize}px 'Space Grotesk', system-ui, sans-serif`
        ctx.fillStyle = `rgba(26, 26, 46, ${np * 0.85})`
        ctx.textAlign = 'center'
        ctx.fillText(mod.label, pos.x, pos.y - radius - 8)
      })

      frame++
      animRef.current = requestAnimationFrame(draw)
    }

    frame = 0
    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [isVisible])

  return (
    <section id="studium" className="py-20 sm:py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <Reveal>
          <p className="text-sm sm:text-base font-medium tracking-widest uppercase mb-5" style={{ color: '#E87722' }}>Das Studium</p>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>
            Drei Welten. Ein Studium.
          </h2>
          <p className="text-lg sm:text-xl text-neutral-500 max-w-3xl mb-8 sm:mb-10 leading-relaxed">
            Business Analytics verbindet Wirtschaftswissen, Technologie und methodische Kompetenz. Die Stärke liegt im Zusammenspiel — jedes Modul baut auf anderen auf.
          </p>
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap gap-6 sm:gap-8 mb-10 sm:mb-12 text-sm sm:text-base">
            <div className="flex items-center gap-2"><span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#E87722]" /> <span className="text-neutral-600 font-medium">Wirtschaft</span></div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#2563eb]" /> <span className="text-neutral-600 font-medium">Technologie</span></div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#059669]" /> <span className="text-neutral-600 font-medium">Überfachlich</span></div>
            <div className="text-neutral-400 text-sm">Verbindungen zeigen, wie Module zusammenspielen</div>
          </div>
        </Reveal>

        <div ref={containerRef} className="relative w-full" style={{ aspectRatio: '4/3' }}>
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
        <p className="text-xs sm:text-sm text-neutral-400 mt-4 text-center sm:text-left">16 Module in 3 Disziplinen — für Details zum Fahrplan weiter scrollen</p>
      </div>
    </section>
  )
}


/* ═══════════════════════════════════════════════════════════════
   SEMESTER-FAHRPLAN — Matrix-Layout mit Kompetenz-Aufbau
   ═══════════════════════════════════════════════════════════════ */

function SemesterFahrplan() {
  type ModuleItem = { name: string; cat: 'w' | 't' | 'u' | 'p' }

  const semesters: { nr: number; title: string; skill: string; items: ModuleItem[] }[] = [
    {
      nr: 1, title: 'Grundlagen',
      skill: 'Du verstehst die Sprache der Wirtschaft und Technik.',
      items: [
        { name: 'Allgemeine BWL', cat: 'w' },
        { name: 'Mathematik 1', cat: 't' },
        { name: 'Mikroökonomik', cat: 'w' },
        { name: 'Wirtschaftsinformatik', cat: 't' },
        { name: 'Projekt- & IT-Mgmt.', cat: 'u' },
        { name: 'Recht & Datenschutz', cat: 'u' },
      ],
    },
    {
      nr: 2, title: 'Methoden',
      skill: 'Du kannst Daten erheben, programmieren und statistisch auswerten.',
      items: [
        { name: 'Mathematik 2', cat: 't' },
        { name: 'Grundl. Statistik', cat: 't' },
        { name: 'Informatik & Progr.', cat: 't' },
        { name: 'Makroökonomik', cat: 'w' },
        { name: 'Marketing', cat: 'w' },
        { name: 'Wiss. Arbeiten & Ethik', cat: 'u' },
      ],
    },
    {
      nr: 3, title: 'Analytics',
      skill: 'Du beherrschst die Werkzeuge der Datenanalyse.',
      items: [
        { name: 'Operations Research', cat: 't' },
        { name: 'Ökonometrie', cat: 't' },
        { name: 'Datenbanken', cat: 't' },
        { name: 'Business Intelligence', cat: 't' },
        { name: 'Beschaffung & Logistik', cat: 'w' },
        { name: 'Business English', cat: 'u' },
      ],
    },
    {
      nr: 4, title: 'Vertiefung',
      skill: 'Du wendest Analytics auf echte Geschäftsfragen an.',
      items: [
        { name: 'Statistik f. Data Sc.', cat: 't' },
        { name: 'Datenaufbereitung', cat: 't' },
        { name: 'Markt- & Konsumforsch.', cat: 'w' },
        { name: 'Digitale Ökonomie', cat: 'w' },
        { name: 'Controlling', cat: 'w' },
        { name: 'Wahlpflichtmodul', cat: 'u' },
      ],
    },
    {
      nr: 5, title: 'Praxis',
      skill: 'Du arbeitest selbstständig mit Daten im Unternehmen.',
      items: [
        { name: 'Fachpraktikum', cat: 'p' },
        { name: 'Praxisseminar', cat: 'p' },
        { name: 'Eigenes Datenprojekt', cat: 'p' },
      ],
    },
    {
      nr: 6, title: 'Spezialisierung',
      skill: 'Du entwickelst Expertise in deinem Schwerpunkt.',
      items: [
        { name: 'Vertiefung BA', cat: 't' },
        { name: 'Projekt BA 1', cat: 't' },
        { name: 'Schwerpunkt BWL', cat: 'w' },
        { name: 'AWPM', cat: 'u' },
      ],
    },
    {
      nr: 7, title: 'Abschluss',
      skill: 'Du löst eigenständig komplexe Analytics-Projekte.',
      items: [
        { name: 'Projekt BA 2', cat: 't' },
        { name: 'Schwerpunkt BWL', cat: 'w' },
        { name: 'Bachelorarbeit', cat: 'u' },
      ],
    },
  ]

  const catColor: Record<string, { bg: string; border: string; text: string }> = {
    w: { bg: 'bg-orange-50', border: 'border-[#E87722]', text: 'text-[#E87722]' },
    t: { bg: 'bg-blue-50', border: 'border-[#2563eb]', text: 'text-[#2563eb]' },
    u: { bg: 'bg-emerald-50', border: 'border-[#059669]', text: 'text-[#059669]' },
    p: { bg: 'bg-amber-50', border: 'border-amber-500', text: 'text-amber-600' },
  }

  return (
    <section id="fahrplan" className="py-20 sm:py-28 lg:py-36 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <Reveal>
          <p className="text-sm sm:text-base font-medium tracking-widest uppercase mb-5" style={{ color: '#E87722' }}>Der Fahrplan</p>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>
            7 Semester. Dein Weg.
          </h2>
          <p className="text-lg sm:text-xl text-neutral-500 max-w-3xl mb-6 leading-relaxed">
            Vom ersten Datensatz bis zur eigenen Bachelorarbeit — jedes Semester baut auf dem vorherigen auf.
          </p>
          <div className="flex flex-wrap gap-5 mb-12 sm:mb-16 text-sm">
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-[#E87722]" /> Wirtschaft</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-[#2563eb]" /> Technologie</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-[#059669]" /> Überfachlich</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-amber-500" /> Praxis</span>
          </div>
        </Reveal>

        {/* Matrix Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 sm:gap-5">
          {semesters.map((sem, i) => (
            <Reveal key={sem.nr} delay={i < 7 ? `stagger-${Math.min(i + 1, 4)}` : ''}>
              <div className="bg-white border border-neutral-200 h-full flex flex-col">
                {/* Semester Header */}
                <div className="px-4 py-4 sm:py-5 border-b border-neutral-100">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0"
                      style={{
                        fontFamily: 'Space Grotesk',
                        background: sem.nr <= 2 ? '#E87722' : sem.nr <= 4 ? '#2563eb' : sem.nr <= 6 ? '#059669' : '#1A1A2E'
                      }}
                    >
                      {sem.nr}
                    </span>
                    <div>
                      <p className="font-bold text-base sm:text-lg leading-tight" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>{sem.title}</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-snug mt-2">{sem.skill}</p>
                </div>

                {/* Module Boxes */}
                <div className="p-3 sm:p-4 flex flex-col gap-2 flex-1">
                  {sem.items.map((mod, j) => {
                    const c = catColor[mod.cat]
                    return (
                      <div
                        key={j}
                        className={`${c.bg} border-l-[3px] ${c.border} px-3 py-2 text-xs sm:text-sm font-medium text-neutral-700 leading-snug`}
                      >
                        {mod.name}
                      </div>
                    )
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Progression Arrow + Link */}
        <Reveal>
          <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 text-neutral-400">
              <div className="hidden sm:flex items-center gap-1">
                {[1,2,3,4,5,6,7].map(n => (
                  <div key={n} className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-500">{n}</div>
                    {n < 7 && <div className="w-4 sm:w-6 h-px bg-neutral-300" />}
                  </div>
                ))}
              </div>
              <span className="text-sm">Grundlagen → Analytics → Praxis → Expertise</span>
            </div>
            <a
              href="https://business.thws.de/bachelor-business-analytics/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[#E87722] hover:underline flex items-center gap-1"
            >
              Alle Module im Detail auf thws.de
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}


/* ─── Markt-Wachstums-Chart (simpel, kein externer Dep) ─── */
function MarketGrowthChart() {
  const data = [
    { year: '2022', value: 2.8 },
    { year: '2023', value: 3.5 },
    { year: '2024', value: 4.4 },
    { year: '2025', value: 5.6 },
    { year: '2027', value: 9.0 },
    { year: '2030', value: 18.0 },
  ]
  const max = 20
  return (
    <div className="space-y-3">
      {data.map((d, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="text-xs text-neutral-500 w-10 text-right font-mono">{d.year}</span>
          <div className="flex-1 h-7 bg-neutral-100 relative overflow-hidden">
            <div
              className="h-full transition-all duration-1000"
              style={{
                width: `${(d.value / max) * 100}%`,
                background: i >= 4 ? '#E87722' : '#2563eb',
                opacity: i >= 4 ? 1 : 0.7,
              }}
            />
          </div>
          <span className="text-xs text-neutral-500 w-14 font-mono">{d.value} Mrd €</span>
        </div>
      ))}
      <p className="text-xs text-neutral-400 mt-1">Prognose ab 2025 (jährliches Wachstum ca. 25%)</p>
    </div>
  )
}


/* ═══════════════════════════════════════════════════════════════
   BERUFSWELT — Profile + Stellenanzeigen + KI-Argument (Light)
   ═══════════════════════════════════════════════════════════════ */

function Berufswelt() {
  const [view, setView] = useState<'profile' | 'stellen' | 'ki'>('profile')

  const profiles = [
    { title: 'Business Analyst', bereich: 'Unternehmensberatung', desc: 'Du analysierst, wie ein Unternehmen arbeitet, findest Schwachstellen und schlägst datenbasierte Verbesserungen vor. Du bist die Schnittstelle zwischen Technik und Management.' },
    { title: 'Data Analyst', bereich: 'Konzern / Mittelstand', desc: 'Du wertest große Datenmengen aus, erkennst Muster und erklärst der Geschäftsführung, was die Zahlen bedeuten — und was zu tun ist.' },
    { title: 'BI-Consultant', bereich: 'IT-Beratung', desc: 'Du baust die Systeme, mit denen Unternehmen ihre Daten sichtbar machen — von automatischen Reports bis zu interaktiven Dashboards.' },
    { title: 'Marketing Analyst', bereich: 'E-Commerce / Agentur', desc: 'Du findest heraus, welche Werbung wirkt, welche Kunden kaufen und warum — und hilfst dem Marketing, bessere Entscheidungen zu treffen.' },
    { title: 'Controlling-Analyst', bereich: 'Finanzen', desc: 'Du modellierst Budgets, erstellst Prognosen und zeigst dem Management, wo das Geld hinfließt — und wo es besser eingesetzt wäre.' },
    { title: 'Data Scientist', bereich: 'Tech / Startup', desc: 'Du baust Algorithmen, die aus vergangenen Daten die Zukunft vorhersagen — zum Beispiel welche Produkte Kunden als nächstes kaufen werden.' },
  ]

  const stellen = [
    { firma: 'BMW Group', titel: 'Junior Business Analyst (m/w/d)', ort: 'München', gehalt: '52–62k €', tags: ['SQL', 'Power BI', 'SAP'], link: 'https://www.stepstone.de/jobs/business-analyst/in-muenchen' },
    { firma: 'McKinsey', titel: 'Business Analyst', ort: 'Frankfurt', gehalt: '65–75k €', tags: ['Datenanalyse', 'Präsentation', 'Excel'], link: 'https://www.linkedin.com/jobs/business-analyst-jobs-germany/' },
    { firma: 'Zalando', titel: 'Data Analyst Marketing', ort: 'Berlin', gehalt: '48–58k €', tags: ['Python', 'SQL', 'A/B Testing'], link: 'https://www.stepstone.de/jobs/data-analyst/in-berlin' },
    { firma: 'Siemens', titel: 'BI Consultant', ort: 'Erlangen', gehalt: '55–65k €', tags: ['Power BI', 'DAX', 'Azure'], link: 'https://www.stepstone.de/jobs/business-intelligence' },
    { firma: 'Deutsche Bank', titel: 'Risk Analyst', ort: 'Frankfurt', gehalt: '58–68k €', tags: ['R', 'SQL', 'Statistik'], link: 'https://careers.db.com/professionals/search-roles/' },
    { firma: 'CHECK24', titel: 'BI Analyst', ort: 'München', gehalt: '50–60k €', tags: ['Python', 'Tableau', 'ETL'], link: 'https://www.stepstone.de/jobs/data-analyst' },
    { firma: 'Bosch', titel: 'Data Scientist (Junior)', ort: 'Stuttgart', gehalt: '55–65k €', tags: ['Python', 'ML', 'Spark'], link: 'https://www.stepstone.de/jobs/data-scientist' },
    { firma: 'Allianz', titel: 'Data Analyst Versicherung', ort: 'München', gehalt: '50–60k €', tags: ['R', 'SAS', 'Statistik'], link: 'https://www.datacareer.de/categories/dataanalytics/' },
    { firma: 'SAP', titel: 'Associate BI Consultant', ort: 'Walldorf', gehalt: '55–65k €', tags: ['SAP BW', 'SQL', 'HANA'], link: 'https://www.linkedin.com/jobs/business-analyst-jobs-germany/' },
  ]

  return (
    <section id="berufswelt" className="py-20 sm:py-28 lg:py-36 bg-white relative overflow-hidden">
      {/* Bauhaus accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#E87722]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <Reveal>
          <p className="text-sm sm:text-base font-medium tracking-widest uppercase mb-5" style={{ color: '#E87722' }}>Nach dem Studium</p>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>
            Was du damit machen kannst.
          </h2>
          <p className="text-lg sm:text-xl text-neutral-500 max-w-3xl mb-10 sm:mb-12 leading-relaxed">
            Mit einem BBA-Abschluss bist du nicht auf einen Job festgelegt — du kannst in völlig unterschiedlichen Branchen arbeiten.
          </p>
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap gap-px mb-10 sm:mb-12">
            {[
              { key: 'profile' as const, label: 'Berufsprofile' },
              { key: 'stellen' as const, label: 'Echte Stellenanzeigen' },
              { key: 'ki' as const, label: 'Warum gerade jetzt' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setView(tab.key)}
                className={`px-5 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all ${view === tab.key ? 'bg-[#E87722] text-white' : 'bg-neutral-100 text-neutral-500 hover:text-neutral-800'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Reveal>

        {view === 'profile' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {profiles.map((p, i) => (
              <Reveal key={i} delay={i < 6 ? `stagger-${i + 1}` : ''}>
                <div className="p-6 sm:p-8 lg:p-10 bg-[#FAFAF8] border border-neutral-200 h-full hover:border-[#E87722]/30 transition-colors">
                  <p className="text-[#E87722] text-xs sm:text-sm font-bold uppercase tracking-widest mb-3">{p.bereich}</p>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>{p.title}</h3>
                  <p className="text-sm sm:text-base text-neutral-500 leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {view === 'stellen' && (
          <div>
            <p className="text-xs sm:text-sm text-neutral-400 mb-6">Beispielhafte Stellenprofile nach Vorbild realer Ausschreibungen — Links führen zu aktuellen Jobbörsen</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {stellen.map((s, i) => (
                <Reveal key={i} delay={i < 6 ? `stagger-${i + 1}` : ''}>
                  <a href={s.link} target="_blank" rel="noopener noreferrer" className="block p-6 sm:p-8 lg:p-10 bg-[#FAFAF8] border border-neutral-200 h-full hover:border-[#E87722]/40 hover:shadow-md transition-all group">
                    <p className="font-bold text-base sm:text-lg mb-1 group-hover:text-[#E87722] transition-colors" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>{s.firma}</p>
                    <p className="text-[#E87722] font-semibold text-sm sm:text-base mb-2">{s.titel}</p>
                    <p className="text-neutral-400 text-xs sm:text-sm mb-4">{s.ort} · {s.gehalt}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.tags.map((t, j) => (
                        <span key={j} className="text-xs font-medium px-2 sm:px-3 py-1 bg-white border border-neutral-200 text-neutral-500">{t}</span>
                      ))}
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {view === 'ki' && (
          <div className="grid lg:grid-cols-5 gap-10 sm:gap-12">
            <Reveal className="lg:col-span-3">
              <div className="space-y-8 sm:space-y-10 text-base sm:text-lg leading-relaxed">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>KI verändert den Arbeitsmarkt. Aber nicht so, wie viele denken.</h3>
                  <p className="text-neutral-500">
                    Automatisiert werden repetitive Aufgaben — Daten eintippen, einfache Reports erstellen, Standardauswertungen. Was nicht automatisiert wird: die richtigen Fragen stellen, Ergebnisse einordnen, Entscheidungen treffen.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>Warum BBA-Absolventen profitieren</h3>
                  <p className="text-neutral-500">
                    KI-Tools wie ChatGPT oder Copilot sind mächtige Werkzeuge — aber nur für diejenigen, die wissen, was sie fragen müssen und wie sie die Ergebnisse bewerten. Genau das lernt man im BBA: kritisches Denken mit Daten.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>Die Nachfrage wächst</h3>
                  <p className="text-neutral-500">
                    Je mehr Daten Unternehmen sammeln, desto mehr brauchen sie Menschen, die damit umgehen können. Der Markt für Data-Professionals wächst seit Jahren zweistellig — und durch KI beschleunigt sich das noch.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay="stagger-2" className="lg:col-span-2">
              <div className="space-y-6 sm:space-y-8 bg-[#FAFAF8] p-6 sm:p-8 border border-neutral-200">
                <h3 className="text-base sm:text-lg font-bold" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>Data Analytics Markt Deutschland</h3>
                <MarketGrowthChart />
                <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-neutral-400">
                  <p>Quelle: Grand View Research, IMARC Group (2024/25)</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline border-b border-neutral-200 pb-2">
                      <span>Offene Data-Analyst-Stellen (DE)</span>
                      <span className="font-bold text-sm sm:text-base" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>4.000+</span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-neutral-200 pb-2">
                      <span>Durchschnittsgehalt</span>
                      <span className="font-bold text-sm sm:text-base" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>52–67k €</span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-neutral-200 pb-2">
                      <span>Jährliches Marktwachstum</span>
                      <span className="font-bold text-sm sm:text-base" style={{ fontFamily: 'Space Grotesk', color: '#E87722' }}>+25% pro Jahr</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  )
}


/* ═══════════════════════════════════════════════════════════════
   PASST DU ZU BBA? — Erwartungen, kein Nerd-Filter
   ═══════════════════════════════════════════════════════════════ */

function PasstDu() {
  const passt = [
    {
      title: 'Neugier',
      desc: 'Du fragst dich, warum Dinge so sind, wie sie sind. Wenn du eine Statistik siehst, willst du wissen, was dahintersteckt.',
    },
    {
      title: 'Interesse an Wirtschaft',
      desc: 'Du willst verstehen, wie Unternehmen funktionieren — nicht nur in der Theorie, sondern in der echten Welt. Warum ist Netflix erfolgreich? Warum scheitern andere?',
    },
    {
      title: 'Spaß an Technologie',
      desc: 'Du musst nicht programmieren können. Aber die Idee, mit einem Computer Probleme zu lösen, findest du spannender als abschreckend.',
    },
    {
      title: 'Faible für Zahlen und Fakten',
      desc: 'Du vertraust lieber Daten als Meinungen. Wenn jemand sagt „Das war schon immer so", willst du Belege sehen.',
    },
  ]

  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-[#FAFAF8]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-16">
        <Reveal>
          <p className="text-sm sm:text-base font-medium tracking-widest uppercase mb-5" style={{ color: '#E87722' }}>Für wen ist das?</p>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>
            Passt du zu BBA?
          </h2>
          <p className="text-lg sm:text-xl text-neutral-500 max-w-3xl mb-12 sm:mb-16 leading-relaxed">
            Du brauchst kein Mathe-Ass zu sein und musst keine Programmiersprache kennen. Was du mitbringen solltest, ist etwas anderes.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16">
          {passt.map((p, i) => (
            <Reveal key={i} delay={i < 4 ? `stagger-${i + 1}` : ''}>
              <div className="border-l-[3px] border-[#E87722] pl-6 sm:pl-8 py-2">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>
                  {p.title}
                </h3>
                <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="bg-white border border-neutral-200 p-8 sm:p-10 lg:p-12">
            <p className="text-lg sm:text-xl lg:text-2xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>
              Was du nicht sein musst
            </p>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
              BBA ist kein Informatik-Studium und bildet keine Nerds aus. Es geht nicht darum, den ganzen Tag Code zu schreiben. Es geht darum, Wirtschaft zu verstehen, Technologie sinnvoll einzusetzen und mit Daten bessere Entscheidungen zu treffen. Die Mischung macht's — und genau die ist auf dem Arbeitsmarkt so gefragt.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}


/* ═══════════════════════════════════════════════════════════════
   VORTEILE — Warum BBA an der THWS + StudyCheck (Light)
   ═══════════════════════════════════════════════════════════════ */

function Vorteile() {
  const vorteile = [
    { value: '~30', label: 'Studierende pro Jahrgang', desc: 'Klein und persönlich — du bist keine Matrikelnummer.' },
    { value: '3 in 1', label: 'BWL + IT + Analytik', desc: 'Einzigartige Kombination, die auf dem Arbeitsmarkt gefragt ist.' },
    { value: 'Sem. 5', label: 'Praxissemester', desc: 'Ein ganzes Semester im Unternehmen — echter Berufseinblick.' },
    { value: '+25%', label: 'Marktwachstum/Jahr', desc: 'Data Analytics ist einer der am schnellsten wachsenden Bereiche.' },
    { value: 'B.Sc.', label: 'Bachelor of Science', desc: 'International anerkannter Abschluss in 7 Semestern.' },
    { value: '~150 €', label: 'Nur der Semesterbeitrag', desc: 'Keine Studiengebühren. Semesterticket für ganz Unterfranken inklusive.' },
  ]

  const ratings = [
    { label: 'Studieninhalte', value: 4.2 },
    { label: 'Dozenten', value: 4.0 },
    { label: 'Lehrveranstaltungen', value: 4.0 },
    { label: 'Digitales Studieren', value: 4.2 },
    { label: 'Literaturzugang', value: 4.3 },
    { label: 'Organisation', value: 3.8 },
  ]

  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-white relative overflow-hidden">
      {/* Bauhaus accent circle */}
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full border-2 border-[#E87722]/10 -translate-x-1/2 translate-y-1/2" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <Reveal>
          <p className="text-sm sm:text-base font-medium tracking-widest uppercase mb-5" style={{ color: '#E87722' }}>Auf einen Blick</p>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>
            Warum BBA an der THWS?
          </h2>
          <p className="text-lg sm:text-xl text-neutral-500 max-w-3xl mb-12 sm:mb-16 leading-relaxed">
            Kleine Kurse, starke Inhalte, echte Praxis — und das bestätigen auch die Studierenden.
          </p>
        </Reveal>

        {/* Vorteile Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12 sm:mb-16">
          {vorteile.map((v, i) => (
            <Reveal key={i} delay={i < 6 ? `stagger-${i + 1}` : ''}>
              <div className="p-6 sm:p-8 lg:p-10 bg-[#FAFAF8] border border-neutral-200 h-full hover:border-[#E87722]/30 transition-colors">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>{v.value}</span>
                  <span className="text-sm sm:text-base text-[#E87722] font-semibold">{v.label}</span>
                </div>
                <p className="text-sm sm:text-base text-neutral-500 leading-relaxed">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* StudyCheck Bewertung */}
        <Reveal>
          <div className="bg-[#FAFAF8] border border-neutral-200 p-8 sm:p-10 lg:p-12">
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 mb-8 sm:mb-10">
              <div>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-neutral-400 mb-2">StudyCheck.de</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>4.0</span>
                  <span className="text-xl sm:text-2xl text-neutral-400">/ 5</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-base sm:text-lg text-[#E87722] font-semibold">83% Weiterempfehlung</p>
                <p className="text-sm sm:text-base text-neutral-400">Basierend auf 6 Bewertungen</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {ratings.map((r, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs sm:text-sm text-neutral-500">{r.label}</span>
                      <span className="text-xs sm:text-sm font-bold" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>{r.value}</span>
                    </div>
                    <div className="h-2 bg-neutral-200 overflow-hidden">
                      <div className="h-full bg-[#E87722] transition-all duration-1000" style={{ width: `${(r.value / 5) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-neutral-400">
              Quelle: <a href="https://www.studycheck.de/studium/business-information-management/thws-27180/bewertungen" target="_blank" rel="noopener noreferrer" className="text-[#E87722] hover:underline">studycheck.de</a> (Stand 2025)
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}


/* ═══════════════════════════════════════════════════════════════
   WÜRZBURG
   ═══════════════════════════════════════════════════════════════ */

function Wuerzburg() {
  return (
    <section id="wuerzburg" className="py-20 sm:py-28 lg:py-36 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <Reveal>
          <p className="text-sm sm:text-base font-medium tracking-widest uppercase mb-5" style={{ color: '#E87722' }}>Der Standort</p>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>
            Würzburg.
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24">
          <Reveal>
            <div className="space-y-6 sm:space-y-8 text-base sm:text-lg text-neutral-600 leading-relaxed">
              <p>
                Rund 128.000 Einwohner, davon über 35.000 Studierende. Würzburg ist eine Stadt, in der sich alles zu Fuß oder mit dem Rad erreichen lässt — Uni, Cafés, Mainufer, Altstadt.
              </p>
              <p>
                Die Lebenshaltungskosten liegen deutlich unter München oder Frankfurt. WG-Zimmer ab ca. 400 €, günstiges Mensaessen, Semesterticket für ganz Unterfranken inklusive.
              </p>
              <p>
                Die THWS (Technische Hochschule Würzburg-Schweinfurt) ist bekannt für praxisnahe Lehre. Im BBA studieren nur rund 30 Studierende pro Jahrgang — du kennst deine Kommilitonen und deine Profs persönlich. Kein anonymer Massenbetrieb, sondern echte Zusammenarbeit.
              </p>
              <p>
                Die Region ist wirtschaftlich stark: Unternehmen wie s.Oliver, Brose, Koenig & Bauer und zahlreiche IT-Dienstleister bieten Praktikums- und Einstiegsmöglichkeiten direkt vor Ort.
              </p>
            </div>
          </Reveal>

          <Reveal delay="stagger-2">
            <div className="space-y-4 sm:space-y-6">
              {[
                { label: 'Studierende in Würzburg', value: '35.000+' },
                { label: 'Anteil 18–30-Jährige', value: 'Höchster in DE' },
                { label: 'Entfernung Innenstadt — Campus', value: '10 min (Rad)' },
                { label: 'WG-Zimmer ab', value: '~400 €/Monat' },
                { label: 'Semesterticket', value: 'ganz Unterfranken' },
                { label: 'Sonnenstunden pro Jahr', value: '1.650+' },
              ].map((fact, i) => (
                <div key={i} className="flex justify-between items-baseline border-b border-neutral-200 pb-3 sm:pb-4">
                  <span className="text-sm sm:text-base text-neutral-500">{fact.label}</span>
                  <span className="text-lg sm:text-xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>{fact.value}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}


/* ═══════════════════════════════════════════════════════════════
   CTA — Bewerbung
   ═══════════════════════════════════════════════════════════════ */

function CTA() {
  return (
    <section id="bewerben" className="py-20 sm:py-28 lg:py-36 bg-white">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 text-center">
        <Reveal>
          <p className="text-sm sm:text-base font-medium tracking-widest uppercase mb-5" style={{ color: '#E87722' }}>Nächster Schritt</p>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight mb-6 sm:mb-8" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>
            Klingt nach dir?
          </h2>
          <p className="text-lg sm:text-xl text-neutral-500 max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed">
            Bewerbungszeitraum: 1. Mai bis 15. Juli. Zulassungsfrei — kein NC.
          </p>
        </Reveal>

        <Reveal delay="stagger-1">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-10 sm:mb-14 text-left max-w-3xl mx-auto">
            <div>
              <p className="text-xs sm:text-sm text-neutral-400 uppercase tracking-widest mb-1">Abschluss</p>
              <p className="text-base sm:text-lg font-bold" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>B.Sc.</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-neutral-400 uppercase tracking-widest mb-1">Dauer</p>
              <p className="text-base sm:text-lg font-bold" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>7 Semester</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-neutral-400 uppercase tracking-widest mb-1">Start</p>
              <p className="text-base sm:text-lg font-bold" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>Oktober</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-neutral-400 uppercase tracking-widest mb-1">Plätze</p>
              <p className="text-base sm:text-lg font-bold" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>ca. 40</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay="stagger-2">
          <a
            href="https://www.thws.de/beratung-und-service/bewerbung-immatrikulation-pruefungen-praktikum/bewerbung/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#E87722] text-white px-10 sm:px-14 py-4 sm:py-5 text-lg sm:text-xl font-bold tracking-wide hover:bg-[#d06a1e] transition-colors"
          >
            Jetzt bewerben
          </a>
          <p className="mt-5 sm:mt-6 text-sm sm:text-base text-neutral-400">
            Fragen? Schreib an <a href="mailto:robert.butscher@thws.de" className="text-[#E87722] hover:underline">robert.butscher@thws.de</a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}


/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="py-10 sm:py-12 bg-[#1A1A2E]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 flex flex-wrap justify-between items-center gap-4 sm:gap-6 text-xs sm:text-sm text-neutral-500">
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm sm:text-base" style={{ fontFamily: 'Space Grotesk', color: '#E87722' }}>BBA</span>
          <span>THWS Würzburg</span>
        </div>
        <div className="flex gap-5 sm:gap-8">
          <a href="https://www.thws.de/service/impressum/" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-300 transition-colors">Impressum</a>
          <a href="https://www.thws.de/service/datenschutz/" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-300 transition-colors">Datenschutz</a>
          <a href="https://www.thws.de" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-300 transition-colors">thws.de</a>
        </div>
      </div>
    </footer>
  )
}
