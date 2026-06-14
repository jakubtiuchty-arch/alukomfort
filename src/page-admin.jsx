// Panel handlowca /admin — generator wizualizacji u klienta (aparat + pełne opcje serii)

const ADMIN_COLORS = [
  { id: 'ral-7016',     name: 'Antracyt RAL 7016',  swatch: '#2c3033' },
  { id: 'ral-9005',     name: 'Czarny RAL 9005',    swatch: '#0c0c0c' },
  { id: 'ral-9010',     name: 'Biały RAL 9010',     swatch: '#f2f0ea' },
  { id: 'ral-7039',     name: 'Szary RAL 7039',     swatch: '#6d6a63' },
  { id: 'czarna-wisnia',name: 'Czarna wiśnia',      swatch: '#3a201c' },
  { id: 'sosna',        name: 'Sosna',              swatch: '#b6783a' },
  { id: 'srebrny-dab',  name: 'Srebrny dąb',        swatch: '#9b948a' },
  { id: 'zloty-dab',    name: 'Złoty dąb',          swatch: '#a8631f' },
];

const ADMIN_PRODUCTS = [
  { id: 'linea',   name: 'LINEA',   sub: 'Zadaszenie samonośne / przyścienne' },
  { id: 'horizon', name: 'HORIZON', sub: 'Pergola bioklimatyczna' },
  { id: 'roma',    name: 'ROMA',    sub: 'Pergola tkaninowa' },
];

// Pełne opcje per seria. Pole "v" = wartość wysyłana do generatora (id wizualnego promptu).
const ADMIN_CONFIG = {
  linea: {
    fields: [
      { key: 'roof', label: 'Pokrycie dachu', options: [
        { name: 'Poliwęglan Strong Opal',        sub: 'mleczny, maks. jasność', v: 'opal' },
        { name: 'Poliwęglan Solar Control Opal', sub: 'mleczny, chłodny',       v: 'opal' },
        { name: 'Poliwęglan BOX Grey',           sub: 'przyciemniany',          v: 'boxgrey' },
        { name: 'Szkło ESG',                     sub: 'hartowane',              v: 'glass' },
        { name: 'Szkło VSG',                     sub: 'laminowane',             v: 'glass' },
        { name: 'Szkło VSG/ESG',                 sub: 'kombinacja',             v: 'glass' },
      ]},
      { key: 'montaz', label: 'Montaż', options: [
        { name: 'Przyścienna', v: 'przyscienna' },
        { name: 'Samonośna',   v: 'samonosna' },
      ]},
      { key: 'enclosure', label: 'Zabudowa ścian', options: [
        { name: 'Bez zabudowy',      v: 'open' },
        { name: 'Szyby przesuwne',   v: 'szyby' },
        { name: 'Rolety screen',     v: 'screen' },
        { name: 'Żaluzje',           v: 'zaluzje' },
        { name: 'Panele aluminiowe', v: 'panele' },
        { name: 'Ogród zimowy',      v: 'winter' },
      ]},
    ],
  },
  horizon: {
    fields: [
      { key: 'roof', label: 'Wariant dachu', options: [
        { name: 'HORIZON L — lamele',      sub: 'ruchome lamele',      v: 'lamele' },
        { name: 'HORIZON S — szkło',       sub: 'dach szklany',        v: 'glass' },
        { name: 'HORIZON L-S — hybryda',   sub: 'lamele + szkło',      v: 'hybryda' },
      ]},
      { key: 'enclosure', label: 'Zabudowa ścian', options: [
        { name: 'Bez zabudowy',     v: 'open' },
        { name: 'Szyby przesuwne',  v: 'szyby' },
        { name: 'Shuttery / żaluzje', v: 'zaluzje' },
        { name: 'Rolety screen',    v: 'screen' },
        { name: 'Pełna zabudowa',   v: 'winter' },
      ]},
    ],
  },
  roma: {
    fields: [
      { key: 'roof', label: 'Dach', options: [
        { name: 'Roleta tkaninowa (akryl)', sub: 'beżowa tkanina', v: 'tkanina' },
      ]},
      { key: 'enclosure', label: 'Zabudowa', options: [
        { name: 'Konstrukcja otwarta', v: 'open' },
      ]},
      { key: 'modul', label: 'Moduł', dim: true, options: [
        { name: '3 × 3 m', v: '3x3 m' }, { name: '4 × 3 m', v: '4x3 m' },
        { name: '4 × 4 m', v: '4x4 m' }, { name: '5 × 4 m', v: '5x4 m' }, { name: '6 × 4 m', v: '6x4 m' },
      ]},
    ],
  },
};

function PageAdmin() {
  const [pin, setPin] = React.useState(() => sessionStorage.getItem('ak_admin_pin') || '');
  const [pinInput, setPinInput] = React.useState('');
  const [product, setProduct] = React.useState('linea');
  const [sel, setSel] = React.useState({}); // { fieldKey: optionIndex }
  const [colorIdx, setColorIdx] = React.useState(0);
  const [led, setLed] = React.useState(false);
  const [wymiary, setWymiary] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [err, setErr] = React.useState('');
  const camRef = React.useRef(null);
  const fileRef = React.useRef(null);

  const cfg = ADMIN_CONFIG[product];

  const selectProduct = (id) => { setProduct(id); setSel({}); setResult(null); setErr(''); };
  const pick = (key, idx) => setSel(s => ({ ...s, [key]: idx }));
  const idxOf = (key) => (sel[key] != null ? sel[key] : 0);

  const downscale = (f) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Nie udało się odczytać pliku zdjęcia.'));
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      const rawFallback = () => {
        try { resolve({ mime: f.type || 'image/jpeg', base64: String(dataUrl).split(',')[1], previewUrl: dataUrl }); }
        catch (e2) { reject(new Error('Nie udało się przetworzyć zdjęcia. Spróbuj inne zdjęcie.')); }
      };
      const img = new Image();
      img.onerror = () => reject(new Error('Nie udało się wczytać zdjęcia. Jeśli robisz zdjęcie iPhonem, ustaw w Aparacie format „Najbardziej zgodny" (JPEG) lub wybierz zdjęcie z galerii.'));
      img.onload = () => {
        try {
          const MAX = 1536;
          let w = img.naturalWidth || img.width, h = img.naturalHeight || img.height;
          if (!w || !h) { rawFallback(); return; }
          if (w > MAX || h > MAX) { const r = Math.min(MAX / w, MAX / h); w = Math.round(w * r); h = Math.round(h * r); }
          const c = document.createElement('canvas'); c.width = w; c.height = h;
          c.getContext('2d').drawImage(img, 0, 0, w, h);
          const d = c.toDataURL('image/jpeg', 0.85);
          if (!d || d.length < 100) { rawFallback(); return; }
          resolve({ mime: 'image/jpeg', base64: d.split(',')[1], previewUrl: d });
        } catch (e) {
          rawFallback();
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(f);
  });

  const handleFile = async (f) => {
    if (!f) return;
    setErr('');
    try { const out = await downscale(f); setFile({ name: f.name, ...out }); }
    catch (e) { console.error('[admin handleFile]', e); setErr(e.message || 'Błąd przetwarzania zdjęcia.'); }
  };

  const generate = async () => {
    if (!file) { setErr('Najpierw zrób lub wgraj zdjęcie.'); return; }
    setLoading(true); setErr(''); setResult(null);
    const roofOpt = cfg.fields.find(f => f.key === 'roof');
    const enclOpt = cfg.fields.find(f => f.key === 'enclosure');
    const montazOpt = cfg.fields.find(f => f.key === 'montaz');
    const modulOpt = cfg.fields.find(f => f.dim);
    const dimParts = [];
    if (modulOpt) dimParts.push(modulOpt.options[idxOf(modulOpt.key)].v);
    if (wymiary.trim()) dimParts.push(wymiary.trim());
    try {
      const r = await fetch('/api/wizualizacja', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          admin: true,
          adminPin: pin,
          product,
          color: ADMIN_COLORS[colorIdx].id,
          roof: roofOpt ? roofOpt.options[idxOf('roof')].v : undefined,
          enclosure: enclOpt ? enclOpt.options[idxOf('enclosure')].v : undefined,
          montaz: montazOpt ? montazOpt.options[idxOf('montaz')].v : undefined,
          led,
          dimensions: dimParts.join(', ') || undefined,
          notes: notes.trim() || undefined,
          imageBase64: file.base64,
          mimeType: file.mime,
        }),
      });
      let j;
      try { j = await r.json(); }
      catch (pe) { throw new Error(r.ok ? 'Nieprawidłowa odpowiedź serwera.' : `Błąd serwera (${r.status}).`); }
      if (!r.ok) throw new Error(j.error || 'Błąd generatora.');
      setResult(j);
    } catch (e) { console.error('[admin generate]', e); setErr(e.message || 'Błąd generatora.'); }
    finally { setLoading(false); }
  };

  const dataURLtoFile = (dataUrl, name) => {
    const [head, b64] = String(dataUrl).split(',');
    const mime = (head.match(/data:(.*?);/) || [])[1] || 'image/png';
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    return new File([arr], name, { type: mime });
  };

  const saveImage = async () => {
    const name = `alukomfort-${product}-wizualizacja.png`;
    let f = null;
    try { f = dataURLtoFile(result.image, name); } catch (e) { /* poniżej */ }
    // Telefon: systemowy arkusz „Udostępnij/Zapisz" (m.in. zapis do Zdjęć na iPhone)
    if (f && navigator.canShare && navigator.canShare({ files: [f] })) {
      try { await navigator.share({ files: [f], title: 'Wizualizacja ALUKOMFORT' }); }
      catch (e) { /* użytkownik anulował — nic nie rób */ }
      return;
    }
    // Desktop: pobranie przez blob
    try {
      const url = URL.createObjectURL(f);
      const a = document.createElement('a');
      a.href = url; a.download = name; document.body.appendChild(a); a.click();
      setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 1000);
    } catch (e) {
      const w = window.open('', '_blank');
      if (w) w.document.write('<img src="' + result.image + '" style="max-width:100%"><p style="font-family:sans-serif">Przytrzymaj zdjęcie, aby zapisać.</p>');
    }
  };

  const logout = () => { sessionStorage.removeItem('ak_admin_pin'); setPin(''); };

  // Ekran logowania
  if (!pin) {
    return (
      <div className="adm-login">
        <div className="adm-login__box">
          <div className="adm-login__brand">ALUKOMFORT<span>panel handlowca</span></div>
          <h1>Generator wizualizacji</h1>
          <p className="adm-muted">Podaj PIN dostępu, aby kontynuować.</p>
          <input type="password" inputMode="numeric" value={pinInput} onChange={e => setPinInput(e.target.value)}
            placeholder="PIN" onKeyDown={e => { if (e.key === 'Enter' && pinInput.trim()) { sessionStorage.setItem('ak_admin_pin', pinInput.trim()); setPin(pinInput.trim()); } }} />
          <button className="adm-btn adm-btn--primary" disabled={!pinInput.trim()}
            onClick={() => { sessionStorage.setItem('ak_admin_pin', pinInput.trim()); setPin(pinInput.trim()); }}>
            Wejdź
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="adm">
      <div className="adm-top">
        <div className="adm-top__brand">ALUKOMFORT<span>panel handlowca</span></div>
        <button className="adm-link" onClick={logout}>Wyloguj</button>
      </div>

      <div className="adm-tabs"><div className="adm-tab is-active">Wygeneruj wizualizację</div></div>

      {!result && (
        <div className="adm-body">
          {/* Zdjęcie */}
          <div className="adm-card adm-photo">
            <h3 className="adm-h">1 · Zdjęcie domu / tarasu klienta</h3>
            {!file ? (
              <div className="adm-cap">
                <button className="adm-btn adm-btn--primary adm-btn--lg" onClick={() => camRef.current?.click()}>📷 Zrób zdjęcie</button>
                <button className="adm-btn adm-btn--lg" onClick={() => fileRef.current?.click()}>📁 Wybierz z galerii</button>
                <input ref={camRef} type="file" accept="image/*" capture="environment" hidden onChange={e => handleFile(e.target.files?.[0])} />
                <input ref={fileRef} type="file" accept="image/*" hidden onChange={e => handleFile(e.target.files?.[0])} />
              </div>
            ) : (
              <div className="adm-preview">
                <img src={file.previewUrl} alt="Zdjęcie" />
                <button className="adm-link" onClick={() => setFile(null)}>Zmień zdjęcie</button>
              </div>
            )}
          </div>

          {/* Produkt */}
          <div className="adm-card">
            <h3 className="adm-h">2 · Seria</h3>
            <div className="adm-products">
              {ADMIN_PRODUCTS.map(p => (
                <button key={p.id} className={`adm-product ${product === p.id ? 'is-active' : ''}`} onClick={() => selectProduct(p.id)}>
                  <span className="adm-product__name">{p.name}</span>
                  <span className="adm-product__sub">{p.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Opcje serii */}
          <div className="adm-card">
            <h3 className="adm-h">3 · Szczegóły — {product.toUpperCase()}</h3>
            {cfg.fields.map(f => (
              <div key={f.key} className="adm-field">
                <div className="adm-field__lbl">{f.label}</div>
                <div className="adm-chips">
                  {f.options.map((o, i) => (
                    <button key={i} className={`adm-chip ${idxOf(f.key) === i ? 'is-active' : ''}`} onClick={() => pick(f.key, i)}>
                      {o.name}{o.sub ? <span className="adm-chip__sub"> · {o.sub}</span> : null}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Kolor konstrukcji */}
            <div className="adm-field">
              <div className="adm-field__lbl">Kolor konstrukcji</div>
              <div className="adm-chips">
                {ADMIN_COLORS.map((c, i) => (
                  <button key={c.id} className={`adm-chip adm-chip--color ${colorIdx === i ? 'is-active' : ''}`} onClick={() => setColorIdx(i)}>
                    <span className="adm-sw" style={{ background: c.swatch }} />{c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* LED + wymiary + uwagi */}
            <div className="adm-field">
              <label className="adm-toggle"><input type="checkbox" checked={led} onChange={e => setLed(e.target.checked)} /> Oświetlenie LED w konstrukcji</label>
            </div>
            <div className="adm-field">
              <div className="adm-field__lbl">Wymiary / uwagi techniczne (opcjonalnie)</div>
              <input className="adm-input" type="text" value={wymiary} onChange={e => setWymiary(e.target.value)} placeholder="np. 5 × 4 m, wysokość 2,5 m" />
            </div>
            <div className="adm-field">
              <input className="adm-input" type="text" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Dodatkowe wskazówki dla wizualizacji (opcjonalnie)" />
            </div>
          </div>

          {err && <div className="adm-err">⚠ {err}</div>}

          <button className="adm-btn adm-btn--primary adm-btn--block" disabled={loading} onClick={generate}>
            {loading ? 'Generuję wizualizację (~30–90 s)…' : '✨ Wygeneruj wizualizację'}
          </button>
        </div>
      )}

      {result && (
        <div className="adm-body">
          <div className="adm-result">
            <img src={result.image} alt="Wizualizacja" />
            <div className="adm-result__actions">
              <button className="adm-btn adm-btn--primary" onClick={saveImage}>⬇ Zapisz / Udostępnij</button>
              <button className="adm-btn" onClick={() => setResult(null)}>← Zmień opcje</button>
              <button className="adm-btn" onClick={() => { setResult(null); setFile(null); }}>📷 Nowe zdjęcie</button>
            </div>
            <p className="adm-hint">Na telefonie możesz też przytrzymać zdjęcie palcem, aby zapisać je do galerii.</p>
          </div>
        </div>
      )}
    </div>
  );
}

window.PageAdmin = PageAdmin;
