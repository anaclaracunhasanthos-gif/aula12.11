# Registro de publicação — Universo IF Avalia

**Atualização: 22/11/2026.** Projeto acadêmico educativo — não representa votação ou julgamento científico oficial do evento.

## Endereços públicos

- [Site Web e Mobile no GitHub Pages](https://anaclaracunhasanthos-gif.github.io/aula12.11/)
- [Repositório no GitHub](https://github.com/anaclaracunhasanthos-gif/aula12.11)
- [Branch com o código completo](https://github.com/anaclaracunhasanthos-gif/aula12.11/tree/feat/universo-if-avalia-mvp)
- [Código-fonte do Google Apps Script](../backend/Code.gs)
- [Pull Request #1, ainda em rascunho](https://github.com/anaclaracunhasanthos-gif/aula12.11/pull/1)
- [GitHub Actions — publicação confirmada em 14/11/2026](https://github.com/anaclaracunhasanthos-gif/aula12.11/actions/runs/43631300598)
- [GitHub Actions — 14 testes aprovados em 22/11/2026](https://github.com/anaclaracunhasanthos-gif/aula12.11/actions/runs/45041566549)

**Não publicar aqui links de edição das planilhas, IDs privados, tokens, credenciais ou recibos individuais.** O professor pode ler o backend versionado, mas não recebe automaticamente acesso ao editor Apps Script nem à base de votos.

## O que foi publicado

1. **12/11/2026:** primeira prévia estática do catálogo React/Vite/TypeScript no GitHub Pages. Evidência histórica: [workflow inicial](https://github.com/anaclaracunhasanthos-gif/aula12.11/actions/runs/43275492418).
2. **14/11/2026:** nova publicação do Pages via workflow, com a URL `VITE_GAS_APP_URL` configurada para o Web App de produção; [build e deploy aprovados](https://github.com/anaclaracunhasanthos-gif/aula12.11/actions/runs/43631300598). O catálogo direciona o visitante ao formulário do projeto correspondente.
3. **22/11/2026:** o repositório de desenvolvimento possui **14 testes automatizados aprovados**, incluindo verificações isoladas da regra de votação no `Code.gs`, com TypeScript e build aprovados. Essas atualizações **não são automaticamente publicadas** no Pages.
4. A responsável também **implantou separadamente** um Web App de homologação. A tentativa de abrir o formulário dessa implantação apresentou erro de acesso; os testes reais de ponta a ponta nesse ambiente **continuam pendentes**.

## Funcionamento observado

- Catálogo de 46 projetos (24 Nacional e 22 Extensão) acessível pelo link público.
- Formulário do projeto foi aberto em celular pela responsável.
- Um voto válido com recibo consta na planilha privada da produção.
- O envio de um código inválido na interface oficial resultou na rejeição esperada.
- A configuração oficial de votação estava **fechada** na última leitura, em 22/11/2026. A possibilidade de acessar o formulário **não significa** que novos votos estejam abertos.
- O ranking usa duas modalidades e mínimo de 5 votos válidos; a verificação com cinco votos em Web App real ainda falta.

## Versionamento e limitações

- O workflow do Pages em `.github/workflows/pages.yml` publica o frontend estático `dist/` e **não** publica o servidor Google Apps Script.
- Publicação mais recente do Pages confirmada: **14/11/2026**, commit `4558cee1f149`.
- A branch de desenvolvimento recebeu commits posteriores, inclusive correções em telas HTML de backend; uma implantação Apps Script exige nova versão no editor para refletir essas alterações.
- **Não foi feito merge na `main`**; o PR #1 segue aberto em rascunho.
- Homologação integral, desempenho e acessibilidade em aparelhos reais, duplicidade/concorrência no Apps Script de teste e aceite institucional seguem pendentes.

Para o estado atual, consultar [Status de execução](STATUS_EXECUCAO.md) e [Testes e QA](TESTES_E_QA.md).
