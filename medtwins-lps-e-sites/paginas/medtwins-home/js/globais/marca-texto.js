// Marca-texto: desenha a faixa verde uma única vez, quando a palavra entra
// uns 30% na tela. Só vale em títulos (display-1, 2 e 3); no texto corrido o
// <mark> é só ênfase em Geist 600, sem faixa. Sem JS ou com movimento reduzido, a faixa já vem pronta pelo CSS.
// Cada palavra ganha a própria faixa, então o traço continua certo quando o
// <mark> quebra de linha; as palavras se desenham em sequência, como um traço só.

const REDUZIDO = matchMedia('(prefers-reduced-motion: reduce)');
const DURACAO = 700;

// Curva do traço inteiro (início rápido, final suave): o tempo de cada palavra
// vem da inversa dessa curva, então a velocidade é contínua entre elas.
const tempoDoProgresso = (p) => 1 - Math.pow(1 - p, 1 / 4);

function dividir(marca) {
  const soTexto = [...marca.childNodes].every((no) => no.nodeType === Node.TEXT_NODE);
  const pedacos = soTexto ? marca.textContent.match(/\S+\s*/g) || [] : null;
  const frag = document.createDocumentFragment();
  if (pedacos) {
    // Espaços iniciais ficam fora para não abrir a faixa antes da primeira palavra
    const inicio = marca.textContent.match(/^\s*/)[0];
    if (inicio) frag.append(inicio);
    for (const pedaco of pedacos) {
      const span = document.createElement('span');
      span.className = 'marca__p';
      span.textContent = pedaco;
      frag.append(span);
    }
  } else {
    const span = document.createElement('span');
    span.className = 'marca__p';
    span.append(...marca.childNodes);
    frag.append(span);
  }
  marca.replaceChildren(frag);
  marca.classList.add('marca--animada');
}

// Quebra de linha entre duas palavras: a de cima fecha a linha, a de baixo abre a próxima
function marcarQuebras(palavras, caixas = palavras.map((p) => p.getBoundingClientRect())) {
  palavras.forEach((p, i) => {
    const quebra = i > 0 && Math.abs(caixas[i].top - caixas[i - 1].top) > 2;
    p.classList.toggle('marca__p--abre', quebra);
    palavras[i - 1]?.classList.toggle('marca__p--fecha', quebra);
  });
}

function desenhar(marca) {
  if (marca.classList.contains('marca--ativa')) return;
  const palavras = [...marca.querySelectorAll('.marca__p')];
  const caixas = palavras.map((p) => p.getBoundingClientRect());
  const larguras = caixas.map((c) => c.width);
  marcarQuebras(palavras, caixas);
  const total = larguras.reduce((a, b) => a + b, 0) || 1;
  if (palavras.length > 1) {
    let feito = 0;
    palavras.forEach((p, i) => {
      const t0 = tempoDoProgresso(feito / total);
      feito += larguras[i];
      const t1 = tempoDoProgresso(Math.min(feito / total, 1));
      p.style.setProperty('--marca-atraso', `${Math.round(t0 * DURACAO)}ms`);
      p.style.setProperty('--marca-dur', `${Math.max(Math.round((t1 - t0) * DURACAO), 60)}ms`);
      p.style.setProperty('--marca-ease', 'linear');
    });
  }
  marca.classList.add('marca--ativa');
}

// Para quem orquestra a própria entrada (ex.: o hero): marcas com data-marca-manual
// são preparadas aqui, mas só se desenham quando a seção chama esta função.
export function desenharMarca(marca) {
  if (marca?.classList.contains('marca--animada')) desenhar(marca);
}

export function iniciarMarcaTexto(raiz = document) {
  const marcas = [...raiz.querySelectorAll(':is(h1, h2, h3, .display-1, .display-2, .display-3, .destaque) mark.marca')];
  if (!marcas.length) return;

  if (REDUZIDO.matches || !('IntersectionObserver' in window)) {
    marcas.forEach((m) => m.classList.add('marca--estatica'));
    return;
  }

  const pendentes = new Set(marcas);
  const ativar = (marca) => {
    if (!pendentes.delete(marca)) return;
    observador.unobserve(marca);
    desenhar(marca);
  };

  // Linha de disparo a 70% da altura da tela
  const observador = new IntersectionObserver(
    (entradas) => entradas.forEach((e) => e.isIntersecting && ativar(e.target)),
    { rootMargin: '0px 0px -30% 0px' },
  );

  marcas.forEach((m) => {
    dividir(m);
    if (m.hasAttribute('data-marca-manual')) pendentes.delete(m);
    else observador.observe(m);
  });

  // A quebra das linhas muda com a largura da tela
  let espera = 0;
  addEventListener('resize', () => {
    clearTimeout(espera);
    espera = setTimeout(() => marcas.forEach((m) => marcarQuebras([...m.querySelectorAll('.marca__p')])), 150);
  });

  // Rede para o que o observador não vê: um salto de rolagem (âncora, URL) que passa
  // por cima da marca, e marcas no fim da página que nunca sobem até a linha de disparo
  let quadro = 0;
  const conferir = () => {
    quadro = 0;
    if (!pendentes.size) return removeEventListener('scroll', agendar);
    const fundo = scrollY + innerHeight >= document.documentElement.scrollHeight - 4;
    const linha = fundo ? innerHeight : innerHeight * 0.7;
    pendentes.forEach((m) => m.getBoundingClientRect().top < linha && ativar(m));
  };
  const agendar = () => {
    if (!quadro) quadro = requestAnimationFrame(conferir);
  };
  addEventListener('scroll', agendar, { passive: true });

  REDUZIDO.addEventListener('change', () => {
    if (REDUZIDO.matches) pendentes.forEach(ativar);
  });
}
