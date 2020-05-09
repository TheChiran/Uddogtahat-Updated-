let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Website = new Schema({
    title: {
        type: String,
        required: true
    }
},
    {
        'collection':'WebsiteTitle'
    });
module.exports = mongoose.model('WebTitle',Website);
