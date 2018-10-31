const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoundSchema = new Schema({
    time: {type: Number,require: true},
    characters: {type: Number, require: true},
    date: {type: String, require: true}
},{
    _id: false
})

const UserSchema = new Schema({
    id           : String,
    token        : String,
    name         : String,
    email        : String,
    image        : String,
    history      : [RoundSchema]
})

module.exports = mongoose.model('User', UserSchema);