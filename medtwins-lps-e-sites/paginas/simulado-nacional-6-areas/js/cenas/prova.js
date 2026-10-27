// Cena 1 · a parede de lâminas (hero)
// Quatro lâminas retas com o espaçamento e o movimento do acervo do hero da Home (o CSS
// anda cada trilho meia altura, sem parar; o script duplica o conteúdo para o laço não ter
// emenda), com o material desta prova teórica: questões do simulado por extenso (a marcada
// preenchida, como na plataforma), a correção comentada, as prioridades, o navegador de 1 a
// 100 se preenchendo ao vivo, o cronômetro e o resultado. Os cartões vêm de ./cartoes.js.
// - Cursor numa questão: a lâmina dela para (CSS) e a correção aparece na hora (a certa em
//   verde, a errada marcada em vermelho, o gabarito no rodapé).
// - De tempos em tempos a parede revela sozinha uma questão inteira à vista e fora do
//   formulário, para quem não usa mouse ver o mesmo gesto.
// Tudo para fora da tela e com a aba oculta. Movimento reduzido: parede parada, sem revelação.
import { PAREDE, CONFIG, TEXTOS } from '../dados/simulacao.js?v=1.3.0';

// A prova do card (de 100, ou de 50 na página das 6 áreas) e as lâminas vêm da página
const PROVA = CONFIG.prova;
const TOTAL = PROVA.total;
import { CARTOES as RENDER, formatarTempo } from './cartoes.js?v=1.3.0';
import { REDUZIDO, abaVisivel, aoMudarAba } from '../globais/movimento.js?v=1.3.0';

const EMPILHADO = matchMedia('(max-width: 1099px)');

// ---------------------------------------------------------------------------
// Cena
// ---------------------------------------------------------------------------
export function iniciarProva() {
  const parede = document.querySelector('[data-parede]');
  if (!parede) return;
  const hero = parede.closest('.hero');
  const plano = parede.querySelector('[data-plano]');
  const lead = document.querySelector('[data-lead]');

  // ---------- Montagem: cada trilho leva o conteúdo duas vezes (laço sem emenda) ----------
  plano.textContent = '';
  CONFIG.laminas.forEach((def) => {
    const lamina = document.createElement('div');
    lamina.className = 'lamina';
    lamina.dataset.sentido = def.sentido;
    lamina.style.setProperty('--duracao', `${def.duracao}s`);
    const trilho = document.createElement('div');
    trilho.className = 'lamina__trilho';
    const html = def.itens.map(([tipo, ref]) => RENDER[tipo](ref)).join('');
    trilho.innerHTML = REDUZIDO.matches ? html : html + html;
    lamina.append(trilho);
    plano.append(lamina);
  });

  // ---------- Navegador e cronômetro (todas as cópias juntas) ----------
  const prova = { feitas: new Set(), revisar: new Set(), atual: PROVA.inicio, passouDoFim: false };

  function pintarProva() {
    const feitas = prova.feitas.size;
    parede.querySelectorAll('[data-cartao-prova]').forEach((card) => {
      card.querySelector('[data-feitas]').textContent = feitas;
      card.querySelector('[data-barra]').style.setProperty('--progresso', (feitas / TOTAL).toFixed(3));
      card.querySelectorAll('.q').forEach((el, i) => {
        const n = i + 1;
        const estado = prova.revisar.has(n) ? 'revisar' : prova.feitas.has(n) ? 'respondida' : '';
        if ((el.dataset.estado || '') !== estado) {
          if (estado) el.dataset.estado = estado;
          else el.removeAttribute('data-estado');
        }
        el.classList.toggle('q--atual', n === prova.atual);
      });
    });
  }

  function provaInicial() {
    prova.feitas.clear();
    prova.revisar.clear();
    prova.passouDoFim = false;
    for (let n = 1; n < PROVA.inicio; n += 1) {
      if (PROVA.puladasAntes.includes(n)) continue;
      prova.feitas.add(n);
      if (PROVA.marcadasAntes.includes(n)) prova.revisar.add(n);
    }
    prova.atual = PROVA.inicio;
  }

  // Responde a atual e anda: pula e marca as da lista; depois da 100 volta nas puladas e
  // nas marcadas; com tudo respondido, segura e recomeça da questão inicial
  function avancarProva() {
    const n = prova.atual;
    if (!n) { provaInicial(); return; }
    if (prova.passouDoFim || !PROVA.pular.includes(n)) prova.feitas.add(n);
    if (!prova.passouDoFim && PROVA.marcar.includes(n)) prova.revisar.add(n);
    if (prova.passouDoFim) prova.revisar.delete(n);
    let prox = n + 1;
    if (prox > TOTAL) prova.passouDoFim = true;
    if (prova.passouDoFim) {
      prox = Array.from({ length: TOTAL }, (_, i) => i + 1).find((q) => !prova.feitas.has(q))
        ?? [...prova.revisar].sort((a, b) => a - b)[0]
        ?? 0;
    }
    prova.atual = prox;
  }

  // ---------- Relógio: só anda com a parede visível e a aba aberta ----------
  const relogio = { t: 0, rodando: false, ultimo: 0, quadro: 0 };
  let segundo = -1;
  let proximaRevelacao = PAREDE.revelarCada;
  let revelada = null;
  let fechaRevelada = 0;

  const sorte = (() => { let s = 2026; return () => ((s = (s * 16807) % 2147483647) / 2147483647); })();
  const entre = ([a, b]) => a + sorte() * (b - a);
  let proximaQuestao = entre(PROVA.porQuestao);

  function mostrarTempo() {
    const s = Math.max(0, PROVA.tempoRestante - Math.floor(relogio.t / 1000));
    if (s === segundo) return;
    segundo = s;
    const texto = formatarTempo(s);
    parede.querySelectorAll('[data-relogio]').forEach((el) => { el.textContent = texto; });
  }

  function quadro(agora) {
    const dt = Math.min(Math.max(agora - relogio.ultimo, 0), 100);
    relogio.ultimo = agora;
    relogio.t += dt;
    mostrarTempo();

    proximaQuestao -= dt;
    if (proximaQuestao <= 0) {
      avancarProva();
      pintarProva();
      proximaQuestao = prova.atual ? entre(PROVA.porQuestao) : PROVA.fimSegura;
    }

    proximaRevelacao -= dt;
    if (proximaRevelacao <= 0) {
      revelarSozinha();
      proximaRevelacao = PAREDE.revelarCada;
    }
    if (revelada && relogio.t >= fechaRevelada && !revelada.matches(':hover')) {
      revelada.classList.remove('revelada');
      revelada = null;
    }

    relogio.quadro = requestAnimationFrame(quadro);
  }

  // Uma questão inteira à vista, dentro da parede e fora do formulário
  function revelarSozinha() {
    const caixa = parede.getBoundingClientRect();
    const form = !EMPILHADO.matches && lead ? lead.getBoundingClientRect() : null;
    const cruza = (a, b) => b && a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
    const topo = Math.max(caixa.top, 0);
    const base = Math.min(caixa.bottom, innerHeight);
    const candidatas = [...parede.querySelectorAll('.cartao--questao')].filter((el) => {
      if (el === revelada || el.matches(':hover')) return false;
      const r = el.getBoundingClientRect();
      return r.top >= topo && r.bottom <= base && r.left >= caixa.left && r.right <= Math.min(caixa.right, innerWidth) && !cruza(r, form);
    });
    if (!candidatas.length) return;
    revelada?.classList.remove('revelada');
    revelada = candidatas[Math.floor(sorte() * candidatas.length)];
    revelada.classList.add('revelada');
    fechaRevelada = relogio.t + PAREDE.revelarPor;
  }

  let naTela = false;
  function decidirRodar() {
    const deve = naTela && abaVisivel() && !REDUZIDO.matches;
    parede.classList.toggle('parede--viva', !REDUZIDO.matches);
    parede.classList.toggle('parede--pausada', !deve);
    if (deve === relogio.rodando) return;
    relogio.rodando = deve;
    if (deve) {
      relogio.ultimo = performance.now();
      relogio.quadro = requestAnimationFrame(quadro);
    } else {
      cancelAnimationFrame(relogio.quadro);
    }
  }

  // ---------- Cursor numa questão: a correção aparece na hora ----------
  parede.addEventListener('pointerover', (e) => {
    e.target.closest('.cartao--questao')?.classList.add('revelada');
  });
  parede.addEventListener('pointerout', (e) => {
    const card = e.target.closest('.cartao--questao');
    if (!card || card.contains(e.relatedTarget) || card === revelada) return;
    card.classList.remove('revelada');
  });

  // ---------- Início ----------
  provaInicial();
  pintarProva();
  mostrarTempo();

  const entrar = () => requestAnimationFrame(() => hero.classList.add('hero--entrou'));
  if (REDUZIDO.matches) hero.classList.add('hero--entrou');
  else Promise.race([document.fonts.ready, new Promise((ok) => setTimeout(ok, 600))]).then(entrar);

  new IntersectionObserver(([e]) => {
    naTela = e.isIntersecting;
    decidirRodar();
  }).observe(parede);

  aoMudarAba(decidirRodar);
  REDUZIDO.addEventListener('change', decidirRodar);

  return { prova, textos: TEXTOS };
}
