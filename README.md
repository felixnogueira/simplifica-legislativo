# Simplifica Legislativo — frontend (Angular + PrimeNG)

Interface web do projeto: busca semântica de documentos legislativos e chat com o assistente.

## desenvolver

```bash
npm install
npx ng serve        # http://localhost:4200
```

A API local deve estar em `http://localhost:8000` (veja `src/environments/environment.ts`).

## produção

Edite `src/environments/environment.prod.ts` com a URL da API de produção.

```bash
npx ng build --configuration production
# dist/simplifica-legislativo
```

## rotas

- `/busca` — busca com filtros (ano, tipo, situação, autor)
- `/chat` — pergunta ao assistente com fontes citadas

Sem chaves configuradas no backend, a interface exibe mensagens de erro orientativas (503 com `detalhe`).