function Header({ route, onNavigate }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const links = [
    { id: 'produkty', label: 'Produkty' },
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
          {links.map(l => (
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
          <a key={l.id} href={`#/${l.id}`}
             className={route.startsWith(`/${l.id}`) ? 'is-active' : ''}
             onClick={(e)=>go(e, `/${l.id}`)}>
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

window.Header = Header;
