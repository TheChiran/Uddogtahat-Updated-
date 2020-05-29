const Contact = require('../model/contact/contact.page.model');
const WebsiteTitle = require('../model/homePage/website.title.model');
const Social = require('../model/social-accounts/social_account.model');
const Logo = require('../model/homePage/logo.model');


/*File upload*/
var multer = require('multer');
var crypto=require('crypto');
var fileExtension = require('file-extension');

let webTitle = WebsiteTitle.find().limit(1).sort({'_id':-1});
let socialAccounts = Social.find();
let logo = Logo.find().limit(1).sort({'_id':-1});


exports.contact = function (req,res) {
    const contactDetails = Contact.find().limit(1).sort({'_id':-1});
    contactDetails.exec(function(err,contactData){
        if(err) throw err;
        webTitle.exec(function(err,title){
            if(err) throw err;
            socialAccounts.exec(function(err,socialAccounts){
                if(err) throw err;
                logo.exec(function (err,logo) {
                    if(err) throw err;
                    res.render('Contact/contact',{
                        contacts: contactData,
                        title: title,
                        socialAccounts: socialAccounts,
                        logo: logo
                    })
                })
            })
        })
    })
}

exports.contact_page=function(req,res){
    res.render('Contact/contact-page',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage
    })
}
exports.contact_page_post=function(req,res){
    Contact.create(req.body,function(err){
        if(err) throw err;
        res.send('Contact details submitted!')
    })
}
