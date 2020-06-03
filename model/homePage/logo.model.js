let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Logo = new Schema({
    image:{
        type: String,
        required: true
    }
},{
    collection:'Logo'
});
module.exports = mongoose.model('Logo',Logo);
