// Główny komponent aplikacji — routing przez History API (czyste adresy).
// Stare adresy hashowe (/#/produkty/linea) są przekierowywane na czyste ścieżki.

function usePathRoute() {
  const normalize = (p) => (String(p || '').replace(/\/+$/, '') || '/');
  const [route, setRoute] = React.useState(() => {
    const h = window.location.hash;
    if (h.startsWith('#/')) {
      const clean = h.slice(1) + window.location.search;
      window.history.replaceState(null, '', clean);
      return normalize(h.slice(1));
    }
    return normalize(window.location.pathname);
  });
  React.useEffect(() => {
    const onPop = () => setRoute(normalize(window.location.pathname));
    // Gdyby ktoś kliknął stary link #/... będąc już na stronie — też przekieruj.
    const onHash = () => {
      const h = window.location.hash;
      if (h.startsWith('#/')) {
        window.history.replaceState(null, '', h.slice(1));
        setRoute(normalize(h.slice(1)));
      }
    };
    window.addEventListener('popstate', onPop);
    window.addEventListener('hashchange', onHash);
    return () => {
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('hashchange', onHash);
    };
  }, []);
  const navigate = React.useCallback((path) => {
    window.history.pushState(null, '', path);
    setRoute(normalize(path));
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  return [route, navigate];
}

function App() {
  const [route, navigate] = usePathRoute();
  const [quoteOpen, setQuoteOpen] = React.useState(false);

  // Szukaj w URL, żeby ustalić produkt dla modala
  let currentProduct = 'LINEA';
  if (route.startsWith('/produkty/horizon')) currentProduct = 'HORIZON';
  else if (route.startsWith('/produkty/roma')) currentProduct = 'ROMA';
  else if (route.startsWith('/produkty/linea')) currentProduct = 'LINEA';

  const openQuote = React.useCallback(() => setQuoteOpen(true), []);

  // Globalny interceptor wewnętrznych linków (/...) — nawigacja SPA bez przeładowania.
  // Linki z własnym onClick (preventDefault) oraz target=_blank / modyfikatory są pomijane.
  React.useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest ? e.target.closest('a') : null;
      if (!a) return;
      const href = a.getAttribute('href') || '';
      // Konwersje: kliknięcia w telefon / e-mail
      if (href.startsWith('tel:')) { window.trackEvent && window.trackEvent('click_tel', { number: href.slice(4) }); return; }
      if (href.startsWith('mailto:')) { window.trackEvent && window.trackEvent('click_email', { address: href.slice(7) }); return; }
      if (!href.startsWith('/') || href.startsWith('//')) return;
      if (a.target && a.target !== '_self') return;
      e.preventDefault();
      navigate(href);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [navigate]);

  // Animacja „wjeżdżania" sekcji przy scrollu — globalnie dla .section.
  // Po każdej zmianie trasy obserwujemy nowo wyrenderowane sekcje.
  React.useLayoutEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;
    const targets = Array.from(document.querySelectorAll('.section'));
    if (!targets.length) return;
    // Używamy atrybutu data-reveal (nie klasy) — React nie nadpisuje nieznanych
    // atrybutów DOM przy re-renderze, więc animacja przetrwa zmiany stanu strony.
    targets.forEach(el => { if (!el.getAttribute('data-reveal')) el.setAttribute('data-reveal', 'out'); });
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.setAttribute('data-reveal', 'in'); io.unobserve(e.target); }
      });
    }, { threshold: 0, rootMargin: '0px 0px -12% 0px' });
    targets.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [route]);

  // Panel handlowca — samodzielny layout, bez nagłówka/stopki publicznej.
  // Działa zarówno przez hash (#/admin) jak i czystą ścieżkę (/admin — rewrite na Vercel).
  const isAdminPath = /^\/admin\/?$/.test(window.location.pathname);
  if (route.startsWith('/admin') || isAdminPath) {
    return <PageAdmin />;
  }

  let page;
  if (route.startsWith('/pergole-wroclaw')) {
    page = <PageWroclaw onQuote={openQuote} onNavigate={navigate} />;
  } else if (route.startsWith('/kontakt')) {
    page = <PageContact onQuote={openQuote} />;
  } else if (route.startsWith('/dane-od-klienta')) {
    page = <ClientDataPage onNavigate={navigate} />;
  } else if (route.startsWith('/wizualizacja')) {
    page = <PageWizualizacja onQuote={openQuote} />;
  } else if (route.startsWith('/realizacje')) {
    page = <PageRealizacje onQuote={openQuote} />;
  } else if (route.startsWith('/inspiracje')) {
    page = <PageInspiracje onQuote={openQuote} />;
  } else if (route.startsWith('/o-nas')) {
    page = <PageOnas onQuote={openQuote} />;
  } else if (route.startsWith('/polityka-prywatnosci')) {
    page = <PagePrivacy />;
  } else if (route.startsWith('/regulamin')) {
    page = <PageRegulamin />;
  } else if (route === '/' || route === '' || route.startsWith('/dlaczego')) {
    page = <Home onNavigate={navigate} onQuote={openQuote} />;
  } else if (route.startsWith('/produkty/linea')) {
    page = <ProductLinea onQuote={openQuote} />;
  } else if (route.startsWith('/produkty/horizon')) {
    page = <ProductHorizon onQuote={openQuote} />;
  } else if (route.startsWith('/produkty/roma')) {
    page = <ProductRoma onQuote={openQuote} />;
  } else if (route.startsWith('/produkty')) {
    // prosty widok listy produktów = home
    page = <Home onNavigate={navigate} onQuote={openQuote} />;
  } else {
    page = <Home onNavigate={navigate} onQuote={openQuote} />;
  }

  return (
    <>
      <Header route={route} onNavigate={navigate} onQuote={openQuote} />
      {page}
      <Footer onNavigate={navigate} />
      <QuoteModal product={currentProduct} open={quoteOpen} onClose={() => setQuoteOpen(false)} />
      <CookieBanner />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
