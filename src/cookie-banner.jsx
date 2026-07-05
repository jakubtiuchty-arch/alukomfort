// Dyskretny baner cookie (RODO + Google Consent Mode v2).
// Mała karta w lewym dolnym rogu — nie przesłania treści i nie blokuje strony.
// Zgoda zapisywana w localStorage; GA4 startuje z analytics_storage=denied
// (ustawiane w index.html) i dostaje "granted" dopiero po kliknięciu Akceptuję.

const CONSENT_KEY = 'ak-cookie-consent';

function readConsent() {
  try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
}

function CookieBanner() {
  const [visible, setVisible] = React.useState(false);
  const [leaving, setLeaving] = React.useState(false);

  React.useEffect(() => {
    if (readConsent()) return;
    // Krótka pauza — baner nie wyskakuje w tej samej klatce co strona.
    const t = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(t);
  }, []);

  const choose = (value) => {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (e) {}
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: value === 'all' ? 'granted' : 'denied',
      });
    }
    setLeaving(true);
    setTimeout(() => setVisible(false), 280);
  };

  if (!visible) return null;

  return (
    <div className={'cookie-bar' + (leaving ? ' cookie-bar--out' : '')} role="dialog" aria-label="Zgoda na pliki cookie">
      <p className="cookie-bar__text">
        Używamy cookies wyłącznie do anonimowych statystyk odwiedzin.
        Bez nich strona działa dokładnie tak samo.{' '}
        <a href="/polityka-prywatnosci">Polityka prywatności</a>
      </p>
      <div className="cookie-bar__actions">
        <button className="cookie-bar__btn cookie-bar__btn--ok" onClick={() => choose('all')}>Akceptuję</button>
        <button className="cookie-bar__btn cookie-bar__btn--no" onClick={() => choose('necessary')}>Tylko niezbędne</button>
      </div>
    </div>
  );
}

window.CookieBanner = CookieBanner;
