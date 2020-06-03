const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ambassador = new Schema({
        image:{
            type:String,
            required:true
        },
        serial:{
            type: Number
        }
    },
    {
        collection:'Ambassador'
    })
module.exports = mongoose.model('Ambassador',ambassador);
