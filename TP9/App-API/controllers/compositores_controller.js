/* Mongoose model */
const compositores_Model = require("../models/compositores_model")

/* Export controller */
const compositores_Controller = module.exports

/**
 * Método para obter a listagem total dos compositores.
 * @param
 */
compositores_Controller.list = () => {
    return compositores_Model
        .find({}, {})
        .exec()
}

/**
 * Método que permite listar todos os compositores, cuja data passada como argumento esteja entre "dataNasc" e "dataObito".
 * @param year Ano
 */
compositores_Controller.listByYear = (year) => {
    return compositores_Model
        .find({ dataNasc: { $lte: year }, dataObito: { $gte: year } }, {})
        .exec()
}

/**
 * Método que permite listar todos os compositores cujo periodo="periodo".
 * @param periodo Periodo
 */
compositores_Controller.listByPeriodo = (periodo) => {
    return compositores_Model
        .find({ periodo: periodo }, {})
        .exec()
}

/**
 * Método que permite listar todos os compositores, cuja data passada como argumento esteja entre "dataNasc" e "dataObito" e cujo periodo="periodo".
 * @param year Ano
 * @param periodo Periodo
 */
compositores_Controller.listByYearAndPeriodo = (year, periodo) => {
    return compositores_Model
        .find({ dataNasc: { $lte: year }, dataObito: { $gte: year }, periodo: periodo }, {})
        .exec()
}

/**
 * Método que permite consultar toda a informação de uma determinada obra.
 * @param id Identificador de uma determinada obra
 */
compositores_Controller.consult = (id) => {
    return compositores_Model
        .findOne({ "@id": id })
        .exec()
}