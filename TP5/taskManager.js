var http = require("http")
var fs = require("fs")
var url = require("url")
var { parse } = require("querystring")

var jsonfile = require("jsonfile")
var pug = require("pug")

var database = "tasks.json"
var port = 7777

function handler(res, pathfile, contentType) {
    fs.readFile(pathfile, (error, data) => {
        if (!error) {
            res.writeHead(200, { "Content-Type": contentType });
            res.write(data)
        } else {
            console.log(error)
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.write(pug.renderFile("templates/error.pug", { e: error }))
        }
        res.end()
    });
}

function recoverInfo(request, callback) {
    if (request.headers["content-type"] == "application/x-www-form-urlencoded") {
        let body = ""
        request.on("data", bloco => {
            body += bloco.toString()
        })
        request.on("end", () => {
            callback(parse(body))
        })
    }
}

var server = http.createServer((req, res) => {
    var queryString = url.parse(req.url, true).pathname

    console.log(req.method + " " + queryString)

    switch (req.method) {
        case "GET":
            /* Página Web representativa do gestor de tarefas */
            if ((queryString == "/") || (queryString == "/taskManager")) {
                jsonfile.readFile(database, (error, tasks) => {
                    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
                    if (!error) {
                        res.write(pug.renderFile("templates/index.pug", { list: tasks }))
                    } else {
                        var msg = "Erro ao ler a lista de tarefas presente no ficheiro " + database + " !"
                        console.log(msg)
                        res.write(pug.renderFile("templates/error.pug", { e: msg }))
                    }
                    res.end()
                })
            }
            /* "Stylesheet" */
            else if (queryString == "/w3.css") {
                handler(res, "stylesheet/w3.css", "text/css")
            }
            /* Ícone da página Web inicial */
            else if (queryString == "/favicon.ico") {
                handler(res, "images/favicon.ico", "image/x-icon")
            }
            /* Ícone da página Web relativo a algum erro */
            else if (queryString == "/images/error.ico") {
                handler(res, "images/error.ico", "image/x-icon")
            }
            /* Imagem GIF presente na página Web relativo a algum erro */
            else if (queryString == "/images/loading.gif") {
                handler(res, "images/loading.gif", "image/gif")
            }
            /* Pedido GET desconhecido */
            else {
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
                res.write(pug.renderFile("templates/error.pug", { e: "Pedido GET desconhecido !" }))
                res.end()
            }
            break

        case "POST":
            /* Ação correspondente a um envio de uma tarefa */
            if (queryString == "/sendTask") {
                recoverInfo(req, result => {
                    jsonfile.readFile(database, (error, tasks) => {
                        if (!error) {
                            tasks.push(result)
                            jsonfile.writeFile(database, tasks, error => {
                                if (!error) {
                                    console.log("Tarefa submetida com sucesso no ficheiro " + database + " !")
                                    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
                                    res.write(pug.renderFile("templates/index.pug", { list: tasks, msg: "✔️ A sua tarefa foi submetida com sucesso. ️✔️" }))
                                    res.end()
                                } else {
                                    var msg = "Erro ao escrever no ficheiro " + database + " !"
                                    console.log(msg)
                                    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                                    res.write(pug.renderFile("templates/error.pug", { e: msg }))
                                }
                            })
                        } else {
                            var msg = "Erro ao ler o ficheiro " + database + " !"
                            console.log(msg)
                            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                            res.write(pug.renderFile("templates/error.pug", { e: msg }))
                        }
                    })
                })
            }
            /* Pedido POST desconhecido */
            else {
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
                res.write(pug.renderFile("templates/error.pug", { e: "Pedido POST desconhecido !" }))
                res.end()
            }
            break

        /* Pedido HTTP não suportado */
        default:
            console.log("Erro! O pedido " + req.method + " não é suportado !")
            res.writeHead(200, "Content-Type: text/html; charset=utf-8")
            res.write(pug.renderFile("templates/error.pug", { e: "O pedido " + req.method + " não é suportado !" }))
            res.end()
            break
    }
})

server.listen(port, () => {
    console.log("Servidor à escuta na porta " + port + " ...")
});