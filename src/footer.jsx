function Footer({ onNavigate }) {
  const go = (e, hash) => { e.preventDefault(); onNavigate(hash); };
  return (
    <footer className="ak-footer">
      <div className="container">
        <div className="ak-footer__grid">
          <div>
            <div style={{display:'flex', flexDirection:'column', lineHeight:1}}>
              <span style={{fontWeight:800, fontSize:22, letterSpacing:'0.08em', color:'#fff'}}>ALUKOMFORT</span>
              <span style={{color:'var(--accent)', fontSize:10, letterSpacing:'0.28em', marginTop:6, fontWeight:500}}>ZADASZENIA ALUMINIOWE</span>
            </div>
            <p style={{marginTop: 20, fontSize: 13, color: 'rgba(255,255,255,0.65)', maxWidth: 320}}>
              Projektujemy i produkujemy aluminiowe zadaszenia, pergole i carporty dopasowane do architektury domu.
            </p>
          </div>
          <div>
            <h5>Produkty</h5>
            <ul>
              <li><a href="#/produkty/linea" onClick={(e)=>go(e,'/produkty/linea')}>ALUKOMFORT LINEA</a></li>
              <li><a href="#/produkty/horizon" onClick={(e)=>go(e,'/produkty/horizon')}>ALUKOMFORT HORIZON</a></li>
              <li><a href="#/produkty/roma" onClick={(e)=>go(e,'/produkty/roma')}>ALUKOMFORT ROMA</a></li>
            </ul>
          </div>
          <div>
            <h5>Firma</h5>
            <ul>
              <li><a href="#/o-nas" onClick={(e)=>go(e,'/o-nas')}>O nas</a></li>
              <li><a href="#/realizacje" onClick={(e)=>go(e,'/realizacje')}>Realizacje</a></li>
              <li><a href="#/inspiracje" onClick={(e)=>go(e,'/inspiracje')}>Inspiracje</a></li>
              <li><a href="#/kontakt" onClick={(e)=>go(e,'/kontakt')}>Kontakt</a></li>
            </ul>
          </div>
          <div>
            <h5>Kontakt</h5>
            <ul>
              <li>+48 000 000 000</li>
              <li>biuro@alukomfort.pl</li>
              <li>pn–pt, 8:00–17:00</li>
            </ul>
          </div>
        </div>
        <div className="ak-footer__bottom">
          <span>© 2026 Alukomfort Sp. z o.o.</span>
          <span>Polityka prywatności · Regulamin</span>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
