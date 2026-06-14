// Strona /inspiracje — galeria ultrarealistycznych wizualizacji (5 na serię)

const INSP_SERIES = [
  { key: 'linea',   name: 'LINEA',   sub: 'Aluminiowe zadaszenia ze stałym dachem — poliwęglan lub szkło.' },
  { key: 'horizon', name: 'HORIZON', sub: 'Pergole bioklimatyczne z ruchomym dachem lamelowym.' },
  { key: 'roma',    name: 'ROMA',    sub: 'Lekkie pergole tkaninowe z roletą rzymską.' },
];

function PageInspiracje({ onQuote }) {
  usePageMeta({
    title: 'Inspiracje — wizualizacje pergol i zadaszeń ALUKOMFORT | LINEA, HORIZON, ROMA',
    description: 'Galeria inspiracji ALUKOMFORT — przykładowe aranżacje pergol aluminiowych i zadaszeń tarasów w systemach LINEA, HORIZON i ROMA. Zobacz, jak mogą wyglądać u Ciebie.',
    canonical: 'https://alukomfort.pl/#/inspiracje',
  });

  const [lb, setLb] = React.useState(null); // { list:[{src,alt}], idx }
  const openLb = (list, idx) => setLb({ list, idx });
  const closeLb = () => setLb(null);
  const step = (d) => setLb(s => s ? ({ ...s, idx: (s.idx + d + s.list.length) % s.list.length }) : s);

  React.useEffect(() => {
    if (!lb) return;
    const onKey = (e) => { if (e.key === 'Escape') closeLb(); else if (e.key === 'ArrowRight') step(1); else if (e.key === 'ArrowLeft') step(-1); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lb]);

  return (
    <>
      <Breadcrumbs items={[
        { label: 'Strona główna', href: '#/' },
        { label: 'Inspiracje' },
      ]} />

      <section className="section">
        <div className="container">
          <SectionHead title="Inspiracje ALUKOMFORT"
            sub="Przykładowe aranżacje pergol i zadaszeń w trzech systemach. Zobacz, jak konstrukcja może wyglądać przy domu, na tarasie, przy basenie czy w ogródku gastronomicznym — i wybierz kierunek dla swojej realizacji." />
        </div>
      </section>

      {INSP_SERIES.map((s, si) => {
        const list = [1,2,3,4,5].map(n => ({
          src: `uploads/inspiracje/${s.key}-${n}.jpg`,
          alt: `Inspiracja ALUKOMFORT ${s.name} — wizualizacja ${n}`,
        }));
        return (
          <section key={s.key} className={`section ${si % 2 === 1 ? 'section--soft' : ''}`} style={{paddingTop: si === 0 ? 0 : undefined}}>
            <div className="container">
              <h2 className="insp-h">{s.name}</h2>
              <p className="insp-sub">{s.sub}</p>
              <div className="insp-grid">
                {list.map((it, i) => (
                  <button key={i} type="button" className="insp-cell" onClick={() => openLb(list, i)}
                    style={{ backgroundImage: `url(${it.src})` }} aria-label={it.alt}>
                    <span className="insp-cell__zoom" aria-hidden="true">⤢</span>
                  </button>
                ))}
              </div>
              <div style={{marginTop: 22}}>
                <Button variant="ghost-dark" size="md" onClick={() => onNavigateTo(`/produkty/${s.key}`)}>Poznaj system {s.name}</Button>
              </div>
            </div>
          </section>
        );
      })}

      <section className="section--ink section" style={{padding:'48px 0'}}>
        <div className="container" style={{textAlign:'center'}}>
          <h2 className="section__title" style={{color:'#fff', marginBottom: 10}}>Chcesz zobaczyć pergolę na zdjęciu swojego tarasu?</h2>
          <p style={{margin:'0 0 22px', color:'rgba(255,255,255,0.75)'}}>Skorzystaj z konfiguratora AI albo zamów bezpłatną wycenę.</p>
          <div style={{display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap'}}>
            <Button variant="primary" size="lg" onClick={() => onNavigateTo('/wizualizacja')}>Wypróbuj konfigurator AI</Button>
            <Button variant="ghost-light" size="lg" onClick={onQuote}>Zamów wycenę</Button>
          </div>
        </div>
      </section>

      {lb && (
        <div className="insp-lb" onClick={closeLb}>
          <button className="insp-lb__close" onClick={closeLb} aria-label="Zamknij">×</button>
          <button className="insp-lb__nav insp-lb__nav--prev" onClick={(e)=>{e.stopPropagation(); step(-1);}} aria-label="Poprzednie">‹</button>
          <img className="insp-lb__img" src={lb.list[lb.idx].src} alt={lb.list[lb.idx].alt} onClick={(e)=>e.stopPropagation()} />
          <button className="insp-lb__nav insp-lb__nav--next" onClick={(e)=>{e.stopPropagation(); step(1);}} aria-label="Następne">›</button>
        </div>
      )}
    </>
  );
}

// pomocnik nawigacji (App przekazuje przez window — prosto, bez prop drillingu)
function onNavigateTo(hash) { window.location.hash = hash; window.scrollTo({ top: 0, behavior: 'instant' }); }

window.PageInspiracje = PageInspiracje;
