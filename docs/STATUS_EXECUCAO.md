# Status da execução — primeiro teste do frontend

- G0: **PASS** — repositório da equipe autorizado, branch `feat/universo-if-avalia-mvp` e PR #1 em rascunho.
- G1: **PASS** — catálogo validado: 46 projetos (24 Nacional, 22 Extensão), IDs únicos, campos e referências de fonte.
- G2: **PASS PARA PRIMEIRO TESTE** — frontend React/Vite compilou no GitHub Actions; 10 testes Vitest passaram e verificação de tipos concluiu. Build real renderizado com navegador automatizado em desktop (1365 px) e celular simulado (390 px), com busca, filtros e detalhes verificados.
- G3: **PARCIAL** — backend Apps Script escrito, funções administrativas privadas, teste offline da regra B aprovado; ainda sem planilha e sem ensaio real de concorrência.
- G4: **BLOCKED_CONNECTED_VOTE** — requer planilha privada, aprovação específica, teste de voto com recibo e leitura de retorno.
- G5: **PAGES DEPLOY PASS (prévia estática)** — equipe autorizou a prévia estática do frontend; build e deploy do GitHub Pages concluíram com sucesso na execução 43275492418 (tentativa 3). URL relatada pelo GitHub: https://anaclaracunhasanthos-gif.github.io/aula12.11/. O acesso via navegador externo ainda precisa de conferência pelo grupo.
- G6: **NOT_RUN** — QA independente e teste em smartphone físico pendentes.

**Evidências:** [Pages — execução 43275492418, tentativa 3](https://github.com/anaclaracunhasanthos-gif/aula12.11/actions/runs/43275492418), [GitHub Actions, execução 43272799425](https://github.com/anaclaracunhasanthos-gif/aula12.11/actions/runs/43272799425), PR #1, artefato `universo-if-avalia-primeiro-frontend` do build. O navegador automatizado não representa uma homologação em aparelho real.

Os dois PDFs originais permanecem no kit anexado à conversa, sem cópia binária na branch; o catálogo versionado referencia suas páginas. Nenhum token privado, credencial, voto real ou dado pessoal foi colocado no repositório.

**Não efetuar merge, habilitar votação real, acesso anônimo ao Apps Script ou gravação de votos de teste sem aprovação específica da equipe.**

## Registro do site no Git
- Prévia: https://anaclaracunhasanthos-gif.github.io/aula12.11/
- Origem do build publicado: `1904b48885e159fbb192dd9c898a7bb05a7dc891`.
- Execução e deploy PASS: https://github.com/anaclaracunhasanthos-gif/aula12.11/actions/runs/43275492418 (tentativa 3).
- Fonte do projeto na branch `feat/universo-if-avalia-mvp`. O diretório `dist/` é gerado no CI e não precisa ser versionado.
- Acesso via navegador de usuário ainda não homologado; nenhuma gravação real efetuada.
