function Header({ route, onNavigate, onQuote }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const links = [
    { id: 'produkty', label: 'Oferta', children: [
      { label: 'LINEA',   hash: '/produkty/linea' },
      { label: 'HORIZON', hash: '/produkty/horizon' },
      { label: 'ROMA',    hash: '/produkty/roma' },
    ]},
    // { id: 'inspiracje', label: 'Inspiracje' }, // ukryte do czasu większej liczby realizacji — przebudujemy galerię
    { id: 'wizualizacja', label: 'Konfigurator' },
    { id: 'realizacje', label: 'Realizacje' },
    { id: 'o-nas', label: 'O nas' },
    { id: 'kontakt', label: 'Kontakt' },
  ];

  const go = (e, hash) => {
    e.preventDefault();
    setMenuOpen(false);
    onNavigate(hash);
  };

  return (
    <header className="ak-header">
      <div className="container ak-header__inner">
        <a href="#/" className="ak-logo" onClick={(e)=>go(e,'/')} aria-label="ALUKOMFORT — strona główna">
          <img src="uploads/logo_alukomfort_2.webp" alt="PLAST-MET ALUKOMFORT" className="ak-logo__img" />
        </a>
        <nav className="ak-nav">
          {links.map(l => l.children ? (
            <div key={l.id} className="ak-nav__item">
              <a href={`#/${l.id}`}
                 className={route.startsWith(`/${l.id}`) ? 'is-active' : ''}
                 onClick={(e)=>go(e, `/${l.id}`)}>
                {l.label}<span className="ak-caret" aria-hidden="true">▾</span>
              </a>
              <div className="ak-dropdown">
                {l.children.map(c => (
                  <a key={c.hash} href={`#${c.hash}`}
                     className={route === c.hash ? 'is-active' : ''}
                     onClick={(e)=>go(e, c.hash)}>
                    {c.label}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <a key={l.id} href={`#/${l.id}`}
               className={route.startsWith(`/${l.id}`) ? 'is-active' : ''}
               onClick={(e)=>go(e, `/${l.id}`)}>
              {l.label}
            </a>
          ))}
        </nav>
        <button type="button" className="btn btn--primary ak-header__cta" onClick={onQuote}>
          Zamów wycenę
        </button>
        <button
          className={`ak-burger ${menuOpen ? 'is-open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Otwórz menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>
      <nav className={`ak-mobile-nav ${menuOpen ? 'is-open' : ''}`}>
        {links.map(l => (
          <React.Fragment key={l.id}>
            <a href={`#/${l.id}`}
               className={route.startsWith(`/${l.id}`) ? 'is-active' : ''}
               onClick={(e)=>go(e, `/${l.id}`)}>
              {l.label}
            </a>
            {l.children && (
              <div className="ak-mobile-sub">
                {l.children.map(c => (
                  <a key={c.hash} href={`#${c.hash}`}
                     className={route === c.hash ? 'is-active' : ''}
                     onClick={(e)=>go(e, c.hash)}>
                    {c.label}
                  </a>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
        <button type="button" className="btn btn--primary ak-mobile-nav__cta"
          onClick={() => { setMenuOpen(false); onQuote && onQuote(); }}>
          Zamów wycenę
        </button>
      </nav>
    </header>
  );
}

window.Header = Header;
