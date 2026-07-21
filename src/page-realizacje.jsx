// Strona /realizacje — wizytówka zrealizowanych zadaszeń

const REALIZACJE_CASES = [
  {
    key: 'horizon-ogrod',
    eyebrow: 'REALIZACJA · DOM JEDNORODZINNY',
    title: 'Przeszklony ogród letni przy domu',
    desc: 'Przyścienny moduł HORIZON w pełnej zabudowie szklanej — elegancki ogród letni zintegrowany z bryłą nowoczesnego domu. Smukły antracytowy wieniec kryje całą technologię, a ściany ze szkła przesuwnego otwierają wnętrze na taras i ogród. Całość osadzona na betonowym murku z donicami.',
    image: 'uploads/realizacje-web/horizon-ogrod-glowne.webp?v=2',
    meta: [
      { label: 'System',     value: 'HORIZON przyścienny' },
      { label: 'Zabudowa',   value: 'Ściany szklane przesuwne' },
      { label: 'Forma',      value: 'Zamknięty ogród letni' },
      { label: 'Kolor',      value: 'Antracyt' },
    ],
    photos: [
      { src: 'uploads/realizacje-web/real_4_1.webp', alt: 'Przeszklony moduł HORIZON przy domu — narożnik z antracytowym wieńcem' },
      { src: 'uploads/realizacje-web/real_4_2.webp', alt: 'Szklane ściany przesuwne na betonowym murku z donicami — detal' },
      { src: 'uploads/realizacje-web/real_4_3.webp', alt: 'Ogród letni HORIZON zintegrowany z bryłą domu — widok frontalny' },
      { src: 'uploads/realizacje-web/real_4_4.webp', alt: 'Moduł HORIZON przy nowoczesnym domu jednorodzinnym — widok z tarasu' },
    ],
  },
  {
    key: 'taras-panele',
    eyebrow: 'REALIZACJA · DOM JEDNORODZINNY',
    title: 'Zadaszenie tarasu z zabudową żaluzjową i przeszkleniem',
    desc: 'Przyścienne zadaszenie ALUKOMFORT LINEA nad tarasem nowego domu jednorodzinnego. Mleczny dach z poliwęglanu opal rozprasza światło i nie nagrzewa tarasu, a ściany z poziomych paneli żaluzjowych w antracycie osłaniają strefę wypoczynku od wiatru i sąsiadów. Boczne przeszklenie w zabudowie zachowuje widok na ogród.',
    image: 'uploads/realizacje-web/linea-panele-glowne.webp?v=3',
    meta: [
      { label: 'System',     value: 'LINEA przyścienna' },
      { label: 'Dach',       value: 'Poliwęglan Strong Opal' },
      { label: 'Zabudowa',   value: 'Panele żaluzjowe + przeszklenie' },
      { label: 'Kolor',      value: 'Antracyt' },
    ],
    photos: [
      { src: 'uploads/realizacje-web/real_3_1.webp', alt: 'Dom jednorodzinny z przyściennym zadaszeniem tarasu LINEA — widok z ogrodu' },
      { src: 'uploads/realizacje-web/real_3_2.webp', alt: 'Zabudowa tarasu z poziomych paneli żaluzjowych w antracycie — widok z boku' },
      { src: 'uploads/realizacje-web/real_3_3.webp', alt: 'Mleczny dach z poliwęglanu opal i boczne przeszklenie — detal od wewnątrz' },
      { src: 'uploads/realizacje-web/real_3_4.webp', alt: 'Zadaszenie LINEA z otwartą strefą wypoczynku — widok frontalny' },
    ],
  },
  {
    key: 'taras-lamele',
    eyebrow: 'REALIZACJA · DOM JEDNORODZINNY',
    title: 'Zadaszenie tarasu z zabudową lamelową',
    desc: 'Przyścienne zadaszenie ALUKOMFORT LINEA na całej długości elewacji. Dach z poliwęglanu komorowego przepuszcza światło do wnętrza domu, a ściana z pionowych żaluzji aluminiowych osłania taras od wiatru i sąsiadów — bez odcinania przewiewu.',
    image: 'uploads/realizacje-web/taras-poster.webp',
    meta: [
      { label: 'System',     value: 'LINEA przyścienna' },
      { label: 'Dach',       value: 'Poliwęglan komorowy 16 mm' },
      { label: 'Zabudowa',   value: 'Żaluzje pionowe aluminiowe' },
      { label: 'Kolor',      value: 'Antracyt' },
    ],
    photos: [
      { src: 'uploads/realizacje-web/real_1_3.webp', alt: 'Dom jednorodzinny z zadaszeniem tarasu LINEA na całej długości elewacji' },
      { src: 'uploads/realizacje-web/real_1_2.webp', alt: 'Zadaszenie tarasu LINEA z zabudową z pionowych żaluzji aluminiowych w świetle zachodzącego słońca' },
      { src: 'uploads/realizacje-web/real_1_4.webp', alt: 'Dach z poliwęglanu komorowego — widok z zewnątrz o zachodzie słońca' },
      { src: 'uploads/realizacje-web/real_1_1.webp', alt: 'Dach z poliwęglanu komorowego od spodu — przepuszczalność światła' },
    ],
  },
  {
    key: 'pawilon',
    eyebrow: 'REALIZACJA · OGRÓD',
    title: 'Przeszklony pawilon ogrodowy',
    desc: 'Wolnostojący pawilon na bazie systemu LINEA — szyby przesuwne na trzech ścianach, panele drewnopodobne od strony zachodniej i podłoga z naturalnej deski. Zamknięta przestrzeń z widokiem na pola, osłonięta od wiatru i deszczu.',
    image: 'uploads/realizacje-web/pawilon-glowne.webp',
    meta: [
      { label: 'System',     value: 'LINEA samonośna — pawilon' },
      { label: 'Ściany',     value: 'Szyby przesuwne + panele drewnopodobne' },
      { label: 'Dach',       value: 'Poliwęglan komorowy 16 mm' },
      { label: 'Podłoga',    value: 'Deska naturalna' },
    ],
    photos: [
      { src: 'uploads/realizacje-web/real_2_4.webp', alt: 'Przeszklony pawilon ogrodowy LINEA — bryła z zewnątrz' },
      { src: 'uploads/realizacje-web/real_2_3.webp', alt: 'Wnętrze pawilonu — drewniana podłoga i widok na pola' },
      { src: 'uploads/realizacje-web/real_2_5.webp', alt: 'Pawilon z panelami drewnopodobnymi — perspektywa narożna' },
      { src: 'uploads/realizacje-web/real_2_1.webp', alt: 'Szklane ściany przesuwne pawilonu — detal' },
    ],
  },
];

const REALIZACJE_TARGI = [
  { src: 'uploads/realizacje-web/real_2.webp',  alt: 'Stoisko targowe PLAST-MET — pawilon ogrodowy w kolorze antracyt' },
  { src: 'uploads/realizacje-web/real_1.webp',  alt: 'Moduł szklany LINEA w jasnym wykończeniu na stoisku targowym' },
  { src: 'uploads/realizacje-web/real_3.webp',  alt: 'Zabudowa z żaluzji pionowych alux z wstawkami drewnopodobnymi — targi' },
  { src: 'uploads/realizacje-web/real_4.webp',  alt: 'Pawilon z żaluzjami pionowymi przed salonem ekspozycyjnym' },
];

function RealLightbox({ photos, index, onClose, onNav }) {
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onNav(1);
      else if (e.key === 'ArrowLeft') onNav(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onNav]);

  const ph = photos[index];
  return (
    <div className="lb" onClick={onClose} role="dialog" aria-modal="true" aria-label="Galeria zdjęć">
      <button className="lb__close" onClick={onClose} aria-label="Zamknij">×</button>
      <button className="lb__arrow lb__arrow--prev" onClick={(e)=>{e.stopPropagation(); onNav(-1);}} aria-label="Poprzednie zdjęcie">‹</button>
      <figure className="lb__stage" onClick={(e)=>e.stopPropagation()}>
        <img src={ph.src} alt={ph.alt} />
        <figcaption className="lb__caption">{ph.alt} <span className="lb__count">{index + 1} / {photos.length}</span></figcaption>
      </figure>
      <button className="lb__arrow lb__arrow--next" onClick={(e)=>{e.stopPropagation(); onNav(1);}} aria-label="Następne zdjęcie">›</button>
    </div>
  );
}

function PageRealizacje({ onQuote }) {
  const [lightbox, setLightbox] = React.useState(null); // {photos, index}
  const openLightbox = (photos, index) => setLightbox({ photos, index });
  const navLightbox = React.useCallback((dir) => {
    setLightbox(lb => lb ? { ...lb, index: (lb.index + dir + lb.photos.length) % lb.photos.length } : lb);
  }, []);
  usePageMeta({
    title: 'Realizacje — zadaszenia i pergole ALUKOMFORT | PLAST-MET',
    description: 'Zobacz zrealizowane zadaszenia ALUKOMFORT: tarasy z zabudową lamelową, przeszklone pawilony ogrodowe, zadaszenia balkonów. Zdjęcia i wideo z montaży u klientów.',
    canonical: 'https://www.zadaszeniatrzebnica.pl/realizacje',
  });

  return (
    <>
      <Breadcrumbs items={[
        { label: 'Strona główna', href: '/' },
        { label: 'Realizacje' },
      ]} />

      <section className="hero" style={{height: 'clamp(420px, 42vw, 800px)'}}>
        <div
          className="hero__img"
          style={{ backgroundImage: 'url(uploads/realizacje-web/hero-realizacje.webp)', backgroundSize: 'cover', backgroundPosition: 'center bottom' }}
        />
        <div className="hero__scrim" />
        <div className="container hero__inner">
          <div className="hero__content" style={{maxWidth: 560}}>
            <div className="hero__eyebrow">ALUKOMFORT</div>
            <h1 className="hero__title">Realizacje</h1>
            <p className="hero__sub">Prawdziwe montaże u prawdziwych klientów — zadaszenia tarasów, pawilony ogrodowe i zabudowy balkonów wykonane w fabryce PLAST-MET w Trzebnicy.</p>
            <div className="hero__cta">
              <Button variant="primary" size="lg" onClick={onQuote}>Zamów bezpłatną wycenę</Button>
            </div>
          </div>
        </div>
      </section>

      {REALIZACJE_CASES.map((c, ci) => (
        <section key={c.key} className={`section ${ci % 2 === 1 ? 'section--soft' : ''}`}>
          <div className="container">
            <div className="case">
              <div className={`case__media ${c.portrait ? 'case__media--portrait' : ''}`}>
                {c.video ? (
                  <video
                    src={c.video}
                    poster={c.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img src={c.image} alt={c.title} loading="lazy" />
                )}
              </div>
              <div className="case__info">
                <div className="example__eyebrow">{c.eyebrow}</div>
                <h2 className="case__title">{c.title}</h2>
                <p className="small" style={{color:'var(--muted)', lineHeight: 1.65}}>{c.desc}</p>
                <div style={{marginTop: 18}}>
                  {c.meta.map((m, i) => (
                    <div key={i} className="spec-row">
                      <span className="spec-row__label">{m.label}</span>
                      <span className="spec-row__value">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="case__thumbs">
              {c.photos.map((ph, i) => (
                <button key={i} type="button" onClick={()=>openLightbox(c.photos, i)} className="case__thumb"
                  style={{backgroundImage: `url(${ph.src})`}} aria-label={ph.alt} title={ph.alt} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section">
        <div className="container">
          <SectionHead title="Zobacz nasze systemy na żywo"
            sub="Regularnie prezentujemy zadaszenia ALUKOMFORT na targach branżowych — pełnowymiarowe pawilony, zabudowy lamelowe i systemy ścian do obejrzenia z bliska." />
          <div className="case__thumbs">
            {REALIZACJE_TARGI.map((ph, i) => (
              <button key={i} type="button" onClick={()=>openLightbox(REALIZACJE_TARGI, i)} className="case__thumb"
                style={{backgroundImage: `url(${ph.src})`}} aria-label={ph.alt} title={ph.alt} />
            ))}
          </div>
        </div>
      </section>

      <section className="hero-strip hero-strip--accent">
        <div className="container hero-strip__inner">
          <h3>Twoja realizacja może być następna — wycena w 24 godziny</h3>
          <Button variant="primary" size="lg" onClick={onQuote}>Zamów bezpłatną wycenę</Button>
        </div>
      </section>

      {lightbox && (
        <RealLightbox
          photos={lightbox.photos}
          index={lightbox.index}
          onClose={()=>setLightbox(null)}
          onNav={navLightbox}
        />
      )}
    </>
  );
}

window.PageRealizacje = PageRealizacje;
