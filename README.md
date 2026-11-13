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

## Prévia no GitHub Pages

**[Abrir Universo IF Avalia](https://anaclaracunhasanthos-gif.github.io/aula12.11/)**

A prévia estática do frontend foi publicada em 12/11/2026 via GitHub Actions, [workflow de deploy — tentativa 3](https://github.com/anaclaracunhasanthos-gif/aula12.11/actions/runs/43275492418) (build e publicação concluídos com sucesso). Código-fonte na branch `feat/universo-if-avalia-mvp`; o Pull Request [#1](https://github.com/anaclaracunhasanthos-gif/aula12.11/pull/1) segue em rascunho, sem merge.

O GitHub Pages hospeda **somente a interface pública de catálogo**; não hospeda servidor de votos. A prévia não está conectada à planilha e não aceita votos reais. O build publicado usa `VITE_BASE_PATH=/aula12.11/`.

Consulte [docs/REGISTRO_PUBLICACAO.md](docs/REGISTRO_PUBLICACAO.md) para links, commit de origem e evidências.

## Documentação
- `docs/AUDITORIA_CATALOGO.md`
- `docs/BACKLOG.md`
- `docs/CONFIGURAR_GOOGLE.md`
- `docs/TESTES_E_QA.md`

## Planilha Google Sheets — estrutura criada

A planilha **privada** da equipe foi criada no Google Drive em 13/11/2026, com as quatro abas de armazenamento (`Projetos`, `Codigos`, `Avaliacoes`, `Configuracao`) e catálogo validado de 46 projetos. Não foram emitidos códigos nem registrados votos de produção; `votacao_aberta=false`. A API Google Sheets confirmou escrita/leitura em aba temporária de QA e exclusão posterior.

O projeto Google Apps Script **ainda precisa ser criado e implantado** a partir da planilha. Siga [docs/CONFIGURAR_GOOGLE.md](docs/CONFIGURAR_GOOGLE.md). Nenhum identificador privado de planilha deve ser guardado no GitHub.

## Limitações atuais
O **frontend estático está publicado para prévia**, mas ainda não há conexão com uma planilha real, votação pública, teste de voto com recibo ou homologação integral. Não declarar que a avaliação popular esteja operacional até completar integração e QA.

**Controle de mudanças:** não efetuar merge sem nova autorização. Atualizações futuras do Pages devem ser revisadas e autorizadas. O frontend também pode ser examinado localmente com `npm run dev`. A integração com a planilha permanece bloqueada até autorização específica.

## Primeiro teste do frontend
- CI: **PASS** — 10 testes Vitest, TypeScript e Vite (`GitHub Actions`, execução [43272799425](https://github.com/anaclaracunhasanthos-gif/aula12.11/actions/runs/43272799425)).
- Build do React disponível como artefato `universo-if-avalia-primeiro-frontend` na execução acima; a prévia pública do frontend foi implantada posteriormente pelo workflow 43275492418.
- Revisão visual com Chromium em desktop 1365 px e celular simulado 390 px, com busca, filtros e detalhes testados.
- Consulte [docs/STATUS_EXECUCAO.md](docs/STATUS_EXECUCAO.md) e [docs/TESTES_E_QA.md](docs/TESTES_E_QA.md) para evidências e bloqueios.
