// 05 · Metodologia
// No desktop (≥1100px, altura ≥640px, sem movimento reduzido) o palco fica fixo e as
// folhas das frentes são arrancadas do bloco uma a uma conforme a rolagem; o índice
// à esquerda acompanha. As folhas de trás ficam mais escuras a cada degrau e clareiam
// quando avançam. Fora disso, as folhas ficam em sequência (CSS).
import { usarScrollTrigger } from '../globais/rolagem.js?v=1.2.2';

const CONDICAO = '(min-width: 1100px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)';

export function iniciarMetodologia() {
  const secao = document.querySelector('.metodologia');
  const palco = secao?.querySelector('[data-metodologia]');
  if (!palco) return;
  const folhas = [...palco.querySelectorAll('.frente')];
  const veus = folhas.map((folha) => folha.querySelector('.frente__veu'));
  const ESCURO = 0.2;   // opacidade do véu por degrau do bloco (igual ao CSS)
  const indice = [...palco.querySelectorAll('.metodologia__indice li')];

  usarScrollTrigger().then(({ gsap, ScrollTrigger }) => {
    const mm = gsap.matchMedia();
    mm.add(CONDICAO, () => {
      secao.classList.add('metodologia--fixada');
      ScrollTrigger.refresh();

      const marcar = (n) => indice.forEach((li, i) => li.classList.toggle('ativo', i === n));
      const linha = gsap.timeline({ defaults: { ease: 'power2.inOut' } });

      // Cada folha (menos a última) sai para cima e para a esquerda; as de trás avançam um degrau
      folhas.slice(0, -1).forEach((folha, i) => {
        const rotulo = `f${i}`;
        linha.addLabel(rotulo);
        linha.to(folha, { yPercent: -125, xPercent: -14, rotation: -10, opacity: 0, duration: 1 }, rotulo);
        linha.to(folhas.slice(i + 1), { x: `-=${10}`, y: `-=${12}`, rotation: '-=1.6', duration: 1 }, rotulo);
        linha.to(veus.slice(i + 1), { opacity: (n) => n * ESCURO, duration: 1 }, rotulo);
        linha.to({}, { duration: 0.35 });
      });

      const gatilho = ScrollTrigger.create({
        trigger: palco,
        start: 'center center',
        end: () => `+=${innerHeight * 0.85 * (folhas.length - 1)}`,
        pin: true,
        scrub: 0.5,
        animation: linha,
        invalidateOnRefresh: true,
        onUpdate: (st) => {
          const passo = Math.min(folhas.length - 1, Math.floor(st.progress * (folhas.length - 1) + 0.45));
          marcar(passo);
        },
      });

      return () => {
        gatilho.kill();
        linha.kill();
        gsap.set(folhas, { clearProps: 'transform,opacity' });
        gsap.set(veus, { clearProps: 'opacity' });
        marcar(0);
        secao.classList.remove('metodologia--fixada');
      };
    });
  }).catch(() => {});
}
