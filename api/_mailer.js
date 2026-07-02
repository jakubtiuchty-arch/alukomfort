// Wspólny wysyłacz maili przez Resend (HTTP API).
// Wymagane env (Vercel): RESEND_API_KEY
// Opcjonalne env: MAIL_TO / LEAD_EMAIL (odbiorca zgłoszeń), MAIL_FROM (nadawca — domena zweryfikowana w Resend)

// Escape do treści HTML maila
export function esc(s) {
  return String(s == null ? '' : s).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));
}

// ===== Tryb testowy =====
// Testy NIE mogą trafiać do handlowca. Maile idą wyłącznie na skrzynkę testową, gdy:
//  1) deploy nieprodukcyjny (preview / vercel dev — VERCEL_ENV !== 'production'), albo
//  2) w formularzu podano adres testowy (test na produkcji).
export const TEST_RECIPIENT = 'jakub.tiuchty@gmail.com';
export function isTestContext(clientEmail) {
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') return true;
  return String(clientEmail || '').trim().toLowerCase() === TEST_RECIPIENT;
}

// subject, html — treść; replyTo — adres klienta (żeby dało się odpisać wprost); to — override odbiorcy
// attachments — [{ filename, content }] (content = base64 bez prefiksu data:)
export async function sendMail({ subject, html, replyTo, to, attachments }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM || 'Pergole Trzebnica <kontakt@pergoletrzebnica.pl>';
  const dest = to || process.env.MAIL_TO || process.env.LEAD_EMAIL || 'm.tiuchty@plast-met.pl';
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
      attachments: attachments && attachments.length ? attachments : undefined,
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
