let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let HomePageAboutSectionContent = new Schema({
    contents:{
        type: String
    }
},{
    'collections': 'homepageAboutSectionContent'
});
module.exports = mongoose.model('HomePageAboutSectionContents',HomePageAboutSectionContent);
