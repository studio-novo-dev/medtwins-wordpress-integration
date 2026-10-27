# Simulado Nacional — acesso de 100 questões

Pacote integrado ao MedTwins LPs e Sites 1.3.0. Fonte original preservada em novos-simulados/. Esta versão usa configurações compartilhadas do plugin e fallback estático.

Use `[medtwins_pagina id="simulado-nacional-liberacao"]`. O index.html também funciona diretamente por HTTP/HTTPS: com o caminho padrão wp-content, detecta a API WordPress; fora do WordPress, usa assets/simulados-defaults.json do plugin. As quatro pastas e assets/ devem permanecer juntas. file:// não suporta os ES modules usados pela página.

Edite links, datas, horários, nomes de formulário, URLs públicas e RD Station em Ferramentas > MedTwins LPs e Sites > Novos Simulados Nacionais. Datas vazias são ocultas; os exemplos do painel são placeholders. Os destinos das provas começam com os endereços reais existentes e podem reutilizar o cronograma antigo.

As LPs carregam o mesmo RD Station identificado no GTM público da MedTwins. O formulário continua com name="simulado medtwins v2" e campo pagina para distinguir campanhas; somente o submit final é destinado à captura. A ativação/mapeamento de formulários e automações de e-mail deve ser validada na conta RD após instalar. Não existe POST simulado nem envio de e-mail implementado nestes arquivos.

O destino pós-cadastro é a página de acesso correspondente, na janela principal. As páginas de acesso apontam às provas reais, também na janela principal. A correção de MIME do Lenis usa lenis.js; imports estão versionados. Mantenha iframe em modo tela para cenas fixadas/gaveta. Respeita movimento reduzido.

Textos, questões e resultados das cenas são decorativos; as provas reais continuam no plugin MedTwins Simulados. Não apague as licenças em assets/fonts e js/vendor.
