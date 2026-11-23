# Universo IF Avalia

**Aplicação web responsiva de participação popular educativa — IFMA (2026.2).** Protótipo acadêmico: suas avaliações **não são resultado oficial nem julgamento científico** do evento.

## Acesso rápido

- **[Abrir o site (Web e Mobile)](https://anaclaracunhasanthos-gif.github.io/aula12.11/)**
- [Abrir o Google Apps Script publicado (formulários e ranking)](https://script.google.com/macros/s/AKfycbz4LOGOx52e0ErthiXDlKXCmk0FsNLPCGYKmrBDS4L-hVAs6GjaVxAZylIdNf7EZs8lKw/exec) — acesso e envio sujeitos às permissões e à configuração da votação
- [Código-fonte do projeto na branch de desenvolvimento](https://github.com/anaclaracunhasanthos-gif/aula12.11/tree/feat/universo-if-avalia-mvp)
- [Código do Google Apps Script (backend)](backend/Code.gs) e [telas do formulário](backend/)
- [Pull Request #1 para revisão — rascunho](https://github.com/anaclaracunhasanthos-gif/aula12.11/pull/1)
- [Testes automáticos mais recentes — aprovados](https://github.com/anaclaracunhasanthos-gif/aula12.11/actions/runs/45041566549)
- [Registro do GitHub Pages](https://github.com/anaclaracunhasanthos-gif/aula12.11/actions/runs/43631300598)

O site funciona no navegador do computador e do celular; **não há aplicativo nativo Android/iOS**. O frontend usa **React, Vite e TypeScript**. O formulário e o ranking são atendidos pelo **Google Apps Script**, com persistência em **Google Sheets privado**.

## Funcionalidades implementadas

- Catálogo de **46 projetos**: **24 Mostra Nacional** e **22 Mostra de Extensão**, com busca, filtros e detalhes.
- Acesso ao formulário de cada projeto por botão no catálogo publicado.
- Quatro critérios com notas inteiras de 1 a 5: **criatividade (30%)**, **clareza (30%)**, **relevância (25%)** e **demonstração (15%)**.
- Regra de participação: o mesmo código pode avaliar vários projetos, **mas uma única vez por projeto**. A validação ocorre no servidor.
- Ranking por modalidade, com **mínimo de cinco avaliações válidas por projeto** para exibir média e posição. Desempates por maior média, depois quantidade de avaliações e título.

## Situação verificada — 22/11/2026

| Verificação | Resultado |
| --- | --- |
| Catálogo | 46 IDs únicos (24 + 22) — OK |
| Interface e formulário | Site publicado; o formulário de projeto foi aberto em celular pela equipe |
| Integração de votos | 1 avaliação válida registrada e confirmada na planilha privada |
| Validação de códigos | Envio de código inválido foi rejeitado na interface publicada |
| Códigos na base oficial | 10 habilitados e 20 desativados, sem publicar os valores |
| Votação oficial | **Fechada no momento da consulta** (configuração de votação marcada como falsa) |
| Testes automatizados | **14 aprovados**, incluindo 4 testes isolados que executam o código real do backend |
| Ambiente de homologação | Projeto e planilha separados; 5 códigos de teste; sem votos gravados no ambiente de testes |
| Homologação completa | **Pendente** |

**Ainda faltam:** demonstrar voto válido, duplicidade e uso do mesmo código em projetos diferentes no **Web App de homologação**; confirmar ranking com cinco avaliações de teste; verificar acesso autorizado, dispositivos reais, acessibilidade e concorrência; registrar evidências e obter a validação da equipe. Os testes isolados não substituem os testes na implantação real.

**Atenção às versões:** a última publicação confirmada do GitHub Pages ocorreu em **14/11/2026**. A branch recebeu alterações posteriores, que **não são automaticamente publicadas** no Pages. Alterações no código versionado do Google Apps Script também exigem atualização da implantação correspondente no editor do Google.

## Arquitetura e configuração

- Frontend estático: `src/`, servido pelo GitHub Pages.
- Backend: `backend/Code.gs` e arquivos `backend/*.html`, implantados como Google Apps Script.
- Persistência: planilha Google Sheets privada, com abas **Projetos**, **Codigos**, **Avaliacoes** e **Configuracao**.
- Integridade: códigos armazenados como hash SHA-256; controle de concorrência via `LockService`; reenvio de requisições idempotente.
- O build do Pages usa `VITE_BASE_PATH=/aula12.11/` e `VITE_GAS_APP_URL` para direcionar o catálogo ao Web App implantado. Nenhuma credencial deve ir para o frontend ou repositório.

**Privacidade:** o ID e o link direto da planilha, códigos de participantes, recibos individuais e credenciais **não são publicados neste repositório**. O professor pode consultar o **código-fonte** do backend aqui, mas o **editor privado** do Apps Script e a planilha exigem acesso concedido pela equipe.

## Executar localmente

~~~bash
npm install
npm run typecheck
npm test
npm run build
npm run dev
~~~

Para execução local conectada, configure `VITE_GAS_APP_URL` para o seu próprio Web App autorizado. As configurações específicas do servidor ficam nas **Propriedades do script** do Google Apps Script, fora do Git.

## Documentação

- [Situação atual da implementação](docs/STATUS_EXECUCAO.md)
- [Testes e roteiro de homologação](docs/TESTES_E_QA.md)
- [Configuração do Google Sheets e Apps Script](docs/CONFIGURAR_GOOGLE.md)
- [Registro de publicação](docs/REGISTRO_PUBLICACAO.md)
- [Backlog e pendências](docs/BACKLOG.md)
- [Auditoria do catálogo](docs/AUDITORIA_CATALOGO.md)

**Fluxo de revisão:** o desenvolvimento permanece na branch `feat/universo-if-avalia-mvp`, com [PR #1 em rascunho](https://github.com/anaclaracunhasanthos-gif/aula12.11/pull/1). **Nenhuma integração à `main` foi realizada.**
