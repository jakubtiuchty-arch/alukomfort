// Strona /wizualizacja — konfigurator wizualizacji: zdjęcie tarasu + produkt → wygenerowana wizualizacja

// TRYB TESTOWY — pomija formularz "Twoje dane", walidację kontaktu i limit dzienny.
// Ustaw na false, aby przywrócić pełny formularz leadowy. (Backend reaguje na flagę testMode.)
const WIZ_TEST_MODE = false;

const WIZ_PRODUCTS = [
  { id: 'linea',   name: 'LINEA',   sub: 'Aluminiowe zadaszenie samonośne',   img: 'uploads/wiz-linea.webp' },
  { id: 'horizon', name: 'HORIZON', sub: 'Pergola bioklimatyczna lamelowa',   img: 'uploads/wiz-horizon.webp' },
  { id: 'roma',    name: 'ROMA',    sub: 'Pergola tkaninowa',                 img: 'uploads/wiz-roma.webp' },
];

const COLORS = [
  { id: 'ral-7016',  name: 'Antracyt RAL 7016', swatch: '#2c3033' },
  { id: 'ral-9005',  name: 'Czarny RAL 9005',   swatch: '#0c0c0c' },
  { id: 'ral-9010',  name: 'Biały RAL 9010',    swatch: '#f2f0ea' },
  { id: 'terra',     name: 'Terra',             swatch: '#bea991' },
  { id: 'grey-brown',name: 'Grey Brown',        swatch: '#646363' },
  { id: 'mica',      name: 'Mica',              swatch: '#53565c' },
  { id: 'azzurro',   name: 'Azzurro',           swatch: '#464b55' },
];

// Rodzaje dachu zależne od produktu (zgodne z podstronami)
const WIZ_ROOFS = {
  linea: [
    { id: 'opal',    name: 'Poliwęglan Strong Opal', sub: 'Mleczny — maksymalna jasność', swatch: '#f0f1eb' },
    { id: 'boxgrey', name: 'Poliwęglan BOX Grey',    sub: 'Przyciemniany — chłodny efekt', swatch: '#8790a0' },
    { id: 'glass',   name: 'Szkło bezpieczne',       sub: 'Przezroczyste ESG / VSG',       swatch: '#dfe7ea' },
  ],
  horizon: [
    { id: 'lamele',  name: 'Dach lamelowy',          sub: 'Ruchome lamele aluminiowe',     swatch: '#3a3a3a' },
    { id: 'glass',   name: 'Dach szklany',           sub: 'Szkło bezpieczne',              swatch: '#dfe7ea' },
    { id: 'hybryda', name: 'Hybryda lamele + szkło', sub: 'Dwie strefy dachu',             swatch: '#9aa3ad' },
  ],
  roma: [
    { id: 'tkanina', name: 'Roleta tkaninowa',       sub: 'Akryl 100% — roleta rzymska',   swatch: '#e7e0d2' },
  ],
};

// Rodzaj zabudowy — stopień zamknięcia konstrukcji
const WIZ_ENCLOSURES = [
  { id: 'open',   name: 'Otwarta pergola',      sub: 'Sama konstrukcja z dachem, bez ścian' },
  { id: 'sides',  name: 'Ze ścianami bocznymi', sub: 'Częściowa zabudowa: szkło, żaluzje lub screen' },
  { id: 'winter', name: 'Ogród letni',          sub: 'Pełna zabudowa szklana — sezonowa strefa wypoczynku' },
];

function PageWizualizacja({ onQuote }) {
  usePageMeta({
    title: 'Wizualizacja pergoli — zobacz ją u siebie | ALUKOMFORT',
    description: 'Wgraj zdjęcie swojego tarasu i zobacz w 30 sekund, jak będzie wyglądać z pergolą ALUKOMFORT (LINEA / HORIZON / ROMA). Bezpłatny konfigurator wizualizacji.',
    canonical: 'https://www.zadaszeniatrzebnica.pl/wizualizacja',
  });

  const [product, setProduct] = React.useState('horizon');
  const [color, setColor] = React.useState('ral-7016');
  const [roof, setRoof] = React.useState('lamele');
  const [enclosure, setEnclosure] = React.useState('open');
  const roofList = WIZ_ROOFS[product] || WIZ_ROOFS.linea;
  // ROMA (pergola tkaninowa) nie ma zabudowy ścian — tylko otwarta konstrukcja
  const enclosureList = product === 'roma' ? WIZ_ENCLOSURES.filter(e => e.id === 'open') : WIZ_ENCLOSURES;

  // Zmiana produktu resetuje rodzaj dachu i (dla ROMA) wymusza zabudowę otwartą
  const selectProduct = (id) => {
    setProduct(id);
    const list = WIZ_ROOFS[id] || WIZ_ROOFS.linea;
    setRoof(list[0].id);
    if (id === 'roma') setEnclosure('open');
  };
  const [file, setFile] = React.useState(null); // {name, mime, base64, previewUrl}
  const [form, setForm] = React.useState({ name: '', surname: '', email: '', phone: '', address: '', notes: '', rodo: false });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState(null); // {image, remaining}
  const [serverError, setServerError] = React.useState('');
  const fileInputRef = React.useRef(null);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  // Zaznaczanie linii zadaszenia na zdjęciu (jak w panelu handlowca) — opcjonalne.
  const [points, setPoints] = React.useState([]);
  const markRef = React.useRef(null);
  const addPoint = (e) => {
    const r = markRef.current.getBoundingClientRect();
    let x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    x = Math.min(1, Math.max(0, x)); y = Math.min(1, Math.max(0, y));
    setPoints(p => [...p, { x, y }]);
  };
  const undoPoint = () => setPoints(p => p.slice(0, -1));
  const clearLine = () => setPoints([]);
  const hasLine = points.length >= 2;

  const buildMarkedImage = () => new Promise((resolve) => {
    if (points.length < 2 || !file) { resolve({ base64: file?.base64, mime: file?.mime, marked: false }); return; }
    const img = new Image();
    img.onload = () => {
      try {
        const c = document.createElement('canvas');
        c.width = img.naturalWidth || img.width; c.height = img.naturalHeight || img.height;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0, c.width, c.height);
        const pts = points.map(p => ({ x: p.x * c.width, y: p.y * c.height }));
        const lw = Math.max(5, Math.round(c.width * 0.008));
        ctx.lineJoin = 'round'; ctx.lineCap = 'round';
        ctx.strokeStyle = '#ff00c8'; ctx.lineWidth = lw;
        ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
        ctx.stroke();
        ctx.fillStyle = '#ff00c8';
        pts.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, lw * 1.15, 0, Math.PI * 2); ctx.fill(); });
        // Pionowe znaczniki na pierwszym i ostatnim punkcie — wskazują DOKŁADNIE,
        // gdzie mają stanąć skrajne słupy/krawędzie zadaszenia (pion jest dla modelu
        // znacznie mocniejszą kotwicą niż sama kropka na prawie poziomej linii).
        const endH = Math.round(c.height * 0.30);
        [pts[0], pts[pts.length - 1]].forEach(p => {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x, Math.max(0, p.y - endH)); ctx.stroke();
        });
        const d = c.toDataURL('image/jpeg', 0.9);
        resolve({ base64: d.split(',')[1], mime: 'image/jpeg', marked: true });
      } catch (e2) { resolve({ base64: file.base64, mime: file.mime, marked: false }); }
    };
    img.onerror = () => resolve({ base64: file.base64, mime: file.mime, marked: false });
    img.src = file.previewUrl;
  });

  // Skaluje zdjęcie do max 1536 px i kompresuje do JPEG — payload < limitu Vercela (4.5 MB)
  // oraz szybsza generacja. Zwraca { mime, base64, previewUrl }.
  const downscaleImage = (f) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Nie udało się odczytać pliku.'));
    reader.onload = (ev) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Nie udało się wczytać obrazu.'));
      img.onload = () => {
        const MAX = 1536;
        let { width, height } = img;
        if (width > MAX || height > MAX) {
          const r = Math.min(MAX / width, MAX / height);
          width = Math.round(width * r);
          height = Math.round(height * r);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        resolve({ mime: 'image/jpeg', base64: dataUrl.split(',')[1], previewUrl: dataUrl });
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(f);
  });

  const handleFile = async (f) => {
    if (!f) return;
    if (!/^image\/(png|jpeg|jpg|webp)$/i.test(f.type)) {
      setErrors(e => ({ ...e, file: 'Dozwolone formaty: JPG, PNG, WEBP.' })); return;
    }
    if (f.size > 20 * 1024 * 1024) {
      setErrors(e => ({ ...e, file: 'Plik większy niż 20 MB. Wybierz mniejsze zdjęcie.' })); return;
    }
    try {
      const out = await downscaleImage(f);
      clearLine();
      setFile({ name: f.name, mime: out.mime, base64: out.base64, previewUrl: out.previewUrl });
      setErrors(e => { const { file, ...rest } = e; return rest; });
    } catch (err) {
      setErrors(e => ({ ...e, file: err.message || 'Błąd przetwarzania zdjęcia.' }));
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };
  const onDragOver = (e) => e.preventDefault();

  const submit = async (e) => {
    if (e) e.preventDefault();
    const err = {};
    if (!file) err.file = 'Wgraj zdjęcie tarasu / domu.';
    if (!WIZ_TEST_MODE) {
      if (!form.name.trim()) err.name = 'Podaj imię.';
      if (!form.surname.trim()) err.surname = 'Podaj nazwisko.';
      if (!form.email.trim()) err.email = 'Podaj e-mail.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Niepoprawny e-mail.';
      if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 9) err.phone = 'Podaj telefon (min. 9 cyfr).';
      if (!form.address.trim()) err.address = 'Podaj miejsce instalacji pergoli.';
      if (!form.rodo) err.rodo = 'Wymagana zgoda na przetwarzanie danych.';
    }
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    setLoading(true);
    setServerError('');
    setResult(null);
    try {
      const img = await buildMarkedImage();
      const r = await fetch('/api/wizualizacja', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product,
          color,
          roof,
          enclosure,
          imageBase64: img.base64,
          mimeType: img.mime,
          marker: img.marked,
          markerPoints: img.marked ? points.length : 0,
          name: form.name.trim(),
          surname: form.surname.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          notes: form.notes.trim(),
          rodo: form.rodo,
          testMode: WIZ_TEST_MODE,
        }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || 'Błąd generatora.');
      window.trackEvent && window.trackEvent('lead_wizualizacja', { product, color, roof });
      setResult(j);
    } catch (e2) {
      setServerError(e2.message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setResult(null); setFile(null); clearLine(); setServerError(''); };

  return (
    <>
      <Breadcrumbs items={[
        { label: 'Strona główna', href: '/' },
        { label: 'Wizualizacja' },
      ]} />

      <section className="hero" style={{height: 320}}>
        <div className="hero__img" style={{backgroundImage:"url('uploads/wiz-hero-blueprint.webp')", backgroundSize:'cover', backgroundPosition:'center right', backgroundColor:'#0c0c0e'}} />
        <div className="hero__scrim" style={{background: 'linear-gradient(90deg, rgba(8,8,10,0.94) 0%, rgba(8,8,10,0.7) 36%, rgba(8,8,10,0.18) 100%)'}} />
        <div className="container hero__inner">
          <div className="hero__content" style={{maxWidth: 720}}>
            <div className="hero__eyebrow">NOWOŚĆ · KONFIGURATOR WIZUALIZACJI</div>
            <h1 className="hero__title" style={{fontSize: 42}}>Zobacz pergolę u siebie</h1>
            <p className="hero__sub">
              Wgraj zdjęcie swojego tarasu — w 30 sekund dorysujemy wybraną pergolę ALUKOMFORT
              w realistycznej skali, zachowując oryginalne światło i perspektywę.
            </p>
          </div>
        </div>
      </section>

      <section className="section wiz-how">
        <div className="container">
          <SectionHead title="Jak to działa — w 3 krokach"
            sub="Wgraj zdjęcie, wybierz system i kolor, a w 30 sekund otrzymasz realistyczny podgląd pergoli w Twojej przestrzeni." />
          <div className="wiz-steps-row">
            <div className="wiz-step-mini"><span className="wiz-step-mini__num">1</span><div><strong>Wgraj zdjęcie</strong><p>Sfotografuj taras lub ogród telefonem i wgraj zdjęcie do konfiguratora.</p></div></div>
            <div className="wiz-step-mini"><span className="wiz-step-mini__num">2</span><div><strong>Wybierz system i kolor</strong><p>LINEA, HORIZON lub ROMA — w kolorze z palety RAL lub teksturze drewnopodobnej.</p></div></div>
            <div className="wiz-step-mini"><span className="wiz-step-mini__num">3</span><div><strong>Odbierz wizualizację</strong><p>Otrzymasz realistyczny podgląd pergoli w Twojej przestrzeni.</p></div></div>
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
                  {WIZ_PRODUCTS.map(p => (
                    <button
                      type="button"
                      key={p.id}
                      className={`wiz-product ${product === p.id ? 'is-active' : ''}`}
                      onClick={() => selectProduct(p.id)}
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

            {/* KROK 3: rodzaj dachu */}
            <div className="wiz-step">
              <div className="wiz-step__num">3</div>
              <div className="wiz-step__body">
                <h2 className="wiz-step__title">Wybierz rodzaj dachu</h2>
                <div className="wiz-colors">
                  {roofList.map(r => (
                    <button
                      type="button"
                      key={r.id}
                      className={`wiz-color ${roof === r.id ? 'is-active' : ''}`}
                      onClick={() => setRoof(r.id)}
                    >
                      <span className="wiz-color__sw" style={{background: r.swatch, borderRadius: 4}} />
                      <span className="wiz-color__lbl">{r.name}</span>
                    </button>
                  ))}
                </div>
                <p className="wiz-help" style={{margin: '10px 0 0'}}>
                  {(roofList.find(r => r.id === roof) || roofList[0]).sub}
                </p>
              </div>
            </div>

            {/* KROK 4: rodzaj zabudowy */}
            <div className="wiz-step">
              <div className="wiz-step__num">4</div>
              <div className="wiz-step__body">
                <h2 className="wiz-step__title">Rodzaj zabudowy</h2>
                <p className="wiz-help" style={{margin: '0 0 14px'}}>
                  {product === 'roma'
                    ? 'Pergola tkaninowa ROMA występuje wyłącznie jako lekka, otwarta konstrukcja.'
                    : 'Wybierz, czy chcesz otwartą pergolę, czy zamkniętą przestrzeń (np. ogród letni).'}
                </p>
                <div className="wiz-colors">
                  {enclosureList.map(en => (
                    <button
                      type="button"
                      key={en.id}
                      className={`wiz-color ${enclosure === en.id ? 'is-active' : ''}`}
                      onClick={() => setEnclosure(en.id)}
                      style={{flexDirection: 'column', alignItems: 'flex-start', gap: 2, padding: '10px 14px'}}
                    >
                      <span className="wiz-color__lbl" style={{fontWeight: 700}}>{en.name}</span>
                      <span className="wiz-color__lbl" style={{fontSize: 12, color: '#666'}}>{en.sub}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* KROK 5: zdjęcie */}
            <div className="wiz-step">
              <div className="wiz-step__num">5</div>
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
                    <div className="adm-mark" ref={markRef} onClick={addPoint}>
                      <img src={file.previewUrl} alt="Twoje zdjęcie" draggable={false} />
                      {points.length >= 2 && (
                        <svg className="adm-mark__svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <polyline points={points.map(p => `${p.x*100},${p.y*100}`).join(' ')} vectorEffect="non-scaling-stroke" />
                          {[points[0], points[points.length - 1]].map((p, i) => (
                            <line key={i} x1={p.x*100} y1={p.y*100} x2={p.x*100} y2={Math.max(0, p.y*100 - 30)} vectorEffect="non-scaling-stroke" />
                          ))}
                        </svg>
                      )}
                      {points.map((p, i) => (
                        <span key={i} className="adm-mark__pt" style={{ left: `${p.x*100}%`, top: `${p.y*100}%` }}>{i + 1}</span>
                      ))}
                      {points.length > 0 && (
                        <span className="adm-mark__tag" style={{ left: `${points[0].x*100}%`, top: `${points[0].y*100}%` }}>Linia zadaszenia</span>
                      )}
                      {points.length === 0 && <div className="adm-mark__hint">Opcjonalnie: stukaj / klikaj punkty wzdłuż ściany — narożnik na 2 strony = min. 3 punkty</div>}
                    </div>
                    <div className="adm-mark__bar">
                      {hasLine
                        ? <span className="adm-mark__ok">✓ Linia zaznaczona ({points.length} pkt)</span>
                        : points.length === 1
                          ? <span className="wiz-help" style={{margin:0}}>Dodaj kolejny punkt (min. 2; narożnik = 3)</span>
                          : <span className="wiz-help" style={{margin:0}}>Opcjonalnie zaznacz, skąd dokąd ma sięgać zadaszenie</span>}
                      {points.length > 0 && <button type="button" className="wiz-link" onClick={undoPoint}>Cofnij punkt</button>}
                      {points.length > 0 && <button type="button" className="wiz-link" onClick={clearLine}>Wyczyść</button>}
                      <button type="button" className="wiz-link" onClick={() => { setFile(null); clearLine(); }}>Zmień zdjęcie</button>
                    </div>
                  </div>
                )}
                {errors.file && <div className="wiz-err">{errors.file}</div>}
              </div>
            </div>

            {/* KROK 6: dane kontaktowe (ukryte w trybie testowym) */}
            {!WIZ_TEST_MODE && (
            <div className="wiz-step">
              <div className="wiz-step__num">6</div>
              <div className="wiz-step__body">
                <h2 className="wiz-step__title">Twoje dane (do przesłania wizualizacji)</h2>
                <p className="wiz-help">
                  Wynik dostaniesz na e-mail. Nasz handlowiec skontaktuje się z propozycją wyceny — bez zobowiązań.
                </p>
                <form className="wiz-form" onSubmit={submit}>
                  <div className="wiz-row-2">
                    <div className="wiz-field">
                      <label>Imię *</label>
                      <input type="text" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Jan" />
                      {errors.name && <div className="wiz-err">{errors.name}</div>}
                    </div>
                    <div className="wiz-field">
                      <label>Nazwisko *</label>
                      <input type="text" value={form.surname} onChange={e => set('surname', e.target.value)} placeholder="Kowalski" />
                      {errors.surname && <div className="wiz-err">{errors.surname}</div>}
                    </div>
                  </div>
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
                    <label>Miejsce instalacji pergoli *</label>
                    <input type="text" value={form.address} onChange={e => set('address', e.target.value)} placeholder="Miasto, kod pocztowy — np. Wrocław, 50-001" />
                    {errors.address && <div className="wiz-err">{errors.address}</div>}
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
                      {loading ? 'Generuję wizualizację (~30 s)...' : '✨ Wygeneruj wizualizację'}
                    </Button>
                    <p className="wiz-help" style={{margin: '10px 0 0', fontSize: 12}}>
                      Wynik ma charakter poglądowy i może zawierać błędy — to podgląd, nie projekt finalny.
                      Limit: 2 wizualizacje na dobę. Czas generowania: 20–40 sekund.
                    </p>
                  </div>
                </form>
              </div>
            </div>
            )}

            {/* TRYB TESTOWY — generowanie bez formularza kontaktowego */}
            {WIZ_TEST_MODE && (
            <div className="wiz-step">
              <div className="wiz-step__num">6</div>
              <div className="wiz-step__body">
                <h2 className="wiz-step__title">Wygeneruj wizualizację</h2>
                <p className="wiz-help">Wynik ma charakter poglądowy i może zawierać błędy — to podgląd, nie projekt finalny. Tryb testowy — formularz danych kontaktowych jest tymczasowo wyłączony.</p>
                {serverError && (<div className="wiz-server-err">⚠ {serverError}</div>)}
                <div className="wiz-cta">
                  <Button type="button" variant="primary" size="lg" disabled={loading} onClick={() => submit()}>
                    {loading ? 'Generuję wizualizację (~30 s)...' : '✨ Wygeneruj wizualizację'}
                  </Button>
                </div>
              </div>
            </div>
            )}
          </div>
        </section>
      )}

      {result && (
        <section className="section">
          <div className="container">
            <div className="wiz-result">
              <h2 className="wiz-result__title">Twoja wizualizacja jest gotowa ✨</h2>
              <p className="wiz-result__sub">
                {WIZ_TEST_MODE
                  ? 'Tryb testowy — wizualizacja wygenerowana lokalnie, bez wysyłki e-mail i bez leada.'
                  : <>Pobierz obraz poniżej — a nasz handlowiec skontaktuje się w 24h z indywidualną wyceną.</>}
              </p>
              <div className="wiz-result__img-wrap">
                <img src={result.image} alt="Wygenerowana wizualizacja" />
              </div>
              <div className="wiz-disclaimer">
                <strong>Wizualizacja ma charakter wyłącznie poglądowy.</strong> Obraz pokazuje, jak pergola lub zadaszenie ALUKOMFORT
                może wyglądać w Twojej przestrzeni — nie jest projektem ani wizualizacją finalną i może zawierać
                błędy (proporcje, detale konstrukcji, kolory, cienie). Wiążący wygląd i wymiary ustalamy w indywidualnej wycenie.
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
              <img className="wiz-info__icon" src="uploads/icons/wiz-proporcje.webp" alt="" width="56" height="56" loading="lazy" />
              <h3>Realistyczne proporcje</h3>
              <p>Konstrukcja zachowuje właściwe proporcje względem tarasu oraz perspektywę i światło z oryginalnego zdjęcia.</p>
            </div>
            <div className="wiz-info__col">
              <img className="wiz-info__icon" src="uploads/icons/wiz-czas.webp" alt="" width="56" height="56" loading="lazy" />
              <h3>Wizualizacja w 30 sekund</h3>
              <p>Fotorealistyczny podgląd wybranej pergoli otrzymujesz w około pół minuty od wgrania zdjęcia.</p>
            </div>
            <div className="wiz-info__col">
              <img className="wiz-info__icon" src="uploads/icons/wiz-bezpieczenstwo.webp" alt="" width="56" height="56" loading="lazy" />
              <h3>Bezpieczeństwo danych</h3>
              <p>Zdjęcie wykorzystujemy wyłącznie do wygenerowania tej wizualizacji i nie używamy go do trenowania modeli. Przetwarzanie zgodne z RODO, na podstawie jednorazowej zgody.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

window.PageWizualizacja = PageWizualizacja;
