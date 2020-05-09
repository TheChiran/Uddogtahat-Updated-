let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let AdminModel = new Schema({
    username:{
        type: String,
        required: true
    },
    email:{
      type: String,
      required: true
    },
    password:{
        type: String,
        required: true
    },
    image:{
        type: String
    }
},
    {
        collection: 'Admin'
    });
module.exports = mongoose.model('AdminModel',AdminModel);
