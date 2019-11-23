const mongoose = require("mongoose")

const file_Schema = new mongoose.Schema(
    {
        date: String,
        desc: String,
        name: String,
        mimeType: String,
        size: Number
    },
    {
        versionKey: false
    }
)

/* Mongoose model */
const Model = mongoose.model("fileManager", file_Schema, "fileManager")

/* Export model */
module.exports = Model