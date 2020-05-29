let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Event = new Schema({
    name:{
        type: String,
        required: true
    },
    eventType:{
        type:String,
        required: true
    },
    eventImage:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Event',Event);
