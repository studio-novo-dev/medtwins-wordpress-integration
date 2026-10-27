// 03 · Identificação: a dúvida da semana como uma pesquisa que não chega a lugar nenhum.
// A janela já nasce com a primeira busca (a pergunta da copy) escrita no HTML. Com JS,
// apaga e digita as buscas seguintes; a cada uma os resultados saem, entram outros
// (que se contradizem) e os contadores de abas e resumos salvos sobem. Só anda
// enquanto a seção aparece. Com movimento reduzido, fica parada na primeira busca.
// Tudo aqui é ilustrativo e está com aria-hidden no HTML.

const REDUZIDO = matchMedia('(prefers-reduced-motion: reduce)');

const BUSCAS = [
  {
    // A primeira repete o que está no HTML, para o laço voltar a ela
    consulta: 'O que eu realmente preciso estudar agora?',
    meta: 'Aproximadamente 2.140.000 resultados (0,38 s)',
    abas: 23,
    salvos: 12,
    resultados: [
      ['pdf', 'Material compartilhado · PDF · 214 páginas', 'Os 50 temas que mais caem no Revalida (lista completa)', 'Cardiologia, infectologia, pediatria, obstetrícia, cirurgia, preventiva, nefrologia, endocrinologia, reumatologia…'],
      ['forum', 'Fórum de estudantes · 86 respostas', 'Não tem atalho: estude tudo, qualquer tema pode cair', 'O ideal é revisar o conteúdo inteiro de clínica antes de começar as questões. Depois, revisar de novo…'],
      ['video', 'Canal de revisão · Vídeo · 6h12min', 'Revisão completa de clínica médica em uma única aula', 'Assista até o fim. Nos primeiros 40 minutos, cardiologia; depois, pneumologia, nefrologia e…'],
    ],
  },
  {
    consulta: 'temas que mais caem no revalida',
    meta: 'Aproximadamente 980.000 resultados (0,41 s)',
    abas: 31,
    salvos: 15,
    resultados: [
      ['video', 'Canal de revisão · Vídeo · 48min', 'Top 10 temas da prova teórica', 'Os dez assuntos que mais apareceram nas últimas edições, segundo a nossa contagem…'],
      ['pdf', 'Material compartilhado · PDF · 96 páginas', 'Top 30 temas: o ranking definitivo', 'Lista atualizada, diferente da anterior. Comece pelo tema 1 e siga a ordem até o fim…'],
      ['blog', 'Blog de medicina · Leitura de 14 min', 'Esqueça os rankings: estude por grandes áreas', 'Listas de temas enganam. Organize a semana por especialidade e revise tudo…'],
    ],
  },
  {
    consulta: 'cronograma de estudos revalida',
    meta: 'Aproximadamente 1.320.000 resultados (0,36 s)',
    abas: 38,
    salvos: 19,
    resultados: [
      ['planilha', 'Planilha compartilhada · 1.380 linhas', 'Cronograma de 12 semanas (pronto para copiar)', 'Segunda: cardiologia. Terça: cardiologia e nefrologia. Quarta: revisão de tudo da semana…'],
      ['forum', 'Fórum de estudantes · 142 respostas', 'Alguém passou seguindo cronograma pronto?', 'Comigo não funcionou. Acho que depende muito da pessoa e do tempo que ela tem…'],
      ['grupo', 'Grupo de estudos · 1.204 mensagens não lidas', 'Cronograma de 6 meses para quem trabalha', 'Arquivo enviado: cronograma_final_v3_agora_vai.pdf'],
    ],
  },
  {
    consulta: 'como decidir entre duas alternativas',
    meta: 'Aproximadamente 3.050.000 resultados (0,44 s)',
    abas: 46,
    salvos: 22,
    resultados: [
      ['video', 'Canal de revisão · Vídeo · 2h03min', 'Macetes para acertar quando ficar em dúvida', 'Na dúvida, escolha a alternativa mais completa. Ou a mais curta. Depende da banca…'],
      ['forum', 'Fórum de estudantes · 57 respostas', 'Errei entre B e D de novo. Alguém explica?', 'Também errei essa. O gabarito diz D, mas a explicação não ficou clara para mim…'],
      ['pdf', 'Material compartilhado · PDF · 340 páginas', 'Todas as condutas de clínica médica em tabelas', 'Decore as tabelas e a escolha fica automática na hora da prova…'],
    ],
  },
];

const TECLA = [38, 70];        // intervalo de cada letra (ms), com variação
const APAGA = 16;              // intervalo de cada letra apagada (ms)
const LEITURA = 4200;          // tempo com os resultados na tela (ms)
const PRIMEIRA = 2600;         // espera antes da primeira troca (ms)

const esperar = (ms) => new Promise((ok) => setTimeout(ok, ms));

export function iniciarIdentificacao() {
  const busca = document.querySelector('[data-busca]');
  if (!busca || REDUZIDO.matches) return;

  const texto = busca.querySelector('[data-busca-texto]');
  const meta = busca.querySelector('[data-busca-meta]');
  const lista = busca.querySelector('[data-busca-resultados]');
  const abas = busca.querySelector('[data-busca-abas]');
  const salvos = busca.querySelector('[data-busca-salvos]');

  // Pausa enquanto a seção está fora da tela (retoma de onde parou)
  let visivel = false;
  let acordar = null;
  new IntersectionObserver(([entrada]) => {
    visivel = entrada.isIntersecting;
    if (visivel && acordar) {
      acordar();
      acordar = null;
    }
  }, { threshold: 0.2 }).observe(busca);
  const aguardarVisivel = () => (visivel ? Promise.resolve() : new Promise((ok) => { acordar = ok; }));
  const passo = async (ms) => {
    await esperar(ms);
    await aguardarVisivel();
  };

  const icone = (nome) => `<svg viewBox="0 0 256 256"><use href="#i-${nome}"/></svg>`;
  const desenhar = (resultados) => resultados.map(([ic, fonte, titulo, trecho], i) => `
    <li class="resultado resultado--entra" style="--i: ${i}">
      <p class="resultado__fonte"><span class="resultado__icone">${icone(ic)}</span>${fonte}</p>
      <p class="resultado__titulo">${titulo}</p>
      <p class="resultado__trecho">${trecho}</p>
    </li>`).join('');

  const contar = (el, valor) => {
    if (el.textContent === String(valor)) return;
    el.textContent = valor;
    el.classList.remove('pulsa');
    void el.offsetWidth;
    el.classList.add('pulsa');
  };

  const trocar = async (b) => {
    busca.classList.add('busca--digitando');
    // apaga a busca anterior
    for (let n = texto.textContent.length; n >= 0; n -= 1) {
      texto.textContent = texto.textContent.slice(0, n);
      await passo(APAGA);
    }
    lista.classList.add('busca__resultados--saindo');
    // digita a nova
    for (const letra of b.consulta) {
      texto.textContent += letra;
      await passo(TECLA[0] + Math.random() * (TECLA[1] - TECLA[0]));
    }
    busca.classList.remove('busca--digitando');
    await passo(380);
    // novos resultados
    meta.textContent = b.meta;
    lista.innerHTML = desenhar(b.resultados);
    lista.classList.remove('busca__resultados--saindo');
    await passo(500);
    contar(abas, b.abas);
    await passo(160);
    contar(salvos, b.salvos);
  };

  (async () => {
    await aguardarVisivel();
    await passo(PRIMEIRA);
    for (let i = 1; ; i = (i + 1) % BUSCAS.length) {
      await trocar(BUSCAS[i]);
      await passo(LEITURA);
    }
  })();
}
