// Podstrona produktu HORIZON

const HORIZON_COLOR_PREVIEWS = {
  'RAL 7016':   'uploads/colors-preview/horizon/ral-7016.webp',
  'RAL 9005':   'uploads/colors-preview/horizon/ral-9005.webp',
  'RAL 9010':   'uploads/colors-preview/horizon/ral-9010.webp',
  'Terra':      'uploads/colors-preview/horizon/terra.webp',
  'Grey Brown': 'uploads/colors-preview/horizon/grey-brown.webp',
  'Mica':       'uploads/colors-preview/horizon/mica.webp',
  'Azzurro':    'uploads/colors-preview/horizon/azzurro.webp',
};

function ProductHorizon({ onQuote }) {
  const p = PRODUCTS.HORIZON;
  const [variant, setVariant] = React.useState('L');
  const active = p.variants.find(v => v.id === variant);
  usePageMeta({
    title: 'HORIZON — pergola bioklimatyczna lamelowa, szklana i hybrydowa | ALUKOMFORT',
    description: 'ALUKOMFORT HORIZON — pergola bioklimatyczna z wieńcem 280 mm. Warianty L (lamele), S (szkło), L-S (hybryda). Sterowanie SOMFY, ściany i LED ukryte w konstrukcji.',
    canonical: 'https://www.zadaszeniatrzebnica.pl/produkty/horizon',
  });
  useProductSchema({
    id: 'horizon',
    name: 'HORIZON',
    description: p.intro,
    image: p.heroImg,
    url: 'https://www.zadaszeniatrzebnica.pl/produkty/horizon',
    category: 'Pergola bioklimatyczna',
  });

  return (
    <>
      <Breadcrumbs items={[
        { label: 'Strona główna', href: '/' },
        { label: 'Produkty', href: '/produkty' },
        { label: `ALUKOMFORT ${p.name}` },
      ]} />

      <section className="hero">
        <video
          className="hero__img"
          src="uploads/linea_hero_2.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.15) translateX(8%)', transformOrigin: 'center' }}
        />
        <div className="hero__scrim" />
        <div className="container hero__inner">
          <div className="hero__content" style={{maxWidth: 420}}>
            <div className="hero__eyebrow">ALUKOMFORT</div>
            <h1 className="hero__title">{p.name}</h1>
            <p className="hero__sub">{p.tagline}</p>
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
          <div className="vselect">
            {p.variants.map(v => (
              <button key={v.id} onClick={()=>setVariant(v.id)}
                className={`vcard ${variant === v.id ? 'is-selected' : ''}`}>
                <div className="vcard__img" style={{backgroundImage: `url(${v.img})`}} />
                <div className="vcard__body">
                  <div className="vcard__name">{v.name}</div>
                  <div className="vcard__desc">{v.desc}</div>
                </div>
              </button>
            ))}
          </div>
          <div className="vdetail">
            <div>
              <h3 className="block-title">{active.name}</h3>
              <p className="small" style={{color:'var(--muted)', lineHeight: 1.65, margin: 0}}>{active.description}</p>
            </div>
            <div>
              <h3 className="block-title">Parametry techniczne — {active.name}</h3>
              {active.specs.map((s, i) => (
                <div key={i} className="spec-row">
                  <span className="spec-row__label">{s.label}</span>
                  <span className="spec-row__value">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="split-2">
            <div>
              <h3 className="block-title">Najważniejsze cechy systemu {p.name}</h3>
              <ul className="iconlist iconlist--check">
                {p.features.map((f, i) => (
                  <li key={i}><span className="ic-check" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>{f.label}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="block-title">Zastosowania</h3>
              <ul className="iconlist iconlist--check">
                {p.uses.map((u, i) => (
                  <li key={i}><span className="ic-check" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>{u.label}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title={`Rodzaje zadaszeń ${p.name}`}
            sub="Gotowe konfiguracje wymiarowe — od kompaktowej pergoli lamelowej 4×3 m po hybrydę 8×4 m łączącą lamele ze szkłem." />
          <div className="hz-modules">
            <table className="model-table">
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Dach</th>
                  <th>Wymiar</th>
                  <th>Charakterystyka</th>
                </tr>
              </thead>
              <tbody>
                {p.models.map(m => (
                  <tr key={m.id}>
                    <td className="model-table__name">{m.name}</td>
                    <td>{m.roof}</td>
                    <td className="model-table__size">{m.size}</td>
                    <td className="model-table__note">{m.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="small hz-modules__note">{p.coreNote}</p>
            <div className="dlux dlux--wide">
              <h4>Konfiguracja HORIZON D-Lux</h4>
              <p>HORIZON D-Lux to najbogatsze wyposażenie oferowane przez ALUKOMFORT — łączy wszystkie atuty systemu:</p>
              <ul>
                {p.dluxSpecs.map((s,i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="Budowa i technologia HORIZON"
            sub="Konstrukcja z wysokiej klasy aluminium na trwałych połączeniach skręcanych. Cała technologia — odwodnienie, LED i automatyka — ukryta jest w wieńcu 280 mm." />
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

      <section className="section section--soft">
        <div className="container">
          <SectionHead title="Personalizacja i dodatki"
            sub="Rozbuduj swoją pergolę HORIZON o sterowanie, oświetlenie i ściany. Wszystkie elementy ukryte są w wieńcu 280 mm — żadnych zewnętrznych kabli ani rur." />
          <div className="features" style={{gridTemplateColumns:'repeat(5, 1fr)'}}>
            {p.addons.map((a, i) => {
              const Ic = a.icon ? (Icon[a.icon] || Icon.Profile) : null;
              return (
                <div key={i} className="feature" style={{textAlign:'left', padding:'22px 18px'}}>
                  <div className="feature__icon" style={{margin:'0 0 12px', width: 44, height: 44}}>{a.img ? <img src={a.img} alt="" width="44" height="44" loading="lazy" /> : <Ic size={32}/>}</div>
                  <div style={{fontSize: 13.5, fontWeight: 700, color:'var(--ink)', marginBottom: 6}}>{a.title}</div>
                  <div className="feature__label" style={{fontSize: 12, textAlign:'left', lineHeight: 1.45}}>{a.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="Przykłady zadaszeń z użyciem systemu HORIZON"
            sub="Sześć scenariuszy realizacji — od przyściennej pergoli lamelowej po zamknięty moduł CORE przy basenie. Każdy projekt dopasowujemy do wymiarów i architektury." />
          <div className="examples">
            {p.examples.map((ex, i) => (
              <figure key={i} className="example">
                <div className="example__img" style={{backgroundImage: `url(${ex.img})`}} role="img" aria-label={ex.title} />
                <figcaption className="example__body">
                  <div className="example__eyebrow">ALUKOMFORT HORIZON</div>
                  <h3 className="example__title">{ex.title}</h3>
                  <p className="example__desc">{ex.desc}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <ColorsSection previews={HORIZON_COLOR_PREVIEWS} />

      <PricingHorizon onQuote={onQuote} />

      <section className="section">
        <div className="container">
          <CertBar />
          <CertDownloads items={p.downloads} title="Dokumenty do pobrania" />
          <CertDownloads />
          <div style={{marginTop: 32, padding: 24, border: '1px solid var(--line)', background: '#fff', borderRadius: 12}}>
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
