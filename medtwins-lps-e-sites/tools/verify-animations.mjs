// Reproduz os MIME observados em produção: .js JavaScript; .mjs text/plain.
// Dependência de desenvolvimento instalada com npm ci na raiz; não entra no ZIP.
import { chromium } from 'playwright-core';
import { readFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { extname } from 'node:path';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('../', import.meta.url));
const baseline = JSON.parse(readFileSync(root + 'tools/fixtures/animation-baseline.json', 'utf8'));
mkdirSync(root + '/previews', { recursive: true });
const mime = { '.html': 'text/html', '.js': 'application/x-javascript; charset=UTF-8', '.mjs': 'text/plain; charset=UTF-8', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg' };
const browser = await chromium.launch({ channel: 'chrome', headless: true });

async function open({ before = false, width = 1440, reduced = false } = {}) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, isMobile: width < 500, hasTouch: width < 500, reducedMotion: reduced ? 'reduce' : 'no-preference' });
  const page = await ctx.newPage();
  const errors = [];
  const requests = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  await page.route('**/*', (route) => {
    const url = new URL(route.request().url());
    requests.push(url.pathname);
    if (url.pathname === '/wrapper') return route.fulfill({ contentType: 'text/html', body: '<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;overflow:hidden}iframe{position:fixed;inset:0;width:100%;height:100%;border:0}</style></head><body><iframe src="/paginas/medtwins-home/index.html"></iframe></body></html>' });
    try {
      const path = url.pathname.slice(1);
      const file = before && Object.hasOwn(baseline, path) ? Buffer.from(baseline[path]) : readFileSync(root + path);
      const headers = { 'Accept-Ranges': 'bytes' };
      const range = /bytes=(\d+)-(\d*)/.exec(route.request().headers().range || '');
      if (range) {
        const start = Number(range[1]);
        const end = range[2] ? Math.min(Number(range[2]), file.length - 1) : file.length - 1;
        return route.fulfill({ status: 206, contentType: mime[extname(path)], headers: { ...headers, 'Content-Range': `bytes ${start}-${end}/${file.length}` }, body: file.subarray(start, end + 1) });
      }
      return route.fulfill({ contentType: mime[extname(path)], headers, body: file });
    } catch {
      errors.push('Arquivo ausente: ' + url.pathname);
      return route.fulfill({ status: 404, body: '' });
    }
  });
  await page.goto('https://medtwins.test/wrapper', { waitUntil: 'load' });
  const frame = page.frames().find((f) => f.url().includes('/paginas/medtwins-home/'));
  return { ctx, page, frame, errors, requests };
}

try {
  const old = await open({ before: true });
  assert.equal(await old.frame.locator('html.js-pronto').count(), 0);
  assert(old.errors.some((error) => error.includes('MIME type') && error.includes('text/plain')));
  console.log('PASS reprodução: versão 1.2.0 não inicia, com erro de MIME text/plain no módulo.');
  await old.ctx.close();

  for (const width of [1440, 390]) {
    const current = await open({ width });
    const { ctx, page, frame, errors, requests } = current;
    await frame.locator('html.js-pronto').waitFor();
    await frame.locator('.hero--entrou').waitFor();
    await frame.waitForFunction(() => window.ScrollTrigger && window.gsap);
    assert(requests.some((path) => path.endsWith('/lenis.js')));
    assert(!requests.some((path) => path.endsWith('.mjs')));
    assert.equal(await frame.locator('.acervo--vivo').count(), 1);
    if (width >= 1100) {
      await frame.locator('.metodologia--fixada').waitFor();
      const transform = () => frame.locator('.acervo__trilho').first().evaluate((el) => getComputedStyle(el).transform);
      const first = await transform();
      await page.waitForTimeout(350);
      assert.notEqual(await transform(), first, 'Acervo deve se mover entre quadros.');
      await frame.evaluate(() => {
        const st = ScrollTrigger.getAll().find((item) => item.trigger?.matches('[data-metodologia]'));
        if (!st) throw new Error('ScrollTrigger da metodologia ausente.');
        scrollTo(0, st.start + (st.end - st.start) * 0.55);
      });
      await frame.waitForFunction(() => ScrollTrigger.getAll().some((st) => st.trigger?.matches('[data-metodologia]') && st.progress > 0.3));
      const sheets = await frame.locator('.frente').evaluateAll((els) => els.map((el) => getComputedStyle(el).transform));
      assert(sheets.some((value) => value !== 'none'), 'Folhas devem ser transformadas ao rolar.');
    } else {
      const menu = frame.locator('.nav__abrir');
      await menu.click();
      assert.equal(await menu.getAttribute('aria-expanded'), 'true');
    }
    assert.deepEqual(errors, []);
    await page.screenshot({ path: root + `previews/animacoes-corrigidas-${width}.png` });
    console.log(`PASS ${width}px: inicialização, GSAP/ScrollTrigger, acervo${width >= 1100 ? ', folhas animadas ao rolar' : ', menu mobile'}; sem .mjs e sem erros.`);
    await ctx.close();
  }

  const reduced = await open({ reduced: true });
  await reduced.frame.locator('html.js-pronto').waitFor();
  assert.equal(await reduced.frame.locator('.acervo--vivo').count(), 0);
  assert.equal(await reduced.frame.locator('.metodologia--fixada').count(), 0);
  console.log('PASS movimento reduzido continua respeitado.');
  await reduced.ctx.close();
} finally {
  await browser.close();
}

