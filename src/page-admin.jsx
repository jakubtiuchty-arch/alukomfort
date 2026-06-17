// Panel handlowca /admin — generator wizualizacji u klienta (aparat + pełne opcje serii)

const ADMIN_COLORS = [
  { id: 'ral-7016',  name: 'Antracyt RAL 7016', swatch: '#2c3033' },
  { id: 'ral-9005',  name: 'Czarny RAL 9005',   swatch: '#0c0c0c' },
  { id: 'ral-9010',  name: 'Biały RAL 9010',    swatch: '#f2f0ea' },
  { id: 'terra',     name: 'Terra',             swatch: '#bea991' },
  { id: 'grey-brown',name: 'Grey Brown',        swatch: '#646363' },
  { id: 'mica',      name: 'Mica',              swatch: '#53565c' },
  { id: 'azzurro',   name: 'Azzurro',           swatch: '#464b55' },
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
        { name: 'Ogród letni',       v: 'winter' },
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

  // Linia zadaszenia na zdjęciu — wielopunktowa łamana (punkty znormalizowane 0..1).
  // Min. 2 punkty (ściana), 3+ gdy zadaszenie ma iść za narożnik na dwie strony.
  const [points, setPoints] = React.useState([]);
  const markRef = React.useRef(null);

  const addPoint = (e) => {
    const r = markRef.current.getBoundingClientRect();
    let x = (e.clientX - r.left) / r.width;
    let y = (e.clientY - r.top) / r.height;
    x = Math.min(1, Math.max(0, x)); y = Math.min(1, Math.max(0, y));
    setPoints(p => [...p, { x, y }]);
  };
  const undoPoint = () => setPoints(p => p.slice(0, -1));
  const clearLine = () => setPoints([]);
  const hasLine = points.length >= 2;

  // Wypala linię zaznaczenia w obrazie (w rozdzielczości zdjęcia); bez linii zwraca oryginał
  const buildMarkedImage = () => new Promise((resolve) => {
    if (points.length < 2 || !file) { resolve({ base64: file?.base64, mime: file?.mime, marked: false }); return; }
    const img = new Image();
    img.onload = () => {
      try {
        const c = document.createElement('canvas');
        c.width = img.naturalWidth || img.width;
        c.height = img.naturalHeight || img.height;
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
        const d = c.toDataURL('image/jpeg', 0.9);
        resolve({ base64: d.split(',')[1], mime: 'image/jpeg', marked: true });
      } catch (e2) { resolve({ base64: file.base64, mime: file.mime, marked: false }); }
    };
    img.onerror = () => resolve({ base64: file.base64, mime: file.mime, marked: false });
    img.src = file.previewUrl;
  });

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
    setErr(''); clearLine();
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
      const img = await buildMarkedImage();
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
          imageBase64: img.base64,
          mimeType: img.mime,
          marker: img.marked,
          markerPoints: img.marked ? points.length : 0,
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
                <div className="adm-mark" ref={markRef} onClick={addPoint}>
                  <img src={file.previewUrl} alt="Zdjęcie" draggable={false} />
                  {points.length >= 2 && (
                    <svg className="adm-mark__svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <polyline points={points.map(p => `${p.x*100},${p.y*100}`).join(' ')} vectorEffect="non-scaling-stroke" />
                    </svg>
                  )}
                  {points.map((p, i) => (
                    <span key={i} className="adm-mark__pt" style={{ left: `${p.x*100}%`, top: `${p.y*100}%` }}>{i + 1}</span>
                  ))}
                  {points.length > 0 && (
                    <span className="adm-mark__tag" style={{ left: `${points[0].x*100}%`, top: `${points[0].y*100}%` }}>Linia zadaszenia</span>
                  )}
                  {points.length === 0 && <div className="adm-mark__hint">Stukaj / klikaj kolejne punkty wzdłuż ściany — narożnik na 2 strony = min. 3 punkty</div>}
                </div>
                <div className="adm-mark__bar">
                  {hasLine
                    ? <span className="adm-mark__ok">✓ Linia zaznaczona ({points.length} pkt) — trafi do generatora</span>
                    : points.length === 1
                      ? <span className="adm-muted">Dodaj kolejny punkt (min. 2; narożnik = 3)</span>
                      : <span className="adm-muted">Zaznaczenie opcjonalne — stukaj punkty wzdłuż ściany</span>}
                  {points.length > 0 && <button className="adm-link" onClick={undoPoint}>Cofnij punkt</button>}
                  {points.length > 0 && <button className="adm-link" onClick={clearLine}>Wyczyść</button>}
                  <button className="adm-link" onClick={() => { setFile(null); clearLine(); }}>Zmień zdjęcie</button>
                </div>
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
              <button className="adm-btn" onClick={() => { setResult(null); setFile(null); clearLine(); }}>📷 Nowe zdjęcie</button>
            </div>
            <p className="adm-hint">Na telefonie możesz też przytrzymać zdjęcie palcem, aby zapisać je do galerii.</p>
          </div>
        </div>
      )}
    </div>
  );
}

window.PageAdmin = PageAdmin;
