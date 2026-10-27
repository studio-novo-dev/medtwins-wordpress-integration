// Rolagem suave (Lenis) só para quem não pediu movimento reduzido.
// Lenis não suaviza toque por padrão, então o celular fica com a rolagem nativa.
// A ponte com o ScrollTrigger fica pronta para as seções fixadas (05 e 07):
// a seção chama usarScrollTrigger() e recebe { gsap, ScrollTrigger } já ligados ao Lenis.
import Lenis from '../vendor/lenis-1.3.26/lenis.js?v=1.2.2';

const REDUZIDO = matchMedia('(prefers-reduced-motion: reduce)');

let lenis = null;
let quadro = 0;
let ponteGsap = null;

function laco(tempo) {
  lenis?.raf(tempo);
  quadro = requestAnimationFrame(laco);
}

function ligar() {
  if (lenis || REDUZIDO.matches) return;
  lenis = new Lenis({ autoRaf: false, lerp: 0.12, wheelMultiplier: 1 });
  if (ponteGsap) conectarGsap(ponteGsap);
  else quadro = requestAnimationFrame(laco);
}

function desligar() {
  if (!lenis) return;
  cancelAnimationFrame(quadro);
  ponteGsap?.gsap.ticker.remove(tickGsap);
  lenis.destroy();
  lenis = null;
}

function tickGsap(tempo) {
  lenis?.raf(tempo * 1000);
}

function conectarGsap(ponte) {
  if (!lenis) return;
  cancelAnimationFrame(quadro);
  lenis.on('scroll', ponte.ScrollTrigger.update);
  ponte.gsap.ticker.add(tickGsap);
  ponte.gsap.ticker.lagSmoothing(0);
}

export function iniciarRolagem() {
  ligar();
  REDUZIDO.addEventListener('change', () => (REDUZIDO.matches ? desligar() : ligar()));
}

// Os arquivos oficiais do pacote (gsap.min.js e ScrollTrigger.min.js) são UMD:
// entram como <script> só quando uma seção pede, nesta ordem, e expõem window.gsap.
const GSAP = new URL('../vendor/gsap-3.15.0/', import.meta.url);

function carregarScript(arquivo) {
  return new Promise((pronto, falhou) => {
    const script = document.createElement('script');
    script.src = new URL(arquivo, GSAP).href;
    script.onload = pronto;
    script.onerror = () => falhou(new Error(`Não carregou ${arquivo}`));
    document.head.append(script);
  });
}

let carregando = null;

export async function usarScrollTrigger() {
  if (ponteGsap) return ponteGsap;
  carregando ??= carregarScript('gsap.min.js').then(() => carregarScript('ScrollTrigger.min.js'));
  await carregando;
  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);
  ponteGsap = { gsap, ScrollTrigger };
  conectarGsap(ponteGsap);
  return ponteGsap;
}

// Posição do alvo no documento pelo layout (offsetTop), sem as transformações de
// uma animação de entrada em andamento, menos o scroll-margin-top dele
function destino(alvo) {
  let topo = 0;
  for (let el = alvo; el; el = el.offsetParent) topo += el.offsetTop;
  return topo - (parseFloat(getComputedStyle(alvo).scrollMarginTop) || 0);
}

export function rolarPara(alvo, { aoTerminar } = {}) {
  if (lenis) {
    lenis.scrollTo(destino(alvo), { duration: 1.1, onComplete: aoTerminar });
    return;
  }
  scrollTo({ top: destino(alvo), behavior: REDUZIDO.matches ? 'auto' : 'smooth' });
  aoTerminar?.();
}

export function travarRolagem(travar) {
  document.documentElement.classList.toggle('rolagem-travada', travar);
  if (travar) lenis?.stop();
  else lenis?.start();
}

// Âncoras internas passam pela mesma rolagem e levam o foco junto, para quem
// navega por teclado ou leitor de tela continuar a partir da seção certa (ou do
// elemento marcado com data-foco-ancora dentro do alvo).
// Cada chegada dispara o evento "ancora" ({ detail: { alvo } }) para as seções
// reagirem (ex.: #start abre a capa do START na seção 02).
// CTAs ainda sem destino (href="#" com data-pendente) não fazem a página pular.
export function iniciarAncoras() {
  document.addEventListener('click', (evento) => {
    const link = evento.target.closest('a[href^="#"]');
    if (!link || evento.defaultPrevented) return;
    const hash = link.getAttribute('href');
    if (hash === '#') {
      if (link.hasAttribute('data-pendente')) evento.preventDefault();
      return;
    }
    const alvo = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!alvo) return;
    evento.preventDefault();
    history.pushState(null, '', hash);
    dispatchEvent(new CustomEvent('ancora', { detail: { alvo } }));
    const focar = alvo.querySelector('[data-foco-ancora]') || alvo.closest('section') || alvo;
    rolarPara(alvo, {
      aoTerminar: () => {
        if (!focar.hasAttribute('tabindex')) focar.setAttribute('tabindex', '-1');
        focar.focus({ preventScroll: true });
      },
    });
  });
}
