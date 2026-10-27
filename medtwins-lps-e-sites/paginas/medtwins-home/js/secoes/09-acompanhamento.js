import { tocarVideo, pausarVideo } from '../globais/videos.js?v=1.2.2';
// 09 · Acompanhamento: a conversa da comunidade acontece na tela.
// O HTML traz a conversa inteira. Com JS (e movimento liberado), ela recomeça com as duas
// primeiras mensagens (a janela nunca fica vazia) e, enquanto aparece, as seguintes chegam
// depois de um "digitando..."; no fim, pausa e recomeça. Fora da tela, para onde estava. Tudo é ilustrativo (aria-hidden no HTML).

import { usarScrollTrigger } from '../globais/rolagem.js?v=1.2.2';

const REDUZIDO = matchMedia('(prefers-reduced-motion: reduce)');
const LADO_A_LADO = '(min-width: 1100px) and (prefers-reduced-motion: no-preference)';
const esperar = (ms) => new Promise((ok) => setTimeout(ok, ms));

export function iniciarAcompanhamento() {
  iniciarAcordo();
  const conversa = document.querySelector('[data-conversa]');
  if (!conversa || REDUZIDO.matches) return;
  const msgs = [...conversa.querySelectorAll('.conversa__msg')];

  let visivel = false;
  let acordar = null;
  new IntersectionObserver(([e]) => {
    visivel = e.isIntersecting;
    if (visivel && acordar) { acordar(); acordar = null; }
  }, { threshold: 0.3 }).observe(conversa);
  const passo = async (ms) => {
    await esperar(ms);
    while (!visivel) await new Promise((ok) => { acordar = ok; });
  };

  const FIXAS = 2;
  const zerar = () => msgs.slice(FIXAS).forEach((m) => { m.classList.add('esperando'); m.classList.remove('chegou'); });
  zerar();

  (async () => {
    for (;;) {
      await passo(600);
      for (const m of msgs.slice(FIXAS)) {
        // a resposta da equipe e a dos colegas demoram um pouco mais que a sequência
        conversa.classList.add('conversa--digitando');
        await passo(m.textContent.length > 70 ? 1700 : 1100);
        conversa.classList.remove('conversa--digitando');
        m.classList.remove('esperando');
        m.classList.add('chegou');
        await passo(1300);
      }
      await passo(5200);
      zerar();
    }
  })();
}

// O acordo: Nós + Você = aprovação. Os trechos tocam só enquanto aparecem. No desktop,
// conforme a rolagem, "Nós" e "Você" chegam dos lados até se encontrar, os sinais giram e
// o resultado se abre por último (scrub, sem fixar). No mobile e com movimento reduzido,
// os cartões já estão no lugar.
function iniciarAcordo() {
  const conta = document.querySelector('[data-acordo]');
  if (!conta || REDUZIDO.matches) return;

  const tocar = new IntersectionObserver((entradas) => {
    entradas.forEach(({ target, isIntersecting }) => (isIntersecting ? tocarVideo(target) : pausarVideo(target)));
  });
  conta.querySelectorAll('[data-acordo-video]').forEach((v) => { v.muted = true; tocar.observe(v); });

  const nos = conta.querySelector('[data-acordo-parte="nos"]');
  const voce = conta.querySelector('[data-acordo-parte="voce"]');
  const juntos = conta.querySelector('[data-acordo-parte="juntos"]');
  const sinais = [...conta.querySelectorAll('[data-acordo-sinal]')];

  usarScrollTrigger().then(({ gsap }) => {
    gsap.matchMedia().add(LADO_A_LADO, () => {
      const linha = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: { trigger: conta, start: 'top 92%', end: 'center 55%', scrub: 0.6 },
      });
      linha
        .from(nos, { xPercent: -28, rotation: -5, opacity: 0.3, duration: 1 }, 0)
        .from(voce, { xPercent: 28, rotation: 5, opacity: 0.3, duration: 1 }, 0)
        .from(sinais[0], { scale: 0, rotation: -180, duration: 0.6 }, 0.45)
        .from(sinais[1], { scale: 0, rotation: 180, duration: 0.6 }, 0.75)
        .from(juntos, { clipPath: 'inset(0 0 0 100% round 24px)', duration: 0.8 }, 0.85);
      return () => linha.kill();
    });
  }).catch(() => {});
}
