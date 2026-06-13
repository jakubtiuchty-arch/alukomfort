# PROGRESS — alukomfort (pergomet_2)

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
