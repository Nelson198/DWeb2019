const mongoose = require("mongoose")

/* Mongoose model */
const movieModel = require("../models/movie_model")

/* Export controller */
const movieController = module.exports

/**
 * Exibem-se, aleatoriamente, 1000 dos 28795 documentos presentes na coleção da base de dados "movieController"
 * @param
 */
movieController.list = () => {
    return movieModel
        .aggregate([
            { $sample: { size: 1000 } }
        ])
        .sort({ title: 1 })
        .exec()
}

/**
 * Método alternativo para obter a listagem total dos documentos presentes na base de dados
 * @param
 */
movieController.list_v2 = () => {
    return movieModel
        .find({}, { _id: 1, title: 1, year: 1 })
        .sort({ title: 1 })
        .exec()
}

/**
 * Consulta da informação relativa a um registo de um filme presente na base de dados
 * * @param id Identificador do filme
 */
movieController.consult = (id) => {
    return movieModel
        .findOne({ _id: id })
        .exec()
}

/**
 * Inserção de um registo de um filme na base de dados 
 * @param movie Filme a ser inserido
 */
movieController.insert = (movie) => {
    const newMovie = new movieModel({
        _id: new mongoose.Types.ObjectId,
        title: movie.title,
        year: movie.year,
        cast: movie.cast,
        genres: movie.genres
    })

    return newMovie.save()
}

/**
 * Remoção de um registo de um filme
 * @param id Identificador do filme
 */
movieController.delete = (id) => {
    return movieModel
        .deleteOne({ _id: id })
        .exec()
}

/**
 * Atualização de um registo de um filme
 * @param id Identificador do filme
 * @param movie Informação do filme a ser atualizado na base de dados
 */
movieController.update = (id, movie) => {
    return movieModel
        .updateOne({ _id: id }, movie)
        .exec()
}