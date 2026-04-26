// Vercel serverless function: proxy do OpenAI gpt-image-2 + lead capture
// POST application/json: { product, color, imageBase64, mimeType, email, phone, address, notes, rodo }
// Wymagane env: OPENAI_API_KEY
// Opcjonalne env: RESEND_API_KEY, LEAD_EMAIL (gdzie iść lead, default: biuro@plast-met.pl)

const PRODUCT_PROMPTS = {
  linea: 'Photorealistically integrate ALUKOMFORT LINEA — a freestanding aluminum terrace canopy with a flat sloped polycarbonate roof, slim aluminum posts (150×100mm), anthracite color (RAL 7016)',
  horizon: 'Photorealistically integrate ALUKOMFORT HORIZON L — a modern aluminum bioclimatic pergola with rotating louver roof slats, anthracite aluminum frame (RAL 7016), clean architectural lines',
  roma: 'Photorealistically integrate ALUKOMFORT ROMA — a fabric pergola with retractable beige acrylic fabric roof, slim anthracite aluminum supports (RAL 7016), Mediterranean style',
};

const COLOR_OVERRIDES = {
  'czarna-wisnia': 'wood-textured "Black Cherry" finish on the aluminum frame',
  'sosna': 'wood-textured "Pine" finish on the aluminum frame',
  'srebrny-dab': 'wood-textured "Silver Oak" finish on the aluminum frame',
  'zloty-dab': 'wood-textured "Golden Oak" finish on the aluminum frame',
  'antracyt': 'anthracite RAL 7016 finish on the aluminum frame',
  'bialy': 'pure white RAL 9016 finish on the aluminum frame',
};

function buildPrompt(product, color, notes) {
  const base = PRODUCT_PROMPTS[product] || PRODUCT_PROMPTS.linea;
  const colorPart = color && COLOR_OVERRIDES[color] ? `, ${COLOR_OVERRIDES[color]}` : '';
  const notePart = notes ? `. Additional context from the customer: ${notes}` : '';
  return `${base}${colorPart}, into the existing terrace/garden space shown in the uploaded photo. Preserve the original perspective, lighting, shadows, building architecture and surroundings. The pergola must be sized realistically for the space and look professionally installed${notePart}. Output a single high-quality photorealistic image.`;
}

function getClientIp(req) {
  return (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.headers['x-real-ip'] || 'unknown';
}

function parseCookies(header) {
  const out = {};
  (header || '').split(';').forEach(p => {
    const [k, ...v] = p.trim().split('=');
    if (k) out[k] = decodeURIComponent(v.join('='));
  });
  return out;
}

async function sendLeadEmail(payload, imageUrl) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL || 'biuro@plast-met.pl';
  if (!apiKey) {
    console.log('[LEAD] (no Resend key — skipping email):', JSON.stringify({ ...payload, imageUrl }));
    return { skipped: true };
  }
  const html = `
    <h2>Nowy lead z konfiguratora wizualizacji ALUKOMFORT</h2>
    <p><b>Produkt:</b> ${payload.product?.toUpperCase() || '—'}<br/>
       <b>Kolor:</b> ${payload.color || '—'}<br/>
       <b>E-mail:</b> ${payload.email}<br/>
       <b>Telefon:</b> ${payload.phone || '—'}<br/>
       <b>Lokalizacja:</b> ${payload.address || '—'}</p>
    ${payload.notes ? `<p><b>Uwagi klienta:</b><br/>${payload.notes.replace(/</g, '&lt;')}</p>` : ''}
    <p><b>Wygenerowana wizualizacja:</b><br/>
       <a href="${imageUrl}">${imageUrl}</a></p>
    <hr/>
    <p style="font-size:12px;color:#666">IP: ${payload.ip} · User-Agent: ${payload.ua}</p>
  `;
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'ALUKOMFORT <noreply@alukomfort.pl>',
        to: [to],
        subject: `[Wizualizacja] ${payload.product?.toUpperCase()} — ${payload.email}`,
        html,
      }),
    });
    if (!r.ok) console.error('[LEAD] Resend error:', r.status, await r.text());
    return { sent: r.ok };
  } catch (e) {
    console.error('[LEAD] Resend exception:', e.message);
    return { error: e.message };
  }
}

export const config = {
  api: { bodyParser: { sizeLimit: '12mb' } },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Tylko POST' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Brak konfiguracji serwera (OPENAI_API_KEY).' });

  const { product, color, imageBase64, mimeType, email, phone, address, notes, rodo } = req.body || {};

  // Walidacja
  if (!product || !PRODUCT_PROMPTS[product]) return res.status(400).json({ error: 'Wybierz produkt (LINEA / HORIZON / ROMA).' });
  if (!imageBase64 || !mimeType) return res.status(400).json({ error: 'Wgraj zdjęcie tarasu lub domu.' });
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Podaj poprawny adres e-mail.' });
  if (!phone || phone.replace(/\D/g, '').length < 9) return res.status(400).json({ error: 'Podaj numer telefonu (min. 9 cyfr).' });
  if (!rodo) return res.status(400).json({ error: 'Wymagana zgoda na przetwarzanie danych (RODO).' });

  // Walidacja rozmiaru obrazka — base64 ≈ 4/3 oryginału
  const approxBytes = (imageBase64.length * 3) / 4;
  if (approxBytes > 8 * 1024 * 1024) return res.status(413).json({ error: 'Zdjęcie jest za duże (max 8 MB).' });

  // Rate limit przez cookie (MVP — 2/dzień)
  const cookies = parseCookies(req.headers.cookie);
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  let count = 0;
  if (cookies.wiz_date === today) count = parseInt(cookies.wiz_count || '0', 10) || 0;
  if (count >= 2) return res.status(429).json({ error: 'Wykorzystałeś dzisiejszy limit (2 wizualizacje). Wróć jutro lub napisz na biuro@plast-met.pl.' });

  const ip = getClientIp(req);
  const ua = req.headers['user-agent'] || '';
  const prompt = buildPrompt(product, color, notes);

  try {
    // OpenAI gpt-image-2 — endpoint /v1/images/edits przyjmuje multipart
    const buffer = Buffer.from(imageBase64, 'base64');
    const fd = new FormData();
    fd.append('model', 'gpt-image-2');
    fd.append('prompt', prompt);
    fd.append('size', '1024x1024');
    fd.append('n', '1');
    fd.append('image', new Blob([buffer], { type: mimeType }), 'photo.png');

    const oaRes = await fetch('https://api.openai.com/v1/images/edits', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}` },
      body: fd,
    });
    if (!oaRes.ok) {
      const txt = await oaRes.text();
      console.error('[OpenAI] error', oaRes.status, txt);
      return res.status(502).json({ error: 'Generator chwilowo niedostępny. Spróbuj za chwilę.', detail: txt.slice(0, 300) });
    }
    const oaJson = await oaRes.json();
    const item = oaJson?.data?.[0];
    const dataUrl = item?.b64_json
      ? `data:image/png;base64,${item.b64_json}`
      : (item?.url || null);
    if (!dataUrl) return res.status(502).json({ error: 'Nie udało się odebrać obrazu z generatora.' });

    // Lead email (best-effort)
    sendLeadEmail({ product, color, email, phone, address, notes, ip, ua }, dataUrl.startsWith('data:') ? '(załącznik base64 w odpowiedzi)' : dataUrl).catch(() => {});

    // Aktualizacja cookie limitu
    res.setHeader('Set-Cookie', [
      `wiz_count=${count + 1}; Path=/; Max-Age=86400; SameSite=Lax`,
      `wiz_date=${today}; Path=/; Max-Age=86400; SameSite=Lax`,
    ]);
    return res.status(200).json({ image: dataUrl, remaining: 2 - (count + 1) });
  } catch (e) {
    console.error('[handler] exception', e);
    return res.status(500).json({ error: 'Błąd serwera.', detail: e.message });
  }
}
