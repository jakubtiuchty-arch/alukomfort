// Strona: lista próśb do klienta z możliwością wypełnienia formularza
// Dane zapisywane w localStorage, submit otwiera mailto z całością treści

const LS_KEY = 'alukomfort-client-data-v1';

const PRICE_PRODUCTS = [
  { id: 'linea', name: 'LINEA' },
  { id: 'horizon-l', name: 'HORIZON L (lamelowa)' },
  { id: 'horizon-s', name: 'HORIZON S (szklana)' },
  { id: 'roma', name: 'ROMA' },
];
const PRICE_SIZES = ['3×3', '4×3', '4×4', '5×4', '6×3', '6×4'];

const ACCESSORY_ITEMS = [
  'Liniowe oświetlenie LED',
  'Automatyka SOMFY (z czujnikami pogody)',
  'Ściana — rolety screen',
  'Ściana — szyby przesuwne ESG',
  'Ściana — aluminiowe shuttersy',
  'Kolor premium (drewnopodobny)',
];

function ClientDataPage({ onNavigate }) {
  usePageMeta({
    title: 'Dane od klienta — formularz | ALUKOMFORT',
    description: 'Formularz do uzupełnienia przez PLAST-MET — dane potrzebne do rozbudowy strony ALUKOMFORT.',
    canonical: 'https://alukomfort.pl/#/dane-od-klienta',
  });

  const [data, setData] = React.useState(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return {
      // Grupa A
      phone1: '', phone2: '',
      email: '',
      nip: '', regon: '', krs: '',
      historyText: '',
      photosFabrykaStatus: '',
      prices: {}, // np. { 'linea_3x3_min': '18000', 'linea_3x3_max': '24000' }
      accessoryPrices: {},
      privacyPolicy: '',
      // Grupa B
      photosRealizacjeCount: '',
      photosRealizacjeNote: '',
      cadFiles: '',
    };
  });

  // Zapis do localStorage przy każdej zmianie (debounced przez useEffect)
  React.useEffect(() => {
    const t = setTimeout(() => {
      try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch (e) {}
    }, 300);
    return () => clearTimeout(t);
  }, [data]);

  const update = (field, value) => setData(d => ({ ...d, [field]: value }));
  const updatePrice = (key, value) => setData(d => ({ ...d, prices: { ...d.prices, [key]: value } }));
  const updateAccessory = (key, value) => setData(d => ({ ...d, accessoryPrices: { ...d.accessoryPrices, [key]: value } }));

  // Procent wypełnienia
  const progress = React.useMemo(() => {
    const fields = [
      data.phone1, data.email, data.nip, data.regon,
      data.historyText, data.photosFabrykaStatus, data.privacyPolicy,
      Object.keys(data.prices).filter(k => data.prices[k]).length > 0 ? 'x' : '',
      Object.keys(data.accessoryPrices).filter(k => data.accessoryPrices[k]).length > 0 ? 'x' : '',
      data.photosRealizacjeNote || data.photosRealizacjeCount,
      data.cadFiles,
    ];
    const filled = fields.filter(f => f && String(f).trim()).length;
    return Math.round((filled / fields.length) * 100);
  }, [data]);

  const buildEmailBody = () => {
    const lines = [];
    lines.push('FORMULARZ DANYCH — ALUKOMFORT');
    lines.push('============================');
    lines.push(`Wypełnione w: ${progress}%`);
    lines.push(`Data: ${new Date().toLocaleString('pl-PL')}`);
    lines.push('');
    lines.push('--- GRUPA A — KRYTYCZNE ---');
    lines.push(`Telefon (sprzedaż): ${data.phone1 || '—'}`);
    lines.push(`Telefon (serwis): ${data.phone2 || '—'}`);
    lines.push(`E-mail biura: ${data.email || '—'}`);
    lines.push(`NIP: ${data.nip || '—'}`);
    lines.push(`REGON: ${data.regon || '—'}`);
    lines.push(`KRS: ${data.krs || '—'}`);
    lines.push('');
    lines.push('Historia firmy:');
    lines.push(data.historyText || '— (brak)');
    lines.push('');
    lines.push(`Status zdjęć fabryki: ${data.photosFabrykaStatus || '—'}`);
    lines.push(`Polityka prywatności: ${data.privacyPolicy || '—'}`);
    lines.push('');
    lines.push('CENNIK PRODUKTÓW (widełki min — max, brutto):');
    PRICE_PRODUCTS.forEach(p => {
      PRICE_SIZES.forEach(size => {
        const min = data.prices[`${p.id}_${size}_min`];
        const max = data.prices[`${p.id}_${size}_max`];
        if (min || max) {
          lines.push(`  ${p.name} ${size} m: ${min || '?'} — ${max || '?'} zł`);
        }
      });
    });
    lines.push('');
    lines.push('CENNIK AKCESORIÓW (orientacyjnie):');
    ACCESSORY_ITEMS.forEach(a => {
      const price = data.accessoryPrices[a];
      if (price) lines.push(`  ${a}: ${price}`);
    });
    lines.push('');
    lines.push('--- GRUPA B — WAŻNE ---');
    lines.push(`Liczba realizacji do galerii: ${data.photosRealizacjeCount || '—'}`);
    lines.push(`Uwagi do galerii realizacji: ${data.photosRealizacjeNote || '—'}`);
    lines.push(`Pliki CAD (DWG/DXF): ${data.cadFiles || '—'}`);
    return lines.join('\n');
  };

  const handleSubmitEmail = () => {
    const body = buildEmailBody();
    const subject = encodeURIComponent('ALUKOMFORT — dane od klienta (formularz)');
    const encoded = encodeURIComponent(body);
    window.location.href = `mailto:jakub.tiuchty@gmail.com?subject=${subject}&body=${encoded}`;
  };

  const handleDownload = () => {
    const body = buildEmailBody();
    const blob = new Blob([body], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alukomfort-dane-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (!window.confirm('Wyczyścić cały formularz? Tej operacji nie można cofnąć.')) return;
    localStorage.removeItem(LS_KEY);
    window.location.reload();
  };

  return (
    <>
      <Breadcrumbs items={[
        { label: 'Strona główna', href: '#/' },
        { label: 'Dane od klienta' },
      ]} />

      <section className="hero" style={{height: 280}}>
        <div className="hero__img" style={{background:'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'}} />
        <div className="container hero__inner">
          <div className="hero__content" style={{maxWidth: 720}}>
            <div className="hero__eyebrow">DOKUMENT WEWNĘTRZNY · PLAST-MET</div>
            <h1 className="hero__title" style={{fontSize: 40}}>Formularz danych od klienta</h1>
            <p className="hero__sub">
              Lista wszystkich informacji potrzebnych do realizacji planu rozbudowy strony ALUKOMFORT.
              Wypełnione dane zapisują się automatycznie w przeglądarce.
            </p>
          </div>
        </div>
      </section>

      <section className="cd-progress-bar">
        <div className="container">
          <div className="cd-progress__row">
            <div className="cd-progress__lbl">Wypełnienie formularza</div>
            <div className="cd-progress__num">{progress}%</div>
          </div>
          <div className="cd-progress__track">
            <div className="cd-progress__fill" style={{width: `${progress}%`}} />
          </div>
          <div className="cd-progress__actions">
            <Button variant="primary" size="sm" onClick={handleSubmitEmail}>📧 Wyślij e-mailem do Jakub Tiuchty</Button>
            <Button variant="ghost-dark" size="sm" onClick={handleDownload}>⬇ Pobierz jako .txt</Button>
            <Button variant="ghost-dark" size="sm" onClick={handleClear}>Wyczyść formularz</Button>
          </div>
        </div>
      </section>

      {/* GRUPA A */}
      <section className="section section--soft">
        <div className="container">
          <div className="cd-group-header">
            <div className="cd-group-badge cd-group-badge--p0">Grupa A · Krytyczne</div>
            <h2 className="cd-group-title">Dane potrzebne do startu Etapu 1-2</h2>
            <p className="cd-group-desc">Bez tych informacji prace utkną. Im szybciej je dostarczymy, tym szybciej ruszą realne zmiany na stronie.</p>
          </div>

          <CDField label="Numer telefonu (sprzedaż)" why="Pojawi się w nagłówku, w stopce i w sticky pasku na telefonach.">
            <input type="tel" value={data.phone1} onChange={e => update('phone1', e.target.value)} placeholder="+48 71 312 07 93" />
          </CDField>

          <CDField label="Numer telefonu (serwis) — opcjonalnie" why="Dla klientów z gwarancyjnymi zgłoszeniami serwisowymi. Może być ten sam co sprzedaż.">
            <input type="tel" value={data.phone2} onChange={e => update('phone2', e.target.value)} placeholder="+48 71 387 08 30" />
          </CDField>

          <CDField label="E-mail biura" why="Do formularzy kontaktowych i schema markup dla Google.">
            <input type="email" value={data.email} onChange={e => update('email', e.target.value)} placeholder="biuro@plast-met.pl" />
          </CDField>

          <CDField label="NIP / REGON / KRS PLAST-MET" why="Do strukturalnych danych dla Google (Organization schema) oraz w stopce strony.">
            <div className="cd-row-3">
              <input type="text" value={data.nip} onChange={e => update('nip', e.target.value)} placeholder="NIP" />
              <input type="text" value={data.regon} onChange={e => update('regon', e.target.value)} placeholder="REGON" />
              <input type="text" value={data.krs} onChange={e => update('krs', e.target.value)} placeholder="KRS" />
            </div>
          </CDField>

          <CDField label="Historia firmy" why={`Sekcja „O nas" wymaga 600-1000 słów. Może być wywiad z właścicielem albo punkty kluczowe — my dopiszemy resztę. Wystarczą fakty: rok założenia, ewolucja, rok premiery marki ALUKOMFORT, liczba pracowników, kraje eksportu, kluczowe milestones.`}>
            <textarea rows={10} value={data.historyText} onChange={e => update('historyText', e.target.value)} placeholder="Rok założenia: ...&#10;Pierwotny profil działalności: ...&#10;Rok premiery marki ALUKOMFORT: ...&#10;Liczba pracowników: ...&#10;Powierzchnia produkcji w Trzebnicy: ...&#10;Eksport do krajów: ...&#10;Najważniejsze osiągnięcia (TÜV NORD, certyfikaty, nagrody): ..." />
          </CDField>

          <CDField label="Zdjęcia z fabryki w Trzebnicy (6 sztuk)" why={`Galeria na stronie „O nas" — hala produkcyjna, zespół, maszyny, finalne produkty. Mogą być telefonem — ważna autentyczność. Pliki prosimy przesłać mailem albo WeTransfer.`}>
            <select value={data.photosFabrykaStatus} onChange={e => update('photosFabrykaStatus', e.target.value)}>
              <option value="">— wybierz status —</option>
              <option value="zrobione, prześlemy mailem">Mamy gotowe — prześlemy mailem</option>
              <option value="zrobimy w ciągu tygodnia">Zrobimy w ciągu tygodnia</option>
              <option value="zrobimy w ciągu miesiąca">Zrobimy w ciągu miesiąca</option>
              <option value="potrzebujemy fotografa">Prosimy o polecenie fotografa</option>
            </select>
          </CDField>

          <CDField label="Cennik widełkowy 18 cen (3 produkty × 6 wymiarów)" why={`KRYTYCZNE dla strony „Cennik 2026" i kalkulatora. Widełki orientacyjne brutto z montażem. Wystarczy 3-5 cen — pozostałe wyliczymy proporcjonalnie. Można też podać tylko cenę startową — np. „LINEA od 18 000 zł brutto za 3×3, +X zł za każdy dodatkowy m²".`}>
            <PriceMatrix prices={data.prices} update={updatePrice} />
          </CDField>

          <CDField label="Cennik akcesoriów" why={`Do tabeli „Co podnosi cenę?" i kalkulatora. Może być orientacyjnie — np. „od 1 500 zł" lub „+15% wartości pergoli".`}>
            <table className="cd-acc-table">
              <tbody>
                {ACCESSORY_ITEMS.map(item => (
                  <tr key={item}>
                    <td style={{paddingRight: 14}}>{item}</td>
                    <td><input type="text" value={data.accessoryPrices[item] || ''} onChange={e => updateAccessory(item, e.target.value)} placeholder="np. od 1 500 zł" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CDField>

          <CDField label="Polityka prywatności" why="Wymagane prawnie do zgodności RODO.">
            <select value={data.privacyPolicy} onChange={e => update('privacyPolicy', e.target.value)}>
              <option value="">— wybierz opcję —</option>
              <option value="mamy dokument, prześlemy">Mamy istniejący dokument — prześlemy</option>
              <option value="prosimy o szablon">Prosimy o przygotowanie standardowego szablonu RODO</option>
              <option value="zatwierdzimy szablon przez prawnika">Zatwierdzimy proponowany szablon przez naszego prawnika</option>
            </select>
          </CDField>
        </div>
      </section>

      {/* GRUPA B */}
      <section className="section">
        <div className="container">
          <div className="cd-group-header">
            <div className="cd-group-badge cd-group-badge--p1">Grupa B · Ważne</div>
            <h2 className="cd-group-title">Dane do galerii realizacji i strony dla architektów</h2>
            <p className="cd-group-desc">Materiały, które rozbudują stronę o realne case studies i lead magnet B2B.</p>
          </div>

          <CDField label="Zdjęcia realizacji (3-4 sztuki na start)" why="Wystarczy 3-4 realizacje na pierwszą wersję galerii. Najlepiej po 4-8 zdjęć każda + lokalizacja, wymiary. Resztę dodamy w kolejnych iteracjach.">
            <div className="cd-row-2">
              <input type="number" value={data.photosRealizacjeCount} onChange={e => update('photosRealizacjeCount', e.target.value)} placeholder="Ile realizacji macie zafotografowanych?" />
              <input type="text" value={data.photosRealizacjeNote} onChange={e => update('photosRealizacjeNote', e.target.value)} placeholder="Sposób przekazania (WeTransfer, Drive, dysk Google)" />
            </div>
          </CDField>

          <CDField label="Pliki techniczne CAD (DWG/DXF) profili LINEA, HORIZON, ROMA" why={`Do strony „Dla architektów" — pobierane po zostawieniu maila (lead magnet B2B). Mogą być w pdf-ach, jeśli dwg jest poufne.`}>
            <textarea rows={3} value={data.cadFiles} onChange={e => update('cadFiles', e.target.value)} placeholder={`Status (np. „Mamy dla LINEA i HORIZON, dla ROMA w przygotowaniu") + sposób przekazania`} />
          </CDField>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="section section--ink" style={{padding:'40px 0'}}>
        <div className="container" style={{textAlign:'center'}}>
          <h3 style={{margin: '0 0 18px', color:'#fff', fontSize: 22, fontWeight: 700}}>
            Wypełnione formularz w {progress}% — gotowi do wysyłki?
          </h3>
          <p style={{margin: '0 0 24px', color:'rgba(255,255,255,0.75)'}}>
            Dane zapisują się automatycznie w przeglądarce. Możesz wrócić w dowolnym momencie i kontynuować.
          </p>
          <div style={{display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap'}}>
            <Button variant="primary" size="lg" onClick={handleSubmitEmail}>📧 Wyślij e-mailem</Button>
            <Button variant="ghost-light" size="lg" onClick={handleDownload}>⬇ Pobierz jako .txt</Button>
          </div>
        </div>
      </section>
    </>
  );
}

function CDField({ label, why, children }) {
  return (
    <div className="cd-field">
      <label className="cd-field__label">{label}</label>
      {why && <p className="cd-field__why">{why}</p>}
      <div className="cd-field__input">{children}</div>
    </div>
  );
}

function PriceMatrix({ prices, update }) {
  return (
    <div className="cd-price-matrix">
      <table>
        <thead>
          <tr>
            <th>Produkt / wymiar</th>
            {PRICE_SIZES.map(s => <th key={s} colSpan={2} style={{textAlign:'center'}}>{s} m</th>)}
          </tr>
          <tr style={{fontSize: 11, color: '#666'}}>
            <th></th>
            {PRICE_SIZES.map(s => (
              <React.Fragment key={s}>
                <th style={{textAlign:'center', fontWeight: 400}}>od (zł)</th>
                <th style={{textAlign:'center', fontWeight: 400}}>do (zł)</th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {PRICE_PRODUCTS.map(p => (
            <tr key={p.id}>
              <td style={{fontWeight: 700}}>{p.name}</td>
              {PRICE_SIZES.map(s => (
                <React.Fragment key={s}>
                  <td><input type="text" inputMode="numeric" value={prices[`${p.id}_${s}_min`] || ''} onChange={e => update(`${p.id}_${s}_min`, e.target.value)} placeholder="—" style={{width: 70}} /></td>
                  <td><input type="text" inputMode="numeric" value={prices[`${p.id}_${s}_max`] || ''} onChange={e => update(`${p.id}_${s}_max`, e.target.value)} placeholder="—" style={{width: 70}} /></td>
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="cd-help" style={{marginTop: 10}}>Wystarczy podać kilka cen — pozostałe wyliczymy proporcjonalnie. Można też zostawić tabelę pustą i opisać cenę bazową w polu poniżej.</p>
    </div>
  );
}

window.ClientDataPage = ClientDataPage;
