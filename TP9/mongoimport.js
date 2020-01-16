const jsonfile = require("jsonfile")
const mongoose = require("mongoose")

const args = process.argv.slice(2)
let host = "localhost"
let port = "27017"

if (args.includes("--help")) {
    console.log(`Usage: 
      node mongoimport.js <options> <file>
      
  --> general options:
          --help                                    print usage
      
  --> connection options:
          --h, --host <hostname>                    mongodb host to connect to
                                                    (default: localhost)

          --port <port>                             server port
      
  --> namespace options:
          --d, --db <database-name>                 database to use

          --c, --collection <collection-name>       collection to use
      
  --> input options:
          --file <filename>                         file to import from if not
                                                    specified, stdin is used

          --jsonArray                               treat input source as a JSON
                                                    array`)
    process.exit(1)
}

/* Verificar se os argumentos mínimos foram especificados */
if ((!args.includes("--d") && !args.includes("--db")) ||
    (!args.includes("--c") && !args.includes("--collection")) ||
    !args.includes("--file")) {
    console.log("Por favor, indique o nome da base de dados, o nome da coleção e o nome do ficheiro JSON !")
    process.exit(1)
}

/* Guardar os argumentos num objeto */
const argsObject = {}
for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
        case "--h":
        case "--host":
            argsObject.host = args[i + 1]
            i++
            break

        case "--port":
            argsObject.port = args[i + 1]
            i++
            break

        case "--d":
        case "--db":
            argsObject.db = args[i + 1]
            i++
            break

        case "--c":
        case "--collection":
            argsObject.collection = args[i + 1]
            i++
            break

        case "--file":
            argsObject.file = args[i + 1]
            i++
            break

        case "--jsonArray":
            argsObject.jsonArray = true
            break

        default:
            break
    }
}

if (argsObject.host !== undefined && argsObject.host !== "localhost") {
    host = argsObject.host
}
if (argsObject.port !== undefined && argsObject.port !== "27017") {
    port = argsObject.port
}

/* Conectar à base de dados especificada */
mongoose.connect(`mongodb://${host}:${port}/${argsObject.db}`, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) {
        console.log("MongoDB: erro na conexão !")
        process.exit(1)
    }

    /* Conectar à coleção especificada */
    mongoose.connection.db.collection(argsObject.collection, (err, collection) => {
        if (err) {
            console.log("Erro ao aceder à coleção !")
            console.log(`${err.name}: ${err.message}`)
            process.exit(1)
        }

        /* Ler o ficheiro JSON especificado */
        jsonfile.readFile(argsObject.file, (err, data) => {
            if (err) {
                console.log("Erro a ler o ficheiro JSON !")
                console.log(`${err.name}: ${err.message}`)
                process.exit(1)
            }

            /* Guardar os dados dependendo do tipo especificado pelo utilizador (--jsonArray) */
            if (argsObject.jsonArray) {
                collection.insertMany(data, (err, result) => {
                    if (err) {
                        console.log("Erro a guardar os documentos !")
                        console.log(`${err.name}: ${err.message}`)
                        process.exit(1)
                    }

                    console.log(`Conectado a: mongodb://${host}:${port}/${argsObject.db}\n         --> ${result.insertedCount} documentos inseridos.`)

                    mongoose.connection.close((err) => {
                        if (err) {
                            console.log("Erro ao fechar a base de dados !")
                            console.log(`${err.name}: ${err.message}`)
                            process.exit(1)
                        }
                    })
                })
            } else {
                collection.insertOne(data, (err, result) => {
                    if (err) {
                        console.log("Erro a guardar o documento !")
                        console.log(`${err.name}: ${err.message}`)
                        process.exit(1)
                    }

                    console.log(`Conectado a: mongodb://${host}:${port}/${argsObject.db}\n         --> ${result.insertedCount} documento inserido.`)

                    mongoose.connection.close((err) => {
                        if (err) {
                            console.log("Erro ao fechar a base de dados !")
                            console.log(`${err.name}: ${err.message}`)
                            process.exit(1)
                        }
                    })
                })
            }
        })
    })
})