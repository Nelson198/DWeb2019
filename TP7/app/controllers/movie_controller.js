var movie = require("../models/movie_model")

const movies = module.exports

/* Exibem-se, aleatoriamente, 1000 dos 28795 documentos presentes na coleção da base de dados "movies" */
movies.list = () => {
    return movie
        .aggregate([
            { $sample: { size: 1000 } }
        ])
        .sort({ title: 1 })
        .exec()
}

movies.consult = (id) => {
    return movie
        .findOne({ _id: id })
        .exec()
}

movies.add = (doc) => {
    return movie
        .create(doc)
        .exec()
}

movies.delete = (id) => {
    return movie
        .remove({ _id: id })
        .exec()
}

movies.update = (id, updated) => {
    return movie
        .update({ _id: id }, updated)
        .exec()
}

movies.count = () => {
    return movie
        .countDocuments()
        .exec()
}

movies.projection = (campos) => {
    return movie
        .find({}, campos)
        .exec()
}

movies.aggregate = (campo) => {
    return movie
        .aggregate([{ $group: { _id: "$" + campo, contador: { $sum: 1 } } }, { $sort: { contador: -1 } }])
        .exec()
}