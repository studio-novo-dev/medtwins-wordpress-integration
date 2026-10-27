// Rodapé: a faixa da assinatura é duplicada para o laço ficar contínuo (a cópia leva
// aria-hidden) e só anda enquanto aparece; as peças do símbolo da marca gigante se encaixam
// quando ela entra na tela. Com movimento reduzido: faixa parada e símbolo já montado.

const REDUZIDO = matchMedia('(prefers-reduced-motion: reduce)');

export function iniciarRodape() {
  const rodape = document.querySelector('[data-rodape]');
  if (!rodape || REDUZIDO.matches || !('IntersectionObserver' in window)) {
    rodape?.classList.add('rodape--montado');
    return;
  }

  const trilho = rodape.querySelector('[data-rodape-trilho]');
  const grupo = trilho.firstElementChild;
  const copia = grupo.cloneNode(true);
  copia.setAttribute('aria-hidden', 'true');
  trilho.append(copia);
  rodape.classList.add('rodape--vivo');
  new IntersectionObserver(([e]) => {
    rodape.classList.toggle('rodape--pausado', !e.isIntersecting);
  }).observe(trilho);

  const marca = rodape.querySelector('.rodape__marca');
  const obs = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    rodape.classList.add('rodape--montado');
    obs.disconnect();
  }, { rootMargin: '0px 0px -12% 0px' });
  obs.observe(marca);
}
