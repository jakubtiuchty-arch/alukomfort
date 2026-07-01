// Szablony HTML maili (email-safe: tabele + inline style).
// Marka w mailu: PERGOLE TRZEBNICA (PLAST-MET). Domena: pergoletrzebnica.pl
import { esc } from './_mailer.js';

const GOLD = '#c8961e';
const DARK = '#111111';
// Grafika nagłówka — blueprint pergoli (linie na przezroczystym tle, hostowany w repo)
const HEADER_IMG = 'https://www.zadaszeniatrzebnica.pl/uploads/email/header-blueprint.png';
// Logo PLAST-MET (białe, na przezroczystym tle) do ciemnego nagłówka
const LOGO_IMG = 'https://www.zadaszeniatrzebnica.pl/uploads/email/logo-plastmet-white.png';

function shell(inner, preheader = '') {
  return `<!doctype html><html lang="pl"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f4f4f2;">
${preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#f4f4f2;">${esc(preheader)}</div>` : ''}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f2;padding:26px 12px;">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #e4e1d9;border-radius:12px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;">
      <tr><td style="background:${DARK};padding:18px 28px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
          <td valign="middle" style="vertical-align:middle;">
            <img src="${LOGO_IMG}" width="160" alt="PLAST-MET" style="display:block;width:160px;max-width:160px;height:auto;border:0;" />
          </td>
          <td valign="middle" align="right" width="170" style="vertical-align:middle;width:170px;">
            <img src="${HEADER_IMG}" width="160" alt="" style="display:block;width:160px;max-width:160px;height:auto;border:0;margin-left:auto;" />
          </td>
        </tr></table>
      </td></tr>
      <tr><td style="height:3px;background:${GOLD};line-height:3px;font-size:0;">&nbsp;</td></tr>
      ${inner}
      <tr><td style="background:#faf9f7;border-top:1px solid #e4e1d9;padding:20px 28px;color:#777;font-size:12px;line-height:1.7;">
        <b style="color:#111;">PLAST-MET &middot; Pergole Trzebnica</b><br/>
        ul. Milicka 34A, 55-100 Trzebnica<br/>
        tel. 512&nbsp;622&nbsp;666 &middot; 501&nbsp;963&nbsp;896 &middot; 71&nbsp;308&nbsp;42&nbsp;34<br/>
        <a href="mailto:trzebnica@plast-met.pl" style="color:${GOLD};text-decoration:none;">trzebnica@plast-met.pl</a> &middot; pergoletrzebnica.pl<br/>
        <span style="color:#999;">Godziny: pn&ndash;śr, pt 7:00&ndash;15:00 &middot; czw 7:00&ndash;16:00</span>
      </td></tr>
    </table>
    <div style="color:#b3b0a8;font-size:11px;margin-top:14px;font-family:Arial,Helvetica,sans-serif;">Wiadomość wygenerowana automatycznie przez formularz na pergoletrzebnica.pl</div>
  </td></tr>
</table>
</body></html>`;
}

// ===== Mail do PRACOWNIKA (powiadomienie o zgłoszeniu) =====
export function employeeEmail(d) {
  const isQuote = d.type === 'wycena';
  const rows = [
    ['Imię i nazwisko', d.name],
    ['E-mail', d.email],
    ['Telefon', d.phone],
    isQuote ? ['Produkt', d.product] : ['Temat', d.subject],
    isQuote ? ['Miejsce instalacji', d.city] : null,
    isQuote ? ['Wymiary', d.size] : null,
  ].filter(Boolean);
  const body = isQuote ? d.notes : d.message;
  const rowsHtml = rows.map(([k, v]) => `
    <tr>
      <td style="padding:9px 0;border-bottom:1px solid #f0efeb;color:#888;font-size:13px;width:160px;vertical-align:top;">${esc(k)}</td>
      <td style="padding:9px 0;border-bottom:1px solid #f0efeb;color:#111;font-size:14px;font-weight:600;">${esc(v) || '&mdash;'}</td>
    </tr>`).join('');
  const tel = (d.phone || '').replace(/\s/g, '');
  const inner = `
    <tr><td style="padding:28px 28px 6px;">
      <span style="display:inline-block;background:#fdf3dd;color:#8a6a12;font-size:11px;font-weight:700;letter-spacing:1px;padding:5px 12px;border-radius:999px;text-transform:uppercase;">
        ${isQuote ? 'Zapytanie o wycenę' : 'Wiadomość z formularza'}
      </span>
      <h1 style="margin:16px 0 4px;font-size:22px;color:#111;font-weight:800;">${isQuote ? 'Nowe zapytanie o wycenę' : 'Nowa wiadomość kontaktowa'}</h1>
      <p style="margin:0;color:#777;font-size:13px;">Wpłynęło przez formularz na pergoletrzebnica.pl</p>
    </td></tr>
    <tr><td style="padding:14px 28px 6px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #f0efeb;">${rowsHtml}</table>
    </td></tr>
    ${body ? `<tr><td style="padding:14px 28px 4px;">
      <div style="color:#888;font-size:13px;margin-bottom:7px;">${isQuote ? 'Notatki klienta' : 'Treść wiadomości'}</div>
      <div style="background:#f7f6f3;border:1px solid #ececec;border-radius:8px;padding:14px 16px;color:#333;font-size:14px;line-height:1.65;">${esc(body).replace(/\n/g, '<br/>')}</div>
    </td></tr>` : ''}
    <tr><td style="padding:24px 28px 30px;">
      <a href="mailto:${esc(d.email)}" style="display:inline-block;background:${GOLD};color:#1a1200;font-weight:700;font-size:14px;text-decoration:none;padding:13px 26px;border-radius:8px;">Odpowiedz klientowi</a>
      ${tel ? `<a href="tel:${esc(tel)}" style="display:inline-block;margin-left:10px;color:#111;font-weight:600;font-size:14px;text-decoration:none;padding:13px 22px;border:1px solid #ddd;border-radius:8px;">Zadzwoń</a>` : ''}
    </td></tr>`;
  const subject = isQuote
    ? `Nowe zapytanie o wycenę: ${d.product || '—'} — ${d.name}`
    : `Nowa wiadomość: ${d.subject || 'Kontakt'} — ${d.name}`;
  return { subject, html: shell(inner, `${d.name} · ${d.email} · ${d.phone || ''}`) };
}

// ===== Mail do KLIENTA (potwierdzenie przyjęcia zgłoszenia) =====
export function clientEmail(d) {
  const isQuote = d.type === 'wycena';
  const first = (d.name || '').trim().split(/\s+/)[0] || '';
  const inner = `
    <tr><td style="padding:34px 28px 8px;">
      <h1 style="margin:0 0 14px;font-size:25px;color:#111;font-weight:800;">Dziękujemy${first ? ', ' + esc(first) : ''}!</h1>
      <p style="margin:0 0 14px;color:#444;font-size:15px;line-height:1.7;">
        Otrzymaliśmy Twoje ${isQuote ? `zapytanie o wycenę${d.product ? ' pergoli <b>' + esc(d.product) + '</b>' : ''}` : 'wiadomość'} i już się nim zajmujemy.
        Nasz doradca skontaktuje się z Tobą <b>w ciągu 24 godzin</b> w dni robocze.
      </p>
      <p style="margin:0 0 22px;color:#444;font-size:15px;line-height:1.7;">
        Sprawa pilna? Zadzwoń — chętnie doradzimy od ręki.
      </p>
    </td></tr>
    <tr><td style="padding:0 28px 8px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#111;border-radius:10px;">
        <tr><td style="padding:18px 22px;">
          <div style="color:#fff;font-size:17px;font-weight:800;letter-spacing:0.5px;">512 622 666 &middot; 501 963 896 &middot; 71 308 42 34</div>
          <div style="color:rgba(255,255,255,0.7);font-size:13px;margin-top:6px;">trzebnica@plast-met.pl &middot; pn&ndash;śr, pt 7&ndash;15 &middot; czw 7&ndash;16</div>
        </td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:16px 28px 30px;">
      <div style="background:#f7f6f3;border:1px solid #ececec;border-radius:8px;padding:16px 18px;color:#555;font-size:13px;line-height:1.7;">
        <b style="color:#111;">Co dalej?</b><br/>
        Przygotujemy dla Ciebie <b>bezpłatną, niezobowiązującą wycenę</b> dopasowaną do Twojej przestrzeni. W razie potrzeby umówimy bezpłatny pomiar u Ciebie.
      </div>
    </td></tr>`;
  return {
    subject: 'Dziękujemy za zapytanie — Pergole Trzebnica',
    html: shell(inner, 'Otrzymaliśmy Twoje zapytanie — odezwiemy się w ciągu 24 godzin.'),
  };
}
