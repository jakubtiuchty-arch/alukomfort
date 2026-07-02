// Endpoint formularzy: modal wyceny (type:'wycena') + formularz kontaktowy (type:'kontakt').
// Wysyła DWA maile przez Resend: powiadomienie do firmy + potwierdzenie do klienta.
import { sendMail, isTestContext, TEST_RECIPIENT } from './_mailer.js';
import { employeeEmail, clientEmail } from './_emails.js';

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

  const data = { type, name, email, phone, product, city, size, subject, message, notes };
  const emp = employeeEmail(data);
  const cli = clientEmail(data);
  const office = process.env.MAIL_OFFICE || 'trzebnica@plast-met.pl';
  // Tryb testowy: wszystko idzie wyłącznie na skrzynkę testową, z prefiksem [TEST].
  const test = isTestContext(email);
  const pfx = test ? '[TEST] ' : '';

  try {
    // 1) Powiadomienie do firmy — musi się udać (to jest właściwy lead). Reply-To = klient.
    const r = await sendMail({ subject: pfx + emp.subject, html: emp.html, replyTo: email, to: test ? TEST_RECIPIENT : undefined });
    if (r.skipped) {
      return res.status(503).json({ error: 'Wysyłka e-mail jest chwilowo niedostępna. Zadzwoń: 512 622 666.' });
    }
    // 2) Potwierdzenie do klienta — awaited (fire-and-forget bywa ucinane po zwróceniu
    // odpowiedzi w serverless); błąd nie blokuje sukcesu leada.
    try {
      await sendMail({ subject: pfx + cli.subject, html: cli.html, to: test ? TEST_RECIPIENT : email, replyTo: office });
    } catch (e) {
      console.error('[KONTAKT] mail do klienta:', e?.message || e);
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('[KONTAKT] błąd wysyłki:', e);
    return res.status(500).json({ error: 'Nie udało się wysłać wiadomości. Spróbuj ponownie lub zadzwoń: 512 622 666.' });
  }
}
