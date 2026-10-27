// 00 · Navegação em três peças (logo, pílula com os itens, CTA)
// - Logo e CTA seguem o tom da seção por baixo; a pílula escurece por camadas (CSS).
// - As três peças somem ao rolar para baixo depois do hero e voltam ao rolar para cima.
// - A linha dentro da pílula mostra o progresso na seção atual e o item do menu fica marcado.
// - Na largura de data-painel, "Menu" abre o painel de tela cheia (foco preso, Esc, rolagem travada).
import { travarRolagem } from './rolagem.js?v=1.2.2';

const TONS_ESCUROS = new Set(['tinta', 'superficie']);
const FOCAVEIS = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function iniciarNavegacao() {
  const nav = document.querySelector('[data-nav]');
  if (!nav) return;

  const faixa = nav.querySelector('.nav__dentro');
  const progresso = nav.querySelector('.nav__progresso');
  const abrir = nav.querySelector('.nav__abrir');
  const painel = document.getElementById(abrir?.getAttribute('aria-controls'));
  const secoes = [...document.querySelectorAll('main > section[data-tom]')];
  const hero = secoes[0];

  // Seção → links que apontam para ela (na pílula e no painel)
  const linksPorSecao = new Map();
  document.querySelectorAll('.nav__item, .painel__item').forEach((link) => {
    const alvo = document.getElementById(link.hash.slice(1));
    const secao = alvo?.closest('main > section');
    if (!secao) return;
    if (!linksPorSecao.has(secao)) linksPorSecao.set(secao, []);
    linksPorSecao.get(secao).push(link);
  });

  let secaoAtual = null;
  let ultimoY = scrollY;
  let pedido = 0;

  function atualizar() {
    pedido = 0;
    const y = scrollY;
    const caixa = faixa.getBoundingClientRect();
    // Ponto de leitura: meio da navegação na posição em que ela fica visível
    const sonda = parseFloat(getComputedStyle(nav).top) + caixa.height / 2;

    const secao = secoes.find((s) => {
      const r = s.getBoundingClientRect();
      return r.top <= sonda && r.bottom > sonda;
    }) || (y < 10 ? secoes[0] : secoes.at(-1));

    const tom = TONS_ESCUROS.has(secao.dataset.tom) ? 'tinta' : 'papel';
    if (nav.dataset.tom !== tom) nav.dataset.tom = tom;

    const r = secao.getBoundingClientRect();
    const fracao = Math.min(Math.max((sonda - r.top) / r.height, 0), 1);
    progresso.style.setProperty('--progresso', fracao.toFixed(4));

    if (secao !== secaoAtual) {
      linksPorSecao.get(secaoAtual)?.forEach((l) => l.removeAttribute('aria-current'));
      linksPorSecao.get(secao)?.forEach((l) => l.setAttribute('aria-current', 'location'));
      secaoAtual = secao;
    }

    // Some só depois do hero, nunca com o foco dentro dela
    const delta = y - ultimoY;
    const passouHero = y > hero.offsetTop + hero.offsetHeight - caixa.height;
    if (!passouHero || delta < -4) nav.classList.remove('nav--oculta');
    else if (delta > 4 && !nav.contains(document.activeElement)) nav.classList.add('nav--oculta');
    if (Math.abs(delta) > 4 || !passouHero) ultimoY = y;
  }

  const agendar = () => {
    if (!pedido) pedido = requestAnimationFrame(atualizar);
  };
  addEventListener('scroll', agendar, { passive: true });
  addEventListener('resize', agendar);
  nav.addEventListener('focusin', () => nav.classList.remove('nav--oculta'));
  atualizar();

  if (abrir && painel) iniciarPainel(abrir, painel, nav.dataset.painel);
}

function iniciarPainel(abrir, painel, consulta) {
  const fechar = painel.querySelector('.painel__fechar');
  const modoPainel = matchMedia(consulta);
  let aberto = false;

  // Com o painel aberto, todo o resto sai do alcance do teclado e do leitor de tela
  const restoDaPagina = () => [...document.body.children].filter((el) => el !== painel && el.tagName !== 'SCRIPT');

  function focaveis() {
    return [...painel.querySelectorAll(FOCAVEIS)].filter((el) => el.offsetParent !== null || el === fechar);
  }

  function abrirPainel() {
    if (aberto) return;
    aberto = true;
    painel.hidden = false;
    painel.getBoundingClientRect();         // aplica o estado fechado antes de animar
    painel.classList.add('painel--aberto');
    abrir.setAttribute('aria-expanded', 'true');
    travarRolagem(true);
    restoDaPagina().forEach((el) => el.setAttribute('inert', ''));
    fechar.focus();
  }

  function fecharPainel({ devolverFoco = true } = {}) {
    if (!aberto) return;
    aberto = false;
    painel.classList.remove('painel--aberto');
    abrir.setAttribute('aria-expanded', 'false');
    travarRolagem(false);
    restoDaPagina().forEach((el) => el.removeAttribute('inert'));
    const esconder = () => { if (!aberto) painel.hidden = true; };
    const duracao = parseFloat(getComputedStyle(painel).transitionDuration) || 0;
    if (duracao) painel.addEventListener('transitionend', esconder, { once: true });
    else esconder();
    setTimeout(esconder, 700);              // garantia se o transitionend não vier
    if (devolverFoco) abrir.focus();
  }

  abrir.addEventListener('click', () => (aberto ? fecharPainel() : abrirPainel()));
  fechar.addEventListener('click', () => fecharPainel());

  // Escolher um item fecha o painel antes de a âncora rolar a página
  painel.addEventListener('click', (evento) => {
    if (evento.target.closest('a')) fecharPainel({ devolverFoco: false });
  });

  painel.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') {
      evento.preventDefault();
      fecharPainel();
      return;
    }
    if (evento.key !== 'Tab') return;
    const lista = focaveis();
    const primeiro = lista[0];
    const ultimo = lista.at(-1);
    if (evento.shiftKey && document.activeElement === primeiro) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
      evento.preventDefault();
      primeiro.focus();
    }
  });

  modoPainel.addEventListener('change', () => {
    if (!modoPainel.matches) fecharPainel({ devolverFoco: false });
  });
}
