const express = require("express")
const router = express.Router()

/**
 * GET
 * Redirecionamento para o menu principal da interface com todas as opções de consulta.
 */
router.get("/", (_req, res, _next) => {
    res.redirect("/interface")
})

module.exports = router