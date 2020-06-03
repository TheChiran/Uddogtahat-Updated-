const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EventSectionBackground = new Schema({
    image:{
        type: String,
        required: true
    }
},{
    collection: 'EventBackground'
});
module.exports = mongoose.model('EventSectionBackground',EventSectionBackground);
