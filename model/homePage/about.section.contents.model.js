let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let HomePageAboutSectionContent = new Schema({
    contents:{
        type: String
    }
},{
    collection: 'AboutContent'
});
module.exports = mongoose.model('HomePageAboutSectionContents',HomePageAboutSectionContent);
