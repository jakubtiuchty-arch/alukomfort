# PROGRESS — alukomfort (pergomet_2)

## 2026-06-12 — fix białej planszy na /produkty/*
- Przyczyna: `const PRODUCTS` w `src/page-wizualizacja.jsx` (konfigurator AI, commit `3ac581d`) przesłaniał globalne `window.PRODUCTS` z `data.jsx` → `PRODUCTS.LINEA` undefined → crash całego renderu na linea/horizon/roma.
- Fix: rename na `WIZ_PRODUCTS`, commit `d8341ce`, push na main (Vercel auto-deploy).
- Zweryfikowane lokalnie w przeglądarce (konsola czysta, brak tylko favicon.ico — 404).
- TODO: dodać favicon.ico; otwarta sprawa z poprzednich commitów — diagnostyka `OPENAI_API_KEY` w ENV Vercela dla `/api/wizualizacja` (commit `e742968` wypisuje dostępne klucze ENV).
