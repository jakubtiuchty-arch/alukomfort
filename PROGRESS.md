# PROGRESS — alukomfort (pergomet_2)

## 2026-06-13 — /wizualizacja: podłączenie gpt-image-2 (commit 2bdebe4)
- Backend `api/wizualizacja.js` był już napisany (gpt-image-2 przez `/v1/images/edits`), ale miał bugi blokujące:
  - **`maxDuration: 60`** dodane — bez tego Vercel ubijał funkcję po 10 s (generacja trwa 20–50 s) → obraz nigdy nie wracał.
  - Dodane `quality: 'high'`, `input_fidelity: 'high'`, `size: 'auto'` — kluczowe by zachować dom/taras klienta i dopasować proporcje (było sztywne `1024x1024` zniekształcające poziome zdjęcia).
  - Prompt przepisany: explicit „keep original photo unchanged, only add pergola, correct shadows, no text/people".
  - Rozszerzenie pliku przekazywane wg mime (jpg/webp/png).
- Frontend `page-wizualizacja.jsx`: **downscaling w przeglądarce** (canvas, max 1536 px → JPEG 0.85) przed wysyłką — payload spada do <2 MB, omija twardy limit Vercela 4.5 MB na request body (8 MB zdjęcie → ~10.7 MB base64 = 413 przed dotarciem do funkcji). Limit wejścia podniesiony do 20 MB (i tak skalujemy).
- **DZIAŁA END-TO-END (2026-06-14):** klucz `OPENAI_API_KEY` (z repo serwiszebra) dodany przez `vercel env add` do Production+Development na projekcie alukomfort. Potwierdzone: prod `alukomfort.vercel.app` HTTP 200, obraz 2.9 MB, 48 s; lokalnie `vercel dev :3005` HTTP 200, 53 s.
- Bugi gpt-image-2 naprawione kolejno: (1) brak `maxDuration` → 10s timeout; (2) `input_fidelity` NIE wspierany przez gpt-image-2 (tylko gpt-image-1) → usunięty; (3) `quality:high` przekracza 60s limit Vercela → 504, zszedłem na `quality:medium` (~25-48s).
- Tryb testowy: `WIZ_TEST_MODE=true` w `src/page-wizualizacja.jsx` chowa formularz "Twoje dane", pomija limit dzienny i leada (backend reaguje na `testMode` w body). Ustawić na `false` przed produkcją.
- **LOKALNIE testować TYLKO przez `vercel dev` (nie python http.server — nie uruchamia /api).** `cd ~/pergomet_2 && vercel dev --listen 3005`.
- ⚠️ **Domena `alukomfort.pl` NIE wskazuje na Vercel** — zwraca obcą stronę-placeholder ("Strona utrzymywana na serwerach"). Działa tylko `alukomfort.vercel.app`. Do przepięcia DNS. Canonical w kodzie używa alukomfort.pl.
- Opcjonalnie dla maili z leadami: `RESEND_API_KEY` + `LEAD_EMAIL` w env.

## 2026-06-14 — wizualizacja: rodzaj dachu + rodzaj zabudowy (commit 0cbee10) — DZIAŁA
- Konfigurator rozszerzony o 2 kroki: **rodzaj dachu** (per produkt: LINEA poliwęglan opal/BOX Grey/szkło; HORIZON lamele/szkło/hybryda; ROMA roleta tkaninowa) + **rodzaj zabudowy** (otwarta / ze ścianami bocznymi / ogród zimowy). 6 kroków, numeracja 1-6.
- **ROMA ograniczona** do dachu tkaninowego i zabudowy "otwarta" (filtr `enclosureList`, reset w `selectProduct`).
- Prompt gpt-image-2 (`api/wizualizacja.js`): `PRODUCT_PROMPTS` (bryła bez dachu) + `ROOF_PROMPTS[product][roof]` + `COLOR_OVERRIDES` + `ENCLOSURE_PROMPTS[enclosure]`. Lead email rozszerzony o dach/zabudowę.
- **Potwierdzone end-to-end po doładowaniu OpenAI**: LINEA+szkło+ogród zimowy → HTTP 200, 50 s, wygenerował pełną szklaną zabudowę (antracyt, przesuwne drzwi, dach szklany) doklejoną do domu. ✅
- Pozostaje przed publikacją: `WIZ_TEST_MODE=false`, przepięcie domeny alukomfort.pl na Vercel.

### ⚠️ OBOWIĄZKOWE przed wydaniem /wizualizacja (kontrola kosztów gpt-image-2, ~$0,06/szt.)
Limit 2/dobę jest na cookie → klient czyści ciasteczka / incognito i generuje w nieskończoność. Przed publicznym uruchomieniem MUSZĄ wejść:
1. **Twardszy limit** — per IP (nie cookie), ewentualnie niższy próg (1/dobę). Rate limit w `api/wizualizacja.js` (teraz `parseCookies` + `wiz_count`).
2. **Formularz danych** — wyłączyć `WIZ_TEST_MODE` (`src/page-wizualizacja.jsx`); wymóg e-mail+telefon = naturalne tarcie przeciw masowemu klikaniu + łapie leada.

## 2026-06-12 — strony produktowe + /realizacje (NIEZACOMMITOWANE — czeka na OK)
- **LINEA**: galeria "Przykłady zadaszeń" (6 kafli, `uploads/linea-przyklady/`), notka Solar Control, nowe klasy `.examples/.example` w styles.css.
- **HORIZON**: parametry per wariant L/S/L-S (`variants[].specs`), duże karty wyboru (`.vselect/.vcard/.vdetail`), modele CORE + notka statyka, wysięg >4m, normy EN; kafelki modeli i wariantów = fotorealistyczne generacje gpt_image_2 (Higgsfield) z renderów 1:1 (`uploads/horizon-modele/`); galeria przykładów = oficjalne wizki po outpaincie do 3:2 (`uploads/horizon-przyklady/`).
- **ROMA**: parametry techniczne (profile 80×60, wózki 350/390/415, prowadnice 40×40, tkaniny PLAIN/Opatex/W96), notka o zwijaniu przy opadach, komponenty wg producenta, galeria 6 kafli (`uploads/roma-przyklady/`: 3 lokalne rendery + outpaint restauracji + 2 generacje gpt_image_2: kawiarnia, basen).
- **/realizacje** (nowa strona): `src/page-realizacje.jsx` + routing w app.jsx + script tag w index.html. Hero statyczne (outpaint 21:9 z real_1_3), 2 case studies z 10-sekundowymi timelapse'ami **Seedance 2.0** (zachód słońca + zapalający się LED; Kling odpadł — ruszał lamelami), galerie w lightboxie-karuzeli (strzałki+klawiatura+Esc), sekcja targi, CTA. Zdjęcia `uploads/realizacje-web/`, klipy `klip-taras/pawilon.mp4` (~1,3 MB po ffmpeg).
- Higgsfield: ~14 generacji obrazów (gpt_image_2), 8 outpaintów, 7 wideo (kling3_0 + seedance_2_0). UWAGA: Seedance rzuca fałszywy "nsfw" gdy start_image to referencja job_id — obejście: wgrać klatkę jako świeży plik (media_upload). Dev server: port 3004 (python http.server).
- **Strona główna rozbudowana** (analiza konkurencji Dolny Śląsk: Tarasola/Sunwiser/DeemSystem — brak u nich FAQ, procesu, gwarancji, certyfikatów na stronach): + porównanie systemów (tabela `.cmp`), + teaser realizacji (wieczorny kadr LED), + promocja konfiguratora AI (3 kroki, sekcja ink), + proces realizacji 5 kroków (`.steps`), + Dom/Biznes (2 kafle), + "Producent, nie pośrednik" (E-E-A-T, zdjęcia targowe), + FAQ 6 pytań (akordeon `<details>` + schema FAQPage w JSON-LD). Sekcja "Dlaczego aluminium" scalona (recykling/bezobsługowość → FAQ i blok producenta). Ikony USP wygenerowane w gpt_image_2 (`uploads/icons/usp-*.png`).
- TODO: commit+push po akceptacji; favicon.ico nadal brak; placeholdery nawigacji /inspiracje /o-nas /dlaczego renderują Home.

## 2026-06-12 — fix białej planszy na /produkty/*
- Przyczyna: `const PRODUCTS` w `src/page-wizualizacja.jsx` (konfigurator AI, commit `3ac581d`) przesłaniał globalne `window.PRODUCTS` z `data.jsx` → `PRODUCTS.LINEA` undefined → crash całego renderu na linea/horizon/roma.
- Fix: rename na `WIZ_PRODUCTS`, commit `d8341ce`, push na main (Vercel auto-deploy).
- Zweryfikowane lokalnie w przeglądarce (konsola czysta, brak tylko favicon.ico — 404).
- TODO: dodać favicon.ico; otwarta sprawa z poprzednich commitów — diagnostyka `OPENAI_API_KEY` w ENV Vercela dla `/api/wizualizacja` (commit `e742968` wypisuje dostępne klucze ENV).
