// Strona /o-nas — o firmie PLAST-MET / marce ALUKOMFORT

const ONAS_FACTS = [
  { v: '1988', k: 'rok założenia' },
  { v: '37+', k: 'lat na rynku', plus: true },
  { v: '100%', k: 'polski kapitał' },
  { v: 'TÜV NORD', k: 'certyfikat jakości' },
];

const ONAS_MILESTONES = [
  { yr: '1988', t: 'Początek', d: 'Startujemy od produkcji siatki ogrodzeniowej — z w 100% polskim kapitałem.' },
  { yr: '10+ lat', t: 'Ogrodzenia frontowe', d: 'Linia Nowoczesnych Ogrodzeń Frontowych — synonim jakości i prestiżu.' },
  { yr: 'Projekt Oskoma', t: 'Indywidualizacja', d: 'Ogrodzenia w pełni dopasowane do potrzeb klienta, projektowane na zamówienie.' },
  { yr: 'Dziś', t: 'ALUKOMFORT', d: 'Aluminiowe zadaszenia i pergole bioklimatyczne — LINEA, HORIZON, ROMA.' },
];

const ONAS_VALUES = [
  { t: 'Zaufanie', d: 'Fundament relacji — budujemy je na uczciwości i prawdomówności. Dzięki temu zespół wyznacza i osiąga ambitne cele.' },
  { t: 'Odpowiedzialność', d: 'Przekazujemy decyzyjność w kolejne obszary firmy — szerszy zakres decyzji to większa odpowiedzialność za rozwój.' },
  { t: 'Zaangażowanie', d: 'Poczucie realnego wpływu na cele firmy — lepsza jakość produktów, obsługa i rozwiązywanie problemów.' },
  { t: 'Współpraca', d: 'Jasna komunikacja w zespołach nastawiona na wspólny efekt — to z niej rodzą się najlepsze rozwiązania.' },
  { t: 'Jakość', d: 'Codzienna dbałość o standard pracy i produktów, podnoszenie kwalifikacji, profesjonalna obsługa klienta.' },
  { t: 'Rozwój', d: 'Pielęgnujemy i wzmacniamy pozostałe wartości — to one napędzają rozwój całej organizacji.' },
];

const ONAS_TECH = [
  'Autorska metoda przenikania profili i precyzyjna obróbka CNC — połączenia stabilizują się same, bez konieczności spawania wszystkich węzłów.',
  'Cynkowanie ogniowe linii stalowych (EN-ISO 1461) oraz system DUPLEX — ochrona stali ponad 40 lat wg EN-ISO 12944-5.',
  'Lakierowanie proszkowe w technologii szwajcarskiej firmy GEMA — trwałość koloru wg pełnej palety RAL.',
  'Zadaszenia ALUKOMFORT z ekstrudowanego aluminium 6063 — bezobsługowe, odporne na korozję, z certyfikatem TÜV NORD (PN-EN 1090-1, EXC 2).',
  'Technologia z myślą o środowisku — minimalizujemy odpady, a aluminium jest w 100% przetwarzalne.',
];

function PageOnas({ onQuote }) {
  usePageMeta({
    title: 'O nas — PLAST-MET, producent zadaszeń ALUKOMFORT | Trzebnica',
    description: 'ALUKOMFORT to marka PLAST-MET Systemy Ogrodzeniowe — polskiego producenta z Trzebnicy działającego od 1988 roku. Własny dział konstrukcyjno-projektowy, nowoczesne technologie, certyfikat TÜV NORD.',
    canonical: 'https://www.zadaszeniatrzebnica.pl/#/o-nas',
  });

  return (
    <>
      <Breadcrumbs items={[
        { label: 'Strona główna', href: '#/' },
        { label: 'O nas' },
      ]} />

      <section className="onas-hero onas-hero--photo" style={{backgroundImage: "url('uploads/onas-hero-siedziba.webp')"}}>
        <div className="container" style={{position:'relative', zIndex: 1}}>
          <div className="onas-hero__eyebrow">PLAST-MET · Systemy Ogrodzeniowe</div>
          <h1 className="onas-hero__title">Polski producent z 37-letnią historią</h1>
          <p className="onas-hero__lead">
            Plast-Met działa nieprzerwanie od 1988 roku — z w 100% polskim kapitałem. Przez ponad trzy dekady
            dostarczamy rozwiązania, które łączą bezpieczeństwo, funkcjonalność i nowoczesny design. Marka
            ALUKOMFORT to nasza linia aluminiowych zadaszeń i pergol bioklimatycznych.
          </p>
          <div className="onas-hero__facts">
            {ONAS_FACTS.map((f, i) => (
              <div key={i} className="onas-hero__fact">
                <div className="v">{f.plus ? <>{f.v.replace('+','')}<b>+</b></> : f.v}</div>
                <div className="k">{f.k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section__title" style={{textAlign:'left', marginBottom: 14}}>Od siatki ogrodzeniowej po aluminiowe zadaszenia</h2>
          <p className="onas-lead-p">
            Działalność rozpoczęliśmy od siatki ogrodzeniowej, a z biegiem lat — odpowiadając na potrzeby rynku —
            konsekwentnie poszerzaliśmy ofertę. Dziś jesteśmy jednym z wiodących producentów systemów ogrodzeniowych
            w Polsce, a od kilku lat także aluminiowych zadaszeń pod marką ALUKOMFORT.
          </p>
          <p className="onas-body-p">
            Jako prekursor innowacji jako pierwsi wprowadziliśmy na polski rynek wielofunkcyjny moduł Centerbox oraz
            inteligentne systemy oświetlenia — Smart Fence i Smart Light, oparte na energooszczędnych lampach LED.
            To samo myślenie o technologii i designie stoi za pergolami ALUKOMFORT.
          </p>
          <div className="onas-ms">
            {ONAS_MILESTONES.map((m, i) => (
              <div key={i} className="onas-ms__item">
                <div className="onas-ms__yr">{m.yr}</div>
                <div className="onas-ms__t">{m.t}</div>
                <div className="onas-ms__d">{m.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="onas-photos">
            <div className="onas-photo">
              <figure>
                <img className="onas-photo__img" src="uploads/realizacje-web/real_2.webp" alt="Stoisko targowe ALUKOMFORT — przeszklony pawilon ogrodowy" loading="lazy" />
                <figcaption>Pawilon ogrodowy ALUKOMFORT na targach branżowych.</figcaption>
              </figure>
            </div>
            <div className="onas-photo">
              <figure>
                <img className="onas-photo__img" src="uploads/realizacje-web/real_3.webp" alt="Ściana z lameli aluminiowych ALUKOMFORT w wykończeniu drewnopodobnym" loading="lazy" />
                <figcaption>Ściana lamelowa w wykończeniu drewnopodobnym — detal ekspozycji.</figcaption>
              </figure>
            </div>
          </div>
          <p className="onas-body-p" style={{margin: '22px auto 0', textAlign: 'center', maxWidth: '62ch'}}>
            <strong style={{color:'var(--ink)'}}>Producent, nie pośrednik.</strong> Każdą konstrukcję projektujemy
            i wytwarzamy we własnej fabryce w Trzebnicy — z pełną kontrolą jakości od profilu po montaż u klienta.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split-2">
            <div>
              <h2 className="section__title" style={{textAlign:'left', marginBottom: 14}}>Tutaj wszystko się zaczyna</h2>
              <p className="onas-body-p" style={{marginTop: 0}}>
                W sercu firmy działa własny dział konstrukcyjno-projektowy — to tu powstają prototypy i projekty
                wszystkich produktów. Młoda kadra wraz z doświadczonymi specjalistami opracowuje rozwiązania
                wynikające z potrzeb klientów i aktualnych trendów, przy wykorzystaniu nowoczesnych maszyn.
              </p>
              <p className="onas-body-p">
                Większość realizacji powstaje pod indywidualne zamówienie — na etapie projektu klient wybiera wzór,
                wygląd i funkcje. W stworzeniu wymarzonej konstrukcji pomaga autorski program do projektowania
                i wyceny, działający także na urządzeniach mobilnych, bezpośrednio na miejscu inwestycji.
              </p>
            </div>
            <div style={{display:'flex', alignItems:'center'}}>
              <blockquote style={{margin: 0, padding: '28px 30px', background:'#16171a', color:'#fff', borderRadius: 16}}>
                <p style={{margin: 0, fontSize: 19, lineHeight: 1.5, fontWeight: 600}}>„Twój dom jest tego wart"</p>
                <p style={{margin: '12px 0 0', fontSize: 13, color:'rgba(255,255,255,0.6)'}}>— motto, które od lat wyznacza nasze podejście do jakości i projektowania.</p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <h2 className="section__title" style={{textAlign:'left', marginBottom: 8}}>Nasze wartości</h2>
          <p className="onas-body-p" style={{marginTop: 0, marginBottom: 30}}>
            Przyszłość firmy opieramy na fundamencie wspólnie wypracowanych wartości — to one są podstawą zrównoważonego rozwoju.
          </p>
          <div className="onas-values">
            {ONAS_VALUES.map((v, i) => (
              <div key={i} className="onas-val">
                <div className="onas-val__num">{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <div className="onas-val__t">{v.t}</div>
                  <p className="onas-val__d">{v.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section__title" style={{textAlign:'left', marginBottom: 8}}>Technologia i jakość produkcji</h2>
          <p className="onas-body-p" style={{marginTop: 0, marginBottom: 22}}>
            Własny park maszynowy i sprawdzone technologie pozwalają nam panować nad jakością na każdym etapie — od profilu po powłokę.
          </p>
          <ul className="iconlist iconlist--check" style={{maxWidth: 980}}>
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
