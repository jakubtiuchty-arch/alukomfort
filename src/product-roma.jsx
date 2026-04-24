// Podstrona produktu ROMA

function ProductRoma({ onQuote }) {
  const p = PRODUCTS.ROMA;
  const [module, setModule] = React.useState(2); // 4x4

  return (
    <>
      <Breadcrumbs items={[
        { label: 'Strona główna', href: '#/' },
        { label: 'Produkty', href: '#/produkty' },
        { label: `ALUKOMFORT ${p.name}` },
      ]} />

      <section className="hero">
        <video
          className="hero__img"
          src="uploads/roma_hero_2.mp4"
          poster={p.heroImg}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedMetadata={(e) => { e.currentTarget.playbackRate = 0.5; }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="hero__scrim" />
        <div className="container hero__inner">
          <div className="hero__content">
            <div className="hero__eyebrow">ALUKOMFORT</div>
            <h1 className="hero__title">{p.name}</h1>
            <p className="hero__sub">{p.tagline}</p>
            <div className="hero__cta">
              <Button variant="primary" size="lg" onClick={onQuote}>Zobacz dostępne wymiary</Button>
              <Button variant="ghost-light" size="lg" onClick={onQuote}>Zamów wycenę</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="Nowoczesna pergola tkaninowa do tarasu i ogrodu" sub={p.intro} />
        </div>
      </section>

      <section className="section" style={{paddingTop: 0}}>
        <div className="container">
          <SectionHead title="Tak wygląda konstrukcja ROMA"
            sub="Schematyczne zobrazowanie zadaszeń ALUKOMFORT ROMA. Donice z roślinami oraz siatka aluminiowa są elementami dekoracyjnymi. Ustawienie słupów konstrukcyjnych jest opcjonalne." />
          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 20}}>
            {[
              { src: 'uploads/Roma_3.jpg', alt: 'Pergola ROMA — widok od frontu, roleta zwinięta', caption: 'Widok od frontu — roleta zwinięta' },
              { src: 'uploads/Roma_4.jpg', alt: 'Pergola ROMA — widok z boku', caption: 'Widok z boku — smukła rama aluminiowa' },
              { src: 'uploads/Roma_2.jpg', alt: 'Pergola ROMA — roleta rzymska w pełni rozłożona', caption: 'Roleta rozłożona — strefa cienia' },
            ].map((it, i) => (
              <figure key={i} style={{margin: 0}}>
                <div style={{aspectRatio: '3/2', background:'#fff', border:'1px solid var(--line)', overflow:'hidden'}}>
                  <img src={it.src} alt={it.alt} loading="lazy" style={{width:'100%', height:'100%', objectFit:'contain', display:'block'}} />
                </div>
                <figcaption className="small" style={{marginTop: 10, color:'var(--muted)'}}>{it.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft" style={{paddingTop: 24}}>
        <div className="container">
          <div className="split-2">
            <div>
              <h3 className="block-title">Co wyróżnia pergolę ROMA</h3>
              <div className="features" style={{gridTemplateColumns: 'repeat(3, 1fr)'}}>
                {p.features.map((f, i) => {
                  const Ic = Icon[f.icon];
                  return (
                    <div key={i} className="feature">
                      <div className="feature__icon"><Ic size={34} /></div>
                      <div className="feature__label">{f.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <h3 className="block-title">Dostępne moduły</h3>
              <div className="mod-grid">
                {p.modules.map((m, i) => (
                  <button key={i} onClick={()=>setModule(i)}
                    className={`mod-card ${module === i ? 'mod-card--big' : ''}`}
                    style={{
                      borderColor: module === i ? 'var(--accent)' : 'var(--ink)',
                      background: module === i ? 'var(--ink)' : '#fff',
                      color: module === i ? '#fff' : 'var(--ink)',
                    }}>
                    {m.w} × {m.h}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split-2">
            <div>
              <div style={{display:'flex', gap: 16, alignItems:'flex-start'}}>
                <div style={{width:40, flex:'0 0 40px'}}><Icon.Leaf size={36} /></div>
                <div>
                  <h3 className="block-title" style={{marginBottom: 6}}>Idealna do przydomowej strefy relaksu</h3>
                  <p className="small" style={{margin: 0, color: 'var(--muted)'}}>Pergola ROMA sprawdza się doskonale jako:</p>
                </div>
              </div>
              <ul className="iconlist" style={{marginTop: 20}}>
                <li><span className="ic"><Icon.Terrace size={26}/></span>Zadaszenie tarasu i balkonu</li>
                <li><span className="ic"><Icon.Commercial size={26}/></span>Strefy gastronomiczne, takie jak restauracje, kawiarnie i hotele</li>
              </ul>
            </div>
            <div>
              <h3 className="block-title">Dostępne moduły</h3>
              <p className="small">Wybrany moduł: <strong style={{color:'var(--ink)'}}>{p.modules[module].w} × {p.modules[module].h} m</strong></p>
              <p className="small">Konstrukcja pergoli ROMA projektowana jest indywidualnie pod realizację klienta. Systemy wykonywane są w klasycznej aluminiowej ramie lub z minimalistyczną linią.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHead title="Co wchodzi w skład systemu tkaninowego" />
          <div style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap: 10}}>
            {p.components.map((c, i) => {
              const Ic = Icon[c.icon];
              return (
                <div key={i} className="feature">
                  <div className="feature__icon"><Ic size={32} /></div>
                  <div className="feature__label" style={{fontSize:11.5}}>{c.label}</div>
                </div>
              );
            })}
          </div>
          <div style={{marginTop: 32, padding: 24, background: '#fff', border:'1px solid var(--line)', display:'flex', gap: 14, alignItems:'flex-start'}}>
            <Icon.Leaf size={32} />
            <p className="small" style={{margin: 0, fontSize: 13}}>
              Dzięki ramom z aluminium i siatki aluminiowej ze stelażami dekoracyjnymi. Ustawianie słupów konstrukcyjnych jest opcjonalne.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="Systemy wykończenia ścian"
            sub="Siedem systemów do dowolnego łączenia — od ażurowych żaluzji, przez szyby przesuwne, po pełne panele aluminiowe. Każda ściana pełni inną rolę: reguluje światło i przewiew, tłumi hałas, chroni przed deszczem albo dzieli strefy w pergoli." />
          <figure style={{margin: 0}}>
            <div style={{background:'#fff', border:'1px solid var(--line)', padding: 24}}>
              <img
                src="uploads/wykończenia_ścian.png"
                alt="Schemat siedmiu systemów wykończenia ścian ALUKOMFORT: żaluzja pionowa, fix, roleta-screen, żaluzja pozioma, system szyb przesuwnych, alux pionowy, alux poziomy"
                loading="lazy"
                style={{width:'100%', height:'auto', display:'block'}}
              />
            </div>
            <figcaption className="small" style={{marginTop: 10, color:'var(--muted)', textAlign:'center'}}>
              Schematyczne zobrazowanie systemów wykończenia ścian w zadaszeniach ALUKOMFORT.
            </figcaption>
          </figure>
        </div>
      </section>

      <ColorsSection />

      <section className="section">
        <div className="container">
          <CertBar />
          <div style={{marginTop: 32}}>
            <div className="guarantee">
              <div className="guarantee__ic"><Icon.Shield /></div>
              <div className="guarantee__body" style={{maxWidth: 520}}>
                <h4>Gwarancja</h4>
                {p.specs.map((s, i) => (
                  <div key={i} className="guarantee__row"><span>{s.label}</span><span>{s.value}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{background: '#ece7dc', padding:'34px 0'}}>
        <div className="container" style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:24}}>
          <h3 style={{margin:0, fontSize:22, fontWeight:700, color:'var(--ink)'}}>Stwórz lekką, elegancką strefę cienia przy swoim domu</h3>
          <Button variant="primary" size="lg" onClick={onQuote}>Zapytaj o pergolę ROMA</Button>
        </div>
      </section>
    </>
  );
}

window.ProductRoma = ProductRoma;
