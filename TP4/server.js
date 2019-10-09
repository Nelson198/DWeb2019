var http = require("http");
var fs = require("fs");
var port = 7777;

var server = http.createServer(function (req, res) {
    var parts = req.url.split("/");
    /* Query String */
    var queryString = parts[parts.length - 1];

    switch (queryString) {
        /* Ícone presente na "tab" da página Web */
        case "favicon.ico":
            fs.readFile("dataset/favicon.ico", function (_err, data) {
                res.writeHead(200, { 'Content-Type': 'image/x-icon' });
                res.write(data);
                res.end();
            });
            break;

        /* Imagem presente no arqueossítio nº1 */
        case "taca.gif":
            fs.readFile("dataset/taca.gif", function (_err, data) {
                res.writeHead(200, { 'Content-Type': 'image/gif' });
                res.write(data);
                res.end();
            });
            break;

        /* Transformação XML --> HTML através do ficheiro arq2html.xsl */
        case "arq2html.xsl":
            fs.readFile("arq2html.xsl", function (_err, data) {
                res.writeHead(200, { 'Content-Type': 'text/xsl; charset=utf-8' });
                res.write(data);
                res.end();
            });
            break;

        default:
            fs.readFile("dataset/arq" + queryString + ".xml", function (err, data) {
                /* Se o ficheiro não existir, devolver o conteúdo da página error.html (ainda falta fazer !!!) */
                if (err !== null) {
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.write("<head><title>Error</title><link rel=\"icon\" href=\"dataset/error.ico\" type=\"image/x-icon\"></head><body><h1 style=\"text-align: center; margin: auto\">Infelizmente não foi possível localizar o ficheiro \"arq" + queryString + ".xml\" \u{1F630} </h1><img src=\"https://media.giphy.com/media/TvLuZ00OIADoQ/giphy.gif\" alt=\"\" style=\"display: block; margin: 0 auto; margin-top: 5%; width: 40%; border-radius: 15px;\"></body>");
                    res.end();
                    return;
                };

                /* Se o ficheiro existir, devolver o conteúdo da página arq{queryString}.xml */
                res.writeHead(200, { 'Content-Type': 'text/xml; charset=utf-8' });
                res.write(data);
                res.end();
            });
            break;
    }
})

server.listen(port);
console.log("Servidor à escuta na porta " + port + " ...");