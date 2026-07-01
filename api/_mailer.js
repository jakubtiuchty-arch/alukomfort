// Wspólny wysyłacz maili przez Resend (HTTP API).
// Wymagane env (Vercel): RESEND_API_KEY
// Opcjonalne env: MAIL_TO / LEAD_EMAIL (odbiorca zgłoszeń), MAIL_FROM (nadawca — domena zweryfikowana w Resend)

// Escape do treści HTML maila
export function esc(s) {
  return String(s == null ? '' : s).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));
}

// subject, html — treść; replyTo — adres klienta (żeby dało się odpisać wprost); to — override odbiorcy
export async function sendMail({ subject, html, replyTo, to }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM || 'Pergole Trzebnica <kontakt@pergoletrzebnica.pl>';
  const dest = to || process.env.MAIL_TO || process.env.LEAD_EMAIL || 'kontakt@pergoletrzebnica.pl';
  if (!apiKey) {
    console.log('[MAIL] brak RESEND_API_KEY — pomijam wysyłkę:', subject);
    return { skipped: true };
  }
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [dest],
      reply_to: replyTo || undefined,
      subject,
      html,
    }),
  });
  if (!r.ok) {
    const t = await r.text().catch(() => '');
    console.error('[MAIL] Resend error:', r.status, t);
    throw new Error(`Resend ${r.status}`);
  }
  const j = await r.json().catch(() => ({}));
  return { id: j.id };
}
