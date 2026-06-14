// Wspólne komponenty UI

function Button({ variant = 'primary', size = 'md', children, onClick, type = 'button', icon, ...rest }) {
  const cls = ['btn', `btn--${variant}`, size === 'lg' ? 'btn--lg' : '', size === 'sm' ? 'btn--sm' : '']
    .filter(Boolean).join(' ');
  return (
    <button type={type} className={cls} onClick={onClick} {...rest}>
      {children}
      {icon && <span style={{display:'inline-flex'}}>{icon}</span>}
    </button>
  );
}

function SectionHead({ title, sub }) {
  return (
    <div className="section__head">
      <h2 className="section__title">{title}</h2>
      {sub && <p className="section__sub" dangerouslySetInnerHTML={{__html: sub}} />}
    </div>
  );
}

function Breadcrumbs({ items }) {
  return (
    <div className="breadcrumbs container">
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="sep">›</span>}
          {it.href && i < items.length - 1
            ? <a href={it.href}>{it.label}</a>
            : <span className={i === items.length - 1 ? 'current' : ''}>{it.label}</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

function ColorSwatches({ colors, selected, onSelect }) {
  return (
    <div className="swatches">
      {colors.map((c, i) => (
        <div
          key={i}
          className={`swatch ${selected === i ? 'is-selected' : ''}`}
          onClick={() => onSelect && onSelect(i)}
        >
          <div className="swatch__chip" style={c.img
            ? { backgroundImage: `url(${c.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : { background: c.hex }} />
          <span className="swatch__name">{c.name}</span>
          <span className="swatch__code">{c.sub}</span>
        </div>
      ))}
    </div>
  );
}

function CertBar({ guarantee }) {
  const rows = guarantee || [
    { label: 'Elementy aluminiowe', value: '60 miesięcy' },
    { label: 'Elektryka', value: '24 miesięcy' },
    { label: 'Pokrycie poliwęglanowe', value: '60 miesięcy' },
    { label: 'Ściany systemu ESG', value: '8/10/12 mm' },
  ];
  return (
    <div className="cert-bar container">
      <div className="cert">
        <img className="cert__logo" src="uploads/icons/tuv-nord-logo.png" alt="TÜV NORD" width="120" height="37" />
        <div className="cert__body">
          <h4>Certyfikat TÜV NORD · 2274-CPR-0046-2025</h4>
          <p>Profile systemu ALUKOMFORT posiadają certyfikat Zakładowej Kontroli Produkcji TÜV NORD wg <strong>PN-EN 1090-1</strong> w klasie wykonania <strong>EXC 2</strong>. Proces spawalniczy potwierdzony normą <strong>PN-EN ISO 3834</strong>.</p>
        </div>
      </div>
      <div className="guarantee">
        <div className="guarantee__ic"><img src="uploads/icons/bar-gwarancja.png" alt="" width="40" height="40" loading="lazy" /></div>
        <div className="guarantee__body">
          <h4>Gwarancja</h4>
          {rows.map((r, i) => (
            <div key={i} className="guarantee__row"><span>{r.label}</span><span>{r.value}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CertDownloads({ items }) {
  const list = items || (typeof CERTIFICATES !== 'undefined' ? CERTIFICATES : []);
  if (!list.length) return null;
  return (
    <div className="cert-dl">
      <h4 className="cert-dl__title">Certyfikaty do pobrania</h4>
      <div className="cert-dl__grid">
        {list.map((c, i) => (
          <a key={i} className="cert-dl__item" href={c.file} target="_blank" rel="noopener noreferrer" download>
            <span className="cert-dl__ic" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <span className="cert-dl__body">
              <span className="cert-dl__lbl">{c.label}</span>
              {c.size && <span className="cert-dl__sub">{c.size}</span>}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function ColorsSection({ previews, roofs }) {
  const [active, setActive] = React.useState({ type: 'base', idx: 0 });
  const activeColor = active.type === 'base' ? COLORS_BASE[active.idx] : COLORS_PREMIUM[active.idx];
  const srcFor = (c) => (previews && previews[c.name]) || c.preview;
  const activeSrc = srcFor(activeColor);
  const hasRoofs = roofs && roofs.length > 0;
  const [roofSel, setRoofSel] = React.useState({ id: hasRoofs ? roofs[0].id : null, opt: 0 });
  const activeRoof = hasRoofs ? (roofs.find(r => r.id === roofSel.id) || roofs[0]) : null;
  const activeRoofOpt = activeRoof ? (activeRoof.options || [])[roofSel.opt] : null;
  const allRoofOptions = hasRoofs
    ? roofs.flatMap(r => (r.options || []).map((o, i) => ({ ...o, roofId: r.id, optIdx: i })))
    : [];
  return (
    <section className="section section--soft">
      <div className="container">
        <SectionHead title="Kolory dopasowane do architektury domu"
          sub="Wybierz kolor konstrukcji, a podgląd na żywo pokaże, jak będzie wyglądać Twoja pergola." />
        <div className="colors-layout">
          <div className="colors-preview">
            <div className="pergview">
              {COLORS_BASE.concat(COLORS_PREMIUM).map((c, i) => (
                <img key={i} src={srcFor(c)} alt={`Pergola ALUKOMFORT w kolorze ${c.name}`}
                  className={srcFor(c) === activeSrc ? 'is-active' : ''}
                  loading="lazy" />
              ))}
            </div>
            <div className="colors-preview__tag">
              <span className="colors-preview__lbl">Wybrany kolor</span>
              <strong className="colors-preview__name">{activeColor.name}</strong>
              <span className="colors-preview__sub">{activeColor.sub}</span>
            </div>
          </div>
          <div className="colors-controls">
            <div>
              <h4 className="block-title">Kolory podstawowe</h4>
              <ColorSwatches colors={COLORS_BASE} selected={active.type === 'base' ? active.idx : -1} onSelect={(i) => setActive({ type: 'base', idx: i })} />
            </div>
            <div>
              <h4 className="block-title">Kolory premium</h4>
              <ColorSwatches colors={COLORS_PREMIUM} selected={active.type === 'prem' ? active.idx : -1} onSelect={(i) => setActive({ type: 'prem', idx: i })} />
            </div>
            <p className="small colors-mat">System wykonywany jest ze stopów aluminium 6063 i 6063A o właściwości T66.</p>
          </div>
        </div>
        {hasRoofs && (
          <div className="colors-roof">
            <h4 className="block-title">Dostępne rodzaje dachu</h4>
            <div className="roof-grid">
              {allRoofOptions.map((o, i) => (
                <div key={i}
                  className={`swatch ${roofSel.id === o.roofId && roofSel.opt === o.optIdx ? 'is-selected' : ''}`}
                  onClick={() => setRoofSel({ id: o.roofId, opt: o.optIdx })}>
                  <div className="swatch__chip" style={{ background: o.hex }} />
                  <span className="swatch__name" style={{ fontSize: 12 }}>{o.name}</span>
                  <span className="swatch__code">{o.sub}</span>
                </div>
              ))}
            </div>
            {activeRoof && (
              <div className="roof-desc">
                <strong className="roof-desc__name">{activeRoof.name}{activeRoofOpt ? ` — ${activeRoofOpt.name}` : ''}</strong>
                <p className="roof-desc__text">{(activeRoofOpt && activeRoofOpt.desc) || activeRoof.desc}</p>
                {activeRoof.note && <p className="roof-desc__note">{activeRoof.note}</p>}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

window.Button = Button;
window.SectionHead = SectionHead;
window.Breadcrumbs = Breadcrumbs;
window.ColorSwatches = ColorSwatches;
window.CertBar = CertBar;
window.CertDownloads = CertDownloads;
window.ColorsSection = ColorsSection;
