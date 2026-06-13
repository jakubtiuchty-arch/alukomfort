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

function shadeColor(hex, amt) {
  // amt < 0 darkens, > 0 lightens (zakres ok. -1..1)
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  let r = parseInt(full.slice(0, 2), 16);
  let g = parseInt(full.slice(2, 4), 16);
  let b = parseInt(full.slice(4, 6), 16);
  const t = amt < 0 ? 0 : 255;
  const p = Math.abs(amt);
  r = Math.round((t - r) * p + r);
  g = Math.round((t - g) * p + g);
  b = Math.round((t - b) * p + b);
  return `rgb(${r}, ${g}, ${b})`;
}

function PergolaPreview({ color }) {
  const top = color;
  const fascia = shadeColor(color, -0.16);
  const side = shadeColor(color, -0.34);
  const post = shadeColor(color, -0.10);
  const slat = shadeColor(color, -0.28);
  // krokwie na górnej płaszczyźnie dachu
  const slats = [0.18, 0.34, 0.5, 0.66, 0.82].map((t) => {
    const sx = 96 + t * 32, sy = 86 + t * 26;
    return { x1: sx, y1: sy, x2: sx + 256, y2: sy - 32 };
  });
  return (
    <div className="pergview">
      <svg viewBox="0 0 480 320" width="100%" role="img" aria-label="Podgląd koloru pergoli">
        <ellipse cx="250" cy="298" rx="190" ry="15" fill="rgba(0,0,0,0.10)" />
        {/* słupy tylne */}
        <rect x="300" y="92" width="9" height="188" fill={side} />
        <rect x="118" y="112" width="9" height="174" fill={side} />
        {/* słupy przednie */}
        <rect x="372" y="92" width="13" height="192" rx="1" fill={post} />
        <rect x="150" y="118" width="13" height="172" rx="1" fill={post} />
        {/* dach — bok lewy */}
        <polygon points="96,86 128,112 128,126 96,100" fill={side} />
        {/* dach — listwa czołowa */}
        <polygon points="128,112 384,80 384,94 128,126" fill={fascia} />
        {/* dach — płaszczyzna górna */}
        <polygon points="96,86 352,54 384,80 128,112" fill={top} />
        {/* krokwie */}
        <g stroke={slat} strokeWidth="1.6" strokeLinecap="round">
          {slats.map((s, i) => <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} />)}
        </g>
      </svg>
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
            <PergolaPreview color={activeColor.hex} />
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
