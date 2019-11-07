const express = require("express")
const router = express.Router()

const prizeController = require("../controllers/prize_controller")

/**
 * GET
 * (1) Listagem dos prémios Nobel
 * OU
 * (2) Listagem de todos os prémios Nobel associados a uma determinada categoria.
 * OU
 * (3) Listagem de todos os prémios Nobel associados a uma determinada categoria, cujo ano de atribuição é superior a um valor.
 */
router.get("/premios", (req, res, _next) => {
    /* (1) */
    if (Object.entries(req.query).length === 0) {
        prizeController.list()
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).json(erro))
    }
    else if (req.query.categoria !== undefined) {
        let category = req.query.categoria
        /* (2) */
        if (req.query.data === undefined) {
            prizeController.getPrizesByCategory(category)
                .then(dados => res.jsonp(dados))
                .catch(erro => res.status(500).json(erro))
        }
        /* (3) */
        else {
            let data = req.query.data
            prizeController.getPrizesByCategoryAndYear(category, data)
                .then(dados => res.jsonp(dados))
                .catch(erro => res.status(500).json(erro))
        }
    }
    else {
        res.status(500).render("error", { erro: "Os parâmetros introduzidos estão incorretos !" })
    }
})

/**
 * GET
 * Consulta da informação total relativa a um prémio Nobel.
 */
router.get("/premios/:idPrize", (req, res, _next) => {
    prizeController.consult(req.params.idPrize)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).json(erro))
})

/**
 * GET
 * Listagem de todas as categorias (sem repetições) associadas aos prémios Nobel.
 */
router.get("/categorias", (_req, res, _next) => {
    prizeController.getUniqueCategories()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).json(erro))
})

/**
 * GET
 * Listagem ordenada alfabeticamente pelo(s) nome(s) do(s) laureado(s) associado(s) ao(s) prémio(s) Nobel.
 */
router.get("/laureados", (_req, res, _next) => {
    prizeController.getLaureates()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).json(erro))
})

module.exports = router