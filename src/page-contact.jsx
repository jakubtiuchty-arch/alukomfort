// Podstrona Kontakt — Plast-Met, Trzebnica

function PageContact({ onQuote }) {
  const [form, setForm] = React.useState({ name: '', email: '', phone: '', subject: 'Wycena', msg: '' });
  const [errors, setErrors] = React.useState({});
  const [sent, setSent] = React.useState(false);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = 'Podaj imię i nazwisko';
    if (!form.email.trim()) err.email = 'Podaj e-mail';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Niepoprawny adres e-mail';
    if (!form.msg.trim()) err.msg = 'Wpisz treść wiadomości';
    setErrors(err);
    if (Object.keys(err).length === 0) setSent(true);
  };

  return (
    <>
      <Breadcrumbs items={[
        { label: 'Strona główna', href: '#/' },
        { label: 'Kontakt' },
      ]} />

      {/* Hero */}
      <section className="hero" style={{height: 360}}>
        <div className="hero__img" style={{
          background: 'linear-gradient(135deg, #111 0%, #1e1e1e 60%, #2a2a2a 100%)'
        }} />
        <div className="hero__scrim" style={{background: 'linear-gradient(90deg, rgba(0,0,0,0.6), rgba(0,0,0,0.1))'}} />
        <div className="container hero__inner">
          <div className="hero__content">
            <div className="hero__eyebrow">ALUKOMFORT · PLAST-MET</div>
            <h1 className="hero__title" style={{fontSize: 64}}>Kontakt</h1>
            <p className="hero__sub">Biuro i produkcja mieści się w Trzebnicy. Zadzwoń, napisz lub wpadnij — chętnie pokażemy zadaszenia na żywo.</p>
          </div>
        </div>
      </section>

      {/* Dane kontaktowe + formularz */}
      <section className="section">
        <div className="container">
          <div className="split-2">
            {/* Lewa kolumna — dane */}
            <div>
              <div className="hero__eyebrow" style={{color: 'var(--accent)', marginBottom: 14}}>SIEDZIBA GŁÓWNA</div>
              <h2 className="section__title" style={{textAlign: 'left', fontSize: 34, margin: '0 0 18px'}}>Plast-Met</h2>
              <p style={{margin: '0 0 32px', color: 'var(--muted)', fontSize: 15, maxWidth: 460}}>
                Producent aluminiowych zadaszeń, pergoli i carportów Alukomfort. Realizujemy wycenę oraz projekt indywidualny.
              </p>

              <div style={{display: 'flex', flexDirection: 'column', gap: 0, borderTop: '1px solid var(--line)'}}>
                <ContactRow icon={<Icon.Entrance size={22} />} label="Adres" lines={['ul. Milicka 34', '55-100 Trzebnica']} />
                <ContactRow icon={<Icon.Auto size={22} />} label="Telefon" lines={[
                  <a key="p1" href="tel:+48713120793" style={{fontWeight:600}}>+48 (71) 312 07 93</a>,
                  <a key="p2" href="tel:+48713870830" style={{fontWeight:600}}>+48 (71) 387 08 30</a>,
                ]} />
                <ContactRow icon={<Icon.Arrow size={22} />} label="E-mail" lines={[
                  <a key="e" href="mailto:trzebnica@plast-met.pl" style={{fontWeight:600}}>trzebnica@plast-met.pl</a>
                ]} />
                <ContactRow icon={<Icon.Led size={22} />} label="Godziny otwarcia" lines={['pn–pt: 8:00 – 17:00', 'sob: po wcześniejszym umówieniu']} />
              </div>

              <div style={{marginTop: 28, display: 'flex', gap: 12}}>
                <Button variant="primary" size="lg" onClick={onQuote}>Zamów bezpłatną wycenę</Button>
                <a href="tel:+48713120793" className="btn btn--ghost-dark btn--lg">Zadzwoń teraz</a>
              </div>
            </div>

            {/* Prawa kolumna — formularz */}
            <div style={{background: 'var(--bg-soft)', padding: 36, border: '1px solid var(--line)'}}>
              {sent ? (
                <div className="modal__success">
                  <div className="check"><Icon.Check size={28} stroke="white" sw={2.5} /></div>
                  <h3 style={{margin: '0 0 8px'}}>Wiadomość wysłana</h3>
                  <p className="sub" style={{margin: '0 auto', maxWidth: 340}}>Odpowiemy na <strong>{form.email}</strong> w ciągu 24 h.</p>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <div className="hero__eyebrow" style={{color: 'var(--muted)', marginBottom: 8}}>NAPISZ DO NAS</div>
                  <h3 style={{margin: '0 0 22px', fontSize: 22, fontWeight: 700}}>Formularz kontaktowy</h3>

                  <div className={`field ${errors.name ? 'has-error' : ''}`}>
                    <label>Imię i nazwisko</label>
                    <input type="text" value={form.name} onChange={e => set('name', e.target.value)} />
                    {errors.name && <span className="field__err">{errors.name}</span>}
                  </div>
                  <div className="field__row">
                    <div className={`field ${errors.email ? 'has-error' : ''}`}>
                      <label>E-mail</label>
                      <input type="email" value={form.email} onChange={e => set('email', e.target.value)} />
                      {errors.email && <span className="field__err">{errors.email}</span>}
                    </div>
                    <div className="field">
                      <label>Telefon</label>
                      <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} />
                    </div>
                  </div>
                  <div className="field">
                    <label>Temat</label>
                    <select value={form.subject} onChange={e => set('subject', e.target.value)}>
                      <option>Wycena</option>
                      <option>Projekt indywidualny</option>
                      <option>Serwis / gwarancja</option>
                      <option>Współpraca B2B</option>
                      <option>Inne</option>
                    </select>
                  </div>
                  <div className={`field ${errors.msg ? 'has-error' : ''}`}>
                    <label>Wiadomość</label>
                    <textarea rows="4" value={form.msg} onChange={e => set('msg', e.target.value)} />
                    {errors.msg && <span className="field__err">{errors.msg}</span>}
                  </div>
                  <Button type="submit" variant="primary" size="lg" icon={<Icon.Arrow size={16} sw={2} />}>Wyślij wiadomość</Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mapa — stylizowana w tonacji strony */}
      <section className="section section--soft" style={{paddingTop: 0, paddingBottom: 72}}>
        <div className="container">
          <SectionHead title="Jak do nas trafić" sub="ul. Milicka 34, 55-100 Trzebnica — przy wjeździe do miasta od strony trasy S5." />
        </div>
        <StylizedMap />
        <div className="container" style={{marginTop: 24, display: 'flex', justifyContent:'space-between', gap: 24, flexWrap: 'wrap'}}>
          <div style={{display: 'flex', gap: 24, flexWrap: 'wrap'}}>
            <MapLegend color="var(--accent)" label="Plast-Met — biuro i produkcja" filled />
            <MapLegend color="#b7c7d6" label="DK15 / ul. Sułowska" />
            <MapLegend color="#7ab4d4" label="Potok" />
            <MapLegend color="#cadcc0" label="Pola / zieleń" dashed />
          </div>
          <a
            className="btn btn--ghost-dark"
            href="https://www.google.com/maps/search/?api=1&query=Plast-Met+Milicka+34+Trzebnica"
            target="_blank" rel="noopener">
            Otwórz w Google Maps
            <Icon.Arrow size={14} sw={2} />
          </a>
        </div>
      </section>

      {/* CTA strip */}
      <section style={{background:'#b8851a', color:'#1a1200', padding:'34px 0'}}>
        <div className="container" style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:24}}>
          <h3 style={{margin:0, fontSize:22, fontWeight:700}}>Zaplanuj wizytę w showroomie w Trzebnicy</h3>
          <Button variant="ghost-dark" size="lg" onClick={onQuote}>Umów wizytę</Button>
        </div>
      </section>
    </>
  );
}

function ContactRow({ icon, label, lines }) {
  return (
    <div style={{display: 'grid', gridTemplateColumns: '44px 150px 1fr', gap: 16, alignItems: 'flex-start', padding: '22px 0', borderBottom: '1px solid var(--line)'}}>
      <div style={{width: 40, height: 40, border: '1px solid var(--ink)', display:'flex', alignItems:'center', justifyContent:'center'}}>{icon}</div>
      <div style={{fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', paddingTop: 12, fontWeight: 600}}>{label}</div>
      <div style={{paddingTop: 8, fontSize: 14.5, lineHeight: 1.65, display: 'flex', flexDirection: 'column'}}>
        {lines.map((l, i) => <div key={i}>{l}</div>)}
      </div>
    </div>
  );
}

function MapLegend({ color, label, filled, dashed }) {
  return (
    <div style={{display: 'flex', gap: 10, alignItems: 'center', fontSize: 12, color: 'var(--muted)'}}>
      <span style={{
        width: 22, height: 2,
        background: dashed ? 'none' : color,
        borderTop: dashed ? `2px dashed ${color}` : 'none',
        borderRadius: 1,
        display: 'inline-block',
      }} />
      {filled && <span style={{width: 10, height: 10, borderRadius: '50%', background: color, marginLeft: -24, boxShadow: '0 0 0 3px #fff, 0 0 0 4px ' + color}} />}
      <span>{label}</span>
    </div>
  );
}

// Stylizowana mapa SVG — okolice ul. Milickiej w Trzebnicy
// Wierna topologia wg Google Maps: zielone pola po bokach, DK15 (ul. Sułowska)
// biegnąca diagonalnie (NE → SW), klaster zabudowy na zachód od drogi, pin PLAST-MET
// po wschodniej stronie drogi, potok (niebieska linia) po zachodniej stronie.
function StylizedMap() {
  const [hover, setHover] = React.useState(false);
  return (
    <div style={{position: 'relative', background: '#d9e4d0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)'}}>
      <svg viewBox="0 0 1200 560" width="100%" style={{display:'block'}} preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="fieldPattern" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(22)">
            <rect width="60" height="60" fill="#d9e4d0"/>
            <path d="M0 30 L60 30" stroke="#cbd9c0" strokeWidth="0.8" opacity="0.7"/>
          </pattern>
        </defs>

        {/* Tło — zielone pola/łąki (jak w Google Maps outdoor) */}
        <rect width="1200" height="560" fill="#d9e4d0" />
        <rect width="1200" height="560" fill="url(#fieldPattern)" opacity="0.6" />

        {/* Duże obszary zieleni o różnych odcieniach — pola uprawne */}
        <path d="M 0 0 L 500 0 L 380 260 L 120 280 L 0 220 Z" fill="#cadcc0" opacity="0.85" />
        <path d="M 800 0 L 1200 0 L 1200 180 L 920 120 L 840 40 Z" fill="#cadcc0" opacity="0.8" />
        <path d="M 0 340 L 160 360 L 140 560 L 0 560 Z" fill="#cadcc0" opacity="0.85" />
        <path d="M 960 340 L 1200 300 L 1200 560 L 980 560 Z" fill="#cadcc0" opacity="0.85" />
        <path d="M 0 460 C 100 440, 200 470, 280 480 L 280 560 L 0 560 Z" fill="#c1d4b6" opacity="0.7" />
        <path d="M 1100 160 C 1140 200, 1120 260, 1160 300 L 1200 320 L 1200 120 Z" fill="#c1d4b6" opacity="0.6" />

        {/* Jasna "wyspa zabudowy" — centrum mapy, obszar osiedla / zakładu */}
        <path d="M 380 220 C 420 200, 520 200, 620 210 L 720 240 L 720 460 L 500 470 L 380 440 Z"
              fill="#f2efe8" stroke="#e0dcd0" strokeWidth="1" />

        {/* Kilka mniejszych parceli w klastrze */}
        <g fill="#ebe7dd" stroke="#d7d3c8" strokeWidth="0.6">
          <path d="M 410 240 L 520 250 L 510 340 L 400 330 Z" />
          <path d="M 540 260 L 640 268 L 635 360 L 530 352 Z" />
          <path d="M 430 360 L 540 370 L 530 440 L 420 430 Z" />
          <path d="M 560 380 L 680 388 L 670 450 L 550 445 Z" />
        </g>

        {/* Niewielkie budynki w klastrze — cienkie kontury */}
        <g fill="#e4e0d3" stroke="#c9c3b4" strokeWidth="0.6">
          <rect x="430" y="258" width="60" height="40" />
          <rect x="500" y="258" width="20" height="40" />
          <rect x="560" y="278" width="50" height="30" />
          <rect x="620" y="282" width="20" height="40" />
          <rect x="450" y="380" width="45" height="35" />
          <rect x="500" y="380" width="30" height="35" />
          <rect x="580" y="400" width="70" height="30" />
        </g>

        {/* Potok/strumień — niebieska cienka linia (jak w Google Maps po zachodniej stronie) */}
        <path
          d="M 220 130 C 260 180, 280 230, 340 260 C 400 290, 340 350, 300 420 C 280 460, 260 500, 240 560"
          stroke="#7ab4d4" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.9"
        />

        {/* Drogi lokalne — odchodzą od głównej w stronę osiedla */}
        <g stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round">
          <path d="M 380 280 L 700 260" />
          <path d="M 440 300 L 700 320" />
          <path d="M 460 380 L 700 380" />
          <path d="M 500 450 L 700 440" />
          <path d="M 540 260 L 560 440" />
          <path d="M 620 270 L 640 460" />
        </g>
        <g stroke="#d7d3c8" strokeWidth="1" fill="none" strokeLinecap="round">
          <path d="M 380 280 L 700 260" />
          <path d="M 440 300 L 700 320" />
          <path d="M 460 380 L 700 380" />
          <path d="M 500 450 L 700 440" />
          <path d="M 540 260 L 560 440" />
          <path d="M 620 270 L 640 460" />
        </g>

        {/* DK15 / ul. Sułowska — główna droga biegnąca diagonalnie (NE → SW) */}
        {/* Obrys ciemny */}
        <path
          d="M 900 -20 C 860 120, 800 260, 740 380 C 700 460, 660 520, 620 580"
          stroke="#8a9fb5" strokeWidth="22" fill="none" strokeLinecap="round"
        />
        {/* Jezdnia jasna */}
        <path
          d="M 900 -20 C 860 120, 800 260, 740 380 C 700 460, 660 520, 620 580"
          stroke="#b7c7d6" strokeWidth="16" fill="none" strokeLinecap="round"
        />
        {/* Linia środkowa — przerywana biel */}
        <path
          d="M 900 -20 C 860 120, 800 260, 740 380 C 700 460, 660 520, 620 580"
          stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="10 12" opacity="0.85"
        />

        {/* Etykieta drogi — nazwa „Sułowska" wzdłuż */}
        <g transform="translate(876 140) rotate(68)">
          <text fill="#2c3033" fontFamily="Manrope, sans-serif" fontSize="13" fontWeight="600" letterSpacing="3">Sułowska</text>
        </g>

        {/* Tarcza drogi DK15 (czerwona) */}
        <g transform="translate(810 260)">
          <rect x="-18" y="-13" width="36" height="26" rx="4" fill="#c43a2a" stroke="#fff" strokeWidth="2" />
          <text x="0" y="5" textAnchor="middle" fill="#fff" fontFamily="Manrope, sans-serif" fontSize="14" fontWeight="800">15</text>
        </g>
        <g transform="translate(680 470)">
          <rect x="-18" y="-13" width="36" height="26" rx="4" fill="#c43a2a" stroke="#fff" strokeWidth="2" />
          <text x="0" y="5" textAnchor="middle" fill="#fff" fontFamily="Manrope, sans-serif" fontSize="14" fontWeight="800">15</text>
        </g>

        {/* Lokalne POI — sąsiedzi (dyskretnie, dla kontekstu) */}
        <g fontFamily="Manrope, sans-serif" fill="#6b6b6b">
          <g transform="translate(470 250)">
            <circle r="5" fill="#c9c3b4" stroke="#8a8a8a" strokeWidth="1" />
            <text x="10" y="4" fontSize="10">Euromaster Olbert</text>
          </g>
          <g transform="translate(530 390)">
            <circle r="5" fill="#c9c3b4" stroke="#8a8a8a" strokeWidth="1" />
            <text x="10" y="4" fontSize="10">PSB Mrówka</text>
          </g>
          <g transform="translate(560 320)">
            <circle r="5" fill="#c9c3b4" stroke="#8a8a8a" strokeWidth="1" />
            <text x="10" y="4" fontSize="10">Grupa Jucha Beton</text>
          </g>
          <g transform="translate(160 150)">
            <circle r="5" fill="#6a9ac9" />
            <text x="10" y="4" fontSize="10">Lądowisko dla śmigłowców</text>
          </g>
        </g>

        {/* PIN — PLAST-MET · ALUKOMFORT — po wschodniej stronie drogi, w centrum */}
        <g
          transform="translate(780, 330)"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{cursor: 'pointer'}}
        >
          {/* pulsujący pierścień */}
          <circle r="36" fill="#d4a017" opacity={hover ? 0.24 : 0.14}>
            <animate attributeName="r" values="28;44;28" dur="2.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.24;0.05;0.24" dur="2.6s" repeatCount="indefinite" />
          </circle>
          {/* pin */}
          <path d="M 0 -46 C -15 -46 -24 -34 -24 -23 C -24 -6 0 14 0 14 C 0 14 24 -6 24 -23 C 24 -34 15 -46 0 -46 Z"
            fill="#d4a017" stroke="#0d0d0d" strokeWidth="2" />
          <circle cx="0" cy="-26" r="7" fill="#0d0d0d" />

          {/* etykieta */}
          <g transform="translate(32 -38)">
            <rect x="0" y="0" width="236" height="74" fill="#0d0d0d" />
            <rect x="0" y="0" width="3" height="74" fill="#d4a017" />
            <text x="16" y="22" fill="#d4a017" fontFamily="Manrope, sans-serif" fontSize="9" fontWeight="600" letterSpacing="2.5">PLAST-MET · ALUKOMFORT</text>
            <text x="16" y="44" fill="#fff" fontFamily="Manrope, sans-serif" fontSize="14" fontWeight="700">ul. Milicka 34</text>
            <text x="16" y="62" fill="rgba(255,255,255,0.72)" fontFamily="Manrope, sans-serif" fontSize="11">55-100 Trzebnica</text>
          </g>
        </g>

        {/* Róża wiatrów */}
        <g transform="translate(1130 60)">
          <circle r="22" fill="#fff" stroke="#0d0d0d" strokeWidth="1" />
          <path d="M 0 -16 L 3 0 L 0 16 L -3 0 Z" fill="#0d0d0d" />
          <path d="M -16 0 L 0 3 L 16 0 L 0 -3 Z" fill="#b3b0a5" />
          <text x="0" y="-24" textAnchor="middle" fontSize="8" fontWeight="700" fontFamily="Manrope, sans-serif" fill="#0d0d0d">N</text>
        </g>

        {/* Skala */}
        <g transform="translate(40 510)">
          <rect x="0" y="0" width="60" height="6" fill="#0d0d0d" />
          <rect x="60" y="0" width="60" height="6" fill="#fff" stroke="#0d0d0d" strokeWidth="0.8" />
          <text x="0" y="22" fontSize="10" fill="#4a4a4a" fontFamily="Manrope, sans-serif">0</text>
          <text x="120" y="22" fontSize="10" fill="#4a4a4a" fontFamily="Manrope, sans-serif">200 m</text>
        </g>

        {/* Kierunki — Milicz / Wrocław */}
        <g transform="translate(900 30)">
          <text fontSize="10" fontFamily="Manrope, sans-serif" fontWeight="700" fill="#4a4a4a" letterSpacing="2">↑ MILICZ · SUŁÓW</text>
        </g>
        <g transform="translate(560 550)">
          <text fontSize="10" fontFamily="Manrope, sans-serif" fontWeight="700" fill="#4a4a4a" letterSpacing="2">↓ TRZEBNICA · WROCŁAW</text>
        </g>
      </svg>

      {/* Karta "Trzebnica" w rogu — jak w stylu strony */}
      <div style={{
        position: 'absolute', top: 24, left: 24,
        background: '#fff', border: '1px solid var(--line)',
        padding: '14px 18px', minWidth: 220,
      }}>
        <div style={{fontSize: 10, letterSpacing: '0.24em', color: 'var(--muted)', fontWeight: 600}}>LOKALIZACJA</div>
        <div style={{fontSize: 20, fontWeight: 800, marginTop: 4, letterSpacing: '-0.01em'}}>Trzebnica</div>
        <div style={{fontSize: 12, color: 'var(--muted)', marginTop: 2}}>ul. Milicka 34 · przy DK15</div>
      </div>
    </div>
  );
}

window.PageContact = PageContact;
