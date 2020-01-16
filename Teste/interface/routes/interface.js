const express = require("../node_modules/express")
const axios = require("../node_modules/axios")
var router = express.Router()

const key = "?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ"

/**
 * GET
 * Listagem das entidades.
 */
router.get("/", (_req, res, _next) => {
    axios.get(`http://clav-api.dglab.gov.pt/api/entidades${key}`)
        .then(info => {
            res.render("index", { entidades: info.data })
        })
        .catch(error => {
            res.render("error", { error: error })
        })

})

/**
 * GET
 * Consulta da informação relativa a uma entidade. 
 */
router.get("/:idEntidade", (req, res, _next) => {
    let url = `http://clav-api.dglab.gov.pt/api/entidades/${req.params.idEntidade}${key}`
    axios.get(url)
        .then(entidades => {
            axios.get(`http://clav-api.dglab.gov.pt/api/entidades/${req.params.idEntidade}/tipologias${key}`)
                .then(tipologias => {
                    axios.get(`http://clav-api.dglab.gov.pt/api/entidades/${req.params.idEntidade}/intervencao/dono${key}`)
                        .then(donos => {
                            axios.get(`http://clav-api.dglab.gov.pt/api/entidades/${req.params.idEntidade}/intervencao/participante${key}`)
                                .then(participantes => {
                                    res.render("consult", { id: req.params.idEntidade, entidade: entidades.data, tipologias: tipologias.data, donos: donos.data, participantes: participantes.data })
                                })
                                .catch(error => {
                                    res.render("error", { erro: error })
                                })
                        })
                        .catch(error => {
                            res.render("error", { error: error })
                        })
                })
                .catch(error => {
                    res.render("error", { error: error })
                })
        })
        .catch(error => {
            res.render("error", { error: error })
        })
})

/**
 * Other HTTP request
 */
router.all("*", (_req, res, _next) => {
    res.status(500).render("error", { erro: "Pedido HTTP não suportado !" })
})

module.exports = router