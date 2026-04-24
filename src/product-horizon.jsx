// Podstrona produktu HORIZON

function ProductHorizon({ onQuote }) {
  const p = PRODUCTS.HORIZON;
  const [variant, setVariant] = React.useState('L');
  const active = p.variants.find(v => v.id === variant);

  return (
    <>
      <Breadcrumbs items={[
        { label: 'Strona główna', href: '#/' },
        { label: 'Produkty', href: '#/produkty' },
        { label: `ALUKOMFORT ${p.name}` },
      ]} />

      <section className="hero">
        <div className="hero__img" style={{ backgroundImage: `url(${p.heroImg})` }} />
        <div className="hero__scrim" />
        <div className="container hero__inner">
          <div className="hero__content">
            <div className="hero__eyebrow">ALUKOMFORT</div>
            <h1 className="hero__title">{p.name}</h1>
            <p className="hero__sub">{p.tagline} {p.description}</p>
            <div className="hero__cta">
              <Button variant="primary" size="lg" onClick={onQuote}>Zamów bezpłatną wycenę</Button>
              <Button variant="ghost-light" size="lg">Porównaj wersje systemu</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="Nowoczesne pergole aluminiowe o szerokich możliwościach zabudowy" sub={p.intro} />
          <div className="variants" style={{maxWidth: 860, margin: '0 auto'}}>
            {p.variants.map(v => (
              <button key={v.id} onClick={()=>setVariant(v.id)}
                className={`variant ${variant === v.id ? 'is-selected' : ''}`}>
                <div className="variant__name">{v.name}</div>
                <div className="variant__desc">{v.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="split-2">
            <div>
              <h3 className="block-title">Najważniejsze cechy systemu {p.name}</h3>
              <ul className="checklist">
                {p.features.map((f, i) => (
                  <li key={i}><span className="dot" />{f}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="block-title">Zastosowania</h3>
              <ul className="iconlist">
                {p.uses.map((u, i) => {
                  const Ic = Icon[u.icon];
                  return <li key={i}><span className="ic"><Ic size={26} /></span>{u.label}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split-2">
            <div>
              <h3 className="block-title">Parametry techniczne {p.name}</h3>
              {p.specs.map((s, i) => (
                <div key={i} className="spec-row">
                  <span className="spec-row__label">{s.label}</span>
                  <span className="spec-row__value">{s.value}</span>
                </div>
              ))}
            </div>
            <div>
              <h3 className="block-title">Wybierz rodzaj zadaszenia</h3>
              <div className="variants">
                {p.variants.map(v => (
                  <button key={v.id} onClick={()=>setVariant(v.id)}
                    className={`variant ${variant === v.id ? 'is-selected' : ''}`} style={{padding: 14}}>
                    <div className="variant__img" style={{backgroundImage: `url(${v.img})`}} />
                    <div className="variant__name">{v.name}</div>
                    <div className="variant__desc">{v.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="split-2">
            <div>
              <h3 className="block-title">Rodzaje zadaszeń {p.name}</h3>
              <div className="models">
                {p.models.map(m => (
                  <div key={m.id} className="model">
                    <div className="model__img" style={{backgroundImage: `url(${m.img})`}} />
                    <div className="model__body">
                      <h4 className="model__name">{m.name}</h4>
                      <p className="model__desc">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="dlux">
                <h4>Konfiguracja HORIZON D-Lux</h4>
                <p>HORIZON D-Lux to najbogatsze wyposażenie oferowane przez ALUKOMFORT — łączy wszystkie atuty systemu:</p>
                <ul>
                  {p.dluxSpecs.map((s,i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ColorsSection />

      <section className="section">
        <div className="container">
          <CertBar />
          <div style={{marginTop: 32, padding: 24, border: '1px solid var(--line)', background: '#fff'}}>
            <h4 style={{margin: '0 0 8px', fontSize: 14, fontWeight: 700}}>HORIZON — projekty indywidualne</h4>
            <p className="small" style={{margin: 0}}>Realizujemy autorskie projekty na miarę. Wykonujemy projekty indywidualne, które wychodzą poza standard i dopasowujemy konstrukcję do Twojej przestrzeni, otaczającej architektury i funkcji.</p>
          </div>
        </div>
      </section>

      <section className="hero-strip hero-strip--accent">
        <div className="container hero-strip__inner">
          <h3>Porównaj warianty HORIZON i wybierz najlepszy dla swojego domu</h3>
          <Button variant="primary" size="lg" onClick={onQuote}>Pobierz porównanie wersji</Button>
        </div>
      </section>
    </>
  );
}

window.ProductHorizon = ProductHorizon;
