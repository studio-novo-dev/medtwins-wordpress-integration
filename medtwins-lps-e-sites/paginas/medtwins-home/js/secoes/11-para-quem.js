import { tocarVideo, pausarVideo } from '../globais/videos.js?v=1.2.2';
// 11 · Para quem é: os cinco perfis viram um seletor (.perfis--js). Clicar numa aba mostra
// o palco daquele perfil e faz o CTA levar à preparação correspondente. Com movimento
// liberado, os perfis se alternam sozinhos a cada 6s (barra de progresso na aba) enquanto
// a seção aparece, pausam com o mouse em cima e param de vez quando a pessoa escolhe um.
// Sem JS: os cinco perfis empilhados, e o CTA leva à escolha da etapa (#jornadas).

const REDUZIDO = matchMedia('(prefers-reduced-motion: reduce)');
const TEMPO = 6000;

export function iniciarParaQuem() {
  const lista = document.querySelector('[data-perfis]');
  if (!lista) return;
  const perfis = [...lista.querySelectorAll('[data-perfil]')];
  const cta = document.querySelector('[data-perfis-cta]');
  const videos = perfis.map((p) => p.querySelector('[data-perfil-video]'));
  let atual = 0;
  let visivel = false;

  lista.classList.add('perfis--js');
  lista.style.setProperty('--perfil-tempo', `${TEMPO}ms`);

  const tocar = () => {
    videos.forEach((v, i) => {
      if (!v || REDUZIDO.matches) return;
      v.muted = true;
      if (i === atual && visivel) tocarVideo(v);
      else pausarVideo(v);
    });
  };

  const mostrar = (n) => {
    atual = n;
    perfis.forEach((p, i) => {
      p.classList.toggle('perfil--ativo', i === n);
      p.querySelector('.perfil__aba').setAttribute('aria-pressed', String(i === n));
    });
    if (cta) cta.setAttribute('href', perfis[n].dataset.destino);
    // reinicia a barra de progresso
    lista.classList.remove('perfis--rodando');
    void lista.offsetWidth;
    if (rodando) lista.classList.add('perfis--rodando');
    tocar();
  };

  // ---------- Troca automática ----------
  let rodando = !REDUZIDO.matches;
  let relogio = 0;
  let restante = TEMPO;
  let inicio = 0;
  let pausado = false;

  const agendar = () => {
    clearTimeout(relogio);
    if (!rodando || pausado || !visivel) return;
    inicio = performance.now();
    relogio = setTimeout(() => {
      restante = TEMPO;
      mostrar((atual + 1) % perfis.length);
      agendar();
    }, restante);
  };
  const pausar = (sim) => {
    if (!rodando) return;
    if (sim && !pausado) restante -= performance.now() - inicio;
    pausado = sim;
    lista.classList.toggle('perfis--pausado', sim || !visivel);
    agendar();
  };

  perfis.forEach((p, i) => {
    p.querySelector('.perfil__aba').addEventListener('click', () => {
      rodando = false;
      clearTimeout(relogio);
      lista.classList.remove('perfis--rodando', 'perfis--pausado');
      mostrar(i);
    });
  });

  lista.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') pausar(true); });
  lista.addEventListener('pointerleave', () => pausar(false));

  new IntersectionObserver(([e]) => {
    visivel = e.isIntersecting;
    if (rodando) {
      if (!visivel) restante -= performance.now() - inicio;
      lista.classList.toggle('perfis--pausado', !visivel || pausado);
      agendar();
    }
    tocar();
  }, { threshold: 0.3 }).observe(lista);

  mostrar(0);
}
