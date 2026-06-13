function Header({ route, onNavigate }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const links = [
    { id: 'produkty', label: 'Produkty', children: [
      { label: 'LINEA',   hash: '/produkty/linea' },
      { label: 'HORIZON', hash: '/produkty/horizon' },
      { label: 'ROMA',    hash: '/produkty/roma' },
    ]},
    { id: 'inspiracje', label: 'Inspiracje' },
    { id: 'dlaczego', label: 'Dlaczego aluminium?' },
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
          <img src="uploads/logo_alukomfort_2.png" alt="PLAST-MET ALUKOMFORT" className="ak-logo__img" />
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
      </nav>
    </header>
  );
}

window.Header = Header;
