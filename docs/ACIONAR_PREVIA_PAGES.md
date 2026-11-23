# Publicação da primeira prévia no GitHub Pages

Solicitação explícita da equipe: visualizar o **frontend público** do Universo IF Avalia no GitHub Pages, **sem merge** da branch e **sem votação real**.

- Fonte do deploy: `feat/universo-if-avalia-mvp`.
- Compilação do React com `VITE_BASE_PATH=/aula12.11/`.
- Sem `VITE_GAS_APP_URL`; cadastro e códigos de voto não são enviados ou expostos.
- Somente a pasta estática `dist/` é enviada para o Pages.
- Não representa votação ou julgamento oficial do evento.
- Nenhum script ou planilha privada deve ser disponibilizado no site.

Este arquivo aciona **uma tentativa específica de publicação da prévia** via GitHub Actions. Se o Pages ainda não estiver habilitado, a equipe deve selecionar **Settings → Pages → Build and deployment → Source: GitHub Actions**. Depois poderá reexecutar o workflow manualmente, respeitando a autorização já concedida apenas para esta prévia.

Não efetuar merge nem ativar a votação do backend sem aprovação específica.

## Segunda prévia — formulário conectado (14/11/2026)

- A responsável solicitou iniciar a abertura da avaliação pública e informou a URL `/exec` do Apps Script.
- O build do catálogo agora inclui `VITE_GAS_APP_URL` (URL pública da aplicação, sem senhas).
- **A planilha continua com `votacao_aberta=false` durante o teste de navegação.** Nenhum código de avaliação foi emitido nem voto registrado por esta alteração.
- Antes da abertura efetiva, confirmar acesso público do Apps Script, emitir códigos de forma privada, verificar permissão institucional e executar QA de avaliação/recibo/duplicidade.
- Esta mudança não faz merge do pull request nem publica o conteúdo privado da planilha.

O presente commit aciona a atualização do GitHub Pages via workflow já configurado.


## Atualização autorizada do site público — 23/11/2026

- A responsável autorizou expressamente atualizar a prévia pública do site Universo IF Avalia.
- Publicar exclusivamente o frontend estático desta branch pelo workflow do GitHub Pages.
- A publicação **não** realiza merge na `main` e **não** publica planilhas, códigos de votação, hashes nem avaliações privadas.
- O frontend continua apontando ao endereço já público `/exec` do Google Apps Script, **não** ao endereço privado de homologação `/dev`.
- A planilha oficial foi conferida com `votacao_aberta = FALSE`: esta atualização não abre a votação.
- Os 16 testes automatizados da branch passaram no GitHub Actions (run 45107298182).
- As correções de navegação validadas em `/dev` pertencem ao Apps Script de homologação e não foram automaticamente implantadas no Apps Script de produção.
- Esta alteração na documentação aciona uma nova publicação via o gatilho explícito `push.paths` do workflow, sem mudar a lógica do aplicativo.
