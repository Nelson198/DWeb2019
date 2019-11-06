const mongoose = require("mongoose")

/* Schema for laureate field */
const laureateSchema = new mongoose.Schema(
    {
        id: { type: String, required: true },
        firstname: { type: String, required: true },
        surname: { type: String, required: true },
        motivation: { type: String, required: true },
        share: { type: String, required: true }
    },
    {
        versionKey: false
    }
)

/* Schema for collection "prize" */
const prizeSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        year: { type: String, required: true },
        category: { type: String, required: true },
        overallMotivation: String,
        laureates: [laureateSchema]
    },
    {
        versionKey: false
    }
)

/* Mongoose model */
const prizeModel = mongoose.model("prize", prizeSchema, "prize")

/* Export model */
module.exports = prizeModel