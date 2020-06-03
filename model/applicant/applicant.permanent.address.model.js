const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let Applicant_permanent_address = new Schema({
    applicantmobile:{
        type:String
    },
    district:{
        type:String
    },
    upazila:{
        type:String
    },
    post_office:{
        type:String
    },
    village:{
        type:String
    },
    road:{
        type:String
    },
    block:{
        type:String
    },
    house:{
        type:String
    },
    post_code:{
        type:String
    },
    serial:{
        type:Number
    },
    approval:{
        type:String
    }
},{
    collection: 'ApplicantPermanentAddress'
})
module.exports = mongoose.model('ApplicantPermanentAddress',Applicant_permanent_address);
