const jsonfile = require("jsonfile")

let myBD = __dirname + "/../../../arq-son-EVO.json"

function generateIDs(myBD) {
    jsonfile.readFile(myBD, (error, obj) => {
        if (!error) {
            let docs = obj["arq"]["doc"]

            let i = 1
            docs.forEach(doc => {
                doc["id"] = i
                i++
            })

            obj["arq"]["doc"] = docs

            jsonfile.writeFile(myBD, obj, error => {
                if (!error) {
                    console.log(`Foram gerados identificadores para cada registo musical no ficheiro JSON !`)
                } else {
                    console.log("Não possível escrever no ficheiro JSON !")
                }
            })
        } else {
            console.log("Não possível ler o ficheiro JSON !")
        }
    })
}

function removeIDs(myBD) {
    jsonfile.readFile(myBD, (error, obj) => {
        if (!error) {
            let docs = obj["arq"]["doc"]

            docs.forEach(doc => {
                delete doc["id"]
            })

            obj["arq"]["doc"] = docs

            jsonfile.writeFile(myBD, obj, error => {
                if (!error) {
                    console.log(`Foram removidos os identificadores de cada registo musical no ficheiro JSON !`)
                } else {
                    console.log("Não possível escrever no ficheiro JSON !")
                }
            })
        } else {
            console.log("Não possível ler o ficheiro JSON !")
        }
    })
}

//generateIDs(myBD)
//removeIDs(myBD)