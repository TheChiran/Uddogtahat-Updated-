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

let uploadAbout = multer({storage:aboutstorage}).single('aboutpicture');


exports.about = function (req,res) {
    const aboutQuery = About.find().limit(1).sort({'_id':-1});
    aboutQuery.exec(function(err,aboutValues){
        if(err) throw err;
        webTitle.exec(function(err,title){
            if(err) throw err;
            socialAccounts.exec(function(err,socialAccounts){
                if(err) throw err;
                logo.exec(function(err,logo){
                    res.render('About/about',{
                        aboutValues: aboutValues,
                        title: title,
                        socialAccounts: socialAccounts,
                        logo: logo
                    })
                })
            })
        })
    })
}

exports.about_page=function(req,res){
    res.render('About/about-page',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage
    })
}

exports.about_page_post=function(req,res){
    uploadAbout(req,res,function(err){
        if(err) throw err;
        let about = new About({
            contents: req.body.aboutContents,
            image: req.file.filename,
        })
        about.save(function(err){
            if(err) throw err;
            res.send('Contents Inserted!');
        })

    })
}
