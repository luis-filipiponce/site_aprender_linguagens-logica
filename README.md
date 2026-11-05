# site_aprender_linguagens-logica

Site "Ponce Metodologias & Curso de Lógica Pura": curso de lógica de programação com 22 módulos, banco de questões, guias de linguagens e metodologias ativas. Funciona como PWA (offline).

Criado em 2026 durante o estágio, com ajuda do BOB (IA). Escrito em 28/10/2026 como registro para rever minha evolução no futuro.

## Como rodar

Requisito: Node.js 20 ou superior.

```bash
npm install
npm run build      # gera os dados dos módulos, compila o TypeScript e versiona o cache do sw.js
npm test           # build + testes automatizados (código de saída 1 se algum falhar)
npm run typecheck  # valida schema dos módulos, tipos e o site (links, metadados, cache offline)
npm run gerar:sitemap # regenera sitemap.xml (SITE_URL define o domínio)
```

Para abrir o site, sirva a pasta raiz por HTTP (o Service Worker não funciona em `file://`), por exemplo `npx serve .`.

> No Windows, se o PowerShell bloquear o `npm`, use o `cmd` ou execute uma vez:
> `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`

## Estrutura de pastas

| Pasta / arquivo | Conteúdo |
| --- | --- |
| `content/modulos/*.json` | Fonte dos 22 módulos (validados por `content/modulo.schema.json`) |
| `src/` | Código TypeScript |
| `img/modulos/*.svg` | Uma figura SVG por módulo (exemplo visual). Título, texto alternativo e legenda em `src/figuras-modulos.ts` |
| `js/`, `css/` | Scripts e estilos do site. `js/curso-logica-*.js` (exceto `curso-logica.js`) e `js/figuras-modulos.js` são **gerados** pelo build: não edite à mão |
| `linguagens/`, `metodologias/`, `aprenda-programacao/`, `guia-metodologias/`, `resumo-metodologia/` | Páginas de conteúdo |
| `scripts/` | `build-conteudo.mjs` (módulos), `versionar-sw.mjs` (hash do cache), `verificar-site.mjs` (links/metadados/cache), `gerar-sitemap.mjs`, `gerar-icones.mjs` (ícones PNG do PWA) |
| `tests/` | Suíte de testes |
| `sw.js`, `offline.html`, `js/pwa.js`, `manifest.json`, `icons/` | PWA (`sw.js` tem o `CACHE_NAME` gerado pelo build: não edite a versão à mão) |
| `docs/` | Arquitetura, roadmap e relatórios |

## Segurança

- O código digitado pelo aluno nos editores roda em um Web Worker descartável, com timeout de 2 s (`runUserCode` em `js/app.js`).
- `node_modules/`, `.env*`, `.bob/` e `backup_*/` não são versionados (ver `.gitignore`).

## CI

O workflow `.github/workflows/ci.yml` executa `typecheck`, `test`, confere que os arquivos gerados estão commitados (`git diff --exit-code`) e roda `npm audit` a cada push.

## Avisos

- A "Tutora IA" é um avaliador por regras e palavras-chave que roda no navegador; não usa modelo de linguagem.
- O certificado é uma declaração de participação autoemitida, sem validade acadêmica; o hash SHA-256 não é verificado por nenhum servidor.
