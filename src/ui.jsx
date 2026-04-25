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
  const [selBase, setSelBase] = React.useState(0);
  const [selPrem, setSelPrem] = React.useState(0);
  return (
    <section className="section section--soft">
      <div className="container">
        <SectionHead title="Kolory dopasowane do architektury domu" />
        <div className="split-3">
          <div>
            <h4 className="block-title">Kolory podstawowe</h4>
            <ColorSwatches colors={COLORS_BASE} selected={selBase} onSelect={setSelBase} />
          </div>
          <div>
            <h4 className="block-title">Kolory premium</h4>
            <ColorSwatches colors={COLORS_PREMIUM} selected={selPrem} onSelect={setSelPrem} />
          </div>
          <div>
            <h4 className="block-title">Materiały</h4>
            <p className="small" style={{marginTop: 0}}>System wykonywany jest ze stopów aluminium 6063 i 6063A o właściwości T66.</p>
            <div style={{marginTop: 18, padding: 18, background: '#fff', border: '1px solid var(--line)', display: 'flex', gap: 14, alignItems:'center'}}>
              <Icon.Profile size={36} />
              <div className="small">Wybrany kolor: <strong style={{color:'var(--ink)'}}>{COLORS_BASE[selBase].name}</strong> / <strong style={{color:'var(--ink)'}}>{COLORS_PREMIUM[selPrem].name}</strong></div>
            </div>
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
