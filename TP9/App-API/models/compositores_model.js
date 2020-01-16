const mongoose = require("mongoose")

/* Schema for collection "compositores" */
const compositores_Schema = new mongoose.Schema(
    {
        id: { type: String, required: true },
        nome: { type: String, required: true },
        bio: { type: String, required: true },
        dataNasc: { type: String, required: true },
        dataObito: { type: String, required: true },
        periodo: { type: String, required: true },
    },
    {
        versionKey: false
    }
)

/* Mongoose model */
const compositores_Model = mongoose.model("compositores", compositores_Schema, "compositores")

/* Export model */
module.exports = compositores_Model