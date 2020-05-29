
const WebsiteTitle = require('../model/homePage/website.title.model');

exports.website_title_change = function(req,res){
    sess = req.session;
    let webtitle = new WebsiteTitle({
        title: req.body.title
    });
    webtitle.save(function(err){
        if(err) throw err;
        sess.title = req.body.title;
        res.send('Website Title Changed!');
    })
}
