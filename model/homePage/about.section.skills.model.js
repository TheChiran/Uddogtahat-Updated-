let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let AboutContents = new Schema({
    skill:{
        type: String,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    }
});
module.exports=mongoose.model('AboutContent',AboutContents);
