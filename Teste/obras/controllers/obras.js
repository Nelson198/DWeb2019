var Obra = require('../models/obras')

var Obras = module.exports

// Devolve a lista de obras
Obras.listar = () => {
    return Obra.find({}, {_id:1, titulo:1, tipo:1, compositor:1}).exec()
}

// Devolve a info de um premio
Obras.consultar = (id) => {
    return Obra.findOne({_id: id}).exec()
}

Obras.compositor = (comp) => {
    return Obra.find({compositor: comp}).exec()
}

Obras.tipos = () => {
    return Obra.distinct("tipo").exec()
}

Obras.instrumento = (inst) => {
    return Obra.find({"instrumentos.designacao": inst}).exec()
}

Obras.obrasQuant = (comp, dur) => {
    return Obra.aggregate([{$project: {_id:1, titulo:1, partituras: {$size: "$instrumentos"}}}]).exec()
}