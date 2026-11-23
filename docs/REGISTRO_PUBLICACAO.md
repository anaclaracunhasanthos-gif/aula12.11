# Registro de publicação — Universo IF Avalia

**Atualização: 23/11/2026.** Versão estável integrada à `main` após autorização, **sem nova publicação do site**.

## URLs públicas atuais

- [Catálogo Web/Mobile no GitHub Pages](https://anaclaracunhasanthos-gif.github.io/aula12.11/)
- [Web App de formulários e ranking](https://script.google.com/macros/s/AKfycbz4LOGOx52e0ErthiXDlKXCmk0FsNLPCGYKmrBDS4L-hVAs6GjaVxAZylIdNf7EZs8lKw/exec)
- [Repositório do projeto](https://github.com/anaclaracunhasanthos-gif/aula12.11)
- [Versão estável preparada](https://github.com/anaclaracunhasanthos-gif/aula12.11/tree/release/universo-if-avalia-v1-estavel)
- [Versão futura em desenvolvimento](https://github.com/anaclaracunhasanthos-gif/aula12.11/tree/feat/universo-if-avalia-mvp)

## Linha do tempo

1. **12/11/2026:** primeira prévia do catálogo frontend no GitHub Pages; [execução histórica](https://github.com/anaclaracunhasanthos-gif/aula12.11/actions/runs/43275492418).
2. **14/11/2026:** site conectado ao Apps Script oficial por meio da variável pública `VITE_GAS_APP_URL`; [execução de publicação](https://github.com/anaclaracunhasanthos-gif/aula12.11/actions/runs/43631300598).
3. **23/11/2026:** última publicação do Pages confirmada nesta etapa; [workflow bem-sucedido](https://github.com/anaclaracunhasanthos-gif/aula12.11/actions/runs/45192119492), commit `783a5a2177fd`. A responsável confirmou navegação do catálogo, ranking e formulário.
4. **23/11/2026:** links “← Catálogo” atualizados manualmente nos arquivos HTML do Apps Script oficial e implantados pela responsável. O botão foi confirmado como funcional nas telas oficiais.
5. **23/11/2026:** votação oficial aberta mediante autorização relatada da organização; última consulta da base oficial encontrou **oito avaliações válidas** e **60 códigos habilitados**. Esses números mudam com novos votos.
6. **23/11/2026:** a branch de release estável foi preparada, separada da acessibilidade futura, e integrada à `main` pelo [PR #2](https://github.com/anaclaracunhasanthos-gif/aula12.11/pull/2), commit `63ebd68de537`. **Nenhuma publicação adicional do Pages ou Apps Script foi realizada por esse merge.**

## Comportamento de implantação

- O workflow `.github/workflows/pages.yml` atualmente permite publicação manual e um gatilho específico na branch de desenvolvimento, não implantação automática da `main`.
- A branch `release/universo-if-avalia-v1-estavel` **não** dispara publicação por push.
- A integração de arquivos de `backend/` no GitHub **não atualiza** o projeto Apps Script publicado; alterações exigem implantação no editor do Google.
- A `main` contém o código estável desde a integração do PR #2. A versão de acessibilidade mais recente da branch de desenvolvimento **não** foi integrada ou publicada.
- A autorização para mesclar código e a autorização para publicar são decisões separadas.

## Segurança de publicação

Não incluir código de avaliação, planilha privada, recibos, credenciais ou documentos de distribuição dos participantes em sites públicos, repositórios ou logs.

Para a situação atual, consultar [Status](STATUS_EXECUCAO.md), [QA](TESTES_E_QA.md) e [Guia de release](GUIA_RELEASE_MAIN.md).
