let mongooge = require('mongoose');
let Schema = mongooge.Schema;


let aboutBackground = new Schema({
    image:{
        type: String,
        required: true
    }
},{
    collection: 'AboutBackground'
});
module.exports = mongooge.model('AboutBackground',aboutBackground);
