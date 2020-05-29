
const Gallary = require('../model/gallary/gallary.model');
const Social = require('../model/social-accounts/social_account.model');
const Logo = require('../model/homePage/logo.model');
const WebsiteTitle = require('../model/homePage/website.title.model');


let webTitle = WebsiteTitle.find().limit(1).sort({'_id':-1});
let socialAccounts = Social.find();
let logo = Logo.find().limit(1).sort({'_id':-1});



let async = require('async');
var multer = require('multer');
var crypto=require('crypto');
var fileExtension = require('file-extension');

let storage = multer.diskStorage({
    destination:function (req,file,callback) {
        callback(null,'./public/uploads/gallary')
    },
    filename:function (req,file,callback) {
        crypto.pseudoRandomBytes(16,function(err,raw){
            callback(null,raw.toString('hex')+Date.now()+'.'+fileExtension(file.mimetype));
        });
    }
});

let upload = multer({storage:storage}).single('eventpicture');

exports.gallary = function (req,res) {
    const totalGallary = Gallary.countDocuments();
    var page=1;
    var pages;
    var query={
        $and:[
            {"serial":{$gte:1}},{"serial":{$lte:8}}
        ]
    };
    let gallaryData = Gallary.find(query).limit(8).sort({'_id':-1});
    totalGallary.exec(function (err,total) {
        if(err) throw err;
        webTitle.exec(function(err,title){
            if(err) throw err;
            socialAccounts.exec(function(err,socialAccounts){
                if(err) throw err;
                logo.exec(function(err,logo){


                    gallaryData.exec(function (err,gallaryResult) {
                        if(err) throw err;
                        /*calculate total page number*/
                        if(total<=8){
                            pages=1;
                        }else {
                            if(total % 8!=0){
                                pages=(Math.floor(total/8))+1;
                            }else{
                                pages=Math.floor(total/8);
                            }
                        }
                        /*calculate total page number*/
                        res.render('Gallary/gallary',{
                            gallary: gallaryResult,
                            page:page,
                            pages:pages,
                            title: title,
                            socialAccounts: socialAccounts,
                            logo: logo
                        })
                    })
                })
            })
        })
    })
}
exports.gallary_get_page = function(req,res){
    var page = req.params.page;
    var min;
    var max;
    if((page-1)==0){
        min=1;
        max=8;
    }else{
        min=((page-1)*8)+1;
        max=(min+8)-1;
    }
    var query={
        $and:[
            {"serial":{$gte:min}},{"serial":{$lte:max}}
        ]
    };
    const totalGallary= Gallary.countDocuments();
    var pages;
    var gallaryData =Gallary.find(query).limit(8).sort({'_id':-1});
    totalGallary.exec(function (err,total) {
        if(err) throw err;
        logo.exec(function(err,logo){
            if(err) throw err;
            webTitle.exec(function(err,title){
                if(err) throw err;
                gallaryData.exec(function (err,gallaryResult) {
                    if(err) throw err;
                    if(total<=8){
                        pages=1;
                    }else {
                        if(total % 8!=0){
                            pages=(Math.floor(total/8))+1;
                        }else{
                            pages=Math.floor(total/8);
                        }
                    }
                    /*calculate total page number*/
                    if (page > pages || page < 1) {
                        res.redirect('/gallary')
                    } else {
                        res.render('Gallary/gallary',{
                            gallary: gallaryResult,
                            page:page,
                            pages:pages,
                            logo: logo,
                            title: title
                        })
                    }
                })
            })
        })
    })

}

exports.gallary_upload = function(req,res){
    res.render('Gallary/gallary-upload',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage
    })
}
exports.gallary_post = function(req,res){
    let totalGallarySerial = Gallary.countDocuments();
    var serial;
    upload(req,res,function(err){
        totalGallarySerial.exec(function(err,serialCounter){
            if(err) throw err;
            serial=serialCounter+1;
            let gallary = new Gallary({
                eventname: req.body.eventname,
                image: req.file.filename,
                serial:serial
            })
            gallary.save(function(err){
                if(err) throw err;
                res.end("File is uploaded!");
            })
        })

    })
    //res.render('admin/dashboard/gallary')
}







