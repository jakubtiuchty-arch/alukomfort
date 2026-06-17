// Podstrona produktu LINEA

const LINEA_COLOR_PREVIEWS = {
  'RAL 7016':   'uploads/colors-preview/linea/ral-7016.webp',
  'RAL 9005':   'uploads/colors-preview/linea/ral-9005.webp',
  'RAL 9010':   'uploads/colors-preview/linea/ral-9010.webp',
  'Terra':      'uploads/colors-preview/linea/terra.webp',
  'Grey Brown': 'uploads/colors-preview/linea/grey-brown.webp',
  'Mica':       'uploads/colors-preview/linea/mica.webp',
  'Azzurro':    'uploads/colors-preview/linea/azzurro.webp',
};

function ProductLinea({ onQuote }) {
  const p = PRODUCTS.LINEA;
  usePageMeta({
    title: 'LINEA — aluminiowa pergola i zadaszenie tarasu | ALUKOMFORT',
    description: 'ALUKOMFORT LINEA — aluminiowa pergola tarasowa i zadaszenie przyścienne lub samonośne. Dach z poliwęglanu lub szkła ESG/VSG, długość do 10 060 mm. Producent PLAST-MET, Trzebnica.',
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
              const Ic = u.icon ? Icon[u.icon] : null;
              return (
                <div key={i} className="usecase">
                  <div className="usecase__icon">
                    {u.img ? <img src={u.img} alt="" width="53" height="53" loading="lazy" /> : <Ic size={40} />}
                  </div>
                  <div className="usecase__label">{u.label}</div>
                </div>
              );
            })}
          </div>
          <p className="small" style={{marginTop: 18, color:'var(--muted)', textAlign:'center'}}>
            Sprawdza się też w przestrzeni miejskiej i komercyjnej — jako wiaty rowerowe, zadaszenia przystanków czy wiaty na pojemniki na odpady.
          </p>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHead title={`Najważniejsze cechy systemu ${p.name}`}
            sub="Sześć atutów, które składają się na trwałość, estetykę i komfort codziennego użytkowania." />
          <FeatureList items={p.features} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h3 className="block-title">Parametry techniczne</h3>
          <div className="specs-2col">
            {p.specs.map((s, i) => (
              <div key={i} className="spec-row">
                <span className="spec-row__label">{s.label}</span>
                <span className="spec-row__value">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHead title="Z czego zbudowany jest system LINEA"
            sub="Kompletny zestaw profili aluminiowych z ekstruzji, połączonych w sztywną i szczelną konstrukcję. Poznaj elementy, z których składamy każde zadaszenie." />
          <div className="buildgrid">
            {p.construction.map((c, i) => (
              <div key={i} className="buildgrid__item">
                <div className="buildgrid__name">{c.name}</div>
                <p className="buildgrid__desc">{c.desc}</p>
              </div>
            ))}
          </div>
          {p.constructionNote && (
            <p className="small" style={{marginTop: 20, color:'var(--muted)', maxWidth: 820}}>{p.constructionNote}</p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="Zadaszenia bez kompromisów"
            sub="Sześć opcjonalnych modułów, które pozwalają zamknąć przestrzeń pergoli, kontrolować światło i podnieść komfort użytkowania." />
          <div className="features" style={{gridTemplateColumns:'repeat(3, 1fr)'}}>
            {p.addons.map((a, i) => {
              const Ic = a.icon ? (Icon[a.icon] || Icon.Profile) : null;
              return (
                <div key={i} className="feature" style={{textAlign:'left', padding:'24px 22px'}}>
                  <div className="feature__icon" style={{margin:'0 0 14px', width: 48, height: 48}}>
                    {a.img ? <img src={a.img} alt="" width="48" height="48" loading="lazy" /> : <Ic size={34}/>}
                  </div>
                  <div style={{fontSize: 14, fontWeight: 700, color:'var(--ink)', marginBottom: 6}}>{a.title}</div>
                  <div className="feature__label" style={{fontSize: 12.5, textAlign:'left'}}>{a.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHead title="Przykłady zadaszeń z użyciem systemu LINEA"
            sub="Sześć scenariuszy realizacji — od wiaty samochodowej po zamknięty ogród letni. Każdy w pełni dopasowany do wymiarów działki i sposobu użytkowania." />
          <div className="examples">
            {p.examples.map((ex, i) => (
              <figure key={i} className="example">
                <div className="example__img" style={{backgroundImage: `url(${ex.img})`}} role="img" aria-label={ex.title} />
                <figcaption className="example__body">
                  <div className="example__eyebrow">ALUKOMFORT LINEA</div>
                  <h3 className="example__title">{ex.title}</h3>
                  <p className="example__desc">{ex.desc}</p>
                </figcaption>
              </figure>
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

      <ColorsSection previews={LINEA_COLOR_PREVIEWS} roofs={p.roofs} />

      <PricingLinea onQuote={onQuote} />

      <section className="section">
        <div className="container">
          <CertBar />
          <CertDownloads items={p.downloads} title="Dokumenty do pobrania" />
          <CertDownloads />
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

function FeatureList({ items }) {
  const ref = React.useRef(null);
  const [on, setOn] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) { setOn(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`featgrid ${on ? 'is-on' : ''}`}>
      {items.map((f, i) => (
        <div key={i} className="featcard" style={{ transitionDelay: `${(i % 3) * 0.08 + Math.floor(i / 3) * 0.05}s` }}>
          <span className="featcard__num">{String(i + 1).padStart(2, '0')}</span>
          <p className="featcard__label">{f.label}</p>
        </div>
      ))}
    </div>
  );
}

window.ProductLinea = ProductLinea;
