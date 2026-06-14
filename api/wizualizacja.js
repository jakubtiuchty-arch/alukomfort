// Vercel serverless function: proxy do OpenAI gpt-image-2 + lead capture
// POST application/json: { product, color, imageBase64, mimeType, email, phone, address, notes, rodo }
// Wymagane env: OPENAI_API_KEY
// Opcjonalne env: RESEND_API_KEY, LEAD_EMAIL (gdzie iść lead, default: biuro@plast-met.pl)

// Bryła konstrukcji — bez opisu pokrycia dachu (to dokłada ROOF_PROMPTS)
const PRODUCT_PROMPTS = {
  linea: 'ALUKOMFORT LINEA — an aluminum terrace canopy (wall-mounted or freestanding, whichever suits the scene) with slim aluminum posts (150×100mm) and a clean low-slope flat roof structure',
  horizon: 'ALUKOMFORT HORIZON — a modern aluminum bioclimatic pergola with a slim flat roof crown and clean architectural lines',
  roma: 'ALUKOMFORT ROMA — a lightweight aluminum fabric pergola with slim supports, Mediterranean style',
};

// Pokrycie dachu zależne od produktu i wyboru klienta
const ROOF_PROMPTS = {
  linea: {
    opal: 'with the roof covered in translucent milky-white opal polycarbonate panels that softly diffuse light',
    boxgrey: 'with the roof covered in tinted smoke-grey semi-transparent polycarbonate panels',
    glass: 'with the roof glazed in clear transparent safety glass panels',
  },
  horizon: {
    lamele: 'with a flat roof made of adjustable horizontal aluminum louver slats (bioclimatic)',
    glass: 'with a flat roof glazed in clear transparent safety glass',
    hybryda: 'with a flat roof combining aluminum louver slats over one part and a clear glass section over the other',
  },
  roma: {
    tkanina: 'with a flat retractable Roman-blind roof made of beige acrylic fabric in soft folds',
  },
};

// Stopień zabudowy ścian
const ENCLOSURE_PROMPTS = {
  open: 'Keep it as an open pergola — only the supporting posts and the roof, with no side walls.',
  sides: 'Add a partial side enclosure: sliding glass panels or vertical screen blinds on one or two sides, leaving the front open.',
  winter: 'Fully enclose it as a winter garden / conservatory with floor-to-ceiling glass walls and sliding glass doors on all open sides, forming a closed all-year room.',
};

const COLOR_OVERRIDES = {
  'ral-7016': 'anthracite RAL 7016 structured finish on the aluminum frame',
  'ral-9005': 'deep black RAL 9005 structured finish on the aluminum frame',
  'ral-9010': 'pure white RAL 9010 matte finish on the aluminum frame',
  'ral-7039': 'quartz grey RAL 7039 matte finish on the aluminum frame',
  'czarna-wisnia': 'wood-textured "Black Cherry" finish on the aluminum frame',
  'sosna': 'wood-textured "Pine" finish on the aluminum frame',
  'srebrny-dab': 'wood-textured "Silver Oak" finish on the aluminum frame',
  'zloty-dab': 'wood-textured "Golden Oak" finish on the aluminum frame',
};

function buildPrompt(product, color, roof, enclosure, notes) {
  const base = PRODUCT_PROMPTS[product] || PRODUCT_PROMPTS.linea;
  const roofMap = ROOF_PROMPTS[product] || ROOF_PROMPTS.linea;
  const roofPart = roof && roofMap[roof] ? `, ${roofMap[roof]}` : '';
  const colorPart = color && COLOR_OVERRIDES[color] ? `, ${COLOR_OVERRIDES[color]}` : '';
  const enclosurePart = ENCLOSURE_PROMPTS[enclosure] ? ` ${ENCLOSURE_PROMPTS[enclosure]}` : '';
  const notePart = notes ? ` Additional context from the customer: ${notes}.` : '';
  return `Photorealistically integrate ${base}${roofPart}${colorPart}, placed into the existing terrace/garden space shown in the uploaded photo.${enclosurePart} ` +
    `CRITICAL: keep the original photo completely unchanged — the same house, walls, windows, paving, plants, sky, ` +
    `furniture, camera angle, perspective, daylight direction and shadows must stay identical. Only add the pergola ` +
    `as if it were physically installed at the scene, casting correct shadows consistent with the existing light. ` +
    `Size it realistically for the space and make it look professionally installed.${notePart} ` +
    `Output a single photorealistic image, do not add text, watermarks, people or extra objects.`;
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
       <b>Dach:</b> ${payload.roof || '—'}<br/>
       <b>Zabudowa:</b> ${payload.enclosure || '—'}<br/>
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
  maxDuration: 60, // generacja gpt-image-2 trwa 20-50 s — bez tego Vercel ubija funkcję po 10 s
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Tylko POST' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    const envKeysSeen = Object.keys(process.env).filter(k => /OPENAI|API|KEY|RESEND|LEAD/i.test(k));
    return res.status(500).json({
      error: 'Brak konfiguracji serwera (OPENAI_API_KEY).',
      debug: {
        envKeysSeen,
        nodeVersion: process.version,
        runtime: process.env.VERCEL_REGION || 'unknown',
        deployId: process.env.VERCEL_DEPLOYMENT_ID || 'unknown',
      },
    });
  }

  const { product, color, roof, enclosure, imageBase64, mimeType, email, phone, address, notes, rodo, testMode } = req.body || {};

  // TEST MODE — pomija walidację danych kontaktowych, limit dzienny i wysyłkę leada.
  // Sterowane flagą WIZ_TEST_MODE we froncie (src/page-wizualizacja.jsx). Usunąć po testach.
  const isTest = testMode === true;

  // Walidacja
  if (!product || !PRODUCT_PROMPTS[product]) return res.status(400).json({ error: 'Wybierz produkt (LINEA / HORIZON / ROMA).' });
  if (!imageBase64 || !mimeType) return res.status(400).json({ error: 'Wgraj zdjęcie tarasu lub domu.' });
  if (!isTest) {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Podaj poprawny adres e-mail.' });
    if (!phone || phone.replace(/\D/g, '').length < 9) return res.status(400).json({ error: 'Podaj numer telefonu (min. 9 cyfr).' });
    if (!rodo) return res.status(400).json({ error: 'Wymagana zgoda na przetwarzanie danych (RODO).' });
  }

  // Walidacja rozmiaru obrazka — base64 ≈ 4/3 oryginału
  const approxBytes = (imageBase64.length * 3) / 4;
  if (approxBytes > 8 * 1024 * 1024) return res.status(413).json({ error: 'Zdjęcie jest za duże (max 8 MB).' });

  // Rate limit przez cookie (MVP — 2/dzień). W trybie testowym pomijany.
  const cookies = parseCookies(req.headers.cookie);
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  let count = 0;
  if (cookies.wiz_date === today) count = parseInt(cookies.wiz_count || '0', 10) || 0;
  if (!isTest && count >= 2) return res.status(429).json({ error: 'Wykorzystałeś dzisiejszy limit (2 wizualizacje). Wróć jutro lub napisz na biuro@plast-met.pl.' });

  const ip = getClientIp(req);
  const ua = req.headers['user-agent'] || '';
  const prompt = buildPrompt(product, color, roof, enclosure, notes);

  try {
    // OpenAI gpt-image-2 — endpoint /v1/images/edits przyjmuje multipart
    const buffer = Buffer.from(imageBase64, 'base64');
    const fd = new FormData();
    fd.append('model', 'gpt-image-2');
    fd.append('prompt', prompt);
    fd.append('size', 'auto');            // dopasuj proporcje wyjścia do zdjęcia klienta (poziome/pionowe)
    fd.append('quality', 'medium');       // 'high' przekracza 60s limit Vercela (504) — medium = ~25-45s
    fd.append('n', '1');
    const ext = /jpe?g/i.test(mimeType) ? 'jpg' : /webp/i.test(mimeType) ? 'webp' : 'png';
    fd.append('image', new Blob([buffer], { type: mimeType }), `photo.${ext}`);

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

    if (isTest) {
      return res.status(200).json({ image: dataUrl, remaining: 99, testMode: true });
    }

    // Lead email (best-effort)
    sendLeadEmail({ product, color, roof, enclosure, email, phone, address, notes, ip, ua }, dataUrl.startsWith('data:') ? '(załącznik base64 w odpowiedzi)' : dataUrl).catch(() => {});

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
