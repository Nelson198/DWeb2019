const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")

let interface_Router = require("./routes/interface")
let users_Router = require("./routes/users")

var app = express()

/* View engine setup */
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/interface", interface_Router)
app.use("/", users_Router)

/* Catch 404 and forward to error handler */
app.use(function (req, res, next) {
    next(createError(404))
})

/* Error handler */
app.use(function (err, req, res, next) {
    /* Set locals, only providing error in development */
    res.locals.message = err.message
    res.locals.error = req.app.get("env") === "development" ? err : {}

    /* Render the error page */
    res.status(err.status || 500)
    res.render("error")
})

module.exports = app
