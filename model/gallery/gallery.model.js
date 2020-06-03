const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let gallary = new Schema({
    eventname:{
        type:String
    },
    image:{
        type: String
    },
    uploadDate:{
        type: Date,
        default: Date.now()
    },
    serial:{
        type: Number
    }
})
module.exports = mongoose.model('Gallary',gallary);
