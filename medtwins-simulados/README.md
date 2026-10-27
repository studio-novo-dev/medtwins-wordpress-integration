# MedTwins Simulados

Plugin WordPress para publicar experiências interativas da MedTwins isoladas do tema por `iframe`.

## Instalação

1. Na raiz do repositório, execute `./scripts/build.ps1 -Plugin simulados` (ou `./build.ps1` dentro desta pasta). O pacote atual fica em `../dist/`, gerado e validado a partir dos fontes; o ZIP anterior desse plugin em `dist/` é removido após sucesso.
2. No WordPress, acesse **Plugins > Adicionar plugin > Enviar plugin**.
3. Envie o ZIP e ative **MedTwins Simulados**.
4. Crie uma página em branco (de preferência Elementor Canvas) e insira um dos shortcodes:

```text
[medtwins_simulado id="pediatria"]
[medtwins_simulado id="ginecologia-obstetricia"]
[medtwins_simulado id="clinica-medica"]
[medtwins_simulado id="cirurgia"]
[medtwins_simulado id="preventiva-saude-coletiva"]
[medtwins_simulado id="simulado-geral"]
[medtwins_calendario]
[medtwins_liberacao]
```

Os links e checks do cronograma de liberação são configurados em **Ferramentas > MedTwins Simulados**.

O calendário funciona imediatamente em modo local. Acontecimentos criados ou editados ficam armazenados no navegador em uso. Para persistência compartilhada entre usuários, é necessário conectar e proteger a API preparada no pacote original.

Por padrão, o simulado usa o modo `tela`: fica fixo na área visível abaixo da barra administrativa do WordPress e mantém somente a rolagem interna do simulado. Isso evita o scroll duplo e oculta o cabeçalho e o rodapé do tema durante o uso.

Para incorporar o simulado no fluxo normal de uma página, use `modo="conteudo"`. Nesse modo, a altura também pode ser ajustada:

```text
[medtwins_simulado id="pediatria" modo="conteudo" altura="900px"]
[medtwins_simulado id="pediatria" modo="conteudo" largura_total="nao"]
```

## Adicionar um novo simulado

1. Duplique uma pasta existente dentro de `simulados/`.
2. Renomeie a cópia com um ID simples, em minúsculas e sem espaços, como `clinica-medica`.
3. Substitua `data/simulado-data.js` pelo banco de questões novo.
4. Atualize o título e a versão em `manifest.json`.
5. Se necessário, substitua as imagens em `assets/`.
6. Use `[medtwins_simulado id="clinica-medica"]`.

O plugin detecta automaticamente todos os diretórios que possuam `manifest.json` e `index.html`.

## Estrutura de cada pacote

```text
simulados/id-do-simulado/
├── manifest.json
├── index.html
├── support.js
├── assets/
│   ├── banner-gps1.png
│   ├── capa-bg.jpg
│   ├── logo-dark.png
│   └── logo-white.png
└── data/
    └── simulado-data.js
```

## Manutenção

Receba novas provas e referências em `entrada/` na raiz do repositório, ignorada pelo Git. Integre somente os arquivos revisados nesta árvore oficial. Veja o README da raiz e `docs/FLUXO-DE-ATUALIZACAO.md` para versões, testes e histórico. Não duplique a pasta do plugin a cada entrega.


