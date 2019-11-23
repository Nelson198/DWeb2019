const express = require("express")
const fs = require("fs")
const multer = require("multer")

let upload = multer({ dest: "uploads/" })

const Controller = require("../controllers/controller")
const Model = require("../models/model")

const router = express.Router()

/**
 * GET
 * Recolha da lista de ficheiros.
 */
router.get("/files", (req, res, next) => {
    Controller.list()
        .then(data => {
            res.jsonp(data)
        })
        .catch(erro => {
            res.status(500).jsonp(erro)
        })
})

/**
 * GET
 * Recolha da informação relativa a um registo de um ficheiro.
 */
router.get("/file/:id", (req, res, next) => {
    Controller.consultByID(req.params.id)
        .then(data => {
            res.jsonp(data)
        })
        .catch(erro => {
            res.status(500).jsonp(erro)
        })
})

/**
 * GET
 * Recolha da informação relativa a um registo de um ficheiro a partir da data de submissão do mesmo.
 */
router.get("/file", (req, res, next) => {
    Controller.consultByDate(req.query.date)
        .then(data => {
            res.jsonp(data)
        })
        .catch(erro => {
            res.status(500).jsonp(erro)
        })
})

/**
 * POST
 * Inserção de um ou mais registos de ficheiros na base de dados.
 */
router.post("/files", upload.array("file"), (req, res, next) => {
    req.files.forEach((file, index) => {
        let oldPath = `${__dirname}/../${file.path}`
        let newPath = `${__dirname}/../public/files/${file.originalname}`

        fs.rename(oldPath, newPath, (error) => {
            if (error) {
                throw error
            }
        })

        let date = new Date()
        if (req.files.length === 1) {
            var newFile = new Model(
                {
                    date: date.toISOString(),
                    desc: req.body.desc,
                    name: file.originalname,
                    mimeType: file.mimetype,
                    size: file.size
                })
        } else {
            var newFile = new Model(
                {
                    date: date.toISOString(),
                    desc: req.body.desc[index],
                    name: file.originalname,
                    mimeType: file.mimetype,
                    size: file.size
                })
        }

        newFile.save((error, file) => {
            if (!error) {
                console.log(`Foi adicionado um registo de um ficheiro com _id: ${newFile._id} na base de dados !`)
            } else {
                console.log(`Erro: ${error}`)
            }
        })
    })
    res.redirect("/")
})

/**
 * DELETE
 * Remoção de um registo de um ficheiro presente na base de dados.
 */
router.delete("/file/:id", (req, res, next) => {
    Controller.delete(req.params.id)
        .then(data => {
            console.log(`Foi eliminado um registo de um ficheiro com _id: ${req.params.id} na base de dados !`)
        })
        .catch(error => {
            console.log(`Erro: ${error}`)
        })
    res.sendStatus(200)
})

/**
 * Pedido HTTP não suportado.
 */
router.all("*", (req, res, next) => {
    res.status(500).render("error", { erro: "Pedido HTTP não suportado !" })
})

module.exports = router