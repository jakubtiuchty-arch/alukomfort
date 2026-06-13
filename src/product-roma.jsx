// Podstrona produktu ROMA

const ROMA_COLOR_PREVIEWS = {
  'RAL 7016':      'uploads/colors-preview/roma/ral-7016.jpg',
  'RAL 9005':      'uploads/colors-preview/roma/ral-9005.jpg',
  'RAL 9010':      'uploads/colors-preview/roma/ral-9010.jpg',
  'RAL 7039':      'uploads/colors-preview/roma/ral-7039.jpg',
  'Czarna wiśnia': 'uploads/colors-preview/roma/wisnia.jpg',
  'Sosna':         'uploads/colors-preview/roma/sosna.jpg',
  'Srebrny dąb':   'uploads/colors-preview/roma/srebrny.jpg',
  'Złoty dąb':     'uploads/colors-preview/roma/zloty.jpg',
};

function ProductRoma({ onQuote }) {
  const p = PRODUCTS.ROMA;
  const [module, setModule] = React.useState(2); // 4x4
  usePageMeta({
    title: 'ROMA — pergola tkaninowa z roletą rzymską z akrylu | ALUKOMFORT',
    description: 'ALUKOMFORT ROMA — pergola tkaninowa z poszyciem 100% akryl. Modułowość 3×3, 4×4, 6×4 m, łączliwa. Idealna dla beach barów, restauracji i tarasów domowych.',
    canonical: 'https://alukomfort.pl/#/produkty/roma',
  });
  useProductSchema({
    id: 'roma',
    name: 'ROMA',
    description: p.intro,
    image: p.heroImg,
    url: 'https://alukomfort.pl/#/produkty/roma',
    category: 'Pergola tkaninowa',
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
          src="uploads/roma_hero_2.mp4"
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
          <p className="small" style={{marginTop: 18, textAlign:'center', color:'var(--muted)'}}>
            Schematyczne zobrazowanie zadaszeń ALUKOMFORT ROMA. Donice z roślinami oraz siatka aluminiowa są elementami dekoracyjnymi. Ustawienie słupów konstrukcyjnych jest opcjonalne.
          </p>
        </div>
      </section>

      <section className="section section--soft" style={{paddingTop: 24}}>
        <div className="container">
          <div className="split-2">
            <div>
              <h3 className="block-title">Co wyróżnia pergolę ROMA</h3>
              <div className="features" style={{gridTemplateColumns: 'repeat(3, 1fr)'}}>
                {p.features.map((f, i) => {
                  const Ic = f.icon ? Icon[f.icon] : null;
                  return (
                    <div key={i} className="feature">
                      <div className="feature__icon" style={{width: 46, height: 46}}>{f.img ? <img src={f.img} alt="" width="46" height="46" loading="lazy" /> : <Ic size={34} />}</div>
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
          <h3 className="block-title">Parametry techniczne ROMA</h3>
          <div className="specs-2col">
            {p.techSpecs.map((s, i) => (
              <div key={i} className="spec-row">
                <span className="spec-row__label">{s.label}</span>
                <span className="spec-row__value">{s.value}</span>
              </div>
            ))}
          </div>
          <p className="small" style={{marginTop: 18, color:'var(--muted)', maxWidth: 760}}>{p.rainNote}</p>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHead title="Co wchodzi w skład systemu tkaninowego" />
          <div style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap: 10}}>
            {p.components.map((c, i) => {
              const Ic = c.icon ? Icon[c.icon] : null;
              return (
                <div key={i} className="feature">
                  <div className="feature__icon" style={{width: 60, height: 60, margin: '4px auto 14px'}}>{c.img ? <img src={c.img} alt="" width="60" height="60" loading="lazy" /> : <Ic size={32} />}</div>
                  <div className="feature__label" style={{fontSize:12}}>{c.label}</div>
                </div>
              );
            })}
          </div>
          <div style={{marginTop: 32, padding: 24, background: '#fff', border:'1px solid var(--line)', display:'flex', gap: 14, alignItems:'flex-start'}}>
            <Icon.Leaf size={32} />
            <p className="small" style={{margin: 0, fontSize: 13}}>
              Rama wykonana jest w całości z aluminium, a siatki ze stelażami dekoracyjnymi pozwalają prowadzić pnącza i naturalnie dzielić strefy. Ustawienie słupów konstrukcyjnych jest opcjonalne — konstrukcję projektujemy indywidualnie pod realizację klienta.
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

      <section className="section section--soft">
        <div className="container">
          <SectionHead title="Przykłady zadaszeń z użyciem systemu ROMA"
            sub="Sześć scenariuszy realizacji — od przydomowej strefy wypoczynku po wielomodułowy taras restauracji. Każdy projekt dopasowujemy do przestrzeni i sposobu użytkowania." />
          <div className="examples">
            {p.examples.map((ex, i) => (
              <figure key={i} className="example">
                <div className="example__img" style={{backgroundImage: `url(${ex.img})`}} role="img" aria-label={ex.title} />
                <figcaption className="example__body">
                  <div className="example__eyebrow">ALUKOMFORT ROMA</div>
                  <h3 className="example__title">{ex.title}</h3>
                  <p className="example__desc">{ex.desc}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <ColorsSection previews={ROMA_COLOR_PREVIEWS} />

      <section className="section">
        <div className="container">
          <CertBar guarantee={p.specs} />
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
