const mongoose = require('mongoose')
const Schema = mongoose.Schema

const objectiveSchema = new Schema({
    text: {
        type: String,
        required: true
    }
})

const Obj = mongoose.model("objectives", objectiveSchema)
module.exports = Obj;
