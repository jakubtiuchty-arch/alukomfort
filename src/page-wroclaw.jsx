// Landing lokalny — Pergole i zadaszenia tarasów Wrocław
// Cel SEO: „pergole wrocław", „zadaszenia tarasów wrocław", „zadaszenie tarasu wrocław"

const WROCLAW_FAQ = [
  {
    q: 'Czy dojeżdżacie z pomiarem do Wrocławia?',
    a: 'Tak — pomiar i doradztwo na miejscu we Wrocławiu i okolicach są bezpłatne. Z Trzebnicy na Psie Pole czy Karłowice jedziemy ok. 25 minut, na drugą stronę miasta niewiele dłużej. Termin ustalamy zwykle w ciągu kilku dni od zapytania.',
  },
  {
    q: 'Ile kosztuje pergola lub zadaszenie tarasu we Wrocławiu?',
    a: 'Cena zależy od systemu (LINEA, HORIZON, ROMA), wymiarów, rodzaju dachu i ewentualnej zabudowy ścian. Dlatego każdą konstrukcję wyceniamy indywidualnie — bezpłatnie i w ciągu 24 godzin. Kupujesz bezpośrednio od producenta, bez marży pośredników.',
  },
  {
    q: 'Jak długo trwa realizacja od zamówienia do montażu?',
    a: 'Konstrukcję produkujemy we własnej fabryce w Trzebnicy, więc nie czekamy na dostawy z zagranicy. Standardowo od potwierdzenia projektu do montażu mija kilka tygodni, a sam montaż zadaszenia tarasu to zwykle 1–2 dni pracy naszej ekipy.',
  },
  {
    q: 'Czy pergola na tarasie wymaga pozwolenia na budowę?',
    a: 'W większości przypadków przydomowa pergola lub zadaszenie tarasu nie wymaga pozwolenia na budowę — zależnie od wymiarów i lokalizacji wystarczy zgłoszenie albo żadne formalności nie są potrzebne. Stan prawny weryfikujemy wspólnie na etapie projektu.',
  },
  {
    q: 'Czy montujecie też poza Wrocławiem?',
    a: 'Tak — działamy w promieniu ok. 50 km od Trzebnicy: Wrocław, Oleśnica, Oborniki Śląskie, Żmigród, Milicz, Wołów, Brzeg Dolny, Środa Śląska, Długołęka i okolice.',
  },
];

const WROCLAW_STEPS = [
  { num: '01', title: 'Zapytanie i wycena', desc: 'Wyślij zapytanie przez formularz — bezpłatną wycenę otrzymasz w ciągu 24 godzin.' },
  { num: '02', title: 'Pomiar we Wrocławiu', desc: 'Przyjeżdżamy na miejsce, mierzymy taras i doradzamy wybór systemu, dachu i kolorów.' },
  { num: '03', title: 'Produkcja w Trzebnicy', desc: 'Konstrukcję wykonujemy we własnej fabryce, zgodnie z normą EN 1090-1.' },
  { num: '04', title: 'Montaż w 1–2 dni', desc: 'Zadaszenie montują u Ciebie nasi monterzy. Odbierasz gotowy taras z gwarancją 60 miesięcy.' },
];

function PageWroclaw({ onQuote, onNavigate }) {
  const go = (e, hash) => { e.preventDefault(); onNavigate && onNavigate(hash); };
  usePageMeta({
    title: 'Pergole Wrocław — zadaszenia tarasów | Producent PLAST-MET',
    description: 'Pergole i aluminiowe zadaszenia tarasów dla Wrocławia — producent z Trzebnicy, 25 minut od miasta. Bezpłatny pomiar u Ciebie, montaż własną ekipą, wycena w 24 h.',
    canonical: 'https://www.zadaszeniatrzebnica.pl/pergole-wroclaw',
  });
  React.useEffect(() => {
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = 'faq-schema-wroclaw';
    el.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: WROCLAW_FAQ.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
    document.head.appendChild(el);
    return () => { const s = document.getElementById('faq-schema-wroclaw'); if (s) s.remove(); };
  }, []);

  return (
    <>
      <Breadcrumbs items={[
        { label: 'Strona główna', href: '/' },
        { label: 'Pergole Wrocław' },
      ]} />

      <section className="hero" style={{height: 'clamp(440px, 44vw, 720px)'}}>
        <div
          className="hero__img"
          style={{ backgroundImage: 'url(uploads/pergole-wroclaw-hero.webp)', backgroundSize: 'cover', backgroundPosition: 'center 25%' }}
        />
        <div className="hero__scrim" />
        <div className="container hero__inner">
          <div className="hero__content" style={{maxWidth: 620}}>
            <div className="hero__eyebrow">PLAST-MET · PRODUCENT Z TRZEBNICY</div>
            <h1 className="hero__title">Pergole i zadaszenia tarasów — Wrocław</h1>
            <p className="hero__sub">
              Projektujemy, produkujemy i montujemy aluminiowe pergole oraz zadaszenia tarasów
              we Wrocławiu i okolicach. Pomiar u Ciebie na tarasie, montaż naszą ekipą.
            </p>
            <div className="hero__cta">
              <Button variant="primary" size="lg" onClick={onQuote}>Zamów bezpłatną wycenę</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="usp-bar">
        <div className="container">
          <div className="usp-bar__grid">
            <div className="usp-bar__item">
              <img className="usp-bar__ico" src="uploads/icons/bar-wycena.webp?v=2" alt="" width="34" height="34" />
              <div>
                <div className="usp-bar__num">25 minut</div>
                <div className="usp-bar__lab">z fabryki do Wrocławia</div>
              </div>
            </div>
            <div className="usp-bar__item">
              <img className="usp-bar__ico" src="uploads/icons/bar-tradycja.webp?v=2" alt="" width="34" height="34" />
              <div>
                <div className="usp-bar__num">Bezpłatny pomiar</div>
                <div className="usp-bar__lab">u Ciebie, na tarasie</div>
              </div>
            </div>
            <div className="usp-bar__item">
              <img className="usp-bar__ico" src="uploads/icons/bar-certyfikat.webp?v=2" alt="" width="34" height="34" />
              <div>
                <div className="usp-bar__num">TÜV NORD</div>
                <div className="usp-bar__lab">2274-CPR-0046-2025 · EN 1090-1</div>
              </div>
            </div>
            <div className="usp-bar__item">
              <img className="usp-bar__ico" src="uploads/icons/bar-gwarancja.webp?v=2" alt="" width="34" height="34" />
              <div>
                <div className="usp-bar__num">60 mies.</div>
                <div className="usp-bar__lab">gwarancji na konstrukcję</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="Zadaszenie pod wymiar Twojego tarasu"
            sub="Pomiar, projekt, produkcja i montaż — wszystko w jednych rękach, bez podwykonawców." />
          <div className="split-2">
            <div>
              <p className="small" style={{color:'var(--muted)', lineHeight: 1.7}}>
                Działamy z Trzebnicy, 25 minut od Wrocławia — dlatego na pomiar umawiamy się
                w kilka dni, a nie tygodni. Montaż prowadzą nasi monterzy, ci sami,
                którzy stawiają te konstrukcje na co dzień.
              </p>
              <p className="small" style={{color:'var(--muted)', lineHeight: 1.7}}>
                Każdą konstrukcję projektujemy pod konkretny taras i wykonujemy z ekstrudowanego
                aluminium, zgodnie z normą PN-EN 1090-1 w klasie wykonania EXC 2 — co potwierdza
                certyfikat TÜV NORD. Realizujemy zarówno zadaszenia przydomowych tarasów,
                jak i ogródki restauracyjne czy strefy hotelowe.
              </p>
            </div>
            <div>
              <p className="small" style={{color:'var(--muted)', lineHeight: 1.7}}>
                W ofercie mamy trzy systemy: <b>LINEA</b> — klasyczne zadaszenie tarasu ze stałym
                dachem z poliwęglanu lub szkła, <b>HORIZON</b> — pergola bioklimatyczna z ruchomymi
                lamelami sterowanymi pilotem lub aplikacją, oraz <b>ROMA</b> — lekka pergola z dachem
                tkaninowym. Systemy LINEA i HORIZON można dodatkowo zabudować ścianami —
                szkłem przesuwnym, żaluzjami lub panelami.
              </p>
              <p className="small" style={{color:'var(--muted)', lineHeight: 1.7}}>
                Nie wiesz, jak zadaszenie będzie wyglądać przy Twoim domu? Wgraj zdjęcie tarasu
                do naszego <a href="/wizualizacja" onClick={(e)=>go(e,'/wizualizacja')} style={{fontWeight: 600}}>konfiguratora wizualizacji</a> —
                w 30 sekund zobaczysz realistyczny podgląd.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHead title="Trzy systemy do wyboru"
            sub="Różnią się dachem i charakterem — łączy je aluminiowa konstrukcja, certyfikat TÜV NORD i montaż przez nasz zespół." />
          <div className="home-tiles">
            <a href="/produkty/linea" className="home-tile" onClick={(e)=>go(e,'/produkty/linea')}>
              <div className="home-tile__img" style={{backgroundImage:'url(uploads/linea_kafelek_4.webp)'}} />
              <div className="home-tile__scrim" />
              <div className="home-tile__body">
                <div className="home-tile__name">LINEA</div>
                <p className="home-tile__desc">Zadaszenie tarasu ze stałym dachem — uniwersalne i ekonomiczne. Taras, wejście, carport.</p>
                <span className="home-tile__link">Poznaj LINEA</span>
              </div>
            </a>
            <a href="/produkty/horizon" className="home-tile" onClick={(e)=>go(e,'/produkty/horizon')}>
              <div className="home-tile__img" style={{backgroundImage:'url(uploads/kafelek_horizon_2.webp)'}} />
              <div className="home-tile__scrim" />
              <div className="home-tile__body">
                <div className="home-tile__name">HORIZON</div>
                <p className="home-tile__desc">Pergola bioklimatyczna z ruchomymi lamelami — pełna kontrola światła i przewiewu.</p>
                <span className="home-tile__link">Poznaj HORIZON</span>
              </div>
            </a>
            <a href="/produkty/roma" className="home-tile" onClick={(e)=>go(e,'/produkty/roma')}>
              <div className="home-tile__img" style={{backgroundImage:'url(uploads/roma_hp.webp)'}} />
              <div className="home-tile__scrim" />
              <div className="home-tile__body">
                <div className="home-tile__name">ROMA</div>
                <p className="home-tile__desc">Lekka pergola z dachem tkaninowym — śródziemnomorski klimat na tarasie i w ogródku.</p>
                <span className="home-tile__link">Poznaj ROMA</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="Nasze realizacje"
            sub="Montaże u klientów z Dolnego Śląska — zobacz, jak nasze zadaszenia wyglądają na miejscu." />
          <div className="case__thumbs">
            <a href="/realizacje" onClick={(e)=>go(e,'/realizacje')} className="case__thumb" style={{backgroundImage:'url(uploads/realizacje-web/real_4_1.webp)'}} aria-label="Przeszklony ogród zimowy HORIZON" />
            <a href="/realizacje" onClick={(e)=>go(e,'/realizacje')} className="case__thumb" style={{backgroundImage:'url(uploads/realizacje-web/real_3_1.webp)'}} aria-label="Zadaszenie tarasu LINEA z zabudową żaluzjową" />
            <a href="/realizacje" onClick={(e)=>go(e,'/realizacje')} className="case__thumb" style={{backgroundImage:'url(uploads/realizacje-web/real_1_2.webp)'}} aria-label="Zadaszenie tarasu z żaluzjami pionowymi" />
            <a href="/realizacje" onClick={(e)=>go(e,'/realizacje')} className="case__thumb" style={{backgroundImage:'url(uploads/realizacje-web/real_2_4.webp)'}} aria-label="Przeszklony pawilon ogrodowy" />
          </div>
          <div style={{textAlign: 'center', marginTop: 26}}>
            <Button variant="ghost-dark" size="lg" onClick={(e)=>go(e,'/realizacje')}>Zobacz wszystkie realizacje</Button>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHead title="Jak wygląda realizacja we Wrocławiu"
            sub="Od zapytania do gotowego tarasu — wszystko w jednych rękach: pomiar, projekt, produkcja i montaż." />
          <div className="steps-wrap is-on">
            <div className="steps" style={{gridTemplateColumns: 'repeat(4, 1fr)'}}>
              {WROCLAW_STEPS.map((s, i) => (
                <div key={i} className="step">
                  <div className="step__num">{s.num}</div>
                  <div className="step__title">{s.title}</div>
                  <p className="step__desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="Najczęstsze pytania klientów z Wrocławia"
            sub="Dojazd, ceny, terminy i formalności — wszystko, co warto wiedzieć przed zamówieniem." />
          <div className="faq">
            {WROCLAW_FAQ.map((f, i) => (
              <details key={i} className="faq__item">
                <summary className="faq__q">{f.q}</summary>
                <p className="faq__a">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section--ink section" style={{padding: '56px 0'}}>
        <div className="container" style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:32, flexWrap:'wrap'}}>
          <div>
            <h2 className="section__title" style={{color:'#fff', marginBottom: 8, textAlign:'left'}}>Umów bezpłatny pomiar we Wrocławiu</h2>
            <p style={{margin:0, color:'rgba(255,255,255,0.75)'}}>Wyślij zapytanie — wycenę otrzymasz w 24 godziny, termin pomiaru ustalimy w kilka dni.</p>
          </div>
          <Button variant="primary" size="lg" onClick={onQuote}>Zamów bezpłatną wycenę</Button>
        </div>
      </section>
    </>
  );
}

window.PageWroclaw = PageWroclaw;
