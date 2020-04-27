# TP8

## Notas:
Quando o *URL* introduzido é http://localhost:8008/, o servidor desenvolvido redireciona o mesmo para o *URL* da Interface.

### API
```
http://localhost:8008/api
```

### Interface
```
http://localhost:8008/interface
```

### Executar servidor
```
npm start
```

### Importação da base de dados
```
mongoimport --db prize --collection prize --type json --file=prize.json --jsonArray
```