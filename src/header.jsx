function Header({ route, onNavigate }) {
  const links = [
    { id: 'produkty', label: 'Produkty' },
    { id: 'inspiracje', label: 'Inspiracje' },
    { id: 'dlaczego', label: 'Dlaczego aluminium?' },
    { id: 'realizacje', label: 'Realizacje' },
    { id: 'o-nas', label: 'O nas' },
    { id: 'kontakt', label: 'Kontakt' },
  ];

  const go = (e, hash) => { e.preventDefault(); onNavigate(hash); };

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
      </div>
    </header>
  );
}

window.Header = Header;
