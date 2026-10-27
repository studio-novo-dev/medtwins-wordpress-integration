// Bloco "Um simulado para cada área" (só na página das 6 áreas)
// As cinco provas de área são feitas uma depois da outra (os quadrados se preenchem, o atual
// com contorno, a conta e a barra andando, o check quando fecha) e cada uma manda 20
// quadrados para o Simulado Geral, que se monta embaixo, faixa por faixa; no fim, o rabisco
// verde sob "Simulado Geral". Desenho de produto, aria-hidden. O HTML já vem no estado final.
// - Desktop (≥1100px, sem movimento reduzido): cena fixa curta, presa à rolagem (scrub);
//   os quadrados do Geral saem das provas de área e voam até a sua faixa.
// - Abaixo de 1100px: sem pin; cada prova se preenche quando aparece, e o Geral faixa por faixa.
// - Movimento reduzido ou sem ScrollTrigger: fica como veio, cheio.
import { REDUZIDO } from '../globais/movimento.js?v=1.3.0';
import { usarScrollTrigger } from '../globais/rolagem.js?v=1.3.0';
import { PROVAS_BLOCO } from '../dados/simulacao.js?v=1.3.0';

const FIXO = '(min-width: 1100px) and (prefers-reduced-motion: no-preference)';
const ROLAGEM = 2.2;       // alturas de tela da cena fixa
const ATRASO_CELULA = 14;  // ms entre um quadrado e o próximo quando a prova enche sozinha
const ATRASO_FAIXA = 260;  // ms entre uma faixa do Geral e a próxima, no celular
// Linha do tempo da cena fixa (em unidades da timeline)
const T = { areas: 5, voo: 5.3, faixa: 0.42, quadrado: 0.035, duracaoVoo: 1.1, rabisco: 0.9, folga: 0.5 };

export function iniciarProvas() {
  const bloco = document.querySelector('[data-provas]');
  if (!bloco) return;
  const palco = bloco.querySelector('.provas-bloco__palco');

  const provas = [...bloco.querySelectorAll('[data-prova]')].map((el) => ({
    el,
    id: el.dataset.prova,
    cels: [...el.querySelectorAll('.prova-mini__grade > i, .prova-geral__banda > i')],
    conta: el.querySelector('[data-conta]'),
    barra: el.querySelector('.prova-mini__barra i'),
    feitas: -1,
  }));
  const areas = provas.filter((p) => p.id !== 'geral');
  const geral = provas.find((p) => p.id === 'geral');
  const rabisco = geral.el.querySelector('.provas__rabisco');
  const tracos = [...rabisco.querySelectorAll('path')];

  areas.forEach((p) => (PROVAS_BLOCO.revisar[p.id] || []).forEach((n) => p.cels[n - 1]?.classList.add('revisar')));

  // Quais quadrados de cada área vão para o Geral: 20 dos 50, espalhados pela grade e em
  // ordem, para que os de cima caiam nas linhas de cima da faixa
  const porArea = PROVAS_BLOCO.porAreaNoGeral;
  const origens = areas.map((p, k) => p.cels
    .map((_, j) => j)
    .filter((j) => (j * 13 + k * 7) % p.cels.length < porArea)
    .sort((a, b) => a - b));

  // Estado de uma prova: n quadrados feitos (o próximo com contorno), conta, barra e check
  const marcar = (p, n, { celulas = true, atual = true } = {}) => {
    if (n === p.feitas) return;
    const total = p.cels.length;
    if (celulas) p.cels.forEach((c, i) => {
      c.classList.toggle('feita', i < n);
      c.classList.toggle('atual', atual && i === n && n > 0 && n < total);
    });
    p.conta.textContent = n;
    p.barra.style.setProperty('--feito', (n / total).toFixed(3));
    p.el.classList.toggle('cheia', n === total);
    p.el.classList.toggle('agora', atual && n > 0 && n < total);
    p.feitas = n;
  };
  const esvaziar = () => provas.forEach((p) => { p.feitas = -1; p.cels.forEach((c) => { c.style.transitionDelay = ''; }); marcar(p, 0); });
  const encherTudo = () => {
    provas.forEach((p) => { p.feitas = -1; p.cels.forEach((c) => { c.style.transitionDelay = ''; }); marcar(p, p.cels.length); });
    rabisco.classList.add('riscado');
  };

  if (REDUZIDO.matches) return;
  bloco.dataset.vivo = '';
  esvaziar();

  // Abaixo de 1100px: cada prova enche quando aparece; o Geral, faixa por faixa
  const contar = (p, ms) => {
    const inicio = performance.now();
    const passo = (agora) => {
      const t = Math.min(1, (agora - inicio) / ms);
      p.conta.textContent = Math.round(t * p.cels.length);
      if (t < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  };
  const encherSozinha = (p) => {
    const geralSim = p === geral;
    const atraso = (i) => (geralSim ? Math.floor(i / porArea) * ATRASO_FAIXA + (i % porArea) * ATRASO_CELULA : i * ATRASO_CELULA);
    const ms = atraso(p.cels.length - 1);
    p.cels.forEach((c, i) => { c.style.transitionDelay = `${atraso(i)}ms`; c.classList.add('feita'); });
    p.barra.style.setProperty('--feito', 1);
    contar(p, ms);
    setTimeout(() => {
      p.el.classList.add('cheia');
      if (geralSim) rabisco.classList.add('riscado');
    }, ms + 200);
  };
  const aoAparecer = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (!e.isIntersecting) return;
      aoAparecer.unobserve(e.target);
      encherSozinha(provas.find((p) => p.el === e.target));
    });
  }, { rootMargin: '0px 0px -20% 0px' });

  usarScrollTrigger().then(({ gsap, ScrollTrigger }) => {
    const mm = gsap.matchMedia();

    mm.add(FIXO, () => {
      bloco.dataset.fixo = '';
      esvaziar();
      rabisco.classList.remove('riscado');

      // Cada quadrado do Geral sai do quadrado de origem na prova de área (posição e
      // tamanho medidos de novo a cada refresh)
      const voos = geral.cels.map((cel, i) => {
        const k = Math.floor(i / porArea);
        return { cel, b: cel.firstElementChild, origem: areas[k].cels[origens[k][i % porArea]], k };
      });
      const delta = (v) => {
        const de = v.origem.getBoundingClientRect();
        const para = v.cel.getBoundingClientRect();
        return {
          x: de.left + de.width / 2 - (para.left + para.width / 2),
          y: de.top + de.height / 2 - (para.top + para.height / 2),
          s: de.width / para.width,
        };
      };
      const medidas = new Map();
      const medir = () => voos.forEach((v) => medidas.set(v, delta(v)));
      medir();

      const estado = { a: 0, g: 0 };
      const desenhar = () => {
        let resto = Math.round(estado.a);
        areas.forEach((p) => { const n = Math.min(p.cels.length, resto); marcar(p, n); resto -= n; });
        marcar(geral, Math.round(estado.g), { celulas: false, atual: false });
      };

      const tl = gsap.timeline({ defaults: { ease: 'none' } });
      tl.fromTo(estado, { a: 0 }, { a: areas.length * 50, duration: T.areas, onUpdate: desenhar });
      voos.forEach((v, i) => {
        const em = T.voo + v.k * T.faixa + (i % porArea) * T.quadrado;
        tl.fromTo(v.b,
          { x: () => medidas.get(v).x, y: () => medidas.get(v).y, scale: () => medidas.get(v).s },
          { x: 0, y: 0, scale: 1, duration: T.duracaoVoo, ease: 'power2.inOut', immediateRender: true }, em);
        tl.fromTo(v.b, { opacity: 0 }, { opacity: 1, duration: 0.12, immediateRender: true }, em);
      });
      const fimVoo = T.voo + (areas.length - 1) * T.faixa + (porArea - 1) * T.quadrado + T.duracaoVoo;
      tl.fromTo(estado, { g: 0 }, { g: 100, duration: fimVoo - T.voo - T.duracaoVoo * 0.6, onUpdate: desenhar }, T.voo + T.duracaoVoo * 0.6);
      tl.fromTo(tracos, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: T.rabisco, stagger: 0.25, ease: 'power1.inOut', immediateRender: true }, fimVoo + 0.1);
      tl.to({}, { duration: T.folga });

      const gatilho = ScrollTrigger.create({
        trigger: palco,
        start: 'top top',
        end: () => `+=${innerHeight * ROLAGEM}`,
        pin: true,
        scrub: 0.6,
        animation: tl,
        refreshPriority: 1,
        onRefresh: () => { medir(); tl.invalidate(); },
      });
      ScrollTrigger.sort();
      desenhar();

      return () => {
        gatilho.kill();
        tl.kill();
        gsap.set(voos.map((v) => v.b), { clearProps: 'all' });
        gsap.set(tracos, { clearProps: 'strokeDashoffset' });
        delete bloco.dataset.fixo;
        esvaziar();
      };
    });

    mm.add('(max-width: 1099px) and (prefers-reduced-motion: no-preference)', () => {
      esvaziar();
      rabisco.classList.remove('riscado');
      provas.forEach((p) => aoAparecer.observe(p.el));
      return () => aoAparecer.disconnect();
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      delete bloco.dataset.vivo;
      encherTudo();
      return () => { bloco.dataset.vivo = ''; };
    });
  }).catch(() => { delete bloco.dataset.vivo; encherTudo(); });
}
