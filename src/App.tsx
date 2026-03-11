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
    { href: '#fallstudie', label: 'Fallstudie' },
    { href: '#studium', label: 'Studium' },
    { href: '#berufswelt', label: 'Berufswelt' },
    { href: '#dav', label: 'Live: Python' },
    { href: '#wuerzburg', label: 'Würzburg' },
    { href: '#bewerben', label: 'Bewerben' },
  ]
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-3">
          <span className="font-bold text-lg tracking-tight" style={{ fontFamily: 'Space Grotesk', color: '#E87722' }}>BBA</span>
          <span className={`text-sm hidden sm:inline ${scrolled ? 'text-neutral-500' : 'text-neutral-400'}`}>THWS Würzburg</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className={`text-sm font-medium transition-colors hover:text-[#E87722] ${scrolled ? 'text-neutral-700' : 'text-neutral-600'}`}>{l.label}</a>
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
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-neutral-700 hover:text-[#E87722]">{l.label}</a>
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
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-[#FAFAF8]">
      <div className="absolute top-24 right-16 w-px h-48 bg-[#E87722]/15" />
      <div className="absolute bottom-32 left-12 w-32 h-px bg-[#E87722]/15" />

      <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl">
          <p className={`text-sm font-medium tracking-widest uppercase mb-8 transition-all duration-700 ${phase >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ color: '#E87722' }}>
            Bachelor Business Analytics · THWS Würzburg
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-[4.2rem] font-bold leading-[1.08] tracking-tight mb-10" style={{ fontFamily: 'Space Grotesk' }}>
            <span className={`block transition-all duration-700 ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ color: '#1A1A2E' }}>
              Jeden Tag treffen
            </span>
            <span className={`block transition-all duration-700 delay-200 ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ color: '#1A1A2E' }}>
              Unternehmen tausende
            </span>
            <span className={`block transition-all duration-700 delay-200 ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ color: '#1A1A2E' }}>
              Entscheidungen.
            </span>
            <span className={`block mt-4 transition-all duration-700 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ color: '#E87722' }}>
              Wer dabei Daten versteht,
            </span>
            <span className={`block transition-all duration-700 delay-200 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ color: '#E87722' }}>
              macht den Unterschied.
            </span>
          </h1>
          <p className={`text-lg text-neutral-500 max-w-xl leading-relaxed transition-all duration-700 delay-500 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Business Analytics verbindet Wirtschaftswissen mit Technologie und Datenanalyse — ein Studium für alle, die verstehen wollen, wie aus Zahlen gute Entscheidungen werden.
          </p>
          <div className={`flex flex-wrap gap-4 mt-10 transition-all duration-700 delay-700 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <a href="#fallstudie" className="bg-[#1A1A2E] text-white px-7 py-3.5 text-sm font-semibold tracking-wide hover:bg-[#2a2a4e] transition-colors">
              Wie das aussieht
            </a>
            <a href="#bewerben" className="border-2 border-[#E87722] text-[#E87722] px-7 py-3.5 text-sm font-semibold tracking-wide hover:bg-[#E87722] hover:text-white transition-colors">
              Direkt bewerben
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Fallstudie: Mission Erfrischung ─── */
function Fallstudie() {
  const [showData, setShowData] = useState(false)
  return (
    <section id="fallstudie" className="py-24 lg:py-32" style={{ background: '#1A1A2E' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <Reveal>
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: '#E87722' }}>Ein Beispiel</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white" style={{ fontFamily: 'Space Grotesk' }}>
            Zwei Teams. Ein Produkt. Zwei Ergebnisse.
          </h2>
          <p className="text-lg text-neutral-400 max-w-3xl mb-4">
            Ein Getränkehersteller will einen neuen Eistee in 200 Supermärkte bringen. Millionen-Budget. Zwei Teams bekommen den Auftrag — eines entscheidet aus dem Bauch, das andere nutzt Daten.
          </p>
          <p className="text-neutral-500 max-w-3xl mb-12">
            Was du gleich siehst, passiert so jeden Tag in deutschen Unternehmen. Der Unterschied zwischen Erfolg und Misserfolg ist oft nicht Talent oder Erfahrung — sondern die Fähigkeit, Daten richtig zu lesen.
          </p>
        </Reveal>

        <Reveal>
          <div className="flex gap-px mb-12">
            <button onClick={() => setShowData(false)} className={`px-6 py-3 text-sm font-semibold transition-all ${!showData ? 'bg-[#E87722] text-white' : 'bg-white/5 text-neutral-500 hover:text-white'}`}>
              Team A: Bauchgefühl
            </button>
            <button onClick={() => setShowData(true)} className={`px-6 py-3 text-sm font-semibold transition-all ${showData ? 'bg-[#E87722] text-white' : 'bg-white/5 text-neutral-500 hover:text-white'}`}>
              Team B: Business Analytics
            </button>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-px bg-white/5">
          <Reveal>
            <div className={`p-8 lg:p-10 transition-all duration-500 ${!showData ? 'bg-[#1e1028]' : 'bg-[#0f1e1a]'}`}>
              <p className={`text-xs font-bold uppercase tracking-widest mb-6 ${!showData ? 'text-red-400/70' : 'text-emerald-400/70'}`}>
                {!showData ? 'Vorgehen Team A' : 'Vorgehen Team B'}
              </p>
              {!showData ? (
                <div className="space-y-5 text-sm leading-relaxed">
                  <div><p className="text-white font-medium mb-1">Zielgruppe</p><p className="text-neutral-400">„Alle, die Eistee mögen." Keine Segmentierung, keine Daten über Kaufverhalten.</p></div>
                  <div><p className="text-white font-medium mb-1">Platzierung</p><p className="text-neutral-400">Gleichmäßig auf alle 200 Märkte verteilt. Die Chefin kennt jemanden bei Edeka.</p></div>
                  <div><p className="text-white font-medium mb-1">Timing</p><p className="text-neutral-400">Launch im Januar, weil das Produkt fertig ist. Saisonalität? Nicht berücksichtigt.</p></div>
                  <div><p className="text-white font-medium mb-1">Preis</p><p className="text-neutral-400">2,49 € — „ungefähr wie die Konkurrenz." Preissensitivität der Zielgruppe? Unbekannt.</p></div>
                </div>
              ) : (
                <div className="space-y-5 text-sm leading-relaxed">
                  <div><p className="text-white font-medium mb-1">Kundensegmentierung</p><p className="text-neutral-400">Clusteranalyse der Kaufdaten zeigt: 18–35, urban, gesundheitsbewusst hat 3× höhere Kaufwahrscheinlichkeit.</p></div>
                  <div><p className="text-white font-medium mb-1">Standortoptimierung</p><p className="text-neutral-400">Geo-Daten + Abverkaufshistorie identifizieren die 60 Märkte mit dem höchsten Umsatzpotenzial.</p></div>
                  <div><p className="text-white font-medium mb-1">Timing</p><p className="text-neutral-400">Saisonale Nachfragekurve zeigt: Eistee-Peak im Mai/Juni. Launch auf den Tag genau geplant.</p></div>
                  <div><p className="text-white font-medium mb-1">Pricing</p><p className="text-neutral-400">Conjoint-Analyse ergibt: Zielgruppe zahlt bis 2,89 € für Bio-Qualität. Premium-Strategie mit +15% Marge.</p></div>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay="stagger-2">
            <div className={`p-8 lg:p-10 transition-all duration-500 ${!showData ? 'bg-[#1e1028]' : 'bg-[#0f1e1a]'}`}>
              <p className="text-xs font-bold uppercase tracking-widest mb-6 text-neutral-500">Ergebnis nach 6 Monaten</p>
              {!showData ? (
                <div>
                  <div className="text-6xl lg:text-7xl font-bold text-red-400/80 mb-4" style={{ fontFamily: 'Space Grotesk' }}>40%</div>
                  <p className="text-neutral-400 mb-6">der Ware bleibt im Regal. Das Produkt wird eingestellt.</p>
                  <div className="space-y-3 text-sm text-neutral-500">
                    <p>Im Winter will niemand Eistee. Die Supermärkte räumen das Produkt aus.</p>
                    <p>Das Budget ist verbrannt. Drei Leute verlieren ihren Job.</p>
                    <p>Und das Schlimmste: Das Produkt war gut. Nur die Entscheidungen waren schlecht.</p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-6xl lg:text-7xl font-bold text-emerald-400/80 mb-4" style={{ fontFamily: 'Space Grotesk' }}>92%</div>
                  <p className="text-neutral-400 mb-6">Abverkaufsquote. Nachbestellungen ab Woche 3. Nationale Expansion geplant.</p>
                  <div className="space-y-3 text-sm text-neutral-500">
                    <p>Die Daten haben nicht geraten — sie haben gezeigt, was funktioniert.</p>
                    <p>Real-time Dashboard ermöglicht Nachsteuerung bei einzelnen Standorten.</p>
                    <p>Team B hat keine anderen Produkte, keine andere Erfahrung. Nur bessere Methoden.</p>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>

        {showData && (
          <Reveal>
            <div className="mt-px p-8 lg:p-10 bg-[#E87722]/5 border-l-2 border-[#E87722]">
              <p className="text-sm text-white mb-3" style={{ fontFamily: 'Space Grotesk' }}>
                <strong>Genau das lernst du im BBA-Studium.</strong> Jeder einzelne Schritt von Team B basiert auf Methoden, die du in deinem Studium lernst:
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm mt-5">
                {[
                  { skill: 'Clusteranalyse', modul: 'Statistik & Data Science', sem: 'Sem. 3–4' },
                  { skill: 'Geo-Datenanalyse', modul: 'Business Intelligence', sem: 'Sem. 3' },
                  { skill: 'Zeitreihenanalyse', modul: 'Ökonometrie', sem: 'Sem. 4' },
                  { skill: 'Conjoint-Analyse', modul: 'Marktforschung', sem: 'Sem. 4' },
                ].map((m, i) => (
                  <div key={i}>
                    <p className="text-[#E87722] font-semibold">{m.skill}</p>
                    <p className="text-neutral-400 mt-1">{m.modul}</p>
                    <p className="text-neutral-600 text-xs mt-0.5">{m.sem}</p>
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

/* ─── Was du lernst ─── */
function WasDuLernst() {
  return (
    <section id="studium" className="py-24 lg:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <Reveal>
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: '#E87722' }}>Das Studium</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>
            Drei Disziplinen. Eine Denkweise.
          </h2>
          <p className="text-lg text-neutral-500 max-w-3xl mb-6">
            Business Analytics ist kein klassisches BWL-Studium und kein reines Informatik-Studium. Es verbindet drei Welten, weil die spannendsten Probleme genau an diesen Schnittstellen liegen.
          </p>
          <p className="text-neutral-500 max-w-3xl mb-16">
            Du lernst nicht nur Theorie — du arbeitest ab dem ersten Semester mit echten Datensätzen, echten Tools und echten Fragestellungen. Nach sieben Semestern kannst du in einem Meeting mit dem Marketing genauso sicher diskutieren wie in einem Sprint mit dem Data-Engineering-Team.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-px bg-neutral-100">
          {[
            {
              letter: 'W',
              title: 'Wirtschaft verstehen',
              color: '#E87722',
              desc: 'Du verstehst, wie Unternehmen funktionieren — von der Bilanz bis zur Lieferkette. Damit du weißt, welche Fragen die richtigen sind.',
              items: ['BWL & VWL', 'Marketing & Marktforschung', 'Controlling & Rechnungswesen', 'Digitale Ökonomie', 'Beschaffung & Logistik'],
            },
            {
              letter: 'T',
              title: 'Technologie beherrschen',
              color: '#2563eb',
              desc: 'Du programmierst in Python, R und SQL. Du baust Dashboards, trainierst Machine-Learning-Modelle und arbeitest mit Datenbanken.',
              items: ['Python, R, SQL', 'Statistik & Data Science', 'Business Intelligence & Dashboards', 'Ökonometrie & ML', 'Datenbanken & Big Data'],
            },
            {
              letter: 'Ü',
              title: 'Übergreifend denken',
              color: '#059669',
              desc: 'Daten sind mächtig — und brauchen Verantwortung. Du lernst, Ergebnisse zu kommunizieren, Projekte zu leiten und ethisch zu handeln.',
              items: ['Datenschutz & Recht', 'Projektmanagement', 'Business English', 'Wissenschaftliches Arbeiten', 'Ethik der Digitalisierung'],
            },
          ].map((s, i) => (
            <Reveal key={i} delay={`stagger-${i + 1}`}>
              <div className="bg-white p-8 lg:p-10 h-full">
                <span className="block text-5xl font-bold mb-5 select-none" style={{ fontFamily: 'Space Grotesk', color: s.color, opacity: 0.12 }}>{s.letter}</span>
                <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>{s.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-5">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.items.map((item, j) => (
                    <span key={j} className="text-xs px-2.5 py-1 bg-neutral-50 text-neutral-600">{item}</span>
                  ))}
                </div>
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
    { sem: '1', label: 'Fundament', desc: 'Die Grundlagen: Wie Wirtschaft funktioniert, wie man mathematisch denkt, wie man programmiert.', items: ['BWL', 'Mikroökonomik', 'Mathematik', 'Wirtschaftsinformatik'] },
    { sem: '2', label: 'Methoden', desc: 'Jetzt wird es analytisch: Erste statistische Methoden, erstes eigenes Programm, erste Datensätze.', items: ['Marketing', 'Statistik', 'Programmieren', 'Makroökonomik'] },
    { sem: '3', label: 'Analytik', desc: 'Du baust dein erstes Dashboard. Du schreibst SQL. Du verstehst, warum Korrelation keine Kausalität ist.', items: ['Business Intelligence', 'Datenbanken', 'Ökonometrie', 'Operations Research'] },
    { sem: '4', label: 'Vertiefung', desc: 'Python, Machine Learning, echte Marktforschungsprojekte. Ab hier wird es richtig spannend.', items: ['Data Science', 'DAV (Python)', 'Marktforschung', 'Controlling'] },
    { sem: '5', label: 'Praxissemester', desc: 'Ein ganzes Semester im Unternehmen. Echte Projekte, echtes Team, echte Verantwortung.', items: ['Praktikum in einem Unternehmen deiner Wahl'], highlight: true },
    { sem: '6–7', label: 'Spezialisierung & Abschluss', desc: 'Du wählst deinen Schwerpunkt und schreibst deine Bachelorarbeit — oft in Kooperation mit einem Unternehmen.', items: ['BA-Projekte', 'Schwerpunkt nach Wahl', 'Bachelorarbeit'] },
  ]
  return (
    <section className="py-24 lg:py-32 bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <Reveal>
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: '#E87722' }}>7 Semester</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>
            Vom ersten Code bis zur eigenen Analyse.
          </h2>
          <p className="text-lg text-neutral-500 max-w-3xl mb-16">
            Jedes Semester baut auf dem vorherigen auf. Du merkst schnell, wie alles zusammenhängt — und wie du immer komplexere Probleme lösen kannst.
          </p>
        </Reveal>

        <div className="space-y-3">
          {semesters.map((s, i) => (
            <Reveal key={i} delay={`stagger-${Math.min(i + 1, 6)}`}>
              <div className={`bg-white p-6 sm:p-8 ${s.highlight ? 'border-l-2 border-[#E87722]' : ''}`}>
                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-10">
                  <div className="lg:w-28 shrink-0">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#E87722]">Sem {s.sem}</span>
                    <p className="font-semibold mt-0.5" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>{s.label}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-neutral-500 leading-relaxed mb-3">{s.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.items.map((item, j) => (
                        <span key={j} className="text-xs px-3 py-1.5 bg-neutral-50 text-neutral-600">{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Berufswelt & Zukunftssicherheit ─── */
function Berufswelt() {
  const [showRoles, setShowRoles] = useState(true)
  return (
    <section id="berufswelt" className="py-24 lg:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <Reveal>
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: '#E87722' }}>Nach dem Studium</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>
            Die Leute, die von allen gesucht werden.
          </h2>
          <p className="text-lg text-neutral-500 max-w-3xl mb-6">
            Jedes Unternehmen hat Daten. Die wenigsten wissen, was sie damit anfangen sollen. BBA-Absolvent:innen schließen genau diese Lücke — sie verstehen das Geschäft <em>und</em> die Daten.
          </p>
          <p className="text-neutral-500 max-w-3xl mb-12">
            Und ja: Gerade wegen KI werden diese Fähigkeiten wichtiger, nicht weniger. ChatGPT kann Texte schreiben — aber es kann keine Geschäftsstrategie aus Daten ableiten. Dafür braucht es Menschen, die beides verstehen.
          </p>
        </Reveal>

        {/* Toggle */}
        <Reveal>
          <div className="flex gap-px mb-10">
            <button onClick={() => setShowRoles(true)} className={`px-6 py-3 text-sm font-semibold transition-all ${showRoles ? 'bg-[#1A1A2E] text-white' : 'bg-neutral-100 text-neutral-500 hover:text-neutral-700'}`}>
              Berufsprofile
            </button>
            <button onClick={() => setShowRoles(false)} className={`px-6 py-3 text-sm font-semibold transition-all ${!showRoles ? 'bg-[#1A1A2E] text-white' : 'bg-neutral-100 text-neutral-500 hover:text-neutral-700'}`}>
              Echte Stellenanzeigen
            </button>
          </div>
        </Reveal>

        {showRoles ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-100">
            {[
              { title: 'Data Analyst', desc: 'Du analysierst Geschäftsdaten, erkennst Muster und lieferst die Grundlage für strategische Entscheidungen.', where: 'Jede Branche — von Automotive bis E-Commerce' },
              { title: 'Business Intelligence Analyst', desc: 'Du baust Dashboards und Reportingsysteme, die dem Management zeigen, was im Unternehmen passiert — in Echtzeit.', where: 'Konzerne, Mittelstand, Beratungen' },
              { title: 'Data Scientist', desc: 'Du entwickelst Vorhersagemodelle und Machine-Learning-Pipelines. Oft in Kombination mit einem Master.', where: 'Tech-Unternehmen, Forschung, Startups' },
              { title: 'Business Analyst / Consultant', desc: 'Du übersetzt zwischen Fachbereich und IT. Du verstehst beide Seiten — und das ist selten und wertvoll.', where: 'Beratungen, Großunternehmen' },
              { title: 'Product Analyst', desc: 'Du misst, wie Nutzer:innen ein Produkt verwenden, und leitest daraus Verbesserungen ab. A/B-Tests, Funnels, Retention.', where: 'Tech, SaaS, E-Commerce' },
              { title: 'Controlling & FP&A', desc: 'Du verbindest klassisches Controlling mit modernen Analysemethoden. Forecasting, Szenarioplanung, KPI-Systeme.', where: 'Industrie, Finanzen, Mittelstand' },
            ].map((role, i) => (
              <Reveal key={i} delay={`stagger-${Math.min(i + 1, 6)}`}>
                <div className="bg-white p-8 h-full">
                  <h3 className="text-base font-semibold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>{role.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-3">{role.desc}</p>
                  <p className="text-xs text-neutral-400">{role.where}</p>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {[
              { company: 'BMW Group', role: 'Junior Data Analyst — Supply Chain Analytics', loc: 'München', detail: 'Analyse von Lieferkettendaten, Aufbau von Power BI Dashboards, statistische Prognosemodelle. Python, SQL, Power BI.' },
              { company: 'McKinsey & Company', role: 'Business Analyst — Digital & Analytics', loc: 'Frankfurt / Berlin', detail: 'Datengetriebene Strategieprojekte für DAX-Unternehmen. Kundensegmentierung, Pricing-Optimierung, Operational Excellence.' },
              { company: 'Zalando', role: 'Product Analyst', loc: 'Berlin', detail: 'A/B-Testing, Funnel-Analyse, Customer Lifetime Value Modelling. Python, BigQuery, Looker.' },
              { company: 'Siemens', role: 'BI Developer & Data Analyst', loc: 'Erlangen', detail: 'Aufbau und Betrieb von BI-Lösungen für die Fertigungsindustrie. Tableau, SAP, Azure.' },
              { company: 'Deutsche Bank', role: 'Risk Analytics Associate', loc: 'Frankfurt', detail: 'Quantitative Risikomodelle, regulatorisches Reporting, Szenarioanalysen. R, Python, SAS.' },
              { company: 'CHECK24', role: 'Junior Business Analyst', loc: 'München', detail: 'Conversion-Optimierung, Marktanalysen, Wettbewerbsmonitoring. SQL, Python, Google Analytics.' },
            ].map((job, i) => (
              <Reveal key={i} delay={`stagger-${Math.min(i + 1, 6)}`}>
                <div className="bg-neutral-50 p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-base font-semibold" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>{job.role}</h3>
                      <p className="text-sm font-medium text-[#E87722]">{job.company}</p>
                    </div>
                    <span className="text-xs text-neutral-400 shrink-0">{job.loc}</span>
                  </div>
                  <p className="text-sm text-neutral-500 leading-relaxed">{job.detail}</p>
                </div>
              </Reveal>
            ))}
            <Reveal>
              <p className="text-xs text-neutral-400 mt-4">
                Beispielhafte Stellenprofile basierend auf realen Ausschreibungen für Absolvent:innen mit Business-Analytics-Profil. Die genannten Unternehmen stehen exemplarisch für die Breite der Einsatzmöglichkeiten.
              </p>
            </Reveal>
          </div>
        )}

        {/* KI-Argument */}
        <Reveal>
          <div className="mt-12 p-8 lg:p-10 bg-[#FAFAF8]">
            <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>
              Aber ersetzt KI nicht bald solche Jobs?
            </h3>
            <div className="grid lg:grid-cols-2 gap-8 text-sm text-neutral-500 leading-relaxed">
              <div>
                <p className="mb-3">
                  KI verändert die Arbeitswelt — aber sie macht datenkundige Menschen nicht überflüssig. Im Gegenteil: Jemand muss KI-Modelle verstehen, ihre Ergebnisse bewerten und die richtigen Geschäftsentscheidungen daraus ableiten.
                </p>
                <p>
                  Ein Sprachmodell kann eine Tabelle zusammenfassen. Aber es kann nicht beurteilen, ob ein Preismodell zum Wettbewerbsumfeld passt oder ob eine Korrelation geschäftsrelevant ist.
                </p>
              </div>
              <div>
                <p className="mb-3">
                  BBA-Absolvent:innen sind die Menschen, die KI-Tools <em>einsetzen und steuern</em> — nicht die, die durch sie ersetzt werden. Sie sind die Schnittstelle zwischen Algorithmus und Boardroom.
                </p>
                <p>
                  Laut dem <span className="text-neutral-700">World Economic Forum Future of Jobs Report</span> gehören Data Analysts und Business Intelligence Analysts zu den am schnellsten wachsenden Berufsfeldern weltweit.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
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
      title: '1. Laden',
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
      title: '2. Bereinigen',
      code: `# Fehlende Werte & Ausreißer
print("Fehlende Werte:")
print(df.isnull().sum())

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
      title: '3. Analysieren',
      code: `# Absatz nach Region
grouped = df_clean.groupby("Region")["Absatz"]
print(grouped.describe().round(1))

# Korrelation: Temperatur → Absatz
corr = df_clean["Temperatur"].corr(
    df_clean["Absatz"]
)
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
      title: '4. Visualisieren',
      code: `import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

df_clean.boxplot("Absatz", by="Region",
                  ax=axes[0])
axes[0].set_title("Absatz nach Region")

colors = {"Urban":"#E87722",
          "Rural":"#2563eb",
          "Suburb":"#059669"}
for region, grp in df_clean.groupby("Region"):
    axes[1].scatter(
        grp["Temperatur"], grp["Absatz"],
        c=colors[region], label=region,
        alpha=0.5, s=20)
axes[1].legend()
plt.savefig("analyse.png", dpi=150)
print("Gespeichert: analyse.png")`,
      output: [
        'Gespeichert: analyse.png',
        '',
        '  Absatz nach Region          Temperatur vs. Absatz',
        '  ┌─────────────────┐         ┌─────────────────────┐',
        '  │     ┬            │         │            ·  · ··  │',
        '  │  ┌──┤  Urban     │         │        ·· ·· ·····  │',
        '  │  └──┤  285 avg   │         │     · · ···· ····   │',
        '  │     ┴            │         │   · ·· ·· ···       │',
        '  │   ┬              │         │  ··· ··             │',
        '  │ ┌─┤  Suburb      │         │ ··                  │',
        '  │ └─┤  176 avg     │         ├─────────────────────┤',
        '  │   ┴              │         0°C    10°C     25°C  │',
        '  │  ┬               │         └─────────────────────┘',
        '  │ ┌┤  Rural        │',
        '  │ └┤   95 avg      │         Urban 3× besser',
        '  └─────────────────┘         Temp erklärt 71% der Varianz',
      ],
    },
    {
      title: '5. Empfehlung',
      code: `# Management-Empfehlung aus den Daten
empfehlung = """
HANDLUNGSEMPFEHLUNG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Launch im Mai (Temp > 15°C)
2. Fokus auf 60 urbane Top-Märkte
3. Pricing: 2.79€ (Premium)
4. Rural erst in Phase 2

Erwarteter Uplift: +52% vs. Bauch
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"""
print(empfehlung)`,
      output: [
        '',
        'HANDLUNGSEMPFEHLUNG',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '1. Launch im Mai (Temp > 15°C)',
        '2. Fokus auf 60 urbane Top-Märkte',
        '3. Pricing: 2.79€ (Premium)',
        '4. Rural erst in Phase 2',
        '',
        'Erwarteter Uplift: +52% vs. Bauch',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
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
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <Reveal>
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: '#E87722' }}>Ausprobieren</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-white" style={{ fontFamily: 'Space Grotesk' }}>
            Das ist kein Hörsaal. Das ist Python.
          </h2>
          <p className="text-lg text-neutral-400 max-w-3xl mb-4">
            Im Modul <strong className="text-white">Datenaufbereitung und -verarbeitung</strong> arbeitest du ab Semester 4 mit Python an echten Datensätzen. Hier siehst du, wie die Analyse aus der Fallstudie oben tatsächlich aussieht — Zeile für Zeile.
          </p>
          <p className="text-sm text-neutral-500 max-w-2xl mb-12">
            Klicke auf „Ausführen" und geh die fünf Schritte durch.
          </p>
        </Reveal>

        <Reveal>
          <div className="flex gap-px mb-8 overflow-x-auto pb-2">
            {codeSteps.map((s, i) => (
              <button key={i} onClick={() => { setStep(i); setOutput([]) }} className={`whitespace-nowrap px-4 py-2 text-xs font-medium transition-all ${i === step ? 'bg-[#E87722] text-white' : i < step ? 'bg-white/5 text-neutral-400' : 'bg-white/5 text-neutral-600 hover:text-neutral-300'}`}>
                {s.title}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="grid lg:grid-cols-2 gap-px bg-neutral-800 border border-neutral-800 overflow-hidden">
            <div className="bg-[#161B22] p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
                  <span className="text-xs text-neutral-500 ml-2">analyse.py</span>
                </div>
                <span className="text-xs text-neutral-600">Python 3.11</span>
              </div>
              <pre className="code-block text-neutral-300 overflow-x-auto">
                <code>{codeSteps[step].code.split('\n').map((line, i) => {
                  let highlighted = line
                    .replace(/(import |from |print|def |return |for |in |if |else:)/g, '<span style="color:#ff7b72">$1</span>')
                    .replace(/(#.*)/g, '<span style="color:#8b949e">$1</span>')
                    .replace(/(".*?"|'.*?')/g, '<span style="color:#a5d6ff">$1</span>')
                    .replace(/(\d+\.?\d*)/g, '<span style="color:#79c0ff">$1</span>')
                    .replace(/(pd|plt|df|df_clean|fig|axes|grouped|corr|empfehlung)/g, '<span style="color:#d2a8ff">$1</span>')
                  return (
                    <div key={i} className="flex">
                      <span className="w-8 text-right mr-4 text-neutral-700 select-none">{i + 1}</span>
                      <span dangerouslySetInnerHTML={{ __html: highlighted }} />
                    </div>
                  )
                })}</code>
              </pre>
              <div className="flex gap-2 mt-6">
                <button onClick={runStep} disabled={isRunning} className={`px-5 py-2 text-sm font-semibold transition-all ${isRunning ? 'bg-neutral-700 text-neutral-500 cursor-wait' : 'bg-[#E87722] text-white hover:bg-[#d06a1e]'}`}>
                  {isRunning ? 'Läuft...' : 'Ausführen'}
                </button>
                {output.length > 0 && step < codeSteps.length - 1 && (
                  <button onClick={nextStep} className="px-5 py-2 text-sm font-semibold bg-white/10 text-neutral-300 hover:text-white transition-colors">
                    Weiter
                  </button>
                )}
              </div>
            </div>

            <div className="bg-[#0D1117] p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-neutral-500">Terminal</span>
              </div>
              <div className="code-block text-green-400/80 min-h-[300px] overflow-y-auto">
                {output.length === 0 ? (
                  <span className="text-neutral-700">$ python analyse.py</span>
                ) : (
                  output.map((line, i) => (
                    <div key={i} className="animate-[fadeIn_0.15s_ease-out]">{line || '\u00A0'}</div>
                  ))
                )}
                {isRunning && <span className="inline-block w-1.5 h-4 bg-green-400/80 animate-pulse ml-0.5" />}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Würzburg ─── */
function Wuerzburg() {
  return (
    <section id="wuerzburg" className="py-24 lg:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <Reveal>
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: '#E87722' }}>Der Ort</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>
            Würzburg ist kein Zufall.
          </h2>
          <p className="text-lg text-neutral-500 max-w-3xl mb-16">
            130.000 Einwohner, 35.000 davon Studierende. Würzburg ist klein genug, um zu Fuß überall hinzukommen — und groß genug, dass es nie langweilig wird.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-8">
            <Reveal>
              <div>
                <h3 className="text-base font-semibold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>THWS Business School</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  Kleine Kurse, Professoren die deinen Namen kennen, Labore mit aktueller Software. Kein anonymer Massenbetrieb. Die THWS wurde mehrfach als eine der besten Hochschulen für angewandte Wissenschaften in Deutschland ausgezeichnet. Praxissemester und Unternehmenskooperationen sind fester Bestandteil — nicht optionales Extra.
                </p>
              </div>
            </Reveal>
            <Reveal delay="stagger-1">
              <div>
                <h3 className="text-base font-semibold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>CAIRO — das KI-Zentrum</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  Das Center for Artificial Intelligence and Robotics (CAIRO) forscht direkt am Campus an KI, Computer Vision und Robotik. Als BBA-Studierende:r hast du die Möglichkeit, in Projekten und Abschlussarbeiten mit dem Zentrum zusammenzuarbeiten — und damit an Technologie zu arbeiten, die gerade die Industrie verändert.
                </p>
              </div>
            </Reveal>
            <Reveal delay="stagger-2">
              <div>
                <h3 className="text-base font-semibold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>Die Stadt</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  UNESCO-Welterbe Residenz, Alte Mainbrücke, Weinfeste im Sommer, eine der höchsten Kneipen-pro-Kopf-Dichten Deutschlands. Die Mieten sind für eine Uni-Stadt noch bezahlbar, die Wege kurz, die Community eng. Viele Studierende sagen: Würzburg fühlt sich nach zwei Wochen wie zuhause an.
                </p>
              </div>
            </Reveal>
            <Reveal delay="stagger-3">
              <div>
                <h3 className="text-base font-semibold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>Lage & Vernetzung</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  ICE-Anbindung nach Frankfurt (1h), München (2h), Berlin (3h). Die Region Main-Franken hat einen starken Mittelstand — viele Praxissemester- und Werkstudenten-Stellen direkt vor der Haustür. Und wer weiter will: Partnerhochschulen für Auslandssemester auf vier Kontinenten.
                </p>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal delay="stagger-2">
              <div className="sticky top-24 space-y-6">
                <div className="bg-[#FAFAF8] p-10">
                  <p className="text-6xl font-bold leading-none mb-8" style={{ fontFamily: 'Space Grotesk', color: '#E87722', opacity: 0.12 }}>WÜ</p>
                  <div className="space-y-5">
                    <div>
                      <p className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>27%</p>
                      <p className="text-sm text-neutral-500">der Einwohner sind Studierende</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>1h</p>
                      <p className="text-sm text-neutral-500">mit dem ICE nach Frankfurt</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#1A1A2E' }}>Top 10</p>
                      <p className="text-sm text-neutral-500">beliebteste Studentenstädte Deutschlands</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#E87722' }}>1</p>
                      <p className="text-sm text-neutral-500">UNESCO-Welterbe direkt in der Stadt</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#1A1A2E] p-8 text-sm text-neutral-400 leading-relaxed">
                  <p className="text-white font-semibold mb-2" style={{ fontFamily: 'Space Grotesk' }}>Kein NC</p>
                  <p>Du brauchst keinen Einser-Schnitt. Das Studium ist zulassungsfrei — was zählt, ist dein Interesse, nicht dein Abiturdurchschnitt.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Call to Action ─── */
function CTA() {
  return (
    <section id="bewerben" className="py-24 lg:py-32 relative overflow-hidden" style={{ background: '#1A1A2E' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative">
        <Reveal>
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: '#E87722' }}>Bewerbung</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white" style={{ fontFamily: 'Space Grotesk' }}>
            Du hast gerade gesehen, wie bessere Entscheidungen entstehen.
          </h2>
          <p className="text-xl lg:text-2xl mb-16 text-neutral-400" style={{ fontFamily: 'Space Grotesk' }}>
            Jetzt ist es <span className="text-[#E87722] font-semibold">deine</span> Entscheidung.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          <div className="lg:col-span-3">
            <Reveal>
              <div className="space-y-6 text-sm text-neutral-400 leading-relaxed">
                <p>
                  Die Bewerbung läuft über das THWS Campusportal. Du brauchst dein Abiturzeugnis (oder ein gleichwertiges Zeugnis) — mehr nicht. Es gibt keinen NC, kein Auswahlverfahren, keinen Eignungstest.
                </p>
                <p>
                  Der Bewerbungszeitraum für das Wintersemester ist <span className="text-white font-medium">1. Mai bis 15. Juli</span>. Studienstart ist im Oktober.
                </p>
                <p>
                  Wenn du Fragen hast — zur Bewerbung, zum Studieninhalt, zu Würzburg — schreib uns. Wir antworten persönlich, nicht mit einem Formbrief.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="flex flex-wrap gap-4 mt-10">
                <a href="https://campusportal.thws.de" target="_blank" rel="noopener noreferrer"
                  className="bg-[#E87722] text-white px-8 py-4 text-sm font-bold tracking-wide hover:bg-[#d06a1e] transition-colors">
                  Jetzt bewerben — Campusportal
                </a>
                <a href="https://www.thws.de/studium-an-der-thws/studieren/studiengaenge/business-analytics/" target="_blank" rel="noopener noreferrer"
                  className="border border-white/20 text-white px-8 py-4 text-sm font-bold tracking-wide hover:border-white/40 transition-colors">
                  Alle Infos auf thws.de
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-2">
            <Reveal delay="stagger-2">
              <div className="bg-white/5 p-8 space-y-5">
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">Auf einen Blick</p>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b border-white/5 pb-3">
                    <span className="text-neutral-500">Abschluss</span>
                    <span className="text-white font-medium">Bachelor of Arts (B.A.)</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-3">
                    <span className="text-neutral-500">Regelstudienzeit</span>
                    <span className="text-white font-medium">7 Semester</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-3">
                    <span className="text-neutral-500">Zulassung</span>
                    <span className="text-[#E87722] font-medium">Zulassungsfrei</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-3">
                    <span className="text-neutral-500">Studienstart</span>
                    <span className="text-white font-medium">Wintersemester (Oktober)</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-3">
                    <span className="text-neutral-500">Bewerbung</span>
                    <span className="text-white font-medium">1. Mai – 15. Juli</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-3">
                    <span className="text-neutral-500">Sprache</span>
                    <span className="text-white font-medium">Deutsch</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Praxissemester</span>
                    <span className="text-white font-medium">Ja (5. Semester)</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal>
          <div className="text-sm text-neutral-500 border-t border-white/5 pt-8">
            <p>Fragen? Schreib direkt an <a href="mailto:studienberatung@thws.de" className="text-[#E87722] hover:underline">studienberatung@thws.de</a> oder an <a href="mailto:robert.butscher@thws.de" className="text-[#E87722] hover:underline">Prof. Dr. Robert Butscher</a>.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="py-10 bg-[#0a0a18] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#E87722' }}>BBA</span>
            <span className="text-xs text-neutral-600">Bachelor Business Analytics · THWS Business School Würzburg</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-neutral-600">
            <a href="https://www.thws.de/studium-an-der-thws/studieren/studiengaenge/business-analytics/" target="_blank" rel="noopener noreferrer" className="hover:text-[#E87722] transition-colors">THWS</a>
            <a href="https://campusportal.thws.de" target="_blank" rel="noopener noreferrer" className="hover:text-[#E87722] transition-colors">Bewerben</a>
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
      <Fallstudie />
      <WasDuLernst />
      <SemesterJourney />
      <Berufswelt />
      <DAVSample />
      <Wuerzburg />
      <CTA />
      <Footer />
    </div>
  )
}

export default App
