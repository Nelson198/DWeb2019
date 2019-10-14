var http = require("http");
var fs = require("fs");
var port = 7777;

function handler(res, pathFile, contentType) {
	fs.readFile(pathFile, function (err, data) {
		if (err) {
			console.log(pathFile + ":\n" + err);
			return;
		}
		res.writeHead(200, { "Content-Type": contentType });
		res.write(data);
		res.end();
	});
}

var server = http.createServer(function (req, res) {
	var parts = req.url.split("/");
	/* Query String */
	var queryString = parts[parts.length - 1];

	switch (queryString) {
		/* Ícone presente na "tab" da página Web de um arqueossítio */
		case "favicon.ico":
			handler(res, "dataset/favicon.ico", "image/x-icon");
			break;

		/* Ícone presente na "tab" da página Web "error.html" */
		case "error.ico":
			handler(res, "dataset/error.ico", "image/x-icon");
			break;

		/* Imagem presente no arqueossítio nº1 */
		case "taca.gif":
			handler(res, "dataset/taca.gif", "image/gif");
			break;

		/* Transformação XML --> HTML através do ficheiro "arq2html.xsl" */
		case "arq2html.xsl":
			handler(res, "arq2html.xsl", "text/xsl; charset=utf-8");
			break;

		/* Conteúdo da página "index.html" : Índice dos arqueossítios */
		case "":
			handler(res, "index.html", "text/html; charset=utf-8");
			break;

		default:
			fs.readFile("dataset/arq" + queryString + ".xml", function (err1, data1) {
				/* Se o ficheiro não existir, devolver o conteúdo da página "error.html" */
				if (err1) {
					fs.readFile("error.html", function (err2, data2) {
						if (err2) {
							console.error("error.html:\n" + err2);
							return;
						}
						res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
						res.write(data2);
						res.end();
					});
					return;
				}

				/* Se o ficheiro existir, devolver o conteúdo da página "arq{queryString}.xml" */
				res.writeHead(200, { "Content-Type": "text/xml; charset=utf-8" });
				res.write(data1);
				res.end();
			});
			break;
	}
});

server.listen(port);
console.log("Servidor à escuta na porta " + port + " ...");