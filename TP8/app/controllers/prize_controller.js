/* Mongoose model */
const prizeModel = require("../models/prize_model")

/* Export controller */
const prizeController = module.exports

/**
 * Método para obter a listagem dos prémios Nobel.
 * Nota: Exibem-se apenas os campos "year" e "category".
 *       O campo "_id" é também mostrado para facilitar a consulta de um registo de um prémio Nobel na interface da aplicação.
 * @param
 */
prizeController.list = () => {
    return prizeModel
        .find({}, { _id: 1, year: 1, category: 1 })
        .exec()
}

/**
 * Método que permite consultar a informação completa de um determinado prémio Nobel.
 * @param id Identificador do prémio Nobel.
 */
prizeController.consult = (id) => {
    return prizeModel
        .findOne({ _id: id })
        .exec()
}

/**
 * Método que lista todas as categorias, sem repetições, presentes na listagem dos prémios Nobel.
 * @param
 */
prizeController.getUniqueCategories = () => {
    return prizeModel
        .distinct("category")
        .exec()
}

/**
 * Método que lista todos os prémios Nobel associados a uma determinada categoria.
 * @param category Categoria.
 */
prizeController.getPrizesByCategory = (category) => {
    return prizeModel
        .find({ category: category }, {})
        .exec()
}

/**
 * Método que lista todos os prémios Nobel associados a uma determinada categoria, cujo ano de atribuição seja superior a um determinado valor.
 * @param category Categoria.
 * @param year Ano.
 */
prizeController.getPrizesByCategoryAndYear = (category, year) => {
    return prizeModel
        .find({ category: category, year: { $gt: year } }, {})
        .exec()
}

/**
 * Método que lista todos os laureados, ordenando-os alfabeticamente pelo nome.
 * Nota: Exibem-se apenas os campos relativos ao nome (= "firstname" + "surname"), "year" e "category", omitindo o campo "_id".
 * @param
 */
prizeController.getLaureates = () => {
    return prizeModel
        .aggregate()
        .unwind("$laureates")
        .group(
            {
                _id: "$laureates.id",
                firstname: { $first: "$laureates.firstname" },
                surname: { $first: "$laureates.surname" },
                prizes: {
                    $push: {
                        year: "$year",
                        category: "$category"
                    }
                }
            }
        )
        .project(
            {
                _id: 0
            }
        )
        .sort(
            {
                firstname: true,
                surname: true
            }
        )
        .exec()
}