var createError = require('http-errors')
var express = require('express')
var path = require('path')
var logger = require('morgan')
var mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/obras', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongo ready: " + mongoose.connection.readyState))
  .catch((erro) => console.log('Mongo: erro na conexão: ' + erro))

var apiRouter = require('./routes/api')

var app = express()

app.use(logger('dev'))

app.use('/', apiRouter)

module.exports = app
