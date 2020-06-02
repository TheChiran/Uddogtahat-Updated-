const Social = require('../model/social-accounts/social_account.model');



/*File upload*/
var multer = require('multer');
var crypto=require('crypto');
var fileExtension = require('file-extension');



let socialAccountStorage = multer.diskStorage({
    destination:function (req,file,callback) {
        callback(null,'./public/uploads/socialAccounts')
    },
    filename:function (req,file,callback) {
        crypto.pseudoRandomBytes(16,function(err,raw){
            callback(null,raw.toString('hex')+Date.now()+'.'+fileExtension(file.mimetype));
        });
    }
});

let uploadSocialAccount = multer({storage:socialAccountStorage}).single('socialAccountIcon');

//to get social account page to post
exports.getSocialAccountPage = function(req,res){
    res.render('Social-Account/social-accounts',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage,
        page_name: 'Social'
    })
}

//to post social account
exports.socialAccountPost = async function(req,res){
    uploadSocialAccount(req,res,async function(err){
        if(err) throw err;
        let socialAccount = new Social();
        socialAccount.link = req.body.socialAccountLink;
        socialAccount.icon = req.file.filename;
        try{
            await socialAccount.save();
            res.end("Social Account Added");
        }
        catch (error) {
            throw error;
        }
        /*let social = new Social({
            link: req.body.socialAccountLink,
            icon: req.file.filename,
        })
        social.save(function(err){
            if(err) throw err;
            res.end("Social Account Added");
        })*/

    })

}
