window.SIMULADO_DATA = {
 "config": {
  "nomeSimulado": "Simulado INEP MedTwins",
  "especialidade": "Preventiva e Saúde Coletiva",
  "totalQuestoes": 50,
  "duracaoMin": 150,
  "formato": "Múltipla escolha",
  "padrao": "Padrão INEP",
  "demoErradas": [
   2,
   5,
   8,
   11,
   13,
   16,
   19,
   23,
   26,
   29,
   31,
   33,
   37,
   39,
   42,
   45,
   48,
   50
  ],
  "demoAltaConfErradas": [
   5,
   11,
   16,
   26,
   37,
   42,
   50
  ]
 },
 "questoes": [
  {
   "id": 1,
   "tema": "Epidemiologia",
   "subtema": "Medidas de frequência",
   "competencia": "Incidência e população sob risco",
   "dificuldade": "Alta",
   "enunciado": "Uma equipe de Saúde da Família acompanha uma população adscrita em uma região com rápido crescimento urbano. Em 1º de janeiro, havia 4.200 adultos cadastrados, dos quais 420 já tinham diagnóstico de diabetes mellitus. Durante os 12 meses seguintes, 126 pessoas sem diagnóstico prévio preencheram critérios para diabetes. No mesmo período, 180 adultos inicialmente sem diabetes mudaram-se da área antes de completar o ano, em momentos diferentes, e 60 novos moradores sem diabetes passaram a ser acompanhados a partir de julho. Ao elaborar o relatório anual, a coordenação solicita uma medida que expresse a ocorrência de casos novos entre pessoas efetivamente suscetíveis ao longo do período e permita comparar o risco de adoecimento com o de outra área cuja população teve grande mobilidade. Considerando o objetivo da análise e a dinâmica da população, assinale a alternativa que apresenta a estratégia epidemiológica mais adequada.",
   "alternativas": {
    "A": "Calcular a prevalência de período, usando como numerador os 420 casos já conhecidos somados aos 126 casos incidentes e, como denominador, todos os adultos que estiveram cadastrados em algum momento do ano.",
    "B": "Calcular a incidência acumulada, excluindo apenas os 420 casos prevalentes do denominador inicial e desconsiderando o momento em que ocorreram entradas e saídas da população.",
    "C": "Estimar uma taxa de incidência utilizando os 126 casos novos no numerador e, no denominador, o tempo de observação contribuído pelas pessoas sem diabetes enquanto permaneceram sob risco.",
    "D": "Calcular a razão de prevalências entre os cadastrados de janeiro e os cadastrados de dezembro, pois a mobilidade populacional impede o uso de medidas baseadas em casos novos."
   },
   "gabarito": "C",
   "porqueCorreta": "A alternativa C é a única que respeita simultaneamente três elementos do enunciado: casos novos no numerador, exclusão de quem já tinha diabetes da população sob risco e consideração do tempo efetivamente observado. Os 126 novos diagnósticos representam os eventos incidentes. Já o denominador deve acumular o tempo em que cada pessoa permaneceu sem diabetes e sob acompanhamento. Assim, quem saiu antes do fim do ano contribui apenas até a saída; quem entrou em julho passa a contribuir a partir de então. Esse raciocínio evita tratar como equivalentes pessoas acompanhadas por períodos muito diferentes.",
   "avalia": "O detalhe decisivo é a dinâmica da população. Há pessoas que entram e saem do acompanhamento em momentos diferentes; portanto, cada indivíduo contribui com um tempo diferente de exposição ao risco. Quando o objetivo é medir a velocidade de aparecimento de casos novos em uma população aberta, a medida mais coerente é a taxa ou densidade de incidência, cujo denominador é pessoa-tempo.",
   "detalhe": "População aberta + tempos diferentes de seguimento = taxa de incidência com pessoa-tempo.",
   "distratores": {
    "A": "A prevalência de período responde a outra pergunta: quantas pessoas apresentaram a doença em algum momento do intervalo. Ela mistura casos já existentes com casos novos e é útil para estimar carga de doença, não velocidade de surgimento. Além disso, incluir todos os cadastrados como se todos tivessem permanecido sob risco pelo mesmo tempo ignora a lógica de pessoa-tempo.",
    "B": "A incidência acumulada é mais adequada em coortes relativamente fechadas, nas quais se conhece uma população inicial sob risco e o seguimento é semelhante entre os participantes. Aqui, há mobilidade relevante. Apenas excluir os 420 casos prevalentes do denominador inicial não corrige o problema de entradas e saídas em momentos diferentes.",
    "D": "Mobilidade populacional não impede o cálculo de incidência; ao contrário, é justamente uma situação em que a densidade de incidência se torna especialmente útil. Razão de prevalências entre dois momentos não quantifica a velocidade de ocorrência de casos novos e ainda mistura efeitos de incidência, cura, morte e migração."
   },
   "padraoErro": "Decisão em saúde pública",
   "pegadinha": "A banca tenta fazer o candidato confundir “quantos têm a doença” com “com que velocidade surgem casos novos”. A palavra-chave não é diabetes; é população dinâmica."
  },
  {
   "id": 2,
   "tema": "Epidemiologia",
   "subtema": "Medidas de frequência",
   "competencia": "Prevalência e planejamento assistencial",
   "dificuldade": "Média-alta",
   "enunciado": "Uma UBS de um município de médio porte está reorganizando a agenda de cuidado para hipertensão arterial. Ao iniciar o trimestre, 700 dos 5.000 adultos adscritos tinham diagnóstico registrado de hipertensão. Durante uma busca ativa, 90 novos casos foram identificados. Ao longo do mesmo trimestre, 25 pessoas hipertensas mudaram-se definitivamente da área e 15 faleceram. Ao final do período, a equipe precisa estimar quantas pessoas que permanecem vinculadas à unidade convivem com hipertensão, pois esse número será utilizado para dimensionar consultas, grupos de acompanhamento e estoque de medicamentos. A médica responsável pelo relatório ressalta que o interesse não é saber quantos casos surgiram no trimestre, mas qual é a carga atual da condição entre os adultos que compõem a população da área naquele momento. Qual medida e composição do numerador atendem melhor a essa finalidade?",
   "alternativas": {
    "A": "Incidência acumulada, incluindo apenas os 90 novos diagnósticos e usando como denominador todos os adultos cadastrados ao final do trimestre.",
    "B": "Prevalência pontual ao final do trimestre, incluindo os casos antigos e novos que ainda permanecem na população naquele momento, após considerar saídas e óbitos.",
    "C": "Taxa de incidência, somando casos antigos e novos no numerador e utilizando pessoa-tempo de todos os adultos, inclusive os hipertensos já conhecidos.",
    "D": "Risco relativo, comparando a proporção de hipertensos entre os que já eram cadastrados no início do trimestre e os moradores identificados na busca ativa."
   },
   "gabarito": "B",
   "porqueCorreta": "A alternativa B identifica corretamente tanto a medida quanto o numerador. Ao final do trimestre, devem ser contados os casos antigos que permanecem na população e os novos casos diagnosticados durante o período, excluindo pessoas que morreram ou deixaram definitivamente a área. O denominador deve representar a população presente naquele momento. O indicador expressa a proporção de indivíduos que têm a condição naquele ponto temporal e, por isso, é diretamente útil para planejamento de carga assistencial.",
   "avalia": "A pergunta é de estoque, não de fluxo. A equipe quer saber quantas pessoas convivem com hipertensão ao final do trimestre para dimensionar consultas, grupos e medicamentos. Esse é o uso clássico da prevalência pontual.",
   "detalhe": "Carga atual de doença em um momento = prevalência pontual.",
   "distratores": {
    "A": "Incidência acumulada mede o aparecimento de casos novos entre pessoas inicialmente livres da doença. Considerar somente os 90 novos diagnósticos responderia quantos adoeceram no trimestre, não quantos hipertensos precisam de seguimento ao final dele.",
    "C": "Taxa de incidência exige casos novos no numerador e pessoa-tempo entre indivíduos sob risco no denominador. Hipertensos já conhecidos não estão sob risco de se tornarem “casos incidentes” de hipertensão e não podem ser somados ao numerador de incidência.",
    "D": "Risco relativo é uma medida comparativa de associação entre uma exposição e um desfecho ou entre dois grupos. A gestão não quer comparar grupos; quer estimar a carga atual da doença na população adscrita."
   },
   "padraoErro": "Decisão em saúde pública",
   "pegadinha": "O enunciado oferece dados de casos novos para induzir o candidato a escolher incidência. O objetivo operacional - dimensionar cuidado de quem atualmente tem hipertensão - é que determina a medida."
  },
  {
   "id": 3,
   "tema": "Epidemiologia",
   "subtema": "Medidas de efeito",
   "competencia": "Risco relativo em investigação de surto",
   "dificuldade": "Alta",
   "enunciado": "Após uma confraternização de uma empresa, 96 participantes procuraram atendimento por diarreia e dor abdominal. A vigilância entrevistou todos os 180 presentes e reconstruiu as exposições alimentares. Entre 100 pessoas que consumiram maionese artesanal, 70 adoeceram; entre as 80 que não consumiram, 26 adoeceram. O consumo de outros alimentos foi frequente nos dois grupos e não mostrou diferença importante de ataque. O início dos sintomas ocorreu em janela temporal compatível com uma fonte comum. A equipe deseja quantificar a força da associação entre o consumo da maionese e o adoecimento para decidir se essa exposição deve ser priorizada na investigação etiológica. Qual interpretação dos dados é a mais adequada?",
   "alternativas": {
    "A": "A maionese deve ser descartada como hipótese principal, porque 26 pessoas adoeceram mesmo sem consumi-la, o que exclui associação causal relevante.",
    "B": "A diferença absoluta de risco é de 44 pontos percentuais, portanto o risco relativo é 0,44 e sugere efeito protetor do consumo da maionese.",
    "C": "O número absoluto de doentes entre consumidores não permite qualquer comparação, porque estudos de surto só podem usar odds ratio.",
    "D": "O risco entre consumidores foi de 70% e entre não consumidores de 32,5%, resultando em risco relativo de aproximadamente 2,15 e fortalecendo a hipótese de associação."
   },
   "gabarito": "D",
   "porqueCorreta": "Entre os que consumiram maionese, 70 de 100 adoeceram: risco de 70%. Entre os que não consumiram, 26 de 80 adoeceram: 32,5%. Dividindo 0,70 por 0,325, o risco relativo é aproximadamente 2,15. Isso significa que o risco de adoecimento foi pouco mais de duas vezes maior entre consumidores da maionese. O resultado fortalece a hipótese de associação e justifica priorizar essa exposição na investigação, embora, isoladamente, não prove causalidade.",
   "avalia": "Como todos os participantes do evento foram identificados e classificados quanto à exposição, o surto pode ser analisado como uma coorte retrospectiva. Assim, é possível calcular diretamente o risco ou taxa de ataque entre expostos e não expostos e obter o risco relativo.",
   "detalhe": "Coorte retrospectiva de surto: taxa de ataque nos expostos / taxa de ataque nos não expostos.",
   "distratores": {
    "A": "A existência de casos entre não expostos não elimina associação. Pode haver outra fonte de exposição, erro de recordação, contaminação cruzada ou mais de um veículo. Associação epidemiológica é definida pela diferença de risco entre grupos, não pela exigência de que nenhum não exposto adoeça.",
    "B": "A diferença entre 70% e 32,5% é 37,5 pontos percentuais, não 44, e isso é uma diferença absoluta de risco, não um risco relativo. RR é uma razão entre riscos; valores menores que 1 sugeririam proteção, o que é incompatível com os dados.",
    "C": "Odds ratio é indispensável em estudos caso-controle, nos quais a composição da amostra é fixada pelo desfecho. Aqui, toda a população do evento foi reconstruída e o risco pode ser calculado diretamente; portanto, RR é plenamente aplicável."
   },
   "padraoErro": "Cálculo e interpretação",
   "pegadinha": "A banca explora a confusão entre número absoluto de doentes, diferença absoluta de risco e razão de riscos."
  },
  {
   "id": 4,
   "tema": "Epidemiologia",
   "subtema": "Medidas de efeito",
   "competencia": "Redução absoluta de risco e NNT",
   "dificuldade": "Alta",
   "enunciado": "Um serviço avalia incorporar um medicamento preventivo para pacientes com alto risco cardiovascular. Em um ensaio clínico, 1.200 participantes foram acompanhados por dois anos: 600 receberam o novo medicamento e 600 receberam tratamento padrão. O desfecho cardiovascular primário ocorreu em 72 pacientes do grupo padrão e em 42 do grupo intervenção. O novo medicamento tem custo elevado e efeitos adversos leves frequentes, por isso a comissão quer traduzir o benefício absoluto para a prática. Considerando o período de seguimento do estudo, quantos pacientes aproximadamente precisam receber o novo tratamento para prevenir um evento cardiovascular adicional, e qual raciocínio sustenta essa estimativa?",
   "alternativas": {
    "A": "Cerca de 20 pacientes, porque o risco caiu de 12% para 7%, gerando redução absoluta de 5 pontos percentuais e NNT de 1/0,05.",
    "B": "Cerca de 8 pacientes, porque a redução relativa do risco foi próxima de 42% e seu inverso corresponde ao NNT.",
    "C": "Cerca de 12 pacientes, porque ocorreram 30 eventos a menos no grupo intervenção entre 600 tratados.",
    "D": "Cerca de 40 pacientes, porque o número necessário para tratar deve ser calculado usando a incidência do grupo intervenção isoladamente."
   },
   "gabarito": "A",
   "porqueCorreta": "No tratamento padrão, 72/600 = 12%. Na intervenção, 42/600 = 7%. A redução absoluta do risco é 12% - 7% = 5%, ou 0,05. O NNT é o inverso da redução absoluta: 1/0,05 = 20. Portanto, aproximadamente 20 pacientes precisam receber o novo tratamento durante dois anos para que um evento cardiovascular adicional seja evitado em comparação ao tratamento padrão. O horizonte temporal é parte da interpretação: o NNT de 20 vale para o período estudado.",
   "avalia": "NNT traduz benefício clínico absoluto. Ele não é calculado a partir da redução relativa do risco nem do número bruto de eventos; depende da diferença absoluta entre os riscos dos grupos.",
   "detalhe": "NNT = 1 / redução absoluta do risco; sempre interprete junto com o período de seguimento.",
   "distratores": {
    "B": "A redução relativa é aproximadamente 42%, mas seu inverso não produz NNT. Reduções relativas podem parecer expressivas mesmo quando o benefício absoluto é pequeno, razão pela qual não substituem a redução absoluta na decisão clínica.",
    "C": "Dizer que houve 30 eventos a menos é verdadeiro em termos absolutos, mas o número bruto não pode ser usado isoladamente. É necessário relacionar os eventos ao número de participantes de cada grupo para calcular risco e então a diferença de risco.",
    "D": "Usar apenas a incidência do grupo intervenção ignora o contrafactual representado pelo grupo controle. NNT é uma medida comparativa: depende de quanto o tratamento reduz o risco em relação ao padrão."
   },
   "padraoErro": "Cálculo e interpretação",
   "pegadinha": "O distrator clássico é usar redução relativa ou diferença bruta de eventos como se fossem NNT."
  },
  {
   "id": 5,
   "tema": "Epidemiologia",
   "subtema": "Testes diagnósticos",
   "competencia": "Sensibilidade e estratégia de triagem",
   "dificuldade": "Alta",
   "enunciado": "Durante um surto de uma infecção transmissível, a secretaria avalia dois testes rápidos para triagem inicial de contatos assintomáticos. O teste X identifica 194 de 200 pessoas que realmente têm a infecção, mas apresenta alguns resultados positivos entre indivíduos não infectados. O teste Y produz menos falsos-positivos, porém deixa de identificar 28 dos 200 infectados. Todos os resultados positivos serão posteriormente confirmados por um método de referência. Como a prioridade operacional é evitar que pessoas infectadas sejam liberadas da vigilância por um resultado inicial negativo, qual escolha é mais coerente?",
   "alternativas": {
    "A": "Preferir o teste Y, porque menor número de falsos-positivos significa maior capacidade de excluir doença em pessoas infectadas.",
    "B": "Preferir o teste X, porque sua maior sensibilidade reduz falsos-negativos e é compatível com uma estratégia de triagem seguida de confirmação.",
    "C": "Preferir o teste com maior valor preditivo positivo, independentemente da prevalência e da finalidade da etapa de triagem.",
    "D": "Utilizar apenas especificidade para a decisão, porque sensibilidade se aplica somente a exames confirmatórios."
   },
   "gabarito": "B",
   "porqueCorreta": "O teste X identifica 194 de 200 infectados, sensibilidade de 97%. Já o teste Y deixa de detectar 28 de 200 infectados, portanto identifica 172/200, sensibilidade de 86%. Como todos os positivos serão confirmados depois, é aceitável tolerar mais falsos-positivos na primeira etapa se isso reduzir falsos-negativos. A lógica é “triagem sensível primeiro, confirmação específica depois”.",
   "avalia": "Na triagem, o custo crítico é perder um doente. Portanto, o teste deve minimizar falsos-negativos, o que significa priorizar alta sensibilidade. A especificidade pode ser recuperada em uma etapa confirmatória.",
   "detalhe": "Se falso-negativo é o erro mais perigoso, priorize sensibilidade.",
   "distratores": {
    "A": "Menos falsos-positivos indica maior especificidade, não maior capacidade de detectar infectados. O problema descrito é exatamente o oposto: o teste Y perde mais doentes, o que é indesejável quando um negativo falso libera uma pessoa infectada da vigilância.",
    "C": "Valor preditivo positivo depende da prevalência e da população em que o teste é aplicado. Além disso, a finalidade operacional já está explicitada: minimizar falsos-negativos. Um VPP alto não compensa um teste que deixa passar muitos infectados na triagem.",
    "D": "Sensibilidade é uma propriedade central de testes de triagem quando se quer reduzir falsos-negativos. Especificidade ganha maior importância em confirmação, especialmente quando a consequência de um falso-positivo é relevante."
   },
   "padraoErro": "Cálculo e interpretação",
   "pegadinha": "A banca costuma inverter sensibilidade e especificidade usando a linguagem de “confirmar” e “excluir”. O melhor caminho é perguntar: qual erro é mais perigoso nesta etapa?"
  },
  {
   "id": 6,
   "tema": "Epidemiologia",
   "subtema": "Testes diagnósticos",
   "competencia": "Especificidade e confirmação diagnóstica",
   "dificuldade": "Alta",
   "enunciado": "Um ambulatório especializado avalia dois testes para confirmar uma doença autoimune antes de iniciar tratamento imunossupressor prolongado. O teste A é muito sensível, mas cerca de 15% das pessoas sem a doença também apresentam resultado positivo. O teste B perde alguns casos verdadeiros, porém quase nunca é positivo em pessoas sem a doença. Como a decisão terapêutica envolve riscos relevantes, a equipe quer reduzir ao máximo a chance de tratar indivíduos que não tenham a doença. Qual característica do teste B é mais útil nessa etapa e por quê?",
   "alternativas": {
    "A": "Maior sensibilidade, pois um teste confirmatório deve identificar todos os doentes, mesmo ao custo de muitos falsos-positivos.",
    "B": "Maior valor preditivo negativo, que permanece constante em qualquer população e elimina a necessidade de considerar probabilidade pré-teste.",
    "C": "Menor prevalência da doença entre os testados, porque a prevalência é uma propriedade intrínseca de cada teste.",
    "D": "Maior especificidade, porque reduz falsos-positivos e torna um resultado positivo mais convincente em um contexto de confirmação."
   },
   "gabarito": "D",
   "porqueCorreta": "O teste B “quase nunca é positivo em pessoas sem a doença”, descrição operacional de alta especificidade. Especificidade é a proporção de verdadeiros negativos entre os não doentes. Em uma etapa confirmatória, um teste altamente específico torna um resultado positivo mais convincente, especialmente quando o custo do falso-positivo é alto. Isso deve ser integrado à probabilidade pré-teste e ao contexto clínico.",
   "avalia": "Aqui o maior dano seria tratar uma pessoa sem a doença com imunossupressão prolongada. Portanto, a etapa confirmatória deve reduzir falsos-positivos, o que exige maior especificidade.",
   "detalhe": "Se falso-positivo pode causar tratamento perigoso, priorize especificidade na confirmação.",
   "distratores": {
    "A": "Sensibilidade elevada reduz falsos-negativos, mas não é a prioridade descrita. Se o teste for muito sensível e pouco específico, mais pessoas sem a doença podem ser classificadas como positivas e receber tratamento desnecessário.",
    "B": "Valor preditivo negativo não é fixo. Ele varia com prevalência e probabilidade pré-teste. A afirmação de que permanece constante em qualquer população é conceitualmente errada.",
    "C": "Prevalência é característica da população avaliada, não uma propriedade intrínseca do teste. Ela influencia valores preditivos, mas não define especificidade."
   },
   "padraoErro": "Cálculo e interpretação",
   "pegadinha": "O ponto não é decorar “sensível para triagem, específico para confirmação”, e sim relacionar o tipo de erro ao dano clínico."
  },
  {
   "id": 7,
   "tema": "Epidemiologia",
   "subtema": "Testes diagnósticos",
   "competencia": "Valores preditivos e probabilidade pré-teste",
   "dificuldade": "Muito alta",
   "enunciado": "O mesmo teste rápido, com sensibilidade de 90% e especificidade de 90%, é usado em dois contextos. No ambulatório A, os pacientes foram encaminhados por forte suspeita clínica e a prevalência da doença é de 30%. Na campanha B, o teste é oferecido a adultos assintomáticos de baixo risco e a prevalência estimada é de 1%. Um gestor estranha que, na campanha, muitos resultados positivos não sejam confirmados pelo teste de referência. Sem assumir mudança na qualidade técnica do exame, qual explicação é epidemiologicamente mais adequada?",
   "alternativas": {
    "A": "A sensibilidade necessariamente caiu na campanha, porque testes mantêm valor preditivo positivo constante quando especificidade não se altera.",
    "B": "A especificidade necessariamente aumentou no ambulatório, pois maior prevalência transforma falsos-positivos em verdadeiros positivos.",
    "C": "Em uma população de baixa prevalência, o número de falsos-positivos pode ser relevante em relação aos poucos verdadeiros positivos, reduzindo o valor preditivo positivo.",
    "D": "O valor preditivo positivo é uma propriedade intrínseca do teste e, portanto, a diferença só pode ser explicada por erro de laboratório."
   },
   "gabarito": "C",
   "porqueCorreta": "Em uma população de 1% de prevalência, há pouquíssimos verdadeiros doentes e muitos não doentes. Com especificidade de 90%, cerca de 10% dos não doentes podem testar positivo; como esse grupo é numericamente enorme, os falsos-positivos podem superar os verdadeiros positivos. O resultado é queda do valor preditivo positivo. No ambulatório de 30% de prevalência, uma fração maior dos positivos será composta por verdadeiros doentes, elevando o VPP.",
   "avalia": "Sensibilidade e especificidade podem permanecer iguais enquanto valores preditivos mudam bastante. O que muda é a composição da população testada, especialmente a prevalência ou probabilidade pré-teste.",
   "detalhe": "Quanto menor a prevalência, menor tende a ser o VPP, mantidos sensibilidade e especificidade.",
   "distratores": {
    "A": "Não é necessário supor queda de sensibilidade. Sensibilidade descreve o desempenho entre doentes e pode permanecer 90% nos dois contextos. O que muda é a probabilidade de que um resultado positivo represente doença real.",
    "B": "Prevalência não “transforma” falsos-positivos em verdadeiros positivos e não altera mecanicamente a especificidade. Ela altera a proporção de verdadeiros e falsos resultados dentro do conjunto de testados.",
    "D": "Valor preditivo positivo não é propriedade fixa do teste. É uma probabilidade pós-teste dependente do desempenho do teste e da probabilidade pré-teste."
   },
   "padraoErro": "Cálculo e interpretação",
   "pegadinha": "A questão testa se o candidato separa propriedades mais estáveis do teste de medidas dependentes do contexto populacional."
  },
  {
   "id": 8,
   "tema": "Epidemiologia",
   "subtema": "Desenhos de estudo",
   "competencia": "Estudo transversal e causalidade reversa",
   "dificuldade": "Alta",
   "enunciado": "Pesquisadores avaliam 2.500 idosos de uma cidade em uma única visita. Registram nível de atividade física nas quatro semanas anteriores e presença de limitação funcional naquele mesmo momento. A análise mostra maior prevalência de limitação entre os idosos que relatam baixa atividade física. No artigo, os autores afirmam que a baixa atividade física 'causou' a limitação funcional e defendem que a associação observada demonstra a direção causal. Ao revisar criticamente o estudo, qual é a principal limitação dessa conclusão?",
   "alternativas": {
    "A": "Como exposição e desfecho foram aferidos no mesmo recorte temporal, não é possível estabelecer com segurança a temporalidade; a própria limitação funcional pode ter reduzido a atividade física.",
    "B": "Estudos transversais não permitem estimar prevalência, portanto a associação descrita não poderia ter sido calculada.",
    "C": "O problema central é a ausência de randomização, pois todo estudo observacional é incapaz de produzir qualquer evidência útil sobre associações.",
    "D": "A conclusão só seria inválida se o tamanho da amostra fosse pequeno; com 2.500 participantes, a temporalidade deixa de ser uma preocupação."
   },
   "gabarito": "A",
   "porqueCorreta": "A alternativa A identifica a limitação central: não se sabe se a baixa atividade física precedeu a limitação funcional ou se a própria limitação reduziu a atividade. Essa possibilidade é causalidade reversa. A grande amostra melhora precisão estatística, mas não modifica a estrutura temporal do desenho. Assim, a associação observada é válida como associação transversal, mas a afirmação “causou” extrapola o que o estudo demonstra.",
   "avalia": "O desenho transversal mede exposição e desfecho praticamente no mesmo recorte temporal. Ele é útil para prevalência e associação, mas pode falhar na demonstração de temporalidade, condição necessária para uma inferência causal forte.",
   "detalhe": "Transversal: bom para prevalência e associação; cautela com temporalidade e causalidade reversa.",
   "distratores": {
    "B": "Estudos transversais são justamente muito utilizados para estimar prevalência. O problema não é incapacidade de medir frequência, e sim de estabelecer com segurança a ordem temporal entre exposição e desfecho.",
    "C": "Estudos observacionais podem gerar evidência relevante e, em muitos contextos, são essenciais. A ausência de randomização não torna qualquer associação inútil; o limite específico aqui é a temporalidade.",
    "D": "Tamanho amostral atua principalmente sobre erro aleatório e precisão. Não corrige causalidade reversa nem cria informação temporal que não foi coletada."
   },
   "padraoErro": "Decisão em saúde pública",
   "pegadinha": "A banca oferece “amostra grande” como falsa solução para um problema de desenho. Precisão não corrige viés estrutural."
  },
  {
   "id": 9,
   "tema": "Epidemiologia",
   "subtema": "Desenhos de estudo",
   "competencia": "Caso-controle e medida de associação",
   "dificuldade": "Alta",
   "enunciado": "Uma doença neurológica rara tem incidência anual muito baixa. Para investigar possível associação com exposição ocupacional a solventes, pesquisadores selecionam 300 pacientes com diagnóstico recente e 600 indivíduos sem a doença, oriundos da mesma população de referência e pareados por faixa etária. Em seguida, reconstroem o histórico ocupacional dos últimos 15 anos a partir de registros e entrevistas. Um residente sugere calcular diretamente o risco de adoecimento entre expostos e não expostos usando a proporção de casos em cada grupo do estudo. Qual é a análise mais adequada?",
   "alternativas": {
    "A": "O risco relativo pode ser calculado diretamente, pois o número de controles foi definido apenas para aumentar a precisão.",
    "B": "Deve-se calcular incidência acumulada entre expostos e não expostos, porque todos os participantes têm histórico ocupacional conhecido.",
    "C": "O desenho é transversal, e a medida apropriada é a razão de prevalências entre os grupos com e sem exposição.",
    "D": "Como os participantes foram selecionados pelo status de doença, a odds ratio é a medida de associação apropriada; o risco absoluto não é estimado diretamente desse conjunto amostral."
   },
   "gabarito": "D",
   "porqueCorreta": "A odds ratio é a medida clássica porque compara as chances de exposição entre casos e controles. Mesmo que o histórico de exposição seja reconstruído com precisão, não se pode calcular diretamente incidência acumulada ou risco relativo a partir dessa amostra, pois o número de casos e controles foi artificialmente determinado pelo desenho. Em doenças raras, a OR pode aproximar o RR sob condições apropriadas, mas isso não transforma o desenho em coorte.",
   "avalia": "No caso-controle, a amostra é construída a partir do desfecho: escolhem-se casos e controles. Como o pesquisador define quantos casos e controles entram, a proporção de doentes na amostra não representa risco populacional.",
   "detalhe": "Selecionou por desfecho? Pense em caso-controle e odds ratio.",
   "distratores": {
    "A": "O número de controles não é apenas um detalhe de precisão; ele é parte da seleção pelo desfecho. A proporção de casos na amostra não é a proporção de doentes na população de origem.",
    "B": "Conhecer retrospectivamente a exposição não fornece o denominador populacional necessário para incidência. Incidência requer acompanhamento ou reconstrução de uma população sob risco definida por exposição, não seleção por doença.",
    "C": "O desenho não é transversal porque os participantes foram selecionados com base na presença ou ausência da doença e o histórico de exposição foi reconstruído retrospectivamente."
   },
   "padraoErro": "Cálculo e interpretação",
   "pegadinha": "A presença de “histórico de 15 anos” pode induzir o candidato a pensar em coorte. O critério que define o desenho é como os participantes foram selecionados."
  },
  {
   "id": 10,
   "tema": "Epidemiologia",
   "subtema": "Desenhos de estudo",
   "competencia": "Coorte, temporalidade e perdas de seguimento",
   "dificuldade": "Muito alta",
   "enunciado": "Um grupo de 4.000 trabalhadores sem doença respiratória é classificado, no início de 2026, conforme exposição ocupacional a poeira mineral e acompanhado por oito anos para ocorrência de doença pulmonar. Ao final, a incidência é maior entre expostos. Entretanto, 28% dos trabalhadores expostos e 6% dos não expostos deixaram o estudo antes do término, e os pesquisadores não conhecem o estado de saúde de grande parte dessas pessoas. Qual interpretação do resultado é metodologicamente mais cuidadosa?",
   "alternativas": {
    "A": "A associação observada é necessariamente causal porque, em coortes, a exposição precede o desfecho e perdas de seguimento não afetam validade.",
    "B": "O desenho permite avaliar temporalidade e incidência, mas perdas diferenciais relevantes podem introduzir viés de seleção se a saída estiver relacionada à exposição e ao risco de doença.",
    "C": "Como houve mais perdas entre expostos, o estudo deixa de ser uma coorte e passa a ser automaticamente um caso-controle.",
    "D": "A única consequência das perdas é reduzir o tamanho amostral; diferenças entre grupos não podem distorcer a estimativa de associação."
   },
   "gabarito": "B",
   "porqueCorreta": "A alternativa B reconhece o equilíbrio correto entre força e limitação do desenho. A incidência maior entre expostos é informativa, mas 28% de perdas entre expostos versus 6% entre não expostos é um sinal de alerta. Se a probabilidade de abandonar o estudo estiver relacionada à exposição e ao risco de doença, os participantes que permanecem podem não representar mais os grupos originais, produzindo viés de seleção. A direção do viés dependerá de quem se perdeu e de seu prognóstico.",
   "avalia": "A coorte preserva uma vantagem importante: exposição é definida antes do desfecho, permitindo avaliar temporalidade e incidência. Porém, perdas de seguimento podem comprometer validade quando são grandes e diferentes entre grupos.",
   "detalhe": "Perda diferencial + relação com prognóstico = risco de viés de seleção.",
   "distratores": {
    "A": "Temporalidade é requisito importante para causalidade, mas não suficiente. Confusão, viés, erros de aferição e perdas de seguimento ainda podem distorcer resultados.",
    "C": "Perdas não mudam a classificação do desenho. Continua sendo uma coorte, porém uma coorte com ameaça à validade interna devido ao seguimento incompleto.",
    "D": "Perdas podem reduzir precisão, mas não só isso. Quando diferenciais e relacionadas ao desfecho, podem alterar sistematicamente a estimativa de associação."
   },
   "padraoErro": "Decisão em saúde pública",
   "pegadinha": "A banca testa a falsa ideia de que coorte “prova” causalidade. Nenhum desenho fica imune a problemas de validade apenas por estabelecer temporalidade."
  },
  {
   "id": 11,
   "tema": "Epidemiologia",
   "subtema": "Desenhos de estudo",
   "competencia": "Randomização e comparabilidade",
   "dificuldade": "Alta",
   "enunciado": "Um ensaio clínico multicêntrico compara duas estratégias de acompanhamento de pacientes com insuficiência cardíaca. Antes da inclusão, os pesquisadores identificam diversos fatores prognósticos capazes de influenciar reinternações, como idade, fração de ejeção, função renal e adesão terapêutica. Os participantes elegíveis são então distribuídos aleatoriamente entre a intervenção e o cuidado habitual. Ao discutir o protocolo, um membro da equipe afirma que a randomização foi feita principalmente para 'garantir que nenhum fator de risco interfira no resultado'. Qual formulação descreve de maneira mais precisa a função da randomização?",
   "alternativas": {
    "A": "Ela elimina completamente confundimento e diferenças basais, de modo que qualquer desequilíbrio observado depois do sorteio deve ser considerado erro de análise.",
    "B": "Ela impede perdas de seguimento e contaminação entre grupos, pois participantes randomizados tendem a permanecer na estratégia designada.",
    "C": "Ela tende a distribuir fatores prognósticos conhecidos e desconhecidos entre os grupos, reduzindo confundimento em média, embora desequilíbrios casuais ainda possam ocorrer.",
    "D": "Ela aumenta automaticamente o tamanho efetivo da amostra e garante significância estatística quando a intervenção tem qualquer efeito."
   },
   "gabarito": "C",
   "porqueCorreta": "A alternativa C descreve com precisão o que a randomização faz e o que ela não faz. Em amostras suficientemente grandes, tende a equilibrar características prognósticas entre grupos e reduz confundimento. Entretanto, o sorteio não garante igualdade perfeita em cada estudo; desequilíbrios casuais podem ocorrer. Além disso, randomização não impede perdas, não garante adesão e não assegura significância estatística.",
   "avalia": "Randomização é um mecanismo probabilístico de alocação. Seu objetivo é tornar os grupos comparáveis em média, distribuindo fatores prognósticos conhecidos e desconhecidos sem escolha sistemática.",
   "detalhe": "Randomização reduz confundimento em média; não garante equilíbrio perfeito nem protege contra todos os vieses.",
   "distratores": {
    "A": "O termo “elimina completamente” é excessivo. Randomização reduz a chance de confundimento sistemático, mas diferenças basais podem surgir por acaso, especialmente em amostras menores.",
    "B": "Perdas e contaminação são problemas pós-randomização. Um participante pode abandonar o estudo ou receber a intervenção do outro grupo mesmo tendo sido corretamente randomizado.",
    "D": "Significância depende de efeito verdadeiro, variabilidade, tamanho da amostra, adesão e outros fatores. Randomizar não aumenta magicamente o tamanho efetivo nem garante p < 0,05."
   },
   "padraoErro": "Decisão em saúde pública",
   "pegadinha": "Alternativas erradas usam verbos absolutos - “elimina”, “impede”, “garante”. Em metodologia, esses absolutos costumam ser sinais de excesso de inferência."
  },
  {
   "id": 12,
   "tema": "Epidemiologia",
   "subtema": "Vieses",
   "competencia": "Viés de seleção por recrutamento",
   "dificuldade": "Alta",
   "enunciado": "Uma pesquisa municipal pretende estimar a associação entre qualidade do sono e hipertensão em adultos. Por facilidade logística, os pesquisadores recrutam voluntários em duas academias de alto padrão e em um evento esportivo local. A pressão arterial é medida com protocolo rigoroso, e o sono é avaliado com instrumento validado. Ao comparar o perfil dos participantes com o censo municipal, observa-se que a amostra é mais jovem, tem renda mais alta e pratica muito mais atividade física que a população da cidade. A equipe argumenta que a precisão das medidas elimina preocupação com viés. Qual é a avaliação mais adequada?",
   "alternativas": {
    "A": "Permanece risco importante de viés de seleção, porque a forma de recrutamento pode produzir uma amostra sistematicamente diferente da população-alvo, mesmo com medidas individuais muito precisas.",
    "B": "Não há viés relevante, pois instrumentos validados corrigem automaticamente diferenças entre participantes e não participantes.",
    "C": "O problema é exclusivamente viés de aferição, já que pressão arterial e sono foram medidos por métodos diferentes.",
    "D": "O estudo sofre apenas erro aleatório; aumentar o tamanho da amostra nas academias resolveria a representatividade."
   },
   "gabarito": "A",
   "porqueCorreta": "Recrutar em academias de alto padrão e evento esportivo tende a super-representar pessoas mais jovens, de maior renda e fisicamente ativas. Essas características podem estar relacionadas tanto ao sono quanto à hipertensão. Portanto, a composição da amostra pode alterar prevalências e até a própria associação entre exposição e desfecho. Instrumentos validados melhoram validade de aferição, mas não restauram representatividade nem corrigem viés de seleção.",
   "avalia": "O problema nasce antes da aferição: a forma de recrutamento seleciona pessoas muito diferentes da população-alvo. Medidas excelentes não corrigem uma amostra obtida por um mecanismo sistematicamente seletivo.",
   "detalhe": "Medição precisa não corrige amostragem seletiva.",
   "distratores": {
    "B": "Validade de medida e validade de seleção são problemas distintos. Um questionário perfeito mede muito bem aquilo que ocorre na amostra escolhida, mas não garante que essa amostra represente a população municipal.",
    "C": "Não há evidência de erro de aferição só porque pressão e sono foram medidos por instrumentos diferentes. Cada variável exige método próprio; o problema descrito é quem foi recrutado.",
    "D": "Aumentar o número de participantes recrutados nos mesmos locais pode reduzir erro aleatório, mas preserva o mecanismo de seleção. Uma amostra grande e enviesada continua enviesada."
   },
   "padraoErro": "Decisão em saúde pública",
   "pegadinha": "A questão contrapõe precisão da medida a validade da amostra. Uma não compensa a outra."
  },
  {
   "id": 13,
   "tema": "Epidemiologia",
   "subtema": "Vieses",
   "competencia": "Viés de memória em caso-controle",
   "dificuldade": "Alta",
   "enunciado": "Pesquisadores realizam estudo caso-controle para investigar uso de medicamentos durante o primeiro trimestre da gestação e uma malformação congênita rara. As mães são entrevistadas 18 meses após o parto. Durante o treinamento dos entrevistadores, percebe-se que mães de crianças afetadas frequentemente revisaram receitas antigas, conversaram com familiares e tentaram reconstruir cada exposição, enquanto mães dos controles tendem a responder com menos detalhe. Se esse padrão ocorrer sistematicamente, qual efeito metodológico é mais provável?",
   "alternativas": {
    "A": "Apenas perda de precisão, porque diferenças de recordação não alteram estimativas de associação se o questionário for o mesmo.",
    "B": "Viés de memória, com possibilidade de classificação diferencial da exposição entre casos e controles e consequente distorção da odds ratio.",
    "C": "Confusão obrigatória por indicação, pois qualquer medicamento usado na gestação é automaticamente associado ao desfecho.",
    "D": "Viés de seleção, porque a lembrança posterior ao desfecho muda quem foi incluído no estudo."
   },
   "gabarito": "B",
   "porqueCorreta": "Mães de crianças com malformação têm forte motivação para reconstruir minuciosamente exposições durante a gestação, enquanto mães de controles podem lembrar menos detalhes. Essa diferença sistemática pode fazer medicamentos parecerem mais ou menos associados ao desfecho do que realmente são. Como a qualidade da informação varia conforme o status de caso, a odds ratio pode ser distorcida em qualquer direção; não é apenas uma questão de imprecisão.",
   "avalia": "Em estudos retrospectivos, o conhecimento do desfecho pode influenciar quanto e como a exposição passada é lembrada. Quando casos e controles recordam de forma diferente, ocorre classificação diferencial da exposição.",
   "detalhe": "Caso-controle + recordação diferente entre casos e controles = viés de memória.",
   "distratores": {
    "A": "Se o erro de recordação fosse aleatório e semelhante entre grupos, poderia haver principalmente diluição da associação. Aqui, porém, o padrão é diferencial entre casos e controles, configurando potencial erro sistemático.",
    "C": "Confusão por indicação ocorre quando a condição que levou ao uso do medicamento também está relacionada ao desfecho. Isso pode existir em alguns estudos, mas não é o mecanismo descrito pelo enunciado.",
    "D": "Viés de seleção diz respeito a quem entra ou permanece no estudo. Neste caso, os participantes já foram selecionados; o problema é a qualidade da informação sobre exposição."
   },
   "padraoErro": "Decisão em saúde pública",
   "pegadinha": "A banca quer que você identifique em qual etapa nasce o erro: seleção de participantes ou recuperação da informação."
  },
  {
   "id": 14,
   "tema": "Epidemiologia",
   "subtema": "Causalidade",
   "competencia": "Confusão e interpretação de ajuste",
   "dificuldade": "Muito alta",
   "enunciado": "Um estudo observacional encontra associação entre consumo elevado de café e infarto agudo do miocárdio. Na análise bruta, RR = 1,8. Após ajuste para tabagismo, o RR cai para 1,1. Os autores verificam que grandes consumidores de café fumavam com maior frequência e que o tabagismo é fator independente para infarto. Não há evidência de que beber café seja etapa necessária para começar a fumar ou vice-versa. Qual interpretação é mais consistente com esses achados?",
   "alternativas": {
    "A": "O tabagismo é um mediador obrigatório entre café e infarto, e por isso nunca deveria ter sido ajustado.",
    "B": "A queda do RR prova que o café não tem qualquer efeito causal e que todo resultado residual é erro aleatório.",
    "C": "O café é o confundidor, porque foi a exposição escolhida originalmente pelos pesquisadores.",
    "D": "O tabagismo é um possível fator de confusão: relaciona-se à exposição e ao desfecho e seu ajuste reduziu substancialmente a associação observada."
   },
   "gabarito": "D",
   "porqueCorreta": "Grandes consumidores de café fumavam mais, e tabagismo é fator independente para infarto. Na análise bruta, parte da associação café-infarto pode refletir essa distribuição desigual de fumantes. Após ajuste, o RR cai de 1,8 para 1,1, aproximando-se do valor nulo. Isso é compatível com confusão importante pelo tabagismo. Ainda assim, o ajuste não “prova” ausência absoluta de efeito do café; apenas mostra que grande parte da associação bruta era explicada pelo confundidor.",
   "avalia": "Um confundidor é uma terceira variável associada à exposição e ao desfecho, sem ser mero intermediário causal. O tabagismo cumpre esse padrão no enunciado e a mudança importante do RR após ajuste reforça sua influência.",
   "detalhe": "Variável associada à exposição e ao desfecho, fora do caminho causal, com mudança relevante após ajuste = confusão.",
   "distratores": {
    "A": "Para ser mediador, o tabagismo precisaria estar no caminho causal café -> tabagismo -> infarto. O enunciado explicitamente não sustenta essa relação temporal/causal.",
    "B": "A queda da estimativa reduz a evidência de uma associação independente forte, mas não demonstra matematicamente efeito zero. Pode haver efeito residual, erro de medida ou confusão residual.",
    "C": "Café é a exposição principal. O confundidor é a variável externa que se relaciona a exposição e desfecho e distorce sua relação."
   },
   "padraoErro": "Decisão em saúde pública",
   "pegadinha": "A banca explora a diferença entre confundidor e mediador. Ajustar um confundidor é desejável; ajustar um mediador pode remover parte do efeito causal que se pretende estimar."
  },
  {
   "id": 15,
   "tema": "Bioestatística",
   "subtema": "Medidas de tendência central",
   "competencia": "Mediana em distribuição assimétrica",
   "dificuldade": "Média-alta",
   "enunciado": "Uma equipe de saúde do trabalhador analisa o número de dias de afastamento em 11 funcionários após um surto de doença respiratória. Dez trabalhadores permaneceram afastados entre 2 e 6 dias; um trabalhador, que evoluiu com complicação grave, ficou 45 dias afastado. O gestor deseja resumir o 'tempo típico' de afastamento para planejamento de cobertura de pessoal, sem permitir que esse caso extremo domine a medida central. Qual escolha estatística é mais apropriada e qual é sua justificativa?",
   "alternativas": {
    "A": "Utilizar a média, porque valores extremos devem sempre ser incorporados integralmente à medida que representa o centro da distribuição.",
    "B": "Utilizar o desvio-padrão, pois medidas de dispersão substituem medidas de tendência central quando existe um outlier.",
    "C": "Utilizar a mediana, porque ela é menos sensível ao valor extremo e representa melhor a posição central em uma distribuição fortemente assimétrica.",
    "D": "Utilizar a variância, pois elevar os desvios ao quadrado reduz a influência de observações muito distantes."
   },
   "gabarito": "C",
   "porqueCorreta": "A mediana é o valor que ocupa a posição central após ordenar os dados. Como depende da posição, e não da magnitude extrema de cada observação, um afastamento de 45 dias altera pouco ou nada a mediana quando os demais valores estão entre 2 e 6 dias. Isso a torna uma medida adequada para resumir “tempo típico” em uma distribuição fortemente assimétrica. Em um relatório completo, poderia ser acompanhada por intervalo interquartil para expressar dispersão.",
   "avalia": "O objetivo é descrever o valor típico sem deixar que um único afastamento de 45 dias puxe a medida central. Em distribuições assimétricas com outliers, a mediana é robusta e representa melhor a posição central.",
   "detalhe": "Distribuição assimétrica + outlier + valor típico = mediana.",
   "distratores": {
    "A": "A média incorpora intensamente valores extremos. Neste conjunto, o caso de 45 dias elevaria a média e poderia sugerir um tempo de afastamento “típico” maior do que o observado na maioria dos trabalhadores.",
    "B": "Desvio-padrão mede dispersão em torno da média; não é uma medida de tendência central e não substitui média ou mediana.",
    "D": "Variância também é dispersão e, ao elevar desvios ao quadrado, aumenta a influência de valores extremos em vez de reduzi-la."
   },
   "padraoErro": "Cálculo e interpretação",
   "pegadinha": "A banca pode oferecer medidas estatísticas reais, mas inadequadas à pergunta. Primeiro identifique se o gestor quer centro ou dispersão."
  },
  {
   "id": 16,
   "tema": "Bioestatística",
   "subtema": "Inferência estatística",
   "competencia": "Intervalo de confiança e significância",
   "dificuldade": "Alta",
   "enunciado": "Dois estudos avaliam a associação entre uma exposição ocupacional e doença respiratória. O estudo 1 encontra RR = 1,40 com IC95% de 0,95 a 2,06. O estudo 2 encontra RR = 1,38 com IC95% de 1,18 a 1,61. Os autores do primeiro estudo afirmam que 'não existe associação', enquanto os do segundo afirmam que 'a exposição certamente causa a doença'. Considerando apenas as estimativas e seus intervalos, qual interpretação é mais adequada?",
   "alternativas": {
    "A": "O estudo 1 não atingiu significância estatística convencional porque o IC inclui 1, mas isso não prova ausência de efeito; o estudo 2 tem estimativa mais precisa e intervalo que não inclui o valor nulo, sem que isso, isoladamente, prove causalidade.",
    "B": "Ambos os estudos são estatisticamente significativos porque os riscos relativos pontuais são maiores que 1.",
    "C": "O estudo 1 demonstra efeito protetor, pois parte do intervalo está abaixo de 1, e o estudo 2 prova causalidade porque seu intervalo é estreito.",
    "D": "O estudo 2 é menos preciso, pois intervalos mais estreitos refletem maior incerteza sobre o parâmetro populacional."
   },
   "gabarito": "A",
   "porqueCorreta": "No estudo 1, IC95% 0,95-2,06 inclui 1; portanto, no teste bilateral convencional a 5%, o resultado não é estatisticamente significativo. Isso não significa que “não existe associação”: o intervalo também é compatível com aumento de risco relevante, refletindo incerteza. No estudo 2, IC95% 1,18-1,61 não inclui 1 e é mais estreito, indicando maior precisão e evidência estatística de associação. Ainda assim, causalidade depende de desenho, vieses, confusão, temporalidade e coerência, não apenas do IC.",
   "avalia": "Para medidas de razão, como RR, o valor nulo é 1. O intervalo de confiança informa uma faixa de valores compatíveis com os dados e a precisão da estimativa; não é uma prova de causalidade nem de ausência de efeito.",
   "detalhe": "IC inclui 1: compatível com nulidade; IC estreito: maior precisão; nenhum dos dois, isoladamente, prova causalidade.",
   "distratores": {
    "B": "Um estimador pontual maior que 1 não basta para significância; é necessário considerar sua incerteza. O estudo 1 tem RR > 1, mas o IC inclui o valor nulo.",
    "C": "Ter parte do intervalo abaixo de 1 não demonstra efeito protetor quando o intervalo cruza 1. E um intervalo estreito não converte associação em causalidade.",
    "D": "Quanto mais estreito o intervalo, maior a precisão, porque há menor amplitude de valores plausíveis para o parâmetro."
   },
   "padraoErro": "Cálculo e interpretação",
   "pegadinha": "A banca testa duas confusões comuns: “não significativo = sem efeito” e “significativo = causal”. Ambas estão erradas."
  },
  {
   "id": 17,
   "tema": "Bioestatística",
   "subtema": "Testes de hipótese",
   "competencia": "Erro tipo I",
   "dificuldade": "Média-alta",
   "enunciado": "Um estudo testa uma intervenção sem efeito verdadeiro sobre mortalidade. Por acaso amostral, o grupo intervenção apresenta menos óbitos e o teste estatístico produz p < 0,05. Os pesquisadores rejeitam a hipótese nula e concluem que a intervenção reduz mortalidade. Estudos posteriores, maiores, não confirmam qualquer benefício. Dentro da lógica dos testes de hipótese, qual erro descreve melhor a decisão inicial?",
   "alternativas": {
    "A": "Erro tipo II, pois os pesquisadores deixaram de detectar um efeito que de fato existia.",
    "B": "Baixo poder, pois qualquer resultado falso-positivo decorre exclusivamente de amostra pequena.",
    "C": "Viés de seleção, pois p < 0,05 indica necessariamente diferença de recrutamento entre grupos.",
    "D": "Erro tipo I, porque a hipótese nula verdadeira foi rejeitada, produzindo um falso-positivo estatístico."
   },
   "gabarito": "D",
   "porqueCorreta": "Se a hipótese nula de “nenhuma diferença real” é verdadeira e, por acaso amostral, o teste produz p < 0,05 levando à rejeição da hipótese nula, ocorreu erro tipo I. O nível alfa define a probabilidade tolerada de cometer esse erro sob as premissas do teste. Estudos posteriores que não replicam o resultado são compatíveis com a interpretação de falso-positivo inicial, embora replicação por si só não seja parte da definição.",
   "avalia": "Erro tipo I é um falso-positivo estatístico: rejeitar a hipótese nula quando ela é verdadeira. O enunciado informa explicitamente que a intervenção não tem efeito verdadeiro, mas o estudo concluiu benefício.",
   "detalhe": "Tipo I = falso-positivo; rejeitar H0 verdadeira.",
   "distratores": {
    "A": "Erro tipo II é o oposto: deixar de rejeitar uma hipótese nula falsa, isto é, não detectar um efeito que realmente existe. Aqui, o estudo detectou um efeito inexistente.",
    "B": "Baixo poder se relaciona principalmente à chance de erro tipo II. Embora tamanho amostral influencie variabilidade, falso-positivo não é sinônimo de estudo pequeno.",
    "C": "p < 0,05 não diagnostica viés de seleção. Viés é um erro sistemático de desenho ou condução, enquanto o cenário descreve erro aleatório dentro do teste de hipótese."
   },
   "padraoErro": "Cálculo e interpretação",
   "pegadinha": "A forma mais segura é traduzir em linguagem simples: “vi efeito quando não havia” = tipo I; “não vi efeito quando havia” = tipo II."
  },
  {
   "id": 18,
   "tema": "Bioestatística",
   "subtema": "Testes de hipótese",
   "competencia": "Poder estatístico e erro tipo II",
   "dificuldade": "Alta",
   "enunciado": "Pesquisadores planejam um ensaio para detectar redução absoluta de 3 pontos percentuais em um desfecho. O cálculo inicial indica necessidade de 3.000 participantes, mas, por restrição orçamentária, apenas 900 poderão ser incluídos. O nível de significância será mantido em 5%, e não haverá mudança no efeito considerado clinicamente relevante. Qual consequência metodológica é mais provável dessa redução amostral?",
   "alternativas": {
    "A": "Aumentará automaticamente o risco de erro tipo I acima de 5%, porque alfa depende diretamente do tamanho da amostra.",
    "B": "O estudo terá menor poder para detectar o efeito previsto e maior probabilidade de erro tipo II, caso o efeito realmente exista.",
    "C": "O estudo se tornará imune a resultados clinicamente irrelevantes, pois amostras pequenas só detectam efeitos grandes e verdadeiros.",
    "D": "A redução amostral elimina confundimento, porque grupos menores são mais homogêneos."
   },
   "gabarito": "B",
   "porqueCorreta": "O estudo foi dimensionado para 3.000 participantes e terá apenas 900. Com menos informação, o erro-padrão aumenta e o intervalo de confiança tende a ficar mais amplo. Se a redução absoluta de 3 pontos percentuais realmente existir, o estudo terá maior chance de não atingir significância estatística e concluir incorretamente que não há diferença. Essa é a lógica do erro tipo II; poder é 1 - beta.",
   "avalia": "Mantendo alfa, tamanho de efeito e variabilidade, reduzir muito a amostra aumenta a incerteza e diminui a capacidade de detectar um efeito real. Isso reduz poder e aumenta beta, a probabilidade de erro tipo II.",
   "detalhe": "Menor n, mantendo o resto igual -> menor poder -> maior risco de erro tipo II.",
   "distratores": {
    "A": "O nível alfa é previamente definido em 5%. O tamanho da amostra não “aumenta automaticamente” alfa. Ele altera principalmente precisão e poder para um determinado efeito.",
    "C": "Amostras pequenas não são imunes a achados irrelevantes. Podem produzir estimativas instáveis, resultados falsos-negativos e, eventualmente, falsos-positivos por acaso.",
    "D": "Confundimento é um problema de comparabilidade entre grupos e relação entre variáveis, não é eliminado por reduzir tamanho amostral. Em ensaios, amostras menores podem até favorecer desequilíbrios casuais."
   },
   "padraoErro": "Cálculo e interpretação",
   "pegadinha": "A banca costuma misturar alfa, beta e poder. Memorize a relação lógica, não apenas a fórmula."
  },
  {
   "id": 19,
   "tema": "Saúde Coletiva",
   "subtema": "SUS - princípios",
   "competencia": "Universalidade",
   "dificuldade": "Média-alta",
   "enunciado": "Uma mulher migrante, sem emprego formal e sem comprovante recente de residência, procura uma unidade pública com dispneia e febre. Na recepção, é informada de que o atendimento só poderá ocorrer após comprovar contribuição previdenciária ou vínculo trabalhista no município. A justificativa apresentada é que os recursos locais devem ser reservados aos 'contribuintes do sistema'. A coordenação da unidade é chamada para avaliar a situação. Qual orientação é mais compatível com os princípios do SUS?",
   "alternativas": {
    "A": "Manter a exigência, porque universalidade garante acesso apenas às pessoas que financiam diretamente a seguridade social.",
    "B": "Restringir o atendimento à estabilização inicial e cobrar posteriormente todos os procedimentos, pois a ausência de contribuição exclui cobertura integral.",
    "C": "Garantir o atendimento conforme necessidade de saúde, pois o direito às ações e serviços do SUS não depende de contribuição previdenciária individual.",
    "D": "Encaminhar a usuária para assistência social e adiar avaliação clínica até que seja comprovada residência formal no território."
   },
   "gabarito": "C",
   "porqueCorreta": "A mulher deve ser atendida conforme sua necessidade de saúde. A lógica do SUS rompe com o antigo modelo contributivo, no qual a assistência médica estava ligada à condição de segurado. Regras territoriais podem organizar adscrição, continuidade e financiamento, mas não justificam negar atendimento necessário, especialmente diante de sintomas potencialmente graves. A universalidade é compatível com organização da rede, mas não com exclusão por condição laboral.",
   "avalia": "Universalidade estabelece que saúde é direito de todos e dever do Estado. O acesso ao SUS não depende de contribuição previdenciária individual, vínculo formal de trabalho ou capacidade de pagamento.",
   "detalhe": "No SUS, direito ao cuidado não depende de ser contribuinte previdenciário.",
   "distratores": {
    "A": "Confunde SUS com seguro contributivo. O financiamento é coletivo e tributário; o direito individual ao cuidado não é condicionado a comprovar contribuição direta.",
    "B": "Cobrança como condição ou consequência automática do atendimento não decorre da universalidade. O SUS é um sistema público de acesso universal.",
    "D": "A falta de comprovante pode ser resolvida administrativamente sem postergar avaliação clínica. Adiar cuidado por documentação contraria o princípio e pode produzir dano."
   },
   "padraoErro": "Decisão em saúde pública",
   "pegadinha": "A banca frequentemente apresenta obstáculos administrativos plausíveis. A pergunta é se eles podem se sobrepor ao direito sanitário fundamental."
  },
  {
   "id": 20,
   "tema": "Saúde Coletiva",
   "subtema": "SUS - princípios",
   "competencia": "Equidade e alocação de recursos",
   "dificuldade": "Alta",
   "enunciado": "Duas microáreas de uma mesma equipe possuem aproximadamente 2.000 moradores cada. A microárea A apresenta maior proporção de gestantes adolescentes, famílias em extrema pobreza, dificuldade de transporte e taxa de internações evitáveis quase duas vezes maior. A microárea B tem melhores indicadores e maior disponibilidade de serviços privados. A gestão recebe recursos adicionais para ampliar visitas domiciliares e acompanhamento de condições crônicas. Um profissional defende dividir exatamente metade dos recursos para cada microárea, alegando que 'tratar todos igualmente' é a única forma justa. Qual decisão melhor expressa o princípio da equidade?",
   "alternativas": {
    "A": "Direcionar maior intensidade de ações à microárea A, com critérios transparentes baseados em necessidades e vulnerabilidades, sem excluir o acesso da microárea B.",
    "B": "Dividir recursos em partes exatamente iguais, independentemente das necessidades, porque qualquer diferenciação territorial viola universalidade.",
    "C": "Destinar todos os recursos à microárea A e suspender temporariamente o cuidado da microárea B, pois equidade exige exclusividade para o grupo mais vulnerável.",
    "D": "Distribuir recursos segundo a capacidade de pagamento das famílias, priorizando quem não possui plano de saúde como único critério."
   },
   "gabarito": "A",
   "porqueCorreta": "A microárea A tem indicadores claros de maior necessidade: pobreza, barreiras de transporte, gestação na adolescência e mais internações evitáveis. Direcionar maior quantidade de visitas e acompanhamento para essa área, com critérios transparentes, é compatível com equidade. Ao mesmo tempo, o direito da microárea B permanece preservado. A diferença de alocação é justificada por necessidade, não por preferência arbitrária.",
   "avalia": "Equidade não significa distribuir tudo de forma idêntica. Significa reconhecer necessidades e vulnerabilidades diferentes e ajustar a intensidade das ações para reduzir desigualdades injustas.",
   "detalhe": "Equidade = mais intensidade onde a necessidade é maior, sem retirar o direito dos demais.",
   "distratores": {
    "B": "Dividir 50/50 representa igualdade aritmética, mas pode ser injusto quando necessidades são desiguais. Tratar desigualmente situações desiguais, na medida da necessidade, é justamente a lógica da equidade.",
    "C": "Equidade não é exclusão total do grupo menos vulnerável. Suspender cuidado em B violaria universalidade e poderia criar novos riscos.",
    "D": "Ter ou não plano de saúde pode integrar uma análise de vulnerabilidade, mas não deve ser critério único. Equidade utiliza conjunto de necessidades sanitárias e sociais."
   },
   "padraoErro": "Cálculo e interpretação",
   "pegadinha": "A palavra “igual” soa justa, mas a banca quer distinguir igualdade formal de justiça distributiva em saúde."
  },
  {
   "id": 21,
   "tema": "Saúde Coletiva",
   "subtema": "SUS - princípios",
   "competencia": "Integralidade do cuidado",
   "dificuldade": "Alta",
   "enunciado": "Um homem de 58 anos com diabetes mellitus procura repetidamente a UBS por descompensação glicêmica. Nas últimas consultas, a equipe percebe que o problema não se resume à prescrição: ele mora sozinho, tem baixa renda, dificuldade para obter alimentos adequados, apresenta sintomas depressivos e deixou de comparecer à oftalmologia porque não conseguiu transporte. A glicemia permanece elevada apesar de sucessivos ajustes farmacológicos. Na reunião de equipe, discute-se qual plano de cuidado seria mais coerente com a integralidade. Qual proposta melhor traduz esse princípio?",
   "alternativas": {
    "A": "Intensificar apenas a dose dos hipoglicemiantes e aguardar resposta, porque aspectos sociais e emocionais não fazem parte do cuidado em saúde.",
    "B": "Encaminhar definitivamente o paciente para endocrinologia e encerrar o seguimento na APS, pois a presença de múltiplas necessidades exige cuidado exclusivamente especializado.",
    "C": "Manter o foco apenas no controle glicêmico, mas acrescentar mais exames laboratoriais, já que integralidade significa ampliar a quantidade de procedimentos.",
    "D": "Construir um plano que integre manejo clínico, saúde mental, acesso a medicamentos e alimentação, articulação social e coordenação dos encaminhamentos necessários, mantendo a APS como referência."
   },
   "gabarito": "D",
   "porqueCorreta": "A alternativa D propõe um plano articulado: manejo clínico, saúde mental, acesso a alimentação e medicamentos, apoio social e coordenação dos encaminhamentos. Essa abordagem não significa que a APS “faça tudo”, mas que reconheça necessidades relevantes e organize respostas em rede, mantendo uma referência longitudinal. O conceito inclui promoção, prevenção, tratamento, reabilitação e articulação intersetorial quando necessária.",
   "avalia": "Integralidade exige reconhecer a pessoa para além de um marcador biomédico isolado. No caso, o mau controle do diabetes está conectado a fatores clínicos, emocionais, sociais e de acesso à rede.",
   "detalhe": "Integralidade = responder de forma articulada às necessidades relevantes, não simplesmente aumentar procedimentos.",
   "distratores": {
    "A": "Ajustar apenas medicamentos ignora fatores que estão impedindo adesão e continuidade. A intervenção farmacológica isolada pode falhar repetidamente porque o problema é multidimensional.",
    "B": "Encaminhar pode ser parte do plano, mas transferir integralmente o cuidado rompe continuidade e coordenação. Multimorbidade e vulnerabilidade tornam a APS ainda mais importante como referência.",
    "C": "Aumentar exames não é sinônimo de integralidade. Mais procedimentos podem coexistir com cuidado fragmentado se as necessidades centrais não forem abordadas."
   },
   "padraoErro": "Decisão em saúde pública",
   "pegadinha": "A banca quer afastar a ideia de que integralidade significa “fazer muitos exames”. O foco é coerência e articulação das necessidades."
  },
  {
   "id": 22,
   "tema": "Saúde Coletiva",
   "subtema": "Organização do SUS",
   "competencia": "Regionalização, hierarquização e rede de atenção",
   "dificuldade": "Alta",
   "enunciado": "Um pequeno município não dispõe de maternidade de alto risco nem serviço de hemodinâmica. Gestantes de alto risco e pacientes com síndrome coronariana são estabilizados localmente e encaminhados para referências definidas em uma região de saúde. A APS acompanha os usuários antes e depois dos atendimentos especializados, e a central de regulação organiza os fluxos segundo necessidade clínica e capacidade instalada. Ao avaliar esse arranjo, um gestor afirma que o município 'perde autonomia' porque nem todos os serviços estão dentro de seu território. Qual análise é mais adequada?",
   "alternativas": {
    "A": "O arranjo é incompatível com descentralização, pois cada município deveria oferecer integralmente todos os níveis de complexidade dentro de suas fronteiras.",
    "B": "O arranjo expressa regionalização e hierarquização: diferentes serviços se articulam em rede no território regional, com fluxos entre níveis de complexidade e coordenação do cuidado.",
    "C": "O sistema só poderia ser considerado regionalizado se os usuários tivessem livre acesso direto a qualquer serviço especializado, sem regulação ou referência.",
    "D": "A organização descrita representa privatização do cuidado, porque serviços de referência fora do município não podem integrar o SUS local."
   },
   "gabarito": "B",
   "porqueCorreta": "A descrição corresponde a uma rede regionalizada e hierarquizada: APS e serviços locais resolvem o que está dentro de sua capacidade, estabilizam casos quando necessário e encaminham para referências regionais de maior complexidade. A regulação organiza acesso conforme necessidade e capacidade instalada, e a APS retoma o seguimento após a atenção especializada. Isso aumenta racionalidade e integralidade da rede.",
   "avalia": "Nenhum município precisa ser autossuficiente em todas as tecnologias. A organização regional permite compartilhar serviços de maior complexidade, com fluxos definidos, regulação e continuidade entre níveis.",
   "detalhe": "Integralidade pode ser alcançada regionalmente por uma rede articulada de diferentes níveis.",
   "distratores": {
    "A": "Descentralização não significa que cada município tenha maternidade de alto risco, hemodinâmica e todos os serviços especializados. Isso seria ineficiente e muitas vezes inviável.",
    "C": "Livre acesso irrestrito a qualquer nível não define regionalização. Redes de atenção precisam de fluxos, critérios e coordenação para evitar fragmentação e uso inadequado.",
    "D": "Referência fora do município não implica privatização. Serviços intermunicipais podem ser públicos e integrar formalmente a rede do SUS."
   },
   "padraoErro": "Decisão em saúde pública",
   "pegadinha": "A banca explora a falsa equivalência entre “descentralizado” e “cada município faz tudo”."
  },
  {
   "id": 23,
   "tema": "Saúde Coletiva",
   "subtema": "Participação social",
   "competencia": "Conselho de Saúde",
   "dificuldade": "Alta",
   "enunciado": "A secretaria municipal apresenta proposta de reorganização da rede de saúde e pretende discutir prioridades orçamentárias, execução do plano e resultados alcançados. Um grupo sugere que essa discussão seja encaminhada a uma instância colegiada que funcione de maneira permanente, acompanhe a política de saúde ao longo do tempo e reúna representação de usuários, trabalhadores, gestores e prestadores. Qual instância corresponde melhor a essa função?",
   "alternativas": {
    "A": "O Conselho de Saúde, por seu caráter permanente e deliberativo no acompanhamento e controle social da política de saúde.",
    "B": "A Conferência de Saúde, porque substitui permanentemente a gestão e delibera semanalmente sobre a execução orçamentária.",
    "C": "A Central de Regulação, porque sua função é representar os diferentes segmentos sociais na formulação das políticas.",
    "D": "A Comissão Intergestores Bipartite, composta paritariamente por usuários e trabalhadores para fiscalizar os gastos municipais."
   },
   "gabarito": "A",
   "porqueCorreta": "O Conselho de Saúde participa da formulação de estratégias e do controle da execução da política, inclusive aspectos econômicos e financeiros, com representação social institucionalizada. Seu caráter permanente o diferencia das Conferências, que ocorrem periodicamente. Ele não substitui a gestão, mas exerce controle social e deliberação dentro de suas competências.",
   "avalia": "A pista decisiva é o caráter permanente, colegiado e de acompanhamento contínuo da política de saúde. Essas características pertencem ao Conselho de Saúde.",
   "detalhe": "Conselho = permanente e deliberativo; Conferência = periódica e propositiva.",
   "distratores": {
    "B": "Conferência de Saúde é periódica e voltada à avaliação da situação de saúde e proposição de diretrizes. Não funciona como instância semanal ou permanente de acompanhamento da execução.",
    "C": "Central de Regulação organiza acesso a serviços e vagas. Não é órgão de representação de usuários, trabalhadores, gestores e prestadores para controle social.",
    "D": "Comissões intergestores são espaços de pactuação entre gestores das esferas de governo. Não têm a composição social descrita nem a função de conselho."
   },
   "padraoErro": "Decisão em saúde pública",
   "pegadinha": "Conselho e Conferência aparecem juntos em muitas provas. Diferencie pela temporalidade e função: permanente versus periódico."
  },
  {
   "id": 24,
   "tema": "Saúde Coletiva",
   "subtema": "Participação social",
   "competencia": "Conferência de Saúde",
   "dificuldade": "Média-alta",
   "enunciado": "A cada ciclo de planejamento, o município organiza um encontro ampliado com representantes de usuários, trabalhadores, gestores e prestadores. O objetivo é analisar a situação de saúde do território, debater problemas prioritários e formular diretrizes que devem orientar a política pública nos anos seguintes. A atividade não substitui a gestão cotidiana nem permanece reunida de forma contínua. Qual caracterização é a mais adequada?",
   "alternativas": {
    "A": "Trata-se do Conselho de Saúde, cuja função principal é ocorrer periodicamente para definir diretrizes gerais.",
    "B": "Trata-se de audiência administrativa sem relação com o controle social, pois usuários não participam da formulação de políticas no SUS.",
    "C": "Trata-se de Conferência de Saúde, espaço periódico de avaliação da situação de saúde e proposição de diretrizes para a política do setor.",
    "D": "Trata-se de Comissão Intergestores, cuja atribuição principal é reunir representação social para definir prioridades locais."
   },
   "gabarito": "C",
   "porqueCorreta": "A alternativa C reúne exatamente as características essenciais: participação de diferentes segmentos, análise da situação sanitária e formulação de diretrizes. A Conferência não administra o cotidiano do sistema nem permanece reunida continuamente. Suas deliberações orientam planejamento e política, compondo o mecanismo institucional de participação social.",
   "avalia": "O evento descrito é ampliado, periódico e voltado a avaliar a situação de saúde e propor diretrizes para os anos seguintes. Essa é a lógica da Conferência de Saúde.",
   "detalhe": "Conferência = encontro periódico para avaliar a situação de saúde e propor diretrizes.",
   "distratores": {
    "A": "O Conselho é permanente e acompanha a execução da política ao longo do tempo. Dizer que sua função principal é ocorrer periodicamente inverte as características das duas instâncias.",
    "B": "Usuários participam formalmente do controle social do SUS. Classificar o encontro como simples audiência administrativa ignora o desenho constitucional e legal da participação social.",
    "D": "Comissões intergestores são espaços de negociação e pactuação entre gestores, não conferências de representação ampliada da sociedade."
   },
   "padraoErro": "Decisão em saúde pública",
   "pegadinha": "A banca muda apenas a frequência e a finalidade da instância. Leia os verbos: avaliar situação e propor diretrizes -> Conferência."
  },
  {
   "id": 25,
   "tema": "Atenção Primária",
   "subtema": "Atributos da APS",
   "competencia": "Acesso de primeiro contato",
   "dificuldade": "Alta",
   "enunciado": "Em um bairro, moradores costumam procurar diretamente pronto atendimento ou especialistas sempre que surge uma nova queixa, mesmo quando não há urgência. Entrevistas mostram que muitos não conseguem contato telefônico com a UBS, encontram poucas vagas para demanda espontânea e não sabem em quais situações a equipe pode resolver o problema. A gestão pretende reorganizar o acolhimento e ampliar formas de acesso. Qual atributo da APS está mais diretamente comprometido e qual mudança seria coerente com seu fortalecimento?",
   "alternativas": {
    "A": "Longitudinalidade; substituir todos os atendimentos por consultas anuais programadas com o mesmo profissional.",
    "B": "Coordenação; exigir que qualquer encaminhamento para outro ponto da rede seja autorizado pelo hospital de referência.",
    "C": "Orientação comunitária; restringir a procura espontânea e concentrar a agenda apenas em grupos de maior risco.",
    "D": "Acesso de primeiro contato; tornar a UBS efetivamente acessível e reconhecida como referência inicial para novas necessidades, sem impedir atendimento oportuno."
   },
   "gabarito": "D",
   "porqueCorreta": "Fortalecer esse atributo significa tornar a APS acessível e reconhecida como porta preferencial para novas demandas, com acolhimento e atendimento oportuno. Isso não significa impedir o acesso a urgências ou criar barreiras burocráticas; significa que a UBS deve ser uma opção real e confiável antes que usuários recorram desnecessariamente a pronto atendimento ou especialistas.",
   "avalia": "O problema é que a população não consegue usar a UBS como referência inicial quando surge uma nova necessidade. Barreiras telefônicas, poucas vagas e desconhecimento da capacidade resolutiva comprometem o acesso de primeiro contato.",
   "detalhe": "Primeiro contato = conseguir procurar e usar a APS quando surge uma nova necessidade.",
   "distratores": {
    "A": "Longitudinalidade trata da continuidade de relação ao longo do tempo. Consultas anuais com o mesmo profissional podem contribuir para vínculo, mas não resolvem a barreira imediata de acesso a novas queixas.",
    "B": "Coordenação diz respeito à integração do cuidado entre pontos da rede. Exigir autorização hospitalar seria uma barreira adicional e não tornaria a UBS porta de entrada efetiva.",
    "C": "Orientação comunitária é relevante, mas restringir demanda espontânea pioraria o problema de acesso. Priorização de risco não deve significar fechamento da porta para necessidades novas."
   },
   "padraoErro": "Conceito aplicado",
   "pegadinha": "A banca apresenta vários atributos verdadeiros da APS. O candidato precisa identificar qual está diretamente violado pelo comportamento descrito da população e pela organização da agenda."
  },
  {
   "id": 26,
   "tema": "Atenção Primária",
   "subtema": "Atributos da APS",
   "competencia": "Longitudinalidade",
   "dificuldade": "Alta",
   "enunciado": "Uma mulher de 74 anos com hipertensão, osteoartrose e ansiedade é acompanhada há sete anos pela mesma equipe de Saúde da Família. O médico conhece sua resposta a tratamentos anteriores, suas preferências, o contexto familiar e o receio que ela tem de determinados medicamentos. Mesmo quando consulta especialistas, retorna à equipe, que mantém seguimento regular e ajusta o plano de cuidado ao longo do tempo. Qual aspecto do caso melhor caracteriza a longitudinalidade?",
   "alternativas": {
    "A": "O fato de a usuária possuir múltiplas doenças, pois longitudinalidade é definida pelo número de problemas acompanhados.",
    "B": "A existência de uma fonte regular de cuidado e de uma relação continuada entre usuária e equipe, com conhecimento acumulado ao longo do tempo.",
    "C": "A realização de encaminhamentos para especialistas, porque longitudinalidade depende necessariamente de múltiplos níveis de atenção.",
    "D": "O acompanhamento por sete anos, independentemente de haver vínculo, continuidade relacional ou conhecimento da história da usuária."
   },
   "gabarito": "B",
   "porqueCorreta": "O caso mostra uma equipe que conhece respostas terapêuticas anteriores, preferências, contexto familiar e receios da usuária, e usa esse conhecimento para ajustar o cuidado. Essa continuidade relacional reduz fragmentação, facilita decisões compartilhadas e melhora a interpretação de mudanças clínicas ao longo do tempo. A paciente pode consultar especialistas e ainda assim manter longitudinalidade se a APS continuar como referência regular.",
   "avalia": "Longitudinalidade é uma relação continuada entre pessoa e fonte regular de cuidado, com conhecimento acumulado e confiança ao longo do tempo. Não é simplesmente “ter consultas por muitos anos”.",
   "detalhe": "Longitudinalidade = vínculo e conhecimento acumulado com uma fonte regular de cuidado.",
   "distratores": {
    "A": "Ter múltiplas doenças aumenta a necessidade de continuidade, mas não define o atributo. Uma pessoa com uma única condição também pode ter cuidado longitudinal.",
    "C": "Encaminhamentos não são requisito para longitudinalidade. Eles podem ocorrer, mas o atributo reside na relação continuada com uma fonte de cuidado.",
    "D": "Sete anos de contatos episódicos com profissionais diferentes, sem vínculo ou memória clínica compartilhada, não garantiriam longitudinalidade. O tempo cronológico é necessário, mas não suficiente."
   },
   "padraoErro": "Conceito aplicado",
   "pegadinha": "A banca diferencia continuidade de informação, continuidade relacional e simples duração do acompanhamento."
  },
  {
   "id": 27,
   "tema": "Atenção Primária",
   "subtema": "Atributos da APS",
   "competencia": "Coordenação do cuidado",
   "dificuldade": "Muito alta",
   "enunciado": "Um homem com insuficiência cardíaca recebe alta hospitalar após internação. O resumo de alta informa suspensão de um medicamento, início de dois novos fármacos e necessidade de retorno à cardiologia. Na primeira consulta na UBS, o paciente traz também uma receita antiga de outro serviço e não sabe quais comprimidos deve usar. A equipe identifica duplicidade de medicamentos e ausência de informação sobre um exame realizado durante a internação. Qual conduta melhor expressa o papel coordenador da APS?",
   "alternativas": {
    "A": "Reconciliar medicamentos, buscar informações faltantes, integrar as recomendações dos diferentes serviços e acompanhar o percurso do paciente na rede, mantendo um plano terapêutico coerente.",
    "B": "Manter todas as prescrições até o cardiologista decidir quais retirar, pois a APS não deve interferir em condutas emitidas por outros níveis.",
    "C": "Cancelar os encaminhamentos e assumir todo o cuidado exclusivamente na UBS, porque coordenação significa evitar participação de especialistas.",
    "D": "Limitar-se a registrar o resumo de alta no prontuário, pois transferência de informação documental é suficiente para garantir coordenação."
   },
   "gabarito": "A",
   "porqueCorreta": "Reconciliar medicamentos é fundamental após alta porque reduz duplicidades, omissões e interações. A APS também deve buscar o resultado do exame ausente, integrar recomendações hospitalares e cardiológicas e acompanhar se o paciente conseguiu acessar o retorno. Coordenação é um processo ativo de integração de informações, pessoas e serviços, não mero encaminhamento administrativo.",
   "avalia": "O paciente recebeu informações conflitantes e incompletas de vários pontos da rede. Coordenar significa transformar essas informações fragmentadas em um plano único, seguro e compreensível.",
   "detalhe": "Coordenação = integrar condutas e informações da rede em um plano terapêutico coerente.",
   "distratores": {
    "B": "Manter prescrições conflitantes até nova avaliação pode expor o paciente a dano. A APS tem responsabilidade clínica de revisar a segurança do tratamento e esclarecer discrepâncias.",
    "C": "Coordenação não significa excluir especialistas. Pelo contrário, pressupõe articular contribuições de diferentes níveis em torno de um plano coerente.",
    "D": "Registrar documentos é necessário, mas insuficiente. Informação só melhora cuidado quando é interpretada e incorporada a decisões e seguimento."
   },
   "padraoErro": "Decisão em saúde pública",
   "pegadinha": "A banca opõe “receber informação” a “usar informação para organizar o cuidado”. O segundo é coordenação de verdade."
  },
  {
   "id": 28,
   "tema": "Atenção Primária",
   "subtema": "Estratégia Saúde da Família",
   "competencia": "Territorialização e planejamento",
   "dificuldade": "Alta",
   "enunciado": "Uma equipe recém-formada recebe uma área adscrita com 4.500 habitantes. Antes de definir agenda, grupos e visitas, os profissionais levantam distribuição etária, pessoas acamadas, gestantes, condições de saneamento, equipamentos sociais, áreas com violência, barreiras geográficas, associações comunitárias e padrões de utilização dos serviços. Em seguida, cruzam essas informações com dados de morbidade e internações evitáveis. Qual é a principal finalidade desse processo?",
   "alternativas": {
    "A": "Produzir apenas um mapa geográfico da área, pois planejamento da APS deve ser padronizado nacionalmente e independe de necessidades locais.",
    "B": "Selecionar exclusivamente famílias de maior risco e retirar as demais da responsabilidade sanitária da equipe.",
    "C": "Conhecer o território como espaço social e sanitário para identificar necessidades, vulnerabilidades e recursos e orientar a programação das ações da equipe.",
    "D": "Substituir os sistemas de informação por observação local, pois dados epidemiológicos formais deixam de ser necessários após o mapeamento."
   },
   "gabarito": "C",
   "porqueCorreta": "A equipe coleta dados demográficos, sociais, ambientais, de acesso, morbidade e utilização de serviços e os cruza para reconhecer necessidades concretas. Esse diagnóstico territorial permite priorizar visitas, organizar grupos, definir busca ativa e articular recursos comunitários. O território é entendido como espaço vivo de relações sociais e riscos, e não como simples mapa.",
   "avalia": "Territorialização não é apenas desenhar limites geográficos. É compreender a população, vulnerabilidades, recursos, barreiras e dinâmica social para assumir responsabilidade sanitária e planejar ações.",
   "detalhe": "Territorializar é conhecer população, riscos, vulnerabilidades, recursos e barreiras para planejar.",
   "distratores": {
    "A": "Mapeamento geográfico é uma ferramenta, mas não a finalidade. Planejamento padronizado sem leitura local pode ignorar riscos e recursos específicos.",
    "B": "Estratificar risco e priorizar é legítimo, mas não retira responsabilidade sanitária sobre as demais famílias. A equipe continua responsável por toda a população adscrita.",
    "D": "Observação local e sistemas de informação são complementares. Abandonar dados epidemiológicos formais reduziria qualidade do diagnóstico do território."
   },
   "padraoErro": "Decisão em saúde pública",
   "pegadinha": "A banca testa uma visão “cartográfica” versus uma visão sanitária e social do território."
  },
  {
   "id": 29,
   "tema": "Atenção Primária",
   "subtema": "Estratégia Saúde da Família",
   "competencia": "Atuação do Agente Comunitário de Saúde",
   "dificuldade": "Alta",
   "enunciado": "Durante visita domiciliar, um Agente Comunitário de Saúde encontra um homem de 69 anos com hipertensão que interrompeu os medicamentos porque não conseguiu renovar a receita. Ele relata tontura ocasional, mas está consciente, sem dor torácica, dispneia ou déficit neurológico. O ACS observa ainda que o usuário tem dificuldade de locomoção e mora sozinho. A pressão arterial não é medida porque o ACS não dispõe do equipamento naquela visita. Qual conduta é mais adequada dentro do papel do ACS?",
   "alternativas": {
    "A": "Reiniciar os mesmos medicamentos na dose anteriormente prescrita e orientar duplicar a dose se a tontura persistir.",
    "B": "Identificar a necessidade, orientar sinais de alarme, comunicar a equipe e facilitar o acesso do usuário à avaliação e ao seguimento, registrando também a barreira de locomoção.",
    "C": "Considerar a situação resolvida porque não há sinais de emergência e aguardar a próxima visita mensal.",
    "D": "Solicitar exames laboratoriais e alterar o esquema anti-hipertensivo de forma autônoma para evitar deslocamento do usuário."
   },
   "gabarito": "B",
   "porqueCorreta": "A situação combina interrupção de tratamento, sintomas, dificuldade de locomoção e isolamento social. O ACS deve reconhecer a necessidade, orientar sinais de alarme, registrar as barreiras e articular avaliação pela equipe, inclusive possibilidade de visita ou acesso facilitado conforme organização local. Esse é o papel de ponte entre território e serviço, com acompanhamento contínuo.",
   "avalia": "O ACS identifica problemas no território, orienta, cria vínculo, comunica a equipe e facilita acesso. Ele não substitui avaliação clínica nem prescreve medicamentos autonomamente.",
   "detalhe": "ACS identifica, orienta, registra, comunica e facilita cuidado; não prescreve nem ajusta tratamento de forma autônoma.",
   "distratores": {
    "A": "Reiniciar ou duplicar dose de anti-hipertensivo é conduta clínica e pode causar dano, especialmente em pessoa com tontura e sem aferição da pressão. Não cabe ao ACS fazer esse ajuste autonomamente.",
    "C": "Ausência de sinais de emergência não significa ausência de necessidade. Interromper anti-hipertensivos e ter dificuldade de acesso exige resposta antes da próxima visita rotineira.",
    "D": "Solicitar exames e alterar esquema farmacológico são atos clínicos fora da autonomia do ACS. A solução é articular a equipe, não substituir profissionais."
   },
   "padraoErro": "Decisão em saúde pública",
   "pegadinha": "A banca pode colocar o ACS diante de um problema real para induzir “resolver na hora”. O limite profissional continua valendo mesmo quando a intenção é ajudar."
  },
  {
   "id": 30,
   "tema": "Vigilância Epidemiológica",
   "subtema": "Notificação compulsória",
   "competencia": "Notificação na suspeita e oportunidade da ação",
   "dificuldade": "Alta",
   "enunciado": "Um médico atende um paciente com quadro clínico altamente sugestivo de um agravo de notificação compulsória imediata. A confirmação depende de exame enviado a laboratório de referência, cujo resultado pode demorar vários dias. O paciente mora em local de alta densidade populacional e houve contato próximo com várias pessoas durante o período potencialmente transmissível. O profissional hesita em notificar antes do resultado, temendo 'alarmar a vigilância sem certeza diagnóstica'. Qual é a conduta mais adequada?",
   "alternativas": {
    "A": "Aguardar obrigatoriamente o resultado confirmatório, porque a vigilância só deve ser acionada após diagnóstico definitivo.",
    "B": "Notificar apenas se surgir um segundo caso relacionado, pois um caso isolado nunca justifica resposta imediata.",
    "C": "Comunicar somente aos contatos do paciente e deixar a notificação formal para o laboratório de referência.",
    "D": "Notificar conforme o prazo previsto para o agravo quando a norma incluir casos suspeitos e iniciar as medidas de vigilância pertinentes sem aguardar confirmação definitiva."
   },
   "gabarito": "D",
   "porqueCorreta": "A alternativa D é cuidadosamente formulada: “quando a norma incluir casos suspeitos” e “conforme o prazo previsto”. Isso evita generalização indevida e preserva a lógica normativa. A vigilância pode iniciar investigação, avaliação de contatos e medidas específicas enquanto o laboratório confirma o diagnóstico. Notificação não significa declarar certeza; significa comunicar um evento que exige resposta.",
   "avalia": "Para agravos de notificação imediata, o valor da vigilância depende de oportunidade. Em muitos eventos, a suspeita clínica já aciona notificação e medidas de controle; esperar confirmação pode perder tempo epidemiologicamente crítico.",
   "detalhe": "Notificação é ferramenta de ação oportuna; em agravos definidos, suspeita já é suficiente.",
   "distratores": {
    "A": "Exigir confirmação em todos os casos pode atrasar intervenção e favorecer transmissão. Em doenças de resposta rápida, a sensibilidade do sistema de vigilância é prioritária.",
    "B": "Um único caso pode ser suficiente para notificação imediata, dependendo do agravo. A obrigação não nasce apenas quando aparece um cluster.",
    "C": "Orientar contatos pode ser parte do manejo, mas não substitui notificação formal quando ela é obrigatória. A responsabilidade não deve ser simplesmente transferida ao laboratório."
   },
   "padraoErro": "Decisão em saúde pública",
   "pegadinha": "A banca explora o medo de “notificar sem certeza”. Em vigilância, suspeita não é erro; é uma categoria operacional deliberada para permitir ação precoce."
  },
  {
   "id": 31,
   "tema": "Vigilância Epidemiológica",
   "subtema": "Investigação de surtos",
   "competencia": "Definição de caso e investigação epidemiológica",
   "dificuldade": "Muito alta",
   "enunciado": "Em uma escola, 42 alunos desenvolvem vômitos e diarreia entre a noite de terça-feira e a manhã de quarta-feira. A maioria havia almoçado no refeitório na terça-feira, mas o cardápio incluía cinco preparações diferentes. Alguns professores também adoeceram. A cozinha foi fechada preventivamente, porém ainda não há definição clara sobre qual exposição está associada aos casos. Antes de calcular medidas de associação ou atribuir responsabilidade a um alimento específico, a equipe de vigilância precisa organizar a investigação de modo a evitar mistura de casos não relacionados e perda de informações relevantes. Qual deve ser a prioridade metodológica inicial?",
   "alternativas": {
    "A": "Definir critérios operacionais de caso em termos clínicos, temporais e, quando pertinente, espaciais; realizar busca ativa e descrever os casos por tempo, lugar e pessoa antes de testar hipóteses de exposição.",
    "B": "Considerar caso apenas quem apresentou cultura positiva, mesmo que isso exclua grande parte dos doentes e atrase a investigação.",
    "C": "Selecionar o alimento mais consumido entre os doentes como fonte provável e concentrar a investigação apenas nessa exposição.",
    "D": "Comparar imediatamente a proporção de sintomas entre alunos e professores, pois a categoria ocupacional identifica por si só o agente etiológico."
   },
   "gabarito": "A",
   "porqueCorreta": "A definição de caso deve combinar critérios clínicos, temporais e, quando relevante, espaciais ou laboratoriais. Em seguida, a vigilância realiza busca ativa e descreve casos por tempo, lugar e pessoa, construindo curva epidêmica e identificando padrões. Só então formula hipóteses de exposição e calcula medidas de associação. Essa sequência reduz vieses e evita eleger culpados com base apenas em frequência de consumo.",
   "avalia": "Antes de testar qual alimento está associado ao surto, é preciso definir quem é caso e descrever o evento. Sem uma definição operacional consistente, qualquer comparação posterior pode misturar pessoas não relacionadas ou excluir casos verdadeiros.",
   "detalhe": "Surto: definição de caso -> busca ativa -> tempo/lugar/pessoa -> hipóteses -> estudo analítico.",
   "distratores": {
    "B": "Exigir cultura positiva para todos pode tornar a definição excessivamente específica e pouco sensível, além de atrasar investigação. Em surtos, casos prováveis e confirmados podem coexistir dentro de uma definição operacional.",
    "C": "O alimento mais consumido entre doentes pode também ter sido muito consumido entre não doentes. Sem grupo de comparação, frequência isolada não estabelece associação.",
    "D": "Ser aluno ou professor pode ajudar a descrever o padrão, mas não identifica automaticamente o agente ou veículo. É uma variável descritiva, não uma resposta etiológica."
   },
   "padraoErro": "Cálculo e interpretação",
   "pegadinha": "O impulso natural é “descobrir o alimento”. A banca exige disciplina metodológica: primeiro organize o evento, depois teste hipóteses."
  },
  {
   "id": 32,
   "tema": "Vigilância Epidemiológica",
   "subtema": "Indicadores",
   "competencia": "Letalidade versus mortalidade",
   "dificuldade": "Alta",
   "enunciado": "Dois municípios registram a mesma doença infecciosa. No município A ocorreram 400 casos e 20 óbitos entre os doentes; no município B ocorreram 80 casos e 8 óbitos. As populações totais são, respectivamente, 200.000 e 50.000 habitantes. A vigilância quer comparar especificamente a gravidade da doença entre as pessoas que adoeceram, e não o impacto populacional total. Qual comparação responde corretamente a essa pergunta?",
   "alternativas": {
    "A": "Comparar a mortalidade específica na população total, porque qualquer medida de gravidade deve usar habitantes no denominador.",
    "B": "Comparar a incidência acumulada, pois o número de casos novos determina a probabilidade de óbito entre os doentes.",
    "C": "Comparar a letalidade: 5% no município A e 10% no município B, indicando maior proporção de óbitos entre os casos em B.",
    "D": "Comparar a mortalidade proporcional por causa, pois ela informa diretamente a probabilidade de morrer depois de adquirir a doença."
   },
   "gabarito": "C",
   "porqueCorreta": "Município A: 20 óbitos entre 400 casos = 5%. Município B: 8 óbitos entre 80 casos = 10%. Embora B tenha menos casos e menos óbitos absolutos, a proporção de doentes que morre é maior. Isso sugere maior letalidade, que pode refletir virulência, perfil dos casos, acesso ao cuidado, atraso diagnóstico ou outros fatores. A comparação de gravidade clínica é diferente da comparação de impacto populacional.",
   "avalia": "A pergunta é sobre gravidade entre pessoas que já adoeceram. O denominador, portanto, deve ser o número de casos da doença, e a medida é letalidade.",
   "detalhe": "Óbitos entre doentes / total de doentes = letalidade.",
   "distratores": {
    "A": "Mortalidade específica usa a população total e responde quantas pessoas da população morrem pela doença. Pode ser maior em um município com muitos casos, mesmo que a doença seja menos letal entre os doentes.",
    "B": "Incidência mede aparecimento de doença, não probabilidade de óbito depois que a pessoa adoeceu.",
    "D": "Mortalidade proporcional usa o total de óbitos por todas as causas como denominador. Ela informa composição das mortes, não risco de morrer entre casos da doença."
   },
   "padraoErro": "Cálculo e interpretação",
   "pegadinha": "A banca muda apenas o denominador. Pergunte sempre: o denominador é população geral, casos, nascidos vivos ou total de óbitos?"
  },
  {
   "id": 33,
   "tema": "Vigilância Epidemiológica",
   "subtema": "Indicadores",
   "competencia": "Mortalidade infantil e interpretação do denominador",
   "dificuldade": "Alta",
   "enunciado": "Um município registrou 3.200 nascidos vivos em 2025. No mesmo ano, ocorreram 38 óbitos de crianças menores de 1 ano, sendo 22 no período neonatal. A secretaria pretende monitorar um indicador sintético sensível às condições de vida e à qualidade da atenção materno-infantil e compará-lo com anos anteriores. Um técnico propõe usar como denominador o total de crianças menores de 1 ano residentes no município em dezembro, enquanto outro sugere utilizar os nascidos vivos do período. Qual proposta está correta para o coeficiente de mortalidade infantil?",
   "alternativas": {
    "A": "Utilizar a população total do município, porque todos os habitantes contribuem para o risco de morte infantil.",
    "B": "Utilizar os nascidos vivos como denominador e os óbitos de menores de 1 ano como numerador, geralmente multiplicando a razão por 1.000.",
    "C": "Utilizar apenas os óbitos neonatais no numerador e todas as gestantes acompanhadas no pré-natal como denominador.",
    "D": "Utilizar as internações pediátricas como denominador, pois nascidos vivos não representam a população efetivamente exposta ao risco."
   },
   "gabarito": "B",
   "porqueCorreta": "Com os dados fornecidos, o indicador global seria 38/3.200 x 1.000, aproximadamente 11,9 óbitos infantis por mil nascidos vivos. Os 22 óbitos neonatais seriam usados se a pergunta fosse mortalidade neonatal, não mortalidade infantil total. O denominador de nascidos vivos permite comparação padronizada entre locais e períodos e aproxima o contingente que inicia exposição ao risco de morrer antes de completar um ano.",
   "avalia": "O coeficiente de mortalidade infantil usa óbitos de menores de um ano no numerador e nascidos vivos no denominador, usualmente multiplicado por 1.000.",
   "detalhe": "Mortalidade infantil = óbitos <1 ano / nascidos vivos x 1.000.",
   "distratores": {
    "A": "A população total inclui pessoas que não estão sob risco de morrer antes de um ano de idade e diluiria o indicador.",
    "C": "Usar somente óbitos neonatais mudaria o desfecho analisado. Além disso, número de gestantes não é o denominador padronizado para mortalidade infantil.",
    "D": "Internações refletem utilização de serviços e gravidade, não representam a população de referência do indicador. Muitas crianças nunca internam e ainda assim fazem parte do denominador epidemiológico."
   },
   "padraoErro": "Cálculo e interpretação",
   "pegadinha": "O enunciado oferece subcomponentes, como óbitos neonatais, para testar se o candidato mantém a definição do indicador solicitado."
  },
  {
   "id": 34,
   "tema": "Vigilância Epidemiológica",
   "subtema": "Indicadores",
   "competencia": "Razão de mortalidade materna e investigação de óbitos",
   "dificuldade": "Muito alta",
   "enunciado": "Uma comissão municipal de prevenção da mortalidade materna revisa todos os óbitos de mulheres em idade fértil. Entre 12 mortes ocorridas no ano, três foram classificadas como maternas após investigação: uma por hemorragia pós-parto, uma por complicação hipertensiva da gestação e uma por causa indireta agravada pela gravidez. No mesmo período ocorreram 4.500 nascidos vivos. A gestão deseja calcular o indicador utilizado rotineiramente para acompanhar mortalidade materna e comparar o município com outros locais. Qual cálculo e interpretação estão corretos?",
   "alternativas": {
    "A": "Usar 12 óbitos no numerador e 4.500 nascidos vivos no denominador, pois todas as mortes em idade fértil são consideradas maternas até prova em contrário.",
    "B": "Usar três óbitos no numerador e o total de mulheres em idade fértil no denominador, multiplicando por 1.000.",
    "C": "Usar apenas os dois óbitos obstétricos diretos no numerador, excluindo causas indiretas por definição.",
    "D": "Usar os três óbitos maternos no numerador e 4.500 nascidos vivos no denominador, expressando a razão convencionalmente por 100.000 nascidos vivos."
   },
   "gabarito": "D",
   "porqueCorreta": "Após investigação, três óbitos foram classificados como maternos: hemorragia pós-parto, complicação hipertensiva e causa indireta agravada pela gestação. Logo, esses três compõem o numerador. O denominador é 4.500 nascidos vivos. A razão seria 3/4.500 x 100.000, aproximadamente 66,7 por 100.000 nascidos vivos. A investigação de mortes de mulheres em idade fértil é essencial justamente porque causas maternas podem estar subnotificadas ou mal classificadas.",
   "avalia": "A razão de mortalidade materna relaciona óbitos maternos ao número de nascidos vivos e é expressa convencionalmente por 100.000 nascidos vivos. Inclui mortes maternas diretas e indiretas quando enquadradas na definição.",
   "detalhe": "RMM = óbitos maternos / nascidos vivos x 100.000.",
   "distratores": {
    "A": "Nem todo óbito de mulher em idade fértil é materno. Essa população é rastreada para investigação, mas somente os casos que atendem à definição entram no numerador.",
    "B": "O denominador não é o total de mulheres em idade fértil. A padronização utiliza nascidos vivos como aproximação do volume de gestações com desfecho vivo.",
    "C": "Causas indiretas podem integrar mortalidade materna quando a gestação agrava condição preexistente ou desencadeia sua piora conforme critérios definidos."
   },
   "padraoErro": "Cálculo e interpretação",
   "pegadinha": "A banca diferencia “óbitos investigados” de “óbitos que entram no indicador”. Investigação amplia detecção; classificação define o numerador."
  },
  {
   "id": 35,
   "tema": "Vigilância Sanitária",
   "subtema": "Conceitos",
   "competencia": "Atuação sobre riscos de produtos e serviços",
   "dificuldade": "Alta",
   "enunciado": "Após denúncias de intoxicação alimentar, uma equipe municipal inspeciona uma cozinha industrial que fornece refeições a escolas. Durante a vistoria, identifica falhas de temperatura no armazenamento, manipulação inadequada de alimentos e ausência de controle de origem de alguns produtos. Ao mesmo tempo, a vigilância epidemiológica investiga os casos notificados para identificar padrão de adoecimento e possíveis exposições comuns. Qual afirmação melhor diferencia as duas frentes de atuação sem criar uma separação artificial entre elas?",
   "alternativas": {
    "A": "A vigilância sanitária atua sobre riscos relacionados aos produtos, serviços, processos e ambientes, enquanto a vigilância epidemiológica investiga a ocorrência e distribuição dos agravos; ambas podem atuar de forma articulada no mesmo evento.",
    "B": "A vigilância epidemiológica é responsável por fiscalizar diretamente todos os estabelecimentos, e a vigilância sanitária limita-se a contabilizar pessoas doentes.",
    "C": "A vigilância sanitária só pode agir depois de confirmação laboratorial de um agente etiológico, pois suas medidas dependem de diagnóstico individual definitivo.",
    "D": "As duas vigilâncias têm funções idênticas e, por isso, uma delas deve ser excluída para evitar duplicidade de ações."
   },
   "gabarito": "A",
   "porqueCorreta": "Na cozinha industrial, a vigilância sanitária pode inspecionar armazenamento, temperatura, procedência, manipulação e adotar medidas para interromper risco. Paralelamente, a vigilância epidemiológica identifica casos, descreve o surto, investiga exposições e procura relações causais. Em um evento real, essas ações devem se comunicar: achados nos casos orientam inspeção, e achados no estabelecimento ajudam a interpretar a cadeia de transmissão.",
   "avalia": "Vigilância sanitária e epidemiológica têm objetos distintos, mas complementares. Uma atua sobre riscos de produtos, serviços, ambientes e processos; a outra acompanha ocorrência e distribuição de agravos na população.",
   "detalhe": "Sanitária atua no risco de produtos/serviços/processos; epidemiológica atua nos agravos e sua distribuição.",
   "distratores": {
    "B": "A alternativa inverte as funções. Fiscalização sanitária de estabelecimentos é típica da vigilância sanitária, enquanto contabilizar e investigar casos pertence ao campo epidemiológico.",
    "C": "A vigilância sanitária pode agir diante de risco plausível antes de confirmação laboratorial definitiva, especialmente quando esperar expõe a população a dano continuado.",
    "D": "As funções podem se sobrepor operacionalmente, mas não são idênticas. A solução adequada é integração, não eliminar uma das áreas."
   },
   "padraoErro": "Decisão em saúde pública",
   "pegadinha": "A banca evita uma separação “em caixinhas”. O correto é diferenciar objetos de atuação e reconhecer trabalho conjunto."
  },
  {
   "id": 36,
   "tema": "Saúde do Trabalhador",
   "subtema": "Vigilância",
   "competencia": "Nexo ocupacional e intervenção no processo de trabalho",
   "dificuldade": "Muito alta",
   "enunciado": "Quatro trabalhadores de um setor de pintura industrial desenvolvem dermatite nas mãos e antebraços nos últimos seis meses. Um deles procura a UBS e relata melhora importante durante férias e recidiva poucos dias após retornar ao trabalho. Todos passaram a manipular um novo solvente aproximadamente oito meses antes. A empresa fornece luvas, mas os trabalhadores relatam que o material utilizado se deteriora rapidamente em contato com o produto. Além do tratamento individual, qual abordagem é mais compatível com a Saúde do Trabalhador?",
   "alternativas": {
    "A": "Considerar o vínculo ocupacional improvável porque não houve acidente agudo e orientar apenas uso de hidratante e retorno ao trabalho.",
    "B": "Solicitar que cada trabalhador prove individualmente a causalidade antes de qualquer avaliação do ambiente, pois ocorrência em grupo não tem relevância epidemiológica.",
    "C": "Investigar o nexo entre exposição e adoecimento, avaliar o processo de trabalho e a adequação das medidas de proteção e intervir sobre o risco coletivo, articulando vigilância quando indicado.",
    "D": "Afastar definitivamente todos os trabalhadores do emprego, pois a remoção do trabalhador é a principal medida de controle de qualquer risco ocupacional."
   },
   "gabarito": "C",
   "porqueCorreta": "A abordagem adequada é investigar o nexo, caracterizar exposição, verificar compatibilidade do solvente com o material das luvas, avaliar ventilação, treinamento e organização do trabalho e implementar medidas de controle. A prioridade sanitária é reduzir ou eliminar o risco na fonte, complementando com proteção coletiva e individual. Vigilância e notificação podem ser necessárias conforme o agravo e a legislação aplicável.",
   "avalia": "Há forte sinal de relação trabalho-doença: múltiplos trabalhadores no mesmo setor, início após novo solvente, melhora nas férias e recidiva no retorno. A resposta deve ir além do tratamento individual e alcançar o processo de trabalho.",
   "detalhe": "Não basta tratar a dermatite; é preciso investigar e modificar a exposição no trabalho.",
   "distratores": {
    "A": "Doenças ocupacionais não precisam resultar de acidente súbito. Exposições repetidas ou crônicas são causas clássicas de dermatites, pneumoconioses e outros agravos.",
    "B": "A ocorrência de vários casos relacionados ao mesmo processo de trabalho aumenta a plausibilidade de um problema coletivo. Esperar “prova individual” antes de avaliar o ambiente perde oportunidade preventiva.",
    "D": "Afastamento pode ser necessário para proteção temporária em alguns casos, mas demitir ou remover definitivamente trabalhadores não corrige o risco na fonte e pode transferi-lo para outros."
   },
   "padraoErro": "Conceito aplicado",
   "pegadinha": "A banca testa a diferença entre medicina ocupacional centrada no indivíduo e Saúde do Trabalhador voltada também ao processo e ao risco coletivo."
  },
  {
   "id": 37,
   "tema": "Prevenção",
   "subtema": "Níveis de prevenção",
   "competencia": "Prevenção primária em contexto populacional",
   "dificuldade": "Alta",
   "enunciado": "Uma comunidade apresenta aumento de casos de hepatite A associado a condições sanitárias precárias e baixa cobertura vacinal em grupos elegíveis. O município decide ampliar vacinação conforme indicação, intensificar ações de saneamento e desenvolver educação em saúde antes que pessoas suscetíveis adoeçam. Em relação aos níveis de prevenção, qual interpretação é a mais adequada?",
   "alternativas": {
    "A": "As medidas são secundárias, porque ocorrem depois que já existem casos na comunidade.",
    "B": "Para indivíduos ainda suscetíveis, vacinação e redução de exposição atuam antes do surgimento da doença e constituem prevenção primária, mesmo que o município já tenha registrado casos.",
    "C": "As medidas são terciárias, pois toda intervenção após a identificação de um surto tem como finalidade reabilitação.",
    "D": "A vacinação é quaternária, porque evita tratamentos desnecessários no futuro, enquanto saneamento não pertence a nenhum nível de prevenção."
   },
   "gabarito": "B",
   "porqueCorreta": "Vacinar indivíduos suscetíveis, melhorar saneamento e reduzir exposição antes que essas pessoas adoeçam atuam no período pré-patogênico e constituem prevenção primária. A existência de um surto muda a urgência e o contexto da ação, mas não transforma automaticamente a natureza preventiva da vacinação de suscetíveis. Promoção da saúde e proteção específica convivem dentro da prevenção primária.",
   "avalia": "O nível de prevenção é definido pelo estágio da doença na pessoa ou grupo-alvo da intervenção, não pelo fato de já existirem casos na comunidade.",
   "detalhe": "Pergunte: a intervenção ocorre antes da doença, na detecção precoce, após dano, ou para evitar excesso?",
   "distratores": {
    "A": "Prevenção secundária busca detectar doença já iniciada em fase precoce. A presença de casos em terceiros não significa que os suscetíveis já estejam doentes.",
    "C": "Prevenção terciária atua sobre doença estabelecida para reduzir complicações, incapacidade e sequelas. Saneamento e vacinação não têm esse objetivo.",
    "D": "Prevenção quaternária busca reduzir dano por excesso de medicalização. Vacinação indicada e saneamento são intervenções primárias clássicas, não quaternárias."
   },
   "padraoErro": "Decisão em saúde pública",
   "pegadinha": "A banca tenta fazer o candidato classificar a ação pelo momento do surto, em vez de pelo estágio da doença no alvo."
  },
  {
   "id": 38,
   "tema": "Prevenção",
   "subtema": "Níveis de prevenção",
   "competencia": "Prevenção secundária e detecção precoce",
   "dificuldade": "Alta",
   "enunciado": "Uma mulher assintomática, sem sinais clínicos de doença, pertence à faixa etária e ao grupo de risco para o qual existe recomendação de rastreamento com benefício demonstrado. O exame é realizado com objetivo de detectar uma condição em fase pré-clínica, quando uma intervenção mais precoce pode modificar desfechos relevantes. Como essa estratégia deve ser classificada e por quê?",
   "alternativas": {
    "A": "Prevenção primária, porque a pessoa ainda não apresenta sintomas e, portanto, a doença necessariamente não existe.",
    "B": "Prevenção terciária, porque qualquer tratamento iniciado depois de um exame positivo visa reduzir sequelas.",
    "C": "Prevenção quaternária, porque todo rastreamento em assintomáticos procura evitar excesso de exames.",
    "D": "Prevenção secundária, porque busca identificar doença já iniciada antes da manifestação clínica, permitindo intervenção precoce quando há benefício comprovado."
   },
   "gabarito": "D",
   "porqueCorreta": "A alternativa D expressa a lógica completa: detectar doença já iniciada antes da manifestação clínica e intervir mais cedo quando há benefício comprovado. O rastreamento só faz sentido se a antecipação diagnóstica melhorar desfechos relevantes e o balanço benefício-dano for favorável. Ser assintomático não coloca automaticamente a pessoa em prevenção primária.",
   "avalia": "Rastreamento procura doença em fase pré-clínica em pessoas assintomáticas. A doença pode já existir biologicamente mesmo sem sintomas; por isso, é prevenção secundária.",
   "detalhe": "Rastreamento de doença pré-clínica = prevenção secundária.",
   "distratores": {
    "A": "Prevenção primária atua antes do início da doença, reduzindo incidência por promoção e proteção específica. Ausência de sintomas não prova ausência de processo patológico.",
    "B": "Prevenção terciária ocorre após doença clinicamente estabelecida ou dano, visando reduzir incapacidade e complicações. Não descreve a fase pré-clínica.",
    "C": "Prevenção quaternária pode levar a evitar rastreamentos sem benefício, mas um programa indicado e baseado em evidências é uma estratégia de prevenção secundária."
   },
   "padraoErro": "Decisão em saúde pública",
   "pegadinha": "A banca explora a associação intuitiva “assintomático = saudável = primária”. O critério correto é presença ou ausência do processo de doença, não apenas sintomas."
  },
  {
   "id": 39,
   "tema": "Prevenção",
   "subtema": "Níveis de prevenção",
   "competencia": "Prevenção terciária e reabilitação",
   "dificuldade": "Média-alta",
   "enunciado": "Um homem de 63 anos sobrevive a um acidente vascular cerebral e permanece com hemiparesia, disfagia leve e dificuldade para atividades de vida diária. Após estabilização clínica, a equipe organiza fisioterapia, terapia ocupacional, avaliação fonoaudiológica, prevenção de complicações e adaptação do domicílio para recuperar função e autonomia. Qual é a melhor classificação dessas ações?",
   "alternativas": {
    "A": "Prevenção primária, porque reduzem o risco de um segundo AVC e, portanto, todas as ações realizadas após o evento pertencem ao mesmo nível.",
    "B": "Prevenção secundária, porque o AVC foi reconhecido precocemente e o paciente ainda está em tratamento.",
    "C": "Prevenção terciária, porque o objetivo central é limitar incapacidade, evitar complicações e reabilitar após doença já estabelecida.",
    "D": "Prevenção quaternária, porque reabilitação substitui tratamentos medicamentosos potencialmente excessivos."
   },
   "gabarito": "C",
   "porqueCorreta": "Fisioterapia, terapia ocupacional, fonoaudiologia, prevenção de aspiração, contraturas e quedas, e adaptação domiciliar atuam sobre consequências de doença estabelecida. Elas não apagam o evento, mas reduzem seu impacto funcional e social. Um mesmo paciente pode simultaneamente receber prevenção secundária de recorrência cardiovascular e prevenção terciária de sequelas; a classificação depende do objetivo específico de cada intervenção.",
   "avalia": "O AVC já ocorreu e deixou déficits. O objetivo agora é reduzir incapacidade, prevenir complicações e recuperar função e autonomia, que são finalidades típicas de prevenção terciária.",
   "detalhe": "Doença estabelecida + reduzir incapacidade/recuperar função = prevenção terciária.",
   "distratores": {
    "A": "Algumas medidas após AVC podem prevenir novo evento, mas o conjunto descrito é predominantemente reabilitador. Classificar tudo após o evento como primário ignora o alvo da intervenção.",
    "B": "Detecção precoce do AVC e tratamento agudo podem ser discutidos em outras categorias, mas reabilitação de hemiparesia e disfagia não é prevenção secundária.",
    "D": "Prevenção quaternária se volta a evitar iatrogenia e intervenções excessivas. Reabilitação indicada não é uma estratégia de desmedicalização."
   },
   "padraoErro": "Decisão em saúde pública",
   "pegadinha": "A banca exige classificar a intervenção pelo objetivo, não apenas pelo momento cronológico em relação à doença."
  },
  {
   "id": 40,
   "tema": "Prevenção",
   "subtema": "Níveis de prevenção",
   "competencia": "Prevenção quaternária e cascata diagnóstica",
   "dificuldade": "Muito alta",
   "enunciado": "Um homem de 39 anos, assintomático e sem fatores de risco relevantes, solicita 'check-up completo' com tomografias de corpo inteiro, marcadores tumorais e exames cardiológicos avançados porque um conhecido recebeu diagnóstico de câncer em fase tardia. Ele afirma que 'quanto mais cedo procurar qualquer doença, melhor'. O médico explica que exames em populações de baixo risco podem gerar falsos-positivos, achados incidentais, biópsias e procedimentos desnecessários, sem benefício demonstrado. Qual conduta melhor representa prevenção quaternária nesse contexto?",
   "alternativas": {
    "A": "Discutir riscos e benefícios, evitar exames sem indicação e manter apenas ações preventivas recomendadas de acordo com idade e risco individual.",
    "B": "Solicitar todos os exames solicitados para reduzir ansiedade, pois preferência do paciente torna qualquer intervenção clinicamente indicada.",
    "C": "Realizar pelo menos marcadores tumorais, já que exames de sangue não produzem cascatas diagnósticas relevantes.",
    "D": "Solicitar tomografias inicialmente e decidir depois se os demais exames são necessários, porque imagem ampla é método neutro de rastreamento."
   },
   "gabarito": "A",
   "porqueCorreta": "A conduta adequada é conversar sobre risco absoluto, benefício esperado, falso-positivo, achado incidental, sobrediagnóstico e procedimentos subsequentes, mantendo apenas ações preventivas recomendadas para idade e risco. Isso respeita autonomia informada sem transformar ansiedade em indicação médica. Prevenção quaternária não é “não fazer nada”; é fazer o que tem benefício líquido e evitar o que expõe a dano sem evidência suficiente.",
   "avalia": "Prevenção quaternária protege pessoas de intervenções desnecessárias e de danos produzidos pela medicalização excessiva. Em baixo risco, rastreamentos indiscriminados podem gerar mais dano do que benefício.",
   "detalhe": "Evitar exame sem indicação também é cuidado preventivo quando reduz iatrogenia.",
   "distratores": {
    "B": "Preferência do paciente é importante, mas decisão compartilhada exige informação e indicação. Solicitar exames sem benefício demonstrado apenas para aliviar ansiedade pode iniciar uma cascata de dano.",
    "C": "Marcadores tumorais em pessoas assintomáticas e de baixo risco podem produzir falsos-positivos e investigação invasiva. Ser exame de sangue não o torna inofensivo em termos de consequências.",
    "D": "Tomografia de corpo inteiro pode encontrar incidentalomas, expor a radiação e gerar biópsias ou seguimentos desnecessários. Não é uma ferramenta neutra de rastreamento."
   },
   "padraoErro": "Decisão em saúde pública",
   "pegadinha": "A banca opõe “mais diagnóstico” a “melhor cuidado”. Prevenção quaternária lembra que detectar algo não é benefício por si só."
  },
  {
   "id": 41,
   "tema": "Rastreamento",
   "subtema": "Princípios",
   "competencia": "Critérios para implantação de rastreamento",
   "dificuldade": "Muito alta",
   "enunciado": "Uma secretaria estadual considera implantar rastreamento populacional para um câncer raro. Existe um exame capaz de detectar alterações vários anos antes dos sintomas, com sensibilidade elevada. Entretanto, os estudos disponíveis mostram que muitos tumores detectados nessa fase teriam evolução lenta e que, até o momento, não há evidência consistente de redução de mortalidade com o tratamento antecipado. O exame também produz falsos-positivos que frequentemente levam a procedimentos invasivos. Durante a reunião, um gestor argumenta que 'detectar mais cedo sempre é melhor' e que a alta sensibilidade do teste, por si só, justifica o programa. Qual análise é mais adequada?",
   "alternativas": {
    "A": "O rastreamento deve ser implantado, porque sensibilidade elevada é o único critério necessário para justificar uma estratégia populacional.",
    "B": "O rastreamento é indicado sempre que houver fase pré-clínica detectável, mesmo que o tratamento antecipado não mude desfechos importantes.",
    "C": "A raridade da doença torna os falsos-positivos irrelevantes, pois qualquer caso adicional detectado compensa potenciais danos do programa.",
    "D": "A existência de fase detectável e teste sensível não basta; é necessário demonstrar benefício clínico líquido do rastreamento, considerando tratamento eficaz, redução de desfechos relevantes e danos como falsos-positivos e sobrediagnóstico."
   },
   "gabarito": "D",
   "porqueCorreta": "A alternativa D integra os principais requisitos: importância da condição, fase pré-clínica detectável, teste aceitável, tratamento eficaz em fase precoce e evidência de benefício clínico líquido. Se muitos tumores são indolentes, o programa pode aumentar diagnósticos sem reduzir mortalidade, fenômeno compatível com sobrediagnóstico. Falsos-positivos e procedimentos invasivos também entram no balanço. Assim, sensibilidade elevada é apenas um componente técnico, não a prova de utilidade do rastreamento.",
   "avalia": "Um programa populacional não se justifica porque o teste detecta cedo. Precisa demonstrar que detectar e tratar cedo melhora desfechos relevantes e que benefícios superam danos.",
   "detalhe": "Rastreamento deve melhorar desfechos, não apenas aumentar detecção.",
   "distratores": {
    "A": "Sensibilidade informa capacidade de detectar doença entre doentes, mas não mostra se o programa salva vidas, melhora qualidade de vida ou evita dano.",
    "B": "Antecipar o diagnóstico sem alterar o desfecho pode apenas aumentar o tempo que a pessoa vive “sabendo” que tem a doença, sem ganhar vida real.",
    "C": "Doenças raras podem ter baixo valor preditivo positivo mesmo com testes razoáveis, aumentando proporcionalmente falsos-positivos. Raridade não torna dano irrelevante."
   },
   "padraoErro": "Cálculo e interpretação",
   "pegadinha": "A frase “detectar cedo sempre é melhor” é uma das pegadinhas mais clássicas de rastreamento."
  },
  {
   "id": 42,
   "tema": "Rastreamento",
   "subtema": "Vieses",
   "competencia": "Viés de tempo de antecipação (lead-time bias)",
   "dificuldade": "Alta",
   "enunciado": "Antes da implantação de um programa de rastreamento, pacientes com determinado câncer eram diagnosticados, em média, aos 66 anos e faleciam aos 71, resultando em sobrevida média de cinco anos após o diagnóstico. Depois do rastreamento, muitos tumores passaram a ser diagnosticados aos 63 anos, mas a idade média ao morrer permaneceu aproximadamente 71 anos. Relatórios iniciais celebram aumento da sobrevida após o diagnóstico para oito anos como prova de que o programa prolongou a vida. Qual fenômeno pode explicar essa aparente melhora sem redução real da mortalidade?",
   "alternativas": {
    "A": "Viés de seleção por voluntariado, necessariamente presente em qualquer programa de rastreamento e suficiente para explicar todos os resultados.",
    "B": "Viés de tempo de antecipação, em que o diagnóstico ocorre mais cedo e aumenta artificialmente o tempo medido desde o diagnóstico sem postergar a morte.",
    "C": "Viés de duração, porque todos os cânceres detectados precocemente são obrigatoriamente mais agressivos.",
    "D": "Confusão por indicação, pois pacientes rastreados recebem tratamento apenas depois de desenvolver sintomas."
   },
   "gabarito": "B",
   "porqueCorreta": "Esse é o lead-time bias. O rastreamento inicia o relógio do diagnóstico mais cedo; se a história natural da doença não muda, o intervalo entre diagnóstico e morte aumenta automaticamente. A pessoa parece sobreviver oito anos após o diagnóstico, mas morre na mesma idade em que morreria sem rastreamento. Por isso, sobrevida pós-diagnóstico é um desfecho enganoso para avaliar eficácia de rastreamento quando isolado; mortalidade específica ou total e outros desfechos clínicos são mais informativos.",
   "avalia": "O diagnóstico foi antecipado de 66 para 63 anos, mas a idade de morte permaneceu 71. Logo, a sobrevida “desde o diagnóstico” aumentou sem prolongamento real da vida.",
   "detalhe": "Diagnóstico mais cedo + mesma morte = aumento artificial da sobrevida pelo lead-time bias.",
   "distratores": {
    "A": "Viés de voluntariado pode existir porque pessoas que aderem a rastreamento podem ter comportamentos diferentes, mas não é necessário para explicar o padrão numérico descrito.",
    "C": "Viés de duração decorre da detecção preferencial de doenças mais lentas. Aqui, o elemento central é apenas o adiantamento temporal do diagnóstico.",
    "D": "Confusão por indicação ocorre em contextos em que a razão para receber uma intervenção se relaciona ao prognóstico; não explica o simples deslocamento do marco diagnóstico."
   },
   "padraoErro": "Cálculo e interpretação",
   "pegadinha": "A banca oferece aumento de “sobrevida” como se fosse ganho de vida. Compare sempre a idade ou taxa de mortalidade, não apenas o tempo contado a partir do diagnóstico."
  },
  {
   "id": 43,
   "tema": "Rastreamento",
   "subtema": "Vieses",
   "competencia": "Viés de duração (length-time bias)",
   "dificuldade": "Muito alta",
   "enunciado": "Um programa de mamografia periódica apresenta, entre os tumores detectados no rastreamento, maior proporção de lesões de crescimento lento e prognóstico favorável do que entre os cânceres diagnosticados entre os intervalos de rastreamento. Alguns avaliadores concluem que o programa 'transforma biologicamente' tumores agressivos em formas menos graves. Qual explicação epidemiológica é mais plausível para essa diferença?",
   "alternativas": {
    "A": "O rastreamento induz regressão tumoral e, por isso, altera diretamente a biologia das lesões detectadas.",
    "B": "O achado prova que qualquer aumento da sobrevida entre casos rastreados decorre exclusivamente de tratamento mais eficaz.",
    "C": "Tumores de evolução lenta permanecem por mais tempo na fase pré-clínica detectável e, por isso, têm maior probabilidade de serem captados em rastreamentos periódicos, caracterizando viés de duração.",
    "D": "O padrão é típico de erro tipo I, pois tumores agressivos sempre geram valores de p maiores que tumores indolentes."
   },
   "gabarito": "C",
   "porqueCorreta": "Esse mecanismo é o length-time bias. A amostra de cânceres detectados pelo rastreamento fica enriquecida por lesões de evolução lenta e melhor prognóstico. Assim, comparar sobrevida de casos rastreados com casos diagnosticados clinicamente pode fazer o programa parecer mais eficaz mesmo sem modificar a biologia ou a mortalidade. Esse viés é diferente de lead-time: aqui a questão é seleção preferencial de tipos de doença, não apenas antecipação do relógio.",
   "avalia": "Tumores lentos permanecem mais tempo na fase pré-clínica detectável. Por isso, têm maior chance de serem encontrados em um rastreamento periódico do que tumores agressivos, que podem surgir e se tornar sintomáticos entre rodadas.",
   "detalhe": "Doença lenta fica mais tempo detectável e é supercaptada pelo rastreamento = viés de duração.",
   "distratores": {
    "A": "O rastreamento não induz regressão nem transforma biologicamente tumores. Ele seleciona quais tumores são mais prováveis de ser detectados em uma janela periódica.",
    "B": "Melhor prognóstico entre tumores rastreados pode surgir pela própria composição biológica dos casos detectados, não necessariamente por tratamento mais eficaz.",
    "D": "Erro tipo I é falso-positivo estatístico em teste de hipótese e não explica por que tumores lentos são super-representados no rastreamento."
   },
   "padraoErro": "Decisão em saúde pública",
   "pegadinha": "Lead-time e length-time costumam ser confundidos. Pergunte: o problema é “começar a contar antes” ou “captar preferencialmente doença lenta”?"
  },
  {
   "id": 44,
   "tema": "Imunização",
   "subtema": "Conceitos",
   "competencia": "Imunidade coletiva e transmissibilidade",
   "dificuldade": "Alta",
   "enunciado": "Após queda prolongada da cobertura vacinal, uma cidade registra aumento de casos de uma doença transmitida de pessoa a pessoa. Entre os afetados estão alguns indivíduos que não podem receber determinada vacina por contraindicação médica. Com uma campanha de recuperação de cobertura, a circulação do agente diminui de forma importante, inclusive entre pessoas não vacinadas. Qual mecanismo melhor explica a proteção indireta observada?",
   "alternativas": {
    "A": "Com maior proporção de pessoas imunes, reduzem-se cadeias de transmissão e oportunidades de contato com o agente, diminuindo o risco também para alguns suscetíveis.",
    "B": "Pessoas vacinadas eliminam anticorpos no ambiente e transferem imunidade ativa duradoura para indivíduos não vacinados.",
    "C": "A vacinação transforma toda infecção subsequente em doença assintomática e, por isso, a circulação do agente permanece igual apesar de menos casos detectados.",
    "D": "A imunidade coletiva ocorre apenas quando 100% da população está vacinada, portanto a queda dos casos não pode ser atribuída a esse fenômeno."
   },
   "gabarito": "A",
   "porqueCorreta": "A proteção indireta decorre de menor circulação do agente, não de transferência de imunidade individual. O limiar necessário depende da transmissibilidade do agente, efetividade da vacina, padrão de contatos e distribuição da cobertura. Pessoas que não podem ser vacinadas podem se beneficiar quando a comunidade reduz oportunidades de exposição. O fenômeno é populacional e só se aplica adequadamente a doenças cuja transmissão pode ser interrompida pela imunidade coletiva.",
   "avalia": "Quando uma proporção suficiente da população está imune, a transmissão encontra menos hospedeiros suscetíveis e as cadeias de contágio se interrompem com maior frequência. Isso reduz risco inclusive para algumas pessoas não vacinadas.",
   "detalhe": "Mais pessoas imunes -> menos cadeias de transmissão -> proteção indireta de suscetíveis.",
   "distratores": {
    "B": "Anticorpos não são eliminados no ambiente de forma a produzir imunização ativa duradoura em terceiros. A proteção ocorre pela redução de contatos infecciosos.",
    "C": "Se a vacina reduz transmissão, a circulação pode de fato cair. Não se trata apenas de converter infecções sintomáticas em assintomáticas.",
    "D": "Cobertura de 100% não é requisito universal para existir proteção coletiva. O limiar varia conforme o número reprodutivo e efetividade da vacina."
   },
   "padraoErro": "Decisão em saúde pública",
   "pegadinha": "A banca testa se o candidato entende imunidade coletiva como fenômeno de transmissão, não como “efeito da vacina passando de uma pessoa para outra”."
  },
  {
   "id": 45,
   "tema": "Imunização",
   "subtema": "Eventos adversos",
   "competencia": "Falsas contraindicações à vacinação",
   "dificuldade": "Alta",
   "enunciado": "Uma criança de 3 anos comparece à UBS para atualização vacinal. Está ativa, brincando, alimentando-se normalmente e apresenta apenas coriza e tosse leve há dois dias, sem febre ou sinais de comprometimento sistêmico. A mãe relata que, após uma dose anterior, a criança teve dor local e febre baixa por 24 horas. Não há história de anafilaxia, imunodeficiência ou outra condição relevante. A mãe pede para adiar todas as vacinas por medo de uma reação mais intensa. Qual orientação é a mais adequada?",
   "alternativas": {
    "A": "Adiar todo o esquema por pelo menos quatro semanas, porque qualquer infecção respiratória ativa aumenta risco de evento adverso grave.",
    "B": "Suspender definitivamente o imunizante associado à reação anterior, pois febre baixa e dor local são sinais de hipersensibilidade importante.",
    "C": "Em regra, doença aguda leve sem comprometimento importante e reações locais ou febre baixa anteriores não constituem contraindicação geral; a vacinação indicada pode prosseguir após avaliação das particularidades do imunizante.",
    "D": "Solicitar sorologias para todas as doenças do calendário antes de decidir, pois sintomas leves tornam impossível saber se a criança já possui imunidade."
   },
   "gabarito": "C",
   "porqueCorreta": "A vacinação pode prosseguir quando a criança está clinicamente bem e não há contraindicação específica ao imunizante. Adiar sem necessidade cria oportunidades perdidas e pode prolongar suscetibilidade. A equipe deve revisar o histórico, confirmar quais vacinas estão indicadas e avaliar situações específicas, mas o quadro leve descrito não justifica suspensão geral. Reações esperadas, como dor local e febre baixa transitória, são diferentes de anafilaxia ou evento grave.",
   "avalia": "Resfriado leve, bom estado geral, coriza e tosse sem febre importante costumam ser falsas contraindicações. Reação local e febre baixa após dose anterior também não equivalem, por si só, a contraindicação absoluta.",
   "detalhe": "Quadro leve e reação local prévia não são, em regra, contraindicações para vacinação.",
   "distratores": {
    "A": "Infecção respiratória leve não aumenta automaticamente o risco de evento adverso grave e não exige adiamento por quatro semanas. A decisão depende da gravidade do quadro e da vacina, não da simples presença de coriza.",
    "B": "Dor local e febre baixa são eventos comuns após imunização. Suspensão definitiva seria desproporcional na ausência de reação de hipersensibilidade grave ou outra contraindicação formal.",
    "D": "Sorologias de rotina antes de vacinar não são indicadas nesse cenário e podem atrasar proteção sem benefício."
   },
   "padraoErro": "Decisão em saúde pública",
   "pegadinha": "A banca costuma usar sintomas leves e reações comuns para provocar excesso de cautela. O risco real é perder oportunidades de vacinação."
  },
  {
   "id": 46,
   "tema": "Imunização",
   "subtema": "Conservação",
   "competencia": "Rede de frio e desvio de temperatura",
   "dificuldade": "Muito alta",
   "enunciado": "Ao abrir a sala de vacinação pela manhã, uma enfermeira percebe que o equipamento de refrigeração ficou sem energia durante a madrugada. O registrador mostra que a temperatura permaneceu acima da faixa recomendada por várias horas. Os frascos estão fechados, dentro do prazo de validade e sem alteração de aspecto. Um profissional sugere aplicar as vacinas normalmente porque 'se estivessem estragadas, daria para ver'. Qual deve ser a conduta mais segura?",
   "alternativas": {
    "A": "Aplicar todas as doses imediatamente, pois aparência normal e prazo de validade garantem manutenção da potência.",
    "B": "Congelar os imunobiológicos por algumas horas para compensar o aquecimento e restaurar sua estabilidade.",
    "C": "Descartar automaticamente todo o estoque, inclusive produtos que não foram expostos ao desvio, sem registrar a ocorrência.",
    "D": "Segregar os imunobiológicos envolvidos, mantê-los nas condições recomendadas, registrar o desvio e solicitar avaliação técnica conforme o protocolo antes de decidir sobre uso ou descarte."
   },
   "gabarito": "D",
   "porqueCorreta": "A conduta segura é segregar o lote envolvido, manter os produtos em condições recomendadas, identificar e registrar o evento e aguardar avaliação técnica conforme protocolo. A análise pode considerar tipo de vacina, temperatura máxima, duração da exposição e dados de estabilidade. Até a decisão, os produtos não devem ser usados. Essa abordagem evita tanto aplicar produto potencialmente ineficaz quanto descartar desnecessariamente doses que ainda possam ser aproveitadas.",
   "avalia": "Potência de imunobiológicos pode ser comprometida sem mudança de cor, odor ou aspecto. Portanto, aparência normal não autoriza uso após desvio de temperatura.",
   "detalhe": "Desvio de temperatura: não usar, não congelar para compensar, não descartar cegamente; segregar e avaliar tecnicamente.",
   "distratores": {
    "A": "Prazo de validade pressupõe armazenamento adequado. Uma quebra da cadeia de frio pode reduzir potência mesmo que frasco e rótulo pareçam normais.",
    "B": "Congelar não “reverte” dano térmico. Algumas vacinas são particularmente sensíveis ao congelamento, que pode causar dano adicional irreversível.",
    "C": "Descarte automático pode gerar desperdício e não segue a lógica de avaliação técnica. Primeiro é preciso delimitar quais produtos foram afetados e verificar estabilidade."
   },
   "padraoErro": "Decisão em saúde pública",
   "pegadinha": "A banca apresenta duas respostas impulsivas: usar porque parece normal ou descartar tudo. A resposta correta é quarentena técnica e rastreabilidade."
  },
  {
   "id": 47,
   "tema": "Planejamento em Saúde",
   "subtema": "Indicadores",
   "competencia": "Indicadores de processo e resultado",
   "dificuldade": "Alta",
   "enunciado": "Um programa municipal para controle da hipertensão acompanha dois indicadores. O primeiro mede a proporção de usuários cadastrados que tiveram pressão arterial aferida e plano terapêutico revisado nos últimos seis meses. O segundo mede a proporção desses usuários que, após 12 meses, apresentam pressão arterial controlada. Ao apresentar os dados, um gestor classifica ambos como indicadores de resultado porque 'os dois aparecem no relatório final'. Qual classificação é mais adequada?",
   "alternativas": {
    "A": "Os dois são de estrutura, porque dependem da existência de profissionais e equipamentos para serem medidos.",
    "B": "O primeiro é indicador de processo, pois avalia ações realizadas no cuidado; o segundo é de resultado, pois expressa um desfecho clínico alcançado.",
    "C": "O primeiro é de resultado e o segundo de processo, porque aferir pressão produz uma informação objetiva enquanto controle pressórico depende do seguimento.",
    "D": "Ambos são de processo, porque nenhum deles avalia mortalidade e apenas óbito pode ser considerado resultado."
   },
   "gabarito": "B",
   "porqueCorreta": "Aferir pressão e revisar plano terapêutico são ações executadas pela equipe, portanto indicadores de processo. Já alcançar pressão controlada após 12 meses expressa uma mudança no estado clínico do usuário e é indicador de resultado. A distinção é útil porque um programa pode ter processo adequado e resultado ruim, sugerindo necessidade de revisar efetividade, adesão ou contexto; ou processo ruim e resultado aparentemente bom por fatores externos.",
   "avalia": "Indicador de processo mede o que foi feito no cuidado; indicador de resultado mede o efeito obtido sobre saúde, funcionalidade, controle clínico, satisfação ou outro desfecho.",
   "detalhe": "Processo = ação realizada; resultado = efeito observado.",
   "distratores": {
    "A": "Estrutura é aquilo que oferece condições para cuidar: equipe, espaço, equipamentos, insumos e organização. O fato de um processo depender de estrutura não o transforma em indicador estrutural.",
    "C": "A alternativa inverte as categorias. Medir pressão é uma ação; controle pressórico é o estado alcançado.",
    "D": "Resultados não se limitam à mortalidade. Controle de pressão, qualidade de vida, complicações, funcionalidade e satisfação podem ser resultados."
   },
   "padraoErro": "Decisão em saúde pública",
   "pegadinha": "A banca usa a palavra “relatório final” para induzir a ideia de que tudo no fim é resultado. Classificação depende do que o indicador representa, não de quando é apresentado."
  },
  {
   "id": 48,
   "tema": "Planejamento em Saúde",
   "subtema": "Avaliação",
   "competencia": "Modelo estrutura-processo-resultado",
   "dificuldade": "Muito alta",
   "enunciado": "Uma maternidade é avaliada após aumento de complicações. A comissão registra: número de profissionais por plantão e disponibilidade de equipamentos de emergência; proporção de partos em que o protocolo de segurança foi corretamente cumprido; e taxa de hemorragia grave após o parto. O diretor afirma que a simples presença de equipamentos adequados demonstra qualidade assistencial, independentemente de como são utilizados e dos desfechos. Segundo o modelo clássico de avaliação da qualidade, qual interpretação é mais correta?",
   "alternativas": {
    "A": "Recursos disponíveis correspondem à estrutura, cumprimento do protocolo ao processo e taxa de complicações ao resultado; avaliar qualidade exige considerar dimensões que se relacionam, mas não são equivalentes.",
    "B": "Todos os três itens são indicadores de estrutura, pois ocorrem dentro da mesma instituição.",
    "C": "A taxa de complicações é indicador de processo, porque ocorre durante a assistência, enquanto o cumprimento do protocolo é resultado.",
    "D": "Equipamentos e pessoal são resultados, pois sua existência demonstra que o cuidado foi efetivo antes mesmo de ser prestado."
   },
   "gabarito": "A",
   "porqueCorreta": "Número de profissionais e equipamentos descreve recursos disponíveis - estrutura. Cumprimento do protocolo descreve como o cuidado foi executado - processo. Taxa de hemorragia grave representa um desfecho clínico - resultado. Uma boa estrutura aumenta a possibilidade de bom processo, mas equipamentos podem estar disponíveis e ser mal utilizados; um bom processo tende a melhorar resultados, mas estes também sofrem influência do perfil de risco dos pacientes. Por isso, avaliação robusta considera as três dimensões.",
   "avalia": "O modelo de Donabedian organiza a avaliação em três dimensões relacionadas: estrutura, processo e resultado. Nenhuma delas, isoladamente, prova qualidade total.",
   "detalhe": "Estrutura cria capacidade; processo mostra execução; resultado mostra efeito.",
   "distratores": {
    "B": "Estar dentro da mesma instituição não torna todos os indicadores estruturais. A classificação é conceitual, baseada no que está sendo medido.",
    "C": "Cumprimento de protocolo é claramente ação do cuidado, portanto processo. Hemorragia grave é consequência clínica, portanto resultado.",
    "D": "Pessoal e equipamentos são condições para a assistência, não prova de efetividade. Ter recursos não significa que o paciente recebeu cuidado adequado ou teve bom desfecho."
   },
   "padraoErro": "Cálculo e interpretação",
   "pegadinha": "A banca testa a ideia equivocada “ter recurso = ter qualidade”. Estrutura é necessária, mas não suficiente."
  },
  {
   "id": 49,
   "tema": "Demografia",
   "subtema": "Transição demográfica",
   "competencia": "Envelhecimento populacional e organização da rede",
   "dificuldade": "Alta",
   "enunciado": "Em vinte anos, um município observou queda importante da fecundidade, aumento da expectativa de vida e crescimento da proporção de pessoas com 65 anos ou mais. A secretaria de saúde precisa revisar a rede para a próxima década. Alguns gestores propõem apenas reduzir serviços materno-infantis e ampliar vagas hospitalares, supondo que o envelhecimento 'troca' uma necessidade pela outra. Qual planejamento é mais coerente com a transição demográfica?",
   "alternativas": {
    "A": "Concentrar recursos exclusivamente em internação hospitalar, porque envelhecimento torna a Atenção Primária menos relevante.",
    "B": "Presumir queda global da demanda por saúde, já que menor fecundidade reduz automaticamente o uso de serviços em todas as idades.",
    "C": "Manter a rede inalterada, pois mudanças na estrutura etária não modificam padrões de necessidade assistencial.",
    "D": "Antecipar maior demanda por cuidado longitudinal, multimorbidade, reabilitação, suporte à funcionalidade e integração da rede, sem assumir desaparecimento das necessidades materno-infantis ou de outros grupos."
   },
   "gabarito": "D",
   "porqueCorreta": "A rede deve se preparar para mais acompanhamento de doenças crônicas, reabilitação, cuidados paliativos, apoio à funcionalidade, prevenção de quedas e coordenação entre níveis. A APS ganha importância porque organiza cuidado continuado e multimorbidade. Ao mesmo tempo, a redução relativa de crianças não significa que pré-natal, saúde materna e pediatria possam ser simplesmente desmontados; necessidades persistem e devem ser redimensionadas com base em dados.",
   "avalia": "Queda de fecundidade e aumento da longevidade alteram a estrutura etária. Isso muda o perfil de necessidades, especialmente com maior multimorbidade, dependência funcional e necessidade de cuidado longitudinal, sem eliminar demandas de outros grupos.",
   "detalhe": "Envelhecimento exige rede longitudinal e integrada, sem abandonar outras linhas de cuidado.",
   "distratores": {
    "A": "Envelhecimento não torna APS menos relevante. Pelo contrário, pessoas idosas com múltiplas condições se beneficiam fortemente de longitudinalidade e coordenação.",
    "B": "Menor fecundidade não implica queda automática da demanda total. A intensidade e complexidade do cuidado por pessoa podem aumentar em populações envelhecidas.",
    "C": "Ignorar mudança etária levaria a desencontro entre oferta e necessidade. Planejamento deve antecipar transformações demográficas."
   },
   "padraoErro": "Decisão em saúde pública",
   "pegadinha": "A banca evita a ideia simplista de “trocar pediatria por leitos geriátricos”. Transição muda composição, não elimina completamente necessidades antigas."
  },
  {
   "id": 50,
   "tema": "Demografia",
   "subtema": "Transição epidemiológica",
   "competencia": "Coexistência de cargas de doença",
   "dificuldade": "Muito alta",
   "enunciado": "Uma região brasileira apresenta, ao longo de décadas, queda de várias doenças infecciosas e aumento do peso relativo de doenças cardiovasculares, neoplasias e diabetes. Ao mesmo tempo, persistem surtos de arboviroses, tuberculose em grupos vulneráveis, acidentes de trânsito e violência. Um relatório preliminar conclui que 'a transição epidemiológica foi incompleta porque doenças infecciosas ainda existem' e recomenda organizar a rede como se houvesse duas fases mutuamente exclusivas: primeiro resolver infecções, depois enfrentar doenças crônicas. Qual leitura é mais adequada?",
   "alternativas": {
    "A": "A presença de qualquer doença infecciosa impede falar em transição epidemiológica, que exige eliminação completa de causas transmissíveis.",
    "B": "A região pode estar em processo de transição epidemiológica com sobreposição de cargas: doenças crônicas ganham peso relativo enquanto agravos infecciosos e causas externas continuam relevantes, exigindo respostas simultâneas.",
    "C": "O aumento de doenças crônicas prova que condições sociais deixaram de influenciar o perfil de morbimortalidade.",
    "D": "Transição epidemiológica é sinônimo de envelhecimento individual e não se aplica à análise de causas de adoecimento e morte em populações."
   },
   "gabarito": "B",
   "porqueCorreta": "A região descrita apresenta padrão de sobreposição de cargas: doenças cardiovasculares, câncer e diabetes ganham peso relativo, mas arboviroses e tuberculose persistem em determinados contextos, enquanto acidentes e violência acrescentam carga externa. Isso exige respostas simultâneas: atenção crônica, vigilância de transmissíveis, promoção da saúde, prevenção de violências e organização de urgência. A transição é um processo histórico de mudança do perfil, não uma sequência rígida em que uma fase só começa quando a anterior termina.",
   "avalia": "Transição epidemiológica não exige desaparecimento completo das doenças infecciosas. Em muitos países, especialmente com desigualdades, há coexistência de doenças crônicas, transmissíveis e causas externas.",
   "detalhe": "Transição epidemiológica pode ocorrer com coexistência de crônicas, infecciosas e causas externas.",
   "distratores": {
    "A": "A permanência de doenças infecciosas é compatível com transição. O que muda é sua importância relativa e distribuição, não necessariamente sua extinção.",
    "C": "Doenças crônicas também são fortemente influenciadas por renda, ambiente, alimentação, trabalho, acesso a serviços e outros determinantes sociais. A transição não apaga desigualdades.",
    "D": "Envelhecimento demográfico e transição epidemiológica se relacionam, mas não são sinônimos. Uma descreve estrutura etária; a outra, padrões de adoecimento e morte."
   },
   "padraoErro": "Conceito aplicado",
   "pegadinha": "A banca rejeita modelos excessivamente lineares. No Brasil, é comum a ideia de dupla ou tripla carga de doença."
  }
 ]
};