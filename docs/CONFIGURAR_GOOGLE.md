# Configuração e segurança do Google Sheets e Apps Script

**Atualizado em 23/11/2026.** As instruções são operacionais, não incluem valores privados e **não autorizam alterações na base de produção por conta própria**.

## Arquitetura

- Frontend público React/Vite/TypeScript no GitHub Pages com o catálogo de 46 projetos.
- Google Apps Script serve o formulário e o ranking; código-fonte em `backend/` e implantação real no projeto Google de titularidade da equipe.
- Google Sheets **privado**, abas `Projetos`, `Codigos`, `Avaliacoes`, `Configuracao`.
- `SPREADSHEET_ID` é propriedade privada do projeto Apps Script; não inserir o ID no repositório, no frontend ou em documentos públicos.
- O frontend usa a variável **pública** `VITE_GAS_APP_URL` apenas para apontar ao endereço `/exec` do Web App.

## Estado consultado em 23/11/2026

| Indicador | Base oficial | Homologação separada |
| --- | ---: | ---: |
| Projetos | 46 | 46 |
| Hashes | 80 | 5 |
| Códigos habilitados | 60 | 5 |
| Avaliações válidas | 8 | 8 |
| Configuração `votacao_aberta` | TRUE | TRUE |

Na base oficial há outros **20 códigos desabilitados**. Somente usuários identificados com papel proprietário/editor possuem acesso direto à planilha oficial. A contagem de avaliações poderá aumentar, pois a votação está aberta.

## Operação normal

- O participante abre o catálogo no Pages e escolhe um projeto.
- O Web App valida o código com hash SHA-256 e verifica abertura de votação, projeto, notas, recibo e duplicidade.
- `LockService` protege a sequência leitura–checagem–gravação. As avaliações armazenam hash, projeto, quatro notas, média, data e estado.
- O ranking calcula a média após cinco votos válidos em cada projeto; modalidades permanecem separadas.
- O aplicativo é público para participação sem login, **sem conceder acesso direto à planilha**.

## Conferir configurações sem alterar a votação

1. No editor do **Apps Script oficial**, conferir a implantação `/exec` e a versão publicada.
2. Em **Implantar → Gerenciar implantações**, conferir `Executar como: Eu` e `Quem pode acessar: Qualquer pessoa`, conforme autorizado pela organização.
3. Conferir **Configurações do projeto → Propriedades do script**, garantindo que `SPREADSHEET_ID` aponta à **base oficial**, sem copiar o identificador para mensagens, código ou documentação.
4. Confirmar que funções administrativas de setup/emissão não foram expostas por wrappers temporários. Rotinas terminadas em `_` não são chamadas diretamente por `google.script.run`.
5. Verificar recibos e ausência de duplicações sem gerar votos falsos. Usar exclusivamente a planilha de homologação para ensaios de stress.
6. Registrar alterações de implantação (data, motivo e versão) e solicitar autorização específica para publicar uma nova versão.

**Importante:** uma mudança no GitHub não implanta o Apps Script. Fazer merge não altera a planilha, mas uma nova publicação do frontend pode modificar a interface. Evitar atualizações durante a votação sem um plano de validação e autorização.

## Preparação de testes e revisão

- Não executar `setupPlanilha_()` em produção sem necessidade; não apagar, reordenar ou regravar abas com votos.
- Reenvio da mesma requisição usa lógica de idempotência; par código/projeto duplicado é rejeitado.
- Para concorrência: teste de simulação em `scripts/testar_concorrencia_simulada.mjs` e, quando possível, ensaio de múltiplas sessões **somente** na implantação de homologação.
- Não publicar planilhas privadas, documentos de distribuição de códigos, dados pessoais, hashes individuais ou recibos.
- A futura auditoria de acessibilidade foi adiada; a versão estável mantém a interface atualmente em operação.

Links: [Status](STATUS_EXECUCAO.md), [QA](TESTES_E_QA.md), [Guia de release](GUIA_RELEASE_MAIN.md).
