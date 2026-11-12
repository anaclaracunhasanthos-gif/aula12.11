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

## Resultado do primeiro teste (12/11/2026)
- GitHub Actions: **PASS** — https://github.com/anaclaracunhasanthos-gif/aula12.11/actions/runs/43272799425
- Validação de catálogo: **PASS**, 46 = 24 + 22.
- Verificação de tipos TypeScript: **PASS**.
- Vitest: **PASS**, 4 arquivos, **10 testes**.
- Build Vite: **PASS**, arquivos HTML/CSS/JS gerados; artefato `universo-if-avalia-primeiro-frontend` armazenado no GitHub Actions.
- Navegador automatizado (Chromium) renderizou o **build React real** e verificou:
  - catálogo exibindo 46 projetos;
  - filtros para 24 projetos nacionais e 22 de extensão;
  - busca acento-insensível `traço vivo` retornando 1 projeto;
  - botão de detalhes, retorno ao catálogo e aba ranking;
  - largura móvel simulada 390 px sem rolagem horizontal; busca móvel `agrosentinela` retornando 1 projeto;
  - nenhum erro JavaScript durante o percurso.
- Capturas de desktop e celular foram disponibilizadas na conversa para revisão da equipe; esta verificação não substitui QA independente.

## Bloqueios restantes
- PDF página a página: conferência independente pendente.
- Envio real de voto, recibo e leitura no Sheets: **BLOCKED**, exige implantação e autorização.
- QA independente em smartphone físico: **NOT_RUN**.
- GitHub Pages: **NÃO PUBLICADO**, requer aprovação explícita e acionamento manual.

O ambiente local não acessou o registro npm para instalar dependências; os testes, tipos e build foram executados com sucesso no GitHub Actions. Ainda não há `package-lock.json` versionado; gerar e adicionar antes de trocar `npm install` por `npm ci` para garantir instalações reprodutíveis.
