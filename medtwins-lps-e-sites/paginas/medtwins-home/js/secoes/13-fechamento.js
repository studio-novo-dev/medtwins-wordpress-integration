import { tocarVideo, pausarVideo } from '../globais/videos.js?v=1.2.2';
// 13 · Fechamento: o vídeo do auditório toca só enquanto aparece; as quatro frases do que
// está em jogo acendem (e ficam acesas) ao cruzar a parte de baixo da tela.
// Com movimento reduzido: vídeo na capa e frases já acesas (CSS).

const REDUZIDO = matchMedia('(prefers-reduced-motion: reduce)');

export function iniciarFechamento() {
  const secao = document.querySelector('#fechamento');
  if (!secao || REDUZIDO.matches || !('IntersectionObserver' in window)) return;

  const video = secao.querySelector('[data-fechamento-video]');
  if (video) {
    video.muted = true;
    new IntersectionObserver(([e]) => (e.isIntersecting ? tocarVideo(video) : pausarVideo(video))).observe(video);
  }

  const itens = [...secao.querySelectorAll('[data-fechamento-item]')];
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      target.classList.add('acesa');
      obs.unobserve(target);
    });
  }, { rootMargin: '0px 0px -38% 0px' });
  itens.forEach((item) => obs.observe(item));
}
