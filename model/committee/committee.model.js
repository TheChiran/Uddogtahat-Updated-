const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Committee = new Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    designation:{
        type: String,
        required: true
    },
    companyname:{
        type: String,
        required: true
    },
    image:{
        type: String
    },
    serial:{
        type: Number
    }
});
module.exports = mongoose.model('Committee',Committee);
