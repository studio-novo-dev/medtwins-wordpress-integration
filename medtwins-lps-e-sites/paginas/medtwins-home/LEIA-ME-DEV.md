# MedTwins · Home — pacote para publicação

Página única (Home) da MedTwins, feita pelo Studio Novo em HTML, CSS e JavaScript puros, sem build e sem dependências de servidor. Esta pasta já é a versão de produção.

## O que tem aqui

```
index.html              a página inteira (13 seções + rodapé)
css/medtwins.css        todo o CSS, num arquivo só
js/main.js              ponto de entrada (ES module), importa os módulos de js/globais e js/secoes
js/vendor/              GSAP 3.15.0 + ScrollTrigger e Lenis 1.3.26 (carregados pelo próprio JS)
assets/fonts/           Alumni Sans e Geist (woff2, só latin) + licenças OFL
assets/icons/           ícones Phosphor (SVG) usados como máscara no CSS
assets/img/             fotos (webp), capas dos vídeos, logo, favicon, imagem de compartilhamento
assets/video/           depoimentos completos (mp4 com áudio, carregam só no clique)
```

Peso: cerca de 25 MB no total, dos quais cerca de 24 MB são vídeo. O carregamento inicial da página fica em torno de 0,6 MB (desktop) e 0,8 MB (mobile): vídeos e imagens abaixo da dobra só carregam quando aparecem na tela, e os depoimentos completos só no clique.

Todos os caminhos são relativos (`assets/...`, `css/...`, `js/...`). Não há chamadas externas: fontes, bibliotecas e ícones são locais.

## Testar antes de subir

Precisa ser servido por HTTP (por causa dos ES modules; abrir o arquivo direto no navegador não funciona). Qualquer servidor estático serve, por exemplo:

```
npx serve .
# ou
python -m http.server 8000
```

## Como colocar no WordPress

O mais simples e que preserva tudo é tratar a página como estática. Duas opções:

**Opção A · subpasta estática (recomendada).** Envie a pasta inteira para o servidor (ex.: `/home-medtwins/` na raiz do site) e aponte a Home para ela: por redirecionamento na raiz, ou por um template de página no tema que inclua o `index.html`. Nada precisa ser alterado nos arquivos.

**Opção B · template de página no tema.** Copie `css/`, `js/` e `assets/` para dentro do tema (ex.: `wp-content/themes/<tema>/medtwins/`) e crie um template (`page-home-medtwins.php`) com o conteúdo do `index.html`. Nesse caso:

- coloque no `<head>` um `<base href="<?php echo get_template_directory_uri(); ?>/medtwins/">`, para que todos os caminhos relativos continuem valendo sem editar o HTML; ou troque os prefixos `assets/`, `css/` e `js/` pela URL do tema;
- o script precisa continuar como `<script type="module" src=".../js/main.js">`;
- mantenha o `<script>document.documentElement.classList.add('js');</script>` no `<head>`, antes do CSS;
- evite que o tema ou plugins injetem CSS/JS globais nessa página (reset, jQuery, otimizadores que concatenam ou adiam scripts de módulo). Se usar plugin de cache/otimização, exclua essa página da minificação e do "defer/delay JS".

Em qualquer opção, o servidor deve entregar `.mp4` como `video/mp4` e aceitar requisições de faixa (Range), o que Apache e Nginx já fazem por padrão. Os vídeos também podem ir para a biblioteca de mídia ou para um CDN, trocando os caminhos `src`/`poster`/`data-depoimento` no HTML.

## Antes de publicar (pendências)

1. **Destinos dos botões.** Os links sem destino estão com `href="#"` e `data-pendente="destino"` (busque por `data-pendente`). São 11:
   - Quero me preparar para a 1ª etapa
   - Quero treinar para a 2ª etapa
   - Conhecer o START MedTwins
   - Conhecer a preparação teórica
   - Conhecer o treinamento prático
   - Conhecer nossa história
   - Ver depoimentos dos alunos
   - Tirar minhas dúvidas no WhatsApp (link `https://wa.me/55DDDNUMERO`)
   - Falar com a equipe MedTwins
   - Políticas de Privacidade
   - Termos de Uso

   Os botões que levam a seções da própria página (âncoras `#...`) já estão prontos.
2. **Compartilhamento.** No `<head>`, troque `og:image` pela URL absoluta (`https://dominio/.../assets/img/og-medtwins.jpg`) e acrescente `<meta property="og:url" content="https://dominio/">` e `<link rel="canonical" href="https://dominio/">`.
3. **Analytics, pixel e cookies.** Não há nenhum script de rastreamento. Inclua os do cliente (GA4, Meta Pixel, GTM, banner de cookies) no `<head>`/fim do `<body>`.

## Pontos para o cliente validar

- **Depoimentos em vídeo:** são 5 alunos reais do Curso Prático 25.2. Vale alguém ouvir os áudios antes de publicar.
- **Questão da seção "Prova teórica":** é ilustrativa e foi escrita pelo Studio Novo. Precisa da revisão da equipe médica.
- **Conversa da seção "Acompanhamento":** é ilustrativa (nomes genéricos).
- **Números:** +2.450 alunos, 93,33% de aprovação, 80 videoaulas, +100 estações.
- **Fotos:** confirmar quem é quem nas etiquetas dos fundadores (seção "Nossa história").

## Comportamento e acessibilidade (não remover)

- Tudo é legível sem JavaScript; as animações nunca escondem conteúdo.
- Com "reduzir movimento" ativo no sistema, o site desliga parallax, cenas fixadas, contadores, carrosséis automáticos e vídeos em laço (ficam as capas).
- Vídeos em laço são sempre mudos e só tocam enquanto aparecem na tela.
- Foco visível, contraste AA, um `h1`, `lang="pt-BR"`, imagens decorativas com `alt=""`.

## Licenças de terceiros

- Fontes Alumni Sans e Geist: SIL Open Font License (arquivos em `assets/fonts/`).
- Ícones: Phosphor Icons (MIT).
- GSAP 3.15.0 e ScrollTrigger: licença padrão sem custo da GreenSock/Webflow.
- Lenis: MIT (arquivo em `js/vendor/lenis-1.3.26/`).
