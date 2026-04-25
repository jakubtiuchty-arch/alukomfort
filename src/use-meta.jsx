// Hook ustawiający tytuł, meta description, OG tagi per strona

function setMetaTag(name, content, isProperty) {
  if (!content) return;
  const attr = isProperty ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(url) {
  if (!url) return;
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
}

function usePageMeta({ title, description, canonical, ogImage }) {
  React.useEffect(() => {
    if (title) document.title = title;
    if (description) {
      setMetaTag('description', description);
      setMetaTag('og:description', description, true);
    }
    if (title) setMetaTag('og:title', title, true);
    if (ogImage) setMetaTag('og:image', ogImage, true);
    if (canonical) {
      setCanonical(canonical);
      setMetaTag('og:url', canonical, true);
    }
  }, [title, description, canonical, ogImage]);
}

function injectJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function useProductSchema({ id, name, description, image, url, category }) {
  React.useEffect(() => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': url + '#product',
      name: `ALUKOMFORT ${name}`,
      description,
      image: image ? `https://alukomfort.pl/${image}` : undefined,
      url,
      category: category || 'Pergola aluminiowa',
      brand: { '@type': 'Brand', name: 'ALUKOMFORT' },
      manufacturer: {
        '@type': 'Organization',
        name: 'PLAST-MET Sp. z o.o. Sp. k.',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'ul. Milicka 34',
          postalCode: '55-100',
          addressLocality: 'Trzebnica',
          addressCountry: 'PL',
        },
      },
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'PLN',
        price: '0',
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'PLN',
          valueAddedTaxIncluded: true,
        },
        url,
        seller: { '@type': 'Organization', name: 'ALUKOMFORT' },
      },
    };
    injectJsonLd(`product-schema-${id}`, data);
    return () => {
      const el = document.getElementById(`product-schema-${id}`);
      if (el) el.remove();
    };
  }, [id, name, description, image, url, category]);
}

window.usePageMeta = usePageMeta;
window.useProductSchema = useProductSchema;
