let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Quotes = new Schema({
    quote:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    }
});
module.exports=mongoose.model('Quote',Quotes);
