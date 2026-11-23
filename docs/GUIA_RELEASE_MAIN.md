# Guia de organização da `main` e release estável

**Atualização: 23/11/2026.** Preparação de versão estável **sem mudanças no site publicado**.

## Visão geral

| Referência | Finalidade | Estado |
| --- | --- | --- |
| `main` | Código principal após revisão e autorização de merge | Contém somente `README.md` no início desta etapa; **não foi alterada** |
| `release/universo-if-avalia-v1-estavel` | Candidata à primeira integração estável, mantendo a interface atual | Branch criada a partir da versão anterior às melhorias de acessibilidade e com documentação atualizada |
| `feat/universo-if-avalia-mvp` | Desenvolvimento e melhorias futuras, incluindo acessibilidade | PR #1 permanece em rascunho; **não usar para publicar as melhorias agora** |
| GitHub Pages | Site público atualmente em uso | Mantido sem nova publicação por esta organização |
| Apps Script oficial | Formulário e ranking publicados | Atualizações exigem procedimento separado no editor do Google |
| Google Sheets oficial | Votos e códigos privados | **Não modificar em operações de Git** |

## O que entra na versão estável

- Catálogo React/Vite/TypeScript com 46 projetos e navegação publicada.
- Backend do Apps Script e HTML com os links de retorno ao catálogo corrigidos.
- Regras de voto, idempotência, ranking por modalidade e mínimo de cinco avaliações.
- Testes existentes (**16 Vitest**) e um ensaio **isolado** de concorrência usando `Code.gs` e workers simulados.
- Documentação atualizada do estado atual, requisitos, privacidade, publicação e homologação parcial.

**O que NÃO entra:** alterações posteriores de contraste, `fieldset/legend`, avisos de leitores de tela, botões e verificações de acessibilidade da branch de desenvolvimento. Elas ficam para versão futura após validação específica.

## Checklist para a revisão

- [x] Preparar branch estável baseada no último código anterior à acessibilidade.
- [x] Documentar o estado atual do projeto e as evidências de homologação parcial.
- [x] Manter valores privados fora do repositório.
- [x] Incluir teste simulado de concorrência sem gravar dados reais.
- [ ] Conferir pipeline da versão estável (**CI, build e teste de concorrência**) no Pull Request.
- [ ] Fazer revisão por pessoa autorizada.
- [ ] Verificar a identidade entre a revisão planejada e a implantação oficial do Apps Script (sem publicar automaticamente).
- [ ] Autorizar explicitamente eventual merge para `main`; caso aprovado, registrar o SHA exato da integração.
- [ ] Após merge, conferir a `main` e considerar proteger a branch com revisão obrigatória/checagens de CI (configuração depende de permissão administrativa).
- [ ] Publicar site ou Apps Script apenas com autorização específica e testes de regressão. **Merge no Git não deve abrir/fechar votação e não deve enviar votos.**

## Fluxo seguro proposto

1. Revisar o Pull Request da branch `release/universo-if-avalia-v1-estavel` **para `main`**, mantendo o PR #1 de desenvolvimento separado.
2. Confirmar que a PR está aprovada e a CI passou; ler os arquivos alterados.
3. Solicitar aprovação explícita para o merge. Não executar merge por inferência de pedidos de “organização” ou “documentação”.
4. Depois da aprovação, integrar uma versão estável à `main`, sem disparar implantação do Google Apps Script.
5. Decidir em etapa posterior se a fonte da publicação do Pages deve migrar para a `main`. **O workflow atual não foi reconfigurado para publicação automática ao receber um merge.**
6. Manter as melhorias de acessibilidade na branch de desenvolvimento para uma release futura.

## Sobre o site publicado

- URL pública: https://anaclaracunhasanthos-gif.github.io/aula12.11/
- Web App publicado: https://script.google.com/macros/s/AKfycbz4LOGOx52e0ErthiXDlKXCmk0FsNLPCGYKmrBDS4L-hVAs6GjaVxAZylIdNf7EZs8lKw/exec
- O GitHub Pages compila o frontend; o Apps Script e a planilha **não** mudam por commits em `main`.
- A votação oficial já está aberta e recebendo avaliações; não efetuar testes com códigos artificiais na produção.

## Evidências e limites

Consultar [Relatório Final da Etapa de Homologação](RELATORIO_HOMOLOGACAO_ETAPA.md), [Testes e QA](TESTES_E_QA.md), [Status](STATUS_EXECUCAO.md) e [Publicação](REGISTRO_PUBLICACAO.md).

**Status de homologação:** parcial, com ressalvas. Concorrência real no Google, revisão manual de acessibilidade e revisão integral de configuração do Apps Script ainda estão pendentes.
