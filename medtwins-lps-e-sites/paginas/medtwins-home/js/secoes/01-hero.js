import { tocarVideo, pausarVideo } from '../globais/videos.js?v=1.2.2';
// 01 · Hero
// - Entrada: o texto sobe pelo [data-surge]; o acervo aparece logo depois (CSS, .hero--entrou).
// - Acervo: cada coluna é duplicada para o laço ficar contínuo e desliza sem parar
//   (CSS, .acervo--vivo). Fora da tela, para.
// - Trechos das aulas e do prático: sem áudio, em laço; cada um só toca enquanto
//   está na área visível (são muitos e cada coluna é duplicada).
// Com movimento reduzido nada disso roda: a parede fica parada, já no lugar, e
// os trechos mostram só o quadro de capa.

const REDUZIDO = matchMedia('(prefers-reduced-motion: reduce)');

export function iniciarHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Entrada depois do primeiro quadro, com as fontes prontas (sem salto no título)
  const entrar = () => requestAnimationFrame(() => hero.classList.add('hero--entrou'));
  if (REDUZIDO.matches) hero.classList.add('hero--entrou');
  else Promise.race([document.fonts.ready, new Promise((ok) => setTimeout(ok, 600))]).then(entrar);

  const acervo = hero.querySelector('[data-acervo]');
  if (!acervo || REDUZIDO.matches) return;
  iniciarAcervo(acervo);
}

function iniciarAcervo(acervo) {
  // Duplica as peças de cada coluna: o trilho anda metade da própria altura e recomeça
  acervo.querySelectorAll('.acervo__trilho').forEach((trilho) => {
    [...trilho.children].forEach((peca) => trilho.append(peca.cloneNode(true)));
  });
  acervo.classList.add('acervo--vivo');

  const videos = [...acervo.querySelectorAll('[data-acervo-video]')];
  videos.forEach((video) => {
    video.muted = true;
  });

  // Só anda enquanto aparece na tela
  new IntersectionObserver(([entrada]) => {
    acervo.classList.toggle('acervo--pausado', !entrada.isIntersecting);
  }).observe(acervo);

  // Cada trecho toca só enquanto cruza a área visível do acervo
  const tocar = new IntersectionObserver((entradas) => {
    entradas.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) tocarVideo(target);
      else pausarVideo(target);
    });
  }, { root: acervo.closest('.hero__acervo') });
  videos.forEach((video) => tocar.observe(video));
}
