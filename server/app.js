const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const indexRouter = require('./routes/index')
const bodyParser = require('body-parser')
const cors = require('cors')

require('./passport')

// connect to Mongo when the app initializes
mongoose.connect('mongodb://localhost:27017/taxCalculator')

const app = express()

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json(new Error('not found'))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  console.log('test', err.message)

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

const server = app.listen(3000, () => {
  console.log('Express server listening on port %d', server.address().port)
})

module.exports = app
