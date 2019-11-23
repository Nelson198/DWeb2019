const express = require("express")
const axios = require("axios")
const localhost = require("../config/env").host

const router = express.Router()

/**
 * GET 
 * Página inicial.
 */
router.get("/", (req, res, next) => {
    axios.get(`${localhost}/api/files`)
        .then(info => {
            res.render("index", { list: info.data })
        })
        .catch(erro => {
            res.render("error", { error: erro })
        })
})

/**
 * GET 
 * Download de um ficheiro. 
 */
router.get("/download/:fileName", (req, res, next) => {
    res.download(`${__dirname}/../public/files/${req.params.fileName}`)
})

module.exports = router