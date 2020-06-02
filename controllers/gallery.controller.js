
const Gallery = require('../model/gallary/gallary.model');
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
        callback(null,'./public/uploads/gallery')
    },
    filename:function (req,file,callback) {
        crypto.pseudoRandomBytes(16,function(err,raw){
            callback(null,raw.toString('hex')+Date.now()+'.'+fileExtension(file.mimetype));
        });
    }
});

let upload = multer({storage:storage}).single('eventpicture');


exports.gallery = function (req,res) {
    const totalGallery = Gallery.countDocuments();
    var page=1;
    var pages;
    var query={
        $and:[
            {"serial":{$gte:1}},{"serial":{$lte:8}}
        ]
    };
    let galleryData = Gallery.find(query).limit(8).sort({'_id':-1});
    async.parallel({
        totalPage: function(callback){
            totalGallery.exec()
                .then((total)=>{
                    if(total<=8){
                        pages=1;
                    }else {
                        if(total % 8!=0){
                            pages=(Math.floor(total/8))+1;
                        }else{
                            pages=Math.floor(total/8);
                        }
                    }
                    callback(null,pages)
                })
                .catch((error)=>{
                    throw error;
                })
        },
        galleryData: function(callback){
            galleryData.exec()
                .then((data)=>{
                    callback(null,data)
                })
                .catch((error)=>{
                    throw error;
                })
        },
        logo: function(callback){
            logo.exec()
                .then((data)=>{
                    callback(null,data)
                })
                .catch((error)=>{
                    throw error;
                })
        },
        webTitle: function(callback){
            webTitle.exec()
                .then((data)=>{
                callback(null,data)
            })
                .catch((error)=>{
                    throw error;
                })
        },
        socialAccountList: function (callback) {
            socialAccounts.exec()
                .then((data)=>{
                    callback(null,data)
                })
                .catch((error)=>{
                    throw error;
                })
        }
    },function(err,data){
        if(err) throw err;
        res.render('Gallery/gallery',{
            gallery: data.galleryData,
            page:page,
            pages:data.totalPage,
            title: data.webTitle,
            socialAccounts: data.socialAccountList,
            logo: data,
            page_name: 'Gallery'
        })
    })
    /*totalGallary.exec(function (err,total) {
        if(err) throw err;
        webTitle.exec(function(err,title){
            if(err) throw err;
            socialAccounts.exec(function(err,socialAccounts){
                if(err) throw err;
                logo.exec(function(err,logo){

                    gallaryData.exec(function (err,gallaryResult) {
                        if(err) throw err;
                        /*calculate total page number*/
                        /*if(total<=8){
                            pages=1;
                        }else {
                            if(total % 8!=0){
                                pages=(Math.floor(total/8))+1;
                            }else{
                                pages=Math.floor(total/8);
                            }
                        }*/
                        /*calculate total page number*/
                        /*res.render('Gallery/gallary',{
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
    })*/
}

//to get page according serial number
exports.getPage = function(req,res){
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
    const totalGallery= Gallery.countDocuments();
    var pages;
    var galleryData =Gallery.find(query).limit(8).sort({'_id':-1});
    async.parallel({
        totalPage: function(callback){
            totalGallery.exec()
                .then((total)=>{
                    if(total<=8){
                        pages=1;
                    }else {
                        if(total % 8!=0){
                            pages=(Math.floor(total/8))+1;
                        }else{
                            pages=Math.floor(total/8);
                        }
                    }
                    callback(null,pages)
                })
                .catch((error)=>{
                    throw error;
                })
        },
        galleryData: function(callback){
            galleryData.exec()
                .then((data)=>{
                    callback(null,data)
                })
                .catch((error)=>{
                    throw error;
                })
        },
        logo: function(callback){
            logo.exec()
                .then((data)=>{
                    callback(null,data)
                })
                .catch((error)=>{
                    throw error;
                })
        },
        webTitle: function(callback){
            webTitle.exec()
                .then((data)=>{
                    callback(null,data)
                })
                .catch((error)=>{
                    throw error;
                })
        },
        socialAccountList: function (callback) {
            socialAccounts.exec()
                .then((data)=>{
                    callback(null,data)
                })
                .catch((error)=>{
                    throw error;
                })
        }
    },function(err,data){
        if(err) throw err;
        if (page > pages || page < 1) {
            res.redirect('/gallery')
        }
        else{
            res.render('Gallery/gallery',{
                gallery: data.galleryData,
                page:page,
                pages:data.totalPage,
                title: data.webTitle,
                socialAccounts: data.socialAccountList,
                logo: data,
                page_name: 'Gallery'
            })
        }
    })
    /*totalGallary.exec(function (err,total) {
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
                    /*if (page > pages || page < 1) {
                        res.redirect('/gallary')
                    } else {
                        res.render('Gallery/gallary',{
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
    })*/

}

//to get upload gallery page
exports.galleryUpload = function(req,res){
    res.render('Gallery/gallery-upload',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage
    })
}

//to post gallery content
exports.postGalleryContent = async function(req,res){
    let totalGallerySerial = Gallery.countDocuments();
    var serial;
    upload(req,res,async function(err){
        totalGallerySerial.exec(async function(err,serialCounter){
            if(err) throw err;
            serial=serialCounter+1;
            let gallery = new Gallery();
            gallery.eventname=req.body.eventname;
            gallery.image=req.file.filename;
            gallery.serial=serial;
            try{
                await gallery.save();
                res.end("File is uploaded!");
            }
            catch (error) {
                throw error;
            }
            /*let gallary = new Gallery({
                eventname: req.body.eventname,
                image: req.file.filename,
                serial:serial
            })
            gallary.save(function(err){
                if(err) throw err;
                res.end("File is uploaded!");
            })*/
        })

    })
    //res.render('admin/dashboard/gallary')
}







