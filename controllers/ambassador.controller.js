const Ambassador = require('../model/ambassador/ambassador.model');
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
        callback(null,'./public/uploads/ambassadors')
    },
    filename:function (req,file,callback) {
        crypto.pseudoRandomBytes(16,function(err,raw){
            callback(null,raw.toString('hex')+Date.now()+'.'+fileExtension(file.mimetype));
        });
    }
});

let uploadAmbassador = multer({storage:storage}).single('ambassadorId');


exports.ambassador = function (req,res) {
    const totalAmbassador = Ambassador.countDocuments();
    var page=1;
    var pages;
    var query={
        $and:[
            {"serial":{$gte:1}},{"serial":{$lte:8}}
        ]
    };
    let ambassadorData = Ambassador.find(query).limit(8).sort({'_id':-1});
    async.parallel({
        totalPage: function(callback){
            totalAmbassador.exec()
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
        ambassadorData: function(callback){
            ambassadorData.exec()
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
        res.render('Ambassador/ambassador',{
            ambassador: data.ambassadorData,
            page:page,
            pages:data.totalPage,
            title: data.webTitle,
            socialAccounts: data.socialAccountList,
            logo: data.logo,
            page_name: 'Ambassador'
        })
    })
}

//to get page according serial number
exports.ambassadorGetPage = function(req,res){
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
    const totalAmbassador= Ambassador.countDocuments();
    var pages;
    var ambassadorData =Ambassador.find(query).limit(8).sort({'_id':-1});
    async.parallel({
        totalPage: function(callback){
            totalAmbassador.exec()
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
        ambassadorData: function(callback){
            ambassadorData.exec()
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
            res.redirect('/ambassador')
        }
        else{
            res.render('Ambassador/ambassador',{
                ambassador: data.ambassadorData,
                page:page,
                pages:data.totalPage,
                title: data.webTitle,
                socialAccounts: data.socialAccountList,
                logo: data,
                page_name: 'Ambassador'
            })
        }
    })

}

//to get campus ambassador page
exports.ambassadorPage = async function(req,res){
    sess = req.session;
    res.render('Ambassador/ambassador-page',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage,
        page_name: 'Ambassador'
    })
}

//to post campus Ambassador
exports.assignCampusAmbassador = async function(req,res){
    let totalAmbassadorSerial = Ambassador.countDocuments();
    var serial;
    uploadAmbassador(req,res,async function(err){
        if(err) throw err;
        totalAmbassadorSerial.exec(async function(err,serialCounter){
            if(err) throw err;
            serial=serialCounter+1;
            let ambassador = new Ambassador();
            ambassador.serial=serial;
            ambassador.image=req.file.filename;
            try{
                await ambassador.save();
                res.end("New Ambassador Assigned");
            }
            catch (error) {
                throw error;
            }
        })

    })
}
