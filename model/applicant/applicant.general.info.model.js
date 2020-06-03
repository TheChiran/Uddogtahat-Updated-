const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Applicant_General_info = new Schema({
    firstname:{
        type:String
    },
    middlename:{
        type:String
    },
    lastname:{
        type:String
    },
    fathersname:{
        type:String
    },
    mobile:{
        type:String
    },
    gender:{
        type:String
    },
    nationality:{
        type:String
    },
    blood_group:{
        type:String
    },
    dob:{
        type:String
    },
    email:{
        type:String
    },
    url:{
        type: String
    },
    image:{
        type:String
    },
    serial:{
        type:Number
    },
    approval:{
        type:String
    }
},{
    collection: 'ApplicantGeneralInfo'
})
module.exports = mongoose.model('ApplicantGeneralInfo',Applicant_General_info);
