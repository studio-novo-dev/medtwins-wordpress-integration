import { tocarVideo, pausarVideo } from '../globais/videos.js?v=1.2.2';
// 07 · Preparação para a segunda etapa
// A estação: no desktop (≥1100px, altura ≥640px, sem movimento reduzido) o painel fica
// fixo e a rolagem corre o relógio de 10:00 a 00:00. Conforme o tempo passa, as frases
// acendem (a atual em destaque), a barra se esvazia, a ficha do avaliador marca o que foi
// feito e risca o que ficou para trás, e nos dois minutos finais tudo fica em alerta e o
// vídeo troca para a cena de pressão. No mobile a mesma cena anda pela posição na tela.
// Sem JS ou com movimento reduzido: tudo aceso, relógio em 10:00, vídeos na capa.
// Depois da estação, os cards de prática: os trechos tocam só enquanto aparecem e o
// cronômetro do card "Administração do tempo" corre de 10:00 em velocidade acelerada.
import { usarScrollTrigger } from '../globais/rolagem.js?v=1.2.2';

const REDUZIDO = matchMedia('(prefers-reduced-motion: reduce)');
const FIXAR = '(min-width: 1100px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)';
const SOLTO = '(max-width: 1099px), (max-height: 639px)';
const TOTAL = 600;      // segundos
const ALERTA = 120;     // últimos dois minutos
const APERTA = 4;       // a partir desta frase ("Mas o tempo está passando") o vídeo troca

export function iniciarSegundaEtapa() {
  iniciarPraticas();
  const estacao = document.querySelector('[data-estacao]');
  if (!estacao || REDUZIDO.matches) return;
  const relogio = estacao.querySelector('[data-relogio]');
  const frases = [...estacao.querySelectorAll('.estacao__frase')];
  const itens = [...estacao.querySelectorAll('.ficha__item')];
  const videos = [...estacao.querySelectorAll('[data-estacao-video]')];

  const pintar = (p) => {
    const resta = Math.round(TOTAL * (1 - p));
    relogio.textContent = `${String(Math.floor(resta / 60)).padStart(2, '0')}:${String(resta % 60).padStart(2, '0')}`;
    estacao.style.setProperty('--resta', (1 - p).toFixed(4));
    const atual = Math.min(frases.length - 1, Math.floor(p * (frases.length - 1) + 0.0001));
    frases.forEach((f, i) => {
      f.classList.toggle('acesa', i < atual);
      f.classList.toggle('atual', i === atual);
    });
    itens.forEach((item) => {
      const chegou = atual >= Number(item.dataset.quando);
      item.classList.toggle('feito', chegou && item.dataset.ficha === 'ok');
      item.classList.toggle('falhou', chegou && item.dataset.ficha === 'falha');
    });
    estacao.classList.toggle('estacao--alerta', resta <= ALERTA);
    estacao.classList.toggle('estacao--apertou', atual >= APERTA);
  };

  // Os trechos só tocam enquanto o painel aparece
  videos.forEach((v) => { v.muted = true; v.preload = 'auto'; });
  new IntersectionObserver(([e]) => {
    videos.forEach((v) => (e.isIntersecting ? tocarVideo(v) : pausarVideo(v)));
  }).observe(estacao);

  usarScrollTrigger().then(({ gsap, ScrollTrigger }) => {
    estacao.classList.add('estacao--cena');
    pintar(0);
    const mm = gsap.matchMedia();

    mm.add(FIXAR, () => {
      estacao.classList.add('estacao--fixada');
      ScrollTrigger.refresh();
      const st = ScrollTrigger.create({
        trigger: estacao,
        start: 'center center',
        end: () => `+=${innerHeight * 2.4}`,
        pin: true,
        scrub: true,
        onUpdate: (s) => pintar(s.progress),
      });
      return () => {
        st.kill();
        estacao.classList.remove('estacao--fixada');
      };
    });

    mm.add(SOLTO, () => {
      const st = ScrollTrigger.create({
        trigger: estacao,
        start: 'top 70%',
        end: 'bottom 40%',
        onUpdate: (s) => pintar(s.progress),
      });
      return () => st.kill();
    });
  }).catch(() => {});
}

function iniciarPraticas() {
  const praticas = document.querySelector('[data-praticas]');
  if (!praticas || REDUZIDO.matches) return;

  const tocar = new IntersectionObserver((entradas) => {
    entradas.forEach(({ target, isIntersecting }) => (isIntersecting ? tocarVideo(target) : pausarVideo(target)));
  });
  praticas.querySelectorAll('[data-pratica-video]').forEach((v) => {
    v.muted = true;
    tocar.observe(v);
  });

  // Cronômetro do card: 10 minutos em 40 segundos, em laço, só enquanto aparece
  const crono = praticas.querySelector('[data-pratica-crono]');
  const tempo = praticas.querySelector('[data-pratica-tempo]');
  if (!crono) return;
  let resta = TOTAL;
  let laco = 0;
  const pintar = () => {
    tempo.textContent = `${String(Math.floor(resta / 60)).padStart(2, '0')}:${String(resta % 60).padStart(2, '0')}`;
    crono.style.setProperty('--crono-gasto', (1 - resta / TOTAL).toFixed(4));
    crono.classList.toggle('pratica__crono--alerta', resta <= ALERTA);
  };
  pintar();
  new IntersectionObserver(([e]) => {
    clearInterval(laco);
    if (!e.isIntersecting) return;
    laco = setInterval(() => {
      resta = resta <= 0 ? TOTAL : resta - 1;
      pintar();
    }, 1000 / 15);
  }).observe(crono);
}
