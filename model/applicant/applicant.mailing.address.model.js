const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Applicant_mailing_address = new Schema({
    mobile:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    road:{
        type:String
    },
    postcode:{
        type:Number
    },
    serial:{
    type:Number
    },
    approval:{
        type:String
    }
})
module.exports = mongoose.model('ApplicantMailingAddress',Applicant_mailing_address);
