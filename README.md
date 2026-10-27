# Plugins MedTwins

Fontes atuais dos dois plugins WordPress, mantidos em pastas fixas. A versão fica no cabeçalho PHP, nos manifests e no histórico do Git, sem duplicar diretórios a cada entrega.

| Plugin | Versão inicial deste repositório | Conteúdo |
| --- | --- | --- |
| `medtwins-simulados/` | 1.6.2 | Seis provas, calendário e cronograma de liberação |
| `medtwins-lps-e-sites/` | 1.3.0 | Site institucional, LP original e quatro páginas das campanhas de simulados |

```text
medtwins-simulados/           # Fontes do plugin de provas
medtwins-lps-e-sites/         # Fontes do plugin de LPs e sites
scripts/                     # Build e prévia local
docs/                        # Procedimento de atualização
entrada/                     # IGNORADA: novas páginas, ZIPs, PDFs e prints recebidos
dist/                        # IGNORADA: apenas o ZIP atual de cada plugin
node_modules/                # IGNORADA: ferramentas de teste opcionais
tmp/ e .browser-tests/       # IGNORADAS: runtimes e evidências locais
```

`entrada/` e `dist/` não existem automaticamente em um clone: o build cria `dist/`; crie `entrada/` antes de receber materiais. Os arquivos antigos deste workspace foram preservados em `entrada/arquivo-inicial/`. Não fazem parte dos fontes oficiais nem do histórico inicial. Não há commit, tag, remoto ou push criado automaticamente.

## Gerar os plugins para instalar

Requisitos: PowerShell 7+; PHP 7.4+ para o lint. Não há compilação de frontend nem dependências Node no WordPress. Execute na raiz do projeto:

```powershell
./scripts/build.ps1
# Ou apenas um plugin:
./scripts/build.ps1 -Plugin lps
./scripts/build.ps1 -Plugin simulados
# Se PHP não estiver no PATH:
./scripts/build.ps1 -PhpPath 'C:/caminho/php.exe'
```

O script lê a versão diretamente do PHP, verifica manifests e `index.html`, executa lint quando PHP está disponível e compara todos os arquivos do ZIP com os fontes por SHA256. Só depois substitui o pacote atual e remove os outros ZIPs versionados **do mesmo plugin em `dist/`**. Não remove materiais de `entrada/`, arquivos dos fontes ou o ZIP do outro plugin. Sem PHP, avisa explicitamente que o lint foi omitido.

Saída inicial:

```text
dist/medtwins-simulados-1.6.2.zip
dist/medtwins-lps-e-sites-1.3.0.zip
```

Os atalhos `medtwins-simulados/build.ps1` e `medtwins-lps-e-sites/build.ps1` chamam esse mesmo processo. Os ZIPs incluem uma única pasta com o slug do plugin; não incluem ferramentas, previews, dependências ou materiais recebidos.

## Executar e conferir

**Prévia estática:** com PHP disponível, rode um servidor HTTP (não abra os módulos via `file://`):

```powershell
./scripts/preview.ps1 -Plugin lps
# Outra porta para visualizar as provas:
./scripts/preview.ps1 -Plugin simulados -Port 8081
```

Abra `http://127.0.0.1:8080/paginas/medtwins-home/index.html`, ou substitua o ID por outra página de `paginas/`. Para provas: `http://127.0.0.1:8081/simulados/pediatria/index.html`. Ctrl+C encerra o servidor. Use `-PhpPath 'C:/caminho/php.exe'` se necessário.

A prévia estática verifica HTML, CSS e JS. Configurações salvas no painel, shortcodes, iframe e endpoints REST exigem WordPress. As LPs podem carregar o RD Station real na prévia: para testar formulários sem conversões reais, use os testes interceptados abaixo.

**WordPress local ou homologação:** instale WordPress 6.0+ com PHP 7.4+ e banco de dados, envie os ZIPs em Plugins > Adicionar plugin, ou copie as duas pastas oficiais para `wp-content/plugins/`. Ative ambos. Crie páginas Elementor Canvas ou equivalentes com os shortcodes; ajuste os destinos nos dois menus de Ferramentas. Não há instalador de WordPress/banco incluído neste repositório.

Exemplos:

```text
[medtwins_simulado id="pediatria"]
[medtwins_simulado id="simulado-geral"]
[medtwins_calendario]
[medtwins_liberacao]
[medtwins_pagina id="medtwins-home"]
[medtwins_pagina id="medtwins-simulados"]
[medtwins_pagina id="simulado-nacional"]
[medtwins_pagina id="simulado-nacional-liberacao"]
[medtwins_pagina id="simulado-nacional-6-areas"]
[medtwins_pagina id="simulado-nacional-6-areas-liberacao"]
```

As instruções e limites de cada plugin estão nos respectivos `README.md`. Configurações de produção ficam no banco WordPress, não neste Git. Valide mapeamento e automação de e-mail na conta RD após publicar. Limpe os caches WordPress/CDN após atualizar.

## Testes opcionais de manutenção

Node.js 18+ e npm são necessários apenas para os testes de navegador. Chrome instalado é usado nos testes Chromium; instale o WebKit com o comando abaixo:

```powershell
npm ci
npx playwright-core install webkit
php medtwins-lps-e-sites/tools/test-simulados-config.php
./scripts/test-build.ps1
npm run test:fluxos
npm run test:animacoes
npm run test:videos
```

O teste de build usa fontes fictícios em `tmp/` para conferir substituição, limpeza e preservação do ZIP anterior em caso de erro; aceita `-PhpPath`. Os testes de fluxo interceptam o RD e as provas externas; não enviam leads reais. Os testes de animação usam a fixture versionada em `tools/fixtures/` e geram evidências ignoradas em `previews/`. O teste de vídeo abre um servidor em loopback e testa WebKit; não substitui validação em iPhone/Mac reais. Para executar os fluxos só no Chrome: `$env:VERIFY_ENGINE = 'chromium'` antes do comando; remova a variável para testar ambos.

## Próximas entregas e histórico

Siga `docs/FLUXO-DE-ATUALIZACAO.md`: receber em `entrada/`, analisar, integrar na pasta oficial, atualizar versões, validar e gerar. O build não analisa nem importa novas páginas sozinho.

As versões anteriores serão recuperáveis pelo Git **após os commits autorizados**. Inicializar o repositório não grava um snapshot. Commit, tag e push dependem de autorização explícita para cada lote; ferramentas de build e preview nunca os executam. Para reconstruir uma versão antiga já registrada, use um checkout separado do commit/tag e rode o mesmo build. Materiais ignorados precisam de backup próprio.
