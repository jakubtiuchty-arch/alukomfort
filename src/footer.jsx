function Footer({ onNavigate }) {
  const go = (e, hash) => { e.preventDefault(); onNavigate(hash); };
  const FIco = ({ d }) => (
    <svg className="ft-c__ic" width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {d}
    </svg>
  );
  return (
    <footer className="ak-footer">
      <div className="container">
        <div className="ak-footer__grid">
          <div className="ft-brand">
            <img src="uploads/LOGO_ALUKOMFORT_A.jpg.png" alt="PLAST-MET ALUKOMFORT" className="ak-footer__logo" width="567" height="157" />
            <p className="ft-brand__desc">
              Projektujemy i produkujemy aluminiowe zadaszenia, pergole i carporty
              dopasowane do architektury domu. Marka PLAST-MET — własna fabryka w Trzebnicy.
            </p>
            <div className="ft-badges">
              <span className="ft-badge">TÜV NORD</span>
              <span className="ft-badge">EN 1090-1</span>
              <span className="ft-badge">30+ lat</span>
            </div>
          </div>

          <div className="ft-col">
            <h5>Produkty</h5>
            <ul>
              <li><a href="/produkty/linea" onClick={(e)=>go(e,'/produkty/linea')}>ALUKOMFORT LINEA</a></li>
              <li><a href="/produkty/horizon" onClick={(e)=>go(e,'/produkty/horizon')}>ALUKOMFORT HORIZON</a></li>
              <li><a href="/produkty/roma" onClick={(e)=>go(e,'/produkty/roma')}>ALUKOMFORT ROMA</a></li>
              <li><a href="/wizualizacja" onClick={(e)=>go(e,'/wizualizacja')}>Konfigurator wizualizacji</a></li>
            </ul>
          </div>

          <div className="ft-col">
            <h5>Firma</h5>
            <ul>
              <li><a href="/o-nas" onClick={(e)=>go(e,'/o-nas')}>O nas</a></li>
              <li><a href="/realizacje" onClick={(e)=>go(e,'/realizacje')}>Realizacje</a></li>
              <li><a href="/inspiracje" onClick={(e)=>go(e,'/inspiracje')}>Inspiracje</a></li>
              <li><a href="/kontakt" onClick={(e)=>go(e,'/kontakt')}>Kontakt</a></li>
            </ul>
          </div>

          <div className="ft-col ft-col--contact">
            <h5>Kontakt</h5>
            <ul>
              <li>
                <a href="tel:+48512622666">
                  <FIco d={<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />} />
                  512 622 666
                </a>
              </li>
              <li>
                <a href="tel:+48501963896">
                  <FIco d={<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />} />
                  501 963 896
                </a>
              </li>
              <li>
                <a href="tel:+48713084234">
                  <FIco d={<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />} />
                  71 308 42 34
                </a>
              </li>
              <li>
                <a href="mailto:trzebnica@plast-met.pl">
                  <FIco d={<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>} />
                  trzebnica@plast-met.pl
                </a>
              </li>
              <li>
                <span>
                  <FIco d={<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>} />
                  pn–śr, pt: 7–15 · czw: 7–16
                </span>
              </li>
              <li>
                <span>
                  <FIco d={<><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>} />
                  ul. Milicka 34A, 55-100 Trzebnica
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="ak-footer__bottom">
          <span>© 2026 ALUKOMFORT · Plast-Met Systemy Ogrodzeniowe Sp. z o.o. Sp.k.</span>
          <span className="ft-legal">
            <a href="/polityka-prywatnosci" onClick={(e)=>go(e,'/polityka-prywatnosci')}>Polityka prywatności</a>
            <a href="/regulamin" onClick={(e)=>go(e,'/regulamin')}>Regulamin</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
