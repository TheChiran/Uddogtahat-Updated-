let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let Contact_model = new Schema({
    houseNumber:{
        type: String,
        required: true
    },
    flatNumber:{
        type: String,
        required: true
    },
    road:{
        type:String,
        required: true
    },
    area:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    telephone:{
        type: Number,
        required: true
    },
    mobile:{
        type: Number,
        required:true
    }
},{
    collection: 'Contact'
})
module.exports = mongoose.model('Contact',Contact_model);
