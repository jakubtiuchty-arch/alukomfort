// Strona główna

function Home({ onNavigate, onQuote }) {
  const go = (e, hash) => { e.preventDefault(); onNavigate(hash); };

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
            <h1 className="hero__title hero__title--xl">Zadaszenia, które<br/>zmieniają dom.</h1>
            <p className="hero__sub">
              Projektujemy i produkujemy aluminiowe pergole, zadaszenia tarasów i carporty.
              Trzy systemy — LINEA, HORIZON i ROMA — dopasowane do architektury Twojego domu.
            </p>
            <div className="hero__cta">
              <Button variant="primary" size="lg" onClick={onQuote}>Zamów bezpłatną wycenę</Button>
              <Button variant="ghost-light" size="lg" onClick={(e)=>go(e,'/produkty/linea')}>Zobacz produkty</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="Trzy systemy, jeden charakter"
            sub="Każdy z systemów ALUKOMFORT rozwiązuje inny problem. Wybierz ten, który pasuje do Twojej przestrzeni." />
          <div className="home-tiles">
            <a href="#/produkty/linea" className="home-tile" onClick={(e)=>go(e,'/produkty/linea')}>
              <div className="home-tile__img" style={{backgroundImage:'url(uploads/linea_kafelek_3.png)'}} />
              <div className="home-tile__scrim" />
              <div className="home-tile__body">
                <div className="home-tile__eyebrow">ALUKOMFORT</div>
                <div className="home-tile__name">LINEA</div>
                <p className="home-tile__desc">Samonośne zadaszenia aluminiowe do tarasu, wejścia i carportu.</p>
                <span className="home-tile__link">Poznaj LINEA</span>
              </div>
            </a>
            <a href="#/produkty/horizon" className="home-tile" onClick={(e)=>go(e,'/produkty/horizon')}>
              <div className="home-tile__img" style={{backgroundImage:'url(assets/horizon-l-04.jpg)'}} />
              <div className="home-tile__scrim" />
              <div className="home-tile__body">
                <div className="home-tile__eyebrow">ALUKOMFORT</div>
                <div className="home-tile__name">HORIZON</div>
                <p className="home-tile__desc">Pergole o płaskich dachach — w wersji lamelowej, szklanej lub hybrydowej.</p>
                <span className="home-tile__link">Poznaj HORIZON</span>
              </div>
            </a>
            <a href="#/produkty/roma" className="home-tile" onClick={(e)=>go(e,'/produkty/roma')}>
              <div className="home-tile__img" style={{backgroundImage:'url(uploads/roma_hp.png)'}} />
              <div className="home-tile__scrim" />
              <div className="home-tile__body">
                <div className="home-tile__eyebrow">ALUKOMFORT</div>
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
          <SectionHead title="Dlaczego aluminium?"
            sub="Trwały materiał odporny na wilgoć, słońce i mróz — bez konserwacji. Lekki w montażu, elegancki w wykończeniu." />
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
