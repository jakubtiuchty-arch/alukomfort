// Endpoint formularzy: modal wyceny (type:'wycena') + formularz kontaktowy (type:'kontakt').
// Wysyła maila do firmy przez Resend (patrz api/_mailer.js).
import { sendMail, esc } from './_mailer.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Tylko POST' });
  }

  const { type, name, email, phone, product, city, size, subject, message, notes } = req.body || {};

  // Walidacja
  if (!name || !name.trim()) return res.status(400).json({ error: 'Podaj imię i nazwisko.' });
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Podaj poprawny adres e-mail.' });

  const isQuote = type === 'wycena';
  if (isQuote) {
    if (!phone || phone.replace(/\D/g, '').length < 9) return res.status(400).json({ error: 'Podaj numer telefonu (min. 9 cyfr).' });
  } else {
    if (!message || !message.trim()) return res.status(400).json({ error: 'Wpisz treść wiadomości.' });
  }

  const title = isQuote ? 'Nowe zapytanie o wycenę' : 'Nowa wiadomość z formularza kontaktowego';
  const mailSubject = isQuote
    ? `[Wycena] ${product || '—'} — ${name}`
    : `[Kontakt] ${subject || 'Wiadomość'} — ${name}`;

  const rows = [
    ['Imię i nazwisko', name],
    ['E-mail', email],
    ['Telefon', phone],
    isQuote ? ['Produkt', product] : ['Temat', subject],
    isQuote ? ['Miejscowość', city] : null,
    isQuote ? ['Wymiary', size] : null,
  ].filter(Boolean);

  const body = isQuote ? notes : message;
  const html = `
    <h2>${title} — ALUKOMFORT</h2>
    <p>${rows.map(([k, v]) => `<b>${esc(k)}:</b> ${esc(v) || '—'}`).join('<br/>')}</p>
    ${body ? `<p><b>${isQuote ? 'Notatki klienta' : 'Wiadomość'}:</b><br/>${esc(body).replace(/\n/g, '<br/>')}</p>` : ''}
    <hr/>
    <p style="font-size:12px;color:#666">Wysłane z formularza na pergoletrzebnica.pl</p>`;

  try {
    const r = await sendMail({ subject: mailSubject, html, replyTo: email });
    if (r.skipped) {
      return res.status(503).json({ error: 'Wysyłka e-mail jest chwilowo niedostępna. Zadzwoń: 512 622 666.' });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('[KONTAKT] błąd wysyłki:', e);
    return res.status(500).json({ error: 'Nie udało się wysłać wiadomości. Spróbuj ponownie lub zadzwoń: 512 622 666.' });
  }
}
