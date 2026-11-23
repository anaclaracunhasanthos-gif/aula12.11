# Backlog de implementação e homologação

**Atualizado em 22/11/2026.** Status refere-se às evidências verificadas, não a uma aprovação institucional definitiva.

| ID | Frente | Critérios / objetivo | Status verificado |
| --- | --- | --- | --- |
| S1 | Catálogo e UX | 46 projetos; busca, filtros, detalhes; layout web/mobile | **Implementado e publicado**. Falta teste de acessibilidade e mais aparelhos reais |
| S2 | Regras e persistência | Notas 1–5, pesos 30/30/25/15, Modelo B, bloqueio de duplicidade e recibo | **Código implementado; 14 testes automáticos PASS**. Uma avaliação real confirmada; duplicidade em Web App real pendente |
| S3 | Ranking | Modalidades separadas, mínimo de 5 votos, desempate e médias | **Lógica implementada e testada**. Teste real com cinco votos de homologação pendente |
| S4 | Integração Google | Apps Script, planilha privada, link entre catálogo e formulário | **Integrado na produção**. Segurança/permissões e atualização de implantação a conferir |
| S5 | Homologação separada | Planilha e códigos exclusivos, Web App próprio e testes reais | **Ambiente preparado; implantação feita pela responsável**. Acesso ao formulário de homologação não validado; zero votos de teste na última leitura |
| S6 | Segurança e acesso | Hash SHA-256, LockService, credenciais privadas, administração restrita | **Controles no código**. Revisão de implantação pública e concorrência real pendentes |
| S7 | Publicação e documentação | Site no Pages, README, QA e registro de publicação | **Site publicado; documentação atualizada nesta branch**. A `main` continua sem integração |
| S8 | Aceite final | Testes em dispositivos, acessibilidade, evidências e aprovação da equipe | **Pendente** |

## Prioridade recomendada

1. Resolver o acesso **ao Web App de homologação**, preservando a base oficial.
2. Validar voto permitido, bloqueio de repetição, mesmo código em outro projeto e recibos no Web App de teste.
3. Homologar ranking com cinco votos de teste, erros e concorrência.
4. Concluir testes em aparelhos reais e acessibilidade; documentar evidências.
5. Realizar revisão de segurança e aceite da equipe; só depois discutir integração do PR à `main`.

**Nota de produção:** votação oficial fechada na consulta de 22/11/2026; não alterar a configuração sem autorização. Nenhuma informação de planilha privada ou tokens deve ser versionada.
