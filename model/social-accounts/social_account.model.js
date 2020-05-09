let mongoose = require('mongoose');
let Socialaccount = mongoose.Schema;

let SocialAccount = new Socialaccount({
    link:{
        type: String,
        required: true
    },
    icon:{
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Social',SocialAccount);
