const express = require("express")
const axios = require("axios")
const router = express.Router()

/**
 * GET
 * Menu principal com todas as opções de consulta.
 */
router.get("/", (_req, res, _next) => {
    res.render("index")
})

/**
 * GET
 * Consulta da informação relativa aos prémios Nobel.
 */
router.get("/premios", (req, res, _next) => {
    axios.get("http://localhost:8008/api/premios",
        {
            params: {
                categoria: req.query.categoria,
                data: req.query.data
            }
        })
        .then(info => {
            res.render("prize", { prizes: info.data })
        })
        .catch(erro => {
            res.render("error", { error: erro })
        })
})

/**
 * GET
 * Consulta da informação total relativa a um prémio Nobel.
 */
router.get("/premios/:idPrize", (req, res, _next) => {
    axios.get(`http://localhost:8008/api/premios/${req.params.idPrize}`)
        .then(info => {
            res.render("consult", { prize: info.data })
        })
        .catch(erro => {
            res.render("error", { error: erro })
        })
})

/**
 * GET
 * Listagem de todas as categorias (sem repetições) associadas aos prémios Nobel.
 */
router.get("/categorias", (_req, res, _next) => {
    axios.get("http://localhost:8008/api/categorias")
        .then(info => {
            res.render("category", { categories: info.data })
        })
        .catch(erro => {
            res.render("error", { error: erro })
        })
})

/**
 * GET
 * Listagem ordenada alfabeticamente pelo(s) nome(s) do(s) laureado(s) associado(s) ao(s) prémio(s) Nobel.
 */
router.get("/laureados", (_req, res, _next) => {
    axios.get("http://localhost:8008/api/laureados")
        .then(info => {
            res.render("laureate", { laureates: info.data })
        })
        .catch(erro => {
            res.render("error", { error: erro })
        })
})

/**
 * Other HTTP request
 */
router.all("*", (_req, res, _next) => {
    res.status(500).render("error", { erro: "Pedido HTTP não suportado !" })
})

module.exports = router