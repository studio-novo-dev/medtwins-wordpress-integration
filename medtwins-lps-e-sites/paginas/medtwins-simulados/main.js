/* ==========================================================================
   Simulados MedTwins · landing page de captura
   Studio Novo · JavaScript puro, sem dependências
   ========================================================================== */

/* Integração ------------------------------------------------------------- */
// Vazia: o envio só registra o JSON no console e segue como sucesso.
const WEBHOOK_URL = '';
const REDIRECT_URL = 'https://page.medtwins.com.br/cronograma-de-liberacao-medtwins/';

// Teste de composição: false = parede solta no fundo; true = parede cortada na linha vertical.
// Para comparar sem mexer aqui, abra a página com ?corte na URL.
const PAREDE_COM_CORTE = false;
if (PAREDE_COM_CORTE || new URLSearchParams(location.search).has('corte')) {
  document.documentElement.classList.add('com-corte');
}

(() => {
  'use strict';

  /* Microcopy de interface que não veio na copy aprovada.
     Fica aqui, num lugar só, para revisão e aprovação. */
  const MICROCOPY = {
    nomeVazio: 'Digite seu nome.',
    telefoneVazio: 'Digite seu WhatsApp com DDD.',
    telefoneInvalido: 'Confira o número: DDD e 9 dígitos.',
    emailVazio: 'Digite seu e-mail.',
    emailInvalido: 'Confira o e-mail.',
    escolha: 'Escolha uma opção.',
    falhaRede: 'Não conseguimos enviar agora. Confira sua conexão.',
    tentarDeNovo: 'Tentar de novo',
  };

  const TEMPO_TROCA_PASSO = 170;   // ms, saída do passo antes da entrada do próximo
  const TEMPO_REDIRECIONAR = 1700; // ms, do sucesso até abrir a área de simulados
  const TEMPO_ACELERAR = 500;      // ms, arrancada das colunas no sucesso
  const TIMEOUT_ENVIO = 15000;     // ms

  /* ------------------------------------------------------------------------
     Parede · dados
     Os números são ilustrativos: a parede inteira fica com aria-hidden.
     ------------------------------------------------------------------------ */
  // Capas: uma cor dominante por simulado (mapa de tools/duotone.py) e a tinta de cada texto
  // sobre a foto, escura (#0C2027) ou clara (#EDF3EC), escolhida pelo contraste medido sobre
  // a área real onde o texto cai (tools/contraste-capas.mjs). Sem foto, a capa fica só tipográfica.
  const CAPAS = {
    'Pediatria': { foto: 'pediatria', tom: 'azul', tag: 'escura', marca: 'escura', titulo: 'escura' },
    'Ginecologia e Obstetrícia': { foto: 'ginecologia-obstetricia', tom: 'claro', tag: 'escura', marca: 'escura', titulo: 'clara' },
    'Cirurgia': { foto: 'cirurgia', tom: 'verde', tag: 'escura', marca: 'escura', titulo: 'clara' },
    // Preventiva: zoom 1.4 ancorado embaixo à direita tira o tronco de camiseta preta de baixo
    // do título (sem isso o "P" de PREVENTIVA sumia no preto) e ainda mantém a seringa no quadro
    'Preventiva e Saúde Coletiva': { foto: 'preventiva', tom: 'azul', tag: 'escura', marca: 'escura', titulo: 'escura', zoom: 1.4, foco: '100% 100%' },
    'Clínica Médica': { foto: 'clinica-medica', tom: 'claro', tag: 'escura', marca: 'escura', titulo: 'escura' },
    'Simulado Geral INEP': { foto: 'simulado-geral', tom: 'verde', tag: 'escura', marca: 'clara', titulo: 'escura' },
  };

  // Largura de exibição da capa: 16em da unidade da parede (desktop) ou da faixa (mobile)
  const TAMANHOS_CAPA = '(max-width: 899px) 24vh, calc(16.8vh + 5.6vw)';

  const CARDS = [
    // Capas: os seis simulados e quatro repetições, cada uma a duas ou mais colunas da original.
    // `nome` troca só o texto da capa (GO sem o "e", que ficava sozinho numa linha).
    { id: 'capa-ped', tipo: 'capa', area: 'Pediatria', fs: 4.2 },
    { id: 'capa-go', tipo: 'capa', area: 'Ginecologia e Obstetrícia', fs: 3.3, nome: 'Ginecologia Obstetrícia' },
    { id: 'capa-cir', tipo: 'capa', area: 'Cirurgia', fs: 4.4 },
    { id: 'capa-prev', tipo: 'capa', area: 'Preventiva e Saúde Coletiva', fs: 3.3 },
    { id: 'capa-cm', tipo: 'capa', area: 'Clínica Médica', fs: 3.9 },
    { id: 'capa-geral', tipo: 'capa', area: 'Simulado Geral INEP', fs: 3.6, extra: '100 questões' },
    { id: 'capa-ped-2', tipo: 'capa', area: 'Pediatria', fs: 4.2 },
    { id: 'capa-go-2', tipo: 'capa', area: 'Ginecologia e Obstetrícia', fs: 3.3, nome: 'Ginecologia Obstetrícia' },
    { id: 'capa-cir-2', tipo: 'capa', area: 'Cirurgia', fs: 4.4 },
    { id: 'capa-cm-2', tipo: 'capa', area: 'Clínica Médica', fs: 3.9 },

    // Interface do diagnóstico
    { id: 'anel-1', tipo: 'anel', tom: 'escuro', valor: 73, titulo: 'Simulado Geral INEP', rodape: '100 questões' },
    { id: 'anel-2', tipo: 'anel', tom: 'claro', valor: 58, titulo: 'Pediatria', rodape: 'Padrão INEP' },
    { id: 'subarea-1', tipo: 'subarea', tom: 'escuro', itens: [['Cardiologia', 81], ['Endocrinologia', 66], ['Nefrologia', 54], ['Infectologia', 43]] },
    { id: 'subarea-2', tipo: 'subarea', tom: 'escuro', itens: [['Obstetrícia', 77], ['Pré-natal', 71], ['Ginecologia', 58], ['Oncologia', 39]] },
    { id: 'erro-1', tipo: 'erro', tom: 'claro', questao: 37, area: 'Cirurgia', letra: 'C' },
    { id: 'erro-2', tipo: 'erro', tom: 'claro', questao: 52, area: 'Pediatria', letra: 'A' },
    { id: 'padrao-1', tipo: 'padrao', tom: 'escuro', itens: [[42, 'Interpretação do caso'], [33, 'Conduta'], [25, 'Diagnóstico diferencial']] },
    { id: 'padrao-2', tipo: 'padrao', tom: 'escuro', itens: [[46, 'Interpretação do caso'], [31, 'Conduta'], [23, 'Diagnóstico diferencial']] },
    { id: 'gabarito-1', tipo: 'gabarito', tom: 'escuro', errada: 'B', certa: 'D' },
    { id: 'gabarito-2', tipo: 'gabarito', tom: 'claro', errada: 'B', certa: 'A' },
    { id: 'prio-1', tipo: 'prioridade', tom: 'azul', nivel: 1, area: 'Preventiva e Saúde Coletiva' },
    { id: 'prio-2', tipo: 'prioridade', tom: 'verde', nivel: 2, area: 'Ginecologia e Obstetrícia' },
    { id: 'crono-1', tipo: 'cronometro', tom: 'escuro', segundos: 10032, gasto: 0.38 },
    { id: 'crono-2', tipo: 'cronometro', tom: 'escuro', segundos: 7120, gasto: 0.56 },
  ];

  const ORDEM_CHECK = Object.keys(CAPAS);

  // Desktop: 5 colunas de 4 espaços, alternando direção. Um par [a, b] empilha dois cards curtos.
  // A coluna 2 corre na faixa livre entre a linha de corte e o formulário: leva os dois anéis,
  // a meio ciclo um do outro, para sempre haver um à vista (a fase 0.875 centraliza o 73%).
  const COLUNAS = [
    { dur: 55, dir: -1, fase: 0.3, slots: ['capa-cir-2', 'subarea-2', 'capa-cm-2', ['crono-2', 'erro-2']] },
    { dur: 47, dir: 1, fase: 0.875, slots: ['capa-geral', 'anel-1', 'capa-ped', 'anel-2'] },
    { dur: 58, dir: -1, fase: 0.55, slots: ['capa-go', 'padrao-1', 'capa-prev', ['erro-1', 'prio-2']] },
    { dur: 50, dir: 1, fase: 0.15, slots: ['capa-cir', 'gabarito-1', 'capa-cm', 'subarea-1'] },
    { dur: 53, dir: -1, fase: 0.7, slots: ['capa-ped-2', 'padrao-2', 'capa-go-2', ['prio-1', 'crono-1']] },
  ];

  /* ------------------------------------------------------------------------
     Ícones (SVG inline, traço)
     ------------------------------------------------------------------------ */
  const svg = (d, extra = '') => `<svg viewBox="0 0 24 24" aria-hidden="true"${extra}>${d}</svg>`;
  const ICONE = {
    check: svg('<path d="M5 12.5l4.2 4.2L19 7"/>'),
    x: svg('<path d="M7 7l10 10M17 7L7 17"/>'),
    alerta: svg('<path d="M12 4.5l8.5 15h-17z"/><path d="M12 10.5v3.5M12 16.8v.01"/>'),
    relogio: svg('<circle cx="12" cy="13.5" r="7.5"/><path d="M12 10v3.5l2.3 2.3M9.5 3h5"/>'),
    chevron: svg('<path d="M6 15l6-6 6 6"/>'),
    diagonal: svg('<path d="M7.5 16.5l9-9M9.5 7.5h7v7"/>'),
    erroCampo: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.4v.01"/>'),
  };

  /* ------------------------------------------------------------------------
     Parede · render
     ------------------------------------------------------------------------ */
  const porId = new Map(CARDS.map((c) => [c.id, c]));
  const faixaDe = (v) => (v >= 70 ? 'ok' : v >= 50 ? 'atencao' : 'prioridade');
  const doisDigitos = (n) => String(n).padStart(2, '0');
  const relogio = (s) => `${doisDigitos(Math.floor(s / 3600))}:${doisDigitos(Math.floor((s % 3600) / 60))}:${doisDigitos(s % 60)}`;
  const angulos = (v) => [Math.min(v, 50) / 50 * 180, Math.max(v - 50, 0) / 50 * 180];

  const RENDER = {
    capa: (c) => {
      const k = CAPAS[c.area];
      const img = (l) => `assets/img/capa-${k.foto}-${l}.webp`;
      const foto = k.foto
        ? `<img class="capa__foto" loading="lazy" decoding="async" alt="" src="${img(600)}" srcset="${img(600)} 600w, ${img(900)} 900w" sizes="${TAMANHOS_CAPA}"${k.zoom ? ` style="--zoom:${k.zoom};--foco:${k.foco}"` : ''}>`
        : '';
      const tinta = k.foto ? ` capa--foto tag-${k.tag} marca-${k.marca} titulo-${k.titulo}` : '';
      return `
      <div class="card capa tom-${k.tom}${tinta}" data-area="${c.area}">
        ${foto}
        <div class="capa__topo">
          <span class="capa__tag">Padrão INEP</span>
          <span class="capa__cel"><i class="simbolo"></i><span class="capa__check">${ICONE.check}</span></span>
          <i class="cruz"></i>
        </div>
        <div class="capa__corpo">
          ${c.extra ? `<span class="capa__pill">${c.extra}</span>` : ''}
          <p class="capa__nome" style="--fs:${c.fs}em">${c.nome || c.area}</p>
        </div>
      </div>`;
    },

    anel: (c) => {
      const [a1, a2] = angulos(c.valor);
      return `
      <div class="card ui anel tom-${c.tom} faixa-${faixaDe(c.valor)}" data-anel data-valor="${c.valor}">
        <div class="ui__topo"><i class="simbolo"></i><span>${c.titulo}</span></div>
        <div class="anel__ring">
          <span class="anel__trilho"></span>
          <span class="anel__meia anel__meia--d"><span class="anel__arco" style="transform:rotate(${a1}deg)"></span></span>
          <span class="anel__meia anel__meia--e"><span class="anel__arco" style="transform:rotate(${a2}deg)"></span></span>
          <span class="anel__centro"><b class="anel__num">${c.valor}%</b><span class="anel__legenda">de acertos</span></span>
        </div>
        <div class="anel__rodape"><span>${c.rodape}</span><span class="selo">${ICONE.check}${c.valor >= 70 ? 'satisfatório' : 'atenção'}</span></div>
      </div>`;
    },

    subarea: (c) => `
      <div class="card ui subarea tom-${c.tom}">
        <p class="ui__titulo">Como você foi em cada área?</p>
        <ul class="subarea__lista">
          ${c.itens.map(([nome, v]) => `
            <li class="subarea__item faixa-${faixaDe(v)}">
              <span>${nome}</span><span class="subarea__pct">${v}%</span>
              <span class="barra"><span style="transform:scaleX(${v / 100})"></span></span>
            </li>`).join('')}
        </ul>
        <ul class="legenda">
          <li class="faixa-ok">≥ 70% satisfatório</li>
          <li class="faixa-atencao">50 a 69% atenção</li>
          <li class="faixa-prioridade">&lt; 50% prioridade</li>
        </ul>
      </div>`,

    erro: (c) => `
      <div class="card ui erro tom-${c.tom}">
        <span class="selo">${ICONE.alerta}Confiança alta</span>
        <p class="erro__q">Questão ${c.questao} · ${c.area}</p>
        <p class="erro__resp"><span class="letra">${c.letra}</span><span>Você respondeu ${c.letra}</span>${ICONE.x.replace('<svg', '<svg class="erro__x"')}</p>
      </div>`,

    padrao: (c) => `
      <div class="card ui padrao tom-${c.tom}">
        <p class="ui__titulo">Como você está errando?</p>
        <div class="segmentos">
          <span class="seg-a" style="flex:${c.itens[0][0]}"></span>
          <span class="seg-b" style="flex:${c.itens[1][0]}"></span>
          <span class="seg-c" style="flex:${c.itens[2][0]}"></span>
        </div>
        <ul class="padrao__lista">
          ${c.itens.map(([v, tipo], i) => `<li><b>${v}%</b><span style="--dot:var(${['--k-strong', '--c-sky', '--c-green'][i]})">${tipo}</span></li>`).join('')}
        </ul>
      </div>`,

    gabarito: (c) => `
      <div class="card ui gabarito tom-${c.tom}">
        <div class="gab__ops">
          ${['A', 'B', 'C', 'D'].map((l, i) => {
            const estado = l === c.errada ? ' gab__op--errada' : l === c.certa ? ' gab__op--certa' : '';
            const marca = l === c.errada ? ICONE.x : l === c.certa ? ICONE.check : '';
            return `<div class="gab__op${estado}"><span class="letra">${l}</span><span class="falso" style="width:${[62, 48, 70, 54][i]}%"></span>${marca.replace('<svg', '<svg class="gab__marca"')}</div>`;
          }).join('')}
        </div>
        <div class="gab__acc">
          <p class="gab__acc-topo"><span>Por que a ${c.errada} está errada?</span>${ICONE.chevron}</p>
          <span class="falso" style="width:100%"></span>
          <span class="falso" style="width:92%"></span>
          <span class="falso" style="width:64%"></span>
        </div>
      </div>`,

    prioridade: (c) => `
      <div class="card ui prio tom-${c.tom}">
        <div class="prio__topo"><span class="selo">Prioridade ${c.nivel}</span><span class="prio__seta">${ICONE.diagonal}</span></div>
        <p class="prio__area">${c.area}</p>
      </div>`,

    cronometro: (c) => `
      <div class="card ui crono tom-${c.tom}">
        <div class="crono__topo">${ICONE.relogio}<span class="crono__vivo"></span></div>
        <div>
          <p class="crono__tempo" data-crono="${c.segundos}">${relogio(c.segundos)}</p>
          <p class="crono__rotulo">tempo de prova restante</p>
        </div>
        <span class="barra"><span style="transform:scaleX(${c.gasto})"></span></span>
      </div>`,
  };

  const renderCard = (id) => {
    const c = porId.get(id);
    return c ? RENDER[c.tipo](c) : '';
  };

  const renderSlot = (slot) => `<div class="slot">${(Array.isArray(slot) ? slot : [slot]).map(renderCard).join('')}</div>`;

  /* ------------------------------------------------------------------------
     Parede · movimento (só transform)
     ------------------------------------------------------------------------ */
  const reduzMovimento = matchMedia('(prefers-reduced-motion: reduce)');
  const modoMobile = matchMedia('(max-width: 899px)');

  const parede = document.querySelector('.parede');
  const plano = document.querySelector('[data-parede]');

  const motor = {
    faixas: [],
    mult: 1,
    alvo: 1,
    suavidade: 2.2,
    rodando: false,
    ultimo: 0,
    raf: 0,
  };

  function posicionar(f) {
    f.trilho.style.transform = f.eixo === 'y'
      ? `translate3d(0, ${f.off.toFixed(2)}px, 0)`
      : `translate3d(${f.off.toFixed(2)}px, 0, 0)`;
  }

  function medir(reiniciar) {
    for (const f of motor.faixas) {
      const a = f.trilho.children[0];
      const b = f.trilho.children[f.n];
      const len = f.eixo === 'y' ? b.offsetTop - a.offsetTop : b.offsetLeft - a.offsetLeft;
      f.off = reiniciar || !f.len ? -len * f.fase : (f.off / f.len) * len;
      f.len = len;
      posicionar(f);
    }
  }

  function montarParede() {
    // Parede solta (desktop): o plano vai para a direita e a 1ª coluna passa a correr na faixa
    // livre entre o texto e o formulário, então a coluna dos anéis vem para o começo.
    // No mobile são as mesmas colunas, menores, como no Reservatório.
    const comCorte = document.documentElement.classList.contains('com-corte');
    const def = modoMobile.matches || comCorte ? COLUNAS : [...COLUNAS.slice(1), COLUNAS[0]];
    plano.textContent = '';
    plano.style.transform = '';

    motor.faixas = def.map((f) => {
      const faixa = document.createElement('div');
      faixa.className = 'faixa';
      faixa.style.setProperty('--n', f.slots.length);
      const trilho = document.createElement('div');
      trilho.className = 'faixa__trilho';
      const html = f.slots.map(renderSlot).join('');
      trilho.innerHTML = html + html; // duplicado: loop sem emenda
      faixa.append(trilho);
      plano.append(faixa);
      return { trilho, n: f.slots.length, dur: f.dur, dir: f.dir, fase: f.fase, eixo: 'y', len: 0, off: 0 };
    });

    // Atraso do check por simulado: as 6 áreas entram em sequência, cópias juntas
    plano.querySelectorAll('.capa').forEach((c) => c.style.setProperty('--i', ORDEM_CHECK.indexOf(c.dataset.area)));
    medir(true);
    priorizarFotos();
    // O Safari roda o script antes de aplicar o CSS: as colunas nascem com outro tamanho.
    // Remede sempre que o tamanho real mudar (CSS, fontes, rotação da tela).
    observarTamanho.disconnect();
    motor.faixas.forEach((f) => observarTamanho.observe(f.trilho));
  }

  const observarTamanho = new ResizeObserver(() => { medir(false); });

  // Todas as fotos nascem com loading="lazy"; as que já aparecem na parede passam a eager
  function priorizarFotos() {
    const pr = parede.getBoundingClientRect();
    plano.querySelectorAll('.capa__foto').forEach((img) => {
      const r = img.getBoundingClientRect();
      if (r.right > pr.left && r.left < Math.min(pr.right, innerWidth) && r.bottom > Math.max(pr.top, 0) && r.top < Math.min(pr.bottom, innerHeight)) {
        img.loading = 'eager';
      }
    });
  }

  // Foto que não existe em assets/img: a capa volta a ser só tipográfica, sem quebrar nada
  plano.addEventListener('error', (e) => {
    const img = e.target;
    if (!(img instanceof HTMLImageElement)) return;
    img.closest('.capa')?.classList.remove('capa--foto');
    img.remove();
  }, true);

  function quadro() {
    // Sempre performance.now(): o Safari entrega o tempo do rAF em outra base, e um dt
    // negativo jogava as colunas para fora do conteúdo (parede vazia por alguns segundos)
    const agora = performance.now();
    const dt = Math.min(Math.max((agora - motor.ultimo) / 1000, 0), 0.064);
    motor.ultimo = agora;
    motor.mult += (motor.alvo - motor.mult) * (1 - Math.exp(-dt * motor.suavidade));

    for (const f of motor.faixas) {
      if (!f.len) continue;
      f.off += f.dir * (f.len / f.dur) * motor.mult * dt;
      f.off = -(((-f.off % f.len) + f.len) % f.len);   // sempre em (-len, 0]
      posicionar(f);
    }

    motor.raf = requestAnimationFrame(quadro);
  }

  function iniciar() {
    if (motor.rodando || reduzMovimento.matches || document.hidden) return;
    motor.rodando = true;
    motor.ultimo = performance.now();
    motor.raf = requestAnimationFrame(quadro);
  }

  function parar() {
    cancelAnimationFrame(motor.raf);
    motor.rodando = false;
  }

  function velocidade(alvo, suavidade = 2.2) {
    motor.alvo = alvo;
    motor.suavidade = suavidade;
  }

  // Cronômetros da parede contam de verdade (texto, não animação)
  setInterval(() => {
    if (document.hidden || reduzMovimento.matches) return;
    plano.querySelectorAll('[data-crono]').forEach((el) => {
      const s = Math.max(0, Number(el.dataset.crono) - 1);
      el.dataset.crono = s;
      el.textContent = relogio(s);
    });
  }, 1000);

  // Anel: anima de 0 até o valor girando as duas metades
  function animarAnel(card) {
    const valor = Number(card.dataset.valor);
    const [arcoD, arcoE] = card.querySelectorAll('.anel__arco');
    const num = card.querySelector('.anel__num');
    const inicio = performance.now();
    const duracao = 1300;
    const passo = (t) => {
      const p = Math.min((t - inicio) / duracao, 1);
      const atual = valor * (1 - Math.pow(1 - p, 3));
      const [a1, a2] = angulos(atual);
      arcoD.style.transform = `rotate(${a1}deg)`;
      arcoE.style.transform = `rotate(${a2}deg)`;
      num.textContent = `${Math.round(atual)}%`;
      if (p < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  }

  // Mira o anel com a maior área visível: dentro do recorte da parede e da tela,
  // descontada a parte escondida atrás do card do formulário (ou da gaveta).
  function anelMaisVisivel() {
    const ret = (r) => ({ l: r.left, t: r.top, r: r.right, b: r.bottom });
    const cruzar = (a, b) => ({ l: Math.max(a.l, b.l), t: Math.max(a.t, b.t), r: Math.min(a.r, b.r), b: Math.min(a.b, b.b) });
    const area = (a) => Math.max(0, a.r - a.l) * Math.max(0, a.b - a.t);
    const janela = cruzar(ret(parede.getBoundingClientRect()), { l: 0, t: 0, r: innerWidth, b: innerHeight });
    const formulario = ret(cartao.getBoundingClientRect());
    let melhor = null;
    let maior = 0;
    plano.querySelectorAll('[data-anel]').forEach((card) => {
      const r = ret(card.querySelector('.anel__ring').getBoundingClientRect());
      const naTela = cruzar(r, janela);
      const visivel = area(naTela) - area(cruzar(naTela, formulario));
      if (visivel > maior) { maior = visivel; melhor = card; }
    });
    return melhor;
  }

  /* ------------------------------------------------------------------------
     Formulário
     ------------------------------------------------------------------------ */
  const lead = document.querySelector('[data-lead]');
  const cartao = lead.querySelector('.lead__card');
  const form = lead.querySelector('[data-form]');
  const passoNum = lead.querySelector('[data-passo-num]');
  const botaoVoltar = lead.querySelector('[data-voltar]');
  const botaoEnviar = lead.querySelector('[data-enviar]');
  const falha = lead.querySelector('[data-falha]');
  const falhaTexto = lead.querySelector('[data-falha-texto]');
  const botaoTentar = lead.querySelector('[data-tentar]');
  const campos = { nome: form.elements.nome, telefone: form.elements.telefone, email: form.elements.email };
  const perguntas = [...form.querySelectorAll('[data-pergunta]')];

  let passoAtual = 1;
  let enviando = false;
  let ultimoAnel = -Infinity;

  const somenteDigitos = (v) => v.replace(/\D/g, '');

  function mascaraTelefone(v) {
    const d = somenteDigitos(v).slice(0, 11);
    if (!d) return '';
    if (d.length < 3) return `(${d}`;
    if (d.length < 8) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  }

  function mensagemCampo(nome) {
    const v = campos[nome].value.trim();
    if (nome === 'nome') return v.length >= 2 && /\p{L}/u.test(v) ? '' : MICROCOPY.nomeVazio;
    if (nome === 'telefone') {
      const d = somenteDigitos(v);
      if (!d) return MICROCOPY.telefoneVazio;
      return d.length === 11 && Number(d.slice(0, 2)) >= 11 && d[2] === '9' ? '' : MICROCOPY.telefoneInvalido;
    }
    if (nome === 'email') {
      if (!v) return MICROCOPY.emailVazio;
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : MICROCOPY.emailInvalido;
    }
    return '';
  }

  function mostrarErro(alvo, msg, input) {
    alvo.classList.toggle('is-erro', Boolean(msg));
    const p = alvo.querySelector('[data-erro]');
    p.innerHTML = msg ? `${ICONE.erroCampo}<span>${msg}</span>` : '';
    if (input) input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  }

  function validarCampo(nome) {
    const msg = mensagemCampo(nome);
    mostrarErro(campos[nome].closest('[data-campo]'), msg, campos[nome]);
    return !msg;
  }

  function validarPasso1() {
    const invalidos = Object.keys(campos).filter((n) => !validarCampo(n));
    if (invalidos.length) campos[invalidos[0]].focus();
    return invalidos.length === 0;
  }

  function validarPergunta(fs) {
    const ok = Boolean(fs.querySelector('input:checked'));
    mostrarErro(fs, ok ? '' : MICROCOPY.escolha);
    return ok;
  }

  function validarPasso2() {
    const invalidas = perguntas.filter((fs) => !validarPergunta(fs));
    if (invalidas.length) {
      invalidas[0].querySelector('input').focus();
      invalidas[0].scrollIntoView({ block: 'nearest', behavior: reduzMovimento.matches ? 'auto' : 'smooth' });
    }
    return invalidas.length === 0;
  }

  Object.entries(campos).forEach(([nome, input]) => {
    input.addEventListener('input', () => {
      if (nome === 'telefone') input.value = mascaraTelefone(input.value);
      if (input.closest('[data-campo]').classList.contains('is-erro')) validarCampo(nome);
    });
    input.addEventListener('blur', () => {
      if (input.value.trim()) validarCampo(nome);
    });
  });

  perguntas.forEach((fs) => fs.addEventListener('change', () => validarPergunta(fs)));

  function tituloDoPasso(n) {
    return form.querySelector(`[data-passo="${n}"] [tabindex="-1"]`);
  }

  function irPara(n) {
    const atual = form.querySelector('[data-passo]:not([hidden])');
    const proximo = form.querySelector(`[data-passo="${n}"]`);
    if (!proximo || atual === proximo) return;
    passoAtual = n;

    lead.classList.toggle('is-passo-2', n === 2);
    lead.classList.toggle('is-sucesso', n === 3);
    passoNum.textContent = String(Math.min(n, 2)).padStart(2, '0');
    botaoVoltar.hidden = n !== 2;
    lead.setAttribute('aria-labelledby', tituloDoPasso(n).id);

    const trocar = () => {
      atual.hidden = true;
      atual.classList.remove('is-saindo');
      proximo.hidden = false;
      proximo.classList.add('is-entrando');
      void proximo.offsetWidth;
      proximo.classList.remove('is-entrando');
      cartao.scrollTop = 0;
      tituloDoPasso(n).focus({ preventScroll: true });
    };

    if (reduzMovimento.matches) { trocar(); return; }
    atual.classList.add('is-saindo');
    setTimeout(trocar, TEMPO_TROCA_PASSO);
  }

  botaoVoltar.addEventListener('click', () => irPara(1));

  function lerUtms() {
    const utms = {};
    new URLSearchParams(location.search).forEach((v, k) => {
      if (k.toLowerCase().startsWith('utm_')) utms[k] = v;
    });
    return utms;
  }

  function montarPayload() {
    const respostas = {};
    const respostasTexto = [];
    perguntas.forEach((fs) => {
      const marcada = fs.querySelector('input:checked');
      const pergunta = fs.querySelector('legend > span:last-child').textContent.trim();
      respostas[fs.dataset.pergunta] = marcada ? marcada.value : null;
      respostasTexto.push({ pergunta, resposta: marcada ? marcada.value : null });
    });
    return {
      nome: campos.nome.value.trim(),
      telefone: campos.telefone.value,
      telefone_digitos: somenteDigitos(campos.telefone.value),
      email: campos.email.value.trim().toLowerCase(),
      respostas,
      respostas_texto: respostasTexto,
      utms: lerUtms(),
      url: location.href,
      data: new Date().toISOString(),
    };
  }

  function urlDestino() {
    const destino = new URL(REDIRECT_URL);
    Object.entries(lerUtms()).forEach(([k, v]) => {
      if (!destino.searchParams.has(k)) destino.searchParams.set(k, v);
    });
    return destino.toString();
  }

  function dispararLead(dados) {
    try {
      if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({ event: 'Lead', lead_origem: 'lp-simulados-medtwins', prova_inep: dados.respostas.prova_inep });
      }
    } catch (e) { /* rastreio nunca bloqueia o fluxo */ }
    try {
      if (typeof window.fbq === 'function') window.fbq('track', 'Lead', { content_name: 'Simulados MedTwins' });
    } catch (e) { /* idem */ }
  }

  function mostrarFalha() {
    falhaTexto.textContent = MICROCOPY.falhaRede;
    botaoTentar.textContent = MICROCOPY.tentarDeNovo;
    falha.hidden = false;
  }

  const espera = (ms) => new Promise((r) => setTimeout(r, ms));

  async function enviar() {
    if (enviando) return;
    enviando = true;
    falha.hidden = true;
    botaoEnviar.classList.add('is-enviando');
    botaoEnviar.setAttribute('aria-busy', 'true');
    const dados = montarPayload();

    try {
      if (!WEBHOOK_URL) {
        console.info('[MedTwins] WEBHOOK_URL vazia. Lead que seria enviado:', dados);
        await espera(600);
      } else {
        const ctrl = new AbortController();
        const relogioEnvio = setTimeout(() => ctrl.abort(), TIMEOUT_ENVIO);
        const resposta = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados),
          signal: ctrl.signal,
          keepalive: true,
        });
        clearTimeout(relogioEnvio);
        if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
      }
      sucesso(dados);
    } catch (erro) {
      console.error('[MedTwins] Falha no envio do lead:', erro);
      mostrarFalha();
      botaoTentar.focus({ preventScroll: true });
      cartao.scrollTo({ top: cartao.scrollHeight, behavior: reduzMovimento.matches ? 'auto' : 'smooth' });
    } finally {
      enviando = false;
      botaoEnviar.classList.remove('is-enviando');
      botaoEnviar.removeAttribute('aria-busy');
    }
  }

  botaoTentar.addEventListener('click', enviar);

  function sucesso(dados) {
    dispararLead(dados);
    lead.style.setProperty('--redirect-ms', `${TEMPO_REDIRECIONAR}ms`);
    irPara(3);

    if (!reduzMovimento.matches) {
      velocidade(7, 9);
      setTimeout(() => velocidade(1, 1.6), TEMPO_ACELERAR);
    }
    setTimeout(() => parede.classList.add('is-liberada'), reduzMovimento.matches ? 0 : 260);
    setTimeout(() => {
      // No WordPress, sai da LP incorporada ao seguir para o cronograma.
      try {
        window.top.location.assign(urlDestino());
      } catch (e) {
        window.location.assign(urlDestino());
      }
    }, TEMPO_REDIRECIONAR);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (passoAtual === 1 && validarPasso1()) irPara(2);
    else if (passoAtual === 2 && validarPasso2()) enviar();
  });

  // A página "presta atenção": colunas desaceleram com o foco no formulário
  form.addEventListener('focusin', () => {
    if (passoAtual !== 3) velocidade(0.35, 1.8);
  });

  form.addEventListener('focusout', (e) => {
    if (form.contains(e.relatedTarget)) return;
    if (passoAtual !== 3) velocidade(1, 1.4);
  });

  campos.nome.addEventListener('focus', () => {
    if (reduzMovimento.matches || performance.now() - ultimoAnel < 6000) return;
    const anel = anelMaisVisivel();
    if (anel) { ultimoAnel = performance.now(); animarAnel(anel); }
  });

  /* ------------------------------------------------------------------------
     Gaveta (mobile)
     ------------------------------------------------------------------------ */
  const botaoAbrir = document.querySelector('[data-abrir]');
  const botaoFechar = lead.querySelector('[data-fechar]');
  const veu = document.querySelector('[data-veu]');
  let gavetaAberta = false;

  function aplicarModo() {
    if (modoMobile.matches) {
      lead.setAttribute('role', 'dialog');
      lead.setAttribute('aria-modal', 'true');
      lead.inert = !gavetaAberta;
    } else {
      fecharGaveta(false);
      lead.removeAttribute('role');
      lead.removeAttribute('aria-modal');
      lead.inert = false;
    }
  }

  function abrirGaveta() {
    gavetaAberta = true;
    lead.inert = false;
    veu.hidden = false;
    requestAnimationFrame(() => {
      veu.classList.add('is-ativo');
      lead.classList.add('is-aberto');
    });
    document.documentElement.classList.add('trava-rolagem');
    botaoAbrir.setAttribute('aria-expanded', 'true');
    setTimeout(() => tituloDoPasso(passoAtual).focus({ preventScroll: true }), 80);
  }

  function fecharGaveta(devolverFoco = true) {
    if (!gavetaAberta) return;
    gavetaAberta = false;
    lead.classList.remove('is-aberto');
    veu.classList.remove('is-ativo');
    setTimeout(() => { if (!gavetaAberta) veu.hidden = true; }, 320);
    document.documentElement.classList.remove('trava-rolagem');
    botaoAbrir.setAttribute('aria-expanded', 'false');
    if (modoMobile.matches) lead.inert = true;
    if (devolverFoco) botaoAbrir.focus();
  }

  botaoAbrir.addEventListener('click', abrirGaveta);
  botaoFechar.addEventListener('click', () => fecharGaveta());
  veu.addEventListener('click', () => fecharGaveta());

  document.addEventListener('keydown', (e) => {
    if (!gavetaAberta) return;
    if (e.key === 'Escape') { fecharGaveta(); return; }
    if (e.key !== 'Tab') return;
    const focaveis = [...lead.querySelectorAll('button, input, [tabindex="0"]')]
      .filter((el) => !el.disabled && el.offsetParent !== null);
    if (!focaveis.length) return;
    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];
    if (e.shiftKey && (document.activeElement === primeiro || !lead.contains(document.activeElement))) {
      e.preventDefault(); ultimo.focus();
    } else if (!e.shiftKey && document.activeElement === ultimo) {
      e.preventDefault(); primeiro.focus();
    }
  });

  /* ------------------------------------------------------------------------
     Início
     ------------------------------------------------------------------------ */
  montarParede();
  aplicarModo();
  iniciar();
  requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.add('gaveta-pronta')));

  document.addEventListener('visibilitychange', () => {
    document.documentElement.classList.toggle('aba-oculta', document.hidden);
    if (document.hidden) parar(); else iniciar();
  });

  reduzMovimento.addEventListener('change', () => {
    if (reduzMovimento.matches) { parar(); plano.style.transform = ''; } else iniciar();
  });

  modoMobile.addEventListener('change', () => {
    montarParede();
    aplicarModo();
  });

  let esperaResize = 0;
  addEventListener('resize', () => {
    clearTimeout(esperaResize);
    esperaResize = setTimeout(() => { medir(false); }, 120);
  });

})();
