var http = require("http")
var fs = require("fs")
var url = require("url")
var { parse } = require("querystring")

var jsonfile = require("jsonfile")
var pug = require("pug")

var database = "tasks.json"
var port = 7777

function handler(res, pathfile, contentType) {
    res.writeHead(200, { "Content-Type": contentType });
    fs.readFile(pathfile, function (error, data) {
        if (!error) {
            res.write(data)
        } else {
            console.log(error)
            res.write(pug.renderFile("error.pug", { e: error }))
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

var server = http.createServer(function (req, res) {
    var queryString = url.parse(req.url, true).pathname

    console.log(req.method + " " + queryString)

    switch (req.method) {
        case "GET":
            /* Página Web inicial */
            if ((queryString == "/") || (queryString == "/taskManager")) {
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
                res.write(pug.renderFile("index.pug"))
                res.end()
            }
            /* Página Web com a lista de todas as tarefas submetidas */
            else if (queryString == "/seeTasks") {
                jsonfile.readFile(database, (error, tasks) => {
                    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
                    if (!error) {
                        res.write(pug.renderFile("seeTasks.pug", { list: tasks }))
                    } else {
                        var msg = "Erro ao ler a lista de tarefas presente no ficheiro " + database + " !"
                        console.log(msg)
                        res.write(pug.renderFile("error.pug", { e: msg }))
                    }
                    res.end()
                })
            }
            /* Página Web que permite submeter uma determinada tarefa */
            else if (queryString == "/submitTask") {
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
                res.write(pug.renderFile("submitTask.pug"))
                res.end()
            }
            /* "Stylesheet" */
            else if (queryString == "/w3.css") {
                handler(res, "w3.css", "text/css")
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
                handler(res, "images/loading.gif", "image/x-icon")
            }
            /* Pedido GET desconhecido */
            else {
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
                res.write(pug.renderFile("error.pug", { e: "Pedido GET desconhecido !" }))
                res.end()
            }
            break

        case "POST":
            /* Página Web que permite submeter uma determinada tarefa */
            if (queryString == "/sendTask") {
                recoverInfo(req, resultado => {
                    jsonfile.readFile(database, (error, tasks) => {
                        if (!error) {
                            tasks.push(resultado)
                            jsonfile.writeFile(database, tasks, error => {
                                if (!error) {
                                    console.log("Tarefa submetida com sucesso !")
                                    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
                                    res.write(pug.renderFile("submitTask.pug", { msg: "✔️ A sua tarefa foi submetida com sucesso. ️✔️" }))
                                    res.end()
                                } else {
                                    console.log(error)
                                }
                            })
                        }
                    })
                })
            }
            /* Pedido POST desconhecido */
            else {
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
                res.write(pug.renderFile("error.pug", { e: "Pedido POST desconhecido !" }))
                res.end()
            }
            break

        /* Pedido HTTP não suportado */
        default:
            console.log("Erro! O pedido " + req.method + " não é suportado !")
            res.writeHead(200, "Content-Type: text/html; charset=utf-8")
            res.write(pug.renderFile("error.pug", { e: "O pedido " + req.method + " não é suportado !" }))
            res.end()
            break
    }
})

server.listen(port, () => {
    console.log("Servidor à escuta na porta " + port + " ...")
});