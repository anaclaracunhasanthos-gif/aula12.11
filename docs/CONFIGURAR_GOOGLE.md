# Configuração do Google Sheets e Google Apps Script

**Atualizado em 22/11/2026.** A integração com o Apps Script já foi realizada. Este documento descreve a configuração existente e os cuidados para novas implantações, **sem divulgar dados privados**.

## Arquitetura

- **GitHub Pages:** catálogo React/Vite/TypeScript público; link no [README](../README.md).
- **Google Apps Script:** recebe avaliações, valida os códigos e calcula o ranking; arquivos-fonte versionados em `backend/`.
- **Google Sheets:** base **privada**, com as abas `Projetos`, `Codigos`, `Avaliacoes` e `Configuracao`.

O repositório contém **o código-fonte**, não o acesso de edição ao projeto do Apps Script da conta Google. É necessário implantar alterações no editor do Google.

## Situação observada na base principal

| Item | Estado na consulta de 22/11/2026 |
| --- | --- |
| Projetos | 46, sendo 24 Mostra Nacional e 22 Mostra de Extensão |
| Códigos | 10 habilitados, 20 desativados; somente hashes na planilha |
| Avaliações | 1 linha válida confirmada |
| Mínimo do ranking | 5 votos válidos por projeto |
| Votação | **Fechada**: o valor observado não corresponde à string `true` exigida pelo backend |

O formulário publicado foi aberto em dispositivo móvel pela equipe; houve confirmação de voto válido e rejeição de código inválido. **Isso não comprova** ainda bloqueio de duplicidade e concorrência diretamente no servidor público. Não mudar o estado da votação sem autorização de quem coordena o evento.

## Ambiente separado de homologação

Há uma **segunda planilha privada**, com 46 projetos, cinco códigos exclusivos de teste e **nenhum voto de teste** até a consulta de 22/11/2026. A configuração dessa segunda planilha permite votação de teste. Um **segundo projeto Apps Script** foi montado e implantado pela responsável, mas o formulário de homologação apresentou dificuldade de acesso no navegador. Sua implantação e permissões ainda precisam ser validadas antes dos ensaios reais.

**Nunca usar códigos da homologação no site oficial, nem dados reais dos participantes na planilha de teste.** Os identificadores e os códigos estão disponíveis somente para a equipe autorizada fora do GitHub.

## Como configurar ou conferir uma implantação

1. Em um projeto Apps Script separado, adicionar `backend/Code.gs` como arquivo de script e criar os HTML `Client`, `Home`, `Ranking`, `Styles` e `Vote` com o conteúdo versionado no GitHub.
2. Abrir **Configurações do projeto → Propriedades do script** e configurar `SPREADSHEET_ID` com o ID da **planilha daquele ambiente**, nunca misturando produção e homologação. Não escrever esse ID no GitHub.
3. Confirmar a existência das quatro abas com os cabeçalhos esperados. A função `verificarIntegridadePlanilha_()` valida estrutura e 46=24+22; por terminar em `_`, pode não aparecer na seleção de execução direta. Se necessário, um wrapper administrativo temporário deve ser removido antes de implantar.
4. `setupPlanilha_()` preserva abas já preenchidas, mas **não deve ser executada sem necessidade**. Não limpar ou recriar a base oficial para realizar testes.
5. Usar **Implantar → Nova implantação → App da Web** ou **Gerenciar implantações → Nova versão**. Definir quem executa e quem pode acessar segundo o ambiente e as permissões institucionais. Para homologação privada, conferir a conta autorizada. Para acesso público, a revisão de segurança e autorização da equipe são obrigatórias.
6. No frontend, o workflow `.github/workflows/pages.yml` define `VITE_GAS_APP_URL`, apontando ao **Web App público** de produção. Sua atualização exige um novo build/deploy aprovado do Pages. **Não apontar esse build público para o ambiente de homologação.**

Uma nova versão no GitHub **não** atualiza automaticamente o código já implantado no Apps Script.

## Regras e cuidados de segurança

- `registrarAvaliacao` rejeita votação fechada, código inválido/desabilitado, projeto inexistente, notas incorretas e repetição de um par código/projeto.
- O servidor usa SHA-256 para validar o código, `LockService` para serializar gravações, recibo e releitura da linha gravada.
- Uma requisição idêntica repetida retorna `ja_processada` sem registrar novo voto; o mesmo ID com dados diferentes é rejeitado.
- Funções administrativas temporárias **não devem ficar expostas** no Web App. Funções com sufixo `_` não são chamadas diretamente pelo `google.script.run`; revisar também as funções públicas auxiliares antes do uso institucional.
- Não colocar tokens em URLs, logs, README, issues, capturas públicas ou planilhas compartilhadas.
- Manter a planilha principal privada; acesso do professor ao GitHub **não concede** acesso aos dados de votação.

## Homologação pendente

Antes de declarar o sistema totalmente homologado, confirmar **no Web App de testes**: envio com código válido e recibo, rejeição do segundo voto do mesmo código/projeto, aceitação em projeto diferente, ranking com cinco avaliações, acesso e desempenho em celulares reais, acessibilidade e concorrência. Registre resultados em [TESTES_E_QA.md](TESTES_E_QA.md).
