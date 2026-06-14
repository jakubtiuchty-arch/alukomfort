// Strona /o-nas — o firmie PLAST-MET / marce ALUKOMFORT

const ONAS_FACTS = [
  { v: '1988', k: 'rok założenia' },
  { v: '37+ lat', k: 'na rynku' },
  { v: '100%', k: 'polski kapitał' },
  { v: 'TÜV NORD', k: 'certyfikat jakości' },
];

const ONAS_VALUES = [
  { t: 'Producent, nie pośrednik', d: 'Projektujemy i wytwarzamy konstrukcje we własnej fabryce w Trzebnicy. Pełna kontrola jakości — od profilu aluminiowego po montaż u klienta.' },
  { t: 'Własne biuro konstrukcyjne i projektowe', d: 'Dedykowane działy opracowują rozwiązania technologiczne i indywidualne projekty, dzięki czemu realizujemy także nietypowe zamówienia.' },
  { t: 'Innowacja w standardzie', d: 'Od lat wprowadzamy na polski rynek nowatorskie rozwiązania — od modułowych systemów po inteligentne oświetlenie. Zadaszenia ALUKOMFORT to ten sam kierunek myślenia.' },
  { t: 'Jakość potwierdzona certyfikatem', d: 'Konstrukcje wykonujemy zgodnie z normą PN-EN 1090-1 w klasie EXC 2, co potwierdza certyfikat TÜV NORD (2274-CPR-0046-2025).' },
];

function PageOnas({ onQuote }) {
  usePageMeta({
    title: 'O nas — PLAST-MET, producent zadaszeń ALUKOMFORT | Trzebnica',
    description: 'ALUKOMFORT to marka PLAST-MET — polskiego producenta z Trzebnicy działającego od 1988 roku. Własna fabryka, biuro konstrukcyjne, certyfikat TÜV NORD. Poznaj naszą historię.',
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
            sub="Jesteśmy polskim producentem z ponad 37-letnią tradycją. Od 1988 roku projektujemy i wytwarzamy systemy z aluminium i stali — a marka ALUKOMFORT to nasza odpowiedź na rosnącą potrzebę nowoczesnych, trwałych zadaszeń i pergol." />
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
              <h3 className="block-title">Od ogrodzeń po zadaszenia — 37 lat doświadczenia</h3>
              <p className="small" style={{color:'var(--muted)', lineHeight: 1.75}}>
                PLAST-MET powstał w 1988 roku jako firma z w 100% polskim kapitałem i przez dekady wyrósł na jednego
                z czołowych producentów systemów ogrodzeniowych w Polsce. Przez te lata zbudowaliśmy własną fabrykę,
                biuro konstrukcyjne i projektowe oraz park maszynowy, który pozwala nam panować nad jakością na każdym
                etapie produkcji.
              </p>
              <p className="small" style={{color:'var(--muted)', lineHeight: 1.75}}>
                To samo doświadczenie i zaplecze technologiczne stoi dziś za marką <strong>ALUKOMFORT</strong> —
                aluminiowymi zadaszeniami i pergolami bioklimatycznymi LINEA, HORIZON i ROMA. Nie jesteśmy pośrednikiem:
                każdą konstrukcję projektujemy i wykonujemy u siebie, w Trzebnicy na Dolnym Śląsku.
              </p>
              <p className="small" style={{color:'var(--muted)', lineHeight: 1.75, fontStyle:'italic'}}>
                „Twój dom jest tego wart" — to motto, które od lat wyznacza nasze podejście do projektowania i jakości.
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
          <SectionHead title="Co nas wyróżnia" sub="Cztery filary, na których budujemy markę ALUKOMFORT." />
          <div className="features" style={{gridTemplateColumns:'repeat(2, 1fr)'}}>
            {ONAS_VALUES.map((v, i) => (
              <div key={i} className="feature" style={{textAlign:'left', padding:'24px 22px'}}>
                <div style={{fontSize: 15, fontWeight: 700, color:'var(--ink)', marginBottom: 8}}>{v.t}</div>
                <div className="feature__label" style={{fontSize: 13, textAlign:'left', lineHeight: 1.6}}>{v.d}</div>
              </div>
            ))}
          </div>
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
