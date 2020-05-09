const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Company_Information = new Schema({
    applicantmobile:{
        type:String
    },
    companyname:{
        type:String
    },
    address1:{
        type:String
    },
    address2:{
        type:String
    },
    cellphone:{
        type:String
    },
    telephone:{
        type:String
    },
    email:{
        type:String
    },
    website:{
        type:String
    },
    logo:{
        type:String
    },
    serial:{
        type:Number
    },
    approval:{
        type: String
    }
})
module.exports = mongoose.model('Company',Company_Information);
