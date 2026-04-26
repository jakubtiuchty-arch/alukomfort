// Strona /wizualizacja — konfigurator AI: zdjęcie tarasu + produkt → wygenerowana wizualizacja

const PRODUCTS = [
  { id: 'linea',   name: 'LINEA',   sub: 'Aluminiowe zadaszenie samonośne',   img: 'uploads/linea_kafelek_3.png' },
  { id: 'horizon', name: 'HORIZON', sub: 'Pergola bioklimatyczna lamelowa',   img: 'uploads/kafelek_horizon.png' },
  { id: 'roma',    name: 'ROMA',    sub: 'Pergola tkaninowa',                 img: 'uploads/roma_hp.png' },
];

const COLORS = [
  { id: 'antracyt',     name: 'Antracyt RAL 7016',  swatch: '#3a3a3a' },
  { id: 'bialy',        name: 'Biały RAL 9016',     swatch: '#f4f4f0' },
  { id: 'czarna-wisnia',name: 'Czarna wiśnia',      swatch: '#3b1a1a' },
  { id: 'sosna',        name: 'Sosna',              swatch: '#a87245' },
  { id: 'srebrny-dab',  name: 'Srebrny dąb',        swatch: '#8d8a82' },
  { id: 'zloty-dab',    name: 'Złoty dąb',          swatch: '#b08856' },
];

function PageWizualizacja({ onQuote }) {
  usePageMeta({
    title: 'Wizualizacja AI — zobacz pergolę u siebie | ALUKOMFORT',
    description: 'Wgraj zdjęcie swojego tarasu i zobacz w 30 sekund, jak będzie wyglądać z pergolą ALUKOMFORT (LINEA / HORIZON / ROMA). Generator oparty na AI gpt-image-2.',
    canonical: 'https://alukomfort.pl/#/wizualizacja',
  });

  const [product, setProduct] = React.useState('horizon');
  const [color, setColor] = React.useState('antracyt');
  const [file, setFile] = React.useState(null); // {name, mime, base64, previewUrl}
  const [form, setForm] = React.useState({ email: '', phone: '', address: '', notes: '', rodo: false });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState(null); // {image, remaining}
  const [serverError, setServerError] = React.useState('');
  const fileInputRef = React.useRef(null);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleFile = (f) => {
    if (!f) return;
    if (!/^image\/(png|jpeg|jpg|webp)$/i.test(f.type)) {
      setErrors(e => ({ ...e, file: 'Dozwolone formaty: JPG, PNG, WEBP.' })); return;
    }
    if (f.size > 8 * 1024 * 1024) {
      setErrors(e => ({ ...e, file: 'Plik większy niż 8 MB. Skompresuj zdjęcie.' })); return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      const base64 = String(dataUrl).split(',')[1];
      setFile({ name: f.name, mime: f.type, base64, previewUrl: dataUrl });
      setErrors(e => { const { file, ...rest } = e; return rest; });
    };
    reader.readAsDataURL(f);
  };

  const onDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };
  const onDragOver = (e) => e.preventDefault();

  const submit = async (e) => {
    e.preventDefault();
    const err = {};
    if (!file) err.file = 'Wgraj zdjęcie tarasu / domu.';
    if (!form.email.trim()) err.email = 'Podaj e-mail.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Niepoprawny e-mail.';
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 9) err.phone = 'Podaj telefon (min. 9 cyfr).';
    if (!form.rodo) err.rodo = 'Wymagana zgoda na przetwarzanie danych.';
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    setLoading(true);
    setServerError('');
    setResult(null);
    try {
      const r = await fetch('/api/wizualizacja', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product,
          color,
          imageBase64: file.base64,
          mimeType: file.mime,
          email: form.email.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          notes: form.notes.trim(),
          rodo: form.rodo,
        }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || 'Błąd generatora.');
      setResult(j);
    } catch (e2) {
      setServerError(e2.message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setResult(null); setFile(null); setServerError(''); };

  return (
    <>
      <Breadcrumbs items={[
        { label: 'Strona główna', href: '#/' },
        { label: 'Wizualizacja AI' },
      ]} />

      <section className="hero" style={{height: 320}}>
        <div className="hero__img" style={{background:'linear-gradient(135deg,#0e0e10 0%,#1c1c1f 60%,#262629 100%)'}} />
        <div className="hero__scrim" style={{background: 'linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)'}} />
        <div className="container hero__inner">
          <div className="hero__content" style={{maxWidth: 720}}>
            <div className="hero__eyebrow">NOWOŚĆ · GENERATOR AI</div>
            <h1 className="hero__title" style={{fontSize: 42}}>Zobacz pergolę u siebie</h1>
            <p className="hero__sub">
              Wgraj zdjęcie swojego tarasu — w 30 sekund AI dorysuje wybraną pergolę ALUKOMFORT
              w realistycznej skali, zachowując oryginalne światło i perspektywę.
            </p>
          </div>
        </div>
      </section>

      {!result && (
        <section className="section section--soft">
          <div className="container wiz-container">

            {/* KROK 1: produkt */}
            <div className="wiz-step">
              <div className="wiz-step__num">1</div>
              <div className="wiz-step__body">
                <h2 className="wiz-step__title">Wybierz produkt</h2>
                <div className="wiz-products">
                  {PRODUCTS.map(p => (
                    <button
                      type="button"
                      key={p.id}
                      className={`wiz-product ${product === p.id ? 'is-active' : ''}`}
                      onClick={() => setProduct(p.id)}
                    >
                      <div className="wiz-product__img" style={{backgroundImage: `url(${p.img})`}} />
                      <div className="wiz-product__info">
                        <div className="wiz-product__name">{p.name}</div>
                        <div className="wiz-product__sub">{p.sub}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* KROK 2: kolor */}
            <div className="wiz-step">
              <div className="wiz-step__num">2</div>
              <div className="wiz-step__body">
                <h2 className="wiz-step__title">Wybierz kolor / wykończenie</h2>
                <div className="wiz-colors">
                  {COLORS.map(c => (
                    <button
                      type="button"
                      key={c.id}
                      className={`wiz-color ${color === c.id ? 'is-active' : ''}`}
                      onClick={() => setColor(c.id)}
                    >
                      <span className="wiz-color__sw" style={{background: c.swatch}} />
                      <span className="wiz-color__lbl">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* KROK 3: zdjęcie */}
            <div className="wiz-step">
              <div className="wiz-step__num">3</div>
              <div className="wiz-step__body">
                <h2 className="wiz-step__title">Wgraj zdjęcie tarasu / ogrodu</h2>
                <p className="wiz-help">
                  Najlepiej działa zdjęcie z perspektywy człowieka (wysokość ~1.6 m), w jasnym świetle dziennym.
                  Format JPG / PNG / WEBP, max 8 MB.
                </p>
                {!file ? (
                  <div
                    className="wiz-drop"
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="wiz-drop__icon">📷</div>
                    <div className="wiz-drop__txt">Przeciągnij zdjęcie tutaj lub kliknij, aby wybrać plik</div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      style={{display: 'none'}}
                      onChange={(e) => handleFile(e.target.files?.[0])}
                    />
                  </div>
                ) : (
                  <div className="wiz-preview">
                    <img src={file.previewUrl} alt="Twoje zdjęcie" />
                    <div className="wiz-preview__actions">
                      <span>{file.name}</span>
                      <button type="button" className="wiz-link" onClick={() => setFile(null)}>Zmień zdjęcie</button>
                    </div>
                  </div>
                )}
                {errors.file && <div className="wiz-err">{errors.file}</div>}
              </div>
            </div>

            {/* KROK 4: dane kontaktowe */}
            <div className="wiz-step">
              <div className="wiz-step__num">4</div>
              <div className="wiz-step__body">
                <h2 className="wiz-step__title">Twoje dane (do przesłania wizualizacji)</h2>
                <p className="wiz-help">
                  Wynik dostaniesz na e-mail. Nasz handlowiec skontaktuje się z propozycją wyceny — bez zobowiązań.
                </p>
                <form className="wiz-form" onSubmit={submit}>
                  <div className="wiz-row-2">
                    <div className="wiz-field">
                      <label>E-mail *</label>
                      <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="jan.kowalski@example.com" />
                      {errors.email && <div className="wiz-err">{errors.email}</div>}
                    </div>
                    <div className="wiz-field">
                      <label>Telefon *</label>
                      <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+48 600 000 000" />
                      {errors.phone && <div className="wiz-err">{errors.phone}</div>}
                    </div>
                  </div>
                  <div className="wiz-field">
                    <label>Lokalizacja (miasto / kod pocztowy) — opcjonalnie</label>
                    <input type="text" value={form.address} onChange={e => set('address', e.target.value)} placeholder="Wrocław, 50-001" />
                  </div>
                  <div className="wiz-field">
                    <label>Uwagi do wizualizacji — opcjonalnie</label>
                    <textarea rows={3} value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Np. wymiary tarasu (4×3 m), preferowane miejsce zamontowania, dodatkowe akcesoria..." />
                  </div>
                  <label className="wiz-rodo">
                    <input type="checkbox" checked={form.rodo} onChange={e => set('rodo', e.target.checked)} />
                    <span>Wyrażam zgodę na przetwarzanie danych osobowych przez PLAST-MET Sp. z o.o. Sp. k. w celu kontaktu handlowego (RODO).</span>
                  </label>
                  {errors.rodo && <div className="wiz-err">{errors.rodo}</div>}

                  {serverError && (
                    <div className="wiz-server-err">⚠ {serverError}</div>
                  )}

                  <div className="wiz-cta">
                    <Button type="submit" variant="primary" size="lg" disabled={loading}>
                      {loading ? 'Generuję wizualizację (~30 s)...' : '✨ Wygeneruj wizualizację AI'}
                    </Button>
                    <p className="wiz-help" style={{margin: '10px 0 0', fontSize: 12}}>
                      Limit: 2 wizualizacje na dobę. Czas generowania: 20-40 sekund.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}

      {result && (
        <section className="section">
          <div className="container">
            <div className="wiz-result">
              <h2 className="wiz-result__title">Twoja wizualizacja jest gotowa ✨</h2>
              <p className="wiz-result__sub">
                Kopia poszła też na <b>{form.email}</b>, a nasz handlowiec skontaktuje się w 24h z indywidualną wyceną.
              </p>
              <div className="wiz-result__img-wrap">
                <img src={result.image} alt="Wygenerowana wizualizacja" />
              </div>
              <div className="wiz-result__actions">
                <a href={result.image} download={`alukomfort-${product}-wizualizacja.png`}>
                  <Button variant="primary" size="lg">⬇ Pobierz wizualizację</Button>
                </a>
                <Button variant="ghost-dark" size="lg" onClick={onQuote}>Zamów dokładną wycenę</Button>
                {result.remaining > 0 && (
                  <Button variant="ghost-dark" size="lg" onClick={reset}>Wygeneruj kolejną ({result.remaining})</Button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* INFO SEKCJA */}
      <section className="section section--ink">
        <div className="container">
          <div className="wiz-info">
            <div className="wiz-info__col">
              <div className="wiz-info__icon">🎯</div>
              <h3>Realistyczne wymiary</h3>
              <p>Generator dba o proporcje pergoli względem Twojego tarasu — żadnych „zabawkowych" rozmiarów.</p>
            </div>
            <div className="wiz-info__col">
              <div className="wiz-info__icon">⚡</div>
              <h3>30 sekund</h3>
              <p>Najnowszy model gpt-image-2 generuje fotorealistyczną wizualizację w czasie krótszym niż kawa.</p>
            </div>
            <div className="wiz-info__col">
              <div className="wiz-info__icon">🛡</div>
              <h3>Twoje dane są bezpieczne</h3>
              <p>Zdjęcie używamy tylko do tej generacji, nie zapisujemy w bazach treningowych. RODO + zgoda jednorazowa.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

window.PageWizualizacja = PageWizualizacja;
