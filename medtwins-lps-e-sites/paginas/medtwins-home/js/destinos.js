(() => {
  'use strict';
  const endpoint = new URLSearchParams(location.search).get('mt_destinos');
  if (!endpoint) return;

  let url;
  try {
    url = new URL(endpoint);
    if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return;
  } catch {
    return;
  }

  function destination(value) {
    if (typeof value !== 'string' || /[\s\\]/.test(value)) return null;
    if (value.startsWith('#') && value.length > 1) return { href: value, target: '_self' };
    if (!/^https?:\/\//i.test(value) && !/^\/(?!\/)/.test(value)) return null;
    try {
      const link = new URL(value, url.origin);
      if (!/^https?:$/.test(link.protocol) || link.username || link.password) return null;
      return { href: link.href, target: '_top' };
    } catch {
      return null;
    }
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  fetch(url.href, { cache: 'no-store', credentials: 'same-origin', signal: controller.signal })
    .then((response) => {
      if (!response.ok) throw new Error('Não foi possível carregar os destinos.');
      return response.json();
    })
    .then((config) => {
      if (!config || typeof config !== 'object' || Array.isArray(config)) return;
      document.querySelectorAll('[data-medtwins-destino]').forEach((link) => {
        const id = link.dataset.medtwinsDestino;
        if (!Object.prototype.hasOwnProperty.call(config, id)) return;
        const dest = destination(config[id]);
        if (!dest) {
          link.setAttribute('href', '#');
          link.setAttribute('data-pendente', 'destino');
          link.removeAttribute('target');
          return;
        }
        const newTab = link.getAttribute('target') === '_blank';
        link.setAttribute('href', dest.href);
        link.setAttribute('target', newTab && dest.target !== '_self' ? '_blank' : dest.target);
        if (newTab) link.setAttribute('rel', 'noopener noreferrer');
        link.removeAttribute('data-pendente');
      });
    })
    .catch(() => {
      // Uma falha de configuração não interrompe a navegação e as animações da home.
    })
    .finally(() => clearTimeout(timer));
})();
