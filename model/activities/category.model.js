const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let category = new Schema({
    name:{
        type: String
    }
})

module.exports = mongoose.model('Category',category);
