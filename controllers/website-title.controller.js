
const WebsiteTitle = require('../model/homePage/website.title.model');

exports.changeWebTitle = async function(req,res,next){
    sess = req.session;
    let webTitle = new WebsiteTitle();
    webTitle.title = req.body.title;
    try{
        await webTitle.save();
        res.send('Website Title Changed!');9+6
    }
    catch (error) {
        throw error;
    }
    /*let webtitle = new WebsiteTitle({
        title: req.body.title
    });
    webtitle.save(function(err){
        if(err) throw err;
        sess.title = req.body.title;
        res.send('Website Title Changed!');
    })*/
}
