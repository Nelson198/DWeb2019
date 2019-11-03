# TP7

## Nota
Dado que existem mais de 28795 documentos na base de dados ***movies***, foram apresentados aleatoriamente apenas 1000 registos de filmes na página inicial.

### Executar servidor
```
npm start
```

### Importação da base de dados
```
mongoimport --db movies --collection movies --type json --file movies.json --jsonArray
```