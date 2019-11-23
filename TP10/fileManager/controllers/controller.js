/* Mongoose model */
const Model = require("../models/model")

/* Export controller */
const Controller = module.exports

/**
 * Método para listar todos os registos de ficheiros na base de dados.
 * @param
 */
Controller.list = () => {
    return Model
        .find({}, {})
        .exec()
}

/**
 * Método que permite consultar toda a informação relativa a um registo de um ficheiro presente na base de dados.
 * @param id Identificador de um registo de um ficheiro.
 */
Controller.consultByID = (id) => {
    return Model
        .find({ _id: id }, {})
        .exec()
}

/**
 * Método que permite consultar, a partir da data de submissão, toda a informação relativa a um registo de um ficheiro presente na base de dados.
 * @param date Data de submissão de um ficheiro.
 */
Controller.consultByDate = (date) => {
    return Model
        .find({ date: date }, {})
        .exec()
}

/**
 * Método para eliminar um registo de um ficheiro presente na base de dados.
 * @param id Identificador de um registo de um ficheiro.
 */
Controller.delete = (id) => {
    return Model
        .deleteOne({ _id: id })
        .exec()
}