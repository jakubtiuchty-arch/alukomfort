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

  let page;
  if (route.startsWith('/kontakt')) {
    page = <PageContact onQuote={openQuote} />;
  } else if (route.startsWith('/dane-od-klienta')) {
    page = <ClientDataPage onNavigate={navigate} />;
  } else if (route.startsWith('/wizualizacja')) {
    page = <PageWizualizacja onQuote={openQuote} />;
  } else if (route === '/' || route === '' || route.startsWith('/inspiracje') || route.startsWith('/o-nas') || route.startsWith('/realizacje') || route.startsWith('/dlaczego')) {
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
