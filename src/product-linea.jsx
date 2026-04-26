// Podstrona produktu LINEA

function ProductLinea({ onQuote }) {
  const p = PRODUCTS.LINEA;
  const [roof, setRoof] = React.useState('poli');
  const [roofColor, setRoofColor] = React.useState(0);
  usePageMeta({
    title: 'LINEA — aluminiowe zadaszenie tarasu, wejścia i carportu | ALUKOMFORT',
    description: 'ALUKOMFORT LINEA — aluminiowy system zadaszeń przyściennych i samonośnych. Max długość 10 060 mm, dach poliwęglan lub szkło ESG/VSG. Producent PLAST-MET Trzebnica.',
    canonical: 'https://alukomfort.pl/#/produkty/linea',
  });
  useProductSchema({
    id: 'linea',
    name: 'LINEA',
    description: p.intro,
    image: p.heroImg,
    url: 'https://alukomfort.pl/#/produkty/linea',
    category: 'Aluminiowe zadaszenie tarasu',
  });
  const activeRoof = p.roofs.find(r => r.id === roof) || p.roofs[0];
  const activeOptions = activeRoof.options || [];
  React.useEffect(() => { setRoofColor(0); }, [roof]);

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
          src="uploads/linea_hero_3.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="hero__scrim" />
        <div className="container hero__inner">
          <div className="hero__content">
            <div className="hero__eyebrow">ALUKOMFORT</div>
            <h1 className="hero__title">{p.name}</h1>
            <p className="hero__sub">{p.tagline} {p.description}</p>
            <div className="hero__cta">
              <Button variant="primary" size="lg" onClick={onQuote}>Poproś o bezpłatną wycenę</Button>
              <Button variant="ghost-light" size="lg">Zobacz dostępne konfiguracje</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="Jedna konstrukcja, wiele zastosowań" sub={p.intro} />
          <div className="usecases">
            {p.usecases.map((u, i) => {
              const Ic = Icon[u.icon];
              return (
                <div key={i} className="usecase">
                  <div className="usecase__icon"><Ic size={40} /></div>
                  <div className="usecase__label">{u.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHead title={`Najważniejsze cechy systemu ${p.name}`} />
          <div className="features">
            {p.features.map((f, i) => {
              const Ic = Icon[f.icon];
              return (
                <div key={i} className="feature">
                  <div className="feature__icon"><Ic size={36} /></div>
                  <div className="feature__label">{f.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split-2">
            <div>
              <h3 className="block-title">Parametry techniczne</h3>
              {p.specs.map((s, i) => (
                <div key={i} className="spec-row">
                  <span className="spec-row__label">{s.label}</span>
                  <span className="spec-row__value">{s.value}</span>
                </div>
              ))}
            </div>
            <div>
              <h3 className="block-title">Wybierz rodzaj dachu</h3>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
                {p.roofs.map(r => (
                  <button key={r.id} onClick={()=>setRoof(r.id)}
                    className={`variant ${roof === r.id ? 'is-selected' : ''}`}>
                    <div className="variant__name">{r.name}</div>
                    <div className="variant__desc">{r.desc}</div>
                  </button>
                ))}
              </div>
              <div style={{marginTop: 20, display:'grid', gridTemplateColumns:`repeat(${Math.max(activeOptions.length, 3)}, 1fr)`, gap:10}}>
                {activeOptions.map((o, i) => (
                  <div key={i} className={`swatch ${roofColor === i ? 'is-selected' : ''}`} onClick={()=>setRoofColor(i)}>
                    <div className="swatch__chip" style={{background: o.hex}} />
                    <span className="swatch__name" style={{fontSize: 11}}>{o.name}</span>
                    <span className="swatch__code">{o.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHead title="Zadaszenia bez kompromisów"
            sub="Sześć opcjonalnych modułów, które pozwalają zamknąć przestrzeń pergoli, kontrolować światło i podnieść komfort użytkowania." />
          <div className="features" style={{gridTemplateColumns:'repeat(3, 1fr)'}}>
            {p.addons.map((a, i) => {
              const Ic = Icon[a.icon] || Icon.Profile;
              return (
                <div key={i} className="feature" style={{textAlign:'left', padding:'24px 22px'}}>
                  <div className="feature__icon" style={{margin:'0 0 14px'}}><Ic size={34}/></div>
                  <div style={{fontSize: 14, fontWeight: 700, color:'var(--ink)', marginBottom: 6}}>{a.title}</div>
                  <div className="feature__label" style={{fontSize: 12.5, textAlign:'left'}}>{a.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="Trzy gotowe typy zadaszeń LINEA"
            sub="Najczęstsze scenariusze realizacji — każdy w pełni dopasowany do wymiarów działki i sposobu użytkowania." />
          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 20}}>
            {p.scenarios.map((s, i) => (
              <div key={i} style={{padding: 26, background:'#fff', border:'1px solid var(--line)'}}>
                <div style={{fontSize: 11, letterSpacing: 2, color:'var(--muted)', marginBottom: 10}}>ALUKOMFORT LINEA</div>
                <h3 className="block-title" style={{marginBottom: 10}}>{s.title}</h3>
                <p className="small" style={{margin: 0, color:'var(--muted)'}}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section--ink section" style={{padding:'40px 0'}}>
        <div className="container" style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap: 24, flexWrap:'wrap'}}>
          <div>
            <h3 style={{margin: 0, color:'#fff', fontSize: 22, fontWeight: 700}}>Określ podstawowe wymiary zadaszenia</h3>
            <p style={{margin:'6px 0 0', color:'rgba(255,255,255,0.75)'}}>A my dopasujemy resztę — profil, dach, ściany i wykończenie.</p>
          </div>
          <Button variant="primary" size="lg" onClick={onQuote}>Zamów bezpłatną wycenę</Button>
        </div>
      </section>

      <ColorsSection />

      <section className="section">
        <div className="container">
          <CertBar />
        </div>
      </section>

      <section style={{background:'#b8851a', color:'#1a1200', padding:'34px 0'}}>
        <div className="container" style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:24}}>
          <h3 style={{margin:0, fontSize:22, fontWeight:700}}>Zaprojektuj zadaszenie LINEA do swojego domu</h3>
          <Button variant="ghost-dark" size="lg" onClick={onQuote}>Umów wycenę</Button>
        </div>
      </section>
    </>
  );
}

window.ProductLinea = ProductLinea;
