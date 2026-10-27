(() => {
  'use strict';
  if (document.querySelector('.medtwins-pagina--tela')) {
    document.documentElement.classList.add('medtwins-pagina-tela');
  }
  // Lê a URL no navegador para preservar campanhas mesmo com cache de página no WP.
  const campaign = new URLSearchParams(window.location.search);
  document.querySelectorAll('.medtwins-pagina__frame').forEach((frame) => {
    const url = new URL(frame.src, window.location.href);
    const before = url.href;
    for (const key of [...url.searchParams.keys()]) {
      if (/^(utm_[a-z0-9_]+|gclid|fbclid|msclkid)$/i.test(key)) url.searchParams.delete(key);
    }
    campaign.forEach((value, key) => {
      if (/^(utm_[a-z0-9_]+|gclid|fbclid|msclkid)$/i.test(key)) url.searchParams.set(key, value);
    });
    if (url.href !== before) frame.src = url.href;
  });
})();
