import { readFile, writeFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const supplied = process.env.PUBLIC_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || 'vagon-restoran-v3.vasilijeana19.chatgpt.site';
const origin = new URL(supplied.startsWith('https://') || supplied.startsWith('http://') ? supplied : `https://${supplied}`).origin;
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
for (const name of ['index.html', 'vagon-v3.html']) {
  const file = resolve(root, 'dist', name);
  try { await access(file); } catch { continue; }
  let html = await readFile(file, 'utf8');
  for (const [kind, key, value] of [
    ['property', 'og:url', `${origin}/`],
    ['property', 'og:image', `${origin}/assets/vagon-og.jpg`],
    ['property', 'og:image:secure_url', `${origin}/assets/vagon-og.jpg`],
    ['name', 'twitter:image', `${origin}/assets/vagon-og.jpg`],
  ]) {
    const pattern = new RegExp(`(<meta ${kind}="${key}" content=")[^"]*(")`);
    html = html.replace(pattern, (_, before, after) => before + escape(value) + after);
  }
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, (_, before, after) => before + escape(`${origin}/`) + after);
  await writeFile(file, html);
}
console.log('Social sharing metadata prepared for the deployment origin.');
