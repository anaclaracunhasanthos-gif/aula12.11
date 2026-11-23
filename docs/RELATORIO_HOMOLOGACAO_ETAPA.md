# Relatório final da etapa de homologação — Universo IF Avalia

**Data de referência: 23/11/2026.** **Conclusão: HOMOLOGAÇÃO PARCIAL, COM RESSALVAS.**

Este documento consolida o resultado da etapa atual. “Relatório final” significa fechamento documental da etapa, **não** certificação de acessibilidade, segurança absoluta, conclusão de todos os testes ou aceite institucional definitivo. A aplicação é um protótipo de participação popular **educativa**, não um mecanismo de julgamento científico ou de resultado oficial do evento.

## 1. Sistema e critérios de aceite

- **Frontend:** React + Vite + TypeScript publicado no GitHub Pages, catálogo de **46 projetos** (24 da Mostra Nacional e 22 da Mostra de Extensão).
- **Backend:** Google Apps Script com formulário, regras de votação e ranking. **Persistência:** Google Sheets privado.
- **Critérios:** criatividade 30%, clareza 30%, relevância 25%, demonstração 15%; notas inteiras de 1 a 5.
- **Modelo de participação B:** um código pode avaliar vários projetos, mas somente **uma vez por projeto**.
- **Ranking:** modalidades separadas, média e posição visíveis após **cinco avaliações válidas** do projeto. Não representa resultado oficial do evento.

## 2. Estado real das bases — retrato consultado em 23/11/2026

| Indicador | Produção | Homologação separada |
| --- | ---: | ---: |
| Projetos | 46 | 46 |
| Hashes de códigos cadastrados | 80 | 5 |
| Códigos habilitados | 60 | 5 |
| Códigos desabilitados | 20 | 0 |
| Avaliações válidas observadas | **8** | **8** |
| Votação aberta na planilha | **TRUE** | **TRUE** |

Na amostra oficial consultada, os oito registros tinham identificadores de requisição distintos, sem pares repetidos de hash de código/projeto. **Os números são um retrato da consulta, não o total definitivo de participantes**, pois a votação está ativa.

As permissões da planilha de produção mostraram apenas usuários identificados (proprietário e editor), sem compartilhamento público. **Nenhum código original, hash, recibo individual, ID de planilha ou credencial deve ser publicado neste repositório.**

A responsável informou que a equipe organizadora autorizou a abertura da votação e confirmou testes em celular físico e notebook.

## 3. Evidências dos testes

| Frente | Resultado | Limite da evidência |
| --- | --- | --- |
| Catálogo de 46 projetos, busca, filtros e notas | **Aprovado** | Testes automáticos e revisão estrutural |
| Formulário e ranking oficiais sem login, navegação de retorno ao catálogo | **Confirmado pela responsável** | Verificação manual no navegador |
| Registro real de votos oficiais | **Aprovado na amostra** | Planilha mostra oito registros válidos na última consulta |
| Duplicidade e recibos na base oficial | **Sem inconsistência observada** | Amostra de oito registros; não é ensaio agressivo da produção |
| Voto válido, duplicidade rejeitada, mesmo código em outro projeto e ranking mínimo | **Aprovado na homologação separada** | Oito votos de testes, com resultado conferido |
| Testes automatizados da **versão estável** | **16 Vitest**, TypeScript, validação do catálogo e build | Código-fonte versionado |
| Concorrência simulada com `Code.gs` | **Aprovado** | Duas rodadas de 12 workers: um aceito e 11 rejeitados em cada uma; sem Apps Script real |
| Melhorias de acessibilidade futuras | **21 Vitest aprovados na branch de desenvolvimento** | **Não incluídas nesta versão estável e não publicadas** |

Evidências: [workflow de CI da versão de desenvolvimento](https://github.com/anaclaracunhasanthos-gif/aula12.11/actions/runs/45207752211), [teste simulado versionado](../scripts/testar_concorrencia_simulada.mjs) e [registro técnico detalhado](TESTES_E_QA.md).

## 4. Segurança e integridade observadas

O `Code.gs` valida código habilitado, projeto existente, nota em cada critério, estado de abertura e regras de duplicidade; calcula média no servidor e usa `LockService` para serializar gravações. Os códigos são conferidos por hash SHA-256. Reenvios idênticos podem ser tratados como já processados.

A revisão do **código-fonte da branch estável** não identificou tokens privados, endereços de planilhas privadas ou credenciais nos arquivos inspecionados. Os endpoints públicos de formulário e ranking são intencionais. **Isso não comprova a configuração administrativa do projeto do Apps Script implantado.**

As funções de emissão e preparação do backend terminam com `_`, reduzindo sua exposição por `google.script.run`; ainda é necessário revisar as propriedades e a versão efetivamente publicada no editor do Google.

## 5. Pendências registradas

1. **Concorrência real:** não houve ensaio rigoroso de requisições simultâneas no serviço do Google. Executar apenas na implantação de homologação, sem votos artificiais na produção.
2. **Acessibilidade:** a auditoria completa com leitor de tela, teclado e diferentes ampliações foi **adiada por escolha da responsável**. Alterações preparadas estão apenas na branch `feat/universo-if-avalia-mvp`.
3. **Administração e implantação:** confirmar versão publicada, propriedades do Apps Script, isolamento das funções administrativas e acesso à planilha.
4. **Organização da `main`:** **concluída em 23/11/2026**, após autorização da responsável. [PR #2](https://github.com/anaclaracunhasanthos-gif/aula12.11/pull/2) integrado pelo commit `63ebd68de537`. Não houve nova publicação do site ou do Apps Script.
5. **Operação:** monitorar votos e mensagens de erro sem divulgar dados pessoais ou códigos.

## 6. Conclusão e decisão

**Os fluxos principais funcionam e o sistema oficial recebe avaliações.** A etapa atual está documentada e apta a avaliação da equipe organizadora. Contudo, a conclusão técnica permanece **PARCIAL, COM RESSALVAS**; não declarar “100% homologado”, nem certificação completa de acessibilidade e segurança.

**Separação das versões:** a `main` agora contém a versão estável derivada de `release/universo-if-avalia-v1-estavel`, sem as melhorias de acessibilidade, que continuam para uma atualização futura. A integração ao GitHub não alterou os votos nem implicou nova publicação.

## 7. Links públicos

- [Site em funcionamento](https://anaclaracunhasanthos-gif.github.io/aula12.11/)
- [Repositório do projeto](https://github.com/anaclaracunhasanthos-gif/aula12.11)
- [Roteiro e resultados detalhados](TESTES_E_QA.md)
- [Status da execução](STATUS_EXECUCAO.md)
- [Preparação da branch main](GUIA_RELEASE_MAIN.md)

*Última atualização documental: 23/11/2026. Dados individuais, tokens e IDs privados omitidos intencionalmente.*
