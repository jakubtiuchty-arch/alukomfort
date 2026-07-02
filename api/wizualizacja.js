// Vercel serverless function: proxy do OpenAI gpt-image-2 + lead capture
// POST application/json: { product, color, imageBase64, mimeType, email, phone, address, notes, rodo }
// Wymagane env: OPENAI_API_KEY
// Mail leada przez Resend — patrz api/_mailer.js (RESEND_API_KEY, MAIL_TO)
import { sendMail, isTestContext, TEST_RECIPIENT } from './_mailer.js';

// Bryła konstrukcji — bez opisu pokrycia dachu (to dokłada ROOF_PROMPTS)
const PRODUCT_PROMPTS = {
  linea: 'ALUKOMFORT LINEA — an aluminum terrace canopy that by default is WALL-MOUNTED against the house as a lean-to (attached to the building wall), with slim aluminum posts (150×100mm) and a single-pitch LEAN-TO / SHED roof: one continuous flat plane tilted ONLY in the direction perpendicular to the house wall (front-to-back). The back edge runs ALONG the house wall and is the HIGH side; the front edge is parallel to it, further out over the terrace, and is the LOW side. BOTH the back beam (against the wall) and the front beam are perfectly HORIZONTAL and LEVEL — each stays at one single constant height along its entire length. The plane descends at a constant ~8° pitch ONLY as it goes from the house wall outward toward the front, so rainwater runs straight AWAY from the building to the front edge. CRITICAL slope direction: the roof drops from the house toward the terrace (back-to-front). It must NOT tilt sideways, must NOT drop from left to right or right to left, must NOT slope toward the house, and must NOT be a flat horizontal slab. The two SIDE edges (perpendicular to the wall) are the sloping edges — high at the wall, low at the front — while the front and back edges both stay perfectly level. This tilted shed roof is the LINEA standard',
  horizon: 'ALUKOMFORT HORIZON — a modern aluminum bioclimatic pergola with clean architectural lines and a slim flat roof crown. Its roof is a PERFECTLY FLAT, HORIZONTAL, LEVEL plane: all four perimeter beams sit at exactly the same height, with NO slope, NO pitch and NO tilt in any direction. This flat, level roof is the KEY difference from LINEA (which is pitched at 8°) — the HORIZON roof must read as strictly horizontal, never sloped',
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
    ? ` A bright magenta line with two numbered points has been drawn along the house wall. This line marks the BACK edge of the canopy — the side that runs along the house — together with its exact length and position. The two numbered points are the LEFT and RIGHT ends of that back edge.` +
      ` At the FIRST and LAST points the line also has a short VERTICAL stroke rising upward: these two vertical marks show EXACTLY where the two BACK corner posts stand against the wall. Place the BACK corner posts precisely on these two marks — the back edge must begin exactly at one mark and end exactly at the other, neither short of them nor past them. IMPORTANT: the marked points indicate the BACK (wall-side) posts, NOT the front posts.` +
      ` Build ONE single, continuous, coherent pergola along this back edge — never several separate, stacked or overlapping structures, with one consistent roof height and style along the whole run.` +
      ` From this back edge the canopy extends FORWARD, out over the terrace toward the viewer, by its depth: the FRONT edge is parallel to the back edge, the SAME length, offset forward, with the two FRONT posts standing on the paving directly in line in front of the two back posts. The structure is a clean rectangle — each end is square and perpendicular to the wall, a front post sitting directly out from each back post, so the canopy does NOT taper or slant.` +
      ` The back edge must span EXACTLY the length of the line: do NOT make it shorter, do NOT leave a gap, and do NOT overshoot past either endpoint — the back posts sit precisely ON the first and last points.` +
      (multiSide
        ? ` The line deliberately bends around the building corner: the canopy must wrap around that corner and continue along BOTH walls, exactly following the drawn points.`
        : ` This is a single straight run along ONE wall only — do NOT wrap the canopy around the building corner and do NOT extend it onto any other side or wall of the house; keep it strictly on this one side, between the two marked points.`)
    : '';
  const markerCleanup = e.marker
    ? ` The magenta line, its dots and the vertical end marks are only a placement guide: do NOT render or keep the line, dots, vertical marks or their color in the final image — replace it entirely with the realistic structure and the normal scene behind it.`
    : '';
  const wantsFreestanding = e.montaz === 'samonosna';
  // HORIZON i ROMA = pełna rama na 4 słupach (też tylne, przy ścianie). LINEA przyścienna = 2 przednie.
  const fourPosts = product === 'horizon' || product === 'roma' || wantsFreestanding;
  const placementRule = wantsFreestanding
    ? ` Build it as a freestanding self-supporting canopy on its own four corner posts on the terrace, detached from the house.`
    : fourPosts
      ? ` Place it against the house: its back edge sits right next to the house wall and its two BACK posts stand on the ground close to that wall, while the canopy extends OUTWARD over the terrace. It is a complete, self-framed pergola positioned at the house — NOT bolted to the wall without back posts — and it must stay within the terrace, visually connected to the building (not floating far out in the middle).`
      : ` The pergola is ATTACHED TO THE HOUSE as a wall-mounted lean-to: its back side is fixed flush against the house wall with NO gap, and the whole canopy extends OUTWARD from that wall over the terrace, physically connected to the building — NOT a separate canopy parked in the middle of the terrace.`;
  const postsRule = fourPosts
    ? ` CRITICAL — POSTS: this pergola ALWAYS stands on its OWN FOUR vertical corner posts — two front posts AND two back posts. Even when placed against the house, the two BACK posts are present, standing on the ground right next to the wall; the roof is NEVER bolted directly to the wall and NEVER cantilevered without back posts. All FOUR posts must be clearly visible, each firmly on the ground.`
    : ` Because the back beam is fixed to the house wall, there are NO posts along the house wall — only the FRONT row of posts (two front corner posts) rests on the terrace. Do NOT add a back row of posts.`;
  const footprintRule = e.marker
    ? ''
    : placementRule +
      ` Keep the ENTIRE pergola strictly within the footprint of the paved terrace and within the outline of the building —` +
      ` it must NOT extend, overhang, cantilever or stick out past the corner or the edge of the house onto the open lawn.` +
      ` If the paved area is small, make the pergola smaller rather than letting any part hang beyond the terrace.`;
  return `Photorealistically integrate ${base}${roofPart}${colorPart}, placed into the existing terrace/garden space shown in the uploaded photo.${markerLead}${montazPart}${postsRule}${enclosurePart}${ledPart}${dimPart} ` +
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

async function sendLeadEmail(payload, imageDataUrl) {
  // Obraz jest zwracany jako data URL (base64) — dołączamy go jako załącznik PNG.
  const isDataUrl = typeof imageDataUrl === 'string' && imageDataUrl.startsWith('data:');
  const attachments = isDataUrl
    ? [{ filename: 'wizualizacja.png', content: imageDataUrl.split(',')[1] }]
    : undefined;
  const imageLine = isDataUrl
    ? 'w załączniku — <b>wizualizacja.png</b>'
    : `<a href="${imageDataUrl}">${imageDataUrl}</a>`;
  const html = `
    <h2>Nowy lead z konfiguratora wizualizacji ALUKOMFORT</h2>
    <p><b>Imię i nazwisko:</b> ${[payload.name, payload.surname].filter(Boolean).join(' ') || '—'}<br/>
       <b>Produkt:</b> ${payload.product?.toUpperCase() || '—'}<br/>
       <b>Kolor:</b> ${payload.color || '—'}<br/>
       <b>Dach:</b> ${payload.roof || '—'}<br/>
       <b>Zabudowa:</b> ${payload.enclosure || '—'}<br/>
       <b>E-mail:</b> ${payload.email}<br/>
       <b>Telefon:</b> ${payload.phone || '—'}<br/>
       <b>Lokalizacja:</b> ${payload.address || '—'}</p>
    ${payload.notes ? `<p><b>Uwagi klienta:</b><br/>${payload.notes.replace(/</g, '&lt;')}</p>` : ''}
    <p><b>Wygenerowana wizualizacja:</b><br/>
       ${imageLine}</p>
    <hr/>
    <p style="font-size:12px;color:#666">IP: ${payload.ip} · User-Agent: ${payload.ua}</p>
  `;
  // Tryb testowy: lead idzie wyłącznie na skrzynkę testową, z prefiksem [TEST].
  const test = isTestContext(payload.email);
  try {
    return await sendMail({
      subject: `${test ? '[TEST] ' : ''}[Wizualizacja] ${payload.product?.toUpperCase() || '—'} — ${[payload.name, payload.surname].filter(Boolean).join(' ') || payload.email} (${new Date().toLocaleTimeString('pl-PL', { timeZone: 'Europe/Warsaw', hour: '2-digit', minute: '2-digit' })})`,
      html,
      replyTo: payload.email,
      attachments,
      to: test ? TEST_RECIPIENT : undefined,
    });
  } catch (e) {
    console.error('[LEAD] błąd wysyłki:', e.message);
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

  const { product, color, roof, enclosure, imageBase64, mimeType, name, surname, email, phone, address, notes, rodo, testMode,
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

    // Lead email — MUSI być awaited: serverless zamraża proces zaraz po zwróceniu
    // odpowiedzi, więc fire-and-forget bywa ucinane (zwłaszcza z załącznikiem PNG).
    // Wynik w nagłówku X-Lead (diagnostyka) i w logach.
    let leadStatus;
    try {
      const lr = await sendLeadEmail({ product, color, roof, enclosure, name, surname, email, phone, address, notes, ip, ua }, dataUrl);
      leadStatus = lr?.id ? `sent:${lr.id}` : lr?.skipped ? 'skipped:no-key' : lr?.error ? `error:${lr.error}` : 'unknown';
    } catch (e) {
      leadStatus = `exception:${e?.message || e}`;
    }
    console.log('[LEAD] wynik:', leadStatus);
    res.setHeader('X-Lead', String(leadStatus).replace(/[^\x20-\x7e]/g, '?').slice(0, 120));

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
