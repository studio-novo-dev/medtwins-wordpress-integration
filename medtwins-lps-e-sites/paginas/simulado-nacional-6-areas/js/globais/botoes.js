// Botões (porte da Home): prepara a microinteração do botão principal. O texto ganha um invólucro
// (.botao__texto) e cada botão recebe as distâncias do deslize em px: --deslize (quanto a
// caixa da seta anda até a outra ponta) e --texto-desloca (quanto o texto anda para o lado
// oposto). Remede quando o botão muda de tamanho. Sem JS, o hover fica só no fundo e na seta.

export function iniciarBotoes(raiz = document) {
  const botoes = [...raiz.querySelectorAll('.botao')].filter((b) => b.querySelector(':scope > .botao__caixa'));
  if (!botoes.length) return;

  botoes.forEach((botao) => {
    const texto = document.createElement('span');
    texto.className = 'botao__texto';
    [...botao.childNodes].forEach((no) => {
      if (no.nodeType === Node.ELEMENT_NODE && no.classList.contains('botao__caixa')) return;
      texto.append(no);
    });
    botao.prepend(texto);
    botao.classList.add('botao--movel');
  });

  const medir = (botao) => {
    const caixa = botao.querySelector(':scope > .botao__caixa');
    const cs = getComputedStyle(botao);
    const folga = parseFloat(cs.paddingRight);
    const esquerda = parseFloat(cs.paddingLeft);
    const vao = parseFloat(cs.columnGap) || 0;
    const largCaixa = caixa.offsetWidth;
    botao.style.setProperty('--deslize', `${botao.clientWidth - largCaixa - folga * 2}px`);
    botao.style.setProperty('--texto-desloca', `${largCaixa + vao - (esquerda - folga)}px`);
  };

  const obs = new ResizeObserver((entradas) => entradas.forEach((e) => medir(e.target)));
  botoes.forEach((b) => obs.observe(b));
  document.fonts?.ready.then(() => botoes.forEach(medir));
}
