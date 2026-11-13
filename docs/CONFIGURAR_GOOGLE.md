# Configurar Google Sheets e Apps Script — Universo IF Avalia

## Planilha criada

A planilha privada **Universo IF Avalia — Base de avaliações (privada) — 2026** já existe na conta conectada. Contém:
- `Projetos`: 46 projetos (24 Mostra Nacional, 22 Mostra de Extensão), título, área, data, horários, local, fontes documentais.
- `Codigos`: somente cabeçalho; nenhum código válido foi emitido.
- `Avaliacoes`: somente cabeçalho; nenhum voto real foi gravado.
- `Configuracao`: `votacao_aberta=false`, `minimo_ranking=5`, datas inicialmente vazias.

**A planilha é privada** e não deve ser compartilhada publicamente. O ID dela e tokens de votação não ficam no GitHub.

## Conexão ao Apps Script — execução pelo proprietário

A conexão do Drive não concede automaticamente permissão para criar, configurar ou publicar projetos Google Apps Script. Ainda é necessário:

1. Abra a planilha privada no Google Sheets da sua conta.
2. Acesse **Extensões → Apps Script**. Isso criará um projeto vinculado à planilha.
3. Copie `backend/Code.gs` no editor Apps Script e crie os arquivos HTML `Client`, `Home`, `Ranking`, `Styles` e `Vote`, usando o código de mesmo nome da branch do GitHub.
4. Vá a **Configurações do projeto → Propriedades do script** e crie `SPREADSHEET_ID` com o ID da planilha privada. Não coloque esse identificador nem credenciais na branch pública.
5. Execute `verificarIntegridadePlanilha_()` pelo editor **apenas se o editor permitir selecionar funções internas com sufixo `_`**; caso não apareçam no seletor, crie temporariamente uma função de teste `function verificarInstalacao(){ return verificarIntegridadePlanilha_(); }` e remova-a antes da publicação. Os dados esperados são `{ok:true,projetos:46,nacional:24,extensao:22,votacao_aberta:'false'}`.
6. `setupPlanilha_()` agora é **não destrutiva**; a planilha já está preenchida e normalmente não precisa dessa rotina. Ela preserva códigos, avaliações e projetos existentes.
7. A implantação do Apps Script como **App da Web** e seu acesso anônimo exigem aprovação e conferência da política da instituição. Antes de expor o aplicativo, não habilite votos reais.
8. Depois de implantado com autorização, obtenha a URL `/exec`, configure no repositório a variável GitHub Actions `VITE_GAS_APP_URL` e gere novo build de Pages. A aplicação React direcionará para formulários HTML Service/Google Script Run (não usa `no-cors`).
9. Em um período de homologação autorizado, emita códigos exclusivamente pelo editor com `emitirCodigosExportacao_(qtd)`; mantenha-os privados. Abra `votacao_aberta=true` apenas durante o ensaio autorizado, envie uma avaliação com 4 notas, confira recibo, faça a leitura da linha em `Avaliacoes` e tente o mesmo código no mesmo projeto novamente. Após o ensaio, feche a votação e documente os resultados.
10. Teste smartphone real, browser sem login, ranking com amostra mínima e casos de erro/duplicidade/concorrência. **Não declare a homologação concluída sem evidências reais.**

## Limitações e segurança

- Acesso ao Drive/Sheets não dá acesso de escrita ao serviço Apps Script; portanto **o backend ainda não foi implantado nem conectado por URL**.
- O arquivo `Code.gs` verifica autorização do código no servidor, recalcula a nota, usa `LockService`, retorna recibo após `SpreadsheetApp.flush()` e readback.
- A rotina de configuração foi corrigida para não apagar dados existentes. ID de requisição repetido com notas diferentes é rejeitado.
- Códigos são tratados como credenciais, armazenados apenas por SHA-256 e nunca enviados para GitHub.
- O token não autentica identidade pessoal e não deve ser publicado em URL ou log.
