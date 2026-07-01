// Strona główna

const HOME_FAQ = [
  {
    q: 'Od czego zależy cena pergoli aluminiowej?',
    a: 'Od wybranego systemu (LINEA, HORIZON, ROMA), wymiarów, rodzaju dachu (poliwęglan, szkło, lamele, tkanina), zabudowy ścian oraz dodatków takich jak LED czy automatyka. Każdą konstrukcję wyceniamy indywidualnie — bezpłatnie i w ciągu 24 godzin.',
  },
  {
    q: 'Czy pergola wymaga pozwolenia na budowę?',
    a: 'W wielu przypadkach przydomowa pergola czy zadaszenie tarasu nie wymaga pozwolenia na budowę — w zależności od wymiarów i lokalizacji wystarczy zgłoszenie albo nie są potrzebne żadne formalności. Stan prawny weryfikujemy wspólnie na etapie wyceny i projektu.',
  },
  {
    q: 'Jaką gwarancję otrzymam?',
    a: 'Na konstrukcję aluminiową i pokrycie tkaninowe (akryl) udzielamy 60 miesięcy gwarancji, a na elektrykę i automatykę — 24 miesiące.',
  },
  {
    q: 'Czy konstrukcje wytrzymają śnieg i silny wiatr?',
    a: 'Tak — systemy ALUKOMFORT projektowane są zgodnie z normami EN 1991-1-1, EN 1991-1-3 (obciążenie śniegiem) i EN 1991-1-4 (obciążenie wiatrem), w klasie wykonania EXC 2 wg PN-EN 1090-1. W pergoli tkaninowej ROMA roletę zwija się na czas intensywnych opadów.',
  },
  {
    q: 'Czy mogę sterować pergolą z telefonu?',
    a: 'Tak. Dach lamelowy HORIZON napędzają silniki SOMFY — sterowanie ręczne, pilotem lub aplikacją, z opcjonalną automatyką pogodową (czujniki deszczu, wiatru i nasłonecznienia). W systemie ROMA automatyka jest dostępna opcjonalnie.',
  },
  {
    q: 'Jak dbać o pergolę aluminiową?',
    a: 'Konstrukcja jest praktycznie bezobsługowa. Ekstrudowane aluminium 6063 nie koroduje, a malowanie proszkowe chroni kolor przed UV i blaknięciem — wystarczy okresowe mycie wodą. Aluminium jest też w 100% przetwarzalne.',
  },
];

const HOME_STEPS = [
  { num: '01', title: 'Zapytanie i wycena', desc: 'Wyślij zapytanie przez formularz — bezpłatną wycenę otrzymasz w ciągu 24 godzin.' },
  { num: '02', title: 'Pomiar i doradztwo', desc: 'Doradzamy wybór systemu, zabudowy i kolorów. Ustalamy wymiary pod Twoją przestrzeń.' },
  { num: '03', title: 'Projekt i konfiguracja', desc: 'Przygotowujemy projekt konstrukcji — od profilu i dachu po ściany, LED i automatykę.' },
  { num: '04', title: 'Produkcja w Trzebnicy', desc: 'Konstrukcję wykonujemy we własnej fabryce PLAST-MET na Dolnym Śląsku, zgodnie z EN 1090-1.' },
  { num: '05', title: 'Montaż i odbiór', desc: 'Ekipa montuje zadaszenie u Ciebie. Odbierasz gotową strefę komfortu z gwarancją 60 miesięcy.' },
];

const HOME_CMP = [
  { label: 'Jak działa dach', linea: 'Stały — montowany na zawsze',       horizon: 'Ruchomy — regulujesz lamele',          roma: 'Zwijany — roleta tkaninowa' },
  { label: 'Pokrycie',        linea: 'Poliwęglan 16 mm lub szkło ESG/VSG', horizon: 'Lamele, szkło lub hybryda', roma: 'Roleta rzymska z akrylu' },
  { label: 'Konstrukcja',     linea: 'Przyścienna lub samonośna',          horizon: 'Wieniec 280 mm, do 2 800 mm wysokości', roma: 'Samonośna, modułowa (3×3 – 6×4 m)' },
  { label: 'Ściany',          linea: 'Żaluzje, szyby, panele, rolety',     horizon: 'Szyby przesuwne, żaluzje, rolety', roma: 'Bez zabudowy — konstrukcja otwarta' },
  { label: 'Sterowanie',      linea: 'Konstrukcja stała',                  horizon: 'SOMFY — pilot, aplikacja, automatyka', roma: 'Linka lub automatyka (opcja)' },
  { label: 'Idealna do',      linea: 'Taras, wiata, składzik, balkon',   horizon: 'Taras prestiżowy, strefa SPA, gastronomia', roma: 'Strefa relaksu, ogródek kawiarni' },
];

function Home({ onNavigate, onQuote }) {
  const go = (e, hash) => { e.preventDefault(); onNavigate(hash); };
  const stepsRef = React.useRef(null);
  const [stepsOn, setStepsOn] = React.useState(false);
  React.useEffect(() => {
    const el = stepsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { setStepsOn(true); obs.disconnect(); }
    }, { threshold: 0.35 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  React.useEffect(() => {
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = 'faq-schema';
    el.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: HOME_FAQ.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
    document.head.appendChild(el);
    return () => { const s = document.getElementById('faq-schema'); if (s) s.remove(); };
  }, []);
  usePageMeta({
    title: 'ALUKOMFORT — pergole aluminiowe i zadaszenia tarasów | producent PLAST-MET, Trzebnica',
    description: 'Producent aluminiowych pergol bioklimatycznych i zadaszeń tarasów. Systemy LINEA, HORIZON, ROMA. Certyfikat TÜV NORD, gwarancja 60 mies., bezpłatna wycena w 24h.',
    canonical: 'https://www.zadaszeniatrzebnica.pl/',
  });

  return (
    <>
      <section className="hero hero-home">
        <video
          className="hero__img"
          src="uploads/hero_homepage_1.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="hero__scrim" />
        <div className="container hero__inner">
          <div className="hero__content hero__content--wide">
            <div className="hero__eyebrow">ALUKOMFORT · ZADASZENIA ALUMINIOWE</div>
            <h1 className="hero__title hero__title--xl">Komfort użytkowania<br/>niezależnie od pogody</h1>
            <p className="hero__sub">
              Zmień swój taras, ogród lub przestrzeń komercyjną w strefę luksusowego wypoczynku.
              Oferta ALUKOMFORT stanowi idealne rozwiązanie zarówno dla inwestorów prywatnych,
              jak i obiektów użyteczności publicznej.
            </p>
            <div className="hero__cta">
              <Button variant="primary" size="lg" onClick={onQuote}>Zamów bezpłatną wycenę</Button>
              <Button variant="ghost-light" size="lg" onClick={(e)=>go(e,'/produkty/linea')}>Zobacz produkty</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="usp-bar">
        <div className="container">
          <div className="usp-bar__grid">
            <div className="usp-bar__item">
              <img className="usp-bar__ico" src="uploads/icons/bar-tradycja.webp?v=2" alt="" width="34" height="34" />
              <div>
                <div className="usp-bar__num">30+ lat</div>
                <div className="usp-bar__lab">tradycji PLAST-MET</div>
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
            <div className="usp-bar__item">
              <img className="usp-bar__ico" src="uploads/icons/bar-wycena.webp?v=2" alt="" width="34" height="34" />
              <div>
                <div className="usp-bar__num">24 h</div>
                <div className="usp-bar__lab">bezpłatna wycena</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="Oferta zadaszeń aluminiowych ALUKOMFORT" />
          <div className="home-tiles">
            <a href="#/produkty/linea" className="home-tile" onClick={(e)=>go(e,'/produkty/linea')}>
              <div className="home-tile__img" style={{backgroundImage:'url(uploads/linea_kafelek_4.webp)'}} />
              <div className="home-tile__scrim" />
              <div className="home-tile__body">
                <div className="home-tile__name">LINEA</div>
                <p className="home-tile__desc">Zadaszenia przyścienne ze skośnym dachem to eleganckie i funkcjonalne rozwiązanie, które skutecznie chroni taras przed deszczem i słońcem, zapewniając trwałość konstrukcji oraz harmonijne dopasowanie do architektury budynku.</p>
                <span className="home-tile__link">Poznaj LINEA</span>
              </div>
            </a>
            <a href="#/produkty/horizon" className="home-tile" onClick={(e)=>go(e,'/produkty/horizon')}>
              <div className="home-tile__img" style={{backgroundImage:'url(uploads/kafelek_horizon_2.webp)'}} />
              <div className="home-tile__scrim" />
              <div className="home-tile__body">
                <div className="home-tile__name">HORIZON</div>
                <p className="home-tile__desc">Zadaszenia z wizualnie prostym dachem łączą nowoczesny, minimalistyczny design z funkcjonalnością, tworząc elegancką i ponadczasową przestrzeń przy domu lub w ogrodzie.</p>
                <span className="home-tile__link">Poznaj HORIZON</span>
              </div>
            </a>
            <a href="#/produkty/roma" className="home-tile" onClick={(e)=>go(e,'/produkty/roma')}>
              <div className="home-tile__img" style={{backgroundImage:'url(uploads/roma_hp.webp)'}} />
              <div className="home-tile__scrim" />
              <div className="home-tile__body">
                <div className="home-tile__name">ROMA</div>
                <p className="home-tile__desc">Zadaszenia z wizualnie prostym dachem i wykończeniem w postaci eleganckiej rolety rzymskiej łączą nowoczesną, minimalistyczną estetykę z możliwością regulacji zacienienia, tworząc komfortową i stylową przestrzeń do wypoczynku przez cały sezon.</p>
                <span className="home-tile__link">Poznaj ROMA</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHead title="Który system będzie najlepszy dla Ciebie?"
            sub="Szybkie porównanie trzech systemów — różnią się dachem, sterowaniem i charakterem, łączy je aluminium 6063 i jakość spod znaku TÜV NORD." />
          <div className="cmp-wrap">
            <table className="cmp">
              <thead>
                <tr>
                  <th></th>
                  <th><a href="#/produkty/linea" onClick={(e)=>go(e,'/produkty/linea')}>LINEA</a></th>
                  <th><a href="#/produkty/horizon" onClick={(e)=>go(e,'/produkty/horizon')}>HORIZON</a></th>
                  <th><a href="#/produkty/roma" onClick={(e)=>go(e,'/produkty/roma')}>ROMA</a></th>
                </tr>
              </thead>
              <tbody>
                {HOME_CMP.map((r, i) => (
                  <tr key={i}>
                    <td className="cmp__label">{r.label}</td>
                    <td>{r.linea}</td>
                    <td>{r.horizon}</td>
                    <td>{r.roma}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="small" style={{marginTop: 16, color:'var(--muted)'}}>Nie wiesz, który wybrać? Opisz swoją przestrzeń w zapytaniu — doradzimy najlepsze rozwiązanie przy bezpłatnej wycenie.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="case">
            <div className="case__media">
              <img src="uploads/realizacje-web/teaser-realizacje.webp" alt="Zadaszenie tarasu ALUKOMFORT LINEA z oświetleniem LED o zmierzchu — realizacja przy domu jednorodzinnym" loading="lazy" />
            </div>
            <div className="case__info">
              <div className="example__eyebrow">PRAWDZIWE MONTAŻE</div>
              <h2 className="case__title">Zobacz nasze realizacje</h2>
              <p className="small" style={{color:'var(--muted)', lineHeight: 1.65}}>
                Zadaszenia tarasów z zabudową lamelową, przeszklone pawilony ogrodowe, zabudowy balkonów —
                wszystkie wykonane w naszej fabryce i zamontowane u klientów. Bez zdjęć katalogowych,
                bez zdjęć z banków zdjęć: tak wyglądają systemy ALUKOMFORT na prawdziwych posesjach.
              </p>
              <div style={{marginTop: 20, display:'flex', gap: 12, flexWrap:'wrap'}}>
                <Button variant="ghost-dark" size="lg" onClick={(e)=>go(e,'/realizacje')}>Zobacz realizacje</Button>
                <Button variant="primary" size="lg" onClick={onQuote}>Zamów bezpłatną wycenę</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHead title="Dlaczego warto wybrać systemy ALUKOMFORT?"
            sub="Cztery filary, które odróżniają nasze pergole od tanich zadaszeń dostępnych na rynku." />
          <div className="features" style={{gridTemplateColumns:'repeat(4, 1fr)'}}>
            <div className="feature" style={{textAlign:'left', padding:'26px 22px'}}>
              <img className="usp-ico" src="uploads/icons/usp-jakosc.webp" alt="" width="44" height="44" loading="lazy" />
              <div style={{fontSize: 14, fontWeight: 700, color:'var(--ink)', marginBottom: 8}}>Najwyższa jakość i bezpieczeństwo</div>
              <div className="feature__label" style={{fontSize: 12.5, textAlign:'left'}}>Prestiżowy certyfikat TÜV NORD 2274-CPR-0046-2025. Zgodność z normami PN-EN 1090-1 i klasą wykonania EXC 2.</div>
            </div>
            <div className="feature" style={{textAlign:'left', padding:'26px 22px'}}>
              <img className="usp-ico" src="uploads/icons/usp-material.webp" alt="" width="44" height="44" loading="lazy" />
              <div style={{fontSize: 14, fontWeight: 700, color:'var(--ink)', marginBottom: 8}}>Trwałe materiały</div>
              <div className="feature__label" style={{fontSize: 12.5, textAlign:'left'}}>Ekstrudowany stop aluminium 6063 odporny na korozję. Malowanie proszkowe chroni przed UV i blaknięciem przez lata.</div>
            </div>
            <div className="feature" style={{textAlign:'left', padding:'26px 22px'}}>
              <img className="usp-ico" src="uploads/icons/usp-estetyka.webp" alt="" width="44" height="44" loading="lazy" />
              <div style={{fontSize: 14, fontWeight: 700, color:'var(--ink)', marginBottom: 8}}>Elegancja i estetyka</div>
              <div className="feature__label" style={{fontSize: 12.5, textAlign:'left'}}>Kolory podstawowe RAL 7016, 9005, 9010 oraz odcienie z najwyższej półki w teksturach drewnopodobnych. Ukryte odprowadzanie wody w profilu.</div>
            </div>
            <div className="feature" style={{textAlign:'left', padding:'26px 22px'}}>
              <img className="usp-ico" src="uploads/icons/usp-sezon.webp" alt="" width="44" height="44" loading="lazy" />
              <div style={{fontSize: 14, fontWeight: 700, color:'var(--ink)', marginBottom: 8}}>Przedłużenie sezonu</div>
              <div className="feature__label" style={{fontSize: 12.5, textAlign:'left'}}>Ochrona przed słońcem, deszczem i wiatrem — od porannej kawy na tarasie po tętniący życiem bar plażowy.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="Jak przebiega realizacja?"
            sub="Od zapytania do gotowej strefy komfortu — wszystko w jednych rękach: doradztwo, projekt, produkcja i montaż." />
          <div ref={stepsRef} className={`steps-wrap ${stepsOn ? 'is-on' : ''}`}>
            <div className="steps__bar" aria-hidden="true">
              <span className="steps__bar-fill" />
              {HOME_STEPS.map((s, i) => <span key={i} className="steps__dot" style={{left: `calc(${i * 20}% + 10%)`, transitionDelay: `${0.4 + i * 0.65}s`}} />)}
            </div>
            <div className="steps">
              {HOME_STEPS.map((s, i) => (
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

      <section className="section section--soft">
        <div className="container">
          <SectionHead title="Najczęstsze pytania"
            sub="Wszystko, co warto wiedzieć przed zamówieniem pergoli — od formalności po eksploatację." />
          <div className="faq">
            {HOME_FAQ.map((f, i) => (
              <details key={i} className="faq__item">
                <summary className="faq__q">{f.q}</summary>
                <p className="faq__a">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section--ink section" style={{padding: '56px 0'}}>
        <div className="container" style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:32}}>
          <div>
            <h2 className="section__title" style={{color:'#fff', marginBottom: 8}}>Porozmawiajmy o Twojej realizacji</h2>
            <p style={{margin:0, color:'rgba(255,255,255,0.75)'}}>Wyślij zapytanie — odezwiemy się w 24 godziny.</p>
          </div>
          <Button variant="primary" size="lg" onClick={onQuote}>Zamów bezpłatną wycenę</Button>
        </div>
      </section>
    </>
  );
}

window.Home = Home;
