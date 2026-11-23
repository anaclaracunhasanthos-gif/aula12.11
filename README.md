# Universo IF Avalia

**Sistema acadêmico de participação popular educativa — IFMA (2026.2).** O ranking popular é indicativo: **não constitui julgamento científico nem resultado oficial do evento**.

## Links de acesso

- **[Abrir o site no celular ou notebook](https://anaclaracunhasanthos-gif.github.io/aula12.11/)**
- [Formulários e ranking no Web App oficial](https://script.google.com/macros/s/AKfycbz4LOGOx52e0ErthiXDlKXCmk0FsNLPCGYKmrBDS4L-hVAs6GjaVxAZylIdNf7EZs8lKw/exec)
- [Branch preparada para integração estável](https://github.com/anaclaracunhasanthos-gif/aula12.11/tree/release/universo-if-avalia-v1-estavel)
- [Pull Request #2 — revisão da versão estável, sem merge](https://github.com/anaclaracunhasanthos-gif/aula12.11/pull/2)
- [Branch de desenvolvimento com acessibilidade futura](https://github.com/anaclaracunhasanthos-gif/aula12.11/tree/feat/universo-if-avalia-mvp)

**Estado em 23/11/2026:** site e formulário acessíveis em celular e notebook, conforme teste manual da responsável; votação oficial aberta pela equipe organizadora segundo a responsável; planilha privada de produção com **46 projetos, 80 hashes de códigos (60 habilitados, 20 desabilitados) e 8 avaliações válidas observadas na consulta**. A contagem pode aumentar após a consulta.

## Funcionalidades

- Catálogo de **46 projetos**: 24 Mostra Nacional e 22 Mostra de Extensão, com busca, filtros, detalhes e navegação responsiva.
- Votação com quatro notas inteiras de 1 a 5 e pesos: criatividade 30%, clareza 30%, relevância 25%, demonstração 15%.
- Modelo B: um código pode avaliar vários projetos, porém **uma vez em cada projeto**.
- Recibos por solicitação, validação no Apps Script, hashes SHA-256 e controle de concorrência `LockService`.
- Ranking separado por modalidade, com média e posição exibidas após um mínimo de cinco avaliações válidas por projeto.

## Verificação e limites

- **Versão estável:** 16 testes Vitest, validação dos 46 projetos, verificação TypeScript, build e ensaio isolado de concorrência usando 24 workers simulados.
- **Produção:** avaliação real e persistência confirmadas, mas **não foi realizado ensaio rigoroso de concorrência no serviço Google real**.
- **Homologação:** **parcial, com ressalvas**. Ajustes de acessibilidade existentes apenas na branch de desenvolvimento foram **adiados** para versão futura.
- O site publicado não muda automaticamente com commits. O Apps Script exige implantação independente no editor da conta autorizada.

## Executar localmente

Requer Node.js 22.

```bash
npm install
npm run typecheck
npm test
node scripts/testar_concorrencia_simulada.mjs
npm run build
npm run dev
```

Para execução com backend próprio, configurar `VITE_GAS_APP_URL` com uma implantação permitida, **sem incorporar credenciais no frontend**. A propriedade `SPREADSHEET_ID` pertence ao editor privado do Apps Script e nunca ao Git.

## Estrutura

- `src/`: aplicação React/Vite/TypeScript e catálogo.
- `backend/`: fontes de `Code.gs` e formulários/ranking do Google Apps Script.
- `tests/` e `scripts/`: testes automáticos, validação do catálogo e concorrência simulada.
- `docs/`: relatórios, implantação, status, segurança, backlog e proposta de organização da `main`.

## Documentação atualizada

- [Relatório final desta etapa de homologação (resultado parcial)](docs/RELATORIO_HOMOLOGACAO_ETAPA.md)
- [Status de execução](docs/STATUS_EXECUCAO.md)
- [Testes e QA](docs/TESTES_E_QA.md)
- [Registro de publicação](docs/REGISTRO_PUBLICACAO.md)
- [Configuração e segurança do Google](docs/CONFIGURAR_GOOGLE.md)
- [Guia de release e organização da main](docs/GUIA_RELEASE_MAIN.md)
- [Backlog e pendências](docs/BACKLOG.md)

## Versões, privacidade e colaboração

A `main` ainda contém somente o README histórico. Esta branch `release/universo-if-avalia-v1-estavel` **não foi integrada** à `main`. O PR #1 continua para desenvolvimento e acessibilidade futura; o [PR #2](https://github.com/anaclaracunhasanthos-gif/aula12.11/pull/2) está aberto **em rascunho**, aguardando revisão e autorização explícita de merge.

**Não versionar** planilhas privadas, códigos em texto puro, recibos, credenciais ou tokens. Publicar código-fonte não concede acesso às avaliações e aos códigos privados do Google Drive.

A integração à `main` e qualquer nova publicação do site ou do Apps Script exigem autorização separada; o funcionamento da votação oficial deve ser preservado.
