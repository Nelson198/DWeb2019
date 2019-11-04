const express = require("express");

const movieModel = require("../models/movie_model")
const movieController = require("../controllers/movie_controller")

var router = express.Router()

/**
 * GET
 * página Web inicial com a lista de filmes
 */
router.get("/", (_req, res) => {
    movieController.list()
        .then(movies => res.render("index.pug", { movies: movies }))
        .catch(error => res.render("error.pug", { erro: error }))
})

/**
 * GET
 * página Web que permite adicionar um filme à base de dados
 */
router.get("/adicionar", (_req, res) => {
    res.render("add.pug")
})

/**
 * GET
 * página Web que permite editar um registo relativo a um filme presente na base de dados
 */
router.get("/editar/:idMovie", (req, res) => {
    movieController.consult(req.params.idMovie)
        .then(movie => res.render("edit.pug", { movie: movie }))
        .catch(_error => res.render("error.pug", { erro: `Não foi possível encontrar o filme com id: "${req.params.idMovie}" na base de dados !` }))
})

/**
 * GET
 * página Web com a informação relativa a um determinado filme
 */
router.get("/:idMovie", (req, res) => {
    movieController.consult(req.params.idMovie)
        .then(movie => res.render("consult.pug", { movie: movie }))
        .catch(_error => res.render("error.pug", { erro: `Não foi possível encontrar o filme com id: "${req.params.idMovie}" na base de dados !` }))
})

/**
 * POST
 * adição de um filme na base de dados
 */
router.post("/", (req, res) => {
    if (typeof req.body.genres === "undefined") {
        req.body.genres = []
    }
    if (typeof req.body.cast === "undefined") {
        req.body.cast = []
    }

    const newMovie = new movieModel({
        title: req.body.title,
        year: req.body.year,
        cast: req.body.cast,
        genres: req.body.genres
    })

    movieController.insert(newMovie)
        .then(movie => {
            console.log(`Foi adicionado um registo do filme com _id: ${movie._id} na base de dados !`)
            res.redirect(`/filmes/${movie._id}`)
        })
        .catch(error => {
            console.log(error)
            res.render("error.pug", { erro: error })
        })
})

/**
 * DELETE
 * remoção de um filme na base de dados
 */
router.delete("/:idMovie", (req, res) => {
    movieController.delete(req.params.idMovie)
        .then((_data) => {
            console.log(`Foi removido o registo do filme com _id: ${req.params.idMovie} na base de dados !`)
            res.sendStatus(200)
        })
        .catch(error => {
            console.log(error)
            res.render("error.pug", { erro: error })
        })
})

/**
 * PUT
 * alteração de um filme presente na base de dados
 */
router.put("/:idMovie", (req, res) => {
    movieController.update(req.params.idMovie, req.body)
        .then(_data => {
            console.log(`Foi atualizado o registo do filme com _id: ${req.params.idMovie} na base de dados !`)
            res.sendStatus(200)
        })
        .catch(error => {
            console.log(error)
            res.render("error.pug", { erro: error })
        })
})

module.exports = router