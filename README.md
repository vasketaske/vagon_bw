# VAGON Restoran BW

Responsive static restaurant website for Vagon at Belgrade Waterfront. No build step or dependencies.

## Run locally

```sh
python3 -m http.server 4173
```

Open http://localhost:4173. Deploy on Vercel with framework preset **Other**, root `./`, and no build command.

## Contents

- `index.html`: page structure and restaurant information.
- `assets/site.css`: responsive layout, scroll reveals, hover transitions and reduced-motion styles.
- `assets/site.js`: accessible native menu dialog, category selection, accent-insensitive search, mobile navigation and video playback.
- `assets/menu-data.js`: original menu entries and prices retained from the previous site.
- Three user-supplied photographs converted to WebP without retouching; original date/Google marks remain in the image files.
- User-supplied 29-second video encoded as H.264/AAC with fast-start metadata, loaded only on playback. `evening.jpg` is a frame from this video.

## Restaurant information

Instagram: https://www.instagram.com/vagonrestoran_bw/

Phone: +381 11 316 4691. Opening hours follow the supplied restaurant announcement: Monday–Thursday 09:00–23:00; Friday–Sunday 09:00–00:00.

Menu prices and phone number are inherited from the existing project. Confirm their currency with the restaurant before final public promotion.

## Browser verification

Verified in Chromium at 320, 390, 768 and 1440px widths: images load with no horizontal overflow; menu categories, search (including unaccented Serbian input), empty state, Escape/focus behavior, mobile navigation, video playback/offscreen pause and reduced-motion preference. No console errors or failed HTTP requests were observed.
