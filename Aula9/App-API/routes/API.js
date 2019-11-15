const express = require("express")
const router = express.Router()

const obras_Controller = require("../controllers/obras_controller")

/**
 * Obtenção da lista sem repetições de todos os compositores.
 */
router.get("/compositores", (_req, res, _next) => {
    obras_Controller.getCompositores()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).json(erro))
})

/**
 * Obtenção da lista sem repetições de todos os periodos.
 */
router.get("/periodos", (_req, res, _next) => {
    obras_Controller.getPeriodos()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).json(erro))
})

/**
 * GET
 * (1) Consultar toda a informação relativa à base de dados
 * OU
 * (2) Consultar toda a informação das obras cujos campos ano="ano"
 * OU
 * (3) Consultar toda a informação das obras cujos campos periodo="periodo"
 * OU
 * (4) Consultar toda a informação das obras cujos compositor="compositor" e duracao="duracao"
 */
router.get("/obras", (req, res, _next) => {
    /* (1) */
    if (Object.entries(req.query).length === 0) {
        obras_Controller.list()
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).json(erro))
    }
    /* (2) */
    else if (req.query.ano !== undefined && Object.keys(req.query).length === 1) {
        let ano = req.query.ano
        obras_Controller.listByYear(ano)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).json(erro))
    }
    /* (3) */
    else if (req.query.periodo !== undefined && Object.keys(req.query).length === 1) {
        let periodo = req.query.periodo
        obras_Controller.listByPeriodo(periodo)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).json(erro))
    }
    /* (4) */
    else if (req.query.compositor !== undefined && req.query.duracao !== undefined && Object.keys(req.query).length === 2) {
        let compositor = req.query.compositor
        let duracao = req.query.duracao
        obras_Controller.listByCompositorAndDuracao(compositor, duracao)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).json(erro))
    }
    else {
        res.status(500).render("error", { erro: "Os parâmetros introduzidos estão incorretos !" })
    }
})

/**
 * GET
 * Consulta da informação total relativa a uma obra.
 */
router.get("/obras/:idObras", (req, res, _next) => {
    obras_Controller.consult(req.params.idObras)
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