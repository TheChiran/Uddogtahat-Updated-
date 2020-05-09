const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Applicant_office_info = new Schema({
    applicantmobile:{
        type:String
    },
    officephone:{
        type:String
    },
    recidencephone:{
        type:String
    },
    officefax:{
        type:String
    },
    designation:{
        type:String
    },
    organization:{
        type:String
    },
    serial:{
        type:Number
    },
    approval:{
        type:String
    }
})
module.exports = mongoose.model('ApplicanOfficeInfo',Applicant_office_info);
