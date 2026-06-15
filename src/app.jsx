// Główny komponent aplikacji — routing przez hash

function useHashRoute() {
  const [route, setRoute] = React.useState(() => {
    const h = window.location.hash.replace(/^#/, '') || '/';
    return h;
  });
  React.useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace(/^#/, '') || '/');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const navigate = React.useCallback((hash) => {
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  return [route, navigate];
}

function App() {
  const [route, navigate] = useHashRoute();
  const [quoteOpen, setQuoteOpen] = React.useState(false);

  // Szukaj w URL, żeby ustalić produkt dla modala
  let currentProduct = 'LINEA';
  if (route.startsWith('/produkty/horizon')) currentProduct = 'HORIZON';
  else if (route.startsWith('/produkty/roma')) currentProduct = 'ROMA';
  else if (route.startsWith('/produkty/linea')) currentProduct = 'LINEA';

  const openQuote = React.useCallback(() => setQuoteOpen(true), []);

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
  if (route.startsWith('/kontakt')) {
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
      <Header route={route} onNavigate={navigate} />
      {page}
      <Footer onNavigate={navigate} />
      <QuoteModal product={currentProduct} open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
