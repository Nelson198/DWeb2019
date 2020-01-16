/* Mongoose model */
const obras_Model = require("../models/obras_model")

/* Export controller */
const obras_Controller = module.exports

/**
 * Método para obter a listagem total das obras.
 * @param
 */
obras_Controller.list = () => {
    return obras_Model
        .find({}, {})
        .exec()
}

/**
 * Método que permite listar todas as obras cuja anoCriacao="year".
 * @param year ano.
 */
obras_Controller.listByYear = (year) => {
    return obras_Model
        .find({ anoCriacao: year }, {})
        .exec()
}

/**
 * Método que permite listar todas as obras cujo periodo="periodo".
 * @param periodo Periodo
 */
obras_Controller.listByPeriodo = (periodo) => {
    return obras_Model
        .find({ periodo: periodo }, {})
        .exec()
}

/**
 * Método que permite listar todas as obras cujo compositor="compositor" e duracao="duracao".
 * @param compositor Compositor
 * @param duracao Duração
 */
obras_Controller.listByCompositorAndDuracao = (compositor, duracao) => {
    return obras_Model
        .find({ compositor: compositor, duracao: duracao }, {})
        .exec()
}

/**
 * Método que permite consultar toda a informação de uma determinada obra.
 * @param id Identificador de uma determinada obra
 */
obras_Controller.consult = (id) => {
    return obras_Model
        .findOne({ id: id })
        .exec()
}

/**
 * Método que permite obter a listagem sem repetições de todos os compositores.
 */
obras_Controller.getCompositores = () => {
    return obras_Model
        .distinct("compositor")
        .exec()
}

/**
 * Método que permite obter a listagem sem repetições de todos os periodos.
 */
obras_Controller.getPeriodos = () => {
    return obras_Model
        .distinct("periodo")
        .exec()
}