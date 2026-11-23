# Testes e QA — Universo IF Avalia

**Atualizado em 23/11/2026.** Homologação **parcial, com ressalvas**. Esta documentação se refere à versão estável **sem as futuras alterações de acessibilidade**.

## Resumo dos testes

| Teste | Resultado | Evidência |
| --- | --- | --- |
| Catálogo 46 projetos (24 + 22) | **PASS** | Validação de estrutura no CI |
| Testes de notas, filtros, ranking e regras | **PASS** | 10 testes Vitest do frontend/domínio |
| Testes isolados do backend `Code.gs` | **PASS** | 6 testes Vitest com planilha em memória |
| Total automatizado da versão estável | **16 PASS** | Vitest, TypeScript, validação e build |
| Concorrência com workers simulados (24 tentativas) | **PASS limitado** | 2 rodadas, 2 votos aceitos (1 por rodada) e 22 duplicatas rejeitadas |
| Navegação catálogo → voto → catálogo e catálogo → ranking → catálogo | **PASS manual** | Responsável confirmou na implantação oficial |
| Site em celular físico e notebook | **PASS manual** | Responsável confirmou |
| Votos reais e recibos únicos na produção | **PASS na amostra** | 8 avaliações oficiais `VALIDA` observadas em 23/11 |
| Formulário, códigos e ranking na homologação | **PASS manual** | 8 avaliações na base separada, incluindo amostra de 5 |
| Propriedades internas e revisão independente da implantação oficial | **PARCIAL** | Fonte revisada; implantação administrativa não auditada integralmente |
| Concorrência rigorosa simultânea no Apps Script real | **PENDENTE** | Simulação não cobre serviços Google reais |
| Acessibilidade manual em leitor de tela, teclado e zoom | **ADIADA** | Responsável optou por manter interface estável |

## Concorrência isolada, sem votos reais

`node scripts/testar_concorrencia_simulada.mjs` executa o `backend/Code.gs` com `worker_threads` e serviços Google simulados. Em duas rodadas independentes de 12 pedidos praticamente simultâneos para o mesmo código fictício e mesmo projeto, somente um é aceito em cada rodada. Os demais 22 são rejeitados; locks simulados são liberados. **Não é teste do servidor Google**. Não altera planilhas nem usa tokens oficiais.

## Homologação manual já observada

Na planilha separada foram registrados oito votos de teste, com recibos distintos e sem par código/projeto duplicado. Foram verificados: aceitar um voto válido, rejeitar tentativa duplicada, aceitar o mesmo código em projeto distinto, rejeitar código inválido, respeitar abertura e fechamento da votação e só publicar posição no ranking após cinco avaliações.

Na produção, a última leitura encontrou **oito votos válidos e oito pares distintos de código/projeto**. A responsável confirmou acesso em celular físico e notebook, formulário e ranking, retorno ao catálogo, e informou autorização da equipe para a votação. Isso não comprova todas as situações de stress.

## Códigos, privacidade e ambientes

Produção: 80 hashes, sendo 60 habilitados e 20 desabilitados; votação aberta na consulta de 23/11. Homologação: 5 hashes próprios e 8 votos de teste. **Não misturar códigos ou avaliações entre ambientes**, não divulgar os tokens e não gerar votos fictícios em produção.

## Pendências e decisão

1. Concorrência real e carga em Web App de homologação, sem afetar o site oficial.
2. Revisão integral da configuração, permissões e versão publicada do Apps Script.
3. Acessibilidade manual e melhorias de contraste, semântica e área de toque: **adiadas para outra versão**. A branch `feat/universo-if-avalia-mvp` já tem melhorias e cinco testes estáticos adicionais; essa versão obteve 21 testes Vitest [aprovados no CI](https://github.com/anaclaracunhasanthos-gif/aula12.11/actions/runs/45207752211), **mas não será integrada à release estável agora**.
4. Revisão e aprovação de PR separado antes de merge na `main`.

Referências: [Relatório consolidado](RELATORIO_HOMOLOGACAO_ETAPA.md), [Status](STATUS_EXECUCAO.md), [Guia de release](GUIA_RELEASE_MAIN.md).

**Não declarar homologação 100% concluída.** A versão atual pode permanecer em operação educativa controlada sob acompanhamento da equipe.
