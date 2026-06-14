// Strona /o-nas — o firmie PLAST-MET / marce ALUKOMFORT

const ONAS_FACTS = [
  { v: '1988', k: 'rok założenia' },
  { v: '37+ lat', k: 'na rynku' },
  { v: '100%', k: 'polski kapitał' },
  { v: 'TÜV NORD', k: 'certyfikat jakości' },
];

const ONAS_VALUES = [
  { t: 'Zaufanie', d: 'Fundament naszych relacji — budujemy je na uczciwości i prawdomówności. Dzięki temu zespół wyznacza i osiąga ambitne cele, działając lojalnie i we współpracy.' },
  { t: 'Odpowiedzialność', d: 'Świadomie przekazujemy decyzyjność w kolejne obszary firmy — szerszy zakres decyzji to większa odpowiedzialność za rozwój całej organizacji.' },
  { t: 'Zaangażowanie', d: 'Poczucie realnego wpływu na cele firmy. Przekłada się na lepszą jakość produktów, obsługę i skuteczne rozwiązywanie problemów.' },
  { t: 'Współpraca', d: 'Jasna komunikacja w zespołach nastawiona na wspólny efekt — to z niej rodzą się najlepsze rozwiązania.' },
  { t: 'Jakość', d: 'Każdego dnia dbamy o wysoki standard pracy i produktów, podnosimy kwalifikacje i profesjonalnie obsługujemy klientów.' },
  { t: 'Rozwój', d: 'Pielęgnujemy i wzmacniamy pozostałe wartości — to one napędzają rozwój firmy.' },
];

const ONAS_TECH = [
  'Precyzyjna obróbka CNC i autorska metoda przenikania profili — pionowy profil wprowadzany jest w poziomy z dużą dokładnością, dzięki czemu połączenia stabilizują się same, bez konieczności spawania wszystkich węzłów.',
  'Cynkowanie ogniowe linii stalowych (EN-ISO 1461) — cynk spaja połączenia i chroni stal przed korozją; powierzchnia po ocynku jest szorstkowana pod powłokę lakierniczą.',
  'System DUPLEX (cynk + lakier) — ochrona stali ponad 40 lat wg EN-ISO 12944-5. Lakierowanie proszkowe w technologii szwajcarskiej firmy GEMA zapewnia trwałość koloru wg palety RAL.',
  'Zadaszenia ALUKOMFORT wykonujemy z ekstrudowanego aluminium 6063 z malowaniem proszkowym — bezobsługowego i odpornego na korozję. Jakość potwierdza certyfikat TÜV NORD (PN-EN 1090-1, klasa EXC 2).',
  'Technologię projektujemy z myślą o środowisku — ograniczamy do minimum ilość odpadów, a aluminium jest w 100% przetwarzalne.',
];

function PageOnas({ onQuote }) {
  usePageMeta({
    title: 'O nas — PLAST-MET, producent zadaszeń ALUKOMFORT | Trzebnica',
    description: 'ALUKOMFORT to marka PLAST-MET Systemy Ogrodzeniowe — polskiego producenta z Trzebnicy działającego od 1988 roku. Własny dział konstrukcyjno-projektowy, nowoczesne technologie, certyfikat TÜV NORD.',
    canonical: 'https://alukomfort.pl/#/o-nas',
  });

  return (
    <>
      <Breadcrumbs items={[
        { label: 'Strona główna', href: '#/' },
        { label: 'O nas' },
      ]} />

      <section className="section">
        <div className="container">
          <SectionHead title="ALUKOMFORT — marka PLAST-MET"
            sub="Plast-Met Systemy Ogrodzeniowe to firma z w 100% polskim kapitałem, działająca nieprzerwanie od 1988 roku. Od ponad 37 lat dostarczamy rozwiązania, które łączą bezpieczeństwo, funkcjonalność i nowoczesny design — a marka ALUKOMFORT to nasza linia aluminiowych zadaszeń i pergol." />
          <div className="onas-facts">
            {ONAS_FACTS.map((f, i) => (
              <div key={i} className="onas-fact">
                <div className="onas-fact__v">{f.v}</div>
                <div className="onas-fact__k">{f.k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="split-2">
            <div>
              <h3 className="block-title">Od siatki ogrodzeniowej po aluminiowe zadaszenia</h3>
              <p className="small" style={{color:'var(--muted)', lineHeight: 1.75}}>
                Działalność rozpoczęliśmy od produkcji siatki ogrodzeniowej. Z biegiem lat systematycznie poszerzaliśmy
                ofertę, odpowiadając na rosnące potrzeby rynku. Zdobyta wiedza, wieloletnie doświadczenie i wdrożenie
                zaawansowanych technologii pozwoliły nam stworzyć linię Nowoczesnych Ogrodzeń Frontowych — synonim
                jakości i prestiżu, obecny na rynku od ponad 10 lat.
              </p>
              <p className="small" style={{color:'var(--muted)', lineHeight: 1.75}}>
                Kolejnym etapem był projekt Oskoma — indywidualne ogrodzenia w pełni dopasowane do potrzeb klientów.
                Dziś ofertę rozszerzyliśmy o ogrodzenia aluminiowe oraz <strong>zadaszenia ALUKOMFORT</strong>, które
                cieszą się dużym zainteresowaniem zarówno wśród partnerów handlowych, jak i klientów indywidualnych.
              </p>
              <p className="small" style={{color:'var(--muted)', lineHeight: 1.75}}>
                Jako prekursor innowacji jako pierwsi wprowadziliśmy na polski rynek wielofunkcyjny moduł Centerbox
                oraz inteligentne systemy oświetlenia ogrodzenia i ogrodu — Smart Fence i Smart Light, oparte na
                energooszczędnych lampach LED. To samo myślenie o innowacji stoi za zadaszeniami ALUKOMFORT.
              </p>
              <p className="small" style={{color:'var(--muted)', lineHeight: 1.75, fontStyle:'italic'}}>
                „Twój dom jest tego wart" — to motto od lat wyznacza nasze podejście do jakości i projektowania.
              </p>
            </div>
            <div className="prod-photos">
              <div className="prod-photos__item" style={{backgroundImage:'url(uploads/realizacje-web/real_2.jpg)'}} role="img" aria-label="Stoisko targowe ALUKOMFORT — pawilon ogrodowy" />
              <div className="prod-photos__item" style={{backgroundImage:'url(uploads/realizacje-web/real_3.jpg)'}} role="img" aria-label="Zabudowa lamelowa ALUKOMFORT na targach" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="Tutaj wszystko się zaczyna"
            sub="W sercu firmy działa własny dział konstrukcyjno-projektowy — to tu powstają prototypy i projekty wszystkich produktów. To centralne i strategiczne miejsce w przedsiębiorstwie." />
          <div className="split-2">
            <div>
              <p className="small" style={{color:'var(--muted)', lineHeight: 1.75, marginTop: 0}}>
                Młoda kadra wspólnie z doświadczonymi specjalistami opracowuje najlepsze rozwiązania — wynikające
                z potrzeb klientów i aktualnych trendów, przy wykorzystaniu nowoczesnych maszyn i technologii.
                Większość realizacji powstaje pod indywidualne zamówienie: na etapie projektu klient wybiera wzór,
                wygląd i funkcje.
              </p>
              <p className="small" style={{color:'var(--muted)', lineHeight: 1.75}}>
                W stworzeniu wymarzonej konstrukcji partnerom i klientom pomaga autorski program konfiguracyjny.
                Intuicyjny w obsłudze, oparty na wieloletnim doświadczeniu, służy do projektowania i wyceny — także
                na urządzeniach mobilnych, bezpośrednio na miejscu planowanej inwestycji.
              </p>
            </div>
            <div>
              <div className="box" style={{padding: 24, border:'1px solid var(--line)', borderRadius: 14, background:'#fff'}}>
                <h4 style={{margin:'0 0 10px', fontSize: 15, fontWeight: 700}}>Producent, nie pośrednik</h4>
                <p className="small" style={{margin: 0, color:'var(--muted)', lineHeight: 1.7}}>
                  Każdą konstrukcję projektujemy i wytwarzamy we własnej fabryce w Trzebnicy na Dolnym Śląsku — z pełną
                  kontrolą jakości od profilu aluminiowego po montaż u klienta. Kupujesz bezpośrednio od producenta,
                  bez marży pośredników.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHead title="Nasze wartości"
            sub="Przyszłość firmy opieramy na fundamencie wspólnie wypracowanych wartości — to one są podstawą zrównoważonego rozwoju całej organizacji." />
          <div className="features" style={{gridTemplateColumns:'repeat(3, 1fr)'}}>
            {ONAS_VALUES.map((v, i) => (
              <div key={i} className="feature" style={{textAlign:'left', padding:'24px 22px'}}>
                <div style={{fontSize: 15, fontWeight: 700, color:'var(--ink)', marginBottom: 8}}>{v.t}</div>
                <div className="feature__label" style={{fontSize: 12.5, textAlign:'left', lineHeight: 1.6}}>{v.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="Technologia i jakość produkcji"
            sub="Własny park maszynowy i sprawdzone technologie pozwalają nam panować nad jakością na każdym etapie — od profilu po powłokę." />
          <ul className="iconlist iconlist--check" style={{maxWidth: 980, margin: '0 auto'}}>
            {ONAS_TECH.map((c, i) => (
              <li key={i}><span className="ic-check" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <CertBar />
        </div>
      </section>

      <section className="section--ink section" style={{padding:'48px 0'}}>
        <div className="container" style={{textAlign:'center'}}>
          <h2 className="section__title" style={{color:'#fff', marginBottom: 10}}>Porozmawiajmy o Twojej realizacji</h2>
          <p style={{margin:'0 0 22px', color:'rgba(255,255,255,0.75)'}}>Producent z 37-letnim doświadczeniem — od projektu po montaż.</p>
          <Button variant="primary" size="lg" onClick={onQuote}>Zamów bezpłatną wycenę</Button>
        </div>
      </section>
    </>
  );
}

window.PageOnas = PageOnas;
