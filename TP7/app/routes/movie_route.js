var express = require("express");
var router = express.Router();

var movies = require("../controllers/movie_controller")

/* GET página Web inicial com a lista de filmes */
router.get("/", function (_req, res) {
    movies.listar()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
})

/* GET página Web com a informação relativa a um determinado filme */
router.get("/:idFilme", function (req, res) {
    movies.consultar(req.params.idFilme)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
})

/* GET página Web que permite adicionar um filme à base de dados */
router.get("/add", function (_req, res) {
    res.render("add")
})

/* POST adição de um filme na base de dados */
router.post("/", function (req, res) {
    movies.novo(req.body)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
})

/* DELETE remoção de um filme na base de dados */
router.delete("/:idFilme", function (req, res) {
    movies.apagar(req.params.idFilme)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
})

/* PUT alteração de um filme presente na base de dados */
router.put("/:idFilme", function (req, res) {
    movies.update(req.params.idFilme, req.body)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
})

module.exports = router