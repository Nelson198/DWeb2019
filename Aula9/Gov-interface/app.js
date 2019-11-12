var createError = require("./node_modules/http-errors")
var express = require("./node_modules/express")
var path = require("path")
var logger = require("./node_modules/morgan")

var interface_Router = require("./routes/interface")

var app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

/* Pretty JSON setup */
app.set("json spaces", 4)

app.use("/", interface_Router)

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
