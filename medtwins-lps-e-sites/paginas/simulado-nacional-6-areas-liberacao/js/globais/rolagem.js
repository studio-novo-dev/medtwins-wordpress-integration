// Rolagem suave (Lenis) e ponte com o ScrollTrigger (porte da Home).
// Lenis só liga sem movimento reduzido; não suaviza toque, então o celular fica com a
// rolagem nativa. O ScrollTrigger entra como <script> (os arquivos do pacote são UMD) e
// fica ligado ao Lenis: as cenas chamam usarScrollTrigger() e recebem { gsap, ScrollTrigger }.
import Lenis from '../vendor/lenis-1.3.26/lenis.js?v=1.3.0';
import { REDUZIDO } from './movimento.js?v=1.3.0';

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
  window.lenis = lenis; // tools/prints.mjs rola por aqui
  if (ponteGsap) conectarGsap(ponteGsap);
  else quadro = requestAnimationFrame(laco);
}

function desligar() {
  if (!lenis) return;
  cancelAnimationFrame(quadro);
  ponteGsap?.gsap.ticker.remove(tickGsap);
  lenis.destroy();
  lenis = null;
  window.lenis = undefined;
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

// Posição do alvo no documento pelo layout, sem transformações de entrada em andamento
function destino(alvo, folga) {
  let topo = 0;
  for (let el = alvo; el; el = el.offsetParent) topo += el.offsetTop;
  return Math.max(0, topo - folga);
}

export function rolarPara(alvo, { folga = 0, aoTerminar } = {}) {
  const y = destino(alvo, folga);
  if (lenis) {
    lenis.scrollTo(y, { duration: 1.2, onComplete: aoTerminar });
    return;
  }
  scrollTo({ top: y, behavior: REDUZIDO.matches ? 'auto' : 'smooth' });
  // Sem Lenis não há aviso de fim: espera a rolagem nativa parar
  let parado = 0;
  let ultimo = -1;
  const conferir = () => {
    if (Math.abs(scrollY - ultimo) < 1) parado += 1;
    else parado = 0;
    ultimo = scrollY;
    if (parado > 4) aoTerminar?.();
    else requestAnimationFrame(conferir);
  };
  requestAnimationFrame(conferir);
}

export function travarRolagem(travar) {
  document.documentElement.classList.toggle('rolagem-travada', travar);
  if (travar) lenis?.stop();
  else lenis?.start();
}
