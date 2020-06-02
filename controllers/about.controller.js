const WebsiteTitle = require('../model/homePage/website.title.model');
const Social = require('../model/social-accounts/social_account.model');
const Logo = require('../model/homePage/logo.model');
const About = require('../model/about/about.page.model');

/*File upload*/
var multer = require('multer');
var crypto=require('crypto');
var fileExtension = require('file-extension');

let webTitle = WebsiteTitle.find().limit(1).sort({'_id':-1});
let socialAccounts = Social.find();
let logo = Logo.find().limit(1).sort({'_id':-1});


//to upload about page background picture
let aboutstorage = multer.diskStorage({
    destination:function (req,file,callback) {
        callback(null,'./public/uploads/about')
    },
    filename:function (req,file,callback) {
        crypto.pseudoRandomBytes(16,function(err,raw){
            callback(null,raw.toString('hex')+Date.now()+'.'+fileExtension(file.mimetype));
        });
    }
});

//to upload about background
// name:aboutpicture is used, so we can identify which file of the ejs to get
let uploadAbout = multer({storage:aboutstorage}).single('aboutpicture');




let async = require('async'); //async is technique which is used to get rid of callback hell


exports.about = async function (req,res,next) {
    const aboutContents = About.find().limit(1).sort({'_id':-1});
    //to get rid of callback hell we used aysnc parallel
    async.parallel({
        aboutContents: function(callback){
            aboutContents.exec()
                .then((contents)=>{
                    callback(null,contents)
                })
                .catch((error)=>{
                    callback(error,null)
                })
        },
        webTitle: function(callback){
            webTitle.exec()
                .then((title)=>{
                    callback(null,title)
                })
                .catch((error)=>{
                    callback(error,null)
                })
        },
        soccialAccounts: function(callback){
            socialAccounts.exec()
                .then((soccialAccountData)=>{
                    callback(null,soccialAccountData)
                })
                .catch((error)=>{
                    callback(error,null)
                })
        },
        logo: function(callback){
            logo.exec()
                .then((logo)=>{
                    callback(null,logo)
                })
                .catch((error)=>{
                    callback(error,null)
                })
        }
    },function(err,aboutContents){
        if(err) throw err;
        res.render('About/about',{
            aboutValues: aboutContents.aboutContents,
            title: aboutContents.webTitle,
            socialAccounts: aboutContents.soccialAccounts,
            logo: aboutContents.logo,
            page_name: 'About'
        })
    })

}


//to get about page for admin
exports.about_page=async function(req,res,next){
    res.render('About/about-page',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage
    })
}


//to post about page contents
exports.about_page_post = function(req,res){
    uploadAbout(req,res,function(err){
        if(err) throw err;
        let about = new About();
        about.contents=req.body.aboutContents;
        about.image=req.file.filename;
        let aboutStatus = about.save();
        if(aboutStatus){
            res.send('About Contents Saved');
        }
        if(!aboutStatus){
            throw new Error('There was some problem Saving About Contents!')
        }

    })
}
