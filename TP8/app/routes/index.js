const express = require("express")
const router = express.Router()

/**
 * GET
 * Redirecionamento para o menu principal da interface com todas as opções de consulta.
 */
router.get("/", (_req, res, _next) => {
    res.redirect("/interface")
})

/**
 * Other HTTP request
 */
router.all("*", (_req, res, _next) => {
    res.status(500).render("error", { erro: "Pedido HTTP não suportado !" })
})

module.exports = router