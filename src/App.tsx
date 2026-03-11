import { useEffect, useRef, useState, useCallback } from 'react'
import './App.css'

/* ─── Intersection Observer Hook ─── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
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

/* ─── Navigation ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const links = [
    { href: '#problem', label: 'Warum Daten?' },
    { href: '#studium', label: 'Das Studium' },
    { href: '#dav', label: 'Live: DAV' },
    { href: '#wuerzburg', label: 'Würzburg' },
    { href: '#cta', label: 'Bewerben' },
  ]
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-3">
          <span className="font-bold text-lg tracking-tight" style={{ fontFamily: 'Space Grotesk', color: '#E87722' }}>BBA</span>
          <span className={`text-sm hidden sm:inline ${scrolled ? 'text-gray-500' : 'text-gray-400'}`}>THWS Business School</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className={`text-sm font-medium transition-colors hover:text-[#E87722] ${scrolled ? 'text-gray-700' : 'text-gray-600'}`}>{l.label}</a>
          ))}
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2" aria-label="Menü">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t px-6 py-4 space-y-3">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-gray-700 hover:text-[#E87722]">{l.label}</a>
          ))}
        </div>
      )}
    </nav>
  )
}

/* ─── Hero Section ─── */
function Hero() {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800)
    const t2 = setTimeout(() => setPhase(2), 2200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])
  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden" style={{ background: 'linear-gradient(165deg, #FFFAF5 0%, #FFF7F0 40%, #F8F6F3 100%)' }}>
      {/* Geometric accents */}
      <div className="absolute top-20 right-12 w-64 h-64 border border-[#E87722]/10 rotate-12" />
      <div className="absolute bottom-32 left-8 w-40 h-40 border border-[#E87722]/15 -rotate-6" />
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-[#E87722] rounded-full opacity-40" />
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-[#E87722] rounded-full opacity-30" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl">
          <p className={`text-sm font-medium tracking-widest uppercase mb-6 transition-all duration-700 ${phase >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ color: '#E87722' }}>
            Bachelor Business Analytics · THWS Würzburg
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-8" style={{ fontFamily: 'Space Grotesk' }}>
            <span className={`block transition-all duration-700 ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ color: '#1A1A2E' }}>
              Jeden Tag triffst du
            </span>
            <span className={`block transition-all duration-700 delay-200 ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ color: '#1A1A2E' }}>
              Entscheidungen.
            </span>
            <span className={`block mt-3 transition-all duration-700 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ color: '#E87722' }}>
              Aber wie triffst du
            </span>
            <span className={`block transition-all duration-700 delay-200 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ color: '#E87722' }}>
              die richtigen?
            </span>
          </h1>
          <p className={`text-lg sm:text-xl text-gray-500 max-w-xl leading-relaxed transition-all duration-700 delay-500 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Business Analytics verbindet Wirtschaftswissen mit Technologie und Datenanalyse — damit du nicht raten musst, sondern weißt.
          </p>
          <div className={`flex flex-wrap gap-4 mt-10 transition-all duration-700 delay-700 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <a href="#problem" className="inline-flex items-center gap-2 bg-[#1A1A2E] text-white px-7 py-3.5 text-sm font-semibold tracking-wide hover:bg-[#2a2a4e] transition-colors">
              Entdecken ↓
            </a>
            <a href="#cta" className="inline-flex items-center gap-2 border-2 border-[#E87722] text-[#E87722] px-7 py-3.5 text-sm font-semibold tracking-wide hover:bg-[#E87722] hover:text-white transition-colors">
              Direkt bewerben →
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 delay-1000 ${phase >= 2 ? 'opacity-60' : 'opacity-0'}`}>
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-gray-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}

/* ─── Alltags-Entscheidungen ─── */
function Alltag() {
  const cards = [
    { emoji: '👟', title: 'Welchen Sneaker kaufen?', sub: 'Preis, Bewertungen, Trend — alles Daten.' },
    { emoji: '🎓', title: 'Was studieren?', sub: 'Jobchancen, Gehalt, Interessen — messbar.' },
    { emoji: '📈', title: 'In welche Aktie investieren?', sub: 'Marktdaten, Prognosen, Risiko — analysierbar.' },
  ]
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal>
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: '#E87722' }}>Alltag & Daten</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>
            Entscheidungen sind überall.
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mb-16">
            Jeden Tag triffst du dutzende Entscheidungen. Manche klein, manche lebensverändernd. Hinter jeder guten Entscheidung stecken Informationen.
          </p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((c, i) => (
            <Reveal key={i} delay={`stagger-${i + 1}`}>
              <div className="group p-8 border border-gray-100 hover:border-[#E87722]/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-50">
                <span className="text-4xl block mb-5">{c.emoji}</span>
                <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Space Grotesk' }}>{c.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{c.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Fallstudie: Mission Erfrischung ─── */
function Fallstudie() {
  const [showData, setShowData] = useState(false)
  return (
    <section id="problem" className="py-24 lg:py-32" style={{ background: '#1A1A2E' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal>
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: '#E87722' }}>Fallstudie</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white" style={{ fontFamily: 'Space Grotesk' }}>
            Mission Erfrischung
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mb-4">
            Stell dir vor: Du bist Produktmanager:in bei einem Getränkehersteller. Euer neues Eistee-Produkt soll in 200 Supermärkte — ein Millionen-Budget steht dahinter.
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mb-12">
            Die Frage ist: Wie entscheidest du?
          </p>
        </Reveal>

        {/* Toggle */}
        <Reveal>
          <div className="flex gap-2 mb-12">
            <button onClick={() => setShowData(false)} className={`px-5 py-2.5 text-sm font-semibold transition-all ${!showData ? 'bg-[#E87722] text-white' : 'bg-white/10 text-gray-400 hover:text-white'}`}>
              Bauchgefühl
            </button>
            <button onClick={() => setShowData(true)} className={`px-5 py-2.5 text-sm font-semibold transition-all ${showData ? 'bg-[#E87722] text-white' : 'bg-white/10 text-gray-400 hover:text-white'}`}>
              Mit Business Analytics
            </button>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Entscheidungsprozess */}
          <Reveal>
            <div className={`p-8 transition-all duration-500 ${!showData ? 'border border-red-500/30 bg-red-500/5' : 'border border-emerald-500/30 bg-emerald-500/5'}`}>
              <h3 className="text-xl font-semibold mb-6 text-white" style={{ fontFamily: 'Space Grotesk' }}>
                {!showData ? '❌ Ohne Daten' : '✅ Mit Business Analytics'}
              </h3>
              {!showData ? (
                <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                  <div className="flex gap-3"><span className="text-red-400 font-bold shrink-0">01</span><p><strong className="text-white">Zielgruppe:</strong> „Alle, die Eistee mögen" — vage, keine Segmentierung</p></div>
                  <div className="flex gap-3"><span className="text-red-400 font-bold shrink-0">02</span><p><strong className="text-white">Platzierung:</strong> Gleichmäßig in allen 200 Märkten — ohne regionale Analyse</p></div>
                  <div className="flex gap-3"><span className="text-red-400 font-bold shrink-0">03</span><p><strong className="text-white">Launch:</strong> Im Januar — weil „es gerade passt"</p></div>
                  <div className="flex gap-3"><span className="text-red-400 font-bold shrink-0">04</span><p><strong className="text-white">Preis:</strong> „Was die Konkurrenz nimmt" — ohne Preissensitivität</p></div>
                </div>
              ) : (
                <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                  <div className="flex gap-3"><span className="text-emerald-400 font-bold shrink-0">01</span><p><strong className="text-white">Kundensegmentierung:</strong> Datenanalyse zeigt: 18–35, urban, gesundheitsbewusst → 3× höhere Kaufwahrscheinlichkeit</p></div>
                  <div className="flex gap-3"><span className="text-emerald-400 font-bold shrink-0">02</span><p><strong className="text-white">Standortoptimierung:</strong> Geo-Daten + Abverkaufshistorie → 60 Premium-Standorte identifiziert</p></div>
                  <div className="flex gap-3"><span className="text-emerald-400 font-bold shrink-0">03</span><p><strong className="text-white">Timing:</strong> Saisonale Nachfragekurve → Launch im Mai, Peak-Saison</p></div>
                  <div className="flex gap-3"><span className="text-emerald-400 font-bold shrink-0">04</span><p><strong className="text-white">Pricing:</strong> Preissensitivitätsanalyse → Premium-Segment, +15% Marge</p></div>
                </div>
              )}
            </div>
          </Reveal>

          {/* Ergebnis */}
          <Reveal delay="stagger-2">
            <div className={`p-8 transition-all duration-500 ${!showData ? 'border border-red-500/30 bg-red-500/5' : 'border border-emerald-500/30 bg-emerald-500/5'}`}>
              <h3 className="text-xl font-semibold mb-6 text-white" style={{ fontFamily: 'Space Grotesk' }}>
                Ergebnis
              </h3>
              {!showData ? (
                <div>
                  <div className="text-6xl lg:text-7xl font-bold text-red-400 mb-4" style={{ fontFamily: 'Space Grotesk' }}>40%</div>
                  <p className="text-gray-400 mb-3">der Ware bleibt im Regal. Millionenverlust.</p>
                  <div className="mt-6 space-y-2 text-sm text-gray-500">
                    <p>→ Falsches Timing, falsche Märkte</p>
                    <p>→ Preis zu hoch für die Zielgruppe</p>
                    <p>→ Kein Plan B — keine Daten für Korrekturen</p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-6xl lg:text-7xl font-bold text-emerald-400 mb-4" style={{ fontFamily: 'Space Grotesk' }}>92%</div>
                  <p className="text-gray-400 mb-3">Abverkauf. Nachbestellungen. Expansion.</p>
                  <div className="mt-6 space-y-2 text-sm text-gray-500">
                    <p>→ Daten lieferten den richtigen Zeitpunkt</p>
                    <p>→ Modelle optimierten Menge pro Standort</p>
                    <p>→ Real-time Dashboard für Nachsteuerung</p>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>

        {/* BBA-Bezug */}
        {showData && (
          <Reveal>
            <div className="mt-12 p-8 border border-[#E87722]/30 bg-[#E87722]/5">
              <h3 className="text-lg font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>
                Jeder Schritt nutzt BBA-Kompetenzen
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                {[
                  { mod: 'Statistik', code: 'GSTAT / STDS', what: 'Daten analysieren' },
                  { mod: 'Marktforschung', code: 'MAFO', what: 'Kunden verstehen' },
                  { mod: 'Business Intelligence', code: 'BINT', what: 'Dashboards bauen' },
                  { mod: 'Programmieren', code: 'INFO / DAV', what: 'Modelle entwickeln' },
                ].map((m, i) => (
                  <div key={i} className="p-4 bg-white/5">
                    <p className="text-[#E87722] font-semibold">{m.mod}</p>
                    <p className="text-gray-500 text-xs mt-1">Modul {m.code}</p>
                    <p className="text-gray-300 mt-2">{m.what}</p>
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

/* ─── Drei Säulen ─── */
function DreiSaeulen() {
  const saeulen = [
    {
      title: 'Wirtschaft',
      color: '#E87722',
      items: ['BWL & VWL', 'Marketing', 'Controlling', 'Digitale Ökonomie', 'Beschaffung & Logistik'],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E87722" strokeWidth="1.5">
          <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
        </svg>
      ),
    },
    {
      title: 'Technologie & Analytik',
      color: '#2563eb',
      items: ['Statistik & Data Science', 'Programmieren (Python, R, SQL)', 'Business Intelligence', 'Ökonometrie', 'Machine Learning'],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5">
          <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
        </svg>
      ),
    },
    {
      title: 'Überfachlich',
      color: '#059669',
      items: ['Recht & Datenschutz', 'Projektmanagement', 'Business English', 'Ethik & Digitalisierung', 'Wissenschaftliches Arbeiten'],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
        </svg>
      ),
    },
  ]
  return (
    <section id="studium" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal>
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: '#E87722' }}>Das Studium</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>
            Drei Welten. Ein Studiengang.
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mb-16">
            BBA bringt zusammen, was zusammengehört: Wirtschaftliches Denken, technische Fähigkeiten und überfachliche Kompetenzen.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {saeulen.map((s, i) => (
            <Reveal key={i} delay={`stagger-${i + 1}`}>
              <div className="p-8 border border-gray-100 h-full hover:shadow-lg transition-shadow duration-300" style={{ borderTopWidth: '3px', borderTopColor: s.color }}>
                <div className="mb-5">{s.icon}</div>
                <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Space Grotesk', color: s.color }}>{s.title}</h3>
                <ul className="space-y-2.5">
                  {s.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: s.color, opacity: 0.5 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Semester-Journey ─── */
function SemesterJourney() {
  const semesters = [
    { sem: '1', label: 'Fundament', items: ['BWL-Grundlagen', 'Mikroökonomik', 'Mathematik', 'Wirtschaftsinformatik'], side: 'left' },
    { sem: '2', label: 'Methoden', items: ['Marketing', 'Statistik', 'Programmieren', 'Makroökonomik'], side: 'right' },
    { sem: '3', label: 'Analytik', items: ['Business Intelligence', 'Datenbanken', 'Ökonometrie', 'Operations Research'], side: 'left' },
    { sem: '4', label: 'Vertiefung', items: ['Data Science', 'DAV (Python)', 'Marktforschung', 'Controlling'], side: 'right' },
    { sem: '5', label: 'Praxis', items: ['Praxissemester im Unternehmen — echte Projekte, echte Daten'], side: 'left' },
    { sem: '6–7', label: 'Spezialisierung', items: ['BA-Projekte', 'BWL-Schwerpunkt', 'Wahlpflicht', 'Bachelorarbeit'], side: 'right' },
  ]
  return (
    <section className="py-24 lg:py-32" style={{ background: '#FAFAF8' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal>
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: '#E87722' }}>Semester 1–7</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>
            Dein Weg durch 7 Semester.
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mb-16">
            Von den Grundlagen bis zum eigenen Projekt — jedes Semester baut auf dem vorherigen auf.
          </p>
        </Reveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200" />

          <div className="space-y-8 lg:space-y-12">
            {semesters.map((s, i) => (
              <Reveal key={i} delay={`stagger-${Math.min(i + 1, 6)}`}>
                <div className={`lg:flex items-center gap-8 ${s.side === 'right' ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={`lg:w-[calc(50%-2rem)] ${s.side === 'right' ? 'lg:text-left' : 'lg:text-right'}`}>
                    <div className={`p-6 border border-gray-100 bg-white hover:shadow-md transition-shadow ${s.sem === '5' ? 'border-l-4 border-l-[#E87722]' : ''}`}>
                      <div className="flex items-center gap-3 mb-3" style={s.side === 'right' ? {} : { justifyContent: 'flex-end' }}>
                        <span className="text-xs font-bold px-2 py-1 bg-[#E87722]/10 text-[#E87722]">Sem {s.sem}</span>
                        <span className="font-semibold" style={{ fontFamily: 'Space Grotesk' }}>{s.label}</span>
                      </div>
                      <div className={`flex flex-wrap gap-2 ${s.side === 'right' ? '' : 'lg:justify-end'}`}>
                        {s.items.map((item, j) => (
                          <span key={j} className="text-xs px-3 py-1.5 bg-gray-50 text-gray-600 border border-gray-100">{item}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Timeline dot */}
                  <div className="hidden lg:flex w-16 justify-center">
                    <div className={`w-4 h-4 rounded-full border-2 ${s.sem === '5' ? 'bg-[#E87722] border-[#E87722]' : 'bg-white border-gray-300'}`} />
                  </div>
                  <div className="lg:w-[calc(50%-2rem)]" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── DAV Live Sample ─── */
function DAVSample() {
  const [step, setStep] = useState(0)
  const [output, setOutput] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const codeSteps = [
    {
      title: '1. Daten laden',
      code: `import pandas as pd

# Eistee-Absatzdaten laden
df = pd.read_csv("eistee_sales.csv")
print(df.head())
print(f"\\n{len(df)} Datensätze geladen.")`,
      output: [
        '   Monat  Markt      Region  Absatz  Preis  Temperatur',
        '0  Jan    Rewe_001   Urban     120   2.49      2.1',
        '1  Jan    Edeka_015  Rural      45   2.29      1.8',
        '2  Feb    Rewe_001   Urban     135   2.49      4.3',
        '3  Feb    Edeka_015  Rural      52   2.29      3.9',
        '4  Mär    Rewe_001   Urban     210   2.49      9.7',
        '',
        '2400 Datensätze geladen.',
      ],
    },
    {
      title: '2. Daten aufbereiten',
      code: `# Fehlende Werte prüfen & bereinigen
print("Fehlende Werte:")
print(df.isnull().sum())

# Ausreißer entfernen (IQR-Methode)
Q1 = df["Absatz"].quantile(0.25)
Q3 = df["Absatz"].quantile(0.75)
df_clean = df[
    (df["Absatz"] >= Q1 - 1.5*(Q3-Q1)) &
    (df["Absatz"] <= Q3 + 1.5*(Q3-Q1))
]
print(f"\\n{len(df)-len(df_clean)} Ausreißer entfernt.")`,
      output: [
        'Fehlende Werte:',
        'Monat         0',
        'Markt         3',
        'Region        0',
        'Absatz        7',
        'Preis         0',
        'Temperatur    2',
        '',
        '23 Ausreißer entfernt.',
      ],
    },
    {
      title: '3. Explorative Analyse',
      code: `# Absatz nach Region vergleichen
grouped = df_clean.groupby("Region")["Absatz"]
print(grouped.describe().round(1))

# Korrelation: Temperatur → Absatz
corr = df_clean["Temperatur"].corr(df_clean["Absatz"])
print(f"\\nKorrelation Temp↔Absatz: {corr:.2f}")
print("→ Starker positiver Zusammenhang!")`,
      output: [
        '         count  mean    std   min    25%    50%    75%    max',
        'Urban   1200.0  285.3  98.7  45.0  210.0  275.0  350.0  620.0',
        'Rural    800.0   95.2  42.1  12.0   62.0   89.0  122.0  245.0',
        'Suburb   377.0  175.8  63.4  32.0  125.0  168.0  220.0  385.0',
        '',
        'Korrelation Temp↔Absatz: 0.84',
        '→ Starker positiver Zusammenhang!',
      ],
    },
    {
      title: '4. Visualisierung',
      code: `import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Boxplot: Absatz nach Region
df_clean.boxplot("Absatz", by="Region", ax=axes[0])
axes[0].set_title("Absatz nach Region")

# Scatter: Temperatur vs Absatz
colors = {"Urban":"#E87722","Rural":"#2563eb",
          "Suburb":"#059669"}
for region, grp in df_clean.groupby("Region"):
    axes[1].scatter(grp["Temperatur"], grp["Absatz"],
                   c=colors[region], label=region,
                   alpha=0.5, s=20)
axes[1].set_xlabel("Temperatur (°C)")
axes[1].set_ylabel("Absatz (Einheiten)")
axes[1].legend()
plt.tight_layout()
plt.savefig("analyse.png", dpi=150)
print("✓ Visualisierung gespeichert!")`,
      output: [
        '✓ Visualisierung gespeichert!',
        '',
        '╔══════════════════════════════════════╗',
        '║        📊 analyse.png                ║',
        '║  Urban:  ██████████████████ 285 avg  ║',
        '║  Suburb: ██████████▌       176 avg   ║',
        '║  Rural:  █████▌            95 avg    ║',
        '║                                      ║',
        '║  → Urban-Märkte performen 3× besser  ║',
        '║  → Temperatur erklärt 71% der Varianz║',
        '╚══════════════════════════════════════╝',
      ],
    },
    {
      title: '5. Handlungsempfehlung',
      code: `# Fazit für Management
empfehlung = """
EMPFEHLUNG:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Launch im Mai (Temp > 15°C)
2. Fokus auf 60 urbane Top-Standorte
3. Premium-Pricing (2.79€ statt 2.49€)
4. Rural-Märkte erst in Phase 2

Erwarteter Uplift: +52% vs. Bauchgefühl
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"""
print(empfehlung)`,
      output: [
        '',
        'EMPFEHLUNG:',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '1. Launch im Mai (Temp > 15°C)',
        '2. Fokus auf 60 urbane Top-Standorte',
        '3. Premium-Pricing (2.79€ statt 2.49€)',
        '4. Rural-Märkte erst in Phase 2',
        '',
        'Erwarteter Uplift: +52% vs. Bauchgefühl',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      ],
    },
  ]

  const runStep = useCallback(() => {
    if (step >= codeSteps.length) return
    setIsRunning(true)
    const lines = codeSteps[step].output
    let lineIdx = 0
    setOutput([])
    const interval = setInterval(() => {
      if (lineIdx < lines.length) {
        setOutput(prev => [...prev, lines[lineIdx]])
        lineIdx++
      } else {
        clearInterval(interval)
        setIsRunning(false)
      }
    }, 80)
  }, [step])

  const nextStep = () => {
    if (step < codeSteps.length - 1) {
      setStep(s => s + 1)
      setOutput([])
    }
  }

  return (
    <section id="dav" className="py-24 lg:py-32" style={{ background: '#0D1117' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal>
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: '#E87722' }}>Live: Modul DAV</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-white" style={{ fontFamily: 'Space Grotesk' }}>
            So sieht BBA in der Praxis aus.
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mb-4">
            Im Modul <strong className="text-white">Datenaufbereitung und -verarbeitung (DAV)</strong> lernst du mit Python echte Daten zu analysieren — genau so, wie es auch Unternehmen tun.
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mb-12">
            Klicke auf „Ausführen" und sieh, wie aus Rohdaten eine fundierte Geschäftsentscheidung wird.
          </p>
        </Reveal>

        {/* Progress */}
        <Reveal>
          <div className="flex gap-1 mb-8 overflow-x-auto pb-2">
            {codeSteps.map((s, i) => (
              <button key={i} onClick={() => { setStep(i); setOutput([]) }} className={`whitespace-nowrap px-4 py-2 text-xs font-medium transition-all ${i === step ? 'bg-[#E87722] text-white' : i < step ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-gray-500 hover:text-gray-300'}`}>
                {s.title}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="grid lg:grid-cols-2 gap-0 border border-gray-800 overflow-hidden">
            {/* Code editor */}
            <div className="bg-[#161B22] p-6 border-r border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  <span className="text-xs text-gray-500 ml-2">analyse.py</span>
                </div>
                <span className="text-xs text-gray-600">Python 3.11</span>
              </div>
              <pre className="code-block text-gray-300 overflow-x-auto">
                <code>{codeSteps[step].code.split('\n').map((line, i) => {
                  // Simple syntax highlighting
                  let highlighted = line
                    .replace(/(import |from |print|def |return |for |in |if |else:)/g, '<span style="color:#ff7b72">$1</span>')
                    .replace(/(#.*)/g, '<span style="color:#8b949e">$1</span>')
                    .replace(/(".*?"|'.*?')/g, '<span style="color:#a5d6ff">$1</span>')
                    .replace(/(\d+\.?\d*)/g, '<span style="color:#79c0ff">$1</span>')
                    .replace(/(pd|plt|df|df_clean|fig|axes|grouped|corr|empfehlung)/g, '<span style="color:#d2a8ff">$1</span>')
                  return (
                    <div key={i} className="flex">
                      <span className="w-8 text-right mr-4 text-gray-600 select-none">{i + 1}</span>
                      <span dangerouslySetInnerHTML={{ __html: highlighted }} />
                    </div>
                  )
                })}</code>
              </pre>
              <div className="flex gap-2 mt-6">
                <button onClick={runStep} disabled={isRunning} className={`px-5 py-2 text-sm font-semibold transition-all ${isRunning ? 'bg-gray-700 text-gray-500 cursor-wait' : 'bg-[#E87722] text-white hover:bg-[#d06a1e]'}`}>
                  {isRunning ? '⏳ Läuft...' : '▶ Ausführen'}
                </button>
                {output.length > 0 && step < codeSteps.length - 1 && (
                  <button onClick={nextStep} className="px-5 py-2 text-sm font-semibold bg-white/10 text-gray-300 hover:text-white transition-colors">
                    Weiter →
                  </button>
                )}
              </div>
            </div>

            {/* Output terminal */}
            <div className="bg-[#0D1117] p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-gray-500">Terminal — Output</span>
              </div>
              <div className="code-block text-green-400 min-h-[300px] overflow-y-auto">
                {output.length === 0 ? (
                  <span className="text-gray-600">Klicke auf ▶ Ausführen...</span>
                ) : (
                  output.map((line, i) => (
                    <div key={i} className="animate-[fadeIn_0.15s_ease-out]">{line || '\u00A0'}</div>
                  ))
                )}
                {isRunning && <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-0.5" />}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="text-center text-gray-500 text-sm mt-8">
            Das war ein kleiner Vorgeschmack auf das Modul DAV — eines von über 30 Modulen im BBA-Studiengang.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Würzburg ─── */
function Wuerzburg() {
  return (
    <section id="wuerzburg" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <Reveal>
              <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: '#E87722' }}>Studienort</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>
                Würzburg.
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed mb-8">
                Eine der schönsten Studentenstädte Deutschlands. Kurze Wege, bezahlbare Mieten, lebendige Kultur — und eine Hochschule, die dich nicht als Nummer sieht.
              </p>
            </Reveal>
            <div className="space-y-4">
              {[
                { icon: '🏛', text: 'THWS Business School — persönlich, praxisnah, innovativ' },
                { icon: '🤖', text: 'CAIRO KI-Zentrum — Forschung an Künstlicher Intelligenz & Robotik' },
                { icon: '🍷', text: 'Würzburg — Residenz, Main, Weinfeste, lebendige Studentenkultur' },
                { icon: '💰', text: 'Nur 168,50 € pro Semester — kein NC, offene Türen' },
              ].map((item, i) => (
                <Reveal key={i} delay={`stagger-${i + 1}`}>
                  <div className="flex items-start gap-4 p-4 border border-gray-50 hover:border-gray-200 transition-colors">
                    <span className="text-2xl">{item.icon}</span>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay="stagger-2">
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
                <div className="text-center px-8">
                  <div className="text-6xl mb-4">🌉</div>
                  <p className="text-2xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>Würzburg</p>
                  <p className="text-gray-500 text-sm">130.000 Einwohner · 35.000 Studierende · UNESCO-Welterbe</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-[#E87722]/20" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ─── Call to Action ─── */
function CTA() {
  return (
    <section id="cta" className="py-24 lg:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(165deg, #1A1A2E 0%, #0f0f1e 100%)' }}>
      <div className="absolute top-12 right-12 w-80 h-80 border border-[#E87722]/10 rotate-12" />
      <div className="absolute bottom-12 left-12 w-48 h-48 border border-[#E87722]/10 -rotate-6" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: '#E87722' }}>Deine Entscheidung</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white" style={{ fontFamily: 'Space Grotesk' }}>
              Du weißt jetzt, wie man bessere Entscheidungen trifft.
            </h2>
            <p className="text-2xl lg:text-3xl font-semibold mb-12" style={{ fontFamily: 'Space Grotesk', color: '#E87722' }}>
              Triff jetzt deine.
            </p>
          </div>
        </Reveal>

        {/* Facts strip */}
        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              { value: '7', label: 'Semester' },
              { value: 'Kein NC', label: 'Offener Zugang' },
              { value: '168,50 €', label: 'Pro Semester' },
              { value: 'Oktober', label: 'Studienstart' },
            ].map((f, i) => (
              <div key={i} className="p-5 border border-white/10 text-center">
                <div className="text-2xl lg:text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Space Grotesk' }}>{f.value}</div>
                <div className="text-xs text-gray-500">{f.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap gap-4 mb-8">
            <a href="https://campusportal.thws.de" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E87722] text-white px-8 py-4 text-sm font-bold tracking-wide hover:bg-[#d06a1e] transition-colors">
              Jetzt bewerben →
            </a>
            <a href="https://www.thws.de/studium-an-der-thws/studieren/studiengaenge/business-analytics/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-white/20 text-white px-8 py-4 text-sm font-bold tracking-wide hover:border-white/40 transition-colors">
              Mehr erfahren
            </a>
          </div>
        </Reveal>

        <Reveal>
          <div className="text-sm text-gray-500 space-y-1">
            <p>Bewerbungszeitraum: <strong className="text-gray-400">1. Mai – 15. Juli</strong></p>
            <p>Fragen? <a href="mailto:studienberatung@thws.de" className="text-[#E87722] hover:underline">studienberatung@thws.de</a></p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="py-12 bg-[#0a0a18] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#E87722' }}>BBA</span>
            <span className="text-xs text-gray-600">Bachelor Business Analytics · THWS Business School</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-gray-600">
            <a href="https://www.thws.de/studium-an-der-thws/studieren/studiengaenge/business-analytics/" target="_blank" rel="noopener noreferrer" className="hover:text-[#E87722] transition-colors">THWS Infoseite</a>
            <a href="https://campusportal.thws.de" target="_blank" rel="noopener noreferrer" className="hover:text-[#E87722] transition-colors">Bewerbung</a>
            <a href="mailto:robert.butscher@thws.de" className="hover:text-[#E87722] transition-colors">Kontakt</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── App ─── */
function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <Alltag />
      <Fallstudie />
      <DreiSaeulen />
      <SemesterJourney />
      <DAVSample />
      <Wuerzburg />
      <CTA />
      <Footer />
    </div>
  )
}

export default App
