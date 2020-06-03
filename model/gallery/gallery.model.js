const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let gallery = new Schema({
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
},{
    collection: 'Gallery'
})
module.exports = mongoose.model('Gallery',gallery);
