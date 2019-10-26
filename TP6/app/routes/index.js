const express = require("express")
const jsonfile = require("jsonfile")
var router = express.Router()

let myBD = __dirname + "/../../arq-son-EVO.json"

/* GET página inicial */
router.get("/", (_req, res, _next) => {
    jsonfile.readFile(myBD, (error, obj) => {
        if (!error) {
            res.render("index", { list: obj["arq"]["doc"] })
        }
        else {
            res.render("error", { erro: error })
        }
    })
})

/* GET adicionar registo ao arquivo musical */
router.get("/add", (_req, res, _next) => {
    res.render("add")
})

/* POST arquivo musical */
router.post("/", (req, res) => {
    if (res.status != 500) {
        jsonfile.readFile(myBD, (error, obj) => {
            if (!error) {
                let id = obj["arq"]["doc"].length + 1
                let fileType = req.body.fileType
                let fileName = req.body.fileName
                let file = {
                    "-t": fileType,
                    "#text": fileName
                }

                delete req.body["fileType"]
                delete req.body["fileName"]
                req.body.file = file
                req.body.id = id
                obj["arq"]["doc"].push(req.body)

                jsonfile.writeFile(myBD, obj, error => {
                    if (!error) {
                        console.log(`Arquivo musical nº${id} foi adicionado com sucesso ao ficheiro JSON !`)
                    } else {
                        console.log(error)
                        res.render("error", { erro: error })
                    }
                })
            } else {
                console.log(error)
                res.render("error", { erro: error })
            }
        })
        res.redirect("/")
    }
})

/* GET consultar registo presente no arquivo musical */
router.get("/consult@:id", (req, res, _next) => {
    let id = req.params.id

    jsonfile.readFile(myBD, (error, obj) => {
        if (!error) {
            let docs = obj["arq"]["doc"]
            let index = docs.findIndex(doc => doc.id == id)
            if (index > -1) {
                res.render("consult", { doc: docs[index] })
            } else {
                console.log(`Erro na consulta de registo: não foi possível encontrar o arquivo musical nº${id} no ficheiro JSON !`)
                res.render("error", { erro: `Erro na consulta: não foi possível encontrar o arquivo musical nº${id} no ficheiro JSON !` })
            }
        } else {
            console.log(error)
            res.render("error", { erro: error })
        }
    })
})

/* GET alterar registo que já esteja presente no arquivo musical */
router.get("/edit@:id", (req, res, _next) => {
    let id = req.params.id

    jsonfile.readFile(myBD, (error, obj) => {
        if (!error) {
            let docs = obj["arq"]["doc"]
            let index = docs.findIndex(doc => doc.id == id)
            if (index > -1) {
                res.render("edit", { doc: docs[index] })
            } else {
                console.log(`Erro na edição de registo: não foi possível encontrar o arquivo musical nº${id} no ficheiro JSON !`)
                res.render("error", { erro: `Erro na edição de registo: não foi possível encontrar o arquivo musical nº${id} no ficheiro JSON !` })
            }
        } else {
            console.log(error)
            res.render("error", { erro: error })
        }
    })
})

/* PUT alterar registo que já esteja presente no arquivo musical */
router.put("/:id", (req, res, _next) => {
    let id = req.params.id

    jsonfile.readFile(myBD, (error, obj) => {
        if (!error) {
            docs = obj["arq"]["doc"]
            let index = docs.findIndex(doc => doc.id == id)
            if (index > -1) {
                docs[index] = req.body
                obj["arq"]["doc"] = docs
                jsonfile.writeFile(myBD, obj, error => {
                    if (!error) {
                        console.log(`Arquivo musical nº${id} foi alterado com sucesso no ficheiro JSON !`)
                    } else {
                        console.log(error)
                        res.render("error", { erro: error })
                    }
                })
                res.end("0")
            } else {
                console.log(`Erro na alteração de registo: não foi possível encontrar o arquivo musical nº${id} no ficheiro JSON !`);
                res.render("error", { erro: `Erro na alteração de registo: não foi possível encontrar o arquivo musical nº${id} no ficheiro JSON !` })
                res.end("1")
            }
        } else {
            console.log(error)
            res.render("error", { erro: error })
            res.end("1")
        }
    })
})

/* DELETE arquivo musical */
router.delete("/:id", (req, res, _next) => {
    let id = req.params.id

    jsonfile.readFile(myBD, (error, obj) => {
        if (!error) {
            let docs = obj["arq"]["doc"]
            let index = docs.findIndex(doc => doc.id == id)
            if (index > -1) {
                docs.splice(index, 1)

                /* Generate new IDs */
                i = 1
                docs.forEach(doc => {
                    doc["id"] = i
                    i++
                });
                obj["arq"]["doc"] = docs

                jsonfile.writeFile(myBD, obj, error => {
                    if (!error) {
                        console.log(`Arquivo musical nº${id} foi eliminado com sucesso do ficheiro JSON !`)
                    } else {
                        console.log(error)
                        res.render("error", { erro: error })
                    }
                })
                res.end("0")
            } else {
                console.log(`Erro na remoção de registo: não foi possível encontrar o arquivo musical nº${id} no ficheiro JSON !`);
                res.render("error", { erro: `Erro na remoção de registo: não foi possível encontrar o arquivo musical nº${id} no ficheiro JSON !` })
                res.end("1")
            }
        } else {
            res.render("error", { erro: error })
            res.end("1")
        }
    })
})

module.exports = router