const createError = require("http-errors")
const express = require("express")
const path = require("path")
const logger = require("morgan")
const mongoose = require("mongoose")

/* Mongoose connection */
mongoose.connect("mongodb://localhost:27017/prize", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB ready: " + mongoose.connection.readyState))
    .catch(() => console.log("Couldn't connect to MongoDB !"))

let API_Router = require("./routes/API")
let interface_Router = require("./routes/interface")

let app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

// Pretty JSON setup
app.set("json spaces", 4)

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

app.use("/api", API_Router)
app.use("/interface", interface_Router)

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
    next(createError(404))
})

// error handler
app.use((err, req, res, _next) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get("env") === "development" ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render("error")
})

module.exports = app