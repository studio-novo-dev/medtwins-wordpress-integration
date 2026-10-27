import { webkit } from 'playwright-core';
import { createServer } from 'node:http';
import { readFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, extname, sep } from 'node:path';
import assert from 'node:assert/strict';

const root = resolve(fileURLToPath(new URL('../', import.meta.url)));
mkdirSync(root + '/previews', { recursive: true });
const types = { '.html': 'text/html', '.js': 'application/javascript', '.mjs': 'text/plain', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg' };
const ranges = [];
const server = createServer((req, res) => {
  const path = new URL(req.url, 'http://localhost').pathname;
  if (path === '/wrapper') {
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;overflow:hidden}iframe{position:fixed;inset:0;width:100%;height:100%;border:0}</style></head><body><iframe allow="autoplay; fullscreen; picture-in-picture" src="/paginas/medtwins-home/index.html"></iframe></body></html>');
    return;
  }
  try {
    const file = resolve(root, '.' + decodeURIComponent(path));
    if (!file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    const data = readFileSync(file);
    res.setHeader('Content-Type', types[extname(file)] || 'application/octet-stream');
    res.setHeader('Accept-Ranges', 'bytes');
    const range = /bytes=(\d*)-(\d*)/.exec(req.headers.range || '');
    if (range) {
      const start = range[1] ? Number(range[1]) : Math.max(0, data.length - Number(range[2]));
      const end = range[1] && range[2] ? Math.min(data.length - 1, Number(range[2])) : data.length - 1;
      res.statusCode = 206;
      res.setHeader('Content-Range', `bytes ${start}-${end}/${data.length}`);
      res.setHeader('Content-Length', end - start + 1);
      if (extname(file) === '.mp4') ranges.push(path);
      res.end(req.method === 'HEAD' ? undefined : data.subarray(start, end + 1));
    } else {
      res.setHeader('Content-Length', data.length);
      res.end(req.method === 'HEAD' ? undefined : data);
    }
  } catch { res.writeHead(404).end(); }
});
await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
const browser = await webkit.launch({ headless: true });
try {
  for (const width of [1440, 390]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, isMobile: width < 500, hasTouch: width < 500, reducedMotion: 'no-preference' });
    await ctx.addInitScript(() => {
      const original = HTMLMediaElement.prototype.play;
      const refused = new WeakSet();
      HTMLMediaElement.prototype.play = function (...args) {
        if (this.classList.contains('video__completo') && !refused.has(this)) {
          refused.add(this);
          return Promise.reject(new DOMException('Recusa inicial simulada para testar a recuperação por toque.', 'NotAllowedError'));
        }
        return original.apply(this, args);
      };
    });
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/wrapper`, { waitUntil: 'load' });
    const frame = page.frames().find((f) => f.url().includes('/paginas/medtwins-home/'));
    await frame.locator('html.js-pronto').waitFor();
    await page.waitForTimeout(2500);
    const states = () => frame.locator('video').evaluateAll((videos) => videos.filter((v) => { const r = v.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0 && r.left < innerWidth && r.right > 0; }).map((v) => ({ src: v.currentSrc.split('/').pop(), ready: v.readyState, paused: v.paused, time: v.currentTime, error: v.error?.message })));
    console.log(width, 'BACKGROUND', JSON.stringify(await states()));
    await frame.locator('[data-depoimento]').first().click({ timeout: 15000 });
    await frame.locator('.video__tentar').waitFor({ state: 'visible' });
    assert.equal(await frame.locator('.video__ajuda a').getAttribute('target'), '_blank');
    await page.screenshot({ path: root + `/previews/video-recuperacao-${width}.png` });
    await frame.locator('.video__tentar').click();
    await frame.waitForFunction(() => {
      const v = document.querySelector('.video__completo');
      return v && v.readyState >= 2 && !v.paused && v.currentTime > 0.1;
    }, null, { timeout: 15000 });
    await page.waitForTimeout(2500);
    console.log(width, 'TESTIMONIAL', await frame.locator('.video__completo').evaluate((v) => ({ ready: v.readyState, paused: v.paused, time: v.currentTime, error: v.error?.message })));
    console.log('ERRORS', errors, 'HTTP video ranges', ranges.length);
    assert.deepEqual(errors, []);
    assert.equal(await frame.locator('.video__ajuda').isVisible(), false);
    console.log(`PASS ${width}px: WebKit reproduz MP4 e recupera recusa inicial após clique/toque, com controles inline.`);
    await ctx.close();
  }
} finally { await browser.close(); server.close(); }

