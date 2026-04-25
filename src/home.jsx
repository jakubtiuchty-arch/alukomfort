// Strona główna

function Home({ onNavigate, onQuote }) {
  const go = (e, hash) => { e.preventDefault(); onNavigate(hash); };
  usePageMeta({
    title: 'ALUKOMFORT — pergole aluminiowe i zadaszenia tarasów | producent PLAST-MET, Trzebnica',
    description: 'Producent aluminiowych pergol bioklimatycznych i zadaszeń tarasów. Systemy LINEA, HORIZON, ROMA. Certyfikat TÜV NORD, gwarancja 60 mies., bezpłatna wycena w 24h.',
    canonical: 'https://alukomfort.pl/',
  });

  return (
    <>
      <section className="hero hero-home">
        <video
          className="hero__img"
          src="uploads/hero_homepage_1.mp4"
          poster="assets/wiz-d.png"
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
            <h1 className="hero__title hero__title--xl">Komfort niezależnie<br/>od pogody.</h1>
            <p className="hero__sub">
              Zmień swój taras, ogród lub przestrzeń komercyjną w strefę luksusowego wypoczynku.
              Trzy systemy ALUKOMFORT — LINEA, HORIZON i ROMA — dla domu, restauracji, kawiarni i hoteli.
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
              <Icon.Tools size={28} />
              <div>
                <div className="usp-bar__num">30+ lat</div>
                <div className="usp-bar__lab">tradycji PLAST-MET</div>
              </div>
            </div>
            <div className="usp-bar__item">
              <Icon.Shield size={28} />
              <div>
                <div className="usp-bar__num">TÜV NORD</div>
                <div className="usp-bar__lab">2274-CPR-0046-2025 · EN 1090-1</div>
              </div>
            </div>
            <div className="usp-bar__item">
              <Icon.Check size={28} />
              <div>
                <div className="usp-bar__num">60 mies.</div>
                <div className="usp-bar__lab">gwarancji na konstrukcję</div>
              </div>
            </div>
            <div className="usp-bar__item">
              <Icon.Auto size={28} />
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
          <SectionHead title="Trzy systemy ALUKOMFORT — jeden charakter"
            sub="Jako PLAST-MET Systemy Ogrodzeniowe, twórcy marki ALUKOMFORT, oferujemy innowacyjne aluminiowe systemy zadaszeń dla właścicieli domów oraz przestrzeni komercyjnych — restauracji, kawiarni i hoteli." />
          <div className="home-tiles">
            <a href="#/produkty/linea" className="home-tile" onClick={(e)=>go(e,'/produkty/linea')}>
              <div className="home-tile__img" style={{backgroundImage:'url(uploads/linea_kafelek_3.png)'}} />
              <div className="home-tile__scrim" />
              <div className="home-tile__body">
                <div className="home-tile__name">LINEA</div>
                <p className="home-tile__desc">Samonośne zadaszenia aluminiowe do tarasu, wejścia i carportu.</p>
                <span className="home-tile__link">Poznaj LINEA</span>
              </div>
            </a>
            <a href="#/produkty/horizon" className="home-tile" onClick={(e)=>go(e,'/produkty/horizon')}>
              <div className="home-tile__img" style={{backgroundImage:'url(uploads/kafelek_horizon.png)'}} />
              <div className="home-tile__scrim" />
              <div className="home-tile__body">
                <div className="home-tile__name">HORIZON</div>
                <p className="home-tile__desc">Pergole o płaskich dachach — w wersji lamelowej, szklanej lub hybrydowej.</p>
                <span className="home-tile__link">Poznaj HORIZON</span>
              </div>
            </a>
            <a href="#/produkty/roma" className="home-tile" onClick={(e)=>go(e,'/produkty/roma')}>
              <div className="home-tile__img" style={{backgroundImage:'url(uploads/roma_hp.png)'}} />
              <div className="home-tile__scrim" />
              <div className="home-tile__body">
                <div className="home-tile__name">ROMA</div>
                <p className="home-tile__desc">Lekka pergola tkaninowa z roletą rzymską dla strefy relaksu.</p>
                <span className="home-tile__link">Poznaj ROMA</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHead title="Dlaczego warto wybrać systemy ALUKOMFORT?"
            sub="Cztery filary, które odróżniają nasze pergole od tanich zadaszeń dostępnych na rynku." />
          <div className="features" style={{gridTemplateColumns:'repeat(4, 1fr)'}}>
            <div className="feature" style={{textAlign:'left', padding:'26px 22px'}}>
              <div className="feature__icon" style={{margin:'0 0 14px'}}><Icon.Shield size={36}/></div>
              <div style={{fontSize: 14, fontWeight: 700, color:'var(--ink)', marginBottom: 8}}>Najwyższa jakość i bezpieczeństwo</div>
              <div className="feature__label" style={{fontSize: 12.5, textAlign:'left'}}>Prestiżowy certyfikat TÜV NORD 2274-CPR-0046-2025. Zgodność z normami PN-EN 1090-1 i klasą wykonania EXC 2.</div>
            </div>
            <div className="feature" style={{textAlign:'left', padding:'26px 22px'}}>
              <div className="feature__icon" style={{margin:'0 0 14px'}}><Icon.Profile size={36}/></div>
              <div style={{fontSize: 14, fontWeight: 700, color:'var(--ink)', marginBottom: 8}}>Trwałe materiały</div>
              <div className="feature__label" style={{fontSize: 12.5, textAlign:'left'}}>Ekstrudowany stop aluminium 6063 odporny na korozję. Malowanie proszkowe chroni przed UV i blaknięciem przez lata.</div>
            </div>
            <div className="feature" style={{textAlign:'left', padding:'26px 22px'}}>
              <div className="feature__icon" style={{margin:'0 0 14px'}}><Icon.Glass size={36}/></div>
              <div style={{fontSize: 14, fontWeight: 700, color:'var(--ink)', marginBottom: 8}}>Elegancja i estetyka</div>
              <div className="feature__label" style={{fontSize: 12.5, textAlign:'left'}}>Kolory podstawowe RAL 7016, 9005, 9010 oraz premium w teksturach drewnopodobnych. Ukryte odprowadzanie wody w profilu.</div>
            </div>
            <div className="feature" style={{textAlign:'left', padding:'26px 22px'}}>
              <div className="feature__icon" style={{margin:'0 0 14px'}}><Icon.Snow size={36}/></div>
              <div style={{fontSize: 14, fontWeight: 700, color:'var(--ink)', marginBottom: 8}}>Przedłużenie sezonu</div>
              <div className="feature__label" style={{fontSize: 12.5, textAlign:'left'}}>Ochrona przed słońcem, deszczem i wiatrem — od porannej kawy na tarasie po tętniący życiem beach bar.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="Dlaczego aluminium?"
            sub="Materiał, który łączy trwałość z elegancją — bez kompromisów." />
          <div className="features" style={{gridTemplateColumns:'repeat(4, 1fr)'}}>
            <div className="feature"><div className="feature__icon"><Icon.Shield size={36}/></div><div className="feature__label">60 miesięcy gwarancji na konstrukcję</div></div>
            <div className="feature"><div className="feature__icon"><Icon.Snow size={36}/></div><div className="feature__label">Odporność na każdą pogodę</div></div>
            <div className="feature"><div className="feature__icon"><Icon.Leaf size={36}/></div><div className="feature__label">Materiał 100% do recyklingu</div></div>
            <div className="feature"><div className="feature__icon"><Icon.Tools size={36}/></div><div className="feature__label">Bezobsługowa eksploatacja</div></div>
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
