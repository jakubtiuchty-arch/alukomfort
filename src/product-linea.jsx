// Podstrona produktu LINEA

const LINEA_COLOR_PREVIEWS = {
  'RAL 7016':      'uploads/colors-preview/linea/ral-7016.jpg',
  'RAL 9005':      'uploads/colors-preview/linea/ral-9005.jpg',
  'RAL 9010':      'uploads/colors-preview/linea/ral-9010.jpg',
  'RAL 7039':      'uploads/colors-preview/linea/ral-7039.jpg',
  'Czarna wiśnia': 'uploads/colors-preview/linea/wisnia.jpg',
  'Sosna':         'uploads/colors-preview/linea/sosna.jpg',
  'Srebrny dąb':   'uploads/colors-preview/linea/srebrny.jpg',
  'Złoty dąb':     'uploads/colors-preview/linea/zloty.jpg',
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
          <SectionHead title="Pokrycia dachowe — poliwęglan i szkło"
            sub="Przepuszczalność światła i charakter dachu dobierasz indywidualnie. Każdy wariant to inny balans jasności, ochrony przed słońcem i estetyki." />
          <div className="covergrid">
            {p.coverings.map((cv, i) => (
              <div key={i} className="cover-group">
                <h3 className="cover-group__title">{cv.group}</h3>
                <p className="cover-group__desc">{cv.desc}</p>
                <ul className="cover-group__list">
                  {cv.items.map((it, j) => (
                    <li key={j}><span className="cover-group__name">{it.name}</span><span className="cover-group__sub">{it.sub}</span></li>
                  ))}
                </ul>
                <p className="cover-group__params">{cv.params}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHead title="Montaż i odprowadzanie wody"
            sub={p.mounting.intro} />
          <div className="mount-2col">
            <div className="mount-card">
              <h4 className="mount-card__head">Konstrukcja zintegrowana z budynkiem</h4>
              <p className="mount-card__note">Mocowana do ściany — gdy materiał nośny na to pozwala:</p>
              <div className="mount-chips">{p.mounting.integrated.map((m, i) => <span key={i} className="mount-chip">{m}</span>)}</div>
            </div>
            <div className="mount-card">
              <h4 className="mount-card__head">Konstrukcja samonośna</h4>
              <p className="mount-card__note">Na własnych słupach, niezależna od ściany:</p>
              <div className="mount-chips">{p.mounting.freestanding.map((m, i) => <span key={i} className="mount-chip">{m}</span>)}</div>
            </div>
          </div>
          <p className="small" style={{marginTop: 18, color:'var(--muted)', maxWidth: 820}}>{p.mounting.note}</p>
          <div style={{marginTop: 18, padding: 20, background:'#fff', border:'1px solid var(--line)', borderRadius: 12}}>
            <h4 style={{margin:'0 0 6px', fontSize: 14, fontWeight: 700}}>Ukryte odprowadzanie wody</h4>
            <p className="small" style={{margin: 0, color:'var(--muted)'}}>{p.mounting.drainage}</p>
          </div>
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
            sub="Sześć scenariuszy realizacji — od carportu po zamknięty ogród zimowy. Każdy w pełni dopasowany do wymiarów działki i sposobu użytkowania." />
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

      <section className="section">
        <div className="container">
          <SectionHead title="Pielęgnacja i trwałość"
            sub="Aluminium 6063 jest praktycznie bezobsługowe. Kilka prostych zasad utrzyma zadaszenie w pełnej formie przez lata." />
          <ul className="iconlist iconlist--check" style={{maxWidth: 900, margin: '0 auto'}}>
            {p.care.map((c, i) => (
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
