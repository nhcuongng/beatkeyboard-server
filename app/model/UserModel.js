const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    id           : String,
    token        : String,
    name         : String,
    email        : String,
    image        : String
})

module.exports = mongoose.model('User', UserSchema);