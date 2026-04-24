// Formularz wyceny — modal

function QuoteModal({ product, open, onClose }) {
  const [form, setForm] = React.useState({ name: '', email: '', phone: '', city: '', size: '', notes: '', product: product || 'LINEA' });
  const [errors, setErrors] = React.useState({});
  const [sent, setSent] = React.useState(false);

  React.useEffect(() => {
    if (open) { setSent(false); setErrors({}); setForm(f => ({...f, product: product || 'LINEA'})); }
  }, [open, product]);

  if (!open) return null;

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = 'Podaj imię i nazwisko';
    if (!form.email.trim()) err.email = 'Podaj e-mail';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Niepoprawny adres e-mail';
    if (!form.phone.trim()) err.phone = 'Podaj telefon';
    else if (form.phone.replace(/\D/g,'').length < 9) err.phone = 'Numer telefonu jest za krótki';
    setErrors(err);
    if (Object.keys(err).length === 0) setSent(true);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Zamknij"><Icon.Close size={18} /></button>
        {sent ? (
          <div className="modal__success">
            <div className="check"><Icon.Check size={28} stroke="white" sw={2.5} /></div>
            <h3>Dziękujemy!</h3>
            <p className="sub">Otrzymaliśmy Twoje zapytanie o wycenę produktu <strong>{form.product}</strong>. Skontaktujemy się w ciągu 24 h.</p>
            <Button variant="ghost-dark" onClick={onClose}>Zamknij</Button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <h3>Zamów bezpłatną wycenę</h3>
            <p className="sub">Wypełnij formularz — doradca odezwie się do Ciebie w 24 h.</p>
            <div className="field">
              <label>Produkt</label>
              <select value={form.product} onChange={e => set('product', e.target.value)}>
                <option>LINEA</option>
                <option>HORIZON</option>
                <option>ROMA</option>
              </select>
            </div>
            <div className={`field ${errors.name ? 'has-error' : ''}`}>
              <label>Imię i nazwisko</label>
              <input type="text" value={form.name} onChange={e => set('name', e.target.value)} />
              {errors.name && <span className="field__err">{errors.name}</span>}
            </div>
            <div className="field__row">
              <div className={`field ${errors.email ? 'has-error' : ''}`}>
                <label>E-mail</label>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)} />
                {errors.email && <span className="field__err">{errors.email}</span>}
              </div>
              <div className={`field ${errors.phone ? 'has-error' : ''}`}>
                <label>Telefon</label>
                <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} />
                {errors.phone && <span className="field__err">{errors.phone}</span>}
              </div>
            </div>
            <div className="field__row">
              <div className="field">
                <label>Miejscowość</label>
                <input type="text" value={form.city} onChange={e => set('city', e.target.value)} />
              </div>
              <div className="field">
                <label>Wymiary (szer × gł)</label>
                <input type="text" placeholder="np. 4000 × 3000 mm" value={form.size} onChange={e => set('size', e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label>Notatki (opcjonalnie)</label>
              <textarea rows="3" value={form.notes} onChange={e => set('notes', e.target.value)} />
            </div>
            <Button type="submit" variant="primary" size="lg" icon={<Icon.Arrow size={16} sw={2} />}>Wyślij zapytanie</Button>
          </form>
        )}
      </div>
    </div>
  );
}

window.QuoteModal = QuoteModal;
