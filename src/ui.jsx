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

function CertBar() {
  return (
    <div className="cert-bar container">
      <div className="cert">
        <div className="cert__mark"><span>TÜV<br/>NORD</span></div>
        <div className="cert__body">
          <h4>Certyfikat TÜV NORD · 2274-CPR-0046-2025</h4>
          <p>Profile systemu ALUKOMFORT posiadają certyfikat Zakładowej Kontroli Produkcji TÜV NORD wg <strong>PN-EN 1090-1</strong> w klasie wykonania <strong>EXC 2</strong>. Proces spawalniczy potwierdzony normą <strong>PN-EN ISO 3834</strong>.</p>
        </div>
      </div>
      <div className="guarantee">
        <div className="guarantee__ic"><Icon.Shield /></div>
        <div className="guarantee__body">
          <h4>Gwarancja</h4>
          <div className="guarantee__row"><span>Elementy aluminiowe</span><span>60 miesięcy</span></div>
          <div className="guarantee__row"><span>Elektryka</span><span>24 miesięcy</span></div>
          <div className="guarantee__row"><span>Pokrycie poliwęglanowe</span><span>60 miesięcy</span></div>
          <div className="guarantee__row"><span>Ściany systemu ESG</span><span>8/10/12 mm</span></div>
        </div>
      </div>
    </div>
  );
}

function ColorsSection() {
  const [active, setActive] = React.useState({ type: 'base', idx: 0 });
  const activeColor = active.type === 'base' ? COLORS_BASE[active.idx] : COLORS_PREMIUM[active.idx];
  return (
    <section className="section section--soft">
      <div className="container">
        <SectionHead title="Kolory dopasowane do architektury domu"
          sub="Wybierz kolor konstrukcji, a podgląd na żywo pokaże, jak będzie wyglądać Twoja pergola." />
        <div className="colors-layout">
          <div className="colors-preview">
            <div className="pergview">
              {COLORS_BASE.concat(COLORS_PREMIUM).map((c, i) => (
                <img key={i} src={c.preview} alt={`Pergola ALUKOMFORT w kolorze ${c.name}`}
                  className={c.preview === activeColor.preview ? 'is-active' : ''}
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
      </div>
    </section>
  );
}

window.Button = Button;
window.SectionHead = SectionHead;
window.Breadcrumbs = Breadcrumbs;
window.ColorSwatches = ColorSwatches;
window.CertBar = CertBar;
window.ColorsSection = ColorsSection;
