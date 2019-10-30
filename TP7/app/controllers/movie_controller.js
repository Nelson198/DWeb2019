var movie = require("../models/movie_model")

const movies = module.exports

movies.listar = () => {
    return movie
        .find()
        .sort({ title: 1 })
        .exec()
}

movies.consultar = (fid) => {
    return movie
        .findOne({ _id: fid })
        .exec()
}

movies.contar = () => {
    return movie
        .countDocuments()
        .exec()
}

movies.projetar = (campos) => {
    return movie
        .find({}, campos)
        .exec()
}

movies.agregar = (campo) => {
    return movie
        .aggregate([{ $group: { _id: "$" + campo, contador: { $sum: 1 } } }, { $sort: { contador: -1 } }])
        .exec()
}

movies.apagar = (fid) => {
    return movie
        .remove({ _id: fid })
        .exec()
}

movies.novo = (doc) => {
    return movie
        .insert(doc)
        .exec()
}

movies.update = (fid, updated) => {
    return movie
        .update({ _id: fid }, updated)
        .exec()
}