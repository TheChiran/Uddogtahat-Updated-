let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ActivityPageHeader = new Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    }
},{
    collection: 'ActivityPageHeader'
});
module.exports=mongoose.model('ActivityPageHeader',ActivityPageHeader);
