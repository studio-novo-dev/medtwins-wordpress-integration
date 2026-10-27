// Cartões da interface do simulado (aria-hidden na página): a mesma linguagem na parede
// do hero e na dobra 2. Cada função devolve o HTML de um cartão a partir dos dados de
// js/dados/simulacao.js. Nada aqui é texto da copy: é desenho de produto.
import { AREAS, QUESTOES_REAIS, COMENTARIOS, PRIORIDADES, CONTEUDOS, DESEMPENHO, RESULTADO_GERAL, SIMULADOS, PROVAS_AREAS, CONFIG, faixaDe, TEXTOS } from '../dados/simulacao.js?v=1.3.0';

export const LETRAS = ['A', 'B', 'C', 'D'];
// Nomes de área: os do INEP, com as trocas da página (CONFIG.nomes)
export const nomeArea = { ...Object.fromEntries(AREAS.map((a) => [a.id, a.nome])), ...CONFIG.nomes };
export const porN = new Map(QUESTOES_REAIS.map((q) => [q.n, q]));

export const doisDigitos = (n) => String(n).padStart(2, '0');
export const formatarTempo = (s) => `${doisDigitos(Math.floor(s / 3600))}:${doisDigitos(Math.floor((s % 3600) / 60))}:${doisDigitos(s % 60)}`;
export const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');

// ---------------------------------------------------------------------------
// Cartões
// ---------------------------------------------------------------------------
let alternaTom = 0;
export const reiniciarTons = () => { alternaTom = 0; };

export const CARTOES = {
  questao(n) {
    const q = porN.get(n);
    if (!q) return '';
    const tom = alternaTom++ % 2 ? ' cartao--claro' : '';
    const acertou = q.marcada === q.gabarito;
    const alts = q.alternativas.map((texto, i) => {
      const l = LETRAS[i];
      const classes = [
        l === q.marcada ? 'cq__alt--marcada' : '',
        l === q.gabarito ? 'cq__alt--certa' : '',
        l === q.marcada && !acertou ? 'cq__alt--errada' : '',
      ].filter(Boolean).join(' ');
      return `<li class="cq__alt ${classes}"><span class="cq__letra">${l}</span><span>${esc(texto)}</span></li>`;
    }).join('');
    return `
      <article class="cartao cartao--questao${tom}" data-questao="${n}">
        <p class="cq__topo"><span class="cq__num">${TEXTOS.questao} <b>${doisDigitos(n)}</b></span><span class="cq__area">${nomeArea[q.area]}</span></p>
        <p class="cq__enunciado">${esc(q.enunciado)}</p>
        <ol class="cq__alts">${alts}</ol>
        <p class="cq__rodape">
          <span>${TEXTOS.suaResposta} <b>${q.marcada}</b></span>
          <span class="cq__veredito cq__veredito--${acertou ? 'certa' : 'errada'}"><span class="icone icone--${acertou ? 'check' : 'x'}"></span>${TEXTOS.gabarito} <b>${q.gabarito}</b></span>
        </p>
      </article>`;
  },

  // Correção comentada: por que a certa está certa e por que a marcada está errada
  comentario(n) {
    const q = porN.get(n);
    const c = COMENTARIOS[n];
    if (!q || !c) return '';
    return `
      <div class="cartao cartao--claro cartao--comentario">
        <p class="cq__topo"><span class="cq__num">${TEXTOS.questao} <b>${doisDigitos(n)}</b></span><span class="cq__area">${TEXTOS.correcao}</span></p>
        <div class="comentario__bloco comentario__bloco--certa">
          <p class="comentario__titulo"><span class="icone icone--check"></span>${TEXTOS.porQueCerta(q.gabarito)}</p>
          <p class="comentario__texto">${esc(c.certa)}</p>
        </div>
        <div class="comentario__bloco comentario__bloco--errada">
          <p class="comentario__titulo"><span class="icone icone--x"></span>${TEXTOS.porQueErrada(q.marcada)}</p>
          <p class="comentario__texto">${esc(c.errada)}</p>
        </div>
      </div>`;
  },

  // As três primeiras prioridades de revisão, com o número de erros de cada uma
  prioridades() {
    const linhas = [...PRIORIDADES].sort((a, b) => b.erradas.length - a.erradas.length).slice(0, 3).map((p, i) => `
      <li><b class="prio__num">${i + 1}</b><span class="prio__nome">${esc(p.conteudo)}<small>${nomeArea[p.area]}</small></span><span class="prio__erros">${TEXTOS.erros(p.erradas.length)}</span></li>`).join('');
    return `
      <div class="cartao cartao--prioridades">
        <p class="prio__titulo">${TEXTOS.prioridades}</p>
        <ol class="prio__lista">${linhas}</ol>
      </div>`;
  },

  // O card da prova: o navegador se preenchendo (de 100, ou de 50 com o nome da área)
  prova() {
    const { total, area, tempoRestante } = CONFIG.prova;
    const celulas = Array.from({ length: total }, () => '<i class="q"></i>').join('');
    const rotulo = area ? `
        <p class="prova__area"><span class="simbolo"></span>${nomeArea[area]}</p>` : '';
    return `
      <div class="cartao cartao--prova" data-cartao-prova>${rotulo}
        <p class="prova__topo">
          <span><b data-feitas>0</b> ${TEXTOS.de} ${total}</span>
          <span class="prova__relogio"><span class="icone icone--relogio"></span><span data-relogio>${formatarTempo(tempoRestante)}</span></span>
        </p>
        <div class="prova__grade">${celulas}</div>
        <span class="prova__barra"><i data-barra></i></span>
      </div>`;
  },

  relogio() {
    return `
      <div class="cartao cartao--claro cartao--relogio">
        <p class="relogio__topo"><span class="icone icone--relogio"></span><span class="relogio__vivo"></span></p>
        <div>
          <p class="relogio__tempo" data-relogio>${formatarTempo(CONFIG.prova.tempoRestante)}</p>
          <p class="relogio__rotulo">${TEXTOS.tempo}</p>
        </div>
      </div>`;
  },

  resultado() {
    const v = RESULTADO_GERAL;
    const a1 = (Math.min(v, 50) / 50) * 180;
    const a2 = (Math.max(v - 50, 0) / 50) * 180;
    return `
      <div class="cartao cartao--resultado">
        <div class="anel">
          <span class="anel__trilho"></span>
          <span class="anel__meia anel__meia--d"><span class="anel__arco" style="transform: rotate(${a1}deg)"></span></span>
          <span class="anel__meia anel__meia--e"><span class="anel__arco" style="transform: rotate(${a2}deg)"></span></span>
          <span class="anel__centro"><b class="anel__num">${v}%</b><span class="anel__legenda">${TEXTOS.acertos}</span></span>
        </div>
        <p class="resultado__rodape"><span>${TEXTOS.geral}</span><span>${TEXTOS.cemQuestoes}</span></p>
      </div>`;
  },

  areas() {
    const linhas = DESEMPENHO.map((a) => `
      <li class="faixa-${a.faixa}"><span>${a.nome}</span><b>${a.pct}%</b><span class="ui__barra"><i style="--v: ${a.pct / 100}"></i></span></li>`).join('');
    return `<div class="cartao cartao--areas"><ul class="areas">${linhas}</ul></div>`;
  },

  // A trilha dos 6 simulados (página das 6 áreas): concluídos com check e o percentual,
  // o da vez com o ponto vivo e a barra, os outros por fazer com o número de questões
  trilha() {
    const { concluidos, andamento } = CONFIG.trilha;
    const pct = Object.fromEntries(PROVAS_AREAS.map((p) => [p.id, p]));
    const { inicio, total } = CONFIG.prova;
    const linhas = SIMULADOS.map((s) => {
      const nome = s.id === 'geral' ? s.nome : nomeArea[s.id];
      if (concluidos.includes(s.id)) {
        return `<li class="trilha__item trilha__item--feito faixa-${pct[s.id].faixa}"><span class="trilha__marca"><span class="icone icone--check"></span></span><span class="trilha__nome">${nome}</span><b>${pct[s.id].pct}%</b></li>`;
      }
      if (s.id === andamento) {
        return `<li class="trilha__item trilha__item--agora"><span class="trilha__marca"></span><span class="trilha__nome">${nome}</span><span class="ui__barra"><i style="--v: ${((inicio - 1) / total).toFixed(2)}"></i></span></li>`;
      }
      return `<li class="trilha__item"><span class="trilha__marca"></span><span class="trilha__nome">${nome}</span><small>${s.id === 'geral' ? 100 : 50}</small></li>`;
    }).join('');
    return `
      <div class="cartao cartao--claro cartao--trilha">
        <p class="trilha__topo"><span class="simbolo"></span>${CONFIG.jornada.nome}</p>
        <ol class="trilha__lista">${linhas}</ol>
      </div>`;
  },

  // Conteúdo por conteúdo de uma área, nas três faixas (v2)
  conteudos() {
    const linhas = CONTEUDOS.itens.map(([nome, v]) => `
      <li class="faixa-${faixaDe(v)}"><span>${esc(nome)}</span><b>${v}%</b><span class="ui__barra"><i style="--v: ${v / 100}"></i></span></li>`).join('');
    return `
      <div class="cartao cartao--areas cartao--conteudos">
        <p class="cq__topo"><span class="cq__area">${nomeArea[CONTEUDOS.area]}</span></p>
        <ul class="areas">${linhas}</ul>
        <ul class="legenda">${TEXTOS.faixas.map(([f, t]) => `<li class="faixa-${f}">${t}</li>`).join('')}</ul>
      </div>`;
  },
};
