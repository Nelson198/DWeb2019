var express = require("express");
var movies = require("../controllers/movie_controller")
var router = express.Router();

/* GET página Web inicial com a lista de filmes */
router.get("/", (_req, res) => {
    movies.list()
        .then(data => res.render("index.pug", { movies: data }))
        .catch(error => res.status(500).render("error.pug", { error: error }))
})

/* GET página Web que permite adicionar um filme à base de dados */
router.get("/adicionar", (_req, res) => {
    res.render("add.pug")
})

/* GET página Web que permite editar um registo relativo a um filme presente na base de dados */
router.get("/editar@:idMovie", (req, res) => {
    movies.consult(req.params.idMovie)
        .then(data => res.render("edit.pug", { movie: data }))
        .catch(error => res.status(500).render("error.pug", { error: error }))
})

/* GET página Web com a informação relativa a um determinado filme */
router.get("/:idMovie", (req, res) => {
    movies.consult(req.params.idMovie)
        .then(data => res.render("consult.pug", { movie: data }))
        .catch(error => res.status(500).render("error.pug", { error: error }))
})

/* POST adição de um filme na base de dados */
router.post("/", (req, res) => {
    if (typeof req.body.genres === "undefined") {
        req.body.genres = []
    }
    if (typeof req.body.cast === "undefined") {
        req.body.cast = []
    }

    movies.add(req.body)
        .then(data => res.jsonp(data))
        .catch(error => res.status(500).render("error.pug", { error: error }))
})

/* DELETE remoção de um filme na base de dados */
router.delete("/:idMovie", (req, res) => {
    movies.delete(req.params.idMovie)
        .then(data => res.jsonp(data))
        .catch(error => res.status(500).jsonp(error))
})

/* PUT alteração de um filme presente na base de dados */
router.put("/:idMovie", (req, res) => {
    movies.update(req.params.idMovie, req.body)
        .then(data => res.jsonp(data))
        .catch(error => res.status(500).jsonp(error))
})

module.exports = router