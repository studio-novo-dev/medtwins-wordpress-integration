// Preferências e estado de movimento, num lugar só para as cenas consultarem:
// - REDUZIDO: prefers-reduced-motion (cenas paradas no estado final).
// - abaVisivel() e aoMudarAba(): pausa de tudo o que roda com a aba oculta.
// - CURSOR_FINO: paralaxe pelo cursor só com mouse.

export const REDUZIDO = matchMedia('(prefers-reduced-motion: reduce)');
export const CURSOR_FINO = matchMedia('(hover: hover) and (pointer: fine)');

const ouvintes = new Set();

export function abaVisivel() {
  return !document.hidden;
}

export function aoMudarAba(fn) {
  ouvintes.add(fn);
  return () => ouvintes.delete(fn);
}

export function iniciarMovimento() {
  const aplicar = () => {
    document.documentElement.classList.toggle('aba-oculta', document.hidden);
    ouvintes.forEach((fn) => fn(!document.hidden));
  };
  document.addEventListener('visibilitychange', aplicar);
  aplicar();
}
