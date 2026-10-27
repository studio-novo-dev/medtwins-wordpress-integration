// Dados da simulação · tudo o que aparece dentro das telas e dos cards
// É desenho de produto (aria-hidden na página), sem promessa de resultado.
// Trocar aqui quando o cliente mandar a tela real, a distribuição por área e a
// questão comentada; o código das cenas só lê este arquivo.

// As cinco grandes áreas do INEP, na ordem das colunas da dobra 2
export const AREAS = [
  { id: 'cm', nome: 'Clínica Médica' },
  { id: 'cir', nome: 'Cirurgia' },
  { id: 'ped', nome: 'Pediatria' },
  { id: 'go', nome: 'Ginecologia e Obstetrícia' },
  { id: 'prev', nome: 'Medicina Preventiva' },
];

// As 100 questões, na ordem da prova (as áreas misturadas, 20 de cada).
// [área, acertou (1/0), conteúdo, resposta marcada, gabarito]
// Acertos por área: Clínica Médica 13, Cirurgia 12, Pediatria 15,
// Ginecologia e Obstetrícia 11, Medicina Preventiva 8 (59 no total).
const LISTA = [
  ['prev', 0, 'SUS', 'B', 'A'],                     // 1
  ['ped', 1, 'Imunizações', 'D', 'D'],             // 2
  ['ped', 1, 'Infecções na infância', 'D', 'D'],   // 3
  ['go', 1, 'Pré-natal', 'B', 'B'],               // 4
  ['go', 1, 'Obstetrícia', 'B', 'B'],             // 5
  ['prev', 0, 'Vigilância em saúde', 'C', 'B'],     // 6
  ['cir', 0, 'Vascular', 'C', 'B'],                // 7
  ['cm', 1, 'Nefrologia', 'D', 'D'],              // 8
  ['prev', 1, 'Saúde do trabalhador', 'B', 'B'],    // 9
  ['cm', 0, 'Nefrologia', 'A', 'C'],              // 10
  ['cm', 1, 'Nefrologia', 'D', 'D'],              // 11
  ['prev', 1, 'Vigilância em saúde', 'D', 'D'],     // 12
  ['cm', 1, 'Cardiologia', 'D', 'D'],             // 13
  ['go', 1, 'Ginecologia', 'C', 'C'],             // 14
  ['ped', 1, 'Crescimento', 'B', 'B'],             // 15
  ['ped', 1, 'Infecções na infância', 'C', 'C'],   // 16
  ['prev', 0, 'Epidemiologia', 'B', 'D'],           // 17
  ['ped', 1, 'Imunizações', 'C', 'C'],             // 18
  ['prev', 0, 'Epidemiologia', 'B', 'C'],           // 19
  ['cm', 1, 'Nefrologia', 'A', 'A'],              // 20
  ['cm', 0, 'Nefrologia', 'D', 'B'],              // 21
  ['prev', 0, 'Epidemiologia', 'D', 'A'],           // 22
  ['cir', 1, 'Trauma', 'B', 'B'],                  // 23
  ['cir', 1, 'Hérnias', 'C', 'C'],                 // 24
  ['cm', 0, 'Endocrinologia', 'D', 'A'],          // 25
  ['ped', 1, 'Imunizações', 'B', 'B'],             // 26
  ['go', 0, 'Pré-natal', 'B', 'D'],               // 27
  ['go', 1, 'Oncologia', 'B', 'B'],               // 28
  ['cm', 1, 'Cardiologia', 'B', 'B'],             // 29
  ['cir', 1, 'Abdome agudo', 'C', 'C'],            // 30
  ['ped', 1, 'Imunizações', 'D', 'D'],             // 31
  ['go', 0, 'Oncologia', 'D', 'A'],               // 32
  ['prev', 1, 'Epidemiologia', 'A', 'A'],           // 33
  ['ped', 1, 'Infecções na infância', 'C', 'C'],   // 34
  ['ped', 1, 'Imunizações', 'B', 'B'],             // 35
  ['cm', 1, 'Infectologia', 'D', 'D'],            // 36
  ['cm', 0, 'Infectologia', 'B', 'D'],            // 37
  ['cir', 1, 'Vascular', 'D', 'D'],                // 38
  ['ped', 1, 'Infecções na infância', 'B', 'B'],   // 39
  ['ped', 0, 'Imunizações', 'C', 'B'],             // 40
  ['go', 0, 'Ginecologia', 'B', 'A'],             // 41
  ['prev', 0, 'Saúde do trabalhador', 'C', 'D'],    // 42
  ['cir', 1, 'Vascular', 'C', 'C'],                // 43
  ['cir', 0, 'Vascular', 'B', 'C'],                // 44
  ['go', 1, 'Pré-natal', 'A', 'A'],               // 45
  ['cm', 1, 'Cardiologia', 'C', 'C'],             // 46
  ['cm', 1, 'Cardiologia', 'A', 'A'],             // 47
  ['go', 1, 'Obstetrícia', 'C', 'C'],             // 48
  ['ped', 0, 'Imunizações', 'B', 'D'],             // 49
  ['go', 0, 'Oncologia', 'B', 'A'],               // 50
  ['cm', 0, 'Cardiologia', 'C', 'B'],             // 51
  ['cm', 1, 'Nefrologia', 'C', 'C'],              // 52
  ['go', 0, 'Pré-natal', 'C', 'D'],               // 53
  ['cir', 1, 'Vascular', 'C', 'C'],                // 54
  ['go', 0, 'Ginecologia', 'B', 'C'],             // 55
  ['ped', 1, 'Crescimento', 'A', 'A'],             // 56
  ['cir', 0, 'Vascular', 'B', 'C'],                // 57
  ['cm', 0, 'Nefrologia', 'B', 'D'],              // 58
  ['prev', 1, 'Vigilância em saúde', 'C', 'C'],     // 59
  ['cir', 1, 'Trauma', 'D', 'D'],                  // 60
  ['ped', 0, 'Crescimento', 'A', 'C'],             // 61
  ['ped', 0, 'Neonatologia', 'A', 'C'],            // 62
  ['go', 0, 'Oncologia', 'C', 'A'],               // 63
  ['cm', 1, 'Infectologia', 'A', 'A'],            // 64
  ['cm', 1, 'Cardiologia', 'C', 'C'],             // 65
  ['ped', 1, 'Neonatologia', 'A', 'A'],            // 66
  ['go', 1, 'Oncologia', 'B', 'B'],               // 67
  ['cir', 0, 'Vascular', 'D', 'A'],                // 68
  ['go', 1, 'Obstetrícia', 'B', 'B'],             // 69
  ['go', 1, 'Obstetrícia', 'B', 'B'],             // 70
  ['prev', 1, 'Vigilância em saúde', 'D', 'D'],     // 71
  ['prev', 0, 'Vigilância em saúde', 'D', 'A'],     // 72
  ['cir', 1, 'Vascular', 'A', 'A'],                // 73
  ['ped', 0, 'Neonatologia', 'D', 'A'],            // 74
  ['go', 0, 'Ginecologia', 'A', 'C'],             // 75
  ['cir', 1, 'Hérnias', 'C', 'C'],                 // 76
  ['cm', 0, 'Cardiologia', 'C', 'B'],             // 77
  ['prev', 0, 'Saúde do trabalhador', 'A', 'C'],    // 78
  ['ped', 1, 'Infecções na infância', 'A', 'A'],   // 79
  ['cir', 1, 'Trauma', 'A', 'A'],                  // 80
  ['prev', 1, 'Saúde do trabalhador', 'D', 'D'],    // 81
  ['cir', 0, 'Trauma', 'A', 'D'],                  // 82
  ['cm', 1, 'Endocrinologia', 'D', 'D'],          // 83
  ['cir', 0, 'Trauma', 'B', 'D'],                  // 84
  ['cir', 1, 'Vascular', 'A', 'A'],                // 85
  ['prev', 0, 'Epidemiologia', 'A', 'B'],           // 86
  ['cir', 0, 'Trauma', 'A', 'D'],                  // 87
  ['cir', 0, 'Abdome agudo', 'B', 'A'],            // 88
  ['ped', 1, 'Imunizações', 'A', 'A'],             // 89
  ['go', 1, 'Obstetrícia', 'D', 'D'],             // 90
  ['go', 0, 'Pré-natal', 'D', 'C'],               // 91
  ['ped', 1, 'Imunizações', 'D', 'D'],             // 92
  ['prev', 1, 'SUS', 'A', 'A'],                     // 93
  ['cir', 1, 'Trauma', 'B', 'B'],                  // 94
  ['prev', 0, 'Saúde do trabalhador', 'D', 'C'],    // 95
  ['prev', 1, 'SUS', 'D', 'D'],                     // 96
  ['cm', 1, 'Cardiologia', 'A', 'A'],             // 97
  ['go', 1, 'Obstetrícia', 'A', 'A'],             // 98
  ['prev', 0, 'Epidemiologia', 'D', 'A'],           // 99
  ['prev', 0, 'SUS', 'B', 'D'],                     // 100
];

// Questões escritas por extenso para a parede do hero: enunciados simulados no padrão
// INEP (casos clínicos curtos, conduta), revisados para estarem corretos, mas que NÃO são
// questões do simulado real. Trocar quando o cliente mandar as reais.
// n: o número dela na prova; marcada: o que a pessoa respondeu; gabarito: a certa.
export const QUESTOES_REAIS = [
  {
    n: 13, area: 'cm', marcada: 'B', gabarito: 'B',
    enunciado: 'Homem de 58 anos, hipertenso e tabagista, chega com dor torácica em aperto há 40 minutos e sudorese. O ECG mostra supradesnivelamento de ST de V1 a V4. Não há hemodinâmica no hospital e a transferência levará cerca de 3 horas. Qual é a conduta?',
    alternativas: ['Dosar troponina e aguardar o resultado', 'Trombólise, se não houver contraindicação', 'Transferir para angioplastia primária', 'Nitrato sublingual e observação por 6 horas'],
  },
  {
    n: 26, area: 'ped', marcada: 'B', gabarito: 'B',
    enunciado: 'Menina de 2 anos toma cerca de 1 litro de leite de vaca por dia e come pouca carne. Está pálida. Hemoglobina de 9,0 g/dL, VCM de 64 fL e ferritina de 12 ng/mL. Qual é a conduta inicial?',
    alternativas: ['Transfusão de concentrado de hemácias', 'Ferro elementar 3 mg/kg/dia e reduzir o leite', 'Ácido fólico e vitamina B12 por via oral', 'Eletroforese de hemoglobina antes de tratar'],
  },
  {
    n: 37, area: 'cm', marcada: 'B', gabarito: 'D',
    enunciado: 'Mulher de 34 anos, não gestante, com disúria e polaciúria há 2 dias, sem febre e sem dor lombar. O exame físico não tem alterações. Qual é a conduta mais adequada?',
    alternativas: ['Internação para antibiótico endovenoso', 'Ciprofloxacino por 14 dias', 'Urocultura e aguardar o resultado', 'Fosfomicina em dose única'],
  },
  {
    n: 41, area: 'go', marcada: 'C', gabarito: 'A',
    enunciado: 'Gestante de 32 semanas com PA de 160 x 110 mmHg em duas medidas, cefaleia intensa e escotomas. Proteinúria de 24 horas: 1,2 g. Além do anti-hipertensivo, qual é a conduta imediata?',
    alternativas: ['Sulfato de magnésio para prevenir eclâmpsia', 'Diazepam endovenoso', 'Repouso e reavaliação em 24 horas', 'Cesariana imediata, antes de estabilizar'],
  },
  {
    n: 44, area: 'cir', marcada: 'A', gabarito: 'B',
    enunciado: 'Homem de 22 anos, vítima de colisão de moto, chega com PA de 80 x 50 mmHg e FC de 128 bpm. O FAST é positivo no quadrante superior esquerdo. Após 1 litro de cristaloide, segue instável. Qual é a conduta?',
    alternativas: ['Tomografia de abdome com contraste', 'Laparotomia exploradora', 'Lavado peritoneal diagnóstico', 'Observação com hemograma seriado'],
  },
  {
    n: 59, area: 'prev', marcada: 'A', gabarito: 'A',
    enunciado: 'Um município de 50 mil habitantes registrou 200 casos novos de tuberculose em 2025. No fim do ano, 350 pessoas estavam em tratamento. Qual foi a incidência anual por 100 mil habitantes?',
    alternativas: ['400', '700', '1.100', '40'],
  },
  {
    n: 66, area: 'ped', marcada: 'A', gabarito: 'A',
    enunciado: 'Lactente de 4 meses, em aleitamento materno exclusivo e com o calendário em dia, vem à consulta de puericultura. Segundo o PNI, quais vacinas ele deve receber hoje?',
    alternativas: ['Pentavalente, VIP, pneumocócica 10 e rotavírus', 'BCG e hepatite B', 'Tríplice viral e varicela', 'Febre amarela e meningocócica ACWY'],
  },
  {
    n: 70, area: 'go', marcada: 'B', gabarito: 'B',
    enunciado: 'Mulher de 26 anos, com atraso menstrual de 7 semanas, dor em fossa ilíaca direita e sangramento discreto. Beta-hCG de 2.800 mUI/mL e ultrassom transvaginal sem saco gestacional intrauterino. Está estável. Qual é a principal hipótese?',
    alternativas: ['Abortamento completo', 'Gravidez ectópica', 'Doença trofoblástica gestacional', 'Gestação tópica inicial'],
  },
  {
    n: 83, area: 'cm', marcada: 'B', gabarito: 'B',
    enunciado: 'Homem de 45 anos, com diabetes tipo 1, chega com glicemia de 480 mg/dL, pH de 7,12, bicarbonato de 9 mEq/L e cetonemia positiva. A hidratação já foi iniciada. Qual é o próximo passo?',
    alternativas: ['Bicarbonato de sódio endovenoso', 'Insulina regular contínua, com o potássio checado', 'Insulina NPH por via subcutânea', 'Glicose a 50% em bolus'],
  },
  {
    n: 86, area: 'prev', marcada: 'C', gabarito: 'A',
    enunciado: 'Um teste de rastreamento tem sensibilidade de 80% e especificidade de 95%. Aplicado a 1.000 pessoas sem a doença, quantos resultados falso-positivos são esperados?',
    alternativas: ['50', '200', '950', '5'],
  },
  {
    n: 94, area: 'cir', marcada: 'A', gabarito: 'A',
    enunciado: 'Mulher de 40 anos com dor em hipocôndrio direito há 18 horas, febre de 38,4 °C e sinal de Murphy. Leucócitos: 15.000/mm³. O ultrassom mostra parede vesicular espessada e cálculo impactado no infundíbulo. Qual é a conduta?',
    alternativas: ['Colecistectomia videolaparoscópica precoce', 'CPRE de urgência', 'Alta com analgésico e retorno ambulatorial', 'Colecistostomia percutânea de rotina'],
  },
];

const POR_EXTENSO = new Map(QUESTOES_REAIS.map((q) => [q.n, q]));

// A resposta e o gabarito das questões por extenso valem para a prova inteira (dobra 2 também)
export const QUESTOES = LISTA.map(([area, acertou, conteudo, resposta, gabarito], i) => {
  const real = POR_EXTENSO.get(i + 1);
  return {
    n: i + 1,
    area: real?.area ?? area,
    acertou: real ? real.marcada === real.gabarito : acertou === 1,
    conteudo,
    resposta: real?.marcada ?? resposta,
    gabarito: real?.gabarito ?? gabarito,
  };
});

// Faixas de desempenho (as mesmas da v2)
export const FAIXAS = { ok: 70, atencao: 50 };
export const faixaDe = (pct) => (pct >= FAIXAS.ok ? 'ok' : pct >= FAIXAS.atencao ? 'atencao' : 'prioridade');

// Percentual por área, contado a partir das questões (não se digita)
export const DESEMPENHO = AREAS.map((a) => {
  const dela = QUESTOES.filter((q) => q.area === a.id);
  const pct = Math.round((dela.filter((q) => q.acertou).length / dela.length) * 100);
  return { ...a, total: dela.length, pct, faixa: faixaDe(pct) };
});

export const RESULTADO_GERAL = QUESTOES.filter((q) => q.acertou).length;

// ---------------------------------------------------------------------------
// Cena 1 · a parede do hero
// ---------------------------------------------------------------------------
// O navegador do card da prova: onde a prova está quando a página carrega e o ritmo
export const PROVA = {
  inicio: 37,                         // próxima questão a ser respondida
  puladasAntes: [9, 22],              // em branco, para depois
  marcadasAntes: [14, 29, 33],        // respondidas e marcadas para revisar
  pular: [44, 58, 71, 89],
  marcar: [41, 52, 66, 80, 95],
  tempoRestante: 3 * 3600 + 12 * 60 + 40, // segundos no cronômetro quando a página carrega (03:12:40)
  porQuestao: [2600, 5200],           // ms entre uma resposta e a próxima (gente lendo, não máquina)
  fimSegura: 3000,                    // ms com as 100 respondidas antes de recomeçar da questão inicial
};

// Correção comentada de algumas das questões por extenso (texto simulado, revisado)
export const COMENTARIOS = {
  37: {
    certa: 'Cistite não complicada em mulher não gestante, sem febre e sem dor lombar: tratamento empírico curto, sem urocultura de rotina. Fosfomicina em dose única é primeira linha.',
    errada: 'Ciprofloxacino por 14 dias é esquema de pielonefrite, não de cistite, e a fluoroquinolona deve ser poupada.',
  },
  86: {
    certa: 'Falso-positivo é quem não tem a doença e testa positivo: 1.000 × (1 − 0,95) = 50.',
    errada: '950 são os verdadeiros-negativos: quem não tem a doença e testa negativo.',
  },
};

// A parede: quatro lâminas, com as durações e os sentidos do acervo da Home. Só material de
// prova teórica (nada de foto ou vídeo que remeta à prova prática).
// Cada item: [tipo, referência]. Tipos: questao (n de QUESTOES_REAIS), comentario (n de
// COMENTARIOS), prova (o navegador ao vivo), relogio, resultado (anel com o geral),
// areas (barras por área), prioridades (as três primeiras de PRIORIDADES).
export const PAREDE = {
  laminas: [
    { sentido: 'sobe', duracao: 84, itens: [['prova'], ['questao', 37], ['comentario', 37], ['questao', 13], ['relogio']] },
    { sentido: 'desce', duracao: 104, itens: [['questao', 44], ['resultado'], ['questao', 70], ['prioridades'], ['questao', 41]] },
    { sentido: 'sobe', duracao: 94, itens: [['questao', 86], ['comentario', 86], ['areas'], ['questao', 26], ['questao', 94]] },
    { sentido: 'desce', duracao: 112, itens: [['questao', 66], ['questao', 83], ['prioridades'], ['questao', 59], ['relogio']] },
  ],
  revelarCada: 3800,                  // ms entre uma correção automática e a próxima
  revelarPor: 2600,                   // ms que a correção fica aberta
};

// Cena 2: o cronômetro parado quando a prova termina (tempo que sobrou)
export const RESULTADO = { tempoRestante: '01:47:22', geral: '59/100' };

// Textos de interface que aparecem dentro da parede (aria-hidden)
export const TEXTOS = {
  questao: 'Questão',
  de: 'de',
  gabarito: 'Gabarito',
  suaResposta: 'Você marcou',
  acertos: 'de acertos',
  tempo: 'tempo de prova restante',
  geral: 'Simulado Nacional',
  porQueCerta: (l) => `Por que a ${l} está certa`,
  porQueErrada: (l) => `Por que a ${l} está errada`,
  correcao: 'Correção comentada',
  revisar: 'Revisar',
  fortes: 'Fortes',
  fracos: 'Fracos',
  resposta: 'Resposta',
  semana: 'Semana 1',
  primeiro: 'primeiro',
  faixas: [['ok', '≥ 70% satisfatório'], ['atencao', '50 a 69% atenção'], ['prioridade', '< 50% prioridade']],
  prioridades: 'Suas prioridades de revisão',
  erros: (n) => `${n} ${n === 1 ? 'erro' : 'erros'}`,
  cemQuestoes: '100 questões',
};

// ---------------------------------------------------------------------------
// Cena 2 · o carrossel do resultado (dobra 2)
// ---------------------------------------------------------------------------
// Pontos fortes e fracos, conteúdo por conteúdo (percentual de acerto)
export const FORTES_FRACOS = {
  fortes: [['Cardiologia', 81], ['Obstetrícia', 77], ['Imunizações', 80], ['Trauma', 74]],
  fracos: [['Epidemiologia', 29], ['Oncologia', 39], ['Infectologia', 43], ['SUS', 45]],
};

// Correção comentada da questão 37: por que cada alternativa está certa ou errada
export const CORRECAO_37 = {
  A: 'Internação e antibiótico endovenoso são para pielonefrite com sinais de gravidade, não para cistite.',
  B: 'Ciprofloxacino por 14 dias é esquema de pielonefrite; na cistite, a fluoroquinolona deve ser poupada.',
  C: 'Na cistite não complicada o tratamento é empírico: urocultura de rotina não é necessária.',
  D: 'Cistite não complicada em mulher não gestante: fosfomicina 3 g em dose única é primeira linha.',
};

// O plano no caderno: a semana montada a partir dos erros
export const PLANO = [
  ['Seg', 'Epidemiologia', 'Medidas de frequência e 20 questões'],
  ['Ter', 'Oncologia', 'Rastreamentos do INEP e 15 questões'],
  ['Qua', 'Nefrologia', 'Hidroeletrolíticos e 15 questões'],
  ['Qui', 'Infectologia', 'ITU e antibioticoterapia e 10 questões'],
  ['Sex', 'SUS', 'Princípios e legislação e 10 questões'],
];

// ---------------------------------------------------------------------------
// Conteúdos e prioridades (usados também nos cartões da parede do hero)
// ---------------------------------------------------------------------------
// A área que abre em conteúdos, com os nomes e as faixas dos cards da v2
export const CONTEUDOS = {
  area: 'cm',
  itens: [['Cardiologia', 81], ['Endocrinologia', 66], ['Nefrologia', 54], ['Infectologia', 43]],
};

// Prioridades de revisão, em ordem de peso
export const PRIORIDADES = [
  { area: 'prev', conteudo: 'Epidemiologia' },
  { area: 'cm', conteudo: 'Infectologia' },
  { area: 'go', conteudo: 'Oncologia' },
  { area: 'cm', conteudo: 'Nefrologia' },
].map((p) => ({
  ...p,
  erradas: QUESTOES.filter((q) => q.area === p.area && q.conteudo === p.conteudo && !q.acertou).map((q) => q.n),
}));

// Todos os conteúdos com erro, do que mais pesa ao que menos pesa (lista de prioridades)
export const PRIORIDADES_LISTA = Object.values(QUESTOES.filter((q) => !q.acertou).reduce((acc, q) => {
  const chave = `${q.area}:${q.conteudo}`;
  acc[chave] ??= { area: q.area, conteudo: q.conteudo, erros: 0 };
  acc[chave].erros += 1;
  return acc;
}, {})).sort((a, b) => b.erros - a.erros);

// ---------------------------------------------------------------------------
// Configuração por página
// As duas páginas (index.html, a prova de 100; seis-areas.html, os 6 simulados) usam as
// mesmas cenas e o mesmo formulário. O que muda entre elas está aqui, escolhido pelo
// atributo data-pagina do <body> ("cem" ou "seis-areas").
// ---------------------------------------------------------------------------
const PAGINA = (typeof document !== 'undefined' && document.body?.dataset.pagina) || 'cem';

// Os 6 simulados, na ordem da copy da página das 6 áreas (o Geral por último)
export const SIMULADOS = [
  { id: 'ped', nome: 'Pediatria' },
  { id: 'go', nome: 'Ginecologia e Obstetrícia' },
  { id: 'cir', nome: 'Cirurgia' },
  { id: 'prev', nome: 'Medicina Preventiva e Saúde Coletiva' },
  { id: 'cm', nome: 'Clínica Médica' },
  { id: 'geral', nome: 'Simulado Geral' },
];

// Bloco "Um simulado para cada área": as questões marcadas para revisar em cada prova (como no
// navegador do hero) e quantas questões de cada área vão para o Simulado Geral (5 × 20 = 100)
export const PROVAS_BLOCO = {
  revisar: { ped: [8, 23, 37], go: [5, 19, 44], cir: [12, 30], prev: [3, 27, 46], cm: [16, 33, 41] },
  porAreaNoGeral: 20,
};

// As cinco provas de área encerradas (página das 6 áreas): 50 questões cada, na ordem da
// prova, 1 acertou e 0 errou. Os percentuais saem daqui, não se digitam. Na de Clínica
// Médica a questão 37 é a errada que vira o card da questão na jornada.
const RESPOSTAS_AREAS = {
  ped: '11111100011111101011010111111110011101111111010111',
  go: '11011011010011001001111110111111110010010000001100',
  cir: '10011101110110110000000010110110111101111110101101',
  prev: '10100001111100100000100010001101001100011000010011',
  cm: '11111111011111010000110100100111010101111110111010',
};

export const PROVAS_AREAS = SIMULADOS.filter((s) => RESPOSTAS_AREAS[s.id]).map((s) => {
  const acertos = [...RESPOSTAS_AREAS[s.id]].map((c) => c === '1');
  const pct = Math.round((acertos.filter(Boolean).length / acertos.length) * 100);
  return { ...s, acertos, pct, faixa: faixaDe(pct) };
});

const CONFIGURACOES = {
  cem: {
    pagina: 'simulado-nacional-100',          // campo "pagina" do lead
    leadNome: 'Simulado Nacional MedTwins',   // content_name do evento Lead no pixel
    nomes: {},                                // nomes de área trocados nos cartões
    // O card da prova na parede do hero
    prova: { ...PROVA, total: 100, area: null },
    laminas: PAREDE.laminas,
    trilha: null,
    // A janela da jornada (dobra 2): o objeto é a prova de 100 (grade 10 × 10)
    jornada: { objeto: 'geral', nome: TEXTOS.geral, conta: { feitas: 100, total: 100 }, relogio: true },
  },
  'seis-areas': {
    pagina: 'simulado-nacional-6-areas',
    leadNome: 'Simulados Nacionais MedTwins',
    nomes: { prev: 'Medicina Preventiva e Saúde Coletiva' },
    // O card da prova mostra o simulado da área em andamento, com o navegador de 50
    prova: {
      ...PROVA,
      total: 50,
      area: 'cir',
      inicio: 19,
      puladasAntes: [7],
      marcadasAntes: [4, 12],
      pular: [27, 41],
      marcar: [23, 36],
      tempoRestante: 1 * 3600 + 31 * 60 + 12,
    },
    // As mesmas lâminas, com o card da trilha dos 6 simulados na primeira, logo abaixo do card da prova
    laminas: PAREDE.laminas.map((l, i) => (i === 0 ? { ...l, itens: [l.itens[0], ['trilha'], ...l.itens.slice(1)] } : l)),
    trilha: { concluidos: ['ped', 'go'], andamento: 'cir' },
    // A janela da jornada: as cinco provas de área, cada uma com os seus 50
    jornada: { objeto: 'areas', nome: 'Simulados Nacionais', conta: { feitas: 5, total: 6 }, relogio: false },
  },
};

// As páginas de liberação herdam a parede da LP de onde a pessoa veio
CONFIGURACOES['liberacao-cem'] = { ...CONFIGURACOES.cem };
CONFIGURACOES['liberacao-seis-areas'] = { ...CONFIGURACOES['seis-areas'] };

export const CONFIG = CONFIGURACOES[PAGINA] ?? CONFIGURACOES.cem;
