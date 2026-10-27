// Configuração comum das quatro páginas. O fallback JSON mantém index.html estático.
let config;
let endpoint = null;
let rdPromise = null;
const CAMPANHAS = { cem: 'cem', 'liberacao-cem': 'cem', 'seis-areas': 'seis-areas', 'liberacao-seis-areas': 'seis-areas' };

function urlSegura(value, base = location.href) {
  if (typeof value !== 'string' || !value || /[\s\\]/.test(value) || value.startsWith('//')) return null;
  if (!/^https?:\/\//i.test(value) && !/^\/(?!\/)/.test(value)) return null;
  try {
    const url = new URL(value, base);
    return /^https?:$/.test(url.protocol) && !url.username && !url.password ? url : null;
  } catch { return null; }
}

async function json(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(url, { cache: 'no-store', credentials: 'same-origin', signal: controller.signal });
    if (!response.ok) throw new Error('Configuração indisponível.');
    return await response.json();
  } finally { clearTimeout(timer); }
}

function endpointAtual() {
  const provided = new URLSearchParams(location.search).get('mt_simulados');
  if (provided) {
    const url = urlSegura(provided);
    return url?.origin === location.origin ? url : null;
  }
  const pos = location.pathname.indexOf('/wp-content/');
  return pos < 0 ? null : new URL(location.pathname.slice(0, pos) + '/wp-json/medtwins-lps/v1/simulados-config', location.origin);
}

function campanha() { return config.campanhas[CAMPANHAS[document.body.dataset.pagina]]; }

function campanhaUrl(url, pagina = false) {
  const destino = new URL(url, location.href);
  new URLSearchParams(location.search).forEach((value, key) => {
    if (/^(utm_[a-z0-9_]+|gclid|fbclid|msclkid)$/i.test(key) && !destino.searchParams.has(key)) destino.searchParams.set(key, value);
  });
  if (pagina && endpoint && destino.origin === location.origin && destino.pathname.endsWith('/index.html')) destino.searchParams.set('mt_simulados', endpoint.href);
  return destino.href;
}

function paginaUrl(id) {
  const custom = urlSegura(config.paginas[id]);
  return campanhaUrl(custom?.href || new URL('../' + id + '/index.html', location.href).href, true);
}

function aplicar() {
  const campaign = campanha();
  document.querySelectorAll('[data-link-simulado]').forEach((link) => {
    const url = urlSegura(config.links[link.dataset.linkSimulado]);
    if (!url) return;
    link.href = campanhaUrl(url.href);
    link.target = '_top';
    link.removeAttribute('data-pendente');
  });
  document.querySelectorAll('[data-pagina-destino]').forEach((link) => {
    if (!Object.hasOwn(config.paginas, link.dataset.paginaDestino)) return;
    link.href = paginaUrl(link.dataset.paginaDestino);
    link.target = '_top';
  });
  for (const field of ['data', 'horario']) {
    document.querySelectorAll(`[data-campanha="${field}"]`).forEach((el) => {
      const value = campaign[field].trim();
      el.textContent = value;
      el.closest('.dado').hidden = !value;
    });
  }
  const form = document.querySelector('[data-form]');
  if (form) {
    form.name = campaign.form_name;
    const hidden = (name, value) => {
      let input = [...form.elements].find((el) => el.name === name);
      if (!input) { input = document.createElement('input'); input.type = 'hidden'; input.name = name; form.append(input); }
      input.value = value;
    };
    hidden('pagina', document.body.dataset.pagina === 'cem' ? 'simulado-nacional-100' : 'simulado-nacional-6-areas');
    new URLSearchParams(location.search).forEach((value, key) => {
      if (/^(utm_[a-z0-9_]+|gclid|fbclid|msclkid)$/i.test(key)) hidden(key, value);
    });
  }
}

export const pronto = (async () => {
  config = await json(new URL('./simulados-defaults.json?v=1.3.0', import.meta.url));
  endpoint = endpointAtual();
  if (endpoint) {
    try {
      const saved = await json(endpoint.href);
      for (const id of Object.keys(config.links)) if (urlSegura(saved.links?.[id])) config.links[id] = saved.links[id];
      for (const id of Object.keys(config.paginas)) if (urlSegura(saved.paginas?.[id])) config.paginas[id] = saved.paginas[id];
      for (const id of Object.keys(config.campanhas)) {
        for (const key of ['data', 'horario', 'form_name']) if (typeof saved.campanhas?.[id]?.[key] === 'string') config.campanhas[id][key] = saved.campanhas[id][key];
      }
      const rd = urlSegura(saved.rd_script);
      if (rd?.protocol === 'https:') config.rd_script = rd.href;
    } catch { /* Os destinos estáticos continuam funcionando se a API falhar. */ }
  }
  aplicar();
})();

export function destinoAcesso() { return paginaUrl(campanha().acesso); }

export function prepararCaptura() {
  if (rdPromise) return rdPromise;
  rdPromise = new Promise((resolve, reject) => {
    const src = urlSegura(config.rd_script);
    if (!src || src.protocol !== 'https:') { reject(new Error('Integração de cadastro indisponível.')); return; }
    let timer;
    const timeout = setTimeout(() => { clearInterval(timer); rdPromise = null; reject(new Error('Integração de cadastro indisponível.')); }, 15000);
    const ready = () => {
      // Namespace exposto pelo carregador já instalado da MedTwins.
      if (typeof window.RdstationFormsIntegration?.Integration?.integrateAll !== 'function') return;
      clearTimeout(timeout); clearInterval(timer); resolve();
    };
    if (![...document.scripts].some((script) => script.src === src.href)) {
      const script = document.createElement('script');
      script.src = src.href; script.async = true;
      script.addEventListener('error', () => { clearTimeout(timeout); clearInterval(timer); script.remove(); rdPromise = null; reject(new Error('Integração de cadastro indisponível.')); });
      document.head.append(script);
    }
    timer = setInterval(ready, 100);
    ready();
  });
  return rdPromise;
}

export function abrirAcesso() {
  const url = destinoAcesso();
  try { window.top.location.assign(url); } catch { window.location.assign(url); }
}
