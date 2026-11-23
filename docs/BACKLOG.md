# Backlog e pendências — Universo IF Avalia

**Atualizado em 23/11/2026.** Prioridade: preservar a votação oficial e a interface atual. Melhorias de acessibilidade ficam para uma versão futura.

| ID | Atividade | Status |
| --- | --- | --- |
| S1 | Catálogo 46 projetos, filtros, detalhes, mobile e navegação | **Concluído / publicado** |
| S2 | Votação, pesos, códigos por hash, recibo, duplicidade e idempotência | **Implementado; votos reais registrados** |
| S3 | Ranking por modalidade, amostra mínima e médias | **Implementado / homologado em ambiente separado** |
| S4 | Google Sheets privado e Google Apps Script oficial | **Configurados / votação aberta** |
| S5 | Ambiente separado com testes de duplicidade, regras, ranking e erros | **Oito votos de homologação; fluxos principais aprovados** |
| S6 | Testes Vitest, TypeScript, catálogo e build | **16 testes estáveis aprovados; 21 na branch futura** |
| S7 | Concorrência simulada com 24 workers no `Code.gs` | **Aprovado; sem votos de produção** |
| S8 | Concorrência rigorosa no serviço real Apps Script | **Pendente; fazer apenas em homologação** |
| S9 | Auditoria integral de configuração administrativa do Apps Script | **Pendente; verificar implantação/propriedades e funções internas** |
| S10 | Acessibilidade: contraste, leitores de tela, áreas de toque, zoom | **Adiada por decisão da responsável; código preparado na branch de desenvolvimento** |
| S11 | Relatório e documentação do estágio atual | **Atualizados na branch estável** |
| S12 | Pull Request estável e integração na `main` | **Revisão pendente; merge exige autorização específica** |
| S13 | Proteção da `main` e revisão obrigatória | **Depende de permissão administrativa no GitHub** |
| S14 | Monitoramento de votos oficiais durante operação | **Contínuo; sem publicar informações privadas** |

## Ordem sugerida

1. Revisar a branch `release/universo-if-avalia-v1-estavel` e aguardar CI.
2. Confirmar revisão técnica e aprovar separadamente um eventual merge para `main`.
3. Conferir versão e propriedades do Apps Script publicado sem alterar votos.
4. Monitorar operação. Fazer ensaio de concorrência real **em homologação**, quando viável.
5. Programar melhorias de acessibilidade e auditoria manual para uma atualização futura, com publicação controlada.

**Condição de entrega:** documentação final da etapa concluída; **homologação geral permanece parcial, com ressalvas**. Não afirmar 100% de aprovação.

Consultar [Relatório de homologação](RELATORIO_HOMOLOGACAO_ETAPA.md) e [Guia de release](GUIA_RELEASE_MAIN.md).
