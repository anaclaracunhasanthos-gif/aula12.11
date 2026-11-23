# Status de execução — Universo IF Avalia

**Atualizado em 23/11/2026.** Site em operação; **homologação parcial com ressalvas**; branch estável preparada para revisão.

| Etapa | Situação em 23/11/2026 | Evidência |
| --- | --- | --- |
| G0 — Repositório | **Em revisão** | `main` somente com README; branch `release/universo-if-avalia-v1-estavel` criada. PR de acessibilidade futura separado |
| G1 — Catálogo | **Aprovado** | 46 IDs: 24 Nacional + 22 Extensão; busca, filtros, detalhes |
| G2 — Frontend e build | **Aprovado** | TypeScript, testes Vitest, build e GitHub Pages publicado |
| G3 — Dados oficiais | **Conferido** | 46 projetos, 80 hashes (60 ativos, 20 inativos), 8 avaliações válidas no retrato |
| G4 — Votação oficial | **Aberta e recebendo avaliações** | Configuração `TRUE`; oito avaliações reais observadas; recibos únicos na amostra |
| G5 — Ranking | **Aprovado nos testes** | Separação por modalidade, amostra mínima de cinco, retorno ao catálogo |
| G6 — Homologação real separada | **Parcial** | Cinco códigos de teste e oito votos de homologação; faltam stress real e auditoria completa |
| G7 — Testes da versão estável | **Aprovado** | 16 Vitest + verificação de concorrência simulada com 24 workers; CI/build |
| G8 — Acessibilidade futura | **Adiada** | Melhorias já desenvolvidas em `feat/universo-if-avalia-mvp`, sem incluir na release |
| G9 — Integração `main` | **Não realizada** | Preparar revisão e pedir aprovação explícita antes de fazer merge |

## Produção

- O frontend no [GitHub Pages](https://anaclaracunhasanthos-gif.github.io/aula12.11/) foi confirmado por teste manual em celular e notebook.
- O [Web App do Apps Script](https://script.google.com/macros/s/AKfycbz4LOGOx52e0ErthiXDlKXCmk0FsNLPCGYKmrBDS4L-hVAs6GjaVxAZylIdNf7EZs8lKw/exec) está em uso para formulários e ranking.
- A planilha oficial continua **privada**, acessível apenas a usuários autorizados; oito avaliações válidas na última consulta. Essa quantidade pode aumentar.
- A abertura de votação foi autorizada pela equipe **conforme informado pela responsável**. Nenhum ajuste de abertura/fechamento faz parte deste processo de organização do GitHub.

## Homologação

- Planilha e Apps Script de testes distintos da produção, com 5 códigos habilitados e 8 avaliações de teste.
- Validados em ambiente de homologação: voto aceito, duplicado bloqueado, código em outro projeto permitido, ranking após cinco votos, verificação de erros e configurações de abertura.
- A concorrência simulada já passou; **a simultaneidade rigorosa no Google real não foi comprovada**.
- Leitor de tela, contraste em todas as telas e foco foram **adiados** e não impedem documentar a versão atual com ressalvas.
- Revisão administrativa da versão efetivamente implantada no Apps Script ainda pendente.

## Controle de versões

- A release estável foi derivada do commit anterior às correções de acessibilidade (`5e6c8e4b6c52`), acrescentando **apenas documentação e teste de concorrência isolado**, sem alterar o frontend ou o backend que os participantes usam.
- O site oficial não foi atualizado por esta etapa. O fluxo Pages não publica automaticamente alterações ao preparar um PR para `main`.
- Antes de integrar a versão estável à `main`, consultar [Guia de release](GUIA_RELEASE_MAIN.md) e [Relatório consolidado](RELATORIO_HOMOLOGACAO_ETAPA.md).

**Não misturar dados de produção/homologação, não expor códigos ou recibos e não executar merge sem autorização expressa.**
