var express = require('express');
var router = express.Router();
var Obras = require('../controllers/obras');

/* GET lista de prémios. */
router.get('/obras', function (req, res, next) {
    if("compositor" in req.query) {
        Obras.compositor(req.query.compositor)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
    } else if("instrumento" in req.query) {
        Obras.instrumento(req.query.instrumento)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
    } else {
        Obras.listar()
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
    }
});

/* GET info completa de um prémio. */
router.get('/obras/:id', function (req, res) {
    Obras.consultar(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
});

/* GET lista de categorias. */
router.get('/tipos', function (req, res) {
    Obras.tipos()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
});

/* GET lista de laureados. */
router.get('/obrasQuant', function (req, res) {
    Obras.obrasQuant()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
});

router.all('*', function (req, res) {
    res.jsonp({error: "Route not found"})
})

module.exports = router;