import { tocarVideo, pausarVideo } from '../globais/videos.js?v=1.2.2';
// 06 · Primeira etapa
// - Questão interativa: o HTML já vem resolvido (B marcada e errada, D certa, trecho
//   grifado, comentário). Com JS a questão volta ao início e, enquanto aparece na tela,
//   uma resolução simulada roda sozinha: o relógio corre, B é marcada, "Responder" é
//   apertado, o trecho do enunciado é grifado e o comentário aparece; depois recomeça.
//   Se a pessoa clicar numa alternativa, a demonstração para de vez e a questão passa a
//   responder a ela. Com movimento reduzido não há demonstração: fica resolvida, e a
//   pessoa pode refazer e responder.
// - Recursos: os cards são duplicados (cópias com aria-hidden e inert) e a faixa anda
//   em laço (CSS, .recursos--vivo); para no hover, no foco e fora da tela. Os trechos
//   de vídeo da seção (cards e a aula ao lado da questão) só tocam enquanto aparecem.

const REDUZIDO = matchMedia('(prefers-reduced-motion: reduce)');
const CERTA = 'D';
const esperar = (ms) => new Promise((ok) => setTimeout(ok, ms));

export function iniciarPrimeiraEtapa() {
  iniciarQuestao();
  iniciarRecursos();
}

function iniciarQuestao() {
  const questao = document.querySelector('[data-questao]');
  if (!questao) return;
  const form = questao.querySelector('[data-questao-form]');
  const alternativas = [...questao.querySelectorAll('[data-alternativa]')];
  const responder = questao.querySelector('[data-questao-responder]');
  const refazer = questao.querySelector('[data-questao-refazer]');
  const veredito = questao.querySelector('[data-questao-veredito]');
  const tempo = questao.querySelector('[data-questao-tempo]');

  let segundos = 72;
  let relogio = 0;
  let demonstrando = !REDUZIDO.matches;

  const escolhida = () => form.querySelector('input:checked')?.value;
  const mostrarTempo = () => {
    tempo.textContent = `${String(Math.floor(segundos / 60)).padStart(2, '0')}:${String(segundos % 60).padStart(2, '0')}`;
  };
  const correr = (ligar) => {
    clearInterval(relogio);
    if (ligar) relogio = setInterval(() => { segundos += 1; mostrarTempo(); }, 1000);
  };

  const marcar = (letra) => {
    alternativas.forEach((alt) => {
      const input = alt.querySelector('input');
      input.checked = alt.dataset.alternativa === letra;
      alt.classList.toggle('alternativa--marcada', input.checked);
    });
    responder.disabled = !letra;
  };

  const zerar = () => {
    questao.classList.remove('questao--respondida', 'questao--revelada', 'questao--acertou');
    alternativas.forEach((alt) => alt.classList.remove('alternativa--certa', 'alternativa--errada'));
    marcar(null);
    alternativas.forEach((alt) => { alt.querySelector('input').disabled = false; });
    segundos = 72;
    mostrarTempo();
  };

  const avaliar = () => {
    const letra = escolhida();
    if (!letra) return;
    correr(false);
    const acertou = letra === CERTA;
    alternativas.forEach((alt) => {
      const l = alt.dataset.alternativa;
      alt.classList.toggle('alternativa--certa', l === CERTA);
      alt.classList.toggle('alternativa--errada', l === letra && !acertou);
      alt.querySelector('input').disabled = true;
    });
    veredito.textContent = acertou ? 'Você acertou: D' : `Você respondeu ${letra}`;
    questao.classList.toggle('questao--acertou', acertou);
    questao.classList.add('questao--respondida');
    // o grifo entra logo depois do resultado, para o olho ir do erro ao detalhe
    setTimeout(() => questao.classList.add('questao--revelada'), 350);
  };

  // ---------- Interação da pessoa ----------
  const assumir = () => {
    if (!demonstrando) return;
    demonstrando = false;
    if (questao.classList.contains('questao--respondida')) zerar();
  };

  form.addEventListener('pointerdown', assumir, { capture: true });
  form.addEventListener('keydown', assumir, { capture: true });
  form.addEventListener('change', (e) => {
    if (questao.classList.contains('questao--respondida')) return;
    marcar(e.target.value);
    correr(true);
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    avaliar();
  });
  refazer.addEventListener('click', () => {
    demonstrando = false;
    zerar();
    correr(true);
    alternativas[0].querySelector('input').focus({ preventScroll: true });
  });

  if (REDUZIDO.matches) return;

  // ---------- Demonstração ----------
  zerar();
  let visivel = false;
  let acordar = null;
  new IntersectionObserver(([entrada]) => {
    visivel = entrada.isIntersecting;
    if (!visivel) correr(false);
    if (visivel && acordar) { acordar(); acordar = null; }
  }, { threshold: 0.35 }).observe(questao);

  const passo = async (ms) => {
    await esperar(ms);
    while (!visivel) await new Promise((ok) => { acordar = ok; });
    return demonstrando;
  };

  (async () => {
    while (demonstrando) {
      if (!(await passo(0))) return;
      correr(true);
      if (!(await passo(2600))) return;
      marcar('B');
      if (!(await passo(1300))) return;
      responder.classList.add('apertado');
      await esperar(160);
      responder.classList.remove('apertado');
      avaliar();
      if (!(await passo(7000))) return;
      zerar();
      if (!(await passo(1400))) return;
    }
  })();
}

function iniciarRecursos() {
  const recursos = document.querySelector('[data-recursos]');
  if (!recursos) return;
  const janela = recursos.querySelector('.recursos__janela');
  const trilho = recursos.querySelector('[data-recursos-trilho]');

  // No toque (ou sem mouse) a faixa é deslizável pela pessoa, com pontos de posição;
  // o ticker automático fica para o desktop com mouse.
  const DESLIZAR = matchMedia('(hover: none), (max-width: 899px)').matches;
  if (DESLIZAR) {
    recursos.classList.add('recursos--deslizar');
    const pontos = [...recursos.querySelectorAll('[data-recursos-pontos] button')];
    const cards = [...trilho.children];
    // posição de rolagem que deixa o card alinhado à margem do título (último: encostado no fim)
    const borda = () => parseFloat(getComputedStyle(janela).scrollPaddingLeft) || 0;
    const alvo = (c) => Math.min(c.offsetLeft - borda(), janela.scrollWidth - janela.clientWidth);
    const marcar = () => {
      let perto = 0;
      cards.forEach((c, i) => { if (Math.abs(alvo(c) - janela.scrollLeft) < Math.abs(alvo(cards[perto]) - janela.scrollLeft)) perto = i; });
      pontos.forEach((p, i) => { p.classList.toggle('ativo', i === perto); p.setAttribute('aria-current', String(i === perto)); });
    };
    janela.addEventListener('scroll', () => requestAnimationFrame(marcar), { passive: true });
    marcar();

    // Os pontos levam ao card correspondente
    pontos.forEach((p, i) => p.addEventListener('click', () => {
      janela.scrollTo({ left: alvo(cards[i]), behavior: REDUZIDO.matches ? 'auto' : 'smooth' });
    }));

    // Arrastar com o mouse (simuladores e telas de toque com mouse); ao soltar, encaixa no card mais perto
    let inicioX = 0;
    let inicioScroll = 0;
    let arrastando = false;
    janela.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      arrastando = true;
      inicioX = e.clientX;
      inicioScroll = janela.scrollLeft;
    });
    addEventListener('pointermove', (e) => {
      if (!arrastando) return;
      if (Math.abs(e.clientX - inicioX) > 4) recursos.classList.add('recursos--arrastando');
      janela.scrollLeft = inicioScroll - (e.clientX - inicioX);
    });
    addEventListener('pointerup', () => {
      if (!arrastando) return;
      arrastando = false;
      recursos.classList.remove('recursos--arrastando');
      marcar();
      const ativo = pontos.findIndex((p) => p.classList.contains('ativo'));
      janela.scrollTo({ left: alvo(cards[Math.max(0, ativo)]), behavior: REDUZIDO.matches ? 'auto' : 'smooth' });
    });
  } else if (!REDUZIDO.matches) {
    [...trilho.children].forEach((card) => {
      const copia = card.cloneNode(true);
      copia.setAttribute('aria-hidden', 'true');
      copia.inert = true;
      trilho.append(copia);
    });
    recursos.classList.add('recursos--vivo');

    // Para fora da tela, no hover e com foco dentro
    let fora = true;
    let parado = false;
    const atualizar = () => recursos.classList.toggle('recursos--pausado', fora || parado);
    new IntersectionObserver(([e]) => { fora = !e.isIntersecting; atualizar(); }).observe(janela);
    janela.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { parado = true; atualizar(); } });
    janela.addEventListener('pointerleave', () => { parado = false; atualizar(); });
    janela.addEventListener('focusin', () => { parado = true; atualizar(); });
    janela.addEventListener('focusout', () => { parado = false; atualizar(); });
  }

  // Trechos: tocam só enquanto aparecem (com movimento reduzido, fica a capa)
  if (REDUZIDO.matches) return;
  const tocar = new IntersectionObserver((entradas) => {
    entradas.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) tocarVideo(target);
      else pausarVideo(target);
    });
  });
  document.querySelectorAll('#primeira-etapa [data-recurso-video]').forEach((video) => {
    video.muted = true;
    tocar.observe(video);
  });
}
