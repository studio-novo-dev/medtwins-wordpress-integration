// 02 · Em qual etapa você está
// - Um caderno aberto por vez (o 1º por padrão). Abre por clique, Enter/Espaço e, no
//   desktop com mouse, por hover com intenção (180ms com o ponteiro parado).
// - Setas movem o foco entre os três botões; o conteúdo dos três sempre existe no HTML.
// - No desktop a faixa tem a altura da maior folha, medida aqui, para nada pular.
// - Chegar por #start (menu, link ou URL) abre o START.

const REDUZIDO = matchMedia('(prefers-reduced-motion: reduce)');
const PONTEIRO = matchMedia('(hover: hover) and (pointer: fine)');
const DESKTOP = matchMedia('(min-width: 1100px)');
const INTENCAO = 180;
const TROCA_LARGURA = 560;

export function iniciarJornadas() {
  const faixa = document.querySelector('[data-capas]');
  if (!faixa) return;
  const capas = [...faixa.querySelectorAll('.capa')];
  const botoes = capas.map((capa) => capa.querySelector('.capa__botao'));
  let aberta = capas.find((capa) => capa.classList.contains('capa--aberta')) || capas[0];
  let revelar = 0;

  faixa.classList.add('capas--js');

  function abrir(capa, { imediato = false } = {}) {
    if (capa === aberta) return;
    clearTimeout(revelar);
    aberta.classList.remove('capa--aberta', 'capa--revelada');
    botoes[capas.indexOf(aberta)].setAttribute('aria-expanded', 'false');
    aberta = capa;
    capa.classList.add('capa--aberta');
    botoes[capas.indexOf(capa)].setAttribute('aria-expanded', 'true');
    const esperar = !imediato && DESKTOP.matches && !REDUZIDO.matches;
    if (esperar) revelar = setTimeout(() => capa.classList.add('capa--revelada'), TROCA_LARGURA);
    else capa.classList.add('capa--revelada');
  }

  botoes.forEach((botao, i) => {
    botao.addEventListener('click', () => {
      // No acordeão do celular, tocar no aberto não fecha (sempre um aberto)
      abrir(capas[i]);
    });
    botao.addEventListener('keydown', (evento) => {
      const destino = {
        ArrowRight: i + 1, ArrowDown: i + 1,
        ArrowLeft: i - 1, ArrowUp: i - 1,
        Home: 0, End: botoes.length - 1,
      }[evento.key];
      if (destino === undefined) return;
      evento.preventDefault();
      botoes[(destino + botoes.length) % botoes.length].focus();
    });
  });

  capas.forEach((capa) => {
    let espera = 0;
    const armar = (evento) => {
      if (evento.pointerType !== 'mouse' || !PONTEIRO.matches || !DESKTOP.matches) return;
      clearTimeout(espera);
      espera = setTimeout(() => abrir(capa), INTENCAO);
    };
    capa.addEventListener('pointerenter', armar);
    capa.addEventListener('pointermove', armar);
    capa.addEventListener('pointerleave', () => clearTimeout(espera));
  });

  // Altura da faixa no desktop: a da maior folha na largura de caderno aberto
  function medir() {
    if (!DESKTOP.matches) {
      faixa.style.removeProperty('--capas-altura');
      return;
    }
    const estilo = getComputedStyle(faixa);
    const largura = faixa.clientWidth;
    const gap = parseFloat(estilo.columnGap) || 0;
    const flexAberta = parseFloat(estilo.getPropertyValue('--aberta-flex')) || 3.4;
    const faixaCapa = parseFloat(estilo.getPropertyValue('--capa-faixa')) || 230;
    const larguraAberta = (largura - gap * (capas.length - 1)) * flexAberta / (flexAberta + capas.length - 1);
    const medida = document.createElement('div');
    medida.setAttribute('aria-hidden', 'true');
    medida.style.cssText = `position:absolute;visibility:hidden;left:-9999px;top:0;width:${larguraAberta - faixaCapa - 24}px`;
    capas.forEach((capa) => medida.append(capa.querySelector('.capa__painel').cloneNode(true)));
    faixa.append(medida);
    const maior = Math.max(...[...medida.children].map((painel) => painel.getBoundingClientRect().height));
    medida.remove();
    faixa.style.setProperty('--capas-altura', `${Math.ceil(Math.max(maior + 24, 520))}px`);
  }

  let esperaMedida = 0;
  medir();
  document.fonts.ready.then(medir);
  addEventListener('resize', () => {
    clearTimeout(esperaMedida);
    esperaMedida = setTimeout(medir, 120);
  });

  const abrirAlvo = (alvo, opcoes) => {
    const capa = alvo?.closest?.('.capa');
    if (capa && capas.includes(capa)) abrir(capa, opcoes);
  };
  if (location.hash.length > 1) abrirAlvo(document.getElementById(decodeURIComponent(location.hash.slice(1))), { imediato: true });
  addEventListener('hashchange', () => abrirAlvo(document.getElementById(decodeURIComponent(location.hash.slice(1)))));
  addEventListener('ancora', (evento) => abrirAlvo(evento.detail.alvo));
}
