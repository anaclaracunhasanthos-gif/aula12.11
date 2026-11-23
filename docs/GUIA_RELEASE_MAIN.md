# Guia de organização da `main` e release estável

**Atualização: 23/11/2026.** Versão estável integrada à `main` após autorização da responsável, **sem mudanças no site publicado**.

## Visão geral

| Referência | Finalidade | Estado |
| --- | --- | --- |
| `main` | Código principal estável | Código integrado pelo [PR #2](https://github.com/anaclaracunhasanthos-gif/aula12.11/pull/2), commit `63ebd68de537` |
| `release/universo-if-avalia-v1-estavel` | Referência histórica da candidata estável | Integrada à `main` em 23/11/2026, sem melhorias futuras de acessibilidade |
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
- [x] Conferir pipeline da versão estável (**16 Vitest, build e simulação de concorrência**): [CI aprovada](https://github.com/anaclaracunhasanthos-gif/aula12.11/actions/runs/45213083103).
- [x] Versão estável validada por testes e integração expressamente autorizada pela responsável.
- [ ] Verificar a identidade entre a revisão planejada e a implantação oficial do Apps Script (sem publicar automaticamente).
- [x] Merge autorizado e registrado: PR #2, commit de integração `63ebd68de537`.
- [x] Conferir que a `main` contém a aplicação, os testes e a documentação. [ ] Avaliar proteção da branch com revisão/CI (depende de acesso administrativo).
- [ ] Publicar site ou Apps Script apenas com autorização específica e testes de regressão. **Merge no Git não deve abrir/fechar votação e não deve enviar votos.**

## Fluxo seguro proposto

1. **Concluído:** [PR #2](https://github.com/anaclaracunhasanthos-gif/aula12.11/pull/2) integrado à `main`; o PR #1 continua para acessibilidade futura.
2. **Concluído:** CI aprovada e diff da versão estável verificado antes da integração.
3. **Concluído:** a responsável autorizou expressamente o merge e ele foi executado.
4. **Concluído:** a versão estável foi integrada à `main`, sem implantação do Apps Script.
5. **Futuro:** decidir, com autorização específica, se o Pages deve usar a `main`. **O workflow atual não publica automaticamente ao receber um merge.**
6. Manter as melhorias de acessibilidade na branch de desenvolvimento para uma release futura.

## Sobre o site publicado

- URL pública: https://anaclaracunhasanthos-gif.github.io/aula12.11/
- Web App publicado: https://script.google.com/macros/s/AKfycbz4LOGOx52e0ErthiXDlKXCmk0FsNLPCGYKmrBDS4L-hVAs6GjaVxAZylIdNf7EZs8lKw/exec
- O GitHub Pages compila o frontend; o Apps Script e a planilha **não** mudam por commits em `main`.
- A votação oficial já está aberta e recebendo avaliações; não efetuar testes com códigos artificiais na produção.

## Evidências e limites

Consultar [Relatório Final da Etapa de Homologação](RELATORIO_HOMOLOGACAO_ETAPA.md), [Testes e QA](TESTES_E_QA.md), [Status](STATUS_EXECUCAO.md) e [Publicação](REGISTRO_PUBLICACAO.md).

**Status de homologação:** parcial, com ressalvas. Concorrência real no Google, revisão manual de acessibilidade e revisão integral de configuração do Apps Script ainda estão pendentes.
