# Testes e homologação — Universo IF Avalia

**Atualização: 22/11/2026.** Situação geral: **testes automatizados aprovados; homologação real ainda parcial**.

## Evidências verificadas

| Item | Resultado | Origem |
| --- | --- | --- |
| Validação do catálogo 46 = 24 + 22 | **PASS** | GitHub Actions |
| TypeScript e compilação de produção | **PASS** | GitHub Actions |
| Testes de catálogo, notas, regras e ranking | **10 PASS** | Vitest (`src/domain/*.test.ts`) |
| Testes de backend usando o próprio `Code.gs` em planilha fictícia | **4 PASS** | Vitest (`tests/homologacao_backend.test.ts`) |
| Total automatizado | **14 PASS** | [Execução do CI](https://github.com/anaclaracunhasanthos-gif/aula12.11/actions/runs/45041566549) |
| Site publicado no GitHub Pages | **PASS na publicação** | [Workflow Pages em 14/11/2026](https://github.com/anaclaracunhasanthos-gif/aula12.11/actions/runs/43631300598) |
| Formulário oficial aberto em celular | **CONFIRMADO pela equipe** | Teste manual relatado na conversa |
| Código fictício inválido enviado no formulário oficial | **REJEITADO como esperado** | Mensagem observada: "Código inválido ou desabilitado" |
| Registro válido na base oficial | **CONFIRMADO** | Uma linha `VALIDA` verificada por leitura da planilha |
| Voto duplicado no Web App real de homologação | **PENDENTE** | Ainda não executado |
| Ranking real com cinco votos no ambiente separado | **PENDENTE** | Ainda não executado |
| Testes de concorrência e acessibilidade | **PENDENTE** | Ainda não comprovados |

A execução automatizada aprovada está na branch `feat/universo-if-avalia-mvp`. O teste isolado usa uma **planilha simulada em memória** e um código fictício, **não chama a implantação pública** e não altera avaliações reais.

## Roteiro de homologação final (ambiente separado)

Use a **planilha de homologação privada**, com cinco códigos exclusivos, em um **Apps Script de teste**. Na última consulta, esse ambiente possuía **zero avaliações**. Não usar os códigos oficiais e não compartilhar o endereço ou os tokens na documentação pública.

1. **Acesso:** confirmar que o Web App de homologação abre com a conta autorizada, apresenta o projeto correto e os quatro critérios. A equipe relatou um erro do Google ao abrir o link; investigar a conta e as permissões sem alterar a implantação oficial.
2. **Primeiro voto válido:** escolher projeto de teste, informar um dos cinco códigos reservados e notas 4, 5, 4, 3. A nota esperada é **4,15**. Guardar o recibo em registro **privado**.
3. **Persistência:** conferir exatamente uma linha nova na aba `Avaliacoes`, com hash do código, projeto, quatro notas, média, data e estado `VALIDA`; o código em texto puro não deve aparecer.
4. **Duplicidade:** com o **mesmo código e projeto**, enviar outra requisição. Resultado esperado: **"Este código já avaliou este projeto."**; a contagem de votos não aumenta.
5. **Projetos diferentes:** com o mesmo código, enviar para outro projeto. Resultado esperado: voto aceito, sem liberar uma segunda avaliação no projeto anterior.
6. **Idempotência e concorrência:** conferir reenvio da mesma requisição e tentativas simultâneas para o mesmo par código/projeto; a contagem final deve permanecer uma avaliação válida por par. Preferir ambiente de testes, não produção.
7. **Ranking:** avaliar um único projeto com cinco códigos distintos no ambiente de homologação. Antes de cinco, média e posição devem ficar ocultas; com cinco, verificar média ponderada, contagem e ordem. Confirmar a separação entre Mostra Nacional e Mostra de Extensão.
8. **Erros:** testar código desabilitado/inválido, projeto desconhecido, notas ausentes e valores fora de 1 a 5; conferir mensagens sem registros inesperados.
9. **Mobile e acessibilidade:** conferir pelo menos um celular Android e, se possível, iPhone; largura 320, 375, 768 e 1280 px, foco via teclado, contraste, tamanho de toque, leitura de mensagens e navegação por leitor de tela.
10. **Revisão final:** validar permissões, manter funções administrativas privadas, preservar planilhas e códigos, registrar evidências, conferir implantação atualizada e obter aceite da equipe.

## Produção: não misturar com testes

A base oficial mantém uma avaliação válida, **dez códigos habilitados** e **vinte desabilitados**. A votação estava **fechada na leitura de 22/11/2026**. Esses dados podem mudar depois; revalidar antes da apresentação. Não abrir votação ou inserir votos fictícios na produção para cumprir roteiro.

A confirmação de funcionamento manual no servidor **não substitui** a bateria de testes da homologação separada. Não apagar votos reais e não divulgar dados de participantes.

## Limitações e acompanhamento

- Um navegador simulado com viewport móvel não substitui teste em aparelho físico.
- O frontend publicado pelo Pages e o código atualmente na branch podem corresponder a commits diferentes.
- Uma atualização em `backend/` não altera automaticamente um Apps Script já implantado no Google.
- O acesso do professor ao repositório não fornece acesso à planilha privada.
- **Não declarar homologação completa** antes das evidências acima. Ver também [STATUS_EXECUCAO.md](STATUS_EXECUCAO.md) e [CONFIGURAR_GOOGLE.md](CONFIGURAR_GOOGLE.md).
