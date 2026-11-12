# Universo IF Avalia

Protótipo acadêmico de participação popular educativa do IFMA (2026.2). **Não é votação nem julgamento oficial do evento.**

## Funcionalidades
- Catálogo consolidado com 46 projetos (24 Mostra Nacional, 22 Mostra de Extensão).
- Busca acento-insensível, filtros por modalidade/área/data e detalhes.
- Formulário de avaliação e ranking no HTML Service do Apps Script; o catálogo React direciona para essas telas após configurar a URL.
- Modelo B: um código pode avaliar projetos diferentes, mas apenas uma vez cada projeto.
- Quatro critérios com pesos 30/30/25/15.
- Ranking separado por modalidade; mínimo de cinco avaliações; desempate por média, quantidade e título.

## Desenvolvimento
```bash
npm install
npm run typecheck
npm test
npm run build
npm run dev
```

Defina `VITE_BASE_PATH=/nome-do-repositorio/` para GitHub Pages em subcaminho. Defina `VITE_GAS_APP_URL` com a URL `/exec` do Apps Script implantado.

## Arquitetura e segurança
React/Vite/TypeScript é o catálogo estático. Google Apps Script + Google Sheets fazem validação, persistência e agregação. Não há login visitante nem banco adicional. O backend usa hash SHA-256 dos tokens, LockService e idempotência. A integração de voto usa HTML Service/`google.script.run`, evitando fingir confirmação com `no-cors`.

## Publicação
Workflow `/.github/workflows/pages.yml`: configurar Pages → Source = GitHub Actions. O deploy está limitado a execução manual (`workflow_dispatch`) e depende de aprovação adicional da equipe.

## Documentação
- `docs/AUDITORIA_CATALOGO.md`
- `docs/BACKLOG.md`
- `docs/CONFIGURAR_GOOGLE.md`
- `docs/TESTES_E_QA.md`

## Limitações atuais
A aplicação ainda não está publicada nem conectada a uma planilha real. Não declare homologação até completar o roteiro de integração e QA.

**Publicação:** o workflow Pages é manual (workflow_dispatch); não executar sem aprovação adicional. O frontend pode ser examinado localmente com `npm run dev`. A integração com a planilha permanece bloqueada até autorização específica.

## Primeiro teste do frontend
- CI: **PASS** — 10 testes Vitest, TypeScript e Vite (`GitHub Actions`, execução [43272799425](https://github.com/anaclaracunhasanthos-gif/aula12.11/actions/runs/43272799425)).
- Build do React disponível como artefato `universo-if-avalia-primeiro-frontend` na execução acima, sem publicação.
- Revisão visual com Chromium em desktop 1365 px e celular simulado 390 px, com busca, filtros e detalhes testados.
- Consulte [docs/STATUS_EXECUCAO.md](docs/STATUS_EXECUCAO.md) e [docs/TESTES_E_QA.md](docs/TESTES_E_QA.md) para evidências e bloqueios.
