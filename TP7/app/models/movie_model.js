const mongoose = require("mongoose")

/* Data Structure for collection "movies" */
const movieSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        title: { type: String, required: true },
        year: { type: Number, required: true },
        cast: Array,
        genres: Array
    },
    {
        versionKey: false
    }
)

/* Mongoose model */
const movieModel = mongoose.model("movie", movieSchema, "movies")

/* Export model */
module.exports = movieModel