const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userModel = new Schema({
  email: String,
  taxes: []
})

module.exports = mongoose.model('User', userModel)
