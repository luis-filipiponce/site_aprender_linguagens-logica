# Arquitetura Técnica & Roadmap de Engenharia
**Projeto:** Ponce Metodologias & Curso Completo de Lógica de Programação Pura

---

## 1. Visão Geral da Arquitetura Atual

```text
┌─────────────────────────────────────────────────────────────┐
│                       CAMADA DO CLIENTE                     │
│  [HTML5 Semântico] ── [CSS3 Design System & 4 Interfaces]   │
│         │                                                   │
│  [Spotlight Search Ctrl+K] ── [Drag to Scroll Horizontal]  │
│         │                                                   │
│  [Motor Pedagógico 22 Módulos] ── [IA Tutora 9 Seções]      │
│         │                                                   │
│  [Service Worker sw.js (Offline)] ── [LocalStorage Sync]   │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Roadmap de Evolução por Sprints

### Sprint 1: Experiência Visual & Acessibilidade (Concluído)
- [x] Redesign da Logo / Isotipo com iluminação neon e SVG.
- [x] Navegação com Drag to Scroll (arraste horizontal com inércia e setas de navegação).
- [x] Spotlight Command Palette com filtros e busca instantânea.
- [x] Adaptação responsiva multi-resolução para 4K, laptops, tablets e celulares.

### Sprint 2: Offline First & Progressive Web App (Concluído)
- [x] Manifesto PWA (`manifest.json`) com ícones e display standalone.
- [x] Service Worker (`sw.js`) com cache inteligente e fallback de navegação.

### Sprint 2.5: Tipagem Estática com TypeScript (Concluído)
- [x] `package.json`, `tsconfig.json` e `tsconfig.check.json` (TypeScript + `@types/node`).
- [x] Tipos do domínio em `src/tipos.d.ts` (`Modulo`, `ExtraModulo`, `ExtrasCurso`, `IdModulo`).
- [x] Conteúdo de aprofundamento migrado para `src/curso-logica-extras.ts`; o compilador exige os 22 módulos e valida o formato de cada um.
- [x] `js/curso-logica.js` verificado por `checkJs` (anotação `@type {Modulo[]}` em `MODULOS_LOGICA`).
- [x] Texto das 22 aulas movido para `content/modulos/NN-slug.json`, validado por `content/modulo.schema.json` (Ajv).
- [x] `scripts/build-conteudo.mjs` valida o schema + regras extras (resposta dentro das opções, trace em ordem, ids/slugs únicos, nome do arquivo) e gera `js/curso-logica-dados.js`.
- [ ] Migrar `js/curso-logica.js` e `js/app.js` integralmente para `src/*.ts` (hoje só verificados via JSDoc).
- [ ] Ativar `strict` na verificação de `js/curso-logica.js` (hoje ~40 erros de `any` implícito).
- [ ] Mover o conteúdo extra (`src/curso-logica-extras.ts`) também para JSON com schema.

**Fluxo de trabalho:**
```text
npm install               # instala TypeScript e Ajv
npm run validate:conteudo # só valida content/modulos/*.json
npm run build             # valida + gera js/curso-logica-dados.js + compila src/*.ts
npm run typecheck         # conteúdo + tipos de src/ + verificação JSDoc de js/curso-logica.js
npm test                  # build + tests/test_suite.js
```
> Arquivos **gerados** (não edite à mão): `js/curso-logica-dados.js` (de `content/modulos/*.json`) e `js/curso-logica-extras.js` (de `src/curso-logica-extras.ts`).
>
> **Para editar uma aula:** altere `content/modulos/NN-slug.json`, rode `npm run build` e recarregue o site.
>
> Ordem de carregamento no HTML: `curso-logica-dados.js` → `curso-logica-extras.js` → `curso-logica.js`.

### Sprint 3: Certificação & Sandbox de Código (Próximos Passos)
- [ ] Emissão de certificado digital de domínio cognitivo com hash criptográfico SHA-256.
- [ ] Sandbox interativo de execução de pseudocódigo no navegador.
- [ ] Integração com backend Node.js seguro para chamadas a modelos de IA generativa (watsonx.ai / LLMs).
