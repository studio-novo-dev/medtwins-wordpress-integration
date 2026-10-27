# MedTwins LPs e Sites

Plugin WordPress independente para publicar LPs e sites HTML da MedTwins. Usa a mesma ideia de isolamento por iframe do MedTwins Simulados, com classe, shortcode, arquivos e menu próprios. Os dois plugins podem ficar ativos juntos.

O primeiro pacote é a **LP de captura dos simulados**, com ID `medtwins-simulados`. As provas continuam no plugin MedTwins Simulados.

## Instalar e publicar

1. Envie `medtwins-lps-e-sites-1.3.0.zip` em **Plugins > Adicionar plugin > Enviar plugin**.
2. Ative **MedTwins LPs e Sites**.
3. Crie uma página, preferencialmente com o modelo **Elementor Canvas**, e insira:

```text
[medtwins_pagina id="medtwins-simulados"]
```

O catálogo está em **Ferramentas > MedTwins LPs e Sites**, com os shortcodes e links de prévia. A ativação não cria páginas nem altera as páginas existentes.

O padrão `modo="tela"` ocupa a janela abaixo da barra administrativa e mantém a rolagem dentro do iframe. Para incorporar no conteúdo do tema, com altura fixa:

```text
[medtwins_pagina id="medtwins-simulados" modo="conteudo" altura="900px"]
[medtwins_pagina id="medtwins-simulados" modo="conteudo" altura="900px" largura_total="nao"]
```

`largura_total` aceita `sim` ou `nao` e só se aplica ao modo `conteudo`. A altura aceita valores em `px`, `vh`, `dvh`, `svh`, `rem`, `em` e `%`; porcentagens precisam de um contêiner com altura definida. O iframe não ajusta automaticamente a altura ao conteúdo.

## Primeira LP e integrações

O pacote publicado fica em `paginas/medtwins-simulados/`, contendo apenas HTML, CSS, JS e assets usados pela página. O material original foi preservado localmente em `../entrada/arquivo-inicial/fonte-lp-original/`, ignorado pelo Git e excluído do ZIP de instalação. Os fontes oficiais são os de `paginas/`.

O formulário usa a integração com RD Station informada para o projeto. Seu atributo `name` é exatamente **`simulado medtwins v2`**, e seu `id` é `simulado-medtwins-v2`. Preserve esses identificadores ao atualizar a LP.

Os atributos `name` dos campos foram mantidos para preservar o mapeamento:

| Campo | `name` |
| --- | --- |
| Nome | `nome` |
| Telefone | `telefone` |
| E-mail | `email` |
| Faz parte da Mentoria MedTwins | `mentoria_medtwins` |
| Está em outra mentoria ou curso | `outra_mentoria` |
| Prova do INEP que vai prestar | `prova_inep` |
| Já prestou prova do INEP | `ja_prestou_inep` |
| Interesse na Mentoria MedTwins | `interesse_mentoria` |

O script/configuração do RD Station não está presente nos arquivos recebidos. Como a LP roda em um iframe, confirme que a integração instalada consegue acessar esse documento e valide uma conversão na página publicada. A identificação do formulário, por si só, não confirma a captura.

`WEBHOOK_URL`, no início de `paginas/medtwins-simulados/main.js`, continua vazio. Esse envio opcional é independente da integração com RD Station: quando vazio, o JavaScript da LP apenas registra o payload no console, mostra sucesso e redireciona. Não é necessário preencher esse webhook para identificar o formulário; ele só deve ser configurado se houver um envio adicional por JSON.

`REDIRECT_URL`, no mesmo arquivo, mantém o destino original: `https://page.medtwins.com.br/cronograma-de-liberacao-medtwins/`. O redirecionamento abre na janela principal quando a LP está incorporada. Parâmetros `utm_*`, `gclid`, `fbclid` e `msclkid` da página WordPress são repassados ao iframe; o código original do formulário inclui as UTMs no payload e no destino.

O iframe tem um documento próprio: tags de rastreamento instaladas apenas no WordPress não são automaticamente executadas nele. Os eventos existentes da LP usam `dataLayer` e `fbq` do próprio iframe, quando configurados. Título, descrição, imagem de compartilhamento e SEO da URL pública devem ser configurados também na página WordPress; os metadados do HTML incorporado não substituem os da página principal. As fontes da LP usam Google Fonts.

## Adicionar LPs e sites

Crie uma pasta com ID em minúsculas, números e hífens:

```text
paginas/nova-pagina/
  manifest.json
  index.html
  styles.css
  main.js
  assets/
```

Exemplo de `manifest.json`:

```json
{
  "titulo": "Minha nova página MedTwins",
  "tipo": "lp",
  "versao": "1.0.0"
}
```

Use caminhos relativos nos arquivos HTML/CSS/JS. O plugin descobre automaticamente as pastas com `manifest.json` válido e `index.html`. `tipo` é apenas uma descrição no catálogo, podendo ser `lp` ou `site`.

Publique com `[medtwins_pagina id="nova-pagina"]`. Atualize a versão do manifesto e a versão do plugin ao distribuir alterações; limpe os caches do WordPress/CDN após atualizar os assets.

## Gerar o ZIP

No PowerShell, na raiz deste plugin:

```powershell
./build.ps1
```

O atalho usa `../scripts/build.ps1`, lê a versão do PHP e inclui apenas o plugin, a documentação, `assets/`, `includes/` e `paginas/`, sob a pasta única `medtwins-lps-e-sites/`. O ZIP é gerado em `../dist/`; após a validação, substitui o pacote atual e remove os ZIPs anteriores desse plugin nesse diretório. O fluxo completo está no README da raiz e em `../docs/FLUXO-DE-ATUALIZACAO.md`.

Requer WordPress 6.0+ e PHP 7.4+.

## Site institucional — versão 1.1.0 do plugin

O site recebido em `medtwins-home-publicar/medtwins-home/` está incluído em `paginas/medtwins-home/`, com seus arquivos preservados, incluindo fontes locais, módulos JavaScript, bibliotecas e vídeos.

Use o shortcode em uma página WordPress com modelo Elementor Canvas:

```text
[medtwins_pagina id="medtwins-home"]
```

O site aparece no catálogo **Ferramentas > MedTwins LPs e Sites**. Para usá-lo como página inicial, selecione a página criada em **Configurações > Leitura > Uma página estática**. A atualização do plugin não altera essa configuração.

O pacote tem cerca de 25 MB, principalmente vídeos. Confira o limite de upload do WordPress ao instalar o ZIP. O servidor deve servir `.mjs` como JavaScript, `.woff2` como fonte e `.mp4` como vídeo, com suporte a Range para reprodução e busca nos vídeos. O conteúdo rola dentro do iframe, incluindo a navegação por âncoras, o menu mobile e os depoimentos.

O site recebido tem **11 links marcados com `data-pendente="destino"` e `href="#"`**, incluindo CTAs de cursos/etapas, história, depoimentos, contato/WhatsApp, privacidade e termos. Esses destinos foram preservados e precisam ser preenchidos antes de divulgar. A documentação original está em `paginas/medtwins-home/LEIA-ME-DEV.md`; as alternativas de publicação ali descritas são referências do pacote original. Neste plugin, a publicação usa o shortcode acima.

Configure o título, a descrição, a imagem de compartilhamento, a URL canônica e o rastreamento na página pública conforme o ambiente WordPress. O site recebido não contém scripts de analytics/pixel; scripts instalados apenas no documento WordPress não são automaticamente executados dentro do iframe.

## Alteração na versão 1.0.2

As artes de fundo ficam retas em desktop e mobile, mantendo o movimento vertical. A inclinação por perspectiva e pelo movimento do mouse foi removida. O nome do formulário e os campos da integração RD Station foram preservados.

## Destinos editáveis — versão 1.2.0

Em **Ferramentas > MedTwins LPs e Sites > Destinos do site institucional**, edite os 11 destinos dos botões e páginas legais e os 3 links das redes sociais. Clique em **Salvar destinos do site**. Somente administradores com `manage_options` podem salvar; o formulário usa a Settings API e o nonce do WordPress.

Aceita URLs completas HTTP(S), caminhos a partir da raiz como `/preparacao/` e âncoras da home como `#depoimentos`. Caminhos relativos à raiz apontam para o domínio WordPress. Para WhatsApp, use o link completo `https://wa.me/` com o telefone. Vazio deixa o link sem destino; URL inválida mantém o valor salvo anterior e mostra um erro. Os links sociais começam com os destinos recebidos no site original.

Os destinos ficam no banco de dados do WordPress e permanecem ao atualizar o plugin. A home consulta os valores atuais ao abrir pelo shortcode ou pela prévia do catálogo. A REST API pública fornece somente esses links e não aceita alterações. O endpoint envia `Cache-Control: no-store`; exclua `medtwins-lps/v1/home-destinos` de regras externas de cache, caso existam.

Links para outras páginas abrem na janela principal; redes sociais preservam a abertura em nova aba; âncoras mantêm a navegação interna. A integração requer que a home e a API WordPress estejam na mesma origem, como ocorre na instalação padrão do plugin. Abrir o HTML diretamente, sem o parâmetro de configuração gerado pelo plugin, mantém os links originais. O formulário da LP dos simulados permanece independente.

## Correção das animações — versão 1.2.1

Na página publicada, o servidor retornava `text/plain; charset=UTF-8` para `lenis.mjs`. Isso bloqueava o grafo de módulos da home, antes da inicialização das animações, dos menus e do GSAP. A versão de produção agora importa uma cópia idêntica da biblioteca em `lenis.js`, preservando sua licença e seus exports. As referências dos módulos da aplicação usam `?v=1.2.1` para evitar reutilizar os imports antigos do cache. O `.mjs` original foi mantido como referência e não é carregado pela aplicação.

Após atualizar o plugin, limpe o cache do WordPress/WP Rocket e do CDN, se houver. A página pública usa WP Rocket com scripts adiados: caso o iframe não ocupe a tela imediatamente, exclua também `medtwins-lps-e-sites/assets/embed.js` do atraso de execução do JavaScript. Os scripts da home dentro do HTML estático não precisam ser concatenados ou minificados pelo WordPress.

O modo “reduzir movimento” do sistema continua sendo respeitado. Nesse modo, não há parallax, cenas fixadas, contadores animados, carrosséis automáticos ou vídeos em laço, conforme a documentação original.

## Reprodução de vídeos — versão 1.2.2

As prévias agora compartilham a preparação de reprodução inline: propriedades `defaultMuted`, `muted` e `playsInline`, seleção inicial da fonte e nova tentativa no carregamento e em toque/clique do usuário. Só vídeos solicitados pela seção e visíveis são retomados por gesto. O modo de movimento reduzido continua respeitado. O iframe delega `autoplay`, tela cheia e picture-in-picture; isso não substitui as políticas de reprodução do navegador.

Nos depoimentos, o vídeo é inserido antes de carregar a fonte, com controles nativos e `playsinline`. Se o primeiro `play()` falhar, aparece **Tocar para assistir**, com opção **Abrir vídeo** em outra aba. A tentativa manual chama `play()` diretamente no evento do usuário.

Na investigação, dois vídeos do servidor responderam corretamente com MIME `video/mp4` e HTTP 206 para faixas iniciais, abertas e finais. Os arquivos recebidos usam H.264 Main, com `moov` antes de `mdat`. A falha relatada em aparelhos Apple não foi reproduzida integralmente no WebKit para Windows; a validação em iPhone/macOS continua necessária. Testes com WebKit de automação não equivalem a testes em aparelhos Apple reais.

Após atualizar, limpe os caches de WordPress/WP Rocket/CDN. Preferências de movimento reduzido e bloqueios de reprodução automática do Safari continuam válidos; a reprodução manual serve para recuperar um play recusado, não para desativar essas preferências.

## Ajustes de copy da preparação teórica — versão 1.2.3

Aplicados os dois textos completos de “Ajustes copy Site .pdf” na seção “O que você encontra na preparação teórica”: Cronograma diário pronto primeiro, seguido de Aulas gravadas 100% estratégicas. Max. 30 min. Os dois conteúdos aparecem em blocos maiores, lado a lado no desktop e empilhados no celular, com subtítulos e parágrafos separados. As mídias acompanham o respectivo assunto.

Os três recursos seguintes continuam com seus textos e mídias na faixa deslizável. Os pontos de navegação correspondem a esses três recursos. CSS e manifesto foram versionados para a atualização. As integrações e as correções de vídeo/animação foram mantidas.

## Novos Simulados Nacionais — versão 1.3.0

Incluídas as quatro páginas recebidas. Use em páginas WordPress com modelo Canvas:

```text
[medtwins_pagina id="simulado-nacional"]
[medtwins_pagina id="simulado-nacional-liberacao"]
[medtwins_pagina id="simulado-nacional-6-areas"]
[medtwins_pagina id="simulado-nacional-6-areas-liberacao"]
```

Fluxos padrão:

- Cadastro de 100 questões → acesso único → Simulado Geral MedTwins de 100 questões.
- Cadastro de 6 simulados → acesso por área → Pediatria, GO, Cirurgia, Preventiva, Clínica e Geral.

Os seis endereços reais foram recuperados da API pública do cronograma antigo e verificados em 26/10/2026. Nacional e Geral apontam à mesma prova já existente; não foi criada outra prova ou banco de questões. O plugin de provas MedTwins Simulados continua separado.

Em **Ferramentas > MedTwins LPs e Sites > Novos Simulados Nacionais**, edite os sete destinos, data/horário e nome de formulário por campanha, URLs públicas opcionais e carregador RD Station. As datas e horários começam vazios, com exemplos como placeholder no painel; vazios ficam ocultos nas LPs. As páginas de acesso permanecem sem datas/travas. Os campos são salvos em opção própria; a home institucional mantém sua configuração anterior.

Prioridade dos destinos: valor salvo nas novas configurações → endereço salvo no cronograma antigo (quando existir) → endereço real padrão do pacote. Vazio em um destino significa usar esse fallback. As URLs públicas das quatro páginas são detectadas nos shortcodes publicados, inclusive em dados do Elementor; também podem ser informadas manualmente. Sem página publicada, a navegação usa o index.html instalado, sem exigir a criação de páginas para o fluxo básico funcionar.

A configuração é lida por GET na REST API `medtwins-lps/v1/simulados-config`, sem cache e sem dados de leads. O shortcode inclui o endereço da API. Abrir diretamente um index.html sob o wp-content também detecta a API. Para publicar como site estático independente, mantenha as quatro pastas sob paginas/ e os arquivos compartilhados em assets/: o fallback JSON mantém os destinos e a ligação entre as páginas, sem PHP. Datas/nomes/URLs no modo estático são editados em assets/simulados-defaults.json. Continua sendo necessário HTTP/HTTPS, pois os scripts são módulos.

Os formulários usam o `name` solicitado, **simulado medtwins v2**, com IDs distintos e campo oculto `pagina` (`simulado-nacional-100` ou `simulado-nacional-6-areas`). As cinco perguntas e os nomes existentes foram preservados. Nome do formulário por campanha é editável no painel. O primeiro passo usa botão sem submit e Enter controlado; a captura ocorre no submit final válido. O carregador RD encontrado no GTM já usado pela MedTwins é carregado dentro das LPs; não há dependência de o GTM do documento WordPress acessar o iframe. Foi retirado o caminho que simulava um POST bem-sucedido em console. Se a integração não carrega, o formulário mostra falha e permite tentar de novo, sem confirmar nem redirecionar.

O RD captura via código de monitoramento. A instalação local não comprova recebimento de conversão nem dispara e-mail por conta própria: confirme o mapeamento/ativação dos dois formulários e a automação de envio de acesso na conta RD após atualizar. Testes de desenvolvimento interceptam o script RD e não enviam dados reais. O redirecionamento pós-formulário leva à página de acesso correspondente, na janela principal, com UTMs. As páginas têm links no rodapé entre os dois fluxos e para voltar ao cadastro.

A correção de MIME do Lenis foi aplicada aos quatro pacotes (`lenis.js`), incluindo versionamento dos imports estáticos e dinâmicos. Os links de acesso não usam mais `href="#"` nem `data-pendente`. O acervo continua decorativo; o conteúdo das questões ilustrativas não foi alterado. Limpe o cache WordPress/WP Rocket/CDN após atualizar.

