# Importar o pacote completo do Universo IF Avalia

O pacote ZIP completo foi disponibilizado na conversa do ChatGPT como `universo-if-avalia-mvp-final.zip`.

## Passos no GitHub
1. Baixe o ZIP e extraia a pasta `universo-if-avalia-app`.
2. Acesse o repositório e selecione a branch `feat/universo-if-avalia-mvp`.
3. Em **Add file → Upload files**, envie **o conteúdo** da pasta extraída (incluindo `.github/workflows/pages.yml`, `backend/`, `src/`, `docs/` e `universo_if_catalogo_46_projetos_v1.0.json`). Se o upload via navegador não preservar pastas ocultas, use Git local.
4. Confira os arquivos antes de confirmar o commit. Não envie `.env`, códigos de votação, IDs privados da planilha ou credenciais.
5. Execute `npm install`, `npm run typecheck`, `npm test` e `npm run build`. Gere e versiona `package-lock.json` para usar `npm ci` em CI.
6. Revise o PR em rascunho antes de solicitar merge. **Não habilite GitHub Pages sem autorização adicional.**

## Git local (alternativa)
```bash
git clone https://github.com/anaclaracunhasanthos-gif/aula12.11.git
cd aula12.11
git switch feat/universo-if-avalia-mvp
# Copie aqui o conteúdo da pasta universo-if-avalia-app
git add .
git commit -m "feat: add Universo IF Avalia MVP"
git push origin feat/universo-if-avalia-mvp
```

## Integração Google
A planilha e o Apps Script devem permanecer na conta do grupo. Siga `docs/CONFIGURAR_GOOGLE.md` do pacote. Não torne planilhas com códigos e avaliações públicas.
