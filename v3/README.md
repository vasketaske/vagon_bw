# Vagon — Ukusi sa šina

Statički sajt restorana Vagon BW: HTML, CSS i JavaScript.

## Vercel

- Framework Preset: Other.
- Root Directory: folder u kome je ovaj README (za repozitorijum vasketaske/vagon_bw to je `v3`).
- Build Command: `node scripts/prepare-social.mjs`.
- Output Directory: `dist`.
- Install Command: nije potrebna instalacija paketa.

`vercel.json` već sadrži build komandu i izlazni direktorijum. Skripta pri objavi postavlja javni URL banera i kanonski URL prema Vercel domenu projekta. Po potrebi se može postaviti opciona promenljiva `PUBLIC_SITE_URL` za sopstveni domen.

Rezervacije rade pozivom na 011 316 4691 i preko Instagrama. Jelovnik vodi na Wolt. Baner za deljenje linka je `dist/assets/vagon-og.jpg` (1200 × 630), sa Open Graph i Twitter metapodacima.

`iphone-preview.html` prikazuje isti sajt u mobilnom okviru.
Fotografije i video su u `dist/assets`. Google Fonts i biblioteke za animacije učitavaju se sa CDN-a.

Za lokalni pregled: `python3 -m http.server 3000 --directory dist`, pa otvorite http://localhost:3000.
