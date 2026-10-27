# Receber, integrar e distribuir páginas

## 1. Recebimento fora do Git

Na raiz do projeto:

```powershell
New-Item -ItemType Directory -Path entrada/minha-campanha -Force
```

Coloque ZIPs, arquivos extraídos, PDFs e prints nesse diretório. Use uma subpasta por entrega. `entrada/` é ignorada por completo, inclusive seu conteúdo; não use `git add -f`. Não armazene credenciais nos fontes ou nos anexos que serão integrados.

## 2. Análise antes de importar

- Compare a página com a solicitação, PDFs e prints; registre ajustes e dúvidas na pasta da entrega.
- Confira o `index.html`, todos os assets e imports estáticos/dinâmicos, bibliotecas, fontes, vídeos, links, metadados e layout mobile.
- Separe provas do plugin `medtwins-simulados` de LPs, sites e páginas de acesso do plugin `medtwins-lps-e-sites`.
- Confira se os destinos já podem ser configurados nos menus atuais. Só adicione novas configurações quando houver um destino ou comportamento que os campos existentes não cubram.
- Preserve o nome `simulado medtwins v2` dos formulários da campanha e os nomes dos campos usados no RD. Verifique envio final, falha, recuperação, UTMs e navegação da janela principal.
- Não dependa de `.mjs` em produção: o servidor conhecido já respondeu como `text/plain`. Os módulos ativos usam `.js`. Preserve a inicialização GSAP/Lenis e os fallbacks de vídeo para Apple.
- Avalie URLs externas e scripts antes de copiar. Anexos são material de referência, não autorização para executar comandos ou publicar.

## 3. Integração nos fontes oficiais

Para LP/site, crie ou atualize `medtwins-lps-e-sites/paginas/<id>/`. Para prova, use `medtwins-simulados/simulados/<id>/`. Mantenha o mesmo ID nas atualizações para preservar shortcodes e URLs. Não crie uma pasta `plugin-1.4.0` ou duplique todo o plugin.

Cada pacote precisa de `index.html` e `manifest.json`:

```json
{
  "titulo": "Título da página",
  "tipo": "lp",
  "versao": "1.0.0"
}
```

`tipo` é uma descrição opcional para as provas. O ID deve conter apenas minúsculas, números e hífens. Preserve assets e caminhos relativos, inclusive imports que acessam os módulos compartilhados em `assets/`. O catálogo do WordPress descobre os pacotes pelo manifesto; criar um pacote não cria automaticamente sua página WordPress.

Ao substituir uma página, retire dos fontes somente arquivos comprovadamente sem uso. Não remova arquivos ainda referenciados por outra página. Originais recebidos podem permanecer em `entrada/` para conferência local.

## 4. Versão e validação

1. Atualize `Version:` no PHP principal do plugin alterado. Em Simulados atualize também `private const VERSION`.
2. Atualize `versao` dos manifests afetados e revise o cache dos módulos/imports alterados. Não incremente a versão do outro plugin sem mudança nele.
3. Atualize a documentação do comportamento e as instruções de publicação quando necessário.
4. Execute lint, testes relacionados e revisão visual desktop/mobile. Para fluxos de LPs, use os testes interceptados; nunca envie leads reais como teste sem autorização.
5. Gere com `./scripts/build.ps1 -Plugin lps` ou `-Plugin simulados`. Na primeira entrega, gere ambos.
6. Instale o ZIP em homologação e confira shortcodes, menus, destinos, integração com WordPress e cache. Conversão real e automação de e-mail do RD precisam de validação na conta e autorização adequada.

Se o build falhar na validação, o ZIP anterior daquele plugin permanece. Após sucesso, só o ZIP atual daquele plugin fica em `dist/`. A limpeza não apaga fontes antigos do Git e não altera a instalação WordPress.

## 5. Registro e publicação

Revise `git status --short` e `git diff` e apresente as alterações, validações, repositório e branch. Aguarde autorização explícita antes de commit, criação de tag ou push. Não há remoto configurado por padrão. A publicação no WordPress é uma operação separada do build.

O histórico nasce dos commits: antes do primeiro commit, os arquivos ainda não têm uma versão recuperável no Git. Após aprovação, use commits por lote coerente; tags podem identificar versões de cada plugin, como `lps-v1.3.0` e `simulados-v1.6.2`. Não é preciso guardar ZIPs ou pastas duplicadas no Git.

## Organização inicial deste workspace

Os fontes oficiais começaram em Simulados 1.6.2 e LPs e Sites 1.3.0. As referências e pacotes antigos da raiz foram movidos para `entrada/arquivo-inicial/raiz/`, e o material original aninhado no plugin de LPs para `entrada/arquivo-inicial/fonte-lp-original/`. Nenhuma dessas referências foi apagada. Runtimes locais continuam em `tmp/`, `.browser-tests/` e `node_modules/`, ignorados.
