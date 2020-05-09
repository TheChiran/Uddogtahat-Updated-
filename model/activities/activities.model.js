const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let activities = new Schema({
    title:{
        type: String
    },
    category:{
        type: String
    },
    postedby:{
        type: String
    },
    fullblog:{
        type: String
    },
    image:{
        type: String
    },
    uploaddate:{
        type: String
    },
    serial:{
        type: Number
    }

});
module.exports = mongoose.model('Activity',activities);
