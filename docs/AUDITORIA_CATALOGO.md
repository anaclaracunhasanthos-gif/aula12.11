# Auditoria do catálogo

- Fonte primária: `universo_if_catalogo_46_projetos_v1.0.json` (kit v1.0).
- PDFs de origem recebidos: `trabalhos-mostra-nacional-extensao.pdf` e `trabalhos-mostra-nacional.pdf`.
- Registros: **46**; Mostra Nacional: **24**; Mostra de Extensão: **22**.
- IDs únicos: **46**.
- Campos obrigatórios: todos presentes em todos os registros.
- Duplicados removidos: nenhum nesta versão consolidada; os registros AGROSENTINELA e TRAÇO VIVO permanecem independentes, conforme instrução.
- Datas/horários: preservados conforme JSON; não foram extrapolados para outros dias.
- Dados não disponíveis: não foram criados resumos, autores, campus, imagens ou links individuais.
- PDFs: incluídos no kit e disponíveis para conferência; esta auditoria valida estrutura e contagens do JSON. Conferência visual página a página por QA humano permanece pendente.

## Validação automática

O teste automatizado valida contagens, IDs e campos. O arquivo `scripts/validar_catalogo.mjs` original do kit também foi preservado em `scripts/`.

## Conferência amostral dos PDFs

Os PDFs são digitalizações sem camada de texto pesquisável. Foi aplicado OCR local (português) nas páginas indicadas pelo catálogo e conferida uma amostra de 12 títulos de cada modalidade (24 projetos). Os termos distintivos dos 8 primeiros tokens de cada título (ou todos quando havia menos) foram localizados no OCR da página-fonte correspondente; isso confirma a correspondência da amostra, mas OCR não substitui conferência visual literal de acentos e pontuação. A conferência integral por pessoa da equipe continua recomendada.
