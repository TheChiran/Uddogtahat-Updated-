const Committee = require('../model/committee/committee.model');
const Social = require('../model/social-accounts/social_account.model');
const Logo = require('../model/homePage/logo.model');
const WebsiteTitle = require('../model/homePage/website.title.model');

let webTitle = WebsiteTitle.find().limit(1).sort({'_id':-1});
let socialAccounts = Social.find();
let logo = Logo.find().limit(1).sort({'_id':-1});

/*File upload*/
var multer = require('multer');
var crypto=require('crypto');
var fileExtension = require('file-extension');



let committeeStorage = multer.diskStorage({
    destination:function (req,file,callback) {
        callback(null,'./public/uploads/committee')
    },
    filename:function (req,file,callback) {
        crypto.pseudoRandomBytes(16,function(err,raw){
            callback(null,raw.toString('hex')+Date.now()+'.'+fileExtension(file.mimetype));
        });
    }
});

let uploadCommittee = multer({storage:committeeStorage}).single('committeepersonimage');


let async = require('async');

exports.commitee_page=function(req,res){
    const totalCommittee = Committee.countDocuments();
    var page=1;
    var pages;
    var query={
        $and:[
            {"serial":{$gte:1}},{"serial":{$lte:8}}
        ]
    };

    var committeeData =Committee.find(query).limit(8).sort({'_id':-1});
    async.parallel({
        totalPage: function(callback){
            totalCommittee.exec()
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
                    callback(null,pages);
                })
                .catch((error)=>{
                    throw error;
                })
        },
        committeeDataSet: function (callback) {
            committeeData.exec()
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
        webTitle: function (callback) {
            webTitle.exec()
                .then((data)=>{
                    callback(null,data);
                })
                .catch((error)=>{
                    throw error;
                })
        }
    },function(err,data){
        if(err) throw err;
        res.render('Committee/committee',{
            committees:data.committeeDataSet,
            page:page,
            pages:data.totalPage,
            socialAccounts: data.socialAccountList,
            title: data.webTitle,
            logo: data.logo,
            page_name: 'Committee-Member-List'
        })
    })
    /*totalCommittee.exec(function (err,total) {
        if(err) throw err;
        socialAccounts.exec(function(err,socialAccounts){
            if(err) throw err;
            webTitle.exec(function(err,title){
                if(err) throw err;
                logo.exec(function(err,logo){
                    committeeData.exec(function (err,committeedata) {
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
                        res.render('Committee/committee',{
                            committees:committeedata,
                            page:page,
                            pages:pages,
                            socialAccounts: socialAccounts,
                            title: title,
                            logo: logo
                        })
                    })
                })
            })
        })
    })*/
}

exports.commitee_get_page = function(req,res){
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
    const totalCommittee = Committee.countDocuments();
    var pages;
    var committeeData =Committee.find(query).limit(8).sort({'_id':-1});
    async.parallel({
        totalPage: function(callback){
            totalCommittee.exec()
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
                    callback(null,pages);
                })
                .catch((error)=>{
                    throw error;
                })
        },
        committeeDataSet: function (callback) {
            committeeData.exec()
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
        webTitle: function (callback) {
            webTitle.exec()
                .then((data)=>{
                    callback(null,data);
                })
                .catch((error)=>{
                    throw error;
                })
        }
    },function(err,data){
        if(err) throw err;
        if (page > pages || page < 1) {
            res.redirect('/committee-members')
        }else{
            res.render('Committee/committee',{
                committees:data.committeeDataSet,
                page:page,
                pages:data.totalPage,
                socialAccounts: data.socialAccountList,
                title: data.webTitle,
                logo: data.logo,
                page_name: 'Committee-Member-List'
            })
        }

    })
    /*totalCommittee.exec(function (err,total) {
        if(err) throw err;
        logo.exec(function(err,logo){
            if(err) throw err;
            webTitle.exec(function(err,title){
                if(err) throw err;
                socialAccounts.exec(function(err,socialAccounts){
                    if(err) throw err;
                    committeeData.exec(function (err,committeedata) {
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
                        if (page > pages || page < 1) {
                            res.redirect('/committee-members')
                        } else {
                            res.render('Committee/committee',{
                                committees:committeedata,
                                page:page,
                                pages:pages,
                                title: title,
                                logo: logo,
                                socialAccounts: socialAccounts
                            })
                        }
                    })
                })
            })
        })
    })*/
}

//to get committee post page
exports.committeePostPage=function(req,res){
    res.render('Committee/committee-page',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage
    })
}


//to post committee member contents
exports.committeePagePost = async function(req,res){
    var totalCommitteeDocument = await Committee.countDocuments().exec();
    let serial = totalCommitteeDocument+1;
    uploadCommittee(req,res,async function(err){
        if(err) throw err;
        let committee = new Committee();
            committee.name= req.body.name;
            committee.phone= req.body.phone;
            committee.email= req.body.email;
            committee.designation= req.body.designation;
            committee.companyname= req.body.company;
            committee.serial= serial;
            committee.image= req.file.filename;

        try{
            await  committee.save();
            res.send('New Committee member Added!');
        }
        catch (error) {
            throw error;
        }
    })
    /*totalCommitteeDocument.exec(function(err,totalCommittee){
        if(err) throw err;
        var serial = totalCommittee+1;
        uploadCommittee(req,res,function(err){
            if(err) throw err;
            console.log(serial);
            let committee= new Committee({
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                designation: req.body.designation,
                companyname: req.body.company,
                serial: serial,
                image: req.file.filename
            })
            committee.save(function(err){
                if(err) throw err;
                res.send('New Committee member Added!');
            })
        })
    })*/
    //res.render('admin/dashboard/committee-page')
}
