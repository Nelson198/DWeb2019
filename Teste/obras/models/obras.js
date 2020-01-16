var mongoose = require('mongoose')

var partituraSchema = new mongoose.Schema({
    _voz: String,
    _path: { type: String, required: true },
    _type: { type: String, required: true }
})

var instrumentoSchema = new mongoose.Schema({
    designacao: String,
    partitura: partituraSchema
})

var obraSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    subtitulo: String,
    tipo: String,
    compositor: { type: String, required: true },
    arranjo: String,
    infrelacionada: {
        video: {
            _href: String
        }
    },
    instrumentos: [instrumentoSchema],
    _id: String
})

module.exports = mongoose.model('obras', obraSchema, 'obras')