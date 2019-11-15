const express = require("express")
const router = express.Router()

const compositores_Controller = require("../controllers/compositores_controller")

/**
 * GET
 * (1) Consultar toda a informação relativa à base de dados.
 * OU
 * (2) Consultar toda a informação das compositores cuja data passada como argumento esteja entre "dataNasc" e "dataObito".
 * OU
 * (3) Consultar toda a informação das compositores cujos campos periodo="periodo".
 * OU
 * (4) Consultar toda a informação das compositores cuja data passada como argumento esteja entre "dataNasc" e "dataObito" e cujo periodo="periodo".
 */
router.get("/compositores", (req, res, _next) => {
    /* (1) */
    if (Object.entries(req.query).length === 0) {
        compositores_Controller.list()
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).json(erro))
    }
    /* (2) */
    else if (req.query.ano !== undefined && Object.keys(req.query).length === 1) {
        let ano = req.query.ano
        compositores_Controller.listByYear(ano)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).json(erro))
    }
    /* (3) */
    else if (req.query.periodo !== undefined && Object.keys(req.query).length === 1) {
        let periodo = req.query.periodo
        compositores_Controller.listByPeriodo(periodo)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).json(erro))
    }
    /* (4) */
    else if (req.query.ano !== undefined && req.query.periodo !== undefined && Object.keys(req.query).length === 2) {
        let ano = req.query.ano
        let periodo = req.query.periodo
        compositores_Controller.listByYearAndPeriodo(ano, periodo)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).json(erro))
    }
    else {
        res.status(500).render("error", { erro: "Os parâmetros introduzidos estão incorretos !" })
    }
})

/**
 * GET
 * Consulta da informação total relativa a um compositor.
 */
router.get("/compositores/:idcompositores", (req, res, _next) => {
    compositores_Controller.consult(req.params.idcompositores)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).json(erro))
})

/**
 * Other HTTP request
 */
router.all("*", (_req, res, _next) => {
    res.status(500).render("error", { erro: "Pedido HTTP não suportado !" })
})

module.exports = router