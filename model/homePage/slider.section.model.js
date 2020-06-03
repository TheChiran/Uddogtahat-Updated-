let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let HomePageSliderSection = new Schema({
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
    collection:'HomePageSlider'
});
module.exports = mongoose.model('HomePageSlider',HomePageSliderSection);
