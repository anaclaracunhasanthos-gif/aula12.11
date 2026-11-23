# Testes e homologação — Universo IF Avalia

**Atualização: 23/11/2026.** Situação geral: **versão de desenvolvimento aprovada nos testes automáticos; homologação real ainda parcial**.

## Evidências verificadas

| Item | Resultado | Evidência e alcance |
| --- | --- | --- |
| Catálogo com 46 projetos, sendo 24 nacionais e 22 de extensão | **PASS** | Validação de catálogo no CI |
| TypeScript e compilação de produção | **PASS** | GitHub Actions, commit de desenvolvimento |
| Testes de catálogo, avaliações, ranking e backend | **PASS** | 16 testes Vitest existentes |
| Regressões estáticas de acessibilidade | **PASS** | Cinco testes novos de contraste, semântica de notas, avisos e navegação |
| **Total de testes Vitest** | **21 PASS** | [Execução de 23/11](https://github.com/anaclaracunhasanthos-gif/aula12.11/actions/runs/45207264557) |
| Concorrência simulada usando o próprio `Code.gs` | **PASS limitado** | 2 rodadas, 24 workers concorrentes, 2 aceitações (uma por rodada), 22 duplicações rejeitadas |
| Site abrindo em celular físico e notebook | **CONFIRMADO pela equipe** | Relato de testes manuais; não é auditoria entre navegadores |
| Navegação entre formulário/ranking e catálogo com 46 projetos | **CONFIRMADO pela equipe** | Versão oficial em janela anônima |
| Votação oficial recebendo e gravando dados | **CONFIRMADO** | Planilha oficial consultada em 23/11: pelo menos 7 votos `VALIDA` na consulta; contagem pode crescer |
| Validação das médias e integridade dos recibos | **PASS na amostra observada** | Sem duplicidade de par código/projeto nos 7 registros consultados |
| Acesso à planilha oficial | **RESTRITO** | Permissões da planilha consultadas: usuário proprietário e usuário editor |
| Navegação com leitor de tela real e zoom em todas as telas | **PENDENTE** | Testes estáticos não substituem leitor de tela |
| Concorrência simultânea no Google Apps Script real | **PENDENTE** | O simulador não executa o serviço hospedado no Google |
| Auditoria completa do projeto Google Apps Script publicado | **PARCIAL** | Código-fonte revisado; versão implantada deve ser conferida separadamente |

## Escopo das correções de acessibilidade (apenas desenvolvimento)

- Cores de textos pequenos ajustadas para melhorar contraste; testes estáticos verificam razão mínima de 4,5:1 em seletores relevantes.
- Formulário usa `fieldset` e `legend` para identificar cada um dos quatro critérios e suas cinco opções.
- Opções de nota receberam áreas de toque de pelo menos 44 por 44 pixels.
- Resultados e mensagens do formulário e ranking receberam avisos acessíveis (`role=status`/`aria-live`).
- Navegação do catálogo indica a página selecionada (`aria-current`) e a modalidade selecionada (`aria-pressed`).
- Testes automatizados novos cobrem regressões dessas propriedades, **não substituindo auditoria visual, leitor de tela ou avaliação WCAG completa**.

Arquivos alterados no branch `feat/universo-if-avalia-mvp`; não houve publicação automática de novas alterações no site oficial nem implantação do Apps Script oficial.

## Teste de concorrência simulada: o que foi comprovado

O script `scripts/testar_concorrencia_simulada.mjs` executa o código de produção `backend/Code.gs` dentro de vários `worker_threads`, usando implementações simuladas de `SpreadsheetApp`, `PropertiesService`, `Utilities` e `LockService`.

- São realizadas duas rodadas com 12 solicitações concorrentes por rodada, usando o **mesmo código fictício e o mesmo projeto de teste**.
- Em cada rodada, exatamente um voto é aceito e 11 são rejeitados como duplicados.
- A verificação confirma que o lock é liberado em todos os casos e que a contagem final fica em um voto por rodada.
- Nenhuma chamada é enviada ao Google Apps Script real. Nenhuma planilha, token ou voto real é usado ou modificado.
- O ensaio cobre proteção sob concorrência simulada, **mas não testa os limites, tempos, quotas ou comportamento do serviço real Google Apps Script**.

## Etapas restantes para homologação integral

1. **Concorrência real em homologação separada:** executar tentativas simultâneas com códigos exclusivos de teste, coordenadas em navegadores/instâncias separadas e comparar os recibos e registros da planilha de homologação. Nunca utilizar a produção para produzir votos artificiais.
2. **Acessibilidade manual:** conferir navegação só com teclado, leitor de tela Android/TalkBack e, se possível, NVDA/VoiceOver; ampliar a página para 200% e 400%, além de testar larguras estreitas. Conferir mensagens de confirmação e erro, ordem de foco e rótulos das notas.
3. **Auditoria da implantação Google Apps Script:** conferir que o código implantado corresponde à revisão aprovada, que as propriedades de script apontam somente à planilha oficial e que as funções administrativas que emitem códigos não ficam acessíveis aos participantes.
4. **Publicação controlada:** depois de aprovado, implantar os HTMLs atualizados do Apps Script em uma **nova versão**, e atualizar o GitHub Pages apenas mediante autorização explícita, preservando todos os votos e códigos existentes.
5. **Monitoramento pós-publicação:** conferir novamente o formulário, ranking, retorno ao catálogo, recibos e planilha, sem registros fictícios.

## Cuidados

- A planilha oficial está recebendo avaliações: não limpar a aba `Avaliacoes`, não alterar códigos de participantes e não executar `setupPlanilha_` sem necessidade.
- Alterações em `backend/` no GitHub **não** atualizam automaticamente o Apps Script já implantado.
- Não publicar o documento privado dos códigos, hashes, IDs de planilhas ou qualquer dado sensível no repositório.
- O resultado atual justifica **apresentar os testes automáticos e a homologação parcial**, não afirmar uma auditoria completa de segurança/acessibilidade nem concorrência real já testada.
