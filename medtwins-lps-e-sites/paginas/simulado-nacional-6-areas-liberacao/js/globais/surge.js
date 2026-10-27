// Entradas ao rolar (porte da Home), todas disparadas uma vez quando o elemento entra na tela:
// - [data-surge]: sobe e aparece (CSS em componentes.css).
// - .rabisco[data-desenhar]: o traço verde se desenha.
// - .lista-check[data-checar]: os checks marcam item a item.
// Sem IntersectionObserver ou com movimento reduzido, tudo fica no estado final.

const REDUZIDO = matchMedia('(prefers-reduced-motion: reduce)');

function finalizar(el) {
  if (el.matches('[data-surge]')) el.classList.add('surgiu');
  if (el.matches('[data-desenhar]')) el.classList.add('desenhado');
  if (el.matches('[data-checar]')) {
    [...el.children].forEach((item, i) => {
      item.style.setProperty('--atraso', `${300 + i * 150}ms`);
      item.classList.add('checado');
    });
  }
}

export function iniciarSurge(raiz = document) {
  const alvos = [...raiz.querySelectorAll('[data-surge], [data-desenhar], [data-checar]')];
  if (!alvos.length) return;

  if (REDUZIDO.matches || !('IntersectionObserver' in window)) {
    alvos.forEach(finalizar);
    return;
  }

  const observador = new IntersectionObserver(
    (entradas) => entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      observador.unobserve(entrada.target);
      finalizar(entrada.target);
    }),
    { rootMargin: '0px 0px -12% 0px', threshold: 0.01 },
  );

  // Elementos dentro de algo que surge esperam o pai terminar de subir
  alvos.forEach((el) => {
    if (el.matches('[data-desenhar], [data-checar]') && !el.style.getPropertyValue('--atraso')) {
      el.style.setProperty('--atraso', '350ms');
    }
    observador.observe(el);
  });

  REDUZIDO.addEventListener('change', () => REDUZIDO.matches && alvos.forEach(finalizar));
}

export { finalizar as finalizarSurge };
