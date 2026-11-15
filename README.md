# VAGON Restoran BW

Responsive static restaurant website for Vagon at Belgrade Waterfront. No build step or dependencies.

## Run locally

```sh
python3 -m http.server 4173
```

Open http://localhost:4173. Deploy on Vercel with framework preset **Other**, root `./`, and no build command.

## Contents

- `index.html`: page structure and restaurant information.
- `assets/site.css`: dark full-image layout, masked title entrances, continuous background motion, scroll-linked image parallax, gallery reveals, menu transitions and reduced-motion styles.
- `assets/site.js`: accessible native menu dialog, category selection, accent-insensitive search, mobile navigation and video playback.
- `assets/menu-data.js`: original menu entries and prices retained from the previous site.
- Three user-supplied photographs converted to WebP. Every displayed photograph uses a shared CSS crop that excludes the top date label and bottom Google mark; source pixels are not synthesized or retouched.
- User-supplied 29-second film encoded as H.264/AAC with fast-start metadata, loaded only on playback. A separate small, silent 8-second hero loop plays automatically while visible. Both respect reduced motion; the hero offers a pause/resume control. `evening.jpg` is a frame from this video.

## Restaurant information

Instagram: https://www.instagram.com/vagonrestoran_bw/

Phone: +381 11 316 4691. Opening hours follow the supplied restaurant announcement: Monday–Thursday 09:00–23:00; Friday–Sunday 09:00–00:00.

Menu prices and phone number are inherited from the existing project. Confirm their currency with the restaurant before final public promotion.

## Browser verification

Verified in Chromium at 320, 390, 768 and 1440px widths: images load with no horizontal overflow; menu categories, search (including unaccented Serbian input), empty state, Escape/focus behavior, mobile navigation, video playback/offscreen pause and reduced-motion preference. No console errors or failed HTTP requests were observed.

The revised template uses Barlow Condensed headlines, a charcoal/forest background, copper accents and a full-bleed photo hero. Browser checks also cover actual progression of the hero video and ticker, animation pause/resume, and pausing background video with the menu open.

Fonts are served locally from `assets/fonts/`; the bundled SIL Open Font Licenses are included there. Photo crop boundaries were checked at both parallax extremes at 320, 390, 768 and 1440px: the date label and Google corner mark stay outside every displayed photograph.
