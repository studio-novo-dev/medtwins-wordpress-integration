// Cena 2 · a jornada do resultado (dobra 2)
// No desktop (≥1100px, altura ≥640px, sem movimento reduzido) a cena fica fixa por umas
// 5,5 alturas de tela e a rolagem conduz os 100 quadrados da prova, em palco largo:
//   0 prova encerrada: o cronômetro para e os quadrados se corrigem numa onda diagonal
//     (verde acerto, vermelho erro); o resultado geral aparece ao lado da grade.
//   1 por grande área: os 100 se separam em 5 colunas de 20 (acertos embaixo, erros em
//     cima) e cada coluna ganha o percentual.
//   2 conteúdo por conteúdo: Clínica Médica fica, as outras recuam; os conteúdos abrem
//     nas três faixas.
//   3 cada questão errada: o quadrado da 37 cresce e vira o card da questão.
//   4 correção comentada: a certa acende em verde, a marcada em vermelho; o box de conduta
//     (post "Conduta e tratamento") chega com o porquê de cada alternativa.
//   virada: o fundo sai da tinta, passa pelo céu e chega ao papel; a tela da prova some.
//   5 prioridades: os erros dos assuntos que mais pesam voam para uma lista numerada.
//   6 direcionamento: a folha de caderno sobe por trás da lista e ela vira o plano da
//     semana, cada linha escrita sobre a pauta, com o check e o rabisco verde sob cada nome.
// A copy é a legenda do palco (no alto, centrada): a pílula do grupo e o item da etapa trocam
// no lugar. Sem fixação (celular, telas baixas, movimento reduzido, sem JS), cada item vem com
// a miniatura estática do seu estado.
import { QUESTOES, PRIORIDADES, DESEMPENHO, PROVAS_AREAS, CONTEUDOS, RESULTADO, CORRECAO_37, PLANO, CONFIG, TEXTOS } from '../dados/simulacao.js?v=1.3.0';
import { CARTOES, nomeArea, esc, LETRAS } from './cartoes.js?v=1.3.0';
import { usarScrollTrigger } from '../globais/rolagem.js?v=1.3.0';

const FIXAR = '(min-width: 1100px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)';

// Onde cada etapa começa na linha do tempo
const ETAPAS = { encerrada: 0, areas: 1, conteudos: 2, questao: 3, comentada: 4, virada: 5, prioridades: 5.3, plano: 6.4, fim: 7.4 };
const ROLAGEM = 5.5; // alturas de tela

// ---------------------------------------------------------------------------
// O objeto da jornada, conforme a página (CONFIG.jornada.objeto):
//   'geral': os 100 quadrados da prova de 100, na ordem da prova;
//   'areas': as cinco provas de área encerradas, 50 quadrados cada, uma grade por área.
// Cada quadrado tem um id (o número na de 100; "área-número" nas provas de área).
// ---------------------------------------------------------------------------
const POR_AREAS = CONFIG.jornada.objeto === 'areas';
const CONTEUDOS_AREA = CONTEUDOS.area;

const MODELO = POR_AREAS
  ? {
    cels: PROVAS_AREAS.flatMap((p, g) => p.acertos.map((acertou, k) => ({ id: `${p.id}-${k + 1}`, n: k + 1, area: p.id, acertou, g, k }))),
    rotulos: PROVAS_AREAS.map((p) => ({ id: p.id, nome: nomeArea[p.id], pct: p.pct, faixa: p.faixa })),
    q37: `${CONTEUDOS_AREA}-37`,
  }
  : {
    cels: QUESTOES.map((q) => ({ id: String(q.n), n: q.n, area: q.area, acertou: q.acertou })),
    rotulos: DESEMPENHO.map((a) => ({ id: a.id, nome: a.nome, pct: a.pct, faixa: a.faixa })),
    q37: '37',
  };

// Para onde voam os erros de cada prioridade: na de 100, as questões erradas daquele
// conteúdo; nas provas de área, o mesmo número de erros, tirados da prova daquela área
const vagasDe = (p) => (POR_AREAS
  ? MODELO.cels.filter((c) => c.area === p.area && !c.acertou && c.id !== MODELO.q37).slice(0, p.erradas.length).map((c) => c.id)
  : p.erradas.map(String));

const topPrioridades = () => [...PRIORIDADES].sort((a, b) => b.erradas.length - a.erradas.length).slice(0, 3);
const tarefaDe = (conteudo) => PLANO.find(([, c]) => c === conteudo);
const RABISCO = '<svg class="rabisco caderno-rabisco" viewBox="0 0 220 26" data-rabisco aria-hidden="true"><path pathLength="1" d="M4 17c44-9 110-13 212-6"/><path pathLength="1" d="M14 23c52-6 110-8 186-4"/></svg>';

// ---------------------------------------------------------------------------
// Peças: correção comentada em box de conduta e o plano no caderno (também nas miniaturas)
// ---------------------------------------------------------------------------
function correcao() {
  const q = QUESTOES.find((x) => x.n === 37);
  const itens = LETRAS.map((l) => `
    <li class="conduta__item conduta__item--${l === q.gabarito ? 'certa' : 'errada'}"><span class="conduta__letra">${l}</span><p>${esc(CORRECAO_37[l])}</p></li>`).join('');
  return `
    <div class="conduta">
      <p class="conduta__pilula">${TEXTOS.correcao}</p>
      <ul class="conduta__lista">${itens}</ul>
    </div>`;
}

// O caderno: cada prioridade em duas linhas da pauta (conteúdo na primeira, tarefa na
// segunda). Com vagas = true, a linha leva as vagas para onde voam os quadrados dos erros.
function caderno({ vagas = false } = {}) {
  const linhas = topPrioridades().map((p, i) => {
    const [dia, , tarefa] = tarefaDe(p.conteudo) || ['', '', ''];
    return `
      <li class="caderno-linha">
        <b class="caderno-linha__num">${i + 1}</b>
        <span class="caderno-linha__nome"><span class="caderno-linha__conteudo">${esc(p.conteudo)}${RABISCO}</span><small>${nomeArea[p.area]}</small></span>
        <span class="caderno-linha__erros">${vagas ? vagasDe(p).map((id) => `<i data-vaga="${id}"></i>`).join('') : TEXTOS.erros(p.erradas.length)}</span>
        <span class="caderno-linha__tarefa"><b>${dia}</b> ${esc(tarefa)}</span>
        <span class="caderno-linha__check"><span class="icone icone--check"></span></span>
      </li>`;
  }).join('');
  return `
    <div class="caderno-folha" data-caderno>
      <span class="caderno-folha__papel" data-papel></span>
      <p class="caderno-folha__faixas"><span>${TEXTOS.prioridades}</span><span data-faixa-semana>${TEXTOS.semana}</span></p>
      <ol class="caderno-folha__lista">${linhas}</ol>
    </div>`;
}

const MINI = {
  areas: () => CARTOES.areas(),
  conteudos: () => CARTOES.conteudos(),
  questao: () => CARTOES.questao(37).replace('cartao--questao', 'cartao--questao revelada'),
  comentario: () => `<div class="cartao">${correcao()}</div>`,
  prioridades: () => CARTOES.prioridades(),
  plano: () => caderno(),
};

// ---------------------------------------------------------------------------
// O objeto da cena fixada
// ---------------------------------------------------------------------------
function htmlObjeto() {
  const { nome, conta, relogio } = CONFIG.jornada;
  const celulas = MODELO.cels.map((c) => `<i class="obj-cel${c.acertou ? '' : ' obj-cel--errada'}" data-id="${c.id}"><span class="obj-cel__corr"></span><span class="obj-cel__n">${c.n}</span></i>`).join('');
  const rotulos = MODELO.rotulos.map((a) => `<p class="obj-rotulo faixa-${a.faixa}"><b>${a.pct}%</b><span>${a.nome}</span></p>`).join('');
  // Nas provas de área, o nome de cada uma em cima da sua grade (estado 0)
  const nomes = POR_AREAS ? `<div class="obj__nomes">${MODELO.rotulos.map((a) => `<p class="obj-prova">${a.nome}</p>`).join('')}</div>` : '';
  const tempo = relogio ? `
        <span class="obj__relogio" data-relogio-final><span class="icone icone--relogio"></span>${RESULTADO.tempoRestante}</span>` : '';
  return `
    <div class="obj__painel" data-painel>
      <p class="obj__topo">
        <span class="simbolo"></span><span class="obj__nome">${nome}</span>
        <span class="obj__conta"><b>${conta.feitas}</b> ${TEXTOS.de} ${conta.total}</span>${tempo}
      </p>
    </div>
    <div class="obj__card obj__card--caderno" data-card="caderno">${caderno({ vagas: true })}</div>
    <div class="obj__celulas">${celulas}</div>${nomes}
    <div class="obj__rotulos">${rotulos}</div>
    <div class="obj__card obj__card--anel" data-card="anel">${CARTOES.resultado()}</div>
    <div class="obj__card obj__card--conteudos" data-card="conteudos">${CARTOES.conteudos()}</div>
    <div class="obj__card obj__card--questao" data-card="questao">${CARTOES.questao(37)}</div>
    <div class="obj__card obj__card--comentario" data-card="comentario"><div class="cartao">${correcao()}</div></div>`;
}

// Provas de área: cinco grades de 5 × 10 lado a lado, com o nome em cima (estado 0); no
// estado 1 cada grade fecha na sua coluna, com os acertos assentando embaixo e os erros em
// cima, e o percentual da área embaixo
function medirAreas(objeto) {
  const W = objeto.clientWidth;
  const H = objeto.clientHeight;
  const topo = objeto.querySelector('.obj__topo').offsetHeight;
  const campo = { y: topo, h: H - topo };
  const meio = topo + (H - topo) / 2;
  const n = MODELO.rotulos.length;
  const passo = Math.floor(Math.min((W * 0.84) / (n * 5 + (n - 1) * 1.6), (campo.h * 0.62) / 10));
  const lado = Math.round(passo * 0.84);
  const larguraCol = passo * 5;
  const vaoCol = passo * 1.6;
  const ax = (W - (larguraCol * n + vaoCol * (n - 1))) / 2;
  const xDe = (g) => ax + g * (larguraCol + vaoCol);
  const gy = meio - (passo * 10) / 2 + passo * 0.6;
  const grade = MODELO.cels.map((c) => ({ x: xDe(c.g) + (c.k % 5) * passo, y: gy + Math.floor(c.k / 5) * passo, s: 1 }));
  const baseY = gy + passo * 10;
  const ordem = {};
  MODELO.rotulos.forEach((rot, g) => {
    MODELO.cels.filter((c) => c.g === g).sort((p, q) => Number(q.acertou) - Number(p.acertou)).forEach((c, k) => { ordem[c.id] = k; });
  });
  const areas = MODELO.cels.map((c) => ({ x: xDe(c.g) + (ordem[c.id] % 5) * passo, y: baseY - (Math.floor(ordem[c.id] / 5) + 1) * passo, s: 1 }));
  const colunas = MODELO.rotulos.map((rot, g) => ({ x: xDe(g), largura: larguraCol, y: baseY + passo * 0.4 }));
  const nomes = MODELO.rotulos.map((rot, g) => ({ x: xDe(g), largura: larguraCol, y: gy }));
  return { W, H, campo, meio, lado, grade, anel: null, areas, colunas, nomes, passoA: passo };
}

// Posições dos 100 quadrados e dos cartões em cada arranjo, em px dentro do objeto
function medirArranjos(objeto) {
  if (POR_AREAS) return medirAreas(objeto);
  const W = objeto.clientWidth;
  const H = objeto.clientHeight;
  const topo = objeto.querySelector('.obj__topo').offsetHeight;
  // A área útil do painel, abaixo da barra do topo; tudo se centra nela na vertical
  const campo = { y: topo, h: H - topo };
  const meio = topo + (H - topo) / 2;

  // Grade 10 × 10 com o anel do resultado ao lado: o par fica centrado no palco
  const passo = Math.floor((campo.h * 0.8) / 10);
  const lado = Math.round(passo * 0.84);
  const anelW = objeto.querySelector('[data-card="anel"]').offsetWidth;
  const vao = passo * 1.4;
  const gx = (W - (passo * 10 + vao + anelW)) / 2;
  const gy = meio - (passo * 10) / 2;
  const grade = MODELO.cels.map((c, i) => ({ x: gx + (i % 10) * passo, y: gy + Math.floor(i / 10) * passo, s: 1 }));
  const anel = { x: gx + passo * 10 + vao, y: gy + (passo * 10) / 2 };

  // Cinco colunas de 20 (2 × 10), acertos embaixo e erros em cima, centradas
  const passoA = Math.floor((campo.h * 0.66) / 10);
  const escalaA = (passoA * 0.84) / lado;
  const larguraCol = passoA * 2;
  const vaoCol = passoA * 1.6;
  const ax = (W - (larguraCol * 5 + vaoCol * 4)) / 2;
  // Colunas e rótulos (uns 2,6 passos embaixo) formam um bloco centrado
  const blocoA = passoA * 10 + passoA * 2.6;
  const baseY = meio - blocoA / 2 + passoA * 10;
  const porArea = {};
  DESEMPENHO.forEach((a, c) => {
    const dela = QUESTOES.filter((q) => q.area === a.id).sort((p, q) => Number(q.acertou) - Number(p.acertou));
    dela.forEach((q, k) => {
      porArea[String(q.n)] = {
        x: ax + c * (larguraCol + vaoCol) + (k % 2) * passoA,
        y: baseY - (Math.floor(k / 2) + 1) * passoA,
        s: escalaA,
      };
    });
  });
  const areas = MODELO.cels.map((c) => porArea[c.id]);
  const colunas = DESEMPENHO.map((a, c) => ({ x: ax + c * (larguraCol + vaoCol), largura: larguraCol, y: baseY + passoA * 0.4 }));
  return { W, H, campo, meio, lado, grade, anel, areas, colunas, passoA };
}

function montarCena(secao, objeto, legenda, gsap, ScrollTrigger) {
  objeto.innerHTML = htmlObjeto();
  const cels = [...objeto.querySelectorAll('.obj-cel')];
  const correcoes = cels.map((c) => c.querySelector('.obj-cel__corr'));
  const numeros = cels.map((c) => c.querySelector('.obj-cel__n'));
  const card = (n) => objeto.querySelector(`[data-card="${n}"]`);
  const painel = objeto.querySelector('[data-painel]');
  const papel = objeto.querySelector('[data-papel]');
  const rotulos = [...objeto.querySelectorAll('.obj-rotulo')];
  const nomesProva = [...objeto.querySelectorAll('.obj-prova')];
  const relogioFinal = objeto.querySelector('[data-relogio-final]');
  const rabiscos = [...objeto.querySelectorAll('[data-rabisco]')];
  const questaoCard = card('questao').querySelector('.cartao--questao');
  const linhasCaderno = [...objeto.querySelectorAll('.caderno-linha')];
  const etapas = [...legenda.querySelectorAll('[data-etapa]')];
  const grupos = [...legenda.querySelectorAll('[data-grupo]')];
  const conta = secao.querySelector('[data-conta]');
  const progresso = secao.querySelector('[data-progresso]');

  const m = medirArranjos(objeto);
  objeto.style.setProperty('--lado', `${m.lado}px`);
  rotulos.forEach((r, c) => {
    r.style.left = `${m.colunas[c].x - m.passoA * 0.6}px`;
    r.style.width = `${m.colunas[c].largura + m.passoA * 1.2}px`;
    r.style.top = `${m.colunas[c].y}px`;
  });

  // Nomes das provas de área em cima de cada grade
  nomesProva.forEach((el, g) => {
    el.style.left = `${m.nomes[g].x}px`;
    el.style.width = `${m.nomes[g].largura}px`;
    el.style.top = `${m.nomes[g].y - el.offsetHeight - m.passoA * 0.35}px`;
  });
  // Centra de verdade as cinco provas com os nomes em cima (o nome mais alto manda)
  if (nomesProva.length) {
    const topoNomes = Math.min(...nomesProva.map((el) => el.offsetTop));
    const baseGrade = Math.max(...m.grade.map((p) => p.y)) + m.lado;
    const ajusteNomes = m.meio - (topoNomes + baseGrade) / 2;
    m.grade.forEach((p) => { p.y += ajusteNomes; });
    nomesProva.forEach((el) => { el.style.top = `${el.offsetTop + ajusteNomes}px`; });
  }

  // Centra de verdade o bloco das colunas: mede o rótulo mais alto e desloca tudo junto
  const topoCol = Math.min(...m.areas.map((p) => p.y));
  const baseRot = Math.max(...rotulos.map((r, c) => m.colunas[c].y + r.offsetHeight));
  const ajuste = m.meio - (topoCol + baseRot) / 2;
  m.areas.forEach((p) => { p.y += ajuste; });
  rotulos.forEach((r, c) => { r.style.top = `${m.colunas[c].y + ajuste}px`; });

  // Cartões em volta dos arranjos
  const colocar = (el, x, y) => { el.style.left = `${Math.round(x)}px`; el.style.top = `${Math.round(y)}px`; };
  if (m.anel) colocar(card('anel'), m.anel.x, m.anel.y - card('anel').offsetHeight / 2);
  // Os conteúdos ao lado da coluna da área que abre (à direita; à esquerda se ela for a última)
  const iConteudo = Math.max(0, MODELO.rotulos.findIndex((rot) => rot.id === CONTEUDOS_AREA));
  const colC = m.colunas[iConteudo];
  const xConteudos = iConteudo < m.colunas.length - 1
    ? colC.x + colC.largura + m.passoA * 1.2
    : colC.x - card('conteudos').offsetWidth - m.passoA * 1.2;
  colocar(card('conteudos'), xConteudos, m.meio - card('conteudos').offsetHeight / 2);
  const qW = card('questao').offsetWidth;
  const cW = card('comentario').offsetWidth;
  const parX = (m.W - (qW + cW + 32)) / 2;
  colocar(card('questao'), parX, m.meio - card('questao').offsetHeight / 2);
  colocar(card('comentario'), parX + qW + 32, m.meio - card('comentario').offsetHeight / 2);
  colocar(card('caderno'), (m.W - card('caderno').offsetWidth) / 2, Math.max(8, (m.H - card('caderno').offsetHeight) / 2));

  // Vagas da lista de prioridades: para onde voam os erros de cada assunto
  const caixa = objeto.getBoundingClientRect();
  const vagas = {};
  objeto.querySelectorAll('[data-vaga]').forEach((v) => {
    const r = v.getBoundingClientRect();
    vagas[v.dataset.vaga] = { x: r.left - caixa.left, y: r.top - caixa.top, s: r.width / m.lado };
  });

  // Ponto de partida: a grade com as 100 respondidas
  gsap.set(cels, { x: (i) => m.grade[i].x, y: (i) => m.grade[i].y, scale: 1, opacity: 1, transformOrigin: '0 0' });
  gsap.set(correcoes, { opacity: 0 });
  gsap.set([card('anel'), card('conteudos'), card('comentario'), card('questao'), card('caderno'), ...rotulos], { opacity: 0 });
  gsap.set(papel, { yPercent: 12, opacity: 0 });
  gsap.set(rabiscos.flatMap((r) => [...r.querySelectorAll('path')]), { strokeDashoffset: 1 });
  const tarefas = linhasCaderno.map((l) => l.querySelector('.caderno-linha__tarefa'));
  const checks = linhasCaderno.map((l) => l.querySelector('.caderno-linha__check'));
  gsap.set([...tarefas, ...checks], { opacity: 0, x: -10 });

  // De onde o card da questão nasce: o quadrado da 37
  const q37 = MODELO.cels.findIndex((c) => c.id === MODELO.q37);
  const cq = card('questao');
  const origemQ = {
    x: m.areas[q37].x - cq.offsetLeft,
    y: m.areas[q37].y - cq.offsetTop,
    scale: (m.lado * m.areas[q37].s) / cq.offsetWidth,
  };

  // Ordem da onda de correção: diagonal da grade
  const diag = POR_AREAS
    ? (i) => MODELO.cels[i].g * 3 + (MODELO.cels[i].k % 5) + Math.floor(MODELO.cels[i].k / 5)
    : (i) => (i % 10) + Math.floor(i / 10);
  const diagonal = cels.map((_, i) => i).sort((a, b) => diag(a) - diag(b));

  const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
  const E = ETAPAS;

  // 0 · prova encerrada: o relógio pisca e para, a onda corrige, o resultado aparece
  if (relogioFinal) tl.to(relogioFinal, { opacity: 0.25, duration: 0.08, yoyo: true, repeat: 1, ease: 'none' }, E.encerrada + 0.04);
  tl.to(diagonal.map((i) => correcoes[i]), { opacity: 1, duration: 0.12, stagger: { amount: 0.5 }, ease: 'none' }, E.encerrada + 0.12);
  if (m.anel) tl.fromTo(card('anel'), { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }, E.encerrada + 0.55);

  // 1 · por grande área
  if (m.anel) tl.to(card('anel'), { opacity: 0, x: 20, duration: 0.25 }, E.areas);
  if (nomesProva.length) tl.to(nomesProva, { opacity: 0, duration: 0.25 }, E.areas);
  tl.to(numeros, { opacity: 0, duration: 0.2 }, E.areas);
  tl.to(cels, { x: (i) => m.areas[i].x, y: (i) => m.areas[i].y, scale: (i) => m.areas[i].s, duration: 0.7, stagger: { amount: 0.18, from: 'random' } }, E.areas + 0.05);
  tl.to(rotulos, { opacity: 1, duration: 0.25, stagger: 0.03 }, E.areas + 0.3);

  // 2 · conteúdo por conteúdo: Clínica Médica fica, as outras recuam
  const ehCM = (i) => MODELO.cels[i].area === CONTEUDOS_AREA;
  tl.to(cels.filter((_, i) => !ehCM(i)), { opacity: 0.12, duration: 0.3 }, E.conteudos);
  tl.to(rotulos.filter((_, i) => i !== iConteudo), { opacity: 0.12, duration: 0.3 }, E.conteudos);
  tl.fromTo(card('conteudos'), { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }, E.conteudos + 0.2);

  // 3 · a 37 cresce do lugar dela e vira o card da questão
  tl.to(card('conteudos'), { opacity: 0, x: 30, duration: 0.25 }, E.questao);
  tl.to(cels.filter((_, i) => i !== q37), { opacity: 0, duration: 0.3 }, E.questao);
  tl.to(rotulos, { opacity: 0, duration: 0.25 }, E.questao);
  tl.fromTo(cq, { opacity: 0, x: origemQ.x, y: origemQ.y, scale: origemQ.scale, transformOrigin: '0 0' }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.6, ease: 'power3.inOut' }, E.questao + 0.15);
  tl.to(cels[q37], { opacity: 0, duration: 0.15 }, E.questao + 0.3);

  // 4 · correção comentada (as cores da questão entram pela classe .revelada, no onUpdate)
  tl.fromTo(card('comentario'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, E.comentada + 0.25);

  // Virada: tinta, céu, papel; a tela da prova some
  tl.to(secao.querySelector('[data-fundo="ceu"]'), { opacity: 1, duration: 0.3, ease: 'none' }, E.virada);
  tl.to(secao.querySelector('[data-fundo="papel"]'), { opacity: 1, duration: 0.3, ease: 'none' }, E.virada + 0.28);
  tl.to([card('questao'), card('comentario')], { opacity: 0, y: -30, duration: 0.3 }, E.virada);
  tl.to(painel, { opacity: 0, duration: 0.3 }, E.virada + 0.15);

  // 5 · prioridades: a lista aparece e os erros de cada assunto voam para a sua linha
  const daLista = cels.filter((_, i) => vagas[MODELO.cels[i].id]);
  const vagaDe = (el) => vagas[MODELO.cels[cels.indexOf(el)].id];
  tl.fromTo(card('caderno'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, E.prioridades);
  tl.to(daLista, {
    x: (k, el) => vagaDe(el).x,
    y: (k, el) => vagaDe(el).y,
    scale: (k, el) => vagaDe(el).s,
    opacity: 1,
    duration: 0.6,
    stagger: { amount: 0.2 },
  }, E.prioridades + 0.3);

  // 6 · o caderno: o papel pautado sobe por trás, os erros saem, cada linha ganha a tarefa
  //     da semana e o check, e o rabisco se desenha sob cada nome, um depois do outro
  tl.to(papel, { yPercent: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }, E.plano);
  tl.to(daLista, { opacity: 0, scale: (k, el) => vagaDe(el).s * 0.4, duration: 0.25 }, E.plano + 0.3);
  tl.to(tarefas, { opacity: 1, x: 0, duration: 0.3, stagger: 0.08 }, E.plano + 0.4);
  tl.to(checks, { opacity: 1, x: 0, duration: 0.25, stagger: 0.08 }, E.plano + 0.5);
  rabiscos.forEach((r, i) => {
    tl.to(r.querySelectorAll('path'), { strokeDashoffset: 0, duration: 0.35, stagger: 0.08, ease: 'power1.inOut' }, E.plano + 0.6 + i * 0.14);
  });
  tl.to({}, { duration: 0.3 }, E.fim - 0.3);

  // Legenda, barra e estados por classe
  const total = etapas.length;
  const marcar = (t) => {
    let atual = 0;
    if (t >= E.plano) atual = 6;
    else if (t >= E.prioridades) atual = 5;
    else if (t >= E.comentada) atual = 4;
    else if (t >= E.questao) atual = 3;
    else if (t >= E.conteudos) atual = 2;
    else if (t >= E.areas) atual = 1;
    etapas.forEach((el) => el.classList.toggle('ativo', Number(el.dataset.etapa) === atual));
    const ativa = etapas.find((el) => Number(el.dataset.etapa) === atual);
    legenda.style.setProperty('--alt', `${ativa ? ativa.offsetHeight : 0}px`);
    const grupo = atual >= 5 ? 2 : 1;
    grupos.forEach((g) => g.classList.toggle('atual', Number(g.dataset.grupo) === grupo));
    conta.textContent = String(atual).padStart(2, '0');
    progresso.style.setProperty('--progresso', (atual / total).toFixed(3));
    questaoCard.classList.toggle('revelada', t >= E.comentada + 0.1);
    secao.classList.toggle('resultado--papel', t >= E.prioridades);
    objeto.classList.toggle('obj--plano', t >= E.plano + 0.3);
  };

  const gatilho = ScrollTrigger.create({
    trigger: secao,
    start: 'top top',
    end: () => `+=${innerHeight * ROLAGEM}`,
    pin: true,
    scrub: 0.6,
    animation: tl,
    onUpdate: (st) => marcar(st.progress * tl.duration()),
  });
  marcar(0);

  return () => {
    gatilho.kill();
    tl.kill();
    gsap.set(secao.querySelectorAll('[data-fundo]'), { clearProps: 'opacity' });
    etapas.forEach((el) => el.classList.remove('ativo'));
    grupos.forEach((g) => g.classList.remove('atual'));
    objeto.innerHTML = '';
    objeto.classList.remove('obj--plano');
    secao.classList.remove('resultado--papel');
  };
}

export function iniciarResultado() {
  const secao = document.querySelector('[data-resultado]');
  if (!secao) return;
  const objeto = secao.querySelector('[data-objeto]');
  const legenda = secao.querySelector('[data-legenda]');

  // Miniaturas estáticas de cada item (aparecem só sem fixação)
  secao.querySelectorAll('[data-mini]').forEach((el) => { el.innerHTML = MINI[el.dataset.mini](); });

  usarScrollTrigger().then(({ gsap, ScrollTrigger }) => {
    const mm = gsap.matchMedia();
    mm.add(FIXAR, () => {
      secao.classList.add('resultado--fixada');
      let desfazer = montarCena(secao, objeto, legenda, gsap, ScrollTrigger);
      ScrollTrigger.refresh();

      // Mudou o tamanho dentro do desktop: remonta com as medidas novas
      let espera = 0;
      const remontar = () => {
        clearTimeout(espera);
        espera = setTimeout(() => {
          desfazer();
          desfazer = montarCena(secao, objeto, legenda, gsap, ScrollTrigger);
          ScrollTrigger.refresh();
        }, 200);
      };
      addEventListener('resize', remontar);

      return () => {
        removeEventListener('resize', remontar);
        clearTimeout(espera);
        desfazer();
        secao.classList.remove('resultado--fixada');
      };
    });
  }).catch(() => {});
}
