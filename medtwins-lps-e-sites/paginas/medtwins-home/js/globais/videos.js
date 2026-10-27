// Reprodução decorativa: mantém a intenção ao carregar e permite retomar por gesto
// quando o navegador recusa o play inicial. Não interfere nos vídeos com controles.
const REDUZIDO = matchMedia('(prefers-reduced-motion: reduce)');
const estados = new Map();

function visivel(video) {
  const r = video.getBoundingClientRect();
  const css = getComputedStyle(video);
  return !document.hidden && video.isConnected && r.width > 0 && r.height > 0
    && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth
    && css.display !== 'none' && css.visibility !== 'hidden';
}

export function prepararVideo(video) {
  if (estados.has(video)) return estados.get(video);
  const estado = { querTocar: false, tentando: false, carregou: false };
  estados.set(video, estado);
  video.defaultMuted = true;
  video.muted = true;
  video.playsInline = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.preload = 'metadata';
  video.addEventListener('canplay', () => {
    if (estado.querTocar && video.paused && visivel(video)) tentar(video, estado);
  });
  return estado;
}

function tentar(video, estado, porGesto = false) {
  if (REDUZIDO.matches || !estado.querTocar || (estado.tentando && !porGesto) || document.hidden) return;
  estado.tentando = true;
  video.autoplay = true;
  if (!estado.carregou) {
    estado.carregou = true;
    // A seleção explícita da fonte evita depender de preload="none" no Safari.
    if (video.networkState === HTMLMediaElement.NETWORK_EMPTY) video.load();
  }
  let promise;
  try {
    promise = video.play();
  } catch {
    estado.tentando = false;
    return;
  }
  Promise.resolve(promise).catch(() => {
    // A intenção é preservada: o próximo toque/clique pode autorizar a reprodução.
  }).finally(() => { estado.tentando = false; });
}

export function tocarVideo(video) {
  const estado = prepararVideo(video);
  estado.querTocar = true;
  tentar(video, estado);
}

export function pausarVideo(video) {
  const estado = estados.get(video);
  if (estado) estado.querTocar = false;
  video.autoplay = false;
  video.pause();
}

function retomarPorGesto() {
  if (REDUZIDO.matches) return;
  estados.forEach((estado, video) => {
    if (estado.querTocar && video.paused && visivel(video)) tentar(video, estado, true);
  });
}
// Os eventos chamam play diretamente, sem setTimeout/await, preservando o gesto.
document.addEventListener('touchend', retomarPorGesto, { passive: true });
document.addEventListener('click', retomarPorGesto, { passive: true });
document.addEventListener('keydown', retomarPorGesto);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) estados.forEach((_, video) => video.pause());
  else retomarPorGesto();
});
REDUZIDO.addEventListener('change', () => {
  if (REDUZIDO.matches) estados.forEach((_, video) => { video.autoplay = false; video.pause(); });
});
