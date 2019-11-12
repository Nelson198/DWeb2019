const express = require("../node_modules/express")
const axios = require("../node_modules/axios")
const router = express.Router()

const gov_db = "http://clav.dglab.gov.pt/api/entidades?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM0ODgwMDgsImV4cCI6MTU3NjA4MDAwOH0.UD0UdMrzKcWDop8HlwqdeOuK_ZzZxHvOMOP2DMkIjUQ"

/**
 * GET
 * Listagem das entidades.
 */
router.get("/", (_req, res, _next) => {
    axios.get(gov_db)
        .then(info => {
            res.render("index", { db: info.data })
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
    let prefix = `http://clav-api.dglab.gov.pt/api/entidades/${req.params.idEntidade}/`
    let suffix = "?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM0ODgwMDgsImV4cCI6MTU3NjA4MDAwOH0.UD0UdMrzKcWDop8HlwqdeOuK_ZzZxHvOMOP2DMkIjUQ"
    axios.get(prefix + suffix)
        .then(entidades => {
            axios.get(prefix + "tipologias" + suffix)
                .then(tipologias => {
                    axios.get(prefix + "intervencao/dono" + suffix)
                        .then(donos => {
                            axios.get(prefix + "intervencao/participante" + suffix)
                                .then(participantes => {
                                    // res.jsonp({ entidades: entidades.data, tipologias: tipologias.data, donos: donos.data, participantes: participantes.data })
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