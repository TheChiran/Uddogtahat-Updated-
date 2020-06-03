const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let applicant_membership = new Schema({
    membershipno:{
        type:String
    },
    mobile:{
        type:String
    },
    serial:{
        type:Number
    },
    approval:{
        type:String
    }
},{
    collection: 'ApplicantMembership'
});
module.exports=mongoose.model('Membership',applicant_membership);
