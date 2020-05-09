const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let about = new Schema({
    contents:{
        type:String,
        required:true
    },
    image:{
        type: String
    }
},
    {
        collection:'about'
    })
module.exports = mongoose.model('About',about);
