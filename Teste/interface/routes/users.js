const express = require("express")
var router = express.Router()

/**
 * Pedido HTTP não suportado.
 */
router.all("*", (req, res, next) => {
    res.status(500).render("error", { erro: "Pedido HTTP não suportado !" })
})

module.exports = router
