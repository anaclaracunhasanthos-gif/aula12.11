# Status de execução — Universo IF Avalia

**Atualizado em 22/11/2026. Estado: implementação funcional com homologação final pendente.** Este documento substitui os registros parciais de 12 e 13/11 que indicavam ausência de implantação.

| Etapa | Estado | Evidência |
| --- | --- | --- |
| G0 — Repositório e revisão | **OK** | Branch `feat/universo-if-avalia-mvp`; [PR #1 em rascunho](https://github.com/anaclaracunhasanthos-gif/aula12.11/pull/1), sem merge na `main` |
| G1 — Catálogo | **OK** | 46 IDs únicos; 24 Nacional e 22 Extensão; catálogo validado no CI |
| G2 — Interface e build | **OK automatizado** | TypeScript, Vitest e build aprovados; frontend público no [GitHub Pages](https://anaclaracunhasanthos-gif.github.io/aula12.11/) |
| G3 — Planilha principal | **OK estrutural** | Abas existentes, 46 projetos, 10 códigos ativos, 20 desativados, 1 avaliação válida |
| G4 — Integração e votação | **PARCIAL** | Formulário oficial aberto em celular; 1 voto válido registrado; rejeição de código inválido confirmada. Duplicidade real e concorrência ainda pendentes |
| G5 — Publicação | **OK** | [Build + deploy Pages em 14/11/2026](https://github.com/anaclaracunhasanthos-gif/aula12.11/actions/runs/43631300598); não houve merge |
| G6 — Homologação de ponta a ponta | **PENDENTE** | Formulário de teste implantado, mas acesso ainda não confirmado; ranking com 5 votos, browsers/dispositivos, acessibilidade e carga pendentes |
| G7 — Testes automatizados atuais | **OK** | [14 testes aprovados em 22/11/2026](https://github.com/anaclaracunhasanthos-gif/aula12.11/actions/runs/45041566549), incluindo 4 testes isolados do backend |

## Estado atual das planilhas

**Produção** (dados privados; IDs e links não versionados):
- `Projetos`: 46 projetos, 24 da Mostra Nacional e 22 da Mostra de Extensão.
- `Codigos`: 10 hashes habilitados e 20 desabilitados.
- `Avaliacoes`: 1 avaliação válida, mantida sem alteração durante as verificações.
- `Configuracao`: **votação fechada no momento da consulta**. Não há autorização implícita para reabrir.

**Homologação separada**:
- Estrutura de 46 projetos replicada, sem votos de produção.
- Cinco códigos próprios de teste habilitados; **zero votos de teste** no instante da consulta.
- Configuração de teste permite submissões, condicionadas ao funcionamento do Web App de homologação.
- A responsável implantou a versão de teste no Apps Script, mas houve erro de acesso ao link; a operação do formulário publicado de homologação não está comprovada.

## O que já foi testado

1. O código do backend foi executado em ambiente isolado com Google Sheets fictício: primeiro voto válido, rejeição de duplicado, mesmo código em projeto diferente e retentativa idempotente.
2. O GitHub Actions aprovou **14 testes**, o typecheck, a validação do catálogo e o build.
3. A equipe abriu o formulário oficial em um celular e obteve a mensagem **"Código inválido ou desabilitado"** ao tentar um código fictício.
4. Uma avaliação real com recibo já tinha sido registrada antes e foi confirmada na planilha privada.

## O que ainda não está comprovado

- Duplicidade, idempotência e concorrência em **implantação Apps Script real** usando dados de homologação.
- Ranking com cinco votos válidos por projeto no Web App de homologação.
- Acesso autorizado e navegação no Web App de homologação; eventual teste sem login no app oficial.
- Teste abrangente em celulares diferentes, teclado, contraste, leitores de tela e mensagens de erro.
- Revisão final de segurança e aceite da equipe para uso institucional.

**Observação de publicação:** o Pages foi implantado em 14/11/2026 com o commit do workflow de então. Houve mudanças posteriores na branch, inclusive em arquivos HTML do Apps Script. Elas **não se tornam automaticamente** a versão em execução no Apps Script ou Pages.

**Controle de mudanças:** não efetuar merge na `main`, reabrir votação nem publicar uma nova versão por iniciativa própria. Registre evidências dos ensaios em [TESTES_E_QA.md](TESTES_E_QA.md). Preserve os dados privados fora do repositório.
