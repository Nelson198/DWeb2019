const mongoose = require("mongoose")

/* Schema for collection "obras" */
const obras_Schema = new mongoose.Schema(
    {
        id: { type: String, required: true },
        nome: { type: String, required: true },
        desc: { type: String, required: true },
        anoCriacao: { type: String, required: true },
        periodo: { type: String, required: true },
        compositor: { type: String, required: true },
        duracao: { type: String, required: true }
    },
    {
        versionKey: false
    }
)

/* Mongoose model */
const obras_Model = mongoose.model("obras", obras_Schema, "obras")

/* Export model */
module.exports = obras_Model