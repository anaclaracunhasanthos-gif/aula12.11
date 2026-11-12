# Configurar Google Sheets e Apps Script

1. Na conta institucional/equipe, crie uma planilha privada chamada `Universo IF Avalia`.
2. Crie um projeto em https://script.google.com e copie `backend/Code.gs`, `Vote.html`, `Ranking.html`, `Home.html`, `Styles.html` e `Client.html` para arquivos com os mesmos nomes.
3. Em **Configurações do projeto → Propriedades do script**, defina `SPREADSHEET_ID` com o ID da planilha.
4. Para carregar os 46 projetos, publique o JSON versionado em uma URL raw pública do repositório depois da aprovação, defina `CATALOGO_JSON_URL` e execute `setupPlanilha_()` uma vez. Alternativa: colar manualmente os registros na aba Projetos.
5. Execute `setupPlanilha_()` e autorize acesso à planilha. Ela cria `Projetos`, `Codigos`, `Avaliacoes` e `Configuracao`.
6. Execute `emitirCodigosExportacao_(qtd)` em lotes pequenos. Copie o retorno para um meio seguro e distribua individualmente; o texto puro não é gravado na planilha. Não cole códigos no GitHub, em URLs ou logs.
7. Na aba Configuracao, altere `votacao_aberta` para `true` somente após aprovação.
8. **Implantar → Nova implantação → App da Web**; executar como proprietário. Só selecione acesso anônimo se a política institucional permitir. Se não permitir, mantenha `BLOQUEADO_ACESSO_PUBLICO`; não contorne a política.
9. Copie a URL `/exec` para `VITE_GAS_APP_URL` antes do build do Pages. O catálogo React direciona a avaliação e ranking para as telas HTML Service, que usam `google.script.run` e não dependem de CORS do navegador.
10. Para teste real, solicite autorização da equipe antes de abrir votação e gravar voto de teste. Confira recibo e linha correspondente em `Avaliacoes`, depois tente repetir o mesmo par código/projeto.

## Segurança e operação
- Planilha privada; nunca compartilhe as abas Codigos/Avaliacoes.
- `Codigos` contém SHA-256 do token e estado habilitado. `Avaliacoes` não contém token puro, nome, e-mail, IP ou MAC.
- O LockService protege a seção crítica. A chave idempotente `id_requisicao` evita duplicar retentativas; a unicidade de negócio é `(hash_codigo,id_projeto)`.
- `doGet?action=ranking` expõe somente agregados; prefira a tela HTML Service, que usa chamada servidor-a-servidor. Considere cache/limitação de taxa antes de escala pública.
- O token é ao portador, não prova identidade. A distribuição supervisionada é responsabilidade dos organizadores.
- O `setupPlanilha_()` limpa as quatro abas ao inicializar: execute apenas em planilha nova/vazia.


**Proteção administrativa:** funções terminadas em `_` não são invocáveis por `google.script.run` do navegador. Os comandos de instalação e emissão de códigos devem ser executados SOMENTE no editor Apps Script pelo proprietário. Não exponha essas ações como funções públicas.
