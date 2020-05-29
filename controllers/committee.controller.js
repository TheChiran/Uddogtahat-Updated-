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



let committeestorage = multer.diskStorage({
    destination:function (req,file,callback) {
        callback(null,'./public/uploads/committee')
    },
    filename:function (req,file,callback) {
        crypto.pseudoRandomBytes(16,function(err,raw){
            callback(null,raw.toString('hex')+Date.now()+'.'+fileExtension(file.mimetype));
        });
    }
});

let uploadCommittee = multer({storage:committeestorage}).single('committeepersonimage');

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
    totalCommittee.exec(function (err,total) {
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
    })
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
    totalCommittee.exec(function (err,total) {
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
                            res.redirect('/commitee')
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
    })
}

exports.get_committee_page=function(req,res){
    res.render('Committee/committee-page',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage
    })
}

exports.committee_page_post=function(req,res){
    var totalCommitteeDocument = Committee.countDocuments();
    totalCommitteeDocument.exec(function(err,totalCommittee){
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
    })
    //res.render('admin/dashboard/committee-page')
}
