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

let async = require('async');
//to get contact page
exports.contactPage =  function (req,res) {
    let contactDetails = Contact.find().limit(1).sort({'_id':-1});
    async.parallel({
        contact: function(callback){
            contactDetails.exec()
                .then((data)=>{
                    callback(null,data);
                })
                .catch((error)=>{
                    throw error;
                })
        },
        socialAccountList: function(callback){
            socialAccounts.exec()
                .then((data)=>{
                    callback(null,data);
                })
                .catch((error)=>{
                    throw error;
                })
        },
        webTitle: function(callback){
            webTitle.exec()
                .then((data)=>{
                    callback(null,data);
                })
                .catch((error)=>{
                    throw error;
                })
        },
        logo: function(callback){
            logo.exec()
                .then((data)=>{
                    callback(null,data);
                })
                .catch((error)=>{
                    throw error;
                })
        }
    },function(err,data){
        if(err) throw err;
        res.render('Contact/contact',{
            contacts: data.contact,
            title: data.webTitle,
            socialAccounts: data.socialAccountList,
            logo: data.logo,
            page_name: 'Contact'
        })
    })
    /*contactDetails.exec(function(err,contactData){
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
    })*/
}

//to get contact page for post
exports.getContactPage=function(req,res){
    res.render('Contact/contact-page',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage
    })
}

//to post contact details
exports.contactContentPost = async function(req,res){
    let contact = new Contact();
    contact.houseNumber=req.body.houseNumber;
    contact.flatNumber=req.body.flatNumber;
    contact.road=req.body.road;
    contact.area=req.body.area;
    contact.email=req.body.email;
    contact.telephone=req.body.telephone;
    contact.mobile=req.body.mobile;
    try{
        await contact.save();
        res.send('Contact details submitted!');
    }
    catch (error) {
        throw error;
    }

    /*Contact.create(req.body,function(err){
        if(err) throw err;
        res.send('Contact details submitted!')
    })*/
}
