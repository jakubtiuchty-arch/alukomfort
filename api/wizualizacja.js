// Vercel serverless function: proxy do OpenAI gpt-image-2 + lead capture
// POST application/json: { product, color, imageBase64, mimeType, email, phone, address, notes, rodo }
// Wymagane env: OPENAI_API_KEY
// Opcjonalne env: RESEND_API_KEY, LEAD_EMAIL (gdzie iść lead, default: biuro@plast-met.pl)

// Bryła konstrukcji — bez opisu pokrycia dachu (to dokłada ROOF_PROMPTS)
const PRODUCT_PROMPTS = {
  linea: 'ALUKOMFORT LINEA — an aluminum terrace canopy (wall-mounted or freestanding, whichever suits the scene) with slim aluminum posts (150×100mm) and a single-pitch LEAN-TO / SHED roof (one continuous flat plane that is clearly TILTED, never horizontal). The roof is visibly higher where it meets the house wall and slopes down to a noticeably lower front edge at a constant ~8° pitch, so rainwater always runs AWAY from the building; the back (house-side) beam is clearly higher than the front beam and this height difference must be obvious in the image. The roof MUST NOT be a flat horizontal slab and MUST NOT slope toward the house. This tilted shed roof is the LINEA standard',
  horizon: 'ALUKOMFORT HORIZON — a modern aluminum bioclimatic pergola with a slim flat roof crown and clean architectural lines',
  roma: 'ALUKOMFORT ROMA — a modern, minimalist freestanding aluminum pergola with a SLIM rectangular top frame and slim square aluminum posts. Distinctive ROMA features that MUST be present: (1) vertical METAL WIRE-MESH / grid trellis panels set between the posts on the side(s), and (2) long rectangular metal PLANTER BOXES at the base/feet of the posts (the posts rise out of slim planter troughs), both in the same color as the frame. Clean and architectural — NOT a tent, gazebo, awning or rustic wooden structure',
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
    tkanina: 'with a retractable Roman-blind fabric roof of light beige acrylic canvas running on tracks under the slim top frame, gathered into regular, even, shallow scalloped waves as a flat sliding shade panel sitting just under the frame — NOT deep hanging swags, NOT a sagging or draping tent canopy',
  },
};

// Stopień / rodzaj zabudowy ścian (open/sides/winter — publiczny; pozostałe — panel handlowca)
const ENCLOSURE_PROMPTS = {
  open: 'Keep it as an open pergola — only the supporting posts and the roof, with no side walls.',
  sides: 'Add a partial side enclosure: sliding glass panels or vertical screen blinds on one or two sides, leaving the front open.',
  winter: 'Fully enclose it as a glazed SUMMER GARDEN with floor-to-ceiling glass walls and sliding glass doors on the open sides, forming an enclosed seasonal garden room for the warm part of the year (a summer garden, NOT a heated all-year winter garden).',
  szyby: 'Close the open sides with large sliding glass panels (clear glazed sliding doors in slim aluminum frames), set strictly within the pergola footprint between the posts. The front stays accessible.',
  screen: 'Lower vertical fabric screen roller blinds on the TWO open outer sides of the pergola (the two sides that are NOT against the house wall), each a textile screen in a slim top cassette in the frame color, each strictly within the footprint between the posts. BOTH open sides must clearly show a screen blind — not just one. The sides adjacent to the building stay closed by the house wall.',
  zaluzje: 'Close the TWO open outer sides of the pergola (the two sides that are NOT against the house wall) with adjustable aluminum louvre blades (evenly spaced slats with small gaps, in the frame color), each fitted strictly within the footprint between the posts. BOTH open sides must clearly show louvre blinds — not just one. The sides adjacent to the building stay closed by the house wall.',
  panele: 'Add a clearly visible SOLID, OPAQUE, FLAT aluminum wall panel that fully closes ONE side of the pergola, from floor to roof, in the same color as the frame — a smooth continuous cladding surface with NO slats, NO gaps, NOT louvers, NOT glass, NOT fabric. The panel is the same width as that side of the pergola and does not extend past the structure. The front and the other side stay open. This side wall must be present and visible in the image.',
};

// Dodatkowe fragmenty (panel handlowca)
const LED_PROMPT = ' Integrate discreet warm linear LED lighting along the frame.';
const MONTAZ_PROMPTS = {
  przyscienna: ' Mount it as a wall-mounted structure attached to the building wall.',
  samonosna: ' Build it as a freestanding self-supporting structure on its own posts, detached from the building.',
};

const COLOR_OVERRIDES = {
  'ral-7016': 'anthracite grey RAL 7016 fine-structure powder-coat finish on the aluminum frame',
  'ral-9005': 'deep black RAL 9005 fine-structure powder-coat finish on the aluminum frame',
  'ral-9010': 'pure white RAL 9010 matte finish on the aluminum frame',
  'terra': 'warm sandy-beige "Terra" textured powder-coat finish on the aluminum frame',
  'grey-brown': 'dark grey-brown metallic "Grey Brown" textured powder-coat finish on the aluminum frame',
  'mica': 'dark graphite "Mica" metallic powder-coat finish with subtle sparkle on the aluminum frame',
  'azzurro': 'dark blue-grey "Azzurro" metallic powder-coat finish on the aluminum frame',
};

function buildPrompt(product, color, roof, enclosure, notes, extra) {
  const e = extra || {};
  const base = PRODUCT_PROMPTS[product] || PRODUCT_PROMPTS.linea;
  const roofMap = ROOF_PROMPTS[product] || ROOF_PROMPTS.linea;
  const roofPart = roof && roofMap[roof] ? `, ${roofMap[roof]}` : '';
  const colorPart = color && COLOR_OVERRIDES[color] ? `, ${COLOR_OVERRIDES[color]}` : '';
  const montazPart = e.montaz && MONTAZ_PROMPTS[e.montaz] ? MONTAZ_PROMPTS[e.montaz] : '';
  const enclosurePart = ENCLOSURE_PROMPTS[enclosure] ? ` ${ENCLOSURE_PROMPTS[enclosure]}` : '';
  const ledPart = e.led ? LED_PROMPT : '';
  const dimPart = e.dimensions ? ` Approximate size of the structure: ${e.dimensions}.` : '';
  const notePart = notes ? ` Additional context: ${notes}.` : '';
  // Gdy handlowiec narysował linię (magenta łamana z punktami) — to ona wyznacza trasę i rozpiętość
  // konstrukcji wzdłuż ściany/ścian; reguła „mieść się w obrysie domu" ustępuje, a linia musi zniknąć
  // z wyniku. Owijanie za narożnik TYLKO przy 3+ punktach (realne załamanie linii).
  const multiSide = (e.markerPoints || 0) >= 3;
  const markerLead = e.marker
    ? ` A bright magenta line with numbered points has been drawn on the photo along the wall to mark EXACTLY the run, length and extent of the canopy — follow this line precisely and keep the structure along this marked line.` +
      ` Build ONE single, continuous, coherent pergola that follows this line — never several separate, stacked or overlapping structures, and keep one consistent roof height and style along the whole run.` +
      ` The canopy must span the FULL length of the line, end to end: its starting edge/post must align exactly with the FIRST point and its far edge/post exactly with the LAST point. Do NOT make the structure shorter than the line and do NOT leave any gap between the ends of the canopy and the marked endpoints — reach the very ends of the building as drawn.` +
      ` The canopy is a rectangular structure parallel to the house wall: its back edge (running ALONG the house wall) and its front edge (running along the marked line) have the SAME length and BOTH reach the first and last points. Each end of the canopy must be square and perpendicular to the wall — the wall-side post and the front post at each end line up at the same position along the wall, so the structure does NOT taper, slant or stop short at the wall. In particular the wall-side (back) post must reach just as far as the front post at the line's endpoint, not end earlier near a window or door.` +
      (multiSide
        ? ` The line deliberately bends around the building corner: the canopy must wrap around that corner and continue along BOTH walls, exactly following the drawn points.`
        : ` This is a single straight run along ONE wall only — do NOT wrap the canopy around the building corner and do NOT extend it onto any other side or wall of the house; keep it strictly on this one side, between the two marked points.`)
    : '';
  const markerCleanup = e.marker
    ? ` The magenta line and its points are only a placement guide: do NOT render or keep the line, its dots or color in the final image — replace it entirely with the realistic structure and the normal scene behind it.`
    : '';
  const footprintRule = e.marker
    ? ''
    : ` Position the structure flush against the house wall and keep the ENTIRE pergola strictly within the footprint of the paved terrace and within the outline of the building —` +
      ` it must NOT extend, overhang, cantilever or stick out past the corner or the edge of the house onto the open lawn.` +
      ` If the paved area is small, make the pergola smaller rather than letting any part hang beyond the terrace.`;
  return `Photorealistically integrate ${base}${roofPart}${colorPart}, placed into the existing terrace/garden space shown in the uploaded photo.${markerLead}${montazPart}${enclosurePart}${ledPart}${dimPart} ` +
    `CRITICAL: keep the original photo completely unchanged — the same house, walls, windows, paving, plants, sky, ` +
    `furniture, camera angle, perspective, daylight direction and shadows must stay identical. Only add the pergola ` +
    `as if it were physically installed at the scene, casting correct shadows consistent with the existing light.${markerCleanup} ` +
    `Size it realistically and proportionally to the visible terrace/paving — do NOT make it oversized or wider than the patio. ` +
    `Every support post must rest firmly on the ground/paving, all posts standing on the ground — nothing floating in the air.${footprintRule} ` +
    `Make it look professionally installed.${notePart} ` +
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
  maxDuration: 180, // Vercel Pro — zapas na generację gpt-image-2 (medium ~30-50s, high ~60-90s), bez 504
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

  const { product, color, roof, enclosure, imageBase64, mimeType, email, phone, address, notes, rodo, testMode,
          admin, adminPin, led, montaz, dimensions, marker, markerPoints } = req.body || {};

  // TEST MODE — pomija walidację danych kontaktowych, limit dzienny i wysyłkę leada (front: WIZ_TEST_MODE).
  // ADMIN MODE — panel handlowca (/admin): bez limitu, bez leada, z dodatkowymi parametrami serii.
  //   Jeśli ustawiona zmienna ADMIN_PIN, wymagany jest zgodny adminPin; bez ADMIN_PIN tryb działa bez hasła.
  const adminPinEnv = process.env.ADMIN_PIN;
  const isAdmin = admin === true && (!adminPinEnv || adminPin === adminPinEnv);
  if (admin === true && adminPinEnv && adminPin !== adminPinEnv) {
    return res.status(401).json({ error: 'Błędny PIN panelu.' });
  }
  const skipGate = testMode === true || isAdmin;

  // Walidacja
  if (!product || !PRODUCT_PROMPTS[product]) return res.status(400).json({ error: 'Wybierz produkt (LINEA / HORIZON / ROMA).' });
  if (!imageBase64 || !mimeType) return res.status(400).json({ error: 'Wgraj zdjęcie tarasu lub domu.' });
  if (!skipGate) {
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
  if (!skipGate && count >= 2) return res.status(429).json({ error: 'Wykorzystałeś dzisiejszy limit (2 wizualizacje). Wróć jutro lub napisz na biuro@plast-met.pl.' });

  const ip = getClientIp(req);
  const ua = req.headers['user-agent'] || '';
  const prompt = buildPrompt(product, color, roof, enclosure, notes, { led, montaz, dimensions, marker, markerPoints });

  try {
    // OpenAI gpt-image-2 — endpoint /v1/images/edits przyjmuje multipart
    const buffer = Buffer.from(imageBase64, 'base64');
    const fd = new FormData();
    fd.append('model', 'gpt-image-2');
    fd.append('prompt', prompt);
    fd.append('size', 'auto');            // dopasuj proporcje wyjścia do zdjęcia klienta (poziome/pionowe)
    fd.append('quality', isAdmin ? 'high' : 'medium'); // panel handlowca = high (lepszy realizm); publiczny = medium
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

    if (skipGate) {
      return res.status(200).json({ image: dataUrl, remaining: 99, mode: isAdmin ? 'admin' : 'test' });
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
