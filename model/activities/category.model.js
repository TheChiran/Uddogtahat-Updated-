const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let category = new Schema({
    name:{
        type: String
    }
},{
    collection: 'Category'
})

module.exports = mongoose.model('Category',category);
