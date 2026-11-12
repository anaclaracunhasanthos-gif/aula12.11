# Testes e QA

## Automatizados
- `npm install`
- `npm run typecheck`
- `npm test`
- `npm run build`

Cobertura inicial: contagem e campos do catálogo; IDs únicos e divisão 24/22; busca sem acento; notas inteiras/faixa; cálculo de [4,5,4,3] = 4,15.

## Roteiro de integração real (obrigatório antes de homologar)
1. Implantar Apps Script em ambiente de teste e abrir o Web App anônimo em janela privada/celular.
2. Consultar ranking de cada modalidade; confirmar que nenhuma aba privada é retornada.
3. Submeter código válido + projeto A; guardar recibo.
4. Conferir a linha em `Avaliacoes`: hash, ID do projeto, quatro notas, média, timestamp e `VALIDA`; confirmar que não existe token puro.
5. Repetir o mesmo código + projeto A: deve rejeitar sem nova linha.
6. Mesmo código + projeto B: deve aceitar.
7. Enviar duas requisições concorrentes para mesmo par: exatamente uma linha válida.
8. Testar código inválido, votação fechada, nota decimal, ausência de nota e ID inexistente.
9. Criar cinco avaliações válidas em projeto de teste e confirmar posição/média/contagem; abaixo de cinco, sem posição.
10. Conferir layout em 320, 375, 768 e 1280 px, teclado, foco, mensagens e toque. Validar Chrome Android e Safari iOS quando disponíveis.

## Estado desta execução
- Catálogo: PASS na validação estrutural automatizada.
- Testes/build: serão reportados com os resultados da execução local.
- PDF página a página: pendente de conferência humana.
- Envio real, recibo e readback Sheets: BLOCKED até autorização e implantação pela equipe.
- QA independente/smartphone real: NOT_RUN.

## Limitação de execução local

A instalação de dependências npm foi tentada, mas o ambiente de execução não conseguiu acessar `registry.npmjs.org` (sem cache local). Por isso `npm install`, Vitest e build Vite não foram executados aqui; não há `package-lock.json` gerado. O GitHub Actions pode instalar dependências em ambiente de rede e gerar um artefato ZIP do build para revisão sem publicação; nenhum Pages é ativado automaticamente.
