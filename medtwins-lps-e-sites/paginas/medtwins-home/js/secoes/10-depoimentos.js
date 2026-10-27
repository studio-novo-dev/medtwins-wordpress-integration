import { tocarVideo, pausarVideo } from '../globais/videos.js?v=1.2.2';
// 10 · Depoimentos
// - Números: quando aparecem, as visualizações se preenchem e cada valor conta até o
//   total (o texto final já está no HTML e num span oculto para leitores de tela).
// - Os trechos das histórias tocam só enquanto aparecem.
// - Depoimentos reais: prévia muda no card; o clique troca pelo vídeo completo com som.
// - A faixa de vídeos rola na horizontal (toque e trackpad nativos) e, com mouse, arrasta
//   segurando o botão, com inércia curta ao soltar.
// Com movimento reduzido: números e visualizações já no estado final, vídeos na capa.

const REDUZIDO = matchMedia('(prefers-reduced-motion: reduce)');
const formato = new Intl.NumberFormat('pt-BR');

function iniciarNumeros() {
  const numeros = document.querySelector('[data-numeros]');
  if (!numeros) return;
  if (REDUZIDO.matches || !('IntersectionObserver' in window)) {
    numeros.classList.add('contou');
    return;
  }
  const valores = [...numeros.querySelectorAll('[data-contar]')];
  const escrever = (el, v) => {
    const alvo = Number(el.dataset.contar);
    const casas = String(alvo).includes('.') ? 2 : 0;
    const texto = casas ? v.toFixed(2).replace('.', ',') : formato.format(Math.round(v));
    el.innerHTML = `${el.dataset.prefixo}${texto}${el.dataset.sufixo ? `<span class="pct">${el.dataset.sufixo}</span>` : ''}`;
  };
  valores.forEach((el) => escrever(el, 0));

  const obs = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    obs.disconnect();
    numeros.classList.add('contou');
    const t0 = performance.now();
    const DUR = 1600;
    const quadro = (t) => {
      const p = Math.min(1, (t - t0) / DUR);
      const suave = 1 - Math.pow(1 - p, 3);
      valores.forEach((el) => escrever(el, Number(el.dataset.contar) * suave));
      if (p < 1) requestAnimationFrame(quadro);
    };
    requestAnimationFrame(quadro);
  }, { rootMargin: '0px 0px -15% 0px' });
  obs.observe(numeros);
}

function iniciarVideos() {
  if (REDUZIDO.matches) return;
  const tocar = new IntersectionObserver((entradas) => {
    entradas.forEach(({ target, isIntersecting }) => (isIntersecting ? tocarVideo(target) : pausarVideo(target)));
  });
  document.querySelectorAll('[data-depo-video]').forEach((v) => { v.muted = true; tocar.observe(v); });
}

export function iniciarDepoimentos() {
  iniciarNumeros();
  iniciarVideos();
  const faixa = document.querySelector('[data-faixa]');
  if (!faixa) return;
  let inicioX = 0;
  let inicioScroll = 0;
  let arrastando = false;
  let moveu = false;
  let velocidade = 0;
  let ultimoX = 0;
  let ultimoT = 0;

  faixa.addEventListener('pointerdown', (evento) => {
    if (evento.pointerType !== 'mouse' || evento.button !== 0) return;
    arrastando = true;
    moveu = false;
    inicioX = ultimoX = evento.clientX;
    ultimoT = performance.now();
    inicioScroll = faixa.scrollLeft;
    velocidade = 0;
  });

  addEventListener('pointermove', (evento) => {
    if (!arrastando) return;
    const dx = evento.clientX - inicioX;
    if (!moveu && Math.abs(dx) > 4) {
      moveu = true;
      faixa.classList.add('faixa--arrastando');
    }
    if (!moveu) return;
    faixa.scrollLeft = inicioScroll - dx;
    const agora = performance.now();
    velocidade = (evento.clientX - ultimoX) / Math.max(agora - ultimoT, 1);
    ultimoX = evento.clientX;
    ultimoT = agora;
  });

  addEventListener('pointerup', () => {
    if (!arrastando) return;
    arrastando = false;
    faixa.classList.remove('faixa--arrastando');
    if (!moveu || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let v = velocidade * 16;
    const inercia = () => {
      if (Math.abs(v) < 0.5) return;
      faixa.scrollLeft -= v;
      v *= 0.92;
      requestAnimationFrame(inercia);
    };
    requestAnimationFrame(inercia);
  });

  // Um arrasto não vira clique num card
  faixa.addEventListener('click', (evento) => {
    if (!moveu) return;
    evento.preventDefault();
    evento.stopPropagation();
  }, true);

  iniciarDepoimentosVideo(faixa);
}

// Cada card mostra uma prévia muda; ao clicar, o vídeo completo toca no lugar dela, com som e
// controles. Só um toca por vez.
function iniciarDepoimentosVideo(faixa) {
  faixa.querySelectorAll('[data-depoimento]').forEach((botao) => {
    botao.addEventListener('click', () => {
      faixa.querySelectorAll('.video__completo').forEach((v) => v.pause());
      const card = botao.closest('.video');
      const completo = document.createElement('video');
      completo.className = 'video__completo';
      completo.poster = botao.querySelector('video').poster;
      completo.controls = true;
      completo.playsInline = true;
      completo.setAttribute('playsinline', '');
      completo.setAttribute('webkit-playsinline', '');
      completo.preload = 'metadata';
      completo.setAttribute('aria-label', botao.getAttribute('aria-label').replace('Assistir ao', ''));
      const ajuda = document.createElement('div');
      ajuda.className = 'video__ajuda';
      ajuda.hidden = true;
      const tentar = document.createElement('button');
      tentar.type = 'button';
      tentar.className = 'video__tentar';
      tentar.textContent = 'Tocar para assistir';
      const abrir = document.createElement('a');
      abrir.href = botao.dataset.depoimento;
      abrir.target = '_blank';
      abrir.rel = 'noopener noreferrer';
      abrir.textContent = 'Abrir vídeo';
      ajuda.append(tentar, abrir);
      const reproduzir = () => {
        ajuda.hidden = true;
        if (completo.error) completo.load();
        // Mantém play no mesmo evento do toque, inclusive no iPhone.
        const promessa = completo.play();
        promessa?.catch(() => { ajuda.hidden = false; });
      };
      tentar.addEventListener('click', reproduzir);
      completo.addEventListener('error', () => { ajuda.hidden = false; });
      completo.addEventListener('playing', () => { ajuda.hidden = true; });
      completo.addEventListener('play', () => {
        faixa.querySelectorAll('.video__completo').forEach((v) => { if (v !== completo) v.pause(); });
      });
      card.replaceChildren(completo, ajuda);
      completo.src = botao.dataset.depoimento;
      completo.load();
      reproduzir();
      completo.focus({ preventScroll: true });
    });
  });
}
