// Testes locais. O RD e as provas externas são interceptados; nenhum lead real é enviado.
import { chromium, webkit } from 'playwright-core';
import { readFileSync, mkdirSync } from 'node:fs';
import { extname } from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url)).replace(/[\\\/]$/, '');
const mount = '/wp-content/plugins/medtwins-lps-e-sites';
const defaults = JSON.parse(readFileSync(root + '/assets/simulados-defaults.json', 'utf8'));
const ids = Object.keys(defaults.paginas);
const config = JSON.parse(JSON.stringify(defaults));
ids.forEach((id) => { config.paginas[id] = 'https://wp.test/publico/' + id + '/'; });
config.campanhas.cem.data = '20 de janeiro'; config.campanhas.cem.horario = 'às 9h';
mkdirSync(root + '/previews', { recursive: true });
const mime = { '.html': 'text/html', '.js': 'application/x-javascript', '.mjs': 'text/plain', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg' };
const mockRD = `window.__rdCaptures=[];window.RdstationFormsIntegration={Integration:{integrateAll(){}}};document.addEventListener('submit',e=>{window.__rdCaptures.push({name:e.target.name,fields:Object.fromEntries(new FormData(e.target))});});`;

async function context(browser, width, flags = {}) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, isMobile: width < 500, hasTouch: width < 500 });
  const page = await ctx.newPage();
  const errors = [], requests = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.route('**/*', (route) => {
    const u = new URL(route.request().url()); requests.push(u.href);
    if (u.href === defaults.rd_script) return flags.rdFail ? route.abort('failed') : route.fulfill({ contentType: 'application/javascript', body: mockRD });
    if (u.pathname === '/wp-json/medtwins-lps/v1/simulados-config') return route.fulfill({ status: flags.apiFail ? 500 : 200, contentType: 'application/json', body: JSON.stringify(config) });
    if (u.pathname.startsWith('/publico/')) {
      const id = u.pathname.split('/')[2];
      const params = new URLSearchParams(u.search); params.set('mt_simulados', 'https://wp.test/wp-json/medtwins-lps/v1/simulados-config');
      return route.fulfill({ contentType: 'text/html', body: `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;overflow:hidden}iframe{position:fixed;inset:0;width:100%;height:100%;border:0}</style></head><body><iframe src="${mount}/paginas/${id}/index.html?${params}" allow="autoplay;fullscreen"></iframe></body></html>` });
    }
    if (u.host === 'page.medtwins.com.br') return route.fulfill({ contentType: 'text/html', body: '<title>Prova existente — teste</title>' });
    const path = u.pathname.startsWith(mount) ? u.pathname.slice(mount.length) : u.pathname;
    try { return route.fulfill({ contentType: mime[extname(path)] || 'application/json', body: readFileSync(root + path) }); }
    catch { errors.push('Ausente: ' + path); return route.fulfill({ status: 404, body: '' }); }
  });
  return { ctx, page, errors, requests };
}
const frameAtual = (page) => page.frames().find((f) => f.url().includes('/paginas/'));
async function preencher(frame, width) {
  if (width < 1100) {
    await frame.locator('[data-abrir-form]').first().click();
    // A gaveta transfere o foco ao título após abrir. Aguarde antes de digitar.
    await frame.waitForFunction(() => document.activeElement === document.querySelector('[data-passo="1"] [tabindex="-1"]'));
  }
  await frame.locator('#f-nome').fill('Auditoria Local');
  await frame.locator('#f-telefone').pressSequentially('11987654321');
  await frame.locator('#f-email').fill('teste@example.invalid');
  assert.equal(await frame.locator('#f-telefone').inputValue(), '(11) 98765-4321');
  await frame.locator('#f-email').press('Enter');
  await frame.locator('[data-passo="2"]').waitFor({ state: 'visible' });
  assert.equal(await frame.evaluate(() => window.__rdCaptures?.length || 0), 0, 'Primeiro passo não pode gerar captura.');
  for (const id of ['q1-a', 'q2-b', 'q3-b', 'q4-a', 'q5-b']) await frame.locator(`label[for="${id}"]`).click();
}

for (const engine of (process.env.VERIFY_ENGINE ? [process.env.VERIFY_ENGINE] : ['chromium', 'webkit'])) {
  const browser = engine === 'webkit' ? await webkit.launch({ headless: true }) : await chromium.launch({ channel: 'chrome', headless: true });
  try {
    for (const width of [1440, 390]) {
      for (const id of ['simulado-nacional', 'simulado-nacional-6-areas']) {
        const t = await context(browser, width);
        await t.page.goto(config.paginas[id] + '?utm_source=teste&utm_campaign=fluxo', { waitUntil: 'load' });
        let frame = frameAtual(t.page);
        await frame.locator('html.js-pronto').waitFor();
        await frame.waitForFunction(() => !document.querySelector('[data-enviar]').disabled);
        assert.equal(await frame.locator('form').getAttribute('name'), 'simulado medtwins v2');
        assert.equal(await frame.locator('[data-campanha="data"]').isVisible(), id === 'simulado-nacional');
        if (id === 'simulado-nacional') assert.equal(await frame.locator('[data-campanha="data"]').innerText(), '20 de janeiro');
        if (engine === 'chromium') await t.page.screenshot({ path: `${root}/previews/fluxo-${id}-${width}.png` });
        await preencher(frame, width);
        await frame.locator('[data-enviar]').click();
        await frame.locator('[data-passo="3"]').waitFor({ state: 'visible' });
        const captured = await frame.evaluate(() => window.__rdCaptures);
        assert.equal(captured.length, 1);
        assert.equal(captured[0].fields.pagina, id === 'simulado-nacional' ? 'simulado-nacional-100' : id);
        assert.equal(captured[0].fields.utm_source, 'teste');
        assert.equal(Object.keys(captured[0].fields).filter((key) => ['mentoria_medtwins', 'outra_mentoria', 'prova_inep', 'ja_prestou_inep', 'interesse_mentoria'].includes(key)).length, 5);
        const access = config.paginas[id + '-liberacao'];
        await t.page.waitForURL((url) => url.href.startsWith(access), { timeout: 10000 });
        assert.equal(new URL(t.page.url()).searchParams.get('utm_source'), 'teste');
        frame = frameAtual(t.page); await frame.locator('html.js-pronto').waitFor();
        if (engine === 'chromium') await t.page.screenshot({ path: `${root}/previews/fluxo-${id}-liberacao-${width}.png` });
        const links = await frame.locator('[data-link-simulado]').evaluateAll((els) => els.map((el) => ({ key: el.dataset.linkSimulado, href: el.href, target: el.target, pending: el.hasAttribute('data-pendente') })));
        assert.equal(links.length, id === 'simulado-nacional' ? 1 : 6);
        for (const link of links) {
          assert(link.href.startsWith(defaults.links[link.key])); assert.equal(link.target, '_top'); assert.equal(link.pending, false);
        }
        assert.equal(await frame.locator('[data-pagina-destino]').count(), 2);
        await frame.locator('[data-link-simulado]').last().click();
        await t.page.waitForURL((url) => url.href.startsWith(defaults.links['simulado-geral']));
        assert.equal(t.requests.some((url) => new URL(url).pathname.endsWith('.mjs')), false);
        assert.deepEqual(t.errors, []);
        console.log(`PASS ${engine} ${width}px ${id}: RD somente final, UTMs, acesso na janela principal e prova real.`);
        await t.ctx.close();
      }
    }
    // Modo estático, sem PHP: API indisponível não quebra os destinos locais.
    const offline = await context(browser, 1440, { apiFail: true });
    await offline.page.goto('https://wp.test/paginas/simulado-nacional-liberacao/index.html', { waitUntil: 'load' });
    await offline.page.locator('html.js-pronto').waitFor();
    assert((await offline.page.locator('[data-link-simulado]').getAttribute('href')).startsWith(defaults.links.nacional));
    assert.equal(await offline.page.locator('[data-pagina-destino]').first().getAttribute('href'), 'https://wp.test/paginas/simulado-nacional-6-areas-liberacao/index.html');
    await offline.ctx.close();
    // Falha do RD não pode produzir sucesso falso; tentar de novo recarrega o script.
    const flags = { rdFail: true };
    const failure = await context(browser, 390, flags);
    await failure.page.goto(config.paginas['simulado-nacional'], { waitUntil: 'load' });
    let frame = frameAtual(failure.page); await frame.locator('html.js-pronto').waitFor();
    await preencher(frame, 390); await frame.locator('[data-enviar]').click();
    await frame.locator('[data-falha]').waitFor({ state: 'visible' });
    assert.equal(await frame.locator('[data-passo="3"]').isVisible(), false);
    flags.rdFail = false;
    await frame.locator('[data-tentar]').click();
    await failure.page.waitForURL((url) => url.href.startsWith(config.paginas['simulado-nacional-liberacao']), { timeout: 10000 });
    assert.deepEqual(failure.errors, []);
    await failure.ctx.close();
    console.log(`PASS ${engine}: index estático, falha de RD sem sucesso falso e recuperação por nova tentativa.`);
  } finally { await browser.close(); }
}

